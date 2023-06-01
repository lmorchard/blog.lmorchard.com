---
comments_archived: true
date: '2004-04-30T09:06:11-04:00'
excerpt: I went a little nuts tonight with shell scripting.
layout: post
tags:
- colophon
title: Fun with shell scripting
wordpress_id: 517
wordpress_slug: fun-with-shell-scripting
wordpress_url: http://www.decafbad.com/blog/?p=517
---
I went a little nuts tonight with shell scripting.  It started off with a few innocent bits of [`cat`][cat] and [`grep`][grep] piped together.  But then I invited trouble [started using][parse_log] [`sed`][sed].  Pretty soon, I was bringing in [`cut`][cut] and [`sort`][sort] and [`uniq`][uniq].  I knew I was doomed when I made the whole mess [start emailing me][mail400report] with [`sendmail`][sendmail].  

Oh, but then I went completely off the deep end.  I looked up [RSS 3.0][rss30], since that's so much easier to generate on the fly.  I started producing that with a little help from [`echo`][echo] and [`awk`][awk].  From there, I whipped up [a quick v3.0 to v0.91 converter][rss300to091] so I could get something [my aggregator][dbagg2] could understand.

It was all a very iterative process down a slippery slope of geekiness, and the resulting scripts are nothing that I'd've designed as such from scratch.  But, one thing led to another, and now I've got a [nightly report emailed][mail400report] to me of pages that have gone 404 and 500, and an [RSS feed of referers][referrers_rss] to boot.

I'm sure it looks like completely braindead work, but it was fun!  

[echo]: http://www.rt.com/man/echo.1.html
[awk]: http://www.rt.com/man/awk.1.html
[sendmail]: http://www.rt.com/man/sendmail.8.html
[cat]: http://www.rt.com/man/cat.1.html
[grep]: http://www.rt.com/man/grep.1.html
[sed]: http://www.rt.com/man/sed.1.html
[cut]: http://www.rt.com/man/cut.1.html
[sort]: http://www.rt.com/man/sort.1.html
[uniq]: http://www.rt.com/man/uniq.1.html
[referrers_rss]: http://www.decafbad.com/cvs/*checkout*/www.decafbad.com/bin/gen_referer_feed.sh
[dbagg2]: http://www.decafbad.com/cvs/dbagg2/
[rss300to091]: http://www.decafbad.com/cvs/*checkout*/www.decafbad.com/bin/rss300to091.py
[parse_log]: http://www.decafbad.com/cvs/*checkout*/www.decafbad.com/bin/parse_access_log
[mail400report]: http://www.decafbad.com/cvs/*checkout*/www.decafbad.com/bin/mail_500_400_report.sh
[rss30]: http://www.aaronsw.com/2002/rss30

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086528">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://msittig.wubi.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a233a0b9bf67e939e7575b36e626744d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://msittig.wubi.org/">Micah</a>
                </div>
                <a href="#comment-221086528" class="permalink"><time datetime="2004-04-30T09:21:59">2004-04-30T09:21:59</time></a>
            </div>
            <div class="content">Is "sort | uniq" the same as "sort -u" ?  Uniq is cool, though, I'd never seen it before.  And very nice scripts, it's (almost) always fun to read other peoples' code.</div>
            
        </li>
    
        <li class="comment" id="comment-221086530">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.ulaluma.com/pyx"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9e03aaf8edbe4b2c0d25e30ab9a69ffb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.ulaluma.com/pyx">Donovan Preston</a>
                </div>
                <a href="#comment-221086530" class="permalink"><time datetime="2004-04-30T12:01:48">2004-04-30T12:01:48</time></a>
            </div>
            <div class="content">Haha. RSS 3.0 is awesome. Nothing like a little almost-rfc822 to knock some sense into the blogging world. How long has it been around? I never notice these things, I don't pay any attention to any of the blog world bullshit. (Maybe I should.)</div>
            
        </li>
    
        <li class="comment" id="comment-221086531">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://diveintomark.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=357a20e8c56e69d6f9734d23ef9517e8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://diveintomark.org/">Mark</a>
                </div>
                <a href="#comment-221086531" class="permalink"><time datetime="2004-04-30T19:32:43">2004-04-30T19:32:43</time></a>
            </div>
            <div class="content">> I don’t pay any attention to any of the blog world bullshit. (Maybe I should.)

No!  No, you shouldn't!  Do not, under any circumstances, get sucked into that grungy, petty, venom-soaked little world!  Anyone who knows what I'm talking about will back me up on this, including Les.</div>
            
        </li>
    
        </ul>
    
        </div>
    