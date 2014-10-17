var gulp = require('gulp');
var _ = require('lodash');
var taskUtils = require('../task-utils');

var config = require('../../config');

gulp.task('archives', [
  'archives:years', 'archives:months',
  'archives:tags', 'archives:tagindex'
]);

gulp.task('archives:watch', function () {
  gulp.watch('./design/tags.html', ['archives:tagindex']);
  gulp.watch('./design/layouts/tag.html', ['archives:tags']);
  gulp.watch('./design/layouts/year.html', ['archives:years']);
  gulp.watch('./design/layouts/month.html', ['archives:months']);
});

gulp.task('archives:years', function () {
  return taskUtils.filesFromIndex('year')
    .pipe(taskUtils.applyTemplate('design/layouts/year.html'))
    .pipe(gulp.dest('build'));
});

gulp.task('archives:months', function () {
  return taskUtils.filesFromIndex('month')
    .pipe(taskUtils.applyTemplate('design/layouts/month.html'))
    .pipe(gulp.dest('build'));
});

gulp.task('archives:tags', function () {
  return taskUtils.filesFromIndex('tag')
    .pipe(taskUtils.applyTemplate('design/layouts/tag.html'))
    .pipe(gulp.dest('build/tag'));
});

gulp.task('archives:tagindex', function () {
  return gulp.src('design/tags.html')
    .pipe(taskUtils.setTemplateLocals(function () {
      return {
        indexes: config.indexes,
        tags: _.keys(config.indexes.tag),
        posts: _.chain(config.indexes.posts).values()
          .sortBy('date').reverse().value()
      };
    }))
    .pipe(taskUtils.applyTemplate())
    .pipe(gulp.dest('build/tag/index.html'))
});
