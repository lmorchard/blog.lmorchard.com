---
comments_archived: true
date: '2006-04-04T15:49:02-04:00'
layout: post
tags:
- asides
title: 'S3: Next Big Thing?'
wordpress_id: 923
wordpress_slug: s3-next-big-thing
wordpress_url: http://decafbad.com/blog/2006/04/04/s3-next-big-thing
---
 <p>So last night, I started making good on the implied threat contained in <a href="http://blogs.opml.org/decafbad/2006/04/03#When:3:26:56PM">yesterday's idle musings about Amazon S3</a>.  I've started building <a href="http://decafbad.com/trac/wiki/S3Ajax">S3Ajax, an AJAX-based wrapper for Amazon's S3</a>.  Between S3, the OPML Community Server API, and what will hopefully come out of the Atom Publishing Protocol - I think web-based filesystem APIs have the potential to be a Next Big Thing.</p>
 <p>Imagine if Amazon S3 offered filtered RSS feeds of new files uploaded to a bucket.  And, imagine if that RSS feed listed those new files as BitTorrent enclosures, with a few item elements fed from metadata headers (ie. title, description, etc).  Instant podcasting.</p>
 <p>Also, imagine if Amazon connected an XSLT processor to S3 like they do with product searches.  You could turn a bucket listing into an RSS feed with an XSLT uploaded to S3 itself.</p>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086963">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=f3794e603ef53b0513ab45b6565ee457&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jeremy Dunck</a>
                </div>
                <a href="#comment-221086963" class="permalink"><time datetime="2006-04-04T22:31:05">2006-04-04T22:31:05</time></a>
            </div>
            <div class="content"><p>Les,
  Please make clear the license and known issues with S3Ajax.  I may use it as a basis for the GM API...</p>

<p>Cheers,
   Jeremy</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086964">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086964" class="permalink"><time datetime="2006-04-04T22:48:05">2006-04-04T22:48:05</time></a>
            </div>
            <div class="content"><p>Hmm... license - one of these days I should settle on a license for my stuff, more specific than Share and Enjoy.</p>

<p>For S3Ajax, as it stands right now I'm happy to call it Public Domain.  I'd like it if my name were mentioned somewhere in relation to it, but I won't raise a fuss if it isn't.  If you can find a use for it, you're welcome to have at it!</p>

<p>At some point in the future, I may attach something like an MIT or BSD license to it.  The SHA1 implementation I'm using is under MIT, which is the lynchpin of the authentication bits.</p>

<p>As for known issues, it's had about 4 hours' exploration and testing so far and seems to work fairly well.  It's had no stress testing, but I've been able to authenticate, upload/download content, and set metadata attributes through headers.  However, it could certainly use some test cases.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    