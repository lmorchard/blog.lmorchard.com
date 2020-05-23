const path = require("path");
const globby = require("globby");
const copy = require("recursive-copy");
const mkdirp = require("mkdirp");

const config = require("./config");
const { parseEntry, buildEntry } = require("./lib/entries");
const { fs, writeFiles } = require("./lib/files");

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
  for (const yearFn of await fs.readdir(root)) {
    if (!(await isDirMatch(/\d{4}/, root, yearFn))) {
      continue;
    }

    await indexPosts({
      template: "indexYear",
      title: yearFn,
      pathParts: [root, yearFn],
    });

    for (const monthFn of await fs.readdir(path.join(root, yearFn))) {
      if (!(await isDirMatch(/\d{2}/, root, yearFn, monthFn))) {
        continue;
      }

      await indexPosts({
        template: "indexMonth",
        title: monthFn,
        pathParts: [root, yearFn, monthFn],
      });
    }
  }
}

async function indexPosts({ template, title, pathParts }) {
  const fullPath = path.join(...pathParts);
  const posts = await loadPosts(`${fullPath}/**/index.json`);
  await writeFiles(fullPath, {
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

async function readdirMatch(root, pattern) {
  const entries = await fs.readdir(root);
  return entries.filter(fn => isDirMatch(pattern, root, fn));
}

async function isDirMatch(pattern, ...parts) {
  const full = path.join(...parts);
  const stat = await fs.stat(full);
  const fn = parts.pop();

  return !fn.startsWith(".") && stat.isDirectory() && pattern.test(fn);
}

async function loadPosts(pattern) {
  const posts = [];
  for await (const file of globby.stream(pattern)) {
    posts.push(await loadPost(file));
  }
  return posts;
}

const postCache = {};
async function loadPost(path) {
  if (!postCache[path]) {
    postCache[path] = JSON.parse(await fs.readFile(path));
  }
  return postCache[path];
}

main().catch((err) => console.error(err));
