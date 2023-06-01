---
comments_archived: true
date: '2005-12-18T23:17:55-05:00'
layout: post
tags:
- asides
- ajax
- json
- webdev
- xml
title: Okay, okay, JSON is pretty hot
wordpress_id: 802
wordpress_slug: okay-okay-json-is-pretty-hot
wordpress_url: http://decafbad.com/blog/?p=802
---
The XML <strike>purist</strike> fanboy in me has had me *pshaw*'ing at JSON.  But, now that [the recent JSON release from Yahoo!][yj] reminded me of its existence and I [gave it a shot][gs] myself, I have to admit that it's pretty hot—if only for the cross-domain bridging capabilities and the no-fuss parsing.

Although, I do worry about running into a poisoned payload someday that raids my cookie jar. 

<!-- tags: webdev ajax json xml -->

[yj]: http://ws1.inf.scd.yahoo.com/common/json.html
[gs]: http://decafbad.com/2005/12/FeedMagick/docs/json-demo.html

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082692">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://beesbuzz.biz/"><img src="http://disqus.com/api/users/avatars/plaidfluff.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://beesbuzz.biz/">fluffy</a>
                </div>
                <a href="#comment-221082692" class="permalink"><time datetime="2005-12-19T06:50:57">2005-12-19T06:50:57</time></a>
            </div>
            <div class="content"><p>JSON is currently the big Hot Thing at work.  It's very good for some things, but IMO it's not nearly as robust as XML as far as generic interchange goes.  Its big drawback is that it's not nearly as flexible, and since elements are either unordered or stored in an array, you have to agree upon the actual structure of the document before you send it across the wire (which isn't so much the case with XML where often all you care about is the nesting order which you can handle with XPath or similar).</p>

<p>It's GREAT for AJAX though, as long as you can trust the server of course.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082695">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.whump.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=152a649080e99c313ecae9a34c60d11d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.whump.com/">Bill Humphries</a>
                </div>
                <a href="#comment-221082695" class="permalink"><time datetime="2005-12-19T07:26:09">2005-12-19T07:26:09</time></a>
            </div>
            <div class="content"><p>I thought <a href="http://microformats.org/wiki/rest/ahah" rel="nofollow">AHAH</a> was the current big thing. Just send HTML to the client and use <code>Element.innerHTML</code>.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    