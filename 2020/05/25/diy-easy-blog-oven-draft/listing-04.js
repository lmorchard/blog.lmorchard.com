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
    const postHtml = templateBlogPost({ post });
    await mkdirp(postPath);
    await fs.writeFile(`${postPath}/index.md`, post.body);
    await fs.writeFile(`${postPath}/index.html`, postHtml);
  }
}

const templateBlogPost = ({ post }) => `<!DOCTYPE html>
<html>
  <head>
    <title>${post.title}<title>
  </head>
  <body>
    <h1>${post.title}<h1>
    ${
      post.tags &&
      `
      <ul>
        ${post.tags.map((tag) => `<li>${tag}</li>`).join("\n")}
      </ul>
    `
    }
    ${post.html}
  </body>
<html>
`;

main().catch((err) => console.error(err));
