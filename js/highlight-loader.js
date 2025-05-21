//import hljs from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/es/highlight.min.js";
//import hljs from './vendor/highlight.js/highlight.js';

import { loadScript, loadStyle } from "./utils.js";

const highlightLanguages = [
  "javascript",
  "python",
  "bash",
  "xml",
  "css",
  "go",
  "markdown",
  "json",
  "yaml",
];

export async function init() {
  if (document.body.querySelectorAll('pre').length === 0) {
    console.log("SKIPPING HIGHLIGHT");
    return;
  }

  await loadStyle("/vendor/highlight.js/dracula.min.css");
  await loadScript('/vendor/highlight.js/highlight.min.js');

  console.log("LOADED HIGHLIGHT");
  window.hljs.highlightAll();

  // await Promise.all(highlightLanguages.map(importLanguage));
  // hljs.highlightAll();
}


async function importLanguage(lang) {
  const lib = await import(
    `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/es/languages/${lang}.min.js`
  );
  //const lib = await import(`./vendor/highlight.js/languages/${lang}.min.js`);
  hljs.registerLanguage(lang, lib.default);
}
