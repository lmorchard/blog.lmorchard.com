#!/usr/bin/env node
import util from "util";
import mkdirp from "mkdirp";
import rimrafOrig from "rimraf";
import { Command } from "commander";

import config from "./config.js";
import { copyAssets } from "./lib/assets.js";
import { loadAllPosts, buildAllPosts } from "./lib/posts.js";
import { buildAllIndexes } from "./lib/indexes.js";

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
  .action(buildAll);

async function buildAll(options) {
  if (options.clean) await cleanBuild();
  await copyAssets();
  const posts = await loadAllPosts({ showDrafts: options.showDrafts });
  await buildAllPosts(posts);
  await buildAllIndexes(posts, { showDrafts: options.showDrafts });
}

program
  .command("build-posts [globs...]")
  .description("build posts matching glob (or all posts if omitted)")
  .option("--show-drafts", "show drafts in indexes")
  .action(buildPosts);

async function buildPosts(postsGlob, options) {
  const posts = await loadAllPosts({ postGlobs: postsGlob, showDrafts: options.showDrafts });
  await buildAllPosts(posts);
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
  await buildAllIndexes(await loadAllPosts({ postGlobs }), {
    showDrafts: options.showDrafts,
  });
}

program
  .command("build-assets [param]")
  .description("build shared assets like JS & CSS")
  .action(copyAssets);

main().catch((err) => console.error(err));
