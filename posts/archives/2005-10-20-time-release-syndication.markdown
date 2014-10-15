---
comments_archived: true
date: '2005-10-20T23:45:54-04:00'
layout: post
tags:
- rss
- syndication
- atom
- rest
- http
- podcasting
title: Time-release Syndication
wordpress_id: 740
wordpress_slug: time-release-syndication
wordpress_url: http://decafbad.com/blog/?p=740
---
<blockquote cite="http://www.surfarama.com/index.php?p=242">Want to read Cory Doctorow’s new book, Someone comes to Town, Someone leaves Town, via RSS?<br /><br />This chicklet will let you do just that…doesn’t matter when you first subscribe, this feed will deliver the book to your feed reader in the right order, a couple of chapters a day, over the next month. You could even subscribe via WINKsite and get it all on your mobile phone…</blockquote>
<small style="text-align:right; display:block">Source: <a href="http://www.surfarama.com/index.php?p=242">Surfarama » RSS for serialized content</a></small>

I've been toying around with a few ideas for something like this for a few years, but have never bothered to finish any of them.  [Russell Beattie][rb] had an interesting implementation of this too.

But, just in case I never actually *do* anything with this notion, here's a free idea—I wonder how many aggregators actually obey a `301 Moved Permanently` HTTP status code?  

[Simon Willison wrote about this notion][sw]: A reader subscribes using a clean and simple feed URL, but the aggregator receives a `301` redirect upon the first `GET`.  This redirect shifts the subscription over to a new feed URL with a unique ID for the reader, thereby uniquely tagging every new subscription to the feed.  The aggregator should then continue to use this tagged URL for all future requests.

However, tagging a subscriber with an RSS radio collar implies that you'll have a database on the server maintaining notes tied to those IDs.  That might be cool if I'm trying to gather some metrics, but for simple time-release syndication I don't really care about tracking a *person*.  I want to track a *start time*.  

What if this post-redirect feed URL had the time of initial redirect in it, and the time release was just a function of the duration since that initial redirect?  Anonymous and no need for a database.  My notion is that I'll just need a PHP script and a fully-formed "master feed" on which the time-release feed will be a time-bounded "viewport" informed by a little date math.  

Or, maybe I'll have a pile of pre-prepared content in a folder and munge that into a feed.  Imagine a podcast like [Scott Sigler's Ancestor][anc], all queued up and ready on the server, but doled out automatically on a weekly basis from the beginning from the point you subscribed.  I'll leave as exercises for the reader issues of "obfuscating" URLs so that people can't easily skip ahead through the story.

<!-- tags: rss atom syndication rest http podcasting -->

[anc]: http://www.project-daemon.net/
[sw]: http://simon.incutio.com/archive/2004/09/01/track
[rb]: http://www.russellbeattie.com/notebook/1008220.html

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086694">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://laughingmeme.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=01457d1a0f0e533062cd0d1033fb4d7a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://laughingmeme.org">kellan</a>
                </div>
                <a href="#comment-221086694" class="permalink"><time datetime="2005-10-21T04:16:34">2005-10-21T04:16:34</time></a>
            </div>
            <div class="content"><p>My favorite example of this is Matt Webb's service which offers <a href="http://interconnected.org/home/more/lightcone/" rel="nofollow">RSS feed of your personal light cone</a></p></div>
            
        </li>
    
        <li class="comment" id="comment-221086695">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=a0b347907bfaf05694805210ec595d6c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Martin Atkins</a>
                </div>
                <a href="#comment-221086695" class="permalink"><time datetime="2005-10-21T07:06:00">2005-10-21T07:06:00</time></a>
            </div>
            <div class="content"><p>This scheme falls down in two ways. Firstly, people have a tendency to share URLs, and when they do they tend to just take whatever's in their user-agent (your timestamped URL) rather than your pretty entry point URL that lives only on some HTML page somewhere.</p>

<p>Secondly, lots of people use "shared aggregators", which reduces load on your server but requires that everyone is seeing the same content.</p>

<p>It's a nice idea, though. Its a shame that syndication tech ended up making it so tricky.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086696">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086696" class="permalink"><time datetime="2005-10-21T10:54:22">2005-10-21T10:54:22</time></a>
            </div>
            <div class="content"><p>@Kellan: Heh, I thought that one was kinda silly, but neat... It's in my subscription list.</p>

<p>@Martin: D'oh, that's right.  Even podcasts are being heard via shared aggregators now like Odeo.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086697">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://rasterweb.net/raster/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=db0fab74bcb564ebb09295498b892fb6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://rasterweb.net/raster/">Pete Prodoehl</a>
                </div>
                <a href="#comment-221086697" class="permalink"><time datetime="2005-10-21T17:14:17">2005-10-21T17:14:17</time></a>
            </div>
            <div class="content"><p>Delta Park Project is a podcast that provides you with your own RSS feed url. I'm not exactly sure what they do with it, but for now I trust them not to do any evil.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    