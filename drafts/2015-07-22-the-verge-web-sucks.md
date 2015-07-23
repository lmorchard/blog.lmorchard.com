---
title: The Verge's mobile web kinda sucks
tags: [webdev, advertising, internet, privacy, tracking]
---

<nav role="navigation" class="table-of-contents"></nav>

## I love The Verge, but man...

So, I've been a big fan of The Verge, [almost since day one][verge-fan]. It's a gorgeous site and the content tends to be great. And, they've done some amazing things with longform articles like "[What's the deal with translating Seinfeld][translating-seinfeld]" and "[Max Headroom: the definitive history of the 1980s digital icon][max-headroom]".

But, I have to say, when I read [Nilay Patel][]'s "[The Mobile Web Sucks][mobile-web-sucks]" - on my new experimental Boot2Gecko phone, by the way - it felt like getting pelted by rocks thrown a bright, shiny glass house. This is coming from a property of Vox Media, who just [declared performance bankruptcy][performance-bankruptcy] back in May. So, they *know* they have a problem.

[nilay patel]: https://twitter.com/reckless/

To call out browser makers for the performance of sites like his, though? That's a bit much.

Here's the thing: I've never owned an iPhone. I've had Palm webOS phones, a parade of Android devices, and now a nicely-spec'd Boot2Gecko phone. Call me a sucker for the underdog.

Some sites have always been a delight on whatever gadget I fetch from my pocket. Others, I've watched decay over the years as their mobile web experiences are neglected in favor of those frantically promoted apps.

And then there are some that still look great - yet somehow they manage to get cruddier and slower over the years despite steady measurable improvement in browser benchmarks across the industry.

<!--
Here's the thing: My new Boot2Gecko phone and my handful of Android phones before it have all handled The Verge like a champ over the years. It's not one of the smoothest sites out there, but I've felt like my devices have chugged through it and delivered.
-->

## Time to open the Dev Tools

A page view on The Verge is a heavy load. I've long known this is true - it's true for many sites, these days. But it wasn't until this particular article tweaked my nose that I decided to take a peek at what might be wriggling under this log.

So, I opened up the Dev Tools in Firefox and gave the page a reload on a cleared cache.

<img src="/uploads/2015/the-verge-web-sucks/the-verge-html-size.png" class="fullwidth"
  alt="HTML size on the article"/>

That's fine - 75kb of HTML for the article. But, I also expect there'll be some images and a font or two.

<img src="/uploads/2015/the-verge-web-sucks/more-resources.png" class="fullwidth"
  alt="Loading more resources..." />

We're up to 20 requests and 1.4MB over ~7 seconds. That's on the upper end of what I'd advise for a ~1500 word article with some surrounding navigation & teasers into the larger site.

That's not terrible - I did tweet that The Verge is a gorgeous site, after all. That takes some resources. Hell, this blog post is going to probably be bigger than I'd like, what with the images and the Disqus & Twitter scripts.

Oh, but wait, it's not done loading yet. I'm starting to read & scroll, but my browser's still spinning. I wonder what the final stats will be?

## Ow, my data plan!

<img src="/uploads/2015/the-verge-web-sucks/the-verge-final-load-stats.png"
  class="fullwidth" alt="It finally stopped loading" />

Holy crap. It took over 30 seconds. In the end, it fetched over 9.5MB across 263 HTTP requests. That's almost an order of magnitude more data & time than needed for the article itself.

What the hell is all this stuff?

<img src="/uploads/2015/the-verge-web-sucks/resource-breakdown.png"
  class="fullwidth" alt="It finally stopped loading" />

Wow. Devtools performed a second reload of the page to get an overall performance analysis. This time it downloaded 12MB - a little over 7MB in that is JavaScript!

Just to put this in some rough perspective: Assuming I had a 1GB / month data plan, I could visit sites like The Verge ~3 times every day before I hit my cap. If I'm lucky, some or most of this will get cached between requests so it won't be *quite* that bad. In fact, another report tells me that a primed cache yields ~8MB transferred - so maybe 4 visits per day.

Still, this isn't one of the cool longform articles on The Verge with interactive features and whatnot. This is just a straightforward ~1600 word rant with a few quotes & images. Oh, and one video.

What in the world is all this executable code *doing*?

## Shining a Lightbeam under the log

Hmm, I think I [Nilay Patel tweeted a hint about this](https://twitter.com/reckless/status/623234268152598528):

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/satefan">@satefan</a> <a href="https://twitter.com/verge">@verge</a> part of the content we deliver is advertising! :)</p>&mdash; nilay patel (@reckless) <a href="https://twitter.com/reckless/status/623234268152598528">July 20, 2015</a></blockquote>

Buddy, I'd guess *most* of what you just delivered was advertising. That, and spyware.

In one of the [public Monday update calls at Mozilla][weeklyupdates] I heard about this project called [Lightbeam][lightbeam]:

[weeklyupdates]: https://wiki.mozilla.org/WeeklyUpdates

<blockquote>Lightbeam is a Firefox add-on that uses interactive visualizations to show you the first and third party sites you interact with on the Web.</blockquote>

So, I figured I'd install it and let it take a look at The Verge. This is what it revealed:

<img src="/uploads/2015/the-verge-web-sucks/im-surrounded.png"
  class="fullwidth" id="thumbnail" alt="I'm surrounded" />

The Verge is the big circle in the middle. The triangles dancing around it are third-party sites that got involved in the delivery of this article. Lightbeam has a list view, so I switched to get a closer look:

<img src="/uploads/2015/the-verge-web-sucks/lightbeam-listview.png"
  class="fullwidth" alt="Lightbeam list view" />

Sweet Jeebus. "You have visited **1 SITE**. You have connected with **47 THIRD PARTY SITES.**"

## 22 flavors of tracking

Now, to be fair, scrolling through the report I could see that some of these distinct "sites" are clearly alternate domains owned by the same organization. That said, I tracked down *at least 22 different companies* before I got tired of digging:

<!-- mosaic here? -->

<ul> <!-- class="columns clearfix"> -->
<li><a href="http://googleadservices.com">Google</a></li>
<li><a href="http://advertising.amazon.com/">Amazon</a> - "Reach millions of customers who find, discover, and buy at Amazon"</li>
<li><a href="http://skimresources.com">skimresources.com</a> - "When links in publishers’ content lead their users to click through and buy from an online retailer, we make sure they’re rewarded!"</li>
<li><a href="http://sonobi.com">sonobi.com</a> - "Sonobi’s suite of buy and sell-side tools allow our customers to identify, deliver, and manage advertising opportunities through performance filters once absent from programmatic channels"</li>
<li><a href="http://umbel.com">umbel.com</a> - "Umbel helps you securely collect first-party customer data and combine all of your existing data from multiple sources to give you a complete view of your customers."</li>
<li><a href="http://www.krux.com/">krux.com</a> - "Krux helps businesses drive revenue by delivering smarter content, commerce and marketing experiences to people."</li>
<li><a href="http://mathtag.com">mediamath.com</a> - "MediaMath’s TerminalOne™ platform activates data, automates execution, and optimizes advertising interactions across addressable media—delivering greater performance, transparency, and control to marketers and a better experience to consumers."</li>
<li><a href="http://adnxs.com">adnxs.com</a> - "Adnxs™ is a portal for Publishers to the AppNexus® online auction exchange used to sell advertising space."</li>
<li><a href="http://bidswitch.net">bidswitch.net</a> - "BidSwitch provides immediate and seamless real-time access for Supply and Demand Partners across all media types (display, mobile, video, native, etc.)."</li>
<li><a href="http://scorecardresearch.com">scorecardresearch.com</a> - "ScorecardResearch, a service of Full Circle Studies, Inc., is part of the comScore, Inc. market research community, a leading global market research effort that studies and reports on Internet trends and behavior."</li>
<li><a href="http://kargo.com">kargo.com</a> - "Kargo weaves our content and ad technology into our premium publishers’ mobile and tablet properties, offering advertisers the best brand experiences."</li>
<li><a href="http://quantserve.com">quantcast.com</a> - "Understand your audience. Find your next customer."</li>
<li><a href="http://moatads.com">moatads.com</a> - "Moat's proprietary ad search engine has become a ubiquitous tool for the display ad industry. Moat makes it easy to find what and where ads are running for the top brands and sites."</li>
<li><a href="http://flashtalking.com">flashtalking.com</a> - "Flashtalking is an independent ad serving, measuring and technology company, providing best-in-class digital advertising products, service and support for online advertisers, key media buying and creative agencies."</li>
<li><a href="http://www.lotame.com/">lotame.com</a> - "Lotame is a data management platform (DMP) that lets marketers, agencies and publishers harness audience data to make smarter marketing, product and business decisions."</li>
<li><a href="http://ixicorp.com">ixicorp.com</a> - "IXI Services enables its clients to differentiate and target consumer households and target markets based on proprietary measures of wealth, income, spending capacity, credit, share-of-wallet, and share-of-market."</li>
<li><a href="http://chartbeat.com">chartbeat.com</a> - "We partner with editorial teams to identify their highest quality content -- the pieces that pique and keep reader attention. We partner with advertising teams to plan campaigns around this high-quality content so these ads are seen more often and for longer."</li>
<li><a href="http://bombora.com">bombora.com</a> - "We are the largest aggregator of B2B intent driven data."</li>
<li><a href="http://taboola.com">taboola.com</a> - "Taboola recommends editorial and sponsored content across many of the world’s most highly-trafficked sites."</li>
<li><a href="http://bluekai.com">bluekai.com</a> - "BlueKai is the industry's leading cloud-based big data platform that enables companies to personalize online, offline and mobile marketing campaigns with richer and more actionable information about targeted audiences."</li>
<li><a href="http://marketo.com">marketo.com</a> - "Marketo has developed the industry’s leading engagement marketing platform, the broadest ecosystem of partners, and the deepest expertise to make this all possible."</li>
<li><a href="http://retargeter.com">retargeter.com</a> - "ReTargeter optimizes your ad spend with highly targeted, real time digital advertising solutions and the best account management in the industry."</li>
</ul>

I feel like someone just set up the entire vendor hall from an awful tech conference in my living room. Seriously, could you folks just not pick one or two or ten? Did you just go to every table and say "Yeah, cool, sign us up!"

As a webdev at Mozilla, I've been in hour-long meetings where we've agonized over whether it's copacetic to include *just one single Google Analytics snippet* without notifying users and updating the privacy policy. But, I know we're crazy in some very special ways.

In former lives I worked at a variety of ad agencies and digital marketing companies. I'm no stranger to conversations that revolve around partners & bizdev & analytics & media buys. I can only imagine things have intensified & evolved since I've been out of the trenches of that business.

Still, I can't imagine a sane conversation that resulted in The Verge extending an invitation to over 20 companies to set up shop on my computer with every page visit. I can only imagine this is as a steady drip-drop of bizdev decisions and emails to internal webdevs:

*"Hey, can you add this tracking pixel? These guys do realtime attention heatmapping and it's brilliant!"*

*"Just paste this snippet into the global template, please? This fourth programmatic ad platform is really going to fill in the gaps for the other three."*

*"One more script thing here. We really need to capture the affiliate credit for all these links going out to e-commerce sites.*"

*"Oh yeah, and now we're going to need this script to manage the dozen ad platforms we use."*

A few years later and you've accumulated this 8-to-12-megabyte pile of globally-sourced crud - and no one along the way had the power or motivation to say no. I mean, really, what's the cost in adding one more straw to that camel's back?

## How to make the web suck

So, I haven't taken the time to dig into what every one of those companies' addition to that article does. There are only so many hours in the day, and I have a ranty blog post to write.

But, if you want to talk about browser performance - mobile or desktop - don't you think that maybe, *just maybe*, some of that **7 megabytes** of JavaScript code might have an impact?

First, even assuming this code comes from a local cache, parsing it into something executable has a cost. Of course, someday, we'll have [WebAssembly][] to shift this first stage upstream into webdev build tools. But we don't have that, yet.

[WebAssembly]: https://brendaneich.com/2015/06/from-asm-js-to-webassembly/

Then, there's what that code's actually doing once it runs. I've seen scripts that record every pixel of mouse movement and phone home every few seconds. Some spawn dozens of hidden iframes, each doing something fun. Others run code 10 times per second that trigger little invisible page re-renderings that chew up CPU and make scrolling & orientation changes chug. Some scripts get run multiple times and perform duplicate work. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhauser gate.

Wait, where was I?

## Everybody is (not) doing it!


[lightbeam]: https://www.mozilla.org/en-US/lightbeam/
[performance-bankruptcy]: http://product.voxmedia.com/2015/5/6/8561867/declaring-performance-bankruptcy
[mobile-web-sucks]: http://www.theverge.com/2015/7/20/9002721/the-mobile-web-sucks
[translating-seinfeld]: http://www.theverge.com/2015/6/24/8809723/jerry-seinfeld-tv-show-international-translation
[max-headroom]: http://www.theverge.com/2015/4/2/8285139/max-headroom-oral-history-80s-cyberpunk-interview
[verge-fan]: https://twitter.com/lmorchard/statuses/142396733316534272

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
