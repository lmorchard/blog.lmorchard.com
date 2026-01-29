import * as esbuild from "esbuild";
import fs from "node:fs/promises";
import globby from "globby";
import path from "node:path";

const VENDOR_SRC_PATH = "./content/public/js/vendor/bundles";
const VENDOR_BUILD_PATH = "./build/js/vendor/bundles";

export async function buildVendorBundles() {
  // Clean the vendor bundles build directory
  try {
    await fs.rm(VENDOR_BUILD_PATH, { recursive: true, force: true });
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Error removing vendor bundles directory:", error);
      throw error;
    }
  }
  await fs.mkdir(VENDOR_BUILD_PATH, { recursive: true });

  // Bundle up vendor dependencies
  await esbuild.build({
    outdir: path.resolve(VENDOR_BUILD_PATH),
    entryPoints: await globby(path.resolve(VENDOR_SRC_PATH, "**/*.js")),
    minify: true,
    bundle: true,
    splitting: true,
    sourcemap: true,
    format: "esm",
    logLevel: "info",
  });

  console.log("✓ Vendor bundles built successfully");
}
