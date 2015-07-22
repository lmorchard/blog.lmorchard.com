---
title: The Verge web kinda sucks
tags: [webdev, advertising, internet, privacy, tracking]
---

<nav role="navigation" class="table-of-contents"></nav>

## I'm a big fan

So, I've been a big fan of The Verge, [almost since day one][verge-fan]. It's a gorgeous site and the content tends to be great. And, they've done some amazing things with longform web articles like "[What's the deal with translating Seinfeld][translating-seinfeld]" and "[Max Headroom: the definitive history of the 1980s digital icon][max-headroom]".

But, I have to say, when I read "[The Mobile Web Sucks][mobile-web-sucks]" - on my new experimental Boot2Gecko phone, by the way - it felt like getting pelted by rocks thrown from the roof of a bright, shiny glass house. I mean, this is coming from a property of Vox Media - who just [declared performance bankruptcy][performance-bankruptcy] back in May. So, they *know* they have a problem.

To project that problem and declare that the whole mobile web sucks, though? That's a bit much.

Here's the thing: My new Boot2Gecko phone and my handful of Android phones before it have all handled The Verge like a champ over the years. It's not one of the smoothest sites out there, but I've felt like my devices have chugged through it and delivered.

## Rolling the log over

A page view on The Verge delivers a heavy share of ads & spyware alongside the content I go there to enjoy. I've long known this is true - it's true for most sites, these days. But it wasn't until this particular article tweaked my nose that I decided to roll the log over and see just what was wriggling underneath.

So, I opened up the Dev Tools in Firefox and gave the page a reload on a cleared cache.

<img src="/uploads/2015/the-verge-web-sucks/the-verge-html-size.png" class="fullwidth"
  alt="HTML size on the article"/>

That's not bad - 75kb of HTML for the article. But, this is a visual-heavy site, so it's going to load some images and maybe a web font, too.

<img src="/uploads/2015/the-verge-web-sucks/more-resources.png" class="fullwidth"
  alt="Loading more resources..." />

We're up to 20 requests and 1.4MB over the course of 7 seconds or so. That's on the upper end of what I'd advise for something like a ~1500 word article with some surrounding navigation & teasers into the larger site.

But, okay, that's not terrible and The Verge is a gorgeous site. Hell, this very blog post is going to probably be bigger than I'd like, what with the Disqus and Twitter scripts I expect to include.

Oh wait, it's not done loading yet. I'm starting to read, but my browser's still spinning. I wonder what the final stats will be?

<img src="/uploads/2015/the-verge-web-sucks/the-verge-final-load-stats.png"
  class="fullwidth" alt="It finally stopped loading" />

Holy crap. It took over 30 seconds for my browser to stop spinning, and in the end it had fetched over 9.5MB of data across 263 HTTP requests. What the hell is all that stuff?

<img src="/uploads/2015/the-verge-web-sucks/resource-breakdown.png"
  class="fullwidth" alt="It finally stopped loading" />

Wow. On a second reload of the page - this time to get an overall performance analysis in devtools - I got 12MB downloaded. And a little over 7MB of that is JavaScript! This isn't one of the cool longform articles on The Verge with interactive features and whatnot - it's just a ~1600 word rant. So, why all this executable code?

Hmm, I think I [Nilay Patel tweeted something about this](https://twitter.com/reckless/status/623234268152598528):

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/satefan">@satefan</a> <a href="https://twitter.com/verge">@verge</a> part of the content we deliver is advertising! :)</p>&mdash; nilay patel (@reckless) <a href="https://twitter.com/reckless/status/623234268152598528">July 20, 2015</a></blockquote>

Not to be a jerk, but buddy I'd guess *most* of what you just delivered was advertising - that, and spyware. See, I work for Mozilla, and in one of the public Monday company meetings I heard about this project called [Lightbeam][lightbeam]:

<blockquote>Lightbeam is a Firefox add-on that uses interactive visualizations to show you the first and third party sites you interact with on the Web.</blockquote>

So, I figured I'd install it and let it take a look at The Verge. This is what it showed me:

<img src="/uploads/2015/the-verge-web-sucks/im-surrounded.png"
  class="fullwidth" alt="I'm surrounded" />

The Verge is the big circle in the middle. All the triangles dancing around it are each distinct third-party sites that got involved in the delivery of this article I read. Lightbeam has a list view, so I switched to get a closer look:

<img src="/uploads/2015/the-verge-web-sucks/lightbeam-listview.png"
  class="fullwidth" alt="Lightbeam list view" />

Sweet jeebus. "You have visited **1 SITE**. You have connected with **47 THIRD PARTY SITES.**"

Now, to be fair, scrolling through the report I could see that some of these distinct "sites" are clearly alternate domains owned by the same organization. But, still, I was able to pick out *at least 25 different companies* in there before I got tired of digging:

<!-- mosaic here? -->

<ul class="columns clearfix">
<li>skimresources.com</li>
<li>sonobi.com</li>
<li>umbel.com</li>
<li>krxd.net</li>
<li>amazon-adsystem.com</li>
<li>googleadservices.com</li>
<li>mathtag.com</li>
<li>rhythmxchange.com</li>
<li>adnxs.com</li>
<li>adsvr.com</li>
<li>bidswitch.net</li>
<li>scorecardresearch.com</li>
<li>doubleclick.net</li>
<li>kargo.com</li>
<li>quantserve.com</li>
<li>moatads.com</li>
<li>flashtalking.com</li>
<li>crwdcntrl.com</li>
<li>ixicorp.com</li>
<li>chartbeat.com</li>
<li>bombora.com</li>
<li>taboola.com</li>
<li>bluekai.com</li>
<li>marketo.com</li>
<li>retargeter.com</li>
</ul>

As a webdev at Mozilla, I've been in half-hour meetings where we've agonized over whether it's kosher to include *just one single single Google Analytics tracking snippet* without notifying users and updating the privacy policy. But, I know we're crazy in some very special ways.

Still, in former lives, I've worked at a variety of ad agencies and digital marketing companies. I'm not a stranger to conversations that revolve around partners & bizdev & analytics & media buys.

Maybe I'm out of touch these days, but I can't imagine a sane conversation that resulted in The Verge extending an invitation to over 25 companies to set up shop on my computer with every page visit.

I can only imagine this is as a steady drip-drop of bizdev decisions and emails to internal webdevs:

*"Hey, can you add this tracking pixel? We just signed on this awesome analytics partner."*

*"Just paste this snippet into the global template, please? This ad network is going to do great stuff for us."*

*"One more script thing here. These guys do realtime heatmapping and it's brilliant!*"

Drip-drop until you've accumulated this 12MB pile of crud - and no one along the way had the motivation or power to say no. But, I'm just guessing and trying to be charitable.

[lightbeam]: https://www.mozilla.org/en-US/lightbeam/
[performance-bankruptcy]: http://product.voxmedia.com/2015/5/6/8561867/declaring-performance-bankruptcy
[mobile-web-sucks]: http://www.theverge.com/2015/7/20/9002721/the-mobile-web-sucks
[translating-seinfeld]: http://www.theverge.com/2015/6/24/8809723/jerry-seinfeld-tv-show-international-translation
[max-headroom]: http://www.theverge.com/2015/4/2/8285139/max-headroom-oral-history-80s-cyberpunk-interview
[verge-fan]: https://twitter.com/lmorchard/statuses/142396733316534272

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
