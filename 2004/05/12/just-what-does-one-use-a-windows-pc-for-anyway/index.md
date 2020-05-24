Huh.  Having just read [Jeremy Zawodny's account][account] of how easy it was for him to move everything over from one PowerBook to another, and wondering if Windows would ever offer that ease, has me wondering why I bothered to re-install WinXP on my aging desktop PC.  Not quite the same thing, but it's making me appreciate the Windows-free life we've been living at home here.

I had been running Debian Linux on the box, and it mostly served as a file server and a workbench for various experiments.  Well, I got the bright idea that I might be able to get most of the same benefits, and get my [TV capturing][tv] working again, by reverting to WinXP along with an installation of [coLinux][colinux] and / or [Cygwin][cygwin].  Oh yeah, and I'd be able to play a few [old games][subspace] I'd [been missing][ut] too!  Also, I keep meaning to play with the .Net framework and Virtual PC on my PowerBook just hasn't worked out so well.

Well, the first thing I bumped into was that the big drive I was using for file serving was formatted as ext2.  Not really a good option for WinXP.

So, I started playing with [coLinux][colinux] with some interesting results.  Managed to get it up and running with a [Gentoo Linux][gentoo] image, and then I discovered that [coLinux][colinux] could mount the ext2 partition directly from the WinXP device path.  One installation of Samba later, and I was mounting the ext2 partition under Windows.  Unfortunately, I now had this poor machine loaded down with both Windows *and* Linux at the same time.  NeatLikeDigitalWatches, at least for this underpowered machine.

So, I shut down [coLinux][colinux] and checked out [ext2fsd][ext2fsd] but couldn't get write support working.  After that, [Ext2FS Anywhere][ext2fs3] seems to have done a decent job of bridging the filesystem gap... though now I'm getting all kinds of odd errors and reports of resources running out.  Now, I'm thinking there might be some voodoo conflicts going on here, and early onset of [DLL Hell][dllhell].

But, ignoring the waves of voodoo for now, I was jonesing for a Unix fix, so I installed [Cygwin][cygwin].  I like [Cygwin][cygwin].  But, a little ways into things, trying to get [MySQL][cygwinmysql] working, I'm starting to miss my Debian install and apt-get.  (Gentoo's emerge isn't too bad either, though the compiling-from-source thing gets old.)

Bah.  Thinking I might reformat and try out a Gentoo install now.

Now, I realize that I'm trying to do some very un-Windows things with this WinXP install, and I'm doing it on hardware weaker than the XBox I just recently started hacking around with.  But, just what *do* you do with a machine entirely devoted to Windows, anyway?

And just why can't I get an [ancient game][subspace] working acceptably on my PowerBook under Virtual PC anyway?! 

[cygwinmysql]: http://anfaenger.de/cygwin-1.5/mysql/
[gentoo]: http://www.gentoo.org/
[dllhell]: http://www.ssw.com.au/SSW/Database/DLLHell.aspx
[ext2fsd]: http://ext2.yeah.net
[ext2fs3]: http://www.ext2fs-anywhere.com/
[ut]: http://www.unrealtournament.com/
[subspace]: http://www.subspacehq.com/
[cygwin]: http://www.subspacehq.com/
[colinux]: http://www.colinux.org/
[tv]: http://www.decafbad.com/blog/2004/05/10/homebrew_entertainment_appliances_cheap_open_and_embattled
[account]: http://jeremy.zawodny.com/blog/archives/001962.html

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088030">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.geocities.com/rschmertz/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=368fade064c39e0034b5dc07782acc41&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.geocities.com/rschmertz/">Bob S</a>
                </div>
                <a href="#comment-221088030" class="permalink"><time datetime="2004-05-12T10:16:08">2004-05-12T10:16:08</time></a>
            </div>
            <div class="content">Yes, compiling everything does get old.  When I first started out w/ Gentoo, I thought, "cool, it'll take me maybe a couple of days to build everything, but once I'm done, I'll have a screaming fast system".  It wasn't until months later that I realized that you're never done.  After the third upgrade of X11, I realized that the bigger and more important a package is, the more bugs it contains, and the quicker they are found ("many eyes" and all that), so you end up recompiling X and Mozilla a lot more often than you'd planned.

As for performance, it's the only Linux I've ever installed on my iBook, so I don't have anything to compare it to.  (shrugs)</div>
            
        </li>
    
        <li class="comment" id="comment-221088033">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.livejournal.com/users/missadroit"><img src="http://www.gravatar.com/avatar.php?gravatar_id=aee8a8ca6bd70648d15242ff2b5742b3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.livejournal.com/users/missadroit">vvp girl</a>
                </div>
                <a href="#comment-221088033" class="permalink"><time datetime="2004-05-12T22:42:34">2004-05-12T22:42:34</time></a>
            </div>
            <div class="content">C++ homework requiring the use of .net.

Bah!</div>
            
        </li>
    
        <li class="comment" id="comment-221088037">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://boston.conman.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=bbb1c69b64019a3df907c3545186f907&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://boston.conman.org/">Sean Conner</a>
                </div>
                <a href="#comment-221088037" class="permalink"><time datetime="2004-05-13T11:59:57">2004-05-13T11:59:57</time></a>
            </div>
            <div class="content">I'm not sure if I would use Gentoo as a desktop system.  As a server, it's wonderful, but of the three Gentoo servers I've helped setup, it's generally been as bare a system as possible (and as far as Apache goes, did *not* use emerge but downloaded and compiled that separately since the level of customization was rather steep).

But I do have to ask---why did you need to upgrade X?  I have a RedHat 5.2 system I use for my desktop system, and I haven't needed to upgrade X on that since it was installed um ... five years (?!) ago.</div>
            
        </li>
    
        <li class="comment" id="comment-221088040">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.skipjack.info"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8f3e01fca940ba7827cd0ff419a789f3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.skipjack.info">Matthew</a>
                </div>
                <a href="#comment-221088040" class="permalink"><time datetime="2004-05-15T14:39:26">2004-05-15T14:39:26</time></a>
            </div>
            <div class="content">I use my windows box just for games. My wife uses to pay bills, because the SuSe KDE desktop is "too hard to understand". For everything else I use linux or my ibook.</div>
            
        </li>
    
        <li class="comment" id="comment-221088044">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://rasterweb.net/raster/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=db0fab74bcb564ebb09295498b892fb6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://rasterweb.net/raster/">Pete Prodoehl</a>
                </div>
                <a href="#comment-221088044" class="permalink"><time datetime="2004-05-16T21:27:51">2004-05-16T21:27:51</time></a>
            </div>
            <div class="content">Well, never really having a Windows PC in my home (except for the one I found in a dumpster that had WWG 3.11 on it) I really don't know what you would do with it. I mean, even if you just want to do browser testing with various versions of Windows/IE, you are probably better off using Virtual PC if you've already got it.

I suppose you use a Windows PC for things that just won't work on other operating systems. What those things are just aren't very important to me at home, and seem to be on a list that is shrinking as time goes by...</div>
            
        </li>
    
        <li class="comment" id="comment-221088047">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://pleine-peau.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=3c64e9294b68b6087b4107647b3825cd&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://pleine-peau.com">Frederic</a>
                </div>
                <a href="#comment-221088047" class="permalink"><time datetime="2004-05-30T00:53:07">2004-05-30T00:53:07</time></a>
            </div>
            <div class="content">well, this is a weird coincidence
I saw your shoelace links in del.icio.us and followed from there _and I have just finished merging two very old pcs into one, 192Mo and a Pentium MMX at 233Hz on which I installed XP thinking it would not work but it is superfast (and I don't understand why) and now I have also installed remote desktop and it works just fine

so, I have this perfect box which I can control w/o it having a keyboard or mouse or screen

it's out there in the living room and
I don't know what to do with it at all</div>
            
        </li>
    
        <li class="comment" id="comment-221088049">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.alltom.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=68971fe7ee8fd814c26391c727c065bb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.alltom.com/">Tom</a>
                </div>
                <a href="#comment-221088049" class="permalink"><time datetime="2004-06-01T05:36:02">2004-06-01T05:36:02</time></a>
            </div>
            <div class="content">My desktop computer primarily runs Gentoo Linux, but also has windows XP for those times when Windows can do the job better. The only reasons I ever boot up Windows any more are when I need to code something for work (.NET is the platform we use there) or to play Windows-only games every weekend at a LAN party. With my Athlon64 3000+, the time to compile applications is well within my tolerance level so I feel that Gentoo is well-suited for me. I don't know what I would do if I had to use Windows exclusively again.</div>
            
        </li>
    
        <li class="comment" id="comment-221088052">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.etherpunk.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=af26bab430f6285b8a047dad87b7e1ce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.etherpunk.com">Kenny</a>
                </div>
                <a href="#comment-221088052" class="permalink"><time datetime="2005-04-05T15:49:46">2005-04-05T15:49:46</time></a>
            </div>
            <div class="content">I currently use Windows exclusively becuase Getting Linux+Wireless with a Dell Inspiron is a little more effort than I'm willing to invest (I've figured out all kinds of nify server related things, but getting wireless just seems to be a demon I can't tame)... so... I use Virtual PC for my Linux fix (actually, for GNUCash and some other minor programs that I don't want to buy for Windows). If Valve/Steam ever ported Steam and HL to Linux though... the battle would be on. =)
My server, however, is Gentoo (It's been Gentoo, OpenBSD, and Slackware), but I like Gentoo the best. Just watch out for those upgrades, it's a doozie (etc-update.... killed my server once... Linux sys admin, still isn't for the faint of heart).</div>
            
        </li>
    
        </ul>
    
        </div>
    