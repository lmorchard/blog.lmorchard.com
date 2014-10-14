---
comments_archived: true
date: '2006-02-16T23:27:19-05:00'
layout: post
tags:
- asides
title: Just put on your XOXO-colored glasses
wordpress_id: 884
wordpress_slug: just-put-on-your-xoxo-colored-glasses
wordpress_url: http://decafbad.com/blog/2006/02/16/just-put-on-your-xoxo-colored-glasses
---
 <p>A couple of years ago, I said <a href="http://decafbad.com/blog/2004/05/03/put-on-your-rss-colored-glasses-and-forget-about-atom">"Put on your RSS-colored glasses and forget about Atom</a>."  (Wow, has it been that long?)  Well, right now I'm saying this:  Put on your XOXO-colored glasses and forget about OPML.</p>
 <p>Here's an outline snagged from my OPML blog today: <a href="http://decafbad.com/2006/02/20060216.opml">http://decafbad.com/2006/02/20060216.opml</a></p>
 <p>Now, here's that outline in some semblance of XOXO: <a href="http://decafbad.com/2006/02/20060216.xoxo">http://decafbad.com/2006/02/20060216.xoxo</a></p>
 <p>Here's the XSLT that I used to transform from OPML to XOXO: <a href="http://decafbad.com/2005/11/gopher-ng/opml-to-xoxo.xsl">http://decafbad.com/2005/11/gopher-ng/opml-to-xoxo.xsl</a></p>
 <p>And, here's the mod_rewrite chicanery I threw together to facilitate this: <a href="http://decafbad.com/2006/02/rewrite-rules.txt">http://decafbad.com/2006/02/rewrite-rules.txt</a></p>
 <p>I think my XSLT could use some work to better conform to XOXO, and I still need to get a PHP- or module-based XSLT processor for around here for efficiency's sake.  But, this seems like it might be a way to provide XOXO-colored glasses to visitors who don't like the cut of my OPML.  Does anyone have an RDF-based outline format for me to use?  I could throw that in, too.</p>
 <p>Is there anything I'm missing here that makes this idea suck completely?</p>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088819">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sporkmonger.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56ee28134dd0776825445e3551979b14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sporkmonger.com/">Bob Aman</a>
                </div>
                <a href="#comment-221088819" class="permalink"><time datetime="2006-02-17T04:56:37">2006-02-17T04:56:37</time></a>
            </div>
            <div class="content"><p>Nice.  I definately prefer XOXO to OPML, but I'm planning on allowing either format within the aggregator I'm working on.  Actually, I wrote a service very much like the ones originally linked to in your RSS post, but far more powerful.  Will convert from CDF, any version of RSS, any version of Atom to RSS 1.0, RSS 2.0, or Atom 1.0.  Or alternatively, it will simply attempt to repair any major errors in the feed.  Of course, since it's based on FeedTools, it has the same limitations (namely relative uris), so it's not <em>quite</em> ready for prime time, but it's very, very close.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088821">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sporkmonger.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56ee28134dd0776825445e3551979b14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sporkmonger.com/">Bob Aman</a>
                </div>
                <a href="#comment-221088821" class="permalink"><time datetime="2006-02-17T04:57:00">2006-02-17T04:57:00</time></a>
            </div>
            <div class="content"><p>*definitely</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088822">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sporkmonger.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56ee28134dd0776825445e3551979b14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sporkmonger.com/">Bob Aman</a>
                </div>
                <a href="#comment-221088822" class="permalink"><time datetime="2006-02-17T04:59:31">2006-02-17T04:59:31</time></a>
            </div>
            <div class="content"><p>Actually, if you're interested in playing with it, I'll send you a link if you promise not to bookmark it yet.  (I haven't tested or optimized it for performance and I don't want to make TextDrive unhappy with me.)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088825">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221088825" class="permalink"><time datetime="2006-02-18T02:23:07">2006-02-18T02:23:07</time></a>
            </div>
            <div class="content"><p>Bob: This is going to make me want to learn Ruby, isn't it?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088828">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sporkmonger.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56ee28134dd0776825445e3551979b14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sporkmonger.com/">Bob Aman</a>
                </div>
                <a href="#comment-221088828" class="permalink"><time datetime="2006-02-21T15:10:47">2006-02-21T15:10:47</time></a>
            </div>
            <div class="content"><p>Absolutely.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088830">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sporkmonger.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56ee28134dd0776825445e3551979b14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sporkmonger.com/">Bob Aman</a>
                </div>
                <a href="#comment-221088830" class="permalink"><time datetime="2006-02-22T15:55:13">2006-02-22T15:55:13</time></a>
            </div>
            <div class="content"><p>I swear... SpamCop is such a pain in the butt.  Your filter is blocking my email address because Gmail is currently on their blacklist.  So I can't send you the link it seems.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088832">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sporkmonger.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56ee28134dd0776825445e3551979b14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sporkmonger.com/">Bob Aman</a>
                </div>
                <a href="#comment-221088832" class="permalink"><time datetime="2006-02-23T00:16:26">2006-02-23T00:16:26</time></a>
            </div>
            <div class="content"><p>You know what, I'm just going to use del.icio.us to send the link to you.  You do subscribe to your for: feed, right?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088834">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sporkmonger.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56ee28134dd0776825445e3551979b14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sporkmonger.com/">Bob Aman</a>
                </div>
                <a href="#comment-221088834" class="permalink"><time datetime="2006-02-23T19:17:45">2006-02-23T19:17:45</time></a>
            </div>
            <div class="content"><p><em>chuckle</em></p>

<p>You emailed me, but I can't email you back because SpamCop is blocking my reply.  :-P</p></div>
            
        </li>
    
        </ul>
    
        </div>
    