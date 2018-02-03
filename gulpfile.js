var gulp = require('gulp');
var connect = require('gulp-connect');

var config = require('./config');
try {
  config.indexes = {};
  ['date', 'month', 'posts', 'tag', 'year'].forEach(name => {
    config.indexes[name] = require(`./build/index/${name}.json`);
  });
} catch (e) {
  /* no-op */
}

['archives', 'deploy', 'feeds', 'indexes', 'pages', 'posts', 'static']
  .forEach(name => require(`./lib/tasks/${name}`));

gulp.task('default', [ 'server' ]);

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
