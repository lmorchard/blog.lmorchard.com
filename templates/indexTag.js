const { html } = require("../lib/html");
const layoutPage = require("./layoutPage");
const postList = require("./postList");

module.exports = ({ site = {}, page = {}, posts = [] }) =>
  layoutPage(
    {
      site,
      page,
    },
    html`
      <section class="archive">
        <h2>Tag: ${page.title}</h2>
        ${postList({ site, posts })}
      </section>
    `
  );
