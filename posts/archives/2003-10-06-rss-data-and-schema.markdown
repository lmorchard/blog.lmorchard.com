---
comments_archived: true
date: '2003-10-06T18:52:44-04:00'
layout: post
title: 'RSS-Data and Schema: Thinking about structure and data'
wordpress_id: 493
wordpress_slug: rss-data-and-schema
wordpress_url: http://www.decafbad.com/blog/?p=493
---
<blockquote cite="http://danja.typepad.com/fecho/2003/10/why_use_schema.html"><i>Dare Obasanjo has provided some initial bullet points of what a vocabulary gets from having an XML Schema :
<br /><br />
 * Usually provides a terse and concise description of
 the vocabulary [relative to the prose of the spec]
<br /><br />
* Enables software to validate that XML documents
 being received from clients or servers actually
 conform to the vocabulary. This prevents issues like
 each application hacking up its own validator or
 "liberal RSS parser". 
<br /><br />
* Allows vocabulary to co-exist with technologies and
 tools that already support features specific to a
 schema language such as relational to XML mapping,
 object to XML mapping, directed editting, etc.
</i></blockquote>
<div class="credit" align="right"><small>Source:<cite><a href="http://danja.typepad.com/fecho/2003/10/why_use_schema.html">Finally Atom: Why use schema?</a></cite></small></div>

<blockquote cite="http://journurl.com/support/index.cfm?fa=skin.read&message=664&group=9&thread=444&date=all&mrow=3&trow=1"><i>Danny [Ayers]: "...and the same can already be done using RSS 1.0 as it stands."
<br /><br />
But are we talking about the same "same"?  The appeal of RSS-Data is that I don't need to work up a schema, get anyone to buy-in, or map anything to an external resource... I take an existing data structure, and plug it into a syndication feed. That's it.
</i></blockquote>
<div class="credit" align="right"><small>Source:<cite><a href="http://journurl.com/support/index.cfm?fa=skin.read&message=664&group=9&thread=444&date=all&mrow=3&trow=1">Roger Benningfield in a comment on his "RSS-Data: A Working Demo"</a></cite></small></div> 

<blockquote cite="http://blogs.it/0100198/2003/10/05.html#a1807"><i>Yes - we know that RDF can do many of the things RSS-Data was designed for.? But (believe it or not) it really has nothing to do with RSS 1.0 at all.? RSS-Data is about extending RSS 2.0.? OK?? Not RSS 1.0.
<br /><br />
The point here being that the world is bi-forcated and what do we do?? Can't we all live together?? Can't we put our heads together and come up with solutions that BRIDGE between these two standards - which just happen to have almost the same dam name?
<br /><br />
I gotta believe there's a way that once we "structure" something - like a Calendar Events, Resumes, Recipes or Reviews - we SHOULD be able to express and subscribe to these micro-content?formats - via EITHER RSS 1.0 or RSS 2.0.
<br /><br />
OK - get it?? BRIDGE BETWEEN BOTH RSS 1.0 & RSS 2.0.? That's what we want.? BOTH!</i></blockquote>
<div class="credit" align="right"><small>Source:<cite><a href="http://blogs.it/0100198/2003/10/05.html#a1807">Marc's Voice: We want BOTH RSS 1.0 & RSS 2.0!</a></cite></small></div>
<br /><br />
So, it looks like this RSS-Data thing is gaining momentum and <a href="http://journurl.com/support/users/admin/index.cfm?mode=article&entry=662">demos</a>, so I'm guessing that it's going to become one of the thing us <a href="http://www.decafbad.com/blog/tech/old/oooaee.html">rock-bangers</a> will have to contend with at some point or another in tinkering with things in syndication and interoperability.  I have my misgivings about it, which mostly center around the issue of schema.
<br /><br />
See, the goal of RSS-Data, as I understand it, is to bridge raw data from one programming environment to another, and package it up to be syndicated within RSS feeds for which an existing infrastructure already exists.  So, it's "easy".  Just throw your data structures at a library, which serializes them into some magic XML.  At the receiving end, another library, written possibly in a different language altogether, transliterates the magic XML into local idiomatic data structures.  You never think much about XML, nor does the consumer of your data.
<br /><br />
But...  we're still talking about <i>structures</i> here.  Whether they're represented by XML tags, RDF triples, RDF/XML serialization, or hashtables and arrays-- there's still a structure involved.  From whence did it come?
<br /><br />
About RSS-Data, Roger Benningfield writes, "...I don't need to work up a schema...", which is literally true.  He goes on to write, "I take an existing data structure, and plug it into a syndication feed. That's it."
<br /><br />
From where did this "existing data structure" originate?  For <a href="http://www.decafbad.com/blog/tech/rss_data_versus_namespace.html">my examples</a>, I used an existing schema from the Amazon web services.  Where'd you get yours?
<br /><br />
I'd guess that you got it from somewhere in the bowels of your scripts, a hash or rough structure once limited to intra- or inter- module data exchange, but now pressed into service as a unit of interoperation.  I wouldn't expect that you'd put much specific effort toward making this data structure particularly concise or friendly for interoperation.  This might not be a big deal for now.  And anyway, why bother with it?  That's not the philosophy with this tech, as far as I understand it.  The idea, is that hopefully this data structure is already <i>good enough</i> for sharing.  And, luckily enough, this is sometimes the case.
<br /><br />
On the other hand, maybe you're sitting down to come up with a new data structure for sharing, from scratch.  During this activity, I imagine that you'll be mulling over what goes where, what's contained by what, what this hash or dictionary key means versus that one.  You'll likely be deciding whether to use a string here, or a date time here, and you'll likely have some idea about ranges of values for various things.  This is a bit more abstract an activity than you may have gone through, were you simply creating an internal data structure for your app.  In this case, you'd likely be thinking more about the data in and of itself, rather than the specific needs of your app and its API. In my opinion, this is a <i>bit better</i> for sharing.
<br /><br />
But, how's your documentation?  Will I be able to reliably accept data from your application by just looking at a write-up or a rough spec?  Will I have to walk through your source code to reverse engineer general usage?  Will I have to examine RSS-Data dumps to come up with a rough approximation of what to expect from your data structure?  If this is a data structure plucked from the depths of your script, who knows?  If this structure was designed specifically for sharing, I hope that you've documented as you go along.
<br /><br />
What RSS-Data makes me worry about is an abundance of fuzzy, adhoc structures for interchange that no one ever quite documents well enough because they're too busy hacking along and pushing things out the door.  Maybe they'll be good enough, given discipline and thoughtfulness, but then maybe they'll end up in a mess.  But, just like many scripting languages, there are no facilities in RSS-Data currently to either require or even merely encourage clean and documented interchange structures.
<br /><br />
This is a <b>code-first-schema-later</b> approach:  The schema stems, eventually, from general usage and tradition, and if we're lucky, from documentation.  If the people hacking on the project have discipline and are thoughtful, this documentation will be well maintained, and changes well communicated.  It can be a train-wreck, but it doesn't have to be.
<br /><br />
On the other hand, we can circle back to that <a href="http://xml.amazon.com/schemas3/dev-lite.xsd">Amazon Web Services schema</a> I used in my <a href="http://www.decafbad.com/blog/tech/rss_data_versus_namespace.html">previous examples</a>.  This technology, <a href="http://www.w3.org/TR/xmlschema-1/">XML Schema</a>, represents the opposite approach: <b>schema-first-code-later</b>.  In coming up with such a schema, I think still think about information and data structures just as I would while hacking on a script and thinking about a native data structure for sharing.  It's just that, with this approach, I'm doing things in a different order and front-loading the thinking. 
<br /><br />
But, there's more: if I build something like an XML Schema, I'm creating something which is both documentation <i>and</i> a machine readable resource.  I'm sure someone out there is working on or has released tools or stylesheets to convert XML Schema into HTML or RTF or something human readable.  Hell, you could even <a href="http://www.xml.com/pub/a/2003/01/15/transforming-schemas.html">apply some transformation to the schema to generate code or data entry forms</a>.
<br /><br />
Once I have a schema, implementing code to produce and handle XML data conforming to it isn't really all that much harder than using straight RSS-Data.  This is an item for much dispute, but my gut and limited experience tells me that the difference in complexity will usually be more like a dozen lines of code or less in a decent environment rather than, say, an order of magnitude.  I think we'll find that things will tend to be consistent with <a href="http://www.myelin.co.nz/post/2003/10/3/#200310033">Phillip Pearson's example implementations</a> of an RSS namespace extension versus an RSS-Data example.
<br /><br />
What we get for the added complexity, though, is certainty.  I can say, "Here.  This is a URL to the schema for the XML data my application produces."  If I've lived up to my end 
of the bargain, you won't even need to see my application's code or documentation.  You can implement with the schema, and our apps will interoperate.  We can treat the data formats <i>as separate entities from applications</i>.  In other words, we can treat interchange <i>as neutral ground</i>.
<br /><br />
The problem, of course, is that this business with schema carries with it a bit of overhead, as well as a demand that you do some homework.  You'll need to know more than your immediate programming environment.  You'll need to think about XML and XML schemas, and you can't just stay in your comfortable favorite environment of programing language idiom.  This is off-putting to some, to say the least.
<br /><br />
So...  how about Marc's question?  "Can't we all live together?? Can't we put our heads together and come up with solutions that BRIDGE between these two standards - which just happen to have almost the same dam name?"  On the one side, I see hackers who want to get down and code, and who consider themselves and each other thoughtful and disciplined enough to do the right thing and prevent trainwrecks.  On the other side, I see hackers who want to put discipline and thoughtfulness upfront and <i>in writing (or typing?)</i> before they code, because they don't really trust themselves or others to keep from wrecking the trains all the time.
<br /><br />
Personally, I want to live somewhere in the middle.  Just enough distrust of myself and others to discourage sloppy problems, but not too much so that I have to trudge through careful molasses to get anywhere.
<br /><br />
I don't think I'm thrilled with RSS-Data.  But if you're going to use RSS-Data anyway, but here's one thought out of all this:  Is there some way we could come up with an RSS-Data-analogue for schema?  Forget about XML schema and standards groups and the like.  Think about some semi-universal way of translating meta-data-structures composed within one's favorite scripting language which forms documentation and a promise about what to expect over the wire?  If done right, maybe we could even generate an XML schema with this, and that could be a bridge between the two approaches.  On the surface, it sounds like a wonky idea to me, but hey...
<br /><br />
Thanks for bearing with me through this much-longer-than-usual post.  :)
<!--more-->
shortname=rss_data_and_schema

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086629">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://therealadam.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b205857010d759de7e2c8cb592b01dd5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://therealadam.com">Adam Keys</a>
                </div>
                <a href="#comment-221086629" class="permalink"><time datetime="2003-10-06T23:03:14">2003-10-06T23:03:14</time></a>
            </div>
            <div class="content">This is absolutely brilliant.  I'd been wanting to get into RSS-Data tonight and this is the perfect jumping off point.  Unfortunately there are so many jumping off points you've offered, I'm afraid I'll bog down in the research.  Ah, life is difficult.  So many technologies, so little time.</div>
            
        </li>
    
        </ul>
    
        </div>
    