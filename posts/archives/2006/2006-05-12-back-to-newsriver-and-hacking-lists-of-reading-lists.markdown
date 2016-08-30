---
comments_archived: true
date: '2006-05-12T13:15:55-04:00'
layout: post
title: Back to NewsRiver, and hacking lists of Reading Lists
wordpress_id: 949
wordpress_slug: back-to-newsriver-and-hacking-lists-of-reading-lists
wordpress_url: http://decafbad.com/blog/2006/05/12/back-to-newsriver-and-hacking-lists-of-reading-lists
---
 <p>After a bit of a hiatus from it, I'm again back to using <a href="http://www.newsriver.org">NewsRiver</a> (with <a href="http://decafbad.com/trac/wiki/DecafbadNewsRiver">my own modifications</a>) as my primary feed reader.  NetNewsWire was starting to feel stagnant to me again, and my only real gripe with NewsRiver was that it seemed to be choking on an unknown few of my feeds.</p>
 <p>So, I took this opportunity to do a little subscription list spring cleaning.  You see, I've been maintaining pretty much the same growing list of subscriptions since around 2002 when I first started playing with Radio UserLand.  It's since followed me around, though export and import and conversion and various other transformations.</p>
 <p>This time, it came out of NetNewsWire and went into the OPML editor.  I opened a <a href="http://hosting.opml.org/decafbad/subscriptions.opml">fresh OPML file</a> and started creating new categories.  I'd initially thought of using my top del.icio.us tags as a starting point for my new feed subdivisions - but that seemed not quite to work.</p>
 <p>The second thing I ran into is that NewsRiver wants reading lists as individual OPML files whose contents consist of a flat list of outline nodes - no hierarchy or sub-branches.  However, I'd tried maintaining things like that during my last round of NewsRiver usage, and it frustrated the crap out of me.  No, maintaining all my subscriptions in a single OPML file, arranged by overall personal topic, is the way for me.</p>
 <p>How to get these reading lists into NewsRiver, then, without breaking them up into separate files?  Well...  NewsRIver doesn't need separate files, per se, just separate URLs.  So, <a href="http://hosting.opml.org/decafbad/reading-list-tools.xsl">XSL to the rescue</a>. I wrote a quick URL-line tool in PHP to transform the OPML using this XSL, which gives me this:</p>
     <ul>
     <li>
     <span><a href="http://decafbad.com/2006/05/xsltproc.php?mode=toc&suboutline=amusements&xml=http://hosting.opml.org/decafbad/subscriptions.opml&xsl=http://hosting.opml.org/decafbad/reading-list-tools.xsl">subscriptions.opml - available reading lists</a></span>
     </li>
     </ul>
 <p>Notice that that link above leads to an HTML page, offering a list of links to individual OPML reading lists.  Click on one - if you're running one of my favorite browsers, you'll see what still seems to be an HTML page listing feeds.  In reality, that's in OPML.  View source to see the trick at work.</p>
 <p>In any case, each of those OPML links have worked just fine for me as subscriptions in NewsRiver.  And, I get to manage the whole shebang in one bit OPML outline while still getting my <a href="http://decafbad.com/blog/2006/01/01/new-feed-reader-ideas-for-the-new-year">stratified River of News</a> I've been wanting.</p>
 <p>I keep thinking that I might like to follow up my in-progress <a href="http://decafbad.com/trac/wiki/FeedMagick">FeedMagick</a> tool with some sort of "OutlineMagick" package.  Who knows - maybe this one-off project will be the start of something like that.</p>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088553">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://idid.wordpress.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e7dd5182b72baa77441d63c06465f784&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://idid.wordpress.com">McD</a>
                </div>
                <a href="#comment-221088553" class="permalink"><time datetime="2006-06-01T00:38:20">2006-06-01T00:38:20</time></a>
            </div>
            <div class="content"><p>les,</p>

<p>I love the newRiver code... Do you get odd characters in the text feeds in lieu of single quotes and such. That's pretty annoying.</p>

<p>I'd love to see the feeds come up with the "view posts" widget closed by default. Is that a simple hack to the default behavior? Then I could just see which bloggers have updated and view the titles of that blogger and hit the view all option.</p>

<p>I appreciate you sharing the code... too bad Winer doesn't open the source to more developers. Users are being forced to integrate changes themselves. dave hasn;t made the shift to an open source mentality and process and he probably won't. He simply won't scale with the current model and he'll likely loose adopters as a result.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088556">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221088556" class="permalink"><time datetime="2006-06-02T14:57:39">2006-06-02T14:57:39</time></a>
            </div>
            <div class="content"><p>Yeah, I get weird characters - I keep meaning to look into that, having something to do with character encoding in various forms.  I also accidentally trigger OPML Editor's macros in item titles that have double quotes.</p>

<p>Not sure what you mean about the closed widget - like, have the items under a feed rolled up and hidden by default?  I think that's something on my TODO list as a per-feed and an overall config option...  not too hard to do - since it's just swapping one CSS class name for another in the feed's on page UL/LI element - but not an option yet.</p>

<p>As for the open source thing...  Actually, at this point, the whole OPML Editor and NewsRiver rig is open source from end to end.  You can get the Frontier source from the OSS project, which builds as the OPML Editor with a switch in XCode on OS X - I think the Windows situation is similar.  And, the source of NewsRiver is perusable from within the OPML Editor itself.</p>

<p>But as for mentality, no Dave hasn't really done the whole SourceForge, mailing list, OSS team thing for his projects like newsRiver.  I don't figure he relishes the annoyances and tip-toeing around egos that'd take, versus just noodling on his neat projects.  It's not too hard for me to build something like decafbadNewsRiver independently from his work, though, which is very nice and actually facilitated by how he's built things.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    