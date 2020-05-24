Okay, so lately I've switched to using "[addressbarlets][addr]" for my [del.icio.us][] posting needs.  In particular, I've been using the [Super-Fast variety][superfast].  I cannot stress how much better these are than clicking links in the bookmark toolbar.  My [del.icio.us][] posting has converged that much closer to command-line / QuickSilver perfection.  

But, I just noticed that in my [del.icio.us][] RSS feed, the title "**del.icio.us warning: non-utf8 string! (sorry)**" has been popping up--especially on [Hot Links][hl], which includes my links on a regular basis.  

Well, although I'm not really all that hip to unicode and non-ASCII characters, it appears that things like [SmartyPants][] and the [use of chevrons in page titles][story] are throwing the monkey wrench for me when the addressbarlet picks up the `document.title`.  So, I decided to do a little sloppy butchery in my bookmarklet code to wrestle these titles into something acceptable.

After you've had a chance to try out / comprehend [the original versions][superfast], take a look at this revised addressbarlet:

* <a href="javascript:u=%22CHANGEME%22;us=[['\u201C','%22'],['\u201D','%22'],['\u2019',%22'%22],['\u2018',%22'%22],['\u2026',%22...%22],['\u00BB','-']];function es(p){for(var i=0;i<us.length;i++){p=p.replace(us[i][0],us[i][1])};p=p.replace(/[\u0080-\uFFFF]/g,'');return encodeURIComponent(p);};q=location.href;e=%22%22+(window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange().text);p=document.title;window.location.href=%22http://del.icio.us/%22+u+%22?jump=doclose&#38;tags=%22+es(%22%s%22)+%22&#38;url=%22+es(q)+%22&#38;description=%22+es(p)+%22&#38;extended=%22+es('%22'+e+'%22').replace(/ /g,%22+%22);">Post to del.icio.us and close</a>

In case, for some reason, that doesn't come through in this entry, here's the code which should appear in the HREF:

<textarea rows="10" cols="65" name="code" class="javascript">
    javascript:u=%22CHANGEME%22;us=[['\u201C','%22'],['\u201D','%22'],['\u2019',%22'%22],['\u2018',%22'%22],['\u2026',%22...%22],['\u00BB','-']];function es(p){for(var i=0;i<us .length;i++){p=p.replace(us[i][0],us[i][1])};p=p.replace(/[\u0080-\uFFFF]/g,'');return encodeURIComponent(p);};q=location.href;e=%22%22+(window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange().text);p=document.title;window.location.href=%22http://del.icio.us/%22+u+%22?jump=doclose&#38;tags=%22+es(%22%s%22)+%22&#38;url=%22+es(q)+%22&#38;description=%22+es(p)+%22&#38;extended=%22+es('%22'+e+'%22').replace(/ /g,%22+%22);</textarea>
	
I'm sure I have a few nasty bugs lurking in there, but basically I'm trying to reverse [SmartyPants][]--DummyPants, if you will--and crudely hack out everything that's not the usual ASCII.

If you happen to be having this problem, let me know if this code works for you.

[story]: http://www.365tomorrows.com/08/19/deo%e2%80%99s-hole/
[smartypants]: http://daringfireball.net/projects/smartypants/
[hl]: http://dev.upian.com/hotlinks/
[superfast]: http://ejohn.org/blog/super-fast-delicious-bookmarklet/
[del.icio.us]: http://del.icio.us
[addr]: http://naeblis.cx/rtomayko/2004/08/09/DeliciousAddresslets
<!--more-->
shortname=dummypants</us></textarea>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088797">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221088797" class="permalink"><time datetime="2005-08-20T00:47:22">2005-08-20T00:47:22</time></a>
            </div>
            <div class="content">del.icio.us understands UTF-8 (which is exactly what the message says, after all), and the characters you remove are expressed in Unicode codepoints.

The disconnect seems to happen when the page you're on is in an encoding other than UTF-8, in which case Firefox apparently escapes characters using their byte values from that encoding in `encodeURIComponent`. I have no idea why, or exactly where this problem happens; the JS docs say the function should always use the UTF-8 representation for the byte values.</div>
            
        </li>
    
        <li class="comment" id="comment-221088798">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://ejohn.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b3e04a46e85ad3e165d66f5d927eb609&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://ejohn.org/">John Resig</a>
                </div>
                <a href="#comment-221088798" class="permalink"><time datetime="2005-08-20T19:30:38">2005-08-20T19:30:38</time></a>
            </div>
            <div class="content">A very smart improvement of the original - I like it! I'll see if I can't include a link to it, before I forget.</div>
            
        </li>
    
        </ul>
    
        </div>
    