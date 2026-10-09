---
date: '2026-10-09T12:00:00-07:00'
tags:
- macos
- apple
- terminal
- productivity
title: Making an M5 MacBook Pro Actually Feel Fast
type: entry
thumbnail: "marc-sendra-martorell-Vqn2WrfxTQ-unsplash-dithered.png"
---

*TL;DR:* An Apple M5 Max can compile code and run local models at ridiculous speeds, but macOS still insists on cinematic, half-second UI animations for everyday interactions. Here are some Terminal tweaks and settings I've used to strip out the artificial lag.

<!--more-->

<figure class="wide">
<img src="./marc-sendra-martorell-Vqn2WrfxTQ-unsplash-dithered.png" alt="Time-lapse of street lights with electric red and amber light streaks">
<figcaption>
Photo by <a href="https://unsplash.com/@marcsm?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Marc Sendra Martorell</a> on <a href="https://unsplash.com/photos/time-lapsed-of-street-lights--Vqn2WrfxTQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</figcaption>
</figure>

<nav role="navigation" class="table-of-contents"></nav>

I recently picked up a new MacBook Pro—an M5 Max for work. By every measurable hardware metric, it is an absurdly fast machine. 

And yet, right out of the box, it often *felt* sluggish.

Not because of compute or memory pressure, but because Apple’s interface designers are deeply in love with theater. It looks elegant in a keynote demo, but my brain feels it like a papercut. Artificial animation latency registers as system lag. If I’m on a machine with this much horsepower, I want the UI to snap when I ask for it.

## All-in-One Snippet

So, here it is, for future-me and anyone else. Here is the whole batch in one shot:

```bash
# Remove Dock hover delay and accelerate slide
defaults write com.apple.dock autohide-delay -float 0
defaults write com.apple.dock autohide-time-modifier -float 0.2

# Accelerate Mission Control
defaults write com.apple.dock expose-animation-duration -float 0.1

# Restart Dock to apply
killall Dock
```

Then, a couple of quick switches in **System Settings**:

- **Accessibility → Display → Reduce motion**: Turn this on.
- **Desktop & Dock → Mission Control → Group windows by application**: Turn this off.

There's probably more I could do, but this is what I've got for now.

## How to Revert

If you decide you miss the floaty macOS elegance, you can wipe out the custom keys and restore the stock timings just as easily:

```bash
defaults delete com.apple.dock autohide-delay
defaults delete com.apple.dock autohide-time-modifier
defaults delete com.apple.dock expose-animation-duration
killall Dock
```

And remember to revert the changes in System Settings.

If you're curious what this stuff does, that's what the rest of the post says.

## Eliminate Dock Hesitation

If you auto-hide your Dock to maximize screen real estate, the default behavior includes two separate speed bumps:

1. **The hover delay:** A half-second pause before the OS starts revealing the Dock.
2. **The slide animation:** The time it takes for the Dock to glide onto the screen.

You can drop the hover delay to zero and cut the slide duration down to a fifth of a second:

```bash
# Make the Dock appear instantly when hovering
defaults write com.apple.dock autohide-delay -float 0

# Speed up the slide animation
defaults write com.apple.dock autohide-time-modifier -float 0.2
```

Once you kill the hover delay, the Dock pops up the instant your cursor hits the display edge. It immediately makes the entire machine feel snappier.

## Speed Up Mission Control

Mission Control’s window-tiling animation is another place where macOS takes its time. And I might be an outlier, but I have Mission Control mapped to a trackball button and use it as my primary navigation in macOS. I'm constantly in and out of that view, so the fades and swoops annoyingly add up.

First, the switches in **System Settings**:

- **Accessibility → Display → Reduce motion**: Turn this on. It replaces the long sliding transitions between virtual desktops and spaces with a fast crossfade.
- **Desktop & Dock → Mission Control → Group windows by application**: Turn this off. Tiling individual windows rather than clustering them removes a noticeable rendering hesitation when Mission Control lays things out.

On top of the system settings, you can tighten the Mission Control transition duration in the terminal:

```bash
# Speed up Mission Control animations
defaults write com.apple.dock expose-animation-duration -float 0.1
```

Combined with "Reduce motion," the UI stops gliding across the room and just gets out of your way.

## That's it

I spent an hour hunting these settings down across scattered Google results, Stack Overflow answers, and decade-old forum threads. Mostly, I'm writing this down here so future-me has a single place to look the next time I migrate machines. I've been out of practice writing this kind of post, maybe I should get back into it?
