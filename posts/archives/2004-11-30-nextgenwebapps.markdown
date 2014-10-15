---
comments_archived: true
date: '2004-11-30T16:53:35-05:00'
excerpt: 'This has been where most of my private hacking sessions have been
    taking me over the past year or so:  combining HTML, CSS, DOM, JavaScript,
    XML, XSLT, and REST to build what I consider to be a next-generation
    web app.'
layout: post
tags:
- syndication
- xml
title: Next generation web apps using REST, XML, XSLT, and XmlHTTPRequest
wordpress_id: 568
wordpress_slug: nextgenwebapps
wordpress_url: http://www.decafbad.com/blog/?p=568
---
So, like I was saying:  I've been working on [FeedReactor](http://www.decafbad.com/kwiki?FeedReactor) and have been doing some things with it that I find rather interesting, independent of news aggregation.  

One of the core goals I have for FeedReactor is to explore what it takes to build a web app that exploits [principles of REST architecture](http://www.xfront.com/REST-Web-Services.html).  Having already [sung the praises](http://www.decafbad.com/blog/tech/old/oooccb) of XML-RPC, I wanted to get immersed in REST and see what all the hubbub was about.  I've got some ways to go, but I think I understand the major concepts now, and it's a pretty nifty frame within which to work.

But, two other things I've added to my mix have really made things interesting for me:  

1. XSLT filtering
2. The XmlHTTPRequest object

XSLT and REST make a really good pair, as [Amazon Web Services already demonstrate](http://www.decafbad.com/blog/2004/06/16/wishofthemonthclub1).  Inspired by that API ([and earlier experiments](http://www.decafbad.com/blog/2003/09/02/xsl_scraper)), I use XML for all the input and output formats in my API and accept a query string parameter that contains the path to an XSLT file.  When this parameter is supplied, the XML output by the API is first processed using the given XSLT.  (Think of it like piping API output through `xsltproc`.)

So, with a properly constructed collection of XSLT, I can present a browser-viewable HTML user interface served up directly from REST API calls.  Links, frame sets, and iframes present in the HTML lead the user from that call to the next XSLT-wrapped REST API call. 

But, once the initial HTML-and-JavaScript payload reaches the browser, it gets better ([ala Gmail](http://www.infoworld.com/article/04/10/22/43OPstrategic_1.html)):  

On older browsers (if I happen to care about them), I can make new HTTP requests back to the server [from JavaScript using iframes](http://developer.apple.com/internet/webcontent/iframe.html).  In this case, XSLT filtering lets me retrofit the API's responses to the HTML-and-JavaScript crud I need to serve up to make things happen back in the browser client.  Unfortunately, passing data *to* the API (which expects XML, not form submissions) is still a bit wonky and requires some hacks and exceptions involving hidden forms and such.

However, on the newer browsers, it's all about the [XmlHTTPRequest object](http://developer.apple.com/internet/webcontent/xmlhttpreq.html).  With this facility, I can make clean asynchronous requests back to the REST API, including XML data in the request body if I feel like it.  Responses are handled by JavaScript callbacks, which twiddle the browser DOM to update the user interface in response.  

So, after the major initial contact with the API to supply the browser with HTML by way of XSLT, most future interactions take place in the form of direct calls to the REST API using XML.  Although for some things, it's easier to just reload a page of HTML, it's nicer for most interactions to be handled via DOM manipulations in-place.  I've been amazed at the Gmail-like responsiveness I get from FeedReactor when I'm skimming through news items, marking some as seen or flagged, and popping open the descriptions on others.  

I suppose I *shouldn't* be amazed at the responsiveness, since I'm using some of the same techniques as Gmail.  However, my daily-use installation of FeedReactor is presently running on an old 300Mhz Debian Linux PC at home, and it's taking me through the daily produce of 600 subscribed feeds faster than any desktop aggregator has yet.  Of course, this is partly a product of my familiarity with the UI I've cobbled together, but... *the server's running on a 300Mhz PC with 256MB of RAM!*  And the client is my 867Mhz G4 PowerBook, running Firefox or Safari, depending on my mood.

Although I can't see when I'll have time for it, I really want to explore this approach further using desktop apps on OS X and accessing the API from Flash movies (maybe using [Laszlo](http://openlaszlo.org/)).  I'd also like to see how far I can go toward adapting the interface toward mobile devices like my Treo 600.

So anyway, this has been where most of my private hacking sessions have been taking me over the past year or so:  combining HTML, CSS, DOM, JavaScript, XML, XSLT, and REST to build what I consider to be a next-generation web app.  

Now, although I use FeedReactor on a daily basis to keep up with all my feeds, it's nowhere near any state suitable for public consumption.  I add new subscriptions from a command-line script and still fiddle with the database directly for some operations.  I'd like to have a personal-server version of it ready for use by some alpha geeks before or not long into the new year, but I'd like to share some of the things I've been doing with it before then.

With that in mind, I think I'll wrap up this entry and think about putting together a quick tutorial pico-project to demonstrate some of the concepts.  Maybe an address book, or something equally simple-yet-useful.  

Stay tuned.
<!--more-->
shortname=nextgenwebapps

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089601">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.ricebridge.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a57fe535201a5daca9590abd68d490c7&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.ricebridge.com">Richard Rodger</a>
                </div>
                <a href="#comment-221089601" class="permalink"><time datetime="2004-12-01T08:14:39">2004-12-01T08:14:39</time></a>
            </div>
            <div class="content">You should take a look at http://www.json.org which provides a really nice JavaScript-native way to exchange data using XMLHttpRequest.</div>
            
        </li>
    
        <li class="comment" id="comment-221089609">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://fiftyfly.mine.nu"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c1e58f891708437e94407f573639094c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://fiftyfly.mine.nu">mike</a>
                </div>
                <a href="#comment-221089609" class="permalink"><time datetime="2004-12-01T14:23:44">2004-12-01T14:23:44</time></a>
            </div>
            <div class="content">This is def a powerful set of techniques. I hadn't worked with a lot of javascript in several years but recently I'd wanted to put a cleaner face on my proof of concept request icecast station: http://fiftyfly.mine.nu/RFM . An off hand comment somone had made regarding XMLHTTPRequest sounded so interesting I had to give it some thought. The result can be found here: http://fiftyfly.mine.nu/RFMamp.html . Faster, cleaner, far more flexible - this excercise has made me think about web services in a way I hadn't previously. Consider my eyes opened ;)</div>
            
        </li>
    
        </ul>
    
        </div>
    