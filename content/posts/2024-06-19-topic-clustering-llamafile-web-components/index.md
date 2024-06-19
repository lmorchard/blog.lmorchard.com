---
title: Clustering ideas with Llamafile and Web Components
tags:
  - ai
  - ml
  - llm
  - genai
  - webdev
  - webcomponents
  - ClusteringIdeasWithAI
---

**TL;DR**: In [my previous posts](https://blog.lmorchard.com/tag/ClusteringIdeasWithAI/), I tinkered with a few variations on clustering ideas by named topics using embeddings and text generation. In this post, I'm going to show off a web UI that I built to make this stuff easier to play with interactively.

<!--more-->

<figure class="fullwidth">
  <img src="./cover.png">
  <figcaption>I asked DALL-E to generate "a human astronaut and a llama driving a giant construction robot, building a cluster of ideas". Then, I ran a few imagemagick transformations on it for fun.</figcaption>
</figure>

## Organizing notes with AI

Figma offers [FigJam](https://www.figma.com/figjam/), a handy tool for collaborative brainstorming and notes. It has an [AI-powered  "organize" feature](https://www.theverge.com/2023/11/7/23950667/figma-figjam-generative-ai-design-tools-beta-announcement) to group stickies into named clusters. Here's what that looks like:

<figure class="fullwidth">
  <video controls>
    <source src="./figjam-sorting-demo.mp4" type="video/mp4" />
    <a href="./figjam-sorting-demo.mp4">figjam-sorting-demo.mp4</a>
  </video>
  <figcaption>A quick demo of FigJam's sticky organization feature - it's more legible in fullscreen view</figcaption>
</figure>

I don't know how [FigJam](https://www.figma.com/figjam/) implements this feature. But, I took a shot at my own implementation of this, using things I've picked up around machine learning and generative AI so far:

1. map the notes as points in a semantic space using [vector embeddings](https://cloud.google.com/blog/topics/developers-practitioners/meet-ais-multitool-vector-embeddings)
2. apply [k-means clustering](https://en.wikipedia.org/wiki/K-means_clustering) to group nearby points in space
3. map points back to groups of notes, then use a [large language model](https://en.wikipedia.org/wiki/Large_language_model) to generate labels

To this point, I've worked through three variations of the above. I [played with OpenAI's APIs](https://blog.lmorchard.com/2024/04/27/topic-clustering-gen-ai/), [local models via PyTorch and Sentence Transformers](https://blog.lmorchard.com/2024/05/01/topic-clustering-local-models/), and finally [with a local model via Llamafile](https://blog.lmorchard.com/2024/05/10/topic-clustering-llamafile/).

## Interfacing with a user

For each of those earlier posts, the input was a list of notes embedded in Python source code. And, the resulting output of clustered notes was dumped out as text. I guess that can be considered a "user interface" of sorts, since I built everything in Jupyter Notebooks.

But, there's at least one reason why [FigJam](https://www.figma.com/figjam/) is popular & handy: It's got an "[infinite canvas](https://en.wikipedia.org/wiki/Infinite_canvas)" style user interface where folks can lay out ideas like sticky notes or index cards on a giant virtual table. You can just literally throw ideas out into a virtual space and drag them around. It lends itself well to becoming a multiplayer game where lots of folks can play. Adding an AI-powered "organize" feature to that space is just a cherry on top.

This also leads me to a notion I've been trying on for size: **The best features & products that benefit from machine learning and generative AI consist of a small kernel of this "exotic" technology wrapped in many more layers of more "mundane" stuff.**

That is, ML / AI doesn't need to be the main course, it can be seasoning like adding mushrooms or fish sauce to a dish for some unexpected umami. Best is when the AI fades into the background.

So, maybe counter-intuitively, this fourth post in my topic clustering series offers very little in terms of new machine learning and generative AI stuff. The main thing here is me tinkering with a little core of AI, wrapped in a larger shell of "infinite canvas" user interface.

## Playing along at home

If you want to play at home, this post moves away from the Jupyter Notebooks that I used in previous posts. This time, I'm using a little [node.js](https://nodejs.org/en) web server atop [Llamafile](https://github.com/Mozilla-Ocho/llamafile) to host a static site and to proxy access to the server API.

You can find the source code here on Github:

- https://github.com/lmorchard/llamafile-idea-clustering

Like I did with the notebooks, I'll leave it as an exercise to the reader to work out how to get [node.js](https://nodejs.org/en) installed. And, this isn't a particularly complex server, so hopefully you can get it up and running with just the following commands:

```bash
npm run setup
npm start
```

You'll probably want to read through [`package.json` and the `scripts` defined](https://github.com/lmorchard/llamafile-idea-clustering/blob/main/package.json#L6-L18) in there. Nothing too complex going on, but it can help to understand what they do.

The `setup` script aims to download the same TinyLlama model [I used in my previous post](https://blog.lmorchard.com/2024/05/10/topic-clustering-llamafile/#acquiring-a-llamafile). Running it should offer output like the following:

```bash

> llamafile-idea-clustering@1.0.0 setup
> npm-run-all setup:unix:llamafile setup:unix:llamafileexe


> llamafile-idea-clustering@1.0.0 setup:unix:llamafile
> curl --no-clobber -L -o TinyLlama-1.1B-Chat-v1.0.Q4_0.llamafile https://huggingface.co/Mozilla/TinyLlama-1.1B-Chat-v1.0-llamafile/resolve/main/TinyLlama-1.1B-Chat-v1.0.Q4_0.llamafile?download=true

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1181  100  1181    0     0   7094      0 --:--:-- --:--:-- --:--:--  7114
100  641M  100  641M    0     0  10.8M      0  0:00:59  0:00:59 --:--:-- 11.0M

> llamafile-idea-clustering@1.0.0 setup:unix:llamafileexe
> chmod +x ./TinyLlama-1.1B-Chat-v1.0.Q4_0.llamafile
```

After this, you should hopefully have the appropriate Llamafile downloaded and set as executable for Linux or macOS.

The `start` script is intended to run both the Llamafile server and the node.js server in parallel, so that you can access the local web application in your browser and so that the application can make requests to the Llamafile server API.

If `npm start` runs successfully, you should see something like this in your terminal:

```bash
Server is running on http://localhost:8886
Serving static files from public
Proxying API requests to http://127.0.0.1:8887
```

From here, you should be able to open http://localhost:8886 in your browser and start playing.

(Note that there are some Windows-flavored script variations like `setup:windows` and `start:windows` available to run from PowerShell - but they may need some work. 😅)

## Clustering topics with the web app

Since this is a blog post about a graphical interface, a few videos of this thing in action would probably be handy. Here's a look at loading up and organizing a canned demo set of notes:

<figure class="fullwidth">
  <video controls>
    <source src="./topic-clustering-demo-1.mp4" type="video/mp4" />
    <a href="./topic-clustering-demo-1.mp4">topic-clustering-demo-1.mp4</a>
  </video>
  <figcaption>Organizing a canned demo set of notes</figcaption>
</figure>

So, that's the core of the app - taking a cloud of unorganized notes floating in space and applying some ✨magic✨ to pull these notes into topical clusters.

You can drag clusters around and see the associated notes move along with them. The canvas itself can be dragged to pan around, and you can use the mouse wheel or trackpad scroll gestures to zoom in and out of the canvas.

<figure class="fullwidth">
  <video controls>
    <source src="./topic-clustering-demo-2.mp4" type="video/mp4" />
    <a href="./topic-clustering-demo-2.mp4">topic-clustering-demo-2.mp4</a>
  </video>
  <figcaption>Canvas navigation</figcaption>
</figure>

But, this set of demo notes isn't very useful. You'd probably like to bring in your own notes and thoughts. And, ideally, get them back out of the app when you're done. For that, I've added a quick & dirty little import / export dialog:

<figure class="fullwidth">
  <video controls>
    <source src="./topic-clustering-demo-3.mp4" type="video/mp4" />
    <a href="./topic-clustering-demo-3.mp4">topic-clustering-demo-3.mp4</a>
  </video>
  <figcaption>Editing notes</figcaption>
</figure>

Once you've had a few rounds of organizing notes, you can twiddle some sliders to try tuning your results. For example, you can influence the clustering mainly through the number of clusters requested:

<figure class="fullwidth">
  <video controls>
    <source src="./topic-clustering-demo-4.mp4" type="video/mp4" />
    <a href="./topic-clustering-demo-4.mp4">topic-clustering-demo-4.mp4</a>
  </video>
  <figcaption>Changing the number of topic clusters</figcaption>
</figure>

Then, you can play around with the parameters supplied to the Large Language Model when generating titles for each cluster.

<figure class="fullwidth">
  <video controls>
    <source src="./topic-clustering-demo-5.mp4" type="video/mp4" />
    <a href="./topic-clustering-demo-5.mp4">topic-clustering-demo-5.mp4</a>
  </video>
  <figcaption>Tweaking LLM parameters</figcaption>
</figure>

And, you can edit the prompts supplied to the LLM for title generation:

<figure class="fullwidth">
  <video controls>
    <source src="./topic-clustering-demo-6.mp4" type="video/mp4" />
    <a href="./topic-clustering-demo-6.mp4">topic-clustering-demo-6.mp4</a>
  </video>
  <figcaption>Changing the LLM prompt</figcaption>
</figure>

All-in-all, this an interactive demo and not a clone or alternative to [FigJam](https://www.figma.com/figjam/). There's plenty of room for improvement to make this a more serious idea management tool, but I think it's an interesting start for playing with the underlying technologies.

## Examining the "exotic" core matter

As I mentioned earlier, I think what's interesting is to build a small kernel of "exotic matter" from ML/AL technology and then wrap it in a shell of more "mundane" technology to implement a user interface and integrations with other systems. 

Apropos of that, the core of this application should look very similar to [what I wrote about in my last post using Llamafile](https://blog.lmorchard.com/2024/05/10/topic-clustering-llamafile/):

```javascript
  async organizeNotes() {
    const notes = this.canvas.querySelectorAll("sticky-note");
    const itemsWithIds = [];
    for (const note of notes) {
      itemsWithIds.push({
        id: note.id,
        item: note.innerText,
      });
    }

    const embeddingsResponse = await llamafile("embedding", { content: items });
    const embeddings = embeddingsResponse.results.map((r) => r.embedding);

    const { centroids, idxs } = skmeans(embeddings, this.uiOptions.numClusters);
    const clusters = centroids.map((_centroid, currIdx) =>
      idxs
        .map((idx, itemIdx) => idx === currIdx && itemsWithIds[itemIdx])
        .filter((x) => !!x)
    );

    for (let clusterIdx = 0; clusterIdx < clusters.length; clusterIdx++) {
      const cluster = clusters[clusterIdx];
      const prompt = this.prompt(cluster.map((item) => item.item));
      const result = await llamafile("completion", {
        prompt,
        ...this.llmParameters,
      });

      this.addClusterTopic(
        `cluster-${clusterIdx}`,
        clusterIdx,
        clusters.length,
        cluster,
        result.content.trim()
      );
    }
  }
```

This is JavaScript rather than Python, but the algorithm is essentially the same:

- gather notes from DOM elements in the canvas
- make an HTTP request to the local Llamafile server API to generate embeddings for notes
- use k-means clustering to organize the notes via embeddings - courtesy of [this MIT-licensed `skmeans` module by David Gómez Matarrodona](https://github.com/solzimer/skmeans)
- make calls to the local Llamafile server to generate titles for each cluster of notes 
- insert cluster topic components to wrangle the elements in the canvas into groups

Beyond this hunk of about 3 dozen lines of code, the rest is just plain old web technology.

## Serving up the app shell

At the base of this app is a small node.js server. There's not much to it:

```javascript
#!/usr/bin/env node
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

const PORT = 8886;
const staticFilesDirectory = 'public';
const llamafileBaseUrl = 'http://127.0.0.1:8887';

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(staticFilesDirectory);

const app = express();
app.use(connectLiveReload());
app.use(express.static(staticFilesDirectory));
app.use('/', createProxyMiddleware({ target: llamafileBaseUrl }));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Serving static files from ${staticFilesDirectory}`);
    console.log(`Proxying API requests to ${llamafileBaseUrl}`);
});
```

Most of this is glue code copied from examples. The main purpose is to serve up a web app from static files, along with some proxy middleware to give the app access to a local Llamafile server without running afoul of [CORS rules](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). Oh, and there's a live reload service thrown in there just so my pages refresh automatically as I edit the source code.

This is a place where Llamafile could someday make apps easier to build: If it could serve up a static site from a given directory, there'd really be no need for this little node.js server. That, or I could look into bundling this all together in an [Electron](https://www.electronjs.org/) or [Tauri](https://tauri.app/) app?

## Building the "mundane" app shell

These days, you can do a lot with a browser. To keep this blog post from becoming my next book, I'm not going to show off every line of code. But, I think there are some interesting highlights in the construction of this thing if you feel like perusing [the code](https://github.com/lmorchard/llamafile-idea-clustering/):

- Vanilla JavaScript and ES6 modules without any build tooling feels pretty good to me.

- Minimal dependencies are nice - namely [Lit](https://lit.dev/), [tweakpane](https://github.com/cocopon/tweakpane), [skmeans](https://github.com/solzimer/skmeans), and [springy](getspringy.com).

- Web Components using the [Lit](https://lit.dev/) library are pretty easy to build without straying too far from vanilla JavaScript.

- Reusable aspects of Web Components can be extracted using ["mixins" with dynamic JS classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends#mix-ins) - also [as recommended in the Lit documentation](https://lit.dev/docs/composition/mixins/)

- Rigging up some pleasing animations & interactions with a light physics simulation was pretty easy thanks to the [springy](getspringy.com) library and some glue code to bind it to DOM elements.

- Panning and zooming using [the `transform` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) and [an annoying bit of math](https://github.com/lmorchard/llamafile-idea-clustering/blob/main/public/lib/mixins/PanZoomableMixin.js#L35-L54) was particularly satisfying to figure out.

- [tweakpane](https://github.com/cocopon/tweakpane) is a super handy library for composing quick little control panels and readouts.

- [HTMLDialogElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement) is a thing and quite handy for popping up little modal dialogs without resorting to external dependencies

- [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) is also a thing and also quite handy for reacting to DOM changes - kind of a different mental model than state management in React, but it's built into the browser

## Wrapping up

The main thing I wanted to explore here was wrapping a little bit of AI-powered functionality in an interactive user interface. Granted, it's not the best UI in the world, but I think it's worth trying to make it easier to play with and experience this stuff.

There's also a good layer of grunge and hacky bits lurking in my code. But, I felt like I got in a pretty cozy groove with building components and layering in behavior & functionality. I wouldn't mind revisiting this project in the future or repurposing some of its parts for further experiments.

Also, though I managed to stick with a single Llamafile process using the TinyLlama model, it could be advantageous to run multiple models. As it turns out, [some models are better at generating embeddings](https://future.mozilla.org/news/llamafiles-for-embeddings-in-local-rag-applications/) while others are better at generating text - and that's not even getting into tasks like summarizing text or mucking around with images. So, a future direction for a project like this could be an exploration of orchestrating multiple local models along with serving up the static web app.

And, if we're talking about orchestrating things, it might be handy to add a few more services and resources. Like, a little SQLite database and maybe some filesystem access along with AI models could add up to a nice little local application stack? I'd be interested in trying something like that to poke around at my personal notes collection in Obsidian.

So, we'll see if I can come back with further posts in this series. Hopefully back to some smaller bits of tinkering before I fall down another big rabbit hole. 😅