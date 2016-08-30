---
comments_archived: true
date: '2005-11-27T14:02:01-05:00'
layout: post
tags:
- asides
title: I wish it were in XOXO
wordpress_id: 781
wordpress_slug: i-wish-it-were-in-xoxo
wordpress_url: http://decafbad.com/blog/?p=781
---
<blockquote cite="http://blogs.msdn.com/alexbarn/archive/2005/11/24/496636.aspx">Note: hey, mum & dad - you can check out my Christmas OPML wishlist in your browser right now (in case you're tuning in ;-)</blockquote>
<small style="text-align:right; display:block">Source: <a href="http://blogs.msdn.com/alexbarn/archive/2005/11/24/496636.aspx">Alex Barnett blog : Wow, an OPML browser and wishlist</a></small>

Okay, so I'm trying to catch up on the latest round of renewed buzz for OPML.  In my reading, I just caught the above-quoted post about a wishlist expressed as OPML.  

This is what I read:  He [links to the wishlist][wish] in HTML form, by way of a conversion service on a site called [Opmlmanager][opml].  You can also download & install the [.NET framework][net], if you'd like to run [a desktop OPML browser][brow].  Sounds like a nice stack of technology, [neat like digital watches][neat].

So, this is my question: Why not just keep it all in XHTML lists—that is to say, [XOXO][].  The HTML output of that [Opmlmanager][opml] conversion is just *barely* not valid XOXO, but with a few tweaks it'd be fine—complete with fancy DHTML expand/collapse functionality *and* maybe even some [outline transclusion][ot] hints.

With XOXO, there's no need for a conversion service, and you can use a standard web browser without downloading any frameworks.  I'd say these are nicer criteria for sharing things on the web.

As for authoring tools?  At the moment, I can't think of a specific outliner that produces XOXO directly.  But, any general HTML editor would help, and there are dozens of tools with list editing baked in.  (ie. WordPress, TypePad)  And if you have a sane OPML file, you can try using [a little bit of XSLT][xsl] to convert it to XOXO.

<strike>Finally, what really strikes me as weird about Alex Barnett's post is that I can't find a link to any raw OPML anywhere on the page.  In fact, I can't find any OPML on the [converted wishlist page][wish], either.  All I'm seeing are links and HTML from where I'm sitting—where's the OPML magic?</strike>

**Update:** Alex has provided the [link to the OPML][alex].  Thanks for the pointer!  I think what I was trying to get at with the above is that sharing the HTML on the web is more natural than sharing the OPML.  But I think I've run out of XOXO steam for today :)

[alex]: http://www.opmlmanager.com/opml/alexbarnett.opml
[ot]: http://decafbad.com/blog/2005/10/02/web-directories-with-xoxo-and-xsl
[net]: http://www.microsoft.com/downloads/details.aspx?FamilyID=0856eacb-4362-4b0d-8edd-aab15c5e04f5&amp;DisplayLang=en
[opml]: http://www.opmlmanager.com/
[wish]: http://www.opmlmanager.com/outliner/alexbarnett
[xoxo]: http://www.microformats.org/wiki/xoxo
[brow]: http://www.opmlmanager.com/opmlbrowser/
[neat]: http://www.decafbad.com/twiki/bin/view/Main/NeatLikeDigitalWatches
[xsl]: http://decafbad.com/trac/browser/trunk/GopherNext/opml-to-xoxo.xsl

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087307">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blogs.msdn.com/alexbarn"><img src="http://www.gravatar.com/avatar.php?gravatar_id=21c52c601a99b219564e74837aca0aca&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blogs.msdn.com/alexbarn">Alex Barnett</a>
                </div>
                <a href="#comment-221087307" class="permalink"><time datetime="2005-11-27T22:56:26">2005-11-27T22:56:26</time></a>
            </div>
            <div class="content"><p>You are right, I should have pointed to the opml file too. Here you go:</p>

<p>http://www.opmlmanager.com/opml/alexbarnett.opml</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087309">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221087309" class="permalink"><time datetime="2005-11-27T23:44:13">2005-11-27T23:44:13</time></a>
            </div>
            <div class="content"><p>Alex:  Thanks for the URL, and for humoring my rant!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087310">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://msittig.wubi.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a233a0b9bf67e939e7575b36e626744d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://msittig.wubi.org/">Micah</a>
                </div>
                <a href="#comment-221087310" class="permalink"><time datetime="2005-11-28T04:50:17">2005-11-28T04:50:17</time></a>
            </div>
            <div class="content"><p><a href="http://www.aaronsw.com/weblog/wishlist" rel="nofollow">Aaron Swart's birthday wishlist</a> is in XOXO too.  I wonder if he knows that. (<a href="http://msittig.freeshell.org/wishlist" rel="nofollow">Mine</a>'s not.)</p></div>
            
        </li>
    
        </ul>
    
        </div>
    