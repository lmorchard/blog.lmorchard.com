import { html } from "../lib/html.js";
import layoutPage from "./layoutPage.js";
import postList from "./postList.js";

export default ({ site = {}, page = {}, posts = [] }) =>
  layoutPage(
    {
      site,
      page,
    },
    html`
      <section class="archive content-grid">
        <h2>All Posts</h2>
        <p>Didn't find what you were looking for? It might be here:</p>
        ${postList({ site, posts })}
      </section>
    `
  );
