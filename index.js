#!/usr/bin/env node
const util = require("util");
const mkdirp = require("mkdirp");
const rimraf = util.promisify(require("rimraf"));

const config = require("./config");
const { copyAssets } = require("./lib/assets");
const { loadAllPosts, buildAllPosts } = require("./lib/posts");
const { buildAllIndexes } = require("./lib/indexes");

const { Command } = require("commander");

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
  .action(buildAll);

async function buildAll() {
  await cleanBuild();
  await copyAssets();
  const posts = await loadAllPosts();
  await buildAllPosts(posts);
  await buildAllIndexes(posts);
}

program
  .command("build-posts [globs...]")
  .description("build posts matching glob (or all posts if omitted)")
  .action(buildPosts);

async function buildPosts(postsGlob) {
  await buildAllPosts(await loadAllPosts(postsGlob));
}

program
  .command("build-indexes [globs...]")
  .description(
    "build indexes for posts matching glob (or all posts if omitted)"
  )
  .action(buildIndexes);

async function buildIndexes(postsGlob) {
  await buildAllIndexes(await loadAllPosts(postsGlob));
}

program
  .command("build-assets")
  .description("build shared assets like JS & CSS")
  .action(copyAssets);

main().catch((err) => console.error(err));
