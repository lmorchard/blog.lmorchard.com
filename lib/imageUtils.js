import path from "path";
import { promises as fs } from "fs";
import sharp from "sharp";

/**
 * Optimize an image file using sharp
 * @param {string} imagePath - Path to the image file
 * @param {object} options - Options object
 * @param {boolean} options.verbose - If true, log detailed information (default: true)
 * @returns {Promise<{originalSize: number, optimizedSize: number, savings: number, savingsPercent: number}>}
 */
export async function optimizeImage(imagePath, options = {}) {
  const { verbose = true } = options;
  const ext = path.extname(imagePath).toLowerCase();
  const filename = path.basename(imagePath);

  // Get original file size
  const originalStats = await fs.stat(imagePath);
  const originalSize = originalStats.size;

  try {
    let pipeline = sharp(imagePath);

    // Resize to max 1400px (maintaining aspect ratio)
    pipeline = pipeline.resize(1400, 1400, {
      fit: 'inside',
      withoutEnlargement: true
    });

    if (ext === '.jpg' || ext === '.jpeg') {
      // JPEG: auto-orient, quality 75, strip metadata
      pipeline = pipeline
        .rotate() // auto-orient based on EXIF
        .jpeg({ quality: 75, mozjpeg: true });
    } else if (ext === '.png') {
      // PNG: strip metadata, high compression
      pipeline = pipeline
        .png({ compressionLevel: 9, effort: 10 });
    } else if (ext === '.webp') {
      // WebP: quality 75
      pipeline = pipeline
        .webp({ quality: 75 });
    } else {
      // Unsupported format, skip optimization
      if (verbose) {
        console.log(`  ⊘ Skipped: ${filename} (unsupported format)`);
      }
      return { originalSize, optimizedSize: originalSize, savings: 0, savingsPercent: 0 };
    }

    // Write to a temp file first, then replace original
    const tempPath = `${imagePath}.tmp`;
    await pipeline.toFile(tempPath);

    // Get optimized file size
    const optimizedStats = await fs.stat(tempPath);
    const optimizedSize = optimizedStats.size;

    // Replace original with optimized version
    await fs.rename(tempPath, imagePath);

    // Calculate savings
    const savings = originalSize - optimizedSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

    if (verbose) {
      console.log(`  ✓ Optimized: ${filename} (${formatBytes(originalSize)} → ${formatBytes(optimizedSize)}, ${savingsPercent}% savings)`);
    }

    return { originalSize, optimizedSize, savings, savingsPercent: parseFloat(savingsPercent) };
  } catch (err) {
    if (verbose) {
      console.error(`  ⚠ Optimization failed for ${filename}: ${err.message}`);
    }
    return { originalSize, optimizedSize: originalSize, savings: 0, savingsPercent: 0, error: err.message };
  }
}

/**
 * Format bytes to human-readable string
 * @param {number} bytes - Number of bytes
 * @returns {string} Formatted string (e.g., "1.2MB")
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)}${sizes[i]}`;
}

/**
 * Check if a file is an image based on extension
 * @param {string} filepath - Path to check
 * @returns {boolean} True if the file appears to be an image
 */
export function isImageFile(filepath) {
  const ext = path.extname(filepath).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
}
