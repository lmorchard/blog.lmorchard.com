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

const EXTERNAL_IMAGE_RE = /!\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g;
const EXTERNAL_IMAGE_SRC_RE = /<img[^>]+src=["'](https?:\/\/[^\s"']+)["'][^>]*>/gi;
const YOUTUBE_EMBED_RE = /<youtube-embed\s+([^>]*)video-id=["']([^"']+)["']([^>]*)>/gi;

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

  // Filter to only truly external URLs (not from this blog)
  const markdownMatches = allMarkdownMatches.filter(match => isExternalUrl(match[2]));
  const htmlMatches = allHtmlMatches.filter(match => isExternalUrl(match[1]));
  const totalMatches = markdownMatches.length + htmlMatches.length + youtubeMatches.length;

  if (totalMatches === 0) {
    console.log(`  No external images found`);
    return;
  }

  // Convert standalone .md files to directory-based posts (only if we have images to localize)
  if (basename !== 'index.md' && basename !== 'index.markdown') {
    const postName = path.basename(filepath, path.extname(filepath));
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

  // Now we can assume it's a directory-based post
  const postDir = path.dirname(filepath);
  const imagesDir = postDir;

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

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    imageCount++;

    if (dryRun) {
      const dryRunFilename = generateFilename(thumbnailUrl);
      console.log(`  Would download YouTube thumbnail: ${thumbnailUrl} → ${dryRunFilename}`);
      continue;
    }

    try {
      const localPath = await downloadImage(thumbnailUrl, imagesDir, downloadedImages);
      const relativePath = path.relative(postDir, localPath);

      // Add thumbnail attribute to the component
      const newTag = `<youtube-embed ${beforeAttrs}video-id="${videoId}"${afterAttrs} thumbnail="${relativePath}">`;
      modifiedContent = modifiedContent.replace(fullMatch, newTag);

      const stats = await fs.stat(localPath);
      console.log(`  ✓ Downloaded YouTube thumbnail: ${thumbnailUrl} → ${relativePath} (${formatBytes(stats.size)})`);

    } catch (err) {
      console.error(`  ✗ Failed to download YouTube thumbnail ${thumbnailUrl}: ${err.message}`);
    }
  }

  if (dryRun) {
    console.log(`  Found ${imageCount} external image(s) (dry run, no changes made)`);
    return;
  }

  if (modifiedContent !== content) {
    await fs.writeFile(filepath, modifiedContent, "utf8");
    console.log(`  Updated post with ${downloadedImages.size} localized image(s)`);
  }
}

/**
 * Generate a filename for an image URL
 * @param {string} imageUrl - URL of the image
 * @returns {string} Generated filename
 */
function generateFilename(imageUrl) {
  const hash = createHash('sha1').update(imageUrl).digest('hex').substring(0, 12);
  const ext = guessExtensionFromUrl(imageUrl) || 'jpg';
  return `${hash}.${ext}`;
}

/**
 * Download an image from a URL to a local directory
 * @param {string} imageUrl - URL of the image to download
 * @param {string} targetDir - Directory to save the image to
 * @param {Map} downloadedImages - Map tracking already-downloaded images
 * @returns {Promise<string>} Path to the downloaded image
 */
async function downloadImage(imageUrl, targetDir, downloadedImages) {
  // Check if we've already downloaded this image
  if (downloadedImages.has(imageUrl)) {
    return downloadedImages.get(imageUrl);
  }

  // Create the images directory if it doesn't exist
  await mkdirp(targetDir);

  // Generate filename based on SHA-1 hash of the URL
  const filename = generateFilename(imageUrl);
  const targetPath = path.join(targetDir, filename);

  // Download the image
  await downloadFile(imageUrl, targetPath);

  // Track this download
  downloadedImages.set(imageUrl, targetPath);

  return targetPath;
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

    const request = protocol.get(url, (response) => {
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
    request.setTimeout(30000, () => {
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
  const match = url.match(/\.(jpg|jpeg|png|gif|webp|svg)(?:\?|$)/i);
  return match ? match[1].toLowerCase() : null;
}

