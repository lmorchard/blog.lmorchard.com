---
title: How to build your own Easy-Blog Oven
tags:
  - metablogging
  - blogging
  - node
  - webdev
---

**TL;DR**: I wanted to write some more about building my [Easy-Blog Oven][]. It was mostly gluing together things that I already knew, but I think I learned some things and had some surprises anyway.

[easy-blog oven]: /2020/05/24/easy-blog-oven/

<!--more-->

<nav role="navigation" class="table-of-contents"></nav>

While I was throwing together this new static site generator over the past couple of days, I kept thinking, "I should build this as a reusable engine so other folks can use it."

But, you know, I think I'd rather write about how to make your own. That seems more interesting (to me, at least) than trying to generalize this thing outside of scratching my own itch. 

Also, I've been meaning to write more anyway. So, here goes:

## Generating a static site

Let's say you have [a pile of Markdown files][posts-md] lying around like I do. Consider [this script as a start](./listing-01.js):

[posts-md]: https://github.com/lmorchard/blog.lmorchard.com/tree/master/posts

```javascript
{{listing-01.js}}
```

This code only does a few things:

1. Use the [globby][] module to find all the blog posts
1. Read all of those files into an array in memory
1. Write files to disk for each blog post

[globby]: https://www.npmjs.com/package/globby

So, technically, we're done. A static site of Markdown files has been generated!

## Rendering markdown blog posts

Oh, wait. Usually a website is made up of HTML pages. So, we probably want to render these Markdown files as HTML pages. Okay, [we can do that](./listing-02.js):

```diff
{{listing-01-to-02.diff}}
```
```javascript
{{listing-02.js}}
```

The changes here add the [marked][] module to the mix. That's a fast Markdown-to-HTML renderer. Then, we write `index.html` renderings of the Markdown files into the per-post directories we're creating.

Why create directories for the blog posts? Well, this can help in producing clean URL paths - e.g. `/2020/05/25/diy-easy-blog-oven/` without a pesky `.html` at the end. It's an old web log tradition.

[marked]: https://www.npmjs.com/package/marked

## Wrapping rendered blog posts in page templates

We still don't quite have a "site" at this point, though. Those `index.html` files are technically HTML fragments, not complete pages. Generally, we'll want to wrap the content of a blog post in a common page template - i.e. to frame the content, provide site navigation, the usual.

Okay, so let's render the blog post content within a page template:

```diff
{{listing-02-to-03.diff}}
```
```javascript
{{listing-03.js}}
```

This is a dead simple page template - no site navigation, not even a proper title for each post. But, it's a start. Now we can build a collection of actual web pages!

## Adding metadata to blog posts

Speaking of blog post titles, here's another wrinkle: There's usually more to a blog post than just the content body. We usually want some metadata associated with the content. A title, at least. Maybe also a date, some tags, a thumbnail image. 

 The Jekyll static site generator [supports YAML "front matter" added to the top of a Markdown document][jekyll-front-matter] as a header of structured data. A blog post following this convention looks something like this:

```markdown
{{example-post.txt}}
```

Jekyll has become popular over the years - [being offered via Github Pages][jekyll-gh-pages] doesn't hurt. It also helps that this format is flexible and not particularly tied to Jekyll. So, I've found it handy to regard it as a defacto standard and keep all my blog posts in this format.

It's also convenient that there's a [front-matter][] module on NPM that helps process this format. So, we can roll support easily into our site generator:

[jekyll-front-matter]: https://jekyllrb.com/docs/posts/
[jekyll-gh-pages]: https://jekyllrb.com/docs/github-pages/
[front-matter]: https://www.npmjs.com/package/front-matter

```diff
{{listing-03-to-04.diff}}
```
```javascript
{{listing-04.js}}
```

The [front-matter][] module neatly parses the blog post YAML header into an obejct and separates the Markdown content body that follows. This lets us easily include metadata from the post into slots in the page template.

## Using tagged template literals to make HTML easier

So, you may have noticed that I introduced a problem in that last set of changes.

Take a look at that example blog post again:

```markdown
{{example-post.txt}}
```

The blog post title has an ampersand in it - i.e. `&` - which *should* be encoded in HTML output as an `&amp;` entity. But, worse than that, look at those tags. I included a weird one - `foo<something>` - which will produce invalid & broken markup if included as-is.

This wasn't a problem with the content body in Markdown. That's *supposed* to be treated as raw HTML. The metadata, though, is *not* - so, we need to encode it by escaping any characters or sequences that make trouble for HTML.

### Tagged template literals in a nutshell

This is where I started having fun with [tagged template literals][tagged-literals] in JavaScript. These are special multi-line string literals that allow variable substitutions and can be processed through a function of your choice.

[tagged-literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates

Here's an example of what a tagged template literal function looks like:

```javascript
{{tagged-template-literal.js}}
```

I first found this example [from a site called Writing JavaScript][tagged-template-literal-sample]. Your mental mileage may vary, so this might be a too-terse use of [Array.reduce()][array-reduce]. But, for some reason this was the first time it really clicked for me. So, kudos to [Seth Vincent][] for putting that out there!

[seth vincent]: https://sethvincent.com/

Anyway, as the name `passthrough` suggests, this function just passes through the result of parsing the template literal. JavaScript splits the literal up into an array of literal strings, along with the result of resolving the variable substitutions as subsequent function parameters.

The implementation of the `passthrough` function here just glues all the strings together unchanged.

[array-reduce]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
[tagged-template-literal-sample]: https://writingjavascript.org/posts/creating-functions-for-tagged-template-literals#minimal-example-of-a-tag-function

### Using tagged template literals for HTML encoding

But, rather than just pass the values through, we *could* filter & transform both the literal strings and variable substitutions. In fact, this is what I came up with to handle producing HTML from template literals:

```diff
{{listing-04-to-05.diff}}
```
```javascript
{{listing-05.js}}
```

### Weird quirks of my HTML templates

There are a few strange things going on here.

First off, my `html` template function returns a function. *That* function returns the desired string content. 

This was weird to me at first: *The function that processes a tagged template literal doesn't have to return a string!* It really confused in using modules like [HTM (Hyperscript Tagged Markup)][htm] to create JSX-free components for [Preact][]. But, as it turns out, a tagged template string can result in essentially *anything* - not just a string.

And here's why I built it that way: I'm using a function as the mechanism to indicate which values *should not be encoded for HTML*. The `htmlValue` utility function checks for `(typeof value === "function")`. Any variable substitutions of type function are called & included without escaping. All others are escaped for HTML.

This might be a terrible idea, but it means my `html` template tag has two important features:

1. It supports leaving selective variable substitutions raw & unencoded:
    ```javascript
    html`
      This variable ${() => '<b>right here</b>`} should be unescaped markup.
    `
    ```

1. It supports templates-within-templates, since the `html` function itself returns a function:
    ```javascript
    html`
    <ul>
      ${post.tags.map((tag) => html`<li>${tag}</li>`)}
    </ul>
    `
    ```

For another way to think about it, consider that [React has a mechanism where unescaped markup is indicated][react-unescape] by a property like `dangerouslySetInnerHTML={{ __html: "<b>right here</b>" }}` - my approach is to just use `typeof value === 'function'` instead.

[react-unescape]: https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml

So far, I've been happy with how this template scheme has turned out. It just leaves an awkward aspect where the resulting function needs to be called to get the template output - i.e. this line:

```javascript
const postHtml = templateBlogPost({ post })();
```

But, this scheme has replaced a whole template engine dependency for me in [my blog's collection of templates][lmo-blog-templates]. So, that's pretty neat.

### A note for VSCode users

Oh and there's one more benefit I found while using HTML in tagged templates: If you use VSCode as your editor, there's [the lit-html extension][lit-html-extension] to help manage & format markup within tagged templates.

Sure, the extension is *intended* mainly to help working with [lit-html][] templates - but it works just as well for my tagged templates too!

[lit-html]: https://github.com/Polymer/lit-html
[lit-html-extension]: https://marketplace.visualstudio.com/items?itemName=bierner.lit-html

[lmo-blog-templates]: https://github.com/lmorchard/blog.lmorchard.com/tree/master/templates
[htm]: https://www.npmjs.com/package/htm
[preact]: https://preactjs.com/

## Improving the site directory layout

Okay, so at this point, we have blog posts with YAML metadata and Markdown content paired with an HTML template scheme for publishing web pages. I'll leave improving those web pages as an exercise to the reader. You can [peek at my templates][lmo-blog-templates] as an example, but you'll probably want your own look & feel. Also my templates are terrible.

Templates aside, one of the next things we can improve is the directory layout of this static web site. Earlier, I mentioned the "old web log tradition" of producing clean URL paths - e.g. `/2020/05/25/diy-easy-blog-oven/`. Well, we're not doing that yet - our URL paths are a mess. 

So, let's improve that by using blog post dates to build directory paths:

```diff
{{listing-05-to-06.diff}}
```
```javascript
{{listing-06.js}}
```

For my blog, I use a filename structure like this: `2020-05-25-diy-easy-blog-oven.md`

This code takes advantage of that naming convention with a regular expression to extract the date and slug for use in constructing the directory structure during the build. However, as an override, I can explicitly set a date via the `date` attribute in the post's front matter.

### Dates & names & files, oh my!

Here's some context & history behind that arrangement: There are a few places to find the date for a blog post. Some file-based blogs I've used read the file modification time as the source of the date. This could be nice, insofar as the date automatically updated as I edited the post. But, things fell apart if I backed up and restored the files while forgetting to preserve the timestamps. All the posts suddenly looked like they were published *today* - oops!

We can also stash the date in a post's front matter as a `date` property. I've done that in some places and it works okay. So, I like to have it as an option. What I've found works best, though, is to follow a naming convention for blog post filenames - i.e. `YYYY-MM-DD-slug.md`. This survives lots of mistakes in backup & restore - and it gives me a natural sort order for listing files on disk.

### An aside on slugs

Oh yeah, and ["slug" is a general term][slug] for the ID or name of a blog post - independent from the title or headline of the post. A slug is what shows up in the URL to uniquely identify the post from others on the same day.

Although slugs can be random IDs or automatically derived from titles, many web publishing systems treat the slug and title as separate properties managed by the author. A fun thing to watch for on news sites is when a draft of an article is submitted with an initial slug and title. Later, the title is changed but the slug is left untouched. This can result in some fun situations where the headline of an article has been made more subtle - but the slug retains some fairly blunt language.

Anyway, I'm getting punchy and I digress. In this system, the slug is derived from the filename of the blog post Markdown source file.

[slug]: https://en.wikipedia.org/wiki/Slug_(publishing)

## Rendering post indexes by recent, date, and tag

Now that we have a decent directory structure, it would be nice to have index pages to navigate around the blog.

Up to this point, I've been trying to keep the changes to the script small and relatively easy to explain. From here, though, I'm just going to go for broke:

```diff
{{listing-06-to-07.diff}}
```
```javascript
{{listing-07.js}}
```

There's a lot of repetitive code here, but I tried to keep it mostly [DRY][]. 

The gist here is that since we started by loading all the blog posts into memory, we can easily collate posts into groupings based on attributes like year, month, and tags. The new `indexBy` utility function takes care of that.

[dry]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself

Once collated into convenient groupings, we can use the `writeIndexPage` utility function to build each index page via `templateIndexPage` and then write to disk at the approriate paths in the directory structure.

My own blog has over 1000 posts accumulated over the course of 18 years. When I first tried doing this with my own content, I expected the execution time to be impracticably slow.

Well, as it turns out, this latest version of the script takes about 2 seconds on my computer:

```shell
$ time node listing-07.js 
real    0m1.646s
user    0m2.056s
sys     0m0.305s
```

This was one of the big surprises I found when I started playing with this idea. I'm used to thinking about databases and indexes and threads and clusters of servers when it comes to churning through lots of content. But, even if it looks like a lot of content to me as the author, it's not much at all to a modern computer.

To be fair, I've added complications to the code that *actually* publishes this blog versus the script I've built up for this post. But, my "production" code still builds this whole site in under 7 seconds. And, if I feel like tinkering some more, I could probably optimize and bring that time back down again.

## Publishing via GitHub Pages and Actions

This is the final stretch. We've got a small script that generates a static site from blog posts. It even includes indexes to list posts by year, month, and tag. The last thing to do is get all of this content onto the web.

Earlier, I mentioned Jekyll and GitHub Pages. Well, you don't have to use Jekyll to use GitHub Pages. Our static site generator here will work just fine. In fact, all it takes to use GitHub Pages as web hosting is to push your content to a branch named `gh-pages` on a GitHub repository.

