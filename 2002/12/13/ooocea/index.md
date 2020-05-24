<p>So I'm singing the <a href="http://www.decafbad.com/twiki/bin/view/Main/RDF">RDF</a> praises at work today.  I've gone through creating a very small proof-of-concept task tracking vocabulary in <a href="http://www.decafbad.com/twiki/bin/view/Main/RDF">RDF</a>.  Initially, it covers things such as clients, projects, tasks, workers, time card entries.  So far, I just have a vocabulary in RDFS and a sample load of data - both built by hand - but thanks to <a href="http://brownsauce.sourceforge.net" target="_top">the BrownSauce RDF browser</a>, I've been able to show off some nifty things.  I know I've linked to that project two days in a row now, but I think it was seeing things through that browser that finally turned the last tumbler in my mental lock on <a href="http://www.decafbad.com/twiki/bin/view/Main/RDF">RDF</a>.</p>
<p>As a demo to co-workers, just clicking through the linked resources, I can show who's managing what projects, who's been assigned what tasks, what a given person has worked on, etc.  And I just keep drilling through links showing one view of relations after another.  It's fun.  Someone said it looks like how they breeze through data on fake computers in TV shows.</p>
<p>Eventually what we want to do, if this proves to be useful, is expand this thing from just task tracking to slurp down more and more knowledge from around the organization and form a semantic intranet.  And, I think it can do it.  I just started getting <a href="http://www.hpl.hp.com/semweb/jena-top.html" target="_top">Jena</a> stashing statements into a <a href="http://www.decafbad.com/twiki/bin/view/Main/MySQL">MySQL</a> database, so my next steps are to start actually working up an application around the data.</p>
<p>So far so good.  I hope I'm not insane to be thinking this is easy.  Waiting for the enthusiasm to calm down so I can realistically take account of what warts are to be found in the current state of <a href="http://www.decafbad.com/twiki/bin/view/Main/RDF">RDF</a> art.</p>
<!--more-->
shortname=ooocea

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087195">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5a70d939a73fa73603f2a9255ab81d21&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki">BillSeitz</a>
                </div>
                <a href="#comment-221087195" class="permalink"><time datetime="2002-12-13T11:43:18">2002-12-13T11:43:18</time></a>
            </div>
            <div class="content">Have you looked at IsaViz as an RDF browser?</div>
            
        </li>
    
        <li class="comment" id="comment-221087196">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221087196" class="permalink"><time datetime="2002-12-13T12:22:37">2002-12-13T12:22:37</time></a>
            </div>
            <div class="content">Actually, I *had* looked at IsaViz yesterday.  It didn't seem to work very well on my Mac running OS X - mouse pointers disappearing, clunky windows and randomly disappearing graphics.  Not sure what the issue was, but it wasn't very positive for my first try</div>
            
        </li>
    
        <li class="comment" id="comment-221087197">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://weblog.burningbird.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=fab5bffa5622f63e6b0ff81a2b0e3956&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://weblog.burningbird.net">Burningbird</a>
                </div>
                <a href="#comment-221087197" class="permalink"><time datetime="2002-12-13T19:41:04">2002-12-13T19:41:04</time></a>
            </div>
            <div class="content">Thanks for pointing out Brownsauce! That was one I missed, and fell in love with when I played with it last night. However, must update my schema file.

And I am enjoying your explorations of RDF.</div>
            
        </li>
    
        </ul>
    
        </div>
    