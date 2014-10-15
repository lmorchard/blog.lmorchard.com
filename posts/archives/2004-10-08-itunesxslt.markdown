---
comments_archived: true
date: '2004-10-08T13:07:49-04:00'
excerpt: So I had an idea for a quick podcasting listening hack on the way
    into work this morning.
layout: post
tags:
- syndication
- xml
title: Using iTunes as a podcast aggregator, with a little help from XSLT
wordpress_id: 561
wordpress_slug: itunesxslt
wordpress_url: http://www.decafbad.com/blog/?p=561
---
So I had an idea for a quick podcasting listening hack on the way into work this morning. Check it out:

* Take one [list of RSS feeds in OPML](http://www.decafbad.com/2004/10/podcasts.opml).
* Throw in [a bit of XSLT](http://www.decafbad.com/2004/10/opml-to-playlist.xsl).
* Combine using `xsltproc` to make [a playlist](http://www.decafbad.com/2004/10/podcasts.pls) that works in iTunes.

And, oh yeah, I just happen to have an `xsltproc` web service laying around, so:

* Supply a URL to your OPML in [this form](http://www.decafbad.com/2004/10/xsltproc.cgi?xsl=http%3A%2F%2Fwww.decafbad.com%2F2004%2F10%2Fopml-to-playlist.xsl).
* Get a [freshly-built playlist](http://www.decafbad.com/2004/10/xsltproc.cgi?xsl=http%3A%2F%2Fwww.decafbad.com%2F2004%2F10%2Fopml-to-playlist.xsl&#38;xml=http%3A%2F%2Fwww.decafbad.com%2F2004%2F10%2Fpodcasts.opml).

Now, this has been barely tested and is the product of a ten-minute hacking session.  There are likely an enormous number of things wrong with this.  That said, iTunes does seem to open the playlist happily, and it looks like only new streams are added with repeated openings of the playlist.

You will want to be careful to ensure that your OPML is valid XML (mine wasn't, on initial export from iPodderX - escape those freaking ampersands in URLs already!), and I have no idea what would happen if any of the RSS feeds in your subscriptions turn up invalid.  

Have I mentioned that, despite their unforgiving and sometimes fragile nature, I love XML technologies?

If this looks useful, maybe I'll work it over a bit more and pair it up with some python to handle actually downloading the MP3s and torrents.

**Update:** Oh yeah, and I'm expecting this will be useful with an iTunes smart playlist crafted along these lines:

* Date Added in the last 1 days
* Play Count is less than 1

**Update #2:** Another use I just found for this playlist, is on my [Xbox Media Center](http://www.xboxmediacenter.com/).  I generate this playlist via cronjob every few hours, and store it on an SMB share accessible to the XBMC.  Voila!  Listening to podcasts on my stereo system via the Xbox.  Yeah, nothing big, just kind of nifty.
<!--more-->
shortname=itunesxslt

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090734">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=a5cae412b649470abb8827c85ef2d4c8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Kevin</a>
                </div>
                <a href="#comment-221090734" class="permalink"><time datetime="2004-10-21T10:32:55">2004-10-21T10:32:55</time></a>
            </div>
            <div class="content">This is a great idea...  My playlist seems to be formated all wrong, so i need to work on it.  Any advancements on this one?</div>
            
        </li>
    
        </ul>
    
        </div>
    