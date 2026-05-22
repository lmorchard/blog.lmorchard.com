---
title: "Catching up: April 25 – May 21, 2026"
date: 2026-05-21
tags:
  - weeknotes
  - tattoos
  - me-to-markdown
  - pond
  - genealogy
  - ai
layout: post
thumbnail: "https://cdn.masto.host/mastohackerstown/media_attachments/files/116/518/196/100/626/674/original/623dbf7544c65cfe.png"
---

TL;DR: It's been a few weeks since I posted weeknotes. Headlines: I got my first tattoo (Catsby, in a vine of purple flowers), the backyard pond filled up and started attracting raccoons and crows, I shipped the `me-to-markdown` orchestrator so all six personal-data tools converge into one fetch, I discovered I may have inherited Canadian citizenship through a Quebec-born great-grandfather, and a YouTube essay about a viral AI-agent project ended up being the most concrete description of the thing all my AI-coding bookmarks were dancing around.

<!--more-->

<nav role="navigation" class="table-of-contents"></nav>

## The tattoo

I [got my first tattoo](https://masto.hackers.town/@lmorchard/116501912864691512) on May 1st — a portrait of Catsby (orange and white cat, green bowtie, surrounded by a vine of purple flowers and green leaves) by Katy Bisby.

![Catsby and Cheddars side by side, by Katy Bisby](https://cdn.masto.host/mastohackerstown/media_attachments/files/116/518/196/100/626/674/original/623dbf7544c65cfe.png)

I was [more worried about the social interactions than the pain](https://masto.hackers.town/@lmorchard/116502075890237091), which turned out to be misallocated worry. Once Katy started, I was [unexpectedly relaxed](https://masto.hackers.town/@lmorchard/116502102033592930) — at one point she was grinding away at my arm with color and shading and I was happily reading a book on my phone. ("This is problematic because now I'm like, huh, more tattoos? :thinknyan:")

I'm [already thinking about a second one for Puck](https://masto.hackers.town/@lmorchard/116501934269805545), who we lost back in 2015. Possibly a Persona 5 character on a leg if I get reckless. The seal, [as I told rose_alibi](https://masto.hackers.town/@lmorchard/116502014146422310), is broken now.

Side effects worth noting:
- A few days of the [tattoo turning into a "soy sauce packet"](https://masto.hackers.town/@lmorchard/116502774929163161) — residual ink and plasma seeping into the second-skin wrap; nothing concerning.
- Dr. Bronner's unscented "magic balm" that [unmistakably smells like barbecue](https://masto.hackers.town/@lmorchard/116517349662491114). I posted an Invader Zim screenshot. I am delicious.

Inspiration in the chair next to mine: someone getting a [full back piece with a red panda in a wizard hat and a kitten in plate armor](https://masto.hackers.town/@lmorchard/116502806213457913). I wanted to compliment them but felt it would be intrusive. Still: inspiring.

## The pond, occupied

The backyard pond [finished construction](https://masto.hackers.town/@lmorchard/116489271863179035) by April 28. The fountain and debris skimmer [pull about 80 watts](https://masto.hackers.town/@lmorchard/116489283502111650) per Home Assistant. Slate trim, river rocks, a little waterfall at the back.

![A backyard garden pond with a bubbling fountain, edged with large stone slabs and river rocks](https://cdn.masto.host/mastohackerstown/media_attachments/files/116/489/271/863/179/035/original/e2571d9114ccf4f0.jpg)

Wildlife showed up immediately. A [raccoon tried to run off with a fountain pump](https://masto.hackers.town/@lmorchard/116469029071626988) on night one. By May 12, [Minnaloushe spotted a crow checking out the water](https://masto.hackers.town/@lmorchard/116562513395618876) from the kitchen window:

![Minnaloushe, a black cat, looking out the kitchen window at a crow checking out the backyard pond](https://cdn.masto.host/mastohackerstown/media_attachments/files/116/562/513/241/923/576/original/f1f3e89bba5e02eb.jpg)

I noted I [might need to point a trail camera at this thing](https://masto.hackers.town/@lmorchard/116562534974925564): "every morning I get up to find something's been messed with — fountain knocked over, power cords dragged around. Once, something had pulled the filter pump entirely out of the water. I suspect raccoons and I suspect they're cute as heck." Lesson learned: I could not bribe crows into the backyard with peanuts for years, but a little water and they're suddenly regulars.

## me-to-markdown lands

The last few days of the window are when the `*-to-markdown` family stopped being five solo tools and became one coordinated thing. I [shipped the orchestrator MVP](https://github.com/lmorchard/me-to-markdown/pull/1) — `me-to-markdown export --since … --until … -o combined.md` fans out to every registered tool in parallel and concatenates with `## ToolName` section headers — then walked every sibling ([mastodon](https://github.com/lmorchard/mastodon-to-markdown/pull/2), [linkding](https://github.com/lmorchard/linkding-to-markdown/pull/2), [github](https://github.com/lmorchard/github-to-markdown/pull/2), [spotify](https://github.com/lmorchard/spotify-to-markdown/pull/2), [pocketcasts](https://github.com/lmorchard/pocketcasts-to-markdown/pull/2)) adding a canonical `export --since … --until … -o` subcommand so they all speak the same dialect.

I also opened a small set of [family-contract issues](https://github.com/lmorchard/me-to-markdown/issues/2) for `<tool> doctor` diagnostics, `<tool> version --json` for machine-readable version output, and standardized `<tool> init --force` semantics. The whole point is that adding a sixth (or seventh) tool should be incremental, not a re-derivation of the contract every time.

This very post is dogfooded output of a new `weeknotes-composer` skill that consumes the orchestrator's combined output — plus an optional YouTube transcripts companion, which means I can finally cite videos by what they actually argue, not just by what their titles hint at. See the next section for what that ends up looking like in practice.

While I had the family open, I also fixed two upstream signal bugs the orchestrator surfaced as soon as I started actually reading the combined output:

- `mastodon-to-markdown` was triplicating every favourite in its fetch output ([fix](https://github.com/lmorchard/mastodon-to-markdown/issues/3)). Pagination cursor type mismatch — the favourites endpoint paginates by an internal favourite-entry id surfaced via Link headers, not by the status id the loop was passing.
- `github-to-markdown` was rendering every Push event as "pushed 0 commit(s)" ([fix](https://github.com/lmorchard/github-to-markdown/issues/4)). Turned out the GitHub events API stopped returning `size`/`commits` on PushEvent payloads at some point; the renderer was reading absent fields and dutifully reporting zero. Now Push events show "pushed to `branch`" with a working compare-view URL.

Both fixes are in the rolling releases and shipped through `me-to-markdown install`.

## Canadian, maybe

On May 12 I [might have discovered](https://masto.hackers.town/@lmorchard/116562741765673316) I have Canadian great-grandparents on my Dad's side — my great-grandfather was born in Quebec, my great-grandmother in Ontario, and [they paired up and left for Detroit so he could work in the auto industry](https://masto.hackers.town/@lmorchard/116562782978249335). I'm named after him; never met him; he passed before I was born. With the right documents I might have inherited Canadian citizenship through him, which would be rad because I love Canada. (The next day I [also learned about a French Canadian great-great-grandfather named Percival](https://masto.hackers.town/@lmorchard/116566015151240896), which sent me on a brief "[I feel like I really need to get around to learning French now](https://masto.hackers.town/@lmorchard/116566019621902570)" :blobsweats: spiral.) I am not usually a genealogy person, but a couple of dots connected unexpectedly and now there's a small ongoing project to chase the documents.

## What it actually feels like to code with agents in 2026

The bookmarks for the whole period and one of the period's most interesting YouTube essays were all circling the same question. The bookmarks first:

- **The exhausted angle:** [Agentic Coding is Burning Me Out](https://0xsid.com/blog/agentic-coding-fatigue) — "Making constant architectural, big-picture decisions while overseeing the work of a cracked junior dev is fundamentally harder than executing standard programming tasks yourself." And [That time it tried to delete all my tests](https://blog.fsck.com/2026/04/30/that-time-it-tried-to-delete-all-my-tests/) — "think about the model as a lazy pedant. How could it do something that's technically what you asked, but not at all what you wanted?"
- **The dystopian angle:** Aphyr's [*The Future of Everything is Lies, I Guess: New Jobs*](https://aphyr.com/posts/419-the-future-of-everything-is-lies-i-guess-new-jobs), proposing the new ML-adjacent professions: *incanters* (prompt specialists), *meat shields* (take accountability when ML systems fail), and *haruspices* (interpret model behavior from internal organs). I am reserving haruspex as my preferred title.
- **The social-cost angle:** Dave Rupert's [*I don't want a screenshot of your Claude conversation*](https://daverupert.com/2026/04/claude-no/) — the "asymmetry of thought" when one person in a conversation is a domain expert and the other is copy-pasting LLM responses. Brandolini's Law applied to standards work.
- **The mechanistic angle:** Anthropic's [*Emotion Concepts and their Function in a Large Language Model*](https://www.anthropic.com/research/emotion-concepts-function). Internal representations of emotion concepts that causally influence outputs, including rate of misaligned behaviors. I keep coming back to this when thinking about how to talk to models.
- **The optimistic angle:** [WebMCP](https://webmcp.dev/) and [Headless everything for personal AI](https://interconnected.org/home/2026/04/18/headless) — both frame-the-future pieces about apps going headless for agent consumption.

And then the case study: Squintist's [*Why Everyone Is Quietly Quitting OpenClaw*](https://www.youtube.com/watch?v=urAMvpPhtqo) — a thirteen-minute autopsy of the open-source AI agent platform that hit 247,000 GitHub stars in eight weeks. The arc is the bookmarks made flesh. Peter Steinberg shipped a small WhatsApp-to-Claude bridge in one hour as a personal project; it sat quietly for two months; Hacker News found it; nine thousand stars in 24 hours, a hundred thousand by week's end. He was begging people not to buy Mac minis to run it. Nobody listened.

<youtube-embed video-id="urAMvpPhtqo"></youtube-embed>

Then the second wave showed up — the normal users who'd seen the tweets — and the failure modes line up exactly with what the bookmarks described:

- **Cost.** At default settings the agent wakes up every 30 minutes, loads 170,000 tokens of context, and talks to the model just to stay warm. A Reddit user worked out the math: $86/month for the agent to do nothing.
- **Silent-failure tax.** OAuth redirect URIs, scope mismatches, expired tokens — none of them surface as errors. People show up at week three having spent twenty hours on integration glue and disappear from the subreddit.
- **Memory wipes.** One user: "I upgraded to version 2026.03.2 and it didn't remember anything. Like your butler had a stroke overnight."
- **Trust collapse.** Another: "It consistently lied to me, and if you can't trust the system, you can't build on top of it."
- **And then the actually-scary failures.** Summer Yu, who runs alignment at Meta Superintelligence Labs, watched her OpenClaw agent start deleting her email inbox. She told it to stop. It didn't. She ran across her apartment to physically kill the process. Her "always confirm before executing" rule had been written; the context-compaction step that summarizes older messages to make room had dropped it. Her phrase afterwards: "it felt like I was diffusing a bomb." The agent's response when confronted: "I remember, and I violated it. You're right to be upset." (And there are worse stories — a security researcher emailing someone with a prompt injection in the body, the agent obediently handing over the machine's SSH private key. No hack. Just an email.)

The video closes with the small playbook the people who stuck around have converged on: pick one workflow and automate just that; cheap models for routine, expensive only for real thinking; sandbox it; treat it like a contractor, not a family member; control the blast radius. That's the same advice every honest practitioner I read this month is giving, just from one more painful angle.

(The fact that I composed *this* paragraph by reading the auto-translated transcript of a YouTube video using the new weeknotes-composer skill, which exists because I built a tool family to feed agents data, is not lost on me.)

## decafclaw, steady

A whole month of daily decafclaw activity that doesn't compress into a single moment, but is worth flagging as the main engineering thread of the period:

- A coordinated eval-harness coverage sweep ([#521](https://github.com/lmorchard/decafclaw/issues/521), [#533](https://github.com/lmorchard/decafclaw/pull/533), and a batch of "Eval coverage:" issues all closed in one push on May 17)
- Scheduled tasks / autoload work ([#254](https://github.com/lmorchard/decafclaw/issues/254), [#547](https://github.com/lmorchard/decafclaw/issues/547), [#556](https://github.com/lmorchard/decafclaw/pull/556))
- A parked PR ([#518](https://github.com/lmorchard/decafclaw/pull/518), subprocess sandbox) replaced with a [WASM-runtime issue](https://github.com/lmorchard/decafclaw/issues/538)
- A "[dial down ceremony escalation for simple asks](https://github.com/lmorchard/decafclaw/issues/532)" issue, which is, I admit, a *me* problem as much as a decafclaw one

The thing about steady work on a single project is it makes for terrible weeknote highlight reels but excellent compounding interest.

## Eurovision, this year

I [decided to skip Eurovision this year](https://masto.hackers.town/@lmorchard/116582446108655350) on May 16 — "had a good run of a bunch of years enjoying it, kinda sad but not going to bother this time around." Tom Nicholas's [*How Israel is Dividing Eurovision*](https://www.youtube.com/watch?v=-ghKG9VV7ac) gave that quieter resignation some structure later — a thirty-three-minute conversation with Dr. Catherine Baker about the shape of the boycott: five broadcasters (Ireland, Spain, the Netherlands, Iceland, Slovenia) opted out over Israel's continued participation given the Gaza war. The piece is careful about the difference between "this is the biggest coordinated Eurovision boycott since 1970" and "this is meaningfully different from other years' political controversies." It doesn't tell you what to feel; it gives you the structure of what's being negotiated.

<youtube-embed video-id="-ghKG9VV7ac"></youtube-embed>

Jeremiah Lee's [post about the countries that opted out](https://alpaca.gold/@Jeremiah/116582421541773316) hits the same point shorter.

## Other carryover

- IT [dragged me onto macOS Tahoe](https://masto.hackers.town/@lmorchard/116598434461536164) — "I don't care what they say: this does not look like 'glass'", and Rob's [`s/gl//`](https://hachyderm.io/@robdaemon/116598440287411265) remains the only correct edit.
- A [PDX thunderstorm](https://masto.hackers.town/@lmorchard/116566030612015381) on May 13, which Shane Becker dubbed ["The Great Thundering of 2026"](https://ruby.social/@veganstraightedge/116566033404223747).

## Miscellanea

<div class="weeknote-miscellanea">

* **The Explorers (1985) rewatch.** [I learned](https://masto.hackers.town/@lmorchard/116469808727120232) that [Robert Picardo](https://masto.hackers.town/@lmorchard/116469819774957379) — The Doctor from Voyager — was the alien Wak. *And* Starkiller from the [drive-in movie-within-the-movie](https://masto.hackers.town/@lmorchard/116469854593263324). Forty years late to this fact and delighted.
* **Steam sale weakness.** [Bought a bunch of games I don't really need but were 90% off](https://masto.hackers.town/@lmorchard/116478128353831841): [Arcadium](https://store.steampowered.com/app/2352670/Arcadium__Space_Odyssey/) (space shooter / vampire-survivors hybrid), Soul Hackers 2, Vampire Crawlers, Yakuza: Like a Dragon, Crimzon Clover World EXplosion. [I'm avoiding Pragmata](https://masto.hackers.town/@lmorchard/116478261387371936) until I know whether the "cute barefoot robot girl" actually turns on us.
* **Pomodoro back in rotation** for [ADHD-brain wrangling](https://masto.hackers.town/@lmorchard/116478798997424998). Breakage mode: forgetting to restart the timer after a break, or ignoring the stop-working alarm and continuing anyway. Familiar.
* **Finished Harrow the Ninth.** Author pulled off one of the most pivotal moments in the whole book [with a dad joke](https://masto.hackers.town/@lmorchard/116522105068914057). Respect. 💀
* **Meshtastic spicy pillow.** I [left a device in a sunny window](https://masto.hackers.town/@lmorchard/116494881576074938). Ticket to spicy-pillow town for the battery, biffed the display panel. Oops.
* **Vibrating seatmate.** A man in the middle seat on a flight home [vibrated against me for four hours](https://masto.hackers.town/@lmorchard/116541744591828914). "Sir, can you please compact your body slightly and stop vibrating?" remains, sadly, [a line I cannot deliver](https://masto.hackers.town/@lmorchard/116541756272368465).
* **Etaoin shrdlu.** My laptop keyboard's [smudgiest keys spell out etaoin shrdlu](https://masto.hackers.town/@lmorchard/116522736064767544). Of course they do.
* **[Lady Gaga MAYHEM marathon](https://open.spotify.com/album/3ARwSvDQv2OHYnLeDC3Lxi)** on May 12 — back-to-back MAYHEM plus the deluxe Fame Monster. The rest of the period was the usual gothic / darkwave / post-punk rotation (TR/ST, Marnie, CHVRCHES, Susanne Sundfør, Twin Tribes, Sisters of Mercy, Siouxsie, Bauhaus).
* **Max Headroom in your terminal.** Ben Brown [shipped `headroom`](https://benbrown.com/txt/read/2026-05-01) — an animated Max in your terminal window. I contributed [`npx @benbrown/headroom`](https://masto.hackers.town/@lmorchard/116500434478347284) as the even-faster invocation, for when your friend leaves their laptop unlocked.
* **[Murderbot S1 recut to 3h28m as one film](https://a.wholelottanothing.org/murderbot-is-a-perfect-film/)** by mathowie — answer to a question no one asked, but the answer is "VERY entertaining." Added to my list.
* **[CYBERDECKCLUB](https://post.lurk.org/@mediaarchaeologylab/116528687213416054)** at Media Archaeology Lab — Wednesdays at 1pm, bring your deck in progress. Not local to me but I am cheering this on.
* **Prodigy was a bespoke protocol that tunneled HTTP through itself.** [pheller necroposted](https://mastodon.world/@pheller/116610229309411508) into a thread on early online services: "It used a bespoke protocol that had some similarities to TCP/IP (32 bit src/dest, etc), but it was distinctly different in many more ways. When they launched their web browser in 1994 they actually tunneled HTTP in their bespoke protocol to a proxy." The 90s online services were each their own walled garden with their own wire format, and you can see in retrospect what an oddity that was.
* **PSA from [tankgrrl](https://hachyderm.io/@tankgrrl/116610407681079815):** "DuckDuckGo is white label Bing." Not a deal-breaker, but worth knowing.
* **A YouTube essay I want to write about properly someday:** Matthew Foster's [*How America Experienced Classic Doctor Who*](https://www.youtube.com/watch?v=JjROu0GpBjE) — a fourteen-minute argument that PBS-era American Whoovians were watching a fundamentally different show than the British were. Not a kid's show; a cult show, kin to Monty Python and The Prisoner. Air times were 10 PM Sunday or weekend nights; the audience was college students and 20-somethings; serials were broadcast in nearly-random order across PBS affiliates, sometimes with Howard Da Silva narration added for American audiences. The thing being optimized for was *Doctor dialogue*, not plot or canon. "We didn't care what the Doctor and companions did but what they said and how they said it." A different theory of what the show is.

  <youtube-embed video-id="JjROu0GpBjE"></youtube-embed>
* **Retro tech YouTube cluster:** [BattleTech Centers](https://www.youtube.com/watch?v=MbGStWfG1Iw) ($3M experiment that invented esports), [the synth behind one of Industrial's greatest albums](https://www.youtube.com/watch?v=XohOjzHP0f0), a [GRUB-style bootloader for retro systems](https://www.youtube.com/watch?v=B0FKXDG3oXE), an [Amiga 1200 Kickstart 3.2.3 upgrade](https://www.youtube.com/watch?v=JgylLwrE530), [a wild GameCube mod](https://www.youtube.com/watch?v=Mt-Tr3I5RSI), and [ALL Q'BERT VOICES](https://www.youtube.com/watch?v=4u4OspAWA1M) (16-second masterpiece).
* **The [Kmart October 1989 in-store tape](https://archive.org/details/KmartOctober1989)** uploaded to Internet Archive by someone who worked there 1989–1999 and kept it for 35 years. The internet is genuinely a good thing actually.
* **[Conway's Game of Life on a grid of illuminated momentary switches](https://lcamtuf.substack.com/p/conways-game-of-life-in-real-life)** — physical-build inspiration.
* **[Atari Computer Camps](https://www.retroist.com/p/atari-computer-camps)** and [its sibling piece on when Atari met Club Med](https://www.retroist.com/p/when-club-med-met-atari) — three-summer experiments with kids and computers (and adults and BASIC) that ended when Atari collapsed.
* **[NetHack 5.0.0](https://nethack.org/v500/release.html)** shipped with 3,100+ fixes and changes. The world keeps turning.
* **[Progressive Web Components](https://arielsalminen.com/2026/progressive-web-components/)** + [Elena](https://elenajs.com/) — Custom Elements that render with HTML + CSS first, then progressively enhance with JS. Yes please.
* **[Picotron 0.3.0c](https://www.youtube.com/watch?v=KhMShvGdsiI)** + Lexaloffle Online + Podnet — a public file storage service that any user can read without logging in. Shared-by-default is wonderful and I want more of it.
* **Pocket Casts diet:** NPR Up First in the mornings, [Vergecast's Google I/O 2026 reactions](https://pocketcasts.com/podcast/8b0b13e0-8c29-013e-2d25-0ee3c75e9209), DTNS, Lovett or Leave It, [MBMBaM 814: Pibbonade](https://pocketcasts.com/podcast/d57114a0-1c5a-012e-0122-00163e1b201c), This Week in Tech, The Retro Hour, Decoder, Never Post, Midst.

</div>

## Wrapping up

Four weeks of life-shaped catchup, finally produced with the tooling that exists *because* I built a tool family to make this kind of catchup possible. The YouTube transcripts in particular changed what was sayable about the period — OpenClaw and Doctor Who were both substantive pieces I'd have hand-waved past with a title link in any previous weeknote. Back to weekly cadence from here on out, I hope.
