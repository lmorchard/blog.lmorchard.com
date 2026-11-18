---
title: "colophon"
---

**TL;DR**: How this site is built and what it's made of.

<!--more-->

<nav role="navigation" class="table-of-contents"></nav>

## The Generator

This blog is powered by [**Easy-Blog Oven v2.0**](https://blog.lmorchard.com/2026/11/17/baking-easy-blog-oven-v2-0-with-decafclaw/), a custom static site generator written in Go and maintained alongside my posts in [my blog.lmorchard.com git repository](https://github.com/lmorchard/blog.lmorchard.com). 

For years, it ran on a Node.js pipeline I called my [Easy-Blog Oven](/2020/05/24/easy-blog-oven/) (now Easy-Blog Oven v1). In November 2026, I retired the Node implementation and rebuilt it from scratch in Go as v2.0. The goal was simple: eliminate the perennial churn of `node_modules`, shed dozens of transitive build dependencies, and build the entire 24-year archive—over 1,400 posts spanning 2002 to the present—in just 2 to 3 seconds.

Like its predecessor, it's not an off-the-shelf framework. It is a single, zero-dependency compiled binary that converts Markdown files with YAML frontmatter (a format [inspired by Jekyll](https://jekyllrb.com/docs/posts/)) into HTML pages, chronological drilldowns, redesigned tag capsule archives, full-text and excerpt RSS feeds, XML sitemaps, and schema.org JSON-LD structured data graphs.

The Go engine uses [goldmark](https://github.com/yuin/goldmark) for CommonMark rendering, [goquery](https://github.com/PuerkitoBio/goquery) for post-processing and DOM manipulation, standard library `html/template` (with defaults embedded via `//go:embed` and local override support), pure-Go Floyd-Steinberg retro dithering without cgo, and client-side search indexing powered by [Pagefind](https://pagefind.app/). During local editing, an integrated dev server watches files and pushes instantaneous updates to the browser over Server-Sent Events (SSE).

Posts are written in Markdown, usually in Obsidian these days. The source code is [on GitHub](https://github.com/lmorchard/blog.lmorchard.com) if you're curious.

## Typography & Design

The body and heading typeface is [Bitter](https://fonts.google.com/specimen/Bitter), a serif face designed for comfortable screen reading. It's self-hosted — no Google Fonts calls.

Icons are currently Font Awesome 4.3, though I'd like to replace those with inline SVGs eventually.

The site supports light and dark color schemes, following your system preference by default with a manual toggle in the header. The theme system uses CSS custom properties throughout.

The background pattern is the [10 PRINT](https://10print.org/) maze — a single line of Commodore 64 BASIC that fills the screen with a labyrinth:

```basic
10 PRINT CHR$(205.5+RND(1)); : GOTO 10
```

`CHR$(205)` and `CHR$(206)` are the two diagonal PETSCII characters, `\` and `/`. Printing one at random per character cell, forever, produces a maze — and `RND(1)` landing either side of `.5` is the whole of the randomness. There is [an entire book](https://10print.org/) about that one line, which is the sort of thing I find delightful.

Here it is generated in the browser as a single tiled SVG, drawn as a CSS mask so it takes its colour from the same custom property as everything else and follows the light/dark theme for free. Every cell is a diagonal between opposite corners, which means the tile is seamless at any size — the only tell is that it repeats every 1536 pixels. A new maze is generated each time the site is built, so it quietly changes whenever I publish. It only shows in the margins; the column you are reading sits on top of it.

## Client-Side Features

The site is mostly static HTML with progressive enhancements layered on via vanilla JavaScript and Web Components:

- **Table of contents** with scroll-tracking highlight on longer posts
- **Reading progress bar** at the top of the viewport on long articles
- **Linkable headings** — hover over any section heading for a permalink anchor
- **Theme selector** — dark/light mode toggle, persisted in localStorage
- **Search** powered by [Pagefind](https://pagefind.app/), a static search library that indexes at build time
- **Syntax highlighting** via [highlight.js](https://highlightjs.org/)
- **Image galleries** using [lightGallery](https://www.lightgalleryjs.com/)
- **Lazy-loaded YouTube embeds** that only load the iframe on interaction
- **Mermaid diagrams** [rendered client-side](/2026/01/28/mermaid-web-component/)

## Hosting & Deployment

The site is hosted on Amazon S3 behind CloudFront. Pushing to the `main` branch triggers a GitHub Actions workflow that builds the site and syncs it to S3 with rclone, then invalidates the CloudFront cache.

There's also a staging setup that deploys to GitHub Pages for previewing changes.

## The Name

This blog has lived at blog.lmorchard.com since around 2012. Before that, it was [0xDECAFBAD](https://decafbad.com/blog/) — a name chosen because I like hexadecimal but I despise coffee without caffeine. I've been blogging in one form or another since about 2002.
