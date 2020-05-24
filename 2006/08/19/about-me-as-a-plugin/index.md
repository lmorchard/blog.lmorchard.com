<blockquote cite="http://www.voidstar.com/node.php?id=2779">We need both ends of this. We need the social networks to be able to import the data. But we also need the personal blog software to support an "About Me" page that maintains and publishes the master copy.</blockquote><div class="quotesource">Source: <a href="http://www.voidstar.com/node.php?id=2779">Voidstar - Personal About Me Pages and account creation</a></div>

This sounds like a perfect job for a decent WordPress plugin, which could double as a standalone PHP app.

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088157">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://protocol7.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=817b8e1e4735de76cf27a9d3976bd66b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://protocol7.com">Niklas Gustavsson</a>
                </div>
                <a href="#comment-221088157" class="permalink"><time datetime="2006-08-21T19:25:37">2006-08-21T19:25:37</time></a>
            </div>
            <div class="content"><p>Sounds a lot like what the OpenID protocol with the Simple Registration extension aims at. Using, for example, the PHP implementation of the OpenID server, you could maintain your identity (as long as it supports Simple Registration). Then, at the site where you'r required to register, you simply fill in your OpenID identifier and the rest is magic. </p>

<p>There is also a Wordpress plugin (http://singpolyma-tech.blogspot.com/2006/04/openid-for-wordpress.html) available that will run a server within Wordpress, if that's what you would like.</p>

<p>Personally I use the myopenid.com server, but running your own should be just fine. That's the point of a distributed identity system :-) You can read a little bit more about my experience setting it up in Wordpress here: http://www.protocol7.com/archives/2006/08/21/openid-on-protocol7/</p>

<p>/niklas</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088159">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221088159" class="permalink"><time datetime="2006-08-21T20:12:53">2006-08-21T20:12:53</time></a>
            </div>
            <div class="content"><p>Having an OpenID endpoint here is one part of what I'd like to do.  The other is a kind of NetVibes-ish public aggregation of all my output from other sites, and to point new services here as I join them to import my already-provided details.  So, beyond the auth that OpenID provides, I want other sites to read my hCard and profile data etc.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088161">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://protocol7.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=817b8e1e4735de76cf27a9d3976bd66b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://protocol7.com">Niklas Gustavsson</a>
                </div>
                <a href="#comment-221088161" class="permalink"><time datetime="2006-08-21T22:00:10">2006-08-21T22:00:10</time></a>
            </div>
            <div class="content"><p>Not sure if it will allow for all the information you would like to provide, but simple registration does allow for a site where you authenticate with OpenID to retrive the needed data. The subset of information (http://openid.net/specs/openid-simple-registration-extension-1<em>0.html#response</em>format) might be limiting though. Of course, that won't include more rich data collected at other sites, like your del.icio.us links.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    