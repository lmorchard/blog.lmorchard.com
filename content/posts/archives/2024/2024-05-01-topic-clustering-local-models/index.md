---
title: Clustering ideas with local ML/AI models
tags:
  - ai
  - ml
  - llm
  - genai
  - ClusteringIdeasWithAI
---

**TL;DR**: In [my previous post][], I used APIs from OpenAI to roughly cluster ideas by named topic. In this post, I'll try that again, but this time with local models on my own hardware.

<!--more-->

<figure class="wide">
  <img src="./cover.png">
  <figcaption>I asked DALL-E to generate "an image in a whimsical style depicting astronauts at home clustering ideas brought in from deep space". Then, I ran a few imagemagick transformations on it for fun.</figcaption>
</figure>

<nav role="navigation" class="table-of-contents"></nav>

In [my previous post][], I glued together a few OpenAI API calls and a k-means clustering algorithm to organize some ideas into named groups.

It worked pretty well, but I'm not always comfortable with the idea of sending all my ideas to someone else's computer (i.e. the Cloud). So, I thought I'd see if I could do the same thing entirely with my own hardware.

## Organizing sticky notes automatically

As a refresher, the thing that got me started on this was a feature in Figma's [FigJam][] tool. Given a collection of sticky notes, there's an "organize" feature [that uses AI]((https://www.theverge.com/2023/11/7/23950667/figma-figjam-generative-ai-design-tools-beta-announcement)) to group them into named clusters automatically:

<figure class="wide">
  <video controls>
    <source src="./figjam-sorting-demo.mp4" type="video/mp4" />
    <a href="./figjam-sorting-demo.mp4">figjam-sorting-demo.mp4</a>
  </video>
  <figcaption>A quick demo of FigJam's sticky organization feature - it's more legible in fullscreen view</figcaption>
</figure>

## How does it do what it does?

Again, I don't know exactly how [FigJam][] does this. But, here's my own stab at a process:

1. we map the notes as points in a virtual semantic space using [vector embeddings][]
1. [k-means clustering][] can find groups of points that are close together in space
1. we map the points back to notes and a [large language model][] can help generate labels for each group

The end result is a set of rougly similar clusters of ideas, each with a not-entirely horrible label.

## Play along at home with a notebook

If you want to follow along like [last time][my previous post], I've got a small notebook that you can run in your own environment:

- [topic_clustering_with_local_models.ipynb](./topic_clustering_with_local_models.ipynb)

While you can run this on [Google Colab][], you might want to install [Jupyter Notebook][] locally on your own computer. That can give you a better feel for how it runs locally.

Personally, I've got a 14-inch, 2021 Apple MacBook Pro with an M1 Pro CPU and 32GB of RAM. It's neither the best nor worst machine in the world. But, that makes it kind of a good test case for how this kind of thing runs on a modern laptop. (Spoiler alert: AI/ML stuff is pretty resource intensive.)

## Opening ceremonies (redux)

To kick this off, here's the same list of ideas from my previous post:

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

I should probably try a different set of things. But, I'm lazy and this is what I've got for now. Replace these with your own brain dump, if you're playing at home. Next, some code to install modules:

```python
%pip install scikit-learn torch sentence_transformers accelerate
```

Something to notice, versus [my previous post][], is that I'm not using OpenAI's API client this time. Instead, I'm using the `torch` and `sentence_transformers` modules. We'll see how those come into play shortly.

## Vector embeddings (strike back)

Again, [vector embeddings][] are like content hashes with the superpower of being the coordinates of a point in a high-dimensional semantic space where distance indicates similarity. If that makes your head spin like it did mine, [my previous post][] rambles on a bit more about this.

Assuming you've nodded along with that last paragraph, here's some code to generate embeddings on your own computer:

```python
from sentence_transformers import SentenceTransformer

# 384 dimensions - https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2
# embedding_model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# 384 dimensions - https://huggingface.co/sentence-transformers/all-MiniLM-L12-v2
# embedding_model = SentenceTransformer('sentence-transformers/all-MiniLM-L12-v2')

# 768 dimensions - https://huggingface.co/sentence-transformers/all-mpnet-base-v2
# embedding_model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')

# 768 dimensions - https://huggingface.co/thenlper/gte-base
# embedding_model = SentenceTransformer('thenlper/gte-base')

# 1024 dimensions - https://huggingface.co/thenlper/gte-large
embedding_model = SentenceTransformer('thenlper/gte-large')

embeddings = embedding_model.encode(items)
embeddings
```

Okay, so a lot of that code is commented out. That's because this was a good place to play around. As it turns out, there are many embedding models and I'm still learning how to tell them apart. Until I understand more about the specifics of each model, I'm just going to try a bunch of them and see what happens.

In fact, if you're following along in your own notebook, you should do that. Try uncommenting different models and see what happens:

 - how big are the models?
 - how long do they take to download?
 - how long does this take to run?
 - what does Activity Monitor say about your CPU and memory usage?
 - how do the clusters look?

And, just like how I got embeddings from an OpenAI API call, running one of these models locally gives me essentially the data shape - i.e. a list-of-lists of numbers:

```python
array([[-0.02736097,  0.00340217, -0.01076854, ..., -0.02489066,
         0.01647391, -0.02072625],
       [-0.03888908,  0.02349574,  0.0143796 , ..., -0.01913134,
        -0.03127009, -0.0304915 ],
       [ 0.01443943,  0.02336113,  0.00634783, ...,  0.00120864,
        -0.01801292, -0.02678853],
       ...,
       [ 0.00835066,  0.00595316, -0.01179765, ..., -0.01259451,
        -0.0165759 , -0.0056388 ],
       [ 0.0005869 ,  0.01886297, -0.0079366 , ..., -0.04092352,
        -0.01162215, -0.01117233],
       [-0.00889315, -0.00544541, -0.02917784, ..., -0.01641204,
        -0.01544971, -0.01567657]], dtype=float32)
```

## K-means clustering (the return of)

This part doesn't change at all from [the previous post][my previous post]. We're still using the same `KMeans` implementation from `sklearn` to group the embeddings into clusters.

This algorithm it doesn't care where the embeddings came from. They're lists of coordinates - whether from OpenAI or your own machine - so the clustering will work just the same:

```python
from sklearn.cluster import KMeans
from itertools import groupby

# Let's say we want to organize the list into this many clusters
n_clusters = 9

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

And when I ran this code, I got this:

```python
[['- meters', '- inches', '- feet', '- miles', '- kilometers'],
 ['- alpha', '- beta', '- gamma'],
 ['- brick', '- concrete', '- asphalt', '- rebar', '- glass', '- lumber'],
 ['- howard jones', '- gillian gilbert', '- wendy carlos'],
 ['- apples', '- pears', '- bananas'],
 ['- cats', '- dogs', '- hamsters', '- birds'],
 ['- pasta', '- bread'],
 ['- thomas dolby', '- rick wakeman', '- gary numan', '- geoff downes'],
 ['- milk', '- butter']]
```

This is a good spot to pause and play around to get a sense of things:

- Try loading different embedding models in the previous cell
- Plonk in your own list of ideas
- Tweak the number of clusters

I'm pretty sure there's a more formal way to evaluate this stuff - and indeed that sort of thing is on my list of things to learn - but just eyeballing it is good enough for me right now.

## Generating labels (your own, personal, LLM)

In [my previous post][], calling OpenAI's chat completions API with a prompt was a pretty simple function under 10 lines long. That kind of convenience is how they "getcha" - but, again, this time around I want to do it the hard way on my own computer.

Loading up a large language model is just slightly more complicated than an embedding model:

```python
"""
https://huggingface.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0/tree/main

This model is about 2.2GB.
My 2021 MacPook Pro with an Apple M1 Pro and 32GB of RAM seems to have no problem with this model.
"""
import torch
from transformers import pipeline

pipe = pipeline(
    "text-generation",
    model="TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    torch_dtype=torch.bfloat16,
    device_map="auto"
)
```

You may notice here that I've only loaded one model, with no other suggestions in comments. Well, that's because I landed on [TinyLlama][] as the only one that didn't seem to entirely squash my laptop before it could even start generating text. I wanted to take that as a win for now.

Your mileage may vary. If you're following along at home, look up some more LLMs on [huggingface][] and try them here. I'm just starting to get a grasp on the metrics and parameters around these things, which sounds like a whole other post.

Next, let's get into the wishful thinking part - er, I mean prompt engineering:

```python
system_prompt = """You are a helpful but terse assistant."""

user_prompt = """
Given the following list of items, I need a succinct label that effectively encapsulates the overall theme or purpose.

This is the list of items:

%s

Can you generate a concise, descriptive label for this list? Thanks in advance!
"""
```

You may notice that these prompts are way different than the ones I used with OpenAI's API and the `gpt-3.5-turbo` model. That's because of the following:

- I still don't really know what I'm doing
- But, I do seem to have observed that every LLM is a little different
- So, every LLM needs slighly different prompts for decent results

This also seems like another spot to dig in and play around. Try different models with different prompts and see what happens. I'm going to do more of that, myself.

And, with that, we can get into writing a function to generate a cluster label:

```python
def generate_topic(items):
    text = "\n".join(items)
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt % text},
    ]
    prompt = pipe.tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )
    results = pipe(
        prompt,
        max_new_tokens=32,
        do_sample=True,
        # this tells the LLM how much of a rando to be while selecting tokens during generation
        temperature=0.1,
        # this tells the LLM how many different tokens to decide between at each step of generation
        top_k=3,
        # this tells the LLM how picky to be about the most likely tokens to select while generating
        top_p=0.8,
    )
    # HACK: trim the prompt off the start of the generated text
    generated_text = results[0]['generated_text'][len(prompt):].strip()    
    return generated_text
```

This code doesn't look *entirely* different from the call to OpenAI's API in [my previous post][]. There's a similar list of messages for `system` and `user` prompts.

But, I did start tinkering with parameters. This is my current understanding of what they do:

- `temperature` - how much of a rando to be while selecting tokens during generation
- `top_k` - how many different tokens to decide between at each step
- `top_p` - how picky to be about the most likely tokens to select at each step

When I used OpenAI's `gpt-3.5-turbo`, I was pretty happy with the default parameters. But, playing with `TinyLlama-1.1B-Chat-v1.0`, I found that I needed to start tweaking both the prompt and these knobs to get better results.

My fuzzy intention was to try to constrain these parameters, in an effort to make the LLM as boring and consistent as possible. This is a spot where I'm still flailing and trying things out.

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

When I ran this code, here's what I got:

```markdown
# "Essential Measurement Tools for Everyday Life"

- meters
- inches
- feet
- miles
- kilometers

# "Key Components for Successful Project Management"

- alpha
- beta
- gamma

# "Materials for Construction and Repair"

- brick
- concrete
- asphalt
- rebar
- glass
- lumber

# "Essential Artists: Howard Jones, Gillian Gillespie, and Wendy Carlos"

- howard jones
- gillian gilbert
- wendy carlos

# "Fresh Fruits"

- apples
- pears
- bananas

# "Animals"

- cats
- dogs
- hamsters
- birds

# "Essential Ingredients for a Comforting Meal"

- pasta
- bread

# "Top 5 Legendary Musicians of the 1980s"

- thomas dolby
- rick wakeman
- gary numan
- geoff downes

# "Food Essentials"

- milk
- butter
```

I don't think this is an *entirely* awful result? I'd like it if the labels were even more matter-of-fact and concise. But, I think this is a good start for further play.

## Wrapping up (for now)

Overall, I think this was a success, insofar as I was able to replicate the basic idea of clustering ideas by topic with local models on my own hardware.

The embedding & clustering seemed equivalent to the result I got from OpenAI. Though, I think `gpt-3.5-turbo` did a subjectively better job than `TinyLlama-1.1B-Chat-v1.0`.

That difference in performance is worth digging into, though, because:

- the two models differ dramatically in capability & size
- there are other local models to explore
- my prompt engineering skills are a work in progress
- the cloud vs local difference is pretty compelling

I've seen hints that there are more formal means to evaluate the performance of an LLM in a task like this. And, relatedly, a local model can be fine-tuned to a specific task. Both of these things are, of course, on my list of things to learn.

So, we'll see where this goes next. As a teaser, I may have another post soon: I want to see about doing all of this again using Mozilla's [llamafile][] to run a local model.

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
