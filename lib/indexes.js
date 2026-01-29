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
import templateSitemap from "../templates/sitemap.js";
import templateSitemapIndex from "../templates/sitemapIndex.js";

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

  // Generate sitemaps
  const sitemapMetadata = [];
  sitemapMetadata.push(...await buildPostSitemapsByYear(posts));
  sitemapMetadata.push(await buildStaticPagesSitemap(posts));
  sitemapMetadata.push(await buildIndexPagesSitemap(posts));
  sitemapMetadata.push(await buildTagPagesSitemap(posts));
  await buildSitemapIndex(sitemapMetadata);
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

// ============================================================================
// Sitemap Generation Functions
// ============================================================================

/**
 * Find the most recent date from a list of posts
 * @param {Array} posts - Array of post objects
 * @returns {string} ISO 8601 formatted date string
 */
function findMostRecentDate(posts) {
  if (!posts || posts.length === 0) {
    return new Date().toISOString();
  }
  const mostRecent = posts.reduce((latest, post) => {
    const postDate = new Date(post.date);
    return postDate > latest ? postDate : latest;
  }, new Date(0));
  return mostRecent.toISOString();
}

/**
 * Determine changefreq based on post age
 * @param {object} post - Post object
 * @returns {string} changefreq value
 */
function getChangefreqForPost(post) {
  const currentYear = new Date().getFullYear();
  const postYear = parseInt(post.year);

  if (postYear === currentYear) {
    return "monthly";
  }
  return "never";
}

/**
 * Transform post objects into sitemap URL objects
 * @param {Array} posts - Array of post objects
 * @returns {Array} Array of sitemap URL objects
 */
function prepareSitemapUrlsFromPosts(posts) {
  return posts.map(post => ({
    loc: `${config.site.absolute_baseurl}/${post.path}/`,
    lastmod: new Date(post.date).toISOString(),
    changefreq: getChangefreqForPost(post),
    priority: 0.6
  }));
}

/**
 * Generate sitemap URLs for year and month index pages
 * @param {Array} posts - Array of post objects
 * @returns {Array} Array of sitemap URL objects
 */
function prepareSitemapUrlsFromIndexPages(posts) {
  const urls = [];

  // Group by year
  const postsByYear = indexBy(posts, ({ year }) => year);
  for (const [year, yearPosts] of Object.entries(postsByYear)) {
    const currentYear = new Date().getFullYear();
    const isCurrentYear = parseInt(year) === currentYear;

    urls.push({
      loc: `${config.site.absolute_baseurl}/${year}/`,
      lastmod: findMostRecentDate(yearPosts),
      changefreq: isCurrentYear ? "monthly" : "never",
      priority: 0.7
    });
  }

  // Group by month
  const postsByMonth = indexBy(posts, ({ year, month }) => `${year}/${month}`);
  for (const [month, monthPosts] of Object.entries(postsByMonth)) {
    const [year] = month.split('/');
    const currentYear = new Date().getFullYear();
    const isCurrentYear = parseInt(year) === currentYear;

    urls.push({
      loc: `${config.site.absolute_baseurl}/${month}/`,
      lastmod: findMostRecentDate(monthPosts),
      changefreq: isCurrentYear ? "monthly" : "never",
      priority: 0.7
    });
  }

  return urls;
}

/**
 * Generate sitemap URLs for tag pages
 * @param {Array} posts - Array of post objects
 * @returns {Array} Array of sitemap URL objects
 */
function prepareSitemapUrlsFromTagPages(posts) {
  const urls = [];
  const postsByTag = indexBy(posts, ({ tags = [] }) => tags);

  for (const [tag, tagPosts] of Object.entries(postsByTag)) {
    urls.push({
      loc: `${config.site.absolute_baseurl}/tag/${tag}/`,
      lastmod: findMostRecentDate(tagPosts),
      changefreq: "weekly",
      priority: 0.5
    });
  }

  return urls;
}

/**
 * Generate sitemap URLs for static pages
 * @param {Array} posts - Array of post objects
 * @returns {Array} Array of sitemap URL objects
 */
function prepareSitemapUrlsFromStaticPages(posts) {
  const mostRecentDate = findMostRecentDate(posts);

  return [
    {
      loc: `${config.site.absolute_baseurl}/`,
      lastmod: mostRecentDate,
      changefreq: "daily",
      priority: 1.0
    },
    {
      loc: `${config.site.absolute_baseurl}/all.html`,
      lastmod: mostRecentDate,
      changefreq: "weekly",
      priority: 0.8
    },
    {
      loc: `${config.site.absolute_baseurl}/archives.html`,
      lastmod: mostRecentDate,
      changefreq: "weekly",
      priority: 0.8
    }
  ];
}

/**
 * Build post sitemaps grouped by year
 * @param {Array} posts - Array of post objects
 * @returns {Array} Array of sitemap metadata objects
 */
async function buildPostSitemapsByYear(posts) {
  const sitemaps = [];
  const postsByYear = indexBy(posts, ({ year }) => year);

  for (const [year, yearPosts] of Object.entries(postsByYear)) {
    const urls = prepareSitemapUrlsFromPosts(yearPosts);
    const filename = `sitemap-posts-${year}.xml`;

    await writeFiles(config.buildPath, {
      [filename]: templateSitemap({
        site: config.site,
        urls
      })
    });

    sitemaps.push({
      filename,
      lastmod: findMostRecentDate(yearPosts)
    });
  }

  return sitemaps;
}

/**
 * Build sitemap for static pages
 * @param {Array} posts - Array of post objects
 * @returns {object} Sitemap metadata object
 */
async function buildStaticPagesSitemap(posts) {
  const urls = prepareSitemapUrlsFromStaticPages(posts);
  const filename = "sitemap-pages.xml";

  await writeFiles(config.buildPath, {
    [filename]: templateSitemap({
      site: config.site,
      urls
    })
  });

  return {
    filename,
    lastmod: findMostRecentDate(posts)
  };
}

/**
 * Build sitemap for year and month index pages
 * @param {Array} posts - Array of post objects
 * @returns {object} Sitemap metadata object
 */
async function buildIndexPagesSitemap(posts) {
  const urls = prepareSitemapUrlsFromIndexPages(posts);
  const filename = "sitemap-indexes.xml";

  await writeFiles(config.buildPath, {
    [filename]: templateSitemap({
      site: config.site,
      urls
    })
  });

  return {
    filename,
    lastmod: findMostRecentDate(posts)
  };
}

/**
 * Build sitemap for tag pages
 * @param {Array} posts - Array of post objects
 * @returns {object} Sitemap metadata object
 */
async function buildTagPagesSitemap(posts) {
  const urls = prepareSitemapUrlsFromTagPages(posts);
  const filename = "sitemap-tags.xml";

  await writeFiles(config.buildPath, {
    [filename]: templateSitemap({
      site: config.site,
      urls
    })
  });

  return {
    filename,
    lastmod: findMostRecentDate(posts)
  };
}

/**
 * Build the main sitemap index
 * @param {Array} sitemapMetadata - Array of sitemap metadata objects
 */
async function buildSitemapIndex(sitemapMetadata) {
  const sitemaps = sitemapMetadata.map(sm => ({
    loc: `${config.site.absolute_baseurl}/${sm.filename}`,
    lastmod: sm.lastmod
  }));

  await writeFiles(config.buildPath, {
    "sitemap.xml": templateSitemapIndex({
      site: config.site,
      sitemaps
    })
  });
}
