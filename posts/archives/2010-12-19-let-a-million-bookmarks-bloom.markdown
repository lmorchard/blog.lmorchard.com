---
comments_archived: true
date: '2010-12-19T16:26:38-05:00'
layout: post
tags:
- delicious
- bookmarks
- feeds
- entries
- pubsubhubbub
- rsscloud
title: Let a million bookmarks bloom
wordpress_id: 1952
wordpress_slug: let-a-million-bookmarks-bloom
wordpress_url: http://decafbad.com/blog/?p=1952
---
<em><strong>TL;DR:</strong> Don't depend on Delicious; host your own, pay for it elsewhere, or hope for the best. Use real-time feeds to stitch the bookmarking diaspora back together into topical aggregate indexes.</em>

In [the last entry][last], I wrote about why my use of Delicious has dropped over time, and what I've been missing as a result. In short, I think there's place for something like Delicious, and I'd like to get back to it.

**Update:** See also, "[We can save Delicious, but probably not in the way you think][savedel]" from Stephen Hood, one of my former Delicious co-workers. He covers some more good angles I didn't get around to here.

[savedel]: http://uniquehazards.tumblr.com/post/2377362882/we-can-save-delicious-but-probably-not-in-the-way-you

[last]: http://decafbad.com/blog/2010/12/18/less-del-icio-us-than-ever-before

## Active thoughts 

So, it's true [Yahoo! announced][they] that they're "actively thinking about the future of Delicious" and that "we believe there is a home outside the company". But, none of that says they've found a home or that it will be easy to transplant if they do. In the meantime, there's a lot of uncertainty and probably only an overworked skeleton crew left onboard.

Much of Delicious now depends on home-grown technology that is shared by many other Yahoo! properties. This should not be a surprise: Beyond the money, [that was kind of the point of selling to Yahoo! in particular][sellyahoo]. As a major search company in 2005, they presumably had the indexing mojo help scale it up. So, transferring the site to a new technology stack will definitely figure into the value proposition of anyone looking to take over Delicious. 

[sellyahoo]: http://mashable.com/2005/12/09/yahoo-acquires-delicious/

In short, any buyers of Delicious will have their hands full—probably more so than Yahoo! did when they first bought it. Don't hold your breath for a bright future.

[they]: http://blog.delicious.com/

## Who cares?

What it comes down to this:

1. If you use Delicious regularly, you care about your bookmarks. 
1. If you're part of an interest group, you care about their bookmarks and they about yours.
1. If you're a random web surfer, you care about finding things relevant to your interests.
1. If you're Yahoo!—well, I would have thought you cared about building a human-powered index of the web, but who knows where your collective heads are at these days.

The important thing is that no owners of Delicious will care in particular about #1 and #2—that is, your bookmarks and those of your colleagues. If they care about anything, it's the overall value of a well-indexed set of web resources to #3 and how they can monetize that.

In other words: If they can't figure out how to monetize the aggregate index, [don't expect them to start caring about your data][backup]. See also: [If you're not paying for it; you're the product][productyou].

[backup]: http://archiveteam.org/index.php?title=Why_Back_Up%3F
[productyou]: http://lifehacker.com/5697167/if-youre-not-paying-for-it-youre-the-product

## What now?

Find someone else to host your bookmarks, maybe you yourself. Think about helping move and/or hosting your colleagues' collections. In particular, look for someone whose motivations are aligned with your own—by way of either money or common interest.

There are plenty of services stepping in to take over from Delicious. [I like pinboard.in][pinboard], because it's very close to the original Delicious, will capture links from other modern services, and it charges *you* money for valuable features.

[pinboard]: http://pinboard.in/

There are also a few self-hosted substitutes, and there will more in the weeks to come. Some take these weekend projects as fodder to discount Delicious in general, but they're missing the point: The basic features of Delicious were never particularly complex—[it's scaling those features up][queue] to web scale [that's hard in a single service][24hrs].

[queue]: http://decafbad.com/blog/2008/07/04/queue-everything-and-delight-everyone
[24hrs]: http://notes.torrez.org/2010/12/learn-to-program-in-24-hours.html

But, you may not need web scale. Also, hosting is getting cheaper every day. Gamers host servers for themselves and their friends, so why not start thinking about hosting a social bookmarking server for interesting people by invite? If you don't have the technical chops yourself, you probably know someone who does.

If this kerfluffle with Delicious does nothing else, it should really get us thinking about hosting our own stuff again. Cheap hosting is not just for startups.

## And after that?

I'd love to see a million social bookmarking sites bloom, both as new public services and self-hosted sites for friends. What this diaspora would lack, though, is the awesomeness of seeing [everything tagged "webdev"][webdev] and [who else bookmarks things you like][youlike]. What made Delicious hard is what made it interesting, and it's possible that no one service will ever again reach a critical mass in social bookmarking.

[youlike]: http://www.delicious.com/url/1ab75a7ce698b75ba1d4ac5517772590
[webdev]: http://www.delicious.com/tag/webdev

But, I don't think Delicious could have scaled up forever and stayed interesting. To address this, I advocated breaking Delicious up into semi-porous cells around loosely defined interest groups. Basically, a lot like [what Reddit does with subreddits][subreddits] and what the [Stack Exchange network does with Q&A topics][stackexchange].

[stackexchange]: https://secure.wikimedia.org/wikipedia/en/wiki/Stack_Exchange
[subreddits]: http://blog.reddit.com/2008/01/new-features.html

As it was, Delicious had grown up around an implicit interest group of webdevs, programmers, tech heads, and the like. So, I figured that spawning more cells would be more interesting than just shoving endless people into the existing one. I also thought it could help scale the site in terms of server architecture, since cells of relevance could be fairly independent.

The problem with a delicious diaspora, though, is the opposite: Scattered sites will offer fragments of larger communities that may not find each other on their own. So, we might like to find a way to piece them back together.

Luckily, I think we have the technology to rebuild Delicious at web scale.

## A tasty future, maybe?

Assume that lots of people have tagged bookmark collections in lots of places. What if those sites all supported [PubSubHubBub][pshb] and/or [RSS Cloud][rsscloud] across feeds by dimensions of tag, user, and URL?

[rsscloud]: http://rsscloud.org/
[pshb]: https://code.google.com/p/pubsubhubbub/

I think you'd have the makings of a loosely coupled and distributed Delicious:

The motivation to maintain individual and group bookmark collections could match up better with those who care about them. You could use [pinboard.in][pinboard]. You could [host your own bookmarks][scuttle]. You could [be a minor hero and host those of the people you find interesting][fans].

[fans]: http://community.livejournal.com/deliciouslymad/18362.html

Then, imagine a layer of search engines, each specializing in collecting a topically-interesting mix of real-time feeds from an array of social bookmarking sites. A future Google could subscribe to hubs pings from all the above and build something interesting and valuable without hosting the bookmarks of pesky, demanding users.

[scuttle]: http://sourceforge.net/projects/scuttle/

I don't think this is super-science rocket surgery. Oddly enough, this is close to how I hoped we'd restructure Delicious back in the 2.0 days. It's what I was getting at with my "[Queue everything, delight everyone][queue]" post. I wanted to see us treat individual users' collections as isolated from the aggregate indexes, connected only by messages and queues. I'm not sure we ended up with something as de-coupled as that, but I didn't have enough visibility into the deep backend to say for sure. Either way, I think this could be an opportunity to address things at web scale without a single company running the show.

## In conclusion

Use the web. Host your own, pay for it, or find someone who values your data. 

You don't need a central blog server to have a Google. And you don't need a Delicious to have social bookmarking. It seems like we're drifting away from this as services like Facebook and Twitter rise to swallow whole categories of web application in monolithic silos.

Seriously, hosting is getting cheaper and easier. Use it and host your own. Yeah, cheap is not free, but is what you're doing worthless to you? There are interesting alternatives that don't involve handing everything over to someone who doesn't actually care about you and your stuff.

And, if it turns out that social bookmarking settles down into a small but highly involved niche of curators, so much the better that they keep their own lights on.

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087678">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://workbench.cadenhead.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=70fe121c9172e9882762d7f28f233567&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://workbench.cadenhead.org/">Rogers Cadenhead</a>
                </div>
                <a href="#comment-221087678" class="permalink"><time datetime="2010-12-20T05:44:29">2010-12-20T05:44:29</time></a>
            </div>
            <div class="content"><p>Hosting is cheap.</p>

<p>Running web applications on your own server securely and reliably is expensive, assuming you value your own time.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087680">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=bb266673ec59acafd5d3ed68238551a5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">JB</a>
                </div>
                <a href="#comment-221087680" class="permalink"><time datetime="2010-12-20T10:05:58">2010-12-20T10:05:58</time></a>
            </div>
            <div class="content"><p>I really like this article.
There should indeed be a system where you can self-host your bookmarks with some CMS and a centralized site for less techy people. All of these bookmarks would be somehow merged to produce intelligent data.
Kind of what Automattic does with WordPress.org and WordPress.com.</p>

<p>Aside, this new Delicious system should have a more "sharing" side with ability for networkers to comment on each bookmark, "redeli" the bookmark (like retweet), etc... Unite bookmark and twitter functions - What Yahoo! should have try to developp during these past five years and failed to.
I already tried to find some link posted in the past in my Twitter stream, and it made me really angry and frustrated. And I didn't succeed. Twitter is nice but still has a too bad signal-to-noise ratio : Tweets are way too much passing, impossible to organized, and replies are not enough differentiated from normal tweet.</p>

<p>What could be an ideal way to go is a WordPress plugin. Based on already there custom post type system, tags system, comments sytem...
WordPress is already a successful product, widely used. It would make easier the process of leaving current doomed delicious to a decentralized system.</p>

<p>And Automattic should integrate this plugin to their WordPress.com blogs. They even would not have to buy Delicious to Yahoo!, just spread the word and invite people to subscribe to their service and import their delicious data.</p>

<p>Finally, imagine that Automattic creates a subdomain of wordpress.com where all the data (bookmarks and data) would be gathered. The plugin on self hosted blogs would propose to the owner to share his personal bookmarks data with this website via an API.
A network could be based on wordpress.com optional subscription.</p>

<p>I don't have any personal or business interest in Automattic (just a WordPress user) but it seems the perfect way to go.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087684">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221087684" class="permalink"><time datetime="2010-12-20T16:49:26">2010-12-20T16:49:26</time></a>
            </div>
            <div class="content"><p>@Rogers: Yeah, I totally glossed over the horrors of sysadmin work and security. I'm kind of bipolar that way. I'm very optimistic about the stuff you can do with all this cheap capacity. But, then, I get my 5th XSS bug of the day to fix and want to change careers. </p>

<p>I tend to think that cheap/disposable VMs and things like Google App Engine can make it easier, though. You can pay for &amp; run just enough to run your app, hopefully keep the maintenance needs down and minimize the attack surface.</p>

<p>I don't think it's that bad for small self-hosted sites like I'm talking about, but then I have a high threshold for crap.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087685">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki"><img src="http://www.gravatar.com/avatar.php?gravatar_id=1d7a7610cb0f02de44be3c4186f82ac3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki">Bill Seitz</a>
                </div>
                <a href="#comment-221087685" class="permalink"><time datetime="2010-12-20T20:09:41">2010-12-20T20:09:41</time></a>
            </div>
            <div class="content"><p>I'm not feeling that optimistic about things like GoogleAppEngine these days. </p>

<ol>
<li><p>How much is GAE mattering to anyone these days? What does that imply for its long-term survival?</p></li>
<li><p>WikiLeaks/TOS etc.</p></li>
</ol></div>
            
        </li>
    
        <li class="comment" id="comment-221087686">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221087686" class="permalink"><time datetime="2010-12-21T02:26:18">2010-12-21T02:26:18</time></a>
            </div>
            <div class="content"><p>@Bill: Well, GAE is mattering to me insofar as it's a decent place to deploy quick python web apps. Of course, that might be bad, since quick python apps aren't really taking advantage of the whole BigTable thing.</p>

<p>As for wikileaks, well... <a href="http://rc3.org/2010/12/03/somebody-can-always-cut-you-off/" rel="nofollow">Somebody can always cut you off</a></p></div>
            
        </li>
    
        <li class="comment" id="comment-221087688">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://evan.status.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d54b3146dc0b7e92cf252e508c280abd&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://evan.status.net/">Evan Prodromou</a>
                </div>
                <a href="#comment-221087688" class="permalink"><time datetime="2010-12-22T17:55:13">2010-12-22T17:55:13</time></a>
            </div>
            <div class="content"><p>I'd love to get your comments on the Bookmark extension we're working on for StatusNet. It uses OStatus (http://ostatus.org/) for distributing bookmarks (that's PuSH + Activity Streams + Salmon) and the Bookmark object type for AS.</p>

<p>It's shaping up nicely; I'm going to set up a sample site for testing v v soon.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    