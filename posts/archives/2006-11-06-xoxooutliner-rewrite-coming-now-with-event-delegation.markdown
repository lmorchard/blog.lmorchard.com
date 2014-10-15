---
comments_archived: true
date: '2006-11-06T13:14:26-05:00'
layout: post
tags:
- asides
- webdev
- outliners
- javascript
- xoxooutliner
- projects
- eventdelegation
title: XoxoOutliner rewrite coming, now with event delegation
wordpress_id: 1013
wordpress_slug: xoxooutliner-rewrite-coming-now-with-event-delegation
wordpress_url: http://decafbad.com/blog/2006/11/06/xoxooutliner-rewrite-coming-now-with-event-delegation
---
For what it's worth: I've answered my own [question about event delegation based drag and drop][ednd].  It seems to work quite well on my machine, which is quite a bit beefier than my old machine.  I should try it out on there soon.  But, I'll hopefully be releasing it soon in the form of a mostly-rewritten [XoxoOutliner][xo] that will feature drag and drop outline items as well as keyboard navigation/control and in-place editing.  And, it should actually start to become useful, since I plan to also whip up a PHP-based server side bit that will handle loading and saving outlines, as well as possibly a client-side bit that can save outlines using local browser storage.  I have the technology - we'll see how far my ambitious plans take me during this hobbling sprint of development.

[xo]: http://decafbad.com/trac/wiki/XoxoOutliner
[ednd]: http://decafbad.com/blog/2006/10/31/event-delegation-based-dhtml-drag-and-drop

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087316">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://db79.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=db8059b0ce0b3cf393f4de0ad7af758f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://db79.com">Shawn Medero</a>
                </div>
                <a href="#comment-221087316" class="permalink"><time datetime="2006-11-07T11:01:11">2006-11-07T11:01:11</time></a>
            </div>
            <div class="content"><p>Great news Les! I had checked out the souce of XoxoOutliner and was thinking about playing around myself. Let me know if you'd like an additional tester. :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087318">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://overstimulate.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=50d10a8864accf0b2522c326381a4702&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://overstimulate.com">Jesse Andrews</a>
                </div>
                <a href="#comment-221087318" class="permalink"><time datetime="2006-11-08T18:18:11">2006-11-08T18:18:11</time></a>
            </div>
            <div class="content"><p>Is there a demo of the event delegation framework you are building posted?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087319">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221087319" class="permalink"><time datetime="2006-11-08T18:23:29">2006-11-08T18:23:29</time></a>
            </div>
            <div class="content"><p>Nope, nothing available or posted yet.  Soon, though - hoping to check the works in before the end of the week.  It's a bit in pieces right now</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087320">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://codinginparadise.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=96da1b3d8858bfa0306b7c55d3e48270&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://codinginparadise.org">Brad Neuberg</a>
                </div>
                <a href="#comment-221087320" class="permalink"><time datetime="2006-11-29T09:57:04">2006-11-29T09:57:04</time></a>
            </div>
            <div class="content"><p>Les, very exciting that you're jumping back into the XoXoOutliner code! I can't wait to try to hook it up to HyperScope and play with it some more. It's the best open source DHTMLly outliner out there.</p>

<p>Two things that might help you; for local storage, I just checked in a new storage provider for Dojo Storage that will use the native storage abilities in Firefox 2 if they are available, in an automagic way; if they aren't there, then it will revert to hidden Flash like it's worked in the past. This might be useful for you; don't know what you were thinking about for local storage. There's a page up with better docs on Dojo Storage now at http://manual.dojotoolkit.org/WikiHome/DojoDotBook/Book50</p>

<p>The second thing is I just finished an HTML to OPML outline transformer; right now it adds in the line for the HyperScope XSLT stylesheet, but it can be used by any OPML hackers who want to play with bringing HTML into the OPML world, including for things like experimenting with the kind of OPath, deep linking, and inclusion work you've hinted about in other blog entries. A blog post on it is here: http://codinginparadise.org/weblog/2006/11/html-transformer-for-hyperscope-apply.html . Might be fun for you to use in your hacking.</p>

<p>We still need to grab drinks some time! How is your leg healing up? Hope you had a great thanksgiving.</p>

<p>Best,
  Brad</p></div>
            
        </li>
    
        </ul>
    
        </div>
    