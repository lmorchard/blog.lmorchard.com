---
comments_archived: true
date: '2005-10-05T16:58:21-04:00'
layout: post
tags:
- webdev
- rss
- syndication
- atom
- projects
- aggregation
- feedspool
title: FeedSpool is progressing nicely
wordpress_id: 717
wordpress_slug: feedspool-is-progressing-nicely
wordpress_url: http://decafbad.com/blog/?p=717
---
I'm at it again:  Last night, I got an initial stab at a [plugin API][api] for [FeedSpool][fs] working.

The first thing I built was an [auto-adjusting feed poll schedule plugin][vary] which varies the time between feed polls based on whether there were new entries found in the latest poll.  It's kind of like an AIMD algorithm used in networking—I thank [Gnomon][g] for the idea a few years back.

The next thing I built was a [quick plugin bundle I call `miniagg`][mini].  If you'd like a preview, I've posted [an HTML snapshot of what `miniagg` produces][mini_preview].  It's a refinement and reworking of various aggregator UI pieces I've had floating around since [AmphetaOutlines][amph], only I think this is the simplest and cleanest I've gotten it yet.  (CSS and unobtrusive JavaScript, hooray!)

This only seems to work on Firefox and Safari—it's currently broken for MSIE, and I don't care enough to fix it yet.  (Something to do with multiple CSS classes, I believe.)  But, if you're unfortunate enough to be using that browser, here's a screen capture:  

<a href="http://www.decafbad.com/blog_attachments/miniagg-1.jpg" onclick="window.open('http://www.decafbad.com/blog_attachments/miniagg-1.jpg','popup','width=984,height=742,scrollbars=no,resizable=yes,toolbar=no,directories=no,location=no,menubar=no,status=yes,left=0,top=0');return false"><img src="http://www.decafbad.com/blog_attachments/miniagg-1-tm.jpg" height="244" width="324" border="1" hspace="4" vspace="4" alt="Miniagg-1" /></a>

[g]: http://decafbad.com/blog/2003/09/29/dynamic-polling-freq-too#comment-1061
[amph]: http://decafbad.com/trac/wiki/AmphetaOutlines
[vary]: http://decafbad.com/trac/browser/trunk/feedspool/plugins/poll_schedule_vary.py
[api]: http://decafbad.com/trac/wiki/FeedSpool/Plugins
[fs]: http://decafbad.com/trac/wiki/FeedSpool
[mini]: http://decafbad.com/trac/browser/trunk/feedspool/plugins/miniagg/
[mini_preview]: http://decafbad.com/2005/10/miniagg/news-20051005-152956.html

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085179">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://thecrypto.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=55fe39199c1dbe9e342e527d0173c57f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://thecrypto.org">Julian Krause</a>
                </div>
                <a href="#comment-221085179" class="permalink"><time datetime="2005-10-05T22:12:31">2005-10-05T22:12:31</time></a>
            </div>
            <div class="content"><p>I've been using a program called <a href="http://offog.org/code/rawdog.html" rel="nofollow">Rawdog</a> for a while as my feed reader. Miniagg looks very similar to it. I've been looking for a replacement as he is not planning to support Atom 1.0 since <a href="http://feedparser.org" rel="nofollow">feedparser</a> has gone unmaintained. The HTML preview looks really good, I'm importing my subscriptions right now ;)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085180">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221085180" class="permalink"><time datetime="2005-10-05T23:25:03">2005-10-05T23:25:03</time></a>
            </div>
            <div class="content"><p>Alas, this miniagg uses feedparser also.  However, I was thinking of patching / finding someone who'd patched feedparser for Atom 1.0—or replacing it with a new, maybe less liberal parser of my own, since FeedSpool is actually not all that liberal (in that it requires valid XML, anyway).</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085182">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221085182" class="permalink"><time datetime="2005-10-06T08:48:52">2005-10-06T08:48:52</time></a>
            </div>
            <div class="content"><p><a href="http://fucoder.com/2005/08/feedparser-atom-10-patch/" rel="nofollow">FeedParser Atom 1.0 support patch</a>.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085183">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=9e44fa55e7078bff7c3dab8404913928&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Dan V.</a>
                </div>
                <a href="#comment-221085183" class="permalink"><time datetime="2005-10-26T19:16:09">2005-10-26T19:16:09</time></a>
            </div>
            <div class="content"><p>The feedparser page says that a prerelease v4.0 can be downloaded that includes support for Atom 1.0 feeds.  Beats writing your own :)</p></div>
            
        </li>
    
        </ul>
    
        </div>
    