import { unescaped } from "./html.js";

// Drop keys whose value is empty/undefined/null or an empty array,
// so we never emit null/empty fields.
const compact = (obj) => {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out;
};

export const websiteNode = (site) =>
  compact({
    "@type": "WebSite",
    "@id": `${site.absolute_baseurl}/#website`,
    name: site.title,
    url: site.absolute_baseurl,
    description: site.subtitle,
    publisher: { "@id": `${site.absolute_baseurl}/#person` },
  });

export const personNode = (site) => {
  const a = site.author || {};
  return compact({
    "@type": "Person",
    "@id": `${site.absolute_baseurl}/#person`,
    name: a.full_name,
    url: a.url,
    image: site.avatar,
    jobTitle: a.job_title,
    description: a.description,
    sameAs: a.sameAs,
  });
};

export const blogPostingNode = (site, page) => {
  // Mirror the og:image logic in templates/post.js: prepend the absolute
  // baseurl only when the thumbnail is a site-root-relative path.
  const image = page.thumbnail
    ? page.thumbnail.indexOf("/") === 0
      ? `${site.absolute_baseurl}${page.thumbnail}`
      : page.thumbnail
    : undefined;

  // page.date is a moment object (lib/posts.js); new Date(...).toISOString() is
  // the same conversion used for the sitemap (lib/indexes.js).
  const published = page.date ? new Date(page.date).toISOString() : undefined;
  const modifiedSrc = page.modified || page.date;
  const modified = modifiedSrc ? new Date(modifiedSrc).toISOString() : undefined;

  return compact({
    "@type": "BlogPosting",
    "@id": `${site.absolute_baseurl}/${page.path}/#article`,
    mainEntityOfPage: `${site.absolute_baseurl}/${page.path}/`,
    headline: page.title,
    description: page.summary,
    image,
    datePublished: published,
    dateModified: modified,
    keywords: page.tags,
    author: { "@id": `${site.absolute_baseurl}/#person` },
    publisher: { "@id": `${site.absolute_baseurl}/#person` },
    isPartOf: { "@id": `${site.absolute_baseurl}/#website` },
  });
};

// Returns an unescaped html fragment function (same shape as html.js helpers),
// so it can be interpolated directly into the `html` template in layoutPage.
export const renderJsonLd = (nodes) => {
  const graph = { "@context": "https://schema.org", "@graph": nodes };
  // Emit raw JSON (NOT via htmlValue, which would &quot;-escape and corrupt it).
  // Escape every "<" to < to stay valid JSON while preventing a </script> breakout.
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return unescaped(`<script type="application/ld+json">${json}</script>`);
};
