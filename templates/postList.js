const { html, unescaped } = require("../lib/html");
const moment = require("moment");

module.exports = ({ site, posts }) => html`
  <section class="post-list">
    <ul class="posts">
      ${posts.map(
        (post) => html`
          <li
            class="post ${post.thumbnail && "has-thumb "}${post.tas && post.tags.map(
              (tag) => html`tag-${tag} `
            )}"
          >
            <time class="date" datetime="${moment(post.date).format()}">
              ${moment(post.date).format("YYYY")}
              ${moment(post.date).format("MMMM")}
              ${moment(post.date).format("DD")}
            </time>
            <i class="icon fa fa-file-text"></i>
            <a class="link" href="${site.baseurl}/${post.path}/">
              <span class="infoContainer">
                <span class="title">${post.title}</span>
              </span>
            </a>
            ${post.thumbnail &&
            html`<img class="thumb" src="${post.thumbnail}" />`}
          </li>
        `
      )}
    </ul>
  </section>
`;
