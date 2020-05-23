const path = require("path");
const globby = require("globby");
const copy = require("recursive-copy");
const mkdirp = require("mkdirp");

const config = require("./config");
const {
  parseEntry,
  buildEntry,
  buildIndex,
  sortPosts,
} = require("./lib/entries");
const { indexBy } = require("./lib/utils");

async function main() {
  await mkdirp(config.buildPath);
  await copyAssets();
  const posts = await loadAllEntries();
  await buildAllEntries(posts);
  await buildAllIndexes(posts);
}

async function copyAssets() {
  for (const assetPath of config.assetPaths) {
    await copy(assetPath, config.buildPath, {
      overwrite: true,
    });
  }
}

async function loadAllEntries() {
  const posts = [];
  const files = globby.stream(`${config.postsPath}/**/*.{md,markdown}`);
  for await (const file of files) {
    posts.push(await parseEntry(file));
  }
  return sortPosts(posts);
}

async function buildAllEntries(posts) {
  for (const post of posts) {
    await buildEntry(post);
  }
}

async function buildAllIndexes(postsFull) {
  const root = config.buildPath;
  const posts = postsFull.map(post => post.attributes);
  
  const postsRecent = posts.slice(0, 20);
  await buildIndex({
    basePath: root,
    title: "Recent",
    template: "indexRecent",
    posts: postsRecent,
  });

  const postsByYear = indexBy(posts, ({ year }) => year);
  for (const [year, posts] of Object.entries(postsByYear)) {
    await buildIndex({
      basePath: path.join(root, year),
      title: year,
      template: "indexYear",
      posts,
    });
  }

  const postsByMonth = indexBy(posts, ({ year, month }) => `${year}/${month}`);
  for (const [month, posts] of Object.entries(postsByMonth)) {
    await buildIndex({
      basePath: path.join(root, month),
      title: month,
      template: "indexMonth",
      posts,
    });
  }

  const postsByTag = indexBy(posts, ({ tags = [] }) => tags);
  for (const [tag, posts] of Object.entries(postsByTag)) {
    await buildIndex({
      basePath: path.join(root, "tag", tag),
      title: tag,
      template: "indexTag",
      posts,
    });
  }
}

main().catch((err) => console.error(err));
