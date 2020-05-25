const { html, unescaped } = require("../lib/html");
const layoutPage = require("./layoutPage");
const moment = require("moment");

module.exports = ({ site = {}, page = {} }, content) =>
  layoutPage(
    {
      site,
      page,
      head: html`
        <meta property="og:title" content="${page.title}" />
        <meta
          property="og:url"
          content="${site.absolute_baseurl}${page.url}/"
        />
        ${page.thumbnail &&
        html`
          <meta
            property="og:image"
            content="${page.thumbnail.indexOf("/") === 0 &&
            site.absolute_baseurl}${page.thumbnail}"
          />
        `}
        ${page.summary &&
        html`<meta property="og:description" content="${page.summary}" />`}
      `,
    },
    html`
      <article
        class="post ${page.tags && page.tags.map((tag) => html`tag-${tag} `)}"
      >
        <time
          title="${moment(page.date).format()}"
          pubdate="${moment(page.date).format()}"
        >
          <a href="${site.baseurl}/"><i class="fa fa-home"></i></a>
          &raquo;
          <a href="${site.baseurl}/${moment(page.date).format("Y")}/"
            >${moment(page.date).format("Y")}</a
          >
          &raquo;
          <a href="${site.baseurl}/${moment(page.date).format("Y/MM")}/"
            >${moment(page.date).format("MMMM")}</a
          >
          &raquo;
          <span>${moment(page.date).format("DD")}</span>
          &raquo;
        </time>

        <nav class="post-links">
          ${page.prevPostPath &&
          html`
            <a href="${site.baseurl}/${page.prevPostPath}/"
              >&laquo; prev<a> </a
            ></a>
          `}
          ${page.prevPostPath && page.nextPostPath && html`&nbsp;|&nbsp;`}
          ${page.nextPostPath &&
          html`
            <a href="${site.baseurl}/${page.nextPostPath}/"
              >next &raquo;<a> </a
            ></a>
          `}
        </nav>

        <h1 class="title">${page.title}</h1>
        ${page.tags &&
        html`
          <ul class="tags">
            ${page.tags.map(
              (tag) => html`
                <li>
                  <a href="${site.baseurl}/tag/${tag}/">${tag}</a>
                </li>
              `
            )}
          </ul>
        `}
        <section class="post-content">
          ${unescaped(content)}
        </section>
      </article>

      ${!(page.comments_archived || page.draft) &&
      html`
        <section class="comments" id="comments">
          <div id="disqus_thread"></div>
          <script type="text/javascript">
            var disqus_needs_loading = true;
            var disqus_url = "${site.absolute_baseurl}${page.url}";
          </script>
          <noscript
            >Please enable JavaScript to view the
            <a href="http://disqus.com/?ref_noscript"
              >comments powered by Disqus.</a
            ></noscript
          >
          <a href="http://disqus.com" class="dsq-brlink"
            >blog comments powered by <span class="logo-disqus">Disqus</span></a
          >
        </section>
      `}
    `
  );
