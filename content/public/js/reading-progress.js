(function () {

  const article = document.querySelector('article.post');
  if (!article) return;

  const articleHeader = article.querySelector('header');
  const contentStart = articleHeader
    ? articleHeader.offsetTop + articleHeader.offsetHeight
    : article.offsetTop;
  const contentEnd = article.offsetTop + article.offsetHeight;
  const contentHeight = contentEnd - contentStart;

  // Only show on posts longer than one screenful
  if (contentHeight <= window.innerHeight) return;

  const bar = document.createElement('div');
  bar.style.cssText = [
    'position: fixed',
    'top: 0',
    'left: 0',
    'width: 0%',
    'height: 4px',
    'background-color: var(--theme-link-color)',
    'z-index: 9999',
    'opacity: 0',
    'transition: opacity 300ms ease',
    'pointer-events: none',
  ].join(';');
  document.body.appendChild(bar);

  let ticking = false;

  const updateProgress = () => {
    const scrollable = contentEnd - contentStart - window.innerHeight;
    if (scrollable <= 0) return;

    const progress = Math.max(0, Math.min(1,
      (window.scrollY - contentStart) / scrollable
    ));

    bar.style.width = (progress * 100) + '%';
    bar.style.opacity = progress > 0 ? '1' : '0';
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  // Set initial state (e.g., page loaded mid-scroll via back button)
  updateProgress();

}());
