import { html, unescaped } from "../lib/html.js";
import moment from "moment";

export default ({ site, posts }, contentBefore = "", contentAfter = "") => {
  const typeRenderers = {
    'aside': aside,
    'entry': entry,
    'default': entry
  };

  const renderPost = (post, index, arr) => {
    const currentHeader = dateHeader(post);
    const prevHeader = index > 0 ? dateHeader(arr[index - 1]) : null;
    const showHeader = currentHeader !== prevHeader;
    const renderer = typeRenderers[post.type] || typeRenderers.default;

    return html`
      <li class="date-header">
        ${showHeader && html`<h2 class="date">${currentHeader}</h2>`}
      </li>
      ${renderer(post, site)}
    `;
  };

  return html`
    <section class="content-grid">
      ${contentBefore}
      <ul class="post-list">
        ${posts.map(renderPost)}
      </ul>
      ${contentAfter}
    </section>
  `;
};

const dateHeader = (post) =>
  moment(post.date).format("YYYY MMMM DD");

const postClasses = (post) => [
  "post",
  `post-type-${post.type}`,
  post.thumbnail && "has-thumb",
  ...(post.tags || []).map((tag) => `tag-${tag}`)
].filter(Boolean).join(" ");

const wordCount = (post) => (post.body || "")
  .replace(/<[^>]*>/g, "") // Remove HTML tags
  .replace(/\s+/g, " ")    // Normalize whitespace
  .trim()
  .split(/\s+/)
  .length;

function entry(post, site) {
  return html`
    <li class="${postClasses(post)}">
      ${post.thumbnail && html`<div class="thumb"><img style="width: 128px" src="${post.thumbnail}" /></div>`}
      ${post.title && html`
        <h2 class="title">
          <a href="${site.baseurl}/${post.path}/">${post.title}</a>
        </h2>
      `}
      <p class="summary">
        ${post.summary &&
    unescaped(post.summary.replace("TL;DR: ", ""))}
        [...<a class="link" href="${site.baseurl}/${post.path}/"
          >${wordCount(post)} words</a
        >]
      </p>
      <div class="meta">
      <a class="link" href="${site.baseurl}/${post.path}/"
        >${post.date.format("hh:mm a")}</a
      >
      /
      ${post.tags &&
    html`<span class="tags"
        >${post.tags.map(
      (tag) => html`
            <a href="${site.baseurl}/tag/${tag}/">${tag}</a>
          `
    )}</span
      >`}
      </div>
      </li>
  `;
}

function aside(post, site) {
  return html`
    <li class="${postClasses(post)}">
    ${post.thumbnail && html`<div class="thumb"><img style="width: 128px" src="${post.thumbnail}" /></div>`}
    ${post.title && html`
        <h2 class="title">
          <a href="${site.baseurl}/${post.path}/">${post.title}</a>
        </h2>
      `}
    ${post.summary && html`<p class="summary">${post.summary}</p>`}
    <div class="content">${unescaped(post.html)}</div>
    <div class="meta">
      <a class="link" href="${site.baseurl}/${post.path}/">#</a>
      <a class="link" href="${site.baseurl}/${post.path}/"
        >${post.date.format("h:mm a")}</a
      >
      /
      ${post.tags &&
      html`<span class="tags"
        >${post.tags.map(
        (tag) => html`
            <a href="${site.baseurl}/tag/${tag}/">${tag}</a>
          `
      )}</span
      >`}
      </div>
    </li>
`;
}
