---
comments_archived: true
date: '2003-07-23T17:00:37-04:00'
layout: post
title: HTTP/1.1 From header and FOAF use in RSS aggregators
wordpress_id: 448
wordpress_slug: from-foaf-rss
wordpress_url: http://www.decafbad.com/blog/?p=448
---
<blockquote cite="http://diveintomark.org/archives/2003/07/21/atom_aggregator_behavior_http_level.html#c003152"><i>Privacy issues aside (for the moment), there is a request header called "FROM", RFC 2616 s14.22 describes it. 

<br /><br />
Now, it does say it should, if given, contain an Internet e-mail address for the human user who controls the requesting user agent.  SHOULD isn't MUST though, so what putting the user's homepage there?

<br /><br />
It also says "In particular, robot agents SHOULD include this header so that the person responsible for running the robot can be contacted if problems occur on the receiving end."</i></blockquote><div class="credit" align="right"><small>Source: <cite><a href="http://diveintomark.org/archives/2003/07/21/atom_aggregator_behavior_http_level.html#c003152">eric scheid: Atom aggregator behavior (HTTP level) [dive into mark]</a></cite></small></div>	<p>Ask a <a href="http://diveintomark.org/archives/2003/07/21/atom_aggregator_behavior_http_level.html#c003136">stupid question</a> , get a <a href="http://diveintomark.org/archives/2003/07/21/atom_aggregator_behavior_http_level.html#c003152">smart answer</a> .</p>

	<p>Last year, I thought it was a good idea to <a href="http://www.decafbad.com/blog/tech/old/oooahe.html">abuse referers</a> in order to leave footprints behind when I consume <span class="caps">RSS</span> feeds.  Then, this past January, the abuse in the practice was revealed and <a href="http://www.decafbad.com/blog/tech/old/ooodoe.html">using the User-Agent header</a> was recommended for this.</p>

	<p>So, just for the hell of it, I <a href="http://diveintomark.org/archives/2003/07/21/atom_aggregator_behavior_http_level.html#c003136">asked about the User-Agent header</a> for use in the context over at <a href="http://www.diveintomark.org">Mark&#8217;s place</a> to see what responses I&#8217;d get.  The one that seemed most informative was from <a href="http://IAwiki.net/EricScheid">Eric Scheid</a> as quoted above, referring me to <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.22">the <span class="caps">HTTP</span>/1.1 spec, section 14.22</a></p>

	<p>As per Eric&#8217;s comment and the spec, the value of a &#8220;From&#8221; header <span class="caps">SHOULD</span> be an email address, but I would think that using a <span class="caps">URL</span> wouldn&#8217;t be <strong>too</strong> much an abuse of this header.  Seems like a good idea to stick either the <span class="caps">URL</span> to a blog here, or even better, stick the <span class="caps">URL</span> to your <span class="caps">FOAF</span> file here.</p>

	<p>I&#8217;d really like to see this get built into aggregators as an option, though not turned on by defauilt for privacy&#8217;s sake.  I like the idea of leaving my name or a trail back to me at the doorstep of people whose feeds I&#8217;m reading, and I like the idea of standardizing the practice as cleanly as possible.  Using the &#8220;From&#8221; header seems to be the best option so far, versus header abuse and User-Agent overloading.</p>

	<p>Man.  One of these days, I really have to get around to studying those specs in full, rather than just sporadically referencing them.  Thank goodness for smart guys like <a href="http://www.diveintomark.org">Mark</a> and <a href="http://IAwiki.net/EricScheid">Eric</a> (among others) who actually take the time to read these things and try to communicate the gist to the rest of us busy developers!</p>
<!--more-->
shortname=from_foaf_rss

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086743">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.braino.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=1958f40a3ea1b8af56f7453922769c9a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.braino.org">Daniel Von Fange</a>
                </div>
                <a href="#comment-221086743" class="permalink"><time datetime="2003-07-23T17:47:41">2003-07-23T17:47:41</time></a>
            </div>
            <div class="content">Oh yeah. I would love to be able to visit the web sites of those that visit my site.</div>
            
        </li>
    
        <li class="comment" id="comment-221086744">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.neuro-tech.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b4640a2aa10a051f34e0caa50ed7dd26&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.neuro-tech.net/">Luke</a>
                </div>
                <a href="#comment-221086744" class="permalink"><time datetime="2003-07-23T19:13:37">2003-07-23T19:13:37</time></a>
            </div>
            <div class="content">Why not for the From: header use a hash of the e-mail address? Preferably a secure one like SHA or MD5.</div>
            
        </li>
    
        <li class="comment" id="comment-221086745">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086745" class="permalink"><time datetime="2003-07-23T22:25:18">2003-07-23T22:25:18</time></a>
            </div>
            <div class="content">Well, a hash would work if I already knew the person or had them in my FOAF network somewhere.  But, I want to know about new and unexpected readers and follow them back to their blogs and feeds.</div>
            
        </li>
    
        <li class="comment" id="comment-221086746">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://boston.conman.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=778e89305f331b88a87a94b348164df8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://boston.conman.org/">Sean Conner</a>
                </div>
                <a href="#comment-221086746" class="permalink"><time datetime="2003-07-23T23:17:38">2003-07-23T23:17:38</time></a>
            </div>
            <div class="content">I would recommend that if you do this with the From: header, to put the URL in parenthesis, as according to RFC-2822 this is considered a comment and code using RFC-2822 parsing for this field (since it's intended to contain an email address) won't choke on it.</div>
            
        </li>
    
        <li class="comment" id="comment-221086747">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://boston.conman.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=778e89305f331b88a87a94b348164df8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://boston.conman.org/">Sean Conner</a>
                </div>
                <a href="#comment-221086747" class="permalink"><time datetime="2003-07-23T23:17:48">2003-07-23T23:17:48</time></a>
            </div>
            <div class="content">I would recommend that if you do this with the From: header, to put the URL in parenthesis, as according to RFC-2822 this is considered a comment and code using RFC-2822 parsing for this field (since it's intended to contain an email address) won't choke on it.</div>
            
        </li>
    
        <li class="comment" id="comment-221086748">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://boston.conman.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=778e89305f331b88a87a94b348164df8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://boston.conman.org/">Sean Conner</a>
                </div>
                <a href="#comment-221086748" class="permalink"><time datetime="2003-07-23T23:26:32">2003-07-23T23:26:32</time></a>
            </div>
            <div class="content">Sorry about the double post there; the feedback on posting isn't clear that it was actually posted.

Also, it is instructive to read through the specs from time to time.  A friend is writing a webserver by following RFC-2616 and it's not always exactly clear what needs to be done; there have been times when we've had discussions over what this or that means in the spec (and occasionally we cheat by looking at Apache &ldquo;under the hood&rdquo; (so to speak&mdash;bet you didn't know you could include comments in header fields, eh?)</div>
            
        </li>
    
        <li class="comment" id="comment-221086749">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://xml.mfd-consult.dk/foaf/explorer/?foaf=http://xml.mfd-consult.dk/foaf/morten.rdf"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cadacfd515d0d18c80c3a0b45675bfb0&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://xml.mfd-consult.dk/foaf/explorer/?foaf=http://xml.mfd-consult.dk/foaf/morten.rdf">Morten Frederiksen</a>
                </div>
                <a href="#comment-221086749" class="permalink"><time datetime="2003-07-24T06:10:09">2003-07-24T06:10:09</time></a>
            </div>
            <div class="content">Please note that pointing to a FoaF file may not be enough to identify a specific person - usually more than one person is described in each file.</div>
            
        </li>
    
        </ul>
    
        </div>
    