---
comments_archived: true
date: '2007-04-29T23:06:32-04:00'
layout: post
tags:
- webdev
- rss
- php
- atom
- xml
- feedmagick
- feedmagick2
- feeds
title: Say hello to FeedMagick2
wordpress_id: 1048
wordpress_slug: say-hello-to-feedmagick2
wordpress_url: http://decafbad.com/blog/2007/04/29/say-hello-to-feedmagick2
---
Yeah, things have been basically silent around here thanks to post-work brain fryage and a general lack of things to say.  Really, everyone else around the blogosphere seems to be covering things satisfactorily.  However, I have been idly working on a new project over the past few weeks, namely a total rewrite and redesign of [my format-ignorant feed filtering and munging kit dubbed FeedMagick](http://decafbad.com/blog/?s=feedmagick).

You can find [a demo installation of FeedMagick2 here](http://decafbad.com/2007/04/FeedMagick2/) and find it [ready for checkout from SVN over here](http://decafbad.com/svn/trunk/FeedMagick2/).  It's basically just a step away from being a proof of concept, but I'm hoping to get around to fleshing out docs and battening down the hatches with tests.  In any case, if my serial enthusiasm holds out, this thing could eventually subsume everything else I've done with feeds.

For now, peek at some of these highlights:

   * [Master Personal Feed](http://decafbad.com/2007/04/FeedMagick2/inspect/masterfeed) - One big feed blended from 10 other personal metadata feeds pulled from various Web-2.0-ish sites.
   * [Feed to JSON via Magpie](http://decafbad.com/2007/04/FeedMagick2/inspect/magpiejson) - Get feed data parsed by way of [Magpie](http://magpierss.sourceforge.net/) into JSON data structures
   * [Flickr Favorites Feed](http://decafbad.com/2007/04/FeedMagick2/inspect/flickrfavorites) - Feed of photos marked as favorites by a Flickr user, pulled via the API
   * [jbox.com scraper](http://decafbad.com/2007/04/FeedMagick2/inspect/jbox) - Pipeline composed of [HTML Tidy](http://tidy.sourceforge.net/) and XSL to scrape [jbox.com](http://jbox.com/) to build an RSS feed of new items for sale.

Beyond practical examples, there are some things under the hood that seem keen to me.  Apropos of my [pipes-via-web ramblings](http://decafbad.com/blog/2007/02/15/thoughts-on-pipes-on-the-web-part-ii) back in February, I'm trying out a few different approaches to pipelining feed content through processor modules.  My original FeedMagick relied on feeding URLs to URLs as parameters.  That, unfortunately, can be mighty cumbersome and inefficient.  So, FeedMagick2 explores a few more approaches:

   * The first and obvious approach is to chain them together in a single script.  So, I've got objects instances that pass content from one to the next.  The thing is, the pipe works in reverse:  The driver script asks the last module in the pipe for content, which then asks the one before it for content, and so on.  At any point along the way, modules can cache the output of previous modules, and refrain from calling up the chain.

   * The second way to chain pipelines together is just like the first FeedMagick:  Some pipelines start with fetching a URL.  That can be an original feed, or a URL leading to the output of an antecedent pipeline.  And, oh yeah, most pipelines are run via parameterized URLs, so there's that bit of handy recursion.

   * The third way to chain pipelines together is with HTTP POST:  A pipeline can accept feed data via the request body of an HTTP POST, thus allowing antecedent pipelines (or even cURL scripts) to *push* data into the pipeline rather than getting *pulled* via URL.  This is kind of like my [years-old jiggery pokery](http://decafbad.com/blog/?s=xmlrpc+pipe) with [pipelines via XML-RPC](http://www.decafbad.com/twiki/bin/view/Main/XmlRpcFilteringPipe), only much *much* simpler.

I'm also poking around at making all of the above available at the command line via PHP-CLI, and I'm having gratuitous fun exploring PEAR to roll my own stripped-down web framework.  I still hate PHP, but I'm at least finding ways to entertain myself while I'm holding my nose.  Of course, I find weird things entertaining.

And, as a side note, the only reason I'm using PHP is because I'd like to play around with the idea of the de facto WordPress installation requirements standard.  That is:  If you can run WordPress, you can run this.  In reality, I don't think I'm there, but I'm hoping to get close.  For one, I'm refusing to play with anything older than PHP 5.

Anyway, play with it, tell me what you think and give me a reason to keep hacking at it.  :)

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082761">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://jamesv.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c82c72ca4f9eab33a80a7bd839c1ae0b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://jamesv.org">jamesv</a>
                </div>
                <a href="#comment-221082761" class="permalink"><time datetime="2007-04-30T11:39:15">2007-04-30T11:39:15</time></a>
            </div>
            <div class="content"><p>Aw man, now I've got to port all the code you wrote while you were here over to this new hotness ;) I really like (and appreciate) the single script approach.</p>

<p>Is caching at a module level done automatically, or is that something I need to flag in my original call? Some installs of the original code base are now aggregating large sections of a pool of around 400 feeds, and eeking out even minor performances gains would be just lovely.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082762">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=b309c5a1952afc3d7d81ee90908309af&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">dRAUPP</a>
                </div>
                <a href="#comment-221082762" class="permalink"><time datetime="2007-04-30T13:40:16">2007-04-30T13:40:16</time></a>
            </div>
            <div class="content"><p>hawt.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082763">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082763" class="permalink"><time datetime="2007-04-30T14:43:54">2007-04-30T14:43:54</time></a>
            </div>
            <div class="content"><p>@jamesv: Take a look at the source to this big-ish pipeline, all the way at the end:</p>

<p>http://decafbad.com/2007/04/FeedMagick2/pipelines/masterfeed</p>

<p>You can basically slap a Cacher module at the tail-end or even middle of a long string of modules, and it'll cache the results of everything before it.  I've got a cache lifetime set in the conf/config.php, and you can also set the lifetime in the Cacher parameters.  There can multiple Cacher's per pipeline too.</p>

<p>This thing might not quite yet be even as stable / in working order as the original FeedMagick, but it might be worth poking at for you.  :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082766">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://laughingmeme.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=01457d1a0f0e533062cd0d1033fb4d7a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://laughingmeme.org">kellan</a>
                </div>
                <a href="#comment-221082766" class="permalink"><time datetime="2007-04-30T16:02:31">2007-04-30T16:02:31</time></a>
            </div>
            <div class="content"><blockquote>For one, I’m refusing to play with anything older than PHP 5.</blockquote>

<p>That must be nice.  </p>

<p>And curse you, this looks interesting, now I've got to find time to look at it.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082767">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.jm3.net/"><img src="http://disqus.com/api/users/avatars/jm3.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.jm3.net/">John Manoogian III (jm3)</a>
                </div>
                <a href="#comment-221082767" class="permalink"><time datetime="2007-04-30T17:53:08">2007-04-30T17:53:08</time></a>
            </div>
            <div class="content"><p>addendum to README:</p>

Installation

<p>cp conf/config.php-dist conf/config.php
  chmod a+w logs
- RewriteBase /~lorchard/FeedMagick2
+ RewriteBase /FeedMagick2</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082768">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082768" class="permalink"><time datetime="2007-04-30T17:58:49">2007-04-30T17:58:49</time></a>
            </div>
            <div class="content"><p>@jm3: Ah!  Good catch.  I really need to eventually installer-ify that kind of stuff.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082769">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://xiled.rss-central.net/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=750dbcc9cc192bfad37a3daa4edf139e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://xiled.rss-central.net/blog">megalar</a>
                </div>
                <a href="#comment-221082769" class="permalink"><time datetime="2007-08-05T12:25:34">2007-08-05T12:25:34</time></a>
            </div>
            <div class="content"><p>Yesterday my host upgraded to php5 so I ran over to your svn dump and installed feedmagick2.
After editing the $baseurl and rewritebase i tested it and it worked like a charm, so I took a nap.
Upon waking I was gonna go play with it and see what hacks I could get going with it but something
 was fubar.
Warning: fopen(/home/megalar/www/html/feedmagick/logs/feedmagick2-debug-20070805.log) [function.fopen]: failed to open stream: Permission denied in /usr/share/php/Log/file.php on line 216
are the errors I get as you can see @ <a href="http://xiled.rss-central.net/feedmagick/" rel="nofollow">my site</a>.
If it hadn't worked to begin with I would think module problems on my server. To my knowledge, and my host's knowledge, nothing has changed since the upgrade so I'm wondering if it is some sort of bug or a server problem that waited a few hours to reveal itself. The latter doesn't really make much sense to me
but I can't rule it out since I'm not r00t on the box and am not 100% certain my host didn't bork something while I slept. </p>

<pre><code>              anyhoo, your thoughts?
</code></pre></div>
            
        </li>
    
        </ul>
    
        </div>
    