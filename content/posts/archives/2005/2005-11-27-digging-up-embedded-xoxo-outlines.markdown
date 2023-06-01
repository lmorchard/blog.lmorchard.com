---
comments_archived: true
date: '2005-11-27T21:19:13-05:00'
layout: post
tags:
- asides
title: Digging up embedded XOXO outlines
wordpress_id: 783
wordpress_slug: digging-up-embedded-xoxo-outlines
wordpress_url: http://decafbad.com/blog/?p=783
---
I've got one last XOXO post in me, and then I'll probably be done jabbering about this for awhile.  Did you know that just about all of my blog posts have several outlines embedded?  It's true.  

Since I only spent about 20 minutes on this so far, the process is still a bit rough and not quite generalized.  But, just for a demo:

* Take this blog post: [Outlining by the fittest](http://decafbad.com/blog/2005/11/26/outlining-by-the-fittest)
* Run it through this XSL: [xoxo-to-opml.xsl](http://decafbad.com/2005/11/xoxo-to-opml.xsl)
* Be my guest and use my web service: [Here be the OPML!](http://decafbad.com/2005/11/tidyxslt?xsl=http://decafbad.com/2005/11/xoxo-to-opml.xsl&doc=http://decafbad.com/blog/2005/11/26/outlining-by-the-fittest)
* Furthermore, be Julian Bond's guest and use his OPML browser: [Here be the <strike>OPML</strike> HTML!](http://www.voidstar.com/opml/?url=http%3A%2F%2Fdecafbad.com%2F2005%2F11%2Ftidyxslt%3Fxsl%3Dhttp%253A%252F%252Fdecafbad.com%252F2005%252F11%252Fxoxo-to-opml.xsl%26doc%3Dhttp%253A%252F%252Fdecafbad.com%252Fblog%252F2005%252F11%252F26%252Foutlining-by-the-fittest)

Hooray for [The power of the URL-line](http://207.22.26.166/bytecols/2001-08-15.html)! Now, when I finally get off my butt and compose a new blogroll, you'll be able to get an OPML version in a similar way.  See, this stuff feels a bit like magic to me.

<!-- tags: xoxo opml microformats -->

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221083596">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dannyayers.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7028f422ca6da0180de6c9d922a3228f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dannyayers.com">Danny</a>
                </div>
                <a href="#comment-221083596" class="permalink"><time datetime="2005-11-29T18:45:12">2005-11-29T18:45:12</time></a>
            </div>
            <div class="content"><p>Bravo! Those URL line thingies are just so coool...</p>

<p>Oddly enough I was thinking along similar lines earlier, though hadn't thought of the blogrolls-public/sublist-private angle. Good point. </p>

<p>What I did do was ping Bloglines about their blogroll export facility - HTML, but not as a list. Anyhow I just got word from Mark Fletcher to say he'll add it to the "enhancements list".</p>

<p>Hmm, dunno, at some point I'd like to get one or two things as Javascript-collapsible outlines on my WordPress blog. Maybe archives,  categories and search results (title with collapsible content). See what it looks like anyhow. I think it might also be handy for little subject-specific groups of posts, like you could have all your XOXO posts on a single page, as an outline. Shouldn't be too hard to create a WP template, your transclusion XSLT probably does most of what's needed.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083598">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philwilson.org/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=abb5e982d97d7539860141b7904ba31a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philwilson.org/blog/">Phil Wilson</a>
                </div>
                <a href="#comment-221083598" class="permalink"><time datetime="2006-03-03T14:25:39">2006-03-03T14:25:39</time></a>
            </div>
            <div class="content"><p>Gosh, this is really impressive, but also demonstrates the power of using XOXO on your page (i.e. lists!). </p>

<p>How long before someone suggests a microformat for marking up OPML attributes in HTML lists? </p>

<p>An idle thought: presumably, you could add rel="prev" and rel="next" to your 'nearby' links to give a bit more meaning to them (http://www.w3.org/TR/REC-html40/types.html#type-links). I guess at some point in the future that could be exploited by hAtom and the Atom Publishing Protocol for enumerating and navigating Atom collections.</p>

<p>It would be interesting to know how you could more meaningfully link to "related" items.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    