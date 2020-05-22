const path = require("path");
const util = require("util");
const globby = require("globby");
const mkdirp = require("mkdirp");
const copy = require("recursive-copy");
const frontmatter = require("front-matter");
const commonmark = require("commonmark");
const moment = require("moment");
const fs = mapFn(["readFile", "writeFile"], (name) =>
  util.promisify(require("fs")[name])
);

const config = {
  POSTS_PATH: "../blog.lmorchard.com/posts",
  BUILD_PATH: "./build",
  COMMONMARK_PARSER_OPTIONS: {},
  COMMONMARK_RENDERER_OPTIONS: {},
};

async function main() {
  const files = globby.stream(`${config.POSTS_PATH}/**/*.{md,markdown}`);
  for await (const file of files) {
    const content = await parseEntry(file);
    await buildEntry(content);
  }
}

async function parseEntry(file) {
  const data = await fs.readFile(file, "utf8");

  const content = frontmatter(data);

  const cmReader = new commonmark.Parser(config.COMMONMARK_PARSER_OPTIONS);
  const cmWriter = new commonmark.HtmlRenderer(
    config.COMMONMARK_RENDERER_OPTIONS
  );
  content.html = cmWriter.render(cmReader.parse(content.body));

  const isDir = path.basename(file).startsWith("index.");
  const entryName = isDir
    ? path.basename(path.dirname(file))
    : path.basename(file).split(".")[0];

  const [, yy, mm, dd, slug] = /(\d{4})-(\d{2})-(\d{2})-(.*)/.exec(entryName);

  content.attributes = {
    isDir,
    slug,
    entryName,
    parentPath: path.dirname(file),
    date: new Date(`${yy}-${mm}-${dd}T12:00:00Z`),
    ...content.attributes,
  };

  const date = moment(content.attributes.date);
  content.attributes.path = `${date.format("YYYY/MM/DD")}/${slug}`;

  return content;
}

async function buildEntry(content) {
  const entryPath = path.join(config.BUILD_PATH, content.attributes.path);
  await mkdirp(entryPath);
  await writeFiles(entryPath, {
    "index.md": content.body,
    "index.html": content.html,
    "index.json": JSON.stringify(content.attributes, null, "  "),
  });
  if (content.attributes.isDir) {
    await copy(content.attributes.parentPath, entryPath, {
      overwrite: true,
    });
  }
}

async function writeFiles(basePath, filesToWrite) {
  return Promise.all(
    Object.entries(filesToWrite).map(([fn, data]) =>
      fs.writeFile(path.join(basePath, fn), data)
    )
  );
}

function mapFn(names, fn) {
  return names.reduce(
    (acc, name) => ({
      ...acc,
      [name]: fn(name),
    }),
    {}
  );
}

main().catch((err) => console.error(err));
