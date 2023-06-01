---
title: 'Naming Things: CamelCase vs snake_case'
author: lmorchard
layout: post
permalink: /2013/01/23/naming-conventions
dsq_thread_id:
  - 1107007531
categories:
  - Uncategorized
tags:
  - CamelCase
  - dev
  - javascript
  - python
  - snake_case
  - webdev
---
I&#8217;ve contributed code to a number of projects, often as a drive-by bug fix in a GitHub pull request. And, usually, I&#8217;ll try to do as the Romans do and follow the local naming and coding conventions. But, sometimes, I&#8217;ll fall back to my personal conventions and get dinged in the code review.

<!--more-->

For what it&#8217;s worth, those personal conventions look something like this:

`variable_names_in_snake_case`
:   Variable, a mutable thing. All lower case, words separated by underscores.

`CONSTANTS_IN_ALL_CAPS`
:   Constant, an immutable thing. All upper case, words separated by underscores.

`functionAndMethodNames`
:   Functions and methods, immutable and callable things. Mixed camel case, first letter always lower case.

`StructAndClassNames`
:   Structs and classes, immutable and instantiatable things. Mixed camel case, first letter always upper case.

Of course, given the features of any particular language, these rules yield subtleties. For instance, in <a target="_blank" title="JavaScript" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JavaScript</a> a variable can be assigned a callable thing, a declared function can be replaced by assignment, and classes & methods are themselves mainly just suggestions. These conventions are more about my intentions than anything literally baked into syntax.

I&#8217;ve been using some variant of the above rules for close to 20 years, across probably a dozen languages. On <a target="_blank" title="JavaScript" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JavaScript</a> projects, I end up with [snake_case][1] in undesirable places. On Python projects, I&#8217;ll use [CamelCase][2] where it&#8217;s not wanted.

On the Python side, I know there&#8217;s [PEP 8][3]. That&#8217;s something to point at and claim uniformity, and [it has tooling support][4]. On the <a target="_blank" title="JavaScript" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JavaScript</a> side, I seem to be missing some recent consensus amongst the current wave of browser and nodejs enthusiasts. That, or I&#8217;m just contributing to more projects than my own these days (thanks to GitHub) and only running into this now.

But, here&#8217;s what always leaves me mildly rankled: Why just one or the other? Why discard the semantic shading available through mixing [snake_case][1] and [CamelCase][2], at least by way of consistent rules? I know there&#8217;s a such thing as syntax highlighting, but combining that with these conventions has often helped me with highlighting is unavailable. [Belt and suspenders][5], and all that.

Of course, I prefer my rules, because they&#8217;re a deeply ingrained habit. I know this is my peeve. But, what I&#8217;ve never quite been able to get is a satisfying answer as to why one style is preferred to the exclusion of another. Usually I get responses like &#8220;That&#8217;s just the way it&#8217;s done&#8221;, or &#8220;The other way is ugly&#8221;. So, it&#8217;s down to personal whim, project momentum, or [cargo cult][6].

I guess it bothers me to see a perfectly good semantic tool thrown out for no good reason as far as I can tell. Feel free to drop me a comment here, if I&#8217;m missing any good reasons. Some additional bits and pieces accumulate below:

*   Here are some arguments against CamelCase for [accessibility reasons][7] and for [non-english speakers][8].

*   [The Twisted project uses *both* CamelCase *and* snake_case in the same variable names.][9] The bit before the underscore signifies the type of a method, and the bit after is the name &#8211; eg. `remote_loginAnonymous` or `test_addDSAIdentityNoComment`.

Anyway, this has been bugging me for long enough that here I am finally blogging about it, so that I have an URL to throw into conversations when it comes up.

 [1]: http://en.wikipedia.org/wiki/Snake_case
 [2]: http://en.wikipedia.org/wiki/CamelCase
 [3]: http://www.python.org/dev/peps/pep-0008/
 [4]: http://pypi.python.org/pypi/pep8
 [5]: http://en.wiktionary.org/wiki/belt_and_suspenders
 [6]: http://en.wikipedia.org/wiki/Cargo_cult
 [7]: http://stackoverflow.com/questions/1740116/for-what-reason-do-we-have-the-lower-case-with-underscores-naming-convention/1740152#1740152
 [8]: http://stackoverflow.com/questions/1740116/for-what-reason-do-we-have-the-lower-case-with-underscores-naming-convention/1740131#1740131
 [9]: http://glyph.twistedmatrix.com/2012/10/a-tired-hobgoblin.html