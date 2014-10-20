var gulp = require('gulp');
var connect = require('gulp-connect');
var awspublish = require('gulp-awspublish');

var config = require('./config');
var requireDir = require('require-dir');
try {
  config.indexes = requireDir('./build/index', { recurse: true });
} catch (e) {
  /* no-op */
}

var requireDir = require('require-dir');
requireDir('./lib/tasks', { recurse: true });

gulp.task('build', [
  'static', 'posts', 'pages', 'archives', 'feeds'
]);

gulp.task('watch', [
  'static:watch', 'posts:watch', 'pages:watch', 'archives:watch'
]);

gulp.task('server', ['watch'], function () {
  connect.server({
    port: 4001,
    root: ['build', 'build-drafts'],
    livereload: true
  });
});

gulp.task('deploy', function () {
  var publisher = awspublish.create(config.aws);
  var headers = {
    // 'Cache-Control': 'max-age=315360000, no-transform, public'
  };
  return gulp.src('./build/**')
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});
