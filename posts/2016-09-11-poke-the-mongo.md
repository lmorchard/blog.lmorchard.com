---
title: Poking the Mongo on Pico-8
tags: [gaming,pico8,lua,pokethemongo]
thumbnail: /uploads/2016/poke-the-mongo/poke-the-mongo.p8.png
---

**TL;DR**: I started writing a video game for a fantasy console.

<!--more-->

<nav role="navigation" class="table-of-contents"></nav>

Pico-8 has been out for a few years now, and I've followed it with some interest. Folks have been making some fun neo-retro style games, and I've totally got a soft spot for that stuff.

## Enter the PocketC.H.I.P.

But, I never really fell down the Pico-8 rabbit hole until this arrived:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Oh hey! My <a href="https://twitter.com/hashtag/pocketchip?src=hash">#pocketchip</a> just showed up! <a href="https://t.co/5HxB2mzCPw">pic.twitter.com/5HxB2mzCPw</a></p>&mdash; Les Orchard (@lmorchard) <a href="https://twitter.com/lmorchard/status/766350094555750400">August 18, 2016</a></blockquote>

[I read about the PocketC.H.I.P. back in May](http://boingboing.net/2016/05/04/tiny-8-bit-console-designed-f.html). I was immediately sold on the idea of actual hardware for a fantasy game console - a Raspberry PI turned GameBoy. I pre-ordered and then mostly forgot about it. Fast forward a little over three months and I've got the thing in my hands.

PocketC.H.I.P. doesn't just play Pico-8 games, though. It comes with the *full Pico-8 package*: editors for code, sprites, maps, sounds, and music tracks. In past visits to the Pico-8 scene, using just the embedded web player, the significance of this distinction hadn't quite dawned on me. 

## View Source

<img class="lazyload inset right" data-src="/uploads/2016/poke-the-mongo/PICO-8_21.gif" />

With the full package, you can just hit <kbd>Esc</kbd> on any running game cartridge and tinker with the source code - **not entirely unlike View Source on the Web**.

It wasn't until I'd played a dozen or so games, peeking in on the code behind some particularly interesting effects or fun mechanics, that I thought maybe I should give it a go myself.

I didn't know much Lua, but it's not a hard language to pick up. Simpler than JavaScript, [but it beats revisiting BASIC][BASICtweet]. I also decided to be masochistic, at first trying my hand at coding directly on the PocketC.H.I.P. Later, I plugged a USB keyboard into the device.

As things got more complex, I broke down and bought the main edition of Pico-8. It's not Free Software or even Free-as-in-Beer. But, [it's only US$14.99](http://www.lexaloffle.com/pico-8.php#getpico8), it's under active development, and it has a vibrant community behind it. And, that single purchase gave me access to versions for my PC, Mac, and Linux machines. There's even a Raspberry PI build!

It was around then that I also figured out `.p8` cartridges are just text files I can edit in Vim! With that revelation, [I created a GitHub repo][p8repo] and started saving my work there. Things have come a long way since the days when I had a Commodore 64 with only a tape drive to play with!

[BASICtweet]: https://twitter.com/lmorchard/status/766870582856081409
[p8repo]: https://github.com/lmorchard/Pico-8-Carts

A couple of days later, I had what actually felt like a promising start:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Just in case I don&#39;t work on it any further, here&#39;s Poke the Mongo v0.1! <a href="https://t.co/Qgn0p2ZCep">https://t.co/Qgn0p2ZCep</a> <a href="https://t.co/rGtP6UCf5p">pic.twitter.com/rGtP6UCf5p</a></p>&mdash; Les Orchard (@lmorchard) <a href="https://twitter.com/lmorchard/status/767604122388279296">August 22, 2016</a></blockquote>

## Share and enjoy!

There are a few more things I discovered in composing that tweet:

1. Pico-8 has easy built-in video recording that renders tweetable animated GIFs to my desktop. <kbd>F3</kbd> to start, <kbd>F4</kbd> to save - and I'm ready to share little moments while I hack.

1. Pico-8 cartridges can be exported as images. <img class="inset right" style="width: inherit" src="/uploads/2016/poke-the-mongo/poke-the-mongo.p8.png" /> The code for my game is encoded in that PNG with [a steganography technique that subtly tweaks pixel colors](https://twitter.com/lexaloffle/status/611581098900897793). As long as no intermediaries corrupt the hidden encoding, I can share this game cartridge by uploading the image.

1. Apropos of that, Lexaloffle has forums - a BBS - where folks post & discuss their Pico-8 carts. [You can find mine over here][mongobbs]!

1. Inside Pico-8 is a mode called "Splore" which lets you browse cartridges uploaded to the Lexaloffle BBS right from the console. So, when I uploaded my game, it was instantly available to everyone else with Pico-8!

## Making games is a fun game

As I worked with it, it occurred to me that Pico-8 is less a game development system and more a game about making games. It presents intentional constraints and platform quirks that offer both creative hooks and opportunities for solving puzzles to reach goals you set for yourself. In those respects, I'd say it's got commonalities with games like Minecraft.

* constraints
* kind of like a game about making games
* highlights
  * low resolution means I can throw something derpy together that looks not bad
  * layered sprites for randomly generated baddies
  * trig functions for psuedo-3d ball throws
  * flags on map tiles for annotating whether they can be walked on and direction advice for AI
  * terrible code, but every doodly idea I came up with was easy to

## Every game needs a backstory

> You are Poke, the Mongo: Trickster spirit, consort of Lightning and Thunder.
>
> For seasons uncounted, you have abided unseen among the bright mammals. On occasion, you've lent a jolt of inspiration where it amused you. But to your dismay, the primates learned to perceive and capture your sibling spirits. They harnessed your aspects in spark & wire to commit their crimes.
>
> You cannot be angry with them. To discover and play is what they are - and you yourself granted the gleam. There is hope: These children are not patient. Given enough resistance, they abandon this game for another. So, the duty is yours: Struggle against artifacts made from your own nature. Frustrate the monkeys until they set aside their toys.
>
> Free your brothers and sisters.

## Play my game!

Pico-8 games can also be exported to HTML5 and JavaScript. This embedded web player consists of the game code and an Emscripten-compiled version of the Pico-8 engine. So, [because the web is awesome][webawesome], even if Pico-8 someday goes away - this copy of my game will continue working long after:

<iframe class="lazyload" style="width: 100%; height: 420px" scrolling="no" frameborder="0" allowfullscreen data-src="/uploads/2016/poke-the-mongo/pokethemongo.html"></iframe>

[webawesome]: /2015/08/07/web-awesome/
[mongobbs]: http://www.lexaloffle.com/bbs/?tid=4111



<script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<!-- vim: set wrap linebreak nolist wrapmargin=0 textwidth=0 syntax=markdown formatoptions-=t textwidth=78: -->
