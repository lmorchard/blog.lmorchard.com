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
        ${postList({ site, posts })}
        <p>Looking for more? <a href="/archives.html">Try the archives.</a></p>
      </section>
    `
  );
