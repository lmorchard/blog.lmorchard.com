import path from "path";
import url from "url";
import frontmatter from "front-matter";

import moment from "moment";
import mkdirp from "mkdirp";
import copy from "recursive-copy";
import cheerio from "cheerio";
import globby from "globby";

import config from "../config.js";
import { fs, writeFiles } from "./files.js";
import { renderPostBody } from "./postBody.js";
import templatePost from "../templates/post.js";
import { replaceAsync } from "./utils.js";

const SUMMARY_MARKER = "<!--more-->";

const POST_MULTIPART_SEPARATOR = "8<---";

const RE_POST_NAME_ATTRIBUTES =
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})(-(?<slug>.*))?/;

const DEFAULT_MULTIPART_POST_ATTRIBUTES = {
  type: "aside",
};

export async function loadAllPosts(
  {
    postGlobs = [`${config.postsPath}/**/*.{md,markdown}`],
    showDrafts = false
  } = {}
) {
  let posts = [];
  const files = globby.stream(postGlobs, {
    ignore: [
      `${config.postsPath}/**/{_*,node_modules,build,tmp}/**/*.{md,markdown}`,
    ],
  });
  for await (const file of files) {
    posts.push(...(await loadPostFile(file)));
  }
  // omit drafts if showDrafts is false
  if (!showDrafts) {
    posts = posts.filter(post => !post.draft);
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

export async function loadPostFile(filename) {
  const data = await fs.readFile(filename, "utf8");

  if (isMultipartPostFile(data)) {
    const posts = [];
    for (const { attributes, content } of splitMultipartPostFile(data)) {
      const post = await parsePost(content, filename, attributes);
      if (post) posts.push(post);
    }
    return posts;
  }

  return [await parsePost(data, filename)];
}

export async function parsePost(data, filename, postAttributes = {}) {
  // Rather than actually checking for a directory, assume index.md is in a directory
  const isDir = path.basename(filename).startsWith("index.");

  // If the file is a directory, use the parent directory name as the post name
  const postName = isDir
    ? path.parse(path.dirname(filename)).name
    : path.parse(filename).name;

  // Try to extract attributes from the post name, but skip the post altogether
  // if it doesn't match filename convention
  const postNameMatch = RE_POST_NAME_ATTRIBUTES.exec(postName);
  if (!postNameMatch) return;

  const { year, month, day, slug: slugFromPostName } = postNameMatch.groups;

  let { attributes: frontmatterAttributes, body } = frontmatter(data);
  body = await handleIncludes(filename, body);
  const { html, attributes: bodyAttributes } = await renderPostBody(body);

  const attributes = {
    ...postAttributes,
    ...bodyAttributes,
    ...frontmatterAttributes,
  };

  const title = attributes.title || extractTitleFromHTML(html);
  const slug =
    attributes.slug || slugFromPostName || slugify(title) || slugify(body);
  const time = attributes.time || "12:00:00-07:00";
  const date = moment.parseZone(attributes.date || `${year}-${month}-${day}T${time}`);
  const type = attributes.type || "entry";
  const postPath = `${date.format("YYYY/MM/DD")}/${slug}`;

  const post = {
    ...attributes,
    year,
    month,
    day,
    isDir,
    slug,
    type,
    title,
    date,
    postName,
    html,
    body,
    parentPath: path.dirname(filename),
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

function isMultipartPostFile(data) {
  // TODO: find a more robust way to detect multipart posts?
  return data.indexOf(POST_MULTIPART_SEPARATOR) !== -1;
}

function splitMultipartPostFile(data) {
  return data
    .split(POST_MULTIPART_SEPARATOR)
    .map(part => {
      let attributes = { ...DEFAULT_MULTIPART_POST_ATTRIBUTES };
      let content = part.trim();
      const lines = content.split('\n');
      if (lines[0].includes('{')) {
        try {
          Object.assign(attributes, JSON.parse(lines[0]));
          content = lines.slice(1).join('\n');
        } catch { }
      }
      return { attributes, content };
    })
    .filter(({ content }) => content);
}

function extractTitleFromHTML(html) {
  const $ = cheerio.load(html);
  for (let i = 1; i <= 6; i++) {
    const heading = $(`h${i}`).first();
    if (heading.length) {
      return heading.text().trim();
    }
  }
  return;
}

function slugify(body, maxWords = 7) {
  if (!body) return;
  const slugWords = body
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, maxWords);
  return slugWords.join("-");
}

const INCLUDE_RE = new RegExp(/\{\{(.*)\}\}/g);
async function handleIncludes(filepath, body) {
  return replaceAsync(body, INCLUDE_RE, async (match, includeFile) => {
    try {
      const includePath = path.resolve(path.dirname(filepath), includeFile.trim());
      const includeContent = await fs.readFile(includePath, "utf-8");
      return includeContent;
    } catch (err) {
      return match;
    }
  });
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
    await copyDirPostAssets(post.parentPath, postPath);
  } else if (post.attachments && post.attachments.length > 0) {
    await copyPostAttachments(post, postPath);
  }
}

async function copyPostAttachments(post, postPath) {
  for (const attachment of post.attachments) {
    const sourcePath = path.join(post.parentPath, attachment);
    const destPath = path.join(postPath, attachment);
    await mkdirp(path.dirname(destPath));
    await copy(sourcePath, destPath, {
      overwrite: true,
    });
  }
}

async function copyDirPostAssets(parentPath, postPath) {
  let filter = ["**/*", "!.copyfilter", ...config.postCopyFilters];
  try {
    const data = await fs.readFile(
      path.join(parentPath, ".copyfilter"),
      "utf8"
    );
    filter = [...filter, ...data.trim().split("\n")];
  } catch (err) { }
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

export const updateRelativeImageUrls = (html, baseUrl) => {
  if (!html || !baseUrl) return html;

  // Use cheerio for proper HTML parsing
  const $ = cheerio.load(html);

  // Find all images
  $('img').each((_, img) => {
    const src = $(img).attr('src');

    // Check if the src is relative (not starting with http://, https://, //)
    if (src && !src.match(/^(https?:\/\/|\/\/)/)) {
      $(img).attr('src', `${baseUrl}/${src}`);
    }
  });

  return $.html();
};
