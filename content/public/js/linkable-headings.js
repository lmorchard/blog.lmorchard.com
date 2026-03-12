(function () {

  const article = document.querySelector('article.post');
  if (!article) return;

  const headings = article.querySelectorAll('h2[id], h3[id], h4[id]');
  if (!headings.length) return;

  // Styles for the heading anchor wrapper and # indicator
  const style = document.createElement('style');
  style.textContent = [
    'article.post :is(h2, h3, h4) .heading-anchor {',
    '  color: inherit;',
    '  text-decoration: none;',
    '}',
    'article.post :is(h2, h3, h4) .heading-anchor::before {',
    '  content: "#";',
    '  position: absolute;',
    '  left: -1.25em;',
    '  opacity: 0.25;',
    '  transition: opacity 200ms ease;',
    '}',
    'article.post :is(h2, h3, h4):hover .heading-anchor::before,',
    'article.post .heading-anchor:focus::before {',
    '  opacity: 1;',
    '}',
  ].join('\n');
  document.head.appendChild(style);

  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    heading.style.position = 'relative';

    const anchor = document.createElement('a');
    anchor.href = '#' + heading.id;
    anchor.className = 'heading-anchor';

    // Wrap all existing heading content inside the anchor
    while (heading.firstChild) {
      anchor.appendChild(heading.firstChild);
    }
    heading.appendChild(anchor);
  }

}());
