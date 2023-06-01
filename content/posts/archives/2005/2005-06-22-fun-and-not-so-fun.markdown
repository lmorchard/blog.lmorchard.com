---
comments_archived: true
date: '2005-06-22T18:23:47-04:00'
layout: post
title: Fun and not-so-fun
wordpress_id: 655
wordpress_slug: fun-and-not-so-fun
wordpress_url: http://www.decafbad.com/blog/?p=655
---
* Last night's fun trick?  Say hello to <a href="aim:goim?Screenname=decafbot&Message=help">decafbot</a>!  

  I turned an IRC [Infobot][ib] into an AIM chatbot via [Bitlbee][bb].  It may or may not be online depending on how stable the rig is and how tolerant AIM's flood/spam triggers are.

  I've always been a fan of `purl` on the `#perl` IRC channel, so maybe I can try turning this little infobot into something useful.  At any rate, it was a quick hack involving two installs via DarwinPorts and a few config file tweaks.  So, send an IM on the AIM network to <a href="aim:goim?Screenname=decafbot&Message=help">`decafbot`</a> and see what happens.

[ib]: http://infobot.sourceforge.net
[bb]: http://www.bitlbee.org/

* Today's not-so-fun trick?  (Well, the past 2 weeks' not-so-fun...)

  Imagine a crazy crapstorm web app project which features allowing visitors to upload pictures, presumably from their digital cameras.  Ignore for the moment any details of feasibility, scope, timing, or resource planning.

  Oh, and you're stuck working with classic ASP 3.0.  You have no access to write to the file system on the production web server, and you've been told not to stick big things in the database tables--like photos from digital cameras, for instance.  Also, did I mention that you can't register any new DLLs on the production servers?  At least, not without the consultation of a committee who only meets every quarter or so.  Oh, and did I mention this was due last week?

  So, you've got to *somehow* capture those images and the accompanying metadata and stash it all *somewhere*, despite being denied a filesystem or a database.  What to do, what to do?  Oh, I know: let's email all this crap off to an inbox somewhere that something (or someone (*sorry, intern*)) will be able to batch process!

  Great!  Except, well... er...  ASP 3.0 doesn't really particularly like processing forms with file uploads.  In fact, it doesn't support it at all.  Luckily, I was able to find some code [implementing file upload handling in pure VBScript][file], although I had to scrape it off the HTML page itself since the .zip file had gone missing.

  With that, then, you can actually accept the form submission.  Now, how to fire off an email with the image as an attachment?  The only email support we have available is [CDONTS.DLL][cdonts], and it appears to only offer some support for attachments which are available in the filesystem--and all we have here is a stream of bytes in memory.  

  So, armed with a pure-ASP implementation of [base64][] and a decent understanding of SMTP and RFCs, I forged ahead to piece together a MIME multipart email the hard way in VBScript.  Remember to line break your stream of base64-encoded binary at 75 columns, and you'll need to trick CDONTS to allow you to inject a `Content-Type: multipart/mixed` header into the mix, and you're off!

  Whew... and, believe it or not, it all works.  I almost wish I could share the source code, ignoring that it's implemented with an obsolete set of technologies and that it's certainly not the prettiest code in the world.

[base64]: http://www.freevbcode.com/ShowCode.asp?ID=5248
[file]: http://aspzone.com/articles/160.aspx
[cdonts]: http://www.mostlylucid.co.uk/archive/2003/10/15/589.aspx

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086027">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://rasterweb.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=db0fab74bcb564ebb09295498b892fb6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://rasterweb.net/">Pete Prodoehl</a>
                </div>
                <a href="#comment-221086027" class="permalink"><time datetime="2005-06-22T20:02:05">2005-06-22T20:02:05</time></a>
            </div>
            <div class="content">After "classic ASP 3.0" I just kept mutter "poor bastard" and couldn't even muster up the courage to read on. I've felt your pain...</div>
            
        </li>
    
        <li class="comment" id="comment-221086029">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.nickfitz.co.uk/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b09e3490d1406cd1d752c774f9d5e711&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.nickfitz.co.uk/">Nick Fitzsimons</a>
                </div>
                <a href="#comment-221086029" class="permalink"><time datetime="2005-06-23T12:30:52">2005-06-23T12:30:52</time></a>
            </div>
            <div class="content">Ah, the pain... I had to do something similar a few years ago, and it's not fun at all - especially as I had to add in a scheduled task to automatically get the stuff from the mailbox (WSH POP3 client, anyone?), de-Base64 it and upload it onto an intranet server... those were the days :-)</div>
            
        </li>
    
        <li class="comment" id="comment-221086032">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://therealadam.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=930993d33d2ce457bf871158e688a2fa&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://therealadam.com">Adam Keys</a>
                </div>
                <a href="#comment-221086032" class="permalink"><time datetime="2005-06-28T20:46:30">2005-06-28T20:46:30</time></a>
            </div>
            <div class="content">All that and no felonies committed?  You are a saint!</div>
            
        </li>
    
        </ul>
    
        </div>
    