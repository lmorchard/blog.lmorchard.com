---
title: "Colophon"
---

**TL;DR**: How this site is built and what it's made of.

<!--more-->

<nav role="navigation" class="table-of-contents"></nav>

## The Generator

This blog is powered by a custom static site generator I built in Node.js — I call it my [Easy-Blog Oven](/2020/05/24/easy-blog-oven/). No off-the-shelf framework — just a bespoke pile of scripts that converts Markdown files with YAML frontmatter (a format [inspired by Jekyll](https://jekyllrb.com/docs/posts/)) into HTML pages, indexes, tag archives, and RSS feeds. It's been through several iterations over the years and I keep tinkering with it.

Posts are written in Markdown, usually in Obsidian these days, and the build pipeline handles the rest: rendering content, generating indexes, optimizing images with [sharp](https://sharp.pixelplumbing.com/), and bundling client-side assets with [esbuild](https://esbuild.github.io/).

The source is [on GitHub](https://github.com/lmorchard/blog.lmorchard.com) if you're curious.

## Typography & Design

The body and heading typeface is [Bitter](https://fonts.google.com/specimen/Bitter), a serif face designed for comfortable screen reading. It's self-hosted — no Google Fonts calls.

Icons are currently Font Awesome 4.3, though I'd like to replace those with inline SVGs eventually.

The site supports light and dark color schemes, following your system preference by default with a manual toggle in the header. The theme system uses CSS custom properties throughout.

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
- **Mermaid diagrams** rendered client-side

## Hosting & Deployment

The site is hosted on Amazon S3 behind CloudFront. Pushing to the `main` branch triggers a GitHub Actions workflow that builds the site and syncs it to S3 with rclone, then invalidates the CloudFront cache.

There's also a staging setup that deploys to GitHub Pages for previewing changes.

## The Name

This blog has lived at blog.lmorchard.com since around 2012. Before that, it was [0xDECAFBAD](https://decafbad.com/blog/) — a name chosen because I like hexadecimal but I despise coffee without caffeine. I've been blogging in one form or another since about 2002.
