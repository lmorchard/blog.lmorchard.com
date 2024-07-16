import "./js/components/index.js";
import { init as componentLazyLoaderInit } from "./js/component-lazy-loader.js";
import "./js/toc.js";

async function main() {
  await componentLazyLoaderInit();
  console.log("READY.");
}

var disqus_shortname = 'bloglmorchardcom';

(function () {
  var commentsSection = document.getElementById('comments');
  if (!commentsSection) { return; }

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
}());

main().catch((err) => console.error(err));
