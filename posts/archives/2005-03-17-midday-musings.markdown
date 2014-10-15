---
comments_archived: true
date: '2005-03-17T11:34:23-05:00'
layout: post
title: Midday Musings
wordpress_id: 615
wordpress_slug: midday-musings
wordpress_url: http://www.decafbad.com/blog/?p=615
---
* Earworm snippet of the moment, "[Don't let the bastards grind you down.][u2]"

[u2]:http://phobos.apple.com/WebObjects/MZStore.woa/wa/viewAlbum?playlistId=368713&#38;selectedItemId=368683

* [PubSub][ps] has a pretty cool fade-out-on-focus overlay on their front-page search textarea.

[ps]:http://www.pubsub.com/

* [OmniWeb][ow] has a pretty cool form editor for textareas, invokable via a button at the top of the textarea's scroll button.  (And, yeah, I'm [bouncing][bounce] to OmniWeb right now, for some variety.)

[ow]:http://www.omnigroup.com/applications/omniweb/
[bounce]:http://www.decafbad.com/blog/2005/03/17/bouncing_browsers

* I really need to get some free time cleared up soon and attend to a refresh for this place.  My Movable Type install and everything else has been slowly rotting and it's starting to smell.  

  And, I really need to get some comment-spam plugins in place, which fell off my radar when I installed MT v3.  I've been neglecting my duties in approving comments, thus defeating their purpose in sparking conversation when I'm not around, not to mention showing some appreciation for all the valuable pointers and things people say.  (*Thank you for your comments, even if I don't get around to making them appear promptly!*)
  
  And hell, while I'm at it, I might even move over to WordPress.  
  
* Speaking of comments... [Pete commented][pete] on my SOAP musings thusly:

  > Sometimes I wonder if it&#8217;s just the hacker mentality or instant gratification, but whenever I dig into SOAP, I get bored with it and want to move on. When I dig into a RESTful API like Yahoo! has, it&#8217;s so darn quick and easy to kick out an idea that it gets done before I ever get a chance to be bored with it. In fact, I get done, and am still excited about it!

  I'm wondering if this isn't it in a nutshell for me and my taste for REST over SOAP.

[pete]:http://www.decafbad.com/blog/2005/03/09/techy_miscellaney#comment-4613

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221083200">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://rasterweb.net/raster/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=db0fab74bcb564ebb09295498b892fb6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://rasterweb.net/raster/">Pete Prodoehl</a>
                </div>
                <a href="#comment-221083200" class="permalink"><time datetime="2005-03-17T14:14:04">2005-03-17T14:14:04</time></a>
            </div>
            <div class="content">Please switch to WordPress. We could use more hackers with wild and crazy ideas. ;)</div>
            
        </li>
    
        <li class="comment" id="comment-221083201">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=a8e8cc16d25a51a0914efde23e523ce7&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Ben</a>
                </div>
                <a href="#comment-221083201" class="permalink"><time datetime="2005-03-17T15:01:14">2005-03-17T15:01:14</time></a>
            </div>
            <div class="content">Strangely enough, I'm the other way around as regards SOAP and REST. I like REST from a purist theoretical standpoint, but I like the fact that with SOAP (and XML-RPC) I can just call the functions I want from my programming language just like any other function, and all of the wacky marshalling and unmarshalling happens automatically.

With REST APIs, unless they are just returning raw data as the answer, you must parse whatever was returned to get the answer you were looking for.</div>
            
        </li>
    
        <li class="comment" id="comment-221083203">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://lion.taoriver.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b49f34733c8d7cf1120f83d6c21433df&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://lion.taoriver.net/">Lion Kimbro</a>
                </div>
                <a href="#comment-221083203" class="permalink"><time datetime="2005-03-18T02:11:55">2005-03-18T02:11:55</time></a>
            </div>
            <div class="content">Hm. I first used XML-RPC. Then, at the nudging of some friends, did HTTP programming. But now I'm moving back into XML-RPC land.

Why?

Because I haven't found a nice easy way to do RPC over HTTP in Python.

To make a simple call for some data by HTTP, I have to construct a query string, make the call, get the results, interpret them according to all the various details of HTTP (mainly MIME type and encoding possibilities, but it seems like I keep finding more little details to be respected as time goes by,) and then perform further interpretation of the returned document.

So, XML-RPC (or SOAP; they're practically identical) is looking much nicer again.

People say, "But it's so complicated!" And originally I was swayed by the argument. But, you know: After lots of frustration with figuring out how to communicate encoding, I said to myself: "Lion, HTTP isn't simple. It's primitive."

In XML-RPC, the only time I ever had to think about how it worked, was when I transfered DateTime values. But aside from that, everything else just worked. And I got so much stuff for free- Self-documenting servers by GET, introspection by XML-RPC, automaticly unpacked data.

Sure, it may be complex underneath. I guess. (It's an XML format, it doesn't strike me as so wild.) Sure, it may be overhead.

But I know I get a lot more done with it, when I use it.

So, my sympathies have returned to XML-RPC.</div>
            
        </li>
    
        </ul>
    
        </div>
    