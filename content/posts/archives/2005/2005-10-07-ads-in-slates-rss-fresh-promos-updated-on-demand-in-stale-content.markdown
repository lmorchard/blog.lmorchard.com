---
comments_archived: true
date: '2005-10-07T10:42:38-04:00'
layout: post
tags:
- asides
title: 'Ads in Slate''s RSS: Fresh promos, updated on demand in stale content'
wordpress_id: 722
wordpress_slug: ads-in-slates-rss-fresh-promos-updated-on-demand-in-stale-content
wordpress_url: http://decafbad.com/blog/?p=722
---
Damn you, Slate.  I'm really starting to get annoyed with various sites' implementation of advertising in feeds.  Yes, [I'm looking at *you* too, Boing Boing][bb].  

The one upside to the ads in Boing Boing's feed, so far anyway, is that at least they don't change from poll-to-poll.  So, although I get a face full of the ads repeated down my aggregator page, at least I only see them each once.

With [Slate's feed][sl], on the other hand, entries I've already fetched change on every poll to the feed because they randomly rotate through and generate new ads every time I request the feed.  So, in effect, nearly every entry in the feed ends up being "updated" when I request it.

**This sucks.  Please stop.  Stop now.  Feed entries are not the same as web pages.**

Of course, part of this has to do with [FeedSpool][fs]'s approach to tracking whether an entry is new or has changed.  That is, it takes an MD5 hash of the entry's XML source and uses that as a unique ID.  Yes, this is lazy.  But it's worked for me for a few years now in my other aggregators.

What I really should be doing in [miniagg][ma] is watching the unique IDs on entries to determine freshness, when they're available.  Which, thankfully, they are in Slate's feed.  In other feeds, well, I'm not always so lucky, which is how the MD5 technique came about in the first place.

Nothing's ever nice & easy, is it?  :)

[bb]: http://archive.scripting.com/2005/09/20#whenRssIsntVeryGreat
[fs]: http://decafbad.com/trac/wiki/FeedSpool
[ma]: http://decafbad.com/trac/browser/trunk/feedspool/plugins/miniagg
[sl]: http://slate.msn.com/rss/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090418">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://laughingmeme.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=01457d1a0f0e533062cd0d1033fb4d7a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://laughingmeme.org">kellan</a>
                </div>
                <a href="#comment-221090418" class="permalink"><time datetime="2005-10-07T15:07:23">2005-10-07T15:07:23</time></a>
            </div>
            <div class="content"><p>As I'm sure you know, the hashing the content is <em>the</em> industry standard approach to tracking changes in feeds, because a huge percentage of feeds don't deliver valid unique ids and updated times.  Hashing is the only thing that works.</p>

<p>I suppose you could support a suite of algorithms, and choose between them on a feed by feed basis, but ick.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090419">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://george.hotelling.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c7d1c8d2b1a7643236a4661e9a974dee&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://george.hotelling.net/">George Hotelling</a>
                </div>
                <a href="#comment-221090419" class="permalink"><time datetime="2005-10-07T15:10:39">2005-10-07T15:10:39</time></a>
            </div>
            <div class="content"><p>Bloglines has a boolean option per-subscription that allows you to mark whether changed entries should be marked as new.  Default is on, but some feeds benefit greatly from this; such as <a href="http://alterslash.org/" rel="nofollow">Alterslash</a> and, I imagine, Slate.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090420">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://mikedewolfe.blogspot.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=3bc73a87d36e0a2debbce9e122daf8ff&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://mikedewolfe.blogspot.com">Mike DeWolfe</a>
                </div>
                <a href="#comment-221090420" class="permalink"><time datetime="2005-10-11T20:04:05">2005-10-11T20:04:05</time></a>
            </div>
            <div class="content"><p>True: feeds are supposed to be feeds of information and not mixed with ads. But, it's their sandbox. If you pick up someone's feed, you have to either play by their rules or play somewhere else. For people who use feeds in their aggregation client, this is regrettable, because they are using RSS feeds as a replacement for news sites and traditional media. When RSS feeds are used to fuel the content of other sites, it's a case of Scraper Beware. Before, site creators would have to manually pull together links from other sites and add that content to their own site. RSS feeds allow them to save a lot of time and effort. They will have to adopt to a WSE tool to load in feeds and keep them in a holding pattern; then purposefully allow or bar content, creating a release lag. Maybe the objectionability of ads will spur feed users to be more selective instead of bombarding us with everyone that someone else saw fit to add to an RSS feed.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    