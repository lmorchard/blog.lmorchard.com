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

      for (var idx = 0; idx < h2s.length; idx++) {
        var h2 = h2s[idx];
        var item = document.createElement('li');
        var link = document.createElement('a');
        link.href = '#' + h2.id;
        link.innerHTML = h2.innerHTML;
        item.appendChild(link);
        list.appendChild(item);
      }

    }

  }

}());
