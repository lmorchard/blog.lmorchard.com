import { loadScript, loadStyle } from "./utils.js";

export async function init() {

  await loadStyle("/pagefind/pagefind-ui.css");
  await loadScript('/pagefind/pagefind-ui.js');

  console.log("LOADED PAGEFIND");
  
  new window.PagefindUI({
    element: "#search",
    showSubResults: false,
    showImages: false,
  });
}
