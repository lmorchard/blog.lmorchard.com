---
title: "Baking Easy-Blog Oven v2.0 with DecafClaw"
date: 2026-11-17 14:30:00 -0800
draft: false
type: entry
tags:
  - blogging
  - golang
  - decafclaw
  - projects
  - webdev
  - easy-blog-oven
---

**TL;DR**: After six years of brooding and Dependabot alert fatigue, I finally rebuilt my blog's static site generator in Go. Easy-Blog Oven v2.0 renders twenty-four years of Markdown into HTML in under three seconds, ditches `node_modules` entirely, and was built in an afternoon of flow pair-programming with DecafClaw, my homemade agent.

<!--more-->

<figure class="wide">

![Bread baking inside a glowing wood-fired stone oven](./yasin-onus-w-Ep34orfoA-unsplash-dithered.png)

<figcaption>Photo by <a href="https://unsplash.com/@yasinonus?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Yasin Onuş</a> on <a href="https://unsplash.com/photos/bread-baking-in-a-stone-oven-w-Ep34orfoA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></figcaption>

</figure>

<nav role="navigation" class="table-of-contents"></nav>

*This is Part 2 of a two-part retrospective. In [Part 1: Twenty-Four Years of Blog Engines](/2026/11/17/twenty-four-years-of-blog-engines/), I took a visual tour of nearly a quarter-century of personal publishing across Movable Type, Blosxom, WordPress, and Jekyll.*

## The Six-Year Itch

In [May 2020](/2020/05/24/easy-blog-oven/), I cobbled together my own custom Node.js static site generator called the [Easy-Blog Oven](/2020/05/25/diy-easy-blog-oven/). It wasn't an off-the-shelf framework like Hugo or 11ty; it was just a few hundred lines of JavaScript gluing together `marked`, `cheerio`, and ES6 template literals. I guess it was kind of a pandemic project? Anyway, it worked. It carried my blog for six years, through lots of posts, redesigns, and format experiments. 

But over time, the JavaScript ecosystem tax accumulated. Every time I wanted to tweak a template or run a build on a new machine, I was greeted by the familiar modern npm friction: dozens of transitive packages in `node_modules`, deprecation warnings, and an endless barrage of Dependabot security alerts (88 vulnerabilities at last count!). 

Furthermore, churning through twenty-four years of archive—over 1,400 posts dating back to February 2002—took around 7 to 8 seconds. That's not terrible, but it's just slow enough that local watch mode felt sluggish. And I know computers can be faster than that, these days.

I've been brooding over rewriting it for a while. Back in [October 2022](/2022/10/28/twitter/), I joked about whether I felt like rewriting my build system yet again. Then in [October 2025](/2025/10/25/miscellanea/), while hacking on Go utilities like [feedspool-go](https://github.com/lmorchard/feedspool-go), I dropped an ominous note:

> *I'm also really appreciating the built-in stuff like text/template, to the point that I'm now even eyeing up my Easy-Blog Oven and considering rewriting my blog's static site generator, currently implemented in node.js. (uh oh)*

Today, I finally pulled the trigger. Meet **Easy-Blog Oven v2.0**.

## Why Go? (And Why Not Rust?)

The immediate spark for this rewrite came on a whim while watching a YouTube video: ["Why Everyone's Rewriting Everything in Rust"](https://www.youtube.com/watch?v=iu_ALBDtoHo). Every programmer knows the itch—you watch twenty minutes of praise for memory safety and zero-cost abstractions, glance over at your aging Node.js build scripts, and think: *I should rewrite this in Rust tonight.* 

(Insert Boat Cat meme here.)

I actually pitched the Rust rewrite to DecafClaw at the start of a session as a sanity check. Like, what if we did it? Joking but, maybe not, if you're into it? The agent pushed back and talked me down from the ledge—but then it offered to one-shot the whole thing in go since [I'd just built a static site generator for linkding](/2026/11/01/linkding-ssg/) and that was fresh in memory. 

As I kept chatting, it sounded almost too easy a transition:

1. **`goquery` is basically `cheerio` for Go:** A massive chunk of my blog's post-processing involves parsing rendered Markdown, manipulating HTML nodes (extracting first headings, rewriting internal `#hashtag` links, adjusting image attributes, and styling code blocks). In Rust, mutating DOM trees across arbitrary node references is notoriously awkward. In Go, `goquery` let me port my existing DOM transforms almost 1:1.

2. **Instant compilation:** `go build` runs in the blink of an eye. There's zero compilation drag during development. Node gave me that, but not so much in Rust.

3. **The joy of the single binary:** One compiled binary with zero runtime dependencies. No Node runtime to install, no `npm install`, no virtualenvs, no shared libraries. Rust gave me that, but not so much in Node.

So, I said, go ahead. Let's try it. And away we went, more comprehensively and faster than I expected. I think I spent more time badgering the agent to build QA tools to compare old vs new builds to be sure nothing broke, than the build of the port took altogether.

## What v2.0 Buys Me

The results of the rewrite were immediately gratifying:

- **Speed:** All 1,414 historical posts (2002 to 2026) parse from Markdown in **1.35 seconds**. A full production build—generating thousands of HTML pages, 720 category/tag indexes, full-text RSS (`index.rss`), excerpt RSS (`index-excerpts.rss`), XML sitemaps, and JSON-LD structured data graphs—clocks in at **~2.5 seconds**.

- **Zero `node_modules` churn:** I deleted `package.json`, `package-lock.json`, and `node_modules/` in one clean commit. 88 Dependabot alerts evaporated instantly.

- **Embedded templates with disk fallbacks:** Using Go's `//go:embed`, the binary packages all default HTML templates internally. But it also supports an "eject" pattern (similar to what I did with [linkding-ssg](https://github.com/lmorchard/linkding-ssg)): if a template file exists in `./templates/` on disk, it overrides the embedded default.

- **In-memory live reload:** For local writing, `make dev` starts a dev server on port 9980 with file watching via `fsnotify`. When a post or CSS file changes, it rebuilds in memory and broadcasts an event over Server-Sent Events (SSE). Middleware injects the tiny client reload script into HTML responses on the fly, so disk build artifacts never get polluted with dev code.

- **Built-in retro dithering:** I ported my Floyd-Steinberg image dithering and pixel-downscaling pipeline directly into pure Go (`pkg/imageutil`). No ImageMagick CLI invocations needed.

- **Fixed client-side search:** Along the way, I squashed a stubborn [Pagefind](https://pagefind.app/) bug where every search result title was showing up as `"blog.lmorchard.com"` (Pagefind was greedily grabbing the masthead `<h1>` before checking the post title) and gave the search drawer an opaque background and wider reading column.

## The DecafClaw Flow

So yeah, I built the entire v2.0 in a single afternoon pairing with [**DecafClaw**](https://github.com/lmorchard/decafclaw), my personal AI agent project. 

DecafClaw is very young—I only started it this spring, writing up the origin story in [Decafclaw: Building an AI Agent in a Week](/2026/03/20/decafclaw/). What began as a 50-line Python script to understand how LLM tool calling and agent loops work has turned into my daily development companion: an agent wired directly into my local workspace and shell, with tools to read, edit, test, benchmark, and deploy.

What made this session feel like genuine flow was the division of labor:

- **Easy Blog Oven v1.0 as a spec:** This didn't start from scratch. The agent could pour over my original working code and transliterate the important stuff into the new system. So, unlike other rewrites of the past in which I've taken part, this one seemed to pick up all the dumb quirks I've accumulated in the thing whether I remembered them or not. (And this thing is quirky as heck.)

- **High-level steering & instincts:** I made the architecture calls—Go over Rust, standard library `html/template` over custom template engines, keeping the eject pattern, choosing to retire old archive pages in favor of Pagefind search, and branding it as Easy-Blog Oven v2.0.

- **Plumbing & muscle work:** DecafClaw handled the tedium. It parsed legacy edge cases across 24 years of posts (Disqus comment dumps, multipart cut-line delimiters, Obsidian image embeds), set up concurrent worker pools, scaffolded unit tests, verified build parity against the old generator, updated GitHub Actions workflows, and cleaned up phantom draft files.

- **Immediate tooling:** When I found myself writing one-off Node scripts to verify Pagefind search results or checking frontmatter with Python, DecafClaw baked those directly into the CLI as first-class subcommands (`easy-blog-oven search-test`, `doctor`, and `info`).

This was like having a tireless [helper gnome](https://github.com/mokagnome) who understands the repo context, doesn't mind writing boilerplate, and can verify its own edits with test runs. It made a rewrite feel fun, if you can believe it. I stayed in the "what if" and problem-solving zones instead of drowning in setup ceremony.

## What's Next?

With Easy-Blog Oven v2.0 running live in production (deployed to S3 and CloudFront via GitHub Actions), the publishing core is faster and simpler than it has been in a decade.

Next on the docket: I've finally disabled the crusty cron job that used to automatically sync draft notes from my Obsidian vault into the blog repo. That was part of [the Rube Goldberg blogging machine](/2025/06/02/obsidian-rube-goldberg/) I rigged up [back in May 2025](/2025/05/09/new-blog-a-lot-like-the-old/). That seemed really neat to me at the time, and I used it a ton at first, then I dropped it for other shiny toys.

I'll rethink that pipeline with an intentional, agent-mediated import command so half-baked thoughts stay in the notebook until they're ready for the oven.

Until then, the oven is preheated, the build is fast, and it feels good to have a simple, dependable tool back at the heart of the site.
