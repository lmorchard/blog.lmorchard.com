const { html, unescaped } = require("../lib/html");

module.exports = (
  { site = {}, page = {}, head = "", js = "" },
  content
) => html`
  <!DOCTYPE html>
  <html lang="en-us">
    <head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />
      <meta
        name="microtip"
        content="1Ad1VPQBBk7WhyJPfB6cAgZoBs3gUngurN"
        data-currency="btc"
      />
      ${["screen.css", "vendor/font-awesome.css", "vendor/prism.css"].map(
        (css) => html`
          <link
            rel="stylesheet"
            href="${site.baseurl}/css/${css}"
            type="text/css"
            media="screen, projection"
          />
        `
      )}

      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <meta name="author" content="${site.author.full_name}" />

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

      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="${site.title}" />

      <title>${page.title} - ${site.title}</title>

      ${head}
    </head>
    <body>
      <section class="main">
        <header>
          <h1><a href="${site.baseurl}/">${site.title}</a></h1>
          <h2>${site.subtitle}</h2>
          <nav>
            <label for="nav-trigger"></label>
            <input type="checkbox" id="nav-trigger" class="nav-trigger" />

            <ul>
              <li><a href="http://lmorchard.com/">about me</a></li>
              <li><a href="${site.baseurl}/archives.html">archives</a></li>
            </ul>
          </nav>
        </header>

        <section class="content">
          ${content}
        </section>

        <footer>
          <img id="growup" src="${site.baseurl}/uploads/growup.jpg" />
        </footer>
      </section>

      <section id="javascript">
        <script src="${site.baseurl}/js/main.js"></script>
        ${js}
      </section>
    </body>
  </html>
`;
