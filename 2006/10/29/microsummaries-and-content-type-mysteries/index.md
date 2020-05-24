One of my favorite features of the new Firefox are [Microsummaries][ms].  They're like RSS-lite: one-liner summaries of web pages that can be used to keep bookmark titles up to date and get succinct info about a page.  For example, you could get the latest temperature from the title of a weather report bookmark, or the most recent bid price from an auction page.

But, there's one thing that rubs me the wrong way, and it's this:

    <link rel="microsummary" href="microsummary.txt">

That's how you clue a client into finding the microsummary for a given HTML page.  Stick that in your head tag, and you're off.  It's just like [RSS autodiscovery][rd].  Well it is, except for an important detail: What's the Content-Type I should expect at that URL?

You see, microsummaries can be provided as either a direct URL to a plain text summary of the page, or a URL to an XML-based generator providing the means to extract that plain text summary from the page.  But, as spec'ed, you never know which you're going to get until you fetch the URL.  So, when trying to handle a [microsummary][mst], I never know whether to just use the fetched content directly as plain text or whether it's time to fire up the XSL machinery.

I've seen some sites toss in a type="text/plain" or type="application/xml" attribute - which is very helpful and what I really want to see - but it's not in [the spec][mst].  From a cursory perusal of Firefox source code, it looks like the browser tries to sniff the Content-Type header returned by the web server - but that sucks, because web servers often lie or are confused about Content-Type.  I need to read more into that source code, so I can at least do as well as Firefox does.

Eh, it's a small gripe, but one on which I've spent too much time already.

[rd]: http://diveintomark.org/archives/2002/05/30/rss_autodiscovery
[ms]: http://microsummaries.org/
[mst]: http://wiki.mozilla.org/Microsummaries

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082514">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://george.hotelling.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c7d1c8d2b1a7643236a4661e9a974dee&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://george.hotelling.net/">George Hotelling</a>
                </div>
                <a href="#comment-221082514" class="permalink"><time datetime="2006-10-29T22:26:04">2006-10-29T22:26:04</time></a>
            </div>
            <div class="content"><p>What's the advantage of sticking it into the markup instead of just using the HTTP headers for the microsummary?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082515">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082515" class="permalink"><time datetime="2006-10-31T01:11:08">2006-10-31T01:11:08</time></a>
            </div>
            <div class="content"><p>Well, in the markup, I'm more confident it'll tell the intended truth.  That's easier to change many times than the server config itself to serve up the correct HTTP headers.  I know this is a shady argument - but so far in my small sample set of 8 or so sites, a third of them fed me the wrong Content-Type.  That is, "text/HTML" when it was plain text, "text/HTML" when it was an XML generator.  So, I've had to come up with some smart guesses.</p>

<p>One example, <a href="http://www.markdownmonkey.com/microsummary.asp" rel="nofollow">Markdown Monkey</a>.  The site header includes a type="application/x.microsummary+xml" for href="http://www.markdownmonkey.com/microsummary.asp", yet the server feeds me a Content-Type: text/html header.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082517">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082517" class="permalink"><time datetime="2006-10-31T01:12:15">2006-10-31T01:12:15</time></a>
            </div>
            <div class="content"><p>And, of course, there's always this old horror story:</p>

<p>http://www.xml.com/pub/a/2004/07/21/dive.html</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082518">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.melez.com/mykzilla/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4bcc1646956acd3ee25234b34da91414&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.melez.com/mykzilla/">Myk Melez</a>
                </div>
                <a href="#comment-221082518" class="permalink"><time datetime="2006-11-01T01:33:18">2006-11-01T01:33:18</time></a>
            </div>
            <div class="content"><p>Indeed, Firefox ignores the type attribute to the  tag.  It would be great if that attribute wasn't necessary, because web servers always served the correct type, but that's clearly not the case, and allowing pages to specify the content type of their microsummaries seems likely to be as useful for microsummaries as it is for feeds.</p>

<p>I have filed <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=358977" rel="nofollow">bug 358977</a> on the issue.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082519">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082519" class="permalink"><time datetime="2006-11-01T02:23:32">2006-11-01T02:23:32</time></a>
            </div>
            <div class="content"><p>Myk: Fair enough.  Excellent technology, by the way.  :)</p></div>
            
        </li>
    
        </ul>
    
        </div>
    