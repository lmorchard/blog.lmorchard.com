var disqus_shortname = 'bloglmorchardcom';

var commentsSection = document.getElementById('comments');
if (commentsSection) {
  var loadDisqus = function () {
    disqus_needs_loading = false;
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  };

  var disqusScrollHandler = function (e) {
    if (!disqus_needs_loading) { return; }
    var rect = commentsSection.getBoundingClientRect();
    if (window.scrollY + document.body.offsetHeight >= rect.top) {
      loadDisqus();
    }
  };

  disqusScrollHandler();
  if (disqus_needs_loading) {
    window.addEventListener('scroll', disqusScrollHandler);
  }
}
