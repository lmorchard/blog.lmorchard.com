---
comments_archived: true
date: '2006-05-09T22:19:16-04:00'
layout: post
tags:
- asides
title: iptables, port forwarding, and access from LAN-side
wordpress_id: 947
wordpress_slug: iptables-port-forwarding-and-access-from-lan-side
wordpress_url: http://decafbad.com/blog/2006/05/09/iptables-port-forwarding-and-access-from-lan-side
---
 <p>Nothing like firewall rules to make me feel like a moron.  I recently wiped and reinstalled <a href="http://openwrt.org/">OpenWRT</a> on my WRT54G router.  Before the wipe, I had firewall rules which forwarded port 80 to a web server on my home LAN behind the router.</p>
 <p>The nice part was that I could access that server both from outside and inside the LAN, using the external WAN IP.  I've got scraped RSS feeds and other HTTP accessible bits that I access from my laptop.  This laptop travels between work and coffee shop and home.  I like being able to subscribe to and point at these things by URLs that don't change.</p>
 <p>But now, after the wipe, I've got firewall rules which open the WAN port to the home LAN for access from outside - but not from inside.  I've lost the old rules, and the knowledge I had that let me build the rules has since paged out of my brain and been lost to the ether.</p>
 <p>I suppose I could try building a VPN to home again - or use some SSH port tunneling - but I'd really like to get this port forwarding working again.  Anyone know how this crud works?</p>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086482">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://beesbuzz.biz/"><img src="http://disqus.com/api/users/avatars/plaidfluff.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://beesbuzz.biz/">fluffy</a>
                </div>
                <a href="#comment-221086482" class="permalink"><time datetime="2006-05-10T03:59:14">2006-05-10T03:59:14</time></a>
            </div>
            <div class="content"><p>What does OpenWRT get you that the stock factory firmware doesn't?  Personally I've been very happy with the official firmware and it's nice easy web-based configuration which also happens to support everything I need out of a router (port forwarding, access control, QoS, etc.)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086484">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.kryogenix.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cbde212986000125ff4322c25c1e50ce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.kryogenix.org/">Stuart Langridge</a>
                </div>
                <a href="#comment-221086484" class="permalink"><time datetime="2006-05-10T09:04:12">2006-05-10T09:04:12</time></a>
            </div>
            <div class="content"><p>Just in case I'm a bit dim, why would you not refer to the machine by name? I appreciate the cleverness with IPs was a nice thing to do, but wouldn't it be easier to just call it home.decafbad.com wherever you are (and have that resolve to the internal IP address of the box inside the network and the external address outside)?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086485">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086485" class="permalink"><time datetime="2006-05-10T10:48:51">2006-05-10T10:48:51</time></a>
            </div>
            <div class="content"><p>fluffy:  Eh, OpenWRT lets me meddle, first of all (see <a href="http://decafbad.com/blog/2006/05/03/hacking-is-my-world-of-warcraft" rel="nofollow">this post</a>).. But, second, it's got some traffic shaping stuff I've been learning about, can run a VPN connection, and let's me SSH in to a screen session to check on some other machines at home.  Between this and my NSLU2, I don't have a PC home linux server anymore.  (Of course, I haven't checked out the factory firmware in awhile, so they may have made some updates I haven't seen.)</p>

<p>Stuart: I did just that at one point, by running a DNS proxy on the home LAN that gave an internal IP answer for the equivalent of home.decafbad.com - while the rest of the world saw the WAN address.  I think I did it with tinydns, but I seem to remember it was a pain in the butt for some reason.  I should check it out again.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086486">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://rasterweb.net/raster/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=db0fab74bcb564ebb09295498b892fb6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://rasterweb.net/raster/">Pete Prodoehl</a>
                </div>
                <a href="#comment-221086486" class="permalink"><time datetime="2006-05-10T14:37:10">2006-05-10T14:37:10</time></a>
            </div>
            <div class="content"><p>This is the reason I've got a wiki on my home network I store all the little notes and config stuff in. It's on the Linux box I never tinker with, so I'm sure not to wipe it out. (I also do some minimal backups as well in case of trouble.)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086488">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://emmott.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=229438c0ba2cbd0a465a2f4f0d80ea56&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://emmott.net">Kevan Emmott</a>
                </div>
                <a href="#comment-221086488" class="permalink"><time datetime="2006-05-10T15:43:26">2006-05-10T15:43:26</time></a>
            </div>
            <div class="content"><p>OpenWRT may offer this, but this is what I do with <a href="http://m0n0.ch/wall/" rel="nofollow">m0n0wall</a>, which I have running on one of those little dedicated <a href="http://www.pcengines.ch/wrap.htm" rel="nofollow">WRAP</a> boxes - it can run a <a href="http://img.m0n0.ch/screens/services_dnsmasq.png" rel="nofollow">DNS forwarder</a> for the internal boxes that are accessing the world. In other words, it runs as a DNS cache from whatever your external DNS is, and then can inject any custom entries you want. Then configure DHCP or any internal static IP boxes to point at the router as a DNS server. Then you can setup overriding rules for any DNS entries that refer to your home external IP.</p>

<p>You also stated you access it via your "external IP" - are you not using a dynamic DNS service like DynDNS to give your home an external domain? You could even then use a real DNS provider to make a nicer domain (say a subdomain of your website) be a CNAME pointing at the DynDNS entry. m0n0wall and many other routers also have <a href="http://img.m0n0.ch/screens/services_dyndns.png" rel="nofollow">DynDNS clients</a> built in. Who needs static IPs? You certainly don't if all you need is web and ssh access.</p>

<p>So for example, I may have an internal web server running at 192.168.1.10, with my external IP being 1.2.3.4. So I have home.cafgood.com as a CNAME pointing at cafgood.dyndns.com which gets automatically set to resolve to my external home IP (1.2.3.4). On my router, I then say home.cafgood.com equals the internal IP (192.168.1.10). From the outside, I would hit real DNS servers, get CNAME-pointed to DynDNS servers, which would point me at my external IP, and NAT points at the web server. From the inside, the overridden DNS forwarder would just point any internal request right at the web server.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086489">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086489" class="permalink"><time datetime="2006-05-10T15:58:22">2006-05-10T15:58:22</time></a>
            </div>
            <div class="content"><p>Okay, addendum summary:  I'm already using DynDNS to point at my home address, my external IP.  I've used a DNS cache that substituted a LAN IP for that domain name for LAN clients in the past and didn't like it.  Up until this week, my firewall rules allowed port 80 on my external IP to respond to traffic from the WAN and the LAN interfaces.  But now, those rules are gone and I don't remember what the magic invocation was in iptables.</p>

<p>Bah, I'll probably just end up going back to a DNS cache.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086491">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086491" class="permalink"><time datetime="2006-05-10T16:15:19">2006-05-10T16:15:19</time></a>
            </div>
            <div class="content"><p>Oh, holy hell.  I can't figure out the proper iptables arrangement - which still bugs me - but I did discover that my router's running <a href="http://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html" rel="nofollow">dnsmasq</a> and that the following line in <code>/etc/dnsmasq.conf</code> did the trick:</p>

<pre><code>address=/foo.dyndns.org/192.168.123.123
</code></pre>

<p>Still feeling like a moron.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086492">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.stoopiddog.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d832cc3658d6ca9c61f505c0b4811a0e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.stoopiddog.org">Heretic</a>
                </div>
                <a href="#comment-221086492" class="permalink"><time datetime="2006-05-17T03:43:36">2006-05-17T03:43:36</time></a>
            </div>
            <div class="content"><p>Feel like a moron no more :o)</p>

<p>I believe what you are looking for is something like the following two rules:</p>

<p>1.)  $IPTABLES -A FORWARD -i $EXTIF -o $INTIF -p tcp --dport 80 -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT</p>

<p>2.)  $IPTABLES -A FORWARD -i $EXTIF -o $INTIF -p tcp --dport 80 -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT</p>

<p>I hope that helps!</p>

<p>Heretic</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086493">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=17087019e470d4203b4179c3c66b2b7e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">0r</a>
                </div>
                <a href="#comment-221086493" class="permalink"><time datetime="2006-05-19T09:02:40">2006-05-19T09:02:40</time></a>
            </div>
            <div class="content"><p>iptables -t nat -A PREROUTING -p tcp -d 15.45.23.67 --dport 80 -j DNAT --to-destination 192.168.1.1-192.168.1.10</p>

<p>iptables -t nat -A POSTROUTING -p tcp --dst $HTTP<em>IP --dport 80 -j SNAT --to-source $LAN</em>IP</p>

<p>iptables -t nat -A OUTPUT --dst $INET<em>IP -p tcp --dport 80 -j DNAT --to-destination $HTTP</em>IP</p>

<p>Check http://iptables-tutorial.frozentux.net/chunkyhtml/x4013.html for explanations of the lines above. Another good reference is http://tldp.org/HOWTO/IP-Masquerade-HOWTO/index.html (and http://www.openbsd.org/faq/pf/rdr.html if you are on BSD). The DNS solution seems better since it won't harm your logging.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086495">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=e77ba1ca07df13cf11e2e10159f17d0e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">nystark</a>
                </div>
                <a href="#comment-221086495" class="permalink"><time datetime="2006-05-23T17:08:09">2006-05-23T17:08:09</time></a>
            </div>
            <div class="content"><p>i had the same issue after upgrading from rc4, the easy solution is to add a rule for your local subnet and have it forward to your destination.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086497">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8b21b5498a675b3567f68abd3a241fd0&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Bill Welch</a>
                </div>
                <a href="#comment-221086497" class="permalink"><time datetime="2006-11-08T13:41:42">2006-11-08T13:41:42</time></a>
            </div>
            <div class="content"><p>This web page has a working example.  I've included the link to give credit where it is due, and for context.</p>

<p><a href="http://forum.openwrt.org/viewtopic.php?id=4030" rel="nofollow">http://forum.openwrt.org/viewtopic.php?id=4030</a></p>

<pre>iptables -t nat -A prerouting_rule -d x.x.x.x -p tcp --dport 80 -j DNAT --to 10.0.0.2
iptables -A forwarding_rule -p tcp --dport 80 -d 10.0.0.2 -j ACCEPT
iptables -t nat -A postrouting_rule -s 10.0.0.0/24 -p tcp --dport 80 -d 10.0.0.2 -j MASQUERADE</pre></div>
            
        </li>
    
        </ul>
    
        </div>
    