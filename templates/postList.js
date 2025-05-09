import { html, unescaped } from "../lib/html.js";
import classNames from "classnames";
import moment from "moment";

export default ({ site, posts }, contentBefore = "", contentAfter = "") => {
  const typeRenderers = {
    aside: aside,
    entry: entry,
    default: entry,
  };

  const renderPost = (post, index, arr) => {
    const showHeader = shouldShowDateHeader(post, index, arr);
    const renderer = typeRenderers[post.type] || typeRenderers.default;

    return html`${showHeader && dateHeader(post)}${renderer(post, site)}`;
  };

  return html`
    <section class="post-list">
      ${contentBefore}
      <ul class="posts">
        ${posts.map(renderPost)}
      </ul>
      ${contentAfter}
    </section>
  `;
};

const formatDateForHeader = (post) => moment(post.date).format("YYYY MMMM DD");

const dateHeader = (post) => html`
  <li class="content-grid date-header">
    <h2 class="date">${formatDateForHeader(post)}</h2>
  </li>
`;

const postClasses = (post) =>
  classNames(
    "content-grid",
    "post",
    `post-type-${post.type}`,
    { "has-thumb": post.thumbnail },
    ...(post.tags || []).map((tag) => `tag-${tag}`)
  );

const wordCount = (post) =>
  (post.body || "")
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim()
    .split(/\s+/).length;

function shouldShowDateHeader(post, index, arr) {
  const currentHeader = formatDateForHeader(post);
  const prevHeader = index > 0 ? formatDateForHeader(arr[index - 1]) : null;
  return currentHeader !== prevHeader;
}

const entry = (post, site) => html`
  <li class="${postClasses(post)}">
    ${post.title &&
    html`
      <h2 class="title">
        <a href="${site.baseurl}/${post.path}/">${post.title}</a>
      </h2>
    `}
    ${post.thumbnail &&
    html`<div class="thumb">
      <img src="${post.thumbnail}" />
    </div>`}
    <p class="summary">
      ${post.summary && unescaped(post.summary.replace("TL;DR: ", ""))}
      <span class="word-count"
        >[&nbsp;...&nbsp;<a class="link" href="${site.baseurl}/${post.path}/"
          >${wordCount(post)}&nbsp;words</a
        >&nbsp;...&nbsp;]</span
      >
    </p>
    ${metaFooter(post, site)}
  </li>
`;

const aside = (post, site) => html`
  <li class="${postClasses(post)}">
    ${post.title &&
    html`
      <h2 class="title">
        <a href="${site.baseurl}/${post.path}/">${post.title}</a>
      </h2>
    `}
    <div class="content">${unescaped(post.html)}</div>
    ${metaFooter(post, site)}
  </li>
`;

const metaFooter = (post, site) => html`
  <div class="meta">
    <a class="permalink" href="${post.path}/">#</a>
    <a class="time" href="${post.path}/">${post.date.format("h:mm a")}</a>
    ${post.tags &&
    html`<ul class="tags">
      ${post.tags.map(
        (tag) =>
          html`<li class="tag">
            <a href="${site.baseurl}/tag/${tag}/">${tag}</a>
          </li>`
      )}
    </ul>`}
  </div>
`;
