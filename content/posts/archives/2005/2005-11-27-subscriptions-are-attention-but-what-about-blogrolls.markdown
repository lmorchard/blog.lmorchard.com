---
comments_archived: true
date: '2005-11-27T16:29:53-05:00'
layout: post
tags:
- rss
- microformats
- opml
- attention
- privacy
title: Subscriptions are attention, but what about blogrolls?
wordpress_id: 782
wordpress_slug: subscriptions-are-attention-but-what-about-blogrolls
wordpress_url: http://decafbad.com/blog/?p=782
---
<blockquote cite="http://www.dltq.org/?p=763">But today, for my rss feeds importing and exporting needs, OPML far outshines xoxo.<br /><br />Yes, there are 6 XOXO outlines on my front page. There are six lists. But I don’t have an easy way to import one of those XOXO outlines in my FeedDemon application in order to receive the latest blog items from those blogs that I link to. If there IS an easy way to do it, please enlighten me.</blockquote>
<small style="text-align:right; display:block">Source: <a href="http://www.dltq.org/?p=763#comment-1131">XOXO vs. OPML at DLTQ.org</a></small>

Ah hah.  Here's a use case where I agree OPML has undeniably become king: Exporting and importing feed aggregator subscriptions.

Because [Radio UserLand][radio] was the first aggregator to really take off—and because OPML is Radio's lingua franca, any new aggregators have needed to speak OPML to facilitate migration.  It grew from there, with nearly every aggregator supporting some basic form of OPML import/export for subscription lists.  OPML has won the "feed subscription list format war" before there was ever a notion that there might be such a war.

Now, I'm woefully behind on all the buzz connecting OPML with attention.  But, my impression so far is that people want to share their subscription list, exported from their aggregator of choice.  That comes out as OPML.  So then, the reasoning is that because aggregators produce OPML, and aggregators are powerful attention managers, OPML is the lingua franca of attention.  Is this about right?

I guess where I go from there is with this:  **My aggregator's OPML export is private data for interchange between my other aggregators.**  Today, I'm about as comfortable with sharing my OPML with you as I am sharing [QIF files exported from my bank account][qif].  Sure, it's an easy export process, but it's not meant for you.

In my OPML, I've got subscriptions that I've paid for, that I've password protected, and that give me details derived from my server logs.  I don't want to share that, at least not directly.  I've been asked for my OPML by a few people so far, and every time, I need to dig through it and be sure I'm not giving away any secrets.  Maybe this is where I'm a bit confused about the attention hype.

**You see, what I do want to share is called a *[blogroll][radioblogroll]*.**  Blogrolls are *public declarations of attention*, published on blogs.  

Since revamping this blog, I haven't yet gotten around to throwing a proper blogroll together, but I'm planning on it.  And, when I *do* share it, it'll be in HTML list form.  And when I build it, it may start as an OPML export from my aggregator, but I'll have to spend some time weeding through it.

I guess I don't have a clear picture here yet, but directly shipping around exports from my aggregator subscriptions gives me the willies.  And further, basing anything big on OPML gives me the willies too.  

Nowadays, sharing things on the web feels like XHTML and [microformats][] to me.  OPML for interchange between aggregators is one thing—but on the web at large, sinking deeper roots into OPML and the whole Rube Goldberg array of machinery following behind it feels like a backward step to me.  

Maybe [microformats][] are the new XML-geekery, but I don't want a new, "cleaner" XML format—I just want to more cleverly use the format that everyone's been using to share outlines and declarations of attention in blogs.

[qif]: http://web.intuit.com/support/quicken/2002/win/1177.html
[radio]: http://radio.userland.com/
[radioblogroll]: http://radio.outliners.com/blogRollOutliner
[microformats]: http://www.microformats.org/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082960">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221082960" class="permalink"><time datetime="2005-11-27T21:37:59">2005-11-27T21:37:59</time></a>
            </div>
            <div class="content"><p>Check out <a href="http://copia.ogbuji.net/blog/" rel="nofollow">Uche Ogbuji</a>'s pertinent posts:</p>

<ol>
<li><a href="http://copia.ogbuji.net/blog/2005-11-14/I_already_" rel="nofollow">I already said OPML is crap, right? I had to hack through another reminder today.</a></li>
<li><a href="http://copia.ogbuji.net/blog/2005-11-15/I_must_be_" rel="nofollow">I must be missing something about XOXO (and maybe microformats in general)</a></li>
<li><a href="http://copia.ogbuji.net/blog/2005-11-16/Does_it_co" rel="nofollow">XOXO versus Atom versus XBEL for Web feed lists?</a></li>
</ol></div>
            
        </li>
    
        <li class="comment" id="comment-221082961">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://oo2contml.sf.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a5d42c1ccacf33c72fd502fe1bb5ffa9&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://oo2contml.sf.net">Adam Lindsay</a>
                </div>
                <a href="#comment-221082961" class="permalink"><time datetime="2005-11-28T11:48:40">2005-11-28T11:48:40</time></a>
            </div>
            <div class="content"><blockquote>
  <p>My aggregator’s OPML export is private data for interchange between my other aggregators.</p>
</blockquote>

<p>See, that's where you've lost me. Regardless of OPML's suckiness (yes, I've gazed on it, first hand), export/import interchange formats are precisely the sort of thing to be open standards. I spent many of the prime years of my life working on MPEG, and that, if anything, was my take-home message. The interchange/glue formats are precisely what need to be scrutinised and kept in public view.</p>

<p>Is OPML good for anything else? Not really. Should it be promoted for all one's outlining needs? Not really. Does XOXO have an easy time of gaining mindshare, considering most people's miniscule outlining needs? Not really.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    