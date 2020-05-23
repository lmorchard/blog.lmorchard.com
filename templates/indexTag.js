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
        <h2>Tag: ${page.title}</h2>
        ${postList({ site, posts })}
      </section>
    `
  );
