---
comments_archived: true
date: '2008-08-04T13:21:55-04:00'
layout: post
tags:
- metablogging
- delicious
- yahoo
- bookmarking
- entries
- delicious20
title: Delicious 2.0 is more than a pretty new face
wordpress_id: 1239
wordpress_slug: delicious-20-is-more-than-a-pretty-new-face
wordpress_url: http://decafbad.com/blog/?p=1239
---
I'm no longer at Yahoo! and I no longer work on [Delicious](http://delicious.com), but I'm still a huge supporter.  And, since I'm pretty sure everyone over there is either burnt out or still insanely busy at the moment, it might be awhile before anyone tells the full story of what this relaunch offers.  As it is, even I only know a bit of what all went into this effort.

So, off the top of my head, I thought I might point out **just a few** of the easily-missed improvements the new site offers beyond the great new love-it-or-hate-it visual redesign that seems to have occupied most of the discussion I've seen so far:

**Search works and is incredibly fast.**  In fact, search may really be the real star of the redesign show here—especially since del.icio.us often took 30 seconds or more for a simple search, rendering it all but useless.  Today, though, it's at ludicrous speed in comparison—and so finally, the real power of search applied to social bookmarking might start to shine with the critical mass of content found by real people using Delicious.

To scratch my own itch, I've created [an unofficial OpenSearch search engine plugin for Delicious](http://mycroft.mozdev.org/developer/devlist.html?email=l.m.orchard%40pobox.com) on Mycroft.  Though I think it comes along with [the browser extensions](http://delicious.com/help/tools), I've yet to find this for [autodiscovery](http://mycroft.mozdev.org/developer/hosting.html) from the site itself.

**The notes field in bookmarks has been expanded from 255 to 1000 characters.**  Yes, this means that you can now include long running quotes from pages, or complete paragraphs of rambling discourse. 

**[The feeds have all been overhauled and reorganized](http://delicious.com/help/feeds).**  An attempt at backward compatibility was made, but the old feed URLs are all deprecated.  Replacing these, there's now [a common and consistent URL namespace for feeds across formats](http://delicious.com/help/feeds).  

Almost all RSS feeds have [JSONP](http://bob.pythonmac.org/archives/2005/12/05/remote-json-jsonp/) counterparts, and further feed formats could be considered.  Additionally, the old mix of RSS 1.0 and 2.0 has been dropped in favor of RSS 2.0 format across the board to support podcast and media enclosure elements consistently.  The [linkrolls, tagrolls, network badges, and tagometers](http://delicious.com/help/tools) now all use the new JSONP feeds—and the widgets can be examined as example code in using the feeds.

**Tag bundles can now be viewed as combined bookmark views, complete with feeds.**  This augments bundles from a simple visual organization tool to a more powerful content aggregation function.  Personally, I never had much use for tag bundles until now, but since they can actually be used to partition tags and bookmarks I might actually take the time to use them.  Check out these example URLs:

* [http://delicious.com/britta/bundle:art%2Fdesign](http://delicious.com/britta/bundle:art%2Fdesign)
* [http://feeds.delicious.com/v2/rss/britta/bundle:art%2Fdesign](http://feeds.delicious.com/v2/rss/britta/bundle:art%2Fdesign)

**Bundles now work for tags, network contacts, and subscriptions.**  This means, for example, that you can partition your network contacts into topical groups.  From there, you can subscribe to those partitioned bookmarks in different folders in readers, or use the bundled bookmark views in mashups through JSON feeds.  Check out these example URLs:

* [http://delicious.com/network/bkerr/bundle:Brickyard](http://delicious.com/network/bkerr/bundle:Brickyard)
* [http://feeds.delicious.com/v2/rss/network/bkerr/bundle:Brickyard](http://feeds.delicious.com/v2/rss/network/bkerr/bundle:Brickyard)

**Network member and fan feeds now include the date when the contact was added.**  Pro tip: Subscribe to fan feeds to see when new people have started following your bookmarks.

**[Several previously undocumented parts of the V1 API have now been documented](http://delicious.com/help/api).**  In particular, the following new parameter combinations have been used with the browser extensions for primitive bookmark sync:

* https://api.del.icio.us/v1/posts/all?hashes
* https://api.del.icio.us/v1/posts/all?meta=yes
* https://api.del.icio.us/v1/posts/all?fromdt={DT}&todt={DT}
* https://api.del.icio.us/v1/posts/all?start={##}&results={##}

**The posts/all API URL works again for users with large collections.**  With my 11k+ bookmarks, del.icio.us was keeling over with the attempt to assemble and deliver my entire collection with a posts/all call.  Now, however, Delicious 2.0 appears able to handle this call for my account.

**Easter eggs have been rotated and recalibrated.** No, I'm not going to tell you what or where or how many they are.

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085469">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221085469" class="permalink"><time datetime="2008-08-05T02:31:52">2008-08-05T02:31:52</time></a>
            </div>
            <div class="content"><blockquote>
  <p>Since I’m pretty sure everyone over there is either burnt out or still insanely busy at the moment, it might be awhile before anyone tells the full story of what this relaunch offers.</p>
</blockquote>

<p>Admit it, Les, you just got impatient after building a bunch of shiny toys that no one at Yahoo! seemed to be coming forth to tell the world about them. :) (I would be miffed too.)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085470">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.yining.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cd8af1a8b7c1cfdca49fb19d4a98a7bc&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.yining.org">Yining</a>
                </div>
                <a href="#comment-221085470" class="permalink"><time datetime="2008-08-05T06:51:44">2008-08-05T06:51:44</time></a>
            </div>
            <div class="content"><p>one thing in the new version that disappoints me is the tab-to-complete feature is gone. It was replaced with a drop-down list which not only costs me more finger/hand movement but also breaks my daily usage habit of del.icio.us. Oh, maybe I can write a GMscript to scratch my own itch....</p>

<p>Btw, regarding the search, I find using a keyworded bookmark is much faster. For example, I could setup keyword 'del' and just type 'del webdev+openid' to search all my bookmarks tagged with these two keywords. One plus point, it works on SeaMonkey too (which doesn't support opensearch yet).</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085471">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.osunick.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e4b643246238e03a2a481a9a28a3c576&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.osunick.com">Nick</a>
                </div>
                <a href="#comment-221085471" class="permalink"><time datetime="2008-08-05T06:56:05">2008-08-05T06:56:05</time></a>
            </div>
            <div class="content"><p>Yay!  So glad you wrote this, Les!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085473">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://pauldwaite.co.uk/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=240d5b71429f8b782b029e19349ec435&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://pauldwaite.co.uk/">Paul D. Waite</a>
                </div>
                <a href="#comment-221085473" class="permalink"><time datetime="2008-08-05T17:07:03">2008-08-05T17:07:03</time></a>
            </div>
            <div class="content"><blockquote>one thing in the new version that disappoints me is the tab-to-complete feature is gone. It was replaced with a drop-down list which not only costs me more finger/hand movement but also breaks my daily usage habit of del.icio.us</blockquote>

<p>Amen.</p>

<p>Also,the option to delete a bookmark from its own page seems to have disappeared. I have to find it in my list of bookmarks, which isn’t always easy when it’s been there for a couple of weeks.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085475">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://pauldwaite.co.uk/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=240d5b71429f8b782b029e19349ec435&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://pauldwaite.co.uk/">Paul D. Waite</a>
                </div>
                <a href="#comment-221085475" class="permalink"><time datetime="2008-08-05T17:09:25">2008-08-05T17:09:25</time></a>
            </div>
            <div class="content"><p>Sorry, that sounded a bit negative. I do love how autocomplete now only offers me tags that I’ve used. And it is kinda neat to see how many times I’ve used each one, but I’d give that up to have the old tab-to-autocomplete back. Way too much thinking involved with the menu.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085476">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.innerlogics.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=fdf1879b5ea790d6b734a4e953bd9273&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.innerlogics.com">Niv Singer</a>
                </div>
                <a href="#comment-221085476" class="permalink"><time datetime="2008-08-05T18:52:38">2008-08-05T18:52:38</time></a>
            </div>
            <div class="content"><p>I couldn't find the "Network member and fan feeds" - where are they??</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085478">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221085478" class="permalink"><time datetime="2008-08-05T19:03:00">2008-08-05T19:03:00</time></a>
            </div>
            <div class="content"><p>@Niv: Not all feeds are linked in from pages - check out the <a href="http://delicious.com/help/feeds" rel="nofollow">feeds help page</a> on delicious.com.  For example:</p>

<p>http://feeds.delicious.com/v2/rss/networkmembers/nivsin</p>

<p>http://feeds.delicious.com/v2/rss/networkfans/nivsin</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085479">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.1729.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=dd3f1ee67310b4f2b843498bf9c119c6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.1729.com">Philip Dorrell</a>
                </div>
                <a href="#comment-221085479" class="permalink"><time datetime="2008-08-06T02:01:52">2008-08-06T02:01:52</time></a>
            </div>
            <div class="content"><p>It seems that the posting API's have all stopped accepting a "tags" parameter, which partly breaks my Firefox "deli" search keyword.</p>

<p>e.g. "deli toread math" used to fill in tags "toread" and "math", now it doesn't.</p>

<p>Also, does delicious have any equivalent to Google's site: prefix? That would be really good for a "most popular pages on my website" option.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085480">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221085480" class="permalink"><time datetime="2008-08-06T21:41:06">2008-08-06T21:41:06</time></a>
            </div>
            <div class="content"><p>@philip Yup, that's broken for me too.  See also: http://decafbad.com/blog/2008/08/02/delicious-20-legacy-bookmarklet-fix</p>

<p>As for something like site:, I think host: used to work but it seems no longer with the new search implementation.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085482">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://wizardishungry.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a592808d920cd15d2234638b4b5850d5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://wizardishungry.com/">Jon Williams</a>
                </div>
                <a href="#comment-221085482" class="permalink"><time datetime="2008-08-22T18:38:43">2008-08-22T18:38:43</time></a>
            </div>
            <div class="content"><blockquote>Network member and fan feeds now include the date when the contact was added. Pro tip: Subscribe to fan feeds to see when new people have started following your bookmarks.</blockquote>

<p>Where is this? (I feel silly not being able to find fan feeds)</p></div>
            
        </li>
    
        </ul>
    
        </div>
    