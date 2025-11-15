---
comments_archived: true
date: '2005-06-08T16:15:43-04:00'
layout: post
title: Magic Microformat Forms Redux, Now with GreaseMonkey!
wordpress_id: 645
wordpress_slug: greasemonkey-magic
wordpress_url: http://www.decafbad.com/blog/?p=645
---
<i>**Update** (6/9): One quick note-- I've noticed that this little hack of mine has been called a "hack for Movable Type".  However, while I personally use Movable Type, this is a hack for ***textareas in FireFox***. 

Movable Type just happens to use textareas.  It's worth noting, however, that WordPress uses textareas too.  So does LiveJournal.  So do most comment posting forms.  This is bigger than a single blog package plugin-- that's the point.</i>

Whew.  So it looks like [the book][book] is out of my hands now, having finished the final reviews.  I have some more to say about that, but first I want to post the results of the last day or so of hacking I've done.

I've been working on the stuff for the book so long that I just had to do something else (ie. *not RSS or Atom*) to help clear my head.  But, I'm addicted to learning and building stuff.  So, although I did relax a bit since the main effort of the book passed--that is, relax as normal people define it--I just can't stop making things.  

So, I had a beer, cracked open [Dive Into GreaseMonkey][dig], and decided to make good on [that idea I wrote about last month][mmf].  Not only that, but I had a little free time over lunch today, so I downloaded a trial of [Snapz Pro X 2][snap] to try my hand at a little screencasting, ala [Jon Udell][udell].

I've got more things to say about all this, and my new found excitement for GreaseMonkey, but first I'll share the goods.

If you want to risk running my horribly premature code on your machine, here's the script:

* [magic_hcalendar.user.js][script]

If you'd like a preview of what it does, here's a movie:

* [magic_hcalendar.mov][mov]

And, just for the sake of completeness, here's a quick screen grab:

[<img src="http://www.decafbad.com/2005/06/magic_hcalendar.jpg" width="315" height="258" />](http://www.decafbad.com/2005/06/magic_hcalendar.jpg)

[udell]: http://www.infoworld.com/article/05/05/11/20OPstrategic_1.html
[snap]: http://www.ambrosiasw.com/utilities/snapzprox/
[dig]: http://diveintogreasemonkey.org/
[book]: http://www.wiley.com/WileyCDA/WileyTitle/productCd-0764597582.html
[mov]: http://www.decafbad.com/2005/06/magic_hcalendar.mov
[script]: http://www.decafbad.com/2005/06/magic_hcalendar.user.js
[mmf]: http://www.decafbad.com/blog/2005/05/17/magic_microformat_forms
<!--more-->
shortname=greasemonkey_magic

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082808">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://theryanking.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c846b78a4a4c978fd34ef965320a13b0&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://theryanking.com">ryan king</a>
                </div>
                <a href="#comment-221082808" class="permalink"><time datetime="2005-06-08T17:05:42">2005-06-08T17:05:42</time></a>
            </div>
            <div class="content">That's awesome.</div>
            
        </li>
    
        <li class="comment" id="comment-221082811">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://waxy.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9778692f86edb4232492de3be00ad578&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://waxy.org/">Andy Baio</a>
                </div>
                <a href="#comment-221082811" class="permalink"><time datetime="2005-06-08T18:05:05">2005-06-08T18:05:05</time></a>
            </div>
            <div class="content">Very cool.  If hCalendar gets popular, Upcoming.org could scrape events off of websites instead of people entering them directly into Upcoming.</div>
            
        </li>
    
        <li class="comment" id="comment-221082812">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://vielmetti.typepad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=41961d4385a56ed0724cb621b8814125&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://vielmetti.typepad.com">Edward Vielmetti</a>
                </div>
                <a href="#comment-221082812" class="permalink"><time datetime="2005-06-09T00:40:08">2005-06-09T00:40:08</time></a>
            </div>
            <div class="content">Nice screencast - didn't realize SnapZ did this.

Is there any way to go back and re-edit a form once you have filled it in, or is hacking the hCalendar parser left as an exercise to the reader?

(thinking of all of the other things that could be done with this kind of approach!)</div>
            
        </li>
    
        <li class="comment" id="comment-221082813">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://edward.oconnor.cx/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c8abacbf4e82f0e08300b693e1963351&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://edward.oconnor.cx/">Edward O'Connor</a>
                </div>
                <a href="#comment-221082813" class="permalink"><time datetime="2005-06-09T11:44:59">2005-06-09T11:44:59</time></a>
            </div>
            <div class="content">Sweet.</div>
            
        </li>
    
        <li class="comment" id="comment-221082815">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://disqus.com/api/users/avatars/bishless.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">bishless</a>
                </div>
                <a href="#comment-221082815" class="permalink"><time datetime="2005-06-09T11:50:06">2005-06-09T11:50:06</time></a>
            </div>
            <div class="content">Nice work!  [runs off to try it in WP]</div>
            
        </li>
    
        <li class="comment" id="comment-221082817">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.livejournal.com/users/blackcustard"><img src="http://www.gravatar.com/avatar.php?gravatar_id=96dd5db5ebd7a91a5df453707ffa8d8d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.livejournal.com/users/blackcustard">Matt Blackcustard</a>
                </div>
                <a href="#comment-221082817" class="permalink"><time datetime="2005-06-09T11:57:06">2005-06-09T11:57:06</time></a>
            </div>
            <div class="content">Congrats on getting the book done Les! Whew!</div>
            
        </li>
    
        <li class="comment" id="comment-221082818">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://george.hotelling.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=89242476196334aff51840e7c4dadad2&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://george.hotelling.net/">George Hotelling</a>
                </div>
                <a href="#comment-221082818" class="permalink"><time datetime="2005-06-15T09:10:24">2005-06-15T09:10:24</time></a>
            </div>
            <div class="content">For your next trick, how about a Greasemonkey script to detect hCal and add a link to a vCal file to add it to Apple's calendar program?  You know, the one whose name would be one-too-many-lower-case-letter-followed-by-Cal's for this comment.</div>
            
        </li>
    
        <li class="comment" id="comment-221082819">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philwilson.org/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=abb5e982d97d7539860141b7904ba31a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philwilson.org/blog/">Phil Wilson</a>
                </div>
                <a href="#comment-221082819" class="permalink"><time datetime="2006-03-09T23:27:35">2006-03-09T23:27:35</time></a>
            </div>
            <div class="content"><p>A version that works in GM 0.6.4 would be nice ;)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082820">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sankt-georg.info/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=ae9a23302dd0b6c269094b1cdc687cde&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sankt-georg.info/">Markus Merz</a>
                </div>
                <a href="#comment-221082820" class="permalink"><time datetime="2006-09-05T22:26:16">2006-09-05T22:26:16</time></a>
            </div>
            <div class="content"><p>The movie looks cool but the script doesn't work with the actual GM. Too bad, I really want to use that feature.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082821">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.net500.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=efe573e8c4acf8e99e2044cbb83c8793&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.net500.com">Les Booth</a>
                </div>
                <a href="#comment-221082821" class="permalink"><time datetime="2006-10-04T04:36:07">2006-10-04T04:36:07</time></a>
            </div>
            <div class="content"><p>Les ... this is a cool idea, but I've gone to WordPress (fomr their site and from my own server) and LiveJournal test areas and did NOT get the [hcal] to appear.  Don't know why ... but it just doesn't seem to work.  I hope their's a simple explanation .. like Operator Error! - that can easily get the [hcal] up and running. </p>

<p>Thanks .. </p>

<p>les</p></div>
            
        </li>
    
        </ul>
    
        </div>
    