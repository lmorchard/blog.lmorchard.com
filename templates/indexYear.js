import { html } from "../lib/html.js";
import layoutPage from "./layoutPage.js";
import postList from "./postList.js";

export default ({ site = {}, page = {}, posts = [] }) =>
  layoutPage(
    {
      site,
      page,
    },
    postList(
      { site, posts },
      html`
        <section class="index-header">
          <h2>Year: ${page.title}</h2>
        </section>
      `
    )
  );
