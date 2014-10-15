var es = require('event-stream');
var _ = require('lodash');

const parser = require('js-yaml')
const seperators = [ '---', '= yaml =']
const pattern = pattern = '^('
      + '((= yaml =)|(---))'
      + '$([\\s\\S]*?)'
      + '\\2'
      + '$'
      + (process.platform === 'win32' ? '\\r?' : '')
      + '(?:\\n)?)'
const regex = new RegExp(pattern, 'm')

function frontMatter(string) {
  string = string || ''

  if (regex.test(string)) return parse(string)
  else return { attributes: {}, body: string }
}

function parse(string) {
  var match = regex.exec(string);
  // HACK (lmo): Ensure that blank lines become indents, to patch an issue with excerpt:
  var yaml = match[match.length - 1].replace(/^\s*[\r\n]/gm, "    \n");
  var attributes = parser.safeLoad(yaml) || {};
  var body = string.replace(match[0], '');

  return { attributes: attributes, body: body }
}

module.exports = function (options) {

  // Default options
  options = _.extend({
    property: 'frontMatter',
    remove:   true
  }, options || {});

  return es.map(function (file, cb) {
    var content;

    if (file.isBuffer()) {
      try {
        content = frontMatter(String(file.contents));
      } catch (e) {
        return cb(e);
      }

      file[options.property] = content.attributes;
      if (options.remove) {
        file.contents = new Buffer(content.body);
      }
    } else {
      // stream
      // @ToDo implement the stream handling
      return cb(new Error('gulp-front-matter: Cannot get the front matter in a stream'), file);
    }

    cb(null, file);
  });
};
