---
title: How to build your own Easy-Blog Oven
tags:
  - metablogging
  - blogging
  - node
  - webdev
---

**TL;DR**: I wanted to write more about building my [Easy-Blog Oven][]. I mainly glued together things I already knew, but I think I learned some things and had some surprises anyway.

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

So, we're done! A static site of Markdown files has been generated!

## Rendering blog posts in Markdown

Oh, wait: Usually a website is made up of HTML pages. [We'll want to render these Markdown files as HTML](./listing-02.js):

```diff
{{listing-01-to-02.diff}}
```
```javascript
{{listing-02.js}}
```

Here we add the [marked][] module to the mix - [marked][] is a fast Markdown-to-HTML renderer. Next, we create per-post directories and store `index.html` renderings of the Markdown files.

Why create directories for the blog posts? This can help in producing clean URL paths - e.g. `/2020/05/25/diy-easy-blog-oven/` without a pesky `.html` at the end. [It's an old web tradition.][cool-uris]

[cool-uris]: https://www.w3.org/Provider/Style/URI.html
[marked]: https://www.npmjs.com/package/marked

## Wrapping rendered blog posts in page templates

We still don't quite have a *site* at this point. Those `index.html` files are just HTML fragments, not complete pages. We'll want to wrap the content of a blog post in a common page template - i.e. to frame the content, provide site navigation, etc.

Okay, so let's render the blog post content within a page template:

```diff
{{listing-02-to-03.diff}}
```
```javascript
{{listing-03.js}}
```

This is a dead simple page template using a function and a [template literal][]. There's no site navigation, not even a proper title for each post. But, it's a start. Now we're building a collection of actual web pages!

[template literal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

## Adding metadata to blog posts

Speaking of blog post titles, there's usually more to a blog post than the body content. We usually want some metadata: a title, at least. Maybe also a date, some tags, a thumbnail image. 

 The venerable [Jekyll][] static site generator support [YAML "front matter"][jekyll-front-matter] added to the top of a Markdown document as a header of structured data. A blog post following this convention looks something like this:

[jekyll]: https://jekyllrb.com/

```markdown
{{example-post.txt}}
```

It really helps that this format is flexible and not particularly tied to [Jekyll][]. So, I've found it handy to regard it as a defacto standard and keep all my blog posts in this format.

It's also convenient that there's a [front-matter][] module on NPM to process this format. So, we can easily roll support for front matter into the site generator:

[jekyll-front-matter]: https://jekyllrb.com/docs/posts/
[jekyll-gh-pages]: https://jekyllrb.com/docs/github-pages/
[front-matter]: https://www.npmjs.com/package/front-matter

```diff
{{listing-03-to-04.diff}}
```
```javascript
{{listing-04.js}}
```

The [front-matter][] module neatly parses the blog post YAML header into an object and separates the Markdown content body that follows. This lets us easily include metadata from the post in the page template.

## Using tagged template literals to make HTML easier

You may have noticed that I introduced a problem in that last section. Take another look at that example post:

```markdown
{{example-post.txt}}
```

The title has an ampersand - i.e. `&` - which *should* be encoded in HTML output as an `&amp;` entity. But, worse than that, look at those tags. I included a weird one - i.e. `foo<something>` - which will produce invalid markup if included as-is.

This wasn't a problem with the content body in Markdown. That's *supposed* to be treated as raw HTML. The metadata, though, needs to be encoded by escaping any characters or sequences that make trouble for HTML.

### Tagged template literals in a nutshell

This is where I started having fun with [tagged template literals][tagged-literals] in JavaScript. These are multi-line string literals that support variable substitutions and can be processed through a function of your choice.

[tagged-literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates

Here's an example of a tagged template literal function:

```javascript
{{tagged-template-literal.js}}
```

For what it's worth, I first found this example [from a site called Writing JavaScript][tagged-template-literal-sample]. Your mileage may vary, so this might be a too-terse use of [Array.reduce()][array-reduce]. But, for some reason this was the first time it really clicked for me. So, kudos to [Seth Vincent][] for putting that out there!

[seth vincent]: https://sethvincent.com/

Anyway, as the name `passthrough` suggests, this function just passes through the result of parsing the template literal. JavaScript splits the literal up into an array of strings, along with the result of resolving the variable substitutions as subsequent function parameters. The implementation of this `passthrough` function just glues all the strings together unchanged.

[array-reduce]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
[tagged-template-literal-sample]: https://writingjavascript.org/posts/creating-functions-for-tagged-template-literals#minimal-example-of-a-tag-function

### Using tagged template literals for HTML encoding

But, rather than a simple passthrough, we *could* filter & transform both the strings and variable substitutions. In fact, this is what I came up with to ease
 producing HTML from template literals:

```diff
{{listing-04-to-05.diff}}
```
```javascript
{{listing-05.js}}
```

### Weird quirks of my HTML templates

There are a few strange things going on here. (Or, at least, I thought they were strange.)

First off, my `html` template function returns a function. *That* function returns the desired string content. 

This was weird to me when I first learned about tagged template literals: *The function that processes a tagged template literal doesn't have to return a string!* It really confused in using modules like [HTM (Hyperscript Tagged Markup)][htm] to create JSX-free components for [Preact][]. But, as it turns out, a tagged template string can result in essentially *anything* - not just a string.

And here's why I built it that way: I'm using a function as the mechanism to indicate which values *should not be encoded for HTML*. The `htmlValue` function checks for `(typeof value === "function")`. Any variable substitutions of type function are called & included without escaping. All others are escaped for HTML.

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

For another way to think about it, consider that [React has a mechanism where unescaped markup is indicated][react-unescape] like so:

```html
<span dangerouslySetInnerHTML={{ __html: "<b>right here</b>" }} />
```

The approach here is to just use `typeof value === 'function'` in a similar spirit.

[react-unescape]: https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml

I've been happy so far with how this template scheme has turned out. It just leaves an awkward aspect where the final consumer of the template has to call the return value to get the result:

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

Okay, now we have blog posts with YAML metadata and Markdown content paired with an HTML template scheme for publishing web pages. I'll leave improving those web pages as an exercise to the reader. You can [peek at my templates][lmo-blog-templates] as an example, but you'll want your own look & feel. Also my templates are terrible.

Templates aside, the next improvement is around directory layout of the static web site. Earlier, I mentioned the "[old web tradition][cool-uris]" of producing clean URL paths - e.g. `/2020/05/25/diy-easy-blog-oven/`. Well, our URL paths are a mess at this point. 

So, let's improve that by using dates to build directory paths:

```diff
{{listing-05-to-06.diff}}
```
```javascript
{{listing-06.js}}
```

For my blog, I use a filename convention like this: `2020-05-25-diy-easy-blog-oven.md`

This code takes advantage of that naming convention with a regular expression to extract the date and slug for use in constructing the directory structure during the build. However, as an override, I can explicitly set a date via the `date` attribute in the post's front matter.

### Dates & names & files, oh my!

Here's some context & history behind that arrangement: Some file-based blogs I've used read the file modification time as the source of the date. This could be nice, insofar as the date automatically updated as I edited the post. But, things fell apart if I backed up and restored the files while forgetting to preserve the timestamps. All the posts suddenly looked like they were published *today* - oops!

I can also stash the date in a post's front matter as a `date` property. I've done that in some places, occasionally as the result of an earlier database export from Movable Type or WordPress many years ago. I like to have it as an option.

What I've found works best, though, is to follow a naming convention for blog post filenames - i.e. `YYYY-MM-DD-slug.md`. This survives lots of mistakes in backup & restore - and it gives me a natural sort order for listing files on disk.

### An aside on slugs

Oh yeah, and ["slug" is a general term][slug] for the ID or name of a blog post - independent from the title or headline of the post. A slug is what shows up in the URL to uniquely identify the post from others on the same day.

Although slugs can be random IDs or automatically derived from titles, many web publishing systems treat the slug and title as separate properties managed by the author. A fun thing to watch for on news sites is when a draft of an article is submitted with an initial slug and title. Later, the title is changed but the slug is left untouched. This can result in some fun situations where the headline of an article has been made more subtle - but the slug retains some fairly blunt language.

Anyway, I'm getting punchy and I digress. In this system, the slug is derived from the filename of the blog post Markdown source file.

[slug]: https://en.wikipedia.org/wiki/Slug_(publishing)

## Rendering post indexes by recent, date, and tag

Now that we have a decent directory structure, it would be nice to have index pages to navigate around the blog.

Up to this point, I've been trying to keep the changes to the script small and relatively easy to explain. From here, though, I'm just going to go for broke and spew some code:

```diff
{{listing-06-to-07.diff}}
```
```javascript
{{listing-07.js}}
```

There's a lot of repetition here, but I tried to keep it [DRY][]. 

The gist is that, since we're loading all the blog posts into memory, we can easily collate posts into groupings based on attributes like year, month, and tags. The new `indexBy` utility function takes care of that.

[dry]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself

Once collated into convenient groupings, we can use the `writeIndexPage` utility function to build each index page via `templateIndexPage` and then write to disk at the approriate paths in the directory structure.

This, by the way, is one of the things that surprised me: My blog has over 1000 posts, accumulated over the course of 18 years. I expected the execution time of this script to be impracticably slow.

Well, the script at this point takes about 2 seconds on my computer:

```shell
$ time node listing-07.js 
real    0m1.646s
user    0m2.056s
sys     0m0.305s
```

This was one of the big surprises I found when I started playing with this idea. I'm used to thinking about databases and indexes and threads and clusters of servers when it comes to churning through lots of content. But, even if it looks like a lot of content to me as the author, it's not much at all to a modern computer.

To be fair, I've added complications to the code that *actually* publishes this blog versus the script I've built up for this post. But, my "production" code still builds this whole site in under 7 seconds. And, if I feel like tinkering some more, I could probably optimize and bring that time back down again.

## Publishing to GitHub Pages via Actions

This is the final stretch. We've got a script that generates a static site from blog posts - including indexes listing posts by year, month, and tag. The last thing is to get all of this content onto the web.

When I last built a static site generator for my blog, [I hooked it up][travis-blog] to [Travis CI][] as a learning project. It was also convenient: When I pushed new content to GitHub, it eventually ended up on Amazon S3. Back in 2015, it was neat to see the Rube Goldberg machine kick into action without me having to run any code on my laptop.

Since then, GitHub themselves have come up with their own offering in the workflow automation market with [GitHub Actions][]. It's worth reading the docs, but I don't want to sidetrack too far into a general tutorial. 

Long story short, building & publishing a static site to [GitHub Pages][] via Actions boils down to dropping a file like this as [`.github/workflows/main.yml`][main-workflow] in my GitHub repository:

[main-workflow]: https://github.com/lmorchard/blog.lmorchard.com/blob/master/.github/workflows/stage.yml
[github actions]: https://help.github.com/en/actions
[travis-blog]: https://blog.lmorchard.com/2015/10/22/blogging-via-travis/
[travis ci]: https://travis-ci.org/

```yaml
{{main.yml}}
```

If you've got experience with other workflow automation tools like [Travis CI][] or [CircleCI][], this might look familiar. That is, this configuration file instructs [GitHub Actions][] to do stuff on every push to `master` branch:

* Fire up a virtual machine running Ubuntu Linux.
* Check out my repository.
* Set up Node.js v14.2.0.
* Configure git with my details - you'll want to customize this.
* Installs Node packages for the blog.
* Run the build script for the blog.

Finally, in the most complicated line of the file, it runs a `gh-pages` command from NPM to push the built content into the `gh-pages` branch of the repo [using secret credentials][gh-actions-token] injected into the environment. The nice thing about this last bit is that it adapts to whatever repository in which it's used, thanks to the variables.

With a bit more research, this could probably be done even more simply. [GitHub Actions][] offers a marketplace of ready-made actions that you can drop into a workflow like this. What I've got works for now, [but there's probably a tidier option available][gh-pages-actions].

[gh-pages-actions]: https://github.com/marketplace?type=actions&query=github+pages
[gh-actions-token]: https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token
[circleci]: https://circleci.com/

In any case, the end result of all of this should be an unexpectedly fast static site generator for a blog that self-publishes to [GitHub Pages][] web hosting on pushes to a GitHub repository. As a bonus, since GitHub supports editing files directly from the web interface, you can even write blog posts in Markdown right from there and even preview your content!

[github pages]: https://pages.github.com/

## Next steps

The script I built up in this post looks a lot like where I started with all of this at the start of the weekend. I've since done a lot of complication, refactoring, and code golfing that probably wouldn't improve this post to explain. You can come take a peek at [my "production" code][github-blog-lmo], if you like. [It's all in GitHub][github-blog-lmo]!

[github-blog-lmo]: https://github.com/lmorchard/blog.lmorchard.com/

Left as an exercise to the reader of this post are activities like the following:

* Refactor, clean, and [DRY][] things up for yourself.
* Improve and customize the HTML templates, add your own CSS & JS.
* Add comments - for example, [Disqus is pretty convenient to add to a static site][disqus-install].
* Better error handling - this script will just bail out if anything goes wrong.
* Publish to another web host - I use Amazon S3 & CloudFront for my own domains.
* Try indexing some different collections of posts - e.g. it wouldn't be hard to add a `featured: true` flag to front matter and build a page of featured posts!
* Support directory-based posts - I do this to bundle the post Markdown along with associated images and other assets.

[disqus-install]: https://disqus.com/admin/install/platforms/universalcode/

In any case, I hope this walkthrough was worth the time to walk through. Feel free to do whatever you want with the code, whether you start a fabulous new blog or ignore it completely. Let me know what you thought, either in the comments or wherever else you might find me!
