var gulp = require('gulp');

var _ = require('lodash');
var util = require('util');
var through = require('through2');
var path = require('path');
var rename = require('gulp-rename');
var marked = require('gulp-marked');

var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;

var taskUtils = require('../task-utils');
var frontMatter = require('../front-matter');

var config = require('../../config');

gulp.task('indexes', function () {
  return gulp.src('posts/**/*.{markdown,md}')
    .pipe(frontMatter({property: 'page', remove: true}))
    .pipe(taskUtils.filename2date())
    .pipe(rename({extname: '.md'})) // HACK: Because marked doesn't catch .markdown
    .pipe(marked())
    .pipe(taskUtils.findThumbnail())
    .pipe(taskUtils.summarize('<!--more-->'))
    .pipe(rename(taskUtils.postNameToDatePath))
    .pipe(indexPosts(true))
    .pipe(gulp.dest('build'));
});

function indexPosts (clear) {

  if (clear || !config.indexes) { config.indexes = {}; }
  var indexes = config.indexes;

  function pushIndex (name, key, val) {
    if (!indexes[name]) { indexes[name] = {}; }
    if (!indexes[name][key]) { indexes[name][key] = []; }
    indexes[name][key].push(val);
  }

  return through.obj(function (file, enc, cb) {

    var basename = path.relative('./posts', file.path)
      .replace(/\\/g, '/')
      .replace('/index.html', '');

    file.page.path = basename;

    if (!indexes.posts) { indexes.posts = {}; }
    indexes.posts[basename] = file.page;
    indexes.posts[basename].content = file.contents.toString();

    if (file.page.date) {
      var dateiso = file.page.date.toISOString();
      pushIndex('date', dateiso, basename);
      pushIndex('year', dateiso.substr(0,4), basename);
      pushIndex('month', dateiso.substr(0,7).replace('-','/'), basename);
    }

    if (file.page.tags) {
      file.page.tags.forEach(function (tag) {
        pushIndex('tag', tag, basename);
      });
    }

    // Generate .json file for each post
    var postidx = new File();
    postidx.path = file.path
      .replace('posts/', '')
      .replace('/index.html', '.json');
    postidx.contents = new Buffer(JSON.stringify(file.page));
    this.push(postidx);

    return cb();

  }, function (cb) {

    for (var name in indexes) {

      // Generate per-index .json file
      var file = new File();
      file.path = 'index/' + name + '.json';
      file.contents = new Buffer(JSON.stringify(indexes[name]));
      this.push(file);

      // Generate per-key .json files
      for (var key in indexes[name]) {

        // posts were already handled, and date is not useful.
        if (name == 'posts' || name == 'date') { continue; }

        var file = new File();
        file.contents = new Buffer(JSON.stringify(indexes[name][key]));
        file.path = key + '.json';

        // Stick tags in their own directory.
        if (name == 'tag') { file.path = 'tag/' + file.path; }

        this.push(file);
      }

    }

    return cb();

  });
}
