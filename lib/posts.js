const path = require("path");
const url = require("url");
const frontmatter = require("front-matter");
const commonmark = require("commonmark");
const moment = require("moment");
const mkdirp = require("mkdirp");
const copy = require("recursive-copy");
const cheerio = require("cheerio");
const globby = require("globby");

const config = require("../config");
const { fs, writeFiles } = require("./files");
const templatePost = require("../templates/post");

const SUMMARY_MARKER = '<!--more-->';

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

  const post = frontmatter(data);

  const cmReader = new commonmark.Parser(config.commonmarkParserOptions);
  const cmWriter = new commonmark.HtmlRenderer(
    config.commonmarkRendererOptions
  );
  post.html = cmWriter.render(cmReader.parse(post.body));

  const isDir = path.basename(file).startsWith("index.");
  const postName = isDir
    ? path.basename(path.dirname(file))
    : path.basename(file).split(".")[0];

  const [, year, month, day, slug] = /(\d{4})-(\d{2})-(\d{2})-(.*)/.exec(
    postName
  );

  post.attributes = {
    year,
    month,
    day,
    isDir,
    slug,
    postName,
    parentPath: path.dirname(file),
    date: new Date(`${year}-${month}-${day}T12:00:00Z`),
    ...post.attributes,
  };

  const date = moment(post.attributes.date);
  post.attributes.path = `${date.format("YYYY/MM/DD")}/${slug}`;

  await findThumbnailForPost(post);
  await summarizePost(post);

  return post;
}

async function findThumbnailForPost(post) {
  if (post.attributes.thumbnail) {
    return;
  }

  const $ = cheerio.load(post.html);

  // Do not look through comments for images.
  $("#comments").remove();

  let src;

  // Look for an explicitly identified thumbnail
  src = $("img#thumbnail").eq(0).attr("src");

  if (!src) {
    // Just grabbing the first image tends to be good enough.
    src = $("img").eq(0).attr("src");
  }

  // HACK: Not sure where the gravatars are coming from, but skip them.
  // TODO: Skip whatever sections have gravatars.
  if (src && src.indexOf("gravatar.com") !== -1) {
    src = null;
  }

  if (src) {
    post.attributes.thumbnail = url.resolve(
      `${config.site.baseurl}/${post.attributes.path}/`,
      src
    );
  }
}

async function summarizePost(post) {
  const contents = post.html;
  if (contents.indexOf(SUMMARY_MARKER) === -1) return;
  const summary = contents.split(SUMMARY_MARKER)[0];
  if (summary) {
    var $ = cheerio.load(summary);
    $('#toc_container').remove();
    post.attributes.summary = $('body').html();
  }
}

async function buildPost(content) {
  const postPath = path.join(config.buildPath, content.attributes.path);
  await mkdirp(postPath);
  await writeFiles(postPath, {
    "index.md": content.body,
    "index.json": JSON.stringify(content.attributes, null, "  "),
    "index.html": templatePost(
      {
        site: config.site,
        page: {
          ...content.attributes,
        },
      },
      content.html
    ),
  });
  if (content.attributes.isDir) {
    await copy(content.attributes.parentPath, postPath, {
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
  return new Date(post.attributes.date).getTime();
}

module.exports = {
  loadAllPosts,
  parsePost,
  buildPost,
  buildAllPosts,
  sortPosts,
};
