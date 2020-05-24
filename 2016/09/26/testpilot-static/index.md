**TL;DR**: Firefox Test Pilot is becoming a statically-generated site from content in flat files. We're moving away from Django and PostgreSQL, and it's been a bit of a journey.

<!--more-->

<img class="fullwidth" src="/uploads/2016/tp-header.png" />

<nav role="navigation" class="table-of-contents"></nav>

I've been working on [Firefox Test Pilot][testpilot] for over a year, but I haven't written about it here before now. Mostly because I've been busy and lazy and [busily shaving yaks](/2016/08/31/yak-shaving-habits/).

But, there have been big things afoot lately, and I figured they were worth writing about - if only because they're invisible, behind-the-scenes things that nonetheless took a lot of work to accomplish.

## Be prepared - but for what?

When we started building Test Pilot last summer, we based the server-side on Django & PostgreSQL. We had assumptions about the future: 

* We'd need to collect measurements from experiments. 

* We thought experiments would need some active server-side resources provided by the mothership.

* We'd need to manage user profiles & preferences, so we required sign-in with a Firefox Account. 

A year later, these assumptions didn't quite pan out: 

* Rather than reinvent the wheel by collecting & analyzing measurements ourselves, we took advantage of Google Analytics and the efforts of [the Firefox Telemetry team][telemetry].

* We found it's best to stay out of the way of teams building Test Pilot experiments - let them manage their own services as necessary, rather than be tied to the delivery cadence of the core project.

* The sign-in requirement turned away many potential users. But, we didn't need accounts to facilitate experiment participation anyway. Our metrics are anonymous and a Firefox add-on manages opt-in.
  
  Accounts ended up being private data we had to keep secure, but only used for email notifications. We have better ways to manage email subscriptions across Mozilla - so one less wheel to reinvent!

## Didn't need that server anyway

There was just one last reason to use Django & PostgreSQL on Test Pilot: A web-based content management system to update the site without heavyweight server deployments & database migrations. 

But, wait a minute: If the other reasons for a server dropped away - why do we need complex deployments?

Furthermore, why maintain content [in a database][database] at all?

The whole Test Pilot team knows their way around text editors and GitHub - so let's make that our CMS. We can [bake the whole site][sitebake] from [flat files][]. Deployment is [running a build script][buildscript] and [uploading the result][uploadweb] to a web server. We get revision control & collaboration along with the rest of the project. And as a security bonus, we stop shipping the tools to change the site along with the deployed site itself.

None of this is revolutionary. Aaron Swartz's "[Bake, Don't Fry][baked]" is over 14 years old: Why fry up a new web page for every visit when you can pre-bake the whole site ahead of time? I used [Bloxsom][] back in the day and [Gulp bakes this blog now][gulp]. Static site generators [are numerous & popular][staticgen] - GitHub itself offers [GitHub Pages][pages] powered by [Jekyll][].

It sounds obvious in retrospect, but it took awhile to realize our site could be stripped down to so little. We assumed we needed all those moving parts - or would need them someday. But, it appears that we can get away with being nearly serverless. And if someday a feature requires more, we can stand up some loosely-coupled microservices - or better yet, find that another team at Mozilla has already solved the problem.

## The show must go on

But, having realized all of this, we couldn't just burn down the site and start over. Because we're working on a vehicle in motion, we've been doing this in increments over the summer: 

* A couple of months ago, [we removed the Firefox Accounts requirement][fxareq] and then [deleted the user data][deletedata] once we were sure we weren't going back.

* We switched data sources for displaying the number of folks participating in experiments from our own Django API to [a Telemetry-based resource][counts].

* I wrote a task to [import content from the current Django API][import]. Then, I wrote [a task to generate JSON][generatejson] from those imported files - a direct static replacement for the Django API.

* Next, I implemented [a feature flag in Django][featureflag] to substitute static JSON for content from the database. Thus, we can start managing content in YAML now, maintaining our current infrastructure until we work out a new stripped-down deployment process.

* Soon, we'll be able to update the site by pushing to the appropriate branch on GitHub. We've got [tasks to generate stub pages][stubs] for all the front end app routes. We're also looking into enforcing a requirement to [sign our commits and tags][signreq] on the way to release.

* After that, [we plan to go even further with static site generation][staticsite]. Test Pilot is currently a single page app that pulls content from JSON. But, we can do better by pre-rendering those HTML pages in our build process ahead of time.

## What's next?

There's a funny thing about all of this: If we're successful, no one visiting the site should notice anything different. We're developing some new features & experiments - but all this work to rid our infrastructure of Django & PostgreSQL should ideally be a non-event for anyone visiting the site. This is the least glamorous sort of work one occasionally has to do on a software project - change everything, but don't break anything.

The real benefit will be that we're able to do a lot of things faster and more easily. For instance, there are now fewer places that need changes to display a new piece of information on a page. We don't have to monitor as many third-party dependencies - [which we weren't doing very well to begin with][dependencies].

Our development stack shrinks from Docker containers with Django & PostgreSQL & Node.js - down to just Node.js v6.2.0. [The whole system has gotten simpler and more direct][quickstart].

But, wait, there's more: Along with totally changing our server-side infrastructure, [we've also rewritten the front end of the site to switch from Ampersand to React & Redux][reactrewrite]. It should make static site generation easier. It's also eased development on a handful of new features in the past week or so.

It's a big deal - and another thing that, in retrospect, seems more obvious now than it did a year ago. But, I'm going to save writing about that for my next post.

[dependencies]: https://github.com/mozilla/testpilot/issues/1116
[quickstart]: https://github.com/mozilla/testpilot/blob/master/docs/development/quickstart.md
[testpilot]: https://testpilot.firefox.com/
[buildscript]: https://github.com/mozilla/testpilot/blob/master/docs/development/deployment.md#producing-a-static-build
[uploadweb]: https://github.com/mozilla/testpilot/blob/master/circle.yml#L71
[sitebake]: https://github.com/mozilla/testpilot/blob/master/frontend/tasks/pages.js
[stubs]: https://github.com/mozilla/testpilot/blob/master/frontend/tasks/pages.js
[signreq]: http://micropipes.com/blog//2016/08/31/signing-your-commits-on-github-with-a-gpg-key/
[reactrewrite]: https://github.com/mozilla/testpilot/issues/1307
[staticsite]: https://github.com/mozilla/testpilot/issues/1306
[featureflag]: https://github.com/mozilla/testpilot/blob/master/testpilot/experiments/views.py#L50
[generatejson]: https://github.com/mozilla/testpilot/blob/master/frontend/tasks/content.js#L16
[import]: https://github.com/mozilla/testpilot/blob/master/frontend/tasks/content.js#L22
[counts]: https://github.com/mozilla/testpilot/issues/1039
[deletedata]: https://github.com/mozilla/testpilot/issues/1034
[fxareq]: https://github.com/mozilla/testpilot/issues/1035
[flat files]: https://github.com/mozilla/testpilot/tree/master/content-src/experiments
[telemetry]: https://wiki.mozilla.org/Telemetry
[gulp]: https://blog.lmorchard.com/2014/10/20/static-blog-generation-with-gulp/
[bloxsom]: http://blosxom.sourceforge.net/
[jekyll]: https://github.com/jekyll/jekyll
[pages]: https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/
[baked]: http://www.aaronsw.com/weblog/000404
[database]: https://indieweb.org/database-antipattern
[staticgen]: https://www.staticgen.com/

<!-- vim: set wrap linebreak nolist wrapmargin=0 textwidth=0 syntax=markdown formatoptions-=t: -->
