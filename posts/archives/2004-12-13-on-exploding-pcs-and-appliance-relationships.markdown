---
comments_archived: true
date: '2004-12-13T15:28:56-05:00'
excerpt: I've already ditched a central desktop computer, and sometimes
    this makes me feel like I'm living in the future.
layout: post
title: On Exploding PCs and Appliance Relationships
wordpress_id: 577
wordpress_slug: on-exploding-pcs-and-appliance-relationships
wordpress_url: http://www.decafbad.com/blog/?p=577
---
One thing I'm really looking forward to is seeing the PC explode and turn inside out, like the [Home Motor](http://www.google.com/search?q=+%22Home+Motor%22+%248.75+catalog+-domain&#38;btnG=Search).  The price of processors drops, while their power increases.  So far in computing, the processor has been a pricey central resource, demanding to be shared between programs and peripherals.  But soon, it won't be too far fetched to think of a processor as the least precious part.  In fact, computers could get so cheap as to be given away, while well-built tools and appliances--more than just *software* alone--become the valuable thing.  

I've already ditched a central desktop computer, and sometimes this makes me feel like I'm living in the future.  I used to have a machine that I used for everything-- network services, web browsing, email, IM, file storage, movies, games, et al.  However, slowly but surely, all the things this one machine used to do for me are being split off into simpler, dedicated devices.  It's like all the internal organs of my old PC are being splattered throughout our apartment.

At some point, my network services migrated into a dedicated Linux box, and now have gotten swallowed up by a [Linksys WRT54G](http://www.linksys.com/products/product.asp?prid=508&#38;scid=35) wireless router.   It doesn't do anything other than perform firewall duties and manage my home network.  The Linux box still lives on as a file server, but pretty soon I'll be migrating those responsibilities onto a [Linksys NSLU2](http://www.newegg.com/app/viewProductDesc.asp?description=33-124-036&#38;catalog=23&#38;manufactory=BROWSE) Network Storage Link or maybe a [Kurobox](http://www.revolutionstore.com/).  Which ever one I choose, that device will focus on managing my digital *stuff*.  In our living room, we've got a slew of dedicated gaming consoles, including a modded XBox that plays music and movies from the file server in the basement.  

What's great about this is that each device generally does just one thing, does it well, and does it without much fuss or interference with the workings of the other devices.  My internet connection or file server never goes down because a game crashed my computer, and maintenance of these focused devices is much simpler than looking after a single overloaded computer.  My primary personal machine at this point is an Apple PowerBook, which I still use for web, email, IM, general geek hackery, and the occasional session with Microsoft Office.  It's just a start, but I'm sure this trend will continue as I find more things that can each be specialized out into its own separate appliance.  

For instance, imagine an Office appliance: It wouldn't have much file storage--that's what my basement fileserver is for--but it would have more than enough memory and processor to run Office.  The whole Office *solution* (software, support, etc.) would be more valuable than the hardware to run it, so it might be simpler and easier for everyone involved (ie. the customer *and* Microsoft) to sell a fully configured and self-contained unit.  The Office user interface would be served up to my tablet display (maybe with a keyboard &#38; mouse) via something akin to X11.  The software would be installed as firmware on flash and would be the only thing running--no danger of DLL hell here.  

Imagine something like the [MailStation](http://www.aarp.org/computers-hardware/Articles/a2003-05-20-mailstation.html), but imagine it not sucking.  You could have a personal email server that just handles SMTP, IMAP, POP3, and spam filtering, with [Thunderbird](http://www.mozilla.org/products/thunderbird/) installed, dirt cheap.  

Imagine other devices entirely devoted to news aggregation, or broadcatching, or pet-watching web cams.  It's starting to sound like a lot of expensive toys, but a pile of these devices would all cost less than the equivalent software running on a modern PC today.

Now, think about interactions between appliances.  This isn't entirely fleshed out in my head, but I think attention here can go a long way toward solving some security issues present in PCs today.  Each appliance should be single-mindedly focused on its task, but if it needs functionality provided by another appliance, it should be able to negotiate for services.  Think of each appliance as having a role, and access to other appliances limited by role.

What might happen if you pick up a nasty macro in a Word doc?  Say the macro wants to delete all of your files.  Well, you could have a current relationship between the file server and the Office appliance which limits access to only files in your current project.  The Office appliance would have no business pawing through yesterday's spreadsheets, your TurboTax records, or your home videos.  Maybe not perfect, but exposure could be limited.  

Say instead the macro wants to fire off a million spam email messages.  Well, let's assume that email isn't a service of the Office appliance.  The first response to the macro would be, "Uhh, what's email?"  Maybe the Office appliance can't even conceive of a such thing as SMTP or port 25.  But then, say the macro author is smart enough to make Office look for a MailStation to ask for email transmission services.  At this point, the macro is stymied unless it can find a way to exploit a pre-existing relationship between Office and the MailStation to send a million email messages.

More likely would be someone trying to compromise the MailStation via a maliciously-constructed email message.  But, in this case, maybe the single-task simplicity of the device would make it easier to prevent such exploit availability in the first place.  Avoid scriptable email transmission in a consumer device, watch out for buffer overruns or use managed code and virtual machines, reduce down to zero any possibility of sending an email without direct user input.

There's a lot of work that would need to be done here to get the right balance between inter-appliance paranoia and end-user convenience, but I think that simpler task-focused devices isolated from each other but linked by task-centered agreements could go a long way toward killing the free-for-all playground environment spyware and virus authors have today.  Get all of the eggs out of one shared basket.  I expect some of the things I'm thinking could be (and probably are) put in place today on general-purpose computers, but I have a lot of good hunches about benefits imparted by lots of simpler limited-purpose appliances.

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086734">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.furrygoat.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=95ffb2598210ed1959f55d7a53f825dc&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.furrygoat.com">Steve</a>
                </div>
                <a href="#comment-221086734" class="permalink"><time datetime="2004-12-13T17:27:05">2004-12-13T17:27:05</time></a>
            </div>
            <div class="content">TOTALLY agree on your thoughts on where computers/appliances will merge.

I had the NSLU2, but just ordered this guy: http://www.furrygoat.com/2004/12/asus_wlan_hard_.html .. It's a HD enclosure with 802.11g/Lan/USB, but, here's the neat bit: supports UPNP (more here: http://www.tomsnetworking.com/Reviews-179-ProdID-WLHDD25-2.php) - I'm wondering if it will support the home electronics upnp so you can stream photos/videos/etc to a consumer player from it.

Of course, the firmware is GPL, so I'm sure someone will hack out an iTunes/Tivo/etc server for it.</div>
            
        </li>
    
        <li class="comment" id="comment-221086735">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.sencer.de"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0e94b4d4662542b91df48f0ff3b36d26&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.sencer.de">Sencer</a>
                </div>
                <a href="#comment-221086735" class="permalink"><time datetime="2004-12-13T18:24:41">2004-12-13T18:24:41</time></a>
            </div>
            <div class="content">>What’s great about this is that each device 
>generally does just one thing, does it well, and 
>does it without much fuss or interference with 
>the workings of the other devices.

I think you are throwing together a couple of unrelated things here. The Router could swallow up your Linux Box, because the Router is supposed to do work in the background, it doesn't want interaction, this does not work for most of the things a PC is used for. I would say that the most interesting things "being done" with a PC actually need interaction (and thus an interface), the "dumb" background things are usually just supportive (or secondary) activities that are, well, secondary, and only ever have arisen as sub-tasks while trying to achieve primary purposes (things that require interaction).

All those primary purposes of a PC are interaction based, thus need display and input, and I don't think that people are willing to move to different displays and different input devices for every task they want to do. We have a lot of "legacy devices", that we are using a lot, because that's what we are used to, but I don't think they are going to multiply further, when we already have all the stuff at our fingertips.

I would like to note that you are using a hacked X-Box, that is a specialized tool, re-programmed to be a (more) general purpose tool. 
The fact that all of your machines are doing different things are self-imposed barriers, not hardware/software-limitations, which I think would makes a lot of people very skeptical.</div>
            
        </li>
    
        </ul>
    
        </div>
    