import path from "path";
import { promises as fs, createWriteStream, unlink } from "fs";
import { createHash } from "crypto";
import https from "https";
import http from "http";
import mkdirp from "mkdirp";
import globby from "globby";
import { URL } from "url";

import config from "../config.js";
import { formatBytes } from "./imageUtils.js";

// Alt text stops at the first "]" so a linked image — [![alt](img)](page) —
// parses as an image plus a link, not as one image pointing at the page.
const EXTERNAL_IMAGE_RE = /!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g;
const EXTERNAL_IMAGE_SRC_RE = /<img[^>]+src=["'](https?:\/\/[^\s"']+)["'][^>]*>/gi;
const YOUTUBE_EMBED_RE = /<youtube-embed\s+([^>]*)video-id=["']([^"']+)["']([^>]*)>/gi;
// <source src="..."> covers <video>/<audio> children; <video ... src="..."> covers the bare shorthand.
const VIDEO_SOURCE_SRC_RE = /<source[^>]+src=["'](https?:\/\/[^\s"']+)["'][^>]*>/gi;
const VIDEO_SRC_RE = /<video[^>]+src=["'](https?:\/\/[^\s"']+)["'][^>]*>/gi;
// thumbnail: "https://..." in a post's leading frontmatter block.
// Some hosts (Wikimedia, for one) reject requests that don't identify
// themselves, so send a descriptive agent with a contact URL.
const USER_AGENT = `${config.site.domain} localize-images (+${config.site.absolute_baseurl})`;

const FRONTMATTER_THUMBNAIL_RE = /^thumbnail:[ \t]*["']?(https?:\/\/[^\s"']+)["']?[ \t]*$/m;

/**
 * Check if a URL is truly external (not from the blog itself)
 * @param {string} url - The URL to check
 * @returns {boolean} True if the URL is external to this blog
 */
function isExternalUrl(url) {
  try {
    const urlObj = new URL(url);
    const blogDomain = config.site.domain;
    const absoluteBaseUrl = config.site.absolute_baseurl;

    // Check if the URL starts with the blog's absolute base URL
    if (absoluteBaseUrl && url.startsWith(absoluteBaseUrl)) {
      return false;
    }

    // Check if the hostname matches the blog's domain
    if (blogDomain && urlObj.hostname === blogDomain) {
      return false;
    }

    // Skip gravatar images (user avatars from old comments)
    if (urlObj.hostname.includes('gravatar.com')) {
      return false;
    }

    // Skip disqus images (comment system assets)
    if (urlObj.hostname.includes('disqus.com')) {
      return false;
    }

    return true;
  } catch (err) {
    // If URL parsing fails, assume it's external
    return true;
  }
}

/**
 * Find an external thumbnail URL declared in a post's leading frontmatter
 * @param {string} content - Full contents of the post file
 * @returns {{line: string, url: string}|null} The matched line and its URL
 */
function findFrontmatterThumbnail(content) {
  if (!content.startsWith("---")) return null;
  const end = content.indexOf("\n---", 3);
  if (end === -1) return null;

  const match = content.slice(0, end).match(FRONTMATTER_THUMBNAIL_RE);
  if (!match || !isExternalUrl(match[1])) return null;

  return { line: match[0], url: match[1] };
}

/**
 * Localize external images in blog posts matching the given globs
 * @param {string[]} postGlobs - Array of glob patterns for posts to process
 * @param {object} options - Options object
 * @param {boolean} options.dryRun - If true, don't actually download or modify files
 */
export async function localizeImages(postGlobs = [`${config.postsPath}/**/*.{md,markdown}`], options = {}) {
  const { dryRun = false } = options;

  const files = await globby(postGlobs, {
    ignore: [
      `${config.postsPath}/**/{_*,node_modules,build,tmp}/**/*.{md,markdown}`,
      `${config.postsPath}/**/*.sync-conflict-*`,
    ],
  });

  console.log(`Found ${files.length} post(s) to process`);

  for (const file of files) {
    await localizeImagesInPost(file, { dryRun });
  }
}

/**
 * Localize external images in a single post file
 * @param {string} filepath - Path to the post file
 * @param {object} options - Options object
 * @param {boolean} options.dryRun - If true, don't actually download or modify files
 */
async function localizeImagesInPost(filepath, options = {}) {
  const { dryRun = false } = options;

  console.log(`\nProcessing: ${filepath}`);

  let content = await fs.readFile(filepath, "utf8");
  const basename = path.basename(filepath);

  // First, check if there are any external images to localize
  const allMarkdownMatches = [...content.matchAll(EXTERNAL_IMAGE_RE)];
  const allHtmlMatches = [...content.matchAll(EXTERNAL_IMAGE_SRC_RE)];
  const youtubeMatches = [...content.matchAll(YOUTUBE_EMBED_RE)];
  const allVideoMatches = [
    ...content.matchAll(VIDEO_SOURCE_SRC_RE),
    ...content.matchAll(VIDEO_SRC_RE),
  ];

  // Filter to only truly external URLs (not from this blog)
  const markdownMatches = allMarkdownMatches.filter(match => isExternalUrl(match[2]));
  const htmlMatches = allHtmlMatches.filter(match => isExternalUrl(match[1]));
  // Collect unique external video URLs; we rewrite by URL string (below), so we
  // only need the distinct set, not the individual tag matches.
  const videoUrls = [...new Set(
    allVideoMatches.map(match => match[1]).filter(isExternalUrl)
  )];
  const frontmatterThumbnail = findFrontmatterThumbnail(content);
  const totalMatches =
    markdownMatches.length +
    htmlMatches.length +
    youtubeMatches.length +
    videoUrls.length +
    (frontmatterThumbnail ? 1 : 0);

  if (totalMatches === 0) {
    console.log(`  No external images found`);
    return;
  }

  // Check if this is a date-only filename (daily multi-post file)
  const postName = path.basename(filepath, path.extname(filepath));
  const isDateOnlyFile = /^\d{4}-\d{2}-\d{2}$/.test(postName);

  // Convert standalone .md files to directory-based posts (only if we have images to localize)
  // BUT skip conversion for date-only files (daily multi-post files)
  if (!isDateOnlyFile && basename !== 'index.md' && basename !== 'index.markdown') {
    const parentDir = path.dirname(filepath);
    const newPostDir = path.join(parentDir, postName);
    const newFilepath = path.join(newPostDir, 'index.md');

    if (!dryRun) {
      console.log(`  Converting to directory-based post: ${postName}/`);

      // Create the new directory
      await mkdirp(newPostDir);

      // Write the content to index.md
      await fs.writeFile(newFilepath, content, "utf8");

      // Delete the old file
      await fs.unlink(filepath);

      // Update filepath to point to the new location
      filepath = newFilepath;
    } else {
      console.log(`  Would convert to directory-based post: ${postName}/`);
    }
  }

  // Set up directories for images
  const postDir = path.dirname(filepath);
  let imagesDir;

  if (isDateOnlyFile) {
    // For daily multi-post files, use attachments subdirectory
    imagesDir = path.join(postDir, 'attachments');
    if (!dryRun) {
      console.log(`  Using attachments directory for daily multi-post file`);
    }
  } else {
    // For regular posts, images go in the same directory as the post
    imagesDir = postDir;
  }

  // Track images we've downloaded in this post to avoid duplicates
  const downloadedImages = new Map();
  let modifiedContent = content;
  let imageCount = 0;

  // Process markdown image syntax: ![alt](url)
  // (already matched above, reuse the matches)
  for (const match of markdownMatches) {
    const [fullMatch, alt, imageUrl] = match;
    imageCount++;

    if (dryRun) {
      const dryRunFilename = generateFilename(imageUrl);
      console.log(`  Would download: ${imageUrl} → ${dryRunFilename}`);
      continue;
    }

    try {
      const localPath = await downloadImage(imageUrl, imagesDir, downloadedImages);
      const relativePath = path.relative(postDir, localPath);
      const newImageRef = `![${alt}](${relativePath})`;
      modifiedContent = modifiedContent.replace(fullMatch, newImageRef);

      const stats = await fs.stat(localPath);
      console.log(`  ✓ Downloaded: ${imageUrl} → ${relativePath} (${formatBytes(stats.size)})`);

    } catch (err) {
      console.error(`  ✗ Failed to download ${imageUrl}: ${err.message}`);
    }
  }

  // Process HTML img tags: <img src="url" ... >
  // (already matched above, reuse the matches)
  for (const match of htmlMatches) {
    const [fullMatch, imageUrl] = match;

    // Skip if we already processed this as markdown
    if (downloadedImages.has(imageUrl)) {
      const localPath = downloadedImages.get(imageUrl);
      const relativePath = path.relative(postDir, localPath);
      modifiedContent = modifiedContent.replace(imageUrl, relativePath);
      continue;
    }

    imageCount++;

    if (dryRun) {
      const dryRunFilename = generateFilename(imageUrl);
      console.log(`  Would download: ${imageUrl} → ${dryRunFilename}`);
      continue;
    }

    try {
      const localPath = await downloadImage(imageUrl, imagesDir, downloadedImages);
      const relativePath = path.relative(postDir, localPath);
      modifiedContent = modifiedContent.replace(imageUrl, relativePath);

      const stats = await fs.stat(localPath);
      console.log(`  ✓ Downloaded: ${imageUrl} → ${relativePath} (${formatBytes(stats.size)})`);

    } catch (err) {
      console.error(`  ✗ Failed to download ${imageUrl}: ${err.message}`);
    }
  }

  // Process <youtube-embed> components
  for (const match of youtubeMatches) {
    const [fullMatch, beforeAttrs, videoId, afterAttrs] = match;

    // Check if this component already has a thumbnail attribute
    if (fullMatch.includes('thumbnail=')) {
      continue;
    }

    // Not every video has a maxres still, but hqdefault always exists.
    const thumbnailUrls = [
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    ];
    imageCount++;

    if (dryRun) {
      const dryRunFilename = generateFilename(thumbnailUrls[0]);
      console.log(`  Would download YouTube thumbnail: ${thumbnailUrls[0]} → ${dryRunFilename}`);
      continue;
    }

    let lastError;
    for (const thumbnailUrl of thumbnailUrls) {
      try {
        const localPath = await downloadImage(thumbnailUrl, imagesDir, downloadedImages);
        const relativePath = path.relative(postDir, localPath);

        // Add thumbnail attribute to the component
        const newTag = `<youtube-embed ${beforeAttrs}video-id="${videoId}"${afterAttrs} thumbnail="${relativePath}">`;
        modifiedContent = modifiedContent.replace(fullMatch, newTag);

        const stats = await fs.stat(localPath);
        console.log(`  ✓ Downloaded YouTube thumbnail: ${thumbnailUrl} → ${relativePath} (${formatBytes(stats.size)})`);

        lastError = null;
        break;
      } catch (err) {
        lastError = err;
      }
    }
    if (lastError) {
      console.error(`  ✗ Failed to download YouTube thumbnail for ${videoId}: ${lastError.message}`);
    }
  }

  // Process <video>/<source> elements (and their <a> fallback links).
  // We rewrite by URL string so every occurrence — the <source>/<video src>
  // and any matching <a href> fallback — is localized in a single pass.
  for (const videoUrl of videoUrls) {
    imageCount++;

    if (dryRun) {
      const dryRunFilename = generateFilename(videoUrl, 'mp4');
      console.log(`  Would download video: ${videoUrl} → ${dryRunFilename}`);
      continue;
    }

    try {
      const localPath = await downloadImage(videoUrl, imagesDir, downloadedImages, 'mp4');
      const relativePath = path.relative(postDir, localPath);
      modifiedContent = modifiedContent.replaceAll(videoUrl, relativePath);

      const stats = await fs.stat(localPath);
      console.log(`  ✓ Downloaded video: ${videoUrl} → ${relativePath} (${formatBytes(stats.size)})`);

    } catch (err) {
      console.error(`  ✗ Failed to download video ${videoUrl}: ${err.message}`);
    }
  }

  // Handle the frontmatter thumbnail last so it can reuse an image already
  // downloaded for the body instead of fetching a second copy of it.
  if (frontmatterThumbnail) {
    const { line, url: thumbnailUrl } = frontmatterThumbnail;
    imageCount++;

    if (dryRun) {
      const dryRunFilename = generateFilename(thumbnailUrl);
      console.log(`  Would download thumbnail: ${thumbnailUrl} → ${dryRunFilename}`);
    } else {
      try {
        const localPath = await downloadImage(thumbnailUrl, imagesDir, downloadedImages);
        const relativePath = path.relative(postDir, localPath);
        modifiedContent = modifiedContent.replace(line, `thumbnail: "${relativePath}"`);

        const stats = await fs.stat(localPath);
        console.log(`  ✓ Downloaded thumbnail: ${thumbnailUrl} → ${relativePath} (${formatBytes(stats.size)})`);

      } catch (err) {
        console.error(`  ✗ Failed to download thumbnail ${thumbnailUrl}: ${err.message}`);
      }
    }
  }

  if (dryRun) {
    console.log(`  Found ${imageCount} external media item(s) (dry run, no changes made)`);
    return;
  }

  if (modifiedContent !== content) {
    await fs.writeFile(filepath, modifiedContent, "utf8");
    console.log(`  Updated post with ${downloadedImages.size} localized media file(s)`);
  }
}

/**
 * Generate a filename for an image URL
 * @param {string} imageUrl - URL of the image
 * @returns {string} Generated filename
 */
function generateFilename(imageUrl, fallbackExt = 'jpg') {
  const hash = createHash('sha1').update(imageUrl).digest('hex').substring(0, 12);
  const ext = guessExtensionFromUrl(imageUrl) || fallbackExt;
  return `${hash}.${ext}`;
}

/**
 * Download an image from a URL to a local directory
 * @param {string} imageUrl - URL of the image to download
 * @param {string} targetDir - Directory to save the image to
 * @param {Map} downloadedImages - Map tracking already-downloaded images
 * @returns {Promise<string>} Path to the downloaded image
 */
async function downloadImage(imageUrl, targetDir, downloadedImages, fallbackExt = 'jpg') {
  // Check if we've already downloaded this image
  if (downloadedImages.has(imageUrl)) {
    return downloadedImages.get(imageUrl);
  }

  // Create the images directory if it doesn't exist
  await mkdirp(targetDir);

  // Generate filename based on SHA-1 hash of the URL
  const filename = generateFilename(imageUrl, fallbackExt);
  const targetPath = path.join(targetDir, filename);

  // Filenames are hashes of the source URL, so an existing file at this path
  // is already a copy of this image — keep it rather than re-downloading over
  // a local copy that may have been optimized since.
  if (await fileExists(targetPath)) {
    downloadedImages.set(imageUrl, targetPath);
    return targetPath;
  }

  // Download the image
  await downloadFile(imageUrl, targetPath);

  // The same image often shows up under more than one URL in a post (a body
  // image that's also the thumbnail, say), so reuse an identical file already
  // in the bundle rather than keeping a byte-for-byte duplicate.
  const identical = await findIdenticalFile(targetPath, targetDir);
  if (identical) {
    await fs.unlink(targetPath);
    downloadedImages.set(imageUrl, identical);
    return identical;
  }

  // Track this download
  downloadedImages.set(imageUrl, targetPath);

  return targetPath;
}

/**
 * Find a file in a directory whose contents match the given file
 * @param {string} filepath - File to match against
 * @param {string} dir - Directory to search
 * @returns {Promise<string|null>} Path to the identical file, or null
 */
async function findIdenticalFile(filepath, dir) {
  const contents = await fs.readFile(filepath);
  const digest = createHash("sha1").update(contents).digest("hex");

  for (const entry of await fs.readdir(dir)) {
    const candidate = path.join(dir, entry);
    if (candidate === filepath) continue;

    // Size is a cheap filter, so only files that could match get read.
    const stats = await fs.stat(candidate).catch(() => null);
    if (!stats || !stats.isFile() || stats.size !== contents.length) continue;

    const candidateDigest = createHash("sha1")
      .update(await fs.readFile(candidate))
      .digest("hex");
    if (candidateDigest === digest) return candidate;
  }

  return null;
}

/**
 * Download a file from a URL
 * @param {string} url - URL to download from
 * @param {string} targetPath - Local path to save to
 * @returns {Promise<void>}
 */
function downloadFile(url, targetPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const options = { headers: { 'User-Agent': USER_AGENT } };

    const request = protocol.get(url, options, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          downloadFile(redirectUrl, targetPath).then(resolve).catch(reject);
          return;
        }
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        return;
      }

      // An HTML body means the URL points at a page, not a file. Saving it
      // under an image extension leaves broken junk in the post bundle.
      const contentType = response.headers['content-type'] || '';
      if (contentType.startsWith('text/html')) {
        response.resume();
        reject(new Error(`Not a media file (Content-Type: ${contentType})`));
        return;
      }

      const fileStream = createWriteStream(targetPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        unlink(targetPath, () => {});
        reject(err);
      });
    });

    request.on('error', reject);
    // Videos are an order of magnitude larger than images; allow more time.
    request.setTimeout(120000, () => {
      request.destroy();
      reject(new Error('Download timeout'));
    });
  });
}

/**
 * Check if a file exists
 * @param {string} filepath - Path to check
 * @returns {Promise<boolean>}
 */
async function fileExists(filepath) {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Guess file extension from URL or content-type
 * @param {string} url - URL to analyze
 * @returns {string|null} Extension without dot, or null
 */
function guessExtensionFromUrl(url) {
  const match = url.match(/\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|mov|m4v|ogg|mp3|m4a)(?:\?|$)/i);
  return match ? match[1].toLowerCase() : null;
}

