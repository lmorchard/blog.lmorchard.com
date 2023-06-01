---
comments_archived: true
date: '2010-07-05T19:00:56-04:00'
layout: post
tags:
- webdev
- firefox
- google
- python
- entries
- mozilla
- sync
- appengine
title: Firefox Sync server on Google App Engine
wordpress_id: 1937
wordpress_slug: firefox-sync-server-on-google-app-engine
wordpress_url: http://decafbad.com/blog/?p=1937
---
<em><strong>TL;DR:</strong> [I built an implementation][impl] of the [Firefox Sync server API][api10] for [Google App Engine][appengine].</em>

[impl]: http://github.com/lmorchard/firefox-sync-appengine
[api10]: https://wiki.mozilla.org/Labs/Weave/Sync/1.0/API
[appengine]: http://appengine.google.com/

<a href="http://www.mozilla.com/en-US/firefox/sync/" style="float: right; padding: 0 0 0em 0em; display: block; text-decoration: none; border: none"><img src="http://mozcom-cdn.mozilla.net/img/firefox/sync/sync-background.png" style="border: none" /></a>

To celebrate [Independence Day][july4], I figured I might take a shot at liberating [Firefox Sync][sync] from the tyranny of [Mozilla's servers][servers]. 

Thus, over the past few days, I've [built a sync server][impl] using the [1.0 Sync API][api10], hosted on [Google App Engine][appengine].

I lied about the *tyranny* thing, though—I just wanted to say something clever about the holiday. In reality, with respect to [Firefox Sync][sync], Mozilla has done all of the following:

1. Published [the Sync API spec][api10];
2. Released [the source code for the server used in-house][sync-server];
3. Explicitly included the option to use a custom server when setting up sync in the browser.

This means that, although Mozilla offers servers to go along with [Firefox Sync][sync], you're totally free to take your data elsewhere. Since your sync data is encrypted and practically opaque to the server, there's no direct profit for Mozilla in offering free sync hosting—not even through any clandestine data mining for devious purposes. It's just that sync makes Firefox a better browser, and *somebody* has to run some servers to make it work.

So, there's every incentive to make it easy for you to switch sync providers and *stop freeloading* on Mozilla's servers. Building a server on [Google App Engine][appengine] means I can freeload on *Google's* servers!

I kid, of course. No one's really complaining about freeloaders, and App Engine has quotas in place to head off any serious mooching—which is why I'm not telling you where to find *my* sync server deployed on Google App Engine, by the way. 

No, I did this because:

* Firefox Sync and Google App Engine are interesting and important technologies;
* I've already done a bit of work on the PHP-based Firefox Sync server at Mozilla;
* I really wanted to take a break from PHP and spend some time with my old friend Python.

There are, of course, a number of bugs in this server. But, it seems to be working between a number of machines and browser profiles I have at home. Things are really in need of optimization, it suffers from my inexperience with App Engine, and I keep running into those aforementioned App Engine resource limits—especially when updating or deleting large numbers of items (ie. 1000's to 10000's of items).

[*Pull requests and issue reports on GitHub are welcome!*][impl]

A next step I'd like to take with this thing is to revisit another old friend, the [desktop web app server][desktopserver]. (Also known as the [desktop website][dw].) It seems to me that it would be interesting to scale this server down to a household appliance—say, just for use by my wife and I.

I'd be especially happy if the work I'm doing for a Google-hosted app could be self-hosted at home. Seeing as the development environment for App Engine runs on my laptop, I'm willing to bet I can hack the whole shebang into a simple, special-purpose app to download and double-click on a home desktop PC for use as your sync hub.

Anyway, [check it out][impl] and let me know what you think.

[dw]: http://www.scripting.com/davenet/2001/01/04/desktopWebsites.html#4
[dave]: http://www.scripting.com/davenet/1997/09/14/FractionalHorsepowerHTTPSe.html
[desktopserver]: http://www.decafbad.com/twiki/bin/view/Main/DesktopWebAppServer
[sync-server]: http://hg.mozilla.org/services/sync-server/
[july4]: http://en.wikipedia.org/wiki/Independence_Day_%28United_States%29
[sync]: http://www.mozilla.com/en-US/firefox/sync/
[servers]: https://services.mozilla.com/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088097">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://coffeeonthekeyboard.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8371744716a9335eb3dcae228fd9d996&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://coffeeonthekeyboard.com/">James Socol</a>
                </div>
                <a href="#comment-221088097" class="permalink"><time datetime="2010-07-06T01:28:02">2010-07-06T01:28:02</time></a>
            </div>
            <div class="content"><p>Assuming you already had a network and a Mac Mini or something at home, it would be pretty interesting to run your own small Sync server just to keep your home computers together. Maybe even use localtunnel for when you're away.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088102">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://morgamic.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=65b020128dafcdb4ef1e5e53c00ed37a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://morgamic.com/">Mike</a>
                </div>
                <a href="#comment-221088102" class="permalink"><time datetime="2010-07-06T01:36:37">2010-07-06T01:36:37</time></a>
            </div>
            <div class="content"><p>You are a real-life hero!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088105">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221088105" class="permalink"><time datetime="2010-07-06T01:52:00">2010-07-06T01:52:00</time></a>
            </div>
            <div class="content"><p>@James: Yup, exactly that. Maybe even roll in some SSL and UPnP port forwarding for easier setup behind a home router. And, if there were a Windows version, it could run on that cruddy desktop back in the spare room.</p>

<p>@Mike: Naw... this guy is the real hero, <a href="http://twitter.com/johnolilly/status/17765272082" rel="nofollow">even John Lilly agrees</a>!</p>

<p><a href="http://blogs.denverpost.com/celebritybull/2008/09/09/greatest-american-hero-coming-to-the-big-screen/" rel="nofollow"><img src="http://blogs.denverpost.com/celebritybull/files/2008/09/gah.jpg" alt="Greatest American Hero" title="" /></a></p></div>
            
        </li>
    
        <li class="comment" id="comment-221088106">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=1d18681d9fa9b5d50b209a2a926dfe7d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Crash</a>
                </div>
                <a href="#comment-221088106" class="permalink"><time datetime="2010-07-06T09:20:54">2010-07-06T09:20:54</time></a>
            </div>
            <div class="content"><p>Is there already a App Id for this tool?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088107">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221088107" class="permalink"><time datetime="2010-07-06T10:18:57">2010-07-06T10:18:57</time></a>
            </div>
            <div class="content"><p>@Crash: Sure, there's an app ID for <em>my</em> instance of this sync server. But, as I said in the blog post, I'm not sharing it. At least, not until or unless I get the quota usage down to a point that I wouldn't exhaust the free hosting limits.</p>

<p>It's pretty easy to deploy your own sync server on AppEngine with the source, though.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088108">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=85283c3d40ca2b1a70a0f877a570107c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Peter Petrov</a>
                </div>
                <a href="#comment-221088108" class="permalink"><time datetime="2010-07-06T13:18:11">2010-07-06T13:18:11</time></a>
            </div>
            <div class="content"><p>@Leslie: The app ID of your instance is visible in app.yaml, so you've shared it anyway :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088113">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221088113" class="permalink"><time datetime="2010-07-06T17:18:47">2010-07-06T17:18:47</time></a>
            </div>
            <div class="content"><p>@Peter hah! Right you are! But, at least you had to look at the source of the app first to figure that out :) That is mostly the point of this blog entry after all. Anyone who does that and then uses my installation anyway will probably be sad when I regularly blow away data and eventually make it invite only</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088115">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=4fd1acfa0c7bd0767a90a30fbba73bfb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Tobias</a>
                </div>
                <a href="#comment-221088115" class="permalink"><time datetime="2010-07-07T00:24:41">2010-07-07T00:24:41</time></a>
            </div>
            <div class="content"><p>Neat! TyphoonAE http://typhoonae.googlecode.com might help you to build your household appliance.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088117">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=3e7e975f0fa432f4ae6604f72c132309&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Kumar McMillan</a>
                </div>
                <a href="#comment-221088117" class="permalink"><time datetime="2010-07-07T20:59:25">2010-07-07T20:59:25</time></a>
            </div>
            <div class="content"><p>Hey Les, this is super cool!  Google App Engine's Datastore API is still very shaky though.  In fact, it's been so bad lately that I've been considering porting one of my heavily used apps over to something else.  Thankfully, this post suggests that fixing the Datastore is their top priority: http://googleappengine.blogspot.com/2010/06/datastore-performance-growing-pains.html</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088119">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://home.kairo.at/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=59d914ad47e5c3fcd4c89668adcd43a2&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://home.kairo.at/blog/">Robert Kaiser</a>
                </div>
                <a href="#comment-221088119" class="permalink"><time datetime="2010-07-07T21:21:51">2010-07-07T21:21:51</time></a>
            </div>
            <div class="content"><p>Well, I actually feel more comfortable with my data being on Mozilla servers than on Google servers - even with the decreased trust I have in the Mozilla organization, I'd trust it more than Google any day! ;-)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088120">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.chrisarndt.de"><img src="http://www.gravatar.com/avatar.php?gravatar_id=02653ae22d36044e6870c17cf3d5a005&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.chrisarndt.de">Chris Arndt</a>
                </div>
                <a href="#comment-221088120" class="permalink"><time datetime="2010-09-28T11:06:55">2010-09-28T11:06:55</time></a>
            </div>
            <div class="content"><p>Instead of porting GAE to your desktop, why don't you just port your app to plain Django? Django should run off your desktop with no problems.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    