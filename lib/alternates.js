/**
 * Alternate representations of a page, rendered by layoutPage as
 * <link rel="alternate"> tags for feed readers, tools, and crawlers.
 *
 * Every post directory ships index.md and index.json next to index.html; every
 * generated index directory ships index.json plus full-text and excerpt RSS.
 * These helpers describe those siblings.
 *
 * Kept out of layoutPage on purpose: the layout can't tell a post apart from a
 * static page (both just have a `path`), and only posts have the extra files.
 */

const MARKDOWN_TYPE = "text/markdown";
const JSON_TYPE = "application/json";
const RSS_TYPE = "application/rss+xml";

/**
 * Join baseurl and a site-relative directory path, tolerating empty values.
 * baseurl is "" in local builds, and the root index has no directory at all.
 */
const dirUrl = (site, dirPath = "") =>
  dirPath ? `${site.baseurl}/${dirPath}` : `${site.baseurl}`;

/**
 * Full-text and excerpt RSS feeds written into a given directory.
 * @param {object} site - Site config
 * @param {string} dirPath - Site-relative directory ("" for the site root)
 * @param {string} title - Human label for the feed's scope
 */
function feedAlternates(site, dirPath, title) {
  const base = dirUrl(site, dirPath);
  return [
    { href: `${base}/index.rss`, type: RSS_TYPE, title },
    {
      href: `${base}/index-excerpts.rss`,
      type: RSS_TYPE,
      title: `${title} (excerpts)`,
    },
  ];
}

/**
 * The site-wide feeds, advertised on every page.
 * @param {object} site - Site config
 */
export function siteFeedAlternates(site) {
  return feedAlternates(site, "", site.title);
}

/**
 * The scoped feeds written into a generated index directory. Every year, month,
 * and tag index ships its own pair alongside index.json.
 * @param {object} site - Site config
 * @param {object} page - Index page object (needs `title`, `indexPath`, and
 *   `indexLabel` — the scope label for feed titles, e.g. "Year", "Tag")
 */
export function indexFeedAlternates(site, page) {
  return feedAlternates(site, page.indexPath, indexFeedTitle(site, page));
}

const indexFeedTitle = (site, page) =>
  `${page.indexLabel}: ${page.title} - ${site.title}`;

/**
 * The most specific feed for a page, for visible "subscribe here" links: the
 * year/month/tag feed on a scoped index, otherwise the site feed.
 *
 * Uses absolute URLs — unlike the <link rel="alternate"> hrefs — because this
 * one is meant to be copied out of the page and pasted into a reader.
 * @param {object} site - Site config
 * @param {object} page - Any page object
 */
export function primaryFeed(site, page) {
  const scoped = page.indexPath && page.indexLabel;
  return {
    href: scoped
      ? `${site.absolute_baseurl}/${page.indexPath}/index.rss`
      : `${site.absolute_baseurl}/index.rss`,
    title: scoped ? indexFeedTitle(site, page) : `${site.title}`,
  };
}

/**
 * Markdown source and JSON metadata for a single post.
 * @param {object} site - Site config
 * @param {object} page - Post object (needs `path` and `title`)
 */
export function postAlternates(site, page) {
  const base = dirUrl(site, page.path);
  return [
    {
      href: `${base}/index.md`,
      type: MARKDOWN_TYPE,
      title: `${page.title} (Markdown)`,
    },
    {
      href: `${base}/index.json`,
      type: JSON_TYPE,
      title: `${page.title} (JSON)`,
    },
  ];
}

/**
 * JSON post list for a generated index page.
 * @param {object} site - Site config
 * @param {object} page - Index page object (needs `title`, and `indexPath`
 *   relative to the site root — "" for the root index)
 */
export function indexAlternates(site, page) {
  return [
    {
      href: `${dirUrl(site, page.indexPath)}/index.json`,
      type: JSON_TYPE,
      title: `${page.title} (JSON)`,
    },
  ];
}
