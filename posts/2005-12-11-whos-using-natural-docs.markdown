---
comments_archived: true
date: '2005-12-11T23:34:10-05:00'
layout: post
tags:
- asides
title: Who's using Natural Docs?
wordpress_id: 794
wordpress_slug: whos-using-natural-docs
wordpress_url: http://decafbad.com/blog/?p=794
---
<blockquote cite="http://www.naturaldocs.org/">Natural Docs is an open-source, extensible, multi-language documentation generator.  You document your code in a natural syntax that reads like plain English.  Natural Docs then scans your code and builds high-quality HTML documentation from it.</blockquote>
<small style="text-align:right; display:block">Source: <a href="http://www.naturaldocs.org/">Natural Docs</a></small>

Having started using [Natural Docs][nd] at work to maintain documentation on parts of a project implemented in ActionScript, JavaScript, Perl, XML, XSLT, and possibly PHP--it seems like a very cool system with an extremely simple and natural syntax applicable to a wide array of source code formats.

Is anyone else out there using this package?  If you were and stopped, how come?  Just curious...

[nd]: http://www.naturaldocs.org/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085393">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://richardathome.wordpress.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=fff0d05378ec238b0ccc6f5bedbf0adb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://richardathome.wordpress.com">Richard@Home</a>
                </div>
                <a href="#comment-221085393" class="permalink"><time datetime="2005-12-12T09:51:37">2005-12-12T09:51:37</time></a>
            </div>
            <div class="content"><p>Thanks for the heads up on Natural Docs, I have been using phpDocumentor but this seems to be a great way to document projects that use a variety of languages (HTML, PHP, Javascript for example).</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085394">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://disqus.com/api/users/avatars/blalor.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">blalor</a>
                </div>
                <a href="#comment-221085394" class="permalink"><time datetime="2005-12-12T11:23:46">2005-12-12T11:23:46</time></a>
            </div>
            <div class="content"><p>It looks like a great solution for multiple languages, but I don't see that it also supports JavaDoc.  JavaDoc has many benefits, and I would rather see Natural Docs either support JavaDoc comments, or somehow be able to include rendered JavaDoc output (or use another doclet to generate a compatible intermediary).</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085396">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221085396" class="permalink"><time datetime="2005-12-12T11:42:42">2005-12-12T11:42:42</time></a>
            </div>
            <div class="content"><p>Brian: Well, as I understand it, Natural Docs is a <em>replacement</em> for something like JavaDoc.  (or POD, or pydoc, or etc)  It's trying for a more wiki-like or YAML-like syntax.</p>

<p>That's definitely a downside to Natural Docs, though, if we were using Java in our project.  We use Perl, but the ND syntax seems to complement POD a bit more than it replaces it.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221085397">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=60dcf7401de8ebc16d81d206ba0eb9ce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Kodi</a>
                </div>
                <a href="#comment-221085397" class="permalink"><time datetime="2005-12-12T17:39:36">2005-12-12T17:39:36</time></a>
            </div>
            <div class="content"><p>It actually does support JavaDoc, it just hasn't been released yet.  You have to pull from CVS.  For example, see <a href="http://cvs.sourceforge.net/viewcvs.py/naturaldocs/NaturalDocs/Modules/NaturalDocs/Parser/JavaDoc.pm?view=markup" rel="nofollow">here</a>.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    