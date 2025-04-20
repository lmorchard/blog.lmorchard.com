/*
const disqus_shortname = 'bloglmorchardcom';

var commentsSection = document.getElementById('comments');
if (commentsSection) {
  var disqus_needs_loading = true;

  var loadDisqus = function () {
    disqus_needs_loading = false;
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  };

  var disqusScrollHandler = function (e) {
    if (!disqus_needs_loading) { return; }
    var rect = commentsSection.getBoundingClientRect();
    if (window.scrollY  >= rect.top) {
      console.log("Disqus loading triggered by scroll", rect.top, window.scrollY, document.body.offsetHeight);
      loadDisqus();
    }
  };

  disqusScrollHandler();
  if (disqus_needs_loading) {
    window.addEventListener('scroll', disqusScrollHandler);
  }
}
*/

class DisqusLazyLoader {
  constructor(shortname) {
    this.commentsSection = document.getElementById('comments');
    if (!this.commentsSection) return;

    this.shortname = shortname;
    this.loaded = false;
    this.observer = new IntersectionObserver(
      this.handleIntersections.bind(this)
    );
    this.observer.observe(this.commentsSection);
  }

  handleIntersections(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!this.commentsSection) return; // Safety check
        this.loadDisqus();
        this.observer.unobserve(this.commentsSection);
      }
    });
  }

  loadDisqus() {
    if (this.loaded) return;
    this.loaded = true;

    console.log("Disqus loading triggered by intersection observer");
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + this.shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  }
}

const manager = new DisqusLazyLoader("bloglmorchardcom");
