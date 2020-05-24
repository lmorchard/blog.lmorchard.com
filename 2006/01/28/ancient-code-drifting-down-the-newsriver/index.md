So, while working through some writing blockages last weekend, I started doing [some hacking][hack] on [Dave Winer's newsRiver][new] running on the [OPML Editor][opml] platform.  (Oh, and it *is* a platform, maybe more so than even emacs—don't let the moniker 'editor' fool you.)

Here's the thing:  It was a lot of addictive fun, and it takes me back to the [love/hate thing I had with Radio][lh], back toward the first days of this blog.  This Frontier / Radio / OPML Editor environment is undeniably satisfying for me to work in.  It's like potato chips:  Jump to an outline here, tweak some code there, mangle an outline node up there, reload a browser page, watch things go—lots of moments of instant gratification all building incrementally atop one another.

In one package—which reminds me a lot of [Squeak][]—the [OPML Editor][opml] bundles a crazy amount of integrated machinery for both Windows and Mac OS X:

* UserTalk, a very capable scripting language
* An IDE based on outlining, somewhat like Python's syntactic indentation
* Persistent on-disk hierarchical hashtables (aka the Object Database)
* Code and data all live in the same object database
* A web server and a host of other networking code—including Jabber messaging, although I can't attest to its freshness.
* Blog editing and no-effort external web hosting file synch
* [Hot patching][hp] and easy upgrades that most other software packages dream of
* Years and years and years of (mostly) working code with datestamped change notes and living history.

And the thing is?  This was the state of the art for Radio back in 2002—and earlier than that even for Frontier.  Fast forward from then till today, and you'll find that [Frontier is now Open Source][fso]—with many of the same sorts of warts Mozilla's open source release helpfully revealed back in 1997.  (Some hero needs to come along and port this beast to Linux!  Good luck!)  And now, much of the guts of Radio are released as the [OPML Editor][opml].  

In a lot of ways, this whole family of apps built on this common ancestry of code is [really shitty software][shitty].  Kind of like [all that code on the *Qeng Ho* from Vernor Vinge's *A Deepness in the Sky*][code].  This stuff crashes and sets itself on fire a lot, but then again it's amazing to see just how many wheels have been reinvented and re-reinvented since 2002 (and before) when I fire up this code today.

And now, it looks like the embers are stirring for this thing again.  There's been a lot of time for a lot of angst to fade from a lot of places, and it looks like there's a new crop of fresh people rediscovering this stuff.  

So, anyway, I like these potato chips.  I think I want to start munching on them again, as time permits.  Oh, and while I'm talking about potato chips—I have to say, [don't pee in the potato chips][pee] and be nice to the guy holding the bag.

<!-- tags: winer rss syndication radio usertalk frontier vinge opml -->

[pee]: http://decafbad.com/blog/2006/01/28/dont-pee-in-the-potato-chips
[squeak]: http://www.squeak.org/
[code]: http://decafbad.com/blog/2005/02/24/ancient-software-and-programmer-archaeologists
[shitty]: http://davenet.scripting.com/1995/09/03/wemakeshittysoftware
[hp]: http://decafbad.com/blog/2002/04/26/oooabf
[fso]: http://frontierkernel.sourceforge.net/
[lh]: http://decafbad.com/blog/2002/04/11/ooooho
[opml]: http://support.opml.org/
[new]: http://scripting.wordpress.com/2005/12/29/why-im-working-on-an-aggregator/
[hack]: http://decafbad.com/blog/2006/01/21/a-bit-of-newsriver-hackery

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084407">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=760b4002b07650d4ef654f9fc17e8154&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Robert Brook</a>
                </div>
                <a href="#comment-221084407" class="permalink"><time datetime="2006-01-28T15:03:50">2006-01-28T15:03:50</time></a>
            </div>
            <div class="content"><p>Serious question: why not use Squeak?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084408">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084408" class="permalink"><time datetime="2006-01-28T16:01:26">2006-01-28T16:01:26</time></a>
            </div>
            <div class="content"><p>Robert: Short answer is that I saw Radio first for the RSS aggregator and blogging support, started hacking on that, and got sucked into other aspects of it along the way.  </p>

<p>For Squeak, I saw some fun colorful things and kind of got the gist of the environment, but never got hooked on any daily uses of it after a weekend or two of playing.  So, it fell into my "Learn Smalltalk" todo item that keeps getting pushed down the list by other things.  That item's still on my list, though, and I mean to get to it someday...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084409">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dannyayers.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7028f422ca6da0180de6c9d922a3228f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dannyayers.com">Danny</a>
                </div>
                <a href="#comment-221084409" class="permalink"><time datetime="2006-01-28T16:07:44">2006-01-28T16:07:44</time></a>
            </div>
            <div class="content"><p>From what I've seen and read there are loads of good ideas in that platform, but there are two things I personally find extremely offputting : the pervading sense of Not Invented Here, and the sheer age (in the negative sense) of the stuff. </p>

<p>Now the code's been open sourced, maybe there's a chance of the tastier crisps (UK localization) catching up and being integrated with the rest of the world. Ok, very IMHO but : swap US-ASCII for utf-8, XML-RPC for doc/literal XML, RSS 2.0 for Atom, Object Database for triplestore,  Python for UserTalk, outliner for modern IDE (although actually the outliner UI is probably one bit that might be worth preserving as-is) etc. </p>

<p>Well, ok, maybe it is a bit much to expect. Maybe a maximally interoperable version of the Frontier approach could be recreated (without reinvention) by plugging together various existing open source libs..?</p>

<p>For now I guess I'll have to make do with Web as Platform (and/or Squeak)  ;-)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084410">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084410" class="permalink"><time datetime="2006-01-28T16:28:59">2006-01-28T16:28:59</time></a>
            </div>
            <div class="content"><p>Danny: Yeah, I agree with a lot of those points, and they fall into the 'hate' side of the 'love/hate' thing for me.  (Well, more like 'strong distaste' than 'hate' anyway).</p>

<p>And I've realized that, since drifting away from Radio/Frontier, I've been recapturing it in various forms using tech like Python, triple-stores, mini-HTTP servers, and the like.  And although these things have felt 'healtier' in a non-NIH, bigger community, more loosely coupled way... it's still a satisfying experience (like potato chips) to find it all buttoned up in one integrated package that works on most of the platforms I care about.</p>

<p>It's still kind of a writing-with-my-wrong-hand kind of pain in the butt to get all the loose coupled stuff working sometimes.  And many times, there are very good reasons for thing being hard and lots of things need minding.  Like, XML-RPC style web services versus REST: </p>

<p>REST is a cleaner, more web-natural approach—but sometimes it takes a lot of thoughtful meta-tinkering where that XML-RPC stuff would've had you on the road hours ago.  Of course, years from now, the XML-RPC stuff might smell a bit while the REST stuff will have stayed solid and revealed further unexpected benefits... but bah.  They both have their place.</p>

<p>It's a lot like baked versus fried.  Anyway, rambling now.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084412">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dannyayers.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7028f422ca6da0180de6c9d922a3228f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dannyayers.com">Danny</a>
                </div>
                <a href="#comment-221084412" class="permalink"><time datetime="2006-01-28T16:57:00">2006-01-28T16:57:00</time></a>
            </div>
            <div class="content"><p>"It’s still kind of a writing-with-my-wrong-hand kind of pain in the butt to get all the loose coupled stuff working sometimes."
Nicely put, yup. Bit of a challenge. 
Coincidentally, yesterday the idea of "Semantic Web in a Box" came up - maybe the place to start would be "Web in a Box"...</p></div>
            
        </li>
    
        <li class="comment" id="comment-232750657">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.100percentwinnersbetting.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=102ead6cc78968446deefc0ad840b7de&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.100percentwinnersbetting.com">arbitrage betting</a>
                </div>
                <a href="#comment-232750657" class="permalink"><time datetime="2011-06-23T02:16:57">2011-06-23T02:16:57</time></a>
            </div>
            <div class="content">Nice points there. I agree with you. Those steps dated in the past are still very useful and helpful until today. We just need to be careful which ones to use. Munch more potato chips! Cheers!</div>
            
        </li>
    
        </ul>
    
        </div>
    