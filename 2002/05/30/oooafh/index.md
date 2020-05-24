<p>Does anyone out there know of a workable, preferably free app for <a href="http://www.decafbad.com/twiki/bin/view/Main/WinXP">WinXP</a> with which I can launch and quit a program on a scheduled basis?  Starting to work my mad Google skillz to find this, but having a hard time coming up with search terms that give me good results.  See, Radio <a href="http://www.decafbad.com/twiki/bin/view/Main/UserLand">UserLand</a> demands too much CPU from any of the machines I currently own.  The desktop where I want to park it also serves as my PVR, and when it starts up to record a show, Radio keeps stealing CPU from the video encoding, and I end up with choppy and sometimes dead video.  I even tried screwing with priorities, and that only seems to help moderately.</p>
<p>So, I want to start up Radio, let it churn free.  Then just before a show comes on, I want to quit Radio.  I was doing this manually via a VNC connection from work, but that's just stupid.  The other alternatives I've tried are running it under Wine on my Debian Linux box, which doesn't <i>quite</i> seem to work happily, or to run Radio again on my OS X iBook, which seems to crush the poor thing.</p>
<p>I suppose my desktop PC is due for an upgrade, containing only a 600MHz Athlon (though 512MB of RAM), but I've been waiting on that.  Funny, the last time I upgraded, it was to run a few more games.  This time, its to make Radio happier.  :)</p>
<p>(<i>Addendum</i>: Hey, wait, Radio's an intelligent, reasonable platform...  I wonder if I couldn't just get it to shut <i>itself</i> down at a given time, and then have Windows launch it again.  I think the shutdown is the main issue, since Windows seems to come with a scheduler already for launching programs.)</p>
<!--more-->
shortname=oooafh

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221083168">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.10500bc.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2a158ec6895b9af4ce255febfe69ffee&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.10500bc.org">Josh Cooper</a>
                </div>
                <a href="#comment-221083168" class="permalink"><time datetime="2002-05-30T21:17:08">2002-05-30T21:17:08</time></a>
            </div>
            <div class="content">You can use PSkill from Sysinternals: http://www.sysinternals.com/ntw2k/freeware/pskill.shtml , Its free and it works like the unix kill, just pskill radio.exe and your done. I don't know if it messes with any radio files, but i don't think it will hurt it. I think you could use the windows scheudler to start it, i don't have XP but i prefer to use WinCron on my 2K boxes. So you could have WinCron schedule to start and stop it at given times.</div>
            
        </li>
    
        <li class="comment" id="comment-221083169">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=b7cd0c63edfc249685399a482df345d2&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">pn</a>
                </div>
                <a href="#comment-221083169" class="permalink"><time datetime="2002-05-30T21:19:10">2002-05-30T21:19:10</time></a>
            </div>
            <div class="content">you can use perl on win32 to kill arbitrary processes.  i use a scheduled process using the windows scheduler to launch a perl program that kills certain processes.

http://www.xav.com/perl/site/lib/Win32/Process.html</div>
            
        </li>
    
        <li class="comment" id="comment-221083173">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=ebb1f73c56f5710b685d2c619aa67a4d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Matthew Ernest</a>
                </div>
                <a href="#comment-221083173" class="permalink"><time datetime="2002-05-30T22:42:52">2002-05-30T22:42:52</time></a>
            </div>
            <div class="content">"fileMenu.quit()" is the bit of UserTalk that, as one might guess, closes Radio as if you has selected Quit from the File menu.

I called that as a macro from a file named "die.txt" that I put under "c:\program files\Radio Userland\www\system". If I then hit the url "http://127.0.0.1:5335/system/die", Radio will close itself. 

Be sure not to put it in a directory that gets rendered and upstreamed (like I had at first), or else when Radio looks at it to try to render the file the app will close. I suppose that someone who knows what the hell XML-RPC is could put that over in the Web Services folder so that you could make a call to it in a saner fashion.</div>
            
        </li>
    
        <li class="comment" id="comment-221083180">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.pycs.net/devlog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=83fb71394815ceacae87e153d1638531&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.pycs.net/devlog/">Phil</a>
                </div>
                <a href="#comment-221083180" class="permalink"><time datetime="2002-06-05T21:24:57">2002-06-05T21:24:57</time></a>
            </div>
            <div class="content">I wonder if pushing Radio's priority down a bit would help.  I'm coding a DirectX app at the moment that is really jittery when Radio is running at normal priority, but taking Radio down to 'BelowNormal' makes it run fine.

'course, it won't do much for the responsiveness of Radio's web server :)</div>
            
        </li>
    
        </ul>
    
        </div>
    