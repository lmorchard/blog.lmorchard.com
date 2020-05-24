const path = require("path");
const url = require("url");
const frontmatter = require("front-matter");
const marked = require("marked");
const moment = require("moment");
const mkdirp = require("mkdirp");
const copy = require("recursive-copy");
const cheerio = require("cheerio");
const globby = require("globby");

const config = require("../config");
const { fs, writeFiles } = require("./files");
const templatePost = require("../templates/post");

const SUMMARY_MARKER = "<!--more-->";
const RE_POST_NAME = new RegExp(/(\d{4})-(\d{2})-(\d{2})-(.*)/);

async function loadAllPosts() {
  const posts = [];
  const files = globby.stream(`${config.postsPath}/**/*.{md,markdown}`);
  for await (const file of files) {
    posts.push(await parsePost(file));
  }
  return sortPosts(posts);
}

async function parsePost(file) {
  const data = await fs.readFile(file, "utf8");
  const { attributes, body } = frontmatter(data);
  const html = await renderPostBody(body);
  const isDir = path.basename(file).startsWith("index.");
  const postName = isDir
    ? path.basename(path.dirname(file))
    : path.basename(file).split(".")[0];
  const [, year, month, day, slug] = RE_POST_NAME.exec(postName);
  const date = moment(attributes.date || `${year}-${month}-${day}T12:00:00Z`);
  const postPath = `${date.format("YYYY/MM/DD")}/${slug}`;

  return {
    ...attributes,
    year,
    month,
    day,
    isDir,
    slug,
    date,
    postName,
    html,
    body,
    parentPath: path.dirname(file),
    path: postPath,
    thumbnail: attributes.thumbnail || (await findThumbnail(html, postPath)),
    summary: attributes.summary || (await summarize(html)),
  };
}

async function renderPostBody(body) {
  let result = body;
  result = await fixupArchivedComments(result);
  result = await renderMarkdown(result);
  return result;
}

async function renderMarkdown(body) {
  return marked(body);
}

// This function fixes the blocks of archived comments from Disqus that I
// once upon a time exported into entries. They otherwise turn into
// preformatted blocks. I should permanently fix them in the source someday.
async function fixupArchivedComments(contents) {
  var marker = '<div id="comments" class="comments archived-comments">';
  if (contents.indexOf(marker !== -1)) {
    var parts = contents.split(marker);
    if (parts.length > 1) {
      parts[1] = parts[1].replace(/^\s+/gm, "");
      return parts[0] + marker + parts[1];
    }
  }
  return contents;
}

async function findThumbnail(html, postPath) {
  const $ = cheerio.load(html);
  // Do not look through comments for images.
  $("#comments").remove();
  // Look for an explicitly identified thumbnail
  let src = $("img#thumbnail").eq(0).attr("src");
  // Just grabbing the first image tends to be good enough.
  if (!src) src = $("img").eq(0).attr("src");
  // HACK: Not sure where the gravatars are coming from, but skip them.
  // TODO: Skip whatever sections have gravatars.
  if (src && src.indexOf("gravatar.com") !== -1) src = null;
  if (src) return url.resolve(`${config.site.baseurl}/${postPath}/`, src);
}

async function summarize(html) {
  if (html.indexOf(SUMMARY_MARKER) === -1) return;
  const summary = html.split(SUMMARY_MARKER)[0];
  if (summary) {
    var $ = cheerio.load(summary);
    $("#toc_container").remove();
    return $("body").html();
  }
}

async function buildPost(post) {
  const postPath = path.join(config.buildPath, post.path);
  await mkdirp(postPath);
  await writeFiles(postPath, {
    "index.md": post.body,
    "index.json": JSON.stringify(post, null, "  "),
    "index.html": templatePost(
      {
        site: config.site,
        page: post,
      },
      post.html
    ),
  });
  if (post.isDir) {
    await copy(post.parentPath, postPath, {
      overwrite: true,
    });
  }
}

async function buildAllPosts(posts) {
  for (const post of posts) {
    await buildPost(post);
  }
}

function sortPosts(posts) {
  return posts.sort((a, b) => getPostTime(b) - getPostTime(a));
}

function getPostTime(post) {
  return new Date(post.date).getTime();
}

module.exports = {
  loadAllPosts,
  parsePost,
  buildPost,
  buildAllPosts,
  sortPosts,
};
