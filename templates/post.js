import { html, unescaped } from "../lib/html.js";
import layoutPage from "./layoutPage.js";
import moment from "moment";

export default ({ site = {}, page = {} }, content) =>
  layoutPage(
    {
      site,
      page,
      head: html`
        <meta property="og:title" content="${page.title}" />
        <meta
          property="og:url"
          content="${site.absolute_baseurl}/${page.path}/"
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
        class="content content-grid post ${page.tags &&
        page.tags.map((tag) => html`tag-${tag} `)}"
      >
        <header>
          <time
            title="${moment(page.date).format()}"
            pubdate="${moment(page.date).format()}"
          >
            ${page.prevPostPath &&
            html`
              <a href="${site.baseurl}/${page.prevPostPath}/"
                >←&nbsp;<a> </a
              ></a>
            `}
            <a href="${site.baseurl}/${moment(page.date).format("Y")}/"
              >${moment(page.date).format("Y")}</a
            >
            &#8226;
            <a href="${site.baseurl}/${moment(page.date).format("Y/MM")}/"
              >${moment(page.date).format("MMMM")}</a
            >
            &#8226;
            <span>${moment(page.date).format("DD")}</span>
            ${page.nextPostPath &&
            html`
              <a href="${site.baseurl}/${page.nextPostPath}/"
                >&nbsp;→<a> </a
              ></a>
            `}
          </time>
          <h1 class="title">${page.title}</h1>
          ${page.tags &&
          html`
            <ul class="tags">
              ${page.tags.map(
                (tag) => html`
                  <li><a href="${site.baseurl}/tag/${tag}/">${tag}</a></li>
                `
              )}
            </ul>
          `}
        </header>

        ${unescaped(content)}
        ${!(page.comments_archived || page.draft) &&
        html`
          <section class="comments" id="comments">
            <div id="disqus_thread"></div>
            <script type="text/javascript">
              var disqus_needs_loading = true;
              var disqus_url = "${site.absolute_baseurl}/${page.path}/";
            </script>
            <noscript
              >Please enable JavaScript to view the
              <a href="http://disqus.com/?ref_noscript"
                >comments powered by Disqus.</a
              ></noscript
            >
            <a href="http://disqus.com" class="dsq-brlink"
              >blog comments powered by
              <span class="logo-disqus">Disqus</span></a
            >
          </section>
        `}
      </article>
    `
  );
