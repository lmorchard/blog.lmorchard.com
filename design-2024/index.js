// import "./js/components/index.js";
import { init as componentLazyLoaderInit } from "./js/component-lazy-loader.js";

async function main() {
  await componentLazyLoaderInit();
  console.log("READY.");
}

main().catch((err) => console.error(err));
