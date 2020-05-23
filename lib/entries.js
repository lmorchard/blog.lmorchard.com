const path = require("path");
const frontmatter = require("front-matter");
const commonmark = require("commonmark");
const moment = require("moment");
const mkdirp = require("mkdirp");
const copy = require("recursive-copy");
const globby = require("globby");

const config = require("../config");
const { fs, writeFiles } = require("./files");
const templatePost = require("../templates/post");

async function parseEntry(file) {
  const data = await fs.readFile(file, "utf8");

  const content = frontmatter(data);

  const cmReader = new commonmark.Parser(config.commonmarkParserOptions);
  const cmWriter = new commonmark.HtmlRenderer(
    config.commonmarkRendererOptions
  );
  content.html = cmWriter.render(cmReader.parse(content.body));

  const isDir = path.basename(file).startsWith("index.");
  const entryName = isDir
    ? path.basename(path.dirname(file))
    : path.basename(file).split(".")[0];

  const [, year, month, day, slug] = /(\d{4})-(\d{2})-(\d{2})-(.*)/.exec(
    entryName
  );

  content.attributes = {
    year,
    month,
    day,
    isDir,
    slug,
    entryName,
    parentPath: path.dirname(file),
    date: new Date(`${year}-${month}-${day}T12:00:00Z`),
    ...content.attributes,
  };

  const date = moment(content.attributes.date);
  content.attributes.path = `${date.format("YYYY/MM/DD")}/${slug}`;

  return content;
}

async function buildEntry(content) {
  const entryPath = path.join(config.buildPath, content.attributes.path);
  await mkdirp(entryPath);
  await writeFiles(entryPath, {
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
    )(),
  });
  if (content.attributes.isDir) {
    await copy(content.attributes.parentPath, entryPath, {
      overwrite: true,
    });
  }
}

async function buildIndex({ basePath, title, template, posts }) {
  await mkdirp(basePath);
  return writeFiles(basePath, {
    "index.json": JSON.stringify(posts, null, "  "),
    "index.html": require(`../templates/${template}`)({
      site: config.site,
      page: {
        title,
      },
      posts,
    })(),
  });
}

function sortPosts(posts) {
  return posts.sort((a, b) => getPostTime(b) - getPostTime(a));
}

function getPostTime(post) {
  return new Date(post.date).getTime();
}


module.exports = {
  parseEntry,
  buildEntry,
  buildIndex,
  sortPosts,
};
