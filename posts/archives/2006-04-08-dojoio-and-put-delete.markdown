---
comments_archived: true
date: '2006-04-08T12:08:43-04:00'
layout: post
tags:
- asides
title: dojo.io and PUT / DELETE
wordpress_id: 929
wordpress_slug: dojoio-and-put-delete
wordpress_url: http://decafbad.com/blog/2006/04/08/dojoio-and-put-delete
---
 <p>Just starting to delve into Dojo for S3Ajax, thanks to <a href="http://decafbad.com/blog/2006/04/06/private-client-side-cookies-for-ajax#comment-9602">the promise of `dojo.storage` for stashing security credentials locally</a>.  And, that <a href="http://dojotoolkit.org/docs/rich_text.html">Rich Text Editor</a> doesn't look shabby either.</p>
 <p>I'm having trouble using `dojo.io`, though.  I'm a little fuzzy on the cross-browser availability of PUT and DELETE methods in XMLHttpRequest objects.  So, I assume that's why `dojo.io` doesn't seem to allow them.</p>
 <p>Code I had working stopped once I swapped over to Dojo's AJAX stuff, which I seemed to root out in the `canHandle` function of `dojo.io.XMLHTTPTransport`.</p>
 <p>So, for now, I'm still rolling my own there.</p>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086654">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://codinginparadise.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=96da1b3d8858bfa0306b7c55d3e48270&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://codinginparadise.org">Brad Neuberg</a>
                </div>
                <a href="#comment-221086654" class="permalink"><time datetime="2006-04-28T06:28:40">2006-04-28T06:28:40</time></a>
            </div>
            <div class="content"><p>Yeah, Safari has trouble with PUTs, and some browsers don't support DELETE; this is why dojo.io only supports POSTS and GETs. I now model all PUTs as POSTs for this reason (including that mobile devices have trouble with wierd http verbs sometimes).</p>

<p>Your S3 work looks cool! Are you getting to use the new dojo.storage I just posted? It's new and improved! Also, have you played with Moxie? It would be cool to hook that up to S3, and have it sync its local files with S3 once you are online.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086655">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086655" class="permalink"><time datetime="2006-04-28T11:37:00">2006-04-28T11:37:00</time></a>
            </div>
            <div class="content"><p>I have gotten dojo.storage working with S3Ajax pretty well.  Although the S3 wiki is anonymous and public-write, I do have code that can use dojo.storage to stash the S3 security credentials locally and then attempt to auto-recall them at page load:</p>

<p>http://decafbad.com/trac/browser/trunk/S3Ajax/js/play.js#L37</p>

<p>My approach to waiting for availability of the data after page load is a bit awkward, though:</p>

<p>http://decafbad.com/trac/browser/trunk/S3Ajax/js/play.js#L24</p>

<p>And the only other thing I have with it is that I'd like a version that doesn't require the whole of Dojo, if all I need it the storage bit.  I've been trying to keep S3Ajax as focused and free of external dependencies as possible.  On the other hand, when used in building an actual application, I suppose I will be reaching for things like the Dojo rich text editor and the like.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    