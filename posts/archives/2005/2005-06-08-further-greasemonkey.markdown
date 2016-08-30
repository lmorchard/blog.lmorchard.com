---
comments_archived: true
date: '2005-06-08T16:47:56-04:00'
layout: post
title: Further quick thoughts on GreaseMonkey
wordpress_id: 646
wordpress_slug: further-greasemonkey
wordpress_url: http://www.decafbad.com/blog/?p=646
---
Now for some quick GreaseMonkey spew, recorded without any effort to actually see what's up in the community or reading any FAQs:

* I want to separate script code into reusable modules.
* That said, am I an [Architecture Astronaut][astro] when I can't get more than 10 minutes into a quick project without already starting to digress into building a *reusable framework*?
* Is it wrong that I felt like I was working in Perl again when I wrote [that script][script]?
* That said, I wish JavaScript had either multi-line quotes ala Python or Perl heredoc syntax.
* Doing some twisty regex search-and-replace in Vi lets you do a lot of refactoring / recoding damage to source code in no time flat.
* Can I just say how nice it is to not worry about other browsers when coding?

I've also got a few ideas I'd like to record and pursue for future GreaseMonkey endeavors:

* Record the URL of all form submissions via XMLHTTPRequest to a remote server, with blog comment forms in mind.  Track changes on those URLs.  Notify me via Atom feed when new comments arrive in places where I posted comments.
* Clean up and abstract that magic form thing I did into a more general way to make all kinds of magic textarea forms.  (More microformats?  .sig files for LiveJournal responses?  /usr/bin/banner for annoying blog comments?)
* Revive [Third Voice][tvoice] in GreaseMonkey style.  Subscribe to arbitrary REST API'ed annotation servers, fetch & aggregate annotations for current URL via XMLHTTPRequest, build cute floating stickies with rude comments from friends.
* Auto-ROT13 en/decoder ring, because there's a need for that.
* Script which redirects all links to books on Amazon.com to point at my new book.  I will install this on all computers at CompUSA and the Apple Store.

I've suddenly realized that a lot of the things I wanted to do with [Agent Frank][afrank] are possible with GreaseMonkey.  Also, I wonder how long it'll be before I get sucked into further FireFox extension hacking.

[afrank]: http://www.decafbad.com/twiki/bin/view/Main/AgentFrank
[tvoice]: http://wired-vig.wired.com/news/business/0,1367,42803,00.html
[astro]: http://www.joelonsoftware.com/articles/fog0000000018.html
[script]: http://www.decafbad.com/2005/06/magic_hcalendar.user.js
<!--more-->
shortname=further_greasemonkey

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090330">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=f3794e603ef53b0513ab45b6565ee457&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jeremy Dunck</a>
                </div>
                <a href="#comment-221090330" class="permalink"><time datetime="2005-06-08T18:00:08">2005-06-08T18:00:08</time></a>
            </div>
            <div class="content">Regarding reusable framework.. Dood, think shell scripts for the web.

Also, if you want dependency management, you're likely to have better luck creating an extension, like jslib (http://jslib.mozdev.org/ ).

On Third Voice bit, Simon Willison and Aaron Boodman are both tinkering in this area.

On decoder ring, you mean where 2 users would share a key, or do u mean persisting encoded values?  

On book redirect... too evil. ;)</div>
            
        </li>
    
        <li class="comment" id="comment-221090332">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8a5273f79cfe7579ad46023f93377aa8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">l.m. orchard</a>
                </div>
                <a href="#comment-221090332" class="permalink"><time datetime="2005-06-08T19:02:36">2005-06-08T19:02:36</time></a>
            </div>
            <div class="content">Jeremy: Hey, I've been known to amass large libraries of functions for shell scripts too.  :)  But that's not so much a framework as a module, which is what I was really doing.  But I suspect I will start getting sucked into actual extension development.

As for the decoder ring, I was really just thinking of something silly with ROT13 for spoilers to movies & etc... but a shared key secret spy ring would be nifty.</div>
            
        </li>
    
        <li class="comment" id="comment-221090333">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221090333" class="permalink"><time datetime="2005-06-09T00:13:08">2005-06-09T00:13:08</time></a>
            </div>
            <div class="content">Check out the [JSAN howto/proposal](http://use.perl.org/~schwern/journal/24112).

That is *big* stuff right there. I've seen a few other posts by other people since that one was written which indicate that there's motion. Not much of it seems visible yet though.</div>
            
        </li>
    
        <li class="comment" id="comment-221090336">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.joegrossberg.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=21fa249406e02cd506f422727b4351aa&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.joegrossberg.com">Joe Grossberg</a>
                </div>
                <a href="#comment-221090336" class="permalink"><time datetime="2005-06-09T11:28:25">2005-06-09T11:28:25</time></a>
            </div>
            <div class="content">"Can I just say how nice it is to not worry about other browsers when coding?"

It's like the *moral* way to experience that thrill.

Plus, it's simpler than an Extension (never underestimate the major impact of making something slightly easier) and you get to apply it to someone else's site.</div>
            
        </li>
    
        <li class="comment" id="comment-221090337">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philringnalda.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e68e9944f50a481a64b5a32fdfc02e0d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philringnalda.com/">Phil Ringnalda</a>
                </div>
                <a href="#comment-221090337" class="permalink"><time datetime="2005-06-12T01:24:59">2005-06-12T01:24:59</time></a>
            </div>
            <div class="content">Unfortunately, you only really get to enjoy one-browser coding if you are doing a script for yourself; otherwise, you'll have that nagging feeling that you should be careful to keep it usable as an Opera 8 User JavaScript, and as a Trixie  script, and as a Turnabout  script, and ...

Extensions, though, you're really single browser (or slightly more, if you support Seamonkey too), and with chrome privileges you can do whatever you want.</div>
            
        </li>
    
        <li class="comment" id="comment-221090338">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=f3794e603ef53b0513ab45b6565ee457&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jeremy Dunck</a>
                </div>
                <a href="#comment-221090338" class="permalink"><time datetime="2005-06-12T17:35:24">2005-06-12T17:35:24</time></a>
            </div>
            <div class="content">I've said it before, and I'll say again: I think single-browser user scripts are not the evil that single-browser sites are.  The browser user is in control of their browser and their user scripts.  They can port a script meant for another browser if they like.  The script author does not owe that consideration.

Of course, do it where it makes sense and isn't painful...</div>
            
        </li>
    
        </ul>
    
        </div>
    