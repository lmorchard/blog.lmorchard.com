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

export async function buildAllIndexes(postsIn, { showDrafts = false } = {}) {
  const root = config.buildPath;

  let posts = await filterOmitDrafts(postsIn, { showDrafts });

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
      await filterPostsToRemoveFullContent(posts),
      null,
      "  "
    ),
    "index.rss": templateRss({
      site: config.site,
      posts: await filterOmitFuturePosts(posts.slice(0, 15)),
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

async function buildIndex({ basePath, title, tag, template, posts }) {
  const fullText = tag && config.fulltextTagFeeds.includes(tag);
  await mkdirp(basePath);
  return writeFiles(basePath, {
    "index.json": JSON.stringify(
      filterPostsToRemoveFullContent(posts),
      null,
      "  "
    ),
    "index.rss": templateRss({
      site: config.site,
      posts: await filterOmitFuturePosts(posts.slice(0, 15)),
      tag,
      fullText,
    }),
    "index.html": template({
      site: config.site,
      posts,
      page: {
        title,
        tag,
      },
    }),
  });
}

// We don't want to include the full post body in the JSON index
async function filterPostsToRemoveFullContent(posts, maxPosts = 15) {
  return posts
    .slice(0, maxPosts)
    .map(({ html, body, ...postRemainder }) => postRemainder);
}

/**
 * Filter out posts with a date in the future
 * @param {Array} posts - Array of post objects with date information
 * @returns {Array} - Array of posts with dates not in the future
 */
async function filterOmitFuturePosts(posts) {
  const now = new Date();
  return posts.filter((post) => {
    const postDate = new Date(post.date);
    return postDate <= now;
  });
}

async function filterOmitDrafts(posts, { showDrafts = true } = {}) {
  return posts.filter((post) => showDrafts || !post.draft);
}
