---
comments_archived: true
date: '2003-11-18T20:36:31-05:00'
layout: post
title: VoodooPad gets an XML-RPC wiki API
wordpress_id: 507
wordpress_slug: voodoo-pad-wiki-api
wordpress_url: http://www.decafbad.com/blog/?p=507
---
<blockquote cite="http://flyingmeat.com/vpwiki.html">You wanted to share the same documents with your coworkers and friends. Now you can.

With VoodooPad 1.1, you can view, edit, and save to any wiki that supports the 'vpwiki api'.</blockquote>
<div class="credit" align="right"><small>Source:<cite><a href="http://flyingmeat.com/vpwiki.html">Flying Meat Software</a></cite></small></div>

	<p>Funny, I&#8217;ve been tinkering with <a href="http://www.decafbad.com/twiki/bin/view/Main/XmlRpcToWiki">a wiki <span class="caps">API</span></a> along with a <a href="http://www.jspwiki.org/Wiki.jsp?page=WikiRPCInterface">few others tinkerers</a> for a year or so now.  I wonder if we could get these APIs merged or synched and give VoodooPad access to a slew of wikiware?</p>
<!--more-->
shortname=voodoo_pad_wiki_api

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084083">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.10500bc.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=6492f173a7059ece309f7d670ff44e95&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.10500bc.org">nf0</a>
                </div>
                <a href="#comment-221084083" class="permalink"><time datetime="2003-11-18T22:48:51">2003-11-18T22:48:51</time></a>
            </div>
            <div class="content">Its pretty cool a few weeks ago I loaded there wiki on my powerbook and was editing it from my Win2k laptop in a browser. It was pretty cool, now if Twiki would support that API It would make it all even better, I'm sure the power of perl can make it happen.</div>
            
        </li>
    
        <li class="comment" id="comment-221084084">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2e83224d92ed7f1148f4dd3cdb0e4548&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki">Bill Seitz</a>
                </div>
                <a href="#comment-221084084" class="permalink"><time datetime="2003-11-19T15:14:11">2003-11-19T15:14:11</time></a>
            </div>
            <div class="content">Kinda assumes that all wikis use the same SmartAscii format, eh?

http://webseitz.fluxent.com/wiki/SmartAscii
http://webseitz.fluxent.com/wiki/WikiStandards</div>
            
        </li>
    
        <li class="comment" id="comment-221084085">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/blog/">l.m.orchard</a>
                </div>
                <a href="#comment-221084085" class="permalink"><time datetime="2003-11-19T15:28:07">2003-11-19T15:28:07</time></a>
            </div>
            <div class="content">It's worse than that: VoodooPad uses RTF for its internal wiki format and plaintext for export to wiki.  Though, I think when pairing up VoodooPad with some specific wiki, it wouldn't be too annoying to use that wiki's SmartAscii in VoodooPad.  I doubt that converting between RTF and a particular implementation of SmartAscii would be a very enjoyable endeavor.</div>
            
        </li>
    
        <li class="comment" id="comment-221084087">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.ecyrd.com/ButtUgly/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8f688c7919a6645352e1bb59b2f45ae4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.ecyrd.com/ButtUgly/">Janne Jalkanen</a>
                </div>
                <a href="#comment-221084087" class="permalink"><time datetime="2003-11-21T08:14:29">2003-11-21T08:14:29</time></a>
            </div>
            <div class="content">Yeah, we discussed the original wiki API with the author of VoodooPad, but his requirements were sufficiently different so that we couldn't agree on a common API.

I think the key issues were around using HTTP authentication and the format of the wiki.

The divergence of the Wiki APIs is emblematic to the divergence of the entire Wiki community.  Not that it's necessarily a bad thing.</div>
            
        </li>
    
        <li class="comment" id="comment-221084091">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.scheirich.info/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=ffca18b21e33769cc792a9f73d0b5a75&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.scheirich.info/">Harald Scheirich</a>
                </div>
                <a href="#comment-221084091" class="permalink"><time datetime="2003-11-29T10:27:10">2003-11-29T10:27:10</time></a>
            </div>
            <div class="content">Hi, I am the author of PersonalWiki (for OS X) I am looking into implementing the wiki XMLRPC interface into my product, I am open for suggestions. PersonalWiki is based on ASCII input formats. Currently Supported are StructuredText (ZWiki) and Wikipedia. I also did my own implementation for communicating with ZWiki but a more "standard" solution would be nice.

The difference between different Wiki's input formatting is a pain I think it is not really a good thing</div>
            
        </li>
    
        </ul>
    
        </div>
    