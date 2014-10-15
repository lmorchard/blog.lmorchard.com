---
comments_archived: true
date: '2011-01-27T01:11:00-05:00'
layout: post
tags:
- rss
- firefox
- feeds
- entries
- mozilla
- autodiscovery
- bug578967
title: What should be done about feeds in browsers?
wordpress_id: 2022
wordpress_slug: what-should-be-done-about-feeds-in-browsers
wordpress_url: http://decafbad.com/blog/?p=2022
---
**TL;DR**: <em>Browsers need help doing a better job using feeds for discovery, aggregation, and publishing on the web to keep us from swimming into self-destructing lobster traps.</em>

Last week, I wrote [some blog posts](http://decafbad.com/blog/tag/bug578967) about [Bug 578967](https://bugzilla.mozilla.org/show_bug.cgi?id=578967), wherein the feed auto-discovery icon in [Firefox 4](http://www.mozilla.com/en-US/firefox/beta/) has been moved off the URL bar and hidden by default. I support that decision of [the UX team](http://planet.firefox.com/ux/), because [that feed button is a slacker](https://heatmap.mozillalabs.com/). And even if it does get used, [I'm not a fan of what it does anyway](http://decafbad.com/blog/2011/01/15/what-happened-to-feed-autodiscovery-in-firefox-4#serving).

But, I've got lots more rattling around in my head about this stuff.

### What's the point of feeds?

Feeds—that's RSS and Atom and maybe even JSON—let robots pull lots of stuff from a bunch of places and pile it all together in one spot for your perusal, analysis, and remixing pleasure. Feed readers and news aggregators do the surfing for you, so you don't have to.

But, Twitter and Facebook and others have managed to make *the people themselves* all gather in one spot. So, to see what those people are saying and doing, you just have to go *there*—kind of like what feeds promised, right? Only, you go *there* rather than all that stuff coming *here*.

The problem is, even if the logo says it [loves you](http://www.flickr.com/photos/dunstan/524137648/), the people who made it say that [won't always stay in charge](http://www.flickr.com/help/forum/en-us/107408/). And, someday, when whomever's left rides off into the [sunset](http://techcrunch.com/2010/12/16/is-yahoo-shutting-down-del-icio-us/), you'll learn how much [they didn't care about you](http://archiveteam.org/index.php?title=Why_Back_Up%3F) in the end.

<p style="text-align: center"><a href="http://www.flickr.com/photos/herzogbr/2261662706/" title="Flickr Loves You by herzogbr, on Flickr"><img src="http://farm3.static.flickr.com/2003/2261662706_db086ea4bb_m.jpg" width="" height="64" alt="Flickr Loves You" /></a> <strong style="font-size: 200%; padding: 0.5em;">vs</strong> <a href="http://www.flickr.com/help/forum/en-us/107408/"><img src="http://l.yimg.com/g/images/en-us/flickr-yahoo-logo.png" height="50" style="padding: 7px; background: #fff"></a></p>

For some people and some places, that's no big tragedy. It's just a party; you go home when it's over. You made memories, you hope to find some of those people again elsewhere. [Pownce croaked](http://blog.pownce.com/2008/12/01/goodbye-pownce-hello-six-apart/), and [so did Vox](http://www.wired.com/epicenter/2010/09/six-apart-shuts-down-vox/), but who cares? There's always Twitter next door for the afterparty.

But, what if a world you lived in [evaporated while you were on vacation elsewhere for the holidays](http://ascii.textfiles.com/archives/2444)? I guess you could say that was just a game and, again, who cares?

What if [Flickr](http://www.flickr.com/) went away just like that? People are not only partying there—they're leaving their visual memories at the coat check. Things are a little more real there, by some definitions thereof.

What if you never swam into that [lobster trap](http://ascii.textfiles.com/archives/2848), though? What if your words and images and creations were borrowed and copied, but never wholly kept in someone else's bucket? What if [Flickr](http://www.flickr.com/) were just like [Google Search](http://google.com)? That is, a collector and an index—but never the host—of photos and conversations?

Feeds can help make that happen, but not by themselves.

### Do feeds belong in the browser?

Well, yeah. Would sites like Twitter and Facebook have been as successful if feeds worked better in the browser? I think so. But, by working better, I don't just mean improvements to that funky blue thing that showed up in the location bar every now and then. No, I mean all of the following:

* **Discovery** — help me find and follow interesting people and things
* **Aggregation** — give me one spot where what I find and follow is delivered to me
* **Publishing** — enable me to post things where people (and their agents) can find and follow

To me, this is where Twitter and Facebook are totally nailing it. But, much of this can happen in the browser, and I think more of it should. Projects like [RockMelt](http://www.rockmelt.com/) and [Flock](http://www.flock.com/) have seemed promising to me in this context, but have yet to really thrill me. I don't think they go far enough.

There is a point where the rubber (client) meets the road (server)—but that point can live [so much farther down the stack than it does now](http://scripting.com/stories/2011/01/11/howToShareABucketOnS3.html). Mind you, I don't want a revival of [Netscape Gold](http://www.zisman.ca/netgold/) as such—but recall that ["the first browser was an editor, it was a writer as well as a reader"](http://news.bbc.co.uk/2/hi/technology/4132752.stm).

We need some services and hosts out there as rendezvous points for our browsers and agents, but we really don't need any of those services to collapse into [the next all-encompassing AOL-style singularity](http://buddycloud.com/cms/content/we-are-aol-days-social-networking). There's money to be made there, but most of us are the product.

### Whose job is it anyway?

I'd like to see my employer, Mozilla, do more with feeds in the browser—and I suspect we will. [Mozilla Labs has had some interesting Concept Series topics](http://mozillalabs.com/blog/2010/03/online-identity-concept-series/), and I look forward to seeing some of those things get pursued further. If I can carve out the time, I wouldn't mind helping.

Something I find interesting about feed auto-discovery—the thing that started this latest round of buzz—is that it didn't originate with browser makers. [RSS auto-discovery](http://diveintomark.org/archives/2002/05/30/rss_autodiscovery) was itself discovered [by bloggers](http://decafbad.com/blog/2002/05/31/oooago), way back in 2002. It wasn't until we sussed out the details of that [HTML link tag](http://www.w3.org/TR/REC-html40/types.html#type-links) and shoved it into our pages that browsers like Firefox started looking for it.

Hell, even though [RSS started with Netscape](http://en.wikipedia.org/wiki/Rss#History), it took [Dave Winer and UserLand and friends running with it](http://scripting.com/davenet/2000/09/02/whatToDoAboutRss.html) to keep it alive and kicking. Now, Dave's [suggested forking an open source browser](http://scripting.com/stories/2011/01/11/krocCamenProvesRssIsVeryMu.html) to show Mozilla how it's done. I support the sentiment, but there are easier ways to go about this.

### Making it your job

[Christopher Blizzard](http://camendesign.com/rss_a_reply):
<blockquote>We created add-ons with the original Firefox as a way to be able to say “no” in a constructive manner. If you want something that you think is important to you, you can make an add-on.</blockquote>

That could be taken as a cop-out, but it's not. With the efforts behind [Jetpack](https://jetpack.mozillalabs.com/)—now just *the* [Add-on SDK](http://blog.mozilla.com/addons/2010/12/09/announcing-add-on-sdk-1-0b1/)—building add-ons for Firefox is being made easier. Rather than dealing with a morass of XUL and obscure APIs that I know has scared me personally away all these years, you can now do most everything you'd like though [much-simplified JavaScript APIs](https://jetpack.mozillalabs.com/sdk/1.0b1/docs/#package/addon-kit) and HTML/CSS.

In other words, if you are a web developer—albeit a fairly advanced one—you can make an add-on for Firefox. Hopefully, as the Add-on SDK advances, the bar to participation will continue to drop.

### To be continued

I'm running out of steam and it's time for bed, so I think I'll just trail off for now. I do have a bit more in me, though. The next thing is about taking my own advice in that last section and making some of this *my* job to fix.

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086137">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=52674e2ce2d7671878b26ed534b0c662&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Majken "Lucy" Connor</a>
                </div>
                <a href="#comment-221086137" class="permalink"><time datetime="2011-01-27T06:38:04">2011-01-27T06:38:04</time></a>
            </div>
            <div class="content"><p>Yay!</p>

<p>Feeds are soo soo soooo great, but not as live bookmarks. Google Reader is the place to be in terms of functionality, but there's no reason I have to put everything through google.</p>

<p>When I find a site I like, why should I have to go to it to check for new content? A feed reader brings it to <em>me</em> AND it remembers where I was. I've been trying to get my kids hooked on it, though they seem to forget about it.</p>

<p>Speaking of the kids, their teachers are getting all technical and they post the homework online, but I've been pulling my hair out for 2 years trying to get them to do it in a way that enables feeds. Several nights it happened that they didn't write down what they had and then we had to remember to check periodically because the homework wasn't updated right away.  </p>

<p>Right now they're sent home with books with it all written down and I'm supposed to sign that I saw it, but who remembers to look at a book all the time? It's such a complicated process - kids have to write it down in the first place, then one of us has to remember to show it to me. FEEDS!!! No one has to remember, it just shows up where I'm already looking!</p>

<p>So glad you're on board.</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086159">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086159" class="permalink"><time datetime="2011-01-27T20:54:22">2011-01-27T20:54:22</time></a>
            </div>
            <div class="content"><p>Not sure if the homework lists online are behind a login or not, but if it's in HTML we can hack a feed out of it :)</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221086141">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=adfd6aa4efe2aa64f5e091abf07f2766&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Bee</a>
                </div>
                <a href="#comment-221086141" class="permalink"><time datetime="2011-01-27T08:13:46">2011-01-27T08:13:46</time></a>
            </div>
            <div class="content"><p>"Discovery — help me find and follow interesting people and things
Aggregation — give me one spot where what I find and follow is delivered to me
Publishing — enable me to post things where people (and their agents) can find and follow"
.. Erm google reader?</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086148">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086148" class="permalink"><time datetime="2011-01-27T15:02:20">2011-01-27T15:02:20</time></a>
            </div>
            <div class="content"><p>Yup. I use Google Reader every day. Google owns it, though. It's not Facebook or Twitter, but it's not mine.</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086152">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://beesbuzz.biz/"><img src="http://disqus.com/api/users/avatars/plaidfluff.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://beesbuzz.biz/">fluffy</a>
                </div>
                <a href="#comment-221086152" class="permalink"><time datetime="2011-01-27T17:01:25">2011-01-27T17:01:25</time></a>
            </div>
            <div class="content"><p>Whenever I'm going through my occasional "Google scares me" phases I go back to FeedOnFeeds. It has a few rough edges, but it has the nice advantage that it's software you install on your own server somewhere, and it works pretty much just like Google Reader in terms of aggregation.  It also has some rudimentary publishing stuff, although IIRC it's in the form of a public RSS feed that other people subscribe to.  Which actually isn't a bad model, really.</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086153">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086153" class="permalink"><time datetime="2011-01-27T17:34:03">2011-01-27T17:34:03</time></a>
            </div>
            <div class="content"><p>I think I've used <a href="http://feedonfeeds.com/" rel="nofollow">FeedOnFeeds</a> before, though it looks like it's not moved in awhile. There's also <a href="http://tt-rss.org/redmine/" rel="nofollow">Tiny Tiny RSS</a>, which looks a little more kept-up.</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        </ul>
    
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221086145">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://ciarang.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=18910207650685d4592d9a6a71528180&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://ciarang.com/">CiaranG</a>
                </div>
                <a href="#comment-221086145" class="permalink"><time datetime="2011-01-27T10:45:08">2011-01-27T10:45:08</time></a>
            </div>
            <div class="content"><p>Do feeds belong in the browser? Well, to the extent that while looking at a web page, there may be related feeds that the browser can auto-discover. Do I want to read them in the browser? No.</p>

<p>All I ever wanted was for the feed button in Mozilla product A, Firefox, to be able to add a subscription to that feed in Mozilla product B, Thunderbird. You'd think that would be a simple and obvious thing that would just work, but even by hooking the two together with a selection of Heath Robinson-style scripts, it's still never been possible to get them to play nicely.</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086149">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086149" class="permalink"><time datetime="2011-01-27T15:06:57">2011-01-27T15:06:57</time></a>
            </div>
            <div class="content"><p>That's a good point - a lot of this falls under the bailiwick of Mozilla Messaging, who work on Thunderbird. Personally, I never liked feeds in an email client, though.</p>

<p>But, that reminds me they've got this thing called <a href="http://mozillalabs.com/raindrop/" rel="nofollow">Raindrop</a> that I haven't looked at in awhile. It might be interesting.</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221086147">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://home.kairo.at/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=59d914ad47e5c3fcd4c89668adcd43a2&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://home.kairo.at/blog/">Robert Kaiser</a>
                </div>
                <a href="#comment-221086147" class="permalink"><time datetime="2011-01-27T14:42:53">2011-01-27T14:42:53</time></a>
            </div>
            <div class="content"><p>Fun that you say that XUL scared you away from doing add-ons, as doing everything that I think should be markup in JS scares me away from doing restartless add-ons or using the new SDK. I guess there's different people thinking differently. ;-)</p>

<p>For the actual topic, I think you're dead-on. I have subscribed to feeds from twitter, statusnet and identica, but as there's no interface to write messages from there, I just don't post anything there (and I intentionally don't have accounts on monolithic services like Facebook or twitter).</p>

<p>We need to get a better integration for pulling together info and communication in the browser. My "RMD" concept - http://wiki.kairo.at/wiki/RMD - could be one possible basis, but it might be overdoing it, given that I very much come from traditional messaging...</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086171">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086171" class="permalink"><time datetime="2011-01-28T18:32:07">2011-01-28T18:32:07</time></a>
            </div>
            <div class="content"><p>Yeah, XUL has been one of those things on my to-research list for years and years, but I've never really dove in. Then, Jetpack comes along, and at least the entry point is similar to what I've been doing for the last decade or so.</p>

<p>But even that is sneaky, because I have access now to those "obscure Mozilla APIs" and I'm finding myself learning them now anyway since Jetpack got me in the door. :)</p>

<p>Your RMD concept is interesting, though. Might be more to the point than the piggy-backing I'm doing on Live Bookmarks. I've also been wondering how things like pubsubhubub might feed into things like this</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221086155">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://vocal.ly"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8b71ac29d4c8fbc68955337e5143d549&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://vocal.ly">@sull</a>
                </div>
                <a href="#comment-221086155" class="permalink"><time datetime="2011-01-27T19:50:36">2011-01-27T19:50:36</time></a>
            </div>
            <div class="content"><p>Question.  Whats your opinion on FF (and other browsers) handling of the direct feed url?
I've long wanted browsers to back off from forcing their own baked-in handling (stylesheets, functionality etc).
I've just wanted the simple alert dialog (now standardized for all alerts like geolocation, passwords etc) to appear when necessary before the browser takes over (Like you include with Fireriver auto-discovery).</p>

<p>The obvious example is when a feed specifies its own XSL stylesheet but FF ignores this instruction and the sniffer only cares about the presence of the &lt;rss or &lt;feed element before treating this &#039;document&#039; differently than any other XML document.  This can be overcome with some hacks but that is a moot point.</p>

<p>Ideally, the browser will adhere to the content publisher&#039;s (or feed generator&#039;s) instructions on how to handle the presentation of the data.  That plus XSLT is a W3C standard.</p>

<p>Definitely interested in your thoughts on this angle of the &quot;feeds in browser&quot; discussion.</p>

<p>Thanks,</p>

<p>Sull</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086158">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086158" class="permalink"><time datetime="2011-01-27T20:52:52">2011-01-27T20:52:52</time></a>
            </div>
            <div class="content"><p><a href="http://decafbad.com/blog/2006/11/02/firefox-20-breaks-client-side-xsl-for-rss-and-atom-feeds" rel="nofollow">I'm not a fan of the built-in stylesheet for feeds</a>. That change actually cost me a bunch of hours at work back then, trying to figure out why my XSL stopped working. </p>

<p>IMO, that broke something I was using, but didn't go far enough to make it worth breaking. And, it's not really gone much farther since then.</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086161">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://vocal.ly"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8b71ac29d4c8fbc68955337e5143d549&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://vocal.ly">@sull</a>
                </div>
                <a href="#comment-221086161" class="permalink"><time datetime="2011-01-28T03:23:25">2011-01-28T03:23:25</time></a>
            </div>
            <div class="content"><p>thanks for pointing out your post from yesteryear.
the issue needs some new noise.
FF4 is unchanged.</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221086163">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=181ae3c6e4a87c35bfbd987c5838a135&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">skierpage</a>
                </div>
                <a href="#comment-221086163" class="permalink"><time datetime="2011-01-28T11:09:07">2011-01-28T11:09:07</time></a>
            </div>
            <div class="content"><p>"We need some services and hosts out there as rendezvous points for our browsers and agents,"</p>

<p>Why?  I can e-mail directly to another user at a computer; BitTorrent transfers file chunks directly to other computers.  So why can't my computer transfer my pictures, status updates, favorite links, snarky comments, etc. DIRECTLY to the computers of lists of people (misnamed as "friends" by Facebook)?</p>

<p>The correct response to the dangers of centralization is running your own server.  That needs to become the norm rather than some scary IT project that only geeks ever attempt!  Your "server" could just be Firefox accepting connections from lists of people.</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086168">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086168" class="permalink"><time datetime="2011-01-28T18:04:52">2011-01-28T18:04:52</time></a>
            </div>
            <div class="content"><p>No, generally, you can't e-mail directly to another user at a computer. You send a message to a server, which then sends it to their server, and eventually their mail client picks it up. There are intermediaries.</p>

<p>BitTorrent relies on trackers (ie. rendezvous points) before you can start transferring chunks, though the distributed hash stuff helps get away from that. But, if all that were easy (including discovery), it would have taken off long, long ago.</p>

<p>You can't go P2P for everything, at least not easily. Not every P is online at all times, so we need store-and-forward services. Some P's have multiple devices and agents, and most of those are behind firewalls and NAT. So, we need servers out there as accessible fixed points that are (mostly) always available. We can try to build P2P meshes that do the same thing, but servers are simpler.</p>

<p>And, yeah, I do believe that running your own server is the ultimate solution. Or, at least, finding someone to run it for you who cares about keeping it up, whether through direct payment or other direct incentive (ie. they're family or friends). Otherwise, you still have the problem where what they care about doesn't match what you care about (eg. ad supported services).
</p><p>But, with the way the user agent picture is splitting up across devices (eg. the cloud, ambient computing), I don't think Firefox will ever be the server. Even if you connect user agents together with something like Jabber/XMPP, you still need a server out there—though at least that's pushing things in the right direction, since an XMPP server can be agnostic about the messages that go through it</p>

<p>I do have another blog post rattling around in my head about hosting. It's too hard right now; charging money smothers a lot of use; etc.</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086173">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://vocal.ly"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8b71ac29d4c8fbc68955337e5143d549&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://vocal.ly">@sull</a>
                </div>
                <a href="#comment-221086173" class="permalink"><time datetime="2011-01-28T21:17:32">2011-01-28T21:17:32</time></a>
            </div>
            <div class="content"><p>Opera Unite is out there but it too leverages a centralized service as a proxy.  But it is a great experiment and give them credit for moving it forward and into their browser product.
The problem that will creep up is of course bandwidth limitations, especially on the UP.  And this is only going to get worse as providers tighten up the pipes.</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        </ul>
    
        </li>
    
        </ul>
    
        </div>
    