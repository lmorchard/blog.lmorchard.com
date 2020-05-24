Part of the reason this whole [must ignore][mi] thing with respect to feeds has me [a bit fired up][fir] is because it seems like so few feed processing tools out there embrace this idea.  And because of that, these tools are unfortunately brittle and prone to future shock.

For example, take [`Syndication.framework` on OS X][sx]:  Amongst the monkeys and ninjas and pirates and robots, you've got your standard *title-date-link-description* columns with a few other bits for good measure.  But, where's the data from [iTunes RSS extensions][ir]?  Nowhere, gone, lost.  If it was in the feed when `Syndication.framework` found it, it wasn't understood and so it wasn't retained after the parser finished chewing up and spitting the data into that DB table.

[I've written about shared feed processing foundations before][sf], but I don't think I've totally gotten the idea to gel in my head until now.  Here's the thing:  If you want feed processing tools that are useful for the general case, they have to be tolerant of things not understood.  Rather than intrusively breaking apart and recasting feed data into a predetermined data structure, you've got to remain hands-off as much as possible.

This is what I did in [FeedSpool][fs].  This code can subscribe to feeds, poll feed data periodically, and even work out which items in a feed are new—but it punts on everything else by only caring about where a feed starts and ends, and where its individual entries start and end.  *The rest is left in its original XML form.*  So, if there was data in there for iTunes?  It's still there, because [FeedSpool][fs] didn't know enough to do anything to it.

This is the major difference in feed processing model.  `Syndication.framework` loses information when it encounters things it doesn't understand.  [FeedSpool][fs] retains the information, because it leaves things alone when it doesn't know any better.

Now, this is not to pick on just `Syndication.framework`.  Despite the general-sounding name,  this framework is pretty much just around to power [Safari RSS][sr] and not [iTunes][itp] or anything else.  And as I said, pretty much every other feed processing framework and tool works in this manner.  Just about everybody uses a destructive process when they parse and marshal feed data into local-idiom structures.  

And this destructive process is fine when all you want to do is satisfy a specific purpose—display a few headlines, for example.  But if you're trying to build general-case feed plumbing, this is unacceptable and untenable.  If most everything in a feed item gets lost as it goes through a pipeline, [we might as well abandon feed extensions entirely in favor of microformats stuffed into the `description` tag][fmf]—an idea to which I'm not *entirely* opposed.

On the other hand, consider this:  This past summer, [Microsoft released an architectural overview about an OS-wide RSS framework in the upcoming Vista][ao].  Unfortunately, like many RSS and Vista related things from this past summer, all links have evaporated into a redirect to a single developers portal.  I can't figure out why they didn't just [redirect over to here][he], which took me a search and a few clicks to rediscover.

At any rate, there's one sentence in this overview that gives me hope for RSS as a general service in Windows Vista:  

"*It is also possible to access the item XML for applications that want to perform operations on the XML instead of using the item's properties.*"

So, dig that.  If it works the way I hope it does, RSS in Vista will take care of the subscriptions for you, poll the feed data, grab new stuff—but then it leaves the data intact for you to process whatever new and unanticipated feed payloads that may arrive.

That's how it *should* work.

[fmf]: http://decafbad.com/blog/2005/05/05/the-right-place-for-data-in-your-feed
[itp]: http://www.apple.com/itunes/podcasts/
[fir]: http://decafbad.com/blog/2005/12/13/feedmagick-the-feed-filter-that-doesnt-know-much-about-feeds
[sr]: http://www.apple.com/macosx/features/safari/
[he]: http://msdn.microsoft.com/windowsvista/building/rss/default.aspx?pull=/library/en-us/dnlong/html/rsssupportinlonghorn.asp
[tc]: http://msdn.microsoft.com/windowsvista/integrated/
[ao]: http://decafbad.com/blog/2005/06/28/four-thoughts-on-ms-rss-so-far
[fs]: http://decafbad.com/trac/wiki/FeedSpool
[ir]: http://phobos.apple.com/static/iTunesRSS.html
[sx]: http://decafbad.com/blog/2005/06/28/safarirssdb
[sf]: http://decafbad.com/blog/2005/06/28/building-a-proper-shared-syndication-feed-foundation
[mi]: http://www.xml.com/pub/a/2004/10/27/extend.html

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084486">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sevenroot.org/dlc/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=622a34307765c2f7c1dfdc7345842418&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sevenroot.org/dlc/">Darren Chamberlain</a>
                </div>
                <a href="#comment-221084486" class="permalink"><time datetime="2005-12-13T15:03:07">2005-12-13T15:03:07</time></a>
            </div>
            <div class="content"><blockquote>
  <p>If you want feed processing tools that are useful for the general case, they have to be tolerant of things not understood. Rather than intrusively breaking apart and recasting feed data into a predetermined data structure, you’ve got to remain hands-off as much as possible.</p>
</blockquote>

<p>It sounds to me like you're arguing for a triplestore and <a href="http://www.w3.org/TR/rdf-sparql-query/" rel="nofollow">SPARQL</a>.  You'd stash everything in the triple store, and then your front end app just needs to be able to construct the appropriate query and process the results.  More general and extensible than creating custom classes for filtering by specific fields, and I think if you were to ever write a general filter app where users can specify filter fields and values, you'd basically be reimplementing SPARQL.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084487">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084487" class="permalink"><time datetime="2005-12-13T15:51:47">2005-12-13T15:51:47</time></a>
            </div>
            <div class="content"><p>Well, a triplestore would be great if these feeds were RDF.  But alas, with the exception of RSS 1.0, they're XML.  I could play with trying to make transformations from XML to RDF, but that's getting back to a dangerously unlazy level of intelligence required to map unanticipated future feed extensions to RDF equivalents.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084488">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084488" class="permalink"><time datetime="2005-12-13T15:52:52">2005-12-13T15:52:52</time></a>
            </div>
            <div class="content"><p>(Although, it'd be really cool if syndication feeds were all RDF and not just XML.  Triples would be a lot nicer to sling around than SAX parsing events.)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084491">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sevenroot.org/dlc/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=622a34307765c2f7c1dfdc7345842418&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sevenroot.org/dlc/">Darren Chamberlain</a>
                </div>
                <a href="#comment-221084491" class="permalink"><time datetime="2005-12-13T20:09:47">2005-12-13T20:09:47</time></a>
            </div>
            <div class="content"><blockquote>
  <p>Well, a triplestore would be great if these feeds were RDF. But alas, with the exception of RSS 1.0, they’re XML. I could play with trying to make transformations from XML to RDF, but that’s getting back to a dangerously unlazy level of intelligence required to map unanticipated future feed extensions to RDF equivalents.</p>
</blockquote>

<p>Isn't there already a clean mapping between Atom and RDF?  There's a list of integration ideas <a href="http://www.imc.org/atom-syntax/mail-archive/msg16401.html" rel="nofollow">here</a>.</p>

<p>On a side note, while Googling for Atom/RDF notes, I came across <a href="http://www.blogsieve.com/" rel="nofollow">blogseive</a>, which claims to be:</p>

<blockquote>
  <p>...a free web-based tool that creates new feeds by filtering, merging and sorting existing feeds. The BlogSieve engine accepts virtually every (valid) feed format, processed results are then exported into any feed format you choose.</p>
</blockquote>

<p>I haven't tried it, but it claims to allow filtering.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084493">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084493" class="permalink"><time datetime="2005-12-13T21:26:27">2005-12-13T21:26:27</time></a>
            </div>
            <div class="content"><blockquote>
  <p>Isn’t there already a clean mapping between Atom and RDF?</p>
</blockquote>

<p>Maybe, though I don't think it's official.  And even it if is, it leaves out RSS.  But even if it worked for RSS too, what about all the feed extensions that might be?  I think RSS 1.0 had the right idea for extension modules in the RDF universe, but the world seems to be settling for XML.</p>

<blockquote>
  <p>I haven’t tried [Blogsieve], but it claims to allow filtering.</p>
</blockquote>

<p>It does filter, but it does so destructively.  (And that's not to mention the 7-8 step form I had to go through to start filtering.  Definitely not a URL-line application.)  But, with respect to their filtering and conversion, check out these feeds:</p>

<ul>
<li>http://del.icio.us/rss/deusx</li>
<li>http://feeds.blogsieve.com/192/RSS0.91</li>
<li>http://feeds.blogsieve.com/192/RSS1.0</li>
<li>http://feeds.blogsieve.com/192/RSS2.0</li>
<li>http://feeds.blogsieve.com/192/ATOM0.3</li>
</ul>

<p>If you compare these to each other, you'll find information loss and even just plain corruption.  The <code>dc:subject</code> elements encoding del.icio.us tags are gone, even in the RSS-1.0-to-RSS-1.0 transformation.  And somehow, in the Atom version, they managed to jumble up titles and authors.  Granted, my stuff doesn't do <em>conversion</em> yet, but I wouldn't want to do it like this.</p>

<p>I haven't tried it yet, but I'd have to guess that a podcast feed with iTunes and/or Yahoo! Media elements would get mangled in a very nasty way.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084496">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://boston.conman.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=bbb1c69b64019a3df907c3545186f907&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://boston.conman.org/">Sean Conner</a>
                </div>
                <a href="#comment-221084496" class="permalink"><time datetime="2005-12-13T22:34:35">2005-12-13T22:34:35</time></a>
            </div>
            <div class="content"><p>Wow, is it <em>really</em> 1985 again?  I could have sworn <a href="http://www.szonye.com/bradd/iff.html" rel="nofollow">all this was hashed out back then</a> (only then it was a binary format, not a text-based format).</p>

<p>Sigh.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084500">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084500" class="permalink"><time datetime="2005-12-13T22:43:22">2005-12-13T22:43:22</time></a>
            </div>
            <div class="content"><p>Sean: Ooh, nice link!  It's been awhile since I read about IFF, and I don't think I ever quite understood the concept.  </p>

<p>But, this part certainly caught my eye:</p>

<blockquote>
  <p>Our task is similarly to store high level information and preserve as much content as practical while moving it between programs. But we need to span a larger universe of data types and cannot expect to centrally define them all. Fortunately, we don't need to make programs preserve information that they don't understand.</p>
</blockquote>

<p>(Also, I miss my Amiga.)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084501">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sevenroot.org/dlc/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=622a34307765c2f7c1dfdc7345842418&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sevenroot.org/dlc/">Darren Chamberlain</a>
                </div>
                <a href="#comment-221084501" class="permalink"><time datetime="2005-12-15T13:14:33">2005-12-15T13:14:33</time></a>
            </div>
            <div class="content"><blockquote>
  <p>Maybe, though I don’t think [a clean mapping between Atom and RDF] 's official. And even it if is, it leaves out RSS. But even if it worked for RSS too, what about all the feed extensions that might be?</p>
</blockquote>

<p>You could store the fully qualified entries, with the appropriate namespaces, and then define equivalencie using <a href="http://www.w3.org/TR/owl-ref/#equivalentClass-def" rel="nofollow"><code>owl:equivalentClass</code></a>.  Then (I believe) a SPARQL query that extracted the <code>rss:entry</code> resources would also pick up the entries from Atom and the various RSS flavours.  Although at that point you'd need a <a href="http://www.w3.org/TR/owl-ref/" rel="nofollow">OWL</a>-capable triplestore and library.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    