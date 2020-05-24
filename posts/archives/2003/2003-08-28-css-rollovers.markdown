---
comments_archived: true
date: '2003-08-28T21:41:54-04:00'
layout: post
title: CSS, Background Images, and Rollovers
wordpress_id: 468
wordpress_slug: css-rollovers
wordpress_url: http://www.decafbad.com/blog/?p=468
---
<blockquote cite="http://aaronland.info/html/css/20030828-css-toggle-images.html"><i>It occurred to me that this ought to be possible by reassigning a  container's background-image property when it is  :hover-ed.</i></blockquote><div class="credit" align="right"><small>Source: <cite><a href="http://aaronland.info/html/css/20030828-css-toggle-images.html">Images and thumbnails, a pure CSS hack</a></cite> (via <a href="http://localhost:8088/bytime_bayes.rpy/?since=2003-08-28T17%3A00%3A00-05%3A00&max=600&offset=0">dbagg: Items by Time</a>)</small></div>	<p>Yup, and you can do the same for every other pseudo-class of an anchor tag.  I read about this via <a href="http://www.oreillynet.com/pub/a/javascript/2001/03/23/rollovers.html">Eric Meyer&#8217;s article</a> on the O&#8216;Reilly Network.  I&#8217;m still very much a <span class="caps">CSS</span> neophyte, but it&#8217;s helped me incredibly at work, where I was able to create a site layout with one set of <span class="caps">HTML</span> pages styled by a small library of <span class="caps">CSS</span> files for look &#38; feel.</p>

	<p>Yeah, yeah, that&#8217;s what it&#8217;s for, you say.  But it surprised the hell out of me that I was able to abuse background image properties of containers to create JavaScript-free rollovers, as well as select between completely different image-based layout elements.  This isn&#8217;t pure utopian <span class="caps">CSS</span> that I&#8217;m doing, and most of my position is still with tables, but thanks to blank pixel images atop <span class="caps">CSS</span>-controlled background images, I can do what I think are amazing things.</p>

	<p>Now I just have to break free of the rest of my <span class="caps">HTML</span> crutches, circa 1996.</p>
<!--more-->
shortname=css_rollovers

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221083562">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://stormsweeper.net/mindspill/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=680ed7c3702b9ab80e619ee519f7fabf&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://stormsweeper.net/mindspill/">anthony</a>
                </div>
                <a href="#comment-221083562" class="permalink"><time datetime="2003-08-29T01:09:37">2003-08-29T01:09:37</time></a>
            </div>
            <div class="content">The :hover pseudoelement only works for anchor tags in MSIE, just so you know. There's workarounds for it, but they're all pretty ugly. 

The strange implementation of CSS in Internet Explorer is one of my greater headaches. Just wait until you start trying to position elements using float.

(PS: I'm the anthony from the FC list, found your site linked from Greg's)</div>
            
        </li>
    
        </ul>
    
        </div>
    