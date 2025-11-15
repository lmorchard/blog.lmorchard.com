---
comments_archived: true
date: '2006-03-25T23:14:29-05:00'
layout: post
title: About XoxoOutliner
wordpress_id: 916
wordpress_slug: about-xoxooutliner
wordpress_url: http://decafbad.com/blog/2006/03/25/about-xoxooutliner
---
 <p>So, I keep making vague references to some cool things I want to work on.  Well, rather than staying cagey and in some lame sort of stealth mode - here's an early release, because I want to get some of it out of my head and onto the web.</p>
 <p>Last summer, in a fit of manic love for XOXO, I started writing <a href="http://decafbad.com/blog/2005/07/12/xoxo-outliner-experiment">a browser-based outliner</a>.  I got busy and had to leave it for awhile, but kept meaning to get back to it.  A few months ago, I <a href="http://decafbad.com/trac/browser/trunk/XoxoOutliner/js/XoxoOutlinerKit.js" title="XoxoOutlinerKit.js">totally rewrote that code</a> to correct some memory leaks, streamline some things, and generally employ a few more of the tricks I've learned since last July.  It's still got some work to go.</p>
 <p>The idea I think is most cool about this outliner is that it uses the browser's own data structures in the DOM to both represent and display the outline data.  But, this code doesn't offer any way to get edited outlines into or out of the browser's DOM.  Pointless editing of statically-served XOXO outlines as a demo was all I had.  </p>
 <p>In fact, back in July, <a href="http://microformats.org/blog/2005/07/13/xoxo-outline-editor-in-javascript/">Tantek &Ccedil;elik mentioned my XOXO outline experiment</a> on microformats.org and mused: '<i>Imagine what you could do with some AJAX to "autosave" this XOXO outline to the server, and allow multiple users to edit different subpoints simultaneously.</i>'  Hold that thought, because I think I'm about to get a bit closer to that goal.</p>
 <p>The OPML Community Server has a very simple, yet useful API for managing and transferring files via XML-RPC.  In a lot of ways, I think it's competition for the Atom Publishing Protocol.  But, say - did you know that you can do <a href="http://www.vcdn.org/Public/XMLRPC/">XML-RPC from a browser via AJAX</a>?  Well, that particular implementation is a bit old and seems buggy, so <a href="http://decafbad.com/trac/browser/trunk/XoxoOutliner/js/myXMLRPC.js" title="myXMLRPC.js">I've started gutting it and rewriting it myself</a>.  So, I can call the OPML Community Server API from a browser - now I need a way to turn in-browser outlines into data I can ship around with the API.</p>
 <p>Well, that's where this next piece of the puzzle comes in: <a href="http://decafbad.com/trac/browser/trunk/XoxoOutliner/js/XoxoOutliner/Conversions.js" title="XoxoOutliner/Conversions.js">JavaScript functions to convert between XOXO and OPML data and browser DOM structures</a>.</p>
 <p>So, I've got the pieces in code to go round trip from XOXO and OPML data on a server; to a browser's DOM where it can be edited by way of a JavaScript-driven UI; and back to the server again.  These parts aren't welded together in any form remotely close to finished, but hopefully that's what I'll get around to doing under the project I've named <a href="http://decafbad.com/trac/wiki/XoxoOutliner">XoxoOutliner</a>.  In my own carefully controlled conditions, I've been able to load up, edit, and save outlines on my own <a href="http://decafbad.com/trac/wiki/OpmlServer">barely-functional OpmlServer</a> - as well as on <code>blogs.opml.org</code> itself.</p>
 <p>What's all this mean?  Well, if I never get a chance to actually finish this, maybe someone can make use of the parts I've linked to here.  Otherwise, it could soon mean direct in-browser editing of OPML outlines and blogs with OPML Community Server integration.  Combine that with the <a href="http://support.opml.org/2005/07/18">OPML Editor's ability to synch up with changed files</a>, and you can edit while you're away and later bring that content back into the more fully-capable desktop application.  (Thanks to <a href="http://blogs.opml.org/amyloo/">Amyloo</a> for pointing me toward that particular trick!)</p>
 <p>Don't hold your breath on my account, though:  I'm in pretty much over my head with work at the moment, so this post is more or less an escape pod for my ideas in case I don't quite make it out of this hole.  <img src="c5e8cc822100.gif">  Feel free to steal the pieces.</p>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088015">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://donovanwatts.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=188ad8b4dc99107d22c8b868e45f0508&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://donovanwatts.com/">Donovan Watts</a>
                </div>
                <a href="#comment-221088015" class="permalink"><time datetime="2006-03-27T06:46:09">2006-03-27T06:46:09</time></a>
            </div>
            <div class="content"><p>go les... sounds very cool.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088017">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dannyayers.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7028f422ca6da0180de6c9d922a3228f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dannyayers.com">Danny</a>
                </div>
                <a href="#comment-221088017" class="permalink"><time datetime="2006-04-01T12:13:52">2006-04-01T12:13:52</time></a>
            </div>
            <div class="content"><p>Does sound cool.
A kind-of feature request. I'd very much like to try out your code with the <a href="http://wymiwyg.org/knobot" rel="nofollow">blog backend</a> I'm now using. But I don't really fancy writing code to support  XML-RPC when a POST should be enough, also I don't really have any need for the OPML. So I'd be very grateful if you could somehow add hooks, or at least indicate in the code where to snip the bits I wouldn't need.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088019">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221088019" class="permalink"><time datetime="2006-04-01T16:10:01">2006-04-01T16:10:01</time></a>
            </div>
            <div class="content"><p>Danny: Sure - one of the next APIs I was thinking of tackling once I'd found a good implementation of it was the APP.  All the parts are there in rough form, I think.  There's a method <code>XoxoOutliner.Conversions.fromDOMtoXOXO(ele)</code> that takes a UL or OL node from the DOM and attempts to serialize it as XOXO, stripping out all the crud injected to manage the UI.</p>

<p>So, maybe <code>data = XoxoOutliner.Conversions.fromDOMtoXOXO($('outline1'))</code> will get you an XOXO string for the first outline on the page, depending on what ID it has.  ('outline1' is auto-assigned if none already given)</p>

<p>You should be able to then make a POST request with XMLHttpRequest using that data as the body, or whatever your API requires.  HAving not yet had a chance to try it, of course, it probably needs some work yet</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088021">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dannyayers.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7028f422ca6da0180de6c9d922a3228f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dannyayers.com">Danny</a>
                </div>
                <a href="#comment-221088021" class="permalink"><time datetime="2006-04-01T21:03:48">2006-04-01T21:03:48</time></a>
            </div>
            <div class="content"><p>Excellent, thanks Les.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    