---
comments_archived: true
date: '2004-08-23T18:52:06-04:00'
excerpt: I've been putting more work into dbagg3, but I'm getting hung up
    on the database.  Well, actually I'm getting hung up on the subject
    of XML storage, query, and retrieval in general-- but at present, I'm
    trying to cram all this data into MySQL and SQLite databases.  But,
    my tendencies as an abstraction astronaut and my lack of database savvy
    are tying me (and my data) in knots.  I kept meaning to write a bit
    Atom (and XML in general) with regard to database storage and query,
    so maybe now's the time.
layout: post
tags:
- syndication
- xml
title: Slicing and Dicing to Make Atom Soup in dbagg3
wordpress_id: 539
wordpress_slug: slicing-and-dicing-to-make-atom-soup-in-dbagg3
wordpress_url: http://www.decafbad.com/blog/?p=539
---
I've been putting more work into [`dbagg3`][dbagg3], but I'm getting hung up on the database.  Well, actually I'm getting hung up on the subject of XML storage, query, and retrieval in general-- but at present, I'm trying to cram all this data into MySQL and SQLite databases.  But, my tendencies as an abstraction astronaut and my lack of database savvy are tying me (and my data) in knots.  I kept meaning to write a bit Atom (and XML in general) with regard to database storage and query, so maybe now's the time.

### XML databases

I'm aware of XML-native databases like [eXist][exist], [Xindice][xindice], and [Berkeley DB XML][bdbxml]-- but I don't want to work in Java right now, and I can't get the Berkeley XML DB compiled and running without segfault under OS X.  This bugs me, though, since the most elegant solution to me is to use something XML-native to store and query piles of Atom feeds and entries.  I'd really like to have [XPath available as a query tool][xpathudell].  And then, though I haven't heard a ton about it lately, there's XQuery.

And, oh yeah, I know there are some commercial solutions (like [Virtuoso][virtuoso]), but umm... no.

### RDF databases

I suppose I could also switch to tossing RDF around internally, maybe use RSS 1.0 under the hood.  This seems to be what the much-similar [Urchin RSS aggregator][urchin] is doing.  (Maybe I should just dump `dbagg3` and pitch in with Urchin.)  But, I don't know the state of RDF art well enough to know whether there's a database available that can handle 10,000 Atom/RSS entries a week or more for a year without gagging.  (My previous database was up to 500,000 entries when I started working on `dbagg3`, and I think that was since last November.)

### SQL databases

So, I'm screwing around with SQL databases-- MySQL and SQLite in particular.  As compared to XML and RDF databases, I know and understand and trust SQL databases so much more with regards to performance and gotchas and general techniques.  

In previous incarnations of my aggregator, MySQL and SQLite served me well with pretty simple data models.  But this time around, I want to play with much richer data: I want to include everything in the Atom spec, and try to take in some metadata from extensions.  So I threw together what I thought was a pretty decent relational model onto which I could map Atom XML data.  (If you're curious, you can check out [a recent schema dump][dbagg3_sql].)

The problem is, with the XML sliced and diced and sprinkled into all these separate tables, it's a **fun** time reassembling the pieces.  I've run into this problem many times before, when trying to map object hierarchies into relational databases, and usually things degrade into nasty self-joins and an explosive number of queries.  This kind of inelegance smells really bad, oily like melting plastic caused by the friction of a square peg being driven into a round hole by my forehead as a hammer.

In the end, what I've usually ended up doing is to forget about mapping from objects to the relational model: tables become a set of indices to objects, the objects themselves packed up as BLOBs via some language-dependant pickling or freezing scheme.  Nasty, ugly, fragile, and completely inelegant.  There's some of that in `dbagg3` *right now*, and I want it out.  Though I used to think it was as clever and neat as a digital watch, this smells even worse than melting plastic.

### XML in SQL databases

My latest thoughts, then, are to accept some bad smells (I *do* like the smell of burning plastic, actually) and simplify my database:  Instead of pickled binary objects, I'll store XML in a column (at least that isn't implementation-tied), and other tables will give me indices to this XML.  Thinking hard about my use cases, I think I can cover 80% of what I need with being able to look things up by feed, by subscription, by user, by date, and a few other useful aspects.  Once I've gotten a pile of data out of the database in XML form, I can then attack it with XSL.

However, what gives me even further enthusiasm for this approach is [this little XPath extension to PostgreSQL][postxml].  This gives you a set of functions to apply XPath to XML-containing columns in SQL queries.  So, you can pull out nodes in a select, or search on the results in a WHERE clause, among other things.  I haven't tried it yet, but it gives me ideas.

One idea is that, through [PySQLite's API additions][pysqliteapi], I can easily add new SQL functions at will-- oh like, say, some XPath functions using libxml2 under python.

Granted, there are no indices backing these XPath searches, and using these python functions added to SQLite comes with overhead, the availability of XPath in SQL could give me the 20% I'm missing with simple tables.  It might be worth the price and the smells.

### So Anyway...

That's where I'm at right now.  I think I've written a bunch, and all this text could use some code examples and some diagrams.  But, I figured I'd think out loud a bit and see if anyone could step in and smack me for being a complete twink.  

I want to slurp in Atom XML data, with arbitrary extensions, and be able to attack it with some reasonable set of queries to recombine this data into new feeds.

I know I'm not the only person thinking about this stuff, and I've got to assume that I'm nowhere near the smartest about it.  I'm still working on this aggregator thing, and making what I think is some fun progress with a [REST interface][dbagg3_api], but this data stuff has me stalled.

So... what do you think?

[virtuoso]: http://virtuoso.openlinksw.com/
[dbagg3_api]: http://www.decafbad.com/cvs/*checkout*/dbagg3/lib/dbagg3/web/api.py?rev=HEAD&#38;content-type=text/x-python
[pysqliteapi]: http://pysqlite.sourceforge.net/old/documentation/pysqlite/node10.html
[postxml]: http://www.throwingbeans.org/tech/postgresql_and_xml.html
[exist]: http://exist.sourceforge.net/
[xindice]: http://xml.apache.org/xindice/
[bdbxml]: http://www.sleepycat.com/products/xml.shtml
[urchin]: http://urchin.sourceforge.net/
[dbagg3]: http://www.decafbad.com/cvs/dbagg3/
[dbagg3_sql]: http://www.decafbad.com/2004/08/dbagg3.sql
[xpathudell]: http://webservices.xml.com/pub/a/ws/2003/04/15/semanticblog.html

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082837">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://franklinmint.fm"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b9ed774661a22ff8797a1e0e24f0baf3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://franklinmint.fm">Robert Sayre</a>
                </div>
                <a href="#comment-221082837" class="permalink"><time datetime="2004-08-23T19:23:19">2004-08-23T19:23:19</time></a>
            </div>
            <div class="content">FYI: Apple's upcoming SafariRSS uses XQuery to parse feeds. The Tiger version of NSXML includes XQuery as well.</div>
            
        </li>
    
        <li class="comment" id="comment-221082838">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=719ad7cfa24c00bbcaa8030427dd8743&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">bear</a>
                </div>
                <a href="#comment-221082838" class="permalink"><time datetime="2004-08-23T21:16:42">2004-08-23T21:16:42</time></a>
            </div>
            <div class="content">Not knowing what errors you are getting during the dbxml build means my comment will be generic but I hope it is still useful.

The OSAF people are using dbxml as their back-end data store and their build process works on os/x (what I use) - I can forward the makefile or just compare notes if that is useful to you.

thanks for your great writing</div>
            
        </li>
    
        <li class="comment" id="comment-221082839">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://randomthoughts.vandorp.ca/WK/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0a9028b800da9db6932c2f026d50847b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://randomthoughts.vandorp.ca/WK/blog">Darryl</a>
                </div>
                <a href="#comment-221082839" class="permalink"><time datetime="2004-08-24T04:27:51">2004-08-24T04:27:51</time></a>
            </div>
            <div class="content">Try a recipe by Kimbro Staken 
http://www.xmldatabases.org/movabletype/archives/000267.html</div>
            
        </li>
    
        <li class="comment" id="comment-221082840">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://simon.incutio.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=02ecb4f56e961dd226352c4dd51eff26&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://simon.incutio.com/">Simon Willison</a>
                </div>
                <a href="#comment-221082840" class="permalink"><time datetime="2004-08-24T18:27:33">2004-08-24T18:27:33</time></a>
            </div>
            <div class="content">Unfortunately, the XPath extension for PostgreSQL seems to be vapourware. As far as I know it exists only as a mention in the blog entry you linked to - the guy never released it. I'd love to be proved wrong - I'd really like to use it for a whole bunch of different things.</div>
            
        </li>
    
        <li class="comment" id="comment-221082841">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.throwingbeans.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=96bc90c98bc78316eda53f6d1dbfa0f6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.throwingbeans.org">Tom Dyson</a>
                </div>
                <a href="#comment-221082841" class="permalink"><time datetime="2004-08-25T21:10:17">2004-08-25T21:10:17</time></a>
            </div>
            <div class="content">The XPath extensions for Postgres are certainly not vapourware: we're using them in a content management environment for several high-profile websites. The extensions are available as part of the Postgres 8 beta download, where you'll find them in source code form in the contrib/xml directory. If you need help installing the functions, let me know - we have compiled them successfully on Debian, RedHat, OS X and Windows.</div>
            
        </li>
    
        <li class="comment" id="comment-221082842">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dannyayers.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7028f422ca6da0180de6c9d922a3228f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dannyayers.com">Danny</a>
                </div>
                <a href="#comment-221082842" class="permalink"><time datetime="2004-09-08T22:03:05">2004-09-08T22:03:05</time></a>
            </div>
            <div class="content">I've not tried that kind of data size with RDF either, though am assured kit like Kowari can handle it.

A possible compromise approach might be to use SQL storage directly for core syndication stuff, with RDF at the side. 

Vaguely relevant blogged stuff:

http://dannyayers.com/archives/2004/08/10/extending-the-capabilities-of-content-management-systems-with-rdf/

another possibility is using a triplestore on top of SQL, you end up with views/queries like this:

http://dannyayers.com/archives/2004/07/14/all-in-a-days-work/</div>
            
        </li>
    
        <li class="comment" id="comment-221082843">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://netapps.muohio.edu/blogs/darcusb/darcusb/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8043a49e7e80eef7672fa2be09b51473&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://netapps.muohio.edu/blogs/darcusb/darcusb/">Bruce</a>
                </div>
                <a href="#comment-221082843" class="permalink"><time datetime="2005-02-24T03:16:48">2005-02-24T03:16:48</time></a>
            </div>
            <div class="content">You might take a look at BDB XML again.  I recall having problems compiling v1 on Mac OS X too, but had no such problems with v2.  And it addds XQuery to the mix.</div>
            
        </li>
    
        </ul>
    
        </div>
    