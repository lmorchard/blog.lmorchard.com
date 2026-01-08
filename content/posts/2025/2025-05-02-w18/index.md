---
title: 2025 Week 18
tags:
  - crocs
  - 3dprinting
  - meshtastic
  - metablogging
  - windows
  - weeknotes
---

**TL;DR**: This week, I messed around with Meshtastic firmware on Bazzite, printed some goofy charms for my new Crocs, and ruminated about backfilling my blog. Also, some thoughts on GitHub Pages, moats in AI IDEs, and frustration with platform lock-in—especially from Apple.

<!--more-->

<figure class="wide">
  <img src="./cover.png">
  <figcaption>Another AI image, yeah. Did a decent job of mashing crap together though. Also, I kinda used to look like that, before the greyening.</figcaption>
</figure>

## Miscellanea

<div class="weeknote-miscellanea">

- I'm a blumberjack and I'm okay!
- Flashing new firmware to my Meshtastic nodes [from the CLI](https://meshtastic.org/docs/getting-started/flashing-firmware/esp32/cli-script/) using [Bazzite Linux](https://bazzite.gg/) (a Fedora Silverblue descendant) required me to first create a new Distrobox container with the needful python environment for Meshtastic and [esptool](https://github.com/espressif/esptool). Then, I needed to figure out [how to access a USB serial device in a container](https://blog.christophersmart.com/2020/04/18/accessing-usb-serial-devices-in-fedora-silverblue/)
- Cory Doctorow [says Google made a pretty good HoTMaiL clone](https://pca.st/episode/8bd75bc6-0472-4644-8476-4a8eb89e4a2e) in an overall righteous rant about the current era of enshittification and what maybe the world might do about it since the US has gone mad with tariffs.

</div>

---
I bought my first pair of Crocs as house shoes, in part because I realized [I could 3D print decorative nonsense for them](https://www.printables.com/@lmorchard_1445643/collections/2310571). So far, I've printed [pumpkins](https://www.printables.com/model/1023331-pumpkin-croc-charms) and [mounting posts for Cherry MX key caps](https://www.printables.com/model/156763-croc-charm-for-mx-keycaps).

<image-gallery>

![[index-prusa-slicer-pumpkins.png]]
![[IMG_8440.jpeg]]
![[IMG_8443.jpeg]]
![[IMG_8444.jpeg]]
![[IMG_8446.jpeg]]
![[IMG_8449.jpeg]]

</image-gallery>

---

Simon Willison, [Backfill your blog](https://simonwillison.net/2025/Apr/25/backfill-your-blog/):

> Fun fact: there's no rule that says you can't create a new blog today and backfill (and backdate) it with your writing from other platforms or sources, even going back many years.

🤔 I keep thinking of my blog as an immutable, write-forward log. I shouldn't. While I think I would like to maintain [cool URIs that don't change](https://www.w3.org/Provider/Style/URI), nothing's keeping me from revising things or letting grab-bag entries like these weeknotes bud off into independent new entries even after publishing.

---

Simon Willison (again), [Giving software away for free]:

> If you want to create completely **free software** for other people to use, the absolute best delivery mechanism right now is static HTML and JavaScript served from a free web host with an established reputation.
> ...
> My top choice for this kind of thing in 2025 is GitHub, using GitHub Pages. It's free for public repositories and I haven't seen GitHub break a working URL that they have hosted in the 17+ years since they first launched.

This is the page I've been on for years, too. Even though I chafe a *little* at relying on GitHub Pages out of principle, I absolutely do use it. When I set up [my new sketches-v03 repo](https://github.com/lmorchard/sketches-v03) last week, it took me about 10 minutes of fumbling to get it building & publishing to Pages via Actions.

It's almost pragmatically too good & easy not to use GitHub Pages - where, as Simon notes, "right now" is defined as "nearly the past 2 decades". That said, you may notice I host my blog on Amazon S3 under my own personal domain name. My blog is older than GitHub and I'd like it to outlive GitHub, if at all possible. If something really matters, I'll at least move it off GitHub's domain. But otherwise, software delivered via static assets to a web browser is an amazingly powerful model that folks could afford to explore more.

- - -

Graeme Fulton, "[Vibe Coding: Cursor, Windsurf, and Developer Slot Machines](https://prototypr.io/note/vibe-coding-cursor-windsurf-slot-machine)":

>AI IDEs need moats
>
>As I perviously mentioned, there's [no friction to switching IDEs](https://prototypr.io/post/ai-editor-aider-cursor) - it's like picking up another pen. Chris put it another way - AI IDEs need a moat:
>
>VS Code eliminated the switching cost for AI IDEs. They need to build moats to survive. Partnering with software vendors and new open source projects could help.
>
>You can even use them at the same time! Windsurf, Cursor, and all the other VS Code forks can open the same workspace files, and you can drag tabs between each of them, as if they're the same program:
>
>Until one of these IDEs builds a real moat, something more than just interface changes, or temporary LLM edge, devs will probably keep hopping between IDEs. For me as a user that's fine, but it makes me wonder where it's all going - does it all just lead back to VS Code?

I've been hearing a lot about moats lately. In recent times, a lot of moats are built at my expense. Apple's moat, for example, leaves me unable to buy a book for my Kindle from my iPhone. I've gotten really tired of that sort of thing, which is part of why this will be my first and last iPhone.

What would be the moat for an LLM-powered IDE? A language I can only write or compile or run with that IDE? That my code is all files on disk is a feature, not a bug. The first IDE that somehow tries to build an Apple-like moat around my work gets thrown into the river.

I'm tired of being viewed [as a Sim to be trapped in the swimming pool by deleting the ladder](https://www.polygon.com/2014/10/9/6951277/death-and-pool-ladders-in-the-sims-4).

But if not that kind of moat, then what? Models are converging on commodity. Better prompts? Better workflow? Better pricing? I guess I'm not creative enough to come up with that thing no one else could copy - because if I could, then it'd be *my* moat.

---

Rupert Goodwins for The Register, "[Windows isn't an OS, it's a bad habit that wants to become an addiction](https://www.theregister.com/2025/04/28/windows_opinion/)":

>Some love Windows, some tolerate it because it interfaces with people who cut checks, some just have to use single-platform applications. Many have jumped ship to macOS or Linux. Some have burned out and live on riverboats with solar panels writing retro 6502 games on an original Commodore 64.

You know, shopping for a riverboat does sound like a good time. 🤔
