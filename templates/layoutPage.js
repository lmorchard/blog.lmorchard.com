import { html } from "../lib/html.js";

// TODO: use a bundler again someday for CSS & JS?
const cssAssets = ["screen.css", "vendor/font-awesome.css", "vendor/prism.css"];
const jsAssets = [
  // HACK: emphasis depends on jquery, so use explicit order.
  // TODO: Work out a better way to specify order. Maybe 01- 02- 03- filenames?
  //'vendor/jquery.js',
  //'vendor/emphasis.js',
  //'vendor/moment.min.js',
  "vendor/lazyload.js",
  "vendor/prism.js",
  //'vendor/lodash.js',
  //'vendor/async.js',
  "toc.js",
  "main.js",
];

export default (
  { site = {}, page = {}, head = "", js = "" },
  content
) => html`
  <!DOCTYPE html>
  <html lang="en-us">
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
      <link rel="shortcut icon" href="https://www.gravatar.com/avatar/b45c48fc9e05922e2f368a9d7d7d8de1?s=16" />      
      <script defer data-domain="blog.lmorchard.com" src="https://analytics.lmorchard.com/js/plausible.js"></script>
      ${cssAssets.map(
        (css) => html`
          <link
            rel="stylesheet"
            href="${site.baseurl}/css/${css}"
            type="text/css"
            media="screen, projection"
          />
        `
      )}
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
        ${jsAssets.map(
          (src) => html`<script src="${site.baseurl}/js/${src}"></script>`
        )}
        ${js}
      </section>
    </body>
  </html>
`;
