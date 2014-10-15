---
comments_archived: true
date: '2004-05-03T06:39:05-04:00'
excerpt: Well, it did seem quiet, but it's comforting in an odd way that
    RSS Wars are still raging as I wander back into the blogosphere.  I
    suggest that all that Atom haters out there put on some RSS-colored
    glasses and forget there ever was an Atom.  XSLT and URL-as-command-line
    to the rescue!
layout: post
title: Put on your RSS-colored glasses and forget about Atom
wordpress_id: 519
wordpress_slug: put-on-your-rss-colored-glasses-and-forget-about-atom
wordpress_url: http://www.decafbad.com/blog/?p=519
---
<blockquote cite="http://grumet.net/weblog/archives/2004/04/28/syndication_and_competing_formats.html"> I know, we've heard a lot about this, and it might seem draining and pointless.</blockquote>
<div class="credit" align="right"><small>Source:<cite><a href="http://grumet.net/weblog/archives/2004/04/28/syndication_and_competing_formats.html">Syndication and competing formats</a></cite></small></div>

Well, it *did* [seem quiet][quiet], but it's comforting in an odd way that RSS Wars are still raging as I wander back into the blogosphere.

And, while [my last post][lastpost] might be seen as a new rock thrown from my direction, it really wasn't meant as such.  I was happy to see [a response from Andrew][response] and a fix.  Oh, and as a bonus, [a fix for my blog][blogfix], to boot!  Now, *that's* the sort of thing I came back for.

Now - as for this renewed RSS vs Atom war.  I've got a pair of RSS-colored glasses for all the Atom haters out there.  Actually, they're not my glasses, but this one guy's [offering a service][service] and this other guy's [offering some XSLT][stylesheets] -- both or either of these can help make all that annoying Atom gibberish look just like RSS to you and your favorite aggregator.  Hooray for the [URL-as-command-line][urlcli]!

For instance, if you hate that [Mark Pilgrim's feed][diveatom] is only available in Atom flavor now, screw him and get it [RSS flavored][diverss] anyway!  The feed even [validates as RSS][diverssvalid].  (Though, if you're in the RSS-loving camp, I'm not sure why you'd want to hear from the likes of *him* anyway.)

You know what this means?  It means you can forget about Atom.  Whenever you see an Atom feed, just put on your RSS-colored glasses.  Hell, if you're an aggregator developer, make the RSS-colored glasses built-in.  You don't even have to embed an XSLT processor in your application: just offer the service from your own web servers and substitute the filter URL automatically when one of your users tries to subscribe to an Atom feed.  

(Though, you know, it would be awfully nice of you to throw in an XSLT processor.  At least one aggregator author thinks it's [a good idea][goodidea].  So does [this user / customer][goodidea2].  But, it's admittedly an idea bordering on NeatLikeDigitalWatches.)

Or, get this: borrow a service or a stylesheet hosted by an Atom sympathizer.  If there's demand and I feel like taking some abuse, I'll host such a service right here.  (Though I'd likely live to regret doing *that*!)  In fact, using a set of RSS-colored glasses maintained by an Atom sympathizer is the best thing.  Let that poor altruistic sucker keep up with the rapid pace of change in the Atom world, updating XSLT, while you just happily go on seeing the world in RSS.

There.  Problem solved.  Let's move onto more exciting projects.  

(He writes, knowing that it's never that simple.  And that he's likely to get bludgeoned for this.  And that he talks about himself in the third person far too often and makes too many parenthetical digressions.)

But, I digress...

[goodidea2]: http://weblogs.cs.cornell.edu/AllThingsDistributed/archives/000454.html
[goodidea]: http://nick.typepad.com/blog/2004/04/new_gray_boxes_.html
[urlcli]: http://udell.roninhouse.com/bytecols/2001-08-15.html
[diveatom]: http://diveintomark.org/xml/atom.xml
[diverss]: http://cavedoni.com/2004/02/rss1?uri=http://diveintomark.org/xml/atom.xml
[diverssvalid]: http://rss.scripting.com/?url=http%3A%2F%2Fcavedoni.com%2F2004%2F02%2Frss1%3Furi%3Dhttp%3A%2F%2Fdiveintomark.org%2Fxml%2Fatom.xml
[stylesheets]: http://www.aaronland.info/xsl/atom/0.3/
[service]: http://cavedoni.com/2004/02/rss1
[blogfix]: http://www.decafbad.com/blog/2004/05/02/feed_validation_confusion#comment-1114
[response]: http://www.decafbad.com/blog/2004/05/02/feed_validation_confusion#comment-1113
[lastpost]: http://www.decafbad.com/blog/2004/05/02/feed_validation_confusion
[quiet]: http://www.decafbad.com/blog/2004/04/29/has_it_been_quiet

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086567">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://admin.support.journurl.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5f89d3df08b8dedac1a0fde900a586db&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://admin.support.journurl.com/">Roger Benningfield</a>
                </div>
                <a href="#comment-221086567" class="permalink"><time datetime="2004-05-03T12:59:04">2004-05-03T12:59:04</time></a>
            </div>
            <div class="content">I dunno about anyone else, but that's *exactly* how I plan to deal with Atom until it's a finalized IETF thingie sometime in 2005 or 2006. You certainly don't deserve bludgeoning for suggesting it. 

I may not like the Atom Process, but I *do* appreciate practical, straightforward solutions to problems... and in a world where Atom exists, transforming it into RSS is just that.

BTW, on previewing this comment, I spotted the following error at the bottom of the page:

MT::App::Comments=HASH(0x834cf4c) Use of uninitialized value in sprintf at /www/www.decafbad.com/docs/mt/lib/MT/Template/Context.pm line 1187.</div>
            
        </li>
    
        <li class="comment" id="comment-221086568">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8bcf295bb2e23d6ee0d80710023f2b66&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Anonymous</a>
                </div>
                <a href="#comment-221086568" class="permalink"><time datetime="2004-05-03T20:17:35">2004-05-03T20:17:35</time></a>
            </div>
            <div class="content">Hey there. I'm the first of the two guys offering an Atom conversion service and I'm here for just yet another shameless plug: the XSL which runs my service is public and anybody can play with it with tools such as xsltproc. It's over here:

http://cavedoni.com/2004/02/rss1.xsl

End of the show.</div>
            
        </li>
    
        <li class="comment" id="comment-221086569">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://cavedoni.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=111a3fad55b9de66f2050502f98216bb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://cavedoni.com/">Antonio Cavedoni</a>
                </div>
                <a href="#comment-221086569" class="permalink"><time datetime="2004-05-03T20:20:21">2004-05-03T20:20:21</time></a>
            </div>
            <div class="content">Broken broken broken: I did put my name, email address and URL in there but MT somehow mangled it. Anyway, my name is Antonio Cavedoni and I often go on IRC by the nickname "verbosus".</div>
            
        </li>
    
        <li class="comment" id="comment-221086570">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.libraryplanet.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2dc6776d772d1ff3e230578b0e61406b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.libraryplanet.com/">Michael Pate</a>
                </div>
                <a href="#comment-221086570" class="permalink"><time datetime="2004-05-03T22:06:46">2004-05-03T22:06:46</time></a>
            </div>
            <div class="content">"It means you can forget about Atom. Whenever you see an Atom feed, just put on your RSS-colored glasses."

Of course, it is just as possible as to forget as RSS.

http://www.libraryplanet.com/2004/03/2</div>
            
        </li>
    
        <li class="comment" id="comment-221086572">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8a5273f79cfe7579ad46023f93377aa8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/blog">l.m.orchard</a>
                </div>
                <a href="#comment-221086572" class="permalink"><time datetime="2004-05-03T22:27:41">2004-05-03T22:27:41</time></a>
            </div>
            <div class="content">Michael: SHH! I don't want to get into that!  (Heh, heh)</div>
            
        </li>
    
        <li class="comment" id="comment-221086573">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://houseofwarwick.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=3b7464f178b85c3902a97f91a40893b6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://houseofwarwick.com">Steve Kirks</a>
                </div>
                <a href="#comment-221086573" class="permalink"><time datetime="2004-05-04T06:53:09">2004-05-04T06:53:09</time></a>
            </div>
            <div class="content">Leslie:

Welcome back--I've kept you in my aggregator, specifically because of the writing and the clever graphic on the site "When I Grow Up I Want To Be".

Right now, RSS is fine for me.  Maybe Atom is the answer to the unasked question of the future.  By the way, I read Mark Pilgrim's site using a site called 2rss

http://www.2rss.com/atom2rss.php?atom=http://diveintomark.org/xml/atom.xml</div>
            
        </li>
    
        <li class="comment" id="comment-221086576">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.healyourchurchwebsite.com/archives/001170.shtml"><img src="http://www.gravatar.com/avatar.php?gravatar_id=6a9d199a4357aa0710e47616878fb6ee&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.healyourchurchwebsite.com/archives/001170.shtml">Mean Dean</a>
                </div>
                <a href="#comment-221086576" class="permalink"><time datetime="2004-05-05T19:22:49">2004-05-05T19:22:49</time></a>
            </div>
            <div class="content">Man, where is Rodney King when you need him ... 

"Can't we all just get along ..."

I commented about this confusion back in Febrary (click on my name for article). Personally, I list both formats because I'd rather not deal with zealot-mail from either side of the argument.

Personally, I do thing if Pilgrim can get an XSLT defined soas 'one transform fits all browsers' then I suspect you might see this quickly implemented by Blogger and MT. How the RSS camp will respond ... I dunno.

 ... then again, I've been wrong before.</div>
            
        </li>
    
        <li class="comment" id="comment-221086577">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://manero.org/weblog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2897451ea3a16a3894aa1a12403eecac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://manero.org/weblog/">Tony</a>
                </div>
                <a href="#comment-221086577" class="permalink"><time datetime="2004-05-11T19:58:09">2004-05-11T19:58:09</time></a>
            </div>
            <div class="content">I get a 403 forbidden error when trying to snarf Mark Pilgrim's Atom feed with a Java http client. What an ass.</div>
            
        </li>
    
        <li class="comment" id="comment-221086578">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.awasu.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=ca19d3db701081576b02a6cd783fce3b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.awasu.com">Taka</a>
                </div>
                <a href="#comment-221086578" class="permalink"><time datetime="2004-05-20T09:04:55">2004-05-20T09:04:55</time></a>
            </div>
            <div class="content">We've had an XSLT processor in Awasu for a while but it's much more than just a NeatLikeDigitalWatches idea. Anything that provides information as XML e.g. web services can be converted to RSS and monitored in Awasu. That's a mighty powerful feature IMHO :-)</div>
            
        </li>
    
        <li class="comment" id="comment-221086581">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.deceptykhan.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=6eb3b676ac20239be918a825ac94b2d5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.deceptykhan.com">nick</a>
                </div>
                <a href="#comment-221086581" class="permalink"><time datetime="2004-05-21T02:37:09">2004-05-21T02:37:09</time></a>
            </div>
            <div class="content">I'm surprised no one  has mentioned FeedBurner (http://www.feedburner.com/) as a (free) way to convert Atom to RSS (any flavor) and vice-versa. They even have a feature to "pretty up" the raw XML so it can be viewed in a normal web browser when Random Q. Someuser goes "Gee, im going to click on this orange button to see what it does". Anyways, I love it & use it to 'burn' my Blogger generated Atom feeds to RSS 2.0 (http://feeds.feedburner.com/dkhan) - It even picked up my favicon!</div>
            
        </li>
    
        <li class="comment" id="comment-221086582">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=37d5e24633b915c5542bd1d8acab065e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">kL</a>
                </div>
                <a href="#comment-221086582" class="permalink"><time datetime="2006-05-01T22:48:54">2006-05-01T22:48:54</time></a>
            </div>
            <div class="content"><p>Atom 0.3 is a bit dated by now, but there's <a href="http://atom.geekhood.net" title="XSLT converts Atom to RSS" rel="nofollow">same thing for Atom 1.0 to RSS2.0</a></p></div>
            
        </li>
    
        </ul>
    
        </div>
    