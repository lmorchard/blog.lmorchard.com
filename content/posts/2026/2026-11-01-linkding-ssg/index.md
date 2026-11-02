---
title: "Replacing a Public Linkding Instance with a Static Site"
date: 2026-11-01
tags:
  - linkding
  - golang
  - homelab
  - selfhosting
  - indieweb
  - static-sites
  - pagefind
  - mastodon
type: entry
---

**TL;DR**: I stopped exposing my homelab's dynamic Linkding instance to the public internet via Tailscale. Instead, I built [linkding-ssg](https://github.com/lmorchard/linkding-ssg), a self-contained Go CLI that snapshots my 35,000 bookmarks into a fast static site with client-side Pagefind search—embedded binaries, Ivy Bridge quirks, and all.

<!--more-->

<figure class="wide">
<img src="./jan-antonin-kolar-lRoX0shwjUQ-unsplash-dithered.png" alt="Vintage wooden library card catalog drawers with brass pulls and label plates">
<figcaption>
Photo by <a href="https://unsplash.com/@jankolar?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jan Antonin Kolar</a> on <a href="https://unsplash.com/photos/brown-wooden-drawer-lRoX0shwjUQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</figcaption>
</figure>

<nav role="navigation" class="table-of-contents"></nav>

## Hosting overkill

I’ve been running [Linkding](https://linkding.link/) in my homelab for a while now to collect bookmarks. It’s a great app—clean UI, snappy, and it plays nicely with the rest of my [feed reading Rube Goldberg machine](https://blog.lmorchard.com/2026/08/22/vanishing-feeds/). And, until tonight, I had my cloud VPS reverse-proxying `links.lmorchard.com` directly back into my home network over Tailscale so anyone on the web could browse my links.

It was neat & clever to set up, but I realized how silly it was.

I’m the only person who adds, tags, or edits bookmarks in this collection. Why was I exposing a dynamic Django application to the public internet, tunneling inbound web traffic straight into my home server, and fretting over bots abusing my search form—when it's all essentially read-only anyway?

If my home internet hiccups or my Proxmox server reboots, my public links shouldn't vanish. And flat files served by Caddy with zstd/gzip compression will run circles around a dynamic backend. 

Plus, having a static snapshot means my archive—stretching all the way back to del.icio.us imports from 2003—lives locally in a clean, portable format, independent of whether Linkding itself survives the next decade.

This isn't the first time I've gone down this road, either. I built [fossilizer](https://github.com/lmorchard/fossilizer) with a similar mindset: collecting all my Mastodon posts across multiple servers and years, turning them into a searchable static archive over at [old-toots.lmorchard.com](https://old-toots.lmorchard.com/).

There's something deeply satisfying about "fossilizing" your personal data out of ephemeral web apps into permanent, resilient static files.

So, I built [linkding-ssg](https://github.com/lmorchard/linkding-ssg): a standalone Go CLI that pulls bookmarks from Linkding's REST API, snapshots them to JSON, and builds a fully searchable static archive.

## The scale (isn't really a) problem

I've got over 35,000 bookmarks. A lot of static site generators fall over when you throw that much at them.

The usual `/page/N/` pagination is especially toxic for large static archives: adding five new bookmarks at the top shifts the boundaries of *every single page* on the entire site. That means thousands of file modifications on every build, cache invalidations across the board, and massive `rsync` deltas.

To keep the site fast and the files mostly immutable, I settled on a **temporal + sharded** structure:

<figure class="code-block">

```
dist/
├── index.html                   # Recent bookmarks (latest 50) + RSS link
├── feed.xml                     # RSS 2.0 feed of recent bookmarks
├── archive/
│   ├── index.html               # 25-year timeline grid linking to months
│   ├── 2026/10/index.html       # Monthly archive (immutable once past)
│   └── 2003/09/index.html
├── tags/
│   ├── index.html               # All 9,100+ tags sorted by frequency
│   └── webdev/
│       ├── index.html           # Tag listing
│       └── feed.xml             # Scoped RSS feed for #webdev
├── b/
│   └── 038/38825/index.html     # Sharded canonical permalinks (/b/{shard}/{id}/)
├── about/index.html             # Rendered from custom markdown in data/pages/
└── pagefind/                    # Client-side full-text search index & UI
```

</figure>

### Cool URLs don't change
Once a month is in the past (like September 2003 or May 2018), that page is frozen. Incremental updates only touch `index.html`, `feed.xml`, the current month, and newly added bookmarks.

### Directory sharding
Dumping 35,000 directories in a single folder can cause filesystem headaches. Sharding bookmark permalinks by ID bucket (`/b/038/38825/`) caps any single folder to at most 1,000 subdirectories.

## Static site search with Pagefind

A static bookmark collection without search is almost useless. I first discovered [Pagefind](https://pagefind.app/) while building client-side search for this blog (which is also a static site). It builds compact, chunked search indices and executes queries inside a Web Worker in the browser without needing a dynamic search backend.

However, I wanted `linkding-ssg` to be a **completely standalone Go binary** running on a minimal Linux VM—without dragging along Node.js, `npm`, or `npx`.

Pagefind's indexer is written in Rust and publishes standalone `musl` binaries for Linux and macOS. To make the CLI 100% self-contained:
- I embedded Pagefind's compressed binaries directly into the Go binary using Go build tags (`//go:build linux && amd64`, `//go:build darwin && arm64`).

- Go's compiler only embeds the binary matching the target platform, adding just ~4.5 MB to the executable.

- When running `linkding-ssg build --index`, the CLI extracts Pagefind to `data/bin/pagefind` on first run and executes it directly. Zero external runtime dependencies.

### A fun hardware discovery

When I first deployed the standalone binary to my Proxmox server, Pagefind immediately crashed with: `signal: illegal instruction (core dumped)`

The server runs an Intel Core i7-3770 (Ivy Bridge, released in 2012). Checking `/proc/cpuinfo` revealed the processor supports `avx` and `sse4_2`, but lacks `avx2` and `bmi1/bmi2` (which Intel didn't introduce until Haswell in 2013). Pagefind's v1.6.0 release was compiled targeting `x86-64-v3` (AVX2), tripping illegal instruction traps on Ivy Bridge.

Dropping back to Pagefind v1.5.2—which was compiled for the standard `x86-64-v2` baseline—fixed the crash immediately while retaining the full Web Component search UI.

## Speedy site generation

The scale here is just a little bit gratuitous. But, it's just files, and computers can go really fast with files these days.

Generating **44,000 HTML pages**, **9,100 tag pages**, and **9,100 RSS feeds** sequentially took around 57 seconds on a single core.

Because each bookmark card and tag page is completely independent, and Go's `html/template` parse tree is read-only and thread-safe during execution, this was trivially parallelizable. 

I added a bounded worker pool defaulting to `runtime.NumCPU()` (or `--concurrency`):
- **Tag pages & tag RSS feeds**: 38s → 10s
- **35,000 bookmark permalinks**: 14s → 5s
- **Total build time**: **~20 seconds** to generate 53,000 files.

## Deployment

The sync pipeline between my home server and the cloud VPS is dead simple:

<figure>
<mermaid-diagram>
graph TD
  A["Linkding Container<br>(localhost:19090)"] -->|"1. linkding-ssg sync"| B["Local Snapshot & Build<br>data/bookmarks.json + dist/"]
  B -->|"2. rsync via SSH / rrsync"| C["Cloud VPS (aerostat02)<br>/srv/www/links.lmorchard.com"]
  C -->|"3. Caddy HTTPS static serve"| D["Public Visitors"]
</mermaid-diagram>
<figcaption>
  The linkding-ssg build and deployment pipeline
</figcaption>
</figure>

1. **Incremental Sync**: `linkding-ssg sync` queries the Linkding REST API (`/api/bookmarks/`). Because Linkding serves bookmarks newest-first, the CLI stops fetching as soon as it sees an ID already present in the local `data/bookmarks.json`. It merges edits, builds the HTML, and runs Pagefind.

2. **Restricted `rrsync` Deploy**: On my cloud VM (`aerostat02`), Caddy serves `/srv/www/links.lmorchard.com`. The deployment uses an SSH key confined via OpenSSH `command="/usr/bin/rrsync /srv/www/links.lmorchard.com",restrict`. The key cannot spawn a shell or forward ports into my network; it can only write files to that one folder.

3. **Automated via Makefile**: A simple Makefile on the home server ties it together:

   <figure class="code-block">

   ```makefile
   publish:
       ./linkding-ssg sync
       rsync -rltvz --delete --omit-dir-times \
           -e "ssh -i ~/.ssh/id_ed25519" \
           dist/ \
           webdeploy@aerostat02.lmorchard.com:
   ```

   </figure>

A cron job runs `make publish` hourly.

## Headless homelab, static web

This setup scratches a lot of personal itches:

- **Self-hosting doesn't mean everything needs to be a public web app**: Treating dynamic applications as headless CMSs inside the LAN while publishing static output publicly gives you the best of both worlds. The editing UX stays interactive, but the public surface is bulletproof, fast, and un-hackable.

- **Embedded single binaries are great**: Packaging default templates, styles, and external CLI tools inside one Go binary makes deployments onto minimal Linux containers painless.

- **Old hardware is still plenty capable**: A 12-year-old Ivy Bridge box in a closet can index 35,000 documents and push a static site across the internet in under two minutes without breaking a sweat.

You can check out the source on GitHub at [lmorchard/linkding-ssg](https://github.com/lmorchard/linkding-ssg), and browse the live result at [links.lmorchard.com](https://links.lmorchard.com/).
