---
comments_archived: true
date: '2006-01-13T10:38:07-05:00'
layout: post
tags:
- asides
title: A new way to stretch lines between dragged boxes
wordpress_id: 820
wordpress_slug: a-new-way-to-stretch-lines-between-dragged-boxes
wordpress_url: http://decafbad.com/blog/?p=820
---
Know what I just realized?  [Canvas][] [has][ff] [arrived][saf] in all the browsers I care about daily, and I see a hack [brewing][ie] for that other one for which I don't care so much.  

I suppose sometime soon, when free time comes, I should revisit my [box dragging demo][drag] and ditch that clunky transparent GIF deformation crap I'd tried refining last summer.  

I wonder: Does a canvas play well in layers with other page elements?

[canvas]: http://www.whatwg.org/specs/web-apps/current-work/#canvas
[drag]: http://www.decafbad.com/blog/2005/07/02/drag_the_boxes_stretch_the_lines
[saf]: http://developer.apple.com/documentation/AppleApplications/Reference/SafariJSRef/Classes/Canvas.html
[ff]: http://developer.mozilla.org/en/docs/Drawing_Graphics_with_Canvas
[ie]: http://me.eae.net/archive/2005/12/29/canvas-in-ie/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086996">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.entish.org/willwhim"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4b85e6b127c527c8dcebe18d1c985e48&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.entish.org/willwhim">Will Fitzgerald</a>
                </div>
                <a href="#comment-221086996" class="permalink"><time datetime="2006-01-14T15:29:58">2006-01-14T15:29:58</time></a>
            </div>
            <div class="content"><p>I've been working on a project using with canvas in layers, testing Firefox, Sa,fari and the Opera 9 beta (all on the Mac, with some testing of FF on a PC). My experience has been pretty good.</p>

<p>The following is from a note I sent to the canvas-developers Yahoo group.</p>

<p>I've implemented a first version of a draggable, zoomable map, using a
canvas and drawImage. The basic idea is to use a relatively
high-resolution map which the canvas 2d drawImage method can zoom and
pan as needed.</p>

<p>Here's a simple example, showing a button-driven interface to the zoom
pan (x-axis movement) tilt (y-axis movement) methods:</p>

<p><a href="http://www.entish.org/mapviewer/example.html" title="First example" rel="nofollow">http://www.entish.org/mapviewer/example.html</a></p>

<p>The second example is more what I want to be able to do, but I've run
into a couple of problems. One is that it seems relatively difficult
to reliably resize canvas elements. Another is that Safari seems to
require a 'click' to refresh the screen after a resize. </p>

<p><a href="http://www.entish.org/mapviewer/tube.html" title="Second example" rel="nofollow">http://www.entish.org/mapviewer/tube.html</a></p>

<p>I've also had 'artifact' problems from time to time under Safari when dragging text elements with borders on top of a canvas, but this isn't easy to recreate.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    