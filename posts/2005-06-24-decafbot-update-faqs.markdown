---
comments_archived: true
date: '2005-06-24T00:27:39-04:00'
layout: post
title: decafbot update & FAQs
wordpress_id: 657
wordpress_slug: decafbot-update-faqs
wordpress_url: http://www.decafbad.com/blog/?p=657
---
So, [decafbot][] has been an interesting experiment so far, especially for a 20 minute hack I didn't think would actually work.  So, I think I might try to keep this bot running and tinker some more.

First thing, it looks like the original [Infobot][] is abandoned, but there's a (slightly) more active fork named [Flooterbuck][].  I used to be a more active participant in #perl, so I used to be more up on these things, but oh well.  Eventually, I could explore another bot built from POE parts, or leave Perl altogether for a Python-based bot.  For now, though, [decafbot][] has been upgraded with [Flooterbuck][].  

And, you should know when you talk to [decafbot][] that your conversation may be monitored for training and quality assurance purposes.  I noticed a few people using more AIM-speakish language than the bot's probably used to seeing in the more peer-enforced literacy zone of #perl, so I might work in a few snarky factoids toward that end.  

That, and many people seemed to have trouble understanding what to say to the bot.  It occurs to me that most people learned how to interact with the #perl infobots by example--since most queries occurred in public, the more astute newbies in the channel would eventually pick up on what the bot did by watching regulars.  However, this instance of the bot is pretty much all-private all-the-time, so it's a bit different.

[Flooterbuck][] seems to have a *bit* more documentation around it, so maybe people dropping in to chat will have a little more success.  In any case, more tinkering to be done...


[flooterbuck]: http://flooterbuck.sourceforge.net/
[decafbot]: aim:goim?Screenname=decafbot&Message=help+index
[infobot]: http://www.infobot.org

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086940">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://suttree.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=6bb123eda79aeb10b804c6d4c643f69e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://suttree.com">duncan</a>
                </div>
                <a href="#comment-221086940" class="permalink"><time datetime="2005-06-24T09:43:36">2005-06-24T09:43:36</time></a>
            </div>
            <div class="content">If you're interested in a Python bot, I can recommend Grokitbot (and not just because I wrote it):

http://www.suttree.com/code/GrokItBot/</div>
            
        </li>
    
        <li class="comment" id="comment-221086941">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://singe.rucus.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=70f4c3580e61128421cd3899a2dcf6f1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://singe.rucus.net/">Dominic White</a>
                </div>
                <a href="#comment-221086941" class="permalink"><time datetime="2005-06-26T15:37:38">2005-06-26T15:37:38</time></a>
            </div>
            <div class="content">There has been a rewrite of infobot called Knab, it is far more extensible and can do much that you have done with decafbot nativley. The project page is up at http://sourceforge.net/projects/knab/.

I know the developer and we have been using it for several years quite successfully. The project page should be there soon.</div>
            
        </li>
    
        <li class="comment" id="comment-221086942">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://vhata.rucus.net/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d1c14684b5b66fa27d785c7eb54e0eaf&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://vhata.rucus.net/blog/">Jonathan Hitchcock</a>
                </div>
                <a href="#comment-221086942" class="permalink"><time datetime="2005-06-27T04:43:46">2005-06-27T04:43:46</time></a>
            </div>
            <div class="content">I got sick of infobot's very kludgy, very monolithic codebase, and rewrote a clone from scratch.  It's completely modular, and hot-pluggable - you can modify modules on the fly, and reload them without taking the bot down.  It's got all the original capabilities of infobot, and much more by now.  I'd be very interested if you tried it out?

http://sourceforge.net/projects/knab/</div>
            
        </li>
    
        </ul>
    
        </div>
    