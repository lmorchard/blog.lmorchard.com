---
comments_archived: true
date: '2003-10-02T12:26:02-04:00'
layout: post
title: 'RSS 2.0 namespace versus RSS-Data, Part 2: First impressions'
wordpress_id: 489
wordpress_slug: rss-data-versus-namespace-2
wordpress_url: http://www.decafbad.com/blog/?p=489
---
<p>
Okay, I got
<a href="http://www.decafbad.com/blog/tech/rss_data_versus_namespace.html">the example data</a> out there.
Here's what's first on my mind about it:
</p>
<ol>
<li>
<p>
Man, that RSS-Data is one verbose piece of XML.  The Amazon-specific
namespace version looks much more compact and readable; I'd rather
<a href="http://backend.userland.com/davesRss2PoliticalFaq">View Source</a>
on that one.
</p>
</li>
<li>
<p>
Python comes out of the box with
<a href="http://www.python.org/doc/current/lib/module-xmlrpclib.html">xmlrpclib</a>,
and other languages have XML-RPC facilities available as well.  I can't imagine
it'd be too hard to get a hold of the core of it and employ it in
unmarshalling the RSS-Data straight into idiomatic Python structures.
On the other hand, I'll need to write my own handlers for the Amazon XML
using the XML parser modules that come with Python.
</p>
</li>
<li>
<p>
With its clean, almost self-documenting structure, the Amazon XML is easily
handled with XPath and XSL.  If I had a pile of ProductInfo elements
in a document, I could yank out all their images with something like:
<code>//az:ProductInfo/az:Details/az:ImageUrlSmall</code>
</p>
<p>
Using the RSS-Data
example, it'd probably be something more like:
<code>//sdl:data/sdl:struct/sdl:member/sdl:name[@text='ImageUrlSmall']/../sdl:value</code>,
and that's not considering if I have mixed kinds of RSS-Data schema represented in the
feed.
</p>
<p>
I suppose I could help this out by surrounding the struct with another
struct, containing one member named 'AzProductInfo', making the path something
like so:
<code>//sdl:data/sdl:struct/sdl:member/sdl:name[@text='AzProductInfo']<br />
/../sdl:value/sdl:struct/sdl:member/sdl:name[@text='ImageUrlSmall']/../sdl:value</code>.
</p>
</li>
</ol>

<p>
And these are the conclusions I'm jumping to at the moment, before experimenting:
</p>

<ol>
<li>
RSS-Data's convenience to script authors is at odds with the RSS 2.0
spirit of View Source.
</li>
<li>
Producing and consuming RSS-Data could be easier than handling
purpose-specific XML schema in scripts.
</li>
<li>
Since RSS-Data doesn't follow in the spirit of XML specs and schema,
using formal XML tools to handle this stuff will give you
nothing but headaches.  (Then again, it seems like some of the
stuff that's fully in the spirit of XML yields headaches just
the same.)
</li>
<li>
RSS-Data might catch on and spread nonetheless, because lots
of people don't read XML, don't use formal XML tools, and just
write scripts to get their jobs done.
</li>
</ol>
<!--more-->
shortname=rss_data_versus_namespace_2
