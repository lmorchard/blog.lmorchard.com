import path from "path";
import frontmatter from "front-matter";
import mkdirp from "mkdirp";
import globby from "globby";

import config from "../config.js";
import { fs, writeFiles } from "./files.js";
import { renderPostBody } from "./postBody.js";
import templatePage from "../templates/page.js";

export async function loadAllPages() {
  const files = await globby(`${config.pagesPath}/**/*.md`);
  const pages = [];

  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const { attributes, body } = frontmatter(raw);
    const { html } = await renderPostBody(body);

    const basename = path.parse(file).name;
    const slug = attributes.slug || basename;

    pages.push({
      ...attributes,
      slug,
      path: slug,
      body,
      html,
      sourcePath: file,
    });
  }

  return pages;
}

export async function buildAllPages(pages) {
  for (const page of pages) {
    await buildPage(page);
  }
}

async function buildPage(page) {
  const pagePath = path.join(config.buildPath, page.path);
  await mkdirp(pagePath);
  await writeFiles(pagePath, {
    "index.html": templatePage(
      {
        site: config.site,
        page,
      },
      page.html
    ),
  });
}
