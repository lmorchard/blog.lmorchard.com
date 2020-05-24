While I'm thinking on the subject of common syndication feed frameworks, it occurred to me that it might be instructive to jot down some thoughts on one of the concerns at the root of my ideas for FeedReactor:  Shared feed fetching, caching, and storage.

I wanted to build something that would intelligently handle all [the issues][h1] [of HTTP][h2] and [feed][s1] [polling][s2] [schedules][s3], across all my apps, all in one spot--once and for all.  Maybe it wouldn't have quite that guarantee of finality, but I'd *hope* to never directly perform an HTTP GET for a feed from one of my apps ever again.

[h1]: http://fishbowl.pastiche.org/2002/10/21/http_conditional_get_for_rss_hackers
[h2]: http://diveintomark.org/tests/client/http/
[s1]: http://www.decafbad.com/blog/2003/09/25/dynamic_feed_scan_times
[s2]: http://www.decafbad.com/blog/2003/09/29/dynamic_polling_freq_too
[s3]: http://www.decafbad.com/blog/2003/11/26/polling_and_urgency

Toward that end, one of my primary requirements is this:  Once I've acquired feed data, I need to store it in some form usable by my other programs and by some method as agnostic as possible toward the actual contents of the feed.  I want to preserve potential extension data, without needing prior knowledge of what that might be.  Extensions are one area where the fun stuff with syndication feeds will be taking off, and I've wanted a foundation to support that.

So, in my tinkering, I've explored four main variations of storing feed data:

1. Fine-grained relational DB tables
2. Triples in an RDF store
3. XML database storage
4. Coarse-grained persistence

### Feeds in relational DB tables

Mapping feed data to relational database tables seems to be the most common approach I've seen in use by aggregators.  Another similar approach involves maintaining a persistent object model.  [Syndication.framework][synd], [NetNewsWire][nnw], [Straw][straw], and [Feed on Feeds][fof] all do something like this, more or less--and I'm sure many others do, as well.   

[synd]: http://www.decafbad.com/blog/2005/06/28/safarirssdb
[fof]: http://feedonfeeds.com/
[nnw]: http://inessential.com/?comments=1&postid=2993
[straw]: http://www.nongnu.org/straw/

The idea is that the raw feed XML comes in, gets parsed, and then methodically dissected to populate columns in a table or properties of an object.  Since the table schema or class definition is planned out ahead of time, only feed data which conforms to this model gets preserved.

Occasionally, an effort is made to "expose all possible data", [ala the Universal Feed Parser][ufp].  But, this is really only practical if your objects are particularly dynamic--and even then [you'll run into issues][nxm], depending on just what shows up in a given feed.  But, if you don't really care much about anything all that exotic in feeds beyond title / link / description, this approach might work out just fine.

[ufp]: http://www.feedparser.org/docs/namespace-handling.html
[nxm]: http://bitsko.slc.ut.us/blog/rdf-longhorn.html

### Feeds as RDF triples

But if you do care about extension data, and if you're going to go through all that trouble of dissecting a feed, you might as well have a sufficiently granular and flexible repository to dump it.  So, how about an RDF triple store?  The underlying model behind RDF can capture anything you can throw at it from syndication feed structures.  In fact, RSS 1.0 and all of its extension modules *are* serialized RDF data.

Here, though, the issue isn't so much a matter of signal loss because pieces don't fit the model.  Instead, the issue is more akin to an impedance mismatch:  

Do you try to transliterate pieces of RSS 2.0 and Atom 0.x feeds into RSS 1.0 parts?  Or do you [recast a feed format like Atom as an RDF vocabulary][atomowl]?  Then, what do you do about all the mostly similar yet slightly different feed bits floating around as triples (i.e. RSS 1.0 vs Atom OWL)?  And, don't even get me started on all the annoyances involved in dismembering and reassembling arrangements of triples--although that's more a function of a particular RDF toolkit.

[atomowl]: http://semtext.org/atom/

### Feeds in an XML database

Admittedly, I haven't done as much as I'd like with feeds in an XML database--such as [Berkeley DB XML][dbxml].  In part, that's been because the various packages have either just been too frustratingly dog-slow or nigh-impossible to get built and running on my OS X development machine.  

[dbxml]: http://www.sleepycat.com/products/xml.shtml

One of the main benefits to this approach--on paper, anyway--is that the feed data stays intact in in the original format as XML.  It doesn't get dismembered, recast, rearranged, or exposed to much of anything that would put any exotic cargo it carries at risk.

But, I think I've got more playing to do with this option.  Although the opportunity to play much more with XSLT, XPath, and XQuery are attractive to me--this seems like potential overkill.  And, whereas the previous two approaches can accommodate a little [liberal parsing][liberal], this approach requires valid feeds.  So, here I'll need to pull in some repair kit tools to normalize and tidy any broken / soupy feeds.  Or, if I'm feeling particularly annoyed, I can just [ignore Postel's Law][plaw] and [pound my fist on the spec][xspec].

[plaw]: http://diveintomark.org/archives/2004/01/08/postels-law
[xspec]: http://www.w3.org/TR/REC-xml#dt-wfc
[liberal]: http://www.xml.com/pub/a/2003/01/22/dive-into-xml.html

### Feeds in coarse-grained persistence

The notion which brought me to this final approach toward storing feed data  goes something like [what this guy wrote][dbmiss]:

> The biggest design mistake of dbXML was making it an XML database. The problem with XML databases is that they store XML, and the problems with XML are too numerous to go into here. Let's just say that processing XML in a native fashion in the database engine itself is a fool's errand, and leads to far too many potential external dependency problems to be worthwhile. If you're doing anything but the simplest of stripped down document storage, It's a much wiser approach to simply store the XML text in a BLOB, delegating the work of schema checking and external entity processing to a higher layer of your system. Otherwise, you can bet your ass that at some point in the feature, when you can least afford for it to happen, something is going to break.

So, in FeedReactor, [that's pretty much what I did][frmodel].  I took Atom feeds and chopped them up into coarse feed and entry chunks, squirreled them away as blobs in a database table, along with a few select columns extracted from the XML data and indexed for easier future retrieval.  

Other than digging for the feed start/end tags and element start/end tags, as well as using a few XPaths to extract those indexed columns, the feed store didn't do anything else other than stow away the XML source.  I left any further handling of the feed data up to XSL and REST API client apps.  

Of course, FeedReactor has been sleeping for quite awhile now, so this is more an idea and an intention than a successfully demonstrated approach.  But, I was eating this dogfood as my main aggregator for the better part of a year, so I think it still has potential.

[frmodel]: http://www.decafbad.com/kwiki/index.cgi?FeedReactorDataModel
[dbmiss]: http://www.tbradford.org/2005/06/advanced-revelation.html

### So, what now?

I'm not sure what quite to do with feeds in a shared way, now and for the future.  Sticking things in a relational database is pretty quick, but very lossy.  Using RDF seems very flexible, but often not too quick or all that friendly.  Calling in an XML database seems like a "good" idea, but my spider sense is tingling.  And finally, chopping feeds up into coarse, vaguely indexed chunks seems less lossy, but not all that elegant.

All in all, maybe it's just enough to download and cache the raw feeds.

I'll post this now, but I'm still thinking about all of this...

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090388">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dannyayers.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7028f422ca6da0180de6c9d922a3228f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dannyayers.com">Danny</a>
                </div>
                <a href="#comment-221090388" class="permalink"><time datetime="2005-06-29T04:29:39">2005-06-29T04:29:39</time></a>
            </div>
            <div class="content">I'm very much looking forward to hearing what you come up with. 

Rather predictably I'm opting for the RDF store approach, but that's not to say the other approaches don't have their merits. Jon Udell (search his blog) has done some interesting work with feed data stored as XML, basically using XPath as the query language. It works, but I would suggest that he's tied to the XML structure too much. A year ago I might have gone for a hybrid RDF/RDBMS approach, with the core RSS material being contained in fixed tables bridged across to an RDF interface (somehow) to allow FOAF etc. But two factors put me off that idea now - the RSS 2.0 extensions that have appeared in recent weeks and SPARQL! Having a SQL-like query language that can be used against an RDF store (with XSLT-able results) really does simplify matters. Performance is likely to be an issue but I'm hoping a bit of filtering & caching will help there. I'm getting feed data into the store currently using XSLT (to RDF/XML), it's ok but the setup I've got could be a lot more modular.

I think Microsoft have got things partly right in their RSS Longhorn architecture, separating out the "Sync Engine". But in the data handling there's heavy use of objects, which I don't think should be needed when you can do things declaratively using SQL or SPARQL. Their object model is limited, I can guarantee that'll turn into a big ball of mud ;-)

What I'm intrigued by is the potential for using multiple stores on different hosts. My immediate target being a fairly big aggregator/store on a remote server and a shiny-GUI client tool with more limited storage that selectively addresses the remote store. But I'm still at early-experiment stage.</div>
            
        </li>
    
        <li class="comment" id="comment-221090389">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221090389" class="permalink"><time datetime="2005-06-29T07:16:38">2005-06-29T07:16:38</time></a>
            </div>
            <div class="content">I use [Liferea](http://liferea.sf.net/) as my desktop aggregator (it's a bit basic, but works very well), which uses LibXML to parse feeds. You'd be surprised (or not) how many of them are valid XML. The only issue that comes up regularly is charset brokenness.

Also, I've found that most people, if told that their feed is broken, will thank you for the note and proceed to fix it. Those who aren't technically savvy enough to fix their feeds generally don't *have* malformed ones to begin with because they use some ready-made webblogging tool -- and those tend to have correct feed generation by default.

So if all your repair kit does is check and fix the feed encoding, then you should almost never see any bogosity.</div>
            
        </li>
    
        <li class="comment" id="comment-221090390">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8157a5907b244071cda98ba5aa7a9635&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki">Bill Seitz</a>
                </div>
                <a href="#comment-221090390" class="permalink"><time datetime="2005-09-23T17:58:08">2005-09-23T17:58:08</time></a>
            </div>
            <div class="content">If you're going to store chunks as BLOBs, would it just make more sense to store them in the filesystem? Put the meta-data in the SQL db, but just have a filename handle to get to the ultimate content.

Then you really have recoverability, etc.

Though it increases the risk that you'll do something tacky and update a file without triggering an update of the meta-data, etc. but you could do the same thing regardless of the infrastructure layer...

(Probably-not-related, an interview with Hans Reiser I read recently included him saying that BLOBs are a bad thing. But I didn't track down his reference documents....)</div>
            
        </li>
    
        <li class="comment" id="comment-221090391">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221090391" class="permalink"><time datetime="2005-09-23T18:14:57">2005-09-23T18:14:57</time></a>
            </div>
            <div class="content">Bill:  What's funny is that I've actually started doing something along those lines with something I named FeedSpool.

http://decafbad.com/svn/trunk/feedspool/

Feeds fetched and stored on the filesystem--shortly thereafter sliced into entries, one per file.  I base file and folder names on MD5 hashes of feed URLs and entry ID/content.  Also considering leaving SQL out of the picture altogether, store per-user metadata on the filesystem, maybe indexed for searchability with Berkeley DB or Lucene.</div>
            
        </li>
    
        </ul>
    
        </div>
    