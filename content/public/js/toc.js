(function () {

  // Quick and dirty table of contents generator
  var tocRoot = document.querySelector('article nav.table-of-contents');
  if (tocRoot) {

    var h2s = tocRoot.parentNode.querySelectorAll('h2');
    if (h2s.length) {

      var title = document.createElement('p');
      title.classList.add('title');

      const metaTitle = document.querySelector('meta[property="og:title"]');
      const h1 = document.querySelector('article header h1');
      if (metaTitle) {
        title.innerHTML = metaTitle.getAttribute("content");
      } else if (h1) {
        title.innerHTML = h1.innerHTML
      } else {
        title.innerHTML = 'Contents';
      }

      tocRoot.appendChild(title);

      var list = document.createElement('ol');
      tocRoot.appendChild(list);

      const headingToItem = new Map();
      for (var idx = 0; idx < h2s.length; idx++) {
        var h2 = h2s[idx];
        var item = document.createElement('li');
        var link = document.createElement('a');
        link.href = '#' + h2.id;
        link.innerHTML = h2.innerHTML;
        item.appendChild(link);
        list.appendChild(item);
        headingToItem.set(h2, item);
      }

      // Smooth scroll when clicking ToC links
      list.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', link.getAttribute('href'));
      });

      // Scroll-based highlight: track which section the reader is in
      let activeItem = null;

      // Account for sticky header when measuring "top of readable area"
      const getHeaderOffset = () => {
        const siteHeader = document.querySelector('body > header');
        if (!siteHeader) return 0;
        const style = getComputedStyle(siteHeader);
        if (style.position === 'sticky' || style.position === 'fixed') {
          return siteHeader.getBoundingClientRect().height;
        }
        return 0;
      };

      const articleHeader = tocRoot.parentNode.querySelector('header');

      const updateActiveHeading = () => {
        // Find the h2 nearest to the effective top (below sticky header)
        const headerOffset = getHeaderOffset();
        let currentHeading = null;
        let closestDistance = Infinity;

        // If the article header is closer than any h2, highlight nothing
        if (articleHeader) {
          closestDistance = Math.abs(articleHeader.getBoundingClientRect().top - headerOffset);
        }

        for (let i = 0; i < h2s.length; i++) {
          const distance = Math.abs(h2s[i].getBoundingClientRect().top - headerOffset);
          if (distance < closestDistance) {
            closestDistance = distance;
            currentHeading = h2s[i];
          }
        }

        const newItem = currentHeading ? headingToItem.get(currentHeading) : null;
        if (newItem !== activeItem) {
          if (activeItem) activeItem.classList.remove('active');
          if (newItem) newItem.classList.add('active');
          activeItem = newItem;
        }
      };

      // Use IntersectionObserver as primary trigger
      const observer = new IntersectionObserver(updateActiveHeading, {
        rootMargin: '0px 0px -90% 0px',
        threshold: 0,
      });

      for (let i = 0; i < h2s.length; i++) {
        observer.observe(h2s[i]);
      }

      // Also listen on scroll to catch anchor jumps and edge cases
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveHeading, 50);
      }, { passive: true });

    }

  }

}());
