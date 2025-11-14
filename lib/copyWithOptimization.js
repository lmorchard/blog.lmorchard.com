import path from "path";
import { promises as fs } from "fs";
import copy from "recursive-copy";
import globby from "globby";

import { optimizeImage, isImageFile } from "./imageUtils.js";

/**
 * Copy files with optional image optimization
 * @param {string} src - Source path
 * @param {string} dest - Destination path
 * @param {object} options - Copy options
 * @param {boolean} options.optimize - Whether to optimize images (default: true)
 * @param {boolean} options.overwrite - Whether to overwrite existing files
 * @param {Array<string>} options.filter - File filters
 * @returns {Promise<Array>} Copy results
 */
export async function copyWithOptimization(src, dest, options = {}) {
  const { optimize = true, ...copyOptions } = options;

  // First, do the copy
  const results = await copy(src, dest, copyOptions);

  if (!optimize) {
    return results;
  }

  // Then optimize any images that were copied
  const destStats = await fs.stat(dest).catch(() => null);
  if (!destStats) {
    return results;
  }

  let imagesToOptimize = [];

  if (destStats.isFile() && isImageFile(dest)) {
    // Single file copy - optimize if it's an image
    imagesToOptimize = [dest];
  } else if (destStats.isDirectory()) {
    // Directory copy - find all images in destination
    imagesToOptimize = await globby(`${dest}/**/*.{jpg,jpeg,png,webp,gif}`, {
      ignore: ['**/*.tmp'],
    });
  }

  // Optimize each image
  for (const imagePath of imagesToOptimize) {
    try {
      await optimizeImage(imagePath, { verbose: false });
    } catch (err) {
      // If optimization fails, log but don't fail the build
      console.warn(`  ⚠ Failed to optimize ${path.basename(imagePath)}: ${err.message}`);
    }
  }

  return results;
}
