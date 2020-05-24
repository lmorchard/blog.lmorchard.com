Okay, so I'm probably the only one who didn't know this, but I've been wondering why it seems that every website owned by someone within a few degrees of separation from <a href="http://www.decafbad.com/twiki/bin/view/Main/TimBL">TimBL</a> tend to use URLs of the form:
<br /><br />
<code>http://www.example.org/2002/11/nifty-thing</code>
<br /><br />
Just one of those things I figured kinda made sense, but was never sure why for.  Then, today after a bit of wandering while researching things <a href="http://www.decafbad.com/twiki/bin/view/Main/RDF">RDF</a> and <a href="http://www.decafbad.com/twiki/bin/view/Main/SemanticWeb">SemanticWeb</a>, I found a link from <a href="http://infomesh.net/sbp/" target="_top">Sean B. Palmer</a> pointing to <a href="http://www.w3.org/Provider/Style/URI.html" target="_top">Hypertext Style: Cool URIs don't change</a> by <a href="http://www.decafbad.com/twiki/bin/view/Main/TimBL">TimBL</a> himself.  Seems the example of this pattern is layed out there by the man himself.
<br /><br />
Seems like it would work like a limited sort of concurrent versioning scheme, but it just looked wonky the first time I saw it.  I mean - date-based website layout?  I'd been raised on the high falutin' directory trees made by very well (overly?) paid Information Architect types.  <code>/2000/10/stuff</code>?  What about <code>/about-us/corporate/ceo.html</code>?
<br /><br />
Of course, this is ignoring the fact that some webservers need not directly tie physical disk layout to URL layout.  Or that site architecture is best presented via links in the documents themselves.  It's just that plain vanilla Apache uses a 1:1 match between file path and URL path, and that's what most everyone uses.
<br /><br />
Hmm..  Might play with it a bit around here.
<!--more-->
shortname=ooocbg

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221083389">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://boston.conman.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=778e89305f331b88a87a94b348164df8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://boston.conman.org/">Sean Conner</a>
                </div>
                <a href="#comment-221083389" class="permalink"><time datetime="2002-11-22T03:43:50">2002-11-22T03:43:50</time></a>
            </div>
            <div class="content">Then you might want to check out some work I've done, mixing TBL's &quot;Cool URLs don't change&quot; with Ted Nelson's tumblers (my take on the idea):
  
  About the Boston Diaries

  The Electric King James Bible



Also, I've kept the same structure to my website since I started it in 1993 or 1994 or there abouts.  I've found that both the stability and longevity of the site has help my search engine rankings tremendously.</div>
            
        </li>
    
        <li class="comment" id="comment-221083390">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://radio.weblogs.com/0103807/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=88e81cf7be9d199cd85591fc506d869c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://radio.weblogs.com/0103807/">Scott Johnson</a>
                </div>
                <a href="#comment-221083390" class="permalink"><time datetime="2002-11-27T11:50:57">2002-11-27T11:50:57</time></a>
            </div>
            <div class="content">One of my problems with this style of url is it doesn't seem to allow for alternate representations of the same info i.e. file.html versus file.pdf.  And while I'll admit that extensions are lousy conventions -- they work.  If I see a url that's PDF then I know it might crash my browser, take longer, etc.  So for me at least (and there are lots of geeky folks out there) extensions work.

The Boston Diaries stuff is cool, imho.</div>
            
        </li>
    
        <li class="comment" id="comment-221083392">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://boston.conman.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=778e89305f331b88a87a94b348164df8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://boston.conman.org/">Sean Conner</a>
                </div>
                <a href="#comment-221083392" class="permalink"><time datetime="2002-11-27T19:45:53">2002-11-27T19:45:53</time></a>
            </div>
            <div class="content">But part of the HTTProtocol is content negotiation (which includes language preference)---the client says &#8220;I can accept the following resource types ... &#8221; and the server can then determine the best type to send.  Ideally, if a client says &#8220;only plain text please,&#8221; then the server can convert from HTML to text (now it can wimp out and send nothing).  Extentions can be completely hidden.

I also don't think you'll be seeing dynamically generated PDF files ala The Electric King James any time soon.  Heck, I've yet to see any other site send down dynamically generated HTML like I've done ...</div>
            
        </li>
    
        </ul>
    
        </div>
    