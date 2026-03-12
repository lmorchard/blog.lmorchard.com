import { html, unescaped } from "../lib/html.js";
import layoutPage from "./layoutPage.js";

export default ({ site = {}, page = {} }, content) =>
  layoutPage(
    {
      site,
      page,
      head: html`
        ${page.title &&
        html`<meta property="og:title" content="${page.title}" />`}
        <meta
          property="og:url"
          content="${site.absolute_baseurl}/${page.path}/"
        />
        ${page.summary &&
        html`<meta property="og:description" content="${page.summary}" />`}
      `,
    },
    html`
      <article data-pagefind-body class="content content-grid page">
        ${page.title && html`<header><h1 class="title">${unescaped(page.title)}</h1></header>`}
        ${unescaped(content)}
      </article>
    `
  );
