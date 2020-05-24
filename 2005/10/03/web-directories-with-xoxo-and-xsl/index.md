Now, in my [previous post][prev], I'd mentioned that I might have some ideas to "put up" in response to this recent OPML and web directories kerfluffle.  Here's my general idea:

How about trying [XOXO][], [the `rel` attribute on HTML links][rel], and [the `subsection` link type][subsection]—all with a bit of XSL to make it work?

Here's some working data and code:

  * [Here's the end result][end], a simple web directory.
  
Here are some clues as to what the above does:

  * This directory started with [this top-level outline][master].  View source on this page, notice the "Syndication Feeds" link with the `rel="subsection"`.
  * Applying [this XSL][xsl] using [this web service][xsltproc] is where the work gets done.  This consists of dereferencing each link with a `rel="subsection"` and transcluding the innards of the page at the end of the URL.
  * Notice that [the URL of "Syndication Feeds"][ex2] comes from a domain other than `decafbad.com`.  If I wanted to, the [third level of transclusion][ex3] could've come from yet another domain, too.
  
I think this solution is better than using OPML for web directories.  Although it could use some refinement—using a bit of `<iframe>` or AJAX magic to include in a page, perhaps—it's not only *already supported* by more applications than OPML, it *also* leverages a lot of prior art and consensus work.  

So, am I wrong here?  If so, please tell me how, where, and why.

[ex3]: http://hackingfeeds.com/2005/10/xoxo-transclude/ex3.html
[ex2]: http://hackingfeeds.com/2005/10/xoxo-transclude/ex2.html
[xsltproc_src]: http://decafbad.com/2005/10/xoxo-transclude/xsltproc.txt
[xsltproc]: http://decafbad.com/2005/10/xoxo-transclude/xsltproc
[xsl]: http://decafbad.com/2005/10/xoxo-transclude/xoxo-transclude.xsl
[master]: http://decafbad.com/2005/10/xoxo-transclude/ex1.html
[end]: http://decafbad.com/2005/10/xoxo-transclude/xsltproc?xslAddr=xoxo-transclude.xsl&amp;docAddr=ex1.html
[subsection]: http://www.w3.org/TR/REC-html40/types.html#type-links
[rel]: http://www.w3.org/TR/REC-html40/struct/links.html#h-12.2
[xoxo]: http://microformats.org/wiki/xoxo
[prev]: http://decafbad.com/blog/2005/10/02/a-kerfluffle-of-opml-and-web-directories

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085762">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://theryanking.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c846b78a4a4c978fd34ef965320a13b0&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://theryanking.com">ryan king</a>
                </div>
                <a href="#comment-221085762" class="permalink"><time datetime="2005-10-03T05:53:27">2005-10-03T05:53:27</time></a>
            </div>
            <div class="content"><p>You're not wrong. This is very awesome.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085763">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dannyayers.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7028f422ca6da0180de6c9d922a3228f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dannyayers.com">Danny</a>
                </div>
                <a href="#comment-221085763" class="permalink"><time datetime="2005-10-03T13:37:31">2005-10-03T13:37:31</time></a>
            </div>
            <div class="content"><p>Bravo! I believe you've got the optimal approach to outline-style hierarchies on the Web.</p>

<p>Gopher NG here we come!</p>

<p>http://dannyayers.com/archives/2005/07/14/gopher-ng/</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085764">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221085764" class="permalink"><time datetime="2005-10-03T14:18:23">2005-10-03T14:18:23</time></a>
            </div>
            <div class="content"><p>Danny: Well, hey, if we're going to reinvent Gopher, we may as well do it right.  :)  Next, I set my sights on <a href="http://en.wikipedia.org/wiki/Archie_search_engine" rel="nofollow">Archie</a>--watch out, Google!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085765">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://boston.conman.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=bbb1c69b64019a3df907c3545186f907&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://boston.conman.org/">Sean Conner</a>
                </div>
                <a href="#comment-221085765" class="permalink"><time datetime="2005-10-03T22:30:43">2005-10-03T22:30:43</time></a>
            </div>
            <div class="content"><p>You're wrong because Dave Winer will say you're wrong for not using <em>his</em> format (dispite it being rather loosely specified).</p>

<p>But yeah, I thought that <acronym title="eXtensible HyperText Markup Language">XHTML</acronym> was modular and that you could use sections of it as needed, and that <code>&lt;UL&gt;</code> and <code>&lt;OL&gt;</code> are good enough for outlines.  Seems pretty obvious to me.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085766">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dannyayers.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7028f422ca6da0180de6c9d922a3228f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dannyayers.com">Danny</a>
                </div>
                <a href="#comment-221085766" class="permalink"><time datetime="2005-10-03T23:33:49">2005-10-03T23:33:49</time></a>
            </div>
            <div class="content"><p>Ooh, Archie...yeah...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085767">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.isolani.co.uk/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b4fadb98bc6bb92fd88c969c0d71d2fe&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.isolani.co.uk/blog/">Isofarro</a>
                </div>
                <a href="#comment-221085767" class="permalink"><time datetime="2005-10-04T14:21:22">2005-10-04T14:21:22</time></a>
            </div>
            <div class="content"><p>Hmm, excellent idea to use rel="subsection" - that make so much sense. I have a few Ajax based outliners lying around handling things from ul/li lists, atom feeds and opml outlines. I should pull it all together and prototype what you've suggested above. (I think I also have an OPML-friendly PHP proxy to "alleviate" the cross-domain security measure - should be able to hack it to accept XOXO-like outlines)</p>

<p>Step two would be some WikiSyntax additions to author the above on a wiki (for instance defining transclusion links).</p></div>
            
        </li>
    
        </ul>
    
        </div>
    