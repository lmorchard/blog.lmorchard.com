const { html } = require("../lib/html");
const defaultLayout = require("./default");
const postList = require("./postList");

module.exports = ({ site = {}, page = {}, posts = [] }) =>
  defaultLayout(
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
