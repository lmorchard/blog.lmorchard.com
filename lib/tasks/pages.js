var gulp = require('gulp');
var _ = require('lodash');

var taskUtils = require('../task-utils');
var frontMatter = require('../front-matter');

var config = require('../../config');

gulp.task('pages', ['pages:templated']);

gulp.task('pages:watch', function () {
  gulp.watch('./config.js', ['pages']);
  gulp.watch('./design/pages/**/*.html', ['pages:templated']);
});


function pad (val, len) {
  var str = '00000' + (''+ val);
  return str.substr(str.length - len);
}

var months = [
  ['01', 'jan'],
  ['02', 'feb'],
  ['03', 'mar'],
  ['04', 'apr'],
  ['05', 'may'],
  ['06', 'jun'],
  ['07', 'jul'],
  ['08', 'aug'],
  ['09', 'sep'],
  ['10', 'oct'],
  ['11', 'nov'],
  ['12', 'dec']
];

gulp.task('pages:templated', function () {

  var tagNames = _.keys(config.indexes.tag);

  var tagsWithCounts = _.chain(config.indexes.tag)
    .map(function (posts, tag) {
      return { tag: tag, count: posts.length };
    })
    .sortBy('count').reverse().value();

  var postsSorted = _.chain(config.indexes.posts)
    .values().sortBy('date').reverse().value();

  // TODO: Add this as a new index?
  var postsByDate = {};

  _.(config.indexes.date).each(function (paths, dateStr) {

    var date = new Date(dateStr);
    var year = date.getFullYear();
    var month = pad(date.getMonth() + 1, 2);

    if (!postsByDate[year]) {
      postsByDate[year] = {};
      for (var m = 1; m <= 12; m++) {
        postsByDate[year][pad(m, 2)] = [];
      }
    }

    postsByDate[year][month] = postsByDate[year][month].concat(paths);

  });

  var postYears = _.(postsByDate).keys().sort().reverse().value();

  return gulp.src('design/pages/**/*.html')
    .pipe(taskUtils.setTemplateLocals(function () {
      return {
        indexes: config.indexes,
        tags: tagNames,
        tagsWithCounts: tagsWithCounts,
        posts: postsSorted,
        postsByDate: postsByDate,
        postYears: postYears,
        months: months
      };
    }))
    .pipe(taskUtils.applyTemplate())
    .pipe(gulp.dest('build'))

});
