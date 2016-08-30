---
comments_archived: true
date: '2005-10-25T12:28:01-04:00'
layout: post
tags:
- asides
- python
- xbox
- xbmc
- lazyweb
title: IPython as networked command shell on XBMC?
wordpress_id: 749
wordpress_slug: ipython-as-networked-command-shell-on-xbmc
wordpress_url: http://decafbad.com/blog/?p=749
---
Just in case it's already been done, or I don't get around do doing it, hear me oh [LazyWeb][lw]:  

I want to cobble together a version of [IPython][ip] (or at least an [InteractiveConsole][ic]) that runs on a network socket for access via telnet.  I then intend to upload this to my [XBMC-equipped Xbox][xb] and run it as a command shell there for access from my LAN.  It seems like an idea that should work, since XBMC packs a Python install.

[lw]: http://www.lazyweb.org/
[ip]: http://ipython.scipy.org/
[ic]: http://docs.python.org/lib/module-code.html
[xb]: http://decafbad.com/blog/2005/09/26/making-the-xbox-maker-friendly

<!-- tags: python xbmc xbox lazyweb -->

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087779">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://edey.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=6558a34bd2590143d0e945e7020b49bf&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://edey.org">mike</a>
                </div>
                <a href="#comment-221087779" class="permalink"><time datetime="2005-10-26T02:59:28">2005-10-26T02:59:28</time></a>
            </div>
            <div class="content"><p>I don't have such a toy to play with but I'm wondering why the question wasn't asked, and answered, with ssh+screen?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087782">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221087782" class="permalink"><time datetime="2005-10-26T03:36:57">2005-10-26T03:36:57</time></a>
            </div>
            <div class="content"><p>@Mike: Because XBMC doesn't run ssh+screen, only a Python interpreter embedded in an entertainment center media dashboard. (ie. Not an OS like Linux)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087784">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://thoughts.keenspace.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=adb573897a5fbaeda0d049a803a33c3f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://thoughts.keenspace.com/">kaolin fire</a>
                </div>
                <a href="#comment-221087784" class="permalink"><time datetime="2005-10-26T06:37:55">2005-10-26T06:37:55</time></a>
            </div>
            <div class="content"><p>when you say 'like telnet' you mean just opening up port 23 and listening on it and executing said instructions?  I don't know Python (though coincidentally I had to debug some 2-3yo python today; that was interesting), but I presume it makes it not-so-hard to open server sockets and listener sockets, and then execute the dynamic code in a readloop... but then I don't know XBMC beyond the above link you posted, so this is probably just all optimistic hot air. ;)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087786">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221087786" class="permalink"><time datetime="2005-10-26T10:44:00">2005-10-26T10:44:00</time></a>
            </div>
            <div class="content"><p>@kaolin: Oh, yeah, I think it would / will be about as easy as that.  I've just been too busy or lazy to have done it yet, and hoped that someone somewhere had already done something whizbangy with a Python shell-on-a-socket.  :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087789">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=740b38f7d90076fee1dd8aac4459b354&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Chris</a>
                </div>
                <a href="#comment-221087789" class="permalink"><time datetime="2005-10-27T11:50:52">2005-10-27T11:50:52</time></a>
            </div>
            <div class="content"><p>Perhaps PYRO (Python Remote Objects) is a choice, I might give it a try
on weekend (on my xbox of course). Though I cannot imagine any real use
so far.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087792">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=d7875f8cfd8ba9262bfff2bf6f6f9b35&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Itamar Shtull-Trauring</a>
                </div>
                <a href="#comment-221087792" class="permalink"><time datetime="2005-10-27T18:02:14">2005-10-27T18:02:14</time></a>
            </div>
            <div class="content"><p>twisted.conch lets you hook up a python interpreter to a telnet or ssh server (which are implemented in Python, of course).</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087794">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221087794" class="permalink"><time datetime="2005-10-27T19:18:32">2005-10-27T19:18:32</time></a>
            </div>
            <div class="content"><p>Hmm, it's been a year or so since last I tinkered with Twisted...  It's tempting, since I remember all the nifty toys I played with in that environment-- and an Xbox with XBMC is just the place for it, since it doesn't have a shell or much OS infrastructure.  Though, I was kinda looking for something that used the core Python modules so I didn't have to plunk down a lot of code on the HD.</p>

<p>On the other hand...  Twisted could let me do a lot of things on that little box without installing Linux.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087796">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://highearthorbit.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a25421f6c79d5f381fab65c82abf85e8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://highearthorbit.com">Andrew</a>
                </div>
                <a href="#comment-221087796" class="permalink"><time datetime="2005-11-13T23:17:37">2005-11-13T23:17:37</time></a>
            </div>
            <div class="content"><p>What about looking at Nokia's Python btconsole. I run the python script on my phone, and then open a screen to the /dev/tty.NokiaBTSocket and am presented with a console on the phone itself.</p>

<p>I imagine you could grab the btconsole.py or simplebtconsole.py and set it up on XBMC. Depends on what modules are available.</p>

<p>I'm running a REALLY old version of XBMP (predecessor/sibling to XMBC) and have happily been running Xebian and MythTV frontend. However, recently came across the MythTV front-end with XMBC as well as all these new features so will upgrading it myself. However, the fiance' doesn't much like me messing with her "Tivo".</p></div>
            
        </li>
    
        </ul>
    
        </div>
    