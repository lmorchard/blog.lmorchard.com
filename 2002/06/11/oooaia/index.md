<p>Reading Dave's in-progress <a  href="http://radio.userland.com/whatIsANewsAggregator">What is a News Aggregator?</a>:<blockquote><i> A news aggregator is a piece of software that periodically reads a set of news sources, in one of several XML-based formats, finds the new bits, and displays them in reverse-chronological order on a single page.</i></blockquote>..and the rest leads from there.  First thing:  I think this is an unfortunately limited definition.  It specifies the particular interface by which <a href="http://radio.userland.com">Radio</a> presents information.  And, as a comment on <a href="http://www.decafbad.com/news_archives/000187.phtml">one of my first experments</a> in tweaking <a href="http://www.disobey.com/amphetadesk/">AmphetaDesk</a>'s interface attests (no author link):<blockquote><i>I've been wanting to use an aggregator since I first heard of them (RU7) but have always felt that because poor information architecture/presentation they tended to make tracking a large number of sites harder rather than easier.</i></blockquote>I didn't expect my first attempt to be called "Brilliant! Lovely! Perfect!", but I did think that I was on to something.  Simply displaying the new bits in reverse-chronological order is too limiting - it's only one attempted solution at the problem of aggregation.  My solution isn't an ultimate one either.  </p>
<p>Aggregators desperately need to grow toward more flexibility and scan-ability.  A few things I'd really like to see addressed:<ul><li>De-emphasis of seen &amp; older items from sites, but not complete hiding.  Context between entries on weblogs is important.</li><li>Optional grouping of items from the same or similar weblogs.  Context between entries, and between blogs is important.</li><li>Emphasis of newer items, tracking the time line and signalling attention to changes.  Radio does this, but mostly to the exclusion of other concerns.</li><li>Preventing sites with few updates from getting lost in a wash of frequently updating sites.  Some of the best sites may update once every few days with something worth reading, but simple reverse-chronological order pushes the quiet sites out in the maelstrom.</li></ul>There's more I've been musing about, but I can't remember more at the moment.  I've tried to do a few of these things with my tweak to Ampheta: varied (hopefully not obtrusive) font size &amp; weight, dependant on item age; maintaining grouping and order of items within <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> feeds; showing enough information for a visual scan, hiding further details, but making details available within a click or two (I love outlines).  I wanted to hit the page-down button less, but it's more than that.  I want my eyes to move slow on the first few items of a channel, and then slide down off the rest, unless I intentionally want to be caught.</p>
<p>So, while Dave's working on defining the News Aggregator, I think it's a good time to redefine it a bit while he's at it.</p>
<!--more-->
shortname=oooaia

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090342">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://zymm.com/raster/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=f659bb22a2e62ccd2cd82c4b52f09ca9&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://zymm.com/raster/">Pete</a>
                </div>
                <a href="#comment-221090342" class="permalink"><time datetime="2002-06-11T17:28:37">2002-06-11T17:28:37</time></a>
            </div>
            <div class="content">I agree that Dave's definition of a news aggregator  is a bit narrow, but that's the view from where Dave sits. 

I think we may be at version 0.99 when it comes to news aggregators, they currently work in the most basic form, but can do so much more. 

Categories, keyword filtering, ranking based on what you (and others) think of a source... 

We've got a long way to go, and I must admit, I'm excited by the possibilities.</div>
            
        </li>
    
        <li class="comment" id="comment-221090344">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=b53911af792174097e8acb282414b44c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Bill Kearney</a>
                </div>
                <a href="#comment-221090344" class="permalink"><time datetime="2002-06-12T13:58:15">2002-06-12T13:58:15</time></a>
            </div>
            <div class="content">Indeed when I see a vendor, and not just the one in question, attempting to 'define' a concept I start thinking "when all you have is a hammer, everything looks like a nail."  Attempting to pigeon-hole the aggregator concept into strictly chronological format when that's all a product provides is disingenous at best.  

It's becoming apparent to more and more folks that aggregating and filtering items is a really great idea.</div>
            
        </li>
    
        <li class="comment" id="comment-221090345">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.perceive.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=fa97eb743d4905554ef8f6a41fb2492e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.perceive.net">Eric</a>
                </div>
                <a href="#comment-221090345" class="permalink"><time datetime="2002-06-12T16:10:19">2002-06-12T16:10:19</time></a>
            </div>
            <div class="content">the presentation of information is the most important part of the aggregator.  Some ideas:

1. desktop aggregators should support keyword lists (much like Meerkat), so that the aggregator can get an idea of what is of interest to you.  Articles with these keywords could be highlighted in some fashion.

2. the "age" of the item should not necessarily determine its visibility (be it a 0/1 or something in between).  It should only influence.  Other factors could include user interaction with the article (has the articlebeen viewed?  has the user told the aggregator they no longer want to see the article, etc).

3. Articles should not necessarily be groups by channel.  This obstacle might be the most complex to solve. A more logical order of grouping needs to be found.</div>
            
        </li>
    
        <li class="comment" id="comment-221090346">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://radio.weblogs.com/0100364/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=132c3a4bf4f5de9b8beea0c21a0ba088&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://radio.weblogs.com/0100364/">Eric Maynard</a>
                </div>
                <a href="#comment-221090346" class="permalink"><time datetime="2002-06-19T10:30:52">2002-06-19T10:30:52</time></a>
            </div>
            <div class="content">Ok, granted it's not a desktop application, but NewsIsFree.com does offer much of the functionality that is being discussed here relative to aggregators.

In fact, in my opinion, the only feature of existing desktop aggregators missing from NewsIsFree is the ability to add your own feeds.

Keyword searching exists, but it's not automated as such. You have to manually perform each search Google style.</div>
            
        </li>
    
        </ul>
    
        </div>
    