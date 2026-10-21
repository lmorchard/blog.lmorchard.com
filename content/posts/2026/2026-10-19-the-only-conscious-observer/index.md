---
date: '2026-10-19T12:00:00-07:00'
tags:
- ai
- coding
- agents
- philosophy
title: 'The Only Conscious Caretaker'
type: entry
---

**TL;DR:** Dropping razor blades down a wall cavity and letting autonomous agents merge uninspected code share the same fantasy: that unobserved spaces have no consequences. Adulthood is realizing caretaking is still on you.

<!--more-->

<figure class="wide">
<img src="./attic-sun-rays-dithered.png" alt="Sun rays streaming into a dusty wooden attic">
<figcaption>
Photo by <a href="https://unsplash.com/@kommumikation?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mika Baumeister</a> on <a href="https://unsplash.com/photos/sun-rays-inside-wooden-house-9TvuxGW8ut0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</figcaption>
</figure>

<nav role="navigation" class="table-of-contents"></nav>

## Hammer in the ceiling, razors in the wall

For most of my adult life, I've had this quiet, recurring thought: sometimes, I am the only conscious observer of a thing.  There are spaces where no one goes. When I happen to be the one standing there, the burden of attention falls entirely on me. And if I don't pay attention, no one else ever will.

Since becoming a homeowner, it usually hits me (sometimes literally) in the unglamorous corners of the house.

A while back, I was working in the basement of a house I owned. It had one of those suspended drop ceilings—the cheap metal grid with lightweight tiles. I needed to see what was running above it. So, I reached up, pushed one of the tiles up and aside.

Before I could react, an old 16-ounce claw hammer slid down the angled face of the tile and smacked me squarely in the ear.

<figure class="inset right">
<img src="./claw-hammer-dithered.png" alt="A black and silver steel claw hammer resting on wood">
<figcaption>
Photo by <a href="https://unsplash.com/@andrewjoegeorge?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Andrew George</a> on <a href="https://unsplash.com/photos/black-and-silver-claw-hammer-TuQvJ72sRaA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</figcaption>
</figure>

Years earlier—who knows how many—someone had been up there running Romex or fixing a pipe, set their hammer down, and walked away. The ceiling held it. The room below looked completely fine. Everything appeared in order. The hammer just sat in the dark holding potential energy, completely forgotten, until the next conscious caretaker—i.e. me—showed up and moved the tile.

Or how about this: ever heard of those old mid-century medicine cabinets with the razor blade disposal slot cut into the back? You’d finish shaving, slide the dull double-edge blade through the tiny stamped steel slit, and let it drop into the hollow stud bay. 

The house was built with the cheerful assumption that the space behind the wall was a bottomless void—no human would ever visit that space again, so you might as well fill the dark with decades of loose, rusty steel.

Until someone decides to remodel the bathroom fifty years later, pulls the wall down, and gets buried in an avalanche of tetanus.

## This is not about houses

The hammer is accidental neglect; the razor slot is architectural abdication. Both rely on the fantasy that unobserved spaces don't have consequences.

You inherit a codebase, open a utility file last touched twelve years ago, and find a terrifying, seventy-line regular expression with a comment that simply says `// sorry, this works, don't touch`. 

Someone had a deadline, solved their immediate problem, popped the ceiling tile back into place, and walked away. It sat in the dark for over a decade, quietly routing production traffic, completely unobserved—until a runtime upgrade finally dislodged it.

But even with the dirtiest legacy hacks, there was always one comforting constant: at least *some* human doofus had perceived it. A real person sat at a desk and maybe felt that twinge of guilt while typing `// sorry`.

Autonomous agents and modern code generation break that contract.

## The inversion of ceremony

Over the past 18 months, my daily workflow has changed dramatically. 

Back in June 2025, I wrote about [baby steps into semi-automatic coding](https://blog.lmorchard.com/2025/06/07/semi-automatic-coding/). I was figuring out the ergonomics—borrowing [Harper Reed’s idea of "waterfall in 15 minutes,"](https://harper.blog/2025/04/10/waterfall-in-15-minutes-or-your-money-back/) writing a `spec.md`, having the LLM generate a `plan.md`, babysitting Claude Sonnet 3.7 or GPT-4.1 while it wrote functions, and capturing lessons in a `notes.md` file. It was mostly a trick to bypass ADHD executive friction on implementation grind.

Fast forward to late 2026. Now, I regularly triage a half-dozen issues on a GitHub Projects board, set up an autonomous runner, tell it to work through the ready queue, and go to bed.

By morning, five or six PRs are opened, CI is passing, adversarial code reviews are done, and conflicts are resolved. Nearly always, the results are ready to merge—but I haven't quite gone as far as letting the agent do that automatically yet.

Here is the strange inversion I’ve noticed in where my time actually goes: **I spend almost all my time on the things software engineering spent twenty-five years trying to elide.** 

To wit: *process and documentation*.

<figure class="inset right">
<img src="./workflow-diagram-dithered.png" alt="Workflow diagram, product brief, and user goals on paper">
<figcaption>
Photo by <a href="https://unsplash.com/@kellysikkema?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kelly Sikkema</a> on <a href="https://unsplash.com/photos/workflow-diagram-product-brief-and-user-goals-are-shown-wdnpaTNwOEQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</figcaption>
</figure>

Think about the arc of Agile, Extreme Programming, and MVP startup culture. Decades spent waging a pragmatic war against "ceremony." We skimped on formal specifications because writing prose before code felt wasteful. We accepted loose types and skipped edge-case tests because that was just a drag on sprint velocity. Docs were always something you promised to write next quarter.

Now, raw code is practically free. An agent will spit out four hundred lines of boilerplate, scaffolding, and glue in forty seconds. 

And suddenly, the "tedious" parts are the only things that matter:

* **Writing a rigorous, unambiguous specification** is no longer obsolete waterfall bureaucracy—it is the steering wheel that keeps an autonomous fleet from driving into a ditch.

* **Strong, invariant types** aren't academic fussiness—they are the physical barriers that make illegal runtime states unrepresentable to a machine that operates purely on statistical plausibility.

* **Deep behavioral tests** aren't a chore you rush before demo day—they are the tripwires that catch an agent when it rationalizes away a bug with a vacuous assert.

Those things were never actually waste. **They were encodings of human care.** We just couldn't afford to do them justice when our hands were cramped from laying every single brick by hand. So, we mostly left them implicit.

## Scaling your care

Agents need to be beaten about the metaphorical head & shoulders with this stuff. If you leave an agent alone in a repository without constraints, it won't break things out of spite. It will simply act like the contractor who left the hammer in my ceiling: it will solve the immediate constraint in front of it and exit with code 0.

Unless you look, nobody will. You might be the only conscious human being who ever reads that diff before it lands on main and deploys to production.

This is where the temptation to shrug sets in. You look at a 1,500-line diff produced in three minutes, your eyes glaze over, the tests are green, and you think: *Well, it works. Let it ride.*

<figure class="inset right">
<img src="./spoons-dithered.png" alt="Vintage silver spoon and fork on a dark rustic wooden table">
<figcaption>
Photo by <a href="https://unsplash.com/@margaret_jaszowska?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Margaret Jaszowska</a> on <a href="https://unsplash.com/photos/silver-spoon-and-fork-on-brown-wooden-table-PI7kXKdawx0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</figcaption>
</figure>

Yielding to that shrug is understandable, because you only have so many waking hours and [spoons](https://en.wikipedia.org/wiki/Spoon_theory). You cannot personally crawl every foot of drywall cavity, and you cannot personally scrutinize every token an agent generates.

This is the central dilemma that [Lauren (@poteto)](https://github.com/poteto) addressed when building [`pstack`](https://github.com/cursor/plugins/tree/main/pstack) for Cursor, particularly in the design of the [`/correct` skill](https://github.com/cursor/plugins/blob/main/pstack/skills/correct/SKILL.md):
> *"Assume every contributor is an agent that sees only the files it opened, copies the nearest example, and takes the shortest path that compiles. Design the repo so a change that looks right from one file is right for the whole repo."*

Lauren’s answer isn't about micromanaging the agent turn by turn. Babysitting is an exhausting dead end. Instead, you use your scarce conscious care to **engineer the environment**:

1. **Architecture & Data Structures:** Categorically eliminate the problem. Give each piece of state one owner, hide internals, and delete legacy patterns so bad state cannot even be copied.

2. **Types & Linters / CI:** Make illegal states unrepresentable. Make errors fail at compile time or in CI, explicitly pointing to the supported pattern.

3. **Behavioral Tests:** Assert on actual user-visible outcomes, testing against literal values and running tests in detached worktrees to prove they fail before the fix is applied.

4. **Docs & Prompt Rules:** Text instructions are the absolute last resort, because prose blows away the moment context collapses.

Another angle on this, if you prefer video, wherein Matt Pocock talks about the importance of telling agents what you care about and fixing their environment:

<youtube-embed video-id="Z8lf5oWKfj0" thumbnail="ac7061da42d6.jpg"></youtube-embed>

This is how care scales. In a house, you don't stand in the kitchen staring at the outlets 24 hours a day; you install GFCI breakers so the circuit trips physically if current leaks into water. 

In software, you freeze your past attention into the repository's invariants so your care persists even when you're asleep. If an agent does something wrong, I don't just fix the mistake. I step back and try to figure out what rule or deterministic guard would prevent that class of mistake into the future.

## Who lives in the house (that this is not about)

Almost a month ago, I wrote about [Pragmatic Anthropomorphism](https://blog.lmorchard.com/2026/09/27/pragmatic-anthropomorphism/), engaging with Michał Zalewski’s observation that human morality is rooted in physical imperilment—in our mortality, metabolic vulnerability, and the fact that we can be injured. An LLM—metaphorically, of course—"lives" in an indifferent netherworld without blood sugar, pain, or consequences.

Because the machine has no skin in the game, it is structurally incapable of care. It can simulate politeness and it can emit syntactically flawless functions, but it will never feel the weight of stewardship.

I've come to believe that the ultimate burden of adulthood is **consciousness applied to caretaking**. 

<figure class="inset right">
<img src="./rusty-metal-moss-dithered.png" alt="A rusty piece of metal sitting on moss-covered ground">
<figcaption>
Photo by <a href="https://unsplash.com/@rrricharddd?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Richard Wang</a> on <a href="https://unsplash.com/photos/a-rusty-piece-of-metal-sitting-on-top-of-a-moss-covered-ground-_1tHzk3Yy4E?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</figcaption>
</figure>

Nature's baseline is entropy. If you don't maintain the house, moisture and mold will reclaim it. If you don't retrieve the dropped bolt on the bike trail, the moss swallows it. And if you don't inspect the running state of your network or the architecture of your synthetic code, the ceiling hammers quietly accumulate.

I'm an AI pragmatist—maybe an optimist, even. I use these tools every single day, and I wouldn't go back now. But using them honestly means recognizing what they are: powerful, competent, indifferent amplifiers.

They can help us frame the walls, pull the wire, and hang the drywall faster than ever before. But they don't live in the house. We do. 

And as long as we live here, somebody still has to climb the ladder, shine a flashlight into the dark above the ceiling tiles, and make sure nothing is waiting to fall. And if you, yourself, can't manage to climb that ladder every day—and who, realistically, can?—then you need to put systems and sensors and traps in place, in order to augment and extend the influence of your caretaking.
