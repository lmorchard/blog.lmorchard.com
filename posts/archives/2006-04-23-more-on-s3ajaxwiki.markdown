---
comments_archived: true
date: '2006-04-23T13:14:54-04:00'
layout: post
title: More on S3AjaxWiki
wordpress_id: 935
wordpress_slug: more-on-s3ajaxwiki
wordpress_url: http://decafbad.com/blog/2006/04/23/more-on-s3ajaxwiki
---
 <p>So, I've put some more work into <a href="http://s3.amazonaws.com/s3wiki/wiki/StartPage">my S3 AJAX wiki</a>, first mentioned <a href="http://decafbad.com/blog/2006/04/21/an-s3-ajax-wiki">Friday night</a>.  After some Virtual PC sessions, editing seems to be working on Firefox and MSIE on Win.  Safari and any other browsers not amenable to PUT and DELETE in XmlHTTPRequests will not find joy in editing - but the wiki should at least still be navigable and readable since it's plain HTML on the server.</p>
 <p>This thing has certainly not reached any level of stability, but I thought it might be interesting to collect some random thoughts on what good stuff is lurking in there.  So:</p>
     <ul>
     <li>
     <span>One of the mind-bending concepts behind this whole thing for me is that both the documents and the authoring application are all resident on the S3 servers, loaded and run on the fly in a browser.  The magic S3 lends is simple file I/O, taken for granted by applications in nearly every other development environment.  Otherwise, JavaScript in a browser is a very capable system.</span>
     </li>
     <li>
     <span>Of course, since my demo wiki is sitting in an S3 bucket with a public-write ACL, everything's open to vandalism and subversion (of the bad variety)- documents and application both.  S3Ajax does allow authentication through your S3 credentials, though, so a private group with restrictive S3 ACLs could use this wiki successfully.</span>
     </li>
     <li>
     <span>All content managed by the wiki code ends up as HTML on the server.  Maybe some day this will grow up to be proper XHTML.  Using plain old HTML, rather than <a href="http://webseitz.fluxent.com/wiki/SmartAscii">smart ASCII</a>, seems like an important step to me.  HTML is a neutral standard, whereas various wiki formats are far from agreed upon or standardized.  Luckily,  <a href="http://goessner.net/">Stefan G&ouml;ssner's</a> <a href="http://goessner.net/articles/wiky/">Wiky</a> does roundtrip conversion between wiki-text and HTML.</span>
     </li>
     <li>
     <span>Sticking with HTML as the end format also allows me to eventually go beyond wiki text, and on to <a href="http://microformats.org/">microformats</a> like <a href="http://decafbad.com/blog/2005/06/08/greasemonkey-magic">hCalendar</a> and <a href="http://decafbad.com/blog/2006/03/25/about-xoxooutliner">XOXO</a>.  I could even see interchangably using something like <a href="http://dojotoolkit.org/docs/rich_text.html">DOJO's Rich Text Editor</a> as another editing alternative alongside <a href="http://goessner.net/articles/wiky/">Wiky</a>.  Basically, anything that eats and emits HTML can fit into this wiki.</span>
     </li>
     <li>
     <span>One more thought on HTML and the DOM - if you can use HTML as your document format, the browser DOM makes a pretty nice structure and API for the authoring, manipulation, and management of document content.  In this wiki, innerHTML is the main point of document munging.  But, in XoxoOutliner, I do plenty of DOM node shuffling and tweaking.</span>
     </li>
     <li>
     <span>Speaking of innerHTML:  It's not evil, but it seems useful really only when treated as a write-only property.  It's next to useless for serializing the DOM as HTML source.  MSIE and Firefox both offer wildly different results.  So, I wrote <a href="http://decafbad.com/trac/browser/trunk/S3Ajax/js/wiki.js?rev=760#L413"><code>fromDOMtoHTML</code> in wiki.js</a> to take matters into my own hands.  I know MochiKit offers <code>emitHTML</code>, but it doesn't quite do what I want - there are a few odd corner cases I've found myself handling, and I need to filter out all the elements I inject as editing chrome.</span>
     </li>
     <li>
     <span>I like the functional DOM construction kit offered by <a href="http://mochikit.com">MochiKit</a> and <a href="http://www.vivabit.com/bollocks/2006/04/06/introducing-dom-builder">DOM Builder</a> so much that I felt compelled to reinvent my own.  Check out <a href="http://decafbad.com/trac/browser/trunk/S3Ajax/js/common.js?rev=760#L118"><code>createDOM</code> in common.js</a>.  I use it in the <a href="http://decafbad.com/trac/browser/trunk/S3Ajax/js/wiki.js?rev=760#L496"><code>injectEditingFramework</code> function in wiki.js</a> to build and inject all the wiki editing chrome into the page on the fly.  I re-wrote this code so as to not import the bulk of MochiKit, but before I'd heard of DOM Builder.  I'm keeping it around for now.</span>
     </li>
     <li>
     <span>Speaking of reinventing things, check out <a href="http://decafbad.com/trac/browser/trunk/S3Ajax/js/S3Ajax.js?rev=760#L283"><code>xmlToObj</code> in S3Ajax.js</a>.  I hadn't seen <a href="http://badgerfish.ning.com/">BadgerFish</a> until about an hour ago, but <code>xmlToObj</code> is my own simplied version: That is, code to turn XML into basic native JS structures.  I use this to easily deal with the XML response from S3 bucket listings.  It works better than I thought it would.</span>
     </li>
     <li>
     <span>Speaking of <code>xmlToObj</code>, I use an S3 bucket listing with a key prefix to <a href="http://decafbad.com/trac/browser/trunk/S3Ajax/js/wiki.js?rev=760#L259">populate a "recent changes" drop down selector</a>, sorted in reverse chronological order of the LastModified timestamp. </span>
     </li>
     <li>
     <span>And speaking of bucket listings:  I don't use them in finding existing wiki words - but I may do so in a future version.  But, instead, <a href="http://decafbad.com/trac/browser/trunk/S3Ajax/js/wiki.js?rev=760#L118">I got fancy and perform a number of HEAD requests to determine which WikiWords on the page do and don't exist</a>.  I do this with chained AJAX calls - the completion of each fires off the next HEAD until I run out of words to check.  The discovery of non-existent pages linked by wiki word triggers a CSS class change to highlight the word in need of authoring, as well as the attachment of an on-click handler that causes the creation of a new page for that word.</span>
     </li>
     <li>
     <span>In the future, I'd like to use the Atom Publishing Protocol, as well as the OPML Community Server Protocol (<a href="http://decafbad.com/trac/browser/trunk/XoxoOutliner/js/myXMLRPC.js">via XML-RPC</a>).  If any other AJAX-accessible web file systems crop up (GDrive?), I might hit them too.  I'm considering WebDAV, trying to decide if it's worth it.</span>
     </li>
     <li>
     <span>All-in-all, I think where I'm going with this stuff is basically what I wanted to do with <a href="http://decafbad.com/trac/wiki/Micronian">Micronian</a>.</span>
     </li>
     <li>
     <span>OPML is another format I plan to explore with this rig, very soon.</span>
     </li>
     <li>
     <span>I'd love it if someday I could use all of this stuff to research, plan, organize, and write a book.</span>
     </li>
     </ul>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086089">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.whump.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=152a649080e99c313ecae9a34c60d11d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.whump.com/">Bill Humphries</a>
                </div>
                <a href="#comment-221086089" class="permalink"><time datetime="2006-04-24T06:18:51">2006-04-24T06:18:51</time></a>
            </div>
            <div class="content"><p>Why did you break down DOM Builder into two functions and an initialization call?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086090">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086090" class="permalink"><time datetime="2006-04-24T10:43:44">2006-04-24T10:43:44</time></a>
            </div>
            <div class="content"><p>Bill: Well, mostly because that code was an attempt to recreate Mochikit's DOM construction code apart from all the other facilities it uses to build functions with partially applied argument lists &amp; etc.  I hadn't actually heard of DOM Builder when I first wrote that stuff.  I'll probably swap my code out for that at some point.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086091">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://goessner.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cfb72e1f74578a324f1f9ea308898111&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://goessner.net">Stefan Gössner</a>
                </div>
                <a href="#comment-221086091" class="permalink"><time datetime="2006-04-24T11:38:20">2006-04-24T11:38:20</time></a>
            </div>
            <div class="content"><p>This is a very impressive web application  foreshadowing the high potential of online storages.</p>

<p>I like the way, how you reuse and extend Wiky.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086093">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.ning.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=ff95a2cfef087465a32e2232a3c893aa&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.ning.com/">Yoz</a>
                </div>
                <a href="#comment-221086093" class="permalink"><time datetime="2006-04-24T15:26:40">2006-04-24T15:26:40</time></a>
            </div>
            <div class="content"><p>Okay, I know I keep telling you to check out Ning, but with <a href="http://blog.ning.com/2006/04/the_hottest_api_on_the_interne.html" rel="nofollow">the new API stuff we released last week</a> you <em>really really</em> need to check out Ning. It meshes remarkbly well with what you're looking for.</p>

<p>The new API is fully read-write, based on REST and the Atom Publishing Protocol. Other advantages over S3:</p>

<ul>
<li>Each app has 1GB of public object space and 100MB of private space. Each user can own up to 10 apps for free. Just register, clone an app (or make one from scratch) and you're off.</li>
<li>With S3 the objects you read and store are flat data - with Ning, they're structured objects...</li>
<li>... and since they're structured, you can issue GET requests that are more like database queries than simple object fetches (<a href="http://restdemos.ning.com/feeds.php" rel="nofollow">some examples</a>)...</li>
<li>... which return properly-formed Atom feeds, which you can then run through BadgerFish. (it's how our <a href="http://restdemos.ning.com/embedfeed.php" rel="nofollow">demo widgets</a> work)</li>
</ul>

<p>That's not to say that S3 doesn't have it's own advantages: it's much better for large (GBs), expandable storage, five-nines high availability and BitTorrent. But the uses to which I'm currently seeing it put - such as your work, and the Greasemonkey ideas - fit Ning very well indeed.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086097">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sporkmonger.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56ee28134dd0776825445e3551979b14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sporkmonger.com/">Bob Aman</a>
                </div>
                <a href="#comment-221086097" class="permalink"><time datetime="2006-04-24T18:37:00">2006-04-24T18:37:00</time></a>
            </div>
            <div class="content"><p>Are there any alternatives out there to innerHTML that are just as easy-to-use, but that actually make use of the standard DOM methods instead?  (Please say yes.)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086098">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086098" class="permalink"><time datetime="2006-04-24T19:00:45">2006-04-24T19:00:45</time></a>
            </div>
            <div class="content"><p>Bob: Alas, no.  The best I can come up with is to maybe run a string containing a document fragment through an XML parser, scoop up the resulting nodes, and transplant them into the page DOM.  I haven't tried that yet, but the idea smells awfully bad to me.</p>

<p>innerHTML isn't really that evil, really.  :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086101">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8157a5907b244071cda98ba5aa7a9635&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki">Bill Seitz</a>
                </div>
                <a href="#comment-221086101" class="permalink"><time datetime="2006-04-25T01:34:45">2006-04-25T01:34:45</time></a>
            </div>
            <div class="content"><p>Is the new Google Data API a possible alternative?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086102">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086102" class="permalink"><time datetime="2006-04-25T11:34:48">2006-04-25T11:34:48</time></a>
            </div>
            <div class="content"><p>Bill:  It looks like the new Gdata API is basically the Atom Publishing Protocol.  I'd like to target that API sometime soon, too.  I think Ning's got it implemented as well.  Although, at Google, I think the only implementation of Gdata so far is for the new Google Calendar - that is, I haven't seen any Gdrive service launched yet as a generic service offering storage via Gdata to compete with S3.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086103">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=36f55c81b271c3e689aae198cb76d9ee&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Laurent</a>
                </div>
                <a href="#comment-221086103" class="permalink"><time datetime="2006-04-28T23:09:13">2006-04-28T23:09:13</time></a>
            </div>
            <div class="content"><p>Hi,
I'd like to search my documents stored in my s3 account.
It seems like Amazon doesn't provide a search API.
But maybe we could add this functionality.
Any idea if somebody is already working on this?
Laurent.
Palo Alto, CA</p></div>
            
        </li>
    
        </ul>
    
        </div>
    