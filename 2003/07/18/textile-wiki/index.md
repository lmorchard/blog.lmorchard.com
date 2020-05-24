<p>Yesterday, I downloaded Mark Pilgrim&#8217;s <a href="http://diveintomark.org/projects/pytextile/">Python implementation</a> of <a href="http://www.textism.com/tools/textile/">Textile</a> and integrated it into the new hackish blog posting feature I added to my aggregator, and it works great.  Now, I want Textile in my wiki.  I <a href="http://www.google.com/search?q=wiki+textile&#38;ie=UTF-8&#38;oe=UTF-8">google for it</a> and don&#8217;t find much on wikis and Textile together.  I wonder how this could be most easily done?  In <a href="http://www.twiki.org">TWiki</a> ? <a href="http://moin.sourceforge.net/">MoinMoin</a> ? <a href="http://www.kwiki.org">KWiki</a> ?</p>
<!--more-->
shortname=textile_wiki

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086738">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.spoon.cx/~larcher/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=19b996d39a1d517ac0b4b2b4c0415682&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.spoon.cx/~larcher/blog/">Larry</a>
                </div>
                <a href="#comment-221086738" class="permalink"><time datetime="2003-07-19T01:18:02">2003-07-19T01:18:02</time></a>
            </div>
            <div class="content">Tim Appnel's TikiText might work for you .. it does something similar to Textile, but the markup is a bit different.  It's available as a Perl module, so that might work with TWiki.  Or there's a MoinMoin TikiText parser.   On the other hand, since MoinMoin is in Python in might not be too hard to make a parser out of PyTextile... so many choices :-)</div>
            
        </li>
    
        <li class="comment" id="comment-221086740">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://bklyn.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4d9de5dd02416b5d4e1b7f88c1af50ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://bklyn.org">Caleb Epstein</a>
                </div>
                <a href="#comment-221086740" class="permalink"><time datetime="2003-10-22T15:33:29">2003-10-22T15:33:29</time></a>
            </div>
            <div class="content">It turns out to be ridiculously easy to combine PyTextile with MoinMoin.  Here is 
the code which you install in your MoinMoin processors directory as Textile.py.  You must also have PyTextile installed somewhere in the Python search path.</div>
            
        </li>
    
        </ul>
    
        </div>
    