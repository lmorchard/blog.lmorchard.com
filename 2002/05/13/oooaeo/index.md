<p>
Just noticed that <a href="http://www.downes.ca/">Stephen Downes</a> emailed me about his implementation of a <a href="http://www.downes.ca/referrers.htm">Javascript-based referrer linkback system</a>.  I'd been planning to get around to making one inspired from <a href="http://www.decafbad.com/news_archives/000141.phtml">our blogchat</a>, but he's got it first.  Cool.  :)  Looks like <a href="http://radio.weblogs.com/0100887/2002/05/12.html#a234">Jon's picked up on it, too</a>.  
</p>
<br /><br />
<p>
Jon muses:<blockquote><i>I haven't yet looked into what it will take to make the reporting item- rather than page-specific. It's doable, I'm sure. Thanks, Stephen! A <span style='background : #FFFFCE;'><a href="http://www.decafbad.com/twiki/bin/edit/Main/JavaScript?topicparent=Main.FilterData"><b>?</b></a><font color="#0000FF">JavaScript</font></span>-oriented solution like this will appeal to a lot of Radio users.</i></blockquote>
</p>
<br /><br />
<p>
The biggest issue I see for Radio, obviously, is that the style there is to have many blog entries on one page for the day.  Permalinks are anchors within those pages.  However, I haven't seen browsers reporting the post-anchor-hash info for referrals.  At first though, one would need to have Radio spew blog entries into individual files to make this JS linkback scheme work at per-entry granularity.  Otherwise, I'd <i>love</i> to see this work for Radio.  I'd also love to see it woven with <a href="http://rcs.userland.com/">community server</a> services.
</p>
<br /><br />
<p>
A few brief musings on the <a href="http://www.downes.ca/referrers.txt">referrers script itself</a>:
</p>
<br /><br />
<ul>
<br /><br />
<li>
Hmm, haven't seen <a href="http://cgi-lib.berkeley.edu/">cgi-lib.pl</a> used since my Perl 4 and pre-CGI.pm days.  I'd forgotten how serviceable the thing still is.
</li>
<br /><br />
<li>
I like <code>get_page_title()</code>.  It's a start on what I was <a href="http://www.decafbad.com/news_archives/000142.phtml">musing about over here</a>.
</li>
<br /><br />
<li>
I want to steal this, maybe transliterate it into <a href="http://www.decafbad.com/twiki/bin/view/Main/PHP">PHP</a> (since my webhost frowns on my CGIs now), and hook it up to a <a href="http://www.decafbad.com/twiki/bin/view/Main/MySQL">MySQL</a> database.  Stephen doesn't want to host the world's referers, but I wonder how mad my host will get if I open mine up.  :)  Would make for some neat data to draw maps with, but probably shouldn't do things to make myself an even more annoying band practicing neighbor.
</li>
<br /><br />
</ul>
<!--more-->
shortname=oooaeo
