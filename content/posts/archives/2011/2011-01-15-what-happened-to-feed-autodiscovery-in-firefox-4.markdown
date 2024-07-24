---
comments_archived: true
date: '2011-01-15T11:18:56-05:00'
layout: post
tags:
- rss
- firefox
- feeds
- entries
- mozilla
- autodiscovery
- bug578967
title: What happened to feed auto-discovery in Firefox 4?
wordpress_id: 1976
wordpress_slug: what-happened-to-feed-autodiscovery-in-firefox-4    
wordpress_url: http://decafbad.com/blog/?p=1976
---
**TL;DR**: <em>The feed button is not dead; it's just been sent to sing backup in Firefox 4 because it's not pulling its weight. This post talks about why things have changed.</em>

There's [a brouhaha](http://camendesign.com/rss_a_reply) about [Bug 578967](https://bugzilla.mozilla.org/show_bug.cgi?id=578967), wherein the feed auto-discover icon in [the Firefox 4 Beta](http://www.mozilla.com/en-US/firefox/beta/) has been hidden by default. Being a feed nerd, the author of a book on the stuff, *and* a Mozilla employee—I've got at least a few opinions.

This post is one of [several on this subject](http://decafbad.com/blog/tag/bug578967).

### Defaults are hard to pare down

The [feed icon still lives](http://decafbad.com/blog/2011/01/15/how-to-use-feed-auto-discovery-in-firefox-4) in [the Firefox 4 Beta](http://www.mozilla.com/en-US/firefox/beta/); it's just not there by default any more. But, if you look at the controls available in [the toolbar customization panel](http://decafbad.com/blog/wp-content/uploads/2011/01/feed-sub-01.png), you'll notice a *lot* of things that don't show up by default—there are a lot of things in there, period.

This is the dilemma for [the Firefox User Experience team at Mozilla](http://planet.firefox.com/ux/): Like it or not, one of the main themes of this next generation of browsers is minimalism—faster, smaller, less browser to get in the way of what you're browsing. Yet, at the same time, Firefox 4 has the features of Firefox 3.6 and more.

You can't just cram it all in there, so what gets prime real estate by default? People say it's just a few pixels, that feed button—but is it so much more important than anything else that could go there? And before you answer, consider that not just for your personal use, but for the 100's of millions of people using Firefox. How do you check your own biases and make a decision on that scale? You could make an educated guess, make a gut check. A lot of brilliant design happens that way.

You can also [gather some telemetry from beta installs to see what people really use](https://heatmap.mozillalabs.com/). Looking at a heatmap of clicks, the feed button is an absolute stinker. This isn't a random whim of the UX team—seriously, it's an **order of magnitude** less used than anything else in the toolbar (notice the one black spot):

[<img src="http://decafbad.com/blog/wp-content/uploads/2011/01/heatmap.png" alt="heatmap.png" border="0" />](https://heatmap.mozillalabs.com/)

There have been comments dismissing the validity of that heatmap study. But, as far as I can tell, none of them really stick. So, for the sake of argument and a shorter blog post, let's assume barely anyone is using the feed icon and that it's not pulling its weight in this new age of browser minimalism.

Keep in mind that Firefox isn't the only browser to deprioritize the feed button: *Google Chrome doesn't even have a feed button at all*, and for many people that's the gold standard for minimal browser UI:

<img src="http://decafbad.com/blog/wp-content/uploads/2011/01/feed-sub-chrome.png" alt="feed-sub-chrome.png" border="0" />

<a name="serving"></a>
### Serving the users

Let's hammer on the point of disuse some more—what's the payoff for clicking that thing, anyway?

<img src="http://decafbad.com/blog/wp-content/uploads/2011/01/feed-sub-styling.png" alt="feed-sub-styling.png" border="0" />

* +1 — You get an option to create a [Live Bookmark](http://www.mozilla.com/en-US/firefox/livebookmarks.html), which is really handy for things like Bugzilla searches or light headline reading. (I like those so much that I tried building them on the server at Delicious once, but we never quite worked it out at scale.)

* 0 — You get a list of sites to which Firefox will delegate subscription, if you happen to have [installed a content handler](https://developer.mozilla.org/En/DOM:window.navigator.registerContentHandler). Useful if you know what it's about; a mystery if you don't—not much more useful than a bookmarklet, to me.

* -1 — You get a plainly-styled version of what you were probably already looking at on a site, [something I criticized back in 2006](http://decafbad.com/blog/2006/11/02/firefox-20-breaks-client-side-xsl-for-rss-and-atom-feeds), like some are criticizing the feed icon change now.  (At the time, I was working for [a marketing company](http://organic.com), and the change cost me days trying to incorporate branding in feeds on [a client's site](http://www.jeep.com/en/autoshow/feeds/jeep-all.xml). I think we gave up after a bit, but I suspect that [FeedBurner](http://feedburner.com) built a nice business routing around that change.)

That's been status quo for years, and it's less than compelling—I've even had people ask me if they broke the page when the button was clicked on accident.

So, given little reward for clicking that feed icon, *pushing it into the background in **its current state** is a service to the users of Firefox*. In other words, that feed button has to get a lot more interesting if it's going to serve alongside UI all-stars like **Back**, **Reload**, and **Location**. 

Hell, even with Firebug installed, I use **View Source** more than the feed button these days, and I've never stuck *that* on the toolbar.

### Leading the web

The most compelling response I've seen to the "removal" of the feed auto-discovery button is the challenge that Mozilla and other browser makers should be *improving* feed-related features, rather than pushing them into the background. With this, I wholeheartedly agree—but I'm not entirely sure what to do about it.

So, there's a balance here: Make the **experience of the web better** by improving how Firefox handles what's already out there, and **make the web itself better** by building more powerful and enabling technologies into Firefox and other products. In the best of times, Mozilla can do and has done both at once. [WebGL](http://en.wikipedia.org/wiki/WebGL) and technologies associated with HTML5 represent great examples of this.

But, alas, syndication feeds in the browser have stagnated. The feed button has been a weak feature *for years*. In the meantime, other things have taken priority in the Firefox project. The rise of Twitter and Facebook and more complex applications on the web have reduced the need for most people to interact directly with feeds, so demands for attention to the feed button haven't exactly topped the charts in comparison to things like [making sure Flash doesn't crash the browser](https://support.mozilla.com/en-US/kb/The%20Adobe%20Flash%20plugin%20has%20crashed) and [getting super fast](http://arewefastyet.com/) for everything else. 

### Ship it!

In the end, Mozilla has a browser to ship. The decision on the feed button *has been made* and, believe it or not, with a great deal of thought behind it. 

I know that this is the first time many people have heard of this change, but many already have heard and have given the UX team a number of earsful. Coming in at this late stage and requesting—nay **demanding**—a reversal of that decision will do nothing but piss off all the people who've been banging away at this and many other things up to now. They're people who've worked hard, stayed up late—and the last thing anyone wants to do is rehash every conversation ever about the topic.

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089393">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=478a310fc648c632ba1a3c120437289b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jacques</a>
                </div>
                <a href="#comment-221089393" class="permalink"><time datetime="2011-01-16T07:22:31">2011-01-16T07:22:31</time></a>
            </div>
            <div class="content"><p>I understand that we always try to enhance UI of any software and that it takes a lot of time and discussions to make decisions. And some decisions may not please everyone.</p>

<p>As for the Feed button, the one in the toolbar customization panel does not highlight when there are feeds available or change colour when there are no feeds. You need to click on it to see if Firefox 4 discovered feeds of not.</p>

<p>In Firefox 3.6, you don't need to guess or click on a button to find if a feed is available.</p>

<p>So instead of a feed button that is always shown, feed available or not, it's much more usable to show a button that highlight properly (takes more space), or is shown only when feeds are available (optimal space use).</p>

<p>Using a heatmap of clicks does not do justice to the feeds button, since it's of no use to click on it in Firefox 3.6 to instantly see if or not there is a feeds available.</p>

<p>There are other information that have been removed in Firefox 4 that are open to discussion.</p>

<p>For example, a heatmap does not show loading icons, throbbers, urls loading in the status bar, "done" message in the status bar, etc. In fact, any status information won't show up in a clicks heatmap. So if that information does not show up in a clicks heatmap, it does not mean these statuses must be removed from the UI.</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089415">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089415" class="permalink"><time datetime="2011-01-16T21:25:30">2011-01-16T21:25:30</time></a>
            </div>
            <div class="content"><p>Actually, the Feed button in the toolbar <em>does</em> change state depending on the presence or absence of feeds: It's enabled and clickable with a feed, and greys out without a feed. I mentioned that in the post. If that's not noticeable enough for you, then that's a separate bug specific to that button.</p>

<p>As for the validity of the heatmap—what would you suggest get done as an alternative? There's no way to fit a large number of beta users with eye-tracking gear. Also, I personally don't buy that people just like to have the feed indicator around because it's nice to see it light up. It's a call to action (eg. subscribe to this site)—and if barely anyone takes that action, how valuable can it be?</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221089396">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.mozillaitalia.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0dc7c70165e18529e8ce7cffca832f6f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.mozillaitalia.org">Giuliano</a>
                </div>
                <a href="#comment-221089396" class="permalink"><time datetime="2011-01-16T08:40:45">2011-01-16T08:40:45</time></a>
            </div>
            <div class="content"><p>And if you really miss the feed-autodiscovery feature, just use <a href="https://addons.mozilla.org/it/firefox/addon/rss-icon-in-awesombar/" rel="nofollow">RSS Icon In Awesombar</a>. ;)</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089444">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://usefuldissident.blogspot.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=f836de283983db304b0191e3777c2eda&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://usefuldissident.blogspot.com/">dude</a>
                </div>
                <a href="#comment-221089444" class="permalink"><time datetime="2011-01-17T03:17:05">2011-01-17T03:17:05</time></a>
            </div>
            <div class="content"><p>RSS/Atom are standardized web features, it's a shame we have to rely on 3rd parties to enable support. At least Google has an official RSS extension so I can trust the security of the addon, but still, both Mozilla and Google are going backwards on this.</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221089401">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://voracity.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=1260a07065c85d1f1237b547ab887f54&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://voracity.org">voracity</a>
                </div>
                <a href="#comment-221089401" class="permalink"><time datetime="2011-01-16T11:07:30">2011-01-16T11:07:30</time></a>
            </div>
            <div class="content"><p>Well argued. I am a little disappointed with its removal because RSS is a distributed status update mechanism, and we're currently being swamped by centralised status update mechanisms (twitter and whatnot). But the experience has always been seriously crap (to put it bluntly), so better to remove it until it improves I suppose.</p>

<p>Sadly, my guess is that once its removed, it will never reappear.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089403">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://libre-ouvert.toile-libre.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d03f462235ec88103cafd8db26dd7be9&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://libre-ouvert.toile-libre.org/">antistress</a>
                </div>
                <a href="#comment-221089403" class="permalink"><time datetime="2011-01-16T11:27:15">2011-01-16T11:27:15</time></a>
            </div>
            <div class="content"><p>i agree with the new UI concerning feed subscription (along with bookmarks).</p>

<p>But there is indeed a concern with Firefox 4 concerning feeds.
Since Firefox doesn't really handle feeds, Sync doesn't care about them either.
Therefore if you have installed an add-on to deal with feeds, they will not be synchronized and that's not a good experience for the user. Bookmarks are synchronized but feeds are not, whereas they supposed to belong to the same scheme</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089431">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089431" class="permalink"><time datetime="2011-01-17T00:04:24">2011-01-17T00:04:24</time></a>
            </div>
            <div class="content"><p>Good points. I'd say there are lots of things Firefox could do better with feeds in general.</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221089406">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.mozilla.cz"><img src="http://www.gravatar.com/avatar.php?gravatar_id=94e877e3a782dd081062611b66ef76b0&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.mozilla.cz">Pavel Cvrcek (Mozilla.cz)</a>
                </div>
                <a href="#comment-221089406" class="permalink"><time datetime="2011-01-16T11:29:40">2011-01-16T11:29:40</time></a>
            </div>
            <div class="content"><p>I think this is right decision even I'm one of the people who use RSS button which is inside location bar. But we have extensions right? Because this function is important for me I created extension RSS Icon In Awesombar which brings this button back to the location bar. </p>

<p>https://addons.mozilla.org/firefox/addon/rss-icon-in-awesombar/</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089411">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=cb440f309ad5be39a03b7e7c0ba9d4d6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Meepmeepmeep</a>
                </div>
                <a href="#comment-221089411" class="permalink"><time datetime="2011-01-16T11:34:59">2011-01-16T11:34:59</time></a>
            </div>
            <div class="content"><p>The only reason i'll even get to see your follow-up entries to this is because my browser includes an rss reader and a button that tells me you have an rss feed for your blog.</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089423">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089423" class="permalink"><time datetime="2011-01-16T21:38:06">2011-01-16T21:38:06</time></a>
            </div>
            <div class="content"><p>So, you mean to tell me that you didn't already think my blog had a feed, before you looked for the feed icon?</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089445">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://usefuldissident.blogspot.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=f836de283983db304b0191e3777c2eda&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://usefuldissident.blogspot.com/">dude</a>
                </div>
                <a href="#comment-221089445" class="permalink"><time datetime="2011-01-17T03:22:53">2011-01-17T03:22:53</time></a>
            </div>
            <div class="content"><p>Are you surprised he would be more likely to find an RSS button on his toolbar than somewhere on the side of the page? Or that someone wouldn't assume that all blogs have RSS, especially many older ones? Or that asking Google Reader to test if a URL had a feed is a whole lot more cumbersome than using the browser to get Google Reader to subscribe to it?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089448">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=cb440f309ad5be39a03b7e7c0ba9d4d6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Meepmeepmeep</a>
                </div>
                <a href="#comment-221089448" class="permalink"><time datetime="2011-01-17T09:08:24">2011-01-17T09:08:24</time></a>
            </div>
            <div class="content"><p>Yes.</p>

<p>I stumble upon too many blogs of various kinds that have no feeds to make the assumption that every blog has one. As i mentioned on your other post, Yahoo Pipes is a tool i often need to resort to.</p>

<p>Maybe you need to step outside your Web 2.0 bubble sometime?</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221089413">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://lew21.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9915b2b63c76d2d158b835396cb66143&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://lew21.net/">Janusz Lewandowski</a>
                </div>
                <a href="#comment-221089413" class="permalink"><time datetime="2011-01-16T12:12:53">2011-01-16T12:12:53</time></a>
            </div>
            <div class="content"><p>I suggest removing the Scroll Left button, it's used only by 1% of Fx users.</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089417">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089417" class="permalink"><time datetime="2011-01-16T21:28:22">2011-01-16T21:28:22</time></a>
            </div>
            <div class="content"><p>I'm pretty sure removing the Scroll Left button was discussed—if only for a minute—and a call was made that basic spatial navigation was more important than feeds.</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221089414">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://usefuldissident.blogspot.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=f836de283983db304b0191e3777c2eda&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://usefuldissident.blogspot.com/">dude</a>
                </div>
                <a href="#comment-221089414" class="permalink"><time datetime="2011-01-16T21:25:26">2011-01-16T21:25:26</time></a>
            </div>
            <div class="content"><p>Janusz, I totally agree, let's remove the site identity, remove bookmark, more info, scroll right, print menu item, save page as, bookmarks all tab, etc., they are obviously never used.</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089434">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089434" class="permalink"><time datetime="2011-01-17T00:07:20">2011-01-17T00:07:20</time></a>
            </div>
            <div class="content"><p>Pretty much all of those you list are used more than twice as much as the feed icon, or don't appear on the toolbar at all.</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221089420">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=ae1dd99bfb7ffc73d2e97eccd1bf0d27&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jim L.</a>
                </div>
                <a href="#comment-221089420" class="permalink"><time datetime="2011-01-16T21:32:14">2011-01-16T21:32:14</time></a>
            </div>
            <div class="content"><p>I can put "View Source" in the toolbar?  How?!</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089426">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089426" class="permalink"><time datetime="2011-01-16T21:40:34">2011-01-16T21:40:34</time></a>
            </div>
            <div class="content"><p>Actually, for "View Source", I installed <a href="https://addons.mozilla.org/en-US/firefox/addon/web-developer/" rel="nofollow">the Web Developer add-on</a>. So, that's not built-in like I implied.</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221089429">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=05d902723e8e452b5640d52c9406ed51&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Tulapi</a>
                </div>
                <a href="#comment-221089429" class="permalink"><time datetime="2011-01-16T22:23:44">2011-01-16T22:23:44</time></a>
            </div>
            <div class="content"><p>Why do you care about this "Back" button,  "Location bar" and so on ?
Just put one big "facebook" button and one big "google" button, it's enough...</p>

<p>With this kind of decisions, I think you are not "building a better Internet" as Mozilla Foundation is supposed to do.</p>

<p>RSS and twitter are very different ways to access information, with their "+" and "-". Leaving RSS dying  seems to me a regression. I am sorry, but when I read "The rise of Twitter and Facebook and more complex applications on the web have reduced the need for most people to interact directly with feeds", I am a bit frightened, because I understand it a bit like : "Hey guy, why don't you go on Facebook like everybody to surf the web. It's cool and your friends tell you what is interesting to read".</p>

<p>I don'k know about the usability of the feed concept, it could be certainly  improved, but I really felt it was going towards "give people tools to take control of their online lives" (Mozilla Mission)</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089437">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089437" class="permalink"><time datetime="2011-01-17T00:14:38">2011-01-17T00:14:38</time></a>
            </div>
            <div class="content"><p>So, I did say that Twitter and Facebook has left users with less need to interact with feeds—but I didn't say that I liked it. I'm the last person who'd want closed silos to own the web, and I want to see RSS and Atom and other open web technologies grow.</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089446">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://usefuldissident.blogspot.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=f836de283983db304b0191e3777c2eda&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://usefuldissident.blogspot.com/">dude</a>
                </div>
                <a href="#comment-221089446" class="permalink"><time datetime="2011-01-17T03:25:24">2011-01-17T03:25:24</time></a>
            </div>
            <div class="content"><p>I'm currently a Chrome user, wishing that 1 day Firefox will go back to why I liked it in the first place. I've been subsribing to Twitter feeds and Facebook pages more than I have with feeds with Chrome, not only because the prior are established, but also because Chrome doesn't encourage RSS with its exclusion. I don't bother with addons either, I don't think most users do either (yet Mozilla decides addons need a whole bar).</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221089439">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://animeserenity.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=1c89a0f61f168bce38a522286bf659dd&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://animeserenity.net">Andrew</a>
                </div>
                <a href="#comment-221089439" class="permalink"><time datetime="2011-01-17T01:39:38">2011-01-17T01:39:38</time></a>
            </div>
            <div class="content"><p>I can't be the only person who, when I decide I want to subscribe to a site, looks for the RSS Icon on the page first before I ever even glance at the auto-discovery icon. In many cases, especially on larger sites, I rarely want what they would consider the "main" feed anyway and on the sites where I do want that, their feed is usually in a place that's easily clicked on.</p>

<p>So, in my case, it was needless clutter that I'm rather happy to see getting removed by default. Of course, I remove a lot more than that from Firefox's chrome, but at least this is one less thing I have to do manually.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089449">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=9e4f184c9f857d5fc0844c26c8ae9d2e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">fflover</a>
                </div>
                <a href="#comment-221089449" class="permalink"><time datetime="2011-01-17T16:26:58">2011-01-17T16:26:58</time></a>
            </div>
            <div class="content"><p>Sir, looks like you know a lot about FF. Is it a conscious decision to not have Awesombar as the default search bar .i hate it when it gives me google search results. if i type bbc news and hit enter, it should take me to bbc news site, right? not a google search of it? If there is any way i can get my awesombar back, please let me know.</p>

<p>Sincerely,
fflover :)</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089451">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089451" class="permalink"><time datetime="2011-01-17T17:33:17">2011-01-17T17:33:17</time></a>
            </div>
            <div class="content"><p>Sounds like you might be interested in this add-on:</p>

<p>https://addons.mozilla.org/en-US/firefox/addon/luckybar/</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221089453">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8c228840206d0bcfa8083f103c6011f8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">ffuser</a>
                </div>
                <a href="#comment-221089453" class="permalink"><time datetime="2011-01-17T19:40:00">2011-01-17T19:40:00</time></a>
            </div>
            <div class="content"><p>beta users is not equal to representative user population.
how much percent of all Firefox users does your study cover, is it enough to make statistical conclusions?</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089458">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089458" class="permalink"><time datetime="2011-01-17T20:46:23">2011-01-17T20:46:23</time></a>
            </div>
            <div class="content"><p>Well, it's not <em>my</em> study, it's <a href="https://testpilot.mozillalabs.com/testcases/betaui" rel="nofollow">the Test Pilot team's study</a>. I'd say it's a decent chunk of users, with some interesting segmentation. But, that's my opinion.

If you have an idea of how to execute a study that covers more, feel free to let the Test Pilot team know.</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221089459">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.straw-dogs.co.uk"><img src="http://www.gravatar.com/avatar.php?gravatar_id=32ba8c5c148da2653028dc7f8066b810&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.straw-dogs.co.uk">Doug Bromley</a>
                </div>
                <a href="#comment-221089459" class="permalink"><time datetime="2011-01-18T08:46:09">2011-01-18T08:46:09</time></a>
            </div>
            <div class="content"><p>Wow. There's a lot of strong feelings flying around. Well as one of the silent majority I'd just like to offer my support to the removal. I never used the feed button and whenever I wanted a sites feed I normally scanned the page I was on for an icon to click.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089461">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=e40bdaa1db8c568d9298e7a1e776f6ba&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Olivier</a>
                </div>
                <a href="#comment-221089461" class="permalink"><time datetime="2011-01-18T18:03:16">2011-01-18T18:03:16</time></a>
            </div>
            <div class="content"><p>Thank you for your post.
I, too, would rather have the button clutter up a little than risk RSS being less discovered. But I understand your point and respect your decisions.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089465">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://voodoowarez.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8e08cd9c3593b8b3d0bf8ac5cef68287&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://voodoowarez.com">rektide</a>
                </div>
                <a href="#comment-221089465" class="permalink"><time datetime="2011-01-22T02:17:52">2011-01-22T02:17:52</time></a>
            </div>
            <div class="content"><p>your metric for evaluating the utility of the feed button -- click rate -- is about as incorrect and contrary as possibly can be conceived.</p>

<p>the entire point of the feed button is that you only need to click it once for a site.  after a user clicks it, the user shouldn't have to click it again on that site, and, going further, shouldn't even have to visit the site.  those are the signals for success.</p>

<p>if you want a useful metric, dont look at how often the button is clicked.  that's entirely the purpose of what it's trying to avoid. look at return rates for sites where a user has clicked the feed button.  if you see a precipitous drop in return rates, you know the button is functioning completely as desired.  the bigger the drop, the less users return, the better the button works.</p>

<p>baby HCI jesus is weeping in his crib.</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089466">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089466" class="permalink"><time datetime="2011-01-22T08:45:28">2011-01-22T08:45:28</time></a>
            </div>
            <div class="content"><p>So... if it only gets used once per site, then it doesn't belong in the same toolbar with navigational controls that get used constantly. It's a special action, used rarely. Thus, it's in the bookmark menu now - you know, bookmarks, another thing you ideally do once per site if at all.</p>

<p>But as I've said in other comments, if you feel strongly enough, come up with a study to propose to the Test Pilot team and spread your HCI jesus gospel</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        </ul>
    
        </div>
    