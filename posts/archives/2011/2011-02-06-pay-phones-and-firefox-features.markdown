---
comments_archived: true
date: '2011-02-06T23:32:31-05:00'
layout: post
tags:
- firefox
- browsers
- feeds
- entries
- mozilla
- payphones
- livemarks
title: Pay phones and Firefox features
wordpress_id: 2032
wordpress_slug: pay-phones-and-firefox-features
wordpress_url: http://decafbad.com/blog/?p=2032
---
**TL;DR**: <em>Pay phones have been disappearing, and so might some Firefox features. But, that's not necessarily a bad thing: Some features steal attention from others that are more important. Some could be spun off into add-ons, which are getting easier to make.</em>

**Update:** <em>Feel free to comment on this blog post. But, if you feel strongly about these features, you might get a better discussion with more people on [this thread from the `mozilla.dev.apps.firefox` newsgroup (in Google Groups)](http://groups.google.com/group/mozilla.dev.apps.firefox/browse_thread/thread/fa6f83e781b962a4).</em>

<p style="display: block; margin: 0 0 1em 1em; float:right;">
<a style="display: block;" href="http://www.flickr.com/photos/thomashawk/4925985819/" title="Phone Don't Work No More by Thomas Hawk, on Flickr"><img src="http://farm5.static.flickr.com/4099/4925985819_9ccbb166f7.jpg" width="333" height="500" alt="Phone Don't Work No More" /></a>
<a href="http://www.flickr.com/photos/thomashawk/4925985819/">Phone Don't Work No More</a> by <a href="http://www.flickr.com/photos/thomashawk/">Thomas Hawk</a>
</p>

When's the last time you used a pay phone? For me, it's been over a decade—which is about how long I've had a cell phone.

As it turns out, [pay phones have been disappearing][pay phones disappear] for awhile now. Why? Because pay phones are expensive to keep in working order. If more and more people have wireless phones, it's less likely that any particular pay phone will result in value for the phone company.

[pay phones disappear]: http://www.nytimes.com/2006/02/19/nyregion/19phones.html?_r=1&pagewanted=print

### So what?

The reason I'm thinking about this is that I'm troubled by a few bugs I ran into in Bugzilla:

* [Remove support for microsummaries](https://bugzilla.mozilla.org/show_bug.cgi?id=622051)
* [Remove smart bookmarks support](https://bugzilla.mozilla.org/show_bug.cgi?id=622045)
* [Remove support for tagging bookmarks](https://bugzilla.mozilla.org/show_bug.cgi?id=622047)
* [Get rid of livemark support](https://bugzilla.mozilla.org/show_bug.cgi?id=622049)

Are these like pay phones? 

Each one requires engineering effort to keep working from release to release in Firefox. Some of them have issues in performance and functionality that could use some attention. And, the introduction of [Firefox Sync][], for example, introduces some new complexities in tracking changes.

[Firefox Sync]: https://services.mozilla.com/

But, do any of these features provide enough value to justify continued attention?

### Microsummaries

Ever heard of [microsummaries][]? I have, and I thought they'd be neat. I installed a plugin on my blog to offer a microsummary, and I tried hacking them into Delicious at one point during a Hack Day. 

That was about 4 years ago, and I haven't thought about them much since. Sounds like a pay phone to me.

[microsummaries]: https://wiki.mozilla.org/Microsummaries

### Smart Bookmarks

I always wondered how those out-of-box "Recently Bookmarked", "Recent Tags", and "Most Visited" folders worked in Firefox. Turns out that you can bookmark [queries against the internal Places database][placesuri] as a persistent search folder. Seems pretty keen.

[placesuri]: https://developer.mozilla.org/en/Places_query_uris

But, I've been using Firefox for years and only just learned about this in the past month. The feature's not very exposed, and it's not obvious how to use it. In fact, [the bug to remove it might list the clearest hints on using it](https://bugzilla.mozilla.org/show_bug.cgi?id=622045#c0).

Seems like it might be a good feature to jettison into an add-on, like a pay phone to play with in your basement.

### Tagging Bookmarks

This is a no-brainer for me: [I like tagging my bookmarks](http://www.amazon.com/gp/product/0470037857?ie=UTF8&tag=0xdecafbad01-20&linkCode=as2&camp=1789&%0D%0Acreative=9325&creativeASIN=0470037857). The problem is that I've exceeded 16,000 bookmarks. It's been years since any browser coped well with my corpus of bookmarks—that's one of the reasons I started really liking Delicious.

However, tagging bookmarks in Firefox is kind of rough. The UI isn't awesome, and the database supporting it could use some work. Rather than improve things, though, [bug 622047](https://bugzilla.mozilla.org/show_bug.cgi?id=622047) proposes removing the functionality altogether.

Here, I'm conflicted: I don't use tags in Firefox, because I don't use bookmarks in Firefox. If they worked better, I might use them. Instead, I use [pinboard.in](http://pinboard.in/u:deusx) or a private Delicious clone of my own that copes with my scale—in fact, I got to this scale because those services handle it. So, usage data from me would support the feature's removal despite what I think I'd like to see.

But, does my *suspicion* that I would use a feature justify someone else's time in making it better? I don't think I can ask for that with a straight face. 

Put another way, I could see how that pay phone they removed from the corner gas station could someday come in handy, but should I expect the phone company to keep it clear of graffiti until I come along with quarters?

### Livemarks

Live Bookmarks (or Livemarks) are bookmark folders whose contents are generated from RSS and Atom feeds periodically polled by Firefox. They're feed subscriptions, built into the browser.

So, when I saw [bug 622049][], my first thought was "**Hey! I'm using those!**" 

I just spent a week building an [add-on powered by Livemarks][fireriver]. I've been using [Fireriver](https://addons.mozilla.org/en-US/firefox/addon/fireriver/) on a daily basis, and I've been thinking about trying more experiments. But, if livemarks are going away, then [I'm working toward a dead end][deadend].

[deadend]: https://bugzilla.mozilla.org/show_bug.cgi?id=622049#c11
[fireriver]: http://decafbad.com/blog/2011/01/27/introducing-fireriver-a-river-of-news-for-firefox-4

Like tagging bookmarks, the UI and feed polling code behind livemarks could use some work. My add-on was an attempt to improve the interface, but I did [report a bug][bug 629742] on performance issues raised by my import of around 700 subscriptions from Google Reader. That's just one more strike against livemarks for [bug 622049][].

[bug 629742]: https://bugzilla.mozilla.org/show_bug.cgi?id=629742
[bug 622049]: https://bugzilla.mozilla.org/show_bug.cgi?id=622049 "Get rid of livemark support"

In the end, if livemarks go away [I'd still have Google Reader][mygr]. I'll have blown a week or so on this add-on, though I did learn some interesting things. And, if Google Reader goes away, [it's not like I've never written a feed reader before][rssbook].

[mygr]: http://www.google.com/reader/shared/l.m.orchard
[rssbook]: http://www.amazon.com/gp/product/0764597582?ie=UTF8&tag=0xdecafbad01-20&linkCode=as2&camp=1789&c%0D%0Areative=9325&creativeASIN=0764597582

Still, this one bothers me the most, in terms of what I want to see for the web itself. [This is better explored in another blog post][browserfeeds], but I want my browser to do more of the surfing for me. I think of bookmarks as long-term relationships to web resources—and livemarks turn those static links into live updates. I can think of a lot of uses for this functionality built into the browser, rather than delegated to [lobster traps][] and content silos.

[browserfeeds]: http://decafbad.com/blog/2011/01/27/what-should-be-done-about-feeds-in-browsers
[lobster traps]: http://ascii.textfiles.com/archives/2848

But, livemarks do complicate things for Firefox engineers. They don't interact well with Sync, and the feed polling code has cases where it can really drag down the whole browser. And, of course, livemarks aren't good for much when a laptop's closed or if Firefox isn't running. Granted, the former happens more often than the latter for me, but we're not talking about an always-on server here in any case.

Are livemarks a pay phone feature? Personally, I don't think so. I think Firefox is diminished if it loses this feature, rather than taking it further.

Although I'm reticent to do so, I might just rebuild livemarks in some form with an add-on if they go away. The good news is that add-ons are getting easier to write, which also deserves its own blog post. The bad news is, I might not have time or motivation to do the work myself. But, either, I'm not all that comfortable clamoring for other people's time for this [beyond registering my disagreement](https://bugzilla.mozilla.org/show_bug.cgi?id=622049#c11) and [backing off](https://bugzilla.mozilla.org/show_bug.cgi?id=622049#c14).

### Conclusion

Most of these things do indeed look like pay phones to me. Most of them seem not to offer enough value to pay for upkeep. 

Livemarks are the exception, in my mind, but I don't have answers as to how to fix their flaws. Maybe they're inherently doomed in the face of ubiquitous computing, maybe they're just in need of a better execution. But, I won't expect other busy engineers to drop what they're doing to come up with those answers in the meantime.

**Update:** <em>Feel free to comment on this blog post. But, if you feel strongly about these features, you might get a better discussion with more people on [this thread from the `mozilla.dev.apps.firefox` newsgroup (in Google Groups)](http://groups.google.com/group/mozilla.dev.apps.firefox/browse_thread/thread/fa6f83e781b962a4).</em>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085107">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=023d45129c2e79e103635a8df49811c6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Bo</a>
                </div>
                <a href="#comment-221085107" class="permalink"><time datetime="2011-02-07T05:38:07">2011-02-07T05:38:07</time></a>
            </div>
            <div class="content"><p>I don't care about microsummaries or smart bookmarks, but Firefox without tags would totally break how I interact with my several hundred bookmarks.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085108">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://jhatax.blogspot.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=3af6377feb65f03d2455cdf9c70ca538&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://jhatax.blogspot.com/">Manoj Mehta</a>
                </div>
                <a href="#comment-221085108" class="permalink"><time datetime="2011-02-07T06:20:40">2011-02-07T06:20:40</time></a>
            </div>
            <div class="content"><p>Agree with you 100% of the way.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085109">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=bfba18494ff430d4694380f97a5106a3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Anon</a>
                </div>
                <a href="#comment-221085109" class="permalink"><time datetime="2011-02-07T06:24:22">2011-02-07T06:24:22</time></a>
            </div>
            <div class="content"><p>Interesting read, but it hurts, after spending a lot of time searching for barely-existent documentation, to configure a great system with smart bookmarks keeping track of my tags and bookmark organizations. I'd really miss the feature and I don't think a bookmark can provide the same level of functionality.
On the other hand, I loathe live bookmarks and I use google reader and minor desktop applets to fetch site updates.</p>

<p>Notice that what I consider useful and productive you consider a pay phone. Firefox's strength over its competition is the customization power (because no matter how you put it, Chrome's extensions are laughable in comparison). I think that, out of the 4 features, only the first is actually useless to most users.</p>

<p>Smart bookmarks were neglected after getting out of the 3.0 heat, while pursuit for other things such as Ubiquity, Jetpacks and Panorama took place.
I hope Panorama doesn't get abandoned this fast, as I really see myself using it (although can't upgrade until imglikeopera does).</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085112">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221085112" class="permalink"><time datetime="2011-02-07T07:37:13">2011-02-07T07:37:13</time></a>
            </div>
            <div class="content"><p>Would Smart Bookmarks still be useful to you, if they were enabled with an add-on? I suspect it could be done, which might be win-win for core Firefox devs vs people interested in carrying the feature foward in an add-on</p>

<p>I never knew what Smart Bookmarks were until this month, and I've been using Firefox since the beginning. So, yeah, they look pay-phone-y to me.</p>

<p>Nonetheless, it might be interesting to see what kind of system you have working with them. They seem like they could be pretty powerful</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085119">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=5f53c0fae4a569280d0987a6fd5a699e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">blufive</a>
                </div>
                <a href="#comment-221085119" class="permalink"><time datetime="2011-02-07T08:35:39">2011-02-07T08:35:39</time></a>
            </div>
            <div class="content"><p>(pardon me for butting in)</p>

<p>yes, an add-on would work for me.  </p>

<p>My system is pretty much that suggested by David Regev below: use the smart bookmarks to create a "folder" system based on tags.  This is way easier to maintain/update than manually sorted folders, and allows bookmarks to exist in multiple locations.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085126">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=bfba18494ff430d4694380f97a5106a3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Anon</a>
                </div>
                <a href="#comment-221085126" class="permalink"><time datetime="2011-02-07T12:07:12">2011-02-07T12:07:12</time></a>
            </div>
            <div class="content"><p>If the full capabilities of both tagging and places queries are available, then yes, as long as it's not one of those "can't update firefox until it updates 2 months later" extensions...But from the sounds of it the whole backend is going to be removed or simplified. Will it be possible for an addon to get there?</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221085111">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=764e805358f07949f88ea94d87fc6a46&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">David Regev</a>
                </div>
                <a href="#comment-221085111" class="permalink"><time datetime="2011-02-07T07:09:59">2011-02-07T07:09:59</time></a>
            </div>
            <div class="content"><p>I’ll add some input from my own experience with bookmark tagging. I have bookmarks going back over a decade. Until about a year ago, they were a huge mess and nearly impossible to deal with. The big problem was that the folders were too restrictive and, so, the placement of many bookmarks was pretty arbitrary. So, I finally decided to go through every bookmark, delete all the useless stuff (the vast majority of bookmarks), and attach one or more tag to each bookmark. It took about a week. The result: the organization system now makes sense, and I have few enough bookmarks that I actually use them quite a lot. The problem is that the interface is designed for folders and not tags. I cannot drill down tags like I can with folders. Tags don’t appear in the bookmarks menu like folders. I had to create smart bookmarks to work around this limitation. Even with these artificial limitations in the interface, tags are <em>much</em> more humane than folders.</p>

<p>My suggestion: deprecate folders altogether. In a future version of Firefox, migrate everyone to tags by converting them to tags. Moreover, fix the interface so as to make sense for tags instead of folders. Do that, and you’ll find that people start using tags. I agree that it’s kind of overkill to have both folders and tags. But the solution is to get rid of the archaic system of forced hierarchy (folders) and give tags the chance they deserve (by greatly improving the tagging interface).</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085116">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221085116" class="permalink"><time datetime="2011-02-07T07:40:18">2011-02-07T07:40:18</time></a>
            </div>
            <div class="content"><p>FWIW, if I used bookmarks in Firefox, this is exactly what I'd do. I really prefer using tags over folders, for escaping restrictions of hierarchy and for organizing on the fly</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085121">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=7006484d9601d2ccbfcb0c110bd23668&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Asa Dotzler</a>
                </div>
                <a href="#comment-221085121" class="permalink"><time datetime="2011-02-07T09:01:44">2011-02-07T09:01:44</time></a>
            </div>
            <div class="content"><p>Folders currently have the advantage of "open all in tabs" which is kind of nice for batches of sites you commonly access at the same time. I'm not saying that the same feature couldn't be implemented for groups of tags, but currently folders have it and tags don't.</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085136">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=764e805358f07949f88ea94d87fc6a46&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">David Regev</a>
                </div>
                <a href="#comment-221085136" class="permalink"><time datetime="2011-02-07T18:55:10">2011-02-07T18:55:10</time></a>
            </div>
            <div class="content"><p>Asa: That’s actually already possible for tags (such as when exposed as smart bookmarks). The command doesn’t appear in the submenu, like it does for folders, but it’s there in the context menu. You can also middle-click on them instead.</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221085122">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=0d86a43816e04d32defb7fad91c1c33e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Matěj Cepl</a>
                </div>
                <a href="#comment-221085122" class="permalink"><time datetime="2011-02-07T09:22:12">2011-02-07T09:22:12</time></a>
            </div>
            <div class="content"><p>You don't need to look through tags ... just throwing bunch of them in the AwesomeBar will put the appropriate links to the top of the list. From all mentioned payphones tags would really hurt me, and I am on the fence with LiveBookmarks ... I don't use them (rss2email works better for me for reading feeds), but I distrust The Cloud and I don't like the trend to save all our personal data with an advertising agency for their free use. Certainly better UI would help.</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221085113">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://felix.plesoianu.ro/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e0ad94a966cfab0b02d938e4bf9cd1c1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://felix.plesoianu.ro/">Felix Pleșoianu</a>
                </div>
                <a href="#comment-221085113" class="permalink"><time datetime="2011-02-07T07:39:30">2011-02-07T07:39:30</time></a>
            </div>
            <div class="content"><p>"I’ve been using Firefox for years and only just learned about this in the past month. The feature’s not very exposed, and it’s not obvious how to use it."</p>

<p>That's the problem right there. It's like putting a payphone into a basement, inside a broom closet with a sign on the door labelled "beware the leopard" and then complaining nobody uses it.</p>

<p>"And, of course, livemarks aren’t good for much when a laptop’s closed or if Firefox isn’t running."</p>

<p>Neither is a dedicated RSS client by that logic. I agree that live bookmarks are largely useless (too fussy about the feed format is what bothers me most about them), but you're using the wrong argument.</p>

<p>More generally, I agree that these features are rather obscure and may not be missed by most people, but do they complicate and slow down Firefox more than, say, XUL? Seriously, Opera manages to have a proper RSS reader, mail client and lots of other features built in while being much smaller and lighter than Firefox. And it's a proprietary browser. Aren't you picking on small issues while ignoring the large ones?</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085117">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221085117" class="permalink"><time datetime="2011-02-07T07:59:28">2011-02-07T07:59:28</time></a>
            </div>
            <div class="content"><p>"It’s like putting a payphone into a basement, inside a broom closet with a sign on the door labelled “beware the leopard” and then complaining nobody uses it."</p>

<p>That's true, and part of what bothers me. Seems like some features can get axed with usage data as the rationale, but they could be made better.</p>

<p>But, whether any particular feature got a fair shake or not, dev priorities change.</p>

<p>"Neither is a dedicated RSS client by that logic."</p>

<p>Actually, the argument I left out is ubiquitous computing. That is desktop to laptop to mobile to TV to car. </p>

<p>I stopped using a dedicated RSS client around 4 years ago when my phone got capable of skimming feeds and I couldn't get to NetNewsWire on my Mac from it.</p>

<p>"More generally, I agree that these features are rather obscure and may not be missed by most people, but do they complicate and slow down Firefox more than, say, XUL?"</p>

<p>I can't really speak to that... I'm more webdev than core Firefox dev. You can read the bugs, though, to see the arguments made. Though, from what I hear, XUL isn't really such a big problem, especially not since the JS code behind the scenes enjoys the same performance boosts as JS in page content.</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        <li class="comment" id="comment-221085118">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=1231dd25c2fce9325d24713406c52ebc&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Mardeg</a>
                </div>
                <a href="#comment-221085118" class="permalink"><time datetime="2011-02-07T08:06:49">2011-02-07T08:06:49</time></a>
            </div>
            <div class="content"><p>It seems most of these revolve around the hassle they've become for Firefox Sync to support. Here's a thought: Sync <em>was</em> an extension to begin with, let's move it back there after Firefox 4 is released and it fails to cope with the massive influx of people using it, instead of killing the other features in an attempt to prevent Sync dying.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085120">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=01822efaf66e4b81d6f947cba7e0613a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">FP</a>
                </div>
                <a href="#comment-221085120" class="permalink"><time datetime="2011-02-07T09:00:15">2011-02-07T09:00:15</time></a>
            </div>
            <div class="content"><p>Do the developers not realise that driving away power users doesn't just lose you a few users it loses you a whole network of users since many power users maintain their friends and families PCs too? It also loses you popular support from tech blogs and sites etc.</p>

<p>Anyway, I hope they don't remove tagging and livemarks that would be painful, like Mardeg, I'd much rather lose sync than these features.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085123">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://npinp.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=81ba937c565c72bdb6c9b80105f6b385&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://npinp.com">Nathaniel Tucker</a>
                </div>
                <a href="#comment-221085123" class="permalink"><time datetime="2011-02-07T10:02:06">2011-02-07T10:02:06</time></a>
            </div>
            <div class="content"><p>Please don't remove bookmark tagging! I like being able to find webpages using the awesomebar, and I couldn't do that without control over labeling. I don't see what's so horrible about the UI - you just enter what you want.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085124">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.michaellefevre.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a8800fcd6ba0714d8e0f6d07ac7e260f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.michaellefevre.com/">Michael Lefevre</a>
                </div>
                <a href="#comment-221085124" class="permalink"><time datetime="2011-02-07T10:50:16">2011-02-07T10:50:16</time></a>
            </div>
            <div class="content"><p>I can't say I make a lot of use of any of those features. I do use tags, but I could do the same thing with bookmark folders.</p>

<p>The trouble is that Firefox is still introducing features which aren't very polished or discoverable. If Firefox 6 is going to drop support for, say, sync or panorama, then it has been a bit of a waste of core development time implementing those features, hasn't it?  Is there a way of getting development to focus on improving the existing stuff, rather than focusing on new features?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085125">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://xhva.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8881df9aa39a9862bdfd29c6f2cca338&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://xhva.net">Andy</a>
                </div>
                <a href="#comment-221085125" class="permalink"><time datetime="2011-02-07T11:38:11">2011-02-07T11:38:11</time></a>
            </div>
            <div class="content"><p>Mardeg has a point. Throughout FF4's development it's felt like any new team or project can make drastic changes to the browser with seemingly flimsy justification (see the UI team's constant fiddling with a stable interface to save miniscule amounts of vertical space and emulate Chrome's aesthetic). Sync is a nice feature but it needs time to bake just like everything else; we shouldn't rip out other features that have existed for years to prop up something unproven.</p>

<p>In some ways I think the Test Pilot program has been dangerous; the statistics gathered tend to result in design decisions that favour the tyranny of the majority while breaking long-term usage patterns employed by smaller groups ("power users" as they're affectionately called, also known as Firefox's Chief Proponents). This popularist-majority mindset can be seen in the design decisions regarding the status bar, tab positioning, the hiding of the bookmark bar on first launch after upgrade and the new awful addons manager.</p>

<p>It's also lame to see it argued on the bugtracker that tags should be stored in the cloud but that we shouldn't use the new feature that does exactly that to put them there. Who knows which direction Sync will go a year after release? Maybe we'll gain the ability to set bookmarks public and browse them on a website like Delicious... surely we'll need the tag info then.</p>

<p>One last thing: this may be a little snarky, but if a major argument for removing tagging support is an underexposed and unpolished UI then Sync is doomed. A menu entry that shows a dialog with no description of the feature isn't the best way to sell it. I still don't have a clue whether it's working or not.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085127">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://xhva.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8881df9aa39a9862bdfd29c6f2cca338&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://xhva.net">Andy</a>
                </div>
                <a href="#comment-221085127" class="permalink"><time datetime="2011-02-07T12:16:15">2011-02-07T12:16:15</time></a>
            </div>
            <div class="content"><p>Mardeg has a point. Throughout FF4's development it's felt like any new team or project can make drastic changes to the browser with seemingly flimsy justification (see the UI team's constant fiddling with a stable interface to save miniscule amounts of vertical space and emulate Chrome's aesthetic). Sync is a nice feature but it needs time to bake just like everything else; we shouldn't rip out other features that have existed for years to prop up something unproven.</p>

<p>In some ways I think the Test Pilot program has been dangerous; the statistics gathered tend to result in design decisions that favour the tyranny of the majority while breaking long-term usage patterns employed by smaller groups ("power users" as they're affectionately called, also known as Firefox's Chief Proponents). This popularist-majority mindset can be seen in the design decisions regarding the status bar, tab positioning, the hiding of the bookmark bar on first launch after upgrade and the new awful addons manager.</p>

<p>It's also lame to see it argued on the bugtracker that tags should be stored in the cloud but that we shouldn't use the new feature that does exactly that to put them there. Who knows which direction Sync will go in a year after release? Maybe we'll gain the ability to set bookmarks public and browse them on a website like Delicious... surely we'll need the tag info then.</p>

<p>One last thing: this may be a little snarky, but if a major argument for removing tagging support is an underexposed and unpolished UI then Sync is doomed. A menu entry that shows a dialog with no description of the feature isn't the best way to sell it. I still don't have a clue whether it's working or not.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085128">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=0f0f4e5c8446a0f6fd5bd888760eee02&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Benedikt P.</a>
                </div>
                <a href="#comment-221085128" class="permalink"><time datetime="2011-02-07T12:55:49">2011-02-07T12:55:49</time></a>
            </div>
            <div class="content"><p>My bookmarks are organized in a rather flat manner with little to no sub-folders.Being able to tag a bookmark and search and save the searchs (Smartbookmarks?) are much more useful to me. (I have hundreds of bookmarks not thousands, though)</p>

<p>Microsummaries sound useful in theory but I think I never found one in the wild.</p>

<p>Livebookmarks are unnecessary for me. Firefox is just not a real feed reader.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085130">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.rushyo.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=87cac0a523e2334c0dbf220b5ffd1bc1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.rushyo.com">Danny Moules</a>
                </div>
                <a href="#comment-221085130" class="permalink"><time datetime="2011-02-07T13:01:25">2011-02-07T13:01:25</time></a>
            </div>
            <div class="content"><p>Are Livemarks really a niche thing? I started using them after seeing a large number of users using them and wondering what I was missing. Now my entire bookmarks toolbar is full of them.</p>

<p>We don't even have metrics to back this up, do we? I would have never anticipated that this would be a feature worth dropping.</p>

<p>Anyway, I've replied to the bug. I wonder what we'll get from test pilot if it goes that way..</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085131">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://ironymark.diwan.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=6e59b9b65ca5d86670c053d1da92d964&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://ironymark.diwan.com">Adil Allawi</a>
                </div>
                <a href="#comment-221085131" class="permalink"><time datetime="2011-02-07T13:59:29">2011-02-07T13:59:29</time></a>
            </div>
            <div class="content"><p>"The payphone in the basement" is a good idea for (to use a horrible phrase from Yahoo) sunsetting little-used browser features into add-ons. But the problems happen when new browser versions come out that are incompatible with these add-ons and no one is around to update them. I will have this issue moving to Thunderbird 3.3 and a number of add-ons that i depend on will no longer work.</p>

<p>My suggestion is to make sure such features are reimplemented in new browser APIs like JetPack (and update JetPack to support the hooks needed by these features). Then make sure the JetPack API is stable enough not to break in future browsers.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085132">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=ff6fac10b30d4f19bc083164c4c9b328&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Gruber</a>
                </div>
                <a href="#comment-221085132" class="permalink"><time datetime="2011-02-07T14:14:35">2011-02-07T14:14:35</time></a>
            </div>
            <div class="content"><p>Tags are the best feature introduced that was introduced with Fx 3.0! I don't need the other stuff, I don't need folders but tags (together with the Awesome-Bar) are one of the two reasons I love Firefox (the other is the extensibility through add-ons, and I am thinking about a particular that ATM can't be ported to other browsers).</p>

<p>BTW, I always thought pay phones were heavily subsidised.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085133">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://mysite.verizon.net/alanjstr/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=84246c75f9a33c18e9130f5bffe10eef&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://mysite.verizon.net/alanjstr/">alanjstr</a>
                </div>
                <a href="#comment-221085133" class="permalink"><time datetime="2011-02-07T14:21:22">2011-02-07T14:21:22</time></a>
            </div>
            <div class="content"><p>Of those features, I see more potential for Smart Bookmarks/Tagging than I do for the other two.</p>

<p>If a website has a microsummary, I have no idea.  I don't know where it would show up in my web browser.  I had to Google to find The MozillaWiki describing them as "Microsummaries are better for labeling bookmarks than static page titles, because they give users quicker access to the most interesting information behind a bookmark, and they give web sites a way to notify users of updates and entice them to revisit the site."  If you have your bookmarks open constantly, and are monitoring something, then sure that would be helpful.  But usually if we want real-time monitoring of something, there are other methods that we use.  We have moved to increasing screen real-estate, making tabs into just icons and hiding the bookmark toolbar.  </p>

<p>I never got the hang of LiveMarks in the browser.  That definitely has a lot to do with UI.  But trying to turn a web browser into a full-fledged feed-reader, as part of the core technology, isn't the right direction.  There are addons, websites, and stand-alone readers that do a much better job.  The more RSS feeds you subscribe to, it quickly overwhelms the basics.  Personally, I do like having the little orange button in my URL bar to subscribe (I have it auto-routing to Google Reader), but that's mostly because it provides a fast way to subscribe instead of me hunting for a link.</p>

<p>Lastly, Smart Bookmarks and Tags have a lot of potential, especially as the volume of bookmarks grows.  I don't use either of them, but I wouldn't want to see them gone.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085135">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=ff6fac10b30d4f19bc083164c4c9b328&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Gruber</a>
                </div>
                <a href="#comment-221085135" class="permalink"><time datetime="2011-02-07T14:35:08">2011-02-07T14:35:08</time></a>
            </div>
            <div class="content"><p>One more thing, I wonder if these arguments against these "pay phones" could/will also be made for Panorama and Tab Groups, I personally wouldn't shed a tear for it.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085138">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=5406d41679a6d770aac64a86a1d1c815&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">augustm</a>
                </div>
                <a href="#comment-221085138" class="permalink"><time datetime="2011-02-07T19:16:39">2011-02-07T19:16:39</time></a>
            </div>
            <div class="content"><p>Firstly SQL has been broken in Firefox 3.6.x and 4.0b since the summer.
It makes searching on tags in bookmarks almost impossible. 
So tags are mostly broken. Any data on hot areas is unusable- the interface
does not work.</p>

<p>Sync has deleted, duplicated, re-ordered my bookmarks multiple times.
Disaster! Worse than anything else, multiple data-loss bugs, requires
restore from backup (Mac's have time machine)</p>

<p>There is not document that says what Sync does. How does it manage
the use of multiple machines? I am on a campus where I read, mark and
delete in five departments. How do I manage asynchronous marking and deleting?
I often turn on/off machines quickly. What is my mental model of the final state?</p>

<p>I should have stayed with rync!</p>

<p>Bookmarks needs a project leader</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085139">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=0aca37f58793f486f52b9b211bca0c42&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">James Napolitano</a>
                </div>
                <a href="#comment-221085139" class="permalink"><time datetime="2011-02-08T08:49:27">2011-02-08T08:49:27</time></a>
            </div>
            <div class="content"><p>About the idea of moving features into addons: dbaron had a nice post a while back about the drawbacks of this approach: http://dbaron.org/log/2006-01#e20060122a
The situation with addons.mozilla.org may have changed since then, but I think a lot of what he says still holds.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085140">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=84db05f42e637a27a2a2922d5850c731&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Mook</a>
                </div>
                <a href="#comment-221085140" class="permalink"><time datetime="2011-02-08T08:54:22">2011-02-08T08:54:22</time></a>
            </div>
            <div class="content"><p>Seems like for all of these features, the problem is that the UI wasn't really that good.  It's somewhat difficult to create microsummaries or smart bookmarks (as a user, without the web site supporting it).  Tags are easy to create, but are presented everywhere as a single list, which makes large numbers of them infeasible (rather than something closer to a tag cloud).  Livemarks... well, they basically have no useful way of showing the summary, just... half a headline :p  Only if it actually opened the feed preview page rather than a useless dropdown...</p>

<p>As I understand it, it's mostly things getting cut to make the release, then... well, just getting dropped on the floor once the release is out, really.  There's never a focus on polishing things.  But that's pretty much true of all the projects I've looked close enough at, sadly.</p>

<p>I wonder which ones would be next?  Devtools, with the backend sticking around for Firebug? More changes to the URL display on hovering links? Firefox menu-button?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085141">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=26d56d0c6c57d3b7fdd01a15917ecfde&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">csb</a>
                </div>
                <a href="#comment-221085141" class="permalink"><time datetime="2011-02-08T20:09:45">2011-02-08T20:09:45</time></a>
            </div>
            <div class="content"><p>Bookmark tagging is one of the best features of Firefox.  If anything the problem is that as currently implemented it has not enabled more great addons like tagsieve [1].</p>

<p>[1] https://addons.mozilla.org/en-US/firefox/addon/tagsieve/</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085142">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://stuart.woodward.jp"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5986cb06ad9e14631dcb08d4a3966a70&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://stuart.woodward.jp">Stuart Woodward</a>
                </div>
                <a href="#comment-221085142" class="permalink"><time datetime="2011-05-18T14:45:46">2011-05-18T14:45:46</time></a>
            </div>
            <div class="content"><p>Several years ago, my wife laughed when I accidentally bought a prepaid payphone card instead of train card. It sat in my wallet for years until the day my cellphone battery died and all I had was my WIFI iPad. I looked up her phone number in my contacts and called her from the nearest payphone though it was a struggle to find the payphone in one of the most modern building complexes here in Tokyo.</p>

<p>Another payphone story that came to mind was shortly after the recent Earthquake. Tens, if not hundreds of thousands of people walked home. Some walking several hours. In my short walk to camp out a nearby friend's house, I saw people queuing up for payphones after their mobile phones had become unusable due to the mobile network congestion. The line to use the payphone was hundreds of people long. I'm sure that the maximum queue length at that phone in the previous 10 years was 2 people. This experience changed my mind. </p>

<p>There are much fewer payphones than their heyday 15 years ago when we had payphones with ISDN jacks to plug in your laptop. It is difficult to find one now. Also, payphones are clunky and in Tokyo at least, very reliable. They are going to work, if nothing else works.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    