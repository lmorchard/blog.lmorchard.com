---
comments_archived: true
date: '2006-10-31T16:46:40-05:00'
layout: post
tags:
- webdev
- js
- outliners
- outlining
- javascript
- dhtml
- yui
title: Event Delegation based DHTML Drag and Drop?
wordpress_id: 1011
wordpress_slug: event-delegation-based-dhtml-drag-and-drop
wordpress_url: http://decafbad.com/blog/2006/10/31/event-delegation-based-dhtml-drag-and-drop
---
So, as the urge to tinker rises again, I've started playing with [YUI][] and cracked open some [XoxoOutliner][] code again.  One of the things that struck me like a bolt from the blue recently is the notion of [event delegation][ed].  For the most part, I've treated event bubbling as a nuisance, except for where it came in handy in keyboard input handling.  But avoiding the need to individually track events on every list element on the page via instantiated objects and methods is *hot* and *forehead-slappingly obvious* once you've seen it working.  Just implement one set of event handlers on the outline root element (ie. UL or OL), and do the right thing as events come in from the list child elements.

Thus, while I can do outline node expand/collapse with ease, my goal is to implement an [event delegation][ed] based approach to dragging outline nodes around.  Apropos of that, I've been poking at [how event delegation it works in YUI][edy].  While there's nothing much special about it in general, I've run into a bit of a snag when it comes to drag-and-drop.

See, YUI comes with a [rather nice drag-and-drop abstraction][yuidd] that I'd like to use.  That abstraction, however, requires the instantiation of lots of little objects - one per outline node.  Definitely not delegation-based: The problem is that I'll be adding and removing outline nodes at whim throughout the lifetime of the page, which would require lots of care to ensure that I'm maintaining drag-and-drop wrapper objects.  I've done that a bit in [XoxoOutliner][]; it sucks.

So, I was able to build part of a delegation-based drag tracker from scratch.  I'm sad to lose the other niceties that the YUI DnD offers, but it works.  The problem now, though, is the *drop* part of the equation.  I can drag elements around the page until my heart's content, but I can never quite tell in what context I've dropped it.

I poured through the source code for the YUI DnD implementation, as well as the implementation of a few other JS frameworks' DnD offerings.  The general solution seems to be calculating and caching the page coordinate regions for each element relevant in the drop operation.  In my case, that usually includes every outline node on the page.  That's easy when you have lots of little objects instantiated - you just iterate through them and match up regions with the coordinates where the drag stopped.  But, part of my win with event delegation was that I don't have to maintain a pile of objects.

Oh yeah, and did I mention that I don't assign IDs to all the little list items making up my outline?  And that I don't particularly feel like doing so?  That also throws a monkey wrench in the YUI DnD paradigm.

The only idea I have so far is that I need to at least build a cache mapping regions to outline nodes, and keep it fairly well maintained.  That should be lighterweight than a fleet of DOM event wrappers, but still annoying.  I could trigger a cache refresh when a drag first starts, but that will probably drag down UI response.  I could trigger it whenever the outline changes, but that's just moving the burden.  And then, who knows how I'll map ID-less elements to their respective regions, while ensuring I stay clear of memory leaks.  That's still semi-voodoo to me, and I feel ashamed of that.

Eh, maybe it won't be as bad as I think.  But, to anyone who understands what I just spewed:  Any ideas?

[yui]: http://developer.yahoo.com/yui/
[xoxooutliner]: http://decafbad.com/trac/wiki/XoxoOutliner
[ed]: http://icant.co.uk/sandbox/eventdelegation/
[edy]: http://yuiblog.com/sandbox/yui/v0114/examples/event/delegation.php
[yuidd]: http://developer.yahoo.com/yui/dragdrop/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221083066">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=2d870e8df3af0d62fa636b336b17cd60&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Nick</a>
                </div>
                <a href="#comment-221083066" class="permalink"><time datetime="2006-11-01T00:19:27">2006-11-01T00:19:27</time></a>
            </div>
            <div class="content"><p>You know, Marty and I were talking tonight about how some of your posts make NO sense to us.  She even said "it's like he's talking another fucking language".</p>

<p>Damn Programmers!!</p>

<p>--nick</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083067">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://gandrew.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=de0d80e531fef9095048375a247d1149&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://gandrew.com">Gareth Andrew</a>
                </div>
                <a href="#comment-221083067" class="permalink"><time datetime="2006-11-01T18:57:21">2006-11-01T18:57:21</time></a>
            </div>
            <div class="content"><p>I'm sure I've missed something obvious - why can't you simply use the same event delegation approach on the mouseUp event?  getTarget should return the node you've dropped on, what else do you need?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083074">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221083074" class="permalink"><time datetime="2006-11-01T19:18:52">2006-11-01T19:18:52</time></a>
            </div>
            <div class="content"><p>Gareth: Yup, the issue I have with the mouseUp is that getTarget gives me what was under the mouse when I let go of the button - namely, the element I've been dragging around, not the element under the thing being dragged.  In addition, for user feedback <em>during</em> the drag (ie. at mouseMove time), I want to know what's under the dragged element - so I can highlight the potential landing spot, etc.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083075">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.fluffy.co.uk/stediting/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a660afb8f1f22ce1b03ad3b532aa05b5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.fluffy.co.uk/stediting/">Ben</a>
                </div>
                <a href="#comment-221083075" class="permalink"><time datetime="2006-11-02T13:10:53">2006-11-02T13:10:53</time></a>
            </div>
            <div class="content"><p>I presume the problem is that, given a point on the screen, you want to find exactly what DOM element is beneath it.</p>

<p>I found a solution for this in my proof-of-concept structured editor http://www.fluffy.co.uk/stediting/ -- you need to know where the mouse was clicked to insert the caret.</p>

<p>It might be a start anyway.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083078">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.gibberish.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d78a376f93e23dd093abe8d280198ebd&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.gibberish.com">misuba</a>
                </div>
                <a href="#comment-221083078" class="permalink"><time datetime="2006-11-06T02:40:19">2006-11-06T02:40:19</time></a>
            </div>
            <div class="content"><p>I think the dragdrop stuff in scriptaculous would get you most of this... at least, it is good about draggable elements having handles you can specify (e.g. child elements of the thing you want to drag), and flexible about what sorts of targets you can land on.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083084">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221083084" class="permalink"><time datetime="2006-11-06T19:06:03">2006-11-06T19:06:03</time></a>
            </div>
            <div class="content"><p>misuba: Nope, the Scriptaculous approach gives me problems too.  The first is that I don't like Prototype, unless they've stopped messing with Object.prototype since I last checked.  The second is that DnD in Scriptaculous involves juggling lots of little objects ilke most other DnD implementations I've found.  When I have an outline of 100's to 1000's of items, that really blows.  I think I've got an approach working now that's significantly lighter weight.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083085">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.gibberish.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d78a376f93e23dd093abe8d280198ebd&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.gibberish.com">misuba</a>
                </div>
                <a href="#comment-221083085" class="permalink"><time datetime="2006-11-06T22:26:55">2006-11-06T22:26:55</time></a>
            </div>
            <div class="content"><p>I'm interested to see your approach. (FWIW, Proto hasn't touched Object.prototype for a couple of versions now.)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083086">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://javascriptmvc.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=10b3282aac613831755e42ac74acbc41&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://javascriptmvc.com">Justin Meyer</a>
                </div>
                <a href="#comment-221083086" class="permalink"><time datetime="2008-05-31T07:43:52">2008-05-31T07:43:52</time></a>
            </div>
            <div class="content"><p>I am working on the exact same issue for JavaScriptMVC.  If you haven't seen JavaScriptMVC, check out its trunk.  In the controller2 plugin, you'll find a really nice event delegation library.</p>

<p>I've only thought of 1 way to do event delegation drops.  It's crazy, but it might work.</p>

<p>First, style Drags so their z-Index is LOWER than the Drops.  You want your mouse to hit the droppable areas.</p>

<p>Once a droppable is moused over by dragging a drag to it, it creates a transparent element in the exact same position as the Droppable.  It also lowers the droppable z-Index.  This gives the appearance that the draggable is over the droppable.</p>

<p>To simulate movement, the transparent droppable's mouseovers are sent to the draggable.</p>

<p>On mousing out of the transparent Droppable, it sets everything back to normal.</p>

<p>I haven't tried this yet.  The biggest issue I see is that when you grab a draggable in the middle, half of it will be behind the droppable until the mouseover happens.  This isn't ideal, but maybe there is something that can be done about that.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083088">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8f18d2579d5c8f2fb2a79c09a9234e6e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Batiste</a>
                </div>
                <a href="#comment-221083088" class="permalink"><time datetime="2009-01-20T10:06:54">2009-01-20T10:06:54</time></a>
            </div>
            <div class="content"><p>A jQuery solution for Drag and Drop with event delegation :</p>

<p>http://batiste.dosimple.ch/blog/posts/2008-05-18-1/jquery-drag-and-drop-and-resize-event-delegation.html</p></div>
            
        </li>
    
        </ul>
    
        </div>
    