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

gulp.task('archives', ['archives:years', 'archives:months', 'archives:tags']);

gulp.task('archives:years', ['indexes'], function () {
  return taskUtils.filesFromIndex('year')
    .pipe(taskUtils.applyTemplate('design/layouts/year.html'))
    .pipe(gulp.dest('build'));
});

gulp.task('archives:months', ['indexes'], function () {
  return taskUtils.filesFromIndex('month')
    .pipe(taskUtils.applyTemplate('design/layouts/month.html'))
    .pipe(gulp.dest('build'));
});

gulp.task('archives:tags', ['indexes'], function () {
  return taskUtils.filesFromIndex('tag')
    .pipe(taskUtils.applyTemplate('design/layouts/tag.html'))
    .pipe(gulp.dest('build/tag'));
});
