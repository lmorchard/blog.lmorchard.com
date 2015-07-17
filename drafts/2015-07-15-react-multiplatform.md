---
title: Experimenting with a multi-platform app using React
tags: [webdev, native, react, reactnative, ios, mobile, mozilla]
---

<nav rolw="navigation" class="table-of-contents"></nav>

TL;DR: [I built an app using React.][react-multiplatform]

[React][] is a JavaScript library for building UI components - that is, just the V in MVC. If you're a webdev, [you might've heard of it][heard-of-it]. If so, you can skip over the next few paragraphs and get to the meat of this post.

[react-multiplatform]: https://github.com/lmorchard/react-multiplatform/
[heard-of-it]: https://twitter.com/bitchwhocodes/status/598698237579685888
[react]: https://facebook.github.io/react/

<!--more-->

## Write slightly more than once, run manywhere

At Mozilla, we're cheerleaders for the web. And, one of the things we try to champion is the efficiency of writing one web app versus building many separate native apps. In practice, your mileage varies based on goals, priorities, platform capabilities, and a dozen other factors.

[React][] and [React Native][] seem to offer a middle ground, though: Given the shared conventions and patterns and language, it should be possible to share a lot of code between platforms while still taking advantage of native capabilities. So, I figured I'd give it a shot.

## Great, another Todo app

I decided to build a Todo app, with lots of inspiration and a little code borrowed from [TodoMVC][].

It's nothing particularly exciting. But, a basic Todo app demands just enough user interface and data management to get an initial feel for most app frameworks. Commit to something much bigger and you may end up wasting your time. Build something much smaller and you won't have explored deep enough into the framework's solution space.

[TodoMVC]: http://todomvc.com/

## I heard React was good?

Much [has][vdom-performance] [been][vdom-performance-2] [written][vdom-performance-3] about React's virtual DOM and performance characteristics. But, the really interesting part is how React encourages developers to encapsulate everything in JS - markup, style, behavior, the works.

And then there's [React Native][] - "a framework for building native apps using React". It supports iOS, [with Android hopefully coming soon][rn-android]. React Native apps use JavaScript and a workflow [that feels a lot like React on the web][feels-like-web]. You get cheap live reloads instead of compiler rebuilds, [Chrome dev tools instead of Xcode][rn-devtools], and [the same basic React component patterns][react-api] carry over.

Apropos of that, React [is not free of controversy][react-bad-idea]: I mean, what's the deal with this [JSX garbage][jsx-garbage]? Inline styles *in **my** JavaScript*? [Madness][css-in-js-bad]! But, it can be said that [JSX offers some benefits comparable and complementary to Web Components][react-and-web-components]. And, [expressing styles in JS lends some advantages][css-in-js].

If nothing else, there are nice ergonomics to be found when piling everything related to a single conceptual view component in the same source file.

For what it's worth, I'm not entirely convinced. As a curmudgeon, [I cast a wary gaze upon the hippest of frameworks][wary-frameworks]. But, mindless dismissal of everything new leads to stagnation, so [I'll try to engage with a beginner's mind][beginner-mind] - [shoshin][] and all that. (Who knows? [I could end up liking it][opposites].)

[rn-android]: http://facebook.github.io/react/blog/2015/03/30/community-roundup-26.html#when-is-react-native-android-coming
[feels-like-web]: https://code.facebook.com/posts/1014532261909640/react-native-bringing-modern-web-techniques-to-mobile/
[rn-devtools]: https://facebook.github.io/react-native/docs/debugging.html#content
[react-api]: https://facebook.github.io/react/docs/top-level-api.html
[opposites]: http://blog.lmorchard.com/2003/10/16/seeing-out-opposites/
[React Native]: https://facebook.github.io/react-native/
[wary-frameworks]: https://twitter.com/MozLDNOH/status/620966483867377664
[react-and-web-components]: http://webcomponents.org/presentations/complementarity-of-react-and-web-components-at-reactjs-conf/
[Shoshin]: https://en.wikipedia.org/wiki/Shoshin
[beginner-mind]: http://blog.lmorchard.com/2002/06/13/oooaih/
[css-in-js-bad]: http://keithjgrant.com/posts/against-css-in-js.html
[vdom-performance]: http://calendar.perfplanet.com/2013/diff/
[vdom-performance-2]: http://stackoverflow.com/questions/21109361/why-is-reacts-concept-of-virtual-dom-said-to-be-more-performant-than-dirty-mode
[vdom-performance-3]: http://vdom-benchmark.github.io/vdom-benchmark/
[css-in-js]: http://blog.vjeux.com/2014/javascript/react-css-in-js-nationjs.html
[jsx-garbage]: https://twitter.com/mikeal/status/611624061496504320
[jsx-abomination]: https://medium.com/javascript-scene/jsx-looks-like-an-abomination-1c1ec351a918
[react-bad-idea]: https://www.pandastrike.com/posts/20150311-react-bad-idea

## Forget MVC - what about Flux?

There's also [this Flux notion][flux]. It's a way of doing things that's *different* than traditional MVC, and React is intended to be a part of it. But, I haven't quite wrapped my head around it yet. Luckily, since React is focused on views, I don't have to buy into the whole package right away.

The compulsion to commit with most opinionated frameworks tends to turn me off. I'm a [small pieces, loosely joined][splj] kind of guy, usually.

## What about the Controller?

I didn't really end up building a controller or router. Instead, my React views manipulate models directly, starting from [a root `App` view component][app-common-view] that initializes [an overall `App` model state object][app-common-model].

[app-common-view]: https://github.com/lmorchard/react-multiplatform/blob/master/lib/views/web/App.js
[app-common-model]: https://github.com/lmorchard/react-multiplatform/blob/master/lib/models/App.js

So, I guess this app ends up following neither Flux *nor* MVC conventions. That's probably a mistake that would reveal it's awfulness in a more complex app, but it kept things simple here.

## Building the Model

So, that leaves me with the data model. In this app, I want to manage todo items. Each item consists of some text and whether its completed yet. And, of course, I want to collect these items into lists. It would also be nice to filter my list of Todo items by completion status.

For managing a single todo item, I liked the looks of [ampersand-state][]. With it, you can build JavaScript objects with properties that can be watched for changes. It also offers conveniences such as calculating derived properties from other data properties.

This is what [my todo item model][todo-model] looks like, using [TodoMVC code][todo-model-ampersand] as a starting point:

```javascript
var State = require('ampersand-state');
module.exports = State.extend({
  // Properties this model will store
  props: {
    title: { type: 'string', default: '' },
    completed: { type: 'boolean', default: false }
  },
  // session properties are not included when serializing.
  session: {
    editing: { type: 'boolean', default: false }
  },
  destroy: function () {
    if (this.collection) {
      this.collection.remove(this);
    }
  }
});
```

This model works on both the web and native sides of my React app. So far, so good.

## Forking collections by platform

For managing lists of todo items, [ampersand-collection][] is handy. Not surprisingly, it lets you build collections of objects - but, it also collects the events fired by property changes on individual objects. And, [ampersand-subcollection][] is nice for supporting filtered subsets of a collection of data objects.

[todo-model]: https://github.com/lmorchard/react-multiplatform/blob/master/lib/models/Todo.js
[todo-model-ampersand]: https://github.com/tastejs/todomvc/blob/master/examples/ampersand/js/models/todo.js

I'd also like the todo items to stick around between sessions with the app. So, I need to store them somewhere.

[localStorage][] is a thing in modern browsers. [AsyncStorage][] is a thing in React Native. Both allow you to store small amounts of persistent data on a device. For the purposes of this toy app, these data stores are just about right.

But, the usage of each differs just enough to start complicating code sharing between React web and native platforms.

localStorage is a synchronous API, meaning that everything stops during store & fetch operations and results are immediately available to your code.



AsyncStorage requires the use of callback functions, because store & fetch operations are deferred.




[AsyncStorage]: https://facebook.github.io/react-native/docs/asyncstorage.html
[localstorage]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API

[ampersand-subcollection]: https://github.com/AmpersandJS/ampersand-subcollection
[ampersand-collection]: https://github.com/AmpersandJS/ampersand-collection
[ampersand-state]: https://github.com/AmpersandJS/ampersand-state
[ampersand-view]: https://github.com/AmpersandJS/ampersand-view
[Backbone.js]: http://backbonejs.org/
[ampersand.js]: http://ampersandjs.com/
[splj]: http://www.smallpieces.com/index.php
[flux]: https://facebook.github.io/flux/docs/overview.html
