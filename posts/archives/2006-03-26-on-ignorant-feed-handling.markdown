---
comments_archived: true
date: '2006-03-26T07:14:25-05:00'
layout: post
title: On Ignorant Feed Handling
wordpress_id: 917
wordpress_slug: on-ignorant-feed-handling
wordpress_url: http://decafbad.com/blog/2006/03/26/on-ignorant-feed-handling
---
 <p>By way of <a href="http://www.franklinmint.fm/blog/archives/000725.html" title="mustIgnore isn't good enough">Robert Sayre</a>, I read that <a href="http://www.pacificspirit.com/blog/2006/03/17/how_much_do_i_ignore_thee_discard_or_retain">Dave Orchard - no relation - wrote</a>: </p>
     <ul>
     <li>
     <span><i>...In many applications, the software that gets an extension isn't the last piece. So what does it mean for it to ignore the extra content? Should it throw it away? Should it keep it but not fault? I'll call these two models the "Ignore and Discard" and the "Ignore but Retain" models.</i></span>
     </li>
     </ul>
 <p>My little projects <a href="http://decafbad.com/blog/2005/12/13/feedmagick-the-feed-filter-that-doesnt-know-much-about-feeds">FeedMagick</a> and <a href="http://decafbad.com/trac/wiki/FeedSpool">FeedSpool</a> are attempts to follow the "Ignore but Retain" model for RSS and Atom feed processing.  Since both of these applications are decidedly <i>not</i> at the end of the chain, they both strive to do as little harm as possible to the feed content they process while still usefully filtering and slice/dicing it.</p>
 <p>I've called these both "ignorant" feed handlers.  Rather than disassembling everything from a feed into local data structure, munging in that form, and then reassembing into a feed - these handlers work surgically at the XML level, juggling and slinging elements around, really aware only of feed/item boundaries and the occasional tag found inside an item/entry.  Everything else - be it namespaced extensions attributes or elements or semi-sapient arrangements of whitespace - gets preserved in the output for applications down the line.  (Well, actually, I think I mangle whitespace, but I'm working on that.)</p>
 <p>Because feeds <i>are</i> XML, after all, there's no reason not to work at the basic XML level when you're building a filter or a front-end feed API.  Making a transition from XML into local programming environment structures and idiom exposes all sorts of impedance mismatches and assumes perfect knowledge of what to expect in the universe of feeds your app will process.  On the other hand, supporting the basics of XML allows you to support pretty much any arbitrary structure of elements blindly, knowing only about a few select tags like feeds and items.</p>
  <p><b>Update:</b> In comments, <a href="http://decafbad.com/blog/2006/03/26/on-ignorant-feed-handling#comment-9097">Dave Johnson mentions</a>: "it’s important to note that the [Microsoft] Feeds API does preserve that which it does not understand (such as iTunes, GeoRSS, extensions you add, etc.)"  Thanks for the correction!  I thought I'd read that, but jumped the gun in assuming that that was not the case!  I really need to get a Windows machine and play with this API myself.</p>
 <p><del>When I first read about the new feed API coming from Microsoft, <a href="http://decafbad.com/blog/2005/06/28/four-thoughts-on-ms-rss-so-far">I had good hopes for it</a> as a Winsock-like universal handler for feeds for Windows apps.  And, I'm sure it will be used that way - but unlike Winsock, it appears that the MS feed API <a href="http://rollerweblogger.org/page/roller?entry=ms_feeds_api_experiments">mangles data on the way through</a>.  This will end up being a dead end for the growth of feed formats, where Winsock was an enabler for future unknown internet applications.  The point is, just as you can build a library to handle internet traffic that doesn't care about the content of what it receives - you can do the same with syndication feeds as XML data.</del></p>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088703">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sporkmonger.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56ee28134dd0776825445e3551979b14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sporkmonger.com/">Bob Aman</a>
                </div>
                <a href="#comment-221088703" class="permalink"><time datetime="2006-03-26T15:03:05">2006-03-26T15:03:05</time></a>
            </div>
            <div class="content"><p>I'd say FeedTools also falls into the "Ignore but Retain" model.  But I actually do translate into local data structures.  There are obvious limitations, yes, but since I also maintain the full original XML within the data structure, those limitations are largely defined by how much you care about what I chose to ignore.  The only really big problem comes in when you hit the generation methods, because of course, generation on such a data structure will ignore any elements that I don't explicitly include.  So you potentially get some silent data loss, though not unexpected data loss.  Although, I did also supply hooks into the generation code so that additional generation code could be inserted on the fly, so you're once again only limitted by what you actually needed to support.  The only person who really loses out is the guy down the line if you republish stuff.  And 99% of the time, he's not going to care so long as you give him the important stuff.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088704">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://rollerweblogger.org/page/roller"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9e3fbda6bebebb1e66a4eaf1d84c9c25&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://rollerweblogger.org/page/roller">Dave Johnson</a>
                </div>
                <a href="#comment-221088704" class="permalink"><time datetime="2006-03-26T18:40:20">2006-03-26T18:40:20</time></a>
            </div>
            <div class="content"><p>The MS Feeds API does some weird things because it tries to normalize the commonly used funky RSS elements like ,  and  to Microsoft Common Feed Format (based on RSS 2.0 and Atom 1.0). I do have some hope that they'll get that right in the end, but they're clearly not there yet. However, it's important to note that the Feeds API <em>does</em> preserve that which it does not understand (such as iTunes, GeoRSS, extensions you add, etc.).</p></div>
            
        </li>
    
        </ul>
    
        </div>
    