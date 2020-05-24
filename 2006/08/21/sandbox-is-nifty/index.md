I'm really digging the [Sandbox][] theme for WordPress so far.  I've not really done much yet - but between [Sandbox][] and the new [WordPress Widgets][], all my customizations for this blog have been done in CSS and drag-n-drop in the widget management screen.  [Sandbox][] has an enormously rich set of classes dropped into every major element of the page, even down to date/time information on posts and category-based classes.  I could even drop in some seasonal themes to styles posts for holidays and whatnot.  Pumpkins for October, and presents for December!

I *did* need to add one line of PHP to a [Sandbox][] template, and that was a CSS include to my own tack-on CSS full of tweaks to the Spartan skin.  If anything, that's my only feature request so far:  Allow skin selection, and then allow the user to specify an additional stylesheet to further tailor that skin.  The less I need to edit in files installed from third parties, the less I need to maintain when versions get updated.

I'm also running into a few minor CSS oddities when I view my tweaks in MSIE on Windows.  This annoys me, but I only half care to fix them.

[sandbox]: http://www.plaintxt.org/themes/sandbox/
[wordpress widgets]: http://automattic.com/code/widgets/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089256">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.slackorama.com/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=15b474c86cd73c2d12c1d77af11c1d8a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.slackorama.com/blog">Seth</a>
                </div>
                <a href="#comment-221089256" class="permalink"><time datetime="2006-08-21T18:17:39">2006-08-21T18:17:39</time></a>
            </div>
            <div class="content"><p>Hey,
Looks like your markup isn't getting processed in your feed.  This post looked like this in bloglines:</p>

<p>
I’m really digging the [Sandbox][] theme for WordPress so far. I’ve not really done much yet - but between [Sandbox][] and the new [WordPress Widgets][].....
</p>

<p>Also,the link to your "All Entries" feed is busted in the left hand nav on the archive pages.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089258">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089258" class="permalink"><time datetime="2006-08-21T20:20:26">2006-08-21T20:20:26</time></a>
            </div>
            <div class="content"><p>If I'm lucky, I just fixed my Markdown problem by adding this line:
    <code>add_filter('the_content_rss', 'Markdown', 6);</code>
</p>

<p>If I'm not lucky, I just broke everything.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089260">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=15b474c86cd73c2d12c1d77af11c1d8a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Seth</a>
                </div>
                <a href="#comment-221089260" class="permalink"><time datetime="2006-08-21T20:35:26">2006-08-21T20:35:26</time></a>
            </div>
            <div class="content"><p>Yep, feed looks good now.</p>

<p>All the feed links are missing "http" though.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    