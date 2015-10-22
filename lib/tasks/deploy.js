var gulp = require('gulp');
var gulpIf = require('gulp-if');
var parallelize = require("concurrent-transform");
var awspublish = require('gulp-awspublish');
var remoteSrc = require('gulp-remote-src');
var rename = require('gulp-rename');
var ignoreErrors = require('gulp-ignore-errors');

var config = require('../../config');

var CONCURRENCY = 32;
var GZIP_EXTENSIONS = [
  'html', 'json', 'rss', 'css', 'js',
  'otf', 'eot', 'svg', 'ttf', 'woff', 'woff2'
];
var HASHES_FILENAME = 'hashes.json';

gulp.task('deploy', ['deploy:push-hashes']);

gulp.task('deploy:pull-hashes', function () {
  return remoteSrc([HASHES_FILENAME], { base: config.site.absolute_baseurl + '/' })
    .on('error', function (err) {
      // HACK: Ignore error if not found - this is probably the first run.
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(rename('.awspublish-' + config.aws.bucket))
    .pipe(gulp.dest('.'))
});

gulp.task('deploy:content', ['deploy:pull-hashes'], function () {

  var isGzippable = function (file) {
    var ext = file.path.split('.').pop();
    return GZIP_EXTENSIONS.indexOf(ext) !== -1;
  };

  var publisher = awspublish.create(config.aws);
  return gulp.src('./build/**')
    .pipe(parallelize(gulpIf(isGzippable, awspublish.gzip()), CONCURRENCY))
    .pipe(parallelize(publisher.publish(), CONCURRENCY))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());

});

gulp.task('deploy:push-hashes', ['deploy:content'], function () {
  var publisher = awspublish.create(config.aws);
  return gulp.src('.awspublish-' + config.aws.bucket)
    .pipe(rename(HASHES_FILENAME))
    .pipe(publisher.publish({},{force: true}))
    .pipe(awspublish.reporter());
});
