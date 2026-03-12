(function () {

  // Quick and dirty table of contents generator
  var tocRoot = document.querySelector('article.post nav.table-of-contents');
  if (tocRoot) {

    var h2s = tocRoot.parentNode.querySelectorAll('h2');
    if (h2s.length) {

      var title = document.createElement('p');
      title.classList.add('title');

      const metaTitle = document.querySelector('meta[property="og:title"]');
      const h1 = document.querySelector('article.post header h1');
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

      // Scroll-based highlight: track which section the reader is in
      let activeItem = null;

      const updateActiveHeading = () => {
        // Find the last h2 whose top has scrolled past the offset
        const offset = 100;
        let currentHeading = null;
        for (let i = 0; i < h2s.length; i++) {
          if (h2s[i].getBoundingClientRect().top <= offset) {
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

      const observer = new IntersectionObserver(updateActiveHeading, {
        rootMargin: '0px 0px -90% 0px',
        threshold: 0,
      });

      for (let i = 0; i < h2s.length; i++) {
        observer.observe(h2s[i]);
      }

    }

  }

}());
