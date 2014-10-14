---
comments_archived: true
date: '2005-07-12T17:56:34-04:00'
layout: post
title: In-browser XOXO Outliner Experiment
wordpress_id: 667
wordpress_slug: xoxo-outliner-experiment
wordpress_url: http://www.decafbad.com/blog/?p=667
---
Testing, testing--is this thing on?  Well, I do have to say that I've recovered rather well from [the "stroke"][stroke] last week.  Things have been pretty busy since then, so I haven't had much of a chance to blather any more around these parts.

However, in the spirit of a few [recent][graphs] [experiments][treemaps], I have another demo for you.  Here's the URL of the latest work in progress / proof of concept:

* [http://www.decafbad.com/2005/07/map-test/tree2.html](http://www.decafbad.com/2005/07/map-test/tree2.html)

What is it, you might ask before clicking a strange URL?  It's an outliner, in Javascript.  Or, rather, a first rough stab at one anyway.  It's got a long way to go, and there are indeed [better options out there already][sprout], but I wanted to try making one myself.

A quick summary of controls:  No mouse drag of items yet, but you can click on them to edit.  Use the up and down cursor keys to navigate through the outline.  Use shift along with the cursor keys to *shift* items around.  Use the control key along with the cursor keys to *control* visibility of child items.

*Update*: There're a few more things I didn't mention, as well as a few bug half-fixes.  Hitting return when the editor is on an existing item will insert a new blank item right after it.  Hitting shift-return will append a new child item to the current item.  Tab and shift-tab, as well as shift-right and shift-left, are supposed to indent and outdent items.  Unfortunately, they're not quite working yet and of course they semi-clobber other useful keyboard functions, so I'm still feeling around for a good way to support these.

The idea is that I want to unobtrusively drop some CSS and JavaScript into an HTML page with one or more [XOXO-style outlines][xoxo], magically turning them into in-browser outline editors.

But, like I said, there's still lots of work to be done here, and I'm pretty sure I've riddled this thing with circular references that will make your [IE/Win combination leak like crazy][leak].  I just wanted to see if I could make something like this work, though.  And, roughly, it seems to do so in Safari and Firefox.

The next part of this equation will be coming up soon, I think.  And that is: Okay, now that I've created / edited an outline in my browser--how can I save it?  

[leak]: http://jibbering.com/faq/faq_notes/closures.html#clMem
[xoxo]: http://developers.technorati.com/wiki/XOXO
[sprout]: http://www.google.com/url?sa=U&start=1&q=http://sproutliner.com/&e=912
[stroke]: http://www.decafbad.com/blog/2005/07/05/exocortex_stroke
[treemaps]: http://www.decafbad.com/blog/2005/07/02/css_treemaps
[graphs]: http://www.decafbad.com/blog/2005/07/02/drag_the_boxes_stretch_the_lines
<!--more-->
shortname=xoxo_outliner_experiment

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084038">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://rasterweb.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=db0fab74bcb564ebb09295498b892fb6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://rasterweb.net/">Pete Prodoehl</a>
                </div>
                <a href="#comment-221084038" class="permalink"><time datetime="2005-07-12T19:22:24">2005-07-12T19:22:24</time></a>
            </div>
            <div class="content">Damn that is cool!</div>
            
        </li>
    
        <li class="comment" id="comment-221084039">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=f1d479db750c7e73e6f77a546e71432c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Charlie Wallace</a>
                </div>
                <a href="#comment-221084039" class="permalink"><time datetime="2005-07-12T21:03:36">2005-07-12T21:03:36</time></a>
            </div>
            <div class="content">Way cool!  Your demo just got mentioned on the TiddlyWikiDev group in Google Groups, under the 'Outlining!' topic.

If you're not familiar with TiddlyWiki, you might enjoy a look at www.tiddlywiki.com. It's an all-javascript personal wiki, all in one file.  There's an active community producing variations on the original version.

And I'd lovvvvve to see an adaptation that would use your outliner!!!!

There are some interesting issues with trying to combine heirarchical outlines with non-heirarchical wikis, but seems like it would work if kept inside one wiki page...

Also, a question - did you implement a way to add new items to the outline?

THanks,
  Charlie Wallace</div>
            
        </li>
    
        <li class="comment" id="comment-221084040">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://theryanking.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c846b78a4a4c978fd34ef965320a13b0&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://theryanking.com">ryan king</a>
                </div>
                <a href="#comment-221084040" class="permalink"><time datetime="2005-07-12T21:21:52">2005-07-12T21:21:52</time></a>
            </div>
            <div class="content">Very cool.</div>
            
        </li>
    
        <li class="comment" id="comment-221084041">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dean.edwards.name/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b33181b8e12bd10dfa373acc8af37cbb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dean.edwards.name/">Dean Edwards</a>
                </div>
                <a href="#comment-221084041" class="permalink"><time datetime="2005-07-12T22:15:16">2005-07-12T22:15:16</time></a>
            </div>
            <div class="content">It depends what you mean by "save" it. But I think the way TiddlyWikki save its state is pretty cool.</div>
            
        </li>
    
        <li class="comment" id="comment-221084042">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=eb7f2a3ba74af37415ab7df101a86c75&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">l.m. orchard</a>
                </div>
                <a href="#comment-221084042" class="permalink"><time datetime="2005-07-12T22:26:30">2005-07-12T22:26:30</time></a>
            </div>
            <div class="content">Dean:  Huh, that's interesting... I vaguely remembered that TiddlyWiki saved changes, but it appears to actually save to the local filesystem.  I didn't know that.

As for my stuff, though, I've got a slightly more REST/"AJAXy" way in mind.</div>
            
        </li>
    
        <li class="comment" id="comment-221084043">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=f1d479db750c7e73e6f77a546e71432c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Charlie Wallace</a>
                </div>
                <a href="#comment-221084043" class="permalink"><time datetime="2005-07-13T03:22:16">2005-07-13T03:22:16</time></a>
            </div>
            <div class="content">To answer my own question above, and add another:
There are 2 ways to create a new line. Enter creates one at the same level, and shift-enter creates one that's indented.

The new question - any plans to allow more than one line of text in an item? 

And another: any plans to support "body" text for each line?  Or, alternately, if more than one line is entered, the first line could serve as the heading?

Usability note: I think you'll need to allow items to be shift-arrow dragged from one containing heading to a different one, I can't seem to do this currently.

Nice work!

-- Charlie</div>
            
        </li>
    
        <li class="comment" id="comment-221084044">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8157a5907b244071cda98ba5aa7a9635&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki">Bill Seitz</a>
                </div>
                <a href="#comment-221084044" class="permalink"><time datetime="2005-07-13T11:05:01">2005-07-13T11:05:01</time></a>
            </div>
            <div class="content">Very excellent.

(The wrapping of multi-line items isn't ideal.)

Have you thought about saving in some smart-ascii/wiki format instead of XOXO? Any tags at all seem like overkill for something that could be expressed as a bullet-list... (you could *render* to XOXO at appropriate times, just like DaveW renders from OPML to HTML/RSS...)</div>
            
        </li>
    
        <li class="comment" id="comment-221084045">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8a5273f79cfe7579ad46023f93377aa8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">l.m. orchard</a>
                </div>
                <a href="#comment-221084045" class="permalink"><time datetime="2005-07-13T11:16:27">2005-07-13T11:16:27</time></a>
            </div>
            <div class="content">Bill:  Well, what I was thinking is that the machine components (browser and server) would deal in XML/HTML as much as possible.  XOXO would be the on-disk storage and transport format for outlines.  

But, alongside the DHTML/JS editors, I'd like to throw in some filters that speak wiki-text for human convenience in HTML forms.</div>
            
        </li>
    
        <li class="comment" id="comment-221084046">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8a5273f79cfe7579ad46023f93377aa8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">l.m. orchard</a>
                </div>
                <a href="#comment-221084046" class="permalink"><time datetime="2005-07-13T11:19:54">2005-07-13T11:19:54</time></a>
            </div>
            <div class="content">Oh, and I guess something that might make XML-on-disk make more sense is that I'd like this thing to do more than just outlines.  I want to include other microformats and HTML semantics,</div>
            
        </li>
    
        <li class="comment" id="comment-221084047">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=75e48a7020624657e5da6033590030ee&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Dan G</a>
                </div>
                <a href="#comment-221084047" class="permalink"><time datetime="2005-07-13T17:52:49">2005-07-13T17:52:49</time></a>
            </div>
            <div class="content">Excellent.  This is really nice.

BTW: If they're interested, you might want to submit this to the Dojo project which, among other things, is trying to build a standard widget set for Javascript.  If there was an outliner as part of that library, I bet you'd see it used in a lot more places...</div>
            
        </li>
    
        <li class="comment" id="comment-221084050">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://disqus.com/api/users/avatars/cth.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">cth</a>
                </div>
                <a href="#comment-221084050" class="permalink"><time datetime="2005-07-14T18:16:25">2005-07-14T18:16:25</time></a>
            </div>
            <div class="content">Very cool!!! :)

i'd started a proof of concept like that a while back ( http://homepage.mac.com/ctholland/thelab/outlines/ ) which Kevin Marks linked into the XOXO wiki: http://developers.technorati.com/wiki/XOXO . mine isn't nearly as feature-rich and objected-oriented as yours.

congrats, and keep-up the good work!</div>
            
        </li>
    
        <li class="comment" id="comment-221084052">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.connectedtosource.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=18e6cc1c6e0cff14fe04507be6e51abf&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.connectedtosource.net">Aldo CastaÃ±eda</a>
                </div>
                <a href="#comment-221084052" class="permalink"><time datetime="2005-07-15T06:22:58">2005-07-15T06:22:58</time></a>
            </div>
            <div class="content">I want to Dave Winer's demo at Berkman last night and asked him for this exact type of functionality. In my opinion, web editable OPML is key to adoption for "regular" users like me.

Fantastic work!</div>
            
        </li>
    
        <li class="comment" id="comment-221084053">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.kesor.net"><img src="http://disqus.com/api/users/avatars/kesor.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.kesor.net">Evgeny Zislis</a>
                </div>
                <a href="#comment-221084053" class="permalink"><time datetime="2005-08-23T19:22:35">2005-08-23T19:22:35</time></a>
            </div>
            <div class="content">I've started working on an AJAX editor for XOXO (aka outliner). It got most of the basic stuff working already, and just needs a small last push to get it going. Anyone wants to help out finishing it and make it public? Drop me an email if you do.
[evgeny.zislis gmail]</div>
            
        </li>
    
        </ul>
    
        </div>
    