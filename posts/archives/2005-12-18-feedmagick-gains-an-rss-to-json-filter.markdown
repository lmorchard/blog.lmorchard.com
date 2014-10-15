---
comments_archived: true
date: '2005-12-18T22:01:51-05:00'
layout: post
tags:
- asides
- ajax
- json
- webdev
- web20
- rss
- syndication
- atom
- javascript
title: FeedMagick gains an RSS-to-JSON filter
wordpress_id: 801
wordpress_slug: feedmagick-gains-an-rss-to-json-filter
wordpress_url: http://decafbad.com/blog/?p=801
---
So, I put [some more infrastructure][in] behind [FeedMagick][fm] and lifted [a RSS-to-JSON idea from John Resig][jr] to transform from [MagpieRSS][mr] parsing to JSON output.  

Here's [a spiffy JSON-enriched demo][jd].  It was surprisingly easy, all told.

I'm not sure how much time I'll have to really put into this project, but this is the first decent effort I've put into a URL-line suite in a long time.  I'm trying to throw in some bits to make it easy to build, document, and use these feed processing commands.

<!-- tags: rss json php syndication atom javascript webdev ajax web20 -->

[mr]: http://magpierss.sourceforge.net/
[jd]: http://decafbad.com/2005/12/FeedMagick/docs/json-demo.html
[in]: http://decafbad.com/2005/12/FeedMagick/
[jr]: http://ejohn.org/projects/rss2json/
[fm]: http://decafbad.com/trac/wiki/FeedMagick
