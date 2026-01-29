import { html } from "../lib/html.js";

/**
 * Generate an XML sitemap following the sitemap protocol
 * https://www.sitemaps.org/protocol.html
 *
 * @param {object} site - Site configuration
 * @param {Array} urls - Array of URL objects with loc, lastmod, changefreq, priority
 */
export default ({ site = {}, urls = [] }) => html`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(
  (url) => html`  <url>
    <loc>${url.loc}</loc>${
      url.lastmod
        ? html`
    <lastmod>${url.lastmod}</lastmod>`
        : ""
    }${
      url.changefreq
        ? html`
    <changefreq>${url.changefreq}</changefreq>`
        : ""
    }${
      url.priority !== undefined
        ? html`
    <priority>${url.priority}</priority>`
        : ""
    }
  </url>
`
)}
</urlset>`;
