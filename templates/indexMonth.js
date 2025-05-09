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
      html`<h2>Month: ${page.title}</h2>`
    )
  );
