So, after reading a [comment from Brian Cors][cb] and wandering by [his site][hs] again, I've suddenly gotten more interested in the [Hemingway][hw] theme for [WordPress][wp].  One problem, though:  Although the [WordPress Widgets][ww] plugin (about which [I've raved][ir]) was based on [Hemingway][hw]'s Blocks feature, it's not apparently compatible.  So, anyone know how to make it compatible, or where I can get more Hemingway blocks?

*Update:*  Actually, Hemingway blocks look pretty easy to make, and the [inlineRSS][irss] plugin makes for easy external site integration so I can pull my output together here.  Now, if I can just get around the bugs in word-count-limited front page excerpts with Markdown.

[irss]: http://www.iconophobia.com/wordpress/?page_id=55
[ir]: http://decafbad.com/blog/2006/08/21/sandbox-is-nifty
[ww]: http://automattic.com/code/widgets/
[wp]: http://wordpress.org/
[cb]: http://decafbad.com/blog/2006/10/26/much-ablog-about-nothing#comment-44695
[hs]: http://brian.cors.org/blog/
[hw]: http://warpspire.com/hemingway/hemingway-for-wordpress

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082887">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://brian.cors.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7b3073e125f3ac8f09130950ef5d7790&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://brian.cors.org">brian cors</a>
                </div>
                <a href="#comment-221082887" class="permalink"><time datetime="2006-10-27T11:35:14">2006-10-27T11:35:14</time></a>
            </div>
            <div class="content"><p>You nailed it.  I use inlineRSS to suck in feed info from other sites, and place the php code into a new "block" for each section.  </p>

<p>It's pretty cool - once you add code into the "blocks" directory - then go back to your WordPress admin site, it will know that you added new code and ask you for the name of the new block.</p>

<p>Be warned - name the block as you want it the first time - from what I can tell [and confirmed by the theme author] - you can't rename it once you do so.</p>

<p>Have fun, and good luck!   There are a few special xslt files that I use - one in particular for my del.icio.us links - that I can pass along, if desired...</p></div>
            
        </li>
    
        </ul>
    
        </div>
    