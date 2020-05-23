const { html } = require("../lib/html");

// TODO: Use an RSS generating module? This template is just copied
// over from my old blog generator for initial consistency

module.exports = ({
  site = {},
  posts = [],
  tag = "",
  maxItems = 15,
  fullText = false,
}) => html`
  <?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>${tag && `Tag: ${tag} - `}${site.title}</title>
      <description>${site.subtitle}</description>
      <link>${site.absolute_baseurl}</link>
      ${posts.slice(0, maxItems).map(
        (post) => html`
      <item>
          <title>${post.title || "untitled"}</title>
          ${
            !fullText &&
            post.summary &&
            html` <description>${post.summary}</description> `
          }
          ${
            fullText &&
            post.content &&
            html` <description>${post.content}</description> `
          }
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <link>${site.absolute_baseurl}/${post.path}/</link>
          <guid isPermaLink="true">${site.absolute_baseurl}/${post.path}/</guid>
        </item>
      `
      )}
    </channel>
  </rss>
`;
