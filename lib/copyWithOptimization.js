import path from "path";
import { promises as fs } from "fs";
import globby from "globby";

import { optimizeImage, isImageFile } from "./imageUtils.js";

/**
 * Copy files with optional image optimization, skipping files whose destination
 * is already up-to-date (dest.mtime >= src.mtime).
 *
 * Accepts either a single file or a directory as `src`.
 *
 * @param {string} src - Source file or directory path
 * @param {string} dest - Destination file or directory path
 * @param {object} options
 * @param {boolean} options.optimize - Whether to optimize images (default: true)
 * @param {boolean} options.overwrite - Whether to overwrite newer dest files (default: false)
 * @param {Array<string>} options.filter - Globby-style filter patterns for directory copies
 * @returns {Promise<void>}
 */
export async function copyWithOptimization(src, dest, options = {}) {
  const { optimize = true, overwrite = false, filter } = options;

  const srcStat = await fs.stat(src).catch(() => null);
  if (!srcStat) return;

  if (srcStat.isFile()) {
    await copySingleFile(src, dest, { optimize, overwrite });
  } else if (srcStat.isDirectory()) {
    await copyDirectory(src, dest, { optimize, overwrite, filter });
  }
}

async function copySingleFile(src, dest, { optimize, overwrite }) {
  if (!overwrite) {
    const destStat = await fs.stat(dest).catch(() => null);
    if (destStat && destStat.mtimeMs >= (await fs.stat(src)).mtimeMs) {
      return; // dest is up-to-date
    }
  }

  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);

  if (optimize && isImageFile(dest)) {
    try {
      await optimizeImage(dest, { verbose: false });
    } catch (err) {
      console.warn(`  ⚠ Failed to optimize ${path.basename(dest)}: ${err.message}`);
    }
  }
}

async function copyDirectory(srcDir, destDir, { optimize, overwrite, filter }) {
  const patterns = filter || ["**/*"];

  // globby returns relative paths when given a cwd
  const relPaths = await globby(patterns, {
    cwd: srcDir,
    dot: true,
    onlyFiles: true,
  });

  await Promise.all(
    relPaths.map(async (relPath) => {
      const srcFile = path.join(srcDir, relPath);
      const destFile = path.join(destDir, relPath);

      if (!overwrite) {
        const [srcStat, destStat] = await Promise.all([
          fs.stat(srcFile),
          fs.stat(destFile).catch(() => null),
        ]);
        if (destStat && destStat.mtimeMs >= srcStat.mtimeMs) {
          return; // dest is up-to-date
        }
      }

      await fs.mkdir(path.dirname(destFile), { recursive: true });
      await fs.copyFile(srcFile, destFile);

      if (optimize && isImageFile(destFile)) {
        try {
          await optimizeImage(destFile, { verbose: false });
        } catch (err) {
          console.warn(`  ⚠ Failed to optimize ${path.basename(destFile)}: ${err.message}`);
        }
      }
    })
  );
}
