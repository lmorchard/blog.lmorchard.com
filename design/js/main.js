var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-1519392-1']);
_gaq.push(['_setDomainName', 'blog.lmorchard.com']);
_gaq.push(['_trackPageview']);

(function () {

var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
  '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

$('*[data-content-href]').each(function () {
  var el = $(this);
  $.get(el.attr('data-content-href'), function (data) {
    el.html(data);
  });
});

}());
