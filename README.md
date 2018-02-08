# blog.lmorchard.com

[![Build Status](https://travis-ci.org/lmorchard/blog.lmorchard.com.svg?branch=master)](https://travis-ci.org/lmorchard/blog.lmorchard.com)

This is my blog. There are many others like it, some of them mine. This one is
also mine.

## Setup
```
npm install
cp aws.js-dist aws.js
# Edit aws.js to reflect your AWS credentials for S3 publishing
# Alternatively, set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY env vars
gulp indexes
gulp build
gulp deploy
```

## Writing and previews
```
gulp
```
