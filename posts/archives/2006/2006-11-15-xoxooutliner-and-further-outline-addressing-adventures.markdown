---
comments_archived: true
date: '2006-11-15T03:07:12-05:00'
layout: post
tags:
- asides
- webdev
- php
- outliners
- outlining
- xoxooutliner
- xsl
- xoxo
- xml
- opml
title: XoxoOutliner and further outline addressing adventures
wordpress_id: 1019
wordpress_slug: xoxooutliner-and-further-outline-addressing-adventures
wordpress_url: http://decafbad.com/blog/2006/11/15/xoxooutliner-and-further-outline-addressing-adventures
---
[Revised the addressing code a bit][rev], adding a few new kinds of addresses and getting ready to support sub-outline *updates*.  That is, fetch a sub-branch of an outline and then later post a change to that sub-branch using the same address.  Needs more thought - ie. what happens if things move between fetch and update? - but here are a few more samples:

* First is a straight linear index counting down from the top of the outline:
   * [http://decafbad.com/2006/11/XoxoOutliner/outlines/README;index:4?format=xoxo](http://decafbad.com/2006/11/XoxoOutliner/outlines/README;index:4?format=xoxo)
* Second is a navigation of outline structure, alternating numbers and letters:
   * [http://decafbad.com/2006/11/XoxoOutliner/outlines/README;level:3c4?format=xoxo](http://decafbad.com/2006/11/XoxoOutliner/outlines/README;level:3c4?format=xoxo)

That's all for now.  In my next round of enthusiasm, I may try stealing [Tom Morris' Opath idea][opath]...

[rev]: http://decafbad.com/trac/changeset/779
[opath]: http://blogs.opml.org/tommorris/2006/11/11#opathAToolToPopulariseAConcept

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087323">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://vdm.cc/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a4dae25fe0faeec4f9ff1ad769a52b36&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://vdm.cc/">Vincent D Murphy</a>
                </div>
                <a href="#comment-221087323" class="permalink"><time datetime="2006-11-18T20:52:07">2006-11-18T20:52:07</time></a>
            </div>
            <div class="content"><p>I think (and said as much on Tom Morris' site) that a fragment identifier would be a better solution, in which case Opath would be a fragment identifier syntax for OPML and XOXO. At least it would be the best solution from a REST/web architecture point of view..</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087325">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221087325" class="permalink"><time datetime="2006-11-18T21:40:41">2006-11-18T21:40:41</time></a>
            </div>
            <div class="content"><p>One reason I didn't use the #identifier URI syntax for suboutlines is because some gymnastics need to be done to get the hash through to the server from a browser.  Otherwise, it gets treated as an in-page anchor.  The semicolon syntax seems to work well for a set of path-segment parameters, and follows the standard (if I've read it correctly).  </p>

<p>In either case, it works for me, and should be just fine in a REST context - the suboutline syntax here should always identify a single parent outline node as a resource, and will eventually work for GET / PUT / POST / DELETE.</p>

<p>Now I just need to implement a solution for the <a href="http://www.w3.org/1999/04/Editing/01" rel="nofollow">Lost Update Problem</a>.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087328">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.dynamiclist.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=09eb19f1e84a7aaa63c86bd48c4d0f3d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.dynamiclist.com/">Michael Poremba</a>
                </div>
                <a href="#comment-221087328" class="permalink"><time datetime="2008-09-18T23:45:56">2008-09-18T23:45:56</time></a>
            </div>
            <div class="content"><p>Wondering if you ever completed your online outliner? Check out dynamiclist.com, a functioning but incomlete project I launched back in 2001. The editor is rich and works well. Been thinking of reviving now that all major browsers support the contentEditable tag.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    