<p>Okay, so I took another shot at <a href="http://www.decafbad.com/blog/geek/rss_scrape_urls.html">scraping <span class="caps">HTML</span> with web services</a> with <a href="http://www.jlist.com">another site</a> that passes the <span class="caps">HTML </span>Tidy step.  Luckily, this is a site that I already scrape using my own tool, so I have XPath expressions already cooked up to dig out info for <span class="caps">RSS</span> items.  So, here are the vitals:</p>


<ul>
	<li>Site: <a href="http://www.jlist.com">http://www.jlist.com</a></li>
	<li><span class="caps">XSL</span>: <a href="http://www.decafbad.com/jlist.xsl">http://www.decafbad.com/jlist.xsl</a></li>
	<li>Tidy <span class="caps">URL</span>: <a href="http://cgi.w3.org/cgi-bin/tidy?docAddr=http%3A%2F%2Fwww.jlist.com%2FUPDATES%2FPG%2F365%2F">http://cgi.w3.org/cgi-bin/tidy?<br />docAddr=http%3A%2F%2Fwww.jlist.com%2FUPDATES%2FPG%2F365%2F</a></li>
	<li>Final <span class="caps">URL</span>: <a href="http://www.w3.org/2000/06/webdata/xslt?xslfile=http%3A%2F%2Fwww.decafbad.com%2Fjlist.xsl&#38;xmlfile=http%3A%2F%2Fcgi.w3.org%2Fcgi-bin%2Ftidy%3FdocAddr%3Dhttp%253A%252F%252Fwww.jlist.com%252FUPDATES%252FPG%252F365%252F&#38;transform=Submit">http://www.w3.org/2000/06/webdata/xslt?<br />xslfile=http%3A%2F%2Fwww.decafbad.com%2Fjlist.xsl&#38;<br />xmlfile=http%3A%2F%2Fcgi.w3.org%2Fcgi-bin%2Ftidy%3F<br />docAddr%3Dhttp%253A%252F%252Fwww.jlist.com%252FUPDATES%252FPG%252F365%252F&#38;<br />transform=Submit</a></li>
</ul>

	<p>Unfortunately, although it looks okay to me, this feed <a href="http://feeds.archive.org/validator/check?url=http%3A%2F%2Fwww.w3.org%2F2000%2F06%2Fwebdata%2Fxslt%3Fxslfile%3Dhttp%253A%252F%252Fwww.decafbad.com%252Fjlist.xsl%26xmlfile%3Dhttp%253A%252F%252Fcgi.w3.org%252Fcgi-bin%252Ftidy%253FdocAddr%253Dhttp%25253A%25252F%25252Fwww.jlist.com%25252FUPDATES%25252FPG%25252F365%25252F%26transform%3DSubmit">doesn&#8217;t validate yet</a>, but I&#8217;m still poking around with it to get things straight.  Feel free to help me out!  :)</p>
<!--more-->
shortname=rss_scrape_urls2
