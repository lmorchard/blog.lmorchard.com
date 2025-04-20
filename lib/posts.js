import path from "path";
import url from "url";
import frontmatter from "front-matter";
import { marked } from "marked";
import moment from "moment";
import mkdirp from "mkdirp";
import copy from "recursive-copy";
import cheerio from "cheerio";
import globby from "globby";

import config from "../config.js";
import { fs, writeFiles } from "./files.js";
import templatePost from "../templates/post.js";
import { replaceAsync } from "./utils.js";

const SUMMARY_MARKER = "<!--more-->";
const RE_POST_NAME = new RegExp(/(\d{4})-(\d{2})-(\d{2})-(.*)/);

export async function loadAllPosts(
  postGlobs = [`${config.postsPath}/**/*.{md,markdown}`]
) {
  const posts = [];
  const files = globby.stream(postGlobs, {
    ignore: [
      `${config.postsPath}/**/{_*,node_modules,build,tmp}/**/*.{md,markdown}`,
    ],
  });
  for await (const file of files) {
    posts.push(await loadPost(file));
  }
  await sortPosts(posts);
  await linkPosts(posts);
  return posts;
}

async function linkPosts(posts) {
  let prevPost = null;
  for (const post of posts) {
    if (prevPost) {
      prevPost.nextPostPath = post.path;
      prevPost.nextPostTitle = post.title;
      post.prevPostPath = prevPost.path;
      post.prevPostTitle = prevPost.title;
    }
    prevPost = post;
  }
}

export async function loadPost(file) {
  const data = await fs.readFile(file, "utf8");

  let { attributes, body } = frontmatter(data);
  body = await handleIncludes(file, body);

  const html = await renderPostBody(body);

  const isDir = path.basename(file).startsWith("index.");
  const postName = isDir
    ? path.basename(path.dirname(file))
    : path.basename(file).split(".")[0];
  const [, year, month, day, slug] = RE_POST_NAME.exec(postName);
  const date = moment(attributes.date || `${year}-${month}-${day}T12:00:00Z`);
  const postPath = `${date.format("YYYY/MM/DD")}/${slug}`;

  const post = {
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

  if (
    post.thumbnail &&
    post.thumbnail.startsWith("/") &&
    !post.thumbnail.startsWith(config.site.baseurl)
  )
    post.thumbnail = `${config.site.baseurl}${post.thumbnail}`;

  return post;
}

const INCLUDE_RE = new RegExp(/\{\{(.*)\}\}/g);
async function handleIncludes(file, body) {
  return replaceAsync(body, INCLUDE_RE, async (match, includeFile) => {
    try {
      const includePath = path.resolve(path.dirname(file), includeFile.trim());
      const includeContent = await fs.readFile(includePath, "utf-8");
      return includeContent;
    } catch (err) {
      return match;
    }
  });
}

async function renderPostBody(body) {
  let result = body;

  // Pre-markdown pipeline
  result = await fixupArchivedComments(result);
  result = await fixupBadLineEndingQuirks(result);
  result = await convertObsidianImagesToHTML(result);

  // Markdown to HTML
  result = await renderMarkdown(result);
  let $ = cheerio.load(result);

  // Post-markdown HTML pipeline
  $ = await fixupImages($);

  return $('html body').html();
}

async function fixupImages($) {
  // HACK: strip explicit width & height attributes for now, since that clashes with 2024 styles
  $('img').each((idx, el) => {
    el.attribs.width = "";
    el.attribs.height = "";
  });
  return $;
}

async function fixupBadLineEndingQuirks(body) {
  let result = body;
  result = result.replace(/<br \/><br \/>/g, "\n\n");
  result = result.replace(/<br \/>/g, "\n\n");
  result = result.replace(/<\/ul>/g, "</ul>\n\n");
  result = result.replace(/<\/small>/g, "</small>\n\n");
  result = result.replace(/<\/blockquote>/g, "</blockquote>\n\n");
  result = result.replace(/<\/div>/g, "</div>\n\n");
  result = result.replace(/<!--more-->/g, "\n\n<!--more-->\n\n");
  result = result.replace(/	+/g, "");
  return result;
}

async function convertObsidianImagesToHTML(body) {
  let result = body;
  result = result.replace(/!\[\[(.*?)\]\]/g, '<img loading="lazy" src="$1" />');
  return result;
}

async function renderMarkdown(body) {
  return marked.parse(body);
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
    return $("body").text().trim();
  }
}

export async function buildPost(post) {
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
    await copyPostAssets(post.parentPath, postPath);
  }
}

async function copyPostAssets(parentPath, postPath) {
  let filter = ["**/*", "!.copyfilter", ...config.postCopyFilters];
  try {
    const data = await fs.readFile(
      path.join(parentPath, ".copyfilter"),
      "utf8"
    );
    filter = [...filter, ...data.trim().split("\n")];
  } catch (err) {}
  return copy(parentPath, postPath, {
    filter,
    overwrite: true,
  });
}

export async function buildAllPosts(posts) {
  for (const post of posts) {
    await buildPost(post);
  }
}

export function sortPosts(posts) {
  return posts.sort((a, b) => getPostTime(b) - getPostTime(a));
}

function getPostTime(post) {
  return new Date(post.date).getTime();
}
