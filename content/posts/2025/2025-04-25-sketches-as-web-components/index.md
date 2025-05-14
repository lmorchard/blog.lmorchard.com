---
title: "Sketches as Web Components"
tags:
  - webcomponents
  - webdev
---

For years, I've tinkered with game development on the web. But, I haven't finished (m)any games. So, I decided to just focus more on finishing little interesting sketches of graphics and sound. This time around, I'm playing with portals—er, I mean Web Components

<!--more-->

What's really neat (to me) is that I took [a web sketch from a few years ago](https://lmorchard.github.io/sketches-v01/sketches/2021/vector-avatars/index.html), then [reshuffled all the code into a web component](https://github.com/lmorchard/sketches-v03/blob/main/src/sketches/VectorAvatar/VectorAvatar.js). Published that [to GitHub Pages](https://lmorchard.github.io/sketches-v03/) and now I can use it in other places. Like, in CodePens and blog posts like this one!

<figure>
<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/lmorchard/embed/gbbgLNN?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/lmorchard/pen/gbbgLNN">Testing cross-site inclusion of my web component sketches</a> by Les Orchard (<a href="https://codepen.io/lmorchard">@lmorchard</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
<figcaption>Someday, I should make my own local codepen component 🤔</figcaption>
</figure>

<script type="module" src="./dist/sketches/VectorAvatar/VectorAvatar.js"></script>

<style>
vector-avatar {
  display: inline-block;
  width: 100px;
  height: 100px;
}
</style>

<figure>
<div>
<vector-avatar></vector-avatar>
<vector-avatar></vector-avatar>
<vector-avatar></vector-avatar>
<vector-avatar></vector-avatar>
<vector-avatar></vector-avatar>
</div>
<figcaption>If you view source or inspect this page, you can see I used the web component right here!</figcaption>
</figure>

The other thing I'm trying is splitting the difference on build / no-build: The external dependencies get bundled up into shared reusable modules with code splitting for cache-friendliness. The rest of my code is ES modules loaded straight up by the browser.

If, on some inevitable day, the build tools fail, I should just be able to take a snapshot of the last good bundles and keep trucking on.
