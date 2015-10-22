var gulp = require('gulp');
var path = require('path');
var marked = require('gulp-marked');
var rename = require('gulp-rename');
var _ = require('lodash');
var gulpIgnore = require('gulp-ignore');

var taskUtils = require('../task-utils');
var frontMatter = require('../front-matter');

var config = require('../../config');

var fulltextTagFeeds = config.fulltextTagFeeds || [];

gulp.task('feeds', ['feeds:index', 'feeds:tags', 'feeds:tags-fulltext']);

gulp.task('feeds:index', function () {
  return gulp.src('design/templates/rss-fulltext.xml')
    .pipe(taskUtils.setTemplateLocals(function () {
      return {
        indexes: config.indexes,
        tags: _.keys(config.indexes.tag),
        posts: _.chain(config.indexes.posts).values()
          .sortBy('date').reverse().value()
      };
    }))
    .pipe(taskUtils.applyTemplate())
    .pipe(rename({basename: 'index', extname: '.rss'}))
    .pipe(gulp.dest('build'))
});

gulp.task('feeds:tags', function () {
  return taskUtils.filesFromIndex('tag')
    .pipe(taskUtils.applyTemplate('design/templates/rss.xml'))
    .pipe(rename(function (path) {
      path.basename = path.dirname;
      path.dirname = '';
      path.extname = '.rss';
    }))
    .pipe(gulp.dest('build/tag'));
});

// HACK: Produce a few full text feeds at URLs that look like my old Wordpress blog.
gulp.task('feeds:tags-fulltext', function () {
  return taskUtils.filesFromIndex('tag')
    .pipe(gulpIgnore.exclude(function (file) {
      return fulltextTagFeeds.indexOf(file.locals.page.tag) === -1;
    }))
    .pipe(taskUtils.applyTemplate('design/templates/rss-fulltext.xml'))
    .pipe(rename(function (path) {
      path.basename = 'feed';
      path.extname = '';
    }))
    .pipe(gulp.dest('build/tag'));
});
