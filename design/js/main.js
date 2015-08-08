var disqus_shortname = 'bloglmorchardcom';

(function () {
  var commentsSection = document.getElementById('comments');
  if (!commentsSection) { return; }

  var loadDisqus = function () {
    disqus_needs_loading = false;
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  };

  window.addEventListener('scroll', function (e) {
    if (!disqus_needs_loading) { return; }
    var rect = commentsSection.getBoundingClientRect();
    if (window.scrollY >= rect.top) {
      loadDisqus();
    }
  });

}());

(function () {

  // Set up the magical header that changes on scroll.
  var HEADER_CHANGE_DISTANCE = 30;
  window.addEventListener('scroll', function (e) {
    var distanceY = window.pageYOffset || document.documentElement.scrollTop;
    if (distanceY > HEADER_CHANGE_DISTANCE) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  });

  // Activate lazyloading on needful elements
  var toLazyLoad = document.querySelectorAll('.lazyload');
  for (var idx = 0; idx < toLazyLoad.length; idx++) {
    lzld(toLazyLoad[idx]);
  }

}());
