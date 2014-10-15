---
comments_archived: true
date: '2004-12-07T16:37:08-05:00'
excerpt: It seems like the magic Bayesian pixie dust works well for spam-vs-ham
    in my email box, so why shouldn't the magic for interesting-vs-yawn
    work for my aggregator firehose?
layout: post
tags:
- syndication
title: Further musings toward smarter aggregators
wordpress_id: 573
wordpress_slug: further-smart-aggregator-musings
wordpress_url: http://www.decafbad.com/blog/?p=573
---
I'm a complete neophyte when it comes to machine learning, but I'd like to get into learning more about the field in general.  In particular, I'd like to make my news aggregator smarter.  I've [already tried using SpamBayes](http://www.decafbad.com/blog/2003/08/16/bayes_agg_one), but that didn't make me happy.  Whether it was my approach or whether it was that Bayes itself is not suited toward this task, I'm not sure, though I suspect it's a little of both.

It seems like the magic Bayesian pixie dust works well for spam-vs-ham in my email box, so why shouldn't the magic for interesting-vs-yawn work for my aggregator firehose?    Well, here are the issues I'm guessing at:

In the case of spam-vs-ham, you want to classify things into this or that-- that which is kept, and that which is tossed away.  But in the case of items in my aggregator, I want a relative sort order or a score.  I want a fuzzy guess toward my interest with which to inform presentation of items.  Interesting-vs-yawn is more of a continuum than a pair of buckets.

And then, there's the passive gathering of behavioral data from my interactions with the aggregator, because I'm sure as hell not going to click ratings or thumbs-up/down all day.  In spam-vs-ham, I could build up two clean mailboxes for training the categorizer, with one containing all spam and the other all ham.  But, in the case of my aggregator, the only thing I'm tracking are items in which I showed interest by revealing more information or by clicking through.  

So, I can say that a particular pile of items are all interesting.  But, my interest level for the rest of the items received is a complete unknown-- maybe I'm vehemently disinterested in those 50 items, but maybe I just never got around to looking at those other 20 and just let them fall off my date range for display.  Thus, I have a pile of ham, and a pile of undifferentiated unknown.  I'm not bothering to provide any cues as to whether I *don't* like something, because that'd be boring work-- I mean, I *am* disinterested in those items, after all.  So, I'd like to leverage what the system knows from what I care to provide, but not jump to any conclusions about the items in the unknown pile.  There is no spam, only various flavors of ham.

Given all this, then, is there anyone out there who knows more about machine learning than me who could maybe point me toward a better approach or algorithm that fits this profile?
<!--more-->
shortname=further_smart_aggregator_musings

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088785">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.ianbicking.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cc8334869c9d2a9e603017f2da805eb3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.ianbicking.org">Ian Bicking</a>
                </div>
                <a href="#comment-221088785" class="permalink"><time datetime="2004-12-07T17:52:19">2004-12-07T17:52:19</time></a>
            </div>
            <div class="content">There's a package called Reverend out there, which is a Bayesian filter not specialized for spam.  It might be worth looking at.

Also, in training the system should tell you what it thinks you'll think, and then you'll correct it if it's wrong.  Without this you can overtrain, creating a continual positive feedback, where all you want is a corrective feedback.

OTOH, there's rating systems, like (I think) on Amazon.  There they correlate your ratings to  other people's ratings.  There you can usefully rate anything, because determining your correlated users is separate from the rating it actually presents you -- it's not determining your preference, simply your demographic.  Bloglines could do this (and they try a little), but you couldn't in isolation.  Anyway, some ideas.</div>
            
        </li>
    
        <li class="comment" id="comment-221088786">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.eighty-twenty.net/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=12405222b80eca06189b246be2e57ef8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.eighty-twenty.net/blog">Gordon Weakliem</a>
                </div>
                <a href="#comment-221088786" class="permalink"><time datetime="2004-12-08T15:51:15">2004-12-08T15:51:15</time></a>
            </div>
            <div class="content">Have you looked at AmphetaRate (http://amphetarate.sf.net)?  They claim to be using Bayesian training.  I've been using it for about a week, there's a number of things I don't like about it, but it's an interesting system.  It's Perl / PHP, FWIW.</div>
            
        </li>
    
        <li class="comment" id="comment-221088787">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.bloglines.com/blog/BrettMorgan"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0ca579ae75eb35ca5bd7950efaa825f6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.bloglines.com/blog/BrettMorgan">Brett Morgan</a>
                </div>
                <a href="#comment-221088787" class="permalink"><time datetime="2004-12-13T01:11:42">2004-12-13T01:11:42</time></a>
            </div>
            <div class="content">Where to start. Hmmm. The problems with bayes spam/ham sorting for news readers is down to the simplistic stats. The most simplistic statistical measure to take is on individual words.

For normal email spam/ham there are (or moreover, were) words that stood out as good/bad markers. But in something like an rss feed where you have already selected feeds that are reasonably close to your interest set, the individual words are no longer useful for sorting interesting vs yawn. 

As you can probably tell, I had a go at doing this for an AI course I did last semester, and I wound up with a furball that didn't actually fly. I used python and wxpy to build an aggregator around an IE control with good/bad buttons for marking, my word distributions didn't wind up correlating. 

Is your aggregator open for hacking? I have a few theories that I'd like to testbed, and now owning a mac, my old code is nigh on useless :-)</div>
            
        </li>
    
        <li class="comment" id="comment-221088788">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.srijith.net/trinetre/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=71daea6c5696489ec1f7dd8efa55e2f2&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.srijith.net/trinetre/">Srijith</a>
                </div>
                <a href="#comment-221088788" class="permalink"><time datetime="2004-12-13T11:00:05">2004-12-13T11:00:05</time></a>
            </div>
            <div class="content">Machine learning is not within my list of "do-know-something" areas, but I could suggest a bit of commensense logic to the system to learn from uninterested items. The fact that an item is uninteresting is denoted by the propertiy that you have not clicked on it. While one may not be able to deduce much pattern from a single item as such, it could be used to deduce useful information about the metadata associated with the item. For example, I found that I was reading less and less of items from blogger X's feed. There were days at a stretch where I would not find anything written by X interesting enough. If a cron job was run that could look through the last time I read any of X's item, it could have noticed this trend and thus lowered X's score, thus pushing his item below my "casual-glance-view". While doing this alone would cause one to miss a very interesting item  that X could write in a blue moon, if one uses other metadata associated with the feed item (like keyworkds etc.), it could be brought within my "casual-glance-view".

Intellie-Aggie tries to use these logics to filter out items, but I have left the codes untouched for far too long to expect any wonders.</div>
            
        </li>
    
        <li class="comment" id="comment-221088789">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.drunkenblog.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=383b6331d8326615511cff5c243873fa&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.drunkenblog.com">drunkenbatman</a>
                </div>
                <a href="#comment-221088789" class="permalink"><time datetime="2004-12-13T16:40:49">2004-12-13T16:40:49</time></a>
            </div>
            <div class="content">I'm hoping that aggregators will get smarter too, because due to the info-glut RSS enables the computer is just going to have to get smarter about having a guess as to what we're going to be interested in.</div>
            
        </li>
    
        <li class="comment" id="comment-221088790">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.oshineye.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=199f0940163b371d85d1b18510e1d53d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.oshineye.com">ade</a>
                </div>
                <a href="#comment-221088790" class="permalink"><time datetime="2004-12-28T17:27:18">2004-12-28T17:27:18</time></a>
            </div>
            <div class="content">Take a look at my Aggrevator: http://www.oshineye.com/software/aggrevator.html
which uses scoring to enable users to deal with very large numbers of feeds. I went with this approach after running into re-calculation problems with using Bayesian analysis for ranking entries: http://www.advogato.org/person/ade/diary.html?start=11</div>
            
        </li>
    
        </ul>
    
        </div>
    