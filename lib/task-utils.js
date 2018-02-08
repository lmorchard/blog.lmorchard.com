var _ = require('lodash');
var util = require('util');
const url = require('url');
var through = require('through2');
var path = require('path');
var swig = require('swig');
var cheerio = require('cheerio');
var gutil = require('gulp-util');
var File = gutil.File;

var config = require('../config.js');

var taskUtils = exports;

swig.setDefaults({
  loader: swig.loaders.fs(__dirname + '/../design'),
  cache: false
});

swig.setFilter('limit', function (input, num) {
  return input.slice(0, num);
});

taskUtils.rePostName = /(\d{4})-(\d{1,2})-(\d{1,2})-(.*)/;

taskUtils.applyTemplate = function (templateFile) {
  var tpl;
  if (templateFile) {
    tpl = swig.compileFile(path.join(__dirname + '/..', templateFile));
  }

  return through.obj(function (file, enc, cb) {
    if (!templateFile) { tpl = swig.compileFile(file.path); }

    var locals = _.extend({
      site: config.site,
      page: file.page,
      content: file.contents.toString()
    }, file.locals);

    file.contents = new Buffer(tpl(locals), 'utf8');

    this.push(file);
    cb();
  });
};

taskUtils.setTemplateLocals = function (genLocals) {
  var locals = null;
  return through.obj(function (file, enc, cb) {
    if (!locals) { locals = genLocals(); }
    file.locals = locals;
    this.push(file);
    cb();
  });
};

taskUtils.filenameToMeta = function () {
  return through.obj(function (file, enc, cb) {
    var basename = path.basename(
      file.path,
      file.path.includes('.md') ? '.md' : '.markdown'
    );
    if (basename === 'index') {
      basename = path.basename(path.dirname(file.path), '.md');
      file.postBundlePath = path.dirname(file.path);
    }
    var match = taskUtils.rePostName.exec(basename);
    if (match) {
      var year   = match[1];
      var month  = match[2];
      var day   = match[3];
      var basename = match[4];
      file.page.date = new Date(year + "-" + month + "-" + day);
      file.page.url = '/' + year + '/' + month + '/' + day + '/' + basename + '/';
    }
    this.push(file);
    cb();
  });
}

taskUtils.postNameToDatePath = function (file) {
  file.extname = ".html";
  var basename = file.basename;
  if (basename === 'index') {
    basename = path.basename(file.dirname);
  }
  var match = taskUtils.rePostName.exec(basename);
  if (match) {
    var year = match[1];
    var month = match[2];
    var day = match[3];

    file.dirname = year + '/' + month + '/' + day + '/' + match[4];
    file.basename = 'index';
  }
}

taskUtils.summarize = function (marker) {
  return through.obj(function (file, enc, cb) {
    var contents = file.contents.toString();
    if (contents.indexOf(marker) !== -1) {
      var summary = contents.split(marker)[0];
      if (summary) {
        var $ = cheerio.load(summary);
        $('#toc_container').remove();
        file.page.summary = $.html();
      }
    }
    this.push(file);
    cb();
  });
};

taskUtils.findThumbnail = function () {
  return through.obj(function (file, enc, cb) {
    if (!file.page.thumbnail) {
      var contents = file.contents.toString();
      var $ = cheerio.load(contents);

      // Do not look through comments for images.
      $('#comments').remove();

      var src;

      // Look for an explicitly identified thumbnail
      src = $('img#thumbnail').eq(0).attr('src');

      if (!src) {
        // Just grabbing the first image tends to be good enough.
        src = $('img').eq(0).attr('src');
      }

      // HACK: Not sure where the gravatars are coming from, but skip them.
      // TODO: Skip whatever sections have gravatars.
      if (src && src.indexOf('gravatar.com') !== -1) {
        src = null;
      }

      if (src) {
        file.page.thumbnail = url.resolve(file.page.url, src);
      }
    }
    this.push(file);
    cb();
  });
};

taskUtils.fixupArchivedComments = function () {
  var marker = '<div id="comments" class="comments archived-comments">';
  return through.obj(function (file, enc, cb) {
    var contents = file.contents.toString();
    if (contents.indexOf(marker !== -1)) {
      var parts = contents.split(marker);
      if (parts.length > 1) {
        parts[1] = parts[1].replace(/^\s+/gm, '');
        file.contents = new Buffer(parts[0] + marker + parts[1]);
      }
    }
    this.push(file);
    cb();
  });
};

taskUtils.emptyStream = function () {
  return through.obj(function (file, enc, cb) {
    this.push(file);
    cb();
  });
};

taskUtils.filesFromIndex = function (name) {
  var stream = taskUtils.emptyStream();
  var index = config.indexes[name];
  var posts = config.indexes.posts;
  if (index && posts) {
    for (var key in index) {
      var file = new gutil.File({
        path: key + '/index.html',
        contents: new Buffer('')
      });
      file.locals = {
        page: { title: key },
        posts: _.chain(index[key]).map(function (basename) {
          return posts[basename];
        }).sortBy('date').reverse().value()
      };
      if (name == 'tag') {
        file.locals.page.tag = key;
      }
      stream.write(file);
    }
  }
  stream.end();
  stream.emit("end");
  return stream;
};
