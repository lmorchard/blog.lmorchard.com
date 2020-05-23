const path = require("path");
const util = require('util');
const copy = require("recursive-copy");
const mkdirp = require("mkdirp");
const rimraf = util.promisify(require("rimraf"));

const config = require("./config");
const { writeFiles } = require("./lib/files");
const { loadAllPosts, buildAllPosts, buildIndex } = require("./lib/posts");
const { indexBy } = require("./lib/utils");

async function main() {
  await rimraf(config.buildPath);
  await mkdirp(config.buildPath);
  await copyAssets();
  const posts = await loadAllPosts();
  await buildAllPosts(posts);
  await buildAllIndexes(posts);
}

async function copyAssets() {
  for (const assetPath of config.assetPaths) {
    await copy(assetPath, config.buildPath, {
      overwrite: true,
    });
  }
}

async function buildAllIndexes(postsFull) {
  const root = config.buildPath;
  const posts = postsFull.map((post) => post.attributes);

  await writeFiles(root, {
    "index.html": require(`./templates/indexRecent`)({
      site: config.site,
      page: {
        title: "Home",
      },
      posts: posts.slice(0, 20),
    })(),
    "all.html": require(`./templates/indexAll`)({
      site: config.site,
      page: {
        title: "All Posts",
      },
      posts,
    })(),
    "archives.html": require(`./templates/archives`)({
      site: config.site,
      page: {
        title: "Archives",
      },
      posts,
    })(),
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
