---
comments_archived: true
date: '2005-03-06T21:16:35-05:00'
layout: post
title: Quick Tales from a Busy Weekend
wordpress_id: 605
wordpress_slug: quick-tales-from-a-busy-weekend
wordpress_url: http://www.decafbad.com/blog/?p=605
---
* I wish I could find a cheap iPod car installation kit for my 2004 Ford Focus.  

  No, not a lighter adapter for power and an iTrip--I already have those.  I want one of those snazzy boxes that jack the iPod in as a CD changer.  However, not only do they tend to cost as much as an iPod, but no one seems to offer one for my 2004 Ford Focus.  :(

* Why on Earth does the [Google API][gapi] use Julian dates?

  I could understand using Julian if, maybe, you wanted to catch things published before the birth of Christ.  But, I would think that seconds since the Unix epoch would be more than adequate for anything web-related.
  
  But then again, I really don't know much about dates.

[gapi]: http://www.google.com/apis/

* Also... it's been awhile since last I played with the [Google API][gapi].  What, no REST API?  I was having fun with the Amazon and Yahoo APIs today, then ran into a wall of SOAP when I visited Google.

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082927">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://trikuare.cx/mt/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=1ea5ff5011b97bde940f38b83cbac74e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://trikuare.cx/mt/">fluffy</a>
                </div>
                <a href="#comment-221082927" class="permalink"><time datetime="2005-03-07T09:49:21">2005-03-07T09:49:21</time></a>
            </div>
            <div class="content">For some reason, a LOT of Internet APIs use Julian dates.  HTTP cookies, for example.  RFC-2822 is a very specific date format which high-level Internet protocols are supposed to use.

One good reason to use RFC-2822 textual dates instead of UNIX epoch times is that they're totally unambiguous (because you know exactly what timezone they're in among other things), and also they won't totally bork up in 2038.</div>
            
        </li>
    
        <li class="comment" id="comment-221082929">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://laughingmeme.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=858042a97c035a51ca2097eac37422b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://laughingmeme.org">kellan</a>
                </div>
                <a href="#comment-221082929" class="permalink"><time datetime="2005-03-07T10:56:24">2005-03-07T10:56:24</time></a>
            </div>
            <div class="content">a whole slew of date calculations become easier with julian dates, in no small part because all the real calendar geeks are astronomers and they all use julian dates (kind of an open source argument).  in particular the bible of date calculation, "Calendrical Calculations" by Reingold is all in Julian dates.  this leads many date libs to use JD as their internal representation, which makes it easier to program in, etc.</div>
            
        </li>
    
        <li class="comment" id="comment-221082931">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=eb7f2a3ba74af37415ab7df101a86c75&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">l.m. orchard</a>
                </div>
                <a href="#comment-221082931" class="permalink"><time datetime="2005-03-07T16:35:09">2005-03-07T16:35:09</time></a>
            </div>
            <div class="content">kellan: Thanks - I knew there had to be *some* sensible reason for the dates.  I tend to like UNIX epoch times, because they're just seconds--which mostly covers up for my complete ignorance and utter fear of calendar calculations brought on mostly by the Java APIs.  

Sometimes I like a good ISO-8601 date, although I've been paying more attention to RFC 2822

For the most part, I'd rather not think about it.</div>
            
        </li>
    
        </ul>
    
        </div>
    