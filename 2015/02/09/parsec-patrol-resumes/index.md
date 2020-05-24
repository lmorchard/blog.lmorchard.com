Holy crap. Has it really been a year or so since I last hacked in earnest on
[Parsec Patrol][]? I've been meaning to get back to it, and it's always felt like
just last week when I was poking at it.

Well, a week or so ago, I read [Blake Williams'][blake] "[Replace [CoffeeScript][]
with ES6][replace]" and thought, "Hmm, on what project did I last use
[CoffeeScript][]? Oh yeah: [Parsec patrol][]!" So, I decided to take a swing through
the code and see what I was last up to. 

After a good look, I started an empty [new branch][newbranch] in [my
repo][repo] and started from scratch.

See, I started [Parsec Patrol][] as an excuse to force myself to learn a bunch of
new things I'd been putting off for awhile. Near the top of the list were
[Yeoman][], [Grunt][], [Bower][], [RequireJS][], and [CoffeeScript][]. Those
were all cool things, so I figured I'd just stir them all up in a big mess and
see what happened.

The process was fun - these were things that slotted into empty spots in my
webdev process, both expected and unexpected. Of course, [RequireJS][] was a
little awkward in comparison to modules in [Node.js][].  But hey, modules in
the browser! And, I never really quite grokked what was going on in those
tangly [Grunt][] configuration files and just kind of copypasta'd what others
were doing. But hey, build automation for all my weird webdev needs!

Then, after a nice & relaxing holiday vacation to wrap up 2013, I read "[And
just like that Grunt and RequireJS are out, it’s all about Gulp and Browserify
now][justlikethat]". 

Well that, along with things that followed, just drained my enthusiasm for
[Grunt][], [Bower][], and [RequireJS][] in an hurry. But, it didn't leave me
wanting to dive into the next big thing right away. So, I took a step back and
played with other things for a few seasons. [Web components][] and [developer
tools][] are kind of fun to hack on. [Polymer][] was kind of a crazy rabbit
hole.

But, over the past year, [Gulp][] and [Browserify][] started sneaking into my
work despite my fatigue - and they were helping me get things done. [Gulp][]
made sense to me: writing glue code to process file streams fit into my head a
whole lot better than trying to figure out how to shoehorn my intentions into
declarative-ish config files. And [Browserify][] gave me some [Node.js][]-style
happiness on the client-side, pushing most of the awkwardness into the build
system.

So, now I've got [Gulp][], [NPM][], [Browserify][], and [6to5][] as a new pile
of fun that seems like it might have a little bit of staying power. Of course,
[all this io.js business][iojs] could throw some monkeywrenches around. But,
it feels like the patterns I've got in play here are more stable than the
previous regime. 

Maybe I'll even recover enough enthusiasm for chasing webdev mayflies by this
spring to take a deeper dive at things like [React][] and [Angular][] and
[Ember][]. Then again, maybe I'll bang together a framework of my own just to
be cool.

[polymer]: https://www.polymer-project.org/
[react]: http://facebook.github.io/react/
[angular]: https://angularjs.org/
[ember]: http://emberjs.com/ 
[web components]: https://github.com/lmorchard/brick-select
[developer tools]: https://github.com/lmorchard/node-firefox 
[node.js]: http://nodejs.org/
[npm]: https://www.npmjs.com/
[parsec Patrol]: https://github.com/lmorchard/parsec-patrol
[Browserify]: http://browserify.org/
[yeoman]: http://yeoman.io/
[6to5]: https://6to5.org/
[grunt]: http://gruntjs.com/
[gulp]: http://gulpjs.com/
[RequireJS]: http://requirejs.org/
[bower]: http://bower.io/
[CoffeeScript]: http://coffeescript.org/
[iojs]: https://www.youtube.com/watch?v=1IOukA10QeQ
[repo]: https://github.com/lmorchard/parsec-patrol
[justlikethat]: http://www.100percentjs.com/just-like-[grunt][]-[gulp][]-[browserify][]-now/
[newbranch]: https://github.com/lmorchard/parsec-patrol/commits/newbranch
[blake]: https://twitter.com/blakewilliams__
[replace]: http://robots.thoughtbot.com/replace-[coffeescript][]-with-es6

<!-- vim: set wrap wm=5 syntax=mkd textwidth=78: -->
