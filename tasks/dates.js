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

gulp.task('dates', ['dates:years', 'dates:months']);

gulp.task('dates:years', ['indexes'], function () {
  return years()
    .pipe(taskUtils.applyTemplate('design/layouts/year.html'))
    .pipe(gulp.dest('build'));
});

gulp.task('dates:months', ['indexes'], function () {
  return months()
    .pipe(taskUtils.applyTemplate('design/layouts/month.html'))
    .pipe(gulp.dest('build'));
});

function years () {
  var stream = taskUtils.emptyStream();
  var years = config.indexes.year;
  var posts = config.indexes.posts;
  if (years && posts) {
    for (var year in years) {
      var file = new gutil.File({
        path: year + '/index.html',
        contents: new Buffer('')
      });
      file.locals = {
        page: { title: year, year: year },
        posts: _.chain(years[year]).map(function (basename) {
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

function months () {
  var stream = taskUtils.emptyStream();
  var months = config.indexes.month;
  var posts = config.indexes.posts;
  if (months && posts) {
    for (var month in months) {
      var file = new gutil.File({
        path: month + '/index.html',
        contents: new Buffer('')
      });
      file.locals = {
        page: { title: month, month: month },
        posts: _.chain(months[month]).map(function (basename) {
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
