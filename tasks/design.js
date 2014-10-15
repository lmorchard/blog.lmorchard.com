var gulp = require('gulp');

gulp.task('design:css', function () {
  return gulp.src('design/css/*.css')
    .pipe(gulp.dest('build/css'));
});

gulp.task('design:js', function () {
  return gulp.src('design/js/*.js')
    .pipe(gulp.dest('build/js'));
});

gulp.task('design:img', function () {
  return gulp.src('design/img/*.img')
    .pipe(gulp.dest('build/img'));
});

gulp.task('design:favicon', function () {
  return gulp.src('design/favicon.ico')
    .pipe(gulp.dest('build'));
});

gulp.task('design', [
  'design:css', 'design:js', 'design:img',
  'design:favicon'
]);
