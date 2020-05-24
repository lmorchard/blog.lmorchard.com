---
comments_archived: true
date: '2006-01-03T09:45:01-05:00'
layout: post
tags:
- aggregators
- rss
- syndication
- atom
- attention
title: Sharing attention while reading feeds
wordpress_id: 814
wordpress_slug: sharing-attention-while-reading-feeds
wordpress_url: http://decafbad.com/blog/?p=814
---
<blockquote cite="http://blogs.zdnet.com/SAAS/?p=82">Instead of reading their individual selections of RSS feeds privately, everyone should be encouraged to publish those aggregated feeds on the Web. ... the simple act of publishing those aggregations then makes them available to others, and thus makes them amenable to network effects in a way that they never can be if they're kept private.</blockquote>
<small style="text-align:right; display:block">Source: <a href="http://blogs.zdnet.com/SAAS/?p=82">» It's time to bury RSS | Software as services | ZDNet.com</a></small>

My current two responses to the above:

* I love my [popular links][pl] summary feed.
* [Attention.xml][att] is starting to make sense to me.

Putting these two together could be a very powerful tool for bringing network effects to feed reading.

First off, one of the most useful feeds I have is my private Popular Links feed.  [Touting my book again][book], I showcase the [script behind this thing][pl] in Chapter 15.  I've had this running for well over a year, and it's always my first stop in the feed reader.  Almost without fail, this tends to surface what's buzzworthy.

Basically, this script scans all the current entries of all my subscribed feeds for unique hyperlink URLs found in descriptions and summaries.  It collates all entries by these links, then sorts by the number of entries under each link.  A threshold is applied, filtering for links pointed to by 3 or more entries.  

At the end, I see a new feed entry displaying the most linked-to things of the moment.  Think of this as a kind of real-time PageRank.  How's that for network effects?

I think this is *sort of* how [Memeorandum][meme] works, only this is constrained to the feeds in my subscription list.  I've been considering making this script a full-on service:  Upload an OPML export from your aggregator, get your own Popular Links feed.  I've got all the parts laying around but I haven't yet had time to put them together—**but if it sounds like something useful, and possibly worth clicking a Paypal donation button, let me know!**

Secondly:  [Attention.xml][att] makes a lot of sense with regard to the above-quoted article.  When I first heard about [Attention.xml][att], I merely cocked my head at it and made a confused sound.  This was before I caught the microformats bug, and before I realized that I [started reinventing it][blogroll] a bit in my own ramblings.

Basically, [Attention.xml][att] is a feedroll enriched with data about the entries you've lately read from each feed.  It's in an XHTML-based format which—albeit ugly in my opinion and in need of more elegant microformat influence—is indeed viewable in a browser.  In a sense, this format is an auto-blog of my feed consumption.  I was looking for hacks for my NetNewsWire in AppleScript, when I found [this Attention.xml generator][gen].  Seeing the output of that, it all clicked.

Combining [Attention.xml][att] with my Popular Links algorithm could be a very powerful thing, methinks.  Rather than waiting for my friends to tip over the laziness point to blogging about something, I could digest their shared [Attention.xml][att] files and collate the links they've merely *read*.  In this way, I could build an *AttentionRank* for various things, and cause the cream to rise to the top in my feed reader.

I'm pretty sure that I'm playing catch-up here, but this all suddenly seems hot to me.  And not to mention, it seems neat that I have all the pieces laying around to build it.  The only bad thing is that I just don't have the time to spare—I've already spent too much time writing this blog post!

Anyway, maybe you'll hear more from me about this soon.

[gen]: http://decafbad.com/blog/2005/12/01/blogrolls-grow-up-to-become-feedrolls
[blogroll]: http://decafbad.com/blog/2005/12/01/blogrolls-grow-up-to-become-feedrolls
[att]: http://tantek.com/presentations/2005/01/attentionxml.html
[meme]: http://memeorandum.com/
[pl]: http://decafbad.com/trac/browser/trunk/hacking_rss_and_atom/ch15_popular_links.py
[book]: http://www.amazon.com/exec/obidos/ASIN/0764597582/0xdecafbad01-20?creative=327641&camp=14573&link_code=as1

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085102">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.wakingideas.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c3a79b6f40ba93496389e42cd76ad2f1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.wakingideas.com">Daniel Nicolas</a>
                </div>
                <a href="#comment-221085102" class="permalink"><time datetime="2006-01-03T15:39:45">2006-01-03T15:39:45</time></a>
            </div>
            <div class="content"><p>I think you could get away with charging $5 for a service like that.  Maybe even $10 if it was all web-based with cool ajaxyness flowing out of it.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085103">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.annezelenka.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4dbe4cabb90ab41b92d7c85afc8adf96&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.annezelenka.com">Anne Zelenka</a>
                </div>
                <a href="#comment-221085103" class="permalink"><time datetime="2006-01-03T19:26:21">2006-01-03T19:26:21</time></a>
            </div>
            <div class="content"><p>That Ch. 15 script looks very useful, though I haven't had a chance to try it yet. The attention.xml thing... interesting but don't know how it would work with three-panel newsreaders like Bloglines. I'm not necessarily interested in a post just because I skimmed the latest articles in a certain feed. I didn't know before I clicked on the feed name whether I'd be interested in the latest stuff. Much of the time I'm not interested.</p>

<p>What I'd like to see is some smart recommendation engine that watches how I read, how much time I spend on a certain article display, whether I click through the links it has, and even provides a "boring" button like some other commenter suggested so it could do some Bayesian filtering. That's getting far beyond what you've described here but what you're describing is a start on it. </p>

<p>Another somewhat different issue is that Memeorandum works by limiting itself to a certain very popular and generic set of issues. Once you have one Memeorandum for politics or tech do you need another? Might individual quirks of attention (like the fact that you are interested in Detroit and I am interested in Maui) make sharing individual attention.xmls less useful? I've never really gotten the social sharing bug though so maybe I'm just showing a lack of imagination.</p>

<p>But just because Memeorandum already exists doesn't mean there isn't a real opportunity. While it's easy to find the hot conversations on politics and tech in the blogosphere, other domains are poorly aggregated and filtered, if at all. I follow mom blogs and feminist blogs and nothing like Memeorandum or digg or reddit exists for those yet there are regularly hot topics that ripple through them. What you describe could be used to build something for those and other domains on the web but is there room for everyone to do it individually? Or will people gravitate to one or a few sites that do a good job of highlighting popular and important conversations in certain well-defined domains?</p>

<p>These are just my raw thoughts on it... your ideas are inspiring.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085104">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philwilson.org/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=abb5e982d97d7539860141b7904ba31a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philwilson.org/blog/">Phil Wilson</a>
                </div>
                <a href="#comment-221085104" class="permalink"><time datetime="2006-01-04T16:38:10">2006-01-04T16:38:10</time></a>
            </div>
            <div class="content"><p>Presumably your subscription list needs to be of a certain size before you can start extracting interesting URLs or you'll just have 20 URLs mentioned twice and 50 URLs mentioned once.</p>

<p>If you were to just read the short head of your popular items list, would this actually be encouraging people to be infovores rather than normal information consumers (where you read or at least skim all of the items in your aggregator)? i.e. the data only starts working for you when you collect enough feeds. Gosh, you could have your own little long-tail on your desktop ;)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085106">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8157a5907b244071cda98ba5aa7a9635&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki">Bill Seitz</a>
                </div>
                <a href="#comment-221085106" class="permalink"><time datetime="2006-01-06T16:45:16">2006-01-06T16:45:16</time></a>
            </div>
            <div class="content"><p>have you look at at TailRank?</p>

<p>http://tailrank.com/</p></div>
            
        </li>
    
        </ul>
    
        </div>
    