I haven't really gotten around to making [that blogroll I was promising][blogroll].  But, for the hell of it, I tried cleaning up an OPML export from my aggregator to remove my private feeds and for-pay feeds—which, incidentally and unfortunately were some of my most interesting feeds.

But, that said,  here's [my feedroll][fh].  It's the result of some more [URL-line magic][ul]:

* Take one OPML file: [feedroll.opml][opml]
* Grab this XSLT: [opml-to-hblogroll.xsl][hblog]
* Run them both through the [W3C XSLT Service][xsl] to get this: [feedroll.xhtml][run]
* Got some OPML on the web?  Paste your URL here and hit return:
  <form action="http://www.w3.org/2000/06/webdata/xslt" action="GET"><input type="hidden" name="xslfile" value="http://decafbad.com/2005/11/gopher-ng/opml-to-hblogroll.xsl" /><input type="text" name="xmlfile" size="45" value="http://www.opmlmanager.com/opml/alexbarnett.opml" /><input type="hidden" name="transform" value="Submit" /></form><small>Note: Doesn't like OPML that's invalid XML.</small>

If I were less lazy, I'd've included some unobtrusive JavaScript to give this thing expand/collapse handles.  And, I'd also like to work on making it less of a cluttered and raw mess.  So, it's not quite yet what I'd like to share as a proper blogroll.

But, for what it's worth, view source on that feedroll.  I came up with a tentative "hBlogroll" microformat for it, based on XOXO and some OPML semantics.  I haven't written the code for it yet, but I imagine that this should be pretty easily parsed.

[fh]: http://decafbad.com/2005/11/gopher-ng/feedroll.html
[css]: http://decafbad.com/2005/11/gopher-ng/hblogroll.css
[xsl]: http://www.w3.org/2001/05/xslt
[run]: http://www.w3.org/2000/06/webdata/xslt?xslfile=http%3A%2F%2Fdecafbad.com%2F2005%2F11%2Fgopher-ng%2Fopml-to-hblogroll.xsl&xmlfile=http%3A%2F%2Fdecafbad.com%2F2005%2F11%2Fgopher-ng%2Ffeedroll.opml&transform=Submit
[hblog]: http://decafbad.com/2005/11/gopher-ng/opml-to-hblogroll.xsl
[opml]: http://decafbad.com/2005/11/gopher-ng/feedroll.opml
[ul]: http://207.22.26.166/bytecols/2001-08-15.html
[blogroll]: http://decafbad.com/blog/2005/11/27/subscriptions-are-attention-but-what-about-blogrolls

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085280">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://epeus.bogspot.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e1b4d65a6a4b7901f078d5c8c198e9f3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://epeus.bogspot.com">Kevin Marks</a>
                </div>
                <a href="#comment-221085280" class="permalink"><time datetime="2005-12-02T00:44:07">2005-12-02T00:44:07</time></a>
            </div>
            <div class="content"><p>It's being served with
Content-Type: application/xml
and an &lt;?xml version="1.0" encoding="utf-8"?&gt; heading.</p>

<p>If you make doctype header that should persuade firefox and safari to show it as html.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085281">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221085281" class="permalink"><time datetime="2005-12-02T01:57:36">2005-12-02T01:57:36</time></a>
            </div>
            <div class="content"><p>@Kevin:  D'oh.  It's the little things I always forget.  That, and the big things.  Thanks for the reminder!</p></div>
            
        </li>
    
        </ul>
    
        </div>
    