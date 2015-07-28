# blog.lmorchard.com

This is my blog. There are many others like it, some of them mine. This one is
also mine.

## Setup
```
npm install
cp config.js-dist config.js
vim config.js
gulp indexes
gulp build
gulp deploy
```

## Writing and previews
```
gulp server
```

## TODO

* Genericize this stuff into a reusable package?

* Replace Font Awesome with SVG icons for top tags

* Github hooks + my server to auto-build and publish
  * Maybe try setting this up on heroku?
  * Travis-CI with a cached set of file hashes to make the S3 push faster?

* Limit tag page generation to tags with 3? 5? or more posts?

* Switch to Browserify & Babel if/when I want some JS enhancements again

* Bundle Font Awesome back into local files rather than using CDN

* Revive the comments archiver to preserve closed Disqus threads

* Quick gulp task to produce a new boilerplated post

* Switch from Swig to [Nunjucks](http://mozilla.github.io/nunjucks/) because it's a Mozilla project hooray

* Add some TOC generation in JS

* Prev / next nav links for posts?
