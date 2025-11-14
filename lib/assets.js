import config from "../config.js";
import { copyWithOptimization } from "./copyWithOptimization.js";

export async function copyAssets(options = {}) {
  const { optimize = true } = options;

  for (const assetPath of config.assetPaths) {
    console.log(`Copying assets from ${assetPath}...`);
    await copyWithOptimization(assetPath, config.buildPath, {
      overwrite: true,
      optimize,
    });
  }
}
