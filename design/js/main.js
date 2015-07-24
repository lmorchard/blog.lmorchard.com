// Google Analytics. Yeah, I know, I'm not super happy about it.
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-33630498-1', 'auto');
ga('send', 'pageview');

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
