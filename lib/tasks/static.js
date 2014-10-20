var gulp = require('gulp');

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
  return gulp.src('design/css/*.css')
    .pipe(gulp.dest('build/css'));
});

gulp.task('static:js', function () {
  return gulp.src('design/js/*.js')
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
