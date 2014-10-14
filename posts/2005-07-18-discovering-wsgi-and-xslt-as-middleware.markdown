---
comments_archived: true
date: '2005-07-18T15:10:44-04:00'
layout: post
title: Discovering WSGI and XSLT as middleware
wordpress_id: 670
wordpress_slug: discovering-wsgi-and-xslt-as-middleware
wordpress_url: http://www.decafbad.com/blog/?p=670
---
As I [mentioned in a previous post][prev], I was a bit busy this weekend while being sick on the couch.  In this post, I'll ramble a bit about my server-side dabbling.  Cutting to the chase, here's an XSLT filter implemented as WSGI middleware:

[prev]: http://www.decafbad.com/blog/2005/07/18/ajax_testing_and_logging

* [http://www.decafbad.com/2005/07/xmlwiki/lib/xmlwiki/xslfilter.py](http://www.decafbad.com/2005/07/xmlwiki/lib/xmlwiki/xslfilter.py)

Now you can apply XSLT magic to your REST APIs, like [Amazon does with theirs][awsxsl].

**Update**:  Oh yeah and apropos [this righteous rant against frameworks][frame], I think one of the reasons I've been so taken with WSGI is that *it's not another damn framework*.

[frame]: http://an9.org/devdev/why_frameworks_suck?sxip-homesite=&#38;checked=1

## Discovering WSGI

First off, have you heard of this [WSGI thing][wsgi] for web apps written in Python?  I had seen some burblings about it some time ago, and got the impression that it was fairly shiny, but I hadn't really bothered wrapping my head around it.  Now that I have gotten it lodged somewhat into my cranium, I wish I'd bought into it years ago.  

I've been trying to reinvent a decent abstraction for web apps that can run as both CGIs and web-server-resident modules (whether in Apache, SimpleHTTPServer, or who-knows-what) in Python for ages.  I'd found a few different ways to do it, but none as agnostic or no-nonsense as [WSGI][wsgi].  And, not only did I find [WSGI][wsgi] to be clean &#38; simple--*I realized that it also makes web apps **composable***.

So, like, if you have a web app that follows the [WSGI][wsgi] spec, it can be swallowed up by filtering apps.  The filtered apps can have any number of mammoth Python web frameworks powering them, and the filters can be as complex or simple as you want.  Hell, *build a web framework entirely out of composed filters*!  

I haven't quite wrapped my head around it yet, but I gather that this is part of the purpose of [Python Paste][paste]--although I could be wrong.

[paste]: http://pythonpaste.org/docs/what-is-paste.html
[wsgi]: http://www.python.org/peps/pep-0333.html

## An XSLT filter as WSGI middleware

Anyway, one of the main reasons this composability feature of [WSGI][wsgi] has me in such an excited state harkens back to two posts I made on [next generation web apps][ngwa] and a [semi-aborted attempt at a demonstration][abook] of such an app.  See, one of the components I've considered to be key to my tinkering with HTTP-and-XML web apps--more specifically, apps centered around REST APIs--is an XSL filter somewhere in the chain.  

The first place I saw this technique used was with [Amazon's Web Services][awsxsl] and their REST API which accepts the URL of an XSL stylesheet to be applied as a filter to the XML resulting from a query.  So, you can prepare some XSL of your own and fire off a request to Amazon as a specially-constructed URL--in return, you can magically receive a product search in HTML or even RSS/Atom directly.

Now, imagine more than that:  Include XSL filtering in a REST API.  Transform the plain old XML results of a GET request into a full-on XHTML/CSS/JavaScript browser-based application primed with that data.  Include the interactive UI for further drill down queries, as well as forms for submitting edits of the data back to the server via POST/PUT/DELETE using XmlHTTPRequest.   

That's where I'm headed with my experiments, whether I actually get there or not.  In the meantime, I hope the XSLT filter as WSGI middleware is useful to someone.

[awsxsl]: http://www.xml.com/pub/a/2004/08/04/tr-xml.html
[abook]: http://www.decafbad.com/blog/2004/12/23/abook1
[ngwa]: http://www.decafbad.com/blog/2004/11/30/nextgenwebapps

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090666">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.ianbicking.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cc8334869c9d2a9e603017f2da805eb3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.ianbicking.org">Ian Bicking</a>
                </div>
                <a href="#comment-221090666" class="permalink"><time datetime="2005-07-19T01:34:39">2005-07-19T01:34:39</time></a>
            </div>
            <div class="content">It's cool to see this -- I had actually just mentioned an XSLT
middleware a day ago in an email on Web-SIG about WSGI and possible
middleware, and then there it is.  Incidentally, looking at your code,
if you want to get rid of the filesystem "hack" you can just create a
whole new request and capture the output.  An example of that is
paste.recursive (you'd probably want to just borrow the technique, maybe not the specific module):
http://svn.pythonpaste.org/Paste/trunk/paste/recursive.py

And if you want a place to put
this code, there'd certainly be a place in Paste for it as well.</div>
            
        </li>
    
        <li class="comment" id="comment-221090667">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8157a5907b244071cda98ba5aa7a9635&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki">Bill Seitz</a>
                </div>
                <a href="#comment-221090667" class="permalink"><time datetime="2006-04-11T12:17:25">2006-04-11T12:17:25</time></a>
            </div>
            <div class="content"><p>Are you running WSGI behind Apache? If so, using what Apache plugin protocol? SCGI?</p></div>
            
        </li>
    
        </ul>
    
        </div>
    