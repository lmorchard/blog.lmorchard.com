---
comments_archived: true
date: '2005-09-27T09:21:02-04:00'
layout: post
tags:
- asides
title: SSH and screen, better together
wordpress_id: 698
wordpress_slug: ssh-and-screen-better-together
wordpress_url: http://decafbad.com/blog/?p=698
---
I've just recently put some pieces together in my head, and have found this to be a very useful invocation to run in a Terminal window on my PowerBook:

`while [ 1 ]; do ssh -t home '/usr/sbin/screen -R work'; done`

*(**Update:** Thanks to a [comment by Leland Johnson](http://decafbad.com/blog/2005/09/27/ssh-and-screen-better-together#comment-2052), I've realized that the above just poorly reinvents [autossh](http://www.harding.motd.ca/autossh/).  Use it instead.)*

Behind the scenes, here's what's up:

* `home` is a host defined in my `~/.ssh/config`;
* `work` is a persistent [`screen`](http://www.gnu.org/software/screen/) session I have running there;
* The `-t` option for `ssh` is key for making `screen` work;
* I have several forwarded ports set up to enable things like IRC and sometimes HTTP proxied through a home machine;
* I have ssh-agent running in order to ensure I never have to enter a password; 
* The `while` loop runs forever, so that whenever my `ssh` connection drops—say when I go from home to work or vice versa—it gets reestablished as soon as possible.

The end result is that I always have a window with a few shells open on a machine at home, as well as a slew of ports tunneled to machines back home to provide a rough sort of VPN.  The connection is usually reestablished and waiting by the time I've gotten settled and get around to visiting that window.

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086054">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://naeblis.cx/rtomayko/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=abfc88b96ae18c85ba7aac3bded2ec5e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://naeblis.cx/rtomayko/">Ryan Tomayko</a>
                </div>
                <a href="#comment-221086054" class="permalink"><time datetime="2005-09-27T14:28:36">2005-09-27T14:28:36</time></a>
            </div>
            <div class="content"><p>A great tip.</p>

<p>Speaking of this, I was messing around the other day and found that it's really easy to create VIPs in OS X. Combine your above example with <a href="http://www.bigbold.com/snippets/posts/show/763" rel="nofollow">these directions for creating VIPs</a> and you can set up a pretty functional VPN. I create VIPs for the hosts that are most interesting at work and have a custom hosts file map the work hostnames to the local IPs. Then when I open the tunnel with ssh I bind to the VIP IPs. It takes a little while to set everything up but the result is very nice. </p>

<p>I'm in the process of building up a simple config file syntax for specifying which hosts/ports should be tunneled and a little script that does all the dirty work of creating the VIPs and opening the ssh connection.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086056">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086056" class="permalink"><time datetime="2005-09-27T14:38:59">2005-09-27T14:38:59</time></a>
            </div>
            <div class="content"><p>Hmm...  I see how to create a VIP, but what do you do with it once you have it—with respect to SSH tunnels, that is?  Could you stick an SMB tunnel there on port 139, say, and keep it separate from port 139 on localhost?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086058">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086058" class="permalink"><time datetime="2005-09-27T14:40:46">2005-09-27T14:40:46</time></a>
            </div>
            <div class="content"><p>Oh, duh, that's exactly what your links says:</p>

<blockquote>
  <p>Now you have another IP that you can bring stuff up on that won't collide with other stuff running on the same port.</p>
</blockquote></div>
            
        </li>
    
        <li class="comment" id="comment-221086059">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://naeblis.cx/rtomayko/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=abfc88b96ae18c85ba7aac3bded2ec5e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://naeblis.cx/rtomayko/">Ryan Tomayko</a>
                </div>
                <a href="#comment-221086059" class="permalink"><time datetime="2005-09-27T15:33:43">2005-09-27T15:33:43</time></a>
            </div>
            <div class="content"><p>Right, right. Basically I can make it look like a small subset of the work LAN with just VIPs, hosts file modification, and ssh tunnels.</p>

<p>So say I have two boxes at work - <code>work-box-1</code> and <code>work-box-2</code>, running SMB and a web server, respectively. I create a host file that points the host names to IPs on my home lan: </p>

<p><code>/etc/hosts.ssh-vip-vpn</code>:</p>

<pre><code> 192.168.1.130  work-box-1
 192.168.1.131  work-box-2
</code></pre>

<p>Next, I have a little script that ups the VIPs using ifconfig, symlinks the hosts file, and opens the tunnels:</p>

<p><code>~/bin/open-vpn</code>:</p>

<pre><code>#!/bin/bash
ifconfig en1 inet 192.168.1.130 netmask 255.255.255.255 alias
ifconfig en1 inet 192.168.1.131 netmask 255.255.255.255 alias
ln -s /etc/hosts /etc/hosts.ssh-vip-vpn
ssh -L192.168.1.130:445:real-work-ip1:445 \
      -L192.168.1.130:137:real-work-ip1:137 \
      -L192.168.1.131:80:real-work-ip2:80 external-work-hostname
</code></pre>

<p>The cool thing is that everything pretty much looks exactly as it does at work. It's quite a lot to maintain and a real VPN would be a ton easier but what fun is that?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086061">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221086061" class="permalink"><time datetime="2005-09-27T15:43:38">2005-09-27T15:43:38</time></a>
            </div>
            <div class="content"><p>Just <abbr title="for what it's worth">FWIW</abbr>, the idiomatic way to express an infinite loop in <i>sh</i> is</p>

<pre><code>while : ; do foo ; done
</code></pre>

<p>According to <code>bash(1)</code>:</p>

<blockquote>
<pre><code>: [arguments]
</code></pre>
  
  <p>No effect; the command does nothing beyond expanding arguments and performing any specified redirections. A zero exit code is returned.</p>
</blockquote></div>
            
        </li>
    
        <li class="comment" id="comment-221086062">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086062" class="permalink"><time datetime="2005-09-27T15:51:50">2005-09-27T15:51:50</time></a>
            </div>
            <div class="content"><p>Ryan: Swank--I'll have to tinker around with this bit of scripting to see how I can improve my masochistic semi-VPN :)</p>

<p>Aristotle:  Thanks for the pointer.  I think <code>while [ 1 ]</code> is just one of those things I came to by trial-and-error.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086063">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221086063" class="permalink"><time datetime="2005-09-27T16:08:08">2005-09-27T16:08:08</time></a>
            </div>
            <div class="content"><p>Ryan: try <a href="http://vtun.sourceforge.net/faq.html#1.23" rel="nofollow">vtun over SSH</a>. It's a dead simple VPN system. There's a page on <a href="http://www.shiftmanager.net/~kurt/VTUN_ON_OSX/VTUNonOSX.html" rel="nofollow">running vtun on OS X</a>, though I don't know if it's up to date.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086065">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://protoplasmic.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2f48d49d2fc2baa2d6ea8e7e8bee1d7c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://protoplasmic.org/">Leland Johnson</a>
                </div>
                <a href="#comment-221086065" class="permalink"><time datetime="2005-09-27T21:56:22">2005-09-27T21:56:22</time></a>
            </div>
            <div class="content"><p>Why not use <a href="http://www.harding.motd.ca/autossh/" rel="nofollow">autossh</a>? Instead of waiting for the connection to time out, it will know almost immediately. It also includes a script for doing exactly the same thing you do here (except with autossh of course).</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086068">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086068" class="permalink"><time datetime="2005-09-27T22:45:33">2005-09-27T22:45:33</time></a>
            </div>
            <div class="content"><p>Leland: Well, hey, whadda ya know?  I'd never seen <code>autossh</code> before—it looks like exactly what I need.  And it compiled on my PowerBook.  Thanks for the pointer!</p>

<p>I think I like this blogging thing.  :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086070">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://enduringvoices.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5d833a456f8dc70c9a48f7f242880212&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://enduringvoices.com">Nathan Nutter</a>
                </div>
                <a href="#comment-221086070" class="permalink"><time datetime="2005-09-29T02:06:45">2005-09-29T02:06:45</time></a>
            </div>
            <div class="content"><p>I don't understand what you use this or autossh for could you please explain how it works?</p>

<p>Do you run it on the computer you want to connect to or on the computer you are connecting from? I understand the screen part, that just allows your terminal session to keep running when the terminal is disconnected. Why do you need to force on this persistent connection?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086072">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086072" class="permalink"><time datetime="2005-09-29T02:39:14">2005-09-29T02:39:14</time></a>
            </div>
            <div class="content"><p>Nathan: Well, the thing is that I'm doing all of this on a PowerBook which travels with me between home / work / coffee shop.  I close it up, leave home, open it up on a new network.  Repeat at least twice a day.</p>

<p>What autossh does is start an SSH connection and monitor it continuously to be sure it's up.  If the connection ever goes down, autossh starts it up again.</p>

<p>So, instead of the usually SSH command to connect to a server at home, I use autossh.  When I open my PowerBook in a new location, autossh sees that it's lost the connection to home and automatically reconnects.  This way, I always have a terminal window to home—along with a handful of forwarded ports—even after travelling between networks.  And, since I'm running <code>screen</code> at home, everything I was doing before travelling is all in the same state I left it.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086074">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://enduringvoices.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5d833a456f8dc70c9a48f7f242880212&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://enduringvoices.com">Nathan Nutter</a>
                </div>
                <a href="#comment-221086074" class="permalink"><time datetime="2005-09-29T03:27:56">2005-09-29T03:27:56</time></a>
            </div>
            <div class="content"><p>OK, Thank you. So it just saves you the hassle of having to reconnect to your remote session manually.</p>

<p>You might look at this program <a href="http://www.leapingbytes.com/almostvpn" rel="nofollow">AlmostVPN</a>. I have been trying to figure out how to use it because my school has a server that us students are allowed to use to compile things and what not. But it also stores all our files on it so I have been trying to setup [AlmostVPN][2] to forward the Apple File Share that has our home directories on it. Unfortunately, I have not gotten it to work yet, but that is mostly because I have very limited knowledge of SSH. I use it in place of telnet but that is all I know how to do right now.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    