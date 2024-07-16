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
        <h2>Year: ${page.title}</h2>
        ${postList({ site, posts })}
      </section>
    `
  );
