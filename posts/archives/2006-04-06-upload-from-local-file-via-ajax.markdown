---
comments_archived: true
date: '2006-04-06T09:34:14-04:00'
layout: post
tags:
- asides
title: Upload from local file via AJAX?
wordpress_id: 924
wordpress_slug: upload-from-local-file-via-ajax
wordpress_url: http://decafbad.com/blog/2006/04/06/upload-from-local-file-via-ajax
---
 <p>So, I'm idly musing about <a href="http://developer.amazonwebservices.com/connect/thread.jspa?messageID=36690&tstart=0#36690">an AJAX-based S3 file manager</a> and it occurs to me:  I don't know how to do file uploads via AJAX PUT requests.  Is there any way to get access to a local file selected in an input element in a form?  That'd sure make a nice alternative to pasting data into a big textarea.</p>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084798">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.ashleyit.com/blogs/brentashley"><img src="http://www.gravatar.com/avatar.php?gravatar_id=79c8870c62f9c171ac96433f1331d51c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.ashleyit.com/blogs/brentashley">Brent Ashley</a>
                </div>
                <a href="#comment-221084798" class="permalink"><time datetime="2006-04-06T15:05:02">2006-04-06T15:05:02</time></a>
            </div>
            <div class="content"><p>I've yet to find a way to automate an http file upload within the browser.  You can't write to the builtin file upload input element's filename.  Possibly a Flash helper would be of use - see www.aflax.org for instance.  </p>

<p>btw - I've sent some emails to your pobox addr lately with no ack.  Either I'm a bit stinky or you're not getting them or a bit of both.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084799">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=a0b347907bfaf05694805210ec595d6c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Martin Atkins</a>
                </div>
                <a href="#comment-221084799" class="permalink"><time datetime="2006-04-06T17:29:42">2006-04-06T17:29:42</time></a>
            </div>
            <div class="content"><p>I don't think that you can do that right now, but read-only access to the file pointed to by a file upload element sounds like a good thing to propose to the WHATWG people for inclusion in their Web Applications spec, if it isn't already there.</p>

<p>As long as it's read-only and you can't actually <em>put</em> a filename into that box from script I don't really see any security flaw to that.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084800">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://jes5199.livejournal.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0f8ba0cdebc6938f4cd0601aeef21621&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://jes5199.livejournal.com">Jes5199 (Jesse Wolfe)</a>
                </div>
                <a href="#comment-221084800" class="permalink"><time datetime="2006-04-07T23:01:40">2006-04-07T23:01:40</time></a>
            </div>
            <div class="content"><p>gmail is AJAXing up attachments already. I don't really know how they're pulling it off.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084802">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://q-dar.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=068ae876f8f401b757f9c27212f20481&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://q-dar.com">ayssar</a>
                </div>
                <a href="#comment-221084802" class="permalink"><time datetime="2006-04-08T09:38:11">2006-04-08T09:38:11</time></a>
            </div>
            <div class="content"><p>i'm not sure gmail is ajaxing attachments, i think they're using a clever combination of iframes and dom manipulation of the input boxes, with perhaps a javascript timer auto-triggered onsubmit().</p>

<p>just guessing there, but i think you can see it if you have a "view rendered source" plugin for your browser...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084804">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.shwango.com/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=3f3771daa40effa1355df3fae83872c6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.shwango.com/blog/">Pat Osterday</a>
                </div>
                <a href="#comment-221084804" class="permalink"><time datetime="2006-04-10T12:45:54">2006-04-10T12:45:54</time></a>
            </div>
            <div class="content"><p>No way to do it in a browser using the current technologies - without changing security restrictions, etc.  I did implement an "AJAX style" uploader using ActiveX to browse for a file, base64 encode it and then post it to the server using the XHR object - this was before "AJAX", but not brain surgery, of course you did have to let IE trust the site to allow the ActiveX stuff access to your hard drive - could've signed it I guess, but too much trouble for an Intranet app.  GMail is just use an auto submit when you choose a file; in IE they are using a little bit of JS to auto popup the dialog box so you don't have to have a browse button visable.  The AFLAX stuff looks interesting, though.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084806">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=56dd4f42e8bac2343230b52b456cbde1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Fred</a>
                </div>
                <a href="#comment-221084806" class="permalink"><time datetime="2006-05-26T15:23:34">2006-05-26T15:23:34</time></a>
            </div>
            <div class="content"><p>Gmail does not use ajax to upload files. This link shows how we can upload files the way gmail does:
http://blog.360.yahoo.com/blog-qCsFWG45eqF9lZ05AZldsUC.?p=58</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084807">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=e5ed50d0c93be71f755171f848a27d24&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">ellinas</a>
                </div>
                <a href="#comment-221084807" class="permalink"><time datetime="2006-07-18T18:36:02">2006-07-18T18:36:02</time></a>
            </div>
            <div class="content"><p>I just hit the wall with the same problem.
My current idea is the following:
- Open a popunder (not to make it annoyingly visible)
- set this window as receiver to the form
- trigger a submit by javascript parallel to the Ajax request
- after upload the popunder can call a jS function in the opener page that talks to the server and receives the uploaded pic for example
- then the popunder closes itself</p>

<p>Could this be a solution?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084808">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://weblog.raganwald.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5ee7534431f12e68f59badeb44492092&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://weblog.raganwald.com">Reg Braithwaite</a>
                </div>
                <a href="#comment-221084808" class="permalink"><time datetime="2006-07-30T12:26:21">2006-07-30T12:26:21</time></a>
            </div>
            <div class="content"><p>ellinas:</p>

<p>Most AJAX file upload solutions work almost exactly as you describe, however they use an invisible iFrame instead of a brand new window.</p>

<p>For example, the upload_progress plug-in for Ruby on Rails uses this method to provide upload progress in real time.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084809">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.seemysites.net/projFolder/uploader"><img src="http://www.gravatar.com/avatar.php?gravatar_id=962b02f0c914d37c4dfece85a8d9f6b7&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.seemysites.net/projFolder/uploader">Ajax file upload</a>
                </div>
                <a href="#comment-221084809" class="permalink"><time datetime="2006-09-01T16:21:00">2006-09-01T16:21:00</time></a>
            </div>
            <div class="content"><p>The invisible IFrame works great.  I have a script that has suited me fine.  You can see it at http://www.seemysites.net/projFolder/uploader - it's completely free, too.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084811">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084811" class="permalink"><time datetime="2006-09-01T17:24:25">2006-09-01T17:24:25</time></a>
            </div>
            <div class="content"><p>Nope, the iframe approach won't work for Amazon S3 - which is what this post is really looking for.  I'm looking for a 100% client-side solution that uses Amazon's S3 api.  So, no form post uploads, no server-side PHP helpers, just browser-to-S3 HTTP PUT.  I don't think it's presently possible.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    