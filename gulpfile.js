var gulp = require('gulp');
var frontMatter = require('gulp-front-matter');
var marked = require('gulp-marked');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var path = require('path');
var swig = require('swig');
var through = require('through2');
var connect = require('connect');
var http = require('http');
var filelog = require("gulp-filelog");

var site = require('./site.json');
site.time = new Date();

swig.setDefaults({
  loader: swig.loaders.fs(__dirname + '/design'),
  cache: false
});

var rePostName = /(\d{4})-(\d{1,2})-(\d{1,2})-(.*)/;

gulp.task('build:posts', function () {
  return gulp.src('posts/**/*')
    .pipe(filelog('build:posts'))
    .pipe(frontMatter({property: 'page', remove: true}))
    .pipe(marked())
    .pipe(applyTemplate('design/post.html'))
    .pipe(rename(function (path) {
      path.extname = ".html";
      var match = rePostName.exec(path.basename);
      if (match) {
        var year = match[1];
        var month = match[2];
        var day = match[3];

        path.dirname = year + '/' + month + '/' + day;
        path.basename = match[4];
      }
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['build:posts']);

gulp.task('design:css', function () {
    return gulp.src('design/css/*.css')
      .pipe(gulp.dest('build/css'));
});

// use cndjs where possible
gulp.task('design:js', function () {
    return gulp.src('design/js/*.js')
      .pipe(gulp.dest('build/js'));
});

gulp.task('design:favico', function () {
    return gulp.src('design/favicon.ico')
      .pipe(gulp.dest('build'));
});

gulp.task('design', ['design:css', 'design:js'/*, 'design:favico'*/]);

gulp.task('watch', function () {
  gulp.watch('posts/**/*', ['build']);
});

function applyTemplate(templateFile) {
  var tpl = swig.compileFile(path.join(__dirname, templateFile));
  return through.obj(function (file, enc, cb) {
    var data = {
      site: site,
      page: file.page,
      content: file.contents.toString()
    };
    file.contents = new Buffer(tpl(data), 'utf8');
    this.push(file);
    cb();
  });
}
