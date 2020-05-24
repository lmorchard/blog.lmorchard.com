<p>Okay after the <a href="http://radio.weblogs.com/0101679/2002/04/14.html#a351">vote of confidence from Sam Ruby</a> about my thinking out loud about a <a href="http://www.decafbad.com/news_archives/000087.shtml#000087">"404 correction" proxy server</a>, I've been thinking more about writing a Radio-like desktop app server.  I want to do more than make a <a href="http://www.decafbad.com/twiki/bin/view/Main/DesktopWebsite">DesktopWebsite</a>, though.  I want to make a full-blown <a href="http://www.decafbad.com/twiki/bin/view/Main/PersonalServer">PersonalServer</a> app, capable of hosting things like a <a href="http://www.decafbad.com/twiki/bin/view/Main/PersonalMailServer">PersonalMailServer</a> and a slew of other little local web services &amp; etc.  I may end up giving up and working more within Radio, but <a href="http://www.decafbad.com/news_archives/000080.shtml#000080">as I noted before</a> I have some issues with Radio's performance and stability, which though balanced by my appreciation of the elegance of the system, is being gradually outweighed by my fears of lock-in and pre-existing experience with other technologies.  </p>
<p>Then again, this thing probably won't replace <a href="http://www.decafbad.com/twiki/bin/view/Main/RadioUserLand">RadioUserLand</a> for me.  I use it daily, I bought it, and it's not as exciting to reimplement what I already have.  Unless it is exciting.  Make any sense?</p>
<p>So, speaking of technologies... which ones should I use to start working on a personal server?  My main goals are mumbled <a href="http://www.decafbad.com/twiki/bin/view/Main/DesktopWebAppServer">over here</a>.</p>
<p>I've got a large amount of experience with Perl, and have written desktop apps with it for Mac OS X and Win32.  I'm having more fun with Python, however, and though I haven't written the same apps I imagine that it's on par with Perl.</p>
<p>The main thing I'm trying to decide right now is:  multi-threaded vs async/event-driven.</p>
<p>See, I need some sort of concurrency to handle multiple network server hits, multiple agents running, a scheduler, and whatever else wants to take up residence inside the <a href="http://www.decafbad.com/twiki/bin/view/Main/PersonalServer">PersonalServer</a>.  <a href="http://www.decafbad.com/twiki/bin/view/Main/RadioUserLand">RadioUserLand</a>, of course, has all of this.</p>
<p>I've worked a lot with <a href="http://poe.perl.org/">POE in Perl</a> to make some event-driven multitasking apps, a few servers (HTTP, FTP, NNTP, etc) and a few things to replace a fleet of forked scripts.  I've also started looking at <a href="http://www.twistedmatrix.com/documents/howto/ipc10paper">Twisted in Python</a> which I gather to be the analogous thing in their camp.  Not the same, but they both are using the same basic idea of event-driven programs.</p>
<p>The problem is that, to take code that you would have written for a forking or multi-threaded program, and make it play nice within the event-driven environment, there's a bit of re-think you need to do.  Loops need to be broken up into procedures, turned into self-running events, etc.</p>
<p>Hmm... trying to think of more re-think examples, but the main one I can think of is that long-running loops and processes need to be sliced and diced.  I seem to remember more pain than that.</p>
<p>Anyway, I'd rather use threads.  In threads, there needs to be a bit of re-think too, in terms of protecting resources from concurrency, but at least the main logic of my code can remain straightforward.  Perl doesn't have threads that I want to touch yet.  Python has threads, but I'm not sure how kosher they are.  Of course, there's always Java, but I want to avoid Java I think.</p>
<p>Anyone tuned in out there with any thoughts?  Mostly thinking out loud right now.</p>
<!--more-->
shortname=ooooio

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082996">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8c9c26bbf07df8085f59ae0f8982a3eb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Ashutosh</a>
                </div>
                <a href="#comment-221082996" class="permalink"><time datetime="2002-04-18T04:54:35">2002-04-18T04:54:35</time></a>
            </div>
            <div class="content">I've been playing around with exactly the same idea - of a PersonalWebServer with built-in scheduler, object database etc. And again, Perl is my comfort zone. And the lack of decent thread support has been a stumbling block. I have too much work done in top level apps in Perl to change over to Python or anything else.

Anyway, I used threads to invoke a scheduler thread and a http daemon thread as an experiment, and they seem to work pretty fine together.

I plan to keep the Perl object database (presently embedded in my top level apps - using Storable persistant objects indexed using an RDBMS for searches using pre-configured object attributes) as an external server, and plan to get the PersonalWebAppServer to talk to the database server using XML-RPC.</div>
            
        </li>
    
        </ul>
    
        </div>
    