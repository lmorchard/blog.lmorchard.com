---
comments_archived: true
date: '2004-06-14T18:54:55-04:00'
excerpt: Where's the state-of-the-art for feed aggregators, and what's next?  I'm
    tired of reverse-chronological versus three-pane; I'm tired of copying
    Usenet and email.  What needs to happen next to expand our Info Freako
    capacity by an order of magnitude or two?  The invention of aggregators
    has opened the door to the first few orders, but I need more.
layout: post
tags:
- syndication
title: Info Freako, or who's already past arguing about syndication formats?
wordpress_id: 528
wordpress_slug: info-freako-or-whos-already-past-arguing-about-syndication-formats
wordpress_url: http://www.decafbad.com/blog/?p=528
---
> You know that sleep is getting hard to get<br />
> 'Cause you never know what you'll forget<br />
> And I've got to know of all the news<br />
> 'Cause one day there'll be news for me<br />
> <br />
> I never let a headline by<br />
> 'Cause every one will catch my eye<br />
> And though it's tough to keep alert<br />
> You never know what could hurt me<br />

<div class="credit" align="right"><small>Source: <cite><a href=
"http://www.jesusjonesarchive.com/lyrics.htm#Info%20Freako">Jesus Jones, "Info Freako"</a></cite></small></div>

The Syndications Wars are over--at least, as far as I'm concerned.  

It's hard to resist [jumping in][jumping in] where I think someone's got it wrong or when my fingers compel me to feed trolls, but resisting that impulse is what needs to be done.  At this point, all that seems to happen is that the same old threads get recycled.  No one's got anything new to bring, except maybe ad hominem grousing or possibly a Yo Mama joke (though I've yet to see that particular innovation).  Anyone who cares can do a bit of Googling to catch up on the story.

The fact is, I no longer care about RSS versus Atom versus $foo.  Mark Pilgrim enables me to do so with his [feed parser][feedparser], and most other aggregators I might care about have also implemented support for both Atom and RSS.  And if they don't, I can [route around the damage][rss colored glasses] just like I do when I [scrape sites][scrape sites] devoid of any feeds.

While I do prefer Atom over RSS, almost a year later I still say [the magic is in syndication, not the format][syndication magic].  I'll let the tag-level grumblers foam on without comment and just thank them for their work when a good new spec  bubbles up or when something fun and useful comes out.  I'm circling that whole area of concern and sticking a post-it on it that reads: *RSS and Atom both useful, neither perfect, neither going away.*

Whew.  That's a weight off my brain.  Now what is there left to talk about?

Well, how about let's talk some more about what to do with the items we get, once we *do* manage to parse a feed?  (Sheesh, you mean we're not already fighting over that topic?)  

[Rogers Cadenhead wants gluttonous RSS feeders][cadenhead]:

> With thousands of information sources producing RSS and Atom feeds, we need people like Thauvin [whose linkblog is [here][thauvin]] who have integrated weblogging into their daily news-gathering routine. Weblog links are like ant trails -- a lot of people have to link to something good in order to get noticed.

I self-identify as such, since my feed list has topped 550 in count.  But I'm happily surprised to find that I'm not even in the [top 10 of prolific subscribers][prolific subs]--at least I'm not the biggest Info Freako.  (Yet.)  

I'm adding between 2-3 feeds to my list daily, so I can see myself approaching 1000 eventually.  But I'm starting to hesitate at adding one more feed now.  Even with my current streamlined multi-pass skimming process, I'm starting to see diminishing returns.  I breeze past screen loads of chaff that I'll never view, but it still bogs me down.  I can only think that people with twice the subscriptions as I either have more free time, or have a better mousetrap.

The usual response I get toward my subscriptions is, "Why don't you cut that list down to about 100 essentials?"  And even that's said with a smirk, usually by someone with under 50 subscriptions and usually by someone who's not as obsessive an [Info Freako][info freako] as I am.  Thing is, though, good stuff has at one point or another shown up on each and every feed I monitor.  I want to figure out how to scale *up* from 1 to 10 to 100 to 1000 to 10000 sources and beyond.

(Singing interlude: "Info Freako / There is no end to what I want to know")

Besides, this is an area where I can tinker with and learn about another area I'm interested in: machine intelligence and intelligence amplification.  Rogers says, "I want a Bayesian filter that can guess which new headlines I'm most likely to read"  Though someone else might apply Bayes in a way that works for them, I didn't find [my experiments with SpamBayes][bayes] very satisfying.  I suspect it has something to do with the fact that SpamBayes is geared toward sorting out a quasi-binary world of spam-versus-ham, while I'm interested in a spectrum between must-read and shrugs.

But, the idea of introducing another pass through items at the head of the process, this one partially or completely automated, has great appeal.  Done right, this could be the bit that adds an order of magnitude to my capacity to monitor feeds.  I need to investigate other machine learning approaches.

The idea is that, while I freakishly want to catch as much info as possible, I can only handle so much in a day.  For certain, I can't handle everything that might be interesting to me, so I need some prioritization and some pre-filtering before my attention gets applied to the flow.

The way I picture this is trying to apply a sort of [inverted pyramid][inverted pyramid] approach to the incoming flow of items.

I started with a few primitive tools in [AmphetaOutlines' adaptivity to reading patterns][amphetaoutlines], limited mostly to just sorting channels by a count of items read historically.  I also introduced some information hiding and exploration aspects:  I tried to hide or de-emphasize older items by use of font size and weight; and I put items into a JavaScript-driven outline where item descriptions and more ancient items could be hidden or revealed via disclosure triangle.

In my [latest attempt][dbagg2], I've not yet implemented any adaptive sorting, but I've kept and improved the outline display (see: [screenshot #1][dbagg2 screen1], [screenshot #2][dbagg2 screen2]).  Also, I can now mark items as seen and/or flag them to be viewed in a queue for later.  I've got some lame SpamBayes integration in there, but I've let it atrophy in daily use due to a complete lack of usefulness.

I'm starting to think about next steps now toward a more advanced aggregator.  I've still got my [wishlist][wishlist] for AmphetaOutlines, and I've actually covered quite a few of the items with this new aggregator.  But, I'm thinking things like the following would be useful to pursue:

* **What do you think is more important?**  Do you value one group of feeds over another?  Personally, I want to see every single web comic that appears in my queue, most items from [Engadget][engadget] and [Boing Boing][boing boing], and maybe only a few from some of the firehoses I've hooked myself up to.  Also, there are [some][blogger1] [bloggers][blogger2] who post somewhat infrequently, but I don't want to miss a thing when they *do* post.  I need to be able to group and prioritize manually.

* **What do you *demonstrate* as important?**  Which feeds' items receive more of your attention, and within those feeds, what topics and phrases appear most frequently?  The machine should be able to make some observations about your history of behavior and give some input into the organization of items presented.  Also, it should give me some way to give feedback to its recommendations with a simple and lazy thumbs up and thumbs down.

* **Republishing of interesting items to a linkblog is a must.**  On the flip-side, it would be nice to somehow pull in others' linkblogs in a more meaningful way than simply watching their feeds.  I should be able to triangulate some things and get some recommendations based on mutual links predicting future interest in items.  We need to start chasing ant trails unconsciously and automatically.

* **Time-limited subscriptions which expire after a set time, or request renewal from the user.**  Use these to track comment threads which offer RSS feeds.  (Like [this one][comment feed].)

* **More statistics and health monitoring of subscriptions.**  How active are your feeds?  Which are dead &#38; gone, or merely just in hiatus?  Have any moved?

Now, I haven't done any sort of comprehensive survey of the aggregator landscape in a long time, so I'd be very intrigued if any existing software implements these sorts of things.  I've seen some progress toward monitoring feed health, but I've seen next to nothing toward automatic filtering of items and recommendations based on past behavior.  I have seen manually constructed filters, but I'm too lazy to try to figure out how to tell the computer what I want.   I want the machine to ride shotgun, watch and learn.

<a href="http://www.johnny-five.com/"><img src="http://www.johnny-five.com/simplenet/Shortcircuit/Pics/Pictures/Misc/jfive.gif" align="right" alt="Need more input!" hspace="10" /></a> Where's the state-of-the-art for feed aggregators, and what's next?  I'm tired of reverse-chronological versus three-pane; I'm tired of copying Usenet and email.  What needs to happen next to expand our Info Freako capacity by an order of magnitude or two?  The invention of aggregators has opened the door to the first few orders, but I need more.   

Exit singing (while twitching for more info):

> Info Freako, <br />
> There is no end to what I want to know <br />
> <br />
> But it means I'll have the edge over you<br />
> And it means I'll always have the edge over you<br />
> And you know there's nothing that you can do<br />

[jumping in]: http://www.reactuate.com/index.php?itemid=682
[blogger1]: http://interconnected.org/home/
[blogger2]: http://www.ecyrd.com/ButtUgly/Wiki.jsp?page=Main_blogentry_130604_1
[engadget]: http://www.engadget.com/
[boing boing]: http://boingboing.net/
[inverted pyramid]: http://mtsu32.mtsu.edu:11178/171/pyramid.htm
[comment feed]: http://www.pycs.net/system/comments.py?u=0000001&#38;p=1802&#38;format=rss
[wishlist]: http://www.decafbad.com/twiki/bin/view/Main/AmphetaOutlinesWishList
[dbagg2 screen1]: http://www.decafbad.com/2004/06/dbagg2a.jpg
[dbagg2 screen2]: http://www.decafbad.com/2004/06/dbagg2b.jpg
[dbagg2]: http://www.decafbad.com/cvs/dbagg2
[amphetaoutlines]: http://www.decafbad.com/blog/2002/08/05/ooobbf
[bayes]: http://www.decafbad.com/blog/2003/08/16/bayes_agg_one
[info freako]: http://www.jesusjonesarchive.com/lyrics.htm#Info%20Freako "Jesus Jones lyrics"
[thauvin]: http://www.thauvin.net/linkblog/
[prolific subs]: http://feeds.scripting.com/prolificSubscribers
[cadenhead]: http://www.cadenhead.org/workbench/2004/06/10.html#a1802
[syndication magic]: http://www.decafbad.com/blog/2003/07/07/syndications_formats
[scrape sites]: http://www.decafbad.com/twiki/bin/view/Main/XslScraper
[rss colored glasses]: http://www.decafbad.com/blog/2004/05/03/put_on_your_rsscolored_glasses_and_forget_about_atom
[feedparser]: http://diveintomark.org/projects/feed_parser/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086587">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.majid.info/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8c5548eb0b2b80924f237953392df5e7&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.majid.info/">Fazal Majid</a>
                </div>
                <a href="#comment-221086587" class="permalink"><time datetime="2004-06-14T21:52:14">2004-06-14T21:52:14</time></a>
            </div>
            <div class="content">I am trying to do this with my own home-made aggregator (www.temboz.com).

I have serious doubts about software that could automatically determine whether an article is interesting or not, and would settle for a way to suppress duplicates as a meme propagates through the blogosphere, e.g. by finding posts that link to the same URLs.

I did implement a simplistic kill-file style filtering system, that works reasonably well, no false positives and 204 out of 1701 items in the last 7 days caught.</div>
            
        </li>
    
        <li class="comment" id="comment-221086588">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://wurldbook.blogspot.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=994697b1f98037fb294ca1679209aaa8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://wurldbook.blogspot.com">Olav</a>
                </div>
                <a href="#comment-221086588" class="permalink"><time datetime="2004-06-14T22:25:55">2004-06-14T22:25:55</time></a>
            </div>
            <div class="content">Anyone who subscribes to so many feeds has a mental illness. Like some kind of obsessive compulsive disorder. I bet they record all the channels on T.V. in case they miss something. I bet they don't throw away any newspapers either. I subscribe to about 144 feeds but that is only because I am testing an app. Most of it is garbage.</div>
            
        </li>
    
        <li class="comment" id="comment-221086590">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blogory.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8b702a775f458d5c2cf53f1021cb3ac6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blogory.com">Greg Linden</a>
                </div>
                <a href="#comment-221086590" class="permalink"><time datetime="2004-06-14T22:49:58">2004-06-14T22:49:58</time></a>
            </div>
            <div class="content">You might check out Findory Blogory (http://blogory.com).  It's a personalized weblog reader that learns from the weblog articles you read and recommends other articles that appear to match your interests.

It's not a Bayesean filter like SpamBayes, but it does "guess which new headlines you're most likely to read."  It is "automatic filtering of items and recommendations based on past behavior."  You don't have to manually construct filters or "tell the computer what you want."  Findory Blogory will "ride shotgun, watch and learn."

Take a look.  I'd love to hear your thoughts.</div>
            
        </li>
    
        <li class="comment" id="comment-221086592">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8a5273f79cfe7579ad46023f93377aa8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/blog/">l.m.orchard</a>
                </div>
                <a href="#comment-221086592" class="permalink"><time datetime="2004-06-14T23:03:38">2004-06-14T23:03:38</time></a>
            </div>
            <div class="content">Olav: See, for me, it isn't so much a compulsion as a challenge.  I don't read through my aggregator all day - I spend about an hour per day at lunch and maybe another at home skimming through items and maybe another hour or so reading longer stories.  

This isn't handwashing OCD behavior here - I don't read or even linger on more than a small fraction of what ends up on the screen.  It's a lot of quick glancing, page-down, and mass delete.  It's pretty much as much time as I used to spend just between a half-dozen sites like slashdot.org and cnet.com, only now my sources are so much more varied.

The challenge is that wanting to squeeze more coverage of more sources into my daily browsing has me wanting to learn more about certain technologies.  That, and just dealing with more volumes of data is kinda fun in a geeky sort of way.

And, no, I don't record all the channels on the TV.  Besides watching 1 or 2 shows, and playing a few video games, this is what I do instead of sitting in front of the tube.</div>
            
        </li>
    
        <li class="comment" id="comment-221086593">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.reactuate.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=43e4a9fa1d0e5d52a6979ddad94bc483&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.reactuate.com/">Ron</a>
                </div>
                <a href="#comment-221086593" class="permalink"><time datetime="2004-06-16T19:52:44">2004-06-16T19:52:44</time></a>
            </div>
            <div class="content">When I wrote that story I wasn't expecting people to jump into a fight about RSS vs Atom. Should have known better. I just didn't like the original story and wanted to rant about it.

Oh well you learn something new everyday.</div>
            
        </li>
    
        <li class="comment" id="comment-221086594">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.ianbicking.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cc8334869c9d2a9e603017f2da805eb3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.ianbicking.org">Ian Bicking</a>
                </div>
                <a href="#comment-221086594" class="permalink"><time datetime="2004-06-17T00:36:51">2004-06-17T00:36:51</time></a>
            </div>
            <div class="content">You might want to look at Reverend: http://www.divmod.org/Home/Projects/Reverend/

It's a general-purpose Bayesian classifier.</div>
            
        </li>
    
        <li class="comment" id="comment-221086595">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://quillio.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b228325c24751d6a33a893fb8116d32f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://quillio.com/">Lou Quillio</a>
                </div>
                <a href="#comment-221086595" class="permalink"><time datetime="2004-06-17T05:01:13">2004-06-17T05:01:13</time></a>
            </div>
            <div class="content">There&#8217;s what we&#8217;d like to scan and what we&#8217;d like to read, yes?  Moving content to the must-read front burner will always be deliberate, but improving the content we scan can probably be improved mechanically.  I doubt Brother Orchard thinks there&#8217;s an algorithm for the A-list.  We&#8217;re just talking about making more productive use of the proximate cloud.

Scenario #1:  You Google for topics of interest.  The hits returned can&#8217;t be reliably filtered by creation date, and they consider (in general) the entire indexed Web.  It&#8217;s a good thing, if scatter-shot.  Queries can only be refined so much.

Scenario #2:  You amass and manage a list of syndicated feeds in which you have a passing interest.  The feed content is indexed (Bloglines does this; Google does or will, too).  You can query this universe discretely, using Google-like devices and maybe a few new ones.

What&#8217;s different about these two?

In #2, you selected (and casually manage) the universe.  Its chunks &#8212; though perhaps truncated or paraphrased by the author &#8212; are reliably date-stamped.  A free-text query of such data would be very different from an identical Google query.

Add a few more discriminators and it gets better.  Suppose you could discriminate by


1. Paragraph length.  That might get you recent topical hits of terse or essay length, as you choose.

2. Link-text density.  Filter in or out those link-collection posts.

3. Query-term density or semantic weight.  Is the topic being addressed directly or simply mentioned?

4. Item weight or image density.  Helps filter noisy or glitzy corporate feeds (think Ziff-Davis).

There are plenty more.

The main differences, though, are date discrimination and the pre-filter of a confined universe.  Me, I&#8217;m down to thirty feeds and ignore half of those.  Better tools might change that.

LQ</div>
            
        </li>
    
        <li class="comment" id="comment-221086596">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://advogato.org/person/mbrubeck/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=85232f8499fd6ee91623408fc23835d1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://advogato.org/person/mbrubeck/">Matt Brubeck</a>
                </div>
                <a href="#comment-221086596" class="permalink"><time datetime="2004-06-19T21:06:49">2004-06-19T21:06:49</time></a>
            </div>
            <div class="content">I love the picture.  Need input!</div>
            
        </li>
    
        </ul>
    
        </div>
    