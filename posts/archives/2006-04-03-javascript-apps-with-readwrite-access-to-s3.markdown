---
comments_archived: true
date: '2006-04-03T13:31:36-04:00'
layout: post
tags:
- asides
title: JavaScript apps with read/write access to S3
wordpress_id: 919
wordpress_slug: javascript-apps-with-readwrite-access-to-s3
wordpress_url: http://decafbad.com/blog/2006/04/03/javascript-apps-with-readwrite-access-to-s3
---
 <p><b>Update:</b> I've started experiments on <a href="http://decafbad.com/trac/wiki/S3Ajax">S3Ajax</a>.</p>
 <p>Notes for my future reference:</p>
     <ul>
     <li>
     <span>There's a <a href="http://pajhome.org.uk/crypt/md5/sha1src.html">SHA1</a> implementation for JavaScript.</span>
     </li>
     <li>
     <span>The <a href="http://developer.amazonwebservices.com/connect/entry.jspa?categoryID=47&externalID=128">authentication scheme for Amazon's S3</a> requires SHA1.</span>
     </li>
     <li>
     <span>JavaScript-based apps can be served up from the S3 domain as files stored via S3.</span>
     </li>
     <li>
     <span>All of this adds up to JavaScript apps hosted on S3 with AJAX-based read/write access to S3 itself.</span>
     </li>
     </ul>
 <p>Also: Imagine GreaseMonkey scripts using S3 as a universal configuration pool and long-term data store.  (The configuration pool idea, by the way, came from Dave Winer.)</p>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084650">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://aws.typepad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=23cafe5400a96698bd79ac1bf743ea14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://aws.typepad.com">Jeff Barr</a>
                </div>
                <a href="#comment-221084650" class="permalink"><time datetime="2006-04-04T12:45:43">2006-04-04T12:45:43</time></a>
            </div>
            <div class="content"><p>I would love to see Greasemonkey apps that use S3 for storage. I've written down some ideas at http://aws.typepad.com/aws/2006/03/firefox<em>s3</em>some.html .</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084655">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084655" class="permalink"><time datetime="2006-04-04T12:55:20">2006-04-04T12:55:20</time></a>
            </div>
            <div class="content"><p>Hmph.  Looks like my Markdown comments mangled your link to this blog entry:</p>

<p><a href="http://aws.typepad.com/aws/2006/03/firefox_s3_some.html" rel="nofollow">Firefox + S3: Some Ideas for Developers</a></p></div>
            
        </li>
    
        <li class="comment" id="comment-221084658">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=f3794e603ef53b0513ab45b6565ee457&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jeremy Dunck</a>
                </div>
                <a href="#comment-221084658" class="permalink"><time datetime="2006-04-04T22:20:32">2006-04-04T22:20:32</time></a>
            </div>
            <div class="content"><p>I had the same thought about GM value store as soon as I heard about S3.</p>

<p>I hope to add a GM_setCloudValue API real soon now.</p>

<p>Naming suggestions are welcome.  ;-)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084659">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084659" class="permalink"><time datetime="2006-04-04T22:28:46">2006-04-04T22:28:46</time></a>
            </div>
            <div class="content"><p>GM_(get|set)CloudValue sounds as good as any name to me - but I do have one wishlist request:  </p>

<p>Make the S3 base URL configurable with maybe a GM_setCloud.  I'm scheming to write an S3 server clone in PHP, if I can, and it would be very cool if all it took to use it was to swap out the base URL.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084661">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.monstuff.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c7b30b424477b89466df87f5645d117c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.monstuff.com/">Julien Couvreur</a>
                </div>
                <a href="#comment-221084661" class="permalink"><time datetime="2006-04-04T23:21:03">2006-04-04T23:21:03</time></a>
            </div>
            <div class="content"><p>You can also use a little Flash helper object to allow cross-domain calls from javascript, such as the one I wrote at: <a href="http://blog.monstuff.com/archives/000280.html" rel="nofollow">Cross-domain AJAX using Flash</a>.</p>

<p>This way, you can host a service on top of S3 in my own domain and have many users, but most of the user traffic would go directly to S3 without going thru your servers. All you'd need is to "prime" the bucket for a given user with the proper crossdomain.xml file...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084663">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://diveintomark.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=357a20e8c56e69d6f9734d23ef9517e8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://diveintomark.org/">Mark</a>
                </div>
                <a href="#comment-221084663" class="permalink"><time datetime="2006-04-05T00:03:22">2006-04-05T00:03:22</time></a>
            </div>
            <div class="content"><p>Please don't call it "cloud".  That has a specific meaning to some developers, and unless you're replicating the cloud API (which doesn't sound like what we need in Greasemonkey), just save yourself the trouble and name it something else.</p>

<p>I like the idea though.  Definitely needs to be pushed upstream into GM itself.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084666">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084666" class="permalink"><time datetime="2006-04-05T00:33:42">2006-04-05T00:33:42</time></a>
            </div>
            <div class="content"><p>Hmm, yeah, that's a good point.  Seems to me that the term "cloud" has been used in RSS and OPML to refer specifically to Dave Winer's <a href="http://www.soapware.org/xmlStorageSystem" rel="nofollow">xmlStorageSystem</a> API.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084667">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://axlotl.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=033334ded6b92d8092f6db7d1186d689&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://axlotl.net">chris feldmann says</a>
                </div>
                <a href="#comment-221084667" class="permalink"><time datetime="2006-04-23T05:46:02">2006-04-23T05:46:02</time></a>
            </div>
            <div class="content"><p>I made a <a href="http://axlotl.net/s3pub/branches/tgz/s3candy-0.2.tgz" rel="nofollow">php interface</a> (don't bother - it's not pretty, though it works) to s3 and only then realized that I'd have to  move the entire thing client-side (and port it) because uploading one file at a time (or <i>picking</i> one upload file at a time) was untenable. So I decided to make an extension instead.</p>

<p>So I came back to look in this wiki and I have to say, that code in S3Ajax.js is terse and elegant. I think I'm gonna swipe some of it ;-)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084669">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084669" class="permalink"><time datetime="2006-04-23T14:37:34">2006-04-23T14:37:34</time></a>
            </div>
            <div class="content"><p>chris: Terse and elegant?  Oh that makes my day.  :)  And steal away - that's what it's there for!  One problem, though, is that I've yet to find a way to access/upload files from a local hard drive purely via AJAX.  I can do everything else on S3 though.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084671">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://axlotl.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8d7fb6e5a56fe9e8900bf0b0985c6334&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://axlotl.net">chris feldmann</a>
                </div>
                <a href="#comment-221084671" class="permalink"><time datetime="2006-04-24T17:49:55">2006-04-24T17:49:55</time></a>
            </div>
            <div class="content"><p>"I’ve yet to find a way to access/upload files from a local hard drive purely via AJAX"</p>

<p>Yes, javascript of course doesn't have the necessary privileges. By "purely with AJAX," I take it you mean to exclude even an HTML file input, which needs a submit, and which limits you to one file per input anyway. I coincidentally just ran across <a href="http://www.aflax.org/examples/fileupload/fileupload.html" rel="nofollow">this</a> example of javascript-driven asynchronous file pick/upload, but it requires flash8 on the client. Made me think of this thread.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084673">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://axlotl.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8d7fb6e5a56fe9e8900bf0b0985c6334&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://axlotl.net">chris feldmann</a>
                </div>
                <a href="#comment-221084673" class="permalink"><time datetime="2006-04-24T19:35:55">2006-04-24T19:35:55</time></a>
            </div>
            <div class="content"><p>On further investigation, in addition to flash8 on the client and a pretty fat library on the server, aflex (which is what the link in my last comment points to) is also limited to a single file at a time of less than 100Mb. So that's a non-starter, as they say. Which is kind of a relief because I was uncomfortable with the fact that it involved flash in any manner.</p>

<p>In general though the idea of making a web-based s3 interface is plagued by the problem of that last mile - from the browser to the filesystem.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084674">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://filicio.us"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4cd1d6b6ff6cdcb75a27eb998608df30&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://filicio.us">Steffen Christensen</a>
                </div>
                <a href="#comment-221084674" class="permalink"><time datetime="2006-04-25T21:09:06">2006-04-25T21:09:06</time></a>
            </div>
            <div class="content"><p>Chris: You're right, Flash 8 is a hassle, but frankly it's a worthy one. I'm speaking from the vantage point of filicio.us (http://filicio.us), which is basically a file storage system based on ajax, tags and s3 in a pretty mashup. We use Flash 8 with an auto-install thingy to get the job done, and when it's been interfaced with JS and limited only to uploading, it actually gives us the best of all worlds: Multiple file selection and cross-browser support.
(For us, the main problem is the mile from our server to Amazon's -- we'd like to have a Flash app do the upload directly, but currently we're forced to have the app upload to filicio.us and then we upload the files onwards. A gigantic waste of bandwidth...)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084675">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://filicio.us"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4cd1d6b6ff6cdcb75a27eb998608df30&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://filicio.us">Steffen Christensen</a>
                </div>
                <a href="#comment-221084675" class="permalink"><time datetime="2006-04-25T21:14:49">2006-04-25T21:14:49</time></a>
            </div>
            <div class="content"><p>Oh, I forgot one thing that could also address some of your problems. Apparerently, Mozilla includes some extra modules for handling local files if given the necessary permissions manually from the user. This is an example: http://www.captain.at/ajax-file-upload.php</p>

<p>I haven't tried this, and obviously it's lacking scalability. But it may address very specific needs in environment where Moz is always on hand. And did I dream that VBScript includes some extra function for browsing, reading and writing local file, even in IE? I may be drifting back to 1998, but I recall that it was a selling point back then...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084676">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://axlotl.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8d7fb6e5a56fe9e8900bf0b0985c6334&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://axlotl.net">chris feldmann</a>
                </div>
                <a href="#comment-221084676" class="permalink"><time datetime="2006-04-27T20:50:29">2006-04-27T20:50:29</time></a>
            </div>
            <div class="content"><p>Steffen,
Interesting. Did you write the file-uploader yourselves? Any pointers on the applicable actionscript (for a non-actionscripter)? The methods on the fileRef object I was looking at only included a single-file upload.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084677">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://filicio.us"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4cd1d6b6ff6cdcb75a27eb998608df30&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://filicio.us">Steffen Christensen</a>
                </div>
                <a href="#comment-221084677" class="permalink"><time datetime="2006-04-28T11:36:22">2006-04-28T11:36:22</time></a>
            </div>
            <div class="content"><p>We're not Flash coders ourselves, but we've basically reused a piece of code which was written for our flagship, 23 (http://www.23hq.com). The code was a retailoring by the author of the Flash widget: http://blog.oinam.com/archives/2005/08/flash-8-file-upload-download/</p>

<p>Hope this helps...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084679">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=21092e72c89efa62af65eb0007310052&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Steve</a>
                </div>
                <a href="#comment-221084679" class="permalink"><time datetime="2006-06-13T14:26:37">2006-06-13T14:26:37</time></a>
            </div>
            <div class="content"><p>mhh, your code doesnt work - or I dont get it
the xmlhttp request cant be made to s3?
or what I am doing wrong?</p>

<p>also, is there another way to download the files from your page - i must download each file by clicking right save as? a zip would be great</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084680">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.andrewfox.co.uk"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0607001be41d48c5bc7d848ef4ea3224&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.andrewfox.co.uk">Andrew Fox</a>
                </div>
                <a href="#comment-221084680" class="permalink"><time datetime="2006-06-26T11:45:27">2006-06-26T11:45:27</time></a>
            </div>
            <div class="content"><p>This is a very interesting discussion. I'd like to second Steve's points about your examples, but more pressingly I'd like to ask about how you can upload directly to s3 (not via your own server - as Steffen says, a colossal waste of bandwidth). Is there a way of doing this via any browser-based technologies? In fact, is there a way of doing this via a small app (not in your browser)?
Many thanks.</p>

<p>(Dislaimer: I'm not a backend developer, but am aware of many of the issues involved, and I'm investigating the feasibility of using s3 in a product)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084681">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://codinginparadise.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=96da1b3d8858bfa0306b7c55d3e48270&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://codinginparadise.org">Brad Neuberg</a>
                </div>
                <a href="#comment-221084681" class="permalink"><time datetime="2006-07-25T16:15:00">2006-07-25T16:15:00</time></a>
            </div>
            <div class="content"><p>Dojo can do file uploading:</p>

<p>http://alex.dojotoolkit.org/?p=528</p>

<p>Best,
  Brad Neuberg</p></div>
            
        </li>
    
        </ul>
    
        </div>
    