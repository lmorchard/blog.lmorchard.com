var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('static', [
  'static:css', 'static:js', 'static:img', 'static:favicon', 'static:uploads'
]);

gulp.task('static:watch', function () {
  gulp.watch('./design/**/default.html', ['static', 'build']);
  gulp.watch('./design/css/**/*', ['static:css']);
  gulp.watch('./design/js/**/*', ['static:js']);
  gulp.watch('./uploads/**/*', ['static:uploads']);
});

gulp.task('static:css', function () {
  return gulp.src([
      'design/css/vendor/*.css',
      'design/css/*.css'
    ])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('static:js', function () {
  return gulp.src([
      // HACK: emphasis depends on jquery, so use explicit order.
      // TODO: Work out a better way to specify order. Maybe 01- 02- 03- filenames?
      'design/js/vendor/jquery.js',
      'design/js/vendor/emphasis.js',
      'design/js/vendor/moment.min.js',
      'design/js/vendor/prism.js',
      'design/js/vendor/lodash.js',
      'design/js/vendor/async.js',
      'design/js/main.js'
    ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('static:img', function () {
  return gulp.src('design/img/*.img')
    .pipe(gulp.dest('build/img'));
});

gulp.task('static:uploads', function () {
  return gulp.src('uploads/**/*')
    .pipe(gulp.dest('build'));
});

gulp.task('static:favicon', function () {
  return gulp.src('design/favicon.ico')
    .pipe(gulp.dest('build'));
});
