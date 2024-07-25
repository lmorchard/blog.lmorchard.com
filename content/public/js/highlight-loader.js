//import hljs from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/es/highlight.min.js";
//import hljs from './vendor/highlight.js/highlight.js';

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

  console.log("LOADING HIGHLIGHT");

  const head = document.head || document.getElementsByTagName('head')[0];

  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "/vendor/highlight.js/dracula.min.css";
  head.insertBefore(style, head.firstChild);

  const script = document.createElement('script');
  script.src = '/vendor/highlight.js/highlight.min.js';
  script.async = false; // optionally
  script.onload = () => {
    console.log("LOADED HIGHLIGHT");
    window.hljs.highlightAll();
  };
  head.insertBefore(script, head.firstChild);

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
