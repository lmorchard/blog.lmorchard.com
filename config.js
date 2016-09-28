exports.site = {
  "title": "blog.lmorchard.com",
  "subtitle": "It's all spinning wheels and self-doubt until the first pot of coffee.",
  "language": "en",
  "baseurl": "",
  "absolute_baseurl": "https://blog.lmorchard.com",
  "domain": "blog.lmorchard.com",
  "author": {
    "full_name": "Les Orchard",
    "short_name": "lmorchard",
    "name": "l.m.orchard",
    "email": "l.m.orchard@pobox.com"
  }
};

exports.fulltextTagFeeds = [
  'mozilla'
];

try {
  exports.aws = require('./aws');
} catch(e) {
  exports.aws = {
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: "blog.lmorchard.com",
    region: "us-east-1",
    cloudfront: {
      distribution: process.env.CLOUDFRONT_DISTRIBUTION,
      wait: false,  // this takes a long while
      indexRootPaths: true
    }
  };
}
