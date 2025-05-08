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
              html` <a class="link" href="${site.baseurl}/${post.path}/">
                <span class="infoContainer">
                  <span class="title">${post.title}</span>
                </span>
              </a>`}
              ${post.summary && html`<p class="summary">${post.summary}</p>`}
              <a class="link" href="${site.baseurl}/${post.path}/">#</a>
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
  }

  return html`
    <section class="post-list-new">
      <ul class="posts">
        ${out}
      </ul>
      ${content}
    </section>
  `;

  /*
  return html`
    <section class="post-list-new">
      <ul class="posts">
        ${posts.map(
          (post) => html`
            <li
              class="post ${post.thumbnail && "has-thumb "}${post.tags &&
              post.tags.map((tag) => `tag-${tag}`).join(" ")}"
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
              html`<img class="thumb" style="width: 128px" src="${post.thumbnail}" />`}
              ${post.summary &&
              html`<p class="summary">${post.summary}</p>`}
            </li>
          `
        )}
      </ul>
      ${content}
    </section>
  `;
  */
};
