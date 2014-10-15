---
comments_archived: true
date: '2006-08-24T08:58:04-04:00'
layout: post
tags:
- webdev
- amazon
- s3
- ec2
- webservices
title: Amazon EC2 emerges
wordpress_id: 984
wordpress_slug: amazon-ec2-emerges
wordpress_url: http://decafbad.com/blog/2006/08/24/amazon-ec2-emerges
---
<blockquote cite="http://www.amazon.com/b/ref=sc_fe_c_1_3435361_1/002-3833110-2752034?ie=UTF8&node=201590011&no=3435361&me=A36L942TSJ2AJA"><p>Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides resizable compute capacity in the cloud. It is designed to make web-scale computing easier for developers.
</p><p>
Just as Amazon Simple Storage Service (Amazon S3) enables storage in the cloud, Amazon EC2 enables "compute" in the cloud.</p></blockquote><div class="quotesource">Source: <a href="http://www.amazon.com/b/ref=sc_fe_c_1_3435361_1/002-3833110-2752034?ie=UTF8&node=201590011&no=3435361&me=A36L942TSJ2AJA">Amazon.com Amazon Web Services Store: Amazon EC2 / Amazon Web Services</a></div>

This seems like the sound of the second shoe hitting the floor.  Although I tried signing up for this as soon as I saw the email, I was already too late to get in on the beta and start playing.  Maybe I'll get in on a second round.
  
EC2 seems a lot like [User Mode Linux][uml] virtual hosting, but it charges <del>by the CPU hour</del> by the hour of uptime instead of month-to-month.  I'll be very interested to see how this shakes out, and what sort of web app architecture it encourages when used in conjunction with S3 - say [AJAX-based queues][aq] for instance? - or if it just gets used as a straight [LAMP][] host in general.

[lamp]: http://en.wikipedia.org/wiki/LAMP_(software_bundle)
[uml]:http://user-mode-linux.sourceforge.net/
[aq]: http://weblog.infoworld.com/udell/2006/07/07.html

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088886">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.sencer.de"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0e94b4d4662542b91df48f0ff3b36d26&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.sencer.de">Sencer</a>
                </div>
                <a href="#comment-221088886" class="permalink"><time datetime="2006-08-24T15:27:46">2006-08-24T15:27:46</time></a>
            </div>
            <div class="content"><blockquote>
  <p>it charges by the CPU hour</p>
</blockquote>

<p>Just to prevent confusion: They call it instance hours and mean the hours a vm/instance has been running (independent of utilization). 
Only saying this, beause some hosts, like dreamhost, use(d) the term CPU-minutes for keeping track of "how much time a processor spends working for your username" and allow(ed) sth. like 60 CPU-minutes a day.</p>

<p>At least that's how I understand the amazon offer.</p>

<p>And thanks for the pointer! It'll be intereting to watch what people are going to come up with. Given that the instances are not "persistent", i.e. data is gone when you stop them (unless you move things int S3 or elsewhere), I am assuming that they <em>will</em> be used differently from regular dedicated machines. </p>

<p>It reminds a little bit of DSL (Damnsmalllinux) which boots/runs of a CD, but allows you to save all your data and customization to an external storage (usb/ftp/etc.) and does auto-restore when you boot into it again. This is nice for people afraid of viruses or getting hacked etc.. I wonder whether this will turn out to be a plus for amazons offer as well. At first it does make things a bit more complicated wrt to usual linux way. But I guess tose things can be solved...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088888">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221088888" class="permalink"><time datetime="2006-08-24T16:29:44">2006-08-24T16:29:44</time></a>
            </div>
            <div class="content"><p>Sencer: Actually, I think your reading is the right one.  It's charge per hour of uptime of the instance, and not a meter on CPU cycles.  
</p><p>
So, to do a quick napkin calculation - $0.10 per hour x 24 hours x 31 days = $74.40 per month to keep an instance running around the clock.  
</p><p>
That makes me think that applications using this service will need to be designed around some clever resource usage, either through scheduled tasks or some interesting way to respond on demand.  Simply running a straight PHP app would seem a bit wasteful in many small-scale cases.</p>

<p>If I were to run a blog from it, say, I'd lean more toward the Movable Type school of static publishing than the WordPress school of live PHP pages.  Of course, that could all be done from a behind-firewall personal desktop machine, so I need to think of a better example.</p>

<p>Then again, being able to add and drop instances at will is a big, big deal for larger scale applications.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088891">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.jonathanboutelle.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d77d55a352cc3dc84a86510094b2dde8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.jonathanboutelle.com">Jonathan Boutelle</a>
                </div>
                <a href="#comment-221088891" class="permalink"><time datetime="2006-08-24T17:12:09">2006-08-24T17:12:09</time></a>
            </div>
            <div class="content"><p>Let's see,  back of the envelope calculation ... that's a 10-machine cluster for 720$ /month + bandwidth. With redundant storage and firewall included. Holy crap! Web 2.0 apps just got a LOT cheaper to deploy.</p>

<p>I am also stuck in limbo land: they sent the email out at 3AM PST, which is just rude: a west-coast company should at least wait until California and Washington wakes up before sending out a limited beta. Methinks the geeks in NYC and boston and the research triangle got all the slots.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088893">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221088893" class="permalink"><time datetime="2006-08-24T17:57:58">2006-08-24T17:57:58</time></a>
            </div>
            <div class="content"><p>Jonathan: Yeah, I think your calculation is a better one.  Mine just reflects the fact that EC2 doesn't scale <em>down</em> to piddly little apps like I've been playing with.  But scaling up, it looks like a much better value.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088895">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://claimid.com/dne"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7cc1b40a65ed472663b1af1749e8fcb6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://claimid.com/dne">Daniel Néri</a>
                </div>
                <a href="#comment-221088895" class="permalink"><time datetime="2006-08-24T19:04:19">2006-08-24T19:04:19</time></a>
            </div>
            <div class="content"><p></p><p>It appears to be based on <a href="http://www.cl.cam.ac.uk/Research/SRG/netos/xen/" rel="nofollow">Xen</a>, judging from the sample hostnames in the <a href="http://docs.amazonwebservices.com/AmazonEC2/gsg/2006-06-26/" rel="nofollow">docs</a>.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088899">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.base4.net/Blog.aspx?ID=93"><img src="http://www.gravatar.com/avatar.php?gravatar_id=ef0b5680532c0e0fac2fe20ef4b01929&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.base4.net/Blog.aspx?ID=93">Alex James</a>
                </div>
                <a href="#comment-221088899" class="permalink"><time datetime="2006-08-25T11:27:19">2006-08-25T11:27:19</time></a>
            </div>
            <div class="content"><p>I agree, you need to band together with a couple of mates to make it worthwhile for really small sites. But at the high end it is amazing value. </p>

<p>Perhaps then there is an opportunity for someone to use EC2 based websites, you could easily create an sort of ISP or ASP model using this, by putting about 20 little websites/application servers on one Image. </p>

<p>BTW Jonathan... I'm from little old New Zealand and I managed to nab a slot!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088900">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.waituk.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=accdd07341577af9d82a220a8a0f5a2d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.waituk.com">Website Nepal</a>
                </div>
                <a href="#comment-221088900" class="permalink"><time datetime="2007-08-31T17:23:53">2007-08-31T17:23:53</time></a>
            </div>
            <div class="content"><p>I checked out the Amazon EC2 since I am planning to offer web hosting solution somewhat similar to what EC2 are doing.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    