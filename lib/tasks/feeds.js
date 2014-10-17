var gulp = require('gulp');
var path = require('path');
var marked = require('gulp-marked');
var rename = require('gulp-rename');
var filelog = require("gulp-filelog");
var changed = require('gulp-changed');

var taskUtils = require('../task-utils');
var frontMatter = require('../front-matter');

var config = require('../../config');

gulp.task('feeds', []);
