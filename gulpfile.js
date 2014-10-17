var gulp = require('gulp');
var util = require('util');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var connect = require('gulp-connect');

var config = require('./config');

var requireDir = require('require-dir');
requireDir('./tasks', { recurse: true });

gulp.task('build', ['static', 'content', 'tags']);

gulp.task('watch', ['static:watch', 'content:watch']);

gulp.task('server', ['build', 'watch'], function () {
  connect.server({ port: 4001, root: 'build' });
});
