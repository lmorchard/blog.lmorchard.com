var gulp = require('gulp');
var path = require('path');
var marked = require('gulp-marked');
var rename = require('gulp-rename');
var _ = require('lodash');

var taskUtils = require('../task-utils');
var frontMatter = require('../front-matter');

var config = require('../../config');

gulp.task('feeds', ['feeds:index', 'feeds:tags', /*'feeds:tagsalias'*/]);

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

// TODO: Build some selective full-text feeds, like /tag/mozilla/feed/

/*
// HACK: I really need redirects :(
gulp.task('feeds:tagsalias', function () {
  return taskUtils.filesFromIndex('tag')
    .pipe(taskUtils.applyTemplate('design/templates/rss.xml'))
    .pipe(rename(function (path) {
      path.basename = 'feed';
      path.extname = '';
    }))
    .pipe(gulp.dest('build/tag'));
});
*/
