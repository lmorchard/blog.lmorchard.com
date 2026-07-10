---
title: "Somewhere to stash my mixtapes (Week 28)"
date: 2026-07-10
thumbnail: "https://cdn.masto.host/mastohackerstown/media_attachments/files/116/887/247/202/173/030/original/562609a6f4fbae08.png"
tags:
  - weeknotes
  - selfhosting
  - music
  - gamedev
  - metablogging
  - cats
layout: post
---

TL;DR: This week I fell down a self-hosted-music rabbit hole and started building `byom-player` and `byom-sync` so I can publish playlists and mixtapes on my own domain. Also more `starnet` gamedev (an arcadey exploit-barrage mini-game plus a Butterchurn "brain damage" overlay), I finally ditched Disqus for remark42 after almost 20 years, and Minnaloushe made parole from cat jail.

<!--more-->

<nav role="navigation" class="table-of-contents"></nav>

## Somewhere to stash my mixtapes

This one started sideways. I spent some time [reviving my Big Sonic Heaven Spy bot](https://masto.hackers.town/@lmorchard/116875598639707807), a little thing that watches what's playing at bigsonicheaven.com and appends new songs to a Spotify playlist. It's all ethereal, shoegaze, dreampop, and post-punk from a DJ I've been listening to since high school. The playlist is past 8000 songs now, and Spotify caps playlists at 10000, so I'm going to hit a wall before too long. Which got me grumbling: I really need a more generic place to stash playlists and mixtapes, one that isn't locked inside somebody else's app.

So of course I started building two of them.

`byom-sync` [exports playlists from Spotify](https://github.com/lmorchard/byom-sync) into a portable format (JSPF, with a resolution cache so I'm not re-resolving the same tracks across playlists over and over). Then `byom-player` [plays those playlists in a plain static web page](https://github.com/lmorchard/byom-player) against whatever backend I have handy: Spotify, YouTube, or a self-hosted Navidrome / Subsonic server.

![Screenshot of my byom-player web component, playing a playlist exported from Spotify with videos backed by YouTube](https://cdn.masto.host/mastohackerstown/media_attachments/files/116/887/247/202/173/030/original/562609a6f4fbae08.png)

The promise, [as I put it on Mastodon](https://masto.hackers.town/@lmorchard/116887247336836933), is that I might just be able to publish playlists and mixtapes as a static site on my own domain, and have them play against whatever a given visitor happens to have. Along the way I [discovered Navidrome and the OpenSubsonic API](https://masto.hackers.town/@lmorchard/116887252588644809), which turns out to be a lovely way to expose a personal music library to a web app. That sent me spelunking through the wider ecosystem of Subsonic-compatible servers (gonic, smolsonic, lms, Funkwhale's Subsonic support) and desktop clients (Psysonic looks especially nice). Links for all of those are down in the Miscellanea.

The whole thing sits comfortably next to a video that showed up in my YouTube likes this week, on "neighbourhood-first" software: the idea of building the open web without demanding that every single person run their own server.

<youtube-embed video-id="kCbzHfKjTDs"></youtube-embed>

That's basically the shape I want. I self-host the awkward parts, but a visitor doesn't have to. And underneath all of it is the same instinct a bookmark I saved this week names outright: [be a gardener, not a tenant](https://www.lireo.com/be-a-gardener-not-a-tenant/), because cloud services are not forever, and neither, apparently, is a Spotify playlist with a hard cap on it.

## Back on my gamedev bullshit

`starnet`, my long-simmering cyberpunk netrunning RPG, got some more attention too. This week I was [ginning up an arcadey sci-fi visualization](https://masto.hackers.town/@lmorchard/116880753323673946) of a metasploit-inspired exploit barrage against a network node.

<figure>
  <video controls loop muted playsinline>
    <source src="./exploit-barrage.mp4" type="video/mp4" />
    <a href="./exploit-barrage.mp4">exploit-barrage.mp4</a>
  </video>
  <figcaption>The exploit barrage in motion: belts of exploits orbiting a target node while its shields wear down.</figcaption>
</figure>

The mechanic, [as I described it](https://masto.hackers.town/@lmorchard/116885858942245975) when someone asked: there's a target node in the center, surrounded by defensive shields. Orbiting the target are a couple of concentric belts of exploits you've queued up. When the barrage starts, the shields wear down, your exploits occasionally get burned or disclosed or used up, and a detection-risk "noise" level climbs. You might compromise the target, or you might run out of exploits or make too much noise and have to bail. It's meant to be the thing you fall back on when finesse fails, and sometimes it just fails.

<figure>
  <video controls loop muted playsinline>
    <source src="./exploit-barrage-fail.mp4" type="video/mp4" />
    <a href="./exploit-barrage-fail.mp4">exploit-barrage-fail.mp4</a>
  </video>
  <figcaption>A run that goes wrong: exploits exhausted, noise too high, time to bail.</figcaption>
</figure>

I'll admit I'm [stealing some juice from Star Castle](https://masto.hackers.town/@lmorchard/116880778548043503) here, which apparently lit up a few people's nostalgia circuits the moment they saw the screenshots.

The other weird bit was wiring up a Butterchurn (i.e. web-port Milkdrop) overlay as a way to [depict brain injury in a cyberdeck jockey](https://masto.hackers.town/@lmorchard/116887129462221814) who's been pushing their luck. There's a whole trove of [Milkdrop presets converted for Butterchurn](https://github.com/jberg/butterchurn-presets) to draw from, which is delightfully more raw material than I could ever use.

![A test harness in starnet, trying out Milkdrop / Butterchurn music visualizers as a way to depict brain injury in a cyberdeck jockey](https://cdn.masto.host/mastohackerstown/media_attachments/files/116/887/129/306/659/987/original/0fd853cf74537b99.png)

I still have no idea whether this game ever becomes a thing worth making noise about. But I'm having a genuinely good time hacking on an idea I've been carrying around for years.

## Twenty years of Disqus, gone

Not much fanfare on this one, but it felt overdue: after almost 20 years, I [finally switched my blog comments away from Disqus](https://masto.hackers.town/@lmorchard/116875431657598358). I'm running [remark42](https://blog.lmorchard.com/2026/07/05/w27/#comments) for now and we'll see how I like it.

The part I'm quietly pleased about is that I got the comments to [lazy-load only when they're scrolled into view](https://masto.hackers.town/@lmorchard/116875436382858423) and to follow theme changes along with the rest of the page. A [nice writeup on automatic remark42 theme-switching](https://hndrk.blog/comments-are-there/) did a lot of the heavy lifting there. Still on my wishlist: figuring out whether there's [any way to get remark42 talking to indielogin.com](https://masto.hackers.town/@lmorchard/116875447236422858) for authentication. If anyone's done that, I'm all ears.

## Minnaloushe makes parole

Last week Minnaloushe was in cat jail, behind a tall gate in my office while we rebooted the introduction process. Good news: he [might be getting out this week](https://masto.hackers.town/@lmorchard/116875570677609551). He's clearly had a horrible time of it.

![A black cat with green eyes relaxes in a cat bed, dangling its front paws over the edge.](https://cdn.masto.host/mastohackerstown/media_attachments/files/116/875/790/608/689/915/original/dcd26c8b272f60a1.jpg)

In adjacent cat-and-machine news: I told Miss Biscuits she's pretty and incredibly treasured, and [Gemini on my phone overheard](https://masto.hackers.town/@lmorchard/116864692778423347) and said "that's incredibly sweet of you to say and I'm glad to be here with you." So, you know, maybe Skynet will go easy on me.

## Miscellanea

<div class="weeknote-miscellanea">

* I printed [a little charging dock for my Anbernic RG35XXSP](https://masto.hackers.town/@lmorchard/116894157260109707), which even has a micro-HDMI-to-HDMI adapter built in for the day I feel masochistic enough to use the thing as a console. The [Printables model](https://www.printables.com/model/1412822-anbernic-rg35xxsp-dock-usb-c-hdmi/) has space in the base for metal weights so it doesn't topple over. #gamedad
* The raccoon is back. [We thought we'd been forsaken](https://masto.hackers.town/@lmorchard/116880163397827126) after nearly a month, but no, they've returned and they are hungry for lily pad and electrical cords.
* A cluster of "the AI bill is coming due" reading this week: [The AI Hype Reckoning Is Upon Us](https://karlbode.com/the-ai-hype-reckoning-is-upon-us/) on the chasm between useful automation and technofascist hucksterism, [Ford rehiring human engineers](https://www.bbc.com/news/articles/cgrkd41n2v9o?ref=karlbode.com) after AI failed the quality checks ("Mistakenly, we thought that by just introducing artificial intelligence... that would produce a high-quality product"), and [Zuckerberg 'admitting' Meta's layoffs were ineffective](https://eshumarneedi.com/2026/07/03/zuckerberg-admits-metas-layoffs-were.html). Someone on Mastodon also passed around a Futurism headline about [execs being horrified by their huge AI bills](https://masto.hackers.town/@cypnk/116891029640761359) after assuming they could replace workers for free, which, hah.
* Two on the state of gaming as a business: [The console wars have been lost](https://xeiaso.net/notes/2026/console-wars-lost/) (Valve winning by doing nothing while everyone else shoots themselves in the head) and [World historic amounts of gamedev talent thrown out to rot](https://blog.lauramichet.com/world-historic-amounts-of-gamedev-talent-thrown-out-to-rot/), which is a genuinely sad read about hemorrhaging not just people but the trust and momentum that make good teams.
* [What does Jeff Bezos think is going to happen?](https://reprog.wordpress.com/2026/07/05/what-does-jeff-bezos-think-is-going-to-happen/) on the logic of DRM'd Kindle books eventually just pushing people to pirate the things they've already paid for.
* Apple shipped a [Safari MCP server for web developers](https://webkit.org/blog/18136/introducing-the-safari-mcp-server-for-web-developers/), which lets an agent see how your code actually renders in the browser.
* The EFF wrote a nice reminder that [RSS is one of the tools you've been looking for](https://www.eff.org/deeplinks/2026/06/hate-algorithm-rss-one-tools-youve-been-looking) if you hate "the algorithm."
* A small, sharp piece of advice: [leave a failing test before you go on vacation](https://freek.dev/3156-leave-a-failing-test-before-you-go-on-vacation) so future-you has somewhere obvious to pick back up.
* [The Tragedy of the Engineering Commons](https://ianreppel.org/the-tragedy-of-the-engineering-commons/): "The surest way to ruin an engineering team is to believe it will survive whatever you do to it."
* Self-hosted-music links from the byom rabbit hole: [Psysonic](https://www.psysonic.de/) (a Winamp-inspired Navidrome desktop client), [gonic](https://github.com/sentriz/gonic), [smolsonic](https://github.com/tsirysndr/smolsonic), [LMS](https://github.com/epoupon/lms), and [Funkwhale's Subsonic support](https://docs.funkwhale.audio/user/subsonic/index.html).
* Conan O'Brien [surprising Jordan Schlansky with Geddy Lee](https://www.youtube.com/watch?v=tzs7901FSzY) so he can interrogate the man about a specific mastering of "Tom Sawyer" is exactly the kind of nonsense I needed.
* Podcast-wise it was a good week for retro and sci-fi: the Retro Hour on the [Commodore 64 as a cultural icon](https://pocketcasts.com/podcast/f025c170-ae7d-013b-f3af-0acc26574db2), the STARLOG Podcast talking [science and storytelling with Dr. Erin Macdonald](https://pocketcasts.com/podcast/c32c37c0-5206-013f-1f83-0e98e27f20d9), Aftermath Hours on the slow death of [physical media](https://pocketcasts.com/podcast/16283670-9d16-013c-74fe-027201e7e97f), and Never Post on ["inheritance posting"](https://pocketcasts.com/podcast/bb3ac9f0-728c-013c-dc63-0e76ec147af9) as a new kind of grief.
* Songs that were stuck in my head, for the record: Parralox's [cover of "Sirius / Eye in the Sky"](https://www.youtube.com/watch?v=GTrndr1gqdc), INSOC's ["it all seems so stupid, it makes me want to give up"](https://www.youtube.com/watch?v=fBXGfHuMtMA), and, right before bed, ["MEOW" by Anamanaguchi](https://www.youtube.com/watch?v=vc3JWo2iiGc).

</div>

None of this was especially planned. A dead Spotify playlist cap turned into two new repos, a game about breaking into computers grew a way to render brain damage, and my blog quietly shed a service it had carried since roughly the Bush administration. That's about the right ratio of accident to intent for a good week around here.
