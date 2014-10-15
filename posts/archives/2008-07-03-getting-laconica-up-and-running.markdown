---
comments_archived: true
date: '2008-07-03T15:21:35-04:00'
layout: post
tags:
- php
- twitter
- entries
- laconica
- openmicroblogging
title: Getting Laconica up and running
wordpress_id: 1167
wordpress_slug: getting-laconica-up-and-running
wordpress_url: http://decafbad.com/blog/?p=1167
---
*Update, 30 Sep 2008*: 

**You don't want to follow the directions on this page—instead, leave this page and read this:**  

[http://laconi.ca/darcs/README](http://laconi.ca/darcs/README)

At one point, very early on in Laconica-time, this blog post offered useful information on getting Laconica up and running.  But since then, my time has taken me away from playing with Laconica and thus this guide has fallen far behind.  Hopefully soon I'll get back around to Laconica hacking, but not today.

I'm leaving the original text of this post here for posterity, but this is *no longer current* and following this guide will *do more harm than good* in confusing you about Laconica installation!

**Again, to learn about getting Laconica up and running, leave this page and read this**:

[http://laconi.ca/darcs/README](http://laconi.ca/darcs/README)


The latest mini-sensations to arrive through my firehoses are [identi.ca](http://identi.ca), a Twitter-clone / microblogging site, and the Open Source software [Laconica][], which powers the aforementioned site.

Having started and neglected two Twitter cloning attempts of my own, [Cuckoo](http://decafbad.com/svn/trunk/Cuckoo) and [OpenInterocitor](http://decafbad.com/svn/trunk/OpenInterocitor), seeing someone else carry the torch with any modicum of momentum is attractive to me.  So, I spent a little bit last night getting the code running on my own servers, and managed to do it twice:

* [decafbad.com/laconica](http://decafbad.com/laconica)
* [lmorchard.com/laconica](http://lmorchard.com/laconica)

See, the interesting thing promised by [Laconica][]—and something I wanted in my own clones—is the ability to federate instances of the software.  That is, users on one [Laconica][]-based site should be able to subscribe to the updates from users on another site, by way of the [OpenMicroblogging specification][openmu].  Although federation isn't a silver bullet to a web-scale Twitter clone, I do think it's one of the most important bootstrap steps—but that's another blog post entirely.

Thus, since I'd like to see *you* run a Laconica site (or something like it) for mine to talk to, I figured I'd document how I got the thing running.  My server is running Ubuntu Gutsy, so your mileage may vary.  This is a long one, so check out the how-to after the jump...

[lighttpd]: http://www.lighttpd.net/
[openmu]: http://openmicroblogging.org/
[Twitter]: http://twitter.com
[laconica]: http://laconi.ca
[source]: http://laconi.ca/Main/Source
<!--more-->

## Get the Laconica code

I got my copy of the code by using [`darcs`](http://darcs.net/), as described on [the Laconica source page][source], like so:

    sudo apt-get install darcs
    darcs get --partial http://laconi.ca/darcs/

But, if you can't or don't want to use `darcs` right now, you can [grab a Laconica tarball](http://laconi.ca/laconica-0.4.1.tar.gz) to get started.

## Get modules and third-party prerequisites

I had already installed PHP and Apache, along with lighttpd, on my server.  But, I found I needed a few more things.  So, here's a slew of packages you may or may not already have:

    sudo apt-get install libapache2-mod-php5 php5-cgi php5-cli php-pear php5-gd php5-mysql

Next, now that you've got PHP and PEAR, you can install some of the PEAR-based prerequisites:

    sudo pear channel-update pear.php.net
    sudo pear install channel://pear.php.net/Validate-0.8.1
    sudo pear install DB_DataObject
    sudo pear install Mail
    sudo pear install Net_SMTP

After this, there are a few libraries that need to be downloaded by hand.  For this, I created an `extlib/` directory to keep them in, separate from Laconica's own `lib/` which will be subject to updates to the software itself:

    mkdir extlib xfers
    cd xfers
    curl -O http://openidenabled.com/files/php-openid/packages/php-openid-2.1.1.zip    
    curl -O http://michelf.com/docs/projets/php-markdown-1.0.1m.zip
    curl -O http://oauth.googlecode.com/svn/code/php/OAuth.php
    curl -O http://xmpphp.googlecode.com/files/xmpphp-0.1beta-r21.tar.gz
    unzip php-markdown-1.0.1m.zip
    cp 'PHP Markdown 1.0.1m/markdown.php' ../extlib/
    unzip php-openid-2.1.1.zip
    cp -r php-openid-2.1.1/Auth ../extlib/
    cp OAuth.php ../extlib/
    tar -zxf xmpphp-0.1beta-r21.tar.gz
    cp xmpphp/*.php ../extlib/
    cd ..
    rm -rf xfers

## Set up MySQL tables

I'll assume you already have MySQL installed.  To set up a database for Laconica, I did the following:

    mysql -uroot -p -e 'create database laconica';
    mysql -uroot -p -e "grant all privileges on laconica.* to laconica@localhost identified by 'PASSWORD'";
    mysql -uroot -p laconica < db/laconica.sql

## Configure Laconica

So far, I've found at least two config files that need tweaking—namely `config.php` and `dataobject.ini`.

The first thing I did to `config.php` was to add the following at around line 6 to account for my `extlib/` directory:


    #If you have downloaded libraries in random little places, you
    #can add the paths here
    define('INSTALLDIR', dirname(__FILE__));
    set_include_path(get_include_path() . PATH_SEPARATOR . INSTALLDIR . '/extlib');

The rest of the settings in `config.php` are somewhat self-explanatory.  These are the ones I changed for my installation:

    $config['site']['name'] = 'cafeonica';
    $config['site']['server'] = 'decafbad.com';
    $config['site']['path'] = 'laconica';
    $config['site']['fancy'] = true;
    $config['site']['theme'] = 'stoica';
    $config['site']['email'] = 'l.m.orchard@pobox.com';
    $config['site']['broughtby'] = '0xDECAFBAD';
    $config['site']['broughtbyurl'] = 'http://decafbad.com/';
    $config['db']['database'] = 'mysql://laconica:PASSWORD@localhost/laconica';
    $config['db']['ini_laconica'] = $config['db']['schema_location'].'/stoica.ini';

After this, I tweaked the first few settings of `dataobject.ini` to the following: 

    database = mysql://laconica:PASSWORD@localhost/laconica 
    schema_location = /www/decafbad.com/docs/laconica/classes 
    class_location = /www/decafbad.com/docs/laconica/classes 
    require_prefix = /www/decafbad.com/docs/laconica/classes/ 

Be sure to substitute your own web server paths and passwords in all the above.  And finally, in order to allow the upload of avatar images, you'll need to tweak the permissions on the `avatar/` directory, like so:

    sudo chown -R www-data avatar
    sudo chmod -R ug+rw avatar/

## Configure Web Server

There isn't really much to configure if you're using Apache.  There's a file `htaccess.sample` that needs to be copied to `.htaccess`—this will put in place all the `mod_rewrite` rules necessary to support "fancy" URLs.

On the other hand, if you're okay with uglier URLs with query parameters and whatnot, leave `.htaccess` alone and use `$config['site']['fancy'] = false` in your `config.php`.  

For comparison, here are examples of non-fancy and fancy profile URLs:

* http://decafbad.com/laconica/index.php?action=showstream&nickname=lmorchard
* http://decafbad.com/laconica/lmorchard

One catch to the non-fancy and fancy thing, though—if you start off with non-fancy URLs and later switch to fancy, all of the profiles registered before that switch will appear with non-fancy URLs in the timeline.  This is because the `profile` table stores the original URLs at registration in the `profileurl` column.  You could change these if you like, but there be dragons.

### Configure Lighttpd for "fancy" URLs (optional)

If you're like me, though, you're using something other than Apache for your main web server.  Personally, I just got up and running with [lighttpd][] not too long ago.  Alas, that means the `.htaccess` rewrite rules won't work directly.  

Admittedly, I am a novice to configuring [lighttpd][], so the following rules I added to my config could probably use some help:

    url.rewrite-final += (
        "^/laconica/index.php(.*)$" => "$0",

        "^/laconica/$" => "/laconica/index.php?action=public",
        "^/laconica/rss$" => "/laconica/index.php?action=publicrss",
        "^/laconica/xrds$" => "/laconica/index.php?action=publicxrds",

        "^/laconica/doc/about$" => "/laconica/index.php?action=doc&title=about",
        "^/laconica/doc/contact$" => "/laconica/index.php?action=doc&title=contact",
        "^/laconica/doc/faq$" => "/laconica/index.php?action=doc&title=faq",
        "^/laconica/doc/help$" => "/laconica/index.php?action=doc&title=help",
        "^/laconica/doc/im$" => "/laconica/index.php?action=doc&title=im",
        "^/laconica/doc/openid$" => "/laconica/index.php?action=doc&title=openid",
        "^/laconica/doc/openmublog$" => "/laconica/index.php?action=doc&title=openmublog",
        "^/laconica/doc/privacy$" => "/laconica/index.php?action=doc&title=privacy",
        "^/laconica/doc/source$" => "/laconica/index.php?action=doc&title=source",

        "^/laconica/main/login$" => "/laconica/index.php?action=login",
        "^/laconica/main/logout$" => "/laconica/index.php?action=logout",
        "^/laconica/main/register$" => "/laconica/index.php?action=register",
        "^/laconica/main/openid(?:\?(.*)|$)$" => "/laconica/index.php?action=openidlogin&$1",
        "^/laconica/main/remote(?:\?(.*)|$)$" => "/laconica/index.php?action=remotesubscribe&$1",

        "^/laconica/main/subscribe$" => "/laconica/index.php?action=subscribe",
        "^/laconica/main/unsubscribe$" => "/laconica/index.php?action=unsubscribe",
        "^/laconica/main/confirmaddress$" => "/laconica/index.php?action=confirmaddress",
        "^/laconica/main/confirmaddress/(.*)$" => "/laconica/index.php?action=confirmaddress&code=$1",
        "^/laconica/main/recoverpassword$" => "/laconica/index.php?action=recoverpassword",
        "^/laconica/main/recoverpassword/(.*)$" => "/laconica/index.php?action=recoverpassword&code=$1",

        "^/laconica/settings/avatar$" => "/laconica/index.php?action=avatar",
        "^/laconica/settings/password$" => "/laconica/index.php?action=password",
        "^/laconica/settings/profile$" => "/laconica/index.php?action=profilesettings",
        "^/laconica/settings/openid$" => "/laconica/index.php?action=openidsettings",
        "^/laconica/settings/im$" => "/laconica/index.php?action=imsettings",

        "^/laconica/notice/new$" => "/laconica/index.php?action=newnotice",
        "^/laconica/notice/(\d+)$" => "/laconica/index.php?action=shownotice&notice=$1",

        "^/laconica/user/(\d+)$" => "/laconica/index.php?action=userbyid&id=$1",

        "^/laconica/(\w+)/subscriptions$" => "/laconica/index.php?action=subscriptions&nickname=$1",
        "^/laconica/(\w+)/subscribers$" => "/laconica/index.php?action=subscribers&nickname=$1",
        "^/laconica/(\w+)/xrds$" => "/laconica/index.php?action=xrds&nickname=$1",
        "^/laconica/(\w+)/rss$" => "/laconica/index.php?action=userrss&nickname=$1",
        "^/laconica/(\w+)/all$" => "/laconica/index.php?action=all&nickname=$1",
        "^/laconica/(\w+)/all/rss$" => "/laconica/index.php?action=allrss&nickname=$1",
        "^/laconica/(\w+)/foaf$" => "/laconica/index.php?action=foaf&nickname=$1",

        "^/laconica/(\w+)$" => "/laconica/index.php?action=showstream&nickname=$1"
    )

## That's it (for now)

And that's all I've got for you for now.  At this point, it looks like my two Laconica installs are mostly working.  I've not yet played with the XMPP bot, nor have I been able to see the [OpenMicroblogging][openmu] stuff working with remore subscriptions.  However, I have been able to log in via OpenID, so that's something.

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085627">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://pseudopost.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=761b6be3778aefa25a27dbbe3e65b641&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://pseudopost.org/">Fabian Neumann</a>
                </div>
                <a href="#comment-221085627" class="permalink"><time datetime="2008-07-03T22:36:12">2008-07-03T22:36:12</time></a>
            </div>
            <div class="content"><p>Tried to remotely subscribe to you, but no success so far. Your laconica instance replied "Not expecting this response!" after what seemed like a successful oauth redirection :|</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085630">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221085630" class="permalink"><time datetime="2008-07-03T23:27:14">2008-07-03T23:27:14</time></a>
            </div>
            <div class="content"><p>Fabian: Unfortunately so far, that's been the thing I've seen between all Laconica instances I've seen—even identi.ca.  Hopefully, it's something simple to work out</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085631">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.doomicile.de"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5c23e9c0240d6c70ab841ab54b334a2a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.doomicile.de">Igor</a>
                </div>
                <a href="#comment-221085631" class="permalink"><time datetime="2008-07-04T11:56:43">2008-07-04T11:56:43</time></a>
            </div>
            <div class="content"><p>Great!!! Thank you.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085633">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://nonsmokingarea.com/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=f2c281c37ac25d6438c2cdd2dd06a9b1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://nonsmokingarea.com/blog">michael kamleitner</a>
                </div>
                <a href="#comment-221085633" class="permalink"><time datetime="2008-07-04T18:11:56">2008-07-04T18:11:56</time></a>
            </div>
            <div class="content"><p>yeah, great work man! 
you might add a note that php 5.2.1 is required for the function sys-get-temp-dir (though it's easy to add this function forolder php-installs, just see http://php.m-otion.at/manual/en/function.sys-get-temp-dir.php</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085634">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://identi.ca/evan"><img src="http://www.gravatar.com/avatar.php?gravatar_id=94cd7f2250788b7c7148ceef55a224af&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://identi.ca/evan">Evan Prodromou</a>
                </div>
                <a href="#comment-221085634" class="permalink"><time datetime="2008-07-04T18:55:33">2008-07-04T18:55:33</time></a>
            </div>
            <div class="content"><p>Great! I'm so excited this is working. Question: can you help me with this bug: http://laconi.ca/PITS/00004 ? Also, maybe there's a bug in the finishremotesubscribe script? I've got a few people remote-subscribed in identi.ca, I'll find out what the problem was there.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085635">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://identi.ca/evan"><img src="http://www.gravatar.com/avatar.php?gravatar_id=94cd7f2250788b7c7148ceef55a224af&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://identi.ca/evan">Evan Prodromou</a>
                </div>
                <a href="#comment-221085635" class="permalink"><time datetime="2008-07-04T18:57:19">2008-07-04T18:57:19</time></a>
            </div>
            <div class="content"><p>Oh, also: you shouldn't have to update dataobject.ini! </p>

<p>And we need to set a mode for approved registration, for private instances... Wanna work on it?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085636">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221085636" class="permalink"><time datetime="2008-07-04T19:03:01">2008-07-04T19:03:01</time></a>
            </div>
            <div class="content"><p>@Evan: Huh, I could've sworn things didn't work until I made those changes to dataobject.ini — I probably changed something else at the same time and though the dataobject.ini tweaks did it :)</p>

<p>I may also poke around at an INSTALL and maybe an approved reg mode too, after watching some fireworks and eating too much food...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085637">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://deys.ca"><img src="http://www.gravatar.com/avatar.php?gravatar_id=25168840fcc536c128975b57561ba79d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://deys.ca">Bill Deys</a>
                </div>
                <a href="#comment-221085637" class="permalink"><time datetime="2008-07-04T19:20:58">2008-07-04T19:20:58</time></a>
            </div>
            <div class="content"><p>Is there anyone out there that is helping people troubleshoot getting a site up and going. I'm having a hell of a time, but I'm betting it's an issue with my web server. I think the root of the problem is I don't have DB_DataObject in Pear. This has been a great help, just not smrt enough when things go off track! Thanks</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085638">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://georgology.com/laconica"><img src="http://www.gravatar.com/avatar.php?gravatar_id=105450f69a4b7503d4d66f196f8650ef&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://georgology.com/laconica">Andrew Bashore</a>
                </div>
                <a href="#comment-221085638" class="permalink"><time datetime="2008-07-04T19:33:50">2008-07-04T19:33:50</time></a>
            </div>
            <div class="content"><p>I keep getting this error after following all your steps above. </p>

<p>DB_DataObject Error: Unable to load schema for database and table (turn debugging up to 5 for full error message)</p>

<p>Do you have any idea how I might fix this?</p>

<p>My installation is at http://www.georgology.com/laconica/</p>

<p>Thanks.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085639">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221085639" class="permalink"><time datetime="2008-07-04T20:22:27">2008-07-04T20:22:27</time></a>
            </div>
            <div class="content"><p>@Andrew: Hmm... I just removed a chunk of the instructions about tweaking dataobject.ini — I just readded it.  Evan says it doesn't need changing, but I swear that your error is the exact thing I resolved by modifying dataobject.ini </p>

<p>You may want to give it a try.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085640">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://rewiv.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=80451b0a1d985a4ef4f5dabd9f3647d1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://rewiv.com">Eric</a>
                </div>
                <a href="#comment-221085640" class="permalink"><time datetime="2008-07-04T21:57:34">2008-07-04T21:57:34</time></a>
            </div>
            <div class="content"><p>Very, nice article, alot of help!  Thanks</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085642">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.facepwn.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=f2011de7dfdaed830c176cd2dc64dd56&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.facepwn.com">Nick</a>
                </div>
                <a href="#comment-221085642" class="permalink"><time datetime="2008-07-04T22:19:40">2008-07-04T22:19:40</time></a>
            </div>
            <div class="content"><p>Thanks for the guide, after a bit of trial and error, it works perfectly!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085643">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=ee84c601cb10e5ffab86cae9cc4ad3b7&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Kevin</a>
                </div>
                <a href="#comment-221085643" class="permalink"><time datetime="2008-07-05T03:28:57">2008-07-05T03:28:57</time></a>
            </div>
            <div class="content"><p>I'm getting the </p>

<p>"Warning: main(DB/DataObject.php) [function.main]: failed to open stream: No such file or directory in /home/xxxx/public_html/blogging/lib/common.php on line 32"</p>

<p>what am I missing? Thx for any help, I'm sure is something I've over looked.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085645">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.nbrightside.com/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=fa5fa46df4e0c7535042e5280e26271a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.nbrightside.com/blog/">Andy C</a>
                </div>
                <a href="#comment-221085645" class="permalink"><time datetime="2008-07-05T11:34:22">2008-07-05T11:34:22</time></a>
            </div>
            <div class="content"><p>Thanks for the HOWTO which was really helpful. I am trying to install laconica on Bluehost.</p>

<p>However I get a DB connection error (CONNECT: Checking for database database_ in options'). This is strange because I can access the laconica schema using the same DSN using a small test PEAR script.</p>

<p>Is it possible to get laconica to dump the DSN so I can check it is correct ?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085646">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://georgology.com/laconica"><img src="http://www.gravatar.com/avatar.php?gravatar_id=105450f69a4b7503d4d66f196f8650ef&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://georgology.com/laconica">Andrew Bashore</a>
                </div>
                <a href="#comment-221085646" class="permalink"><time datetime="2008-07-05T14:33:03">2008-07-05T14:33:03</time></a>
            </div>
            <div class="content"><p>I have solved the error in my previous comment. 
"DB_DataObject Error: Unable to load schema for database and table (turn debugging up to 5 for full error message)"
The solution was to rename the "classes/stoica.ini" file to "classes/.ini". This has solved the problem on two installations. Also remember to set debugging back to "0".</p>

<p>Kevin:</p>

<p>Its probably a PEAR dependency that is not installed.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085647">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://georgology.com/laconica"><img src="http://www.gravatar.com/avatar.php?gravatar_id=105450f69a4b7503d4d66f196f8650ef&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://georgology.com/laconica">Andrew Bashore</a>
                </div>
                <a href="#comment-221085647" class="permalink"><time datetime="2008-07-05T14:38:03">2008-07-05T14:38:03</time></a>
            </div>
            <div class="content"><p>Error in my last comment. It should be "classes/YOUR DATABASE NAME.ini" not "classes/.ini". Sorry</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085648">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://georgology.com/laconica"><img src="http://www.gravatar.com/avatar.php?gravatar_id=105450f69a4b7503d4d66f196f8650ef&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://georgology.com/laconica">Andrew Bashore</a>
                </div>
                <a href="#comment-221085648" class="permalink"><time datetime="2008-07-05T14:47:11">2008-07-05T14:47:11</time></a>
            </div>
            <div class="content"><p>One more thing. I did not have to modify anything in "dataobject.ini"</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085649">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=ee84c601cb10e5ffab86cae9cc4ad3b7&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Kevin</a>
                </div>
                <a href="#comment-221085649" class="permalink"><time datetime="2008-07-05T15:05:38">2008-07-05T15:05:38</time></a>
            </div>
            <div class="content"><p>Thanks Andrew, I thought that pear is loaded I'll double check and make sure.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085650">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=ee84c601cb10e5ffab86cae9cc4ad3b7&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Kevin</a>
                </div>
                <a href="#comment-221085650" class="permalink"><time datetime="2008-07-05T16:50:58">2008-07-05T16:50:58</time></a>
            </div>
            <div class="content"><p>PEAR is loaded, BUT I just noted that laconica requires PHP 5, and my box is running PHP 4.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085651">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=85c59f19fa20b821b0b627c28912509a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">WebGuy</a>
                </div>
                <a href="#comment-221085651" class="permalink"><time datetime="2008-07-06T01:20:53">2008-07-06T01:20:53</time></a>
            </div>
            <div class="content"><p>Followed all the steps and everything, things seems to be working fine, but when i try to add an IM i get this error -&gt; Fatal error: Class 'XMPPHP_XMPP' not found in /var/www/lib/jabber.php on line 47. Any idea how to fix that ?</p>

<p>Thanks</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085653">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.mrlocke.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=3de2ae6e2e78b988f28b6d2ac65007e3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.mrlocke.net">Neal Locke</a>
                </div>
                <a href="#comment-221085653" class="permalink"><time datetime="2008-07-06T04:22:13">2008-07-06T04:22:13</time></a>
            </div>
            <div class="content"><p>Getting the following error message:</p>

<p>Warning: require_once(DB/DataObject.php) [function.require-once]: failed to open stream: No such file or directory in /home/.matuxa/iraneal/opensourcefaith.org/lib/common.php on line 32</p>

<p>Fatal error: require<em>once() [function.require]: Failed opening required 'DB/DataObject.php' (include</em>path='.:/usr/local/php5/lib/php:/usr/local/lib/php') in /home/.matuxa/iraneal/opensourcefaith.org/lib/common.php on line 32</p>

<p>Looks similar to Kevin's but I know I have php5.  I'm trying to install on shared hosting (dreamhost) at domain http://www.opensourcefaith.org/</p>

<p>Any suggestions?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085654">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://yerb.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2bafc32036b9714cbc8af666b9d138a0&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://yerb.net/">Breyten</a>
                </div>
                <a href="#comment-221085654" class="permalink"><time datetime="2008-07-06T13:51:02">2008-07-06T13:51:02</time></a>
            </div>
            <div class="content"><p>@WebGuy, ln -s . XMPP &amp;&amp; mv xmpp.php XMPP.php solved this issue for me. (Alternatively, you could mkdir instead)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085655">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=d63263bfbb716b1c11cce5ce500ced32&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Howard N</a>
                </div>
                <a href="#comment-221085655" class="permalink"><time datetime="2008-07-07T00:05:24">2008-07-07T00:05:24</time></a>
            </div>
            <div class="content"><p>Andy C did you have any luck resolving your issue with the PEAR error:</p>

<p>Checking for database database_ in options</p>

<p>I've slowly been working my way through getting laconia set up (thanks for the guide!) but have hit a wall with this error.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085658">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.ainotenshi.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=1d00968221b83e513890d353fc1dbe72&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.ainotenshi.org/">MRiGnS</a>
                </div>
                <a href="#comment-221085658" class="permalink"><time datetime="2008-07-07T12:31:39">2008-07-07T12:31:39</time></a>
            </div>
            <div class="content"><p>I got it set up but registration is not possbile, it displays this error:</p>

<p>Catchable fatal error: Object of class DB<em>DataObject</em>Cast could not be converted to string in /www/htdocs/test/lib/util.php on line 1001</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085660">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.nbrightside.com/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=fa5fa46df4e0c7535042e5280e26271a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.nbrightside.com/blog/">Andy C</a>
                </div>
                <a href="#comment-221085660" class="permalink"><time datetime="2008-07-07T17:39:57">2008-07-07T17:39:57</time></a>
            </div>
            <div class="content"><p>HowardN - Yes.I discovered that my settings in 'config.php' (specifically [config][db]) weren't getting applied correctly so I modified the same settings 'lib/common.php' which worked. I <em>know</em> this shouldn't be needed and I <em>know</em> it's not correct but I'm just want to play with Laconica.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085663">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.nbrightside.com/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=fa5fa46df4e0c7535042e5280e26271a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.nbrightside.com/blog/">Andy C</a>
                </div>
                <a href="#comment-221085663" class="permalink"><time datetime="2008-07-07T18:44:27">2008-07-07T18:44:27</time></a>
            </div>
            <div class="content"><p>Remote sub from identi.ca to decafbad seems to be working now. Did you have to change anything on your end ? Are you on the latest Darcs code ? I am using the 0.4.1 tarball and get 'Not expecting this response'.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085664">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://rid.cabbitmedia.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=6f7a710dccc047bd49ad778977752f8c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://rid.cabbitmedia.com/">rid</a>
                </div>
                <a href="#comment-221085664" class="permalink"><time datetime="2008-07-07T20:35:51">2008-07-07T20:35:51</time></a>
            </div>
            <div class="content"><p>somewhat got something up using this guide at http://laconica.cabbitmedia.com/ but with a few bugs.</p>

<p>it's running on slackware 12.0.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085665">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=64219a9ada0c5554c664b4e3532d1937&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Big Eclipse</a>
                </div>
                <a href="#comment-221085665" class="permalink"><time datetime="2008-07-07T22:34:03">2008-07-07T22:34:03</time></a>
            </div>
            <div class="content"><p>Page is blank.  After following the steps and ensuring that everything is as it should be, the installation seem to have gone well.  Not receiving any errors, but the page is just blank -- like an 'Untitled' page.  Any ideas?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085670">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=0839bed78f8f75c8cca3d4477a7fa637&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Don Park</a>
                </div>
                <a href="#comment-221085670" class="permalink"><time datetime="2008-07-08T00:17:53">2008-07-08T00:17:53</time></a>
            </div>
            <div class="content"><p>@webguy, according to evan, the tarball is out of date. get the subversion trunk with: 
svn co svn://netflint.net/xmpphp</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085671">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://basissap.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a9e41d14e2d0e4b2af819d0fbde85f9a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://basissap.com">martin english</a>
                </div>
                <a href="#comment-221085671" class="permalink"><time datetime="2008-07-08T06:27:43">2008-07-08T06:27:43</time></a>
            </div>
            <div class="content"><p>Neal_Locke:
I'm attempting to install on dreamhost as well.  I've spent a bit of time and found the following link - http://wiki.dreamhost.com/PEAR - which basically says PEAR on dreamhost is buggered.  It does describe how to get a full installation of PEAR in your own domain, but it requries shell access which i can't get from work.</p>

<p>I'll post tomite with (any) results....</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085672">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://leeclemmer.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=47fa92e81c98cb0418d3897f99d60ef6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://leeclemmer.com">Lee</a>
                </div>
                <a href="#comment-221085672" class="permalink"><time datetime="2008-07-08T20:26:10">2008-07-08T20:26:10</time></a>
            </div>
            <div class="content"><p>Hey guys, I've got lacania almost working; when I go to register, I get the following error:</p>

<p>Catchable fatal error: Object of class DB<em>DataObject</em>Cast could not be converted to string in C:xampphtdocsmessaginglibutil.php on line 1001</p>

<p>I'm also a little bit weirded out that I am getting the web page, but when I go check out the database no tables have been created... is this right?  When and what code will actually create the database tables?</p>

<p>Thanks so much for your help!
- Lee</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085673">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://danbri.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=f3016aadafbda36fe5818d44e32499f0&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://danbri.org/">Dan Brickley</a>
                </div>
                <a href="#comment-221085673" class="permalink"><time datetime="2008-07-10T09:06:30">2008-07-10T09:06:30</time></a>
            </div>
            <div class="content"><p>I'm collected some Dreamhost-specific notes that build on this: http://laconi.ca/Main/LaconicaOnDreamhost including a fix for Neal's "Failed opening required 'DB/DataObject.php'" problem. Help welcomed if others have experience w/ DH.</p>

<p>In short re DataObject, see this bit: </p>

<ol>
<li>Your lib/common.php MUST be changed to ensure PEAR files can be found.</li>
</ol>

<p>Add (with appropriate changes):</p>

<pre><code># set up a non-root PEAR repo (before we need it)
$extra_path = array("/home/path-to-your-stuff/pear/php");
set_include_path(implode(PATH_SEPARATOR, $extra_path) . PATH_SEPARATOR . get_include_path());
</code></pre>

<p>...before this bit:</p>

<ol>
<li>global configuration object </li>
</ol>

<p>require_once('PEAR.php');</p>

<p>If it doesn't work, try replacing path-to-your-stuff with the path to your stuff.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085674">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://noone.org/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9e699d89aa0d5001efb14c91034cee2a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://noone.org/blog">Axel Beckert</a>
                </div>
                <a href="#comment-221085674" class="permalink"><time datetime="2008-07-13T14:15:27">2008-07-13T14:15:27</time></a>
            </div>
            <div class="content"><p>PHP Markdown is also available via PEAR:</p>

pear channel-discover pear.michelf.com

pear install michelf/markdown</div>
            
        </li>
    
        <li class="comment" id="comment-221085677">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=a2397d4f3f3927b7cdc3ab26607fc66e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">raghav</a>
                </div>
                <a href="#comment-221085677" class="permalink"><time datetime="2008-07-15T10:59:09">2008-07-15T10:59:09</time></a>
            </div>
            <div class="content"><p>hey i am having trouble with my copy of laconica ......everything has been installed perfectly........but there are two troubles:-
1.there is not theme been shown on the laconica pages......its complete white
2.when clicked on home link nothing comes up ........please help cos i am newbie in coding after hours of working i installed it but of no use...................
here is the link
<a href='http://www.earnstop.com/raghav1211/laconica3/laconica/' rel="nofollow"></a></p></div>
            
        </li>
    
        <li class="comment" id="comment-221085679">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=a2397d4f3f3927b7cdc3ab26607fc66e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">raghav</a>
                </div>
                <a href="#comment-221085679" class="permalink"><time datetime="2008-07-15T11:00:16">2008-07-15T11:00:16</time></a>
            </div>
            <div class="content"><p>sorry the link is this.........................</p>

<p>http://www.earnstop.com/raghav1211/laconica3/laconica/</p>

<p>http://www.earnstop.com/raghav1211/laconica3/laconica/</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085680">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=1ff3d26e10560a02cade856bac212ec5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Herman</a>
                </div>
                <a href="#comment-221085680" class="permalink"><time datetime="2008-07-17T10:22:14">2008-07-17T10:22:14</time></a>
            </div>
            <div class="content"><p>Hi</p>

<p>I am trying to get a laconica install up on a box running RHEL 5.1, PHP 5.1.6 with Apache/2.2.3.  However after completing all the steps recommended in your (very kewl) post above I run into the same brick wall as i did later when following the directions on http://www.orient-lodge.com/node/3051</p>

<p>The error I keep getting is "Call to undefined method XMLWriter::fullEndElement()" in util.php on line 98.</p>

<p>Could there possibly be something that I am overlooking as I have on a previous install attempted to descend into the rabbit hole of "fixing" the laconica code which I am sure cannot be broken as so many other people have successfully deployed it?</p>

<p>Thanks</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085681">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=219ded085ef7954bc42a21a24b81c8cd&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Eric_A</a>
                </div>
                <a href="#comment-221085681" class="permalink"><time datetime="2008-07-17T16:18:50">2008-07-17T16:18:50</time></a>
            </div>
            <div class="content"><p>Use the latest release of XMPP if you are getting XMPP errors with the latest version of laconica</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085682">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=a2397d4f3f3927b7cdc3ab26607fc66e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">raghav</a>
                </div>
                <a href="#comment-221085682" class="permalink"><time datetime="2008-07-18T06:34:31">2008-07-18T06:34:31</time></a>
            </div>
            <div class="content"><p>i solved my earlier problem of theme but now another problem is emerging that of configuring xmpphp.......can anyone explain it in detail how to install cos many people are not able to activate xmpphp in their laconica apps..........if i get the solution myself i would post it here............</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085683">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=1ff3d26e10560a02cade856bac212ec5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Herman</a>
                </div>
                <a href="#comment-221085683" class="permalink"><time datetime="2008-07-18T15:12:49">2008-07-18T15:12:49</time></a>
            </div>
            <div class="content"><p>Hey,</p>

<p>So the problem with my the error mentioned in my previous post was that when PHP was compiled for the server in question the XmlWriter/Reader components were disabled.  After re-compiling PHP on this server etc the error went away.</p>

<p>Now the error is the inability to connect to the MySQL server?  This with the relevant connection string entries being made in config.php &amp; dataobject.ini?  These settings are definately correct as I am able to connect to the database from the command line copying and pasting the entries from these files.</p>

<p>However it seems like access is trying to be gained on a "strange" port?  Is there some specific place where this has to be configured?  The error I am getting boils down to this: "nativecode=Can't connect to local MySQL server through socket"</p>

<p>Any input regarding this problem would be greatly appreciated!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085685">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=1ff3d26e10560a02cade856bac212ec5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Herman</a>
                </div>
                <a href="#comment-221085685" class="permalink"><time datetime="2008-07-18T15:14:36">2008-07-18T15:14:36</time></a>
            </div>
            <div class="content"><p></p></div>
            
        </li>
    
        <li class="comment" id="comment-221085686">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.nedrichards.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7998e3215aae5f66f3f9503848e10a53&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.nedrichards.com/">Nick</a>
                </div>
                <a href="#comment-221085686" class="permalink"><time datetime="2008-07-23T08:41:39">2008-07-23T08:41:39</time></a>
            </div>
            <div class="content"><p>Just to note for more recent install 0.4.4 and onwards you need XMP-PHP at least 0.1-r50 or up. Available <a href="http://code.google.com/p/xmpphp/downloads/detail?name=xmpphp-0.1beta-r50.tar.gz&amp;can=2&amp;q=" rel="nofollow">here</a>.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085688">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=1ff3d26e10560a02cade856bac212ec5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Herman</a>
                </div>
                <a href="#comment-221085688" class="permalink"><time datetime="2008-07-23T10:37:32">2008-07-23T10:37:32</time></a>
            </div>
            <div class="content"><p>All the issues I experienced ended up being server related.  After sorting my server out the laconica install went like a dream.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085689">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=5205203588500898bdd26a19a5e063d2&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">tagnu</a>
                </div>
                <a href="#comment-221085689" class="permalink"><time datetime="2008-07-23T21:39:20">2008-07-23T21:39:20</time></a>
            </div>
            <div class="content"><p>Hi,</p>

<p>Please merge the comments 15,16 regarding "DB_DataObject Error"</p>

<p>It may confuse first timers.</p>

<p>Wonderful post!!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085690">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=e1cf776be906a7f016a66e14103627e0&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">sasi</a>
                </div>
                <a href="#comment-221085690" class="permalink"><time datetime="2008-07-26T06:37:48">2008-07-26T06:37:48</time></a>
            </div>
            <div class="content"><p>Thanks for your post, i was able to install laconica (after much pain - mainly due to server issues)
But when i do a notice, i get this message</p>

<p>Problem saving notice.</p>

<p>Did anyone had similar problem...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085692">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8ba7b4a8cef7076956e42feb8412950e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Brian</a>
                </div>
                <a href="#comment-221085692" class="permalink"><time datetime="2008-07-27T17:05:15">2008-07-27T17:05:15</time></a>
            </div>
            <div class="content"><p>I can't start the xmppdaemon. I'm stuck:</p>

<p>Unknown error type: [2048] Non-static method PEAR::getStaticProperty() should not be called statically
Unknown error type: [2048] Assigning the return value of new by reference is deprecated
1217178205 [INFO]: Connecting to tcp://xxxx.com:5222
1217178205 [VERBOSE]: SENT: 
1217178205 [VERBOSE]: RECV: </p></div>
            
        </li>
    
        <li class="comment" id="comment-221085694">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.smallbizpod.co.uk"><img src="http://www.gravatar.com/avatar.php?gravatar_id=3a4541c5d4d1cba01af02d9bb61254e5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.smallbizpod.co.uk">Alex Bellinger</a>
                </div>
                <a href="#comment-221085694" class="permalink"><time datetime="2008-07-28T23:32:19">2008-07-28T23:32:19</time></a>
            </div>
            <div class="content"><p>I've installed Laconica using the excellent instructions above, but am getting a couple of odd responses as follows:</p>

<ul>
<li>on logging out and after submitting a 'dent', laconica returns a blank page</li>
<li>when I turn debut to 5 I see I get the following errors: DB_DataObject: ERROR: No Data return from get [and then userid or hash]</li>
<li>error_log files are returning "Cannot modify header information - headers already sent by (output started at /usr/share/pear/DB/DataObject.php:4006) in ... /util.php on line 876</li>
</ul>

<p>Any ideas what I need to tweak in order to correct these errors?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085696">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.krazyness.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=931edb10ae9070e85a2ad53ddb836c89&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.krazyness.net/">Edward</a>
                </div>
                <a href="#comment-221085696" class="permalink"><time datetime="2008-07-31T19:11:10">2008-07-31T19:11:10</time></a>
            </div>
            <div class="content"><p>I'm getting problems installing Laconica.</p>

<p>"<b>Fatal error</b>:  Call to undefined method XMLWriter::fullEndElement() in <b>/var/www/html/vbtwitter/lib/util.php</b> on line <b>98</b>"</p>

<p>I have XMLWriter installed though - PHPInfo shows that it's enabled. Any ideas?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085697">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://saigonnezumi.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2d768af06ac71dac69c9316647d9d0cd&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://saigonnezumi.com">SaigonNezumi (Kevin)</a>
                </div>
                <a href="#comment-221085697" class="permalink"><time datetime="2008-08-07T15:14:27">2008-08-07T15:14:27</time></a>
            </div>
            <div class="content"><p>Great guide.  I am working on this project with my high school students here in Vietnam.  They want to see if they can do a start-up company with this application marketed at students.  Great guide.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085698">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://360.yahoo.com/chutuoc2005"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8e4a0f80398fac4281394cf45d4c6bbd&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://360.yahoo.com/chutuoc2005">IT_V</a>
                </div>
                <a href="#comment-221085698" class="permalink"><time datetime="2008-08-10T10:02:08">2008-08-10T10:02:08</time></a>
            </div>
            <div class="content"><p>Warning: require_once(markdown.php) [function.require-once]: failed to open stream: No such file or directory in /var/www/darcs/lib/common.php on line 122</p>

<p>Fatal error: require<em>once() [function.require]: Failed opening required 'markdown.php' (include</em>path='.:/usr/share/php:/usr/share/pear:/var/www/darcs/extlib') in /var/www/darcs/lib/common.php on line 122</p>

<p>WHo can help me huhuh.. i got this problem ...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085699">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8e4a0f80398fac4281394cf45d4c6bbd&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">IT_V</a>
                </div>
                <a href="#comment-221085699" class="permalink"><time datetime="2008-08-10T10:02:54">2008-08-10T10:02:54</time></a>
            </div>
            <div class="content"><p>Warning: require_once(markdown.php) [function.require-once]: failed to open stream: No such file or directory in /var/www/darcs/lib/common.php on line 122</p>

<p>Fatal error: require<em>once() [function.require]: Failed opening required 'markdown.php' (include</em>path='.:/usr/share/php:/usr/share/pear:/var/www/darcs/extlib') in /var/www/darcs/lib/common.php on line 122</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085700">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8e4a0f80398fac4281394cf45d4c6bbd&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">IT_V</a>
                </div>
                <a href="#comment-221085700" class="permalink"><time datetime="2008-08-10T10:53:58">2008-08-10T10:53:58</time></a>
            </div>
            <div class="content"><p>ok i almost done but i got problem again .... when i click on the login it gave me blank page ... and when i click on openID i gave me this error</p>

<p>Warning: require_once(Auth/OpenID.php) [function.require-once]: failed to open stream: No such file or directory in /var/www/darcs/lib/openid.php on line 24</p>

<p>Fatal error: require<em>once() [function.require]: Failed opening required 'Auth/OpenID.php' (include</em>path='.:/usr/share/php:/usr/share/pear:/var/www/darcs/extlib') in /var/www/darcs/lib/openid.php on line 24</p>

<p>anyone can help me fix that ... thanks alot</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085701">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://neildurbin.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d6a40f0afbb4054b40dc3c826e813ad4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://neildurbin.com">Durbin</a>
                </div>
                <a href="#comment-221085701" class="permalink"><time datetime="2008-08-17T20:38:33">2008-08-17T20:38:33</time></a>
            </div>
            <div class="content"><p>To everyone who is getting XMLWriter problems, My guess is its because there are XMLWriter functions like fullEndElement() that were added or modified from php5.1.6 to php5.2.5.  Unfortunately centos and redhat don't support php past 5.1.6 so i've been searching for a hack that allows 5.2.5 on centos of redhat, found a couple but haven't got them to work.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085702">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://neildurbin.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d6a40f0afbb4054b40dc3c826e813ad4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://neildurbin.com">Durbin</a>
                </div>
                <a href="#comment-221085702" class="permalink"><time datetime="2008-08-17T23:37:05">2008-08-17T23:37:05</time></a>
            </div>
            <div class="content"><p>found a solution for the "Call to undefined method XMLWriter::fullEndElement()" problems.  It is due to the fact that these functions aren't included in older versions of php, see here. http://us2.php.net/manual/en/migration52.functions.php</p>

<p>but here is a great wiki on upgrading to php5.2.x on centos or redhat</p>

<p>http://www.atomicorp.com/wiki/index.php/PHP</p>

<p>once I upgraded everything worked properly.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085704">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://army.twit.tv"><img src="http://www.gravatar.com/avatar.php?gravatar_id=68d93be700edec53fdcf153335d87ef5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://army.twit.tv">Leo Laporte</a>
                </div>
                <a href="#comment-221085704" class="permalink"><time datetime="2008-08-22T05:12:47">2008-08-22T05:12:47</time></a>
            </div>
            <div class="content"><p>Excellent and very useful instructions. We're up and running. I'd love to get XMPP and XRDS running, but all in good time! Thanks so much!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085705">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://koldfront.dk/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=f0eb53c993d09b1135375938f9727c28&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://koldfront.dk/">Adam Sjøgren</a>
                </div>
                <a href="#comment-221085705" class="permalink"><time datetime="2008-08-24T19:20:37">2008-08-24T19:20:37</time></a>
            </div>
            <div class="content"><p>I can log in to identi.ca with my OpenID, but neither to your laconica instance on decafbad.com or Leo Laportes on army.twit.tv - my guess is that you don't allow OpenID Provider endpoints with self-signed SSL-certificates - do you know what identi.ca has set up differently, since they seem to allow self-signed certs?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085707">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=572197696d3d01b698dec4d5bca522fd&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Marco</a>
                </div>
                <a href="#comment-221085707" class="permalink"><time datetime="2008-08-29T12:19:25">2008-08-29T12:19:25</time></a>
            </div>
            <div class="content"><p>Hi, I cannot install PEAR or other dependencies and I tried install laconica3, is a development tarball based on 0.4.3, but I received following error: Parse error: syntax error, unexpected T<em>STRING in /home/web/public</em>html/laconica/lib/util.php on line 468. Could you help me? Thanks</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085708">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=94744f391cdcd7b729c49922ef0a91d3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Friedrich Zohmann</a>
                </div>
                <a href="#comment-221085708" class="permalink"><time datetime="2008-09-04T15:35:35">2008-09-04T15:35:35</time></a>
            </div>
            <div class="content"><p>I installed Laconia using this manual and its working fine, but I dont know how to get it federated. Can you please tell me, where to find info on that.</p>

<p>thanks, Friedrich</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085710">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=9a08bc30f7ed6146adee1cf28befcffe&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Håkan Eriksson</a>
                </div>
                <a href="#comment-221085710" class="permalink"><time datetime="2008-09-14T22:35:00">2008-09-14T22:35:00</time></a>
            </div>
            <div class="content"><p>I have Laconica 0.5.0 up and running at the adress: http://www.korvmedbrod.com</p>

<p>I have this installed on Dreamhost PS
I have trouble to get XMPP daemon to work, I only get error mess when i use $ ./scripts/startdaemon.sh .
Like this: 
Starting xmppdaemon.php...
Parse error: syntax error, unexpected T_STRING in /my_laconica_path/lib/util.php on line 543
DONE.</p>

<p>I have switched over to PHP5 in the DH panel, can anybody help me, please!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085712">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=52ebf2886689d49f720426ac88337f9f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Webcubes</a>
                </div>
                <a href="#comment-221085712" class="permalink"><time datetime="2008-09-15T09:23:59">2008-09-15T09:23:59</time></a>
            </div>
            <div class="content"><p>Hello,
I have a laconica installation and it works well except for the IM and mail stuff.
When I run xmppdaemon.php, I get the daemon working and can post notices, but the daemon dtops working and the jabber(update@domain.com) get signed off. I get the following error while I run xmppdaemon
on a PHP5 linux box.</p>

<p>Unknown error type: [2048] Assigning the return value of new by reference is deprecated (/home/adelphus/public_html/pear/PEAR.php:563)
Unknown error type: [2048] Assigning the return value of new by reference is deprecated (/home/adelphus/public_html/pear/PEAR.php:566)
Unknown error type: [2048] Non-static method PEAR::getStaticProperty() should not be called statically (/home/adelphus/public_html/blog/lib/common.php:93)
Unknown error type: [2048] Assigning the return value of new by reference is deprecated (/home/adelphus/public_html/pear/Mail.php:154)
Unknown error type: [8] Undefined offset:  3 (/home/adelphus/public_html/blog/lib/jabber.php:57)
Unknown error type: [8] Use of undefined constant CLAIM_TIMEOUT - assumed 'CLAIM_TIMEOUT' (/home/adelphus/public_html/blog/xmppdaemon.php:341)
Unknown error type: [2048] Non-static method PEAR::getStaticProperty() should not be called statically, assuming $this from incompatible context (/home/adelphus/public_html/pear/DB/DataObject.php:4101)
Unknown error type: [2048] Non-static method PEAR::getStaticProperty() should not be called statically, assuming $this from incompatible context (/home/adelphus/public_html/pear/DB/DataObject.php:2236)
Unknown error type: [2048] Non-static method DB::connect() should not be called statically, assuming $this from incompatible context (/home/adelphus/public_html/pear/DB/DataObject.php:2241)
Unknown error type: [2048] Non-static method DB::parseDSN() should not be called statically, assuming $this from incompatible context (/home/adelphus/public_html/pear/DB.php:520)
Unknown error type: [2048] Assigning the return value of new by reference is deprecated (/home/adelphus/public_html/pear/DB/common.php:1017)
Unknown error type: [2048] Assigning the return value of new by reference is deprecated (/home/adelphus/public_html/pear/DB/common.php:1220)
Unknown error type: [2048] Non-static method DB::isError() should not be called statically, assuming $this from incompatible context (/home/adelphus/public_html/pear/DB.php:557)
Unknown error type: [2048] Non-static method PEAR::isError() should not be called statically, assuming $this from incompatible context (/home/adelphus/public_html/pear/DB/DataObject.php:2260)
Unknown error type: [2048] is_a(): Deprecated. Please use the instanceof operator (/home/adelphus/public_html/pear/PEAR.php:275)
Unknown error type: [2048] Non-static method PEAR::isError() should not be called statically, assuming $this from incompatible context (/home/adelphus/public_html/pear/DB/DataObject.php:2132)
...........</p>

<p>Can anyone help me with this issue?</p>

<p>Thanks,
Webcubes</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085715">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=dce9ab336a72f676e33929c4fed7664d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">ta</a>
                </div>
                <a href="#comment-221085715" class="permalink"><time datetime="2008-09-19T00:14:12">2008-09-19T00:14:12</time></a>
            </div>
            <div class="content"><p>Hi,</p>

<p>It would be great if somebody can help me on this:</p>

<p>XML Parsing Error: no element found
Location: http://localhost/laconica/index.php?action=public
Line Number 1, Column 1:</p>

<p>Thanks</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085718">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://raseel.in/techblog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4f84cfc2e3b54a9d2f9977d3d34fa323&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://raseel.in/techblog">Raseel</a>
                </div>
                <a href="#comment-221085718" class="permalink"><time datetime="2008-09-27T21:37:58">2008-09-27T21:37:58</time></a>
            </div>
            <div class="content"><p>How do you fix the following error : 
"Parse error: syntax error, unexpected T_STRING in /my_laconica_path/lib/util.php on line 532"</p>

<p>Its in the function common_set_user()/</p></div>
            
        </li>
    
        </ul>
    
        </div>
    