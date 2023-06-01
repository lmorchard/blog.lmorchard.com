---
comments_archived: true
date: '2004-12-23T00:58:41-05:00'
excerpt: So, in the spirit of pico-projects, I've started building that
    address book application I mentioned awhile ago and I want to start
    writing about it as I go.
layout: post
tags:
- hacks
- xml
title: Building an Address Book as a Modern Web App
wordpress_id: 580
wordpress_slug: abook1
wordpress_url: http://www.decafbad.com/blog/?p=580
---
<img src="http://www.decafbad.com/2004/12/abook-architecture.jpg" align="right" />

So, in the spirit of [pico-projects][pp], I've started building [that address book application][ab] I mentioned awhile ago and I want to start writing about it as I go.

[pp]: http://www.decafbad.com/blog/2004/11/30/picoprojects_and_trepanation
[ab]: http://www.decafbad.com/blog/2004/11/30/nextgenwebapps

First off, hopefully you'll notice the quick diagram I threw together in OmniGraffle.  This is a sort of rough sketch of the loosely-joined architecture I want to explore with this thing.  

* *Data*: This is where address book entries live.
* *Model*: A set of objects encapsulating the data, this is how address book entries will be accessed.
* *REST API*: Model objects exposed as resources identified by URI, serialized and deserialized as XML, and manipulated by GET / PUT / POST / DELETE methods.
* *XSLT Filter*: XML data produced by REST API calls can be first passed through XSL at a given URL before being served up as a response.  
* *HTML, CSS, JavaScript*: Thanks to the XSLT filter layer, the XML vocabulary used to describe address book entries can be transformed into user interface presentation.
* *HTTP*: Everything happens via HTTP...
* *Web Browser Client*: ...and everything is viewed in a web browser.

Now, I call this a loosely-joined architecture because I want to stress that you should be able to swap out just about any part of this whenever you want.  

Want the *Data* to be in MySQL?  Fine.  Want it to be in flat files?  Fine.  Just make sure the *Model* can cope while maintaining a consistent interface for the *REST API*.  Want to change the user interface in the browser?  Great-- ideally, all you have to do is change some XSLT files.  I'm writing everything from the *XSLT Filter* down to the *Model* in Python.  Don't like that?  Fine.  Rewrite it all in Perl, and hopefully everything from the XSLT up to the browser will still be useful to you.

At some point, you might even want to ditch the browser for a native desktop client.  Fabulous! Just ignore everything past the *REST API* and *HTTP*, don't use any XSLT in the *Filter*, and use the API and XML directly.

I don't think any of this is particularly revolutionary-- although I thought it was when I first saw Amazon Web Services doing some of this, and I hope to throw a little GMail in as well.  I hope that this will all be useful as I muddle through explaining what I'm doing.  In the meantime, you can see me getting the stage set as I start checking things into my Subversion repository over here:

* [http://www.decafbad.com/svn/trunk/hacks/abook/](http://www.decafbad.com/svn/trunk/hacks/abook/)
<!--more-->
shortname=abook1

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085892">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://trikuare.cx/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7d3d1e46aae8ca19855a6026d404b91d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://trikuare.cx/">fluffy</a>
                </div>
                <a href="#comment-221085892" class="permalink"><time datetime="2004-12-23T07:35:40">2004-12-23T07:35:40</time></a>
            </div>
            <div class="content">Don't forget that with XSLT you could also rewrite it to SyncML and vCard and so on, so you could also sync it with external devices and iSync (assuming Apple finally opens up a third-party conduit system in Tiger, preferably one which doesn't require .Mac to function).</div>
            
        </li>
    
        <li class="comment" id="comment-221085894">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://eliot.landrum.cx"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8b8f5370253bd0e0030154baa15785ed&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://eliot.landrum.cx">eliot</a>
                </div>
                <a href="#comment-221085894" class="permalink"><time datetime="2004-12-23T09:12:34">2004-12-23T09:12:34</time></a>
            </div>
            <div class="content">I'm looking forward to what becomes of this little app. Address book apps seem to all be severely lacking (with the possible exception of OS X's app) and need some fresh thinking. Making the components flexible could be a great way for some change to come about. 

Keep us posted!</div>
            
        </li>
    
        <li class="comment" id="comment-221085895">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/">l.m.orchard</a>
                </div>
                <a href="#comment-221085895" class="permalink"><time datetime="2004-12-23T12:41:13">2004-12-23T12:41:13</time></a>
            </div>
            <div class="content">Well, hopefully it's not too disappointing, but this address book app will be pretty anemic in terms of use as a serious app.  Implementing an address book is just an excuse to run through the various technologies involved.

However, there's nothing stopping anyone (including me) from enhancing the thing when I'm done and making it into a serious offering with vCard support and such.</div>
            
        </li>
    
        <li class="comment" id="comment-221085896">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8157a5907b244071cda98ba5aa7a9635&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki">Bill Seitz</a>
                </div>
                <a href="#comment-221085896" class="permalink"><time datetime="2004-12-27T12:23:46">2004-12-27T12:23:46</time></a>
            </div>
            <div class="content">(Hmm, posted last week but it never showed up...)

What are you thinking in terms of having this data store actually used by, say, your email client?

Make it look like an LDAP server, maybe?</div>
            
        </li>
    
        <li class="comment" id="comment-221085898">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.chuckknows.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=6cede7ba6ff803837ba2da9cc6e466b6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.chuckknows.com">Chuck Conway</a>
                </div>
                <a href="#comment-221085898" class="permalink"><time datetime="2005-01-02T20:37:00">2005-01-02T20:37:00</time></a>
            </div>
            <div class="content">How Funny! I've been thinking about doing the same thing.

The only difference is I was thinking about doing address book, bookmarks and my RSS feeds. 

Those are the things I miss the most when I am away.</div>
            
        </li>
    
        <li class="comment" id="comment-221085900">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.worldwide-sources.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=73de6d1640f8cae902843f4a753bcaee&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.worldwide-sources.com">William</a>
                </div>
                <a href="#comment-221085900" class="permalink"><time datetime="2005-03-05T05:16:08">2005-03-05T05:16:08</time></a>
            </div>
            <div class="content">I'm curious to see where this little app is going its still needs more work</div>
            
        </li>
    
        <li class="comment" id="comment-221085903">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8157a5907b244071cda98ba5aa7a9635&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki">Bill Seitz</a>
                </div>
                <a href="#comment-221085903" class="permalink"><time datetime="2006-08-26T13:37:35">2006-08-26T13:37:35</time></a>
            </div>
            <div class="content"><p>I see you working with Tarawa in there. Did you like it? Is it being worked on at all?</p></div>
            
        </li>
    
        </ul>
    
        </div>
    