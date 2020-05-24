---
comments_archived: true
date: '2007-04-05T01:37:00-04:00'
layout: post
tags:
- hacks
- rss
- atom
- xsl
- ficlets
- scrapers
- scraping
title: Ficlets enhanced author feed, an XSL scraper hack
wordpress_id: 1046
wordpress_slug: ficlets-enhanced-author-feed-an-xsl-scraper-hack
wordpress_url: http://decafbad.com/blog/2007/04/05/ficlets-enhanced-author-feed-an-xsl-scraper-hack
---
I've been trying to get myself serious about writing and even set up a [personal slush pile for my output](http://decafbad.com/skein/).  Then, I found [Ficlets][], and spewed a few quick starter stories there.  And then... I stopped.  I'm hoping to pick it up again very soon, but I guess that's the nature of my [serial enthusiasm](http://decafbad.com/blog/2006/05/26/confessions-of-a-serial-enthusiast)—it doesn't just apply to hacking.

So, here's something ironic:  I just spent a few hours tonight throwing together a hack for [Ficlets][].  See, [Ficlets][] runs on original stories, comments, ratings, and sequels and prequels to stories.  You can get an Atom feed of an author's stories and a feed of comments—but it seems like there's no way to get notified of prequels and sequels, which are a very gratifying part of the whole shebang.

With that in mind, check out this RSS feed:

   * [`http://decafbad.com/2005/12/FeedMagick/www-bin/ficlets.php?author=l_m_orchard`](http://decafbad.com/2005/12/FeedMagick/www-bin/ficlets.php?author=l_m_orchard)

That's a blend of all my stories, comments on my stories, as well as prequels and sequels found for my stories.  Subscribing to that feed will give me updates whenever there's anything new in all the above.  It's thrown together using a semi-crazy mix of my [FeedMagick][] package for caching, and some XSL for scraping.  If you'd like a feed like this of your own, just replace `l_m_orchard` for your own author name in the `author` parameter.

**Please note, however, that this little service is hosted on my site and may go away at any time for any reason.**

In case you're interested in what's under the hood, here's the quick and dirty XSL that's behind it:

   * [`http://decafbad.com/2007/04/ficlets.xsl`](http://decafbad.com/2007/04/ficlets.xsl)

This thing's made possible because the [Ficlets][] feeds are XML, **and so are the XHTML pages happily infested with microformats**.  If they ever go invalid, this scraper breaks.  But, that's the nature of scrapers, and it works for now.  Oh, and although they provide Atom, this feed is RSS 2.0.  Why?  Because it was easier that way.  I might put some more effort into an Atom feed, but my itch has so far been scratched.

[FeedMagick]: http://decafbad.com/trac/wiki/FeedMagick
[ficlets]: http://ficlets.com/authors/l_m_orchard

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084356">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://rss-central.net/megalar"><img src="http://www.gravatar.com/avatar.php?gravatar_id=1869681b309d36e59764f51c7f210406&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://rss-central.net/megalar">megalar</a>
                </div>
                <a href="#comment-221084356" class="permalink"><time datetime="2007-04-05T09:31:48">2007-04-05T09:31:48</time></a>
            </div>
            <div class="content"><p>I had already decided I was gonna grab your FeedMagick source and try to do something with it but this just gives me more incentive as a Ficlets lover. I recently read your thoughts on pipes and feel much the same way =&gt; meh to GUI, especially a buggy one. It seems much more satisfying to just tell php what I want done and watch it go rather than spend 20 minutes fiddling with a silly applet.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084357">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084357" class="permalink"><time datetime="2007-04-05T14:04:06">2007-04-05T14:04:06</time></a>
            </div>
            <div class="content"><p>@meglar: Well, just to warn ya - FeedMagick needs a <em>lot</em> of work.  :)  I've got ideas for it, but have yet to get back around to it.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084360">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://lawver.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=368732c30e3525fab12f9cd0664b4ba0&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://lawver.net">Kevin Lawver</a>
                </div>
                <a href="#comment-221084360" class="permalink"><time datetime="2007-04-05T14:59:37">2007-04-05T14:59:37</time></a>
            </div>
            <div class="content"><p>That may be the coolest thing ever.  Good job!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084362">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084362" class="permalink"><time datetime="2007-04-05T15:14:00">2007-04-05T15:14:00</time></a>
            </div>
            <div class="content"><p>@Kevin: One thing that <em>might</em> not be cool is that this XSL hits Ficlets.com once for each story in the feed to pick up the additional info, but I try to cache the feed on my end for about 20 minutes per author...  so hopefully it doesn't put any more stress on your site than I might have done manually in opening all my stories in tabs to check for comments and prequels/sequels.  :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084364">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://lawver.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=368732c30e3525fab12f9cd0664b4ba0&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://lawver.net">Kevin Lawver</a>
                </div>
                <a href="#comment-221084364" class="permalink"><time datetime="2007-04-05T15:44:25">2007-04-05T15:44:25</time></a>
            </div>
            <div class="content"><p>That's fine.  I think we can handle it.  We'll get prequels/sequels added to either the author feed or their own feed in the near future.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084365">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084365" class="permalink"><time datetime="2007-04-05T21:05:26">2007-04-05T21:05:26</time></a>
            </div>
            <div class="content"><p>@Kevin: Yeah, I think the bare author feed is a good thing to leave alone.  But, a personal author feed with comments and prequels/sequels and possibly notes would be excellent!  You know, basically, notifications of significant events that'd bring me back to the site.</p>

<p>I'm also thinking it might be neat to gently spider through prequels and sequels on stories to map them out and track progress, but that's just a future hackery idea.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084368">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=e5d9a8832bed84d8d713ab0ef953d1af&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Roger Costello</a>
                </div>
                <a href="#comment-221084368" class="permalink"><time datetime="2007-04-06T13:54:55">2007-04-06T13:54:55</time></a>
            </div>
            <div class="content"><p>Is there any way for me to view the documents you are mashing up to generate the resulting RSS document?  I am particularly interested in seeing how Microformats are being mashed up.  Thanks!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084369">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084369" class="permalink"><time datetime="2007-04-06T14:25:44">2007-04-06T14:25:44</time></a>
            </div>
            <div class="content"><p>Roger: Sure...  Really, the only things I'm mashing up are the author Atom feed, like mine here:</p>

<p>http://ficlets.com/feeds/author/l<em>m</em>orchard</p>

<p>And then, I chase down each story in the feed, like this one:</p>

<p>http://ficlets.com/stories/1763</p>

<p>You can view source on a story page and see all the information sprinkled in there - look for 'abbr' tags and class names like 'pubdate' and 'hentry'.  The pages are also valid XML, so they can be manipulated right in XSL.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084370">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.blurbtree.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=fa30e56b9a686d32cdae390345019928&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.blurbtree.com">Bill</a>
                </div>
                <a href="#comment-221084370" class="permalink"><time datetime="2009-01-28T00:36:02">2009-01-28T00:36:02</time></a>
            </div>
            <div class="content"><p>I'm sure that many Ficlets fans are sad that Ficlets.com is no more. We are in the process of constructing <a href="http://www.blurbtree.com" rel="nofollow">Blurbtree.com</a> a site that might be helpful for them. It's not a replacement for Ficlets, but it's a clean start and we'll build the site based on the feedback we get from the online community. Please give it a try and let us know what we can do to make it fit your needs. 
You can also get more information at our <a href="http://www.blurbtree.com/faqs.php" rel="nofollow">Blurbtree FAQ</a>.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    