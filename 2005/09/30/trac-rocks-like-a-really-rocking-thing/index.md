Say hello to [my new Trac installation][dbtrac]!

For a couple of years now, I've been meaning to take a serious look at [Trac][].  But, general level of busy, as well as random obstacles to getting it up and running kept me from getting very far.  Such is so often the story with me.

Finally, though, I've gotten [an instance][dbtrac] running on our server here.  All I can say is, "**Wow!**"  This package does everything I ever wanted to cobble together using [TWiki][twiki], [MoinMoin][moin], [kwiki][] [viewcvs][], and any other pieces I ever looked at (ie. [Bugzilla][], [Request Tracker][], etc)

[Trac][] has an amazingly dead-simple macro and plugin system which puts [TWiki][] and possibly [kwiki][] to shame.  Just take a look at the [MacroBazzar][baz] and this [hacks collection][hacks].  And, the system seems pretty cleanly architected—templates pages, simple extension points, SQLite database.  I've already been able to easily wade in and make some tweaks of my own under the hood, as well as fix a few macro/plugins which were broken between v0.8 / v0.9 revisions.

Your mileage may vary, of course, but I think I've found my new favorite web app.  It's now a replacement for the wiki and SVN repository browser I used to have running on 0xDECAFBAD v3.

[moin]: http://moinmoin.wikiwikiweb.de/
[kwiki]: http://www.kwiki.org/
[baz]: http://projects.edgewall.com/trac/wiki/MacroBazaar
[hacks]: http://trac-hacks.swapoff.org/
[tag]: http://dev.muness.textdriven.com/trac.cgi/wiki/tags/Setup
[request tracker]: http://www.bestpractical.com/rt/
[bugzilla]: http://www.bugzilla.org
[twiki]: http://twiki.org/
[viewcvs]: http://viewcvs.sourceforge.net/
[dbtrac]: http://decafbad.com/trac/
[trac]: http://projects.edgewall.com/trac/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090855">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://simon.incutio.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=de99266e9eaac8b6946541f8661afbd8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://simon.incutio.com/">Simon Willison</a>
                </div>
                <a href="#comment-221090855" class="permalink"><time datetime="2005-09-30T16:19:27">2005-09-30T16:19:27</time></a>
            </div>
            <div class="content"><p>I couldn't agree more - Trac is an absolute gem. It's even written in Python :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090856">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=a0b347907bfaf05694805210ec595d6c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Martin Atkins</a>
                </div>
                <a href="#comment-221090856" class="permalink"><time datetime="2005-09-30T18:54:02">2005-09-30T18:54:02</time></a>
            </div>
            <div class="content"><p>My favourite thing is that you can use Wiki markup in the commit log. Sure, it doesn't work if you're not viewing it through Trac, but Wiki markup tends to be unobtrusive anyway.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090857">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=cb8d1a00f46e0382a9e9c2f36fcedb5f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Brandon Pierce</a>
                </div>
                <a href="#comment-221090857" class="permalink"><time datetime="2005-10-02T19:31:27">2005-10-02T19:31:27</time></a>
            </div>
            <div class="content"><p>My only complaint about Trac is how difficult it is to get installed and going. I consider myself a power user, though I'm not exactly a code whiz, and I still had a rough time getting it going on my OS X machine (and quite frankly never really did get it fully going). I suppose I'm spoiled by all of the great double-clickable installers that people make for these kinds of packages. :) If I knew more I'd figure out how to make one for Trac.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090858">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.brunningonline.net/simon/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=02b2184590d81d2280d2c9802b05fe83&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.brunningonline.net/simon/blog/">Simon Brunning</a>
                </div>
                <a href="#comment-221090858" class="permalink"><time datetime="2005-10-04T13:47:23">2005-10-04T13:47:23</time></a>
            </div>
            <div class="content"><p>Re Trac on OSX - anyone tried http://trac.darwinports.com/ ?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090860">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://esc.web.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=1d648b96ed56c22d316154432e12967c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://esc.web.com">Richard Bogle</a>
                </div>
                <a href="#comment-221090860" class="permalink"><time datetime="2005-10-09T23:06:50">2005-10-09T23:06:50</time></a>
            </div>
            <div class="content"><p>I had the same grief with getting Trac running and then <a href="http://www.cvsdude.com/" rel="nofollow">CVSDude</a> offered it all nicely hosted for me. :)  The price is right and the system works and it's exactly what I wanted.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    