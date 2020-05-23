const util = require("util");
const path = require("path");

const { mapFn } = require("./utils");
const fs = mapFn(["stat", "readdir", "readFile", "writeFile"], (name) =>
  util.promisify(require("fs")[name])
);

async function writeFiles(basePath, filesToWrite) {
  return Promise.all(
    Object.entries(filesToWrite).map(([fn, data]) =>
      fs.writeFile(path.join(basePath, fn), data)
    )
  );
}

async function readdirMatch(root, pattern) {
  const out = [];
  for (const fn of await fs.readdir(root)) {
    if (await isDirMatch(pattern, root, fn)) {
      out.push(fn);
    }
  }
  return out;
}

async function isDirMatch(pattern, ...parts) {
  const full = path.join(...parts);
  const stat = await fs.stat(full);
  const fn = parts.pop();

  return !fn.startsWith(".") && stat.isDirectory() && pattern.test(fn);
}

module.exports = {
  fs,
  writeFiles,
  readdirMatch,
  isDirMatch,
};
