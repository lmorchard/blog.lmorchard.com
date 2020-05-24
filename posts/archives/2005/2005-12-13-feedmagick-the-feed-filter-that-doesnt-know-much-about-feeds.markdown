---
comments_archived: true
date: '2005-12-13T01:26:42-05:00'
layout: post
title: FeedMagick, the feed filter that doesn't know much about feeds
wordpress_id: 795
wordpress_slug: feedmagick-the-feed-filter-that-doesnt-know-much-about-feeds
wordpress_url: http://decafbad.com/blog/?p=795
---
<blockquote cite="http://decafbad.com/trac/wiki/FeedMagick">FeedMagick is a set of PHP tools used in filtering, converting, and otherwise munging XML syndication feeds in RSS and Atom formats.</blockquote>
<small style="text-align:right; display:block">Source: <a href="http://decafbad.com/trac/wiki/FeedMagick">FeedMagick - 0xDECAFBAD - Trac</a></small>

Okay, so I held my nose and started doing a bit of PHP hacking this past weekend, and [this][fm] is what I've got so far.  It wasn't *that* bad, and there were a few nice toys to be found so far in PHP—but I think I'll need some peer-review to tell me how well I'm following the local idiom.  Also, my XML mojo may suffer from some unintentional ignorance.

Anyway, the main idea behind this feed filtering kit is that I'm not parsing and reconstituting feeds at the format level.   Instead, I'm diving down to the *XML level* with [SAX filters][sf].  Having finally realized the meaning of [**Must Ignore**][mi], this was a particularly interesting realization to me—so I hope you'll bear with me as I tell the story...

### What it doesn't do:

See, I'm not using [MagpieRSS][mp] to chew up feeds into PHP structures, and I'm not using PHP structures [to splice together a new feed][sp].  You see, since starting with [FeedSpool][fs], I've come to believe that ignorance is bliss and [FeedMagick][fm] is a continuation of this notion.  

In [FeedMagick][fm], I'm mostly ignoring feed format specifics.  The only thing this code really cares about are `item` and `entry` tags, and the rest gets blindly passed along.  Of course, *you* can write filter subclasses which *do* know and care about other feed elements—but the beauty is that neither you nor I need to write code that cares about *all possible feed elements ever*.

### Why it doesn't do it:

When you write a [general parser for feeds][gp], there are a lot of permutations that need worrying about.  And for a  feed filter, that's just the first stage of the process.  Next, you need to reconstitute that feed from parsed data—and that's going to suck.  

You could consider your job done after implementing the bare feed spec—but what about [Apple][itunes] and [Yahoo!][] and [Microsoft][msft]?  Oh, and what about [calendar events][cal]?  What happens to your filter if people start doing interesting things with all of these extensions?  

Even if the parser author managed to pull off passing along all the information contained in the feed—pretty much reinventing the XML wheel past a certain point—you'll need to anticipate what all that information might be in order to rebuild the feed basically from scratch on the other end of the filter.  It's too much.

### How it gets away with it:

Stop caring about the specifics so much.  This is XML, right?  It's possible to build tools at the XML level that can slice and dice and put it all back together again without harm.  Could be RSS, could be Atom, could be XHTML, could be [RecipeML][].  In any case, as long as the turtle-depth stops at angle brackets, we can start there and work up.

[SAX filters][sfil] it is, then—[in PHP flavor][saxp].  I built a simple chain consisting of a SAX parser to read in the XML and [a SAX filter that writes XML][xmlout].  So far so good, it's an [identity function][if].

Next, I stuck [a filter in the middle that just *barely* knows about `item` and `entry` tags](http://decafbad.com/trac/browser/trunk/FeedMagick/includes/FeedMagick/FeedItemFilter.php)—*and not much else*.  When this thing sees a feed item in the parsing event stream, it temporarily diverts all further parsing events for that item into a buffer.  At the end of the item, it spews the buffered events down the filter chain.

### Where it gets useful:

Now, with all of this in place, you can make a decision in the middle:  Got an item in the buffer?  Take a peek at it just before it gets unbuffered—does it meet a set of filter criteria?  If not, discard the buffer and keep moving.  Otherwise, proceed as normal and send the item on its way.

And that's it, so far.  All this filter knows or cares about is XML and the occasional feed item tag.  Filter subclasses can care about more—[a `dc:subject` element, for instance][dc]—and decide which items make it down the pipe.  That item could be stuffed full of rich extensions and goodies, but this filter doesn't have to care.  It can be ignorant beyond angle brackets.

### That's it.

So, yeah.  This might all be obvious to some people, but it all finally made a lot of sense to me.  It started making sense when I built [FeedSpool][fs], but now it's really sinking in.  I really get the virtue of ignorance and laziness in XML now.  Or, at least, I think I'm starting to.

[xmlout]: http://decafbad.com/trac/browser/trunk/FeedMagick/includes/FeedMagick/XMLGeneratorFilter.php
[saxp]: http://pear.php.net/package/XML_SaxFilters
[dc]: http://decafbad.com/trac/browser/trunk/FeedMagick/subject-filter.php
[sfil]: http://www.xml.com/pub/a/2001/10/10/sax-filters.html
[mi]: http://www.xml.com/pub/a/2003/12/03/versioning.html
[if]: http://en.wikipedia.org/wiki/Identity_function
[recipeml]: http://www.formatdata.com/recipeml/
[cal]: http://web.resource.org/rss/1.0/modules/event/
[itunes]: http://phobos.apple.com/static/iTunesRSS.html
[yahoo!]: http://search.yahoo.com/mrss
[amazon]: http://opensearch.a9.com/spec/opensearchrss/1.0/
[msft]: http://msdn.microsoft.com/xml/rss/sse/
[gp]: http://www.feedparser.org/
[sf]: http://www-128.ibm.com/developerworks/xml/library/x-tipsaxflex.html
[mp]: http://magpierss.sourceforge.net/
[sp]: http://hublog.hubmed.org/archives/000919.html
[fs]: http://decafbad.com/trac/wiki/FeedSpool
[fm]: http://decafbad.com/trac/wiki/FeedMagick
[b]: http://decafbad.com/blog/2005/12/09/rss-plumbing-in-php-nowhere-to-be-found

<!-- tags: rss atom feed syndication php hackingfeeds -->

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082611">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://harold.hotelling.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5183bee2961385af94a500759bb7a372&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://harold.hotelling.net/">Harold</a>
                </div>
                <a href="#comment-221082611" class="permalink"><time datetime="2006-09-08T22:17:16">2006-09-08T22:17:16</time></a>
            </div>
            <div class="content"><p>This virtue of laziness and ignorance applies to dynamic programming languages as well, for the same reasons. Not pointed at you, but I see a lot of C++/Java people get very excited about how flexible XML is, but completely miss out on the idea that programming languages like &lt;holy-war&gt; Python Perl Ruby Lisp Scheme etc. &lt;/holy-war&gt; provide this flexibility for all their objects and data structures, all the time. I guess we could try to re-market dynamic languages as XPL &emdash; extensible programming languages.</p>

<p>Well, sorry for the mini-rant. Welcome to the Bay Area.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    