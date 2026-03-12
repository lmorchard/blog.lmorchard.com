import path from "path";
import chokidar from "chokidar";
import globby from "globby";
import moment from "moment";

import config from "../config.js";
import { fs } from "./files.js";
import { loadPostFile, buildPost, sortPosts, linkPosts } from "./posts.js";
import { buildAllIndexes, buildSelectiveIndexes } from "./indexes.js";
import { loadAllPages, buildAllPages } from "./pages.js";

/**
 * Load cached post metadata from build directory
 * Much faster than re-parsing all markdown files
 * @returns {Promise<Array>} Array of post objects with metadata
 */
async function loadCachedPostMetadata() {
  // Only load post JSON files (format: build/YYYY/MM/DD/slug/index.json)
  // Exclude index pages at year/month levels
  const jsonFiles = await globby(`${config.buildPath}/*/*/*/*/index.json`);

  const posts = [];
  for (const jsonFile of jsonFiles) {
    try {
      const data = await fs.readFile(jsonFile, "utf8");
      const post = JSON.parse(data);

      // Re-hydrate moment date object from JSON string
      if (post.date) {
        post.date = moment.parseZone(post.date);
      }

      posts.push(post);
    } catch (err) {
      console.warn(`  ⚠ Failed to load cached metadata from ${jsonFile}`);
    }
  }

  return posts;
}

/**
 * Check if index-relevant metadata changed between two versions of a post.
 * Uses serialized comparisons to avoid object reference issues (e.g. moment dates).
 */
function didMetadataChange(oldPost, newPost) {
  const fields = ["title", "slug", "summary", "thumbnail", "type", "draft"];
  for (const field of fields) {
    if (oldPost[field] !== newPost[field]) return true;
  }

  // Date: compare as ISO strings since moment objects don't compare with ===
  const oldDate = oldPost.date?.toISOString?.() ?? String(oldPost.date ?? "");
  const newDate = newPost.date?.toISOString?.() ?? String(newPost.date ?? "");
  if (oldDate !== newDate) return true;

  // Tags: order-insensitive comparison
  const oldTags = [...(oldPost.tags || [])].sort().join("\0");
  const newTags = [...(newPost.tags || [])].sort().join("\0");
  if (oldTags !== newTags) return true;

  return false;
}

/**
 * Build only the changed posts and update indexes incrementally
 * @param {Array<string>} changedFiles - Paths to changed files
 * @param {object} options - Build options
 * @returns {Promise<void>}
 */
export async function buildChangedPosts(changedFiles, options = {}) {
  const { optimize = false, showDrafts = false } = options;

  console.log(`\n🔄 Incremental build for ${changedFiles.length} changed file(s)...`);

  // Load cached post metadata (fast!)
  let posts = await loadCachedPostMetadata();

  if (posts.length === 0) {
    console.log("  No cached metadata found - this appears to be first build");
    console.log("  Please run a full build first: npm run build");
    return;
  }

  // Collect updated posts alongside their old versions for the backdate check
  const updatedEntries = []; // { post, oldPost }

  // Parse all changed files and update the posts array (don't build yet —
  // we need to sort and link first so prev/next links are correct)
  for (const changedFile of changedFiles) {
    try {
      console.log(`  Processing: ${changedFile}`);

      const newPosts = await loadPostFile(changedFile);

      if (!newPosts || newPosts.length === 0) {
        console.log(`    Skipped (not a valid post file)`);
        continue;
      }

      for (const newPost of newPosts) {
        const existingIndex = posts.findIndex(p => p.postName === newPost.postName);
        // Capture old post BEFORE overwriting, for the metadata diff below
        const oldPost = existingIndex >= 0 ? posts[existingIndex] : null;

        if (existingIndex >= 0) {
          posts[existingIndex] = newPost;
          console.log(`    Updated: ${newPost.title || newPost.postName}`);
        } else {
          posts.push(newPost);
          console.log(`    Added: ${newPost.title || newPost.postName}`);
        }

        updatedEntries.push({ post: newPost, oldPost });
      }
    } catch (err) {
      console.error(`  ✗ Failed to process ${changedFile}: ${err.message}`);
    }
  }

  if (updatedEntries.length === 0) {
    console.log("  No posts were updated");
    return;
  }

  // Sort and link BEFORE building so each post gets correct prev/next links
  await sortPosts(posts);
  await linkPosts(posts);

  // Now build all changed posts with correct prev/next links
  for (const { post } of updatedEntries) {
    await buildPost(post, { optimize });
  }

  // Backdate check: if only post bodies changed (no index-relevant metadata
  // changed across any of the updated posts), skip index rebuild entirely
  const anyMetadataChanged = updatedEntries.some(
    ({ post, oldPost }) => !oldPost || didMetadataChange(oldPost, post)
  );

  if (!anyMetadataChanged) {
    console.log(`  Body-only change — skipping index rebuild`);
    console.log(`✓ Incremental build complete (${updatedEntries.length} post(s) updated)\n`);
    return;
  }

  // Compute the union of affected indexes across all changed posts
  const affectedYears = new Set();
  const affectedMonths = new Set();
  const affectedTags = new Set();

  for (const { post, oldPost } of updatedEntries) {
    affectedYears.add(post.year);
    affectedMonths.add(`${post.year}/${post.month}`);
    for (const tag of post.tags || []) affectedTags.add(tag);
    // Include old year/month/tags in case they changed (need to update those indexes too)
    if (oldPost) {
      affectedYears.add(oldPost.year);
      affectedMonths.add(`${oldPost.year}/${oldPost.month}`);
      for (const tag of oldPost.tags || []) affectedTags.add(tag);
    }
  }

  console.log(`  Metadata changed — rebuilding affected indexes...`);
  await buildSelectiveIndexes(
    posts,
    { years: affectedYears, months: affectedMonths, tags: affectedTags },
    { showDrafts }
  );

  console.log(`✓ Incremental build complete (${updatedEntries.length} post(s) updated)\n`);
}

/**
 * Watch for file changes and rebuild incrementally
 * @param {object} options - Watch options
 * @returns {Promise<void>}
 */
export async function watchAndBuildPosts(options = {}) {
  const { optimize = false, showDrafts = true } = options;

  // Load pages once at startup so nav links are available
  await loadAllPages();

  const watchPaths = [
    `${config.postsPath}/**/*.{md,markdown}`,
    `${config.postsPath}/**/*.{jpg,jpeg,png,gif,webp}`,
    `${config.pagesPath}/**/*.md`,
  ];

  console.log("👀 Watching for changes...");
  console.log(`   Posts: ${config.postsPath}`);
  console.log(`   Pages: ${config.pagesPath}`);
  console.log(`   Optimization: ${optimize ? 'enabled' : 'disabled'}`);
  console.log(`   Drafts: ${showDrafts ? 'shown' : 'hidden'}`);
  console.log("\nPress Ctrl+C to stop\n");

  const watcher = chokidar.watch(watchPaths, {
    ignored: [
      `${config.postsPath}/**/{_*,node_modules,build,tmp}/**`,
      `${config.postsPath}/**/*.sync-conflict-*`,
      '**/.DS_Store',
    ],
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 500,
      pollInterval: 100,
    },
  });

  // Debounce multiple changes
  let changeTimeout;
  let changedFiles = new Set();

  const processChanges = async () => {
    if (changedFiles.size === 0) return;

    const filesToProcess = Array.from(changedFiles);
    changedFiles.clear();

    // Separate page files from post files
    const pagesPrefix = path.resolve(config.pagesPath);
    const isPageFile = (f) => path.resolve(f).startsWith(pagesPrefix);
    const pageFiles = filesToProcess.filter(isPageFile);
    const postFiles = filesToProcess.filter(f =>
      /\.(md|markdown)$/i.test(f) && !isPageFile(f)
    );

    if (pageFiles.length > 0) {
      console.log(`  📄 Rebuilding pages...`);
      const pages = await loadAllPages();
      await buildAllPages(pages);
    }

    if (postFiles.length > 0) {
      await buildChangedPosts(postFiles, { optimize, showDrafts });
    }
  };

  const scheduleRebuild = (filepath) => {
    changedFiles.add(filepath);

    clearTimeout(changeTimeout);
    changeTimeout = setTimeout(processChanges, 300);
  };

  watcher
    .on('ready', () => {
      console.log(`  ✓ Watcher ready and monitoring files\n`);
    })
    .on('add', (filepath) => {
      console.log(`  📄 File added: ${filepath}`);
      scheduleRebuild(filepath);
    })
    .on('change', (filepath) => {
      console.log(`  ✏️  File changed: ${filepath}`);
      scheduleRebuild(filepath);
    })
    .on('unlink', async (filepath) => {
      console.log(`\n🗑️  File deleted: ${filepath}`);
      console.log("  Note: Run a full build to clean up removed posts\n");
    })
    .on('error', (error) => {
      console.error(`❌ Watcher error: ${error}`);
    });

  // Keep the process running
  return new Promise(() => {});
}
