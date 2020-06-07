const path = require("path");
const mkdirp = require("mkdirp");

const config = require("../config");
const { writeFiles } = require("./files");
const { indexBy } = require("./utils");

async function buildIndex({ basePath, title, tag, template, posts }) {
  const fullText = tag && config.fulltextTagFeeds.includes(tag);
  await mkdirp(basePath);
  return writeFiles(basePath, {
    "index.json": JSON.stringify(posts, null, "  "),
    "index.rss": require(`../templates/rss`)({
      site: config.site,
      posts: posts.slice(0, 15),
      tag,
      fullText,
    }),
    "index.html": require(`../templates/${template}`)({
      site: config.site,
      page: {
        title,
      },
      posts,
    }),
  });
}

async function buildAllIndexes(posts) {
  const root = config.buildPath;

  await writeFiles(root, {
    // HACK: github pages needs this to skip jekyll builds
    ".nojekyll": "nojekyll",
    "index.html": require(`../templates/indexRecent`)({
      site: config.site,
      page: {
        title: "Home",
      },
      posts: posts.slice(0, 20),
    }),
    "index.json": JSON.stringify(posts.slice(0, 20), null, "  "),
    "index.rss": require(`../templates/rss`)({
      site: config.site,
      posts: posts.slice(0, 15),
    }),
    "all.html": require(`../templates/indexAll`)({
      site: config.site,
      page: {
        title: "All Posts",
      },
      posts,
    }),
    "archives.html": require(`../templates/archives`)({
      site: config.site,
      page: {
        title: "Archives",
      },
      posts,
    }),
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
      tag,
    });
  }
}

module.exports = {
  buildAllIndexes  
};