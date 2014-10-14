---
comments_archived: true
date: '2003-07-12T13:36:50-04:00'
layout: post
title: On tag uniqueness and versioning in Pie/Echo feeds
wordpress_id: 441
wordpress_slug: echo-unique-namespaces
wordpress_url: http://www.decafbad.com/blog/?p=441
---
<blockquote cite="http://radio.userland.com/stories/storyReader$26234">
"feed" is not a very unique name, and if another format were to come
along with the same top level element we would not be able to write a
format driver for it. Our architecture keys off the top-level
element. I suggest changing the top-level element to indicate the
format, and also add a version number so that aggregators can have an
idea of what spec the content provider is using. I imagine Radio is
not the only aggregator that would like to key off the name of the
top-level element.
</blockquote>
<div class="credit" align="right"><small>Source:<cite><a href="http://radio.userland.com/stories/storyReader$26234">Radio UserLand: Radio gets some kind of Echo support</a></cite></small></div>
<br /><br />
Nope, "feed" seems like a pretty poor choice as a name if the goal was
uniqueness in the tag name itself.  But, since we have XML namespaces
to ensure uniqueness between vocabularies, we can instead focus on a
clear and simple name that only needs to be unique <strong>within</strong> the
vocabulary.  And as for versioning, why not consider different
versions of a namespace to be entirely different vocabularies,
each with different namespaces?
<br /><br />
I did some <a href="http://www.google.com/search?q=xml+namespaces&amp;ie=UTF-8&amp;oe=UTF-8" target="_top">quick</a> <a href="http://www.google.com/search?hl=en&amp;lr=&amp;ie=UTF-8&amp;oe=UTF-8&amp;q=xml+namespaces+versioning&amp;btnG=Google+Search" target="_top">Googling</a> and found the following:
<br /><br />
<blockquote cite="http://www.w3.org/TR/1999/REC-xml-names-19990114/Overview.html">
... documents, containing multiple markup vocabularies, pose problems
of recognition and collision.  Software modules need to be able to
recognize the tags and attributes which they are designed to process,
even in the face of "collisions" occurring when markup intended for
some other software package uses the same element type or attribute
name.
These considerations require that document constructs should have
universal names, whose scope extends beyond their containing document.
This specification describes a mechanism, XML namespaces, which
accomplishes this.
</blockquote>
<div class="credit" align="right"><small>Source:<cite><a href="http://www.w3.org/TR/1999/REC-xml-names-19990114/Overview.html">Namespaces in XML</a></cite></small></div>
<br /><br />
<blockquote cite="http://www-106.ibm.com/developerworks/xml/library/x-tipnamsp.html">
One of the core features of XML is its ability to deal with changes in
the rules for data (hence the extensible in its name -- Extensible
Markup Language).  As changes are made to XML vocabularies, the
creation of multiple versions is inevitable.  This makes it necessary
to mark the versions clearly, for human and machine information.  The
clear marking of versions can be used for driving validation, or for
branch processing according to the requirements of each version.
<br /><br />
You can mark the version of an XML vocabulary in many ways.  This
discussion focuses on the use of XML namespaces for marking versions.
</blockquote>
<div class="credit" align="right"><small>Source:<cite><a href="http://www-106.ibm.com/developerworks/xml/library/x-tipnamsp.html">Tip: Namespaces and versioning</a></cite></small></div>
<br /><br />
I haven't looked into <a href="http://www.decafbad.com/twiki/bin/view/Main/RadioUserLand">RadioUserLand</a> feed handling architecture,
but how difficult would it be to use the namespace and tag together
as key, rather than the tag alone?
<!--more-->
shortname=echo_unique_namespaces

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082343">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=dc59c5ba9a8aa0a6225d9959eea3b7f3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Dave Winer</a>
                </div>
                <a href="#comment-221082343" class="permalink"><time datetime="2003-07-13T19:34:52">2003-07-13T19:34:52</time></a>
            </div>
            <div class="content">Easy but ugly.</div>
            
        </li>
    
        <li class="comment" id="comment-221082345">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://mah.everybody.org/weblog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=59e08b5b7c8ed1c82b20144ba8e65967&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://mah.everybody.org/weblog/">Mark "Hex" Hershberger</a>
                </div>
                <a href="#comment-221082345" class="permalink"><time datetime="2003-07-14T16:27:46">2003-07-14T16:27:46</time></a>
            </div>
            <div class="content">I added namespace support to Emacs' xml.el recently.  It wasn't difficult at all.  Instead of parsing [feed xmlns:e="uri"]...[/feed], into '(feed ...), I parsed it into '({uri}feed ...).  Namespace processing doesn't happen without a switch set to enable it, so it is completely backwards compatible.

So, while I haven't looked at how Radio parses stuff either, I think it wouldn't be that hard to add.  And it doesn't have to be ugly, either.</div>
            
        </li>
    
        </ul>
    
        </div>
    