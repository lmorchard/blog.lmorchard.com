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
        <h2>All Posts</h2>
        <p>Didn't find what you were looking for? It might be here:</p>
        ${postList({ site, posts })}
      </section>
    `
  );
