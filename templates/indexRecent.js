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
      "",
      html`
      <p>
        Looking for more? <a href="${site.baseurl}/archives.html">Try the archives.</a>
      </p>
    `
    )
  );

