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

/**
 * Apply a dithered, posterized effect to an image
 * Similar to: convert -scale 33% -dither Riemersma -colors 32 -scale 300%
 * @param {string} inputPath - Path to the input image file
 * @param {string} outputPath - Path to save the output image (optional, defaults to input with -dithered suffix)
 * @param {object} options - Options object
 * @param {number} options.maxWidth - Maximum width before processing (default: 1024)
 * @param {number} options.downscale - Scale factor for downsizing (default: 0.33)
 * @param {number} options.upscale - Scale factor for upsizing (default: 3.0)
 * @param {number} options.colors - Number of colors for posterization (default: 5 bits ~= 32 colors)
 * @param {boolean} options.lofi - Extra lo-fi mode with more aggressive settings (default: false)
 * @param {boolean} options.verbose - If true, log detailed information (default: true)
 * @returns {Promise<{inputPath: string, outputPath: string, originalSize: number, resultSize: number}>}
 */
export async function ditherImage(inputPath, outputPath = null, options = {}) {
  const {
    maxWidth = 1024,
    downscale = 0.33,
    upscale = 3.0,
    colors = 5,
    lofi = false,
    verbose = true
  } = options;

  // Apply extra lo-fi settings if requested
  const effectiveDownscale = lofi ? downscale * 0.5 : downscale; // Even coarser
  const effectiveColors = lofi ? Math.max(2, colors - 2) : colors; // Fewer colors

  // Default output path: replace extension with -dithered.png
  if (!outputPath) {
    const ext = path.extname(inputPath);
    outputPath = inputPath.replace(ext, '-dithered.png');
  }

  const inputFilename = path.basename(inputPath);
  const outputFilename = path.basename(outputPath);

  try {
    // Get original file size
    const originalStats = await fs.stat(inputPath);
    const originalSize = originalStats.size;

    // Load the image and get its metadata
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    let { width, height } = metadata;

    // First, constrain to maxWidth if needed
    let startWidth = width;
    let startHeight = height;
    if (width > maxWidth) {
      startWidth = maxWidth;
      startHeight = Math.round((height * maxWidth) / width);
    }

    // Calculate intermediate dimensions (after downscale)
    const intermediateWidth = Math.round(startWidth * effectiveDownscale);
    const intermediateHeight = Math.round(startHeight * effectiveDownscale);

    // Calculate final dimensions (after upscale)
    const finalWidth = Math.round(intermediateWidth * upscale);
    const finalHeight = Math.round(intermediateHeight * upscale);

    if (verbose) {
      console.log(`  Processing: ${inputFilename}`);
      console.log(`    Original: ${width}x${height}`);
      if (startWidth !== width) {
        console.log(`    Constrained to: ${startWidth}x${startHeight}`);
      }
      console.log(`    Intermediate: ${intermediateWidth}x${intermediateHeight}`);
      console.log(`    Final: ${finalWidth}x${finalHeight}`);
      console.log(`    Colors: ${Math.pow(2, effectiveColors)}`);
    }

    // Apply the dithered effect:
    // 0. Optionally constrain to maxWidth
    // 1. Downscale
    // 2. Reduce colors by forcing palette mode with limited colors
    // 3. Upscale using nearest neighbor to preserve pixelated look
    let pipeline = sharp(inputPath);

    // Constrain to maxWidth first if needed
    if (width > maxWidth) {
      pipeline = pipeline.resize(startWidth, startHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    await pipeline
      .resize(intermediateWidth, intermediateHeight, {
        kernel: 'lanczos3'
      })
      .toColourspace('srgb')
      .resize(finalWidth, finalHeight, {
        kernel: 'nearest'
      })
      .png({
        compressionLevel: 9,
        palette: true,
        colors: Math.pow(2, effectiveColors), // Convert bits to actual color count
        effort: 10,
        dither: 1.0
      })
      .toFile(outputPath);

    // Get result file size
    const resultStats = await fs.stat(outputPath);
    const resultSize = resultStats.size;

    if (verbose) {
      console.log(`  ✓ Created: ${outputFilename} (${formatBytes(originalSize)} → ${formatBytes(resultSize)})`);
    }

    return { inputPath, outputPath, originalSize, resultSize };
  } catch (err) {
    if (verbose) {
      console.error(`  ⚠ Dither failed for ${inputFilename}: ${err.message}`);
    }
    throw err;
  }
}
