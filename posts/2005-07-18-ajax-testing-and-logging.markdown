---
comments_archived: true
date: '2005-07-18T14:28:19-04:00'
layout: post
title: AJAX Testing and Logging
wordpress_id: 669
wordpress_slug: ajax-testing-and-logging
wordpress_url: http://www.decafbad.com/blog/?p=669
---
Okay, okay, I'll admit it: I'm an [architecture astronaut][aa].  I'd join Architecture Astronauts Anonymous--but that'd be AAA, and we already use them for our car insurance. Anyway, here's my current trip into orbit:

[aa]: http://www.joelonsoftware.com/articles/fog0000000018.html

* [http://www.decafbad.com/2005/07/xmlwiki/www/tests.html](http://www.decafbad.com/2005/07/xmlwiki/www/tests.html)

If you click on that, you should see a page with a large textarea appear, in which a running log of tests begins.  So far, all but two of the tests succeed for me in Safari, FireFox, and MSIE6.  I've got a bit more work to do on writing tests, though, as well as working on the server side.

But, there are things going on behind the scenes in this test harness that I want to share right now before I fly off into space.

## Testing with AJAX

First off, about a week ago, I mentioned an [experiment in REST and XML][exp] with which I was starting to play.  In a nutshell, it's a bastard hybrid between a wiki and an XML database, with a REST API.  Well, at the time, I was just poking at it with [invocations of cURL from the command line][curl].  

But, my eventual goal was to get this thing hooked up with a browser via XMLHttpRequests and JavaScript.  Before just flying off to [wire up any UI demos][outliner], though, I wanted to run it through some repeatable tests.  So first, I made my own XmlHTTPRequest wrapper:

* [http://www.decafbad.com/2005/07/xmlwiki/www/js/httpclient.js](http://www.decafbad.com/2005/07/xmlwiki/www/js/httpclient.js)

Then, I went in search of unit testing frameworks for in-browser JavaScript.  I found a few neat things--including [JsUnit](http://www.edwardh.com/jsunit/), [Selenium][selenium], and [httpunit](http://httpunit.sourceforge.net/).

But, none of these quite fulfilled my requirements of a) being simple, b) working well with code continuity broken by asynchronous HTTP requests, and c) being learned by me in an impatient jiffy.  So, I made this:

* [http://www.decafbad.com/2005/07/xmlwiki/www/js/tests.js](http://www.decafbad.com/2005/07/xmlwiki/www/js/tests.js)

It's by no means general or even all that nice to look at, but I've got half a mind to further refactor this into my own AJAX-friendly mini-rendition of [JUnit][junit].  To anyone out there: Let me know if this would be useful, or if I'm just wasting my time.

[junit]: http://www.junit.org/index.htm
[outliner]: http://www.decafbad.com/blog/2005/07/12/xoxo_outliner_experiment
[curl]: http://www.decafbad.com/2005/07/xmlwiki/doc/log.txt
[exp]: http://www.decafbad.com/blog/2005/07/12/an_experiment_in_rest_and_xml
[selenium]: http://selenium.thoughtworks.com/index.html

## Logging in Browser-based JavaScript

Along the way through reinventing my own testing wheel, I also got fed up with the usual ways I was used to generating debugging and informative messages from my JavaScript code.  So, I went off in search for something like [Log4J][log4j] in Java or the [logging][logging] module in Python.

The closest I came was to `selenium-logging.js` in the [Selenium][selenium] package, but that wasn't really what I wanted.  So, I made this:

* [http://www.decafbad.com/2005/07/xmlwiki/www/js/log.js](http://www.decafbad.com/2005/07/xmlwiki/www/js/log.js)

It's by no means general or even all that nice to look at, but I've got half a mind to further expand this into my own JavaScript mini-rendition of [logging][logging].  Imagine logging from a browser-based JavaScript app to a server-based REST-ified syslog.  Seems like it *could* be useful, if done right.  To anyone out there: Let me know if this would be useful, or if I'm just wasting my time.

[log4j]: http://logging.apache.org/log4j/docs/
[logging]: http://www.python.org/doc/current/lib/module-logging.html

## But wait, there's more...

I'll break off here and continue in another post with [the server-side things I started doing with WSGI][next].

[next]: http://www.decafbad.com/blog/2005/07/18/discovering_wsgi_and_xslt_as_middleware

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084940">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://codeswami.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0356c6e4c6151f59c9ffe67faad6e1b7&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://codeswami.com">jm3</a>
                </div>
                <a href="#comment-221084940" class="permalink"><time datetime="2005-09-06T23:45:28">2005-09-06T23:45:28</time></a>
            </div>
            <div class="content">your js Log class is great for conventional, syslog-style logging, i.e. recording exceptional (client-side) events over time during lights-out operation. for the other type of commonly seen JS logging, viz. interactive "alert debugging", there's a neat approach that would be great to wire into your logger: the cache-and-bookmarklet approach [1]? all you do is cache log events locally in a browser in a buffer and then create a bookmarklet that reads and dumps the buffer into the page DOM or a popup, or an alert, etc. basically it's a multiline, on-demand trace console.

[1] http://bob.pythonmac.org/archives/2005/07/03/bookmarklet-based-debugging/</div>
            
        </li>
    
        <li class="comment" id="comment-221084941">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.opennms.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2a02f8818ce5a1b3edcbea9e24788885&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.opennms.org">brozow</a>
                </div>
                <a href="#comment-221084941" class="permalink"><time datetime="2005-09-24T03:11:06">2005-09-24T03:11:06</time></a>
            </div>
            <div class="content">Would love to see you enhance the AJAX testing stuff!!!

Thanks for what you've done so far!

Matt</div>
            
        </li>
    
        <li class="comment" id="comment-221084944">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://log4js.berlios.de/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=30375dd7e40b81bcee779f167b60aa78&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://log4js.berlios.de/">Stephan Strittmatter</a>
                </div>
                <a href="#comment-221084944" class="permalink"><time datetime="2005-12-09T10:44:38">2005-12-09T10:44:38</time></a>
            </div>
            <div class="content"><p>Probably we could share our knowledge about logging? I created already a project for logging in JavaScript, which is hosted at http://log4js.berlios.de/ and its API is very close to the log4j API.</p>

<p>Currently there is also an Appender to send the logs via AJAX back to the server to log them there.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084946">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://techie-baba.blogspot.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=dd8888f1fc5d9d94550b327eaf8c575f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://techie-baba.blogspot.com/">Shanky</a>
                </div>
                <a href="#comment-221084946" class="permalink"><time datetime="2007-10-08T16:40:36">2007-10-08T16:40:36</time></a>
            </div>
            <div class="content"><p>Sorry if this comment is irrelevant.</p>

<p>Do you know of any AJAX based logging framework using which I can dynamically update the logs on a web-page. </p>

<p>Somewhat similar to writing log.debug("Update log!"); as in log4j. Where if I write something like log.updateScreen("Update Screen"); from my Java code it updates the screen with the log.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    