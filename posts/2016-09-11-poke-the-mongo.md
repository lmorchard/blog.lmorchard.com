---
title: Poking the Mongo on Pico-8
tags: [gaming,pico8,lua,pokethemongo]
thumbnail: /uploads/2016/poke-the-mongo/poke-the-mongo.p8.png
---

**TL;DR**: I started writing a video game for a fantasy console. The future is weird.

<!--more-->

<nav role="navigation" class="table-of-contents"></nav>

## Enter the PocketC.H.I.P.

[Pico-8][] has been out for a few years. With it, folks have been making fun neo-retro games - and of course I've got a soft spot for that genre. 

[Pico-8]: http://www.lexaloffle.com/pico-8.php

But, I never really fell down the Pico-8 rabbit hole until this arrived:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Oh hey! My <a href="https://twitter.com/hashtag/pocketchip?src=hash">#pocketchip</a> just showed up! <a href="https://t.co/5HxB2mzCPw">pic.twitter.com/5HxB2mzCPw</a></p>&mdash; Les Orchard (@lmorchard) <a href="https://twitter.com/lmorchard/status/766350094555750400">August 18, 2016</a></blockquote>

[I read about the PocketC.H.I.P. back in May](http://boingboing.net/2016/05/04/tiny-8-bit-console-designed-f.html). I was sold on the idea of real hardware for a fantasy game console - a Raspberry PI turned GameBoy. I pre-ordered and then mostly forgot about it. Fast forward three months and I've got the thing in my hands.

While I do want to write up an in-depth look at the PocketC.H.I.P., for now I'm going to focus on this Pico-8 thing that's grabbed me in the past few weeks.

But, like my old Commodore 64, PocketC.H.I.P. is a gateway drug: It doesn't just play games - it comes with a full Pico-8 installation: Tools for code, sprites, maps, sounds, and music. In past visits to the Pico-8 scene, using just the web player, the significance of this hadn't quite dawned on me. 

## View Source

<img class="lazyload inset right" data-src="/uploads/2016/poke-the-mongo/PICO-8_21.gif" />

With the full package, you can hit <kbd>Esc</kbd> on any running cartridge and tinker with the source - **not entirely unlike View Source and Developer Tools on the Web**. And, [you know I'm a fan of that](/2015/08/07/web-awesome/).

Or, to strum my nostalgia strings, it's like when I would pour over listings in 1980s computer magazines to see how those games worked. In fact, there have even been a few issues of a [Pico-8 Zine](https://sectordub.itch.io/pico-8-fanzine-1) with code and interviews. 

After I'd poked at a dozen-odd carts and browsed through the zines, I thought I should give it a go myself. I didn't know much Lua, but it's an easy language to pick up. Simpler than JavaScript, [but it beats revisiting BASIC][BASICtweet] - even my old favorite [Simons' BASIC](https://en.wikipedia.org/wiki/Simons%27_BASIC), which has a surprising amount in common with this modern day system. 

I also decided to be masochistic by coding directly on the PocketC.H.I.P. Later, when my fingers vetoed further typing on metal domes, I plugged in a USB keyboard. As things got more complex, I broke down and bought the main edition of Pico-8 to move to a bigger screen. It's not Free Software or even Free-as-in-Beer. But, [it's only US$14.99](http://www.lexaloffle.com/pico-8.php#getpico8). That single purchase gave me access to versions for my PC, Mac, and Linux machines. 

(There's even a Raspberry PI version - which gives me ideas for building a Pico-8 multicade machine. But, that's a story for another post.)

On my PC, I discovered `.p8` cartridges are just text files I can edit in Vim! With that revelation, [I created a GitHub repo][p8repo] and started saving my work there. Things have come a long way since I only had a tape drive to work with on my C64!

[BASICtweet]: https://twitter.com/lmorchard/status/766870582856081409
[p8repo]: https://github.com/lmorchard/Pico-8-Carts

A couple of days later, I had a promising start:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Just in case I don&#39;t work on it any further, here&#39;s Poke the Mongo v0.1! <a href="https://t.co/Qgn0p2ZCep">https://t.co/Qgn0p2ZCep</a> <a href="https://t.co/rGtP6UCf5p">pic.twitter.com/rGtP6UCf5p</a></p>&mdash; Les Orchard (@lmorchard) <a href="https://twitter.com/lmorchard/status/767604122388279296">August 22, 2016</a></blockquote>

## Share and enjoy!

There are a few more things I discovered in composing that tweet:

1. Pico-8 has easy built-in video recording that renders animated GIFs to my desktop. <kbd>F3</kbd> to start, <kbd>F4</kbd> to save - and I'm ready to tweet little moments while I hack.

1. Pico-8 cartridges can be exported as images. <img class="inset right" style="width: inherit" src="/uploads/2016/poke-the-mongo/poke-the-mongo.p8.png" /> The code for my game is encoded in that PNG with [a steganography technique that subtly tweaks pixel color bits](https://twitter.com/lexaloffle/status/611581098900897793). As long as no intermediaries corrupt the hidden encoding, I can share this game cartridge by uploading the image.

1. Apropos of that, Lexaloffle has forums - a BBS - where folks post & discuss their Pico-8 carts. [You can find mine over here][mongobbs]!

1. Inside Pico-8 is a mode called "Splore" which connects to the Lexaloffle BBS to let you browse uploaded carts from the console. So, when I uploaded my game, it was instantly available to everyone else with Pico-8!

Pico-8 is game making as a social activity, and the system has all the batteries included.

## Game making is a fun game

As I tinkered, it occurred to me that Pico-8 is less a serious game development system and more a game about making games. Through intentional constraints & platform quirks, it offers offer creative hooks & puzzles.

The constraints mean it's not as easy to get lost in options or feel overwhelmed. For example, [here's a Pico-8 API cheatsheet](https://neko250.github.io/pico8-api/) - it's pretty much all I've needed! It's also hard to build anything huge, so there's less of a compulsion to go beyond doodles or a few specific game mechanics. I can make something derpy but good enough and move on without stressing about my artistic skills.

But also, some folks have found ways to really push the boundaries of the system - and that is a puzzle in itself. It's great to get a fresh dose of that old school awe from seeing a clever hack make the machine do something it wasn't meant to do. It's akin to seeing someone pull off some nasty moves in game streams where I know just enough to realize what's happening.

I'm nowhere near that level of Pico-8 mastery, but it could be interesting to dive into some of the things I've learned so far. But, I'll save that for yet another post.

## Play my game!

Pico-8 games can also be exported to HTML5 and JavaScript. This embedded web player consists of the game code and an Emscripten-compiled version of the Pico-8 engine. So, [because the web is awesome][webawesome], even if Pico-8 goes away this copy of my game will continue working long after:

<iframe class="lazyload" style="width: 100%; height: 420px" scrolling="no" frameborder="0" allowfullscreen data-src="/uploads/2016/poke-the-mongo/pokethemongo.html"></iframe>

I've also read that the folks behind Pico-8 aren't particularly hostile to others cloning the system - which has lead to things like [PICOLOVE](https://github.com/picolove/picolove), an independent implementation of the Pico-8 APIs for another Lua-based game system. I've seen a few folks leverage that to get their games running on Android, so I'll have to check that out at some point.

Anyway, I've got a few more things to add, but I think this game is getting pretty close to where I want it to be. It's all gone much faster than I expected, so I'm looking forward to trying more ideas. 

Until then, let me know how you like Poke the Mongo, and I'll follow up with a more in-depth look at how I made this thing!

[webawesome]: /2015/08/07/web-awesome/
[mongobbs]: http://www.lexaloffle.com/bbs/?tid=4111

<script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<!-- vim: set wrap linebreak nolist wrapmargin=0 textwidth=0 syntax=markdown formatoptions-=t textwidth=78: -->
