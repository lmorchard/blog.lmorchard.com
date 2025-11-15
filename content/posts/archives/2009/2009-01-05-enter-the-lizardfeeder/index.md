---
comments_archived: true
date: '2009-01-05T19:01:54-05:00'
layout: post
tags:
- json
- webdev
- rss
- atom
- entries
- mozilla
- lizardfeeder
- activitystreams
title: Enter the LizardFeeder
wordpress_id: 1533
wordpress_slug: enter-the-lizardfeeder
wordpress_url: http://decafbad.com/blog/?p=1533
---
[caption id="attachment_1582" align="alignright" width="247" caption="The Mozilla Tree"]<a href="http://blog.lizardwrangler.com/2008/07/29/the-mozilla-tree/"><img src="37932c705110.jpg" alt="The Mozilla Tree" title="moz-tree" width="247" height="191" class="size-full wp-image-1582" /></a>[/caption]

Behind Firefox is Mozilla, and behind Mozilla is a community.  And the Mozilla community acts a lot like an ecosystem, which can be visualized [as a kind of living tree][tree]—not to confused with the [mozilla-central tree][mctree].  Oh yeah, and Mozilla is the name of [both a Foundation and a Corporation][mocofo].

Confused yet?  If not, then we should talk so you can explain it to me, because it all looks pretty tangly and [intertwingled][inter] to me.  Nonetheless, it seems to work, and produces a good chunk of my favorite software and technologies.

There are many efforts to track what's going on—including [planets][planet] and [newsletters][about] and [bugzillas][bugzilla] and [wikis][wikis] and [repositories][repos] and [tinderboxen][tinderbox].  Some of these resources report on, or are driven by, the activity occurring in the others.  Some are automated, and others are carefully stitched together by hand.  None offer a full picture of what's going on in the [Mozilla galaxy][galaxy] in a way that's casually comprehensible by a sane human being.

Of course, that's not a slight against any of these sites or the people maintaining them—extracting an overview from such an organic phenomenon is neither easy nor straightforward.  But, it might be fun to try.

As an infovore and avid practitioner of [continuous partial attention][firehose], my first impulse is to reach for a firehose and stick my head into the stream.  Relax, defocus, and try to let my pattern recognizers do their thing—sometimes those pattern recognizers are in my head, and [sometimes they're written in Python][popularlinks].

[caption id="attachment_1585" align="alignright" width="225" caption="Firefox Victory!"]<a href="http://www.flickr.com/photos/intothefuzz/2571283860/in/set-72157605179678562/"><img src="b45b81ee9628.jpg" alt="Firefox Victory Robot" title="firefox-victory" width="225" height="300" class="size-medium wp-image-1585" /></a>[/caption]

But, for Mozilla, I couldn't find a stream of sufficient volume or completeness to satisfy me or [my robots][myrobots].  Happily, though, my feeding urge found itself aligned with a project to discover the patterns of contribution in the Mozilla community and to find a way to thank the contributors responsible.

So, while we're still working on the thank-you angle, allow me to introduce you to [the Lizardfeeder][lizardfeeder].  The [LizardFeeder][lizardfeeder] is a feed aggregator, [whose source code][lizardcode] is built atop [Sam Ruby's Planet Venus][venus]. The [LizardFeeder][lizardfeeder] pulls together and archives activity streams from a wide variety of Mozilla community sources.  Beyond the usual human-readable pages produced by a [blog-gathering Planet][planet], the [LizardFeeder][lizardfeeder] accumulates [statistical and historical data][jsondata] meant for consumption and analysis by robots.

At present, the only robot navigating the [LizardFeeder][lizardfeeder] archives is an AJAX-ified user interface that animates the firehose as a near real-time or time-lapsed stream of events scrolling by.  

This is just meant as a conversation starter, though.  I'm hoping to [gather feedback and find more sources][requests], as well as to entice creative community members to come up with more sophisticated visualizations of this data.  

So, take a look, [check it out][lizardfeeder], and let me know what you think!

[myrobots]: http://www.digitpress.com/dpsoundz/destroyhimrobots.wav
[inter]: http://en.wikipedia.org/wiki/Intertwingularity
[mocofo]: http://www.mozilla.org/reorganization/
[mctree]: https://developer.mozilla.org/en/mozilla-central
[galaxy]: http://ascher.ca/blog/2008/06/19/whats-mozillas-scope-what-should-it-be/
[popularlinks]: http://decafbad.com/hgwebdir.cgi/hacking_rss_and_atom/file/f7a85b9fd48a/ch15_popular_links.py
[jsondata]: http://feeds.mozilla.com/archives/index.json
[lizardcode]: https://svn.mozilla.org/projects/lizardfeeder/trunk/
[venus]: http://www.intertwingly.net/code/venus/
[lizardfeeder]: http://feeds.mozilla.com/
[firehose]: http://decafbad.com/blog/2005/09/23/the-zen-of-firehose-drinking
[tinderbox]: http://tinderbox.mozilla.org/showbuilds.cgi?tree=Firefox
[repos]: http://hg.mozilla.org/
[wikis]: https://wiki.mozilla.org/WeeklyUpdates/2009-01-05
[bugzilla]: https://bugzilla.mozilla.org/
[planet]: http://planet.mozilla.org/
[about]: http://blog.mozilla.com/about_mozilla/
[tree]: http://blog.lizardwrangler.com/2008/07/29/the-mozilla-tree/
[requests]: https://bugzilla.mozilla.org/show_bug.cgi?id=469838

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221083355">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=eb4ef8f72f933b04a27b118070ac538e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">dria</a>
                </div>
                <a href="#comment-221083355" class="permalink"><time datetime="2009-01-06T01:26:18">2009-01-06T01:26:18</time></a>
            </div>
            <div class="content"><p>Is there a list of what sources are already being read by the LizardFeeder anywhere?  I scanned through the various links here but didn't see anything obvious :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083356">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221083356" class="permalink"><time datetime="2009-01-06T01:37:15">2009-01-06T01:37:15</time></a>
            </div>
            <div class="content"><p>Yeah, that part could use some improvement.  There's a monster list here:</p>

<p>http://feeds.mozilla.com/sources.opml</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083358">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://briks.si"><img src="http://www.gravatar.com/avatar.php?gravatar_id=315c86c9c01a5ced617aa58ef641902d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://briks.si">Brian King</a>
                </div>
                <a href="#comment-221083358" class="permalink"><time datetime="2009-01-06T10:11:46">2009-01-06T10:11:46</time></a>
            </div>
            <div class="content"><p>Excellent stuff. I was going to ask about access to the list of sources for each category, but Dria beat me to it.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083359">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221083359" class="permalink"><time datetime="2009-01-06T15:26:50">2009-01-06T15:26:50</time></a>
            </div>
            <div class="content"><p>Actually, it occurs to me that this config file might work as a more readable version of the list of sources:</p>

<p>https://svn.mozilla.org/projects/lizardfeeder/trunk/conf/config.ini-dist</p>

<p>There's also this, which is where most of the previous list came from: </p>

<p>https://svn.mozilla.org/projects/lizardfeeder/trunk/conf/hg-feeds.opml-dist</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083360">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://ozten.myopenid.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4021c2acfc5b98b6dfe2d0ec26432ce1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://ozten.myopenid.com/">Austin King</a>
                </div>
                <a href="#comment-221083360" class="permalink"><time datetime="2009-01-06T20:55:52">2009-01-06T20:55:52</time></a>
            </div>
            <div class="content"><p>Thanks for the background surrounding lizard feeder. Great post!</p>

<p>+1 Dria and Brian</p>

<p>Maybe make the title of the link to the OPML more descriptive than just "Feeds" and/or link to it in the body of the UI too and write something around it to encourage other's visualizations.</p>

<p>Awesome work Les.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083361">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=a1c5374b594738e98be48f7f193443b3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Sanjay Parekh</a>
                </div>
                <a href="#comment-221083361" class="permalink"><time datetime="2009-02-04T20:38:04">2009-02-04T20:38:04</time></a>
            </div>
            <div class="content"><p>Is the AJAX UI available anywhere for download?  I'd like to hack it for another use altogether.  Great visualization and great application.  Good job.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083362">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=7881dcee98d7df7e89939afd191c92ce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Deen Seth.</a>
                </div>
                <a href="#comment-221083362" class="permalink"><time datetime="2009-09-16T18:21:02">2009-09-16T18:21:02</time></a>
            </div>
            <div class="content"><p>This is a very good idea.  Can we accomplish the same result using Yahoo Pipe?  Do you plan to add events from Bugzilla, and mailing list to the feed?</p>

<p>I am more interested in development activities.  There aren't much in code category.</p>

<p>I am interested in analyzing development related events.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    