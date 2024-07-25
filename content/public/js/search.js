export async function init() {

  const head = document.head || document.getElementsByTagName('head')[0];

  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "/pagefind/pagefind-ui.css";
  head.insertBefore(style, head.firstChild);

  const script = document.createElement('script');
  script.src = '/pagefind/pagefind-ui.js';
  script.async = false; // optionally

  script.onload = () => {
    console.log("LOADED PAGEFIND");
    new window.PagefindUI({
      element: "#search",
      showSubResults: false,
      showImages: false,
    });
  };
  
  head.insertBefore(script, head.firstChild);
}
