<blockquote cite="http://www.whump.com/moreLikeThis/date/21/08/2003"><i>Continuing with making it easier for "Big Pubs" to create RSS feeds. I'm assuming that they have a publishing system, but it wasn't built with RSS in mind, but they want on the bandwagon.</i></blockquote><div class="credit" align="right"><small>Source: <cite><a href="http://www.whump.com/moreLikeThis/date/21/08/2003">More Like This WebLog: Thursday, 21 August 2003</a></cite></small></div>	<p>Using curl, tidy, and <span class="caps">XSL</span> to scrape content from <span class="caps">HTML</span> pages into an <span class="caps">RSS</span> feed.  This is basically what I do now with a half-baked Java app using JTidy, XPath, and BeanShell.  I keep meaning to release it, but it&#8217;s too embarassing to share so far.  Yet, it&#8217;s been working well enough to scrape what sites I&#8217;m interested in such that I haven&#8217;t been too motivated to tidy it up and tarball it.  One thing I like better about Bill Humphries&#8217; approach, though, is that it doesn&#8217;t use Java :)</p>
<!--more-->
shortname=rss_scrape_xsl

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090870">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.whump.com/moreLikeThis/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=622548e3f303e03297375ab20ddcb696&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.whump.com/moreLikeThis/">Bill Humphries</a>
                </div>
                <a href="#comment-221090870" class="permalink"><time datetime="2003-08-22T20:23:59">2003-08-22T20:23:59</time></a>
            </div>
            <div class="content">Well, it could use Java, if you really, really, want to since Xalan and Saxon have command line variants. I'm using LibXSLT in the demo.</div>
            
        </li>
    
        <li class="comment" id="comment-221090871">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/blog">l.m.orchard</a>
                </div>
                <a href="#comment-221090871" class="permalink"><time datetime="2003-08-23T13:21:08">2003-08-23T13:21:08</time></a>
            </div>
            <div class="content">Well, I actually like the idea of chaining a few shell programs together much better than the all-in-one Java scraper I was tinkering with.  Seems so much easier all around.</div>
            
        </li>
    
        </ul>
    
        </div>
    