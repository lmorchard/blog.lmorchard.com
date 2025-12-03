#!/usr/bin/env node
import util from "util";
import mkdirp from "mkdirp";
import rimrafOrig from "rimraf";
import { Command } from "commander";

import config from "./config.js";
import { copyAssets } from "./lib/assets.js";
import { loadAllPosts, buildAllPosts } from "./lib/posts.js";
import { buildAllIndexes } from "./lib/indexes.js";
import { localizeImages } from "./lib/localizeImages.js";
import { optimizePostImages } from "./lib/optimizeImages.js";
import { watchAndBuildPosts } from "./lib/incrementalBuild.js";
import { ditherImage } from "./lib/imageUtils.js";

const rimraf = util.promisify(rimrafOrig);

const program = new Command();
program.version("0.0.1");

async function main() {
  await program.parseAsync(process.argv);
}

program
  .command("clean")
  .description("clean up an existing build")
  .action(cleanBuild);

async function cleanBuild() {
  await rimraf(config.buildPath);
  await mkdirp(config.buildPath);
}

program
  .command("build")
  .description("clean and build all posts, indexes, and assets")
  .option("-c, --clean", "clean before building and copying assets")
  .option("--show-drafts", "show drafts in indexes")
  .option("--no-optimize", "skip image optimization (faster for local dev)")
  .action(buildAll);

async function buildAll(options) {
  if (options.clean) await cleanBuild();
  const optimize = options.optimize !== false;
  await copyAssets({ optimize });
  const posts = await loadAllPosts({ showDrafts: options.showDrafts });
  await buildAllPosts(posts, { optimize });
  await buildAllIndexes(posts, { showDrafts: options.showDrafts });
}

program
  .command("build-posts [globs...]")
  .description("build posts matching glob (or all posts if omitted)")
  .option("--show-drafts", "show drafts in indexes")
  .option("--no-optimize", "skip image optimization (faster for local dev)")
  .action(buildPosts);

async function buildPosts(postsGlob, options) {
  // Commander passes an empty array for [globs...] when no args provided
  // Treat empty array as undefined to load all posts
  const postGlobs = postsGlob && postsGlob.length > 0 ? postsGlob : undefined;
  const optimize = options.optimize !== false;
  const posts = await loadAllPosts({ postGlobs, showDrafts: options.showDrafts });
  await buildAllPosts(posts, { optimize });
  await buildAllIndexes(posts, { showDrafts: options.showDrafts });
}

program
  .command("build-indexes [globs...]")
  .description(
    "build indexes for posts matching glob (or all posts if omitted)"
  )
  .option("--show-drafts", "show drafts in indexes")
  .action(buildIndexes);

async function buildIndexes(postGlobs, options) {
  // Commander passes an empty array for [globs...] when no args provided
  // Treat empty array as undefined to load all posts
  const globs = postGlobs && postGlobs.length > 0 ? postGlobs : undefined;
  await buildAllIndexes(await loadAllPosts({ postGlobs: globs }), {
    showDrafts: options.showDrafts,
  });
}

program
  .command("build-assets [param]")
  .description("build shared assets like JS & CSS")
  .action(copyAssets);

program
  .command("localize-images [globs...]")
  .description("download external images and rewrite references to use local copies")
  .option("--dry-run", "show what would be done without making changes")
  .action(localizeImagesCommand);

async function localizeImagesCommand(postGlobs, options) {
  // Commander passes an empty array for [globs...] when no args provided
  // Treat empty array as undefined to process all posts
  const globs = postGlobs && postGlobs.length > 0 ? postGlobs : undefined;
  await localizeImages(globs, { dryRun: options.dryRun });
}

program
  .command("optimize-images [globs...]")
  .description("optimize existing images in blog posts")
  .action(optimizeImagesCommand);

async function optimizeImagesCommand(postGlobs, options) {
  // Commander passes an empty array for [globs...] when no args provided
  // Treat empty array as undefined to process all posts
  const globs = postGlobs && postGlobs.length > 0 ? postGlobs : undefined;
  await optimizePostImages(globs, options);
}

program
  .command("build-posts-watch")
  .description("watch for post changes and rebuild incrementally (fast!)")
  .option("--show-drafts", "show drafts in indexes")
  .option("--optimize", "enable image optimization (slower, default: disabled)")
  .action(buildPostsWatch);

async function buildPostsWatch(options) {
  await watchAndBuildPosts({
    optimize: options.optimize === true,
    showDrafts: options.showDrafts !== false, // Default to true for watch mode
  });
}

program
  .command("dither-images <files...>")
  .description("apply dithered/posterized effect to image files")
  .option("-o, --output <path>", "output path (only valid for single input file)")
  .option("-m, --max-width <pixels>", "maximum width before processing", "1024")
  .option("-d, --downscale <factor>", "downscale factor", "0.33")
  .option("-u, --upscale <factor>", "upscale factor", "3.0")
  .option("-c, --colors <bits>", "color bits for posterization", "5")
  .option("-l, --lofi", "extra lo-fi mode (more aggressive settings)")
  .action(ditherImagesCommand);

async function ditherImagesCommand(files, options) {
  if (files.length > 1 && options.output) {
    console.error("Error: --output option can only be used with a single input file");
    process.exit(1);
  }

  const mode = options.lofi ? " (EXTRA LO-FI)" : "";
  console.log(`Processing ${files.length} image(s) with dithered effect${mode}...`);

  const ditherOptions = {
    maxWidth: parseInt(options.maxWidth),
    downscale: parseFloat(options.downscale),
    upscale: parseFloat(options.upscale),
    colors: parseInt(options.colors),
    lofi: options.lofi || false,
    verbose: true
  };

  for (const file of files) {
    try {
      await ditherImage(file, options.output, ditherOptions);
    } catch (err) {
      console.error(`Failed to process ${file}: ${err.message}`);
    }
  }

  console.log("\n✓ Done!");
}

main().catch((err) => console.error(err));
