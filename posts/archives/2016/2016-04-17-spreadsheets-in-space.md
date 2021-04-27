---
title: How I learned to love spreadsheets in space
tags: [gaming, node, apis, eveonline, eve]
thumbnail: /uploads/2016/spreadsheets-in-space/wallet.PNG
---

**TL;DR**: I thought it would be fun to fly internet space ships. Instead,
it's proven more satisfying to write software and make internet space money.

<!--more-->

<nav role="navigation" class="table-of-contents"></nav>

## Looking for a space job

I've had an on-again, off-again relationship with EVE Online over the years.
I was initially attracted by the opportunities to fly space ships, explore the
universe, and occasionally shoot at things in the company of feral internet
randos. 

But, when you shoot at things, they often shoot back. Sometimes, you explode.
Since space ships cost space money, you're going to need a steady space income.

Unless you've got disposable money IRL to blow on [PLEX][howplex], this
means you need to [find a space job][spacejob].

[spacejob]: http://wiki.eveuniversity.org/EVE_Careers_101
[howplex]: https://secure.eveonline.com/PLEX/howToUsePlex.aspx

[<img class="fullwidth" title="What to do in EVE Online" src="/uploads/2016/spreadsheets-in-space/eve-wtd.jpg">](http://swiftandbitter.com/eve/wtd/)

For the most part, I've found that space jobs in EVE Online are machines
designed to convert tolerance for tedium into small amounts of space money,
with scattered moments of panic to keep you paying attention. In fact, it
really seems like space jobs are a clever mechanism to position you as
content for other players:

* Miners are stationary targets for long hours in asteroid fields.
* Mission runners hang out in dangerous space for long periods.
* Haulers travel predictable paths between markets.
* Explorers offer roaming targets in otherwise mostly empty space.
* Traders provide inputs into a lively market simulation.

Much of EVE Online seems to be in discovering ways to generate fun from space
jobs despite the tedium, and players have been astonishingly creative in doing
so.

## Wherein I found the spreadsheets in space

But, I digress. There are reasons why EVE Online is synonymous with
"[spreadsheets in space](google)" - every space station in EVE has a market.
Most space jobs lead there: Loot, minerals, salvage, and stolen goods all get
sold on the market. And, nearly everything you'd want to buy with the proceeds
of your space job come from the market.

[google]: https://www.google.com/search?q=spreadsheets+in+space

<img class="fullwidth" src="/uploads/2016/spreadsheets-in-space/transactions-1.PNG">

This is where I discovered [station trading][stationtrading]: The price for
buying from the market is always higher than selling to the market. It's like
retail vs wholesale pricing, but weirder. And, for various reasons, the spread
between these prices can be quite large. So, without ever leaving the station,
you can perform [arbitrage][] - i.e. buy low, sell high, pocket the
difference.

<img class="fullwidth" src="/uploads/2016/spreadsheets-in-space/history-3.PNG">

One evening, I tried getting into station trading entirely off-the-cuff:

1. Click through every item in the market.
2. Eyeball the price spread and history.
3. Assemble a list of all the items with a decent, stable margin.
4. Put up buy orders, babysit them to ensure they're always slightly higher
   than competitors. 
5. Put items up for sale as buy orders are fulfilled.
6. Babysit sell orders to ensure they're always slightly lower than competitors. 
7. Profit!

## This looks like a job for a machine

As with most space jobs, there is a generous helping of tedium in trading.  It
immediately occurred to me that this would be better done by a computer. Why
click through all these items one-by-one, when an algorithm could zip through
and serve up a list of high-margin items in seconds?

<img class="fullwidth" src="/uploads/2016/spreadsheets-in-space/shell.PNG" style="width: 100%">

Of course, in many games, this would be considered cheating. I remember the
controversy back in the 80s & 90s when "[helpers][]" first started appearing for
[TradeWars 2002][], a game that many cite as an early inspiration for EVE
Online. And, indeed, fully automated market bots are a bannable offense in EVE
Online - that is, CCP want a human to manually enter all those buy & sell
orders and keep on top of them. 

[helpers]: https://www.google.com/search?q="tradewars+2002"+helpers
[TradeWars 2002]: http://www.tradewars.com/default.html

However, CCP only seem to consider the last mile of automation as
off limits.  [Enterprising players][evecentral] and [even CCP themselves][eveapi] have
long offered web service APIs for things like character and market data.  This
means you can use Excel or Google Spreadsheets or even your own original
software to pull in this data, run calculations, scan for trade
opportunities, etc. 

As I read up about all of this, it dawned on me: **This is one of the first
video games I've played where software development and algorithms are
intentionally supported ways to play**!

Holy crap.

## Sharpening the saw

I've always loved writing software to solve problems. And, you can
describe games as problem generators. So, it's been satisfying to play a
game through software development. And, it's been rewarding to measure that
software's effectiveness through my profits in space money.  It feels demented
to say it, but most days I get more out of my wallet balance in station than
from actually flying a ship.

<img class="fullwidth" src="/uploads/2016/spreadsheets-in-space/code-3.PNG">

It's had all the nerdy fun of working through puzzles, while also helping
sharpen the saw on my tech skills. I wasn't all that familiar with node.js
beforehand, but now I'm pretty sharp on it after having applied it to
practical challenges. I learned a bit of MongoDB and Postgresql to get things
done. I've played with some JS frameworks to build visualizations for
myself, and will probably poke at building some UI for myself in React at some
point.

In the past, my "Hello World" for a new technology stack might have been
ingesting RSS & Atom news feeds to build a River of News. I even used that
habit as fodder to write [my first book][book]. But, these days, I'm finding
myself reaching for EVE Online data to provide the test bed for things I want
to learn. Maybe I'll find some way to channel this enthusiasm into something
like another book or some conference talks. Who knows?

[book]: http://amzn.to/1T0lk0p

[evecentral]: https://eve-central.com/home/develop.html
[eveapi]: https://eveonline-third-party-documentation.readthedocs.org/en/latest/
[arbitrage]: https://en.wikipedia.org/wiki/Arbitrage
[stationtrading]: https://wiki.braveineve.com/public/dojo/wiki/station_trading_complete_guide

<!-- vim: set wrap wm=5 syntax=markdown textwidth=78: -->
