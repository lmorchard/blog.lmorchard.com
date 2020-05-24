* [iTunes podcasting support][it]... I want it all, and I want it now, because it has *so* much potential in and of itself, and *so* much potential for driving podcast tuner UI into the future.  

  The subscriptions are listed alphabetically?  Come on, let me sort them in last-updated order.  And what, no OPML import / export?  

  Not many podcast-related additions to the AppleScript scripting dictionary for iTunes.  I see a `subscribe` method, but I was hoping I could at least hack in some support for subscription list import / export.  Not having access to the subscription list puts a crimp in that. 

  **Update:** Hooray for [people who know what they're talking about][itapp].  Turns out there are a few more additions to iTunes' AppleScript support I missed, but I'm still not finding my way down to accessing the list of podcast subscriptions.

  **Update 2:** Looks like someone's already worked on the *import* side of things: [OPML2iTunes : AppleScript to import OPML podcast subscriptions into iTunes](http://log.hugoschotman.com/hugo/2005/06/opml2itunes_app.html)

[itapp]: http://www.dougscripts.com/itunes/itinfo/itunes49info.php

* And in the Bizzarro-Verse, [Microsoft is more community-oriented than Apple when it comes to RSS extension creation][biz].  Pretty odd.  I can see a few spots where the iTunes tags are defensible, but couldn't most or all of these have been established [using Dublin Core or other prior work][suk]?

[suk]: http://usefulinc.com/edd/blog/contents/2005/06/28-rss-apple-itunes/read
[biz]: http://www.25hoursaday.com/weblog/PermaLink.aspx?guid=385a9ee7-cb12-4aae-8a97-6554ed819248

* Bummer.  It seems like the [new podcasting support in iTunes][it] doesn't use `Syndication.framework`, or at least the feeds subscribed in iTunes don't show up in the Sources table in [the database I was snooping around in][sdb].

  And here I was hoping for Tiger to have already quietly included a shared syndication feed architecture similar to [what's proposed for Longhorn][arch]. 

  Otherwise, podcasting in iTunes seems interesting so far.  *Now, if it used BitTorrent out of the box...*

[arch]: http://www.decafbad.com/blog/2005/06/28/four_thoughts_on_ms_rss_so_far
[it]: http://www.apple.com/podcasting/
[sdb]: http://www.decafbad.com/blog/2005/06/28/safarirssdb

* Can I just say I hate the new binary plists in OS X Tiger?  I got so used to futzing with them using `vim` and shell-side friends that it's jarring to get a face full of garbage now when I poke at them.

  And yeah, I know about `/usr/bin/plutil`--but, yuck.
<!--more-->
shortname=quick_postlunch

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090119">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://rasterweb.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=db0fab74bcb564ebb09295498b892fb6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://rasterweb.net/">Pete Prodoehl</a>
                </div>
                <a href="#comment-221090119" class="permalink"><time datetime="2005-06-28T14:38:04">2005-06-28T14:38:04</time></a>
            </div>
            <div class="content">Podcasting in iTunes *is* interesting, if just for the fact that Apple is now pushing out a podcasting client to *millions* of desktops, making podcatching easy as (Apple) pie.</div>
            
        </li>
    
        <li class="comment" id="comment-221090120">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://naeblis.cx/rtomayko/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=abfc88b96ae18c85ba7aac3bded2ec5e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://naeblis.cx/rtomayko/">Ryan Tomayko</a>
                </div>
                <a href="#comment-221090120" class="permalink"><time datetime="2005-06-28T14:46:14">2005-06-28T14:46:14</time></a>
            </div>
            <div class="content">WARNING: This is a mandatory vi vs. emacs comment. I have absolutely no control of myself right now and apologize for leaving this comment as I fully understand that it will have zero impact on anyone's religious attachment.

Emacs can edit binary plist files.. na-nana-nana-naaaaa!

http://www.macosxhints.com/article.php?story=20050526162847879&lsrc=osxh</div>
            
        </li>
    
        <li class="comment" id="comment-221090121">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=eb7f2a3ba74af37415ab7df101a86c75&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">l.m. orchard</a>
                </div>
                <a href="#comment-221090121" class="permalink"><time datetime="2005-06-28T14:52:00">2005-06-28T14:52:00</time></a>
            </div>
            <div class="content">Ryan: Bah, I was once an emacs user, but I just fell out of the need to use an editor that can not only edit binary plist files but also likely play a good game of Go while I'm waiting for builds to finish.  :)   Phbbtbt!</div>
            
        </li>
    
        </ul>
    
        </div>
    