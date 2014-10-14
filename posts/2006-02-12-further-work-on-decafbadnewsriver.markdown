---
comments_archived: true
date: '2006-02-12T00:45:39-05:00'
layout: post
tags:
- asides
title: Further work on decafbadNewsRiver
wordpress_id: 863
wordpress_slug: further-work-on-decafbadnewsriver
wordpress_url: http://decafbad.com/blog/?p=863
---
So, when I need breaks from <a href="http://decafbad.com/blog/2005/12/14/hacking-delicious-is-a-real-book">the book</a>, I've been poking around at <a href="http://www.newsriver.org/">NewsRiver</a> customizations in <a href="http://hosting.opml.org/decafbad/decafbadNewsRiver/decafbadNewsRiver.root">decafbadNewsRiver.root</a> for "fun" programming.  You can check out the <a href="http://hosting.opml.org/decafbad/decafbadNewsRiver/decafbadNewsRiver-relnotes.opml">Release Notes</a> I have so far, but here are a few highlights:

* News items can be filtered by Reading List, and a "Further Reading" list of links to view by filter are displayed at the end of the page after all the news.
* I've split just about all the HTML out of the news rendering code into separate templates, for the start of a switchable theme system.  These themes can be somewhat self-contained, allowing you to make extensive changes to how the news items are presented, without needing to dig into the core suite of code.
* I stole preferences code from NewsRiver itself to facilitate selecting a theme.  It's actually quite slick and nice to work with.
* The first theme is based on the aggregator UI I've been working on since my <a href="http://www.decafbad.com/twiki/bin/view/Main/AmphetaOutlines">AmphetaOutlines</a> days, running up through my <a href="http://decafbad.com/blog/2005/10/05/feedspool-is-progressing-nicely">miniagg</a> implementation.  Check out <a href="http://www.decafbad.com/blog_attachments/miniagg-1.jpg">a screenshot</a> of miniagg - that's pretty much how decafbadNewsRiver looks right now.

Lots and lots of bugs, miles and miles away from any sort of release I want to make, but it's been neat poking at this UserTalk stuff again, even with the usual creaks and ancient lizard brain corners I've run into.  I daresay that, while UserTalk and the whole stack isn't as nice to me as Python, it's quite a bit more satisfying than PHP.

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088657">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://donovanwatts.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=188ad8b4dc99107d22c8b868e45f0508&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://donovanwatts.com/">Donovan Watts</a>
                </div>
                <a href="#comment-221088657" class="permalink"><time datetime="2006-02-12T18:20:23">2006-02-12T18:20:23</time></a>
            </div>
            <div class="content"><p>thanks much for working on this more. i prefer to use your tool for reading news and these latest improvements sound appetizing.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088658">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blogs.opml.org/gluft3/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8859d868fa0da57dce69d4998a49489b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blogs.opml.org/gluft3/">George Luft</a>
                </div>
                <a href="#comment-221088658" class="permalink"><time datetime="2006-03-01T02:56:21">2006-03-01T02:56:21</time></a>
            </div>
            <div class="content"><p>Thanks for your suggestion on my Wordpress blog, Les.</p>

<p>I just downloaded and installed decafbadNewsRiver.  I can't seem to figure out how to filter feeds though.  I can expand or collapse feed, but nothing shows up under Further Reading.  Am I doing something wrong?</p>

<p>I do have the API enabled--now I see the Delete All button.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088659">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blogs.opml.org/gluft3/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8859d868fa0da57dce69d4998a49489b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blogs.opml.org/gluft3/">George Luft</a>
                </div>
                <a href="#comment-221088659" class="permalink"><time datetime="2006-03-02T03:34:45">2006-03-02T03:34:45</time></a>
            </div>
            <div class="content"><p>Figured it out!  </p>

<p>"filtered by Reading List" </p>

<p>It helps if you're subscribed to more than one reading list.  :-)</p></div>
            
        </li>
    
        </ul>
    
        </div>
    