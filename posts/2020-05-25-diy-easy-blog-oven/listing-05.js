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

const config = {
  postsDir: "../../posts",
  buildDir: "/tmp/blog-build",
};

async function main() {
  const posts = [];

  // Load all posts into memory
  const files = globby.stream(`${config.postsDir}/**/*.{md,markdown}`);
  for await (const file of files) {
    const data = await fs.readFile(file, "utf8");
    const { attributes, body } = frontmatter(data);
    const html = marked(body);
    posts.push({
      // Copy all the front matter attributes into the post.
      ...attributes,
      path: file,
      body,
      html,
    });
  }

  // Write all posts to disk
  for (const post of posts) {
    const postPath = `${config.buildDir}/${path.basename(post.path)}`;
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
