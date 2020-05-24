I'm still not entirely sold on <a href="http://www.decafbad.com/twiki/bin/view/Main/Python">Python</a> and <a href="http://www.decafbad.com/twiki/bin/view/Main/Twisted">Twisted</a> as the foundation for my <a href="http://www.decafbad.com/twiki/bin/view/Main/PersonalWebProxy">PersonalWebProxy</a>.  Yeah, I know I just release a bunch of code to that effect, but it's still just a proof of concept.  While there are some impressive things in <a href="http://www.decafbad.com/twiki/bin/view/Main/Twisted">Twisted</a> and <a href="http://www.decafbad.com/twiki/bin/view/Main/Python">Python</a>, there's also a lot of flux and immaturity there.  Not a bad thing, since the hackers in that camp are doing mad crazy things, but I don't want to focus on mad crazy things in my toolkit - I want to focus on mad crazy things built on top of it.  The thing I've been hoping for is that some of those mad crazy things in the toolkit would <strong>enable</strong> even madder crazier things down the line for me.  This may be true still - so I'm not tossing anything out, just still experimenting.
<br /><br />
So far, this is just playing for me.  For fun, I think I might do the whole thing over again in Java and play in parallel for a little while.  Well, not quite all over, since I think I've found some pretty ready-made components:
<br /><br />
Take <a href="http://muffin.doit.org/" target="_top">Muffin</a>, for example.  It's a Java proxy that looks like it's been dormant for quite awhile, but seems ideal on the surface for my needs.  Just today, though, I checked back in the project's CVS repository and it seems that there's new activity and checkins starting up in there.  On the other hand, I've also been poking at Jetty and the proxy classes it comes with.  Seems like there's a lot to work with here, and I have a better vibe about it.
<br /><br />
Besides that, Jena seems stronger than rdflib for <a href="http://www.decafbad.com/twiki/bin/view/Main/RDF">RDF</a> support, and I'm just biting at the bit to pour damn near everything at Apache Jakarta into this thing.  Also, I suspect I may be able to preserve the quick scripty hackability I want out of the this thing by using BSF and Jython, with some assembly and config in BML.
<br /><br />
Hmm.  Still tinkering.
<!--more-->
shortname=ooocgg

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221083341">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.miceda-data.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0e2337e0f52978e8ef6f7f400dad10ff&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.miceda-data.com">Dave Bryson</a>
                </div>
                <a href="#comment-221083341" class="permalink"><time datetime="2003-01-09T18:33:32">2003-01-09T18:33:32</time></a>
            </div>
            <div class="content">I've been bouncing between Java and Python working on RDF myself lately.  I first tried rdflib with ZODB but ended up back with Jena.  Maybe it's just my newbieness ( is that a word? ) with Python but Jena seems easier to work with for me.   What I need to do is spend more time coding the app and less time bouncing between languages :-)</div>
            
        </li>
    
        <li class="comment" id="comment-221083342">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=4d36a40c304b021a4ec3db86b526e8c5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Lucas Gonze</a>
                </div>
                <a href="#comment-221083342" class="permalink"><time datetime="2003-01-10T13:54:24">2003-01-10T13:54:24</time></a>
            </div>
            <div class="content">My experience with muffin was really good.  It's hackable and robust.  The lack of buzz is IMO because it was too far ahead of its time for people to get.</div>
            
        </li>
    
        <li class="comment" id="comment-221083344">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.metrony.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e203a339d0ee65a24af38df8a01c3696&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.metrony.com">Aaron Held</a>
                </div>
                <a href="#comment-221083344" class="permalink"><time datetime="2003-01-14T18:51:23">2003-01-14T18:51:23</time></a>
            </div>
            <div class="content">Take a look at Webware ( http://webware.sf.net/ )

It has a clean servlet programming style and is easy to extend.

I'm runnning a number of business critcal apps on it and its very stable.  Try the CVS version, its stable and a new release is on the way.</div>
            
        </li>
    
        </ul>
    
        </div>
    