---
title: 'KumaScript: Bringing scripting to the wiki bears'
author: lmorchard
layout: post
permalink: /2013/02/21/kumascript
dsq_thread_id:
  - 1106639264
categories:
  - Uncategorized
tags:
  - mdn
  - mozilla
  - wiki
---
<div id="toc_container" class="toc_wrap_right no_bullets">
  <p class="toc_title">
    Contents
  </p>
  
  <ul class="toc_list">
    <li>
      <a href="#Necessity_is_the_Mother_of_Invention"><span class="toc_number toc_depth_1">1</span> Necessity is the Mother of Invention</a>
    </li>
    <li>
      <a href="#What_Does_It_Look_Like"><span class="toc_number toc_depth_1">2</span> What Does It Look Like?</a>
    </li>
    <li>
      <a href="#Scripting_in_Wikis"><span class="toc_number toc_depth_1">3</span> Scripting in Wikis</a>
    </li>
    <li>
      <a href="#Why_JavaScript"><span class="toc_number toc_depth_1">4</span> Why JavaScript?</a>
    </li>
    <li>
      <a href="#Boring_Lets_Me_Sleep_at_Night"><span class="toc_number toc_depth_1">5</span> Boring Lets Me Sleep at Night</a>
    </li>
    <li>
      <a href="#HTTP_ALL_the_Things"><span class="toc_number toc_depth_1">6</span> HTTP ALL the Things</a>
    </li>
    <li>
      <a href="#Turtles_All_the_Way_Down"><span class="toc_number toc_depth_1">7</span> Turtles All the Way Down</a>
    </li>
    <li>
      <a href="#Security_Safety"><span class="toc_number toc_depth_1">8</span> Security & Safety</a>
    </li>
    <li>
      <a href="#Scaling_Stability"><span class="toc_number toc_depth_1">9</span> Scaling & Stability</a>
    </li>
    <li>
      <a href="#Maturity_THE_FUTURE"><span class="toc_number toc_depth_1">10</span> Maturity & THE FUTURE</a>
    </li>
  </ul>
</div>

[KumaScript][1] turned [one year old][2] back at the end of January, and I&#8217;m sad to say no one celebrated its birthday &#8211; not even me. I&#8217;m pretty sure very few people outside of the core team at the <a target="_blank" title="Mozilla Developer Network" href="https://developer.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">Mozilla Developer Network</a> even know what [KumaScript][1] is. So, I guess it&#8217;s about time I do something about that.

<!--more-->

### <span id="Necessity_is_the_Mother_of_Invention">Necessity is the Mother of Invention</span>

The major focus of my workaday (and workanight) life last summer was the relaunch of the <a target="_blank" title="Mozilla Developer Network" href="https://developer.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">Mozilla Developer Network</a> wiki.

It had been close to 18 months in the making, which usually spells [death march][3] and disaster. But, against many expectations, we did finally arrive at something for launch that neither fell over in flames immediately nor jettisoned a significant number of features with respect to what it was replacing. I think this is the first time in my career something like this went off with as few hitches as it did.

Your first questions might go something along the lines of, &#8220;18 months? For a *wiki*? Are you insane or just incompetent?&#8221; Well, it might help to note a few additional details:

*   We call it a wiki, but it&#8217;s really more of a content management system that anyone can edit. It supports translation from English to 34 other languages, tracks revisions & content hierarchies, accepts file attachments, and sings & dances in a variety of other annoying-to-implement ways.
*   At the time of switchover, we had over 50,000 documents to migrate with care from the old system to the new one. That body of content represents years of work, a non-trivial hunk of cruft and spam, and tickles a maddening array of edge cases.
<li style="text-align: left;">
  The wiki we replaced—i.e. <a href="http://www.mindtouch.com/">MindTouch</a>—supports server-side scripting in content with a language based on Lua—i.e. <a href="http://developer.mindtouch.com/en/docs/DekiScript">DekiScript</a>.
</li>

Each of the above points represents its own special mix of horror and challenge, and I took on the bulk of the last two. That caused me a lot of stress, and [I blogged a bit about that][3].

This blog post, however, focuses on that last point: [KumaScript][1] was built by backing into a semi-compatible replacement for [DekiScript][4]. That&#8217;s pretty much the worst way to go about building something, but it seems to have worked.

### <span id="What_Does_It_Look_Like">What Does It Look Like?</span>

First, you might want to check out [&#8220;Introduction to KumaScript&#8221; on MDN][5]. It&#8217;s the best work in progress describing the ins-and-outs of the service. But for the sake of this blog post, consider [this wiki document][6]:

<pre>Here are three hellos:
{{ hello('3') }}</pre>

Now, consider [this KumaScript template][7], named `Template:hello`:

<pre>&lt;% for (var i = 0; i &lt; $0; i++) { %&gt;
Hello #&lt;%= i %&gt;
&lt;% } %&gt;</pre>

Put the two of these together, and you get [this output][8]:

<pre>Here are three hellos:
Hello #0
Hello #1
Hello #2</pre>

<a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> on <a target="_blank" title="MDN" href="https://developer.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">MDN</a> consists mainly of the following:

*   [Templates implemented using Embedded JavaScript Templates][9]
*   [Macros in wiki content that call templates with parameters][10]
*   [Common JS inspired modules for reusable code used by templates][11]

This quick introduction glosses over interesting things you can do with <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a>—e.g. accessing data from external sources via HTTP, fetching content from other documents (also via HTTP). But, again, you can dive deeper by reading [&#8220;Introduction to Kumascript&#8221; on MDN][5].

### <span id="Scripting_in_Wikis">Scripting in Wikis</span>

Why would one would even build such a thing as <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a>? As it turns out, programmatically generating content is quite handy for composing documentation. Here are a few use cases:

*   Localized macros for often-repeated constructs such as [warnings][12], notes, tips, & callouts.
*   Conditional content based on variables such as product, locale, & standards status.
*   [Transclusion][13] of content, [building documents from documents][14]. (Try viewing [the raw source][15] of that page.)
*   Mashups of data from <a target="_blank" title="MDN" href="https://developer.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">MDN</a> itself and from other sites and services like Bugzilla and Github. For example, here&#8217;s [a self-updating Changelog of our code deployments on MDN][16]. And, here&#8217;s [the template behind that page][17].

It&#8217;s also worth pointing out that is different from scripting mixed with <a target="_blank" title="HTML" href="https://developer.mozilla.org/docs/Web/HTML?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">HTML</a> like you get from ASP or PHP: There, you can process forms, personalize responses, and generally build web applications.

In the world of <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a>, content scripting is a heavily cached thing and not tied to the current HTTP request. It mostly runs only when the document itself is edited, but can also be executed when we think dependencies or external data sources have changed.

In fact, <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> code doesn&#8217;t even have access to the incoming visitor&#8217;s request data at all—i.e. username, cookies, referrer header, et al—and instead we operate mainly on the content and metadata of documents.

### <span id="Why_JavaScript">Why JavaScript?</span>

As I mentioned earlier, [MindTouch][18] provides for scripted content by way of the Lua-based [DekiScript][4]. It&#8217;s also interesting to note that the Wikimedia Foundation is working on [a Lua-based scripting system for MediaWiki and Wikipedia][19]. So, scripted content in a wiki isn&#8217;t an entirely crazy idea, in and of itself.

As for Lua, I think it&#8217;s a nice little language. It&#8217;s used in World of Warcraft and many other games. It&#8217;s known for being easily embedded into applications to grant scriptability. I can totally see why one would reach for it.

But, at <a target="_blank" title="Mozilla" href="https://www.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">Mozilla</a>, we&#8217;re all about the web. The lingua franca of programming on the web is <a target="_blank" title="JavaScript" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JavaScript</a>. And, it doesn&#8217;t hurt that <a target="_blank" title="MDN" href="https://developer.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">MDN</a> already has a huge body of <a target="_blank" title="JavaScript" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JavaScript</a> documentation.

So, as far as harmonious language choices go, I can&#8217;t think of a better one for scripting content on <a target="_blank" title="MDN" href="https://developer.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">MDN</a> than <a target="_blank" title="JavaScript" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JavaScript</a>.

### <span id="Boring_Lets_Me_Sleep_at_Night">Boring Lets Me Sleep at Night</span>

There are some exciting things about embedding a Lua interpreter into a wiki platform, as MindTouch and MediaWiki have done. Even having chosen <a target="_blank" title="JavaScript" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JavaScript</a> over Lua, I could have tried embedding a <a target="_blank" title="JS" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JS</a> interpreter like [V8][20] or [SpiderMonkey][21] into Python.

However, because I like to sleep at night and am not particularly clever about embedding languages within languages ([yo dawg][22]), I want nothing to do with this brand of excitement. Consider me [a Hobbit][23] among developers.

So, <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> is a standalone [Node.js][24] web service. That is, everything going into and coming out of <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> happens over HTTP. I understand HTTP a whole lot more than embedding language interpreters.

Don&#8217;t get me wrong: Node.<a target="_blank" title="js" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">js</a> is an exciting piece of exotic matter in its own right. But, someone more clever than me maintains Node.<a target="_blank" title="js" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">js</a>. And, I&#8217;m betting most of my co-workers and potential project contributors understand <a target="_blank" title="JavaScript" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JavaScript</a>, Node.<a target="_blank" title="js" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">js</a>, and HTTP much better than embedding languages in other languages.

In fact, besides my overwrought glue code, [KumaScript consists mainly of modules written & maintained by other people more clever than me][25]. That&#8217;s even less work for me. One of the few things I like as much as sleeping at night is when other people fix bugs and build things for me.

### <span id="HTTP_ALL_the_Things">HTTP ALL the Things</span>

I really like HTTP. I&#8217;ve spent a good chunk of my adult life learning to understand it—so by this point it might be Stockholm Syndrome, but I think it embeds a lot of cleverness and useful decisions.

HTTP gives you interesting system boundaries. You can cache, scale, and abstract using intermediaries. There are nice identifiers (ie. URLs), status codes, and a rich arsenal of means to transport data and metadata (ie. methods, headers, and content types).

Having made <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> an HTTP service also means that someone other than <a target="_blank" title="MDN" href="https://developer.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">MDN</a> could use it. The interface was not built specifically for <a target="_blank" title="MDN" href="https://developer.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">MDN</a>, it&#8217;s neither dependent on Python nor Django. Fire up the processes and try running your web content through it—could be a wiki, could be a pile of static <a target="_blank" title="HTML" href="https://developer.mozilla.org/docs/Web/HTML?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">HTML</a>. There is, of course, slightly more to it than that—but not much.

In fact, I really *do* hope someday someone beyond <a target="_blank" title="MDN" href="https://developer.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">MDN</a> tries using <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a>.

### <span id="Turtles_All_the_Way_Down">Turtles All the Way Down</span>

So, the <a target="_blank" title="MDN" href="https://developer.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">MDN</a> wiki—[named Kuma][26], which means [&#8220;bear&#8221; in Japanese][27]—talks to <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> via HTTP. And, in turn, <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> talks to the wiki with HTTP.

In fact, although the <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> service itself is hidden behind a firewall, [the wiki API used by KumaScript is open to the public][28]. What&#8217;s good for the goose is good for the gander, after all.

The typical document rendering process goes something like this:

1.  <a target="_blank" title="Kuma" href="https://developer.mozilla.org/docs/Project:Getting_started_with_Kuma?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">Kuma</a> makes a GET request to <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> with the URL of a wiki document.
2.  <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> makes a GET request to <a target="_blank" title="Kuma" href="https://developer.mozilla.org/docs/Project:Getting_started_with_Kuma?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">Kuma</a> for the raw source of the wiki document.
3.  <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> parses the source, looking for macros & inventorying templates.
4.  <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> makes a GET request to <a target="_blank" title="Kuma" href="https://developer.mozilla.org/docs/Project:Getting_started_with_Kuma?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">Kuma</a> for the source of each template needed.
5.  <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> evaluates the macros by executing templates with the given parameters. This may kick off additional GET requests as needed by templates to load modules.
6.  <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> responds to the initial request from <a target="_blank" title="Kuma" href="https://developer.mozilla.org/docs/Project:Getting_started_with_Kuma?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">Kuma</a> with the results of macro evaluation in the document.

It&#8217;s <del>turtles</del> HTTP GET, [all the way down][29]. Well, except for when we want to do a preview before saving: In that case it&#8217;s an HTTP POST which kicks everything off at step #3, with raw source in the request body.

And though this might look like a Rube Goldberg machine, there are some nice qualities to all this HTTP GET traffic:

*   Each GET is susceptible to caching, via the usual headers and semantics.
*   Each GET can be serviced by a different process on a different machine.

I&#8217;m sure I could come up with more items after I have lunch, but this is just HTTP.

Content flows through request and response bodies. And—though this part might be a bit of a hack—I encode document context, errors, and messages using custom HTTP headers as a side-channel [using the FireLogger protocol][30] as an inspiration.

### <span id="Security_Safety">Security & Safety</span>

Something I could have done with <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> was to simply allow wiki authors to drop hunks of executable code into the middle of documents. DekiScript seems to allow for this. But, we never really used it that way on <a target="_blank" title="MDN" href="https://developer.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">MDN</a>.

Instead, what we have is a system of templates and macros:

*   Templates contain the <a target="_blank" title="JavaScript" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JavaScript</a> code in the form of [Embedded JavaScript Templates][31]. At present, these can be authored only by a core of trusted <a target="_blank" title="MDN" href="https://developer.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">MDN</a> editors.
*   Macros call templates with parameters and dump the results of execution into the document. These can be used by anyone, and have [a very constrained syntax][32].
*   The content resulting from macro evaluation [is sanitized][33] such that it&#8217;s subject to the same constraints as hand-written markup.

Since <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> has no access to a user&#8217;s request data, we&#8217;re decently firewalled in terms of privacy and abusing the visitor. And, since [the markup is filtered][33], it&#8217;s difficult to inject nasty XSS exploits and the like.

So, when I say security and safety, I&#8217;m thinking mainly about our servers: We want to sandbox this server-side <a target="_blank" title="JS" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JS</a> such that it can&#8217;t abuse CPU, memory, or network resources. At present, my approach to this is anemic: Restrict code authoring to trusted people, and impose impatient timeouts on macro execution.

I have thoughts about improving this situation in the future, and hopefully expanding the ability to author <a target="_blank" title="JS" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JS</a> templates. Because, remember, <a target="_blank" title="MDN" href="https://developer.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">MDN</a> is a wiki—anyone and everyone can edit it. I&#8217;d like that to include the <a target="_blank" title="JS" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JS</a> code, if at all possible to do with relative safety.

Patches and pull requests are welcome, especially if you&#8217;re smarter than me about these things. (It&#8217;s not hard to be smarter than me about these things.)

### <span id="Scaling_Stability">Scaling & Stability</span>

<a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> scales like just about any web service. You can stick it behind a load balancer. Scale it horizontally by throwing more CPUs and processes at the problem. Cache the hell out of the responses. Throw a proxy in front of it to cache the hell out of outgoing requests to external services. Again, this is meant to be as boring as I can make it.

And, if a <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> process should happen to misbehave or starts having a seizure, just kill it and start another one. There should be no state to worry about, and the processes should start up really fast. Ideally, the logs will have recorded what went wrong and we end up with just a transient error.

### <span id="Maturity_THE_FUTURE">Maturity & THE FUTURE</span>

<a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> turned a year old last month, has been in production since last summer, and had its last commit around 5 months ago. It has lots of tests, and it uses a version of Node.<a target="_blank" title="js" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">js</a> from early 2012.

That doesn&#8217;t mean it&#8217;s abandoned, though: <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> is a mature project by most definitions. It&#8217;s been working well enough that I haven&#8217;t wanted to touch it. Most of the work goes on within the wiki itself, and <a target="_blank" title="KumaScript" href="https://developer.mozilla.org/docs/Project:Introduction_to_KumaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">KumaScript</a> is meant to be the smallest piece it can be.

And maturity doesn&#8217;t mean I don&#8217;t have notions about future work. Off the top of my head, I&#8217;d like to get around things like the following:

*   Improve template execution & sandboxing. Currently, if any one thing misbehaves in the document, the whole process gets aborted. Maybe instead, I should [spin up a pool of processes][34]: Each them can take care of executing a single macro, while a master process watches for CPU / RAM / network abuse and kills anything that behaves badly.
*   Reconsider my possibly brain-dead approach to parsing source documents for macros using a PEG.<a target="_blank" title="js" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">js</a> grammar. Or, maybe it&#8217;s good enough.
*   Need much better error trapping and reporting throughout everywhere.
*   Need much better use of [statsd][35] for measuring timings and suchlike.
*   Maybe offer an HTTP proxy that runs all content through the service, for easier deployment atop existing sites beyond <a target="_blank" title="MDN" href="https://developer.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">MDN</a>.

And of course: Suggestions, patches, and pull requests are more than welcome!

 [1]: https://github.com/mozilla/kumascript
 [2]: https://github.com/mozilla/kumascript/commit/0cb247eaac58cf00bb59e16d6b37a215484633b2
 [3]: http://blog.lmorchard.com/2012/09/17/on-the-other-end-of-a-self-imposed-death-march-project
 [4]: http://developer.mindtouch.com/en/docs/DekiScript
 [5]: https://developer.mozilla.org/en-US/docs/Project:Introduction_to_KumaScript
 [6]: https://developer-new.mozilla.org/en-US/docs/KumaTests/hello_test?raw=1
 [7]: https://developer-new.mozilla.org/en-US/docs/Template:hello
 [8]: https://developer-new.mozilla.org/en-US/docs/KumaTests/hello_test
 [9]: https://developer.mozilla.org/en-US/docs/Project:Introduction_to_KumaScript#Template_Syntax
 [10]: https://developer.mozilla.org/en-US/docs/Project:Introduction_to_KumaScript#Macro_Syntax
 [11]: https://developer.mozilla.org/en-US/docs/Project:Introduction_to_KumaScript#Creating_modules
 [12]: https://developer.mozilla.org/en-US/docs/Template:Warning
 [13]: http://en.wikipedia.org/wiki/Transclusion
 [14]: https://developer.mozilla.org/en-US/docs/XUL/button
 [15]: https://developer.mozilla.org/en-US/docs/XUL/button?raw
 [16]: https://developer.mozilla.org/en-US/docs/Project:Changelog
 [17]: https://developer.mozilla.org/en-US/docs/Template:KumaGithubChanges
 [18]: http://www.mindtouch.com/
 [19]: http://www.mediawiki.org/wiki/Lua_scripting
 [20]: http://code.google.com/p/v8/
 [21]: https://developer.mozilla.org/en-US/docs/SpiderMonkey
 [22]: http://stackoverflow.com/questions/5099043/embedding-a-low-performance-scripting-language-in-python#comment5715808_5099043
 [23]: http://en.wikipedia.org/wiki/Hobbit#Lifestyle
 [24]: http://nodejs.org/
 [25]: https://github.com/mozilla/kumascript/blob/master/package.json#L22
 [26]: https://github.com/mozilla/kuma
 [27]: http://en.wikipedia.org/wiki/Kuma#Animals
 [28]: https://developer.mozilla.org/en-US/docs/Project:The_Kuma_API
 [29]: http://en.wikipedia.org/wiki/Turtles_all_the_way_down
 [30]: https://github.com/lmorchard/node-firelogger
 [31]: https://github.com/visionmedia/ejs
 [32]: https://github.com/mozilla/kumascript/blob/master/lib/kumascript/parser.pegjs
 [33]: https://pypi.python.org/pypi/bleach
 [34]: https://github.com/lloyd/node-compute-cluster
 [35]: https://github.com/etsy/statsd/