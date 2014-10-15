---
comments_archived: true
date: '2004-05-02T19:27:23-04:00'
excerpt: Feed validators are confusing me, but it looks like there's been
    a fix.
layout: post
title: Feed validation confusion
wordpress_id: 518
wordpress_slug: feed-validation-confusion
wordpress_url: http://www.decafbad.com/blog/?p=518
---
<strike>A bit of feed confusion here:</strike>

* [This validator][validator1] says [my RSS][myrss] is [*valid*][valid].
* <strike>[This validator][validator2] says [my RSS][myrss] is [*invalid*][invalid].</strike>

<strike>Does not compute.  Does not compute.</strike>

**Update:** Hooray!  As mentioned in a [response from Andrew Grumet][andrew], my feed now [validates][invalid].  Thank you!

[myrss]: http://www.decafbad.com/index.rdf
[validator1]:  http://feedvalidator.org/
[validator2]: http://rss.scripting.com/
[valid]: http://feedvalidator.org/check?url=http%3A%2F%2Fwww.decafbad.com%2Findex.rdf
[invalid]: http://rss.scripting.com/?url=http%3A%2F%2Fwww.decafbad.com%2Findex.rdf
[andrew]: http://www.decafbad.com/blog/2004/05/02/feed_validation_confusion#comment-1113

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090713">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://laughingmeme.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=858042a97c035a51ca2097eac37422b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://laughingmeme.org">kellan</a>
                </div>
                <a href="#comment-221090713" class="permalink"><time datetime="2004-05-02T20:45:29">2004-05-02T20:45:29</time></a>
            </div>
            <div class="content">Now you're just being silly.  Of course the Userland validator doesn't validate RSS 1.0</div>
            
        </li>
    
        <li class="comment" id="comment-221090715">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://diveintomark.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=357a20e8c56e69d6f9734d23ef9517e8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://diveintomark.org/">Mark</a>
                </div>
                <a href="#comment-221090715" class="permalink"><time datetime="2004-05-02T20:59:52">2004-05-02T20:59:52</time></a>
            </div>
            <div class="content">It used to.  The scripting.com validator is just a fork of our validator, and they gave identical results on all input when Dave forked our validator 3 months ago.  This difference is new since then, and we haven't touched the RSS 1.0 validation rules.</div>
            
        </li>
    
        <li class="comment" id="comment-221090716">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://diveintomark.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=357a20e8c56e69d6f9734d23ef9517e8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://diveintomark.org/">Mark</a>
                </div>
                <a href="#comment-221090716" class="permalink"><time datetime="2004-05-02T21:08:17">2004-05-02T21:08:17</time></a>
            </div>
            <div class="content">Rogers Cadenhead has put up a test RSS 2.0 feed which exhibits similar behavior:

http://www.cadenhead.org/hype/index.xml</div>
            
        </li>
    
        <li class="comment" id="comment-221090717">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philringnalda.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2b6c1ba0915a97a81d59ca1e101e6d74&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philringnalda.com">Phil Ringnalda</a>
                </div>
                <a href="#comment-221090717" class="permalink"><time datetime="2004-05-02T22:10:49">2004-05-02T22:10:49</time></a>
            </div>
            <div class="content">In the interest of debugging, I borrowed a copy of Rogers' feed and shuffled the order of things around, so that dc wasn't the first namespace declared, and wasn't the first namespaced element encountered. The dc elements remain the only ones reported as errors.

I wish I knew the code better, to know exactly what it would take to have that happen to it.</div>
            
        </li>
    
        <li class="comment" id="comment-221090718">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philringnalda.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2b6c1ba0915a97a81d59ca1e101e6d74&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philringnalda.com">Phil Ringnalda</a>
                </div>
                <a href="#comment-221090718" class="permalink"><time datetime="2004-05-02T22:24:27">2004-05-02T22:24:27</time></a>
            </div>
            <div class="content">Or maybe I do - looks to me like the only way you would get that particular error would be if src/feedvalidator/base.py didn't have the line for dc in the namespaces hash.</div>
            
        </li>
    
        <li class="comment" id="comment-221090719">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philringnalda.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2b6c1ba0915a97a81d59ca1e101e6d74&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philringnalda.com">Phil Ringnalda</a>
                </div>
                <a href="#comment-221090719" class="permalink"><time datetime="2004-05-02T23:38:47">2004-05-02T23:38:47</time></a>
            </div>
            <div class="content">Les, are you doing the Time Warp, again? Looks like comment timestamps are something like 14 hours slow.</div>
            
        </li>
    
        <li class="comment" id="comment-221090720">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.intertwingly.net/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e2dda5e47fccc5ff0daa87debf48162b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.intertwingly.net/blog/">Sam Ruby</a>
                </div>
                <a href="#comment-221090720" class="permalink"><time datetime="2004-05-03T01:24:29">2004-05-03T01:24:29</time></a>
            </div>
            <div class="content">Phil, if there were a version of the feedvalidator without that line present, the net effect would be that the dublin core namespace would be treated as "unknown" and you would see results very different from you are seeing: namely that everything in that namespace would be treated as a valid extension.

I've sent a note off to Andrew Grummet asking if he knows of any changes to the rss.scripting.com web site that would explain this.</div>
            
        </li>
    
        <li class="comment" id="comment-221090721">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://fishbowl.pastiche.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8b4a717c59d399879a11231206aff4c4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://fishbowl.pastiche.org/">Charles Miller</a>
                </div>
                <a href="#comment-221090721" class="permalink"><time datetime="2004-05-03T01:29:57">2004-05-03T01:29:57</time></a>
            </div>
            <div class="content">Funky.</div>
            
        </li>
    
        <li class="comment" id="comment-221090722">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.grumet.net/weblog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9071e33faa2d6a1104ae2167a57e8c5a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.grumet.net/weblog/">Andrew Grumet</a>
                </div>
                <a href="#comment-221090722" class="permalink"><time datetime="2004-05-03T01:54:57">2004-05-03T01:54:57</time></a>
            </div>
            <div class="content">Working on it...</div>
            
        </li>
    
        <li class="comment" id="comment-221090725">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.grumet.net/weblog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9071e33faa2d6a1104ae2167a57e8c5a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.grumet.net/weblog/">Andrew Grumet</a>
                </div>
                <a href="#comment-221090725" class="permalink"><time datetime="2004-05-03T02:37:08">2004-05-03T02:37:08</time></a>
            </div>
            <div class="content">I think this is fixed now.  If you happen to know when the behavior change occurred, could you send me a note at aegrumet@alum.mit.edu?  Thanks.</div>
            
        </li>
    
        <li class="comment" id="comment-221090727">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.grumet.net/weblog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9071e33faa2d6a1104ae2167a57e8c5a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.grumet.net/weblog/">Andrew Grumet</a>
                </div>
                <a href="#comment-221090727" class="permalink"><time datetime="2004-05-03T02:40:49">2004-05-03T02:40:49</time></a>
            </div>
            <div class="content">0xDECAFBAD dude, I think your CSS has the IE6 peekaboo bug (do a Web search on it).  I fixed this on my own weblog by adding a "line-height: 1.3em;" to the .content section of my stylesheet.</div>
            
        </li>
    
        <li class="comment" id="comment-221090728">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.grumet.net/weblog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9071e33faa2d6a1104ae2167a57e8c5a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.grumet.net/weblog/">Andrew Grumet</a>
                </div>
                <a href="#comment-221090728" class="permalink"><time datetime="2004-05-03T02:55:53">2004-05-03T02:55:53</time></a>
            </div>
            <div class="content">Thanks for the heads up, and Phil, thanks for the debug suggestions.  I don't yet understand what went wrong but we didn't fork any of the project files and the fix didn't require file edits; it was tweak in our setup.  After putting the baby to bed I'm going to dig around a bit more.</div>
            
        </li>
    
        <li class="comment" id="comment-221090729">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/referers.rss"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8a5273f79cfe7579ad46023f93377aa8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/referers.rss">l.m.orchard</a>
                </div>
                <a href="#comment-221090729" class="permalink"><time datetime="2004-05-03T03:00:24">2004-05-03T03:00:24</time></a>
            </div>
            <div class="content">Andrew:  Yay!  Makes sense now...

And, ugh, I was was wondering what the hell that bug was, and if it name.  Grr.</div>
            
        </li>
    
        <li class="comment" id="comment-221090730">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philringnalda.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2b6c1ba0915a97a81d59ca1e101e6d74&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philringnalda.com">Phil Ringnalda</a>
                </div>
                <a href="#comment-221090730" class="permalink"><time datetime="2004-05-03T04:35:42">2004-05-03T04:35:42</time></a>
            </div>
            <div class="content">Andrew Bowden [1] might know, since he says he was signed up for validation reports by email and the errors cropped up "last week."

[1] http://www.bods.me.uk/rantnrave/2004/04/03/new_atom_full_post_feed.live</div>
            
        </li>
    
        <li class="comment" id="comment-221090731">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philringnalda.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2b6c1ba0915a97a81d59ca1e101e6d74&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philringnalda.com">Phil Ringnalda</a>
                </div>
                <a href="#comment-221090731" class="permalink"><time datetime="2004-05-03T04:54:56">2004-05-03T04:54:56</time></a>
            </div>
            <div class="content">I don't think this is going to be my week. Can't read code, can't follow simple directions.

Er, "Hey, Les! Could you email Andrew and tell him..." Sigh.

But at least I screwed up in a new way: I think that's the first time I've carefully checked whether HTML was allowed, noticed from the preview that it wasn't, copied in an MT-produced URL, and had the filename Textiled into oblivion :)</div>
            
        </li>
    
        <li class="comment" id="comment-221090732">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.intertwingly.net/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e2dda5e47fccc5ff0daa87debf48162b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.intertwingly.net/blog/">Sam Ruby</a>
                </div>
                <a href="#comment-221090732" class="permalink"><time datetime="2004-05-03T04:59:17">2004-05-03T04:59:17</time></a>
            </div>
            <div class="content">Excellent detective work, Phil.

Here's a link that should work: http://www.bods.me.uk/rantnrave/2004/04/03/new%5Fatom%5Ffull%5Fpost%5Ffeed.live</div>
            
        </li>
    
        </ul>
    
        </div>
    