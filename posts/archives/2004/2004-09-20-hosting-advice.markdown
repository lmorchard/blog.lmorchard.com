---
comments_archived: true
date: '2004-09-20T15:47:46-04:00'
layout: post
title: Hosting advice?
wordpress_id: 554
wordpress_slug: hosting-advice
wordpress_url: http://www.decafbad.com/blog/?p=554
---
Now that I've just moved over to this JohnCompanies hosting, I'm realizing several things:

* Virtual dedicated hosting on a shared box is not nearly the same as having your own box.
* While I mostly know what I'm doing, I do have a bit to learn about tweaking a linux server.
* I don't know a good deal in hosting when I see it.

Mainly, I think it's that whatever I'm doing with FeedReactor is intermittently killing this box.  But I suspect it's worse than that, though this surprises me since when last I used JohnCompanies, I was used to rock solid service-- so I have to assume the instability is my fault.  (I keep hitting memory limits that result in random failures and malloc denials.)

I've had several generous offers to host my experiments and I, but eventually, I think I should just rent my own dedicated hardware somewhere.  Anyone have some good advice on where and how much?

So far I'm looking at:

* <http://www.ev1servers.net/> (Thanks to [Imajes](http://imajes.info/))
* <http://www.serverbeach.com/>

Maybe someday soon I'll come up with something that would justify and fund decent hosting.  In the meantime, I'm hoping for something around US$100 or less that doesn't die all the time.

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084260">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.acetylene.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a91cc3f530193ccc9b218cd27bb04fcf&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.acetylene.net/">Nicholas Dunham</a>
                </div>
                <a href="#comment-221084260" class="permalink"><time datetime="2004-09-20T16:25:07">2004-09-20T16:25:07</time></a>
            </div>
            <div class="content">I've been using ev1 for a couple of years now. They're good, but if you're already worried about your ability to tweak a Linux server, they might not be the right host for you. They'll do basic support quickly and politely--but anything more involved (like figuring out why certain Perl scripts, such as SpamAssassin, occasionally cause my entire server to hang and require a hard reboot) is left up to you. You're the site administrator, and they'll charge extra for any significant degree of assistance--if they're able to provide it at all.

That said, if you're willing and able to do it yourself, they're an excellent deal. Just know what you're getting into first.</div>
            
        </li>
    
        <li class="comment" id="comment-221084261">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.ianbicking.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cc8334869c9d2a9e603017f2da805eb3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.ianbicking.org">Ian Bicking</a>
                </div>
                <a href="#comment-221084261" class="permalink"><time datetime="2004-09-20T16:33:23">2004-09-20T16:33:23</time></a>
            </div>
            <div class="content">I've used SmartHosting, and they are fine, but now they don't seem to have a $99 plan like they did before.

I was having all sorts of weird things happen to me on my virtual host, until I realized I hadn't enabled my swap, and out of memory errors cause weird and unexpected things to fail.  Once it's working properly, virtual hosts are really just like  real dedicated hosts, only slow and small.</div>
            
        </li>
    
        <li class="comment" id="comment-221084262">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://waxy.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9778692f86edb4232492de3be00ad578&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://waxy.org">Andy Baio</a>
                </div>
                <a href="#comment-221084262" class="permalink"><time datetime="2004-09-20T17:24:37">2004-09-20T17:24:37</time></a>
            </div>
            <div class="content">ServerMatrix gets you more bandwidth on a more powerful box for the same price as EV1, or less.  (I use EV1 myself, but I've heard good things about ServerMatrix.)</div>
            
        </li>
    
        <li class="comment" id="comment-221084265">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=d8f4c32ac7377db4144e066e1856ae54&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Brian</a>
                </div>
                <a href="#comment-221084265" class="permalink"><time datetime="2004-09-20T18:22:23">2004-09-20T18:22:23</time></a>
            </div>
            <div class="content">You DEFINITELY want to email John (linux@johncompanies.com) and ask him to raise your memory cap.  It's a software cap that tends to be pretty low by default, especially if you're doing anything Java-related or long-running.

John absolutely ROCKS in terms of support, so I'd definitely recommend working with him on the problems you're running into before jumping ship.  I was with JC for over a year before leaving for cost reasons.  Just tell him "look, I keep hitting these memory caps, and I'm going to have to look elsewhere for hosting if we can't resolve this."</div>
            
        </li>
    
        <li class="comment" id="comment-221084267">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.ntwizards.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cb564795a1912c36f9fa1399fd22ce29&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.ntwizards.net/">Bryce</a>
                </div>
                <a href="#comment-221084267" class="permalink"><time datetime="2004-09-20T18:32:13">2004-09-20T18:32:13</time></a>
            </div>
            <div class="content">ServerMatrix would be my first choice for dedicated hosting if I weren't employed by a competitor. EV1 and SB would not make my short list.

Make your own list, do your own due diligence. Check their support forums. Check their reputations at places like webhostingtalk.com.</div>
            
        </li>
    
        <li class="comment" id="comment-221084268">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8a5273f79cfe7579ad46023f93377aa8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">l.m. orchard</a>
                </div>
                <a href="#comment-221084268" class="permalink"><time datetime="2004-09-20T18:36:57">2004-09-20T18:36:57</time></a>
            </div>
            <div class="content">Brian: Well, I have actually done that already, and was told that my limits have been raised "significantly".  So, I'm still poking around to see what's up.  Looks like there's a control panel available to me now, so I can see various resource limits, and it looks like I'm still running one of them into the red, but I was told that that wouldn't be causing my problems.

Nonetheless, I've been killing off services and trying to keep that number lower.

In any case, I had a FreeBSD server at JC a year or two ago, for a year.. and I also switched for the cost, so I'm used to the great service :)  I think once I know a bit more, I'll have to bounce a few more emails their way</div>
            
        </li>
    
        <li class="comment" id="comment-221084269">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://george.hotelling.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c7d1c8d2b1a7643236a4661e9a974dee&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://george.hotelling.net/">George Hotelling</a>
                </div>
                <a href="#comment-221084269" class="permalink"><time datetime="2004-09-20T20:11:59">2004-09-20T20:11:59</time></a>
            </div>
            <div class="content">I went with Andy's ServerMatrix suggestion when I asked the same question and have been very happy with my service.  My only complaint was that they were a tad slow getting me set up, but since then nothing.  I get great throughput, low latency and more transfer than I know what to do with.</div>
            
        </li>
    
        <li class="comment" id="comment-221084270">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://admin.support.journurl.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5f89d3df08b8dedac1a0fde900a586db&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://admin.support.journurl.com/">Roger Benningfield</a>
                </div>
                <a href="#comment-221084270" class="permalink"><time datetime="2004-09-21T05:53:28">2004-09-21T05:53:28</time></a>
            </div>
            <div class="content">I can highly recommend ServerMatrix. I moved a bunch of stuff there almost a year ago, and have been 99% satisfied. (The 1% relates to some early growing pains when they were expanding their datacenters.)

The biggest plus with SM, though, is that they're actively customer-oriented. New deals, upgrades to existing accounts, and extra options pop up in their support forum all the time... and every member of staff that I've dealt with has been quite friendly and competent.</div>
            
        </li>
    
        <li class="comment" id="comment-221084271">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://gfmorris.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=901ef755790fbe0f71d1282e916a7e84&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://gfmorris.net/">Geof</a>
                </div>
                <a href="#comment-221084271" class="permalink"><time datetime="2004-09-21T11:36:05">2004-09-21T11:36:05</time></a>
            </div>
            <div class="content">SB isn't the world's greatest, no ... but they do okay.  I've used 'em for about nine months.  I'm moving primarily because my community's grown so that I need a dual CPU box [!].</div>
            
        </li>
    
        <li class="comment" id="comment-221084273">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://scottyallen.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=05b7697749fd4d887706110bb04149c4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://scottyallen.com">Scotty Allen</a>
                </div>
                <a href="#comment-221084273" class="permalink"><time datetime="2004-09-21T21:31:44">2004-09-21T21:31:44</time></a>
            </div>
            <div class="content">I second the many suggestions on Server Matrix.  I've got four boxees with them right now, and have nothing but good stories to tell. They seem to do everything right, for a really good price.  As Roger points out, they're definitely very customer focused, to the point they have a one-ring SLA on their NOC phone.  One ring on an 800 number, and you're not only talking to a warm person, but a warm person with a clue.

I've worked on a lot of ev1 servers, and have many, many horror stories to tell.  I've had to walk noc technicians through using ping, had newly commissioned boxes comprimised before I could even login (I logged in within 12 hours of the box being setup).  And I've heard really, really frightening stories of major security issues (like using one of the four major IM networks to shuttle customer box root passwords around).  They have good prices, and generally don't screw up too bad if nothing goes wrong with your box, but that's about it...</div>
            
        </li>
    
        <li class="comment" id="comment-221084275">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.ntwizards.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cb564795a1912c36f9fa1399fd22ce29&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.ntwizards.net/">Bryce</a>
                </div>
                <a href="#comment-221084275" class="permalink"><time datetime="2004-09-22T09:21:05">2004-09-22T09:21:05</time></a>
            </div>
            <div class="content">Thought I'd toss a few more things out at you:

0) Stock Apache installations are usually not tuned for low memory utilization. Try lowering all of the following settings: MinSpareServers, MaxSpareServers, StartServers, MaxClients, MaxRequestsPerChild. And get rid of any modules that you aren't using.

1) Most VPS / VDS / UML hosting companies will tell you upfront what your RAM limit will be and offer a number of service levels.

2) Consider going back to a BSD account. Typically they do not have fixed RAM allocations because they are not true virtual machines. I know for a fact that the iServer / Verio (ex-employer) VPS platform uses soft limits but their offerings cost more than many dedicated products. You already know that JohnCompanies has a BSD product, and I've heard good things about JVDS.

3) 1&1 offers managed dedicated servers without root access for $59-$109. If you're trying not to be a SysAdmin that may be a good option.</div>
            
        </li>
    
        <li class="comment" id="comment-221084276">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://jm3.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4a0577bc70bd8b9b1b2b2b20820ee4f9&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://jm3.net">jm3</a>
                </div>
                <a href="#comment-221084276" class="permalink"><time datetime="2004-09-23T11:13:22">2004-09-23T11:13:22</time></a>
            </div>
            <div class="content">i've always had good service with pair.com, but i'm not sure about their dedicated server programs. only used their shared services. they impress me, tho.</div>
            
        </li>
    
        </ul>
    
        </div>
    