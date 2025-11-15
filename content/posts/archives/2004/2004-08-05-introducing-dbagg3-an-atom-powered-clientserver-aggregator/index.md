---
comments_archived: true
date: '2004-08-05T09:04:56-04:00'
excerpt: 'It''s a new feed aggregator, my third attempt at such.  Everything
    is clunky and command-line driven at present--but I''ve got further
    plans, like a REST API for feed queries and manipulation of various
    things such as feed subscriptions and the read/unread state of items.  Pair
    this with an XSLT-driven browser UI, and the possibility of other clients
    (not the least of include other Atom-consuming aggregators).


    The goal is to make a Client/Server Aggregator.'
layout: post
tags:
- syndication
- python
title: Introducing dbagg3, an Atom-powered client/server aggregator
wordpress_id: 536
wordpress_slug: introducing-dbagg3-an-atom-powered-clientserver-aggregator
wordpress_url: http://www.decafbad.com/blog/?p=536
---
**Update**: I've just dumped what code I have into my CVS repository.  So, go ahead and poke fun at it:

   * <http://www.decafbad.com/cvs/dbagg3/>

Or, fetch it from CVS:

    $ cvs -d:pserver:anoncvs@www.decafbad.com:/cvsroot login
    (Logging in to anoncvs@www.decafbad.com)
    CVS password: anoncvs
    $ cvs -d:pserver:anoncvs@www.decafbad.com:/cvsroot co dbagg3

* * *

So, besides the funk, there's a little project in which I've gotten immersed.  Here's a teaser diagram:

<img src="http://www.decafbad.com/2004/08/dbagg3-demo/dbagg3-phase1.jpg" />

It's a feed aggregator, my third attempt at such.  At present, things are roughly close to the diagram above.  Everything is clunky and command-line driven at present--but I've got further plans, like a REST API for feed queries and manipulation of various things such as feed subscriptions and the read/unread state of items.  Pair this with an XSLT-driven browser UI, and the possibility of other clients (not the least of include other Atom-consuming aggregators).

The goal is to make a [Client/Server Aggregator][clientserveragg].  Somewhat serendipitously, I just caught Bob DuCharme's xml.com [article on Amazon.com's web services][amazonrest], which [I really like][wishes] and have drawn inspiration from in thinking about this new aggregator.  Eventually, I want to offer the same sort of XML+XSL style of service that they've put together, along with some futher inspiration from the [Atom API][atomapi].  

Anyway, as another teaser, check out this early demo involving the XML this thing has been producing, coupled with some experimental XSL:

* [dbagg3 demo page][dbagg3demo]

You'll notice that there are three URLs involved here:

* [An XSLT processor service][dbagg3xsltproc]
* [An XSLT stylesheet][dbagg3xsl]
* [Some aggregated Atom feeds][dbagg3xml]

The XSLT expects Atom (plus a few extensions of my own), so you can also do things like this:

* [Dive Into Mark][mark]
* [Intertwingly][sam]
* [0xDECAFBAD][me]

These are the sorts of tricks I was looking forward to when I started thinking about things like a [universal blog transfer format][blogxfer] and [rose-colored glasses][roseglasses].  XSLT used like this could just as easily produce a blog or RSS 2.0 content.

Anyway, hoping to get some code into CVS by this weekend that's not entirely embarassing.  So if you're interested in this stuff, stay tuned.  I'm hoping that this thing can provide a base for others interested in feed aggregation--if you just want to play with UI, use the scanning and storage as-is and tinker with XSLT; if you want to play with storage and query, leave the scanning and UI alone; if you want to tinker with parsing... er, [talk to Mark Pilgrim][ufp].

More soon!  

(Oh yeah, and I *will* be working on coming up with a better name than `dbagg3`.  Unfortunately, I probably won't be coming up with a more visually appealing design for the UI, since what you see is the best I can do.  Heh, heh.  Don't let your programmers do visual design...)

[atomapi]: http://www.atomenabled.org/developers/api/atom-api-spec.php
[urchin]: http://urchin.sourceforge.net/
[ufp]: http://www.feedparser.org/
[roseglasses]: http://www.decafbad.com/blog/2004/05/03/put_on_your_rsscolored_glasses_and_forget_about_atom
[blogxfer]: http://www.decafbad.com/blog/2004/05/17/use_atom_for_a_universal_blog_transfer_protocol
[me]: http://www.decafbad.com/2004/08/dbagg3-demo/xsltproc.cgi?xsl=http://www.decafbad.com/2004/08/dbagg3-demo/new.xsl&#38;xml=http://www.decafbad.com/blog/atom.xml
[sam]: http://www.decafbad.com/2004/08/dbagg3-demo/xsltproc.cgi?xsl=http://www.decafbad.com/2004/08/dbagg3-demo/new.xsl&#38;xml=http://www.intertwingly.net/blog/index.atom
[mark]: http://www.decafbad.com/2004/08/dbagg3-demo/xsltproc.cgi?xsl=http://www.decafbad.com/2004/08/dbagg3-demo/new.xsl&#38;xml=http://www.diveintomark.org/xml/atom.xml
[dbagg3xsltproc]: http://www.decafbad.com/2004/08/dbagg3-demo/xsltproc.cgi
[dbagg3xsl]: http://www.decafbad.com/2004/08/dbagg3-demo/new.xsl
[dbagg3xml]: http://www.decafbad.com/2004/08/dbagg3-demo/demo.xml
[awsrss]: http://www.decafbad.com/2004/03/xml-rss091.xsl
[dbagg3demo]: http://www.decafbad.com/2004/08/dbagg3-demo/xsltproc.cgi?xsl=http://www.decafbad.com/2004/08/dbagg3-demo/new.xsl&#38;xml=http://www.decafbad.com/2004/08/dbagg3-demo/demo.xml
[clientserveragg]: http://www.intertwingly.net/wiki/pie/ClientServerAggregator
[amazonrest]: http://www.xml.com/pub/a/2004/08/04/tr-xml.html
[wishes]: http://www.decafbad.com/blog/2004/06/16/wishofthemonthclub1

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084326">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.nur-eine-i.de"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e7368d797917d0df7942c26d4ed2e580&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.nur-eine-i.de">Benjamin</a>
                </div>
                <a href="#comment-221084326" class="permalink"><time datetime="2004-08-05T10:22:30">2004-08-05T10:22:30</time></a>
            </div>
            <div class="content">This is great. It seems that this could be the base, for what I've been dreaming/thinking about the last half year or so. In contrast to you, I haven't come up with any code yet (mostly due to the fact, that I don't python yet, and I found no other reasonably good feed parser, than the Universal Feed Parser), but with a name: Roosster 

Features I'd really like to have in such a ClientServerAggregator are:
(a) search over entries the aggregator has seen to date
(b) add and arbitrary number of notes to any entry
(c) add multiple category-tags to entries
(d) interlink entries (I know this could be solved by some 'Related Entries' stuff, but somtimes I don't trust these "automatic classifiers")

Can't wait, until I can take a look at the code and see if I can extend it. This would finally be a real reason to learn python.

By the way, I really like the interface. Might be, that's because I'm a programmer too?!</div>
            
        </li>
    
        <li class="comment" id="comment-221084328">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=e1cc8e7103bb0f77a7d7abf91b1a961b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Christopher Drake</a>
                </div>
                <a href="#comment-221084328" class="permalink"><time datetime="2004-08-05T18:30:41">2004-08-05T18:30:41</time></a>
            </div>
            <div class="content">Very nice. The demo has me salivating a little.

Oddly enough, I like the UI. If you can slim it down, side-to-side-wise a bit, it would also be a great aggregator to rip whole chunks from and feed to a Palm Pilot or PocketPC, as well. They're not as big as they were in the past, but with decent strides every couple of weeks, they still have a lot of following. Your page-width is dynamic, and that means a lot to me, a Palm user.

A feature I'd like to see is kind of like Bloglines, where you receive a small box of info from the RSS feed, or what-have-you to give you a taste of an article. If going 1 link deep from any link on the aggregator page linked to a small page with such a tidbit, it would make surfing the articles a lot faster. This would allow a PDA or cellphone to drag an aggregator page 1 link deep with specialised software and get all of the highlights from say, 20 blogs.

That could be a major boon, especially for people that connect while at wireless access points on business trips, etc.

Keep it up, this looks like it'll rock when you are done.</div>
            
        </li>
    
        <li class="comment" id="comment-221084331">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://b4mad.net/datenbrei/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0038a1e9f4492e2f964f0f39d2d0dc7f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://b4mad.net/datenbrei/">Christoph Görn</a>
                </div>
                <a href="#comment-221084331" class="permalink"><time datetime="2004-08-08T12:41:08">2004-08-08T12:41:08</time></a>
            </div>
            <div class="content">Hi,
 and I will try to plug an jabber/XMPP bot into it, so it will deliver the aggragated content rigth to my beloved IM app...</div>
            
        </li>
    
        </ul>
    
        </div>
    