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
      <section class="archive">
        <h2>Month: ${page.title}</h2>
        ${postList({ site, posts })}
      </section>
    `
  );
