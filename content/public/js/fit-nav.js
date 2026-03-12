(function () {

  const nav = document.querySelector('body > header > nav.main-nav');
  const navList = nav && nav.querySelector('ul');
  if (!navList) return;

  const fit = () => {
    navList.style.fontSize = '';

    // Only scale on wide screens where the grid layout is active
    if (window.innerWidth < 1200) return;

    // Use the top row (search + theme switcher) width as target
    const topRow = nav.querySelector('.main-nav-top');
    const targetWidth = topRow && topRow.clientWidth > 0
      ? topRow.clientWidth
      : nav.clientWidth;
    if (targetWidth <= 0) return;

    // Temporarily prevent flex shrink to measure natural width
    const items = navList.querySelectorAll('li');
    items.forEach(li => li.style.flexShrink = '0');
    const naturalWidth = navList.scrollWidth;
    items.forEach(li => li.style.flexShrink = '');

    if (naturalWidth > targetWidth) {
      navList.style.fontSize = (targetWidth / naturalWidth) + 'em';
    }
  };

  // Pagefind search UI renders asynchronously — refit once it appears
  const topRowEl = nav.querySelector('.main-nav-top');
  if (topRowEl) {
    const observer = new MutationObserver(() => {
      observer.disconnect();
      fit();
    });
    observer.observe(topRowEl, { childList: true, subtree: true });
  }

  // Also try immediately in case search is already rendered
  fit();

  // Recalculate on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(fit, 100);
  }, { passive: true });

}());
