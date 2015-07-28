var gulp = require('gulp');
var gulpIf = require('gulp-if');
var parallelize = require("concurrent-transform");
var awspublish = require('gulp-awspublish');

var config = require('../../config');

var CONCURRENCY = 32;
var GZIP_EXTENSIONS = [
  'html', 'json', 'rss', 'css', 'js',
  'otf', 'eot', 'svg', 'ttf', 'woff', 'woff2'
];

gulp.task('deploy', function () {

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
