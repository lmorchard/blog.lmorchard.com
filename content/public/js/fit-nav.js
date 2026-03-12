(function () {

  const nav = document.querySelector('body > header > nav.main-nav');
  const navList = nav && nav.querySelector('ul');
  if (!navList) return;

  const fit = () => {
    navList.style.fontSize = '';

    // Only scale on wide screens where the grid layout is active
    if (window.innerWidth < 1200) return;

    // Use search box width as the target, fall back to nav width
    const searchBox = nav.querySelector('#search');
    const targetWidth = searchBox && searchBox.clientWidth > 0
      ? searchBox.clientWidth
      : nav.clientWidth;
    if (targetWidth <= 0) return;

    // Temporarily prevent flex shrink to measure natural width
    const items = navList.querySelectorAll('li');
    items.forEach(li => li.style.flexShrink = '0');
    const naturalWidth = navList.scrollWidth;
    items.forEach(li => li.style.flexShrink = '');

    if (naturalWidth > targetWidth) {
      navList.style.fontSize = ((targetWidth / naturalWidth) * 0.98) + 'em';
    }
  };

  // Pagefind search UI renders asynchronously — watch for it
  const searchContainer = nav.querySelector('#search');
  if (searchContainer) {
    const observer = new MutationObserver(() => {
      if (searchContainer.clientWidth > 0) {
        observer.disconnect();
        fit();
      }
    });
    observer.observe(searchContainer, { childList: true, subtree: true });
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
