---
comments_archived: true
date: '2005-12-18T22:50:25-05:00'
layout: post
tags:
- asides
- webdev
- python
- ruby
- perl
title: Not-so-deep PHP thoughts
wordpress_id: 803
wordpress_slug: not-so-deep-php-thoughts
wordpress_url: http://decafbad.com/blog/?p=803
---
You know, not that I've been at it for long, but I've had an long-running observation about PHP:

As a language and an API, [PHP kinda stinks][ps].  It's got more crud than I left behind in Perl, but without all the meta-magic that made it worth it.  And, I get a little nervous tic when I think about it in relation to Python and Ruby.

On the other hand, it's ubiquitous and cheap—and because it's in the hands of people with all levels of skill, most popular PHP apps have by necessity managed a high standard of easy install and simplicity.  The languages with more meta-magic tend to attract eggheads (myself included) who can forget about keeping things simple.

And, did I mention PHP is ubiquitous?

<!-- tags: php webdev perl python ruby -->

[ps]: http://www.netalive.org/swsu/archives/2004/09/why_php_still_s.html

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221083537">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.whump.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=152a649080e99c313ecae9a34c60d11d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.whump.com/">Bill Humphries</a>
                </div>
                <a href="#comment-221083537" class="permalink"><time datetime="2005-12-19T06:38:33">2005-12-19T06:38:33</time></a>
            </div>
            <div class="content"><ol>
<li>PHP has some future-proofing in that almost everyone doing web development knows it or can pick it up. That reduces risks for IT adoption.</li>
<li>$5/month web hosts have it installed.</li>
</ol></div>
            
        </li>
    
        <li class="comment" id="comment-221083539">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://wdogsystems.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=6e24f47aa88626872c16e0f740739e8a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://wdogsystems.com">Tim Howland</a>
                </div>
                <a href="#comment-221083539" class="permalink"><time datetime="2006-01-10T14:27:54">2006-01-10T14:27:54</time></a>
            </div>
            <div class="content"><p>While I don't care for the crappy structure that the language seems to revel in (SQL in your HTML? WTF?), what I despise about PHP is how hard it is to build and deploy it with a ny extensions to the basic feature set.</p>

<p>If you need to do images, you compile in LibGD, if you want to render text, you get the freetype libraries, if you need something that isn't mysql, you compile that in- and then off you go trying to find the version of libJpeg from 1993, because the ancient version of libGD that's bundled with PHP doesn't work with anything more recent.</p>

<p>Plain-vanilla PHP is ubiquitous, but trying to roll your own on an arbitrary box somewhere and do something that doesn't come with the default PHP that ships with your distribution is a huge and unnecessary pain in the ass. Perl can be annoying, but at least it isn't a monolithic binary- the library system drastically reduces the cross-component dependencies that PHP suffers from.</p>

<p>PHP sucks, and it amazes me that it is so ubiquitous. On the otherhand, so is Microsoft Windows.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    