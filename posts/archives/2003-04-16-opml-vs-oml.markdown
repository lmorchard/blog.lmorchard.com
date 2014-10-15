---
comments_archived: true
date: '2003-04-16T16:40:41-04:00'
layout: post
title: OPML vs OML - Fork but don't fight!
wordpress_id: 404
wordpress_slug: opml-vs-oml
wordpress_url: http://www.decafbad.com/blog/?p=404
---
In my intermittent online presence, I've been happily watching <a href="http://www.scripting.com" target="_top">Dave Winer</a>'s
ramp-up with <a href="http://www.decafbad.com/twiki/bin/view/Main/OPML">OPML</a> toward OSCON with things like 
"<a href="http://www.opml.org/howToImplementOpmlDirectoryBrowser" target="_top">How to implement an <a href="http://www.decafbad.com/twiki/bin/view/Main/OPML">OPML</a> directory browser</a>".
I love outliners, and though it's been a little while since I played with Radio, I loved Instant Outlining
and the <a href="http://www.decafbad.com/blog/tech/old/ooocoe.html" target="_top">transclusion</a> of outside outlines into the
one at hand via URL.  And when Dave first introduced the idea of an <a href="http://www.decafbad.com/twiki/bin/view/Main/OPML">OPML</a>-based distributed web directory,
I figured it was the start of another nifty twist in the web fabric.  (You know, the kind that makes wrinkles?
The kind of wrinkles that make brains smarter?)
<br /><br />
Anyway, even given all this, <a href="http://www.decafbad.com/twiki/bin/view/Main/OPML">OPML</a> has always bugged me, and I'm not alone.  In fact, today I found a
link to <a href="http://oml.sourceforge.net/" target="_top">OML</a>, the Outline Markup Language project on <span style='background : #FFFFCE;'><a href="http://www.decafbad.com/twiki/bin/edit/Main/SourceForge?topicparent=Main.FilterData"><b>?</b></a><font color="#0000FF">SourceForge</font></span>,
which seems to seek to address many of the same things that have bugged me.  That is, things like
<a href="http://www.decafbad.com/twiki/bin/view/Main/UserLand">UserLand</a> application-specific tags, and extension via arbitrary attributes.  Though I'm no master
of deep XML magic, these things struck me as grungy.
<br /><br />
But you know, we're <a href="http://www.decafbad.com/blog/tech/old/oooced.html" target="_top">designing for recombinant growth with the lazyweb</a> here
(or at least, Dave Winer was and is), and <a href="http://www.decafbad.com/twiki/bin/view/Main/OPML">OPML</a> looks like one of those dirty things that got
thrown together quickly in order to enable a laundry list of further projects.  It works, isn't
all that hard to grasp, and has gotten adopted quickly.  There's momentum there.  As 
<a href="http://scriptingnews.userland.com/2003/04/15#noWaitForTools" target="_top">Dave says</a>, there is no wait for
tools.
<br /><br />
So, now there's also <a href="http://oml.sourceforge.net/" target="_top">OML</a> starting.  Hopefully this won't become another rehash of the <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> fight.  
Because, I sense many similar issues between the two.  Maybe it would have been better still if OML had been named something
completely avoiding the letters O, P, M, or L.  I already see mailing list charters being called out in order to quiet unwanted
discussion of fundamentals, but, hopefully we can avoid anyone claiming that they have the One True Format, all fighting for the
same name and slapping each other around with version numbers.  Gah.
<br /><br />
Anyway.  I like OML but see some grunge in it as well.  At the moment, I'm using an <a href="http://www.decafbad.com/twiki/bin/view/Main/OPML">OPML</a>-supporting tool. I can't imagine that
conversion would be more than an XSLT file away.  Well, maybe more than that.  Beyond that, let's agree to disagree and viva le
fork.  Let the best, most demonstratably capable format win.  Meanwhile, I'm still considering that Tinderbox license to see if I
might like multi-dimensional outlining...
<!--more-->
shortname=opml_vs_oml

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090274">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://aaronland.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9b704dff33489e0ba50f7a6364a8bf5a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://aaronland.net">Aaron of Montreal</a>
                </div>
                <a href="#comment-221090274" class="permalink"><time datetime="2003-04-16T17:47:47">2003-04-16T17:47:47</time></a>
            </div>
            <div class="content">Ha ha!

Don't forget otlml ;-)

Why on Earth do people who write outline DTDs (me included) not bake support for XInclude into the spec?</div>
            
        </li>
    
        <li class="comment" id="comment-221090275">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dannyayers.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=24223bb1ce85de0dce358c19a60cdf25&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dannyayers.com">Danny Ayers</a>
                </div>
                <a href="#comment-221090275" class="permalink"><time datetime="2003-04-17T12:49:13">2003-04-17T12:49:13</time></a>
            </div>
            <div class="content">I pretty much agree on all points, though I come down solidly in favour of a replacement for OPML. The format is currently like a prototype, one that you would ditch once you'd played with for a day or two. 

If OML works (i.e. folks like yourself point out the grunge) then hopefully we can have a non-proprietry, *validatable* replacement for OPML that can evolve. The OPML list is a joke, Dave moderates out any criticism, while happily promoting dodgy usage on his site (let's all make 404s!). There is a fundamental problem with his 'look at the canopy, not the roots' approach - without roots, before long the tree falls over.

btw, re. multidimensional outlining - tell me what you want! (for Ideagraph)</div>
            
        </li>
    
        <li class="comment" id="comment-221090276">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://oml.sf.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=527a02c0012ff2583c9e8654cd2bd97c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://oml.sf.net">Ray Grieselhuber</a>
                </div>
                <a href="#comment-221090276" class="permalink"><time datetime="2003-04-17T14:07:20">2003-04-17T14:07:20</time></a>
            </div>
            <div class="content">As the specification originator, I'm glad to see it getting some attention. 
What we need is exactly the kind of comments that you are making in order to improve the specification. If you are a big user of outliners, join the list and tell us what you want. 
By the way, XInclude is a great idea. We shall have to take a look at it.
We are not looking for a fight, just a reasonable specification that is not controlled by one person. Our use of the name OML was admittedly useful from an evangelistic standpoint on one hand, and on the other hand, simply a good name. What else are we going to call it? ;-)</div>
            
        </li>
    
        <li class="comment" id="comment-221090277">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=b53911af792174097e8acb282414b44c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Bill Kearney</a>
                </div>
                <a href="#comment-221090277" class="permalink"><time datetime="2003-04-17T14:53:34">2003-04-17T14:53:34</time></a>
            </div>
            <div class="content">I know!  Call it OPML-2.0!

(ducks and runs...)</div>
            
        </li>
    
        <li class="comment" id="comment-221090279">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://oml.sf.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=527a02c0012ff2583c9e8654cd2bd97c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://oml.sf.net">Ray Grieselhuber</a>
                </div>
                <a href="#comment-221090279" class="permalink"><time datetime="2003-04-17T14:56:12">2003-04-17T14:56:12</time></a>
            </div>
            <div class="content">Ha! That would go over really well!</div>
            
        </li>
    
        <li class="comment" id="comment-221090280">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221090280" class="permalink"><time datetime="2003-04-17T17:19:58">2003-04-17T17:19:58</time></a>
            </div>
            <div class="content">aaron:  Ack!  I did have a nagging notion that I'd forgotten another outliner XML format out there.  And yours was it!</div>
            
        </li>
    
        <li class="comment" id="comment-221090281">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221090281" class="permalink"><time datetime="2003-04-17T17:20:22">2003-04-17T17:20:22</time></a>
            </div>
            <div class="content">/me joins the OML mailing list.  Here's to scouring out the grunge!</div>
            
        </li>
    
        </ul>
    
        </div>
    