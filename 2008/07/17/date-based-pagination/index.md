Here's a small idea I've not yet had the chance to try out on a large scale:  Time-based pagination in lieu of page-number-based pagination for personal content - ie. blogs, bookmarks, status updates, etc.  (You know, User Generated Content except I dislike the term.)

Page numbers change over time, while time-based URLs are stable.  Most people don't generate an unreasonable amount of stuff in a day, so a page-per-day might not be so bad.  But, if there's too much stuff, degenerate to a page-per-12-hours or whatnot.

Delicious used to have something like this in the web UI, back in the mists of 2003 or so, but Joshua got rid of it after a few design iterations.  The Delicious API is still somewhat based on it, which causes some confusion—but I tend to like it, thus this post.

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085362">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://beesbuzz.biz/"><img src="http://disqus.com/api/users/avatars/plaidfluff.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://beesbuzz.biz/">fluffy</a>
                </div>
                <a href="#comment-221085362" class="permalink"><time datetime="2008-07-17T20:22:38">2008-07-17T20:22:38</time></a>
            </div>
            <div class="content"><p>You mean, like the date-based archives that Movable Type has had for ages?</p>

<p>Yeah, I like those.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085363">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://brevity.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=55d0166df4149bbea204bb997f8447cb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://brevity.org/">Neil Kandalgaonkar</a>
                </div>
                <a href="#comment-221085363" class="permalink"><time datetime="2008-07-18T19:44:42">2008-07-18T19:44:42</time></a>
            </div>
            <div class="content"><p>I've had the same idea for Upcoming, for obvious reasons... our SRP pagination would then be permalinks.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085364">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.anildash.com/"><img src="http://disqus.com/api/users/avatars/anildash.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.anildash.com/">Anil Dash</a>
                </div>
                <a href="#comment-221085364" class="permalink"><time datetime="2008-07-25T17:11:40">2008-07-25T17:11:40</time></a>
            </div>
            <div class="content"><p>Actually, yeah, we built the default pagination for archives in MT4 to be category-by-month, for exactly this reason. I regularly see "?page=2" in URLs and it just seems like such an obvious, avoidable mistake for so many to have embraced. SEO aside, permalinks that are destined to expire over time seem pretty reader-hostile, too.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    