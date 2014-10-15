var requireDir = require('require-dir');

try {
  exports.indexes = requireDir('./indexes', { recurse: true });
} catch (e) {
  /* no-op */
}

exports.site = {
  "title": "blog.lmorchard.com",
  "subtitle": "It's all spinning wheels and self-doubt until the first pot of coffee.",
  "language": "en",
  "baseurl": "",
  "absolute_baseurl": "http://blog.lmorchard.com",
  "domain": "blog.lmorchard.com",
  "author": {
    "full_name": "Les Orchard",
    "short_name": "lmorchard",
    "name": "l.m.orchard",
    "email": "l.m.orchard@pobox.com"
  }
};
