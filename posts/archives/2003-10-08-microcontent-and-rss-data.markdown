---
comments_archived: true
date: '2003-10-08T08:30:52-04:00'
layout: post
title: Microcontent and RSS-Data
wordpress_id: 495
wordpress_slug: microcontent-and-rss-data
wordpress_url: http://www.decafbad.com/blog/?p=495
---
<p>
In response to the opposition to RSS-Data,
<a href="http://blogs.it/0100198/2003/10/07.html#a1818">Marc asks</a>,
"Where are the Reviews, Resumes, Recipes, Topics and other cool new
forms of micro-content?"
</p>
<p>
Well, I did a bit of Googling this morning, and this is what I found:
</p>
<ul>
<li>
On the subject of reviews, A.M. Kuchling
<a href="http://www.amk.ca/xml/reviews.html">has provided</a> an
<a href="http://amk.ca/xml/review/1.0">RDF namespace</a>
for embedding book review metadata within XHTML documents.
</li>
<li>
For resumes,
Uldis Bojars
<a href="http://lists.w3.org/Archives/Public/www-rdf-interest/2002Jun/0077.html">has been working</a> on an
<a href="http://nightman.lv/~captsolo/cv.rdfs">RDF schema for resumes and CV</a>.
</li>
<li>
To offer up recipes, I found
<a href="http://donnafales.com/2002/07/28/recipe-schema">this RDF schema</a>
for <a href="http://donnafales.com/2003/recipes">recipes</a> hosted on
<a href="http://donnafales.com">donnafales.com</a>.
</li>
<li>
As for topics, well, there's already a straight RSS 2.0 namespace
extension called <a href="http://matt.blogs.it/specs/ENT/1.0/">Easy News Topics</a>.
</li>
<li>
And, finally, for events there is
<a href="http://web.resource.org/rss/1.0/modules/event/">mod_event</a>,
and RSS 1.0 module used for presenting calendar event information.
</li>
</ul>
<p>
Yes, with the exception of ENT, these are RDF schema or namespaces.
But, any one of them could likely be adapted to straight XML and used as an RSS 2.0
namespace, thereby leveraging the work these people have already done
in modeling these kinds of content, as well as potentially providing
an easy transformation path to RDF for those who care.
</p>
<p>
What does RSS-Data provide out of the box which makes any of the
above obsolete?  There's no magic here, other than translating between
raw data sctructures.  You'll still need to do the same sort of
modeling and structure work that the authors of all the above have
done.  It's always nicer to have someone else do homework for you.
</p>
<p>
So, if all this new microcontent is so hot, why hasn't anything like
the above been put into use?  Would adding 5 new tags to an RSS
feed really be an insane burden to express calendar events?  Granted,
some of the other examples above are more complex, but then so are
the things they seek to represent.
</p>
<p>
What's the RSS-Data magic that improves on all the above?
</p>
<!--more-->
shortname=microcontent_and_rss_data

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085572">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dannyayers.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=ac0d01ebb5e438c029c0764064f70827&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dannyayers.com">Danny</a>
                </div>
                <a href="#comment-221085572" class="permalink"><time datetime="2003-10-08T13:47:50">2003-10-08T13:47:50</time></a>
            </div>
            <div class="content">I did one too! A review vocab that is (I only did it as a demo, but Leigh used it in FOAF-a-matic for music and *blogs*, so I've started treating it proper).

http://ideagraph.net/xmlns/rev/
blog note:
http://dannyayers.com/ideagraph-blog/archives/cat_vocabularies.html

Re. RSS 2.0 extensions, I recently did a bit of Googling myself:

http://dannyayers.com/archives/001713.html

(in short, they're not getting used much)</div>
            
        </li>
    
        <li class="comment" id="comment-221085574">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://admin.support.journurl.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4df556273eae91df768e9af6e4efdfcc&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://admin.support.journurl.com/">Roger Benningfield</a>
                </div>
                <a href="#comment-221085574" class="permalink"><time datetime="2003-10-09T02:03:01">2003-10-09T02:03:01</time></a>
            </div>
            <div class="content">Les: There's a recurring theme in a few of your recent entries that I think it pretty important to consider... extended metadata in RSS is, so far, sort of a flop. The central elements of title, description, and date are so easy to adapt to so many applications that *any* kind of extension (namespaces, RDF, or RSS-Data) may be more trouble than 90% of the folks out there are willing to endure. In the grand scheme, streamlining something like RSS subscriptions or subscription management is probably *way* more important than finding ways to wedge new information into existing feeds. So ultimately, we may be debating an edge case's edge case.

But assuming for the moment that there's actually a point to all of this :) , and in answer to your entry...

Les: "You'll still need to do the same sort of modeling and structure work that the authors of all the above have done. It's always nicer to have someone else do homework for you."

Why would I design my application's internal database, for example, around what some random group/person thinks a book review should look like? My development environment has efficiencies and potholes to consider. My application has different expectations for user input and behavior. My users have needs that may not track with the mainstream.

I fundamentally disagree with that sort of thinking... it's one of the big reasons that I tend to lose interest in some XML/blogging/whatever projects. (Atom being a recent, prominent example.) There often seems to come a point where data-modeling fans stop talking about ways to translate what I'm saying into something we both understand and start telling me to change my native language to suit their notions of order and purity.

Now, as I sit here typing this, it occurs to me that RSS-Data could be the exact same thing in reverse. It's possible that some of it's appeal to me may boil down to a desire to project *my* priorities on to other folks. It's a bit hypocritical of me to be irritated by people who want to tell me how to design my app and then turn around and tell someone else, "Hey, if you want at my data, you'll just have to accomodate my internal structure in your app."

I hope you're proud of yourself, Les. You're about to make me change my mind by inadvertantly poking my guilty conscience with a stick. :D</div>
            
        </li>
    
        </ul>
    
        </div>
    