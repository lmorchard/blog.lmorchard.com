---
title: Clustering ideas with Llamafile
tags:
  - ai
  - ml
  - llm
  - genai
  - ClusteringIdeasWithAI
---

**TL;DR**: In [my previous post][], I used local models with PyTorch and Sentence Transformers to roughly cluster ideas by named topic. In this post, I'll try that again, but this time with Llamafile.

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

My first two swings at this turned out not terrible, so I'm pretty hopeful another variation on the theme will yield something interesting.

## Play along at home

If you want to follow along like [last time][my previous post], here's a notebook to run in your own environment:

- [topic_clustering_with_llamafile.ipynb](./topic_clustering_with_llamafile.ipynb)

And, for this post especially, I'd emphasize the value of running everything on your own hardware. Hopefully that makes more sense as we take a look at [Llamafile][].

## Introducing Llamafile

What's a [Llamafile][], you might ask?

<figure class="inset right">
  <img src="./llamafile-logo.png" />
  <figcaption>The Llamafile logo, it looks a bit smug?</figcaption>
</figure>

It's a [large language model][] that's been bundled up with the code to run it. This bundle is a standalone executable created in [a very clever way][cosmopolitan], such that the *exact same file* works across many different operating systems and hardware combinations.

In other words, the same downloaded file can run on Windows, MacOS, and Linux. It even supports acceleration on GPUs from Nvidia, AMD, and Apple - which itself a pretty neat trick, since a lot of ML & AI tools are limited to Nvidia hardware.

I find this near-universal binary handy, because it means I can run this stuff on both my work-issued MacBook Pro and my AMD-based gaming PC sitting in the next room over.

(I don't actually have any Nvidia hardware on hand, which is a bit awkward for this stuff. 😅)

## Acquiring a Llamafile

There's a growing pile of ready-made Llamafiles available. For this post, I'm going to focus on essentially the same model that I used in [my previous post][] - i.e. [TinyLlama](https://huggingface.co/jartine/TinyLlama-1.1B-Chat-v1.0-GGUF).

Here's a link to download the particular flavor I'll use in this post:

- [`TinyLlama-1.1B-Chat-v1.0.Q4_0.llamafile`](https://huggingface.co/jartine/TinyLlama-1.1B-Chat-v1.0-GGUF/blob/main/TinyLlama-1.1B-Chat-v1.0.Q4_0.llamafile) ([direct download](https://huggingface.co/jartine/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/TinyLlama-1.1B-Chat-v1.0.Q4_0.llamafile?download=true))

The first thing I find interesting is that it's only about 661 MB. You could *almost* fit it on a CD-ROM. In fact, I picked it because it's one of the smallest versions available. It's very manageable on a modern personal computer, unlike some [LLMs][large language model] that weigh at least an order of magnitude more.

In fact, [the original flavor of TinyLlama](https://huggingface.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0/tree/main) used in [my previous post][] was about 2.2 GB - not huge as LLMs go (hence the "tiny" moniker) but still not nothing.

This reduction in size is thanks to a technique called [quantization](https://huggingface.co/docs/optimum/en/concept_guides/quantization). In lieu of a deeper dive here, I'll just mention that it's a way to shrink the size of a model by reducing the precision of its numbers. As it turns out, you can crank down the "resolution" by quite a few notches and still retain a lot of the smarts for practical purposes.

While playing at home, you might want to download [a few different Llamafile versions of this model](https://huggingface.co/jartine/TinyLlama-1.1B-Chat-v1.0-GGUF/tree/main) at different quantization levels to get a feel for what effect that has on the model's output behavior and your PC's ability to run it.

## Running a Llamafile

After you've downloaded one, there's a few ways to run a Llamafile. For this post, we're going to run it as a local web service. The notebook code will make HTTP requests to the service to get embeddings and generate labels - not entirely unlike where we started in [my earlier post][] by making calls to OpenAI's API.

On MacOS and Linux, you'll need to open a terminal and it like so:

```bash
cd ~/Downloads
chmod +x ./TinyLlama-1.1B-Chat-v1.0.Q4_0.llamafile
./TinyLlama-1.1B-Chat-v1.0.Q4_0.llamafile -ngl 9999 --embedding --port 8887
```

On Windows, you'll need to open a Command Prompt and run the Llamafile like so:

```powershell
cd %USERPROFILE%\Downloads
ren TinyLlama-1.1B-Chat-v1.0.Q4_0.llamafile TinyLlama-1.1B-Chat-v1.0.Q4_0.llamafile.exe
.\TinyLlama-1.1B-Chat-v1.0.Q4_0.llamafile.exe -ngl 9999 --embedding --port 8887
```

The first step to make the executable, erm, executable. On MacOS and Linux, that's done via `chmod`. On Windows, that's done by ensuring the file has an `.exe` extension. Then, you can run it with a few options to start the service:

- The `--port 8887` option tells it to listen on port 8887 as a local web service.
- The `--embedding` option tells the Llamafile to expose an endpoint for generating vector embeddings.
- The `-ngl 9999` option is honestly a bit mysterious to me. But, I saw a log message at one point telling me it was needed to ensure the model actually ran with GPU acceleration. So, I include it in the magic incantation and hope to someday understand it better.

In either case, you should see a flurry of output - some of which, interestingly, may include actually building part of the executable from source. Eventually, you should see messages like this:

```bash
{"function":"initialize","level":"INFO","line":481,"msg":"initializing slots","n_slots":1,"tid":"1099515504464","timestamp":1715213605}
{"function":"initialize","level":"INFO","line":490,"msg":"new slot","n_ctx_slot":2048,"slot_id":0,"tid":"1099515504464","timestamp":1715213605}
{"function":"server_cli","level":"INFO","line":3060,"msg":"model loaded","tid":"1099515504464","timestamp":1715213605}

llama server listening at http://127.0.0.1:8887

{"function":"server_cli","hostname":"127.0.0.1","level":"INFO","line":3183,"msg":"HTTP server listening","port":"8887","tid":"1099515504464","timestamp":1715213605}
{"function":"update_slots","level":"INFO","line":1619,"msg":"all slots are idle and system prompt is empty, clear the KV cache","tid":"1099515504464","timestamp":1715213605}
```

You should also see a browser tab like this get opened automatically:

<figure class="fullwidth">
  <img src="./llamafile-browser-tab.png" />
  <figcaption>The Llamafile out-of-box web UI</figcaption>
</figure>

This web UI is a handy way to poke around and test the model. However, you can also add the `--nobrowser` option to the command line to skip automatically opening the browser. That's handy if you're running the Llamafile on a headless server or just don't want to keep opening tabs. 🤷‍♂️

So, assuming you're playing along at home, keep this Llamafile process running in one terminal or command window. In another, start up your local install of [Jupyter Notebook][] and open the notebook you downloaded earlier.

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

If you've read the previous two posts, you might notice that I'm barely installing any dependencies at all this time around. Just `requests` to make HTTP requests and `scikit-learn` for k-means clustering. In exchange for very few dependencies in my notebook, I'm aiming to outsource nearly all the smarts to the Llamafile process

## Vector embeddings

If you recall [from earlier posts](https://blog.lmorchard.com/2024/04/27/topic-clustering-gen-ai/#mapping-notes-with-vector-embeddings), embedding models are a bit like hash functions. They take a string of words and turn it into a list of numbers. More interesting than hashes, though, these numbers can act as positions in a high-dimensional space where distance between points can represent semantic similarity.

Also like from the [first post in this series](https://blog.lmorchard.com/2024/04/27/topic-clustering-gen-ai/#mapping-notes-with-vector-embeddings), we're going to call a web service - a local one, this time:

```python
import requests

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
```

This uses your local Llamafile process to access the embedding model that's included as a part of TinyLlama and generate embeddings for each item in the list.

In case you're interested in what other services are exposed by the Llamafile process, [here's some documentation on the server API](https://github.com/Mozilla-Ocho/llamafile/blob/main/llama.cpp/server/README.md#api-endpoints). Some interesting stuff in there!

Assuming this call is successful, you should see a list of lists of numbers like so:

```python
embeddings[0]
[0.009491786360740662,
 0.035500749945640564,
 -0.010661028325557709,
 -0.019359176978468895,
 0.020187685266137123,
 -0.017124688252806664,
 0.020965272560715675,
 ...
```

Whereas earlier posts used embedding models that yielded vectors of 384 and 768 dimensions, this TinyLlama model yields 2048-dimension vectors.

```python
len(embeddings[0])
2048
```

I think that means the embeddings are higher quality and more detailed? But, I've yet to really dig into more formally evaluating whether this is true.

## K-means clustering

We're going to use the `KMeans` class from `scikit-learn` to group the embeddings into clusters. Once more, this part doesn't change from [the previous post][my previous post]. But, I'm including it here for the sake of completeness.

At some point, I should try some different algorithms? But, I figured that's not the interesting thing to vary in this post. So, we run this code to cluster the embeddings:

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

Running this code, I got these clusters as a result:

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

Not perfect, but not bad? Because this clustering algorithm is non-deterministic, it's worth running repeatedly until you get a set of clusters that make sense to you. And, you might want to try different numbers of clusters.

## Generating labels

TKTK these are the same prompts i used in the previous post

```python
import requests

system_prompt = """You are a helpful but terse assistant."""

user_prompt = """
Given the following list of items, I need a succinct label that effectively encapsulates the overall theme or purpose.

This is the list of items:

%s

Can you generate a concise, descriptive label for this list? Thanks in advance!
"""
```

TKTK new concept here - in the previous post i used `pipe.tokenizer.apply_chat_template`, but here I have to do it myself. prompt template is a convention used during training to tell the model what kind of text to expect at each point in the conversation and how to respond. seems kind of arbitrary, but it's baked into the model via the formatting of training examples rather than any kind of programmatic parsing code

```python
prompt_template = """<|system|>
%s</s>
<|user|>
%s</s>
<|assistant|>"""
```

TKTK something about how similar this is to the previous post and setting parameters when calling the TinyLlama model for text generation

```python
def generate_topic(items):
    text = "\n".join(items)
    prompt = prompt_template % (
        system_prompt,
        user_prompt % text,
    )
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
```

- `n_predict` is the maximum number of tokens to predict - roughly the maximum length of the generated text
- `temperature` tells the LLM how much of a rando to be while selecting tokens during generation
- `top_k` tells the LLM how many different tokens to decide between at each step of generation
- `top_p` tells the LLM how picky to be about the most likely tokens to select while generating



Apropos of that, here's a loop to generate topics for each cluster:

```python
for cluster in clustered_items:
    topic = generate_topic(cluster)

    print(f"# {topic}")
    print()
    for item in cluster:
        print(f"{item}")
    print()
```

TKTK

When I ran this, here's what I got:

TKTK: something else I noticed, versus my previous post, is that this llamafile runs so much faster than the Sentence Transformers code. I think that's down to optimizations in how llamafile runs, and maybe also the quantization? Another thing for me to dig into later. But, this means I can re-run this code to quickly iterate until I get labels I like best

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

## Wrapping up

TKTK

[my previous post]: https://blog.lmorchard.com/2024/05/01/topic-clustering-local-models/

[llamafile]: https://github.com/Mozilla-Ocho/llamafile
[figjam]: https://www.figma.com/figjam/
[my previous post]: https://blog.lmorchard.com/2024/05/01/topic-clustering-local-models/
[vector embeddings]: https://cloud.google.com/blog/topics/developers-practitioners/meet-ais-multitool-vector-embeddings
[k-means clustering]: https://en.wikipedia.org/wiki/K-means_clustering
[large language model]: https://en.wikipedia.org/wiki/Large_language_model
[google colab]: https://colab.research.google.com/
[jupyter notebook]: https://jupyter.org/
[hash function]: https://en.wikipedia.org/wiki/Hash_function
[huggingface]: https://huggingface.co/
[tinyllama]: https://huggingface.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0
[cosmopolitan]: https://github.com/jart/cosmopolitan
[my earlier post]: https://blog.lmorchard.com/2024/04/27/topic-clustering-gen-ai/