---
comments_archived: true
date: '2005-11-02T15:29:25-05:00'
layout: post
tags:
- webdev
- linux
- microsoft
title: Why proprietary?
wordpress_id: 765
wordpress_slug: why-proprietary
wordpress_url: http://decafbad.com/blog/?p=765
---
Hell, while I'm at it, I've got an expanded question to follow up [my last one][wm]:

Why would anyone developing a web application today sink any money whatsoever into a platform with any degree of proprietary technology?

The latest [Scoble dispatch][scob] is asking about Microsoft, but what about all the other closed-world web development environments out there?  Really, it's been awhile since I've heard much about anything other than Microsoft versus Open Source in the web development world.  And, when I have heard about the other guys, it's usually in a scenario where someone got roped into the technology sometime in the dot-com boom days and have since built everything around it.  

It seems this far out from the initial adoption that decisions are made less and less from technical merit, and more from monetary and political merit driven by the sales force.  The momentum of the platform maintains lock-in, despite any resulting impedance mismatches or inefficiencies which may crop up as the platform matures or (less charitably) ages.

Finally, consider one of the main routes for finding support for Open Source platforms:  Google.  Have you run into a cryptic error message?  Google it.  Need to find docs for an API?  Google it.  So many of these wholly proprietary platforms have locked up a lot of their docs and forums behind for-pay password walls that Google never sees.

Now, for now at least, it seems Microsoft has avoided these things.  But, my suspicion is that they're only able to do this as a commercial venture because of the sheer number of people and the wads of cash they have.  Eventually, I expect even they will be overrun.  I couldn't imagine a new closed-world web development platform taking off today.

[scob]: http://scobleizer.wordpress.com/2005/11/01/ross-doesnt-trust-microsofts-approach-to-web/
[wm]: http://decafbad.com/blog/2005/11/02/why-microsoft

<!-- tags: webdev linux microsoft -->

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086794">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://admin.support.journurl.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5f89d3df08b8dedac1a0fde900a586db&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://admin.support.journurl.com/">Roger Benningfield</a>
                </div>
                <a href="#comment-221086794" class="permalink"><time datetime="2005-11-02T20:26:22">2005-11-02T20:26:22</time></a>
            </div>
            <div class="content"><p>"Why would anyone developing a web application today sink any money whatsoever into a platform with any degree of proprietary technology?"</p>

<p>Because I like 'em? </p>

<p>I use Win2k3/IIS because it is stable, easy to administer, and doesn't cost one dime more than a similar Linux/Apache server. I use Coldfusion because it's stable, easy to administer, gives me the option of using Java and COM stuff when necessary, and has a great group of folks at Macromedia supporting it.</p>

<p>Meanwhile, I use MySQL because it's stable, cheap, and has a smaller footprint than SQL Server. Googling for support is actually quite annoying, but I take a "you get what you pay for" approach to these things.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086796">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086796" class="permalink"><time datetime="2005-11-02T20:37:17">2005-11-02T20:37:17</time></a>
            </div>
            <div class="content"><p>Roger: Thanks for responding!  For what it's worth, I actually <em>do</em> want to see comments from people who've had good experiences with proprietary platforms, so as to balance out my leanings.</p>

<p>Since you mentioned Macromedia, I realize that I wasn't thinking of them in my post.  They're basically semi-open proprietary (not unlike Microsoft), but I <em>do</em> like their stuff.  Well, Flash at least.  But ColdFusion...?  Admittedly, I haven't used it much since the arrival of CFMX, but I tend to think PHP's a better deal.  No offense, though, since I'm willing to blame my own ignorance.</p>

<p>It's interesting that you say a Win2k3/IIS server is cost comparable to a Linux/Apache server, though.  Do you own your own server?  Lease a dedicated box?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086797">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.agileprogrammer.com/eightytwenty"><img src="http://www.gravatar.com/avatar.php?gravatar_id=12405222b80eca06189b246be2e57ef8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.agileprogrammer.com/eightytwenty">Gordon Weakliem</a>
                </div>
                <a href="#comment-221086797" class="permalink"><time datetime="2005-11-02T21:59:04">2005-11-02T21:59:04</time></a>
            </div>
            <div class="content"><p>Roger's reason is basically the reason I was going to give.  People are most productive in an environment they know best.  This is especially true when it comes to operational support.  Any environment is going to get hairy at high loads and under "normal operating conditions", so when the poop hits the fan, you're better off in an environment that you're familiar with.  MySql may be a better DB, but if my DBA knows SQL Server inside and out and really knows how to use the tool, then you'll get better results with SQL Server over MySql.
And anyway, according to Joel Spolsky, Google beats MSDN for support in most cases.  Actually, my experience bears out Joel's comment.  All support devolves into Googling, in most cases.  I use the MSDN support only for the real killers - those support incidents cost money, you know.
Great work on the book, BTW.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086798">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://admin.support.journurl.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5f89d3df08b8dedac1a0fde900a586db&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://admin.support.journurl.com/">Roger Benningfield</a>
                </div>
                <a href="#comment-221086798" class="permalink"><time datetime="2005-11-09T00:16:17">2005-11-09T00:16:17</time></a>
            </div>
            <div class="content"><p>Sorry for not getting back before now.</p>

<p>"Admittedly, I haven’t used it much since the arrival of CFMX, but I tend to think PHP’s a better deal. No offense, though, since I’m willing to blame my own ignorance."</p>

<p>I'm happy to sing CF's praises, but I'm not one of those people who get offended when someone prefers something else. Don't worry 'bout it.</p>

<p>I just love CFMX. I love how the day-to-day stuff is really easy, and the esoteric stuff can be addressed by leveraging Java.  I love that the fundamental language structure makes sense to someone who taught himself to write code on a C-64 and an Atari ST. I love that it (mostly) handles Unicode for me. I love that it allows me to play with a little OOP while primarily sticking to procedural stuff. </p>

<p>"Lease a dedicated box?"</p>

<p>Yup. I could have gone Red Hat or Win2k3 during setup, and to me, it was a no-brainer. If nothing else, my wife has spent the last fifteen years as a network engineer, working mainly with Windows networks... free, in-house, 24/7 tech support cannot be ignored. :D</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086799">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086799" class="permalink"><time datetime="2005-11-09T00:54:35">2005-11-09T00:54:35</time></a>
            </div>
            <div class="content"><p>Roger: Oh yeah!  I keep forgetting about the Java side of CFMX, and just keep thinking it's still only a funky-tag language.  I should check it out sometime</p>

<p>And for my part, I learned to program on a C-64 and an Amiga :)  (Oh yeah, and there was an Atari 800 in there, early on.)</p></div>
            
        </li>
    
        </ul>
    
        </div>
    