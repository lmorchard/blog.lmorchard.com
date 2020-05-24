Oh, and I've been happily doing quite a bit more work lately using [MochiKit][mk].  It just occurred to me this morning that I get a similar feeling from the added capabilities in JavaScript as I did back when I was around 12 or so and I first discovered [Simons' Basic for my C64][sb].

*Ooh, you mean I get an `else` now?  And procedures?  And error trapping?  And a calcluated `GOTO`?  And basic graphics, sound, and I/O commands?  And sprites designed with ASCII art?  Holy crap, this is fun!*

[sb]: http://www.orrville.net/simons/simbqr10.txt
[mk]: http://www.mochikit.com/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082460">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dean.edwards.name/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b33181b8e12bd10dfa373acc8af37cbb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dean.edwards.name/">Dean Edwards</a>
                </div>
                <a href="#comment-221082460" class="permalink"><time datetime="2005-12-09T13:05:25">2005-12-09T13:05:25</time></a>
            </div>
            <div class="content"><p>It's a big overhead for a normal web page though. The compressed library is 90K.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082462">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://advogato.org/person/mbrubeck/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=85232f8499fd6ee91623408fc23835d1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://advogato.org/person/mbrubeck/">Matt Brubeck</a>
                </div>
                <a href="#comment-221082462" class="permalink"><time datetime="2005-12-09T18:24:13">2005-12-09T18:24:13</time></a>
            </div>
            <div class="content"><p>That's why JavaScript libraries really need to be highly modular, with minimal dependency chains.  It should be as easy as possible for me to use MochiKit.Async without loading any unnecessary code like MochiKit.Visual or MochiKit.LoggingPane.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082463">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082463" class="permalink"><time datetime="2005-12-09T20:09:46">2005-12-09T20:09:46</time></a>
            </div>
            <div class="content"><p>@Dean: Well, the "packed" MochiKit single-include is 90K... gzip'ed, it's about 24K, which I hope would be the relevant number if mod_gzip is in use.  Though the point is a good one:  MochiKit-based sites certainly won't be winning the 5k page competition.</p>

<p>@Matt:  Actually, MochiKit <em>is</em> pretty modularized-- if you're not using the "packed" version.  Each module (ie. Async, Base, Color, DOM, etc...) has a check right at the top to ensure that what it needs is available.  Async, for example, only requires Base-- it doesn't need Visual or LoggingPane.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082464">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://admin.support.journurl.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5f89d3df08b8dedac1a0fde900a586db&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://admin.support.journurl.com/">Roger Benningfield</a>
                </div>
                <a href="#comment-221082464" class="permalink"><time datetime="2005-12-19T15:00:00">2005-12-19T15:00:00</time></a>
            </div>
            <div class="content"><p>re: Simon's BASIC</p>

<p>Yeah, but you have no idea how many times I typed "center" when it wanted "centre" and "color" when it wanted "colour".</p>

<p>Had the same problems years later with STOS and GFA on my ST, and AMOS on the Amiga.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    