**TL;DR:** Turns out, the way to derive value from web APIs is to let your community run off and do free research and development. Harvest the results, and profit. We were never promised participation, but it felt like it was a 2-way street. Silly us. Where do we go from here?

<!--more-->

You know, there wasn&#8217;t much to Twitter [when I first signed up][1]. Sure, there&#8217;s lots now, and tons of work behind it. But, a lot of that was [paving the cow paths][2] and ensuring those paths could endure stampedes. Many, many of Twitter&#8217;s current features were first brainstormed and pioneered by its users and 3rd-party developers &#8211; [like the @-reply][3], [the #hashtag][4], or [the retweet][5]. I&#8217;m sure I could assemble a list of UI innovations cobbled up by 3rd-party Twitter clients that are now folded back into Twitter itself.

I&#8217;m not saying the Twitter crew have nothing to be proud of, but a quite a lot of it started with users and developers outside the company. But now, the company [is talking about more thoroughly enforcing certain guidelines for a &#8220;consistent Twitter experience&#8221;][6].

To me as a user and sometimes developer, that sounds like: &#8220;Thanks, we&#8217;ll take it from here. Enjoy the show!&#8221; Which, having somehow fooled myself into thinking this was a 2-way street, comes as a bit of cold water to the face. [I can&#8217;t say I wasn&#8217;t warned early and often, though.][7] It&#8217;s not like Twitter is suddenly going rogue & evil, or even going away soon. They&#8217;re just more firmly grabbing the reins on the product that was never ever really ours to begin with. That&#8217;s their prerogative, and they&#8217;ll enjoy success.

But, still, it kind of sucks. In the 2000&#8217;s, I was gonzo about web services and APIs. One of the things I&#8217;d looked most forward to when I joined del.icio.us and Yahoo! back in 2006 was to build up their web APIs. Of course, no one really knew how these things would get monetized &#8211; **but damn, weren&#8217;t mashups cool**?

[They&#8217;ve figured out how to derive value by now, though][8]: Not everything yields a charge-per-request billing concern. It turns out that you can harvest free research and development from your community and fold the good stuff back into the main product. We even did this at del.icio.us &#8211; see also, the old `for:{username}` tag convention and the inbox that followed later. (Do they even have that any more?) But, it seems like Twitter is reaching a point where they&#8217;ve harvested enough, and want to polish things up.

What&#8217;s left behind are things that aren&#8217;t owned by a single entity. RSS, rssCloud, Atom, AtomPub, PubSubHubbub, <a target="_blank" title="JSON" href="https://developer.mozilla.org/docs/JSON?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JSON</a> Activity Streams, Salmon, WebFinger, OStatus, etc and so forth. [We could talk to each other with these things, and make beautiful mashups][9].

But, a lot of us have been distracted by shiny corporate APIs, building value for others and sometimes making a little for ourselves. Why bother writing a web spider chasing microformatted relationships to build a social graph, when we could make a single HTTP GET and have a <a target="_blank" title="JSON" href="https://developer.mozilla.org/docs/JSON?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JSON</a>-formatted friends list tossed back &#8211; and thus, get on with the real thing we wanted to do with that list?

And honestly a lot of us fail at things like basic usability and design, making it so much easier for someone to just sign up for a social silo than muck around with trying to get some PHP witchery working on some strange webhost. WordPress may be a relative dream to set up, these days, but not in comparison to a sign-up form.

Sure, back in circa-2000&#8217;s era blogosphere, we were figuring out things like feeds and aggregators and autodiscovery and trackbacks and blogrolls and mashups. But, along the way, startups wrapped the best of those things up in packages friendly to broader swaths of humanity. You know, kind of like how Apple is now making glued-together laptops.

That&#8217;s where I think the social silos like Twitter and Facebook have won: They&#8217;ve made things practical for users that we blogosphereans never did. And on the other end, they gave us nerds free access to APIs that let us build things that were rewarded by real use. Because, for many of us, that&#8217;s the real payoff beyond a literal paycheck: seeing our stuff get used and praised as clever.

Now, the social silos don&#8217;t need us nerds as much. If they do, they hire us. But, out on the open web, things are a bit stale. The users don&#8217;t care to use our complex crap, and don&#8217;t even know what it is or why to bother. And we don&#8217;t spend much time on it, because how rewarding is it without users?

So now what? Seems like a hard catch-22 to break, and I haven&#8217;t had much time lately to do my part in breaking it. Maybe I will soon, so I&#8217;m thinking about what to hack on next.

 [1]: http://twitter.com/lmorchard/status/42834/
 [2]: https://www.google.com/search?q=paving+cow+paths
 [3]: http://anarchogeek.com/2012/07/09/origin-of-the-reply-digging-through-twitters-history/
 [4]: http://gigaom.com/2010/04/30/the-short-and-illustrious-history-of-twitter-hashtags/
 [5]: http://en.wikipedia.org/wiki/Reblogging#Twitter
 [6]: https://dev.twitter.com/blog/delivering-consistent-twitter-experience
 [7]: http://scripting.com/stories/2010/04/26/theToxicCoralReef.html#p10
 [8]: http://scripting.com/stories/2012/07/07/twitterIsACorporateApi.html
 [9]: http://inessential.com/2012/06/29/matthew_on_twitter_restrictions