const path = require("path");
const globby = require("globby");
const copy = require("recursive-copy");
const mkdirp = require("mkdirp");

const config = require("./config");
const { parseEntry, buildEntry } = require("./lib/entries");
const { fs, writeFiles, readdirMatch } = require("./lib/files");
const { indexBy } = require("./lib/utils");

async function main() {
  await mkdirp(config.buildPath);
  await copyAssets();
  await buildAllEntries();
  await indexAllDates();
}

async function copyAssets() {
  for (const assetPath of config.assetPaths) {
    await copy(assetPath, config.buildPath, {
      overwrite: true,
    });
  }
}

async function buildAllEntries() {
  const files = globby.stream(`${config.postsPath}/**/*.{md,markdown}`);
  for await (const file of files) {
    const content = await parseEntry(file);
    await buildEntry(content);
  }
}

async function indexAllDates() {
  const root = config.buildPath;
  const posts = await loadAllPosts();

  const postsByYear = indexBy(posts, ({ year }) => year);
  for (const [year, posts] of Object.entries(postsByYear)) {
    await writeIndex({
      basePath: path.join(root, year),
      title: year,
      template: "indexYear",
      posts,
    });
  }

  const postsByMonth = indexBy(posts, ({ year, month }) => `${year}/${month}`);
  for (const [month, posts] of Object.entries(postsByMonth)) {
    await writeIndex({
      basePath: path.join(root, month),
      title: month,
      template: "indexMonth",
      posts,
    });
  }

  const postsByTag = indexBy(posts, ({ tags = [] }) => tags);
  for (const [tag, posts] of Object.entries(postsByTag)) {
    await writeIndex({
      basePath: path.join(root, 'tag', tag),
      title: tag,
      template: "indexTag",
      posts,
    });
  }
}

async function writeIndex({ basePath, title, template, posts }) {
  await mkdirp(basePath);
  return writeFiles(basePath, {
    "index.json": JSON.stringify(posts, null, "  "),
    "index.html": require(`./templates/${template}`)({
      site: config.site,
      page: {
        title,
      },
      posts,
    })(),
  });
}

async function loadAllPosts() {
  const posts = [];
  const files = globby.stream(`${config.buildPath}/**/**/**/index.json`);
  for await (const file of files) {
    posts.push(JSON.parse(await fs.readFile(file)));
  }
  return posts;
}

main().catch((err) => console.error(err));
