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

* Quick gulp task to produce a new boilerplated post
* Dynamig "related links" feature using tags and pinboard.in API
* Better archives page with calendars and not just a big list of everything
* Hack gulp-awspublish to upload many files in parallel
* Switch from Swig to [Nunjucks](http://mozilla.github.io/nunjucks/) because it's a Mozilla project hooray
* Add some TOC generation in JS
