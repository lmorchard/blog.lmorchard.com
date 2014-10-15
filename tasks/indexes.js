var gulp = require('gulp');

var _ = require('lodash');
var util = require('util');
var through = require('through2');
var path = require('path');
var rename = require('gulp-rename');

var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;

var taskUtils = require('../lib/task-utils');
var frontMatter = require('../lib/front-matter');

var config = require('../config');

gulp.task('indexes:posts', function () {
  return gulp.src('posts/**/*.{markdown,md}')
    .pipe(frontMatter({property: 'page', remove: true}))
    .pipe(taskUtils.filename2date())
    .pipe(rename(taskUtils.postNameToDatePath))
    .pipe(indexPosts())
    .pipe(gulp.dest('indexes'));
});

gulp.task('indexes', ['indexes:posts']);

function indexPosts () {
  var indexes = config.indexes = {
    posts: {},
    date: {},
    tag: {}
  };

  return through.obj(function (file, enc, cb) {
    var basename = path.relative('./posts', file.path);

    file.page.path = basename;
    indexes.posts[basename] = file.page;

    if (file.page.date) {
      var dateiso = file.page.date.toISOString();
      var bydate = indexes.date[dateiso] = indexes.date[dateiso] || [];
      bydate.push(basename);
    }

    if (file.page.tags) {
      file.page.tags.forEach(function (tag) {
        var bytag = indexes.tag[tag] = indexes.tag[tag] || [];
        bytag.push(basename);
      });
    }

    return cb();
  }, function (cb) {
    for (var name in config.indexes) {
      var file = new File();
      file.path = name + '.json';
      var out = JSON.stringify(indexes[name]);
      file.contents = new Buffer(out);
      this.push(file);
    }
    return cb();
  });
}
