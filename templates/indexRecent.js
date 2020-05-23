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
        ${postList(
          { site, posts },
          html`
            <p>
              Looking for more? <a href="/archives.html">Try the archives.</a>
            </p>
          `
        )}
      </section>
    `
  );
