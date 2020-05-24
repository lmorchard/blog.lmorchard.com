<p>John Robb <a href="http://jrobb.userland.com/2002/09/19.html#a2542">writes</a>: "Wouldn't it be interesting to have an <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> variant (new name obviously) for subscribing to personal contact data off of weblogs?"</p>
<p>I read that DJ Adams <a href="http://www.pipetree.com/qmacro/2002/Jul/15#foaf">was just playing</a> with <a href="http://xmlns.com/foaf/0.1/">FOAF</a> not too long ago, and at the time it made me want to dig into <a href="http://www.decafbad.com/twiki/bin/view/Main/RDF">RDF</a> more.  But, work got busy and I promptly got distracted away.  If anything, though, I could see something like <a href="http://www.decafbad.com/twiki/bin/view/Main/FOAF">FOAF</a> being really nice as a start for this purpose.  Of course, there's <a href="http://www.imc.org/pdi/">vCard</a>, but I think it wouldn't be very hard to convert to it from <a href="http://www.decafbad.com/twiki/bin/view/Main/FOAF">FOAF</a>.  The universality and connectivity that <a href="http://www.decafbad.com/twiki/bin/view/Main/RDF">RDF</a> could bring to this seem terribly nice.  Throw in periodic auto-refresh, either literally by scheduled re-query, or by pub/sub notification, and you've got a neat auto-updating address book just for starters.</p>
<!--more-->
shortname=ooobhc

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089867">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5a70d939a73fa73603f2a9255ab81d21&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki">BillSeitz</a>
                </div>
                <a href="#comment-221089867" class="permalink"><time datetime="2002-09-20T13:50:25">2002-09-20T13:50:25</time></a>
            </div>
            <div class="content">I think it's sad that (a) FOAF is so poorly documented, and (b) so few people, even from the RDF/SW community, have entries. It seems like this is a great "starter app" to try and build critical mass on, but RDF crowd seems to prefer being a puddle than a pool, or something....

http://webseitz.fluxent.com/wiki/FOAF</div>
            
        </li>
    
        <li class="comment" id="comment-221089868">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philringnalda.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e68e9944f50a481a64b5a32fdfc02e0d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philringnalda.com/">Phil Ringnalda</a>
                </div>
                <a href="#comment-221089868" class="permalink"><time datetime="2002-09-20T13:57:15">2002-09-20T13:57:15</time></a>
            </div>
            <div class="content">Sort of related: Ben's talking about converting OSX address books to FOAF.

One possible snag in using FOAF: it's mostly aimed at identifying who you are and who you know/knows you, rather than distributing contact info, so although it uses email addresses as identifiers, it allows a SHA1 hash rather than the actual address. I guess it would be reasonable to have your public throwdown address in clear text, ready for yet another spambot to grab, with everything else hashed.</div>
            
        </li>
    
        <li class="comment" id="comment-221089869">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.redmonk.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=f5d280e17d5f7340d7d1dc6728c5a335&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.redmonk.net">Steve Ivy</a>
                </div>
                <a href="#comment-221089869" class="permalink"><time datetime="2002-09-20T14:01:58">2002-09-20T14:01:58</time></a>
            </div>
            <div class="content">As much as I like RDF and FOAF, isn't this whht LDAP (and OpenDirectory) are for? OS X's addressBook (and I'm pretty sure M$'s stuff too) already comes with LDAP connectivity built in. It ain't webloggy or all that, but it's there...</div>
            
        </li>
    
        <li class="comment" id="comment-221089870">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089870" class="permalink"><time datetime="2002-09-20T14:41:26">2002-09-20T14:41:26</time></a>
            </div>
            <div class="content">It ain't webloggy or all that, but it's there...

It's where? :)  I installed an LDAP server at my company, but I doubt UserLand will install an LDAP server for everyone.  And I don't think they should.

What appeals to me about something like FOAF (or something better) is that it's a file you can throw up at a URL.  It's dumb.  Everyone can get cheap hosting these days.  The smarts go into your address book, or maybe a centrallized contact info aggregation server somewhere that polls your registered URL.  Maybe *that* aggregation server has an LDAP interface to use as a bridge.

This appeals to me as a nice compromise between centralization and decentralization</div>
            
        </li>
    
        <li class="comment" id="comment-221089872">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://weblog.burningbird.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=fab5bffa5622f63e6b0ff81a2b0e3956&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://weblog.burningbird.net">Burningbird</a>
                </div>
                <a href="#comment-221089872" class="permalink"><time datetime="2002-09-20T15:49:12">2002-09-20T15:49:12</time></a>
            </div>
            <div class="content">LDAP is an implementation of identification control rather than a generic, "here's who I am" statement. One could easily incorporate FOAF into LDAP, but one couldn't easily incorporate LDAP into anything else (unless one stripped out the data structures and incorporate them -- interesting idea worth exploring further).

I think there needs to be more discussion of FOAF and what type of information should be recorded to 'identify' oneself.

Also, I think the important thing to start focusing on is the focus of the vocabularies and implementations, such as FOAF, rather than the fact that they use RDF. RDF is a model, and RDF/XML is a serialization, but the real business is FOAF (or whatever is being discussed).

BTW, there was effort to translate vCard into RDF at http://www.w3.org/TR/vcard-rdf. I don't believe it reflects recent activities associated with RDF.</div>
            
        </li>
    
        <li class="comment" id="comment-221089873">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.kunekt.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=394ffdd7ae0ffb1f121f07765d1f83e8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.kunekt.com">Ian Bruk</a>
                </div>
                <a href="#comment-221089873" class="permalink"><time datetime="2002-10-05T05:37:19">2002-10-05T05:37:19</time></a>
            </div>
            <div class="content">We've implemented a tool that converts vCards to RSS and RDF. You can try it out at www.kunekt.com.
You can then place a "Kunekt Card" button on your web site that points to this URL. I'm using Drupal (PHP based Web Log) to develop a contact manager for these files.</div>
            
        </li>
    
        </ul>
    
        </div>
    