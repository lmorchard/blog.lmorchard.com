var gulp = require('gulp');
var util = require('util');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var connect = require('gulp-connect');

var config = require('./config');

var requireDir = require('require-dir');
requireDir('./lib/tasks', { recurse: true });

gulp.task('build', ['static', 'posts', 'pages', 'archives']);

gulp.task('watch', ['static:watch', 'posts:watch', 'pages:watch', 'archives:watch']);

gulp.task('server', ['build', 'watch'], function () {
  connect.server({ port: 4001, root: 'build' });
});
