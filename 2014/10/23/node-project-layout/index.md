I'm pleased with [this project layout][layout] for a node.js-based web client /
server app.

<!--more-->

```bash
➜  toothub git:(master) ✗ tree
├── Procfile
├── README.md
├── app.json
├── bin
│   └── toothub
├── config.json-dist
├── htdocs
│   ├── css
│   │   └── main.styl
│   └── index.html
├── lib
│   ├── cli
│   │   ├── index.js
│   │   └── server.js
│   ├── client
│   │   └── index.js
│   ├── models
│   │   ├── Item.js
│   │   └── index.js
│   └── server
│       ├── index.js
│       └── static.js
├── package.json
└── test
    └── test-index.js
```

[Browserify][] lets me share a lot of code between client & server, using the same
conventions.  Though, I have to be careful not to pile too much into the
client-side JS bundle. It's really easy to inflate that.

[Browserify]: http://browserify.org/

The [require-dir][] module lets me do [some lazy things][lazy] to break up my
code into more submodules - at least on the server side. It's a little thing,
but I really like it. I first saw it over in [this Gulp + Browserify starter
kit][starterkit].

[starterkit]: http://viget.com/extend/gulp-browserify-starter-faq
[require-dir]: https://www.npmjs.org/package/require-dir
[lazy]: https://github.com/lmorchard/feeder2/tree/9d02e216e4d4e47351a69eece8bece67d2fed550/lib/cli

Thanks to the [Heroku Button][], this thing is cake to get running
somewhere *out there*. Free Heroku is like the Raspberry PI of the cloud. I'm
starting to think that anyone who's into indiewebish self-hosting concepts
should really be taking a look at this.

[Heroku Button]: https://blog.heroku.com/archives/2014/8/7/heroku-button

I've also been really into [Gulp][] recently, but so far I don't need it here.
I'm gratuitously wasting memory and cycles by processing resources on the fly
through the app server rather than generating as static assets. Maybe I'll
change my mind on that after I've tinkered for awhile.

[gulp]: http://gulpjs.com/
[layout]: https://github.com/lmorchard/toothub/tree/913c4d326ea5a424087899a103301323d46d8086

Anyway, now I guess I should actually start making this thing do stuff.

<!-- vim: set wrap wm=5 syntax=mkd textwidth=78: -->
