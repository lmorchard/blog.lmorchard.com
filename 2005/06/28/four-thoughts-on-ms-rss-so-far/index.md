So, in my [previous post about Microsoft's newly announced involvement with RSS][prev], I came to the conclusion that--at least with respect to the [Simple List Extensions][sle]--the happening was more about the delivery than the deftness of the extension itself.  And, well, I still consider that to be the case.  

However, I definitely need to dig deeper.  For example, I'd forgotten about [Dare Obasanjo's "The Netflix Problem"][netflix], which offers a clear use case for a list extension in syndication feeds.  Also, having been busy, I've been a bit out of touch with goings on at conferences and the quantum foam of daily syndication feed discussions.

But at any rate, here's a quick sum up of a handful of MS RSS thoughts I've had over the last day or so.

[netflix]: http://www.25hoursaday.com/weblog/PermaLink.aspx?guid=a257ba40-b9fd-4cba-959a-2bba6ae917f0

### Responsive so far...

I'm coming to think that this wasn't so much a *delivery* so much as a funky *request for comments*.  For example, [Phil Ringnalda posts][phil] about his issues with the new extension and various community notables respond in comments.  A little later on, though, [Sean Lyndersay posts][response] on the Longhorn RSS Team blog with a response and some tweaks to the extension.  Funny, that was unexpected.

And then, later on in the day yesterday, I actually got a personal email from a senior project manager on IE at Microsoft in response to my [previous post][prev], offering appreciation for my blog and to answer any questions I might have.  Now, I doubt I barely rate as a C-list blogger in the 'sphere as a whole, so that anyone bothered to contact little old me seems unexpected as well.

### A familiar architecture

Moving along to the [Architectural Overview][arch] of RSS support on Longhorn, I'm seeing things that look oh-so-familiar.  *Oh yeah!*  It's a big chunk of what I had in my head for FeedReactor, if I ever got around to producing a version of it in decent shape for public use.  The biggest difference is that my solution would be cast across the web (both locally and globally) via REST, whereas Microsoft's will be embedded into Longhorn.

I wanted to build a reusable base service for consuming syndication feeds, do that right and do that in a shared way, so that more interesting apps could get on with their lives and not start from the ground floor at HTTP polling, parsing, and new entry tracking every time.  As it is, I couldn't resist reworking a small part of it and including it in my book as a reusable feed cache class, I think it's such an essential next step in syndication feed tech.

### Bigger than Winsock assimilation? 

Although he downplays it, I think [Wrox's Jim Minatel offered][mina] the best quote describing my initial impression of RSS support in Longhorn:

> I think this is important. I go back to 1995 and the Windows 95 release. What was the most important feature in that release? A built in TCP/IP stack. No more having to buy a book (bummer for publishers!), a shrinkwrapped box with packaged internet connectivity software, or install that disk that came in the mail to get a 3rd party TCP/IP stack for Windows 3.1 to connect to the internet. Windows 95 enabled the mass migration to an internet enabled world that we have today.

### Syndication.framework already here, in Mac OS X Tiger?

On the other hand, [Jens Alfke][softed] posted (and later retracted) about Microsoft's newly announced RSS support being nothing more than a copy of Apple's work on Safari RSS.

He may have just been grousing based on screenshots, though.  Because, I've never seen anything announced by Apple which would suggest an architecture like the one proposed for RSS in Longhorn.  However, he did mention something called `Syndication.framework`.  And, indeed, there appear to be interesting things under this path in Mac OS X Tiger:

  /System/Library/PrivateFrameworks/Syndication.framework

And, the [Safari RSS Developer Release Notes][srss] mention the `SyndicationAgent` application as a part of that Framework.  So, I wonder how open this framework is for use by other applications?  I wonder in what format are its databases under `~/Library/Syndication`?  (Code Data ? SQLite?)

[srss]: http://developer.apple.com/releasenotes/InternetWeb/SafariRSS.html
[mina]: http://wroxblog.typepad.com/minatel/2005/06/microsoft_rss_l.html
[arch]: http://msdn.microsoft.com/longhorn/understanding/rss/rsslonghorn/#architecture
[prev]: http://www.decafbad.com/blog/2005/06/25/microsoft_rss_godzilla_tiptoes_into_tokyo
[sle]: http://msdn.microsoft.com/Longhorn/understanding/rss/simplefeedextensions/
[softed]: http://mooseyard.com/Jens/index.php
[response]: http://blogs.msdn.com/rssteam/archive/2005/06/25/432686.aspx
[phil]: http://philringnalda.com/blog/2005/06/ms_embraces_rss.php

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085617">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://diveintomark.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=357a20e8c56e69d6f9734d23ef9517e8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://diveintomark.org/">Mark</a>
                </div>
                <a href="#comment-221085617" class="permalink"><time datetime="2005-06-29T16:57:30">2005-06-29T16:57:30</time></a>
            </div>
            <div class="content">> I doubt I barely rate as a C-list blogger in the 'sphere as a whole, so that anyone bothered to contact little old me seems unexpected as well.

I got that email as well, and I've been out of the community for almost a year.  I filed it under "things I tell myself I no longer care about, but secretly miss, on rainy days and such."</div>
            
        </li>
    
        </ul>
    
        </div>
    