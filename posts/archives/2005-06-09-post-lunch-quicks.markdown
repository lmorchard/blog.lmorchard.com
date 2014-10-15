---
comments_archived: true
date: '2005-06-09T14:06:08-04:00'
layout: post
title: Post-Lunch Quicks
wordpress_id: 648
wordpress_slug: post-lunch-quicks
wordpress_url: http://www.decafbad.com/blog/?p=648
---
* The [BBS Documentary][bbs] rocks, and it needs to be running on something like PBS.  Although I can understand many people will balk at the $50, it's really rather under-priced.

* I wish the Activity Monitor on OS X Tiger allowed you to [renice][] processes.  I wonder if there's something QuickSilver could do about this?  Like renice the foreground app, or renice a selected app as a second-pane verb?

* There's a utility I use from the shell on OS X that thankfully still works on Tiger.  I found it hidden in [Proteron MaxMenus][mm], [via an macosxhints hint][drg] I read a few years ago.

  In a nutshell, it initiates drag-and-drop from the shell.  I type this:
  
  `drg some_random_podcast.mp3`

  And, in a few seconds, a ghostly icon of the file appears under my mouse, ready to be dragged into iTunes.  

  Funny thing is, I've never actually used MaxMenus much, having gone the route of LaunchBar and QuickSilver for task accelleration.  But, this little utility binary is hidden under the following long-winded path when MaxMenus is installed for the current user:

    `~/Library/PreferencePanes/MaxMenus.prefPane/
     Contents/Resources/MaxMenus.app/Contents/Resources/ MarsNeedsWomen`

  I suppose I could get into the habit of using QuickSilver from the command line for a more flexible and integrated experience.  Or, I could check out the shareware [CLIDrag][cli].  But, this is just a habit I've had since I first switched to Mac after the release of OS X, and I've been careful to keep this binary backed up through the half-dozen or so complete reinstallations I've done since then.

[cli]: http://www.ittpoi.com/drag/
[mm]: http://www.proteron.com/maxmenus/
[drg]: http://www.macosxhints.com/article.php?story=20021220062633569

[renice]: http://www.osxfaq.com/man/8/renice.ws
[bbs]: http://www.bbsdocumentary.com/order/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084684">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://naeblis.cx/rtomayko/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=abfc88b96ae18c85ba7aac3bded2ec5e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://naeblis.cx/rtomayko/">Ryan Tomayko</a>
                </div>
                <a href="#comment-221084684" class="permalink"><time datetime="2005-06-09T15:33:05">2005-06-09T15:33:05</time></a>
            </div>
            <div class="content">QuickSilver has basic support for renicing processes. Select the application in the first pane and then tab over to the list of stuff you can do. If the app is running, you should see "Raise Priority" and "Lower Priority" commands. I've never actually checked to see at what interval they change the nice value (-|+5 maybe?). Also, this only works for OS X Application type processes for some reason (e.g. you can't renice apache or slocate or what-have-you). 

I usually lower the priority of Newsfire, Adium, and Skype - although I'm not sure I've seen any drastic results from this. I got used to nicing crap around when I was really poor and dealing with a P300 Linux Desktop box years back. It's a habit that sticks with you, eh? :)</div>
            
        </li>
    
        <li class="comment" id="comment-221084687">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=eb7f2a3ba74af37415ab7df101a86c75&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m. orchard</a>
                </div>
                <a href="#comment-221084687" class="permalink"><time datetime="2005-06-09T15:41:56">2005-06-09T15:41:56</time></a>
            </div>
            <div class="content">It ccould just be me, but it seems to help things out on my little 867Mhz PowerBook G4, especially when NetNewsWire starts in on its usual refresh cycle.

However, I'm not seeing these actions in my QuickSilver, and I think I have the latest version.  I seem to remember at one point, QS had a "super secret" bleeding-edge mode you could enable...  I've got it set at beta, but is there something I'm missing?</div>
            
        </li>
    
        <li class="comment" id="comment-221084688">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://naeblis.cx/rtomayko/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=abfc88b96ae18c85ba7aac3bded2ec5e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://naeblis.cx/rtomayko/">Ryan Tomayko</a>
                </div>
                <a href="#comment-221084688" class="permalink"><time datetime="2005-06-09T17:42:39">2005-06-09T17:42:39</time></a>
            </div>
            <div class="content">Hmm. I don't remember doing anything special. Maybe they are added by a plugin or something? I hunted around the preferences but nothing jumped out at me. I don't have Beta mode turned on either; it's set to "Standard".</div>
            
        </li>
    
        </ul>
    
        </div>
    