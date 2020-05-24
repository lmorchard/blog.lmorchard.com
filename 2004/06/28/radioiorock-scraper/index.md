Lately, my iTunes has been playing [radioio Rock][rock] almost exclusively lately, but one thing that peeves me is that I don't seem to see the current song while the stream's playing.  Instead, the [radioio][radioio] site offers a pop-up window that displays the last few songs in the playlist.  However, I'm usually somewhere off in another window or a shell and don't really feel like popping over to a browser and navigating to the playlist just to see what this song is.

So, I wrote myself a little mini-scraper script:

    #!/bin/sh
    
    curl -s 'http://player.radioio.com/player.php?b=614&#38;stream=radioioRock' | \
        tidy -asxml --wrap 300 -q -f /dev/null | \
        xml sel -t -m "//*[@class='leadrock']" -v '.' -n \
            -o '    [http://www.radioio.com' -v '../@href' -o ']' -n 

The output looks something like this:

    [06/29 11:01:08] deusx@Caffeina2:~ % radioio
    
    Vast - I Need To Say Goodbye
        [http://www.radioio.com...]
    Cure - The End Of The World
        [http://www.radioio.com...]
    Seachange - Avs Co 10
        [http://www.radioio.com...]
    Pixies - Bam Thwok
        [http://www.radioio.com...]
    Death Cab For Cutie - The New Year
        [http://www.radioio.com...]
    Lovethugs - Drawing The Curtains
        [http://www.radioio.com...]

Oh yeah, and to run this script, you will need these tools:

* [curl][curl]
* [HTML Tidy][tidy] 
* [XMLStarlet][xmlstarlet]

Personally, I like the included URLs (which I edited here for length) since they launch a search for CDs by the artist.  However, you can cut the output down to just the artist/title by removing the final line of the script and the backslash at the end of the line before.

If you like a different [radioio][radioio] station, say [radioio Eclectic][eclectic], you can change `stream=radioioRock` to `stream=radioioEclectic` in the URL above and change `class='leadrock'` to `class='leadeclectic'`.  I could have parameterized these, but I'm lazy, and that was the whole point!

ShareAndEnjoy!

[curl]: http://curl.haxx.se/
[tidy]: http://tidy.sourceforge.net/
[xmlstarlet]: http://xmlstar.sourceforge.net/
[rock]: http://www.radioio.com/radioiorock.php?stream=radioioRock
[radioio]: http://www.radioio.com/
[eclectic]: http://www.radioio.com/radioioeclectic.php?stream=radioioEclectic
<!--more-->
shortname=radioiorock_scraper

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087229">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.bytecloud.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7388f3fd9cfa9436c5282542aaccf4fd&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.bytecloud.com">Mike Carter</a>
                </div>
                <a href="#comment-221087229" class="permalink"><time datetime="2004-07-01T07:39:45">2004-07-01T07:39:45</time></a>
            </div>
            <div class="content">I was listening to some streams today for the first time in a while and I was thinking how annoying it was not to know the track names.  Thanks for posting this, it may come in handy!</div>
            
        </li>
    
        <li class="comment" id="comment-221087231">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://cpe000103c34069-cm014300001653.cpe.net.cable.rogers.com/weblogs/ben/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=871196de9b27ed994c30428eed59073c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://cpe000103c34069-cm014300001653.cpe.net.cable.rogers.com/weblogs/ben/">Gnomon</a>
                </div>
                <a href="#comment-221087231" class="permalink"><time datetime="2004-07-01T18:31:58">2004-07-01T18:31:58</time></a>
            </div>
            <div class="content">How is this the first time I've ever found out about XML Starlet? It's magnificent!

The application is cool, too, but /man/ - I'm going to have fun with XML Starlet. Thanks so very much for the pointer, Les!</div>
            
        </li>
    
        <li class="comment" id="comment-221087232">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.radioio.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0cfcb3aefaca714528c009a68810e8ec&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.radioio.com/">Jesse</a>
                </div>
                <a href="#comment-221087232" class="permalink"><time datetime="2005-01-23T11:50:41">2005-01-23T11:50:41</time></a>
            </div>
            <div class="content">I was searching around with blowsearch.com today (which btw blows heheh) and found this entry.  This earl might be of interest to ya:
http://69.28.133.51:1040/7.html
The db for searchplay and our players is only updated every 30 seconds, 7.html is near reatime right from our playback software.  :)

We used to have title streaming on our mp3 streams but are in transition of server and encoding software atm while we prepare to roll out our own software, and will be adding new formats such as heaac.  :)

Too much to talk about, we have a LOT of stuff planned for 2005-2006 that we've been working on (and patent pending) for years now.  Definately going to be exciting time for net radio.  Thanks for your interest Leslie.

jesse
chief tinkerer of toys,
radioio</div>
            
        </li>
    
        </ul>
    
        </div>
    