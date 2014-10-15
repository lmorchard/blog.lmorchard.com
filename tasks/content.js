var gulp = require('gulp');
var path = require('path');
var marked = require('gulp-marked');
var rename = require('gulp-rename');
var filelog = require("gulp-filelog");
var changed = require('gulp-changed');

var taskUtils = require('../lib/task-utils');
var frontMatter = require('../lib/front-matter');

var config = require('../config');

gulp.task('content:index', function () {
  return gulp.src('index.md')
    .pipe(frontMatter({property: 'page', remove: true}))
    .pipe(marked())
    .pipe(taskUtils.applyTemplate('design/index.html'))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest('build'))
});

gulp.task('content:posts', function () {
  return posts('posts/**/*.{markdown,md}');
});

gulp.task('content:posts-recent', function () {
  return posts('posts/*.{markdown,md}');
});

function posts (path) {
  return gulp.src(path)
    //.pipe(filelog('content:posts'))
    .pipe(frontMatter({property: 'page', remove: true}))
    .pipe(taskUtils.filename2date())
    .pipe(marked())
    .pipe(rename(taskUtils.postNameToDatePath))
    .pipe(taskUtils.applyTemplate('design/post.html'))
    .pipe(gulp.dest('build'));
}

gulp.task('content', ['content:posts', 'content:index']);

gulp.task('content:watch', function () {
  gulp.watch('./config.js', ['content']);

  gulp.watch('./index.md', ['content:index']);
  gulp.watch('./design/index.html', ['content:index']);

  // Just watch the root of posts for changes during watch. Older posts live in
  // posts/archives and get picked up in a full build.
  gulp.watch('./posts/*.{markdown,md}', ['content:posts-recent']);
  gulp.watch('./design/post.html', ['content:posts-recent']);
});
