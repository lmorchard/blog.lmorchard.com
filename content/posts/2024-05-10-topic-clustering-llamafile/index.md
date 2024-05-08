---
title: Clustering ideas with Llamafile
tags:
  - ai
  - ml
  - llm
  - genai
  - ClusteringIdeasWithAI
---

**TL;DR**: In [my previous post][], I used local models with PyTorch and Sentence Transformers to roughly cluster ideas by named topic. In this post, I'll try that again, but this time with Llamafile on my own hardware.

<!--more-->

<figure class="fullwidth">
  <img src="./cover.png">
  <figcaption>I asked DALL-E to generate "a an image of astronauts riding llamas to herd ideas from deep space into clusters". Then, I ran a few imagemagick transformations on it for fun.</figcaption>
</figure>

<nav role="navigation" class="table-of-contents"></nav>

## Organizing sticky notes in FigJam

If you've been following along, then you know what inspired this series of posts is a feature in Figma's [FigJam][] tool.

It has an "organize" feature [which uses AI]((https://www.theverge.com/2023/11/7/23950667/figma-figjam-generative-ai-design-tools-beta-announcement)) to group stickies into named clusters.

I'm getting a lot of blog-mileage out of this little video:

<figure class="fullwidth">
  <video controls>
    <source src="./figjam-sorting-demo.mp4" type="video/mp4" />
    <a href="./figjam-sorting-demo.mp4">figjam-sorting-demo.mp4</a>
  </video>
  <figcaption>A quick demo of FigJam's sticky organization feature - it's more legible in fullscreen view</figcaption>
</figure>

## How to organize notes

I still don't know how [FigJam][] implements this feature. But, here's how I'm doing it:

1. map the notes as points in a semantic space using [vector embeddings][]
1. apply [k-means clustering][] to group nearby points in space
1. map points back to groups of notes, then use a [large language model][] to generate labels

My first two swings at this turned out not terrible, so I'm pretty hopeful this variation on the theme will yield something interesting.

## Play along at home

If you want to follow along like [last time][my previous post], here's a notebook to run in your own environment:

- [topic_clustering_with_llamafile.ipynb](./topic_clustering_with_llamafile.ipynb)

And, for this post especially, I'd emphasize the value of running everything on your own hardware. Hopefully that makes more sense as this post unfolds - especially as we take a look at [Llamafile][].

## Introducing Llamafile

What's a [Llamafile][], you might ask?

<figure class="inset right">
  <img src="./llamafile-logo.png" />
  <figcaption>The Llamafile logo, it looks a bit smug?</figcaption>
</figure>

In a nutshell, it's a [large language model][] that's been bundled up with the code to run it. This bundle is a standalone executable created in [a very clever way][cosmopolitan], such that the *exact same file* works across many different operating systems and hardware combinations.

In other words, the same downloaded file can run on Windows, MacOS, and Linux. It even supports acceleration on GPUs from Nvidia, AMD, and Apple - which itself a pretty neat trick, since a lot of ML & AI tools are limited to Nvidia hardware.

I find this near-universal binary handy, because it means I can run this stuff on both my work-issued MacBook Pro and my AMD-based gaming PC sitting in the next room over.

(I don't actually have any Nvidia hardware on hand, which is a bit awkward for this stuff. 😅)

## Acquiring a Llamafile

There's a growing pile of ready-made Llamafiles available. For this post, I'm going to focus on essentially the same model that I used in [my previous post][] - i.e. [TinyLlama](https://huggingface.co/jartine/TinyLlama-1.1B-Chat-v1.0-GGUF).

Here's a link to download the particular flavor I'll use in this post:

- [`TinyLlama-1.1B-Chat-v1.0.Q4_0.llamafile`](https://huggingface.co/jartine/TinyLlama-1.1B-Chat-v1.0-GGUF/blob/main/TinyLlama-1.1B-Chat-v1.0.Q4_0.llamafile) ([download](https://huggingface.co/jartine/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/TinyLlama-1.1B-Chat-v1.0.Q4_0.llamafile?download=true))

The first thing I find interesting is that it's only about 661 MB. You could *almost* fit it on a CD-ROM. In fact, I picked it because it's one of the smallest versions available. It's very manageable on a modern personal computer, unlike some [LLMs][large language model] that weigh at least an order of magnitude more.

In fact, [the original flavor of TinyLlama](https://huggingface.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0/tree/main) used in [my previous post][] was actually about 2.2 GB - not huge as LLMs go (thus the "tiny" moniker) but still not nothing.

This is a pretty great reduction in size, thanks to a technique called [quantization](https://huggingface.co/docs/optimum/en/concept_guides/quantization). In lieu of a deeper dive here, I'll just mention that it's a way to shrink the size of a model by reducing the precision of its numbers. As it turns out, you can crank down the "resolution" by quite a few notches and still retain a lot of the practical smarts.

While playing at home, you might want to download [a few different Llamafile versions of this model](https://huggingface.co/jartine/TinyLlama-1.1B-Chat-v1.0-GGUF/tree/main) at different quantization levels to get a feel for what effect that has on the model's behavior.

## Running a Llamafile



## Opening code ceremonies

Finally getting to the code, here's a list of "ideas" in need of organization:

```python
items_text = """
- pasta
- thomas dolby
- alpha
- apples
- cats
- pears
- meters
- brick
- dogs
- beta
- howard jones
- concrete
- asphalt
- milk
- rebar
- gillian gilbert
- hamsters
- bread
- butter
- wendy carlos
- gamma
- birds
- bananas
- rick wakeman
- inches
- glass
- feet
- gary numan
- miles
- lumber
- kilometers
- geoff downes
"""

# Split the text into non-empty lines...
items = [x for x in items_text.split("\n") if x]
```

Next, some code to install modules:

```python
%pip install requests scikit-learn
```

If you've read the previous two posts, you might notice that I'm barely installing any dependencies at all this time around. Just `requests` to make HTTP requests and `scikit-learn` for k-means clustering.

In exchange for very few dependencies in my notebook, I'm outsourcing nearly all the smarts to this thing called a [Llamafile][]. And that's kind of the star of this whole post.


## Vector embeddings (strike back)

TKTK

```python
import requests

# TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile.exe -ngl 9999 --embedding --nobrowser --port 8887
llamafile_base_url = 'http://127.0.0.1:8887'

def generate_embeddings(items):
    response = requests.post(
        f"{llamafile_base_url}/embedding",
        json={ "content": items }
    )
    data = response.json()
    embeddings = [x['embedding'] for x in data['results']]
    return embeddings

embeddings = generate_embeddings(items)
embeddings
```

TKTK

```python
[[0.009491786360740662,
  0.035500749945640564,
  -0.010661028325557709,
  -0.019359176978468895,
  0.020187685266137123,
  -0.017124688252806664,
  0.020965272560715675,
  ...
```

## K-means clustering (the return of)

TKTK

```python
from sklearn.cluster import KMeans
from itertools import groupby

# Let's say we want to organize the list into this many clusters
n_clusters = 12

# Use the k-means algorithm to come up with a cluster ID for each embedding
cluster_ids = KMeans(n_clusters=n_clusters, n_init='auto').fit_predict(embeddings)

# Associate each cluster ID with the corresponding item
cluster_ids_with_items = zip(cluster_ids, items)

# Group the pairs of (cluster_id, item) into lists based on cluster ID
grouped_cluster_ids_with_items = groupby(
    sorted(cluster_ids_with_items, key=lambda x: x[0]),
    key=lambda x: x[0]
)

# Simplify that whole mess so we just have a list of clustered items
clustered_items = [
    [item for cluster_id, item in item_group]
    for cluster_id, item_group
    in grouped_cluster_ids_with_items
]

clustered_items
```

TKTK

```python
[['- apples', '- pears', '- bananas'],
 ['- thomas dolby',
  '- howard jones',
  '- gillian gilbert',
  '- rick wakeman',
  '- geoff downes'],
 ['- alpha', '- beta', '- gamma'],
 ['- meters', '- inches', '- feet', '- miles', '- kilometers'],
 ['- lumber'],
 ['- cats', '- dogs', '- hamsters', '- birds'],
 ['- pasta', '- bread'],
 ['- brick', '- rebar'],
 ['- glass'],
 ['- concrete', '- asphalt'],
 ['- milk', '- butter'],
 ['- wendy carlos', '- gary numan']]
```

## Generating labels (your own, personal, LLM)

TKTK

```python
import requests

system_prompt = """You are a helpful but terse assistant."""

user_prompt = """
Given the following list of items, I need a succinct label that effectively encapsulates the overall theme or purpose.

This is the list of items:

%s

Can you generate a concise, descriptive label for this list? Thanks in advance!
"""

prompt_template = """<|system|>
%s</s>
<|user|>
%s</s>
<|assistant|>"""

def generate_topic(items):
    text = "\n".join(items)
    prompt = prompt_template % (
        system_prompt,
        user_prompt % text,
    )
    # https://github.com/Mozilla-Ocho/llamafile/blob/main/llama.cpp/server/README.md#api-endpoints
    response = requests.post(
        f"{llamafile_base_url}/completion",
        json={
            "prompt": prompt,
            # maximum number of tokens to predict
            "n_predict": 32,            
            # this tells the LLM how much of a rando to be while selecting tokens during generation
            "temperature": 0.1,
            # this tells the LLM how many different tokens to decide between at each step of generation
            "top_k": 3,
            # this tells the LLM how picky to be about the most likely tokens to select while generating
            "top_p": 0.8,
        }
    )
    data = response.json()
    return data["content"]

for cluster in clustered_items:
    topic = generate_topic(cluster)

    print(f"# {topic}")
    print()
    for item in cluster:
        print(f"{item}")
    print()
```

TKTK

```python
#
"Fruits"

- apples
- pears
- bananas

# 
"Essential Artists: Thomas Dolby, Howard Jones, Rick Wakeman, Geoff Downes"

- thomas dolby
- howard jones
- gillian gilbert
- rick wakeman
- geoff downes

# 
"Essential items for a successful project"

- alpha
- beta
- gamma

# 
"Essential measurements for everyday life"

- meters
- inches
- feet
- miles
- kilometers

# 
"Essential materials for construction and home improvement"

- lumber

# 
"Animals"

- cats
- dogs
- hamsters
- birds

# 
"Essential Ingredients for a Comforting Meal"

- pasta
- bread

# 
"Brick and rebar: essential building materials"

- brick
- rebar

# 
"Essential items for a well-organized and functional home"

- glass

# 
"Materials for Construction and Maintenance"

- concrete
- asphalt

# 
"Nourishing and delicious foods"

- milk
- butter

# 
"A list of helpful and supportive individuals"

- wendy carlos
- gary numan
```

## Wrapping up (for now)

TKTK

[my previous post]: https://blog.lmorchard.com/2024/05/01/topic-clustering-local-models/

[llamafile]: https://github.com/Mozilla-Ocho/llamafile
[figjam]: https://www.figma.com/figjam/
[my previous post]: https://blog.lmorchard.com/2024/04/27/topic-clustering-gen-ai/
[vector embeddings]: https://cloud.google.com/blog/topics/developers-practitioners/meet-ais-multitool-vector-embeddings
[k-means clustering]: https://en.wikipedia.org/wiki/K-means_clustering
[large language model]: https://en.wikipedia.org/wiki/Large_language_model
[google colab]: https://colab.research.google.com/
[jupyter notebook]: https://jupyter.org/
[hash function]: https://en.wikipedia.org/wiki/Hash_function
[huggingface]: https://huggingface.co/
[tinyllama]: https://huggingface.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0
[cosmopolitan]: https://github.com/jart/cosmopolitan