import { html } from "../lib/html.js";

export default ({ site = {}, page = {}, head = "", js = "" }, content) => html`
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
      <link
        rel="shortcut icon"
        href="https://www.gravatar.com/avatar/b45c48fc9e05922e2f368a9d7d7d8de1?s=16"
      />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/base16/dracula.css"
      />

      <!-- TODO: decide on a font and pull this stuff locally -->
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <!-- https://fonts.google.com/specimen/Bitter/about -->
      <link
        href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />

      <link
        rel="stylesheet"
        type="text/css"
        href="${site.baseurl}/css/vendor/font-awesome.css"
      />
      <link rel="stylesheet" type="text/css" href="${site.baseurl}/index.css" />

      <script
        defer
        data-domain="blog.lmorchard.com"
        src="https://analytics.lmorchard.com/js/plausible.js"
      ></script>
      <script type="module" src="${site.baseurl}/index.js"></script>

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
      <header class="content-grid">
        <div class="masthead">
          <img
            src="https://www.gravatar.com/avatar/b45c48fc9e05922e2f368a9d7d7d8de1.jpg?s=64"
          />
          <div class="title">
            <h1><a href="${site.baseurl}/">${site.title}</a></h1>
            <h2>Befuddlement through meandering</h2>
            <!--<h2>${site.subtitle}</h2>-->
          </div>
        </div>
        <nav class="main-nav">
          <ul>
            <li>
              <a href="${site.baseurl}/archives.html"
                ><span class="fa fa-archive"></span> archives</a
              >
            </li>
            <li>
              <a href="http://lmorchard.com/"
                ><span class="fa fa-info-circle"></span> about me</a
              >
            </li>
            <li>
              <theme-selector title="Enable dark theme">
                <label>
                  <input type="checkbox" />
                  <span class="slider"></span>
                </label>
              </theme-selector>
            </li>
          </ul>
        </nav>
      </header>

      <section class="main">${content}</section>

      <footer class="content-grid">
        <div class="left">
          © 2024 Les Orchard &lt;<a href="mailto:me@lmorchard.com"
            >me@lmorchard.com</a
          >&gt;
        </div>
        <img id="growup" src="${site.baseurl}/uploads/growup.jpg" />
        <nav class="right">
          <ul>
            <li>
              <a href><span class="fa fa-rss"></span> feed</a>
            </li>
          </ul>
        </nav>
      </footer>
    </body>
  </html>
`;
