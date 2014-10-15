var gulp = require('gulp');
var marked = require('gulp-marked');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var path = require('path');
var connect = require('gulp-connect');
var filelog = require("gulp-filelog");
var changed = require('gulp-changed');

var taskUtils = require('./lib/task-utils');

var config = require('./config');

var requireDir = require('require-dir');
requireDir('./tasks', { recurse: true });

var frontMatter = require('./lib/front-matter');

gulp.task('build:posts', function () {
  return gulp.src('posts/**/*')
    // .pipe(filelog('build:posts'))
    .pipe(rename(taskUtils.postNameToDatePath))
    .pipe(changed('build'))
    .pipe(filelog('build:posts'))
    .pipe(frontMatter({property: 'page', remove: true}))
    .pipe(taskUtils.filename2date())
    .pipe(marked())
    .pipe(taskUtils.applyTemplate('design/post.html'))
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['design', 'build:posts']);

gulp.task('connect', function () {
  connect.server({ root: 'build' });
});

gulp.task('server', ['build', 'watch', 'connect']);

gulp.task('watch', function () {
  gulp.watch('./config.js', ['build']);
  gulp.watch('./design/**/default.html', ['build']);
  gulp.watch('./posts/**/*', ['build:posts']);
  gulp.watch('./design/post.html', ['build:posts']);
  gulp.watch('./design/css/**/*', ['design:css']);
  gulp.watch('./design/js/**/*', ['design:js']);
});
