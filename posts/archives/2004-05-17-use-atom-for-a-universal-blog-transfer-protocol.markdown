---
comments_archived: true
date: '2004-05-17T19:28:48-04:00'
excerpt: You could use some mashup of RSS and XML-RPC for a Universal Blog
    Transfer Protocol, but I&#8217;d suggest using Atom. It&#8217;s a data
    model and an API, where the data model represents blog content quite
    well and the API complements it for the purposes of shuffling things
    around. With a mix of XML-RPC and RSS, I could only imagine lots of
    fiddling going on to transliterate between RSS and metaWeblog API structs
    or whatnot.
layout: post
tags:
- syndication
title: Use Atom for a Universal Blog Transfer Protocol
wordpress_id: 524
wordpress_slug: use-atom-for-a-universal-blog-transfer-protocol
wordpress_url: http://www.decafbad.com/blog/?p=524
---
> One of the options in Tinderbox is to download your most recent posts from your current MT/Radio/Blogger blog into a Tinderbox document, which in turn could be easily turned into a Tinderbox weblog.

> Could XML-RPC and RSS some kind of universal blog transfer protocol to move sites from one blogging tool to another? It seems to me that RSS should/could have most of the information needed to translate one file format to another.

<div class="credit" align="right"><small>Source:<cite><a href=
"http://www.ahawkins.org/mt/archives/000641.html">Universal Blog Transfer Protocol</a></cite></small></div>

Hmm - I was going to drop a note in comments on the above entry, but I see that they're disabled.  So...  I'm off to post a trackback from my own blog!

You could use some mashup of RSS and XML-RPC for this, but I'd suggest using Atom.  It's a data model *and* an API, where the data model represents blog content quite well and the API complements it for the purposes of shuffling things around.  With a mix of XML-RPC and RSS, I could only imagine [lots of fiddling][meta_fiddling] going on to transliterate between RSS and [metaWeblog API structs][metaweblog] or whatnot.

Practically speaking, it seems to me that it'd be [pretty trivial][atom_tut] to build a little conduit between [Atom Enabled][atomenabled] blogs.  Make a request to blog #1 for entries, then turn around and take the data returned by that request and post directly to blog #2.  I imagine there'd be just a *tad* more to do than that, such as splitting up the list of entries and posting each individually.  But since it's all Atom for input and output, there's not much massaging of the data that needs to go on along the way. 

If I get a few round tuits, maybe I'll take a stab at whipping up a sort of Atom-to-Atom-Copy command as an example.  

(And, as an aside, I'd love it if [Tinderbox][tinderbox] supported the Atom API--especially since I'm [hearing noises][joe_wiki] toward [wikis supporting the Atom API][jsp_atom]!)

[tinderbox]: http://www.eastgate.com/Tinderbox/ "Great app for catching and developing ideas"
[atom_tut]: http://www.atomenabled.org/developers/tutorials/api-quick-guide.php "All the pieces are here in an Atom API tutorial"
[metaweblog]: http://www.xmlrpc.com/metaWeblogApi "The metaWeblog API specification"
[meta_fiddling]: http://www.xml.com/pub/a/2003/10/15/dive.html "Mark Pilgrim's overview of the Atom API.  In particular, check out the section about the metaWeblog API's relationship to RSS 2.0"
[atomenabled]: http://www.atomenabled.org/
[joe_wiki]: http://www.xml.com/pub/a/2004/04/14/atomwiki.html "Joe Gregorio explores Atom-Powered Wiki"
[jsp_atom]: http://www.ecyrd.com/ButtUgly/Wiki.jsp?page=Main_blogentry_160504_2 "Wherein the author of JSPWiki entertains the notion of an Atom API"

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082868">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://markpasc.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=30e5bdec1073df6350d27b8145bf0dab&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://markpasc.org/">Mark Paschal</a>
                </div>
                <a href="#comment-221082868" class="permalink"><time datetime="2004-05-17T21:21:28">2004-05-17T21:21:28</time></a>
            </div>
            <div class="content">I wrote a script to export an MT weblog to an Atom feed, but the new reality of web hosting servers killing "runaway" processes makes it a terrible pain for large archives. It has to export X entries, then have the browser make a new request to push the next X. The script exports in text chunks, so that's okay, but I couldn't figure how to parse an XML document in parts similarly.

I was planning to use that to transport my weblog from MT 2 to MT 3, but I ended up writing the sqlite schema upgrade code instead.</div>
            
        </li>
    
        <li class="comment" id="comment-221082869">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://techno-weenie.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7f9a6fc2f4c8bca376ff85c205c35b3c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://techno-weenie.net">rick</a>
                </div>
                <a href="#comment-221082869" class="permalink"><time datetime="2004-05-17T22:39:56">2004-05-17T22:39:56</time></a>
            </div>
            <div class="content">Yes!  This is what I've been trying to say.  Use RSS as a simple syndication feed, but Atom when you need a rich data model and API.

Having drop-dead-simple Atom import/export in MT (and all blogging tools) should reduce any fears of lock-in.</div>
            
        </li>
    
        <li class="comment" id="comment-221082871">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.markBernstein.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cdb20bf8e09680028612532944833686&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.markBernstein.org/">Mark Bernstein</a>
                </div>
                <a href="#comment-221082871" class="permalink"><time datetime="2004-05-17T22:48:09">2004-05-17T22:48:09</time></a>
            </div>
            <div class="content">Tinderbox will support the Atom API, once it's actually an API.  There's still a lot of uncertainty what the real atom API will look like, either on paper or as implemented in deployed systems.

For now, Metaweblog and Blogger API should work with most of the tools you want to work with...</div>
            
        </li>
    
        <li class="comment" id="comment-221082873">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8a5273f79cfe7579ad46023f93377aa8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/">l.m.orchard</a>
                </div>
                <a href="#comment-221082873" class="permalink"><time datetime="2004-05-17T23:53:39">2004-05-17T23:53:39</time></a>
            </div>
            <div class="content">Mark:  Fair enough - I can respect you not wanting to track a moving target of an API.  So far I like the direction it has been taking, though.

Oh, and thanks again for Tinderbox!</div>
            
        </li>
    
        </ul>
    
        </div>
    