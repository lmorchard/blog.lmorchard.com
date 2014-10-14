---
comments_archived: true
date: '2005-12-13T01:23:44-05:00'
layout: post
tags:
- asides
title: FeedMagick, the show-me-don't-tell-me edition
wordpress_id: 796
wordpress_slug: feedmagick-the-show-me-dont-tell-me-edition
wordpress_url: http://decafbad.com/blog/?p=796
---
So, after that [long-winded explanation of things][long]... Here are a few working bullet points for you:

* [A FeedMagick pass-through feed filter](http://decafbad.com/2005/12/FeedMagick/passthru.php) — ([source](http://decafbad.com/trac/browser/trunk/FeedMagick/passthru.php))
* [My del.icio.us links](http://del.icio.us/rss/deusx)
* [My del.icio.us links, passed through](http://decafbad.com/2005/12/FeedMagick/passthru.php?in=http%3A%2F%2Fdel.icio.us%2Frss%2Fdeusx)
* [A FeedMagick filter on `dc:subject`](http://decafbad.com/2005/12/FeedMagick/subject-filter.php) — ([source](http://decafbad.com/trac/browser/trunk/FeedMagick/subject-filter.php))
* [My del.icio.us links, filtered on `dc:subject="ajax"`](http://decafbad.com/2005/12/FeedMagick/subject-filter.php?in=http%3A%2F%2Fdel.icio.us%2Frss%2Fdeusx&subject=ajax)

Granted, this is gratuitous because [there is already a separate feed for my `ajax`-tagged links](http://del.icio.us/rss/deusx/ajax).  But, a lot of sites' feeds aren't available with such granularity.

And, finally...  Yeah, this is a work in progress.  And my first grumble, where ignorance fails, is that damn `rdf:li` sequence in RSS 1.0.  Right now, this filter only knows about items in the parsing stream—so all the `rdf:li`'s stay in place.  Suggestions welcome!

On the other hand, it works pretty well for Atom and RSS 2.0 so far.  It's just that RSS 1.0 feeds at del.icio.us are one of the best public implementations of feeds with `dc:subject` in the items.

[long]: http://decafbad.com/blog/2005/12/13/feedmagick-the-feed-filter-that-doesnt-know-much-about-feeds
