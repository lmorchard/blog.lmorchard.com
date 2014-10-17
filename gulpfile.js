var gulp = require('gulp');
var connect = require('gulp-connect');

var requireDir = require('require-dir');
requireDir('./lib/tasks', { recurse: true });

gulp.task('build', ['static', 'posts', 'pages', 'archives']);

gulp.task('watch', ['static:watch', 'posts:watch', 'pages:watch', 'archives:watch']);

gulp.task('server', ['build', 'watch'], function () {
  connect.server({ port: 4001, root: 'build' });
});
