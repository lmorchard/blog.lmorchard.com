import "./js/components/index.js";
import { init as componentLazyLoaderInit } from "./js/component-lazy-loader.js";
import "./js/disqus-lazy-loader.js"
import "./js/media-lazy-loader.js"
import "./js/toc.js";

async function main() {
  await componentLazyLoaderInit();
  console.log("READY.");
}

main().catch((err) => console.error(err));
