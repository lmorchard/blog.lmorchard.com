---
comments_archived: true
date: '2005-05-05T11:08:42-04:00'
layout: post
title: The right place for data in your feed
wordpress_id: 641
wordpress_slug: the-right-place-for-data-in-your-feed
wordpress_url: http://www.decafbad.com/blog/?p=641
---
I've suddenly gotten very interested in [microformats][mf], especially since it struck me very soundly that they belong in this final chapter of my book about extending feeds.  

I started off writing a bit about [`mod_event`][me] and [RVW][rvw] with respect to extending feed formats with additional metadata, but then the [microformat][mf] thing hit me:  Why extend the feed format metadata when you can extend the feed content?  This seems so obvious to me that it's either got to have been covered by someone else already, or it's so wrong that I just haven't seen it yet.

For one thing, extending the format limits your extension to that format, unless you craft it in such a way that makes it compatible with other feed formats.  This is not impossible or even hard in some cases, but it's more of a problem of adoption and buy-in than a technical issue.  [`mod_event`][me] is an RSS 1.0 extension; how many RSS 2.0 or Atom 0.3 feeds have you seen using some adaptation of [`mod_event`][me]?  (Though, to be fair, how many RSS 1.0 feeds have you seen using [`mod_event`][me] in the first place?)

Just what do calendar events have to do with syndication feeds, other than that feeds are a convenient carrier wave?  Why should we try to shoehorn calendar data into the fabric of a feed itself?

All the feed formats I care about can carry (X)HTML content, and these [microformats][mf] are just XHTML content constructed along a certain set of conventions.  So, any feed supporting XHTML content can carry microformat-enriched content--without, necessarily, any feed format alterations, convincing of feed format authors, or buy-in from aggregator developers.  (Of course, you might need those developers to actually *do* something with the microcontent when it arrives, but that's another story.)

Leave the feed to manage the business of facilitating push-via-poll with aggregators and decouple the markup and structure of rich microcontent items from feed formats altogether.

Furthermore, this helps address the question of "[Is a feed the right place for your data?][fd]"  My tentative answer to this is, "No, but it doesn't hurt if it's in there, too."  

Think of the feed as just a mechanism to facilitate content delivery--and not as the embodiment of the content itself.  Mind you, [feed entries do make nice representations of content][au], covering many common attributes.  But, keep feeds themselves constructed in terms of metadata about content.  Although items of content might also be carried in full in feed entries, the "*real*" content should exist somewhere else as well.

Things like [`mod_event`][me] should be used to provide *hints* to aggregators whose authors, for instance, might not care to bundle in and maintain a full-blown [microformat][mf] parser.  

Think of a MySQL table:  You can define columns in a table, and then you can define zero or more indexes on those columns.  The data's still there if you don't define any indexes, and queries are still possible--it's just that queries are more laborious.  And, your indexes don't need to be matched up one-to-one with your columns--they can be concatenations of columns, or just about whatever else you want.  

Consider [`mod_event`][me] like an index for aggregators on [hCalendar][hc] content--[hCalendar][hc] defines the columns, [`mod_event`][me] facilitates better routing/filtering.  Although getting buy-in from feed format authors and feed aggregator developers helps get indexes created, you don't necessarily need that to get the content into the feed in the first place.

Okay... I think all that made sense.  I had to get that spewed out of my head before I lost it.  :)

[au]: http://www.decafbad.com/blog/2004/05/17/use_atom_for_a_universal_blog_transfer_protocol
[hc]: http://developers.technorati.com/wiki/hCalendar
[fd]: http://bitsko.slc.ut.us/blog/feed-data.html
[me]: http://web.resource.org/rss/1.0/modules/event/
[rvw]: http://www.pmbrowser.info/wiki.pl?RVW
[mf]: http://developers.technorati.com/wiki/MicroFormats

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085746">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://laughingmeme.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=01457d1a0f0e533062cd0d1033fb4d7a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://laughingmeme.org">kellan</a>
                </div>
                <a href="#comment-221085746" class="permalink"><time datetime="2005-05-05T14:05:54">2005-05-05T14:05:54</time></a>
            </div>
            <div class="content">I'm a fan of microformats, but this seems so wrong.  microformats are a "worse is better" solution for getting rich data onto the web for people without better tools then a simple CMS.  their useful to large scale aggregators (e.g. pubsub or technorati) who are already maintaining crawlers. (though I think the really promise doesn't lie with generalist, but domain specific aggregators developed by small affinity groups)

If you do have good enough tools to provide the data in a more structured way then by all means *do* it, more elegant, easier to consume, more meaningful, less ambiguous, easier to grok, etc. 

mod_event is *much* more useful then hCalendar in the context of feeds, but perhaps its non-obvious because you're thinking of it from the context of S-to-P (site to person) syndication, but where it comes in very useful is S-to-S (site to site) syndication, the original RSS design goal.

additionally the joy of XML means you can mix in other namespaces to enrich mod_event's intentionally limited expressiveness.  in particular we've played with mixing in vCard and geo namespaces to get more specific

as for your last question, i've seen several hundred feeds with mod_event, but i'm kind of odd like that :)</div>
            
        </li>
    
        <li class="comment" id="comment-221085747">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.myelin.co.nz/post/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=475a543984769e9890f8dc0091f602c3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.myelin.co.nz/post/">Phillip Pearson</a>
                </div>
                <a href="#comment-221085747" class="permalink"><time datetime="2005-05-05T20:17:32">2005-05-05T20:17:32</time></a>
            </div>
            <div class="content">Exactly -- from the perspective of trying to maximize usefulness, it's great to put your "semantic markup" in both the feed and the data.

It depends on your target market, of course... if nobody will ever scrape your site but you have an aggregator of calendar events watching your feed like a hawk, then the feed is most important.

But if you're just kicking off a new market, you might as well do it in a way that makes the most sense for the future...which is what this seems to be.</div>
            
        </li>
    
        <li class="comment" id="comment-221085748">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://tantek.com/log/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=02cd45622e90350cc061aaaa02229195&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://tantek.com/log/">Tantek</a>
                </div>
                <a href="#comment-221085748" class="permalink"><time datetime="2005-05-08T12:42:02">2005-05-08T12:42:02</time></a>
            </div>
            <div class="content">You've made an excellent observation.

Does one have to request permission from the envelope makers before one writes a letter in a different way? 

Does it make sense to ask everyone to write envelopes differently just because you've figured out a new way to write letters or new things to put in your letters?

Does it make sense to feel obligated to duplicate the information in your letter on the envelope as well?

Of course not.

In many ways, feeds are nothing more than another medium for passing messages, and just as there was no need to change nor extend TCP/IP to handle HTTP or HTML for that matter, there is no need to change RSS/Atom to handle new types of content which are well described by portable microformats.

Tantek

P.S. I can't believe anyone used the word "joy" and "namespaces" in the same sentence (other than to make that observation).  :)</div>
            
        </li>
    
        </ul>
    
        </div>
    