<nav role="navigation" class="table-of-contents"></nav>

TL;DR: I built [a toy app using React for web and native][react-multiplatform] to get a feel for whether this hybrid approach is worth using. I think the answer is "yes" - but mainly for apps whose business logic & data models are more complex than their views.

<!--more-->

## Write slightly more than once, run manywhere

At Mozilla, one of the things we try to champion is the efficiency of writing one web app versus building many separate native apps. In practice, your mileage varies based on goals, priorities, platform capabilities, and a dozen other factors.

[React][] and [React Native][] seem to offer a middle ground: Given the shared conventions and patterns and language, it should be possible to share a lot of code between platforms while still taking advantage of native capabilities.

So, I figured I'd give it a shot and try measuring the common lines of code as a rough success metric.

## Great, another Todo app

I decided to build a Todo app, with lots of inspiration and a little code borrowed from [TodoMVC][].

A basic Todo app demands just enough user interface and data management to get an initial feel for most app frameworks. Commit to something bigger and you may end up wasting your time. Build something smaller and you won't have explored deep enough into the framework's solution space.

I think I've erred on the shallow side, but that just gives me room to improve.

## What about Flux vs MVC?

It's said that React provides just the V in MVC (Model-View-Controller). But, there's also [this Flux notion][flux]. It's billed as an alternative to MVC, and React is intended to be a part of it. That said, I haven't quite yet wrapped my head around Flux. Luckily, React is focused and useful in isolation. So, I can defer buying into the rest of the conceptual package as I learn.

In fact, I didn't even really end up building a proper MVC app. The Controller role got distributed between Views & Models: UI event handlers in Views modify Models directly. Views subscribe to change events from Models to update their own state.

I expect that when I grok Flux better, it's this reciprocal Model/View relationship that will get broken up & mediated by a Dispatcher. But, in the spirit of iterative hacking, I forged ahead with my terrible code & design.

## Building shared Models

For the Model layer, I took a look at [Ampersand.js][]. Based originally on [Backbone.js][] - a library of which I'm a big fan - [Ampersand.js][] breaks things up into a collection of small modules that work well together. But, like [React][], most of the modules are handy in isolation or alongside substitutions from outside of the [Ampersand.js][] family.

For managing a single todo item, I liked the looks of [ampersand-state][]. With it, you can build JavaScript objects with properties that can be watched for changes. This is what [my todo item model][todo-model] looks like, using [TodoMVC code][todo-model-ampersand] as a starting point:

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

## Forking the Views by platform

This Model code works on both the web and native sides of my app. So far, so good - and pretty straightforward.

However, getting down to actually rendering this data across platforms reveals where things start to vary. For example, [the JSX in the `render()` method of my web view][item-web-render] looks like this:

```javascript
return (
  <li style={itemStyles.container}>
    <input type="checkbox"
      style={itemStyles.completed}
      onChange={(event) => this.handleCompletedChange(event.target.checked)}
      checked={this.state.item.completed} />
    {title}
  </li>
);
```

Meanwhile, [the JSX in the `render()` method of my iOS view][item-ios-render] looks like this:

```javascript
return (
  <View style={styles.todoItem}>
    <SwitchIOS
      style={styles.todoCompleted}
      onValueChange={this.handleCompletedChange}
      value={this.state.item.completed} />
    {title}
  </View>
);
```

[item-web-render]: https://github.com/lmorchard/react-multiplatform/blob/3fd16fe31473f249d8a54020ef252f524dd17d70/lib/views/web/TodoItem.js#L34
[item-ios-render]: https://github.com/lmorchard/react-multiplatform/blob/3fd16fe31473f249d8a54020ef252f524dd17d70/lib/views/ios/TodoItem.js#L42

And, if you take a longer peek at those views, you'll see some slightly more complex JSX devoted to the `{title}` placeholders where rendering changes based on whether the item is being edited.

It's not radically different; it's just enough to make things interesting.

## Code sharing with React mixins

What you might notice about these two divergent views, though, is they both start like this:

```javascript
var TodoItem = module.exports = React.createClass({
  mixins: [Views.TodoItemCommonMixin],
  // ...
```

It turns out that, thanks to [React mixins][], I can write [the bulk of the View logic][item-shared-view] in a shared module. Since both sides use Models based on [ampersand-state][], this includes subscribing to Model changes:

[React mixins]: https://facebook.github.io/react/docs/reusable-components.html#mixins

```javascript
getInitialState() {
  return { editing: false, item: this.props.item };
},
componentDidMount() {
  this.state.item.on('change', () => this.forceUpdate(), this);
},
componentWillUnmount() {
  this.state.item.off(null, null, this);
},
componentWillReceiveProps(props) {
  this.setState({ item: props.item });
},
componentDidUpdate(prevProps, prevState) {
  if (prevState.item !== this.state.item) {
    prevState.item.off(null, null, this);
    this.state.item.on('change', () => this.forceUpdate(), this);
  }
}
```

[item-shared-view]: https://github.com/lmorchard/react-multiplatform/blob/3fd16fe31473f249d8a54020ef252f524dd17d70/lib/views/index.js#L35

And, since both sides use Views based on [React][], many UI event handlers can also be shared despite the difference in platform specific JSX and view elements.

(Of course, I recently learned that [React mixins are dead][dead-mixins], so I'm already behind the times. But, this code works for now. I'll get around to burning that bridge when I learn more about Flux.)

[dead-mixins]: https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750

## Forking & sharing Model code for persistence

For multiple todo items, [ampersand-collection][] is handy. It manages arrays of [ampersand-state][] objects and emits events when the set changes. This is useful for keeping [list][list-web-view] [views][list-ios-view] updated.

[list-web-view]: https://github.com/lmorchard/react-multiplatform/blob/3fd16fe31473f249d8a54020ef252f524dd17d70/lib/views/web/TodoList.js
[list-ios-view]: https://github.com/lmorchard/react-multiplatform/blob/3fd16fe31473f249d8a54020ef252f524dd17d70/lib/views/ios/TodoList.js

[ampersand-collection][] also offers methods for serializing & deserializing the models it contains. That's just what I need, because I'd like to make my todo list items persistent between sessions with the app.

[todo-model]: https://github.com/lmorchard/react-multiplatform/blob/master/lib/models/Todo.js
[todo-model-ampersand]: https://github.com/tastejs/todomvc/blob/master/examples/ampersand/js/models/todo.js

Apropos of that, we have some storage capabilities on each platform: [localStorage][] for modern browsers, and [AsyncStorage][] for React Native. Both allow you to store small amounts of persistent data on a device. For the purposes of this toy app, these data stores are just about right.

But, these storage APIs differ. [Using localStorage][using-localstorage] looks like this:

```javascript
readFromStorage: function () {
  var existingData = localStorage[STORAGE_KEY];
  if (existingData) {
    this.set(JSON.parse(existingData));
  }
},
writeToStorage: function () {
  localStorage[STORAGE_KEY] = JSON.stringify(this);
}
```

Meanwhile, [using AsyncStorage][using-asyncstorage] looks like this:

```javascript
readFromStorage() {
  AsyncStorage.getItem(STORAGE_KEY).then((existingData) => {
    this.set(JSON.parse(existingData));
  });
},
writeToStorage() {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this));
}
```

If you peek at those last two links, though, you might notice they both define classes that start like this:

```javascript
var TodoCollection = module.exports = BaseCollection.extend({
```

Since [ampersand-collection][] supports class inheritance, the bulk of the logic for these collections can be housed in [a shared superclass][basecollection]. The subclasses just need to implement the platform-specific storage methods. A different mechanism than [React mixins][], but for basically the same purpose.

[using-localstorage]: https://github.com/lmorchard/react-multiplatform/blob/3fd16fe31473f249d8a54020ef252f524dd17d70/lib/models/web/TodoCollection.js#L14
[using-asyncstorage]: https://github.com/lmorchard/react-multiplatform/blob/3fd16fe31473f249d8a54020ef252f524dd17d70/lib/models/ios/TodoCollection.js#L9
[basecollection]: https://github.com/lmorchard/react-multiplatform/blob/3fd16fe31473f249d8a54020ef252f524dd17d70/lib/models/TodoCollection.js#L8

[AsyncStorage]: https://facebook.github.io/react-native/docs/asyncstorage.html
[localstorage]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API

## Sharing by the numbers

The main goal of this experiment is to get a feel as to whether a hybrid React approach is worth considering versus building totally separate apps for native and web platforms. The metric I decided to use for this is counting lines of code (LoC), and this is what I found:

* Overall, ~30% shared LoC (226 / 748).

* For Models, ~74% shared LoC (159 / 215).

* For Views, ~12% shared LoC (67 / 533).

Because I like showing my work, here's how I came up with those numbers:

```bash
# Total LoC for models = 215
$ cat lib/models/**/*.js | wc -l
     215

# ~74% common model code
$ cat lib/models/*js | wc -l
     159

# ~12% iOS specific model code
$ cat lib/models/ios/*js | wc -l
      25

# ~14% web specific model code
$ cat lib/models/web/*js | wc -l
      31

# Total LoC for views = 533
$ cat lib/views/**/*.js | wc -l
     533

# ~12% common view code
$ cat lib/views/*js | wc -l
      67

# ~44% iOS specific view code
$ cat lib/views/ios/*js | wc -l
     235

# ~43% web specific view code
$ cat lib/views/web/*js | wc -l
     231
```

## Conclusion

Using React for both web & native looks promising. However, the toy app I've built is too simple to present an overwhemingly compelling case.

What I tried to do here was get a quick feel for the shape of things and where the code multipliers can be found. Your mileage will vary on app features and code refactoring ability.

In particular, this toy app's models are very simple. So, even though there's a lot of sharing, it doesn't make a big impact on the bottom line. In an app with more complex business logic, that could change favorably.

On the other hand, Views between platforms will have a greater impact as they get more complex in dealing with divergent UI elements. You could paper over many platform differences with reusable components that normalize APIs & usage patterns - hopefully while not squashing unique advantages of each platform. So far, this app is too simple to really expose those opportunities.

And, of course, all bets are off once you've left React for straight native development. My hunch is that there are qualitative & quantitative benefits to reducing context switching. You can focus development & testing efforts on JavaScript & React as opposed to multiple native & web toolkits (e.g. Objective-C & Swift & Java - oh my!). But, measuring that hunch is beyond the scope of what I tried doing here.

Hopefully, I've raised some interesting features of the terrain. But, I know this is a very shallow look at things and I'm learning as I go along. Feel free to poke holes in this stuff and throw some suggestions at me!

[ampersand-subcollection]: https://github.com/AmpersandJS/ampersand-subcollection
[ampersand-collection]: https://github.com/AmpersandJS/ampersand-collection
[ampersand-state]: https://github.com/AmpersandJS/ampersand-state
[ampersand-view]: https://github.com/AmpersandJS/ampersand-view
[Backbone.js]: http://backbonejs.org/
[ampersand.js]: http://ampersandjs.com/
[flux]: https://facebook.github.io/flux/docs/overview.html
[TodoMVC]: http://todomvc.com/
[react-multiplatform]: https://github.com/lmorchard/react-multiplatform/
[react]: https://facebook.github.io/react/
[feels-like-web]: https://code.facebook.com/posts/1014532261909640/react-native-bringing-modern-web-techniques-to-mobile/
[rn-devtools]: https://facebook.github.io/react-native/docs/debugging.html#content
[react-api]: https://facebook.github.io/react/docs/top-level-api.html
[React Native]: https://facebook.github.io/react-native/
