(function () {

  const nav = document.querySelector('body > header > nav.main-nav');
  const navList = nav && nav.querySelector('ul');
  if (!navList) return;

  const fit = () => {
    navList.style.fontSize = '';

    // Only scale on wide screens where the grid layout is active
    if (window.innerWidth < 1200) return;

    const targetWidth = nav.clientWidth;
    if (targetWidth <= 0) return;

    // Temporarily make the list inline-flex to measure its natural width
    const origDisplay = navList.style.display;
    const origWidth = navList.style.width;
    navList.style.display = 'inline-flex';
    navList.style.width = 'auto';
    const naturalWidth = navList.scrollWidth;
    navList.style.display = origDisplay;
    navList.style.width = origWidth;

    if (naturalWidth > targetWidth) {
      navList.style.fontSize = (targetWidth / naturalWidth) + 'em';
    }
  };

  // Pagefind search UI renders asynchronously — refit after it appears
  const searchContainer = nav.querySelector('#search');
  if (searchContainer) {
    const observer = new MutationObserver(() => {
      observer.disconnect();
      fit();
    });
    observer.observe(searchContainer, { childList: true, subtree: true });
  }

  // Also try immediately
  fit();

  // Recalculate on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(fit, 100);
  }, { passive: true });

}());
