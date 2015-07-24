(function () {

  // Quick and dirty table of contents generator
  var tocRoot = document.querySelector('article.post nav.table-of-contents');
  if (tocRoot) {

    var h2s = tocRoot.parentNode.querySelectorAll('h2');
    if (h2s.length) {

      var title = document.createElement('p');
      title.classList.add('title');
      title.innerHTML = 'Contents';
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

  var HEADER_CHANGE_DISTANCE = 30;

  window.addEventListener('scroll', function (e) {
    var distanceY = window.pageYOffset || document.documentElement.scrollTop;
    if (distanceY > HEADER_CHANGE_DISTANCE) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  })

}());
