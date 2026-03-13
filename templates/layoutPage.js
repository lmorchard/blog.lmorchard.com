import { html } from "../lib/html.js";

export default ({ site = {}, page = {}, head = "", js = "" }, content) => {
  const feedUrl = page.tag
    ? `${site.absolute_baseurl}/tag/${page.tag}/index.rss`
    : `${site.absolute_baseurl}/index.rss`;
  const feedTitle = page.tag
    ? `Tag: ${page.tag} - ${site.title}`
    : `${site.title}`;

  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${page.title} - ${site.title}</title>
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="${site.title}" />
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="author" content="${site.author.full_name}" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <link rel="webmention" href="https://webmention.io/lmorchard.com/webmention" />
        <link
          rel="shortcut icon"
          href="https://www.gravatar.com/avatar/b45c48fc9e05922e2f368a9d7d7d8de1?s=16"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="${site.baseurl}/index.css"
        />
        <script type="module" src="${site.baseurl}/index.js"></script>

        <link
          href="${feedUrl}"
          rel="alternate"
          title="${feedTitle}"
          type="application/rss+xml"
        />

        ${page.tag
          ? html`
              <link
                href="${site.baseurl}/tag/${page.tag}.rss"
                rel="alternate"
                title="Tag: ${page.tag} - ${site.title}"
                type="application/rss+xml"
              />
            `
          : html`
              <link
                href="${site.baseurl}/index.rss"
                rel="alternate"
                title="${site.title}"
                type="application/rss+xml"
              />
            `}
        ${head}
      </head>
      <body>
        <header>
          <div class="masthead">
            <img src="${site.avatar}" />
            <div class="title">
              <h1>
                <a href="${site.baseurl}/" title="${site.title}">${site.title}</a>
              </h1>
              <h2>
                <rotating-tagline
                  random
                  initial="1"
                  period="7000"
                  src="${site.baseurl}/taglines.json"
                >
                  <a href="${site.baseurl}/" title="${site.subtitle}">
                    <span class="tagline">${site.subtitle}</span>
                  </a>
                </rotating-tagline>
              </h2>
            </div>
          </div>
          <nav class="main-nav">
            <div class="main-nav-top">
              <div id="search"></div>
              <div class="theme-selector">
                <theme-selector title="Enable dark theme">
                  <label>
                    <input type="checkbox" />
                    <span class="slider"></span>
                  </label>
                </theme-selector>
              </div>
            </div>
            <ul>
              <li>
                <a href="http://lmorchard.com/"
                  ><span class="fa fa-info-circle"></span> about me</a
                >
              </li>
              <li>
                <a href="${site.baseurl}/archives.html"
                  ><span class="fa fa-archive"></span> archives</a
                >
              </li>
              <li>
                <a href="${feedUrl}" title="${feedTitle}"
                  ><span class="fa fa-rss"></span> feed</a
                >
              </li>
              ${site.pages && site.pages.map(p => html`
              <li>
                <a href="${site.baseurl}/${p.path}/"><span class="fa fa-file-text-o"></span> ${p.title.toLowerCase()}</a>
              </li>
              `)}
            </ul>
          </nav>
        </header>

        <section class="main">${content}</section>

        <footer class="content-grid">
          <div class="left">
            © 2002 - 2026 Les Orchard &lt;<a href="mailto:me@lmorchard.com"
              >me@lmorchard.com</a
            >&gt;
          </div>
          <img id="growup" src="${site.baseurl}/uploads/growup.jpg" />
          <nav class="right">
            <ul>
              <li>
                <a href="${feedUrl}" title="${feedTitle}"
                  ><span class="fa fa-rss"></span> feed</a
                >
              </li>
              ${site.pages && site.pages.map(p => html`
              <li>
                <a href="${site.baseurl}/${p.path}/"><span class="fa fa-file-text-o"></span> ${p.title.toLowerCase()}</a>
              </li>
              `)}
            </ul>
          </nav>
        </footer>
      </body>
    </html>
  `;
};
