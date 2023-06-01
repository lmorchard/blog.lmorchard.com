---
comments_archived: true
date: '2007-07-23T10:37:33-04:00'
layout: post
tags:
- webdev
- php
- zend
- symfony
- curmudgeons
- cakephp
- openid
- codeigniter
title: A Curmudgeon Playing with the CodeIgniter Framework and OpenID
wordpress_id: 1059
wordpress_slug: a-curmudgeon-playing-with-the-codeigniter-framework-and-openid
wordpress_url: http://decafbad.com/blog/2007/07/23/a-curmudgeon-playing-with-the-codeigniter-framework-and-openid
---
<p>One bit of hackery I did this weekend was to explore the <a href="http://codeigniter.com/">CodeIgniter PHP framework</a>, which is even less magic yet more glued-together out of the box than the <a href="http://framework.zend.com/">Zend Framework</a>.  Also, very much less magic than <a href="http://cakephp.org/">CakePHP</a> and barely in the same universe as <a href="http://www.symfony-project.com/">Symfony</a>.  I think I may have found my sweet spot of simplicity and comprehensible magic.</p>
<p><a href="http://codeigniter.com/">CodeIgniter</a> has is a PHP 4 / 5 framework that provides a lightweight Model / View / Controller arrangement with URL routing and a useful but minimal constellation of utility classes and helpers.  The view templates are in PHP, with just a bit of pre-processing.  The controllers are plain-old PHP classes whose methods are called via simple URL routes.</p>
<p>The <a href="http://codeigniter.com/user_guide/general/models.html">model layer of CodeIgniter</a>, however, is the weakest part of the trio - which I actually like a lot.  It's not a magical ORM - instead it's just a simple superclass from which to derive, mostly there to suggest that a separate model is a good thing to write.  The DB abstraction classes just make the job of writing SQL statements easier and don't pretend that there's no impedance mismatch between objects and relational tables.</p>
<p>The depth of code in <a href="http://codeigniter.com/">CodeIgniter</a> is shallow enough that I felt I was able to get into developing quickly while still taking side trips through the framework methods I was calling and get at least a glance at what being taken care of for me.  <a href="http://codeigniter.com/forums/viewthread/50715/">There's always danger in magic</a>, but this stuff doesn't really get out of hand.</p>
<p>To doodle around with an idea, I threw together a layout decorator class to support the sort of nested templates I'm used to from <a href="http://www.symfony-project.com/">Symfony</a>.  Out of the box, <a href="http://codeigniter.com/user_guide/general/views.html">CI views</a> are simple, offering facilities for calling sub-templates and "partials" but not directly providing conventions for such.  My first swatches of code add a bit of that.</p>
<p>After playing around with layouts, the next thing I did was to use <a href="http://codeigniter.com/user_guide/libraries/sessions.html">CI sessions</a> and the <a href="http://www.openidenabled.com/openid/libraries/php">PHP OpenID Library</a> to develop both an auth producer and consumer.  <a href="http://codeigniter.com/">CodeIgniter</a> doesn't come with a ready-made user auth system, though it does come with <a href="http://codeigniter.com/user_guide/libraries/sessions.html">its own implementation of sessions</a> using encrypted browser cookies to replace PHP's native sessions - another feature I really like.</p>
<p>Kind of odd - but on the same toy app I can sign up for local accounts, sign into other sites with OpenID URLs based on local accounts, and sign into my <a href="http://codeigniter.com/">CI</a> app with external OpenID identities.</p>
<p>The wild bit is that I can even sign in locally with one OpenID URL, then use the newly created local profile to get a second OpenID URL to sign in somewhere else.  Seems interesting yet possibly dangerous.  I mostly just glued the right parts together and got the Auth_OpenID black-box modules working - now that I have an operational OpenID system, I need to study it further.</p>
<p>The next thing I want to do is work more on profile managment, offer some of the <a href="http://openid.net/specs/openid-simple-registration-extension-1_1-01.html">OpenID Simple Registration</a> fields, and look into <a href="http://drnicwilliams.com/2007/07/20/one-app-one-user-account-and-multiple-openids/">supporting multiple auth IDs linked to the same user profile</a>.</p>
<p>It might also be fun to do something like "<a href="http://simonwillison.net/2007/Jul/13/">catalogue the sites that a user logs into and automatically construct a homepage</a>."  Overall, I've got some vague notional ideas to build a personal status collector and maybe some federated social networking and messaging stuff.  But, one hack at a time.</p>
<p>Hopefully, I'll get this code I've got so far into better shape and commit to my SVN repository.  Sooner than later, otherwise it'll never get off my dev box.</p>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087156">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221087156" class="permalink"><time datetime="2007-07-24T01:34:03">2007-07-24T01:34:03</time></a>
            </div>
            <div class="content"><p>Hmm, a system that treats its own OpenIDs just like any other OpenID and considers them foreign credentials for which it creates a new account seems… weird. It seems it should recognize its own OpenIDs and map them back to the corresponding username.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087158">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.elroyjetson.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4a34cf8d239b6589024fc004cfdad5b8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.elroyjetson.org">Elroy Jetson</a>
                </div>
                <a href="#comment-221087158" class="permalink"><time datetime="2007-08-24T20:51:24">2007-08-24T20:51:24</time></a>
            </div>
            <div class="content"><p>Thanks for pointing this framework out.  Some how it had slipped through my fingers.</p>

<p>I have tried them all and was (maybe still am) close to dumping php for ruby and the rails framework.</p>

<p>Once I started digging into rails all the php frameworks just seemed like awkward teenagers that have to do everything their own way just to prove that they are different.</p>

<p>codeIgniter is small.  Simple to setup and, so far anyway, seems about as elegant as you are going to get using php.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087159">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=7b2554252993cc349aa4671cdc751985&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Cody Ray</a>
                </div>
                <a href="#comment-221087159" class="permalink"><time datetime="2008-06-03T21:30:09">2008-06-03T21:30:09</time></a>
            </div>
            <div class="content"><p>Did you ever put this into your SVN? I can't seem to find it through Trac.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    