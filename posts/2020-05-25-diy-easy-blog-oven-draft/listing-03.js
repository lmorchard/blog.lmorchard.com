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

const config = {
  postsDir: "../../posts",
  buildDir: "/tmp/blog-build",
};

async function main() {
  const posts = [];

  // Load all posts into memory
  const files = globby.stream(`${config.postsDir}/**/*.{md,markdown}`);
  for await (const file of files) {
    const body = await fs.readFile(file, "utf8");
    const html = marked(body);
    posts.push({
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
    <title>Blog post<title>
  </head>
  <body>
    <h1>Blog post<h1>
    ${post.html}
  </body>
<html>
`;

main().catch((err) => console.error(err));
