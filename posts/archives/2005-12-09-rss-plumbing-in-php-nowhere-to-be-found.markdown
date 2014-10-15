---
comments_archived: true
date: '2005-12-09T01:45:30-05:00'
layout: post
tags:
- asides
title: RSS plumbing in PHP nowhere to be found?
wordpress_id: 790
wordpress_slug: rss-plumbing-in-php-nowhere-to-be-found
wordpress_url: http://decafbad.com/blog/?p=790
---
This actually surprises me:  I can't find any simple RSS filters—or other basic feed plumbing fixtures—implemented in PHP.  

I want a [URL-line style][ul] PHP page which takes in an RSS feed URL and some search parameters, returning an RSS feed filtered according to the parameters.  So, say, I want to filter a feed for only items containing a certain phrase in the description—or maybe I want items with `osx` in a `dc:subject` element.

And how about some blenders?  That is, I pass in any number of feed URLs and get one merged feed out the other end.  I've got a chapter in my book on these, in Python—but it'd be handy to have them in PHP as well.

Have I just not looked hard enough?  By now, I'd've thought this sort of thing would be all tied up in a bow and at the top of the Google charts by now.  It makes me wish I'd used PHP in my book, rather than Python—and only because of PHP's irresistible ubiquity.  Coding in PHP still makes me gag, just a bit.

But, if the lazy web doesn't deliver, I guess I'll be cobbling it together myself soon.

[ul]: http://207.22.26.166/bytecols/2001-08-15.html

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084449">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.surlysoft.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=815c14d8894ca4b5128c6ab3e30765fb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.surlysoft.com">Grant Schofield</a>
                </div>
                <a href="#comment-221084449" class="permalink"><time datetime="2005-12-09T06:33:36">2005-12-09T06:33:36</time></a>
            </div>
            <div class="content"><p>While I agree with you on the PHP front I had heard of an RSS parser in PHP called <a href="http://magpierss.sourceforge.net/" rel="nofollow">Magpie</a>. I don't vouche for it though.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084451">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dcostanet.net/wordpress/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e987a93371ea8b87ae635d225b3eed68&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dcostanet.net/wordpress/">Sameer D'Costa</a>
                </div>
                <a href="#comment-221084451" class="permalink"><time datetime="2005-12-09T06:54:21">2005-12-09T06:54:21</time></a>
            </div>
            <div class="content"><p>Gregarius http://gregarius.net does this in php using MagpieRSS. You can output the search results, tags, categories etc as rss feeds. It makes a nice blender (just append ?theme=rss to any gregarius URL). </p>

<p>While it definitely is not a URL-line style app and might be overkill for your needs, I thought I would throw the suggestion out there....</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084453">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=70f4c3580e61128421cd3899a2dcf6f1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Dominic White</a>
                </div>
                <a href="#comment-221084453" class="permalink"><time datetime="2005-12-09T10:23:44">2005-12-09T10:23:44</time></a>
            </div>
            <div class="content"><p>I started doing something similar. I was using for specific feeds and didn't provide flexable input. Manipulating XML is PHP is easy though.</p>

<p>Here is my example for removing ads from a moreover feed:</p>

<p>http://singe.rucus.net/sanity/moreover.phps</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084455">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://laughingmeme.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=01457d1a0f0e533062cd0d1033fb4d7a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://laughingmeme.org">kellan</a>
                </div>
                <a href="#comment-221084455" class="permalink"><time datetime="2005-12-09T14:23:33">2005-12-09T14:23:33</time></a>
            </div>
            <div class="content"><p>I tend to use this code snippet from <a href="http://hublog.hubmed.org/archives/000919.html" rel="nofollow">Alf</a>.  </p>

<p>There was some talk of sponsoring work on Magpie at one point, and feed generation was one of the proposed features, but I can't say I've ever felt moved to add it otherwise.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084456">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://rasterweb.net/raster/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=db0fab74bcb564ebb09295498b892fb6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://rasterweb.net/raster/">Pete Prodoehl</a>
                </div>
                <a href="#comment-221084456" class="permalink"><time datetime="2005-12-09T15:06:02">2005-12-09T15:06:02</time></a>
            </div>
            <div class="content"><p>Yeah, as much I as prefer writing in Perl to PHP, there are so many apps in PHP that I like and use. I am surprised though by some of the missing pieces in PHP that other languages have had for years... Even stuff that would be considered somewhat basic by many. sigh...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084457">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://highearthorbit.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a25421f6c79d5f381fab65c82abf85e8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://highearthorbit.com">Andrew</a>
                </div>
                <a href="#comment-221084457" class="permalink"><time datetime="2005-12-10T20:04:36">2005-12-10T20:04:36</time></a>
            </div>
            <div class="content"><p>There is also FeedOnFeeds-Redux (http://fofredux.sf.net) which uses Magpie for consumption and rsswriter for publication.</p>

<p>It's a little behind some other projects - but aims for a simpler, more straight-line approach.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084458">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sporkmonger.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56ee28134dd0776825445e3551979b14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sporkmonger.com/">Bob Aman</a>
                </div>
                <a href="#comment-221084458" class="permalink"><time datetime="2005-12-13T03:42:33">2005-12-13T03:42:33</time></a>
            </div>
            <div class="content"><p>Magpie's probably the closest you're gonna come for PHP at the moment.  Or at least, it was a year ago when I was still using PHP.  Magpie, however, is utter crap compared to either the UFP or Rome or my FeedTools or really just about any other RSS parser.  If I was forced to use PHP, I'd definately just write the parser myself.  But thankfully, Ruby's stolen my heart, and I'll never go back.</p>

<p>So I'd say, go for it.  Write a decent PHP parser and make the life of all those poor PHP guys ever so slightly less painful.  :-)</p></div>
            
        </li>
    
        </ul>
    
        </div>
    