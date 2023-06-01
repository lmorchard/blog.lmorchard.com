---
comments_archived: true
date: '2005-12-18T22:59:31-05:00'
layout: post
tags:
- asides
- webdev
- javascript
title: JS versus PHP?
wordpress_id: 804
wordpress_slug: js-versus-php
wordpress_url: http://decafbad.com/blog/?p=804
---
...on the other hand:  With all these people getting reacquainted with JavaScript by way of AJAX, wouldn't it be cool if we had something as easy to deploy as PHP but based on JavaScript?

<!-- tags: javascript webdev php -->

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090997">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.snook.ca/jonathan/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=ce0f8df84e1e4edb3d9999740472261a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.snook.ca/jonathan/">Jonathan Snook</a>
                </div>
                <a href="#comment-221090997" class="permalink"><time datetime="2005-12-19T04:26:31">2005-12-19T04:26:31</time></a>
            </div>
            <div class="content"><p>Isn't that ASP?</p>

<p>I know I've liked the idea of doing JavaScript on the server and client. Less confusing.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090999">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://admin.support.journurl.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5f89d3df08b8dedac1a0fde900a586db&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://admin.support.journurl.com/">Roger Benningfield</a>
                </div>
                <a href="#comment-221090999" class="permalink"><time datetime="2005-12-19T15:10:28">2005-12-19T15:10:28</time></a>
            </div>
            <div class="content"><p>As of CFMX, the CFScript sub-branch of the language is similar to Javascript... the handling of curly brackets is the same, and Coldfusion Components are basically a server-side implementation of Javascript's approach to objects.</p>

<p>The big difference is in operators. For some reason, they stuck with CF's standard, text-based operators, so you end up with stuff like this:</p>

<p>if (i=1;i LT 10;i = i + 1) {
// do something
}</p></div>
            
        </li>
    
        <li class="comment" id="comment-221091000">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221091000" class="permalink"><time datetime="2005-12-19T18:23:36">2005-12-19T18:23:36</time></a>
            </div>
            <div class="content"><p>Jonathan: Well, yeah, JScript is one of the languages available in ASP...  but ASP isn't a quick configure-and-make module for Apache.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221091001">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=47a5b72b5be083e6dd744f59ab6143c5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Stephen De Gabrielle</a>
                </div>
                <a href="#comment-221091001" class="permalink"><time datetime="2005-12-21T07:31:52">2005-12-21T07:31:52</time></a>
            </div>
            <div class="content"><p>Isn't Rhino the obvious solution? I'm sure there is an opensource jvm/compiler that it will run on too?</p>

<p>http://www.mozilla.org/rhino/</p></div>
            
        </li>
    
        <li class="comment" id="comment-221091002">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.vivabit.com/bollocks"><img src="http://www.gravatar.com/avatar.php?gravatar_id=6ab593768880d22b442d964443b4e4c5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.vivabit.com/bollocks">Dan Webb</a>
                </div>
                <a href="#comment-221091002" class="permalink"><time datetime="2006-04-04T23:18:43">2006-04-04T23:18:43</time></a>
            </div>
            <div class="content"><p>I'd love to give that a go.  I like RoR for large applications but having an apache mod that interpeted JS along with some APIs to access the system and server environment would be great.</p>

<p>I've been looking for someone to start that project with because unfortunately I know hardly any C.  If anyone does an is interested then I'd love to give it a shot.  </p>

<p>I think mod_javascript was started years ago but stalled eventually before it came to anything.  I think spidermonkey would be a better basis that rhino to get in all to run as fast as possible which is a shame because I can code Java..</p></div>
            
        </li>
    
        </ul>
    
        </div>
    