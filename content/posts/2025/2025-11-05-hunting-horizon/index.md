---
title: "Creating a Hunting Horizon web sketch with a Claude skill"
tags:
  - webcomponents
  - webdev
  - claude
  - genai
  - codegen
  - sketches
  - skills
---

For years, I've tinkered with game development on the web. But, I haven't finished (m)any games. So, I decided to just focus more on finishing little interesting sketches of graphics and sound. This time around, I'm playing with portals—er, I mean Web Components

<!--more-->

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

<figure>
<div>
<hunting-horizon></hunting-horizon>
</div>
<figcaption>If you view source or inspect this page, you can see I used the web component right here!</figcaption>
</figure>

The other thing I'm trying is splitting the difference on build / no-build: The external dependencies get bundled up into shared reusable modules with code splitting for cache-friendliness. The rest of my code is ES modules loaded straight up by the browser.

If, on some inevitable day, the build tools fail, I should just be able to take a snapshot of the last good bundles and keep trucking on.
