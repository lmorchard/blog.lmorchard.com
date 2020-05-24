---
comments_archived: true
date: '2007-01-02T16:37:48-05:00'
layout: post
tags:
- metablogging
- webdev
- aggregators
- rss
- software
- osx
title: Vienna is now my weapon of choice for feeds
wordpress_id: 1031
wordpress_slug: vienna-is-now-my-weapon-of-choice-for-feeds
wordpress_url: http://decafbad.com/blog/2007/01/02/vienna-is-now-my-weapon-of-choice-for-feeds
---
In the last few days, I've switched news aggregators again - this time to [Vienna][].

I've got a [long][l1], [long][l2], [long][l3] [history][l4] of doing this - partially because of my [serial enthusiasm][se], and partially because none of the aggregators I've used so far have satisfied all of my itches.  Some tie up my laptop in terms of memory and CPU, some aren't fast enough UI-wise to help me really blaze through skimming, and some aren't flexible enough for me to tweak to my particular liking.

At this point, though, [Vienna][] comes really close to what I've been wanting for years.  It's open source ([check it out!][vsvn]); uses WebKit to offer a [theme-able][vt] feed item display ([hello Colloquy!][wk]); and uses SQLite 3 for persistence ([with schema documentation!][vdb]).  Out of the box, it's a pretty nice app, but it was even nicer when I started poking under the hood.  I've even [submitted my first small patch][vpatch], which got accepted into the codebase.

When last I tried [Vienna][], it was on my poor old PowerBook G4 12" 867Mhz and it was a somewhat rough and bad tasting experience.  At the time, [NetNewsWire][] was my tool of choice, and [Vienna][] was lacking some features - like, say, a user-sortable list of subscription folders and feeds.  It also thrashed a lot and generally made me Force Quit it and move on.  But now, on my new-ish MacBook Pro, the performance is stellar with my set of 500+ feeds and my few showstopper missing features are no longer missing.  

Now, it seems like [NetNewsWire][] is the app that thrashes for me and gets a Force Quit.  I need to try [NNW][NetNewsWire] a bit more and figure out if it's just my initial import of subscriptions that drags things down - but [Vienna][]'s got me now.  It's catching up mightily fast with the feature list of NNW.  And, nothing beats open source software for tossing in a few tweaks to things that are just *not quite* doing what I'd like.

Again, since I'm a [serial enthusiast][se], I have no idea if I'll be a regular contributor of patches to [Vienna][] or even offer any commitment to the project - but I'm definitely happy with it at the moment.

[vpatch]: http://sourceforge.net/mailarchive/forum.php?thread_id=31310885&forum_id=48723
[vt]: http://www.opencommunity.co.uk/vienna_styles.php
[vsvn]: http://vienna-rss.svn.sourceforge.net/svnroot/vienna-rss/trunk/2.1.0/
[vdb]: http://vienna-rss.sourceforge.net/public/DatabaseSchema.pdf
[wk]: http://decafbad.com/blog/2004/02/12/colloquy-irc
[Vienna]: http://www.opencommunity.co.uk/vienna2.php
[NetNewsWire]: http://www.newsgator.com/NGOLProduct.aspx?ProdID=NetNewsWire
[l1]: http://decafbad.com/blog/2006/08/18/good-gregarius
[l2]: http://decafbad.com/blog/2006/02/12/further-work-on-decafbadnewsriver
[l3]: http://decafbad.com/blog/2005/10/05/feedspool-is-progressing-nicely
[l4]: http://decafbad.com/blog/2004/08/05/introducing-dbagg3-an-atom-powered-clientserver-aggregator
[se]: http://decafbad.com/blog/2006/05/26/confessions-of-a-serial-enthusiast

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085597">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://decafbad.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=ab21890e84fd31ff0d651d77bc82d118&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://decafbad.net">Craig</a>
                </div>
                <a href="#comment-221085597" class="permalink"><time datetime="2007-01-02T22:20:49">2007-01-02T22:20:49</time></a>
            </div>
            <div class="content"><p>Not sure if you care much for web-based aggregators, but ReBlog is my current favorite. I prefer the web-based aggregators because it allows me to have the same feed list between home and work... er, I mean my other home. 
http://www.reblog.org/
Hope this helps!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085598">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://monkey.org/~jose/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e89957a6d99c3951e3944fff6fa94cda&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://monkey.org/~jose/">jose</a>
                </div>
                <a href="#comment-221085598" class="permalink"><time datetime="2007-01-03T01:36:43">2007-01-03T01:36:43</time></a>
            </div>
            <div class="content"><p>hi les</p>

<p>i had used vienna before, it has more features than NNW that i like (IIRC it had flagging etc), but it had just lousy performance. it consumed gobs of memory and CPU and invariably fell apart under my feed load (over 100 feeds). </p>

<p>i've tried probably a half dozen RSS readers on the Mac and they all stink. i miss RSS Bandit for Windows, which had all of the features i like but sadly runs on windows (which i don't use routinely). :-/</p>

<p>hope all is well.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085600">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221085600" class="permalink"><time datetime="2007-01-03T03:54:01">2007-01-03T03:54:01</time></a>
            </div>
            <div class="content"><p>@Craig:  I have tried using BlogLines and then Gregarius...  ReBlog i've used before, too, but actually as a sort of newsdesk for a team at work - they skimmed through news stories and flagged items for republishing, which our CMS then plucked out of the outgoing ReBlog RSS feed.  Nice aggregator.  But, for me, nothing beats a desktop aggregator for swift skimming speed.  For what it's worth, the Vienna team is working on BlogLines integration.</p>

<p>@jose: Not sure when you tried Vienna last - it seems to have improved markedly, though that might just be my mileage with the MacBook Pro now.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085601">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://mike.teczno.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e3b46099c3fd3844c4539b27f143fd97&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://mike.teczno.com">Michal Migurski</a>
                </div>
                <a href="#comment-221085601" class="permalink"><time datetime="2007-01-03T08:17:14">2007-01-03T08:17:14</time></a>
            </div>
            <div class="content"><p>I almost feel bad for wanting to switch. =)</p>

<p>Vienna is <em>really good</em>.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085602">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://brian.cors.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7b3073e125f3ac8f09130950ef5d7790&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://brian.cors.org">brian cors</a>
                </div>
                <a href="#comment-221085602" class="permalink"><time datetime="2007-01-03T16:45:29">2007-01-03T16:45:29</time></a>
            </div>
            <div class="content"><p>I checked out Vienna today a bit, and it's mucho nice.</p>

<p>However, the one thing that I use the most on NNW is the ability to sync to NewsGator.  I use that on my cell to read feeds when I am out and about, and not at the desk.  And that setup is particularly nice because it syncs history between NewsGator and NNW, so I dont end up reading things again that I have already read.</p>

<p>I'll definitely look at this as a freeware feed aggregator to use at work though, on our workstations.  I need to get a decent, easy to use one for people here to learn about RSS.  This might be the ticket.  Thanks for pointing it out!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085603">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://yendi.livejournal.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8fd5f20d94b45e9392dc1d9264e641df&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://yendi.livejournal.com">Adam Lipkin</a>
                </div>
                <a href="#comment-221085603" class="permalink"><time datetime="2007-01-03T23:35:34">2007-01-03T23:35:34</time></a>
            </div>
            <div class="content"><p>I've been a complete Google Reader addict for the last two months (although I also suffer from Serial Enthusiasm). It seems to toe the line nicely between web-based reader and true app, and combined with Firefox 2.0's nice handling of tabs and links (closing an article I head to from Google Read will pop me back to the Reader tab), it's integrated pretty seamlessly into my browsing.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085605">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://runmystic.jankowskis.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4e69f0a0b3908b8681b1e1b0e05ae067&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://runmystic.jankowskis.net">jank</a>
                </div>
                <a href="#comment-221085605" class="permalink"><time datetime="2007-01-08T21:57:02">2007-01-08T21:57:02</time></a>
            </div>
            <div class="content"><p>I'm checking out Vienna, too, but, like Brian, having the ability to sync with a non-mac client (preferably a web-based one) is the biggest thing that NNW has going for it.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085607">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221085607" class="permalink"><time datetime="2007-01-08T22:42:53">2007-01-08T22:42:53</time></a>
            </div>
            <div class="content"><p>Ironically, I've never spent much time with an aggregator that syncs with any other client - web-based or not.  So, that's a feature of NNW I've never really appreciated or had much use for.  I tend to have a laptop with me at all times, so my aggregator tends to go with me.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085608">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.aa3xyz2g.info"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5e2898db630df4353fae47a90f35add5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.aa3xyz2g.info">Peter Miller</a>
                </div>
                <a href="#comment-221085608" class="permalink"><time datetime="2007-01-11T08:24:55">2007-01-11T08:24:55</time></a>
            </div>
            <div class="content"><p>Thanks for opening my eyes to Vienna. I was using Bloglines for the longest time and never knew what I was missing!</p></div>
            
        </li>
    
        </ul>
    
        </div>
    