import { html } from "../lib/html.js";
import layoutPage from "./layoutPage.js";
import { indexAlternates } from "../lib/alternates.js";
import postList from "./postList.js";

export default ({ site = {}, page = {}, posts = [] }) =>
  layoutPage(
    {
      site,
      page,
      alternates: indexAlternates(site, page),
    },
    postList({ site, posts })
  );
