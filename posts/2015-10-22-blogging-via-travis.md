---
title: "Continual Blogployment"
tags: [metablogging, webdev, js, gulp, github, travis, s3, amazon, devops]
---
Ever since [I switched this blog over to a Gulp-based toolchain][gulp-blog] - *holy crap, 2 years ago* - I had a TODO to wire this thing up for continual deployment. Well, today I finally did it. 

Just to test the cloud machinery I'm (ab)using here, I'm writing this post as a new commit on GitHub in a browser. When I get done and commit this, Travis CI will fire up, install my node-based blog code and build all the content. Assuming that goes well, my code on Travis will then publish any changes in the content to Amazon S3. And, voila, I will have blogged via the magic of cheap cloud infrastructure.

Up until now, I've been doing this all from my laptop: Write a post in Vim, commit to git, build & deploy from my local machine. I'd push to GitHub to work in the open and have a handy backup. But from here on, the push to GitHub will actually make the magic happen!

If you're curious about the plumbing, [the changes in my recent commits][recent-commits] can tell the exact story. But, what I did in a nutshell is this:

* [Switched to using environment vars to configure AWS credentials for S3 publishing][env-config].
* Used [`travis secure`][travis-secure] to supply credentials in encrypted environment vars.
* Started [maintaining a copy of file hashes on the site][hash-stash] so that [gulp-awspublish][] will only upload changes to S3.
* Composed a [.travis.yml][travis-yml] to build & deploy everything.

And, if you're reading this post, then that means everything worked when I hit the "Commit new file" button!

[env-config]: https://github.com/lmorchard/blog.lmorchard.com/commit/4c029ab9a6d3f5869cee02b7265e0ad41908a8c4
[gulp-awspublish]: https://www.npmjs.com/package/gulp-awspublish
[hash-stash]: https://github.com/lmorchard/blog.lmorchard.com/commit/4b525710760ad70c0d83d910585e7bd9ddd80583
[travis-yml]: https://github.com/lmorchard/blog.lmorchard.com/blob/master/.travis.yml
[travis-secure]: http://docs.travis-ci.com/user/environment-variables/#Encrypted-Variables
[recent-commits]: https://github.com/lmorchard/blog.lmorchard.com/compare/5992311ade7acc0e9dbeb0352ac4097c687be1a5...master
[gulp-blog]: http://blog.lmorchard.com/2014/10/20/static-blog-generation-with-gulp/
