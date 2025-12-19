---
title: "Making Computers Do Things is Fun"
type: "entry"
tags:
  - codegen
  - llms
  - ai
  - work
---

**TL;DR**: There's a divide among developers—some love writing code for its own sake, others (like me) love making computers do things and see code as a means to that end. AI coding tools have helped me make computers do things.

<!--more-->

<figure>
<img src="./lorenzo-herrera-p0j-mE6mGo4-unsplash-dithered.png">
<figcaption>
Photo by <a href="https://unsplash.com/@lorenzoherrera?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Lorenzo Herrera</a> on <a href="https://unsplash.com/photos/vintage-gray-game-console-and-joystick-p0j-mE6mGo4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</figcaption>
</figure>

<nav role="navigation" class="table-of-contents"></nav>

David Celis says "[Writing Code Is Fun](https://davidcel.is/articles/writing-code-is-fun)":

> I became a software engineer because writing code is fun. Thinking through hard problems, designing elegant solutions, seeing the things you've built working for the first time… these moments are all deeply satisfying, so why in the world would I ever surrender them to AI?

It's not really a secret that I've been spending a lot of time [using LLMs to generate code](https://blog.lmorchard.com/tag/codegen/) this year. My job and the industry at large has pushed for it—and [I don't feel like I can afford to just opt out](https://blog.lmorchard.com/2025/05/20/minimum-viable-human-career/).

The thing is, though, this has been a fun and gratifying experience for me. I haven't tried to be _too_ loud about it. These are tools, I pay for a subscription, and I'm trying [to be normal](https://www.anildash.com/2025/10/17/the-majority-ai-view/) about it. I don't get a kickback selling anyone on using these things.

But, all that aside, I've had a hunch growing that code generation is highlighting a divide in how computer touchers approach software development.

## The divide

In college, I remember seeing this divide in my computer science and math classes. Some of us were really jazzed to dig into proofs and algorithms for their own sakes. Some of us (like me) were only turned on by practical application.

Linear algebra sticks out: roughly half the class aced tests on theorems and proofs, whereas I only really absorbed things like matrix multiplication when I understood how it could rotate shapes in 3D space—i.e. for graphics in video games.

This isn't a hard divide and I'm not trying to assert a value judgement. This is more a Venn diagram, a spectral shift in where the focus of craft and puzzle-solving is directed.

Some folks smile at a Lisp or enjoy the tasteful syntax of Ruby and how it results in more poetic code. They might enjoy a Zachtronics game like [EXAPUNKS](https://www.zachtronics.com/exapunks/) where you compete to [code-golf](https://en.wikipedia.org/wiki/Code_golf) little robots into completing tasks with minimal cycles.

Other folks see code as a means to an end—they smile at grungy [Rube Goldberg](https://en.wikipedia.org/wiki/Rube_Goldberg) assemblages of Unix pipes that get a job done, or lose themselves in [Factorio](https://www.factorio.com/) plugging things into other things to make things.

## Code as means not end

All of this is to say: I became a software engineer because making computers do things is fun. Writing code is just a means to that end.

It's been that way [since I was 8 years old](https://blog.lmorchard.com/2003/06/13/newly-digital/) and first dove into 6502 assembly on a Commodore 64: I didn't particularly appreciate elegance, I just liked that an implementation of [Bresenham's line algorithm](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm) in assembly drew lines for high-resolution graphics way faster than in BASIC. (Again, video games.)

While I do have a great appreciation for elegance and clean code, my day-to-day focus is on what that enables. Does it keep our work humming along? Can we sleep better at night with fewer things breaking? I'm just as happy to see something less-than-Platonically-ideal ship to production if it does the job as an ongoing concern.

## What AI tools enable

In my experience, using AI coding tools _has_ helped me move faster. They've also helped me move _at all_, in cases where I might not have started after facing down the mental cost of task initiation.

Simon Willison has [written a lot about this](https://simonwillison.net/2023/Mar/27/ai-enhanced-development/):

> The thing I'm most excited about in our weird new AI-enhanced reality is the way it allows me to be more _ambitious_ with my projects.
> 
> As an experienced developer, ChatGPT (and GitHub Copilot) save me an enormous amount of "figuring things out" time. For everything from writing a for loop in Bash to remembering how to make a cross-domain CORS request in JavaScript—I don't need to even look things up any more, I can just prompt it and get the right answer 80% of the time.
> 
> This doesn't just make me more productive: it lowers my bar for when a project is worth investing time in at all.

Lately, with Claude's help, I've spun up a few tools that sat on my wishlist for years—things like [feedspool-go](https://github.com/lmorchard/feedspool-go) as my daily driver for reading RSS feeds, [feed-to-mastodon](https://github.com/lmorchard/feed-to-mastodon) for cross-posting, and various utilities for exporting my bookmarks and posts to Markdown.

I've also resumed work on older projects where I'd simply run out of energy, like [fossilizer](https://github.com/lmorchard/fossilizer) for Mastodon backups and [this blog itself](https://github.com/lmorchard/blog.lmorchard.com).

In each of these cases, writing code was way less fun than having a working tool.

## The forcing function

But AI coding tools have also been a forcing function on other aspects of development: where before I might dive right into riffing in code, I now spend more time writing prose—describing what I want to build, refining documentation.

I also spend more time setting up testing, linting, and automated quality controls. It turns out you can integrate all of these tightly into a code-generating agent's loop, and they serve as guardrails that help course-correct the spicy autocomplete as it does the needful.

## Summing up

I like making computers do things. I also like making them do things so I don't have to, because I am very lazy. But I also like ensuring they do things well and reliably, because I am also very tired.

My experience with AI coding tools is that they've helped me be lazy and tired and still get a lot done. And that's fun for me, but that fun may not be universal.

