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
  gulp.watch('./design/templates/tag.html', ['archives:tags']);
  gulp.watch('./design/templates/year.html', ['archives:years']);
  gulp.watch('./design/templates/month.html', ['archives:months']);
});

gulp.task('archives:years', function () {
  return taskUtils.filesFromIndex('year')
    .pipe(taskUtils.applyTemplate('design/templates/year.html'))
    .pipe(gulp.dest('build'));
});

gulp.task('archives:months', function () {
  return taskUtils.filesFromIndex('month')
    .pipe(taskUtils.applyTemplate('design/templates/month.html'))
    .pipe(gulp.dest('build'));
});

gulp.task('archives:tags', function () {
  return taskUtils.filesFromIndex('tag')
    .pipe(taskUtils.applyTemplate('design/templates/tag.html'))
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
