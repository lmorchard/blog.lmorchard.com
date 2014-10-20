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

  var section = $(
      '<section class="related-posts">' +
      '<h3>Related Posts</h3>' +
      '<ul></ul>' +
      '</section>'
  );
  var list = section.find('ul');

  // Scrape the tags from the post
  var tags = $('.post > .tags > li > a').map(function () {
    return $(this).text();
  }).toArray();

  // First, load up tag indexes to accumulate a list of posts.
  var posts = [];
  async.each(tags, function (tag, next) {
    $.getJSON('/tag/' + tag + '.json', function (data) {
      if (data) { posts = posts.concat(data); }
      next();
    });
  }, function (err) {

    if (!posts.length) { return; }

    // Find a random unique list of posts from the tag union.
    var relateds = _.chain(posts)
      .uniq().shuffle()
      .slice(0, MAX_RELATED_POSTS)
      // FIXME: Sort order of relateds gets munged by network timing.
      // .sort().reverse()
      .value();

    // Load up the JSON metadata for each post to build the list.
    async.each(relateds, function (related, next) {

      $.getJSON('/' + related + '.json', function (data) {

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

      if (err) { return; }

      // Insert the "Related Posts" section after "About me"
      $('.sidebar > section:eq(1)').before(section);

    });

  });
}

}());
