import path from "path";
import chokidar from "chokidar";
import globby from "globby";
import moment from "moment";

import config from "../config.js";
import { fs } from "./files.js";
import { loadPostFile, buildPost, sortPosts, linkPosts } from "./posts.js";
import { buildAllIndexes } from "./indexes.js";

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

  // Track which posts were updated
  const updatedPostPaths = new Set();

  // Process each changed file
  for (const changedFile of changedFiles) {
    try {
      console.log(`  Processing: ${changedFile}`);

      // Parse the changed post
      const updatedPosts = await loadPostFile(changedFile);

      if (!updatedPosts || updatedPosts.length === 0) {
        console.log(`    Skipped (not a valid post file)`);
        continue;
      }

      // Update each post from the file (could be multipart)
      for (const updatedPost of updatedPosts) {
        // Find and replace existing post or add new one
        const existingIndex = posts.findIndex(p => p.postName === updatedPost.postName);

        if (existingIndex >= 0) {
          posts[existingIndex] = updatedPost;
          console.log(`    Updated: ${updatedPost.title || updatedPost.postName}`);
        } else {
          posts.push(updatedPost);
          console.log(`    Added: ${updatedPost.title || updatedPost.postName}`);
        }

        // Build this specific post
        await buildPost(updatedPost, { optimize });
        updatedPostPaths.add(updatedPost.path);
      }
    } catch (err) {
      console.error(`  ✗ Failed to process ${changedFile}: ${err.message}`);
    }
  }

  if (updatedPostPaths.size === 0) {
    console.log("  No posts were updated");
    return;
  }

  // Re-sort and re-link all posts (in case dates changed)
  await sortPosts(posts);
  await linkPosts(posts);

  // Rebuild indexes with updated collection
  console.log(`  Rebuilding indexes...`);

  // Debug: Check if all posts have valid dates
  const postsWithoutDates = posts.filter(p => !p.date || !p.date.format);
  if (postsWithoutDates.length > 0) {
    console.warn(`  ⚠ Warning: ${postsWithoutDates.length} post(s) missing valid date objects:`);
    postsWithoutDates.slice(0, 5).forEach(p => {
      console.warn(`    - ${p.title || p.postName}: date=${p.date}`);
    });
  }

  await buildAllIndexes(posts, { showDrafts });

  console.log(`✓ Incremental build complete (${updatedPostPaths.size} post(s) updated)\n`);
}

/**
 * Watch for file changes and rebuild incrementally
 * @param {object} options - Watch options
 * @returns {Promise<void>}
 */
export async function watchAndBuildPosts(options = {}) {
  const { optimize = false, showDrafts = true } = options;

  const watchPaths = [
    `${config.postsPath}/**/*.{md,markdown}`,
    `${config.postsPath}/**/*.{jpg,jpeg,png,gif,webp}`,
  ];

  console.log("👀 Watching for changes...");
  console.log(`   Posts: ${config.postsPath}`);
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

    // Only process markdown files for rebuilding
    const postFiles = filesToProcess.filter(f => /\.(md|markdown)$/i.test(f));

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
