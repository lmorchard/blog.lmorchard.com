var gulp = require('gulp');
var path = require('path');
var connect = require('gulp-connect');
var marked = require('gulp-marked');
var rename = require('gulp-rename');
var through = require('through2');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var gulpIgnore = require('gulp-ignore');
var File = gutil.File;

var taskUtils = require('../task-utils');
var frontMatter = require('../front-matter');

var config = require('../../config');

gulp.task('posts', ['posts:all']);

gulp.task('posts:watch', function () {
  gulp.watch('./config.js', ['posts']);
  gulp.watch('./posts/*.{markdown,md}', ['posts:recent']);
  gulp.watch('./design/templates/post.html', ['posts:recent']);
  gulp.watch('./drafts/**/*.{markdown,md}', ['posts:drafts']);
});

gulp.task('posts:all', function () {
  return posts('posts/**/*.{markdown,md}');
});

gulp.task('posts:recent', function () {
  // TODO: Might be better to look for just the latest 5 or something.
  return posts('posts/*.{markdown,md}')
    .pipe(connect.reload());
});

gulp.task('posts:drafts', function () {
  return posts('drafts/**/*.{markdown,md}', 'build-drafts')
    .pipe(connect.reload());
});

function gatherPostBundleAssets () {
  return through.obj(function (file, enc, cb) {
    const stream = this;

    stream.push(file);
    if (!file.postBundlePath) { return cb(); }

    gulp.src(`${file.postBundlePath}/**/*`)
      .pipe(gulpIgnore.exclude('index.md'))
      .pipe(rename(asset => asset.dirname = path.dirname(file.relative)))
      .pipe(through.obj(function (file, enc, cb) {
        // HACK: Is this the best way to pipe / splice this stream in?
        stream.push(file);
        cb();
      }))
      .on('finish', cb);
  });
}

function posts (path, dest) {
  dest = dest || 'build';
  return gulp.src(path)
    .pipe(frontMatter({property: 'page', remove: true}))
    .pipe(taskUtils.filenameToMeta())
    .pipe(taskUtils.fixupArchivedComments())
    .pipe(rename({extname: '.md'})) // HACK: Because marked doesn't catch .markdown
    .pipe(marked())
    .pipe(taskUtils.findThumbnail())
    .pipe(taskUtils.summarize('<!--more-->'))
    .pipe(rename(taskUtils.postNameToDatePath))
    .pipe(taskUtils.applyTemplate('design/templates/post.html'))
    .pipe(gatherPostBundleAssets())
    .pipe(gulp.dest(dest));
}
