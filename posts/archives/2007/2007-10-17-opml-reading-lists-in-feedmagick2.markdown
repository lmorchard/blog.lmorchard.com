---
comments_archived: true
date: '2007-10-17T03:22:47-04:00'
layout: post
tags:
- webdev
- rss
- php
- atom
- xml
- opml
- feedmagick
- feedmagick2
- feeds
title: OPML reading lists in FeedMagick2
wordpress_id: 1066
wordpress_slug: opml-reading-lists-in-feedmagick2
wordpress_url: http://decafbad.com/blog/2007/10/17/opml-reading-lists-in-feedmagick2
---
For anyone who's interested:  I've been hacking a little bit on [FeedMagick2](http://decafbad.com/trac/wiki/FeedMagick) again, with the latest addition being an OPML reading list feed blender.  

[What's an OPML reading list?](http://nick.typepad.com/blog/2005/10/reading_lists_f.html)  Basically, it's the same as as OPML export of a feed reader's subscription list - only rather than doing a one-time import into another program, the OPML is itself treated as a live feed.  A feed reader that supports OPML reading lists will continually check the list for updates and sync RSS/Atom feed subscriptions with its contents, maybe in a special sub-folder.

Here's a quick demo:

* [An RSS feed blended from many of the sites I use daily](http://decafbad.com/2007/04/FeedMagick2/?pipeline=readinglist&url=http%3A%2F%2Fdecafbad.com%2F2007%2F04%2FFeedMagick2%2Fdocs%2Fmaster.opml&format=rss&run=Run+Pipeline)
* [The OPML reading list used as input for the above blend](http://decafbad.com/2007/04/FeedMagick2/docs/master.opml)

The itch I mean to eventually scratch is to replace the front page of decafbad.com with a live updating aggregation of the stuff I create and capture daily on the web.  It'll be basically a self-assembling [tumblelog](http://en.wikipedia.org/wiki/Tumblelog) pulled from many different services across the web.  It'll also replace the footer of accumulated crud I've got on this very blog - which I thought was a good idea at one point, but now consider [NeatLikeDigitalWatches](http://decafbad.com/twiki/bin/view/Main/NeatLikeDigitalWatches).

With that in mind, the next thing I plan to develop is an [hAtom](http://microformats.org/wiki/hatom) module or XSL transform.  This will turn the blended feed into an XHTML page.  Maybe someday, [hAtomic](http://hatomic.org) will launch, and I'll have a nice pretty style for the page too.  Some time after that, I might work up a module that stows away dated historical archives of the feed and pages.  I have [further plans and ideas](http://decafbad.com/svn/trunk/FeedMagick2/TODO), but I'm trying to focus on the itchy spots first so that I might actually get something done in this round of serial enthusiasm.
