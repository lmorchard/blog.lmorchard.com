import { html, unescaped } from "../lib/html.js";
import moment from "moment";

export default ({ site, posts }, content) => {
  const out = [];
  let currentDateHeader = "";

  for (const post of posts) {
    const dateHeader = moment(post.date).format("YYYY MMMM DD");
    if (currentDateHeader !== dateHeader) {
      currentDateHeader = dateHeader;
      out.push(html`<h2 class="date">${currentDateHeader}</h2>`);
    }

    switch (post.type) {
      case "aside": {
        out.push(
          html`
            <div
              class="post post-type-${post.type} ${post.thumbnail &&
              "has-thumb "}${post.tags &&
              post.tags.map((tag) => `tag-${tag}`).join(" ")}"
            >
              ${post.thumbnail &&
              html`<img
                class="thumb"
                style="width: 128px"
                src="${post.thumbnail}"
              />`}
              ${post.title &&
              html` <a class="link" href="${site.baseurl}/${post.path}/">
                <span class="infoContainer">
                  <span class="title">${post.title}</span>
                </span>
              </a>`}
              ${post.summary && html`<p class="summary">${post.summary}</p>`}
              ${unescaped(post.html)}
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
          `
        );
        break;
      }
      default: {
        out.push(
          html`
            <div
              class="post post-type-${post.type} ${post.thumbnail &&
              "has-thumb "}${post.tags &&
              post.tags.map((tag) => `tag-${tag}`).join(" ")}"
            >
              ${post.thumbnail &&
              html`<img
                class="thumb"
                style="width: 128px"
                src="${post.thumbnail}"
              />`}
              ${post.title &&
              html`<h2>
                <a class="link" href="${site.baseurl}/${post.path}/">
                  <span class="infoContainer">
                    <span class="title">${post.title}</span>
                  </span>
                </a>
              </h2>`}
              <p class="summary">
                ${post.summary &&
                unescaped(post.summary.replace("TL;DR: ", ""))}
                [...<a class="link" href="${site.baseurl}/${post.path}/"
                  >${post.words} words</a
                >]
              </p>
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
          `
        );
      }
    }

    out.push(html`<hr />`);
  }

  return html`
    <section class="post-list-new">
      <ul class="posts">
        ${out}
      </ul>
      ${content}
    </section>
  `;

};
