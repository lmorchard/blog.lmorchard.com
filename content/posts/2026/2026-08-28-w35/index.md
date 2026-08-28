---
title: "Sandboxes, synth-pop, and the Finger daemon (Catching up: August 7 – August 28)"
date: 2026-08-28
thumbnail: "https://cdn.masto.host/mastohackerstown/media_attachments/files/117/130/193/195/491/929/original/bed1dc3e1d3fe355.jpg"
tags:
  - weeknotes
  - agents
  - decafclaw
  - cats
  - music
layout: post
---

TL;DR: Catching up on three weeks of heavy agent development, fighting with sandboxing and UI polish in `decafclaw`, going deep on synth-pop and prog metal, and spending far too much time looking at retro AMC cars and Tamagotchis on Mastodon. Also, the cats are still ruling the house.

<!--more-->

<nav role="navigation" class="table-of-contents"></nav>

## Agent Sandboxing and Zero-Friction Loops

It's been a busy few weeks in the `decafclaw` and `agent-sessions` mines. A lot of the work has been invisible but critical: locking down security boundaries around skill execution. I fixed several vulnerabilities where trusted schedules could accidentally execute agent-authored code, which is exactly the kind of thing you want to catch *before* it becomes a problem. 

On the quality-of-life side, I landed autocomplete for commands and resources in the web composer, and fixed up the WebSocket reconnect logic so the UI doesn't just quietly die when it loses connection. I also completely rewrote the bash driver for `agent-sessions` into Python (`agent_session_driver.py`) to kill the process fork/exec overhead. The loop is now "zero-friction" and handles unfenced Markdown narratives without choking. 

There's still a mountain of architectural work logged — OpenTelemetry tracing, reactive TUIs, decoupling LLM layers — but the foundation is feeling significantly more solid.

## 10 PRINT Backgrounds and Infrastructure

I've also been doing some infrastructure tinkering on the blog. I [ported a classic BASIC maze generator](https://masto.hackers.town/@lmorchard/117124910950607264) (`10 PRINT CHR$(205.5+RND(1)); : GOTO 10`) into a modern website background for lmorchard.com, which gives the site a unique, shifting maze-like design every time you reload it.

![Abstract dark background with a subtle, maze-like pattern of thin grey geometric lines.](https://cdn.masto.host/mastohackerstown/media_attachments/files/117/124/910/812/278/986/original/c656e8f9a8ca164d.png)

Alongside that aesthetic update, I'm thinking about migrating the domain off the current AWS Cloudfront/S3 setup. Moving to an inexpensive cloud VM with config stored in a private git repo would let me support more dynamic features — like running my own `#finger` server via `crossed-fingers`, auto-publishing `.plan` files straight from GitHub.
## Building a Fediverse Oracle

I also fell down a massive rabbit hole this week building a Fediverse ActivityPub bot from scratch in a single day. The premise of [fediverse-oracle](https://github.com/lmorchard/fediverse-oracle) is a state machine that facilitates users answering each other's queued questions via direct messages.

The real fun, of course, was in the ActivityPub protocol quirks. I spent an inordinate amount of time fighting with Fastify to serve `.well-known` webfinger endpoints properly (it required an `onRequest` hook for static path rewriting so the dotfiles would resolve). Then I had to track down 401 errors caused by `keyId` assignment during outbox signing, and appease GoToSocial's incredibly strict parser requirements (it turns out it really wants the original Follow URI on Accept, not the full object). But it works, HTTP signatures are enforced, and it's running natively on Node.

## Persona 5 Inception

Tonight's nerdy-ass activity involved taking advantage of the Steam sale to buy Persona 5 Royale for PC (for the third time). I already had over 40 hours into it on my Switch, but since the Switch is jailbroken, I was able to back up my save files. Believe it or not, the Switch saves are fully compatible with the PC version! I copied the files over and seamlessly picked up my 40-hour save on the desktop. 

But it gets better. The gaming PC lives down in the basement, running Sunshine so I can access it remotely with Moonlight. There happens to be a homebrew Moonlight client for the Switch. So naturally, I started [playing P5R again on my Switch, via Moonlight, streamed from my gaming PC in the basement](https://masto.hackers.town/@lmorchard/117080401657039451). Why not? It did occur to me that I could take this one step further by firing up a Switch emulator on the gaming PC, and playing my old backup copy of P5R via Moonlight on the real Switch. 

## Of Street Plums and Scientology

We have fruit trees lining the street around our house. Usually, we just let the late-summer fruit fall onto the sidewalk as a cleanup chore, or give a thumbs-up to furtive folks who come by with ladders to pick them. But this weekend, I [collected some street plums for a change](https://masto.hackers.town/@lmorchard/117112631849074083). I cleaned them, chopped them up, and threw them in a jar with sugar to try making a shrub. I might end up infusing some vodka or gin. 

![Three mason jars in a refrigerator, including one with yellow liquid and another with red, foamy liquid.](https://cdn.masto.host/mastohackerstown/media_attachments/files/117/119/901/685/914/870/original/2b194fb147325c96.jpg)

In weirder news, the Church of Scientology [started sending me mail out of the blue](https://masto.hackers.town/@lmorchard/117078913847645230). I haven't had contact with them since about 1995 in Michigan, so my new therapist will definitely have to answer for this.

![A handwritten note and brochures from the Church of Scientology, including recruitment flyers and information about Dianetics.](https://cdn.masto.host/mastohackerstown/media_attachments/files/117/078/913/672/508/960/original/891a01f1b7d229e6.jpg)

## Cats and Tamagotchis

The cats continue to feature heavily in the daily routine. Minnaloushe (the Hunk) and Cosmo are doing their usual routines of sprawling on my desk and making it generally difficult to get anything done. I [posted a few photos](https://masto.hackers.town/@lmorchard/117130193195491929) of them taking over the fluffy grey cat beds and wooden windowsills. 

<image-gallery>

![A white and orange cat with green eyes and a teal bow tie lies comfortably in a fluffy grey cat bed.](https://cdn.masto.host/mastohackerstown/media_attachments/files/117/130/193/195/491/929/original/bed1dc3e1d3fe355.jpg)

![A black cat with a sparkly collar sleeps on a wooden windowsill, looking out a screen window at green foliage.](https://cdn.masto.host/mastohackerstown/media_attachments/files/117/130/222/558/514/994/original/83aac74de0e3be52.jpg)

![A black cat with green eyes rests in a gray fluffy pet bed on a wooden desk, wearing a star-patterned collar.](https://cdn.masto.host/mastohackerstown/media_attachments/files/117/158/838/954/154/040/original/5bd89e94d9e42baf.jpg)

</image-gallery>

I also [fell down a bit of a rabbit hole](https://masto.hackers.town/@lmorchard/117085150846696636) looking at teal transparent Tamagotchis and retro 1970s hatchbacks — specifically silver AMC Gremlin Xs with those ridiculous orange, pink, and yellow stripes. The aesthetic of the late 70s and early 80s remains undefeated.

That car rabbit hole spun out into [dreaming about EV conversions](https://masto.hackers.town/@lmorchard/117117932819711122). I don't have the disposable income for it, but I've been wishing for a Slate truck that I could cover in stickers like a laptop to take on 5-mile grocery runs. What I *really* want, though, is if I had infinite money, I'd pay someone to find me another pristine 1983 AMC Eagle Station Wagon (my first car, which had fake wood paneling and which I drove until a wheel literally fell off) and convert it to electric.

<image-gallery>

![A silver AMC Gremlin X, a 1970s hatchback with colorful orange, pink, and yellow stripes on its side.](https://cdn.masto.host/mastohackerstown/media_attachments/files/117/117/932/642/864/303/original/4508226128bbae15.png)

![A red 1980s AMC Eagle station wagon with woodgrain side panels and a roof rack, parked on a wooded area.](https://cdn.masto.host/mastohackerstown/media_attachments/files/117/118/482/758/564/136/original/2703b17e38d1de78.png)

</image-gallery>

## Heavy Rotation

The music rotation has been intense this month. It's been a heavy mix of Synth-pop, EBM, and Industrial. I've been spinning a lot of Front Line Assembly, VNV Nation, Clan of Xymox, and TR/ST. 

But I also had a concentrated back-to-back block of Dream Theater's "Metropolis, Pt. 2" and Mastodon's "Crack the Skye". There is something deeply satisfying about dropping into a massive progressive metal concept album while working on deeply abstract agent sandboxing logic.

## Miscellanea

<div class="weeknote-miscellanea">

* My automated Kindle sync ran last night, but [apparently](https://masto.hackers.town/@lmorchard/117170193195491929) I haven't highlighted a single thing. Time to get back to reading.
* I finally set up a minimal Finger daemon using [little-finger](https://git.andros.dev/andros/little-finger). You can now `finger me@lmorchard.com` and get an ASCII cow saying "Just setting up my finger!" (This was part of the whole push to move off S3 and onto an Apex cloud VM).
  
  ![Screenshot of a macOS terminal running finger me@lmorchard.com, displaying an ASCII cow](https://cdn.masto.host/mastohackerstown/media_attachments/files/117/152/892/270/615/600/original/2d9f3fa00ee8f443.png)
* [When online commenters 'detect' my art as AI](https://www.davidrevoy.com/article1164/when-online-commenters-detect-my-art-as-ai) - David Revoy makes a compelling point about the collateral damage of the AI witch hunts.
* [RIP Claude](https://randsinrepose.com/archives/rip-claude/) - Rands reflecting on what it means when almost every writing tool starts invisibly injecting text watermarks into your prose.
* [Astro's GitHub issue backlog is heading to zero](https://thenewstack.io/cloudflare-astro-triage-bot/) - A look at how Cloudflare's triage bot is actually keeping an open-source project above water.
* [Vibecoding isn't as fun as writing code by hand](https://www.autodidacts.io/vibecoding-isnt-as-fun-as-writing-code-by-hand/) - "Vibecoding is like being an executive of a large company that is barely under your control. You never feel like you really know what’s going on..." I feel this in my bones.
* [Why shaming people about AI slop isn’t enough to stop Big AI](https://www.anildash.com/2026/08/21/ai-slop-and-shame/) - Anil Dash with the spot-on take that individual shame isn't a substitute for structural regulation.
* [How I make my blog posts more resilient](https://michaelharley.net/posts/2026/08/05/how-i-make-my-blog-posts-more-resilient/) - Michael Harley noticing that the parts of his archives that survived 14 years were the parts he owned and kept simple.
* [The asteroid currently hitting frontend web development](https://nolanlawson.com/2026/08/23/the-asteroid-currently-hitting-frontend-web-development/) - Nolan Lawson observing how the advent of LLM coding tools is drastically lowering the cost of framework rewrites.
* [talk: the P2P chat from 1983 that a VPN brought back to life](https://en.andros.dev/blog/03a4ffb9/talk-the-p2p-chat-from-1983-that-a-vpn-brought-back-to-life/) - A wonderful bit of digital archaeology getting the old UNIX `talk` command working over modern networks.
* I've also been experimenting with [Mole](https://github.com/lajosdeme/mole), a deep-research agent that enforces budgets and verifies quotes with a privacy boundary for local data. It's a really interesting approach to the research agent problem.
* And for a quick hit of nostalgia, I bookmarked [romm](https://github.com/rommapp/romm), a self-hosted ROM manager and player that looks genuinely beautiful.
* And speaking of retro, [TERMinator](https://deadmodemsociety.com/terminator/) is a very cool modern BBS terminal emulator built for connecting to legacy systems over Telnet.
* I've also been reading Julian Jaynes's [*The Origin of Consciousness in the Breakdown of the Bicameral Mind*](https://masto.hackers.town/@lmorchard/117080615401297600), pondering the notion that human minds weren't always unified in introspective consciousness as they are now. It makes me wonder how much of us is natural brain hardware and how much is nurtured cultural software.
</div>

It's been a sprawling, fragmented few weeks, but the agent infrastructure is getting stronger, the reading list is full, and the cats are comfortable.