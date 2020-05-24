<p>After <a href="http://www.decafbad.com/blog/geek/rss_scrape_xsl.html">checking out</a> <a href="http://www.whump.com/moreLikeThis/date/21/08/2003">Bill Humphries&#8217; approach</a> to scraping yesterday, I recalled the various things <a href="http://udell.roninhouse.com/bytecols/2001-08-15.html">Jon Udell has written</a> about <span class="caps">URL</span>-as-command-line and the various places I&#8217;ve seen the <a href="http://www.w3.org/2001/05/xslt"><span class="caps">W3C XSLT </span>Servlet</a> used in <span class="caps">XSLT</span> tinkering.  I also remembered that there&#8217;s an <a href="http://cgi.w3.org/cgi-bin/tidy"><span class="caps">HTML </span>Tidy service</a> offered by <span class="caps">W3C</span> as well.</p>

	<p>So&#8230;  these are all URLs.  I figured I could pull together the site <span class="caps">URL</span>, <a href="http://www.whump.com/dropbox/nationrss/nation.xsl">Bill&#8217;s <span class="caps">XSLT</span></a>, the tidy service, and the <span class="caps">XSLT</span> service, and have a whole lot of scraping going on right in my browser or via wget or curl.  Here are the steps in how I composed the <span class="caps">URL</span>:</p>

	<ol>
	<li><a href="http://www.thenation.com">http://www.thenation.com</a></li>
<li><a href="http://cgi.w3.org/cgi-bin/tidy?docAddr=http%3A%2F%2Fwww.thenation.com">http://cgi.w3.org/cgi-bin/tidy?docAddr=http%3A%2F%2Fwww.thenation.com</a></li>
<li><a href="http://www.w3.org/2000/06/webdata/xslt?xslfile=http%3A%2F%2Fwww.whump.com%2Fdropbox%2Fnationrss%2Fnation.xsl&xmlfile=http%3A%2F%2Fcgi.w3.org%2Fcgi-bin%2Ftidy%3FdocAddr%3Dhttp%253A%252F%252Fwww.thenation.com&transform=Submit">http://www.w3.org/2000/06/webdata/xslt?<br />xslfile=http%3A%2F%2Fwww.whump.com%2Fdropbox%2Fnationrss%2Fnation.xsl&#38;<br />xmlfile=http%3A%2F%2Fcgi.w3.org%2Fcgi-bin%2Ftidy%3F<br />docAddr%3Dhttp%253A%252F%252Fwww.thenation.com&#38;transform=Submit</a></li>
</ol>

	<p>Unfortunately, this doesn&#8217;t work.  In particular, step #2 fails, the Tidy service reporting a failure in processing the original <span class="caps">HTML</span>.  I imagine, had that worked, the whole process at step #3 would be producing <span class="caps">RSS</span>.  On my command line, <span class="caps">HTML </span>Tidy works fine, so I&#8217;ve been thinking of throwing together my own web interface to that program and seeing if that works.</p>

	<p>If it works, this with the addition of a cache at each stage could allow for what I think is a pretty nifty, all web-based means of scraping news items from web sites.  </p>
 
        <p>What would really be nice for apps like this is a better way to express the URLs-within-URLs without escaping and escaping and escaping and...  Thinking some very lightweight scripting here, or some LISP-ish expressions would help.</p>
<!--more-->
shortname=rss_scrape_urls

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086837">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.whump.com/moreLikeThis/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=622548e3f303e03297375ab20ddcb696&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.whump.com/moreLikeThis/">Bill Humphries</a>
                </div>
                <a href="#comment-221086837" class="permalink"><time datetime="2003-08-24T16:08:56">2003-08-24T16:08:56</time></a>
            </div>
            <div class="content">Does the w3c Tidy service support the force output option? That's what I had to do with command line Tidy to get something well formed from The Nation's home page.</div>
            
        </li>
    
        <li class="comment" id="comment-221086838">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/blog">l.m.orchard</a>
                </div>
                <a href="#comment-221086838" class="permalink"><time datetime="2003-08-24T20:07:03">2003-08-24T20:07:03</time></a>
            </div>
            <div class="content">Unfortunately, it seems that the W3C service only offers an indentation option</div>
            
        </li>
    
        <li class="comment" id="comment-221086840">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.whump.com/moreLikeThis/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=622548e3f303e03297375ab20ddcb696&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.whump.com/moreLikeThis/">Bill Humphries</a>
                </div>
                <a href="#comment-221086840" class="permalink"><time datetime="2003-08-25T02:13:11">2003-08-25T02:13:11</time></a>
            </div>
            <div class="content">It's tempting to take the script, and offer it as a service myself, with the force output option. However, I'd need to wrap an authorization service in front of it so it doesn't kill my bandwidth.</div>
            
        </li>
    
        </ul>
    
        </div>
    