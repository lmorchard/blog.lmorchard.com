---
comments_archived: true
date: '2006-01-21T01:54:30-05:00'
layout: post
tags:
- asides
- rss
- syndication
- feeds
- radio
- newsriver
- frontier
- userland
- usertalk
- dwiner
title: A bit of newsRiver hackery
wordpress_id: 833
wordpress_slug: a-bit-of-newsriver-hackery
wordpress_url: http://decafbad.com/blog/?p=833
---
**Update:** *I moved this code over to [my space over at hosting.opml.org][ms] and added some updater code from [Nicholas Riley's webdav tool][nu], so that you should be able to just "Get Latest Code..." once you've got this installed.  (Or reinstalled, if you grabbed last night's version.)  Also, I fixed a bug or two.*

[ms]: http://blogs.opml.org/decafbad/
[nu]: http://web.sabi.net/nriley/software/

So, I couldn't resist poking around with Dave Winer's [newsRiver][] in the [OPML editor][oe].  For whomever's interested in this sort of thing, here's the result of a couple of hours' hacking this evening:

* [`decafbadNewsRiver.root`](http://hosting.opml.org/decafbad/decafbadNewsRiver/decafbadNewsRiver.root)

In this is a tool to be dropped into your OPML Editor install's Guest Databases / apps / Tools directory, right alongside `newsRiver.root` itself.  You may need to restart the OPML Editor.  Once installed, you should see a new "DecafbadNewsRiver" menu item under the Tools menu, allowing you to view your news in this new UI.  Expect *lots* of bugs, though.

Basically, this provides an alternate DHTML outline rendering of the news items gathered by newsRiver—quite similar to [what I did back in October for FeedSpool][fs].  I'm not sure how far I'll take this, if I take it any farther.  I've got a bit of a notion to tackle some REST/AJAX interaction with newsRiver for on-the-spot item deletion, and maybe on-demand item content retrieval.

But, for newsRiver hackers:  You might like what I've done with the `viewNewsItems` script under `decafbadNewsRiverSuite`.  I've made an attempt to pull all of the HTML out of the midst of the processing code.  That's was icky, and I hated it back when I first ran into it in Radio UserLand.  

I've broken all of that out into smaller external templates for page, feed, and item under `decafbadNewsRiverData`.  This should allow for easier styling and customization of the code that newsRiver produces, as well as maybe swapping themes on the fly with a preference that points the rendering process at a different root table for templates.

In any case, do what you like with this work.  I hope it's useful to someone out there.

<!-- tags: newsriver frontier userland radio usertalk rss syndication feeds dwiner -->

[oe]: http://www.opml.org
[newsriver]: http://www.newsriver.org/
[fs]: http://decafbad.com/blog/2005/10/05/feedspool-is-progressing-nicely

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084999">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://donovanwatts.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=188ad8b4dc99107d22c8b868e45f0508&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://donovanwatts.com/">Donovan Watts</a>
                </div>
                <a href="#comment-221084999" class="permalink"><time datetime="2006-01-21T07:55:24">2006-01-21T07:55:24</time></a>
            </div>
            <div class="content"><p>neat! i much prefer this interface. thanks much.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    