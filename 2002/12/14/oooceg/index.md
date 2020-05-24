<p>Today's revelation while tinkering with my <a href="http://www.decafbad.com/twiki/bin/view/Main/PersonalWebProxy">PersonalWebProxy</a>:  Decompressed content is larger than compressed content.  </p>
<p>See, I was decompressing gzipped content streams in the proxy in order to fiddle with the content before it got to the browser, but then I noticed that browsers kept only displaying part of the content.  I remove the in-proxy decompression, things are fine.  Put it back in, things get cut short.  I poke for a few hours at various bits and parts, to no avail.  </p>
<p>Then, finally I remember...  "Hey, you know, I think browsers pay attention to that Content-Length header.  And hey, you know...  decompressed content is larger than compressed content."  Bingo.  Problem solved by keeping the Content-Length header updated with the length of modified content.  This makes me feel very dumb, because it's not like I haven't written a handful or two both of HTTP clients and servers.  And I've written code that uses the Content-Length header, over and over again.  I'd've thought this would be something I'd remember more quickly.</p>
<p>More often than I'd like to admit, remembering simple and obvious things like the above are what unlock problems that I'd been banging my head against.  The last revelation of this nature I had while frustrated at a project at work was:  "Not all months are 31 days."  And before that, "Not all days in a year are 24 hours long, due daylight savings time."</p>
<p>Trying to think of more, but I thought I'd share. Maybe I'll start a wiki topic for sage bits of the <a href="http://www.decafbad.com/twiki/bin/view/Main/ObviousInHindsight">ObviousInHindsight</a>.<br />
</p>
<!--more-->
shortname=oooceg

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087820">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.perceive.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9e76d0bf99487acc610624122a6317f3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.perceive.net">Eric Vitiello</a>
                </div>
                <a href="#comment-221087820" class="permalink"><time datetime="2002-12-14T17:55:33">2002-12-14T17:55:33</time></a>
            </div>
            <div class="content">I find that 80% of my programming time is spent solving obvious and mundane problems.  The other 20% is actually productive...  If I could fins a way to get past the things that make me smack my head, I'd be a programming god.</div>
            
        </li>
    
        <li class="comment" id="comment-221087821">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://little-bits.blogspot.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=808b65db5da2d018b3b034e2b69821e6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://little-bits.blogspot.com">Paul Morriss</a>
                </div>
                <a href="#comment-221087821" class="permalink"><time datetime="2002-12-19T12:03:09">2002-12-19T12:03:09</time></a>
            </div>
            <div class="content">I spent a while working on a system for PowerGen, a UK electricity company. Electricity is traded here in half hour slots and I reckon I spent about 25% of my time coding to cope with the time when there are 46 or 50 half hour slots in a day sometimes.

There were all sorts of calculations that needed to be done for the generators to do with ramping up and ramping down and changing output. The companies promised never to change anything during the autumn/fall clock change when we had a "repeated" hour.</div>
            
        </li>
    
        <li class="comment" id="comment-221087824">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://yarinareth.net/caveatlector/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=def808e6072af95b27c6d298fbb05a2b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://yarinareth.net/caveatlector/">Dorothea Salo</a>
                </div>
                <a href="#comment-221087824" class="permalink"><time datetime="2002-12-19T19:52:38">2002-12-19T19:52:38</time></a>
            </div>
            <div class="content">Ah, yes, the "I am SUCH an idiot!" moments. I dearly *hope* they happen to everyone.

'Cuz if they don't... man, I am *such* an idiot!</div>
            
        </li>
    
        </ul>
    
        </div>
    