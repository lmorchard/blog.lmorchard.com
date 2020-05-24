 <p>So, who knows how long it'll stay up - or if it even works for anyone besides me in Firefox on OS X - but I've got an initial version of an <a href="http://decafbad.com/trac/wiki/S3Ajax">S3Ajax</a>-based wiki:</p>
     <ul>
     <li>
     <span><a href="http://s3.amazonaws.com/s3wiki/wiki/StartPage"><a href="http://s3.amazonaws.com/s3wiki/wiki/StartPage">http://s3.amazonaws.com/s3wiki/wiki/StartPage</a></a></span>
     </li>
     </ul>
 <p>I'm using <a href="http://goessner.net/">Stefan G&ouml;ssner's</a> <a href="http://goessner.net/articles/wiky/">Wiky</a>, to handle round trip conversion between wiki text and HTML.  My <a href="http://decafbad.com/trac/wiki/S3Ajax">S3Ajax</a> handles all the I/O, tied together with a clunky <a href="http://s3.amazonaws.com/s3wiki/js/wiki.js">wiki.js</a>.</p>
 <p>I've not had time yet to test this at all, but I figured setting it loose on a public-write ACL bucket on S3 would surely get bugs exposed.  :) Be aware that I will nuke this bucket for any whimisical reason, including porn or spam or excessive usage costs.</p>
 <p>Anyway, one of the main tricks to this thing of which I'm particularly enamoured is the fact that all the pages are stored as HTML.  There's a bit of JS and CSS include hell going on in the page header that I'd like to reduce, but all the wiki text mungeing happens in the browser.  What lands in the S3 bucket is pure HTML, fully able to be separated from the wiki system and crawled by Google or processed in whatever other way you'd like.</p>
 <p>More soon.  For now:  I go to bed.</p>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084960">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=c9302dd41c8d25a2de00d04dccf4a086&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Brett Adam</a>
                </div>
                <a href="#comment-221084960" class="permalink"><time datetime="2007-01-21T12:12:51">2007-01-21T12:12:51</time></a>
            </div>
            <div class="content"><p>Have you considered using TiddlyWiki and marrying it to S3 as the backend? Would be an "instant" <em>useful</em> wiki. See http://bewest.wordpress.com/2006/09/04/idea-tiddlywiki-s3-microformat-tabulator/ and</p></div>
            
        </li>
    
        </ul>
    
        </div>
    