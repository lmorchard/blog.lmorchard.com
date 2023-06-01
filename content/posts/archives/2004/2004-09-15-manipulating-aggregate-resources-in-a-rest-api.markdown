---
comments_archived: true
date: '2004-09-15T14:48:53-04:00'
excerpt: So... am I missing a more elegant RESTful way of doing this which
    doesn't result in a quadrillion HTTP requests?
layout: post
tags:
- xml
title: Manipulating aggregate resources in a REST API?
wordpress_id: 547
wordpress_slug: manipulating-aggregate-resources-in-a-rest-api
wordpress_url: http://www.decafbad.com/blog/?p=547
---
Here's a tiny bit of a REST-ian quandary:  I'm working through this API for `dbagg3`.  The major resources involved include **subscriptions** and **entries**.  Quite often, while working on the UI, I find a need to manipulate ranges and collections of these resources-- things like: &#8220;mark these 12 entries as read&#8221; and &#8220;give me an aggregate of the new entries for these 6 subscriptions&#8221;.

So, I have been using URLs like the following:

* `POST /subscriptions/523/entries/12322,12326,12325,12388,12412/notes/`
* `GET /subscriptions/312,443,523/now-12.xml`

Doing things this way is terribly convenient with regard to stuffing many things into one HTTP request.  Problem is, with respect to REST, these URLs no longer refer to individual resources--  they're aggregate references.

I've been thinking about this apparent break with the REST philosophy, and was reminded of it after skimming through [Mark Baker's notes on a talk][mbakerrest] today.  

So... am I missing a more elegant RESTful way of doing this which doesn't result in a quadrillion HTTP requests?

[mbakerrest]: http://www.markbaker.ca/Talks/2004-xmlself/all.htm

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090514">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://trevor.smith.name/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e873edb1d1943ea7087468439ce64d37&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://trevor.smith.name/">Trevor F. Smith</a>
                </div>
                <a href="#comment-221090514" class="permalink"><time datetime="2004-09-15T16:29:16">2004-09-15T16:29:16</time></a>
            </div>
            <div class="content">Even the most stringent of REST advocates will break down and use reasonable parameters for adjectives, adverbs and unusual qualifiers.  Leave the path for nouns and verbs.</div>
            
        </li>
    
        <li class="comment" id="comment-221090515">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=ad3bec4560b1c5d0ffddddc497c8b1e0&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jeremy Dunck</a>
                </div>
                <a href="#comment-221090515" class="permalink"><time datetime="2004-09-15T17:06:44">2004-09-15T17:06:44</time></a>
            </div>
            <div class="content">PUT /aggregates/312,443,523

1

---

GET /aggregates/1/now-12.xml</div>
            
        </li>
    
        <li class="comment" id="comment-221090516">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://franklinmint.fm"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b9ed774661a22ff8797a1e0e24f0baf3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://franklinmint.fm">Robert Sayre</a>
                </div>
                <a href="#comment-221090516" class="permalink"><time datetime="2004-09-15T18:08:17">2004-09-15T18:08:17</time></a>
            </div>
            <div class="content">Lessons from WebDAV</div>
            
        </li>
    
        <li class="comment" id="comment-221090517">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.shearersoftware.com/personal/weblog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4654316e8388b2e83af98a3118d976bb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.shearersoftware.com/personal/weblog/">Andrew Shearer</a>
                </div>
                <a href="#comment-221090517" class="permalink"><time datetime="2004-09-15T18:43:59">2004-09-15T18:43:59</time></a>
            </div>
            <div class="content">Interesting method, Jeremy.

The revised GET request looks closer to the REST philosophy to me than the original. The thing that worries me is that now you're generating state on the server (a new "aggregate resource" with its own identifier), and it's not clear that it's needed. How long does the server have to keep the list around? Could other clients access it if they guessed the ID?

It's the PUT request that causes the problems. It's a high price to pay for a modest improvement in the GET request.

On second thought, I don't see much wrong with the original. URLs can be algorithmic, and this one just happens to refer to a list of things. The thing that throws it into a different mental category for me is probably the combinatorial explosion. But does it really matter that now, for practical purposes, the REST service could no longer be fully indexed by search engines?</div>
            
        </li>
    
        <li class="comment" id="comment-221090519">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.scifihifi.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=266511c4b3124a981ccd3b1716e0bb0b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.scifihifi.com">Buzz Andersen</a>
                </div>
                <a href="#comment-221090519" class="permalink"><time datetime="2004-09-15T19:57:21">2004-09-15T19:57:21</time></a>
            </div>
            <div class="content">I've wondered about this in the context of an application I'm designing that allows wildcard queries (e.g. /id/1*/details.html) as part of the URL path.  To me, it seems OK to do that, from REST's "document-centric" viewpoint, since it seems reasonable that I could actually have an actual document with that path.  Your original GET request seems like the same thing to me.

I could be completely wrong though--I'd be the first to admit that I still find REST a bit difficult to pin down.  It seems like it's a lot like the old saw about pornography: I can't define it, but I know it when I see it :-).</div>
            
        </li>
    
        <li class="comment" id="comment-221090520">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.scifihifi.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=266511c4b3124a981ccd3b1716e0bb0b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.scifihifi.com">Buzz Andersen</a>
                </div>
                <a href="#comment-221090520" class="permalink"><time datetime="2004-09-15T20:55:05">2004-09-15T20:55:05</time></a>
            </div>
            <div class="content">Upon further reading: isn't Jeremy's method wrong per Paul Prescod's "Common REST Mistakes" (http://www.prescod.net/rest/mistakes/)?  In particular:

"Do not invent proprietary object  identifiers."

And...

"If you use URI syntax with UUIDs or something like that then you  get half of the benefit of URIs. You get a standardized syntax but have no standardized dereferencing capability."

Essentially, only the client that did the post and stored the ID in Jeremy's example would have a way of referencing that set.

Am I wrong?</div>
            
        </li>
    
        <li class="comment" id="comment-221090521">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.ianbicking.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cc8334869c9d2a9e603017f2da805eb3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.ianbicking.org">Ian Bicking</a>
                </div>
                <a href="#comment-221090521" class="permalink"><time datetime="2004-09-16T11:12:56">2004-09-16T11:12:56</time></a>
            </div>
            <div class="content">To expand on WebDAV, certain WebDAV operations produce compound requests and responses, all packaged in XML.  I can't remember what they look like, but it's really nothing more than several HTTP requests packaged in XML.  They use it for doing atomic operations on several files/resources.  It's kind of REST, kind of anti-REST.

Otherwise, of course, the query string is reasonably unordered and allows multiple pieces of data, i.e., /subscriptions/now-12.xml?id=1&id=2&id=3

Another option is to somehow define sets.  E.g., something like POST /createset (request body contains the IDs) and then the server responds with an identifier for that set, and then you work with that identifier.</div>
            
        </li>
    
        <li class="comment" id="comment-221090522">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=d0d0148e03ff9f1639cab8b35bf625db&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Ken Meltsner</a>
                </div>
                <a href="#comment-221090522" class="permalink"><time datetime="2004-09-16T15:31:28">2004-09-16T15:31:28</time></a>
            </div>
            <div class="content">You could have the system return an existing identifier as the response to sending it a set of identifiers, if that set has already been defined.

That is, treat the GET as more of a "return existing or create a new one" operation.  And if you want to be really consistent, allow sets to include other sets.


Perhaps something like:

GET /setID/entries/12322,12326,12325,12388,12412

would return 

912345678

the first time and all following times, and then 912345678 could be used from then on.

I think this would be idempotent, cache-friendly, etc.</div>
            
        </li>
    
        <li class="comment" id="comment-221090523">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.markbaker.ca"><img src="http://www.gravatar.com/avatar.php?gravatar_id=05a5272a087ce9a44bd5f050932d7a28&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.markbaker.ca">Mark Baker</a>
                </div>
                <a href="#comment-221090523" class="permalink"><time datetime="2004-09-26T14:03:39">2004-09-26T14:03:39</time></a>
            </div>
            <div class="content">Yah, REST isn't ideal for dealing with sets of resources since most operations on sets are specific to sets and therefore not uniform.  Consider the equivalent of a "FILL" operation, which would be a PUT on everything in a set of resources, where the set was identified by the HTTP Request-URI.

WebDAV can help with its collections stuff, but sometimes that's overkill.  When I've encountered this, I've simply created a resource for the set and a POST on it changes the state of all the members of the set.  Not RESTful, but so long as you understand the architectural consequences, that's ok.</div>
            
        </li>
    
        <li class="comment" id="comment-221090524">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=ad3bec4560b1c5d0ffddddc497c8b1e0&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jeremy Dunck</a>
                </div>
                <a href="#comment-221090524" class="permalink"><time datetime="2004-10-05T15:17:52">2004-10-05T15:17:52</time></a>
            </div>
            <div class="content">I'm not a well-experienced, RESTian.  Thanks for the pointer to Prescod's piece.

I was thinking what Ken later said (Sep 16 @ 3:31PM).</div>
            
        </li>
    
        </ul>
    
        </div>
    