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

module.exports = {
  fs,
  writeFiles,
};
