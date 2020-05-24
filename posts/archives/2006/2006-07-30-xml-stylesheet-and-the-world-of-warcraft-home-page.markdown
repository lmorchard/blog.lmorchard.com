---
comments_archived: true
date: '2006-07-30T14:59:38-04:00'
layout: post
title: xml-stylesheet and the World of Warcraft home page
wordpress_id: 960
wordpress_slug: xml-stylesheet-and-the-world-of-warcraft-home-page
wordpress_url: http://decafbad.com/blog/2006/07/30/xml-stylesheet-and-the-world-of-warcraft-home-page
---
<p>The day before we left Michigan, my best friend and Best Man presented me with a copy of World of Warcraft.  He and his girlfriend have been playing the game for quite some time now, and it's how they keep in touch with a few family members - and now, it looks like it'll be a way that they can keep in touch with me.  I can only hope that I don't get <em>too </em>sucked into the game.  :)</p>
<p>All of that aside, though, I just noticed something as I was making an initial pass at registering for a WoW account:  At the moment, <a href="http://www.worldofwarcraft.com/index.xml">the World of Warcraft front page</a> is broken.</p>
<p>It'll probably be fixed by the time you see it, but since my first impulse upon seeing an error is to "View Source", I noticed something further:  Their front page is XML, with an XSL processing instruction at the top.  I'm not sure if this is the way it has been for some time now, but I have to admit I never expected to see this trick used on a production website.  Turns out the page is broken because the XML document is unexpectedly truncated in a run of JS code, and so Firefox throws up the old "XML Parsing Error" page.</p>
<p>Now, the reason I never expected to see it on a production site is because I didn't think enough browsers supported the <code>xml-stylesheet</code> processing instruction.  And then, of course, there's the issue of serving up parsing errors from your front page when strict parsers refuse to humor your sudden tag soup.</p>
<p>But, I do have to say that I've harbored a wish to use <code>xml-stylesheet</code> on real sites for quite some time now.  A lot of the things done with a server-side content management system could be pushed off to the client - things like headers and footers and sidebar assembly and includes.  And it just feels nice to make the client do some of the work for you, taking some weight off the poor abused servers.</p>
<p>On the other hand, I sure do wish that the WoW front page wasn't broken right now.
</p>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090469">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.negatendo.net/~brett/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4c39d783a464ec45de052c62873b4ac0&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.negatendo.net/~brett/">Brett O'Connor</a>
                </div>
                <a href="#comment-221090469" class="permalink"><time datetime="2006-07-30T21:00:28">2006-07-30T21:00:28</time></a>
            </div>
            <div class="content"><p>If you go to <a href="http://www.worldofwarcraft.com/index.xml" rel="nofollow">http://www.worldofwarcraft.com/index.xml</a> it works.</p>

<p>And yea, they made that change just last month. I've seen the parsing errors like that at least three times since then.  All of them have had to do with the non-"www" hostname. I wonder why?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090471">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://ejohn.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b3e04a46e85ad3e165d66f5d927eb609&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://ejohn.org/">John Resig</a>
                </div>
                <a href="#comment-221090471" class="permalink"><time datetime="2006-07-30T21:23:33">2006-07-30T21:23:33</time></a>
            </div>
            <div class="content"><p>Wow, that's really interesting - I wonder if they serve things up based upon the user agent that's used. If not, I wonder how they deal with search engine indexing.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090472">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221090472" class="permalink"><time datetime="2006-07-31T09:18:40">2006-07-31T09:18:40</time></a>
            </div>
            <div class="content"><p>It’s a fine idea, as long as you remember that the untransformed markup must be able to pass for HTML that is navigable as is, lest you shut out search engines, speech browsers etc.</p>

<p>If I made use of this, I’d serve up actual XHTML and use the stylesheet only to insert repetitious bits of markup. Now that I think about that, it might in fact be a sweet way to inject the extra non-semantic markup required by the easy techniques for rounded corners or sliding doors, without actually touching the document. Oh, oh! Zebra tables! Hmmmm, now I’m thinking.</p>

<p>Gotta investigate.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090474">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221090474" class="permalink"><time datetime="2006-07-31T14:04:05">2006-07-31T14:04:05</time></a>
            </div>
            <div class="content"><p>Aristotle:  Of course, if you use it that way, you might as well throw in some unobtrusive JS to wrangle the DOM into desired shape.  I wonder which is more efficient to run, and which would be smoother to write?  JS and DOM scripting leads to all sorts of uncomfortable loops that make me wish for XSL's XPath matches...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090475">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://george.hotelling.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c7d1c8d2b1a7643236a4661e9a974dee&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://george.hotelling.net/">George Hotelling</a>
                </div>
                <a href="#comment-221090475" class="permalink"><time datetime="2006-07-31T14:38:53">2006-07-31T14:38:53</time></a>
            </div>
            <div class="content"><p>I suspect that WoW's audience consists of earlier-than-average adopters, so they can expect the latest browser versions.  The only way to know whether or not you can pull it off (from a business perspective) is by looking at your user agent headers in your logs.</p>

<p>That said, I am in love with the idea of replacing most of my DOM scripting with XSL.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090476">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://xmlhacker.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5159227f15ff6247f88542812f866c4f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://xmlhacker.com">M. David Peterson</a>
                </div>
                <a href="#comment-221090476" class="permalink"><time datetime="2006-07-31T15:48:14">2006-07-31T15:48:14</time></a>
            </div>
            <div class="content"><p>Hi Leslie,</p>

<p>This has been an area of keen interest, and in particular, specialized research and development[1], for over three years now.  Opera was the last of the major browser vendors to add XSLT support  -- while there are still a few broken areas[2, 3], things are getting better.  In short, IE 5.x+, Mozilla, and Safari <em>ALL</em> support XSLT 1.0, with Opera only a few functions short of full support.</p>

<p>Theres a lot that can be done in this area, and dependent on a few factors that may boost its arrival, expect to see a TON more in this area from my direction in regards to OSS software projects released that build and extend from this in a BIG way.</p>

<p>[1] http://www.xsltblog.com/archives/2005/12/finally<em>someone</em>1.html
[2] http://www.oreillynet.com/xml/blog/2006/06/opera<em>90</em>final<em>released.html
[3] http://www.oreillynet.com/xml/blog/2006/07/no</em>sign<em>of</em>document<em>function</em>b.html</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090477">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.ryaneby.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a39511a191d7d36ac030ae25f0fb3121&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.ryaneby.com">Eby</a>
                </div>
                <a href="#comment-221090477" class="permalink"><time datetime="2006-07-31T16:20:06">2006-07-31T16:20:06</time></a>
            </div>
            <div class="content"><p>The change was recent. I think there are some posts around about the change. Before it was a table-based tag soup that took forever to load. It still is some soup but it looks much lighter then it did back then. They most likely did the change to save on bandwidth and/or make things easier to change. I postponed my account awhile back though.</p>

<p>They don't seem to advertise it but they now appear to finally have RSS for the news:</p>

<p>www.worldofwarcraft.com/rss.xml</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090480">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221090480" class="permalink"><time datetime="2006-07-31T20:21:28">2006-07-31T20:21:28</time></a>
            </div>
            <div class="content"><blockquote>
  <p>if you use it that way, you might as well throw in some unobtrusive JS to wrangle the DOM into desired shape</p>
</blockquote>

<p>Yeah, but DOM scripting sucks so bad. :<b></b>( I like Javascript, but I hate DOM scripting. (My kingdom for widespread adoption of E4X.)</p>

<p>We do it because there’s no other way. But I really want a better way…</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090482">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://xmlhacker.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5159227f15ff6247f88542812f866c4f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://xmlhacker.com">M. David Peterson</a>
                </div>
                <a href="#comment-221090482" class="permalink"><time datetime="2006-08-01T01:00:54">2006-08-01T01:00:54</time></a>
            </div>
            <div class="content"><blockquote>
  </blockquote><blockquote>
    <p>Yeah, but DOM scripting sucks so bad. :( I like Javascript, but I hate DOM scripting. (My kingdom for widespread adoption of E4X.)</p>
  </blockquote>


<p>We do it because there’s no other way. But I really want a better way…
 &lt;&lt;</p>

<p>Amen to that!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090483">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://yelirekim.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9cb7044f7c6e829832f89ef0f12a8bb4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://yelirekim.com">Mike Riley</a>
                </div>
                <a href="#comment-221090483" class="permalink"><time datetime="2009-04-15T06:41:42">2009-04-15T06:41:42</time></a>
            </div>
            <div class="content"><p>I'm really confused as to why they have gone with this particular implementation, from the standpoint of separating content from design, using XML as the data layer and XSL as the display layer is completely beautiful.  But if you really look closely at the source of WOW's homepage, they actually have a lot of the content served up INSIDE THE XSL.  The XSL sheets are specific to each page, and it drives me insane trying to understand the logic behind doing this.</p>

<p>If you have any insight into it, please, drop me a line, because I'm at a loss.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    