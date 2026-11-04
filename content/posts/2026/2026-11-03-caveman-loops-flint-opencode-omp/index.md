---
date: '2026-11-03T12:00:00-07:00'
tags:
- ai
- llm
- opencode
- oh-my-pi
- ghflow
- apple-silicon
- local-ai
- decafclaw
- agents
title: 'Caveman Make Loop: Model Harness Different'
type: entry
---

**TL;DR**: Running Recursive's new [Flint](https://recursive.com/updates/introducing-recursive-flint) model in **Oh My Pi (OMP)** was a looping disaster of telegraphic "caveman speak." But running the exact same user prompt in **OpenCode** was night-and-day articulate and competent. The contrast sent me digging through session traces and harness prompts—and reconsidering how quickly I'd judged the model.

<!--more-->

<figure class="wide">
<img src="./alex-moliski-dn54JYggRs8-unsplash-dithered.png" alt="Ancient petroglyphs of human figures carved into sandstone canyon rock">
<figcaption>
Photo by <a href="https://unsplash.com/@alexmoliski?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alex Moliski</a> on <a href="https://unsplash.com/photos/ancient-petroglyphs-of-human-figures-on-rock-dn54JYggRs8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</figcaption>
</figure>

<nav role="navigation" class="table-of-contents"></nav>

## Two harnesses, one model

At work, I just got a new MacBook Pro with 64GB RAM and an M5 Max CPU. Just in time for [news about M6 CPUs](https://www.apple.com/newsroom/2026/10/apple-introduces-the-new-14-inch-macbook-pro-with-m6/), but oh well. Still, I'm told this should be pretty capable at running local AI models.

So, lately, I’ve been jumping between two harnesses: [OpenCode](https://opencode.ai/) and [Oh My Pi (OMP)](https://github.com/can1357/oh-my-pi). Both seem capable, but have different designs and flavors. OpenCode feels like a structured, modular developer workbench. OMP aims at raw terminal speed, token frugality, and minimal ceremony. I haven't done an exhaustive code comparison, so these are just vibey impressions.

At the same time, I’ve been running [Flint](https://recursive.com/updates/introducing-recursive-flint), an [open-weight model](https://huggingface.co/RecursiveSI/flint) released by [Recursive Superintelligence](https://recursive.com/). To serve the model locally, I've been using [`rec`](https://github.com/recursive-oss/rec), Recursive's own inference engine, which exposes local OpenAI- and Anthropic-compatible endpoints.

The label on the tin says Flint is a sparse Mixture of Experts (MoE) with 40 billion total parameters, but only ~2.5 billion active parameters per token. It uses 4-bit NVFP4 output layer quantization, allowing the full model to fit and execute in unified memory on Apple Silicon via Metal kernels.

In my own runs, actual decode throughput (pure generation speed, excluding prompt prefill and tool execution waits) clocked in around 60–80 tokens per second across sustained agent turns. I'm still wrapping my head around expected performance for local models on this machine, but this seems really good.

Of course, speed doesn't mean anything if the model is busy spewing garbage the whole time. So, I decided to put Flint through its paces on a real-world task: running an issue triage pass on the [DecafClaw](https://github.com/lmorchard/decafclaw) backlog using [ghflow](https://github.com/lmorchard/ghflow).

## The workload: ghflow

A quick word on [ghflow](https://github.com/lmorchard/ghflow): it's an agent skill I've been building to automate project workflows on GitHub. Instead of me manually clicking through project boards, labeling issues, branching worktrees, and writing pull request summaries, `ghflow` gives an agent a structured set of reference procedures to triage, scope, and deliver issues.

In a full-scale unattended burndown using a cloud model, `ghflow` often relies on subagents to parallelize work. But with this local model setup, driving concurrent subagents led to endless [KV-Cache](https://huggingface.co/blog/not-lain/kv-caching) thrashing—chewing up GPU time recalculating [prompt prefills](https://machinelearningmastery.com/from-prompt-to-prediction-understanding-prefill-decode-and-the-kv-cache-in-llms/) much like frequent multi-material filament changes on [my 3D printer](https://www.prusa3d.com/product/original-prusa-mk4s-3d-printer-5/) with [the MMU3](https://www.prusa3d.com/product/original-prusa-mmu3-for-mk4s-mk3-9s-full-kit-2/). 

So to lean into consistent caching, I explicitly instructed the agent to triage serially in a single session:

> `@ghflow Let's triage issues not yet triaged, those without triage:* labels. Do so without using subagents, because we're only running one local model and cannot handle parallel requests`

## Attempt one: The caveman doom loop in OMP

My first run with Flint in OMP was a disaster—here's how it started "thinking":

<figure class="code-block">

```markdown
We need respond/action. User invoked ghflow, asks triage untriaged issues. 
Need follow skill. We need inspect. We have no actual tools listed beyond current, 
but likely can use. Need likely task triage-issues. Must load task reference and 
shared context perhaps. Need not ask. Need gather state. Since they mention 
long list untriaged. Need run ghflow facts perhaps. First must read selected task 
and shared context.
```

</figure>

Most auxiliary verbs, articles, and copulas have been dropped, leaving a staccato stream of verbs and nouns. I've heard of this [caveman](https://github.com/juliusbrussee/caveman) thing as an attempt to conserve tokens—i.e. "*why use many token when few token do trick*". But, I don't think this was intentionally that. And even if it was, it didn't work.

I let it keep going, if only to see what it would do. After 100 turns, I think the agent had entered what looked like an [attractor basin](https://christinasouch.com/blog/attractor-basins-when-ai-gets-stuck-in-the-wrong-pattern):

*   **Turn 101:** `think: ["We need continue. Need understand todo tool format..."]` → calls `todo`
*   **Turn 105:** `think: ["We need continue. Need be careful. We need understand task and state..."]` → calls `bash`
*   **Turn 114:** `think: ["We need continue. Need be careful. We need understand task and state..."]` → calls `bash`
*   **Turn 117:** `think: ["We need continue task. Need carefully reason..."]` → calls `todo`
*   **Turn 123:** `think: ["We need continue. Need be careful. We need understand task and state..."]` → calls `bash`
*   **Turn 126:** `think: ["We need continue. Need be careful. We need solve user task via tools..."]` → calls `bash`

It had locked onto a fixed mantra: *"We need continue. Need be careful."* It repeated that exact phrase, picked a tool, failed to resolve the state, and immediately repeated it again. Seemed like it was lost in a maze of twisty little passages, all alike.

<figure>
<img src="./rafif-prawira-SgTLuX6t8Yo-unsplash-dithered.png" alt="Aerial overhead view of an intricate concentric hedge labyrinth">
<figcaption>
Photo by <a href="https://unsplash.com/@rafifprawira?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Rafif Prawira</a> on <a href="https://unsplash.com/photos/aerial-photo-of-maze-race-SgTLuX6t8Yo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</figcaption>
</figure>

Digging into the logs around Turn 123 showed one concrete failure inside the loop. Despite its clipped syntax, the reasoning was lengthy—it spent roughly 1,500 tokens of idiotic internal monologue over 30 seconds repeating its mantra without making useful progress, before finally running a bash command:

<figure class="code-block">

```
> gh issue view 1145 --json number,title,body,state,labels,comments --limit 20
unknown flag: --limit
Command exited with code 1
```

</figure>

Flint failed to recover cleanly. While it did drop the `--limit` flag on its next attempt (`gh issue view 1145 --json ... --comments`), the output was truncated. It fell back to repeating the exact same reasoning chant, firing off piecemeal variants (`gh issue view 1145 --json body --jq .body`, `gh issue view 1145 --json comments --jq '.comments'`) while constantly resetting its `todo` tool state without ever progressing to triage. It was stuck in a self-reinforcing spin cycle.

After killing the loop, I thought: *Welp. That sucked. Back to Claude, I guess.* I was ready to write Flint off as undercooked.

## Attempt two: Wait, it works in OpenCode?

A bit later, mostly out of stubborn curiosity, I decided to point OpenCode at the same model and task. The result was night and day:

<figure class="code-block">

```markdown
Let me parse this. The user is referencing the `@ghflow` skill and wants to triage 
issues not yet triaged, those without `triage:*` labels. They explicitly say not to 
use subagents because only running one local model and can't handle parallel requests.

Let me first load the ghflow skill to understand its workflow.
```

</figure>

OpenCode and Flint took the task in stride. It read the skill, loaded the task references, surveyed the open issues, and set about triaging them in a calm, orderly fashion. There was no caveman syntax, no wheel-spinning, and no doom loop. I let it run while I got lunch, and it had finished the job successfully by the time I was done eating.

And by "finished the job," I mean it actually executed: it swept 35 untriaged issues down to 0 across five bounded batches, resolved decision bottlenecks on three stalled items, defined acceptance criteria on three more, triaged a newly opened mobile issue (#1192), and grew the board's `triage:ready` pool to 123 issues with clear evidence and labels posted directly to GitHub. 

In the issues I checked, the classifications were sound, the summaries captured the actual acceptance criteria, and the decisions held up. No babbling, no loops—just steady work, the way I'd have done it myself.

Flint could clearly do this task in at least one setup. That made me reconsider my first impression: I had been judging the model through one particular harness configuration, when the choice of harness—its system prompt, tool schemas, and defaults—might explain the difference.

## What might explain the difference?

At this point, pure bafflement took over, and I tumbled headfirst down a research rabbit hole. I wanted to understand how a harness could turn an articulate coding model into a grunting, looping mess without touching a single weight.

I'm in a little over my head with everything I read, but let's see if I can take a stab at writing out my hunches.

### Tokens as computational scratchpads

In [Show Your Work: Scratchpads for Intermediate Computation with Language Models](https://arxiv.org/abs/2112.00114), Nye et al. demonstrated that language models perform significantly better on multi-step reasoning tasks when allowed to generate intermediate tokens as an external scratchpad—a finding expanded by Wei et al. on [Chain-of-Thought Prompting](https://arxiv.org/abs/2201.11903).

This is old hat, basic stuff. Intermediate reasoning tokens can help models work through multi-step plans, which makes brevity constraints worth investigating here. 

So, in other words, I suspect that by causing the model to *write* "thinking" like a caveman, it *performed* like a caveman.

This run wasn’t short of generated reasoning tokens; it spent roughly 1,500 of them on one stalled turn. To be fair, whether the harness affected how productively it used those tokens is unproven. But, I think it's a culprit. (Also, I'm really glad this was on my laptop and not charged by the token in the cloud.)

### Prompt density and negative constraints

You can see this design philosophy directly in OMP's source code: its core [`system-prompt.md`](https://github.com/can1357/oh-my-pi/blob/main/packages/coding-agent/src/prompts/system/system-prompt.md) on GitHub uses compact wording and many explicit constraints. It defines strict RFC 2119 keywords (`MUST`, `REQUIRED`, `NEVER`) and wraps behavior in dense, inviolable contracts:

*   Forbidding reflection on limits or budgets: `<critical> NEVER narrate/consider session limits, token/tool budgets, effort estimates, or possible completion; start unbounded: execute/delegate. </critical>`

*   Mandating tight tool execution constraints, such as forbidding solo planning turns: `NEVER make a todo-only turn: send todo in the same response as the turn's real call (parallel tool calls)`—which could help explain why Flint insisted on bundling `todo` and `bash` together on every turn of its loop.

Those constraints make prompt design a plausible suspect, particularly the rule coupling todo updates to other tool calls. 

I haven’t tested whether relaxing them changes Flint’s behavior. The fuller sentences in OpenCode are an observable difference; whether they helped the model complete the task remains an open question.

### Repetition and sampling defaults

The repeated openings in OMP were a visible sign that the run had stalled. As Holtzman et al. explored in [The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751), decoding choices and sampling parameters can easily produce repetitive loops where a model fixates on familiar patterns. 

In Flint's case, once it fell into repeating its stilted mantra (*"We need continue. Need be careful."*), that pattern dominated recent context, resembling an [attractor basin](https://christinasouch.com/blog/attractor-basins-when-ai-gets-stuck-in-the-wrong-pattern). 

But, I can’t tell from these traces alone whether the repetition helped sustain the loop or merely reflected it—and differences in default temperature, top-p, or repetition penalties between the two harnesses could be an important unexamined variable.

## What I might try next

So, again: These are all slightly-educated guesses. In practical terms, when using Flint, OpenCode works for me where OMP doesn't. That's fine for now. Tool work, me happy.

But, if I really want to keep chasing this, the next step would be to see whether this contrast is reproducible. I could give both harnesses the same frozen set of issues, run each several times, and compare completed triage decisions, tool errors, and time spent going nowhere.

Then I’d narrow things down. The failed run corrected its invalid command flag but stalled after encountering truncated output. A tiny test with one issue and deliberately awkward tool responses might help distinguish trouble recovering from errors from trouble with the task itself.

I could also capture what each harness actually sends to `rec`: prompts, tool definitions, sampling settings, and conversation history. From there, I could change one thing at a time—relax an OMP instruction, match sampling settings, or adjust output truncation—and see whether completion improves. Fuller sentences would be interesting, but getting the work done would be the measure that matters.

## Takeaways for harness tinkering

As someone building both agent tools ([ghflow](https://github.com/lmorchard/ghflow)) and harness systems ([DecafClaw](https://github.com/lmorchard/decafclaw)), this was a practical lesson in debugging local agent workflows:

1.  **Try another harness before writing off a model:** If a local model stumbles or loops on a task, don't immediately assume the weights aren't smart enough. A different harness configuration might yield completely different results.

2.  **Look across the whole harness stack:** Prompts get the most attention, but tool schemas, error formatting, sampling parameters (temperature, top-p), and how conversation history is truncated or summarized all shape model behavior.

3.  **Watch for repeated actions and check tool responses:** When a run stalls, look past the assistant's narration and inspect what the tools actually returned. Repeated reasoning phrases can be a surface symptom of a tool call failing quietly underneath.

For now, when running `ghflow` against local weights on my laptop, OpenCode remains my default driver. But it's a great reminder of how much the choice of harness shapes what an open-weight model can actually do.
