---
title: Social novelty filtering (or Google Reader, R.I.P.)
author: lmorchard
layout: post
permalink: /2013/03/14/social-novelty-filterin
dsq_thread_id:
  - 1136194521
categories:
  - Uncategorized
tags:
  - google
  - metablogging
  - reader
  - rss
---
<div id="toc_container" class="toc_wrap_right no_bullets">
  <p class="toc_title">
    Contents
  </p>
  
  <ul class="toc_list">
    <li>
      <a href="#Reader8217s_been_long_gone_already"><span class="toc_number toc_depth_1">1</span> Reader&#8217;s been long gone already</a>
    </li>
    <li>
      <a href="#Social_novelty_filtering"><span class="toc_number toc_depth_1">2</span> Social novelty filtering</a>
    </li>
    <li>
      <a href="#Distributed_social_novelty_filtering"><span class="toc_number toc_depth_1">3</span> Distributed social novelty filtering</a>
    </li>
  </ul>
</div>

<p style="text-align: left;">
  Wherein I muse about Google Reader past, and what it might have been. And, wherein I describe what I hope springs up in the aftermath of its closing.
</p>

<!--more-->

<h3 style="text-align: left;">
  <span id="Reader8217s_been_long_gone_already">Reader&#8217;s been long gone already</span>
</h3>

<p style="text-align: left;">
  So, <a href="http://googleblog.blogspot.com/2013/03/a-second-spring-of-cleaning.html">they&#8217;re finally shutting down Google Reader</a>, huh? It&#8217;s sad, but unsurprising. It&#8217;s obvious they didn&#8217;t really have a strategic place for it in the Google+ universe, and it just was just neglected <a href=" http://decafbad.com/blog/2011/11/01/readerpocalypse">since the Sharepocalypse</a>. Kill off the key social synergy of hosting a centralized news reader, and it&#8217;s no wonder you&#8217;ll see usage decline.
</p>

<p style="text-align: left;">
  I&#8217;ve been running <a href="https://github.com/gothfox/Tiny-Tiny-RSS">Tiny Tiny RSS</a> on my own server since Google killed off in-product sharing. So, I won&#8217;t be too terribly affected by the shutdown personally. I think my wife still uses Google Reader, having moved after the demise of Bloglines. If she likes the looks of TT-RSS, I&#8217;ll set her up with an account too.
</p>

<p style="text-align: left;">
  But, <a href="http://www.marco.org/2013/03/13/google-reader-sunset">Marco</a> and <a href="http://threads2.scripting.com/2013/march/goodbyeGoogleReader">Dave</a> have it right: This will probably be a good thing for RSS. The problem has been that Google Reader was <em>just</em> good enough to lull me out of scratching my own itch. This is coming from the guy who wrote <a href="http://www.amazon.com/gp/product/0764597582?ie=UTF8&tag=0xdecafbad01-20&linkCode=as2&camp=1789&c%0D%0Areative=9325&creativeASIN=0764597582">a 600 page book on RSS and Atom</a> out of love for the tech. So, I&#8217;m sure I won&#8217;t be the only one poking around code archives and blowing dust off old repositories.
</p>

<h3 style="text-align: left;">
  <span id="Social_novelty_filtering">Social novelty filtering</span>
</h3>

<p style="text-align: left;">
  So, this is the itch I&#8217;d love to scratch in the post-Google-Reader age: Reader-before-Plus offered <strong><em>social novelty filtering</em></strong>. That is, fast sharing within the product fueled reciprocal feeds of novelty, filtered by my &#8220;friends&#8221;, presented in the same news reading interface as my other bazillion feeds from the web at large.
</p>

<p style="text-align: left;">
  That feature worked so well, in fact, that <a href="http://decafbad.com/blog/2010/12/18/less-del-icio-us-than-ever-before">it lured me away from using del.icio.us</a>—a service I liked so much that I wrote <a href="http://www.amazon.com/gp/product/0470037857?ie=UTF8&tag=0xdecafbad01-20&linkCode=as2&camp=1789&%0D%0Acreative=9325&creativeASIN=0470037857">a 350 page book</a> about it and <a href="http://decafbad.com/blog/2006/06/24/go-west-young-man">moved out of state</a> so I could work there.
</p>

Yeah, yeah, I know: You can &#8220;share&#8221; to Facebook, to Twitter, even to Google+—that&#8217;s why Google killed in-product sharing on Reader, after all. I do that on occasion, and that&#8217;s how a lot of people get their streams of novelty. But, it&#8217;s nowhere near the same thing, neither in quality nor in quantity.

The thing about these &#8220;friends&#8221; on Google Reader was that we never interacted directly. It was refreshing, it was great. No small talk, no conflicts, no getting in each others&#8217; virtual faces—we just mutually harnessed slices of each others&#8217; minds to build intelligent streams of novelty.

That might sound cold or mechanical or exploitative—but the thing is, there are plenty of other outlets for interpersonal exchange, and I even met up with some of my Reader &#8220;friends&#8221; out-of-band there too. But, those channels are *about* you and me, we&#8217;re the objects of interest & the stars of the show. There are very few channels that are *about* shared novelty as the object of interest, where you and I can get ourselves out of the way and conspire to surface cool things.

(And, of those channels that *do* exist—[Pinterest][1], for example, maybe [Tumblr][2]—I&#8217;m not a big fan of the UI vs *ye olde Reader*. Still, magic & strange loops can emerge from recursion & re-entrant flows; your mileage may vary. See also: [Google&#8217;s Lost Social Network][3].)

### <span id="Distributed_social_novelty_filtering">Distributed social novelty filtering</span>

So anyway, I&#8217;m probably going to play around with the machinery of feed aggregation again. But, one of the things I really would like to see as a *thing* out there is ***distributed social novelty filtering***. How do you do that? Well, the first half of it is pretty simple:

*   In feed readers, implement a one-click &#8220;share&#8221; button on every item. Maybe offer an optional field for comment.
*   Offer a public feed of every &#8220;shared&#8221; item, easily discoverable from a public profile.

For example, my installation of TT-RSS offers [a feed of my &#8220;shared&#8221; items][4]—albeit not in a very discoverable way. I also funnel craptons of material into [my pinboard.in feed][5], but mainly for personal archiving and search. Even Pinterest has [a feed for me][6], though I barely use it.

[Dave Winer][7] and [Andy Baio][8] maintain linkblogs with feeds—those fit nicely into this scheme, and I follow them both in my reader.

The other half is where some innovation could stand to happen: The obvious thing is to just get yourself a new RSS reader and subscribe to all the shared-item feeds of your &#8220;friends&#8221;.

But, there&#8217;s a lot more to be done here:

*   discover and follow &#8220;friends&#8221; across services,
*   de-duplicate shared items by URL,
*   rank items by counting shares,
*   construct discussion threads from shares

Go nuts, please! Someone form a startup and take my money to solve this, so I don&#8217;t have to. Even better, release some open source so I can host it myself and maybe even contribute some code. I&#8217;m thinking about doing some of this, but my lack of sustained attention span for projects is [well documented][9].

But, the important thing here is that it&#8217;s ***distributed*** and a *thing* that&#8217;s conventionally done out there on the web. This shouldn&#8217;t be constrained to a single vendor&#8217;s silo ever again, because that allowed a single vendor to kill it dead and I miss it terribly.

 [1]: http://pinterest.com/
 [2]: http://tumblr.com/
 [3]: http://www.buzzfeed.com/robf4/googles-lost-social-network
 [4]: http://decafbad.com/tt-rss/public.php?op=rss&id=-2&key=6fa5a3a996809d4df9a357bd7c62efc464c8d147
 [5]: http://feeds.pinboard.in/rss/u:deusx/
 [6]: http://pinterest.com/lmorchard/feed.rss
 [7]: http://links.scripting.com/rss.xml
 [8]: http://waxy.org/links/index.xml
 [9]: http://decafbad.com/blog/2006/05/26/confessions-of-a-serial-enthusiast