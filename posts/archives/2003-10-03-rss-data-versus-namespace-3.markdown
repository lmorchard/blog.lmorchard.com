---
comments_archived: true
date: '2003-10-03T08:28:16-04:00'
layout: post
title: 'RSS 2.0 namespace versus RSS-Data, Part 3: Electric Boogalee'
wordpress_id: 490
wordpress_slug: rss-data-versus-namespace-3
wordpress_url: http://www.decafbad.com/blog/?p=490
---
<p>
So, for the same of argument, yesterday I threw together
<a href="http://www.decafbad.com/blog/tech/rss_data_versus_namespace.html">examples</a>
of what a use of RSS-Data might look like alongside what
the same data in an RSS namespace extension might look like.
I promised code, but never got a chance to circle back around.
Fortunately, <a href="http://www.myelin.co.nz/post/">Phillip Pearson</a>
connected the rest of the dots for me with two examples:
</p>
<ul>
<li><a href="http://www.myelin.co.nz/post/2003/10/3/#200310031">Parsing RSS-Data</a></li>
<li><a href="http://www.myelin.co.nz/post/2003/10/3/#200310032">Parsing an RSS namespace extension</a></li>
</ul>
<p>
I was just a <i>little</i> surprised by his results, since I expected
the code to handle an RSS namespace to be at least a bit more complex
than the RSS-Data example.  But,
<a href="http://www.myelin.co.nz/post/2003/10/3/#200310033">as Phillip observed later</a>,
the scripts were pretty much equivalent in length, complexity, and
ease of construction.
</p>
<p>
Then, this morning, I saw that Danny Ayers had posted an
<a href="http://dannyayers.com/archives/001908.html">example in RDF</a>
of this same data.  It doesn't differ very much from my namespace
extension example, except that the few differences there are enables
his example to flow through RDF tools (as well as, usually, XML tools like
XPath and XSLT).
</p>
<p>
In <a href="http://www.myelin.co.nz/phil/pss/comments.php?u=2&p=200310033&link=http://www.myelin.co.nz/post/2003/10/3/#200310033">a comment</a>
on one of Phillip's posts, though, Roger Benningfield makes
the point that this example is a bit biased:
</p>
<blockquote><i>
I agree that there won't be a ton of difference between a struct full
of strings and plain ol' XML. But that's kind of a stacked example,
since SDL would allow a lot more than that... arrays, integers, and
arrays of integers inside structs.
</i></blockquote>
<p>
What I did could be obscuring some work.  I just took an existing
schema from Amazon, which gave me some initial work already for free.
(Though, there's something to be said for <i>that</i> in and of itself.)
The structures were already established, and the schema was created
with XML representation already in mind.  This could have placed
RSS-Data at an example.  While I really don't think
that XML-RPC serialization offers more flexibility in expression than
XML itself, I could be wrong and I don't want to be tilting
at <a href="http://www.nizkor.org/features/fallacies/straw-man.html">straw men</a>.  
</p>
<p>
So, while I doubt that I'll have a whole lot of time today, I think
for the same of completeness, someone should go through the parallel
processes of going from problem statement up through data modeling and
on to production and consumption of RSS-Data and an RSS namespace
extension.  While doing this, capture the work involved in both.
</p>
<p>
I could see shortcuts taken on the RSS-Data side, since you don't have
to be concerened with various bits of XML tech like DTDs or schema
or whatnot.  You can jump right into coding up an example usage and
come up with your data model on the fly.  Whether this is a good thing
or not, I'm sure many will disagree.  Also, I'm sure others would
go through this differently than I would.  Again, your mojo may
exceed mine.
</p>
<p>
At this point, I can see the benefits of RSS-Data in rapidly cobbling
together scripts, but I lean toward having a decently defined data
model first.  You can do this in your scripts, but using the existing
XML tech forces you through some specific processes.  On the other
hand, I can see where some busy developers don't have time or spare
brain cycles to absorb all the XML tech.  It could be made easier
at that end of things, which is where I'd rather spend my effort.
</p>
<p>
Anyway, I'm really interested in seeing where this goes, because
this comparison of RSS-Data, RSS namespace extensions, and even
RDF seems like another very concrete, non-theoretical way to demonstrate
the benefits and drawbacks of these ways of thinking about data
and interoperability.
</p>
<!--more-->
shortname=rss_data_versus_namespace_3
