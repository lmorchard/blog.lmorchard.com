import path from "path";
import frontmatter from "front-matter";
import mkdirp from "mkdirp";
import globby from "globby";

import config from "../config.js";
import { fs, writeFiles } from "./files.js";
import { renderPostBody } from "./postBody.js";
import templatePage from "../templates/page.js";

const PAGES_HASH_FILE = ".pages-nav-hash";

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

  // Make pages available to templates via site config
  config.site.pages = pages.map(p => ({ title: p.title, path: p.path }));

  return pages;
}

/**
 * Check if the pages nav has changed since the last build.
 * Returns true if all posts should be rebuilt (nav links changed).
 */
export async function pagesNavChanged() {
  const currentHash = JSON.stringify(config.site.pages || []);
  const hashPath = path.join(config.buildPath, PAGES_HASH_FILE);

  try {
    const previousHash = await fs.readFile(hashPath, "utf8");
    return currentHash !== previousHash;
  } catch {
    // No previous hash file — first build or clean build
    return true;
  }
}

/**
 * Write the current pages nav hash to the build directory.
 */
export async function writePagesNavHash() {
  const hashPath = path.join(config.buildPath, PAGES_HASH_FILE);
  await fs.writeFile(hashPath, JSON.stringify(config.site.pages || []));
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
