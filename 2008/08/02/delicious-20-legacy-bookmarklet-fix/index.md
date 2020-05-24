As you've probably seen by now, [Delicious 2.0 has launched][del2].  It's an all new design and the whole thing has been rewritten from the ground up.  Most of the gripes I've seem like general dislike of change—which actually attests to the gargantuan effort put forth to reimplement the original from scratch in a whole new language and architecture.

That said, I found [at least one little bug][tw1] that stops my usual bookmarklet flow.  And, what's really annoying is that, it's probably a bug in code I wrote at one point.  As it turns out, the original URL parameters for the bookmark posting form don't seem to be accepted anymore, so legacy bookmarklets may be broken.  I swore I tested that, since I've got some personal investment in it.

But, although I can't contribute code to the project anymore, I've at least still got [Greasemonkey][gm].  And, through [this quick & dirty user script][legacyfix], I'm back to using my legacy bookmarking bookmarklets.  In case you're interested, [here's my favorite Firefox keyword shortcut bookmarklet][bm]—just select some text, type the keyword in the URL bar with some tags, and hit return.

[gm]: http://www.greasespot.net/
[tw1]: http://twitter.com/lmorchard/statuses/875002291
[tw2]: http://twitter.com/lmorchard/statuses/875004144
[del2]: http://blog.delicious.com/blog/2008/07/oh-happy-day.html
[legacyfix]: http://decafbad.com/2008/deliciouscom_legacy_book.user.js
[bm]: javascript:u=%22USERNAME%22;q=location.href;e%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20%20:%20document.selection.createRange().text);p=document.title;window.location.href=%22http://del.icio.us/%22+u+%22?jump=doclose&noui&tags=%22+encodeURIComponent(%22%s%22)+%22&url=%22+encodeURIComponent(q)+%22&description=%22+encodeURIComponent(p)+%20%20%22&extended=%22%20+%20encodeURIComponent('%22'+e+'%22').replace(/%20/g,%20%22+%22);

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084822">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=4762519f72e7ada7f2050a77eedca0e5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Peter Beardsley</a>
                </div>
                <a href="#comment-221084822" class="permalink"><time datetime="2008-08-03T13:52:14">2008-08-03T13:52:14</time></a>
            </div>
            <div class="content"><p>Just curious-- what language was del.icio.us originally implemented in, and what language was it re-implemented in for 2.0?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084825">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084825" class="permalink"><time datetime="2008-08-03T18:30:58">2008-08-03T18:30:58</time></a>
            </div>
            <div class="content"><p>@peter: The original del.icio.us was built with Mason in Perl, backed by MySQL.  The new Delicious 2 is built with Symfony in PHP for the web frontend, with all the out-of-box Symfony database abstraction replaced by a Yahoo!-developed data management and business logic layer written mostly in C++ for the backend.  I'm pretty sure I've read all of that in other public releases, so I don't think I'm letting any cats out of bags there :)</p></div>
            
        </li>
    
        </ul>
    
        </div>
    