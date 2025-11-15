---
comments_archived: true
date: '2003-09-02T00:22:53-04:00'
layout: post
title: Using web services and XSLT to scrape RSS from HTML
wordpress_id: 472
wordpress_slug: xsl-scraper
wordpress_url: http://www.decafbad.com/blog/?p=472
---
<br /><br />
<p>
After tinkering a bit with
<a href="http://www.decafbad.com/blog/geek/rss_scrape_urls2.html" target="_top">web services and XSLT-based scraping</a>
last week for generating <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> from HTML, I ripped out some work I was
doing for <a href="http://www.decafbad.com/cvs/XPathScraper/" target="_top">a Java-based scraper</a> I'd started
working on <a href="http://www.decafbad.com/blog/tech/old/ooobca.html" target="_top">last year</a> and
threw together a kit of XSLT files that does most everything I was trying
to do.
</p><p>
I'm calling this kit <a href="http://www.decafbad.com/twiki/bin/view/Main/XslScraper">XslScraper</a>, and there's further blurbage and download links
avaiable in the Wiki.  Check it out.  I've got shell scripts to run the stuff
from as a cron job, and CGI scripts to run it all from web services.
</p><p>
For quick gratification, check out these feeds:
<ul>
<li> <a href="http://www.decafbad.com/2003/08/tidyxslt?xsl=http%3A%2F%2Fwww.whump.com%2Fdropbox%2Fnationrss%2Fnation.xsl&amp;doc=http%3A%2F%2Fwww.thenation.com"><img src="http://www.decafbad.com/images/xml.gif" border="0" /></a> - <a href="http://www.thenation.com">The Nation</a> (using <a href="http://www.whump.com/moreLikeThis/date/21/08/2003" target="_top">Bill Humphries' XSL</a>) 
</li>
<li> <a href="http://www.decafbad.com/2003/08/tidyxslt?xsl=http%3A%2F%2Fwww.decafbad.com%2F2003%2F08%2Fxsl_scraper%2Fscrapers%2Fkurzweilai.xsl&amp;doc=http%3A%2F%2Fwww.kurzweilai.net%2Findex.html%3Fflash%3D1"><img src="http://www.decafbad.com/images/xml.gif" border="0" /></a> - <a href="http://www.kurzweilai.net/index.html?flash=1">KurzweilAI.net</a>
</li>
<li> <a href="http://www.decafbad.com/2003/08/tidyxslt?xsl=http%3A%2F%2Fwww.decafbad.com%2F2003%2F08%2Fxsl_scraper%2Fscrapers%2Fjlist.xsl&amp;doc=http%3A%2F%2Fwww.jlist.com%2FUPDATES%2FPG%2F7%2F"><img src="http://www.decafbad.com/images/xml.gif" border="0" /></a> - <a href="http://www.jlist.com/">J-List -- You've got a friend in Japan!</a>
</li>
<li> <a href="http://www.decafbad.com/2003/08/tidyxslt?xsl=http%3A%2F%2Fwww.decafbad.com%2F2003%2F08%2Fxsl_scraper%2Fscrapers%2Fumich-jobs.xsl&amp;doc=http%3A%2F%2Fwebsvcs.itd.umich.edu%2Fjobnet%2Fnew_postings_byjobfamily.php"><img src="http://www.decafbad.com/images/xml.gif" border="0" /></a> - <a href="http://websvcs.itd.umich.edu/jobnet/">New JOBS at the University of Michigan (By Job Family)</a>
</li>
</ul>
</p>
<!--more-->
shortname=xsl_scraper

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082688">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://patrick.lioi.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0af1f52a082bc92d355d3fc9b29b4c2e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://patrick.lioi.net">Patrick Lioi</a>
                </div>
                <a href="#comment-221082688" class="permalink"><time datetime="2003-09-03T19:03:03">2003-09-03T19:03:03</time></a>
            </div>
            <div class="content">The KurzweilAI.net feed is empty.</div>
            
        </li>
    
        </ul>
    
        </div>
    