// adapted from https://lamplightdev.com/blog/2020/03/20/lazy-loading-web-components-with-intersection-observer/

export async function init() {
  let observer = new IntersectionObserver(handleIntersections);
  const els = document.querySelectorAll(".lazy-load-component");
  for (let el of els) observer.observe(el);
}

const imported = {};

async function handleIntersections(entries, observerRef) {
  for (let entry of entries) {
    if (!entry.isIntersecting) continue;

    const name = entry.target.nodeName.toLowerCase();
    if (!name.includes("-")) continue;

    observerRef.unobserve(entry.target);

    if (imported[name]) continue;
    imported[name] = true;

    console.debug(`Lazy loading component: ${name}`);
    await import(`./components/${name}.js`);
  }
}
