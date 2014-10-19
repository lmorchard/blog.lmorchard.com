var gulp = require('gulp');
var connect = require('gulp-connect');
var marked = require('gulp-marked');
var rename = require('gulp-rename');

var taskUtils = require('../task-utils');
var frontMatter = require('../front-matter');

var config = require('../../config');

gulp.task('posts', ['posts:all']);

gulp.task('posts:watch', function () {
  gulp.watch('./config.js', ['posts']);
  gulp.watch('./posts/*.{markdown,md}', ['posts:recent']);
  gulp.watch('./design/layouts/post.html', ['posts:recent']);
  gulp.watch('./drafts/*.{markdown,md}', ['posts:drafts']);
});

gulp.task('posts:all', function () {
  return posts('posts/**/*.{markdown,md}');
});

gulp.task('posts:recent', function () {
  // TODO: Might be better to look for just the latest 5 or something.
  return posts('posts/*.{markdown,md}');
});

gulp.task('posts:drafts', function () {
  return posts('drafts/*.{markdown,md}', 'build-drafts')
    .pipe(connect.reload());
});

function posts (path, dest) {
  dest = dest || 'build';
  return gulp.src(path)
    .pipe(frontMatter({property: 'page', remove: true}))
    .pipe(taskUtils.filename2date())
    .pipe(taskUtils.fixupArchivedComments())
    .pipe(rename({extname: '.md'})) // HACK: Because marked doesn't catch .markdown
    .pipe(marked())
    .pipe(taskUtils.summarize('<!--more-->'))
    .pipe(rename(taskUtils.postNameToDatePath))
    .pipe(taskUtils.applyTemplate('design/layouts/post.html'))
    .pipe(gulp.dest(dest));
}
