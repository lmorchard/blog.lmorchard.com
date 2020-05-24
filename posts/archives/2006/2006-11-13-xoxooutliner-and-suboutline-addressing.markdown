---
comments_archived: true
date: '2006-11-13T04:34:02-05:00'
layout: post
tags:
- asides
- webdev
- php
- outlining
- xoxooutliner
- xsl
- xoxo
- xml
title: XoxoOutliner and suboutline addressing
wordpress_id: 1018
wordpress_slug: xoxooutliner-and-suboutline-addressing
wordpress_url: http://decafbad.com/blog/2006/11/13/xoxooutliner-and-suboutline-addressing
---
Here's a feature I [just hacked together][ha] for [XoxoOutliner][xo] and plan to refine further:

[ha]: http://decafbad.com/trac/changeset/776
[xo]: http://decafbad.com/trac/wiki/XoxoOutliner

* [http://decafbad.com/2006/11/XoxoOutliner/outlines/README;text:Features?format=xoxo](http://decafbad.com/2006/11/XoxoOutliner/outlines/README;text:Features?format=xoxo)
* [http://decafbad.com/2006/11/XoxoOutliner/outlines/README;id:native?format=xoxo](http://decafbad.com/2006/11/XoxoOutliner/outlines/README;id:native?format=xoxo)
* [http://decafbad.com/2006/11/XoxoOutliner/outlines/README;contains:Implement?format=xoxo](http://decafbad.com/2006/11/XoxoOutliner/outlines/README;contains:Implement?format=xoxo)

Not entirely sure that this is how I want this to work, but these three URLs demonstrate the ability to address and fetch subsets of outlines.  I'm hoping this will be a basis for selective transclusion in other outlines, or maybe even in a sidebar of a blog.  (Which, depending on the blog software, might be built from outlines anyway.)
