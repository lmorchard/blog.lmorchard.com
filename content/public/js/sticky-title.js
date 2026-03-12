(function () {

  // Only on screens where the header is a grid with an empty main column
  const mq = window.matchMedia('(min-width: 1200px)');
  if (!mq.matches) return;

  const article = document.querySelector('article');
  if (!article) return;

  const realTitle = article.querySelector('header h1');
  if (!realTitle) return;

  const siteHeader = document.querySelector('body > header');
  if (!siteHeader) return;

  // Create the clone in the site header
  const clone = document.createElement('div');
  clone.className = 'sticky-title';
  clone.textContent = realTitle.textContent;
  siteHeader.appendChild(clone);

  // Inject styles
  const style = document.createElement('style');
  style.textContent = [
    'body > header > .sticky-title {',
    '  grid-column: main;',
    '  grid-row: 1;',
    '  align-self: center;',
    '  font-size: 1.9em;',
    '  font-weight: 700;',
    '  line-height: 1.2em;',
    '  text-align: center;',
    '  opacity: 0;',
    '  transition: opacity 200ms ease;',
    '  pointer-events: none;',
    '  white-space: nowrap;',
    '  overflow: hidden;',
    '  text-overflow: ellipsis;',
    '}',
    'body > header > .sticky-title.visible {',
    '  opacity: 1;',
    '}',
    'article > header > h1 {',
    '  transition: opacity 200ms ease;',
    '}',
    'article > header > h1.faded {',
    '  opacity: 0;',
    '}',
  ].join('\n');
  document.head.appendChild(style);

  // Hide the redundant title in the ToC since the header clone serves that purpose
  const tocTitle = article.querySelector('nav.table-of-contents .title');
  if (tocTitle) tocTitle.style.display = 'none';

  // Shrink font to fit if title is too long for the container
  const baseFontSize = 1.9;
  const fitTitle = () => {
    // Temporarily remove overflow hidden to get true scroll width
    clone.style.overflow = 'visible';
    clone.style.fontSize = baseFontSize + 'em';
    const naturalWidth = clone.scrollWidth;
    const containerWidth = clone.clientWidth;
    clone.style.overflow = '';
    if (naturalWidth > containerWidth && containerWidth > 0) {
      const scale = (containerWidth / naturalWidth) * 0.9;
      clone.style.fontSize = (baseFontSize * scale) + 'em';
    }
  };
  fitTitle();

  // Get the sticky header height for offset calculation
  const getHeaderBottom = () => siteHeader.getBoundingClientRect().bottom;

  const update = () => {
    const titleRect = realTitle.getBoundingClientRect();
    const headerBottom = getHeaderBottom();

    // Show clone when the real title has scrolled behind the sticky header
    if (titleRect.bottom < headerBottom) {
      clone.classList.add('visible');
      realTitle.classList.add('faded');
    } else {
      clone.classList.remove('visible');
      realTitle.classList.remove('faded');
    }
  };

  // Use rAF-guarded scroll listener for reliable updates
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial check
  update();

}());
