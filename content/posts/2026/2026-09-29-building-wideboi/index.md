---
title: "Building wideboi for Ultrawide and Ultrasmol Terminals"
date: 2026-09-29
tags:
  - wideboi
  - golang
  - terminal
  - cli
  - ai
  - agents
  - web
layout: post
---

**TL;DR**: What started about ten days ago on a whim as an experiment in horizontally scrolling terminals across an ultrawide monitor turned into [wideboi](https://github.com/lmorchard/wideboi)—a terminal multiplexer with animated cards, an embedded web UI for phones, a desktop app, and a headless control surface for AI coding agents. This really didn't need to get made, except that I wanted to make it.

<!--more-->

<figure class="wide">
<video controls style="width: 100%; border-radius: 8px;">
  <source src="wideboi-2.mp4" type="video/mp4">
</video>
<figcaption>
Overlapping live terminals go zoop zoop zoop
</figcaption>
</figure>

<nav role="navigation" class="table-of-contents"></nav>

## The Ultrawide Problem

I have [an ultrawide monitor](https://www.dell.com/support/product-details/en-ca/product/u3423we-monitor/resources/manuals) on my desk. Most terminal multiplexers—[`tmux`](https://github.com/tmux/tmux), [`screen`](https://www.gnu.org/software/screen/), [`zellij`](https://zellij.dev/)—seem convinced that monitors should be divided like graph paper. You split horizontally, you split vertically, you split again, and before long you're squinting at four 35-column slits where every shell command wraps into unreadable soup.

What I actually wanted was something much simpler: I want to have a bunch of terminals running at comfortable, readable widths, [go *zoop zoop zoop*](https://masto.hackers.town/@lmorchard/117317387148485076) between them with a keystroke, and vaguely see them chattering away while I stare off and dissociate.

About [two weeks ago](https://masto.hackers.town/@lmorchard/117283530811881043), I ran across [niri](https://github.com/YaLTeR/niri), a scrollable-tiling Wayland window manager for Linux. And then I found [gwae](https://github.com/hongnoul/gwae), which adapts niri's concept down to a terminal grid. The core idea is kinda dead simple: **panes tile but never shrink.** If you open another pane, you don't crush the existing ones down to slivers; you leave them full width and let the viewport scroll horizontally.

<figure class="wide">
<img src="niri-screenshot.png" alt="niri window manager showing windows arranged in a horizontal scrolling strip">
<figcaption>
<a href="https://github.com/YaLTeR/niri">niri</a>: windows arranged in columns along an infinite horizontal strip.
</figcaption>
</figure>

<figure class="wide">
<img src="gwae-demo.gif" alt="gwae demo: infinite scrolling strip terminal multiplexer">
<figcaption>
<a href="https://github.com/hongnoul/gwae">gwae</a>: bringing that infinite scrolling strip into a terminal multiplexer.
</figcaption>
</figure>

I loved the idea, but I wanted to tinker with it myself. But, I hadn't done much low-level terminal plumbing since messing around with ANSI art and BBS doors decades ago. I've got Claude Code, though, so I started a new project called [`wideboi`](https://github.com/lmorchard/wideboi), and decided to see what could happen. I think I got kind of carried away as one thing after another seemed to work.

I had three departures in mind from the start:

1. Write it in Go instead of Rust - [I'm really liking Go lately for little personal tools](https://blog.lmorchard.com/2025/10/25/miscellanea/).
2. Animate focus changes so moving between panes feels visually readable, rather than instantaneous.
3. Keep the architecture split cleanly in half, client & server from day one.

## The Load-Bearing Seam (yeah, yeah, I know)

On Day 1, I drew up a spec with a deliberate list of non-goals: no daemon, no detaching, no reattaching, no card layouts, no configuration files, and no network sockets. Just an exploratory spike to see if Go could handle smooth terminal compositing without melting my CPU. Turns out it really, really can.

A lot of credit goes to the Charmbracelet ecosystem here. Under the hood, wideboi leans heavily on [`charmbracelet/ultraviolet`](https://github.com/charmbracelet/ultraviolet) for cell buffers and differential screen rendering, and [`charmbracelet/x/vt`](https://github.com/charmbracelet/x/tree/main/vt) for virtual terminal emulation. (I ended up maintaining a temporary [fork of x/vt](https://github.com/lmorchard/x/tree/vt-scrollback-ring) to expose internal scrollback ring buffers and cursor state needed for in-place upgrades, but the upstream foundation is really keen.)

The first architectural bet I *did* make was what I called "The Seam."

I deliberately used that word because I'd seen Claude use it before. I know there are folks who really want to "[stop Claude from saying load-bearing](https://jola.dev/posts/how-to-stop-claude-from-saying-load-bearing)". But, I have sometimes found that just rolling with the nonsense actually makes a lot sense. Or, at least, it conjures sense from the agent without needing three paragraphs of preamble.

So, all of that is to say: I split the codebase into two isolated packages communicating strictly over Go channels:

- A **server** that owned the state and real processes: spawning PTYs, driving terminal emulators, tracking scrollback.

- A **client** that owned the physical host screen: putting the terminal into raw mode, decoding keystrokes, animating transitions, and blitting cell buffers.

That "seam" complicated things at first. But, the payoff came quick: when I decided I wanted real multiplexer ergonomics—detaching and running in the background—I didn't have to rewrite the core. I just pulled out the in-memory Go channel and dropped a Unix domain socket into the seam.

Almost overnight, `wideboi` graduated from a what-if into a real client/server daemon: `wideboi attach`, named sessions (`wideboi -L work`), and session listings with `wideboi ls`.

I had a little baby `screen` in no time.

## Going *Zoop Zoop Zoop*: Strips vs. Cards

The first layout mode was straightforward: a wide horizontal ribbon of full-sized panes where the camera pans left and right. Very gwae and niri.

It worked, but on an ultrawide screen, panning a vast panorama can feel like sitting in the front row of an IMAX theater. That led to the second layout: **Cards Mode**. Instead of sitting side-by-side on an infinite bench, panes stack horizontally like a hand of playing cards. They still don't crush down, instead they slip under each other.

If you've used [Zellij's stacked panes](https://zellij.dev/features/#stacked-panes), it's a bit like that concept rotated ninety degrees. But while Zellij stacks vertically and collapses inactive panes down to title-bar tabs, wideboi stacks them horizontally and leaves a sliver of actual live terminal output exposed along the edges. I've been finding that that little partial vertical slice of live terminal is enough to let me oversee quite a few ongoing processes.

Adding directional wipes made navigating between them feel great. Moving focus glides the pane's viewport over within the overall viewport, cards shuffle naturally, and you always retain spatial awareness of where your processes are running. That's a lot more UX than I expected to get working in a terminal. (Eventually I even added a native fuzzy command palette and prompt—press `Ctrl+b :` in the terminal or tap the search button in the web client, and you get an overlay menu to jump between panes, rename sessions, and tweak widths without memorizing every hotkey.)

<figure class="wide">
<video controls style="width: 100%; border-radius: 8px;">
  <source src="wideboi.mp4" type="video/mp4">
</video>
<figcaption>
The initial cards mode prototype in action: fanning and wiping between overlapping live terminals.
</figcaption>
</figure>

## "Sometimes You Need to Check on Your Wideboi from a Smol Phone"

Once I had a multiplexer running long-lived jobs, I immediately ran into the classic problem faced by an agent addict with ADHD: I stepped away from my desk, went for a walk, and wanted to see if my build finished.

Because the server already spoke a clean, typed protocol across a socket, adding a remote client was surprisingly approachable. So I built an embedded web server straight into the Go binary.

Run `wideboi server --websocket 127.0.0.1:8080`, and it spins up an HTTP/WebSocket server serving a single-page app built with Lit and HTML5 Canvas. It generates an ephemeral self-signed TLS cert on the fly and gives you a one-time token URL.

A quick security note that I also put in big bold letters in the README: wideboi is *not* hardened against strangers, and its token URL is just a speed bump. Put it on a [Tailscale](https://tailscale.com/) tailnet or behind a private VPN rather than exposing raw shell access to the open internet.

Anyway, it wasn't enough to just squirt raw text into a browser window, though. I wanted the full experience:

- It supports both Cards and Scroll modes in the browser.
- Touch scrolling and swipe gestures work cleanly.
- On ultra-narrow phone screens, the card layout automatically adapts down to a single focused pane rather than trying to overlap, keeping things legible.
- It accommodates mobile viewports and on-screen keyboards without truncating the underlying terminal dimensions.
- Mouse clicks route through to terminal programs that want mouse tracking.
- It includes mobile quick-action buttons and command palettes so you don't have to fight your phone's soft keyboard for control keys.

<figure class="wide">
<video controls style="width: 100%; border-radius: 8px;">
  <source src="wideboi-3.mp4" type="video/mp4">
</video>
<figcaption>
The web UI running in a desktop browser: cards mode and live terminal output streaming over WebSockets.
</figcaption>
</figure>

<figure>
<img src="wideboi-mobile.png" alt="wideboi web UI on a mobile phone, showing a single focused pane with touch quick-action buttons" style="max-height: 600px; width: auto; margin: 0 auto; border-radius: 8px;">
<figcaption>
Checking in on wideboi from a phone: adapting down to a single pane with touch controls.

Not a video, because I'm lazy. 🤷‍♂️
</figcaption>
</figure>

Not long after the web client landed, wrapping the web frontend into a not-quite-native desktop app using [Wails v3](https://v3.wails.io/) fell out naturally as well, giving `wideboi` dedicated desktop windows on macOS and Linux. I was vaguely tempted to try building an Electron app, just because I've never tried it before. But, this Wails thing worked out a lot better.

<figure class="wide">
<img src="wideboi-desktop.png" alt="wideboi desktop application window on macOS, managing sessions and displaying terminal cards">
<figcaption>
The desktop wrapper using Wails v3, managing local sessions in their own dedicated application windows.
</figcaption>
</figure>

## The Agent Loop

While I was building all of this for myself, my daily workflow shifted. I wasn't just using terminals to run `git` and `vim`; I was using them to host AI coding agents like Claude Code and opencode.

CLI coding agents have unique multiplexer requirements:

- They run heavy, long-lived background processes (test suites, linters, dev servers).
- They need to report when they're idle, when they're working, or when they're blocked waiting for human input.
- They benefit immensely from programmatic orchestration: launching a task in a dedicated pane, waiting for it to exit, and inspecting its output without hijacking the human's active terminal.

So `wideboi` gained first-class agent ergonomics:

- **Semantic Status Badges:** Panes listen for shell escape sequences (OSC 133 prompt markers and OSC 9;4 progress notifications). A pane's header shows at a glance whether the process inside is `idle`, `working`, `needs_input`, or `done`.

- **Headless CLI Controls:** Commands like `wideboi split --keep <cmd>`, `wideboi wait <id>`, `wideboi send <id>`, and `wideboi capture <id>` allow scripts and agents to treat `wideboi` panes as programmable subprocesses. The `--keep` flag was key here: standard terminal multiplexers immediately destroy a pane when its child process exits, but `--keep` preserves the dead pane's screen buffer and exit code in place so an agent can inspect what happened before explicitly closing it.

Suddenly, `wideboi` wasn't just a place where I worked—it was a backplane where agents could work alongside me. Also, I'm learning a bunch about this weird [OSC ("operating system commands") sideband of control characters](https://iterm2.com/documentation-escape-codes.html) that many terminals apparently support.

## When Dogfooding Gets Weird

Here is where the project went recursive: I began using agents running *inside* `wideboi` to write features and fix bugs for `wideboi`.

Dogfooding your own terminal multiplexer in real time is an adventure. If you're building a web app and introduce a bug, a browser tab reloads or throws a console error. If you're building the multiplexer that hosts your own agent session and something goes sideways, the universe vanishes.

We ran into some spectacular failure modes:

- **The Suicide Test (#277):** During a routine test run, an agent ran the test suite from inside a pane.
  
  One palette test dispatched a `quit` command without passing an explicit socket path. The multiplexer dutifully resolved the request against `config.DefaultSocketPath()`—which was the live session hosting the agent itself!

  The test passed, and simultaneously vaporized the agent's entire world. (We now run all test harnesses in strict isolation, and we added an immortal `exits.log` black box flight recorder so we can see why a session died after the fact).

- **The SIGHUP Trap:** Initially, sessions were designed to exit when their owning terminal died.

  Then my SSH connection dropped while working remotely; when `sshd` cleaned up the stale TTY two minutes later, the SIGHUP tore down the whole session and all my running jobs.

  We quickly migrated to the classic `tmux` model: a severed connection detaches the session, leaving it humming safely in the background.

- **In-Place Upgrades:** When you're making fifty changes a day to a multiplexer you are actively living inside of, restarting the server every time you rebuild is unbearable.

  So we taught `wideboi` how to perform in-place binary upgrades via `syscall.Exec`. Seems like a dirty POSIX hack involving reusing process IDs, but apparently NGINX does this to replace its own master process during an upgrade without dropping connections.

  It snapshots pane states, serializes terminal emulators, execs the newly compiled binary, and rehydrates everything in milliseconds—without dropping open PTYs or killing active agent processes.

## Where It's At Now

Ten days in, `wideboi` has settled into something that feels, to me at least, surprisingly solid and comfy to use. If you're curious or have your own ultrawide monitor to waste, the code and prebuilt binaries for macOS and Linux are [over on GitHub](https://github.com/lmorchard/wideboi/releases).

It runs on my ultrawide desktop as a fluid deck of overlapping terminal cards. It runs in a browser tab on my laptop or phone when I'm away from my desk. It lets agents run parallel builds and notify me when they need review. And when I push a bug fix, it can reload its own brain mid-stride while my shell prompts keep blinking.

Is writing your own terminal multiplexer in 2026 a sensible thing to do? Probably not. The world already has decades of rock-solid work in `tmux`, and modern alternatives like `zellij` and `gwae` are great.

But, building your own tools to scratch your own peculiar itch seems like a good use of a coding agent. It was also a good way to learn a bunch about terminal stuff I'd always been curious about. And I also picked up a few POSIX PTY horrors along the way. And, best of all, now my terminals go *zoop zoop zoop*.

(I should actually add sound effects 🤔)
