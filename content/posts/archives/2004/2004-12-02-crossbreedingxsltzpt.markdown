---
comments_archived: true
date: '2004-12-02T20:15:52-05:00'
excerpt: Both ZPT and XSLT very different technologies, but they are often
    used in similar contexts.  More than once, I've wished that XSLT was
    as simple as ZPT (i.e. less verbose and intrusive, more document centered),
    and I've wished that ZPT had some of the features of XSLT (i.e. ability
    to be used as a transforming filter).
layout: post
tags:
- xml
- python
title: Cross-breeding XSLT and ZPT
wordpress_id: 570
wordpress_slug: crossbreedingxsltzpt
wordpress_url: http://www.decafbad.com/blog/?p=570
---
I've recently been doing some side work involving Zope and, along with the rest of the suite of technologies it offers, I've been happy to be working with [Zope Page Templates](http://dev.zope.org/Wikis/DevSite/Projects/ZPT/FrontPage) again.  I dabbled with them a bit when they first came out, and a Zope-free implementation named [SimpleTAL](http://www.owlfish.com/software/simpleTAL/) was one of the core components of the iteration of my news aggregator which came before FeedReactor.

Out of all the templating and content generation approaches I've used, Zope Page Templates are my favorite yet.  Pretty expressive, yet unobtrusive; nicely powerful, yet not quite something with which you'd want to write an entire application ([and that's a feature, not a bug](http://naeblis.cx/rtomayko/2004/12/02/a-note-on-template-design)).  
  
I've yet to be in a work-a-day team that uses ZPT-- but I can see where a lot of production, delegation, and integration issues would have gone much smoother had I used ZPT instead of [Template Toolkit](http://www.template-toolkit.org/) for the web app framework I created at a previous company.  (Though I do have to say TT2 is *very* nicely done!)  And where I am now, I spend most of my days trying to pummel ASP 3.0 pages into some semblance of logic/presentation separation-- I would certainly dive at the chance to dump VBScript and `<% cruft %>` for a bit of Python and ZPT.  (But, you know, *it's a living*.)
   
A close second favorite is XSLT.  I've really been hot on it lately, having worked it into the core of FeedReactor in place of SimpleTAL.  And in [other](http://www.decafbad.com/blog/2003/09/02/xsl_scraper) [hacks](http://www.decafbad.com/blog/2004/06/16/wishofthemonthclub1), I've really come to appreciate it's role as a filter segment in pipelines between REST web services and [URL-as-command-line](http://udell.roninhouse.com/bytecols/2001-08-15.html) invocations.

Granted, both ZPT and XSLT very different technologies, but they are often used in similar contexts.  More than once, I've wished that XSLT was as simple as ZPT (i.e. less verbose and intrusive, more document centered), and I've wished that ZPT had some of the features of XSLT (i.e. ability to be used as a transforming filter).

Reading [Ryan Tomayko's description of Kid](http://naeblis.cx/rtomayko/2004/11/30/pythonic-xml-based-templating-language) got me thinking, and googling.  One thing I turned up from a mailing list archive asked about an &#8220;[XSL implementation of TAL?](http://mail.zope.org/pipermail/zpt/2002-January/002651.html)&#8221;  It struck me as a tad nutty at first, but then I started having inklings that just maybe it could be done.  (Whether it *should* be done, well...)  But the kernel of the idea grabbed me: Instead of using [TALES path expressions](http://zope.org/Wikis/DevSite/Projects/ZPT/TALES%20Specification%201.3) to look up values in Pythonic space, why not use XPath expressions to look up values from a supplied XML document?

This strikes me as such an obvious idea that someone has to already have done it and possibly rejected it for good reason.  On the other hand, maybe this is the sort of thing Ryan's thinking about-- I wonder how hard it would be to hack this into Kid?  It would give only a subset of XSLT's capabilities in trade for simplicity, and would only offer the &#8220;[pull](http://www.dpawson.co.uk/xsl/sect2/pushpull.html)&#8221; approach, but it would give XML-pipelining to a ZPT-ish technology.

I think this is something I want to look into a bit further at some point.
<!--more-->
shortname=crossbreedingxsltzpt

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087930">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.ianbicking.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cc8334869c9d2a9e603017f2da805eb3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.ianbicking.org">Ian Bicking</a>
                </div>
                <a href="#comment-221087930" class="permalink"><time datetime="2004-12-04T17:16:09">2004-12-04T17:16:09</time></a>
            </div>
            <div class="content">I've been meaning to write about this on my blog, as I've done something similar.

Instead of using XSLT, I've used ZPT for the transformations.  It was an application where the user created a document in a WYSIWYG editor, then we wanted to pull information out of the content -- like a table of contents, or a title.

To do this I parsed the content into a DOM, then put some objects in the ZPT namespace that manipulated it.  For instance, the ToC object took a tag name (through getitem) and returned a list of the content and id of those tags (it created ids if necessary, modifying the content).  Then you could easily create a ToC by looking through and creating anchor tags from, say, all the  tags in the document.  It should be easy to expand with other transformations (all coded in Python, of course).  The actual code was only like 20 lines of Python, maybe less, and easy to understand from both sides (ZPT and Python).</div>
            
        </li>
    
        <li class="comment" id="comment-221087932">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=14076d6ce3d0e8a0fd751a36d9912df5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Petri Savolainen</a>
                </div>
                <a href="#comment-221087932" class="permalink"><time datetime="2004-12-13T05:21:41">2004-12-13T05:21:41</time></a>
            </div>
            <div class="content">See http://zope.org/Members/DaddyGravity/PT_XPath

It would be great to have that in SimpleTAL, too.</div>
            
        </li>
    
        <li class="comment" id="comment-221087935">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.ianbicking.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cc8334869c9d2a9e603017f2da805eb3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.ianbicking.org">Ian Bicking</a>
                </div>
                <a href="#comment-221087935" class="permalink"><time datetime="2004-12-13T11:43:33">2004-12-13T11:43:33</time></a>
            </div>
            <div class="content">Another thing you might want to look at: in the last few days there's been discussion on the ZPT mailing list about an extension to stylesheets (TERSE) for ZPT that introduces transformations.</div>
            
        </li>
    
        <li class="comment" id="comment-221087937">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://codeconsult.ch/bertrand"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d244e495717742bd0776b715a45877eb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://codeconsult.ch/bertrand">Bertrand Delacretaz</a>
                </div>
                <a href="#comment-221087937" class="permalink"><time datetime="2004-12-13T15:15:55">2004-12-13T15:15:55</time></a>
            </div>
            <div class="content">FYI, people from the Apache Cocoon and BXE projects are working on similar stuff, in the opposite direction: we're taking TAL-like templates and converting them to XSLT, adding simple "match" templates for declarative rules. It's only prototypes and experiments for now, but the results look promising.

More info at
http://wiki.apache.org/cocoon/HtmlToXsltExperiments
and
http://blog.bitflux.ch/archive/further-improvements-on-xsl-tal.html</div>
            
        </li>
    
        <li class="comment" id="comment-221087939">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.manuzhai.nl/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d62bb8855d45ab52fd5a414f0ca47703&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.manuzhai.nl/">Manuzhai</a>
                </div>
                <a href="#comment-221087939" class="permalink"><time datetime="2004-12-13T16:07:54">2004-12-13T16:07:54</time></a>
            </div>
            <div class="content">I like XSLT a lot, myself, and I have advocated it in the past on my weblog, but it just doesn't seem to be very wide-spread. Which is a pity, I think the world would be much easier if more people used this *standard* way of templating.

One of the bigger problems with it seems to be the verbosity, so I've been thinking of a more compact syntax, kind of like RELAX NG has the .rnc compact stuff. I don't know if it's very feasible, but it seems like that would be not very hard; just have some compact syntax which maps onto a real XSLT-sheet (it could be "compiled" and cached, if need be).</div>
            
        </li>
    
        <li class="comment" id="comment-221087942">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.owlfish.com/weblog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=377cef4245e0fcbf76e021d9cd253e35&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.owlfish.com/weblog/">Colin Stewart</a>
                </div>
                <a href="#comment-221087942" class="permalink"><time datetime="2004-12-13T23:47:18">2004-12-13T23:47:18</time></a>
            </div>
            <div class="content">Integrating an XPATH implementation into SimpleTAL shouldn't be too hard as the TALES and TAL implementations share a fairly simple interface.  There are 6 methods you'd have to provide to the simpleTAL module and that's about it.

I don't know if XPATH is the right approach though - how would things like tal:define work if the paths were pure XPATH instead of TALES?  Being able to mix XPATH and TALES would work better I think.

A more promising approach would be to integrate ElementTree so that the 'find*' methods were usable from within TALES.  Making it so that '/mydoc/root/find/.//searchElement' works would be fairly easy, but getting '/mydoc/root/find/.//searchElement/attrib/firstAtt' to work would require more co-operation between ElemenTree and SimpleTAL.

I'll have a think about this though as it sounds like a promising approach.</div>
            
        </li>
    
        <li class="comment" id="comment-221087946">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=d67eea2ce18dd70f4642cb971c2c5ad2&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Paul Everitt</a>
                </div>
                <a href="#comment-221087946" class="permalink"><time datetime="2004-12-14T00:45:18">2004-12-14T00:45:18</time></a>
            </div>
            <div class="content">Chapter 11 of Jeni Tennison's "XSLT and XPath On The Edge" book has a section called "Using Page Templates".  It includes an example of using substitution points.

Like some of the others in this thread, playing with doing merges using DOM IDs and other patterns.  This lets you write "themes" that are simpler than even ZPT, as they contain no non-XHTML namespace elements.

Thanks for the article, which also seems to have brought out some interesting comments and URLs!</div>
            
        </li>
    
        <li class="comment" id="comment-221087948">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8157a5907b244071cda98ba5aa7a9635&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki">Bill Seitz</a>
                </div>
                <a href="#comment-221087948" class="permalink"><time datetime="2004-12-14T20:23:08">2004-12-14T20:23:08</time></a>
            </div>
            <div class="content">Don't forget you can run Python within IIS/ASP!

http://webseitz.fluxent.com/articles/PythonViaIis</div>
            
        </li>
    
        <li class="comment" id="comment-221087950">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.owlfish.com/weblog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=377cef4245e0fcbf76e021d9cd253e35&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.owlfish.com/weblog/">Colin Stewart</a>
                </div>
                <a href="#comment-221087950" class="permalink"><time datetime="2004-12-15T22:49:30">2004-12-15T22:49:30</time></a>
            </div>
            <div class="content">I've put together an experimental build of SimpleTAL that integrates ElementTree to provide some of the XPATH syntax.  It's just an experiment, but see what you think.

(More detail here: http://www.owlfish.com/weblog/2004/12/15122004.html#20:59:59)</div>
            
        </li>
    
        </ul>
    
        </div>
    