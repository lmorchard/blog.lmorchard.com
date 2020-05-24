<p>
Okay, I may be the last person fiddling with Flash to
discover this, but here's what I've learned today:
</p>
<p>
<a href="http://www.macromedia.com/support/flash/ts/documents/cant_load_jpg.htm"><b>Flash MX hates progressive JPEGs.</b></a>
</p>
<p>
From the above: "<i>The Macromedia Flash Player does not have a
decompressor for progressive JPEG images, therefore files of this type
cannot be loaded dynamically and will not display when using the
loadMovie action.</i>"
</p>
<p>
This would have been nice to know, hours ago.  Or maybe fixed in
the past year or so since the above linked tech note.  See, although
I'm a Jack of a lot of Trades, I don't really pay attention much
to things like JPEGs and their progressive natures.  It wasn't
until I finally started randomly clicking buttons on and off in
Macromedia Fireworks while exporting a test JPEG that I finally
narrowed down the problem.
</p>
<p>
This was after a day worth of examining ActionScript, XML data,
HTTP headers, and a mess of other random dead ends.  And a lot of
last-ditch random and exhaustive twiddling of checkboxes and
options.
</p>
<p>
<b>Then</b>, once I had the words I
wouldn't have had unless I already knew what my problem was, a Google search for
"<a href="http://www.google.com/search?q=flash+progressive+jpeg&ie=UTF-8&oe=UTF-8">flash progressive jpeg</a>"
got me all kinds of info.
</p>
<p>
Problem is, the JPEGs supplied to the particular Flash app on which
I'm hacking come from a random assortment of people working through
a content management system on the backend.  They upload them
with a form in their browser, and this Flash app gets a URL to the
image via an XML doc it loads.  Me, I'm probably in bed when this
happens.  I'd love to have tested every one... er, rather, no I
wouldn't.
</p>
<p>
So... Now I just have to figure out how to get all these people
to start making sure that their JPEGs aren't progressive.  Hmph.
</p>
<p>
I can only hope that this message gets indexed and maybe provides
more triangulation for some other poor sucker in the future.
</p>
<!--more-->
shortname=flash_hates_progressive_jpeg

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090485">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://aaronland.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9b704dff33489e0ba50f7a6364a8bf5a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://aaronland.net">Aaron of Montreal</a>
                </div>
                <a href="#comment-221090485" class="permalink"><time datetime="2003-09-19T15:01:02">2003-09-19T15:01:02</time></a>
            </div>
            <div class="content">FYI : 

http://studio.imagemagick.org/pipermail/magick-users/2003-May/008922.html</div>
            
        </li>
    
        <li class="comment" id="comment-221090486">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.m14m.net/bloglet.php"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4a798b64b3d34d2377959729761f68b2&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.m14m.net/bloglet.php">Moss Collum</a>
                </div>
                <a href="#comment-221090486" class="permalink"><time datetime="2003-09-19T16:02:38">2003-09-19T16:02:38</time></a>
            </div>
            <div class="content">Wow... and here's me just embarking on a project in Flash that's going to have to deal with JPEGs uploaded by random people on the web. Thank you, I think you've just saved me a lot of trouble.</div>
            
        </li>
    
        <li class="comment" id="comment-221090488">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dougal.gunters.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9f2c8c704e6bf55bc51399157c5283a9&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dougal.gunters.org/">Dougal Campbell</a>
                </div>
                <a href="#comment-221090488" class="permalink"><time datetime="2003-09-19T16:43:43">2003-09-19T16:43:43</time></a>
            </div>
            <div class="content">And of course, there's always the GD library, too, which may or may not be easier to install than ImageMagick. Many PHP environments already have it, in case that helps. Yaarrr!

Just gdImageCreateFromJpeg, gdImageInterlace, then gdImageJpeg, and you can get a non-interlaced version of your image.</div>
            
        </li>
    
        <li class="comment" id="comment-221090489">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://admin.support.journurl.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4df556273eae91df768e9af6e4efdfcc&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://admin.support.journurl.com/">Roger Benningfield</a>
                </div>
                <a href="#comment-221090489" class="permalink"><time datetime="2003-09-20T13:21:31">2003-09-20T13:21:31</time></a>
            </div>
            <div class="content">Just another option I stumbled across:

http://www.img2swf.com/about.htm</div>
            
        </li>
    
        </ul>
    
        </div>
    