import { html } from "../lib/html.js";
import { updateRelativeImageUrls } from "../lib/posts.js";

// TODO: Use an RSS generating module? This template is just copied
// over from my old blog generator for initial consistency

export default ({
  site = {},
  posts = [],
  tag = "",
  maxItems = 15,
  fullText = false,
}) => html`
  <?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${tag && `Tag: ${tag} - `}${site.title}</title>
      <description>${site.subtitle}</description>
      <link>${
        tag ? `${site.absolute_baseurl}/tag/${tag}/` : site.absolute_baseurl
      }</link>
      <atom:link href="${
        site.absolute_baseurl
      }/index.rss" rel="self" type="application/rss+xml" />
      ${posts.slice(0, maxItems).map(
        (post) => html`
      <item>
          <title>${post.title || "untitled"}</title>
          ${
            !fullText &&
            post.summary &&
            html`
              <description
                >${updateRelativeImageUrls(
                  post.summary,
                  `${site.absolute_baseurl}/${post.path}`
                )}</description
              >
            `
          }
          ${
            (fullText || post.type !== "entry") &&
            post.html &&
            html`
              <description
                >${updateRelativeImageUrls(
                  post.html,
                  `${site.absolute_baseurl}/${post.path}`
                )}</description
              >
            `
          }
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <link>${site.absolute_baseurl}/${post.path}/</link>
          <guid isPermaLink="true">${site.absolute_baseurl}/${post.path}/</guid>
          ${
            post.tags &&
            post.tags.map((tag) => html`
          <category>${tag}</category>
        `)
          }
        </item>
      `
      )}
    </channel>
  </rss>
`;
