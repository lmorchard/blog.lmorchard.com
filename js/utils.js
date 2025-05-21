export async function loadStyle(src) {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = src;
    style.onload = resolve;
    style.onerror = reject;
    head.insertBefore(style, head.firstChild);
  })
}

export async function loadScript(src) {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = resolve;
    script.onerror = reject;
    head.insertBefore(script, head.firstChild);
  });
}
