---
comments_archived: true
date: '2008-06-16T11:55:04-04:00'
layout: post
tags:
- firefox
- entries
- mozilla
- downloadday
title: Firefox 3 Download Day Mega Widget
wordpress_id: 1148
wordpress_slug: firefox-3-download-day-mega-widget
wordpress_url: http://decafbad.com/blog/?p=1148
---
**Update:** Oh, and rumor has it that this widget will switch to reporting on downloads, rather than pledges, once the main event has begun.

**Update 2:** It didn't *quite* go like clockwork, but this widget is now showing estimated downloads by countries, rather than pledges.

Thanks to the completion of [bug 435967][bug], I can offer this totally unofficial hack of a mega widget (better late than never):

<script type="text/javascript" src="http://decafbad.com/2008/download-day-top-ten.js"></script>

If you'd like, you can include this on your own site with a Copy-and-Paste of the following:

<textarea cols="80" rows="3"><script type="text/javascript" src="http://decafbad.com/2008/download-day-top-ten.js"></script></textarea>

This is a total 2-hour cut, paste, reformat, and slight rejigger of [Kent Brewster's work on Content Syndication with Case-Hardened JavaScript][kent].  Hopefully it works, because I'm [releasing early][early] before I've had a chance to check it out on anything besides the browsers in my lap.

[kent]: http://kentbrewster.com/case-hardened-javascript/
[bug]: https://bugzilla.mozilla.org/show_bug.cgi?id=436967
[early]: http://catb.org/~esr/writings/cathedral-bazaar/cathedral-bazaar/ar01s04.html

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089051">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://randomfoo.net/"><img src="http://disqus.com/api/users/avatars/lhl.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://randomfoo.net/">lhl</a>
                </div>
                <a href="#comment-221089051" class="permalink"><time datetime="2008-06-16T22:39:04">2008-06-16T22:39:04</time></a>
            </div>
            <div class="content"><p>nice.  are you getting any design help on that?  it's looking a bit plain.  </p>

<p>commas and right alignment on the numbers at the very least would help a lot.  and a total # (ooh, or a thermometer) would be neat.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089052">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.nitallica.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=58ba819c9940f5537bf278437dcbde46&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.nitallica.org/">Nicki</a>
                </div>
                <a href="#comment-221089052" class="permalink"><time datetime="2008-06-16T23:34:07">2008-06-16T23:34:07</time></a>
            </div>
            <div class="content"><p>I pasted your code into a post on my blog, it doesn't line up quite as nicely as yours.  (isn't near as wide either, even though I have plenty of room)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089054">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089054" class="permalink"><time datetime="2008-06-16T23:39:03">2008-06-16T23:39:03</time></a>
            </div>
            <div class="content"><p>@leonard: Nope, no design help - this was a 2 hour hack over a few days, including the server-side patch to get JSON out of the site.  In fact, throwing in the Download Day logo was a last minute afterthought just before I posted this entry at lunch.  Patches welcome :)</p>

<p>@nicki: Hmm, it does look quite a bit smaller on your site.  I might poke at the CSS a bit on my server to make it look nicer, since the styling I've done is very minimal.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089056">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089056" class="permalink"><time datetime="2008-06-17T00:03:35">2008-06-17T00:03:35</time></a>
            </div>
            <div class="content"><p>I've tweaked the CSS for this thing a bit to make it more uniform across blogs, though not completely so.</p>

<p>Additionally, I've added some config parameters if anyone would like to play with restyling it:</p>

<pre>
  &lt;script type="text/javascript" src="http://decafbad.com/2008/download-day-top-ten.js"&gt;
      {
          "id":"my-widget",
          "css":"http://localhost/~lorchard/download-day-top-ten.css"
      }
  &lt;/script&gt;
</pre>

<p>These will let you set the HTML ID for the widget, and the CSS file that gets dynamically loaded, respectively.  One of the things I'm trying to do with this thing is hack a little closer toward having a tiny "widget framework" based on Kent's work.</p>

<p>But, I'm a cruddy designer, so that part probably won't improve :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089058">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.nitallica.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=58ba819c9940f5537bf278437dcbde46&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.nitallica.org/">Nicki</a>
                </div>
                <a href="#comment-221089058" class="permalink"><time datetime="2008-06-17T00:18:48">2008-06-17T00:18:48</time></a>
            </div>
            <div class="content"><p>Looks fantabulous, thank you!  :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089059">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://ontheblink.pijusmagnificus.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8d9581b1399bf199f095ae630f5faee7&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://ontheblink.pijusmagnificus.com/">willyaranda</a>
                </div>
                <a href="#comment-221089059" class="permalink"><time datetime="2008-06-17T11:24:26">2008-06-17T11:24:26</time></a>
            </div>
            <div class="content"><p>Is it me, or all pledges are 10x of the real (I mean, there is "0" at the end of each country)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089063">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089063" class="permalink"><time datetime="2008-06-17T14:16:30">2008-06-17T14:16:30</time></a>
            </div>
            <div class="content"><p>@willyaranda: Nope, it's not you, it's a bug.  Ugh.  Thanks for catching it - it should be fixed now.  Man, I <em>wish</em> it were all 10x :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089065">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://crazy.ferrer-tura.org/wp/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=f88ee67fe7034f0b38f87a99a872fb3e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://crazy.ferrer-tura.org/wp/">crazyserver</a>
                </div>
                <a href="#comment-221089065" class="permalink"><time datetime="2008-06-17T14:59:11">2008-06-17T14:59:11</time></a>
            </div>
            <div class="content"><p>Thanks to you and your widget!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089095">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://kentbrewster.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2439fcc9b49533342befb7391ef74823&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://kentbrewster.com">Kent Brewster</a>
                </div>
                <a href="#comment-221089095" class="permalink"><time datetime="2008-06-17T16:00:21">2008-06-17T16:00:21</time></a>
            </div>
            <div class="content"><p>Hey, nicely done!  </p>

<p>For what it's worth, the presentation layer may be created by generating the stylesheet on the fly, avoiding the extra HTTP call.  I need to update Case-Hardened JavaScript to show how; for now, curious readers may visit my cleverly-hidden Web 2.0 presentation, here: <a href="http://kentbrewster.com/badges/" rel="nofollow">http://kentbrewster.com/badges/</a>, and see a quick example.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089096">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089096" class="permalink"><time datetime="2008-06-17T16:04:37">2008-06-17T16:04:37</time></a>
            </div>
            <div class="content"><p>@Kent: Yeah, as further steps I was thinking of rolling in the CSS bits, and maybe flirting with some innerHTML evil to declare the initial widget in plain HTML rather than DOM construction calls.  This was an event-inspired hack, but I've been meaning to tinker more with this stuff for ages :)  Thanks for advancing the state of art!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089098">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=e565565d22668e6c84c1e0056cde50cb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">رضا باقرزادخ</a>
                </div>
                <a href="#comment-221089098" class="permalink"><time datetime="2008-06-18T16:20:13">2008-06-18T16:20:13</time></a>
            </div>
            <div class="content"><p>بنیاد موزیلا باید به ایران به عنوان یکی از ده کشور برتر حامی خود توجه بیشتری نماید و در فارسی سازی افزونه ها و وب سایت اصلی خود شرکت اقدامات مقتضی را انجام نماید.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089100">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089100" class="permalink"><time datetime="2008-06-18T17:18:14">2008-06-18T17:18:14</time></a>
            </div>
            <div class="content"><p>I don't understand this language, but it doesn't seem like spam—as long as you've not called my mother any nasty names, I thank you for the comment :)</p>

<p>(And any translations would be welcome!)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089102">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.myspace.com/haned_azizi"><img src="http://www.gravatar.com/avatar.php?gravatar_id=418e13700d77f3d3df7cfc9c5c7af656&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.myspace.com/haned_azizi">hamed</a>
                </div>
                <a href="#comment-221089102" class="permalink"><time datetime="2008-06-18T17:35:33">2008-06-18T17:35:33</time></a>
            </div>
            <div class="content"><p>the best forever
incomparable forever
on top forever
all favorite forever</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089105">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=3143f946051a70781b275baf1f5ce851&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">مهدی احمدزاده</a>
                </div>
                <a href="#comment-221089105" class="permalink"><time datetime="2008-06-18T18:16:39">2008-06-18T18:16:39</time></a>
            </div>
            <div class="content"><p>از مرورگر موزیلا بسیار راضیم 
بچه ها شما هم بگیرید</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089109">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=2cbeb3be9b480036d4163445af0777df&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">YAGHOON</a>
                </div>
                <a href="#comment-221089109" class="permalink"><time datetime="2008-06-18T18:36:18">2008-06-18T18:36:18</time></a>
            </div>
            <div class="content"><p>شرکت موزیلا ببین که ایرانین جو ده کشور دانلود کننده فایر فاکس هستند</p>

<p>پس چرا سایت و خود برنامه فایر فاکس رو فارسی نمیکنی؟</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089111">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=f4f797ba7a740b11c7af96300d764554&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">iman</a>
                </div>
                <a href="#comment-221089111" class="permalink"><time datetime="2008-06-18T19:12:12">2008-06-18T19:12:12</time></a>
            </div>
            <div class="content"><p>VIVA IRAN
We Are Waiting For Your Persian Services MOZILLA !!!!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089114">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=15a3b96a93affe52cceb1ad30432ac13&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">دلگرفته</a>
                </div>
                <a href="#comment-221089114" class="permalink"><time datetime="2008-06-18T19:27:30">2008-06-18T19:27:30</time></a>
            </div>
            <div class="content"><p>خوشحالم که ایران هم بله ... !!!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089118">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=474be7b0d36f0d636ef9f3dd380a4724&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">mahdy</a>
                </div>
                <a href="#comment-221089118" class="permalink"><time datetime="2008-06-18T20:14:56">2008-06-18T20:14:56</time></a>
            </div>
            <div class="content"><p>http://www.iranian-it.net/itf/showthread.php?tid=1348</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089121">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.sm-xenon.tk"><img src="http://www.gravatar.com/avatar.php?gravatar_id=09bde47ddb4a4476de4a92ad8c0d1737&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.sm-xenon.tk">xendes</a>
                </div>
                <a href="#comment-221089121" class="permalink"><time datetime="2008-06-18T20:14:57">2008-06-18T20:14:57</time></a>
            </div>
            <div class="content"><p>بهتره opera</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089123">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=dfaa81351aebb977aaacfa5a34f91060&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">madx22</a>
                </div>
                <a href="#comment-221089123" class="permalink"><time datetime="2008-06-18T21:29:05">2008-06-18T21:29:05</time></a>
            </div>
            <div class="content"><p>firefox .!! we are here . ( iranian people)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089125">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=9e1e5a194c9bc10b95c981c7ebf5676c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">madx22</a>
                </div>
                <a href="#comment-221089125" class="permalink"><time datetime="2008-06-18T21:30:28">2008-06-18T21:30:28</time></a>
            </div>
            <div class="content"><p>hey FireFox !!!</p>

<p>We are here! </p>

<p>(Iranian people)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089126">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://monib.deviantart.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=f9df3c4f5fb98f4e95ec3580c3efcb7c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://monib.deviantart.com">Monib</a>
                </div>
                <a href="#comment-221089126" class="permalink"><time datetime="2008-06-18T22:29:44">2008-06-18T22:29:44</time></a>
            </div>
            <div class="content"><p>I'm proud to be a Firefox user and also to see Iran in top-ten list. I'm glad Iranians are a part of this celebration:)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089130">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=563ebbf5ca45b952ccd6120135c95559&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">bandekhoda</a>
                </div>
                <a href="#comment-221089130" class="permalink"><time datetime="2008-06-18T22:37:34">2008-06-18T22:37:34</time></a>
            </div>
            <div class="content"><p>akhe chera kos sher migin ... tu iran ki internet dare ke betune hamun 10 mego dw kone , yani vaghean fekr mikonin iran az canda ham bishtar dw karde? akhe cheghad shomaha koskholid
pas chera iran tu in nist ? http://downloadcounter.sj.mozilla.com/</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089133">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.ghohestan.ir"><img src="http://www.gravatar.com/avatar.php?gravatar_id=99f7739a1c50710b119ca632b229b88d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.ghohestan.ir">Hadi</a>
                </div>
                <a href="#comment-221089133" class="permalink"><time datetime="2008-06-19T04:02:47">2008-06-19T04:02:47</time></a>
            </div>
            <div class="content"><p>سلام
با تشکر از زحمات بنیاد موزیلا
خوشحالم شدم در مورد رکوردشکنی فایرفاکس
امیدوارم زبان فارسی نیز جزو زبان های رسمی موزیلا باشه
به امید آن روز</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089136">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=939b07cf96056dcf297a645048c81f95&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">sajad</a>
                </div>
                <a href="#comment-221089136" class="permalink"><time datetime="2008-06-19T05:46:25">2008-06-19T05:46:25</time></a>
            </div>
            <div class="content"><p>از موزیلا بدم میاد opera بهتره</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089137">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=681012fa90e64a17666714328d7f951c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">سيد محسن منتظري</a>
                </div>
                <a href="#comment-221089137" class="permalink"><time datetime="2008-06-19T06:49:49">2008-06-19T06:49:49</time></a>
            </div>
            <div class="content"><p>متأسفانه تنظيم نمايش عدد به فارسي كه پيش از اين از قسمت
bidi.numeral
انجام مي شد در نسخه جديد اين امكان وجود ندارد و اعداد را به فارسي نمايش نمي دهد</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089138">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=95d313b9c152a0912e153279cd3658fc&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">asghar</a>
                </div>
                <a href="#comment-221089138" class="permalink"><time datetime="2008-06-19T07:13:43">2008-06-19T07:13:43</time></a>
            </div>
            <div class="content"><p>با سلام و عرض تبریک به حضور تمامی فایر فاکس دوستان</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089141">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.Iran-Novin.ir"><img src="http://www.gravatar.com/avatar.php?gravatar_id=12609ffd940ec52227e038201285b528&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.Iran-Novin.ir">هادی قمرزاده</a>
                </div>
                <a href="#comment-221089141" class="permalink"><time datetime="2008-06-19T07:16:32">2008-06-19T07:16:32</time></a>
            </div>
            <div class="content"><p>فوق العاده بود . واقعا این فایرفاکس مهشره . اویول به  همه ایرانیا</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089146">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=0018e9d62511e5c75602226cdcb89627&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">behrouz</a>
                </div>
                <a href="#comment-221089146" class="permalink"><time datetime="2008-06-19T07:32:39">2008-06-19T07:32:39</time></a>
            </div>
            <div class="content"><p>yashain iran usaki</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089147">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=0018e9d62511e5c75602226cdcb89627&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">behrouz</a>
                </div>
                <a href="#comment-221089147" class="permalink"><time datetime="2008-06-19T07:34:30">2008-06-19T07:34:30</time></a>
            </div>
            <div class="content"><p>kaf kardam roy in torkaro kam kardim</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089149">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.HyperRay.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9825c7e86be630042d4e018c6c2023cc&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.HyperRay.com">Bardia</a>
                </div>
                <a href="#comment-221089149" class="permalink"><time datetime="2008-06-19T09:22:24">2008-06-19T09:22:24</time></a>
            </div>
            <div class="content"><p>اینم جواب bandekhoda
پس چرا ایران تو این لیست هستش : 
http://www.spreadfirefox.com/en-US/worldrecord/
اون لیست یه لیست ساده و استاتیک هستش</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089153">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=1bff1af695cca6a57486a3f3fc120783&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Milad</a>
                </div>
                <a href="#comment-221089153" class="permalink"><time datetime="2008-06-19T10:11:39">2008-06-19T10:11:39</time></a>
            </div>
            <div class="content"><p>Hi mozilla Company.
Im in IRAN and offer all my friends to downloading FF3
Because IRANIAN people LOVE ''Firefox''
IRANIANS need more support from MOZILLA.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089155">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.pardisiha84.blogfa.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=86848b15dd6387b67bbec7d94d0b5324&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.pardisiha84.blogfa.com">reza</a>
                </div>
                <a href="#comment-221089155" class="permalink"><time datetime="2008-06-19T10:34:56">2008-06-19T10:34:56</time></a>
            </div>
            <div class="content"><p>i love mozilla</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089157">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.Delphi-Magic.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d49a6853f60501ef8dd972685e2c5f3b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.Delphi-Magic.com">بابک احدی</a>
                </div>
                <a href="#comment-221089157" class="permalink"><time datetime="2008-06-19T12:38:58">2008-06-19T12:38:58</time></a>
            </div>
            <div class="content"><p>فقط میتونم بگم آخرشه . بهترین پیمانه و استاندارد برای برنامه نویسان و طراحان وب!!!!
Just FireFox
It's The Best Solution For Web Designer !!!!</p>

<p>Be Fun</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089161">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.Delphi-Magic.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d49a6853f60501ef8dd972685e2c5f3b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.Delphi-Magic.com">بابک احدی</a>
                </div>
                <a href="#comment-221089161" class="permalink"><time datetime="2008-06-19T12:42:40">2008-06-19T12:42:40</time></a>
            </div>
            <div class="content"><p>We Are Waiting For Persian Language and Other Additional for IRANian Users!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089163">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.saeedsasha.blogsky.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7bdc1c24a0df3ef103473689cf903b9a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.saeedsasha.blogsky.com">saeed</a>
                </div>
                <a href="#comment-221089163" class="permalink"><time datetime="2008-06-19T12:59:22">2008-06-19T12:59:22</time></a>
            </div>
            <div class="content"><p>امیدوارم زبان فارسی نیز جزو زبان های رسمی موزیلا باشه</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089165">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.Aronet.ir"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c0bb60a0b8ad6c245ee2b99737cb3d5f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.Aronet.ir">AraSh</a>
                </div>
                <a href="#comment-221089165" class="permalink"><time datetime="2008-06-19T15:47:09">2008-06-19T15:47:09</time></a>
            </div>
            <div class="content"><p>سلام
ما ایرانیان با کمترین شرایط بهره وری از اینترنت حماسه می آفرینیم
با سپاس</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089167">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=5b60e8c3d6045b2bd417e8fe30de8088&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Bad Boys</a>
                </div>
                <a href="#comment-221089167" class="permalink"><time datetime="2008-06-19T16:44:11">2008-06-19T16:44:11</time></a>
            </div>
            <div class="content"><p>Hey MOZILLA !!!
We are here for support you and so 
waiting for your PERSIAN services. ( from PERSIAN boys )</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089170">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=eb482626701c612d9af4659ac79b52c1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Daniyal</a>
                </div>
                <a href="#comment-221089170" class="permalink"><time datetime="2008-06-19T19:06:18">2008-06-19T19:06:18</time></a>
            </div>
            <div class="content"><p>به نظر من هم موزیلا بهترین مرورگر اینترنته شرکت موزیلا هم باید امکانات فارسی رو به این همه کاربر فارسی زبان که از این مورورگر خوب استفاده میکنن اختصاص بده 
ای ول به Firefox</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089172">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=a99749d467807fad8578ba59233a6d77&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">mohammad</a>
                </div>
                <a href="#comment-221089172" class="permalink"><time datetime="2008-06-19T20:46:55">2008-06-19T20:46:55</time></a>
            </div>
            <div class="content"><p>we support the mozilla project with download firefox3.
viva Firefox viva persia...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089175">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://einiproxy.blogfa.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c62565c54c565454be274aa2caa3eb8a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://einiproxy.blogfa.com">mohammad</a>
                </div>
                <a href="#comment-221089175" class="permalink"><time datetime="2008-06-19T21:14:24">2008-06-19T21:14:24</time></a>
            </div>
            <div class="content"><p>hi.
please start mozila by persian language for iranian.
please.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089182">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=32ca6963405e74e99b1f50bc4c9cefef&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Farzad</a>
                </div>
                <a href="#comment-221089182" class="permalink"><time datetime="2008-06-19T22:08:00">2008-06-19T22:08:00</time></a>
            </div>
            <div class="content"><p>persian menu?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089185">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=32ca6963405e74e99b1f50bc4c9cefef&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Farzad</a>
                </div>
                <a href="#comment-221089185" class="permalink"><time datetime="2008-06-19T22:09:17">2008-06-19T22:09:17</time></a>
            </div>
            <div class="content"><p>ایول 
فایر فاکس 3 خیلی عالیه</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089186">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089186" class="permalink"><time datetime="2008-06-19T23:41:24">2008-06-19T23:41:24</time></a>
            </div>
            <div class="content"><p>So, I think what you're all saying is that you'd like Firefox in Persian?  :)</p>

<p>But alas, while I appreciate the sentiment, I don't think an entry on my blog about a JavaScript widget is the best place to rally support for the cause.  Of course, localizing a JavaScript widget might be interesting someday...</p></div>
            
        </li>
    
        </ul>
    
        </div>
    