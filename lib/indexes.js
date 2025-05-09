import path from "path";
import mkdirp from "mkdirp";

import config from "../config.js";
import { writeFiles } from "./files.js";
import { indexBy } from "./utils.js";

import templateIndexRecent from "../templates/indexRecent.js";
import templateIndexAll from "../templates/indexAll.js";
import templateArchives from "../templates/archives.js";
import templateRss from "../templates/rss.js";
import templateIndexYear from "../templates/indexYear.js";
import templateIndexMonth from "../templates/indexMonth.js";
import templateIndexTag from "../templates/indexTag.js";

async function buildIndex({ basePath, title, tag, template, posts }) {
  const fullText = tag && config.fulltextTagFeeds.includes(tag);
  await mkdirp(basePath);
  return writeFiles(basePath, {
    "index.json": JSON.stringify(posts, null, "  "),
    "index.rss": templateRss({
      site: config.site,
      posts: posts.slice(0, 15),
      tag,
      fullText,
    }),
    "index.html": template({
      site: config.site,
      page: {
        title,
      },
      posts,
    }),
  });
}

// We don't want to include the full post body in the JSON index
async function filterRecentPostsForJSON(posts, maxPosts = 15) {
  return posts
    .slice(0, maxPosts)
    .map(({ html, body, ...postRemainder }) => postRemainder);
}

export async function buildAllIndexes(posts) {
  const root = config.buildPath;

  await writeFiles(root, {
    // HACK: github pages needs this to skip jekyll builds
    ".nojekyll": "nojekyll",
    "index.html": templateIndexRecent({
      site: config.site,
      page: {
        title: "Home",
      },
      posts: posts.slice(0, 31),
    }),
    "index.json": JSON.stringify(
      await filterRecentPostsForJSON(posts),
      null,
      "  "
    ),
    "index.rss": templateRss({
      site: config.site,
      posts: posts.slice(0, 15),
    }),
    "all.html": templateIndexAll({
      site: config.site,
      page: {
        title: "All Posts",
      },
      posts,
    }),
    "archives.html": templateArchives({
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
      template: templateIndexYear,
      posts: posts.slice(0, 1000),
    });
  }

  const postsByMonth = indexBy(posts, ({ year, month }) => `${year}/${month}`);
  for (const [month, posts] of Object.entries(postsByMonth)) {
    await buildIndex({
      basePath: path.join(root, month),
      title: month,
      template: templateIndexMonth,
      posts: posts.slice(0, 1000),
    });
  }

  const postsByTag = indexBy(posts, ({ tags = [] }) => tags);
  for (const [tag, posts] of Object.entries(postsByTag)) {
    await buildIndex({
      basePath: path.join(root, "tag", tag),
      title: tag,
      template: templateIndexTag,
      posts: posts.slice(0, 1000),
      tag,
    });
  }
}
