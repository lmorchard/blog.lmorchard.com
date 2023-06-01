---
comments_archived: true
date: '2005-05-08T17:10:55-04:00'
layout: post
title: What's old (scraping) is new again (microformats)
wordpress_id: 643
wordpress_slug: whats-old-scraping-is-new-again-microformats
wordpress_url: http://www.decafbad.com/blog/?p=643
---
You know, I think I fully realized why microformats seem so appealing and familiar to me:

The appealing part stems from that fact that I've been working on building web scrapers for years now, using a slew of languages (Perl, Java, Python, XSL, JavaScript, bash scripts) and approaches (HTML parsing, regexes, XSL, tidy-and-XPath).  Anything to make that easier strikes a nice chord with me.

But, I just remembered that a few summers ago, I wrote a bit for [the O'Reilly book Spidering Hacks][sh] that anticipates the notion of a microformat.  

If you happen to have the book (which I highly recommend), or can read it on [Safari][sa] (which I also highly recommend), take a look at **Hack #96: Making Your Resources Scrapable with Regular Expressions**.

Granted, my proto-solution published there suggested using regexes and consistenly named HTML *id* attributes.  So, I'm much more pleased with the microformat approach using CSS classes.  And, I'm currently trying to write a general microformat parser using Python's HTMLParser class, which beats using regexes.

Just thought I'd share the revelation, and toot my own fledgling writing horn. :)

[sa]: http://safari.oreilly.com/
[sh]: http://www.oreilly.com/catalog/spiderhks/toc.html

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084967">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.ianbicking.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cc8334869c9d2a9e603017f2da805eb3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.ianbicking.org">Ian Bicking</a>
                </div>
                <a href="#comment-221084967" class="permalink"><time datetime="2005-05-08T22:25:31">2005-05-08T22:25:31</time></a>
            </div>
            <div class="content">I dunno... HTMLParser and screen scraping has always been an unsatisfying experience to me.  Not very reliable, and fails in unexpected ways.</div>
            
        </li>
    
        <li class="comment" id="comment-221084968">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=eb7f2a3ba74af37415ab7df101a86c75&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m. orchard</a>
                </div>
                <a href="#comment-221084968" class="permalink"><time datetime="2005-05-08T22:55:06">2005-05-08T22:55:06</time></a>
            </div>
            <div class="content">Well, scraping is most certainly nothing you want to really rely on without watching it, but I've got at least a dozen or two useful and active feeds running as a result of scraping for the past few years-- it's certainly better than nothing :)</div>
            
        </li>
    
        <li class="comment" id="comment-221084969">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://taint.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cfbac1e7edde58ed418d0b08dec00aad&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://taint.org">Justin Mason</a>
                </div>
                <a href="#comment-221084969" class="permalink"><time datetime="2005-05-09T15:50:23">2005-05-09T15:50:23</time></a>
            </div>
            <div class="content">ha, I never realised you were one of the authors of that book -- awesome!  I wrote sitescooper, which was a proto-scraper for a wide variety of sites to transcode them into an offline-readable format for small-screen handheld devices.  

I really like the microformat idea, thanks for the pointer.  one difficulty, however, of using it for scraping is that you'll have to use XPath and trust that the input XHTML is valid.  regexps won't work, because the close tags don't include the "id" or "class" attributes, so nested close tags won't match correctly with simple regexps.

but then, we're all told that scraping and regexps are kludges anyway, so I guess we shouldn't be using them any more ;)</div>
            
        </li>
    
        <li class="comment" id="comment-221084970">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=eb7f2a3ba74af37415ab7df101a86c75&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">l.m. orchard</a>
                </div>
                <a href="#comment-221084970" class="permalink"><time datetime="2005-05-09T16:09:29">2005-05-09T16:09:29</time></a>
            </div>
            <div class="content">Well, the thing about the microformats, if I recall, is that you have to at least start with well-formed XHTML.  Otherwise, your microformatted content is broken.

That said, though, I've been using Python's HTMLParser to lift data out of microformat content with a lot of success.</div>
            
        </li>
    
        <li class="comment" id="comment-221084971">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://tantek.com/log/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=02cd45622e90350cc061aaaa02229195&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://tantek.com/log/">Tantek</a>
                </div>
                <a href="#comment-221084971" class="permalink"><time datetime="2005-05-09T23:34:35">2005-05-09T23:34:35</time></a>
            </div>
            <div class="content">Leslie, that's exactly right.  More and more blogging tools publish in well-formed XHTML by default and are  becoming better and better at "tidying" ill-formed markup into well-formed markup.  

In addition, right now you can get started with a bit of a hybrid approach:  you can use a regexp to find the *start* of a microformat such as hCard, hCalendar, hReview, XOXO etc. simply by looking for class attributes that contain the right value.  Then at that point, you can hand the stream over to an XML parser to process the well-formed microformatted markup and handle the structured data as you wish!

Tantek</div>
            
        </li>
    
        <li class="comment" id="comment-221084973">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.metafy.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=314b3139fd18612a532413debb27279a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.metafy.com">joe @ metafy</a>
                </div>
                <a href="#comment-221084973" class="permalink"><time datetime="2005-05-10T14:59:25">2005-05-10T14:59:25</time></a>
            </div>
            <div class="content">I remember that presentation at WWDC last year or the year before in which the very nice Sara ? explains that scraping is for H4x0Rs, to which I commented to her afterward that it's actually for 3L337 H4x0Rs...

I particularly enjoy the "Scraping is Fun" bent of this thread, so I thought I'd bang my own drum a little to show how much I enjoy it, too:

http://www.metafy.com/products/anthracite/

It works great with Perl (or any other UNIX command) and AppleScript now, and even better later this week when we release the Automator actions for Anthracite (whoops, not supposed to say that yet until they're all done)...

Among other nifty things you can do with it today are convert the results of a Google search into an RSS feed, and/or search those results via Spotlight.

I hope it helps you enjoy scraping even more!

Joe @ Metafy
Boulder, Colorado USA</div>
            
        </li>
    
        <li class="comment" id="comment-221084975">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://ransom.dyndns.ws"><img src="http://www.gravatar.com/avatar.php?gravatar_id=3c2c53afc4e0af6c1b091b185096a4e5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://ransom.dyndns.ws">Doug Ransom</a>
                </div>
                <a href="#comment-221084975" class="permalink"><time datetime="2005-05-23T00:52:56">2005-05-23T00:52:56</time></a>
            </div>
            <div class="content">Here is a microformat I proposed a couple years ago http://internetalchemy.org/2003/04/rssInXHTML


Generally, I think the microformat concept is great.  If an html author can at least use CSS nicely, its trivial to create an RSS with tidy + XSL (or any other way).  Thats useful if their content management system is some sort of lame html editing system that inserts the authors text into a template (i.e. only one page can be created from a single source) rather than generating markup for several pages (html, rss) from a content source.</div>
            
        </li>
    
        </ul>
    
        </div>
    