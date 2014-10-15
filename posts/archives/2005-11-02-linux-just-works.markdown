---
comments_archived: true
date: '2005-11-02T01:03:00-05:00'
layout: post
tags:
- asides
- linux
- microsoft
- windows
title: Linux Just Works
wordpress_id: 762
wordpress_slug: linux-just-works
wordpress_url: http://decafbad.com/blog/?p=762
---
<blockquote cite="http://www.intertwingly.net/blog/2005/11/01/It-Just-Works">But I’m a developer.  I want more.  I want ruby.  And subversion.  And cvs.  And build tools.  Each is only an apt-get away.  There even is a convenient GUI for this.  Ray’s vision of the future, I have today.  And whereas Windows Update kept the OS and selected Microsoft tools up to date, the Debian packaging manager keeps everything up to date and in synch.  Without ever needing to reboot.</blockquote>
<small style="text-align:right; display:block">Source: <a href="http://www.intertwingly.net/blog/2005/11/01/It-Just-Works">Sam Ruby: It Just Works</a></small>

This is why I always try to have a [Debian netinst CD][ni] within arm's reach.  Given a working high-speed internet connection, I can go from a random PC, *tabula rasa*, to a fully functioning and useful server or workstation in under 20 mostly unattended minutes.  And as a server, that little thing can jump right into handling files, email, authentication, and a whole pile of other office-related necessities.

Given about 10 more minutes, I can have a Subversion repository, Trac install, and a full suite of collaboration tools available.  And then...?  It all just keeps working, mostly.  And for the most part, an `apt-get upgrade` from time to time keeps things up to date.

I've never, ever had this experience with Microsoft technology.  On the other hand, I suspect that I should give Ubuntu a look or two, from what I've been hearing.

[ni]: http://www.debian.org/CD/netinst/

<!-- tags: linux microsoft windows -->

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090945">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://carthik.net/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4c3aaf6fceaa5de05e1a80133689b618&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://carthik.net/blog/">Carthik</a>
                </div>
                <a href="#comment-221090945" class="permalink"><time datetime="2005-11-02T09:01:52">2005-11-02T09:01:52</time></a>
            </div>
            <div class="content"><p>Ubuntu fits entirely on one CD. Of course, you can install other software from the "universe" and "multiverse" components of the repository with a live internet connection, but it is rather uncommon that a good OS fits on one install CD, as opposed to 5 or 12.</p>

<p>You should try it - I am hooked!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090948">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://insight.srijith.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=22818a65c8482b1bf908c4b389e98e00&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://insight.srijith.net">Srijith</a>
                </div>
                <a href="#comment-221090948" class="permalink"><time datetime="2005-11-02T11:31:54">2005-11-02T11:31:54</time></a>
            </div>
            <div class="content"><p>Having used Ubuntu I would say that it is a good distro for an everyday use average user ( a <em>big</em> achievement) but it does fall short when it comes to developer needs. </p>

<p>Imagine my surprise when I found out that a typical install of Ubuntu 5.04 did not install perl-doc! Along that same line, a lot of apps are in the Universe which means they are not updated in a timely manner.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090949">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://boston.conman.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=bbb1c69b64019a3df907c3545186f907&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://boston.conman.org/">Sean Conner</a>
                </div>
                <a href="#comment-221090949" class="permalink"><time datetime="2005-11-02T21:46:49">2005-11-02T21:46:49</time></a>
            </div>
            <div class="content"><p>In my experience, it only works if you constantly (like say, every 90 minutes or so) do an <code>apt-get every-damn-thing-in-the-world</code>.  We have a few older servers here, maybe a year old or so and the automatic package management is just broken.  Perhaps it's a Fedora Core or Gentoo thing, but even on a moderately old system, the package management stuff just breaks (mainly because it's not OMFG-I-need-to-upgrade-every-minute up to date).</p>

<p>I don't upgrade just to upgrade.  Things break.  Things change.  For instance, there's a showstopping bug in Apache 2.0 that would keep one of my sites from working properly (although it's such an obscure bug that I suspect it <em>only</em> affects my site) and an automatic upgrade in that instance would be devastating.  So I upgrade only when absolutely required.  Which means &ldquo;not often.&rdquo;  And in the meantime, the maintainers of the package managers (<code>apt-get</code>, <code>emerge</code> and <code>yum</code> to name a few) break older installations.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090950">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221090950" class="permalink"><time datetime="2005-11-02T21:54:24">2005-11-02T21:54:24</time></a>
            </div>
            <div class="content"><p>Sean:  This <em>might</em> be a half-benefit from Debian in particular, since they're so slow to release new versions of the distro.  Debian has usually seemed pretty stable and solid to me, unless I switch over to a different branch or I build &amp; install something by hand.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090951">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.jm3.net/"><img src="http://disqus.com/api/users/avatars/jm3.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.jm3.net/">John Manoogian III (jm3)</a>
                </div>
                <a href="#comment-221090951" class="permalink"><time datetime="2005-11-03T03:14:38">2005-11-03T03:14:38</time></a>
            </div>
            <div class="content"><p>btw, can u please install netatalk on mudpit? al_x needs a weird mac-friendly font-server...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090952">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=a983bfcd4acb63164ec9e3648524a80f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">James</a>
                </div>
                <a href="#comment-221090952" class="permalink"><time datetime="2005-11-03T13:23:41">2005-11-03T13:23:41</time></a>
            </div>
            <div class="content"><p>Sean: The package managers in Fedora and Gentoo are pale imitations of the true power of the Dark Sid^W^W^WDebian (and since it's built on Debian, Ubuntu). The real heart of Debian is not just dpkg and apt, it's the Debian policy that ensures all packages work the same way, and the huge development community that tests all sorts of upgrades continually.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090955">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://boston.conman.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=bbb1c69b64019a3df907c3545186f907&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://boston.conman.org/">Sean Conner</a>
                </div>
                <a href="#comment-221090955" class="permalink"><time datetime="2005-11-03T22:44:30">2005-11-03T22:44:30</time></a>
            </div>
            <div class="content"><p>I tend to have better luck with tarballs anyway (my only complaint there is chasing down the dependencies)&mdash;I've even had problems with the CPAN auto-install Perl modules module (it has just <em>never</em> worked for me).</p>

<p>If it's any indication, I'm <em>still</em> running RedHat 5.2 at home (only with the latest SMB, Perl, Apache 1.3 <em>and</em> 2.0, &amp;c.).  My system at home works, and if it ain't broke, I don't fix it.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090956">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://kennethhunt.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=655dea1e6d527e0ee88bff9c01c1b1ab&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://kennethhunt.com">Kenneth</a>
                </div>
                <a href="#comment-221090956" class="permalink"><time datetime="2006-11-29T22:35:58">2006-11-29T22:35:58</time></a>
            </div>
            <div class="content"><p>hell yeah! debian rocks, I'm on Sarge for a production server, and it is so nice to be able to add new functionality with a simple aptitude install some-application-here...</p></div>
            
        </li>
    
        </ul>
    
        </div>
    