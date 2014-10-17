var gulp = require('gulp');
var _ = require('lodash');
var util = require('util');
var path = require('path');
var through = require('through2');
var gutil = require('gulp-util');
var marked = require('gulp-marked');
var rename = require('gulp-rename');
var filelog = require("gulp-filelog");
var changed = require('gulp-changed');
var filelog = require("gulp-filelog");

var taskUtils = require('../lib/task-utils');
var frontMatter = require('../lib/front-matter');

var config = require('../config');

gulp.task('tags', ['indexes'], function () {
  return tags()
    .pipe(taskUtils.applyTemplate('design/layouts/tag.html'))
    .pipe(gulp.dest('build/tag'));
});

function tags() {
  var stream = taskUtils.emptyStream();
  var tags = config.indexes.tag;
  var posts = config.indexes.posts;
  if (tags && posts) {
    for (var tag in tags) {
      var file = new gutil.File({
        path: tag + '/index.html',
        contents: new Buffer('')
      });
      file.locals = {
        page: { title: tag, tag: tag },
        posts: _.chain(tags[tag]).map(function (basename) {
          return posts[basename];
        }).sortBy('date').reverse().value()
      };
      stream.write(file);
    }
  }
  stream.end();
  stream.emit("end");
  return stream;
}
