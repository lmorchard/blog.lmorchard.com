---
comments_archived: true
date: '2005-12-19T06:01:08-05:00'
layout: post
tags:
- asides
title: FeedBurner feeds give heartburn to PHP XML parsers?
wordpress_id: 805
wordpress_slug: feedburner-feeds-give-heartburn-to-php-xml-parsers
wordpress_url: http://decafbad.com/blog/?p=805
---
**Final Update**: *Actually, it turns out that feeding raw, uncompressed gzip streams to PHP XML parsers causes heartburn.  Go figure.  [I guess that teaches me to poke the lazyweb with a stick.][poke]*

[poke]: http://decafbad.com/blog/2005/12/19/sometimes-the-lazyweb-delivers-with-a-deluge

I'm trying to chase this bug down, but is it just me or do FeedBurner feeds give trouble to PHP XML parsers? (*No, it's just me.*)  These three scripts <strike>break</strike> *do not break*:

* FeedBurner feed - <http://feeds.feedburner.com/AVc>
* JSON via Magpie parsing — <http://decafbad.com/2005/12/FeedMagick/www-bin/as-json.php?in=http%3A%2F%2Ffeeds.feedburner.com%2FAVc>
* Passthough with SAX parsing — <http://decafbad.com/2005/12/FeedMagick/www-bin/passthru-sax.php?in=http%3A%2F%2Ffeeds.feedburner.com%2FAVc>
* Passthough with DOM parsing — <http://decafbad.com/2005/12/FeedMagick/www-bin/passthru-dom.php?in=http%3A%2F%2Ffeeds.feedburner.com%2FAVc>

I'm willing to blame my own ineptitude, except that the error in MagpieRSS parsing happens in the bowels of that beast, right where the XML parsing happens... and that's not *my* code.

*Update*:  Actually, I think it's a different problem, but just one that FeedBurner feeds all happen to trigger.  Maybe something to do with the initial tag separated from the XML declaration by some whitespace?

*Update:* By the by, I don't *really* think MagpieRSS is a beast.  Although, I do feel like I'm in the belly of one when I'm wandering through PHP code in general.  And the "not my code" bit is mostly me trying to figure out what's breaking where and why—since Magpie works in other cases except where I'm abusing it.  More like *head-scratching* italics, not *finger-pointing* italics.  Seems like my code's breaking it, but it's not breaking *in my code*.

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082400">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://weblog.philringnalda.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2b6c1ba0915a97a81d59ca1e101e6d74&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://weblog.philringnalda.com/">Phil Ringnalda</a>
                </div>
                <a href="#comment-221082400" class="permalink"><time datetime="2005-12-19T06:40:20">2005-12-19T06:40:20</time></a>
            </div>
            <div class="content"><p>Among the things to twiddle would be the user-agent string you're sending, since the original point of Feedburner was to decide what was best for various UAs and vary what's sent accordingly. For what little it's worth, it works for me in Gregarius (which is some 0.7x MagpieRSS, though I'm not sure quite which).</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082401">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://laughingmeme.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=01457d1a0f0e533062cd0d1033fb4d7a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://laughingmeme.org">kellan</a>
                </div>
                <a href="#comment-221082401" class="permalink"><time datetime="2005-12-19T14:10:52">2005-12-19T14:10:52</time></a>
            </div>
            <div class="content"><p>there are 2 different PHP XML parsers (expat based and libxml based) depending on which version of PHP you're using, and a number of minor inconsistencies in the various implementations between versions using the same parser.  without knowing which PHP its impossible to speculate. </p>

<p>though Phil's suggestion seems like a good place to start.</p>

<blockquote>
  <p>… and that’s not my code.</p>
</blockquote>

<p>ouch</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082402">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082402" class="permalink"><time datetime="2005-12-19T14:36:22">2005-12-19T14:36:22</time></a>
            </div>
            <div class="content"><p>Kellan: Eek, the "that's not my code" bit wasn't meant as any slight against MagpieRSS... nor was calling it a beast.  Though after a night's sleep, it sure looks that way!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082404">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.burningdoor.com/eric"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d87fd636e249c068a94b8992fecedadc&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.burningdoor.com/eric">Eric Lunt</a>
                </div>
                <a href="#comment-221082404" class="permalink"><time datetime="2005-12-19T17:42:18">2005-12-19T17:42:18</time></a>
            </div>
            <div class="content"><p>Would you mind giving me more details as to what you think is giving the parser fits? I'm pretty sure the XML we send down is valid, but we've had to put workarounds in place for other user-agents. Right now, the only thing we have special for Magpie RSS is that we don't serve Atom to that user-agent if the version is 0.5.</p>

<p>If there's something we can fix on our side that would reduce breakage, I'm all for it.</p>

<p>Eric Lunt
CTO, FeedBurner</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082405">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082405" class="permalink"><time datetime="2005-12-19T18:18:49">2005-12-19T18:18:49</time></a>
            </div>
            <div class="content"><p>I probably should have done some more digging before posting, but I just ran into this problem and figured I'd throw up a flag hoping someone on the lazyweb knew just what the problem is.</p>

<p>I'm going to be poking into it more as I have time, though at the moment I don't even know enough to say for sure that FeedBurner's the culprit--just that every FeedBurner-processed feed triggers my bug.  Since no one else seems to know what the issue is right off the bat, my current thought is that it's something I've fumbled.  :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082406">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082406" class="permalink"><time datetime="2005-12-19T18:20:34">2005-12-19T18:20:34</time></a>
            </div>
            <div class="content"><p>Eric: Thanks for the fast response!  It makes me think even more that the issue's lurking in my own code, rather than in FeedBurner, since I figure you guys would have fixed an overall issue big enough to affect all PHP XML parsers :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082407">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://toys.lerdorf.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e915a97db0aeef46c5dd899d47c175ad&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://toys.lerdorf.com">Rasmus</a>
                </div>
                <a href="#comment-221082407" class="permalink"><time datetime="2005-12-19T20:09:19">2005-12-19T20:09:19</time></a>
            </div>
            <div class="content"><p>I wrote a simple little PHP 5.1-based RSS parser a while back and it doesn't have any problems with that http://feeds.feedburner.com/AVc feed.</p>

<p>See: http://lerdorf.com/test_rss.php?feed=http://feeds.feedburner.com/AVc</p>

<p>You can see the parser code here:</p>

<p>http://lerdorf.com/php/simple_rss.phps</p>

<p>And if you want to see how test_rss.php uses it, see:</p>

<p>http://lerdorf.com/test_rss.phps</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082408">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082408" class="permalink"><time datetime="2005-12-19T21:34:26">2005-12-19T21:34:26</time></a>
            </div>
            <div class="content"><p>Man, I got a response from key people across the board on this—author of MagpieRSS, CTO of FeedBurner, and the PHP Man himself!  I am now thoroughly convinced that the problem firmly lies within whatever odd things I'm doing in my code.  :)  Now I just have to get the spare time to figure out what's up.</p>

<p>Thanks for the responses, guys!  I couldn't <em>pay</em> for this kind of support.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082409">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://disqus.com/api/users/avatars/danmactough.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">danmactough</a>
                </div>
                <a href="#comment-221082409" class="permalink"><time datetime="2006-02-27T05:22:59">2006-02-27T05:22:59</time></a>
            </div>
            <div class="content"><p>Funny that I just encountered this problem, too. I discovered that the problem was that because my PHP script was using cURL to fetch a feed that was REDIRECTING to FeedBurner, cURL was crapping out unless I set a cURL option to follow redirects (where fopen would follow the redirect by default).</p>

<p>After I did that, I had no problem.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    