---
comments_archived: true
date: '2005-01-13T12:21:54-05:00'
excerpt: Feed playlists.  Name it something like `feeds.fss`, and register
    applications to handle that extension.  Give it a MIME-type, and handle
    that too.  Sounds just like M3U and PLS files, to me.  Someone tell
    me why this is a dumb idea.
layout: post
tags:
- syndication
title: Feed "Playlists" versus feed:// URLs
wordpress_id: 587
wordpress_slug: feed-playlists-versus-feed-urls
wordpress_url: http://www.decafbad.com/blog/?p=587
---
<blockquote>Then, this is the point in the cycle where I remember that the real lesson of the past to learn from is from MP3 playlists, where a link needs to pass one or more URLs to a helper app, and that what we really need is to not to link to our feeds, but to a file that links to them.</blockquote>
<div align="right"><small>Source: <cite><a href="http://kalsey.com/blog/2005/01/handling_rss_in_the_browser/index.html#comment-3236">kalsey.com: Handling RSS in the browser, comment by Phil Ringnalda</a></cite></small></div>

You know, back when [feed autodiscovery][autodiscovery] was first whipped up, I thought that it was great.  Today, there's lots of support for it, and it's even found its way into browsers.  But, well, it still doesn't solve the problem of people clicking on those darn candy-like <img src="http://www.decafbad.com/images/xml.gif" /> buttons.

So, then some folks came up with [a new feed:// protocol for feed URLs][feed].  It seems there's just too much [gone wrong with MIME types][mimewrong] and the like.  When I first heard of feed://, I thought it was a weird and ugly hack, but I never piped up because I was too busy at the time, didn't know much of the details, and was too busy to be bothered to catch up.  Besides, other people were [grousing about it][grouse] already.  And, later, I saw that a slew of aggregators were supporting it, so I figured it must not have been that bad, although I still thought it was odd to kludge around a new URL "protocol" just to pass a feed URL to an aggregator.

But, in the comment above, Phil makes a suggestion that seems ideal to me.  Don't link to feeds directly, don't use a funky protocol, link to a "playlist" of feeds.  URLs linking to MP3 playlists (ie. the [informally specified][winamp] M3U and PLS files) seem to get tossed and handled just fine by your preferred media player.  I don't even know how the MIME-type situation is handled with M3U or PLS links, but it seems to work just fine nonetheless.

And, wasn't there this [Really Simple Discovery][rsd] thing published a long time ago?  Point a weblog management tool at your site, it looks for `rsd.xml`, and it gets all the funky URLs it needs for web services from there?

What if we circled back around with [autodiscovery][autodiscovery] and published a file like this:

    <feeds xmlns="http://www.decafbad.com/2005/01/feeds">
        <link rel="alternate" type="application/rss+xml" title="Full RSS" 
             href="http://www.decafbad.com/index.rdf" />
        <link rel="alternate" type="application/atom+xml" title="Full Atom" 
             href="http://www.decafbad.com/atom.xml" />
        <link rel="alternate" type="application/rss+xml" title="Blog-only RSS" 
             href="http://www.decafbad.com/blog/index.rdf" />
        <link rel="alternate" type="application/atom+xml" title="Blog-only Atom" 
             href="http://www.decafbad.com/blog/atom.xml" />
        <link rel="alternate" type="application/rss+xml" title="Links-only RSS" 
             href="http://www.decafbad.com/links/index.rdf" />
        <link rel="alternate" type="application/atom+xml" title="Links-only Atom" 
             href="http://www.decafbad.com/links/atom.xml" />
    </feeds>
    
Name it something like `feeds.fss`, link your candy-like buttons to it, and register applications to handle that extension.  Give it a MIME-type, and handle that too.  Sounds just like M3U and PLS files, to me.  Someone tell me why this is a dumb idea.

**Update**:  Just to clarify, [before anyone thinks][anyone] I'm just railing against Dave Winer personally--I made a comment below about not liking OPML.  Well, I don't, at least not for this particular purpose.  But, my preferences aside, it's undeniable that most aggregators support OPML import/export in one form or another, so the above example could probably be expressed as OPML with all the same data.

Just one thing, though (and this is part of why I don't like OPML for this):  On my machine, OPML outlines and files with an ".opml" extension open with OmniOutliner.  OPML means "outline" to me, not just "list of feed URLs".  I don't want URLs ending in ".opml" to open in an aggregator.  Can we at least use a different extension and/or MIME type?

[anyone]: http://jaeger.blogmatrix.com/weblog/archives/2005_01.shtml#003186
[rsd]: http://archipelago.phrasewise.com/rsd
[winamp]: http://forums.winamp.com/showthread.php?threadid=65772
[mimewrong]: http://pirate.typepad.com/blog/2003/09/problems_with_m.html
[grouse]: http://alpha-geek.com/2004/09/20/inelegant
[autodiscovery]: http://diveintomark.org/archives/2002/05/30/rss_autodiscovery
[feed]: http://nick.typepad.com/blog/2004/06/feeddemon_and_t.html

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090354">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://robbertbroersma.nl/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0709ff27506546c0fd3cd2b2202a0c67&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://robbertbroersma.nl/">Robbert Broersma</a>
                </div>
                <a href="#comment-221090354" class="permalink"><time datetime="2005-01-13T13:25:02">2005-01-13T13:25:02</time></a>
            </div>
            <div class="content">But how does one autodiscover these feed playlists? ;-)

link rel="feed-playlist"? Hehe.</div>
            
        </li>
    
        <li class="comment" id="comment-221090356">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/">l.m. orchard</a>
                </div>
                <a href="#comment-221090356" class="permalink"><time datetime="2005-01-13T13:30:56">2005-01-13T13:30:56</time></a>
            </div>
            <div class="content">Well, for these "playlists", you wouldn't need autodiscovery since you already basically have its contents in the page header.  I suppose you could have a rel="feed-playlist" though :)

But mostly, I see this as being something that replaces a chunk of the "buttons" on my site with one clickable button</div>
            
        </li>
    
        <li class="comment" id="comment-221090357">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://vielmetti.typepad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=41961d4385a56ed0724cb621b8814125&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://vielmetti.typepad.com">Edward Vielmetti</a>
                </div>
                <a href="#comment-221090357" class="permalink"><time datetime="2005-01-13T13:45:31">2005-01-13T13:45:31</time></a>
            </div>
            <div class="content">Isn't this what OPML has been used for in the past?  I'm sure I have a newsreader somewhere that does import/export of that format as a list-of-feeds syntax.

ah yes, this would be it from Bloglines:

http://www.bloglines.com/export

which dumps out what I think you'd want.</div>
            
        </li>
    
        <li class="comment" id="comment-221090358">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://george.hotelling.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=89242476196334aff51840e7c4dadad2&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://george.hotelling.net/">George Hotelling</a>
                </div>
                <a href="#comment-221090358" class="permalink"><time datetime="2005-01-13T13:53:17">2005-01-13T13:53:17</time></a>
            </div>
            <div class="content">I'd vote for rel="feed-trough" but I think Ed's right and that OPML would work.  There just needs to be a MIME type for OPML that newsreaders can hook into.</div>
            
        </li>
    
        <li class="comment" id="comment-221090359">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.eighty-twenty.net/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=12405222b80eca06189b246be2e57ef8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.eighty-twenty.net/blog">Gordon Weakliem</a>
                </div>
                <a href="#comment-221090359" class="permalink"><time datetime="2005-01-13T13:59:40">2005-01-13T13:59:40</time></a>
            </div>
            <div class="content">Small nit: Bloglines exports a list of *my* subscriptions, not a list of feeds my site provides, which is what Les is getting at.  Still, I don't see a particular reason why OPML can't export a list of feeds that a weblog provides.</div>
            
        </li>
    
        <li class="comment" id="comment-221090360">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/">l.m. orchard</a>
                </div>
                <a href="#comment-221090360" class="permalink"><time datetime="2005-01-13T14:26:51">2005-01-13T14:26:51</time></a>
            </div>
            <div class="content">Ook.  Personally, I'd rather avoid OPML and re-use what we have for autodiscovery headers.  I wouldn't necessarily want to see this file used *literally* like a playlist or an OPML subscription list.  

Usually OPML is used for wholesale import/export of your subscriptions, whereas autodiscovery headers tend to be used to provide a choice.  

Not that OPML couldn't be used this way, too, but I do have to admit I don't like OPML much.  But hey, if it solves this problem cleanly, use what works.</div>
            
        </li>
    
        <li class="comment" id="comment-221090361">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=769084f2da2ebbc1e483af3f0e72adaa&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jim</a>
                </div>
                <a href="#comment-221090361" class="permalink"><time datetime="2005-01-13T17:57:02">2005-01-13T17:57:02</time></a>
            </div>
            <div class="content">The problem is that URLs aren't passed to helper applications, right?  So make a browser plugin for application/x.atom+xml that launches the aggregator with the URL, and the problem goes away.  You don't *have* to rely on a browsers "helper application" configuration to do this.  No need for new file formats, no need for new URI schemes, or anything like that.</div>
            
        </li>
    
        <li class="comment" id="comment-221090362">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.thok.org/bloggery"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2545d4ff0ba72eb5d5979186f4b02d85&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.thok.org/bloggery">Mark Eichin</a>
                </div>
                <a href="#comment-221090362" class="permalink"><time datetime="2005-01-13T18:26:34">2005-01-13T18:26:34</time></a>
            </div>
            <div class="content">Most things that parse OPML seem to just suck it all down, when for this usage you want the app (or maybe the user) to just pick one or several...  though I guess m3u files are treated that way too.  I certainly see a trivial "pop up those titles in a list, when the user selects one, throw it at the configured reader" app, if that format is nailed down I might toss one together...

The key is to have a well-known-extension *and* a mime type, so that both lame tools and Proper ones can do the right thing. (The extension can't be OPML of course, because it is the *verb*, but I don't care what syntax is used as long as it has a human readable label...)  Oh, and that extension should replace XML on the candy buttons - because the word XML has "always" been wrong, in that it made about much sense as saying "ASCII" or "UTF-8" there - but it *did* make the value of candy-like buttons really really clear, and it deserves credit for that...

FSS will do, I don't see it in my local (aggressively updated debian) mime.types at least -- there's some artistic value in having it be ".feed" instead though...</div>
            
        </li>
    
        <li class="comment" id="comment-221090364">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8a5273f79cfe7579ad46023f93377aa8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">l.m. orchard</a>
                </div>
                <a href="#comment-221090364" class="permalink"><time datetime="2005-01-13T18:43:02">2005-01-13T18:43:02</time></a>
            </div>
            <div class="content">Jim: A browser plugin - who'd install that? :)

Did you have to install a browser plugin the last time you clicked on the URL to a streaming station to make it startup in WinAmp or iTunes?  This should be just like that.</div>
            
        </li>
    
        <li class="comment" id="comment-221090365">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philringnalda.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2b6c1ba0915a97a81d59ca1e101e6d74&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philringnalda.com">Phil Ringnalda</a>
                </div>
                <a href="#comment-221090365" class="permalink"><time datetime="2005-01-13T18:58:42">2005-01-13T18:58:42</time></a>
            </div>
            <div class="content">The technical problem with OPML is the same one RSS 1.0 now faces with application/rdf+xml being a registered mime-type: RDF-XML is used for RSS feeds, and FOAF, and dozens of other more esoteric things; OPML is used for subscription lists, and outliner data files, and dozens of other more esoteric things, and in neither case do you want a single non-general-purpose app handling them. It would be a bit like having a greeting card printing program register itself as the handler for all JPEGs.

Funny thing about this idea, though: after I mentioned Atom being able to do mime-type handling, with a link rel="start" included in the feed, I looked at the current version of the format spec, and it seems to not do that, but instead has a link to a separate introspection file, which is basically an Atom playlist.</div>
            
        </li>
    
        <li class="comment" id="comment-221090366">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=769084f2da2ebbc1e483af3f0e72adaa&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jim</a>
                </div>
                <a href="#comment-221090366" class="permalink"><time datetime="2005-01-13T22:59:38">2005-01-13T22:59:38</time></a>
            </div>
            <div class="content">> A browser plugin - who’d install that?

The aggregator installer.

The only trouble I can imagine with the plugin idea is if different aggregators all wanted to install their own plugin.  A cooperative approach to the problem wouldn't cause this to happen though.</div>
            
        </li>
    
        <li class="comment" id="comment-221090367">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.kbcafe.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b02f842303e275bacf9a66c710b2ee8a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.kbcafe.com">Randy Charles Morin</a>
                </div>
                <a href="#comment-221090367" class="permalink"><time datetime="2005-01-15T10:49:14">2005-01-15T10:49:14</time></a>
            </div>
            <div class="content">Now that I see this a little more thought out, I don't like the need for a new XML. If everybody just returned the correct media type and added one link element to their RSS channel, then we don't need another XML format.

The need to invent something new when we already have all the building blocks in place, is why we have 4+ versions of RSS.

I put Joe's thoughts together in a proposal for RSS that would compliment Joe's proposal for Atom and bring glee to the world.
http://www.kbcafe.com/rss/?guid=20050114133321</div>
            
        </li>
    
        <li class="comment" id="comment-221090368">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=d9b5edacfae5759ca5083e8f8aed6240&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Brett Lindsley</a>
                </div>
                <a href="#comment-221090368" class="permalink"><time datetime="2005-01-17T08:54:47">2005-01-17T08:54:47</time></a>
            </div>
            <div class="content">On the comment "But how does one autodiscover these feed playlists? ;-)"...

Assuming I have a browser (such as IE), and a URL such as http://www.example.com, the browser will do a default GET on the URL with a MIME type of text/html. Since there is no path, the server typically returns a home page as some prespecified page or by redirection.

To find the feed playlist, the browser could do a default GET on the URL with an accept MIME type of "application/atom+xml" (which is already registered). The browser does not need to know the name of the file or its extension - it just needs to know the server and the MIME type.

The file returned by a default GET with an accept type of application/atom+xml would be the "feed list" for the site. These are really the "atom endpoints" and is nothing more than an Atom feed with links pointing to the feeds and services on the site.</div>
            
        </li>
    
        <li class="comment" id="comment-221090370">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=eb7f2a3ba74af37415ab7df101a86c75&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">l.m. orchard</a>
                </div>
                <a href="#comment-221090370" class="permalink"><time datetime="2005-01-17T11:51:40">2005-01-17T11:51:40</time></a>
            </div>
            <div class="content">Well, the thing about a "playlist" versus autodiscovery is this: 

With autodiscovery, you give your aggregator the human-readable entry point ot a page and the aggregator uses various methods to find the feed.

With a "playlist" or feed:// or MIME types, you've already done the discovery work for the aggregator.  You're looking at the page, mouse hovering over a link to the feed, and you want to click on it, hoping it'll do the right thing.

So, really, you wouldn't ever need to autodiscover a "playlist".  If you want autodiscovery, put the playlist contents in the HTML head tag.</div>
            
        </li>
    
        </ul>
    
        </div>
    