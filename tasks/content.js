var gulp = require('gulp');
var path = require('path');
var marked = require('gulp-marked');
var rename = require('gulp-rename');
var filelog = require("gulp-filelog");
var changed = require('gulp-changed');

var taskUtils = require('../lib/task-utils');
var frontMatter = require('../lib/front-matter');

var config = require('../config');

gulp.task('content:templated', ['indexes'], function () {
  return gulp.src('design/*.html')
    .pipe(taskUtils.applyTemplate())
    .pipe(gulp.dest('build'))
});

gulp.task('content:posts', ['indexes'], function () {
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
    .pipe(rename({extname: '.md'})) // HACK: Because marked doesn't catch .markdown
    .pipe(marked())
    .pipe(taskUtils.summarize('<!--more-->'))
    .pipe(rename(taskUtils.postNameToDatePath))
    .pipe(taskUtils.applyTemplate('design/layouts/post.html'))
    .pipe(gulp.dest('build'));
}

gulp.task('content', ['content:posts', 'content:templated']);

gulp.task('content:watch', function () {
  gulp.watch('./config.js', ['content']);

  gulp.watch('./design/*.html', ['content:templated']);

  // Just watch the root of posts for changes during watch. Older posts live in
  // posts/archives and get picked up in a full build.
  gulp.watch('./posts/*.{markdown,md}', ['content:posts-recent']);
  gulp.watch('./design/layouts/post.html', ['content:posts-recent']);
});
