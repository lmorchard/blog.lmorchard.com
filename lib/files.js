import util from "util";
import path from "path";
import fsOrig from "fs";

import { mapFn } from "./utils.js";

export const fs = mapFn(["stat", "readdir", "readFile", "writeFile"], (name) =>
  util.promisify(fsOrig[name])
);

export async function writeFiles(basePath, filesToWrite) {
  return Promise.all(
    Object.entries(filesToWrite).map(async ([fn, content]) => {
      const data = typeof content === "function" ? await content() : content;
      return fs.writeFile(path.join(basePath, fn), data);
    })
  );
}
