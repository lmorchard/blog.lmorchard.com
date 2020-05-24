After following the <a href="http://www.intertwingly.net/blog/836.html">thread on Sam Ruby's blog</a> about <a href="http://scriptingnews.userland.com/backissues/2002/09/20#When:8:39:43AM">Dave's  comment tracking feature request</a>, I figured I'd try <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a>-izing comments on each of my posts.  As things seem to have been going lately, I'd underestimated <a href="http://www.decafbad.com/twiki/bin/view/Main/MovableType">MovableType</a>, and it turned out <strong>so</strong> much easier than I'd thought.  :)  I'd had an <a href="http://www.decafbad.com/recent_comments_rss.xml">RSS feed for comments overall</a> on my site, but now I have individual <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> feeds for each post.  (Notice the <img src="http://www.decafbad.com/images/xml.gif"> in the comments section now.)  The <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> feed is also linked in the head as per <a href="http://diveintomark.org/archives/2002/05/31.html#more_on_rss_autodiscovery">RSS autodiscovery</a> discussions.
<br /><br />
I don't think aggregators are really ready yet for these per-post comment <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> feeds, but the availability of the data gives food for hacking.  Being that they're pretty disposable and of interest for a very short time, aggregators will likely need to implement expiry times for feeds, or watch for a period of inactivity before unsubbing.  Grouing feeds would be nice too, in case I wanted to round up all my points of weblog discussion participation.  I've got a few things of this sort in my <a href="http://www.decafbad.com/twiki/bin/view/Main/AmphetaOutlinesWishList">AmphetaOutlinesWishList</a>, with which I hope to play with further aggregator ideas.
<br /><br />
If you use <a href="http://www.decafbad.com/twiki/bin/view/Main/MovableType">MovableType</a> and you're interested in trying this, check out these two templates:  <a href="http://www.decafbad.com/recent_comments_rss.xml.tmpl">recent_comments_rss.xml.tmpl</a>, for blog-wide comments; and <a href="http://www.decafbad.com/archive_entry.rss.tmpl">archive_entry.rss.tmpl</a>, for per-post comments.  The former template is added as an index template in <a href="http://www.decafbad.com/twiki/bin/view/Main/MovableType">MovableType</a>, whereas the latter is an archive template.  Also, the per-post archive template will need to be added to the list of individual archive templates in the <strong>Archiving</strong> section of your blog config.  You'll want to give it a template for the filename, perhaps something like <code><$MTEntryID pad="1"$>.rss</code>.
<br /><br />
At present, I'm publishing in what I think is vaguely <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> 0.92 format.  Whether it complies with the spec, I'm not quite sure because I was lazy.  I plan to revisit this soon to make it at least comply with <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> 1.0.  <a href="http://www.decafbad.com/twiki/bin/view/Main/ShareAndEnjoy">ShareAndEnjoy</a>.
<!--more-->
shortname=ooobio

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085144">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philringnalda.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e68e9944f50a481a64b5a32fdfc02e0d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philringnalda.com/">Phil Ringnalda</a>
                </div>
                <a href="#comment-221085144" class="permalink"><time datetime="2002-09-22T22:27:20">2002-09-22T22:27:20</time></a>
            </div>
            <div class="content">RSS 1.0 for blog-wide comments: please please, pretty please? I just this minute got the parsing and storing parts of my RDF in RSS project working, and now I'm on the prowl for things to feed it. If it helps, I've got an only partially wrong template (putting HTML in the description, bad me, but I think that you can't both encode_xml and strip_html, and I'd rather encode_xml for safety's sake).</div>
            
        </li>
    
        <li class="comment" id="comment-221085145">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.pycs.net/devlog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=79d809dc2d0441ef44efc6ad1a1429eb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.pycs.net/devlog/">Phillip Pearson</a>
                </div>
                <a href="#comment-221085145" class="permalink"><time datetime="2002-09-22T22:57:00">2002-09-22T22:57:00</time></a>
            </div>
            <div class="content">I'd second that about aggregators not being ready for per-thread feeds ;-)

I implemented per-thread feeds (rather than per-user feeds, for some perverse reason) in the Python Community Server a while back, but have found that they weren't really that useful.

Some poor aggregator has been faithfully downloading http://www.pycs.net/system/comments.py?u=0000003&p=69&format=rss 20 times a day for months, despite the fact that it has *never* contained any items.  Aggregators need to have exponential backoff times or something.

BTW, I have a script to make RSS feeds from RCS comments.  At http://dev.myelin.co.nz/commentmonitor/tracker.py you can generate an RSS feed for anybody on radio.weblogs.com, blogs.salon.com or www.pycs.net.</div>
            
        </li>
    
        <li class="comment" id="comment-221085147">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221085147" class="permalink"><time datetime="2002-09-23T03:21:56">2002-09-23T03:21:56</time></a>
            </div>
            <div class="content">Phil: Hmm... I'll see what I can cook up before the end of tomorrow  :)

Phillip: Yeah, I'd definitely like to see some more smarts in the polling frequency of aggregators.  Got a little blurb about that on my AmphetaOutlinesWishList.  Maybe a combo of manual preferences and automatic back-off would be a start.</div>
            
        </li>
    
        <li class="comment" id="comment-221085148">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://revjim.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=33660e6606dfa6f2a374625315bc40b1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://revjim.net/">Reverend Jim</a>
                </div>
                <a href="#comment-221085148" class="permalink"><time datetime="2002-09-24T10:43:13">2002-09-24T10:43:13</time></a>
            </div>
            <div class="content">While an RSS feed of the comments for an individual entry might be useful for archival purposes (just as weekly, monthly, and/or yearly archive RSS feeds would be) I believe ONE feed for comments might be easier to chew on. As long as each item in the comment RSS feed references a URL that exists in the article RSS feed, aggregators should have little trouble matching one to the other. Having a separate RSS feed for comments per article means that aggregators would have to first get the RSS feed for the articles, then use RSS auto-discovery (as there would be NO other way) to locate the comment feed for each new article, then go get the comment RSS feed. This is a lot more work, not to mention more network bandwidth.</div>
            
        </li>
    
        </ul>
    
        </div>
    