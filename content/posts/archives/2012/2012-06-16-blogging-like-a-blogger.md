---
title: Blogging Like a Blogger
author: lmorchard
excerpt: "So, I read about Blogging Like a Hacker a few years ago. It sounded like a neat idea. Finally, after much procrastination, I switched to Jekyll and Disqus for blogging and comments a little over a year ago. Well, guess what? Though the process was novel, I didn't blog with any more frequency than I have over the past couple of years."
layout: post
permalink: /2012/06/16/blogging-like-a-blogger
dsq_thread_id:
  - 1107338550
categories:
  - Uncategorized
tags:
  - git
  - hacking
  - jekyll
  - metablogging
  - wordpress
  - writing
---
So, I read about [Blogging Like a Hacker][1] a few years ago. It sounded like a neat idea. A little over a year ago, after much procrastination, I [switched to Jekyll and Disqus][2] for blogging and comments.

Well, guess what? Though the process was novel, I didn&#8217;t blog with any more frequency than I have over the past couple of years. I think I&#8217;ve discovered this about myself: I like [hacking like a hacker][3], and I might even like writing a book like a hacker using [AsciiDoc][4] and [git-scribe][5]. But, those are things which tend to demand deliberation and attention to detail.

But for blogging? Forget all that fuss. At least, not the way I want to blog. I usually want to spew things that are longer than a [tweet][6], but shorter than a formal essay. I might iterate by reviewing & revising a few times, because I can&#8217;t resist. But, then, I&#8217;ll move on.

And, for that kind of writing, the process of using git & jekyll just throws too much friction into my brain:

*   I have to create a text file with a filename of proper form,
*   edit the text with whatever&#8217;s floating in my brain stew,
*   start up jekyll for a preview, wait, `Ctrl-C` after a few minutes,
*   make sure I don&#8217;t have my other 1001 posts in the way because generating things takes *ffoorreevveerr*. (Tools like [Marked][7] help here, quite a lot.) 
*   start up jekyll again and load the new post in a browser
*   repeat a few times

Oh, and then once I&#8217;m happy with the post, I get to:

*   compose a commit message, 
*   push to my web server and github for good measure
*   wander off while a post-receive hook regenerates my site on my server

And then, very recently, I decided to check out WordPress again. I almost forgot how stupidly quick & simple it was to set up. Things like that make me want to hack PHP again.

In WordPress, my process is this:

*   visit my blog in my browser, create a new post; 
*   go tappy-tappy like a monkey writing Shakespeare, watch the preview pane;
*   hit publish

If I&#8217;m feeling frisky, I can update a few more times and also hit some buttons to light up Facebook and Twitter with my new brain vomit.

In my brain, this process makes it feel like so much less of a pain, lame as that might sound. And it&#8217;s still self-hosted. And I can still do weird things, if I even care about that anymore. Which I don&#8217;t, at least not [as much as I did back in 2002][8].

As it turns out, a pile of static <a target="_blank" title="HTML" href="https://developer.mozilla.org/docs/Web/HTML?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">HTML</a> generated from text files kept in git is a great way to archive & mothball a site. And, I&#8217;ve been wanting to do more things on <http://lmorchard.com> &#8212; because <http://decafbad.com> isn&#8217;t my name, and there are surprisingly many decafbad&#8217;s on the net.

So, now&#8217;s as good a time as any. End of an era, and all that.

Oh, and also: WordPress is really easy to update, once I set up an FTP server. It scared me a little to try it the first time, but it just worked. And then it worked again. I never had to ssh into my server, just click buttons in my browser. And that&#8217;s about my speed when I&#8217;m in a lazy blogging state of mind.

Whew. This was a long post, given all I just said up there. So, I think it&#8217;s time to hit the publish button.

 [1]: http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html
 [2]: http://decafbad.com/blog/2011/06/08/moved-to-jekyll
 [3]: https://github.com/lmorchard/
 [4]: http://www.methods.co.nz/asciidoc/
 [5]: https://github.com/schacon/git-scribe
 [6]: http://twitter.com/lmorchard
 [7]: http://markedapp.com/
 [8]: http://www.decafbad.com/blog/2002/02/14/ooooab