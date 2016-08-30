---
comments_archived: true
date: '2005-01-12T16:12:40-05:00'
excerpt: These tuple spaces seem pretty nifty.  I wonder how we can make
    the web more like a tuple space?
layout: post
title: The Blogosphere as a Tuple Space
wordpress_id: 586
wordpress_slug: the-blogosphere-as-a-tuple-space
wordpress_url: http://www.decafbad.com/blog/?p=586
---
It just occurred to me today that the blogosphere is like a [Tuple Space][tuples].  Or rather, each person's light cone in the blogosphere, made up of the feeds and blogs you track and what you publish, is a [Tuple Space][tuples]--and the blogosphere itself is the union of every personal [Tuple Space][tuples] in existence.

## What's a Tuple Space?

In case you're not at all familiar with [Tuple Spaces][tuples], this is how I understand them:  

There's a magic bag full of marbles.  The marbles have all sorts of different properties, like color, roundness, size, and material.  You can put in marbles of any sort, and so can everyone else.  When you want to take marbles out, you tell the bag what you want.  

For instance, "Bag, I want blue marbles made of glass," and you'll get a pile of marbles that are blue and made of glass, but come in all sizes and degrees of roundness.  Someone else asks for 1cm-wide egg-shaped marbles made of high-bounce rubber, they get egg-shaped bouncing marbles in all kinds of colors.

Now, real [Tuple Spaces][tuples] are even more abstract than this.  Python has tuples; they look something like this:

    ("foo", 1, 2, "baz", 23.2)
    (4, 5, 6)
    ("foo", 7, 2, "xyzzy", 89)
    ("foo", 9, 2, "xyzzy", 100.3)
    (ExampleObject("wheee"), 123, None)
    (23,)
    
Imagine the magic bag is a heap of these tuples.  You ask for tuples by *pattern*, like this:

    ("foo", ?int, 2, ?str, ?float)
    
And the bag would give you the tuples which match the pattern:

    ("foo", 1, 2, "baz", 23.2)
    ("foo", 9, 2, "xyzzy", 100.3)

The thing that makes this even more abstract than a bag of marbles is that these tuples are just ordered collections of data items.  They're not labeled as properties like "color", "size", "shape", or "material".  Where the data items within tuples pick up meaning is through agreement amongst users of the tuple space.  

Tuple spaces get really interesting, though, because different collectives of users of the tuple space can each agree upon different sets of meanings for tuples--and the agreements exist outside of tuple space, so the space doesn't need reconfiguration for any particular new use.  Meanwhile, the infrastructure supporting the sharing of the tuple space remains simple, and the interface remains the same.  Because they don't know any better, tuple spaces can allow for all kinds of sharing and coordination that no one necessarily has to plan for ahead of time.

For example, want to send instant messages?  Fill space with tuples like this:

    ("TIM-Msg", "Joe", "Frank", "2004-01-12T15:49:00", "Hi there, Joe.")
    ("TIM-Msg", "Frank", "Joe", "2004-01-12T15:52:00", "Hey Frank, how's it going?")
    ("TIM-Msg", "Joe", "Frank", "2004-01-12T16:01:00", "Good, good.")
    ("TIM-Msg", "Frank", "Joe", "2004-01-12T16:12:00", "Glad to hear it!")
    
You can probably figure out what meanings the "TupleIM" client would assign to tuple elements.  If you were Joe, your client might leave a running query in space for tuples like `("TIM-Msg", "Joe", ?, ?, ?)`, where as Frank would subscribe to a query like `("TIM-Msg", "Frank", ?, ?, ?)` .  

## What Do Tuples Have to Do with Blogs?

Well, we're not really there yet, but the parallels between blogs, the web, REST APIs, and tuple spaces are many.  The web sounds an awful lot like a potential tuple space to me, although it needs a lot of work to become one.  Resources accessible by URL are kind of like tuples, though Google doesn't make quite as universal a tuple-finder as we'd like.  Syndication feeds, however, and the metadata they carry causes the data items to be better exposed to a potential tuple-finder.

But, think about the [Lazyweb][lazyweb].  Want something made?  Post a description of it on your blog and trackback to the [Lazyweb][lazyweb].  (Put a marble in the bag, insert a tuple into space.)  Bored and want to make something?  Subscribe to the [Lazyweb][lazyweb] feed and watch for interesting projects to roll by.  (Ask the bag for fun marbles, search for special tuples.)  The person who posted the project might have never met the person who eventually implements the project, but the blogosphere enabled the interaction.  The people involved took on at least half of the duty in finding tuples, but there seem to be tuple-space-esque things going on here.

Ever post something to your blog with no specific set of people in mind?  Maybe just a vague notion of what *sort* of people might want to read it or respond to you?  Ever get surprised by who responds to your postings?  

That feels like a tuple space to me.  

These tuple spaces seem pretty nifty.  I wonder how we can make the web more like a tuple space?

[lazyweb]: http://www.lazyweb.org/
[tuples]: http://c2.com/cgi/wiki?TupleSpace

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085211">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://talideon.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=16a1717a880cce3bfefce65049d7120d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://talideon.com/">Keith Gaughan</a>
                </div>
                <a href="#comment-221085211" class="permalink"><time datetime="2005-01-12T19:40:05">2005-01-12T19:40:05</time></a>
            </div>
            <div class="content">I remember somebody remarking online, somebody well known, that blogs look like Lifestreams. It's all connected really.</div>
            
        </li>
    
        <li class="comment" id="comment-221085216">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://lion.taoriver.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b49f34733c8d7cf1120f83d6c21433df&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://lion.taoriver.net/">Lion Kimbro</a>
                </div>
                <a href="#comment-221085216" class="permalink"><time datetime="2005-01-13T04:53:00">2005-01-13T04:53:00</time></a>
            </div>
            <div class="content">I was very excited about Tuple Spaces, until I realized that they were only supposed to store tuples.

What I think is more interesting, is a large general graph store, with a pattern matcher.

The tuple space is limited to only looking for matching *tuples.* But I think you should be able to enter in any query over a giant graph.

For instance, in your Instant Message example, there should be a node for "single conversation." The individual message would be another node. The word "Joe" should be replaced by a link to the node for the whole person, Joe. (If you wanted to know that person's name, it the node for the person Joe would have an attribute "first name" that linked to "Joe.") The destination, in turn, links to the node for Frank. The *time* links to a temporal node, which may be a virtual node on a continuum. Finally, the message is an attribute that links to the particular string.

This is a MUCH more powerful model, because you can look at the graph, and say, "Show me everything that happened from time t1 to time t2," and it will mesh with the entire system.

In fact, you can say, "Let me know whenever a message is posted between time t3-t4 where the target is Frank."</div>
            
        </li>
    
        <li class="comment" id="comment-221085217">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://creativekarma.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b581950de350ed6ad83f09ec48a6be3f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://creativekarma.com/">Doug</a>
                </div>
                <a href="#comment-221085217" class="permalink"><time datetime="2005-01-14T01:09:55">2005-01-14T01:09:55</time></a>
            </div>
            <div class="content">Since I don't understand either concept in detail, I'll ignorantly ask, "Is this somehow different from the Semantic Web?" They sound the same to me.</div>
            
        </li>
    
        <li class="comment" id="comment-221085219">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.jamesbritt.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=ff9e18f0699bf079f1fc91c8d4506438&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.jamesbritt.com">James Britt</a>
                </div>
                <a href="#comment-221085219" class="permalink"><time datetime="2005-01-18T10:29:22">2005-01-18T10:29:22</time></a>
            </div>
            <div class="content">"Since I don't understand either concept in detail, I'll ignorantly ask, 'Is this somehow different from the Semantic Web?' They sound the same to me"

Good question.  The description of tuples as a vector of attributes looks just like del.icio.us.  Bookmarks (i.e., resources) are the marbles.  You can ask for resources by some tag vector:
[ 'Ruby', 'XML', 'Rinda' ]
and see what comes back.

One interesting difference is that the tags do not (currently, that I know of) have types.  The Python example shows the use of type selectors (e.g., include as a criteria any Integer).  Tags on del.icio.us (and probably all folksonomy sites) are unclassified.  You cannot, for example, ask for all resource with tags related to database programming; something has to know that this request set includes more than just those resources explicitly tagged 'database-programming'.  You would likely also want resource tagged 'mysql-programming', and so on.  (And this is the harder part: the metadata itself needs metadata to define such higher-level groupings. To get a richer navigation scheme, it would be good if tags/topics were assigned to facets. )

But even without such sophistication the use of tagged resources is very much like tuple spaces.</div>
            
        </li>
    
        <li class="comment" id="comment-221085220">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://thefourthplace.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b96fe040c899286ba7ec28e05aab6e5f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://thefourthplace.net/">Simon Gibbs</a>
                </div>
                <a href="#comment-221085220" class="permalink"><time datetime="2005-01-20T07:57:40">2005-01-20T07:57:40</time></a>
            </div>
            <div class="content">You are talking about the Semantic Web, RDF in particular, though you can indirectly derive tuples from X/HTML too. blockquote, used with cite, is a great example, and link, meta etc as well.

"this is the harder part: the metadata itself needs metadata to define such higher-level groupings"

This is what OWL does. For example, ((url),(topic),(mysql-programming))
 is a "specialisation" of the tuple ((url),(topic),(database-programming)).

http://www.w3c.org for more.</div>
            
        </li>
    
        </ul>
    
        </div>
    
