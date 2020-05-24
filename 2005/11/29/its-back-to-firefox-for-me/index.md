<blockquote cite="http://decafbad.com/blog/2005/10/28/its-back-to-omniweb-for-me">So, after a good solid several months’ run with Firefox, the constant CPU drain finally got to me and I’ve gone back to OmniWeb.</blockquote>
<small style="text-align:right; display:block">Source: <a href="http://decafbad.com/blog/2005/10/28/its-back-to-omniweb-for-me">It’s back to OmniWeb for me! » Archive » Blog » 0xDECAFBAD</a></small>

So, [since Firefox 1.5 has hit the wires][ff], I'm giving it a shot again.  I just can't stay put on web browsers, can I?  

I've been poking at the last few pre-release versions of Firefox and have been pleasantly surprised:  It doesn't seem to be the CPU hog it once was for me, and someone built a [Tab Sidebar extension][ts] which comes pretty close to the tab drawer I love in Omniweb.

Now, I just have to see if I can figure out a way to force the sidebar narrower than the 150px or so it insist upon as a minimum width—I really want 25px-50px thumbs in my tab thumbs.

[ts]: http://users.blueprintit.co.uk/~dave/web/firefox/tabsidebar/index.html
[ff]: http://arstechnica.com/news.ars/post/20051129-5644.html

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090156">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=d8333ea779e4c5403687c02b54ac7304&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Justin</a>
                </div>
                <a href="#comment-221090156" class="permalink"><time datetime="2005-11-30T03:01:42">2005-11-30T03:01:42</time></a>
            </div>
            <div class="content"><p>Add this to your <a href="http://www.mozilla.org/support/firefox/edit" rel="nofollow">userChrome.css</a>:</p>

<pre><code>#sidebar {
  min-width: 0px !important;
  max-width: none !important;
}
</code></pre>

<p>...or adjust to suit.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090157">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221090157" class="permalink"><time datetime="2005-11-30T04:27:53">2005-11-30T04:27:53</time></a>
            </div>
            <div class="content"><p>@Justin:  Thank you, sir!  That does the trick perfectly, although I did seem to tickle a slight bug where the sidebar resize strip didn't want to let go of my mouse...  but that seemed like a fluke.</p>

<p>(The funny thing is, most of the reason I posted this entry was in the hopes that someone would toss me a magic userChrome.css incantation that I hadn't yet dug out.)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090158">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://weblog.philringnalda.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2b6c1ba0915a97a81d59ca1e101e6d74&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://weblog.philringnalda.com/">Phil Ringnalda</a>
                </div>
                <a href="#comment-221090158" class="permalink"><time datetime="2005-11-30T05:19:58">2005-11-30T05:19:58</time></a>
            </div>
            <div class="content"><p>If you want to stay happy with Firefox, just try to go easy on the extensions: there are vastly more ways to leak in extension code than there are comprehensible lists of those ways put where an extension author might spot them. I've been in that state of seemingly-random runaway memory leaks and wild CPU usage any number of times, but never yet while I was using a clean, extension-free profile.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090159">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.8bitjoystick.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56649421e9c3e301529f3e69e34fc5c3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.8bitjoystick.com/">Jake of 8bitjoystick.com</a>
                </div>
                <a href="#comment-221090159" class="permalink"><time datetime="2005-11-30T16:26:02">2005-11-30T16:26:02</time></a>
            </div>
            <div class="content"><p>I have been using the1.5 Beta and RCs for a while nay and it is damn good on OSX</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090160">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://msittig.wubi.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a233a0b9bf67e939e7575b36e626744d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://msittig.wubi.org/">Micah</a>
                </div>
                <a href="#comment-221090160" class="permalink"><time datetime="2005-12-01T08:48:11">2005-12-01T08:48:11</time></a>
            </div>
            <div class="content"><p>I recently switched too... <a href="http://msittig.blogspot.com/2005/11/ahh-joys-of-fresh-firefox-install-with.html" title="Ah, the joys of a fresh Firefox install." rel="nofollow">from Mozilla</a>.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    