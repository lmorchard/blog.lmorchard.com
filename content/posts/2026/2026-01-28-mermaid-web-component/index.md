---
title: "Wrapping Mermaid Diagrams in a Web Component"
tags:
  - webdev
  - javascript
  - webcomponents
  - mermaid
  - esbuild
---

*TL;DR:* I've been wanting to add diagram support to my blog posts for a while now. I saw [beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) on [Hacker News](https://news.ycombinator.com/item?id=46804828) and thought it was neato. But, I felt super lazy, so I tasked Claude Code with wrapping it in a web component.

<!--more-->

<figure>
<img src="annette-batista-day-op5zrC8iaDQ-unsplash-dithered.png" />
<figcaption>Photo by <a href="https://unsplash.com/@annetteb?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Annette Batista Day</a> on <a href="https://unsplash.com/photos/green-mermaid-tail-under-water-op5zrC8iaDQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></figcaption>
</figure>

<nav role="navigation" class="table-of-contents"></nav>

## Why beautiful-mermaid?

There are plenty of Mermaid renderers out there, but beautiful-mermaid looked keen for a few reasons:

- Apparently fast - Renders "100+ diagrams in under 500ms" they claim. (I haven't benchmarked it.)
- Live theme switching - Uses CSS custom properties, so you can change themes without re-rendering. That dovetails into my little theme switcher component up in the corner of the page.
- Zero DOM dependencies - Perfect for web components, it just renders an SVG.

## Claude did my homework

Usually, when I see something like this, I think "wouldn't it be nice if..." and add a note to my "someday" to-do list and never, ever get around to it. This time, though, I popped open a terminal in a dev container with my blog, started Claude Code, and vomited this prompt:

> Take a look at this project - I'm curious whether we could wrap it in a web component for rendering Mermaid content in blog posts, following the pattern of other components in @public/js/components/ https://github.com/lukilabs/beautiful-mermaid   
> I'm thinking it should render text content inside the component tag. Also, can we consider using something like esbuild to create a vendor-specifc bundle from beautiful-mermaid and load that as a module in our web component? Some context on that vendor bundle idea: https://blog.lmorchard.com/2025/05/31/no-build-webdev/ https://github.com/lmorchard/sketches-v03/blob/main/build.js https://github.com/lmorchard/sketches-v03/tree/main/src/lib/bundles     

And, you know what it did? It read all those links I gave it. It also found the [MANUAL.md](https://github.com/lmorchard/blog.lmorchard.com/blob/main/MANUAL.md) for my blog. And then it just... built the component, pretty much like I would have done if I were less lazy tonight. And it incorporated the build script into my bespoke site generator. And it fired up the Playwright MCP server to get a look at the final result rendered in Chrome and fixed another bug or two.

<figure class="fullwidth">
<mermaid-diagram>
graph LR
  A[See HN Post] --> B[Give Claude Links]
  B --> C[Claude Builds It]
  C --> D{Ship it?}
  D -->|No| E[Les: One more thing]
  D -->|Yes| H[Blog Post]
  E --> C
  H --> I[Claude Writes That Too]
  I --> J[😅]
</mermaid-diagram>
<figcaption>
  How Claude did my homework
</figcaption>
</figure>

Sure, I gave a few more hints and bits of feedback, asked it to tweak a few things. But, I went from seeing a nice library to having it working on my blog in about 20 minutes on the couch watching TV. Granted, it's not the most complicated web component, but it saved me probably 45 - 60 minutes of reading docs and typing.

Oh yeah, and Claude generated a first draft for this blog post based on the chat transcript. Then, I came by and rewrote most of it. But, at least it wasn't a blank page.

## The Web Component

The `<mermaid-diagram>` component is straightforward. You can see the source, [over here on GitHub](https://github.com/lmorchard/blog.lmorchard.com/blob/main/content/public/js/components/mermaid-diagram.js). There's a few wrapper smarts in there, mainly to pass in element attributes as rendering options and react to theme changes - click the little switch in the upper right to see that happen. Like other components around here, this one gets lazily loaded. I also threw in a few hacky bits to ensure the SVG size fits into my general image styles.

Here, have an unnecessary and gratuitous `sequenceDiagram`:

<figure>

<figcaption>
How the `mermaid-diagram` component works
</figcaption>

<mermaid-diagram>
sequenceDiagram
  participant Browser
  participant Component
  participant Library

  Browser->>Component: Page Load
  Component->>Component: Store Diagram Source
  Component->>Library: import()
  Library-->>Component: { renderMermaid }
  Component->>Library: renderMermaid(source, theme)
  Library-->>Component: SVG string
  Component->>Browser: Display SVG

  Browser->>Component: Theme Change Event
  Component->>Component: Update CSS Properties
  Component->>Browser: Live Update
</mermaid-diagram>

</figure>

## The Build Setup

These days, I'm a huge fan of a [no-build approach](/2025/05/31/no-build-webdev/) for JavaScript. But, I had to compromise a bit for this [beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) code. Still, I've got a pattern that I liked from earlier projects, where I only bundle the *vendor* code but keep all *my* ES6 modules unmodified.

### 1. Vendor Bundle Source

I created [a simple re-export file](https://github.com/lmorchard/blog.lmorchard.com/blob/main/content/public/js/vendor/bundles/beautiful-mermaid.js), which just pulls in what I plan to use:

```javascript
export { renderMermaid, renderMermaidAscii } from "beautiful-mermaid";
```

### 2. Build Script

Then, I wrote [a quick little build script using esbuild](https://github.com/lmorchard/blog.lmorchard.com/blob/main/lib/vendorBundles.js):

```javascript
import * as esbuild from "esbuild";
import fs from "node:fs/promises";
import globby from "globby";
import path from "node:path";

const VENDOR_SRC_PATH = "./content/public/js/vendor/bundles";
const VENDOR_BUILD_PATH = "./build/js/vendor/bundles";

export async function buildVendorBundles() {
  await fs.rm(VENDOR_BUILD_PATH, { recursive: true, force: true });
  await fs.mkdir(VENDOR_BUILD_PATH, { recursive: true });

  await esbuild.build({
    outdir: path.resolve(VENDOR_BUILD_PATH),
    entryPoints: await globby(path.resolve(VENDOR_SRC_PATH, "**/*.js")),
    minify: true,
    bundle: true,
    splitting: true,
    sourcemap: true,
    format: "esm",
    logLevel: "info",
  });
}
```

That left me with a standalone vendor module that I could actually just copy into my repository and later skip the build, if I really wanted. But, this is easy enough to include in [my Easy-Blog Oven build code](https://github.com/lmorchard/blog.lmorchard.com/blob/main/index.js#L48C9-L48C27). So, I'll leave the bundling in there for now. All-in-all, this seems like such a lighter build process than I've ever had in the past with things like gulp and webpack. Super fast, too.

Oh, and the one tricky bit was that the source files need to be **excluded** from the normal asset copy, then bundled separately (duh):

```javascript
// In lib/assets.js
await copyWithOptimization(assetPath, config.buildPath, {
  overwrite: true,
  optimize,
  filter: [
    '**/*',                          // Include all files
    '!js/vendor/bundles/**/*',       // Exclude vendor bundle sources
  ],
});
```

## Wrapping up

So I guess I have a web component that renders Mermaid diagrams, now. Kind of neat that I got a bot to write most of it for me, instead of procrastinating again for another few years. Next step is to (ab)use it in future posts.
