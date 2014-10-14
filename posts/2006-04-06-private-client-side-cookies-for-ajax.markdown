---
comments_archived: true
date: '2006-04-06T09:46:38-04:00'
layout: post
tags:
- asides
title: Private client-side cookies for AJAX?
wordpress_id: 925
wordpress_slug: private-client-side-cookies-for-ajax
wordpress_url: http://decafbad.com/blog/2006/04/06/private-client-side-cookies-for-ajax
---
 <p>Along with the S3 stuff I'm poking at in AJAX, I'd like to retain the user's key ID and secret for S3 locally so that it doesn't need to be reentered all the time or stuck into constants on a server-held file.  But, I don't want to stick it into cookies or anything that will go over the wire - since the whole point of the HMAC authentication is to prevent that from happening.</p>
 <p>I've looked at <a href="http://codinginparadise.org/projects/storage/README.html">AMASS</a>, but it appears to be broken on Mac - which is a non-starter for me on my PowerBook.  I'm wondering if there's any other practical way to retain a pair of strings locally across browsers for an AJAX app.  Because, beyond just that bit of local storage requirement, I've got entire vistas of persistence available on S3.</p>
 <p>I suppose I could stick the credentials in a cookie, then further encrypt them with a friendlier username / passphrase.  The main issue I see with constantly reentering the credentials is that they're these big honking strings that I'll never be able to remember like a username and password.</p>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082724">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://crazybob.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2f44965b6a70761c7242eb9ca04bd5e7&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://crazybob.org/">Bob Lee</a>
                </div>
                <a href="#comment-221082724" class="permalink"><time datetime="2006-04-06T19:07:54">2006-04-06T19:07:54</time></a>
            </div>
            <div class="content"><p>Use Flash's client side storage.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082727">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082727" class="permalink"><time datetime="2006-04-06T19:29:30">2006-04-06T19:29:30</time></a>
            </div>
            <div class="content"><p>That's pretty much what I assumed AMASS did, but it doesn't work on Mac.  Not sure why though, if it's doing something weird above and beyond Flash client-side storage.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082728">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://codinginparadise.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=96da1b3d8858bfa0306b7c55d3e48270&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://codinginparadise.org">Brad Neuberg</a>
                </div>
                <a href="#comment-221082728" class="permalink"><time datetime="2006-04-07T07:28:20">2006-04-07T07:28:20</time></a>
            </div>
            <div class="content"><p>Hey, I just checked in dojo.storage, which now works on Safari and Firefox/Mac! It's in the head of Dojo, so check it out and see if it works for you; play with src/tests/storage for examples and tests. dojo.storage is the new iteration of AMASS, more stable, cross-platform, and generic for other kinds of storage backends.</p>

<p>Best,
  Brad Neuberg</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082730">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082730" class="permalink"><time datetime="2006-04-07T15:37:23">2006-04-07T15:37:23</time></a>
            </div>
            <div class="content"><p>Brad:  That's hot.  I curse you for making me dive into learning yet another JS framework besides MochiKit.  :)  I may just pluck the storage module out of there, but the rest of Dojo looks keen too.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082731">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://diveintomark.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=357a20e8c56e69d6f9734d23ef9517e8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://diveintomark.org/">Mark</a>
                </div>
                <a href="#comment-221082731" class="permalink"><time datetime="2006-04-07T20:04:46">2006-04-07T20:04:46</time></a>
            </div>
            <div class="content"><p>Agreed.  Dojo rocks my world.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    