---
title: How I learned to love spreadsheets in space
tags: [gaming, python, jupyter, eveonline, eve]
thumbnail: /uploads/2016/spreadsheets-in-space/wallet.PNG
---

**TL;DR**: I thought it would be fun to fly internet space ships. Instead,
it's proven more satisfying to write software and make internet space money.

<!--more-->

<img src="/uploads/2016/spreadsheets-in-space/history-3.PNG">

<nav role="navigation" class="table-of-contents"></nav>

## Looking for a space job

I've had an on-again, off-again relationship with EVE Online over the years.
I was initially attracted by the opportunities to fly space ships, explore the
universe, and occasionally shoot at things in the company of feral internet
randos. 

But, when you shoot at things, they often shoot back. Sometimes, you explode.
Since space ships cost space money, you're going to need a steady space income.

Unless you've got disposable money IRL to blow on [PLEX][howplex], this
means you need to find a space job.

[howplex]: https://secure.eveonline.com/PLEX/howToUsePlex.aspx

For the most part, I've found that space jobs in EVE Online are machines
designed to convert tolerance for tedium into small amounts of space money,
with scattered moments of panic to keep you paying attention. In fact, it
really seems like most space jobs are a clever mechanism to position you as
content for other players:

* Miners are stationary targets for long hours in asteroid fields.
* Mission runners hang out in dangerous space for long periods.
* Haulers travel predictable paths between markets.
* Explorers offer roaming targets in otherwise mostly empty space.
* Traders provide inputs into a lively market simulation.

Better players find ways to spice up the action, which is what you'd expect
from higher-level AI opponents.

## Wherein I found the spreadsheets in space

<img src="/uploads/2016/spreadsheets-in-space/orders-1.PNG">

But, I digress. There are reasons why EVE Online is synonymous with
"[spreadsheets in space](google)" - every space station in EVE has a market.
Most space jobs lead there: Loot, minerals, salvage, and stolen goods all get
sold on the market. And, nearly everything you'd want to buy with the proceeds
of your space job come from the market

[google]: https://www.google.com/search?q=spreadsheets+in+space

This is where I discovered [station trading][stationtrading]: The price for
buying from the market is always higher than selling to the market. It's like
retail vs wholesale pricing. And, for various reasons, the spread between these
prices can be quite large. So, without ever leaving the station, you can
perform [arbitrage][] - i.e. buy low, sell high, pocket the difference.

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

<img src="/uploads/2016/spreadsheets-in-space/transactions-1.PNG">

As with most space jobs, there is a generous helping of tedium in trading.  It
immediately occured to me that this would be better done by a computer. Why
click through all these items one-by-one, when an algorithm could zip through
and serve up a list of high-margin items in seconds?

Of course, in many games, this would be considered cheating. However, CCP only
seems to consider the last mile of automation as off limits. Fully automated
market bots are a bannable offense - that is, they want a human to manually
enter all those buy & sell orders and keep on top of them. 

But, [enterprising players][evecentral] and [even CCP themselves][eveapi] have
long offered web service APIs for things like character and market data.  This
means you can use Excel or Google Spreadsheets or even your own original
software to pull in this data, run calculations, scan for trade
opportunities, etc. 

As I read up about all of this, it
dawned on me: **This is one of the first video games I've played where
software development and algorithms are actually legitimate ways to play**!

Holy crap.

## Learning new ways to trade

<img src="/uploads/2016/spreadsheets-in-space/code-3.PNG">

I found myself undocking my space ship less to shoot at things. I started
playing EVE more from my editor and command line. I wanted to learn Node.js,
so I started building a little web app for myself to ingest market data and
spit out trade opportunities. This made me millions in space money in the
first week. 

I wondered if there might be more opportunities to pursue.

**Inter-station hauling**: This is really just station trading where the buy &
sell orders are separated by travel. I started scanning for market
opportunities across star systems. Then, I bought myself a freighter - I named
it [Maersk Line][] - and I undocked from the station for the first time in
weeks. I started shuffling items between stations while I rode on an exercise
bike. This made me hundreds of millions in space money, and I even dropped a
few pounds.

[Maersk Line]: https://www.maerskline.com/

**Manufacturing**: Another upgrade to station trading. Assemble an inventory
of raw materials through babysitting buy orders, submit jobs to factories to
convert raw materials into expensive items via blueprints, babysit sell orders
for profit. The margin comes from training up skills and researching blueprint
improvements to build more complicated things with increasing efficiency. I
bought myself my first player-owned space station in the middle of nowhere,
wrote software to find profitable blueprints, and I made a billion or so
in space money.

**Importing**: Rather than just brute forcing the market for random
opportunities, I read up on what things my corporation needed in at our home
space station. This involved a little bit of research into common fleet
compositions and what kinds of things folks usually did. I wrote more software
to build better shopping lists and find the cheapest places for relevant space
ship parts. I assembled an inventory and contracted with more capable space
truckers to get my inventory into hostile space during war time. Charging a
modest premium, I made more space billions.

## Sharpening the saw

<img src="/uploads/2016/spreadsheets-in-space/shell.PNG" style="width: 100%">

I've always loved writing software to solve problems. And, you can kind of
describe games as problem generators. So, it's been satisfying to play a
game through software development. And, it's been rewarding to measure that
software's effectiveness through my profits in space money.  It feels demented
to say it, but most days I get more out of my wallet balance in station than
from actually flying a ship.

In the past, my "hello world" for a new technology stack might have been
ingesting RSS & Atom news feeds to build a river of news. But, these days, I'm
finding myself reaching for EVE Online data to provide the test bed for things
I want to learn. 

It's had all the nerdy fun of working through puzzles, while also helping
sharpen the saw on my tech skills. I wasn't all that familiar with node.js
beforehand, but now I'm pretty sharp on it after having applied it to
practical challenges. I learned a bit of MongoDB and Postgresql to get things
done. I've played with some JS frameworks to build visualizations for
myself, and will probably poke at building some UI for myself in React at some
point.

To sum up: If you'd told me a few years ago that I'd find myself having fun
being a space businessman, I'd have asked you if I'd suffered some brain
damage or been replaced by an evil clone. 

But, life is full of surprises, isn't it?

[evecentral]: https://eve-central.com/home/develop.html
[eveapi]: https://eveonline-third-party-documentation.readthedocs.org/en/latest/
[arbitrage]: https://en.wikipedia.org/wiki/Arbitrage
[stationtrading]: https://wiki.braveineve.com/public/dojo/wiki/station_trading_complete_guide

<!-- vim: set wrap wm=5 syntax=markdown textwidth=78: -->
