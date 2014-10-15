---
comments_archived: true
date: '2003-07-07T14:45:21-04:00'
layout: post
title: Backups with my eyes closed?
wordpress_id: 439
wordpress_slug: backup-question
wordpress_url: http://www.decafbad.com/blog/?p=439
---
Okay, so at my new job I'm the Guy if it has a transistor in it.  I'm
developer, sysadmin, and hardware jockey all in one.  This is fun
to a certain extent, since it tests pretty much everything I know from
A through Z.  And so far, I'm doing okay.  Every now and then, though,
I get a bit stumped.
<br /><br />
My most recent adventure involves developing a backup routine for the
office.  I just got tape backup working on a Linux box for a big
Samba-shared directory that we all work out of.  I'm currently winging
it with <code>star</code> and <code>cpio</code> in =CRON=-scheduled scripts that manage a
6-tape rotation for me.
<br /><br />
Full backups on alternating tapes on Fridays,
with incrementals inbetween on tapes labeled by the day.  I even have
the server eject the tape and IM me a few times until I go change to
the day's tape.  Tested recovery, and though it could be smoother, it
is at least possible at the moment.  I figure this is pretty good
for my first personal encounter with managing serious backup.  I plan
to keep researching and to upgrade software at some point soon.
<br /><br />
So, now my boss asks me:  "Hey, can you backup this other folder for me?
I don't want to share it, though, and I don't want you to be able to
read the files."  This folder contains some important yet sensitive
things like salary information and other things to which I have no
business having access.
<br /><br />
My stumper then, is this: How do I grab (or cause to be uploaded) a
folder of files for backup, say as large as 2GB, from a <a href="http://www.decafbad.com/twiki/bin/view/Main/WinXP">WinXP</a> machine,
without having any access myself to read the file contents.  I'll be
able to install whatever I need on the <a href="http://www.decafbad.com/twiki/bin/view/Main/WinXP">WinXP</a> machine, but the idea is
that, when the bits leave that machine for the Linux backup server,
there should be no way for me to read their contents.  But, I must be
able to usefully backup and, in conjunction with the owner of the
files, restore in case of disaster.
<br /><br />
Oh yeah, and I have no budget for software.  So, I'm trying to work
this out using only free tools.
<br /><br />
So, my first though is some sort of encryption on the <a href="http://www.decafbad.com/twiki/bin/view/Main/WinXP">WinXP</a> machine.
Encrypt with GPG or something, leaving my boss with the secret key
on a floppy and the passphrase in his head.  Upload these files
to a special folder on our shared drive, and it all gets backed up
like everything else.
<br /><br />
Or, since I don't even really want to know the names or number of
files in this sensitive folder, can I somehow ZIP up the whole
shebang and encrypt that before uploading?
<br /><br />
Under Linux, none of this would be much of a problem to me.  But,
under <a href="http://www.decafbad.com/twiki/bin/view/Main/WinXP">WinXP</a>, my knowledge of available tools and means of automation
fail me.
<br /><br />
Any hints from out there?
<!--more-->
shortname=backup_question

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089289">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=468c6b5110ed4bea9c148cf736744c43&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jim</a>
                </div>
                <a href="#comment-221089289" class="permalink"><time datetime="2003-07-07T14:53:01">2003-07-07T14:53:01</time></a>
            </div>
            <div class="content">I believe the latest versions of winzip and pkzip actually have decent encryption (none of this trivially breakable stuff.

However, I was under the impression GPG worked on Windows, and you can install cygwin to get all the other things like tar.</div>
            
        </li>
    
        <li class="comment" id="comment-221089292">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8bcf295bb2e23d6ee0d80710023f2b66&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Anonymous</a>
                </div>
                <a href="#comment-221089292" class="permalink"><time datetime="2003-07-07T15:16:44">2003-07-07T15:16:44</time></a>
            </div>
            <div class="content">Install cygwin on the XP box, then something like:
tar cf - secretdir | gpg -c > destdir/mysecretfiles.tar.gpg</div>
            
        </li>
    
        <li class="comment" id="comment-221089293">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://24.102.209.201/weblogs/ben/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=588bdfdda82be46c638d6956c55ebc38&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://24.102.209.201/weblogs/ben/">Gnomon</a>
                </div>
                <a href="#comment-221089293" class="permalink"><time datetime="2003-07-07T15:19:03">2003-07-07T15:19:03</time></a>
            </div>
            <div class="content">My Win32 survival kit necessarily contains UnxUtils (a large cross-section of the GNU fileutils ported to run natively, available at http://unxutils.sf.net) which means that you need only bother installing those tools which you'll actually use.

In this case, I'd recommend tar and bzip2, and perhaps GPG on top. Sure, it might not be as pretty as Winzip, but it's a heck of a lot more scriptable and there won't be any nasty encryption incompatabilities (see http://slashdot.org/articles/03/06/10/1542216.shtml?tid=185 for some background about this). Don't forget that the command-line FTP client in Win32 is scriptable and that there are dozens of Windows cron implementations.

[trackback: http://24.102.209.201/weblogs/ben/internet/www/weblogs/posts/posted-elsewhere/DECAFBAD/WinXP-hidden-backup-solution.writeback]</div>
            
        </li>
    
        <li class="comment" id="comment-221089297">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://weblogs.asp.net/jprismon/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cdb8499967998aa056bc65bf1b415608&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://weblogs.asp.net/jprismon/">Joshua Prismon</a>
                </div>
                <a href="#comment-221089297" class="permalink"><time datetime="2003-07-07T16:22:28">2003-07-07T16:22:28</time></a>
            </div>
            <div class="content">(See URL for well formed post)
First of all, for Linux backups, let me Highly recommend Amanda for Linux backups. Scaling other technologies gets too difficult, but we have a several hundred server network that Amanda tackles without problem. In addition, Amanda software is now being ported to win32, giving you a way to backup directly to tape (or rather to a Amanda spool). Here is One Such Effort. I had a project a few years back moving encrypted bank transactions across a network. Here is how I implemented it: Two folders are needed: 
The Unencrypted directory that has all of the important stuff. (A) 
A encrypted directory that is automatically written to. (B) Only B should be shared, and no unencrypted data should be present. There is a slight mathematical risk to zipping and then encrypting files (since the header of the ZIP is a well known structure), but the purpose of this excercise is to keep noisy employees away, not be 100% mathematically secure. Your proccess then works as follows: 
Have your boss schedule a script that takes every file in A is zipped into a single file. (Winzip) 
Have your boss schedule a script that encrypts that zip. (Use GPGP, but remind your boss that he must keep the key secure. 
Have your boss schedule a script that moves only the encrypted file to B. 
Use NCFTP or SAMBA to automatically transfer B over to a backup server. (Use SMBFS or smclient if using samba). If he does not want to share it, transfer it using NCFTP. WinZip works great for automatically compressing things. I would not use it's encryption or password features tho. Use GPGP with a secure key to encrypt, or roll your own using .NET's awesome encryption support. (I recommend staying with GPGP).</div>
            
        </li>
    
        <li class="comment" id="comment-221089301">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://weblogs.asp.net/jprismon/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cdb8499967998aa056bc65bf1b415608&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://weblogs.asp.net/jprismon/">Joshua Prismon</a>
                </div>
                <a href="#comment-221089301" class="permalink"><time datetime="2003-07-07T16:22:43">2003-07-07T16:22:43</time></a>
            </div>
            <div class="content">(See URL for well formed post)
First of all, for Linux backups, let me Highly recommend Amanda for Linux backups. Scaling other technologies gets too difficult, but we have a several hundred server network that Amanda tackles without problem. In addition, Amanda software is now being ported to win32, giving you a way to backup directly to tape (or rather to a Amanda spool). Here is One Such Effort. I had a project a few years back moving encrypted bank transactions across a network. Here is how I implemented it: Two folders are needed: 
The Unencrypted directory that has all of the important stuff. (A) 
A encrypted directory that is automatically written to. (B) Only B should be shared, and no unencrypted data should be present. There is a slight mathematical risk to zipping and then encrypting files (since the header of the ZIP is a well known structure), but the purpose of this excercise is to keep noisy employees away, not be 100% mathematically secure. Your proccess then works as follows: 
Have your boss schedule a script that takes every file in A is zipped into a single file. (Winzip) 
Have your boss schedule a script that encrypts that zip. (Use GPGP, but remind your boss that he must keep the key secure. 
Have your boss schedule a script that moves only the encrypted file to B. 
Use NCFTP or SAMBA to automatically transfer B over to a backup server. (Use SMBFS or smclient if using samba). If he does not want to share it, transfer it using NCFTP. WinZip works great for automatically compressing things. I would not use it's encryption or password features tho. Use GPGP with a secure key to encrypt, or roll your own using .NET's awesome encryption support. (I recommend staying with GPGP).</div>
            
        </li>
    
        <li class="comment" id="comment-221089303">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.mozkit.net/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=07f3adb78c0d76857f03edadf68617fe&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.mozkit.net/blog">Robert Barksdale</a>
                </div>
                <a href="#comment-221089303" class="permalink"><time datetime="2003-07-07T19:01:32">2003-07-07T19:01:32</time></a>
            </div>
            <div class="content">Curious?  Since the files are top secret, why not put the onus on your boss?  XP has a couple of built-in tools that will make the job easy.
First, provided NTFS is utilized, he can take advantage of XP's Encrypting File System.  This will allow him to encrypt and compress his "important data".

Next, assuming he has access to a dir on the "back-up" server, he can use XP's Backup, to schedule the backup to run once, Weekly, monthly, at system start-up or logon.

Again, this puts him in-control of his own data, and should eliminate the need of "touching" his important files. Here are a couple of links for additional information.

Encrypting Sile System
XP's Backup

I hope this helps.</div>
            
        </li>
    
        <li class="comment" id="comment-221089306">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=c7a3895376100fa2a20cabab927bf35b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">David</a>
                </div>
                <a href="#comment-221089306" class="permalink"><time datetime="2003-07-08T08:54:42">2003-07-08T08:54:42</time></a>
            </div>
            <div class="content">He should just give you access to the contents: if you can't trust your sysadmin, you can't trust anyone.  I'm sure you're mature enough not to open the files.

Just because you can read something, doesn't mean you will.</div>
            
        </li>
    
        <li class="comment" id="comment-221089309">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.ideaspace.net/users/wkearney"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b53911af792174097e8acb282414b44c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.ideaspace.net/users/wkearney">Bill Kearney</a>
                </div>
                <a href="#comment-221089309" class="permalink"><time datetime="2003-07-08T09:17:43">2003-07-08T09:17:43</time></a>
            </div>
            <div class="content">If it's on an Active Directory enabled network the backup tools should be able to handle it.  The idea being with use of domain certificates it's possible to backup that which you cannot normally access.

The other quick and dirty solution is to just zip the files into a password protected archive.  Then put that archive on a folder that gets backed up.  Winzip's command-line features should make this trivial.  My XP box is out for service so I can't check and see what the XP native zip functions would offer here.  But zipped archives are probably the simplest way to approach this.  Write a vbscript, set it up as a scheduled job and let it do the grunt work of creating the archive, adding the files and then copying it to the approapriate backup location.</div>
            
        </li>
    
        <li class="comment" id="comment-221089311">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://fiftyfly.mine.nu"><img src="http://www.gravatar.com/avatar.php?gravatar_id=43f54f4e781c8374414d45c287474cac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://fiftyfly.mine.nu">mike</a>
                </div>
                <a href="#comment-221089311" class="permalink"><time datetime="2003-07-08T14:54:26">2003-07-08T14:54:26</time></a>
            </div>
            <div class="content">I would highly sugest not relying on ntfs' encryption : http://www.annoyances.org/exec/forum/winxp/t1037834762 . Instead go grab a copy the cygwin project. A windows install simply isn't complete without it. tar & gpg, not to mention about 1001 needful utils, come  stock dependin on which packages you install. Heck I'd prob have some sort of fit if it weren't for it's OpenSSH & SFree ports.</div>
            
        </li>
    
        <li class="comment" id="comment-221089313">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://fiftyfly.mine.nu"><img src="http://www.gravatar.com/avatar.php?gravatar_id=43f54f4e781c8374414d45c287474cac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://fiftyfly.mine.nu">mike</a>
                </div>
                <a href="#comment-221089313" class="permalink"><time datetime="2003-07-08T14:55:05">2003-07-08T14:55:05</time></a>
            </div>
            <div class="content">I would highly sugest not relying on ntfs' encryption : http://www.annoyances.org/exec/forum/winxp/t1037834762 . Instead go grab a copy the cygwin project. A windows install simply isn't complete without it. tar & gpg, not to mention about 1001 needful utils, come  stock dependin on which packages you install. Heck I'd prob have some sort of fit if it weren't for it's OpenSSH & XFree ports.</div>
            
        </li>
    
        </ul>
    
        </div>
    