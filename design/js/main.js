var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-1519392-1']);
_gaq.push(['_setDomainName', 'blog.lmorchard.com']);
_gaq.push(['_trackPageview']);

(function () {

var MAX_RELATED_POSTS = 7;

var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
  '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

$('*[data-content-href]').each(function () {
  var el = $(this);
  $.get(el.attr('data-content-href'), function (data) {
    el.html(data);
    sidebarReady();
  });
});

function sidebarReady () {
  $('article.post').each(buildRelatedPosts);
}

function buildRelatedPosts () {

  var sidebar = $('.sidebar');
  var section = $('<section class="related-posts"><h3>Related Posts</h3><ul></ul></section>');
  var list = section.find('ul');

  var tags = $('.post > .tags > li > a').map(function () {
    return $(this).text();
  }).toArray();

  var posts = [];
  async.each(tags, function (tag, next) {
    $.getJSON('/tag/' + tag + '.json', function (data) {
      if (data) { posts = posts.concat(data); }
      next();
    });
  }, function (err) {

    if (!posts.length) { return; }

    var relateds = _.chain(posts)
      .uniq().sort().reverse()
      .slice(0, MAX_RELATED_POSTS)
      .value();

    async.each(relateds, function (related, next) {
      console.log("URL " + '/' + related + '.json');
      $.getJSON('/' + related + '.json', function (data) {
        var date = new Date(data.date);
        list.append($(
          '<li>' +
          moment(data.date).format('YYYY MMM DD') +
          ' &raquo; ' +
          '<a href="/' + related + '">' +
          (data.title || 'untitled' ) +
          '</a></li>'
        ));
        next();
      });
    }, function (err) {
      if (!err) {
        sidebar.find('>section:eq(1)').before(section);
      }
    });

  });
}

}());
