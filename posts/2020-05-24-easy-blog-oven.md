---
title: Easy-Blog Oven
tags:
  - metablogging
  - blogging
  - node
  - webdev
---

**TL;DR**: I made [a new static site generator for my blog](https://github.com/lmorchard/blog.lmorchard.com). It's not very clever. I've been calling it my "Easy-Blog Oven" and it seems to be working well so far.

<!--more-->

<img class="fullwidth" src="/uploads/2020/easy-bake-oven.jpg" />

I've tried a lot of tools for writing on the web. In fact, I've spent more time trying tools for writing on the web than actually writing on the web. My last round was writing my own thing [using Gulp and Amazon S3][gulp-blog] as a learning project. A couple of years later, [I hooked it up to Travis CI to publish on a push to master][travis-ci].

 I wrote 30 whole blog posts using that system! But, it felt slow and cumbersome. Also, I stopped using Gulp for any other projects. And, at some point, new versions of Node.js stopped running my site generator altogether. So, I've been putting off fixing that whole mess for a while.

But then, just this past week, I whipped up [a quick static site generator for a project at work][storybook-indexes]. All it does is this:

* Iterate through files and load them.
* Render HTML using [tagged template literals][tagged-literals].

After building that, it occurred to me: What if I just wrote a stupid simple script for my blog to iterate through all my entries? So, [I tried it in a real quick sketch of code][initial-commit]. Since it was about as 

I've accumulated over 1000 posts in the 18 years since I started a blog. I expected this naive script to take an annoyingly long time to run. It took 2 seconds. Turns out computers and Node.js are fast, these days. Hell, there's probably more data dredged up from a typical `node_modules` folder than my entire blog.

Thus encouraged, I tried loading everything into memory. My computer's got lots of it. Then, it's just filter, map, reduce, and sort operations on arrays to generate index pages for posts by date and tag. Turning [lists of posts][post-list] into HTML with [tagged template literals][post-list-template] added *an entire second* to the execution time.

From there, I ported over a few more elaborations & complications from my old Gulp-based site generator. That added up to a whole six seconds of execution time. I'd bet I could find a few single web pages out there that take about as long to load as this thing takes to generate my whole site.

So anyway, I started all of this on Friday night. I spent a big chunk of Saturday continuing to tinker. And then, today, [I learned enough about Github Actions get this thing building and uploading to Amazon S3][gh-action-s3].

The whole build and publish process now seems to take about 3 minutes. The longest part is uploading everything to Amazon S3, which could be greatly improved by just uploading what's changed. The site build itself only seems to take about 6-7 seconds. Pretty neat.

Now, let's see if I start using this thing again.

[gh-action-s3]: https://github.com/lmorchard/blog.lmorchard.com/blob/master/.github/workflows/prod.yml
[travis-ci]: https://blog.lmorchard.com/2015/10/22/blogging-via-travis/
[post-list]: https://github.com/lmorchard/easy-blog-oven/blob/553f557be22db8ca47c38559490db2b5f75c7b1d/index.js#L58
[post-list-template]: https://github.com/lmorchard/easy-blog-oven/blob/553f557be22db8ca47c38559490db2b5f75c7b1d/templates/postList.js
[initial-commit]: https://github.com/lmorchard/easy-blog-oven/commit/13a75f91992683eb8a665b026dcf0911459872ee#diff-168726dbe96b3ce427e7fedce31bb0bcR26
[tagged-literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates
[storybook-indexes]: https://github.com/mozilla/fxa/blob/master/_scripts/build-storybooks-indexes.js
[jekyll-blog]: https://blog.lmorchard.com/2011/06/08/moved-to-jekyll/
[wordpress-blog]: http://blog.lmorchard.com/2012/06/16/blogging-like-a-blogger/
[gulp-blog]: https://blog.lmorchard.com/2014/10/20/static-blog-generation-with-gulp/
[typing]: https://typing.lmorchard.com/