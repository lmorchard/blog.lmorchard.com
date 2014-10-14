---
comments_archived: true
date: '2004-08-30T21:37:42-04:00'
excerpt: Work has been insanely busy lately, but I have made some more progress
    with [`dbagg3`][dbagg3].  The code is all in CVS, so feel free to take
    a gander-- I don't have a ton of time for a proper write up, but I do
    want to spew a little bit.
layout: post
tags:
- hacks
- syndication
- xml
title: Making progress on dbagg3
wordpress_id: 543
wordpress_slug: dbagg3-makingprogress
wordpress_url: http://www.decafbad.com/blog/?p=543
---
Work has been insanely busy lately, but I have made some more progress with [`dbagg3`][dbagg3].  The code is all in CVS, so feel free to take a gander-- I don't have a ton of time for a proper write up, but I do want to spew a little bit. 

As per my [previous musings on XML in a SQL database][soup], I revamped the database.  Now things are sliced up by feed and entry tables, rows in each containing a few metadata columns and then one big column for an XML dump.  This lets me index on  date and parent feed and such, meanwhile punting on the issue of dicing things like authors or content up further.  And, as extension elements start to show up, this handling is dumb enough to simply store things it doesn't know about without mangling them.  This is a very good thing and one of my big goals for this beast.

The other thing that I'm getting excited about is the REST API built atop the Atom store.  Rather than spend time on proper documentation, here's a quick dump from the [appropriate module][restapi]:

    URL: GET /feeds/
    URL: GET /feeds/{id}.xml
    URL: GET /feeds/{id}/{yyyy}/{mm}/{dd}/{hstart}-{hend}.xml
    URL: GET /feeds/{id}/{yyyy}/{mm}/{dd}/{hh}.xml
    URL: GET /feeds/{id}/{yyyy}/{mm}/{dd}.xml
    URL: GET /feeds/{id}/{yyyy}/{mm}.xml
    URL: GET /feeds/{id}/now-{nowoff}.xml
    URL: GET /feeds/{fid}/entries/{eid}.xml
    URL: GET /users/
    URL: GET /users/{uname}.xml
    URL: POST /users/
    URL: DELETE /users/{uname}.xml
    URL: PUT /users/{uname}.xml
    URL: GET /users/{uname}/prefs.xml
    URL: GET /users/{uname}/prefs/
    URL: POST /users/{uname}/prefs/{pname}.{type}
    URL: PUT /users/{uname}/prefs/{pname}.{type}
    URL: GET /users/{uname}/prefs/{pname}.{type}
    URL: DELETE /users/{uname}/prefs/{pname}.{type}
    URL: GET /users/{uname}/subscriptions.{type}
    URL: GET /users/{uname}/subscriptions/
    URL: POST /users/{uname}/subscriptions/
    URL: DELETE /users/{uname}/subscriptions/{id}.xml
    URL: GET /users/{uname}/subscriptions/{sid}/{yyyy}/{mm}/{dd}/{hstart}-{hend}.xml
    URL: GET /users/{uname}/subscriptions/{sid}/{yyyy}/{mm}/{dd}/{hh}.xml
    URL: GET /users/{uname}/subscriptions/{sid}/{yyyy}/{mm}/{dd}.xml
    URL: GET /users/{uname}/subscriptions/{sid}/{yyyy}/{mm}.xml
    URL: GET /users/{uname}/subscriptions/{sid}/now-{hours}.xml
    URL: GET /users/{uname}/subscriptions/{sid}/now.xml
    URL: GET /users/{uname}/subscriptions/{yyyy}/{mm}/{dd}/{hstart}-{hend}.xml
    URL: GET /users/{uname}/subscriptions/{yyyy}/{mm}/{dd}/{hh}.xml
    URL: GET /users/{uname}/subscriptions/{yyyy}/{mm}/{dd}.xml
    URL: GET /users/{uname}/subscriptions/{yyyy}/{mm}.xml
    URL: GET /users/{uname}/subscriptions/now-{hours}.xml
    URL: GET /users/{uname}/subscriptions/now.xml
    URL: GET /users/{uname}/subscriptions/{sid}/entries/{eid}.xml

Hopefully, the structure of these URL patterns make a little bit of sense.  The too-clever thing about these is that they're both documentation in the module's docstrings, and parsed out to register methods with automagically-generated regexes applied to incoming URL requests.  (I may eventually realize just how stupid an idea this is, but not yet.)  

This list is nowhere near complete or final or even all that well thought out yet.  But, it seems to be working out pretty well so far, and it's so easy to tinker with the API to sketch out ideas in working code.  Eating my own dogfood, my first browser window of the day tends to open on this URL:

    http://localhost/~deusx/dbagg3.5/api/users/default/subscriptions/
    now-12.xml?xsl=xsl/full.xsl&#38;content-type=text/html

This grabs the last 12 hours' worth of items from `default`'s subscriptions, passing them through the XSL at `xsl/full.xsl` on the way to my browser with a content type of `text/html`.  This tends to produce about 1000-1500 entries in about 15 seconds on my PowerBook, which is better than I'd expected.  

Pretty soon, I'll be implementing the ability to post metadata onto feed entries under subscriptions.  Then, I can mark items as seen, attach categories, tags, and notes.  From there, I can exclude seen items from queries, produce new aggregate feeds based on my tagging or notes, among a few other ideas I've got stewing.

A little more work, and I think I'll be able to throw together the beginnings of a [Bloglines][bloglines]-style three-pane browser interface, as well as improving the functionality of my own outliner-style display with [XmlHTTPRequest][xmlhttp]-based calls to the API to enable refresh-free interaction.  From there, I have some ideas for desktop apps and maybe even some [tinkering in Flash][flash].  (Wow... has it really been over a year since I was writing about Flash &#38; REST?)

And *then*, I want to implement the Atom API and allow users to create feeds to which they can post their own items and share read-only with others (or share writing with a group).  From there, this thing can turn into a read/write Atom storage tank, serving both as an aggregator and a blog publishing engine, given the appropriate XSL work.

Lots of ideas stewing.  Now I just have to get the time and possibly a new web server, since I'd like to eventually open up an installation of this to fellow tinkerers, but this poor little box can barely take what it's tasked with at present...

Oh yeah, and one other thing:  I've been thinking about names better than `dbagg3`.  The one that's sticking around in my head so far is **feedReactor**.  What do you think?

[flash]: http://www.decafbad.com/blog/2003/06/19/flash_agg
[xmlhttp]: http://developer.apple.com/internet/webcontent/xmlhttpreq.html
[bloglines]: http://www.bloglines.com
[restapi]: http://www.decafbad.com/cvs/*checkout*/dbagg3/lib/dbagg3/rest.py
[dbagg3]: http://www.decafbad.com/cvs/dbagg3/
[soup]: http://www.decafbad.com/blog/2004/08/23/slicing_and_dicing_to_make_atom_soup_in_dbagg3
<!--more-->
shortname=dbagg3_makingprogress

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086277">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=26343060da04d2f84c3fbd726c1158b6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Alan</a>
                </div>
                <a href="#comment-221086277" class="permalink"><time datetime="2004-09-01T03:39:10">2004-09-01T03:39:10</time></a>
            </div>
            <div class="content">I prefer the dbagg title to feed_anything_. There's feedster, feedburner, feedreader and I'm sure there will be a whole slew more. This needs an original name. It seems similiar to Urchin, which you earlier posted a link to, how about Starfish or maybe Seahorse. ;)</div>
            
        </li>
    
        </ul>
    
        </div>
    