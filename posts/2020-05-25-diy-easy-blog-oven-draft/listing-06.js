#!/usr/bin/env node
const path = require("path");
const globby = require("globby");
const mkdirp = require("mkdirp");
const util = require("util");
const fsOrig = require("fs");
const fs = {
  readFile: util.promisify(fsOrig.readFile),
  writeFile: util.promisify(fsOrig.writeFile),
};
const marked = require("marked");
const frontmatter = require("front-matter");
const escapeHtml = require("escape-html");
const moment = require("moment");

const config = {
  postsDir: "../../posts",
  buildDir: "/tmp/blog-build",
};

const RE_POST_NAME = new RegExp(/(\d{4})-(\d{2})-(\d{2})-(.*)/);

async function main() {
  const posts = [];

  // Load all posts into memory
  const files = globby.stream(`${config.postsDir}/**/*.{md,markdown}`);
  for await (const file of files) {
    const data = await fs.readFile(file, "utf8");
    const { attributes, body } = frontmatter(data);
    const html = marked(body);

    // Get the filename without .md or .markdown extension
    const postName = path.basename(file).split(".")[0];
    // Just skip any files that don't match the naming convention
    const dateMatch = RE_POST_NAME.exec(postName);
    if (!dateMatch) continue;

    const [, year, month, day, slug] = dateMatch;
    const date = moment(attributes.date || `${year}-${month}-${day}T12:00:00Z`);
    const postPath = `${date.format("YYYY/MM/DD")}/${slug}`;

    posts.push({
      // Copy all the front matter attributes into the post.
      ...attributes,
      path: postPath,
      year,
      month,
      day,
      date,
      slug,
      body,
      html,
    });
  }

  // Write all posts to disk
  for (const post of posts) {
    const postPath = `${config.buildDir}/${post.path}`;
    const postHtml = templateBlogPost({ post })();
    await mkdirp(postPath);
    await fs.writeFile(`${postPath}/index.md`, post.body);
    await fs.writeFile(`${postPath}/index.html`, postHtml);
  }
}

const unescaped = (raw) => () => raw;

const html = (strings, ...values) =>
  unescaped(
    strings
      .reduce((result, string, i) => result + string + htmlValue(values[i]), "")
      .trim()
  );

const htmlValue = (value) => {
  if (typeof value == "undefined") {
    return "";
  } else if (typeof value === "function") {
    return value();
  } else if (Array.isArray(value)) {
    return value.map(htmlValue).join("");
  }
  return escapeHtml(value);
};

const templateBlogPost = ({ post }) => html`
<!DOCTYPE html>
<html>
  <head>
    <title>${post.title}<title>
  </head>
  <body>
    <h1>${post.title}<h1>
    <h2>${post.date.format("dddd, MMMM Do YYYY, h:mm:ss a")}</h2>
    ${
      post.tags &&
      html`
        <ul>
          ${post.tags.map((tag) => html`<li>${tag}</li>`)}
        </ul>
      `
    }
    ${unescaped(post.html)}
  </body>
<html>
`;

main().catch((err) => console.error(err));
