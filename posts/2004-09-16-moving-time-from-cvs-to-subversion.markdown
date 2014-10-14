---
comments_archived: true
date: '2004-09-16T11:29:04-04:00'
excerpt: So, I'm waiting for the other shoe to drop.  After making sure
    things seemed reasonably stable post-server-move, I migrated my CVS
    repository here to Subversion.
layout: post
tags:
- syndication
- xml
title: 'Moving time: From CVS to Subversion'
wordpress_id: 548
wordpress_slug: moving-time-from-cvs-to-subversion
wordpress_url: http://www.decafbad.com/blog/?p=548
---
So, I'm waiting for the other shoe to drop.  After making sure things seemed reasonably stable post-server-move, I migrated my CVS repository here to [Subversion][subversion].  There were one or two tiny bumps in the road-- such as a default setting in Apache to deny access to anything starting with .ht (ie. .htaccess)-- but so far, so good.  [ViewCVS][viewcvs] appears to support Subversion, and I've also discovered an alternate frontend called [WebSVN][websvn].  I like ViewCVS better, but WebSVN offers RSS feeds on commits.

One consequence to this move is that soon, when I take down everything related to CVS, I'll have plenty of broken links (since I frequently link to ViewCVS pages for my projects).  So, I think my next step will be to set up some redirects to a reasonable number of things for continuity's sake.

So, anyway... if you've been keeping up with `dbagg3`, the action's not in CVS anymore.  It's here:

* <http://www.decafbad.com/svn/trunk/dbagg3/>

Alternately, you can also peek at things here:

* <http://www.decafbad.com/svn-view/trunk/dbagg3/>
* [WebSVN](http://www.decafbad.com/websvn/listing.php?repname=0xDECAFBAD%20projects&#38;path=%2Ftrunk%2Fdbagg3%2F&#38;rev=0&#38;sc=0)

(Can you see one reason why I like ViewCVS so much better?)

[viewcvs]: http://viewcvs.sourceforge.net/
[subversion]: http://subversion.tigris.org/
[websvn]: http://websvn.tigris.org/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085325">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.unix-girl.com/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=dec4418e2a8f2b2a11408df7cf343bcc&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.unix-girl.com/blog">kasia</a>
                </div>
                <a href="#comment-221085325" class="permalink"><time datetime="2004-09-16T11:53:06">2004-09-16T11:53:06</time></a>
            </div>
            <div class="content">ViewCVS is much better than WebSVN, you could create RSS feeds with a relatively simple post-commit hook, or even just modify the email changes post-commit hook to also generate RSS feeds..</div>
            
        </li>
    
        <li class="comment" id="comment-221085328">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.ianbicking.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cc8334869c9d2a9e603017f2da805eb3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.ianbicking.org">Ian Bicking</a>
                </div>
                <a href="#comment-221085328" class="permalink"><time datetime="2004-09-16T12:50:14">2004-09-16T12:50:14</time></a>
            </div>
            <div class="content">One PITA with ViewCVS is that it has to have write access to the repository, and having multiple users access the repository can cause the permissions to get out of wack and make the repository unavailable.  I don't know if WebSVN uses the client svn libraries (i.e., accesses the repository through the server, instead of accessing repository files directly), but if it does then I would probably stick with it.  Though if you are using Apache, I suppose it's all being accessed as the same user, so it shouldn't be too much of a problem.</div>
            
        </li>
    
        <li class="comment" id="comment-221085330">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://simon.incutio.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=02ecb4f56e961dd226352c4dd51eff26&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://simon.incutio.com/">Simon Willison</a>
                </div>
                <a href="#comment-221085330" class="permalink"><time datetime="2004-09-16T13:19:41">2004-09-16T13:19:41</time></a>
            </div>
            <div class="content">Have you looked at Trac? http://projects.edgewall.com/trac

svn browser, bug tracker and wiki rolled in to one. It's very sexy.</div>
            
        </li>
    
        <li class="comment" id="comment-221085331">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=d6c17175cba2c2d27483fe5f4ed8ee27&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Ben Weekes</a>
                </div>
                <a href="#comment-221085331" class="permalink"><time datetime="2004-09-16T13:19:45">2004-09-16T13:19:45</time></a>
            </div>
            <div class="content">I suggest that if you want to avoid breaking URLs again in future you take the "svn" out of those URLs.

I generally prefer WebSVN; it seems to fit the "Subversion Way" a lot better than ViewCVS, which bends it to a CVS way of thinking about things to some extent. Mostly, though, they're essentially the same thing. WebSVN's theme and UI needs a little work, but other than that I find it good. Providing both is nice, though!

I'm guessing you're picking on WebSVN's horrible URLs... and I agree with you on that. It has been an intention of mine for a while to take a look at it and see if I can't use some mod_rewrite magic to make it nicer. I don't much like PHP, though, so I've not got around to it yet.</div>
            
        </li>
    
        </ul>
    
        </div>
    