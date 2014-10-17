var gulp = require('gulp');
var _ = require('lodash');

var taskUtils = require('../task-utils');
var frontMatter = require('../front-matter');

var config = require('../../config');

gulp.task('pages', ['pages:templated']);

gulp.task('pages:watch', function () {
  gulp.watch('./config.js', ['pages']);
  gulp.watch('./design/*.html', ['pages:templated']);
});

gulp.task('pages:templated', function () {
  return gulp.src('design/*.html')
    .pipe(taskUtils.setTemplateLocals(function () {
      return {
        indexes: config.indexes,
        tags: _.keys(config.indexes.tag),
        posts: _.chain(config.indexes.posts).values()
          .sortBy('date').reverse().value()
      };
    }))
    .pipe(taskUtils.applyTemplate())
    .pipe(gulp.dest('build'))
});
