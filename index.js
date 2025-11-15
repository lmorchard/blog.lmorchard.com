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

main().catch((err) => console.error(err));
