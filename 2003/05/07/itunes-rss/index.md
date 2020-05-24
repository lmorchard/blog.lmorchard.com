Yeah, I know I <a href="http://www.decafbad.com/blog/geek/itunes_does_drm.html" target="_top">gave the iTMS a 'bah'</a>
last week in response to discovering DRM under the hood.  But I've softened in
my opinion since then.  And bought a few more songs that I haven't heard in years.
And burned an Audio CD.  And wasn't <strong>too</strong> inconvenienced.  
<br /><br />
My girlfriend and I almost
bought iPods last night, and though we resisted the temptation this time, I expect that
we'll end up with them before long.  And when that happens, I imagine we'll try sharing
tracks, and that doesn't seem to be too inconvenient either.  And then, there's the
fact that the iTMS seems to have a pretty nifty set of underpinnings that look like
fun to play with.
<br /><br />
So now, like anything I'm interested in on the interweb, I want to swallow it up with my aggregator.
<br /><br />
Thus, I attempt a new project:  <a href="http://www.decafbad.com/twiki/bin/view/Main/ItunesMusicStoreToRss">ItunesMusicStoreToRss</a>
<br /><br />
Progress so far, but I've hit a stumbling block.  Anyone want to help?
<br /><br />
<strong>Update:</strong> A little bit of cut &amp; paste from the wiki page:
<br /><br />
If you spy on iTunes while browsing to a "Just Added" section of a genre, you'll find that a URL like the following is accessed: 
<br /><br />
<a href="http://ax.phobos.apple.com.edgesuite.net/WebObjects/MZStore.woa/wa/com.apple.jingle.app.store.DirectAction/viewPlayListsPage?fcId=145690&amp;pageType=justAdded&amp;id=21" target="_top">(it's a long URL)</a>
<br /><br />
The response to that URL is some very interesting XML that looks like a GUI language.  Buried in the GUI recipe, however, is what I want flowing into my aggregator.  So, I dust off my XSL skills and have a go at mangling this content into <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a>.  I seem to have been successful.  A test run appears to validate, and is accepted in my aggregator. 
<br /><br />
The problem, though, lies in the aforementioned URL.  Everything seems pretty clear and straightforward, and I can change genre's by supplying discovered ID's to the id parameter.  However, the  "fcid=145690" parameter  is an unknown to me.  It seems to change, though I haven't yet investigated its derivation or how often it changes.  I was working on things yesterday, and the value was one thing, this morning it was another. If the number is not valid, unexpected results happen, sometimes resulting in HTML output describing an application exception.  So, until the fcid mystery is solved, I've yet to automate this transformation. 
<br /><br />
Any ideas out there on the lazyweb?  Visit the wiki page (<a href="http://www.decafbad.com/twiki/bin/view/Main/ItunesMusicStoreToRss">ItunesMusicStoreToRss</a>) and feel free to poke fun at my XSL skills.
<!--more-->
shortname=itunes_rss

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090443">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.scifihifi.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a97f3ecb15bebb41d330c6e27457378f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.scifihifi.com">Buzz Andersen</a>
                </div>
                <a href="#comment-221090443" class="permalink"><time datetime="2003-05-07T16:30:16">2003-05-07T16:30:16</time></a>
            </div>
            <div class="content">What seems to be the problem?</div>
            
        </li>
    
        <li class="comment" id="comment-221090444">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221090444" class="permalink"><time datetime="2003-05-07T17:22:19">2003-05-07T17:22:19</time></a>
            </div>
            <div class="content">Oh, it's rambled about on the wiki page.  I just updated the blog entry with more info though.  Seems there's a parameter (fcid) to the URL for just added albums that I can't decipher.</div>
            
        </li>
    
        <li class="comment" id="comment-221090445">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.scifihifi.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a97f3ecb15bebb41d330c6e27457378f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.scifihifi.com">Buzz Andersen</a>
                </div>
                <a href="#comment-221090445" class="permalink"><time datetime="2003-05-07T19:07:37">2003-05-07T19:07:37</time></a>
            </div>
            <div class="content">Sorry--I'm not hip to the whole Wiki thing yet.  I'll take a look over there...</div>
            
        </li>
    
        <li class="comment" id="comment-221090446">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=190370de043f10f2760322e8902b137c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Nathan Pearson</a>
                </div>
                <a href="#comment-221090446" class="permalink"><time datetime="2003-05-08T04:17:54">2003-05-08T04:17:54</time></a>
            </div>
            <div class="content">I imagine fcId is tied to an internal value that's changed by a content management system.  Even if it changes a few times in a noticeable pattern, I don't imagine that it would be reliable forever.  The only foolproof way I can think of retrieving the contents of a (or all of them) Just Added 'playlist' is by doing the following;

1. Retrieving the XML from viewPlaylistsPage without any parameters and storing the attribute of the ViewGenre element that matches your preferred genre(s).  I don't imagine these would remain static for all time either, judging from the numbers;

2. For each genre id that was stored from step 1, load the XML from vewGenre?id=.  Find the GotoURL element that contains the text Just Added and grab it's url attribute.  Add on &batchNumber=0;

3. If you're fine with just one page being transformed, use the resulting XML for the transformation to RSS.  Otherwise, store the album information that you want to keep from the page and look for the value 'X-Y of Z'.  If Y and Z don't match, increment batchNumber and process the resulting XML.  Repeat for other genres.

It'd probably be best to cache the resulting RSS feed and let it live for at least 24 hours.  With at least three to four round trips to determine the albums in a playlist without knowledge of the fcId values, I don't imagine it would be very responsive.</div>
            
        </li>
    
        <li class="comment" id="comment-221090447">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221090447" class="permalink"><time datetime="2003-05-08T15:46:01">2003-05-08T15:46:01</time></a>
            </div>
            <div class="content">Nathan: Hrm...  Yeah, that's the approach I was afraid that I'd have to end up taking, but it's probably the most reliable.  Hmph.</div>
            
        </li>
    
        </ul>
    
        </div>
    