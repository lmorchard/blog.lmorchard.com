---
title: Static blog generation with Gulp and S3
tags: [metablogging, webdev, js, gulp, jekyll, wordpress]
---

I've long agreed that many sites, like blogs, are better [baked than
fried][bake]. It makes for web hosting that's cheaper to run and simpler to
maintain. I've also often thought that [using a database can be an
anti-pattern][antidatabase] for managing content. But, what I've also found is
that baked sites often yield a poor writing environment. That said, I think
I'm going to give it another try, because I think I might have found a new
approach that works for me.

<!--more-->

## From WordPress to Jekyll to WordPress

[As I've mentioned before][platforms], I've flirted with a variety of
platforms for putting stuff from my brain on the web. But, the last time I
switched away from WordPress to Jekyll, I ended up switching right back again.

Jekyll [took *way* too long][jekyllslow] to generate my site and its 1150 posts, and I
couldn't figure out how to speed that up for previewing drafts without moving
files around.  I tried a few different external tools like
[Mou](http://25.io/mou/) and [Marked](http://marked2app.com/), but the process
never clicked. I've also never quite gotten along with Ruby, so I didn't go
far with scratching my own itches on Jekyll.

[jekyllslow]: http://blog.lmorchard.com/2012/06/16/blogging-like-a-blogger/

On the other hand, WordPress has a nicer writing experience. But, it's clunky
in other ways. I'm always worried about all that PHP code sitting around
frying up page views, hoping no one figures out how to get at the publishing
machinery. I'm also less interested in hacking on PHP for fun, these days.

## Gulp is great

The place where I've been having a lot of hacking fun over the past few years
is in node.js. So, when I was thinking about trying static hosting for
my blog again, I started looking into node.js-based Jekyll clones.

But then, it occurred to me that [Gulp][] would be a fine tool for the job. In
a nutshell, like unix tools pipe character streams between tools, Gulp pipes
streams of files between small utility functions. All I had to do was build up
a small collection of file processing functions and glue them together. 

## Copying Rioki's homework

As it happens, [someone else had already started that work for me][rioki]! The
core of it, handling the posts, looks something [like this][tasks]:

```javascript
function posts (path) {
  return gulp.src(path)
    .pipe(frontMatter({property: 'page', remove: true}))
    .pipe(taskUtils.filename2date())
    .pipe(marked())
    .pipe(taskUtils.summarize('<!--more-->'))
    .pipe(rename(taskUtils.postNameToDatePath))
    .pipe(taskUtils.applyTemplate('design/layouts/post.html'))
    .pipe(gulp.dest('build'));
}
```

Pretty clean & straightforward, at least to my eyes.

Starting from [Rioki's gulpfile.js][rioki2], I hacked and iterated until I had
a [gulpfile.js][] of my own, split into [a directory of small task
modules][tasks].  At this point, I've got a bunch of in-memory post indexes,
date & tag based archive pages, RSS feeds, and a handful of other templated
pages. I can push all the content to an Amazon S3 bucket [with one
command][deploy]. 

[deploy]: https://github.com/lmorchard/blog.lmorchard.com/blob/master/gulpfile.js#L32
[tasks]: https://github.com/lmorchard/blog.lmorchard.com/blob/master/lib/tasks/posts.js#L34
[gulpfile.js]: https://github.com/lmorchard/blog.lmorchard.com/blob/master/gulpfile.js

Oh, and building the whole site only takes around 30 seconds. Still, that's
not fast enough for running previews while writing. So, I've broken things up so 
[new & draft posts lead to quick rebuilds when their files change](https://github.com/lmorchard/blog.lmorchard.com/blob/master/lib/tasks/posts.js#L13) - and I even [trigger a LiveReload
service](https://github.com/lmorchard/blog.lmorchard.com/blob/master/lib/tasks/posts.js#L29)
that keeps a browser tab updated as I make changes in Vim.

And, best of all, I understand how the whole thing works. This stuff feels
nicely maintainable and fun to expand in the future as a
[saw-sharpening][sharpen] / yak-shaving opportunity. I might even take a shot
at spinning off all the code from the content and release it as a standalone
module installable from [NPM](http://npmjs.org) in case anyone else wants to
try it out.

## From WordPress and Jekyll to Gulp

I found [a WordPress-to-Jekyll exporter plugin][exporter]. It
generates a nice zip file download right from the site admin. That let me
dump the 50 posts I've accumulated since the last switch.

And, a great thing about the YAML-and-markdown file format used by Jekyll is
that I was able to merge my posts from both decafbad.com and
blog.lmorchard.com just by copying them into the same directory. So, I'm
thinking that I'll revive my old blog by squashing it right on into the
new, and set up a handful of redirects to unify the whole mess.

## Amazon S3 deployment

[Hosting a static website on Amazon S3][static] is cheap and fast and low
maintenance. And, a module called [gulp-awspublish][] can handle pushing this
whole site to S3 [really easily][deploy].

[static]: http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html

Turns out I generate around 4750 files, between all the posts and tags and dates. 
It takes about 30 minutes to upload the first time. But, [gulp-awspublish][]
keeps track of MD5 hashes. So, next time I generate and upload, it skips all the
pages that haven't changed. That's just a handful of files, if
all I'm doing is publishing one new post.

It also seems like this module uploads one file at a time. I wonder if I might
hack it to queue up a few dozen or so in parallel to speed things up? I doubt
that uploading thousands of files was the original use case, so it might do
with some tweaking.

[gulp-awspublish]: https://github.com/pgherveou/gulp-awspublish

## Page sections loaded via AJAX

I've got a simple template for this new blog, and I hope to keep it that way.
But, there's a lot of stuff in that sidebar. Well, I decided to tweak a few
things and suddenly I had 4750 files to upload to S3.

Just because the site is statically published doesn't mean some parts
can't be dynamic with the help of the client. Rather than put up wth
regenerating & uploading all the things in the future, I yanked the sidebar
out of almost every page and generated it as [a separate resource][sidebar].

Then, with [a tiny bit of jQuery magic][sidebarajax], I load that sidebar into
the page via AJAX. That shrank the size of the site overall, and it's so fast
and cacheable that I never see any difference.

I think this will be one of the little keys to maintaining the site: Try to
extract any common element used throughout the site, and push it into a
dynamically loaded asset. Not everything can be done that way, but I think
plenty can.

[sidebar]: https://github.com/lmorchard/blog.lmorchard.com/blob/master/design/sidebar.html
[sidebarajax]: https://github.com/lmorchard/blog.lmorchard.com/blob/master/design/js/main.js

## Disqus and comment archival

I'm also back to using Disqus for comments. They've got a great service, and
they're not a roach motel. They have a great API, and I even wrote a Python
script for decafbad.com that [archives comments from closed
threads][commentarchiver] right into the blog post itself.

[commentarchiver]: https://github.com/lmorchard/blog.decafbad.com/blob/master/_bin/archive_disqus_comments.py

At some point, I need to get that working again and maybe transliterate it
over to node.js. 

## Next steps

I've got some more I'd like to do with this stuff, but the main next steps are
these:

* Write more often
* Write more consistently

Of course, having skimmed through my posts over the years on this blog, I'd
estimate about 25% of the whole thing is me grousing out loud about the long
stretches I spend neglecting this place. 

So, who knows? Maybe you'll see my
next post show up sometime next June!

[bake]: http://www.aaronsw.com/weblog/000404
[rioki]: http://www.rioki.org/2014/06/09/jekyll-to-gulp.html
[antidatabase]: https://indiewebcamp.com/database-antipattern
[exporter]: https://github.com/benbalter/wordpress-to-jekyll-exporter
[platforms]: http://decafbad.com/blog/2011/06/08/moved-to-jekyll/

[gulp]: http://gulpjs.com/
[enthusiasm]: http://decafbad.com/blog/2006/05/26/confessions-of-a-serial-enthusiast
[sharpen]: https://www.stephencovey.com/7habits/7habits-habit7.php
[rioki2]: https://github.com/rioki/www.rioki.org/blob/master/gulpfile.js

<!-- vim: set wrap wm=5 syntax=mkd textwidth=78: -->
