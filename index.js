const util = require('util');
const mkdirp = require("mkdirp");
const rimraf = util.promisify(require("rimraf"));

const config = require("./config");
const { copyAssets } = require("./lib/assets");
const { loadAllPosts, buildAllPosts } = require("./lib/posts");
const { buildAllIndexes } = require("./lib/indexes");

async function main() {
  await rimraf(config.buildPath);
  await mkdirp(config.buildPath);
  await copyAssets();
  const posts = await loadAllPosts();
  await buildAllPosts(posts);
  await buildAllIndexes(posts);
}

main().catch((err) => console.error(err));
