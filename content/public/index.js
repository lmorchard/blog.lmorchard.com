import "./js/components/index.js";
import { init as componentLazyLoaderInit } from "./js/component-lazy-loader.js";
import "./js/disqus-lazy-loader.js"
import "./js/media-lazy-loader.js"
import "./js/toc.js";

import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/es/highlight.min.js';
//import hljs from './vendor/highlight.js/highlight.js';

const highlightLanguages = ["javascript", "python", "bash", "xml", "css", "go" ];

async function main() {
  await componentLazyLoaderInit();
  await Promise.all(highlightLanguages.map(importLanguage));

  hljs.highlightAll();

  console.log("READY.");
}

async function importLanguage(lang) {
  const lib = await import(`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/es/languages/${lang}.min.js`);
  //const lib = await import(`./vendor/highlight.js/languages/${lang}.min.js`);
  hljs.registerLanguage(lang, lib.default);
}

main().catch((err) => console.error(err));
