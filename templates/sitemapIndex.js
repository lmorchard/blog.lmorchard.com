import { html } from "../lib/html.js";

/**
 * Generate a sitemap index XML file
 * https://www.sitemaps.org/protocol.html
 *
 * @param {object} site - Site configuration
 * @param {Array} sitemaps - Array of sitemap objects with loc and lastmod
 */
export default ({ site = {}, sitemaps = [] }) => html`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(
  (sitemap) => html`  <sitemap>
    <loc>${sitemap.loc}</loc>${
      sitemap.lastmod
        ? html`
    <lastmod>${sitemap.lastmod}</lastmod>`
        : ""
    }
  </sitemap>
`
)}
</sitemapindex>`;
