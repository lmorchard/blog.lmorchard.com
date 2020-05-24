Listened to a few really good podcasts today...

* [I've written about wanting this][before], but today I cobbled together an experimental podcast of the [Dr. Demento Show][demento] for myself using [cron][cron], [brag][brag], and [dirCaster][dircaster] on an old iBook-turned-server at home.  It's password protected (which works in iTunes, by the way), probably short-lived, certainly not condoned by anyone empowered to condone this sort of thing--and no, I'm not sharing.

[cron]: http://www.unixgeeks.org/security/newbie/unix/cron-1.html2
[demento]: http://www.drdemento.com/
[brag]: http://brag.sourceforge.net/jindex.html
[dircaster]: http://www.shadydentist.com/wordpress/software/dircaster
[before]: http://www.decafbad.com/blog/2005/03/08/doctor_demento_as_podcast

* By similar means, I've acquired a slew of [X Minus One][xm1] and [Dimension X][dx] episodes as MP3s.  I'm tempted to make a BitTorrent-based podcast from those.  I'm not at all certain about the legality, but I do know that I was thoroughly enjoying an "old time radio" audio stream of these shows all last Winter.

[xm1]: http://members.aol.com/jimfnshr/radio/x_minus_one.html
[dx]: http://otrsite.com/logs/logd1013.htm

* You know, I never knew that [Bruce Campbell][bc] had been in a remake of [The Love Bug][bug].  It came up in an interview during [Slice of Scifi #15][sos15], where they were grousing about all the recent remakes and he said something to the effect of "That one's so old, even *I've* done a remake of it..."

[bc]: http://www.imdb.com/name/nm0132257/
[bug]: http://www.imdb.com/title/tt0119571/
[sos15]: http://www.sliceofscifi.com/archives/slice_of_sci-fi_015.html

* So far, [The Seanachai][sean] has been brilliant.  I keep thinking I'd really like to do a podcast like this, producing 5-15 minute weekly fiction segments.  Check out [How to Succeed at Evil][evil]...  It's like side stories from [The Tick][tick].  I love the brain-in-a-jar Dalek-esque villain giving himself continual mild concussions as his grey matter repeatedly bumps up against the glass.  (*boonk*, "ow.")  Don't miss the rest of the archives, either.

[tick]: http://www.cs.rose-hulman.edu/~stinerkt/Tick.html
[sean]: http://www.goodwordsrightorder.com/
[evil]: http://goodwordsrightorder.com/index.php?blog=2&#38;p=47&#38;more=1&#38;c=1&#38;tb=1&#38;pb=1#more47

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085036">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=3719c90654b2372160ab0938b3c6d884&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Lee</a>
                </div>
                <a href="#comment-221085036" class="permalink"><time datetime="2005-07-26T22:59:11">2005-07-26T22:59:11</time></a>
            </div>
            <div class="content">Podcast this, podcast that. It's just streaming audio for god's sakes! It's not some strictly iPod-related technology, it's not *new* technology by any stretch of the imagination, and it's not a new compression scheme either. I don't see what the big deal is. Why can't people just say, hey, I put up this damn MP3 for download. It certainly speaks a lot more than some stupid buzzword.</div>
            
        </li>
    
        <li class="comment" id="comment-221085037">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8a5273f79cfe7579ad46023f93377aa8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m. orchard</a>
                </div>
                <a href="#comment-221085037" class="permalink"><time datetime="2005-07-26T23:24:08">2005-07-26T23:24:08</time></a>
            </div>
            <div class="content">Lee:  You don't get it.

No, it's not streaming audio.  My car doesn't get audio streams, nor do I when I'm out walking.  I also don't have to sit down and listen when the show happens to be on.

Yes, in the past, I've timeshifted / downloaded audio streams using some ripper tool and taken the cached stream with me.  But this time, I don't have to do anything-- it's timeshifted and cached to begin with.  This is what's different.

Also, you could say "Hey, I put this MP3 up for download," but that'd be stupid.  Instead, push that notification in machine readable form into an RSS feed.  

On the other end, I have a machine (iTunes 4.9, most recently) that reads your feed and I don't have to pay attention and download anything myself-- it just shows up and I've got it by the time I think to look for it.  This is what's different.

Put it all together, and you've got something that's actually a new thing.  It's a kind of subscription-based, timeshifted audio tech we didn't have before.  (At least, not for free.)

It's different enough that it needs a new word to hang the concept from-- thus, podcasting.</div>
            
        </li>
    
        <li class="comment" id="comment-221085038">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=665b78d0565078210ae9f72ed147a804&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Dan</a>
                </div>
                <a href="#comment-221085038" class="permalink"><time datetime="2005-07-28T01:16:18">2005-07-28T01:16:18</time></a>
            </div>
            <div class="content">I do something similar to turn public radio RealAudio streams (All Things Considered, This American Life) into daily podcasts for ITunes 4.9.

cron -> mplayer (with RealAudio DLLs) -> lame gives me the .mp3 file.

cron -> wget (NPR website for show data) -> custom shell script builds the RSS file with description text

Scripts are quick and dirty but surprisingly reliable. Now I can listen to my favorite shows on my subway commute!</div>
            
        </li>
    
        <li class="comment" id="comment-221085040">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8a5273f79cfe7579ad46023f93377aa8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">l.m. orchard</a>
                </div>
                <a href="#comment-221085040" class="permalink"><time datetime="2005-07-28T06:12:04">2005-07-28T06:12:04</time></a>
            </div>
            <div class="content">Dan: Ah, so that actually works?  I read about he mplayer trick awhile ago, but haven't taken the time to get all the pieces together.  I'll have to check that out, because I really want a This American Life  podcast :)

I have a USB FM Radio tuner, but all my stationary computers are in the basement at the moment... and, well, the reception is not so good.</div>
            
        </li>
    
        <li class="comment" id="comment-221085042">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://the-inbetween.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=f117e0c299aeebcd32c7fad5c43941dc&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://the-inbetween.com">nowak</a>
                </div>
                <a href="#comment-221085042" class="permalink"><time datetime="2005-08-11T11:51:03">2005-08-11T11:51:03</time></a>
            </div>
            <div class="content">I just wish that the new word for the concept wasn't so tied to someone else's brand (and anyone that says that the POD stands for "Personal On Demand" is full of it).

Too bad that "Syndicated audio download and syncing software" isn't catchy enough, but it's acronym sure is!</div>
            
        </li>
    
        <li class="comment" id="comment-221085043">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=90b560bef7e596ef848bfdc5bc6169c2&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Kevin</a>
                </div>
                <a href="#comment-221085043" class="permalink"><time datetime="2005-08-11T12:37:18">2005-08-11T12:37:18</time></a>
            </div>
            <div class="content">OK, I think people are just not getting it about podcasts.  The name podcast came about because the people smart enough to make this all come about, HAPPENED TO OWN IPODS!  Get over it -the system works on others, it's a catchy name, and it's in millions of homes already.  

If you are sick of so-called 'stupid' or biased names then 1)Get smart, 2)Create something new, and 3)Call it I'mSoSmartCasting -until then, start enjoying the fruits of other peoples' labors and leave them be when they name it what they want.</div>
            
        </li>
    
        <li class="comment" id="comment-221085044">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://jackkonblog.blogspot.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=6ee23e2be161988996f69c7a48d10daf&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://jackkonblog.blogspot.com/">Jack Krupansky</a>
                </div>
                <a href="#comment-221085044" class="permalink"><time datetime="2005-08-11T17:26:54">2005-08-11T17:26:54</time></a>
            </div>
            <div class="content">Call it what it really is:  Old wine in a new bottle.  Of course, there's nothing wrong with new bottle's per se.  A convenient handle, easy-pour, easy open/close, more appealing packaging, better distribution whatever.

I agree that podcasting is really nothing intrinsically *new*, other than the packaging and distribution, but in our consumer economy, packaging and distribution are everything.

Note:  I see a lot of references to podcasts which do *not* involve the use of web feeds, such as "Click here to download our podcast", are these misuses of the term "podcast"?  In other words, is the concept of a podcast inherently linked to the mechanism for distribution (i.e., via XML web feed)?

-- Jack Krupansky</div>
            
        </li>
    
        <li class="comment" id="comment-221085045">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8a5273f79cfe7579ad46023f93377aa8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">l.m. orchard</a>
                </div>
                <a href="#comment-221085045" class="permalink"><time datetime="2005-08-11T17:48:13">2005-08-11T17:48:13</time></a>
            </div>
            <div class="content">Jack:  Yes, anyone who serves up a page with a link to an MP3 and calls that a podcast doesn't know what the term means.  They're just trying to ride the buzz without a clue.

Feed subscription and automated download is the not-so-secret sauce of podcasting.  Automation is the key.  Otherwise, you might as well choose long division over using a calculator.</div>
            
        </li>
    
        <li class="comment" id="comment-221085046">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=e0e01aa1d857dad66320e6c060fd5060&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Mike Prescott</a>
                </div>
                <a href="#comment-221085046" class="permalink"><time datetime="2005-08-18T18:44:40">2005-08-18T18:44:40</time></a>
            </div>
            <div class="content">Streaming audio = technology
Streaming audio + rss feed + podcatcher + whatever else I missed = service
we're a service oriented society

I still like ReplayRadio (VCR for internet radio) because it doesn't require RSS which alot of the shows I like on BBC haven't gone to yet. Once they do, byebye ReplayRadio completely.</div>
            
        </li>
    
        </ul>
    
        </div>
    