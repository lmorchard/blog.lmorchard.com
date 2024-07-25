import "./js/components/index.js";
import "./js/disqus-lazy-loader.js";
import "./js/media-lazy-loader.js";
import "./js/toc.js";

import { init as componentLazyLoaderInit } from "./js/component-lazy-loader.js";
import { init as searchInit } from "./js/search.js";
import { init as highlightInit } from "./js/highlight-loader.js";

async function main() {
  await componentLazyLoaderInit();
  await searchInit();
  await highlightInit();

  console.log("READY.");
}

main().catch((err) => console.error(err));
