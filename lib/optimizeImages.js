import path from "path";
import { promises as fs } from "fs";
import globby from "globby";

import config from "../config.js";
import { optimizeImage, formatBytes, isImageFile } from "./imageUtils.js";

/**
 * Optimize existing images in blog posts or directories matching the given globs
 * @param {string[]} globs - Array of glob patterns for posts or images to process
 * @param {object} options - Options object
 * @returns {Promise<void>}
 */
export async function optimizePostImages(globs = [`${config.postsPath}/**/*.{md,markdown}`], options = {}) {
  // Check if globs contain image extensions - if so, treat as direct image files
  const hasImageExtensions = globs.some(g =>
    /\.(jpg|jpeg|png|webp|gif)$/i.test(g) ||
    /\{.*?(jpg|jpeg|png|webp|gif).*?\}/.test(g)
  );

  if (hasImageExtensions) {
    // Direct image file optimization
    await optimizeImageFiles(globs, options);
  } else {
    // Post-based optimization
    await optimizeImagesInPosts(globs, options);
  }
}

/**
 * Optimize image files directly from glob patterns
 * @param {string[]} imageGlobs - Array of glob patterns for image files
 * @param {object} options - Options object
 * @returns {Promise<void>}
 */
async function optimizeImageFiles(imageGlobs, options = {}) {
  const imageFiles = await globby(imageGlobs, {
    ignore: ['**/*.tmp'],
  });

  console.log(`Found ${imageFiles.length} image(s) to optimize`);

  if (imageFiles.length === 0) {
    console.log(`\nNo images found to optimize`);
    return;
  }

  let totalImagesOptimized = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const imageFile of imageFiles) {
    if (isImageFile(imageFile)) {
      const result = await optimizeImage(imageFile, { verbose: true });
      if (!result.error) {
        totalImagesOptimized++;
        totalOriginalSize += result.originalSize;
        totalOptimizedSize += result.optimizedSize;
      }
    }
  }

  if (totalImagesOptimized > 0) {
    const totalSavings = totalOriginalSize - totalOptimizedSize;
    const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);
    console.log(`\n✓ Optimized ${totalImagesOptimized} image(s) (${formatBytes(totalOriginalSize)} → ${formatBytes(totalOptimizedSize)}, ${totalSavingsPercent}% total savings)`);
  } else {
    console.log(`\nNo images found to optimize`);
  }
}

/**
 * Optimize images in blog posts matching the given globs
 * @param {string[]} postGlobs - Array of glob patterns for posts to process
 * @param {object} options - Options object
 * @returns {Promise<void>}
 */
async function optimizeImagesInPosts(postGlobs, options = {}) {
  const postFiles = await globby(postGlobs, {
    ignore: [
      `${config.postsPath}/**/{_*,node_modules,build,tmp}/**/*.{md,markdown}`,
      `${config.postsPath}/**/*.sync-conflict-*`,
    ],
  });

  console.log(`Found ${postFiles.length} post(s) to process`);

  let totalImagesOptimized = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const postFile of postFiles) {
    const result = await optimizeImagesInPost(postFile, options);
    totalImagesOptimized += result.imagesOptimized;
    totalOriginalSize += result.originalSize;
    totalOptimizedSize += result.optimizedSize;
  }

  if (totalImagesOptimized > 0) {
    const totalSavings = totalOriginalSize - totalOptimizedSize;
    const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);
    console.log(`\n✓ Optimized ${totalImagesOptimized} image(s) (${formatBytes(totalOriginalSize)} → ${formatBytes(totalOptimizedSize)}, ${totalSavingsPercent}% total savings)`);
  } else {
    console.log(`\nNo images found to optimize`);
  }
}

/**
 * Optimize images in a single post
 * @param {string} postFile - Path to the post markdown file
 * @param {object} options - Options object
 * @returns {Promise<{imagesOptimized: number, originalSize: number, optimizedSize: number}>}
 */
async function optimizeImagesInPost(postFile, options = {}) {
  const basename = path.basename(postFile);

  // Determine the directory to search for images
  let postDir;
  if (basename === 'index.md' || basename === 'index.markdown') {
    // Directory-based post - images are in the same directory
    postDir = path.dirname(postFile);
  } else {
    // Standalone markdown file - check if there's a corresponding directory
    const postName = path.basename(postFile, path.extname(postFile));
    const parentDir = path.dirname(postFile);
    const potentialDir = path.join(parentDir, postName);

    try {
      const stats = await fs.stat(potentialDir);
      if (stats.isDirectory()) {
        postDir = potentialDir;
      } else {
        // No directory, no images to optimize
        return { imagesOptimized: 0, originalSize: 0, optimizedSize: 0 };
      }
    } catch {
      // Directory doesn't exist, no images to optimize
      return { imagesOptimized: 0, originalSize: 0, optimizedSize: 0 };
    }
  }

  // Find all image files in the post directory
  const imageGlob = path.join(postDir, '*.{jpg,jpeg,png,webp,gif}');
  const imageFiles = await globby(imageGlob, {
    ignore: ['**/*.tmp'],
  });

  if (imageFiles.length === 0) {
    return { imagesOptimized: 0, originalSize: 0, optimizedSize: 0 };
  }

  console.log(`\nProcessing: ${postFile}`);
  console.log(`  Found ${imageFiles.length} image(s) to optimize`);

  let imagesOptimized = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const imageFile of imageFiles) {
    if (isImageFile(imageFile)) {
      const result = await optimizeImage(imageFile, { verbose: true });
      if (!result.error) {
        imagesOptimized++;
        totalOriginalSize += result.originalSize;
        totalOptimizedSize += result.optimizedSize;
      }
    }
  }

  return { imagesOptimized, originalSize: totalOriginalSize, optimizedSize: totalOptimizedSize };
}
