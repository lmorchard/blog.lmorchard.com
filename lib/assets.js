const copy = require("recursive-copy");
const config = require("../config");

async function copyAssets() {
  for (const assetPath of config.assetPaths) {
    await copy(assetPath, config.buildPath, {
      overwrite: true,
    });
  }
}

module.exports = {
  copyAssets
};