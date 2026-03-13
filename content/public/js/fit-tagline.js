(function () {

  const masthead = document.querySelector('body > header .masthead');
  if (!masthead) return;

  const titleDiv = masthead.querySelector('.title');
  const titleEl = masthead.querySelector('h1');
  const taglineEl = masthead.querySelector('h2');
  if (!titleEl || !taglineEl || !titleDiv) return;

  // Measure the actual text width of an element (not block width)
  const measureTextWidth = (el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    return range.getBoundingClientRect().width;
  };

  const fit = () => {
    const maxTitleFontSize = window.innerWidth >= 1200 ? Infinity : 24;
    // Reset sizes to measure natural widths
    titleEl.style.fontSize = '';
    taglineEl.style.fontSize = '';

    const containerWidth = titleDiv.clientWidth;
    if (containerWidth <= 0) return;

    // Scale title text to fill the container width, capped at max size
    const titleTextWidth = measureTextWidth(titleEl);
    if (titleTextWidth > 0 && titleTextWidth < containerWidth) {
      const baseFontSize = parseFloat(getComputedStyle(titleEl).fontSize);
      const titleScale = containerWidth / titleTextWidth;
      const newSize = Math.min(baseFontSize * titleScale, maxTitleFontSize);
      titleEl.style.fontSize = newSize + 'px';
    }

    // Scale tagline to match the title's rendered width
    const newTitleWidth = measureTextWidth(titleEl);
    const taglineTextWidth = measureTextWidth(taglineEl);
    if (taglineTextWidth > 0 && newTitleWidth > 0) {
      const baseFontSize = parseFloat(getComputedStyle(taglineEl).fontSize);
      const taglineScale = newTitleWidth / taglineTextWidth;
      taglineEl.style.fontSize = (baseFontSize * taglineScale) + 'px';
    }
  };

  fit();

  // Refit when the rotating-tagline swaps text
  const taglineSpan = taglineEl.querySelector('.tagline');
  if (taglineSpan) {
    const observer = new MutationObserver(fit);
    observer.observe(taglineSpan, { childList: true, characterData: true });
  }

  // Refit on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(fit, 100);
  }, { passive: true });

}());
