import copy from "recursive-copy";
import config from "../config.js";

export async function copyAssets() {
  for (const assetPath of config.assetPaths) {
    await copy(assetPath, config.buildPath, {
      overwrite: true,
    });
  }
}
