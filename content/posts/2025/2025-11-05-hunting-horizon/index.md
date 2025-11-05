---
title: "Creating a generative art sketch with Claude skills"
thumbnail: "/2025/11/05/hunting-horizon/cover.png"
tags:
  - webcomponents
  - webdev
  - claude
  - genai
  - codegen
  - sketches
---

Anthropic recently introduced the notion of [Agent Skills](https://docs.claude.com/en/docs/claude-code/skills) for Claude, which Simon Willison wrote may be "[a bigger deal than MCP](https://simonwillison.net/2025/Oct/16/claude-skills/)". From there, I noticed one of the example skills was for [producing algorithmic art](https://github.com/anthropics/skills/blob/main/algorithmic-art/SKILL.md). That dovetails nicely with my own noodlings in [web-based art sketches](https://blog.lmorchard.com/2025/04/25/sketches-as-web-components/). So, I gave it a shot.

<!--more-->

Long story short, here's a sketch I made with Claude's help, wrapped up as a web component that hopefully works in your browser:

<script type="module" src="./dist/sketches/HuntingHorizon/HuntingHorizon.js"></script>

<style>
  hunting-horizon {
      width: 100%;
      max-width: 1000px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(20, 20, 19, 0.3);
      background: #0f141e;
      display: block;
  }

  hunting-horizon canvas {
      display: block;
      width: 100% !important;
      height: auto !important;
  }
</style>

<figure class="wide">
<div><hunting-horizon></hunting-horizon></div>
<figcaption>Hunting Horizon, an animated sketch in a web component, centered around the notion of birds hunting fish at the interface of sky and sea</figcaption>
</figure>

I followed [the instructions for installing the example skills](https://github.com/anthropics/skills?tab=readme-ov-file#example-skills) and kicked things off with a vague prompt:

> Use algorithmic art to generate something that represents birds swooping down to the interface between air and water to snatch up fish

Claude took it from there, found the "algorithmic-art" skill I'd just installed, and generated a first pass of code. It also generated [this fairly pretentious "philosophy" statement](https://github.com/lmorchard/sketches-v03/blob/main/src/sketches/HuntingHorizon/hunting-horizon-philosophy.md):

> The boundary between air and water is not merely a surface but a computational threshold where physics transforms, where one realm of motion gives way to another. This philosophy explores predatory dynamics at this interface through particle systems that embody pursuit and evasion, where swooping trajectories penetrate from atmosphere to depth, where the hunting behavior of birds creates emergent visual patterns through accumulated motion. The algorithm simulates not the literal appearance of birds and fish, but the mathematical essence of their chase—parabolic descents governed by gravitational pull, evasive scattering driven by survival instinct, and the decisive moment of intersection where predator meets prey.

But, I didn't entirely hate it. And I figured it would make for decent context for the code itself. The initial sketch was a good start, so I started badgering it with further prompts:

> I'd like to add another phase of behavior to the "birds": Currently, when they "catch" a "fish" and a splash is generated, they disappear. I would like a new particle to spawn which soars organically up and out of the frame, representing the bird flying away with its catch. Maybe there should be a color change, as well? I'd like the motion to be kind of perturbed by perlin noise like the hunting phase, but it can be a bit faster

That got me some nice upward-soaring golden bird particles, so I kept going:

- Can we add subtly twinkling stars to the upper portion of the piece?
- Can we add a slight watery rippling distortion effect to the lower half of the display?
- Let's add another behavior: Fish should scatter from splashes with a little extra speed before gradually reforming into schools
- Let's add another behavior: Occasionally when a bird is hunting below the water interface, it "dies" and stops in the water zone. Fish should be attracted to it (i.e. opposite of panic) to "eat" it 
- Adding some kind of moon would be interesting. Can we have the moon slowly, subtlely track across the sky in an arc?

I kind of wish I'd kept snapshots of each stage, but I was just riffing and noodling with the code. If you'd like the source, [I've got it up on GitHub](https://github.com/lmorchard/sketches-v03/tree/main/src/sketches/HuntingHorizon). It's messy and it's not groundbreaking art, but the process was gratifying. While Claude generated the bulk of the code, I didn't just sit back: I gave it ideas, did some debugging and coding, and steered things to make it my own.
