<b>Update:</b> <i>A nice mention and ensuing discussion of this has appeared with <a href="http://lambda-the-ultimate.org/node/view/816">this article at Lambda the Ultimate</a>.  I've killed trackback here due to spam, so I'm tossing this in manually.</i>

It's been awhile since I really sat down and tried knocking something out in the browser with JavaScript / DHTML.  There was that [Greasemonkey thing][gm] I did a little while ago, but that's not quite the same.

So, I suddenly got an urge today to try making a mindmap-ish, boxes-and-lines chart out of some simple nested HTML lists using CSS and unobtrusive JavaScript.  I didn't get all that far toward the original goal--but during the course of exploring [script.aculo.us][s], [Prototype][p], and [Behaviour,js][b] I came up with something that I think has potential.

It's likely to only work on Firefox and Safari, but check it out and drag the boxes around:

[http://www.decafbad.com/2005/06/map-test/](http://www.decafbad.com/2005/06/map-test/)

View the source, steal anything worth theft, make fun of what's bad.  Oh yeah, and don't mind the ugly background images too much: They were just some random textures I picked out of The Gimp in order to see just how well the transparency on distorted PNGs worked.

[gm]: http://www.decafbad.com/blog/2005/06/08/greasemonkey_magic
[b]: http://ripcord.co.nz/behaviour/
[p]: http://prototype.conio.net/
[s]: http://script.aculo.us/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085971">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.srijith.net/trinetre/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=22818a65c8482b1bf908c4b389e98e00&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.srijith.net/trinetre/">Srijith</a>
                </div>
                <a href="#comment-221085971" class="permalink"><time datetime="2005-07-02T02:51:28">2005-07-02T02:51:28</time></a>
            </div>
            <div class="content">Nice.. small problem though. When I drag, say the green box, further up outside the scope of the box, the 'textarea' seems to expand, but in the wrong direction, towards the bottom. So, I still can't see the green box even if I use the slide bar.</div>
            
        </li>
    
        <li class="comment" id="comment-221085972">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=f3794e603ef53b0513ab45b6565ee457&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jeremy Dunck</a>
                </div>
                <a href="#comment-221085972" class="permalink"><time datetime="2005-07-02T04:14:08">2005-07-02T04:14:08</time></a>
            </div>
            <div class="content">http://youngpup.net/2001/domdrag</div>
            
        </li>
    
        <li class="comment" id="comment-221085973">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dean.edwards.name/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b33181b8e12bd10dfa373acc8af37cbb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dean.edwards.name/">Dean Edwards</a>
                </div>
                <a href="#comment-221085973" class="permalink"><time datetime="2005-07-02T04:37:05">2005-07-02T04:37:05</time></a>
            </div>
            <div class="content">That's pretty damn cool.</div>
            
        </li>
    
        <li class="comment" id="comment-221085974">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=e338e5dbb0025cc84dc77943e05161c5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Quadsk8</a>
                </div>
                <a href="#comment-221085974" class="permalink"><time datetime="2005-07-02T11:54:50">2005-07-02T11:54:50</time></a>
            </div>
            <div class="content">This would make an interesting interface in combination with TiddlyWiki, an all in one file wiki, where the tiddlers (boxes with microcontent) have reference with each other. 
http://www.tiddlywiki.com/</div>
            
        </li>
    
        <li class="comment" id="comment-221085975">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.sivas.com/aleene/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=eed7a2b3988f70c6451b1faa10b1547f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.sivas.com/aleene/">Arnaud Leene</a>
                </div>
                <a href="#comment-221085975" class="permalink"><time datetime="2005-07-03T12:34:58">2005-07-03T12:34:58</time></a>
            </div>
            <div class="content">Great. Works also in Omniweb 5.1.1 beta 2</div>
            
        </li>
    
        <li class="comment" id="comment-221085977">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.slashdot.org/quantum+jim/journal/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e645caa8fd93b576fd371483009bf4d8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.slashdot.org/quantum+jim/journal/">Jimmy Cerra</a>
                </div>
                <a href="#comment-221085977" class="permalink"><time datetime="2005-07-03T19:28:17">2005-07-03T19:28:17</time></a>
            </div>
            <div class="content">Note: Use this to easily create usable and dynamic trails [1].

[1] http://www.scottmccloud.com/comics/icst/icst-4/icst-4.html</div>
            
        </li>
    
        <li class="comment" id="comment-221085979">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://donutage.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e32710f243aa4411cfa0a8e2865feace&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://donutage.org/">William Cole</a>
                </div>
                <a href="#comment-221085979" class="permalink"><time datetime="2005-07-05T14:16:45">2005-07-05T14:16:45</time></a>
            </div>
            <div class="content">Very cool. Works in Camino 0.8.4, BTW.</div>
            
        </li>
    
        <li class="comment" id="comment-221085980">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=b836d67476ef6ba4866e4c8eeea56c09&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">DaveGarbutt</a>
                </div>
                <a href="#comment-221085980" class="permalink"><time datetime="2005-07-24T09:53:41">2005-07-24T09:53:41</time></a>
            </div>
            <div class="content">There is a Tiddlywiki with dragand drop of tiddlers.

It is the version done with ruby-on-rails and there is a free hosting site if you want to try it.

See http://www.serversidewiki.com/</div>
            
        </li>
    
        </ul>
    
        </div>
    