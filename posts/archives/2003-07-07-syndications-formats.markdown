---
comments_archived: true
date: '2003-07-07T12:40:13-04:00'
layout: post
title: Is the magic in RSS, or in Syndication?
wordpress_id: 438
wordpress_slug: syndications-formats
wordpress_url: http://www.decafbad.com/blog/?p=438
---
<blockquote cite="http://www.dynamicobjects.com/d2r/archives/002156.html">
Tools will start to support necho as well as <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a>. The formats will
coexist, just as <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> 0.91 and <a href="http://www.decafbad.com/twiki/bin/view/Main/RDF">RDF</a> and <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> 2.0 coexist
today. Furthermore, this coexistence will be transparent, just like
today. Over time, necho will, hopefully, become the standard. In the
meantime, there will not be a major catastrophe of incompatibility...
Eventually, some of the other formats might become less used, and will
be phased out (this is something that is already happening, for
example, with the transition from <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> 0.91 to <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> 2.0). And because,
currently, <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> is being almost exclusively used for updates and
regenerated constantly at each endpoint, there will be little if any
switchover cost, again, as an example of this I put forward the
transition from <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> 0.91 to <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> 2.0 that happened last year.
<br /><br />
Obviously, it's on us, the developer community, to add necho support
without disruption, and it's not a problem. After all, we are already
doing it today, and moving most (hopefully all) tools into necho will
eventually reduce work for developers in the future, allowing us to,
finally, concentrate on improving the tools rather than on how to let
them connect to each other.
</blockquote>
<div class="credit" align="right"><small>Source:<cite><a href="http://www.dynamicobjects.com/d2r/archives/002156.html">d2r: why (not)echo is important -- part 2</a></cite></small></div>
<br /><br />
When I read
<a href="http://www.jarretthousenorth.com/2003/06/26.html#a2338" target="_top">Dave's post</a>
that developers were trying to "rip up the pavement, break
everything and start over", I wondered what he was talking about.
(Strangely, I can't find the original posting on Dave's blog.  Maybe
<a href="http://www.jarretthousenorth.com/2003/06/26.html#a2342" target="_top">the statement was revised</a>
in the face of a later endorsement of the
project?)  The reason I was wondering is because nothing broke
on <strong>my</strong> desktop.  Every <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> feed to which I subscribed was still feeding
me <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a>, and my home-brew aggregator continued crunching and delivering
my fix.
<br /><br />
In fact, my aggregator's <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> consumption is based on
<a href="http://diveintomark.org/archives/2002/08/13/ultraliberal_rss_parser.html" target="_top">Mark Pilgrim's Ultra-liberal <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> parser</a>.
And, it looks like Mark's been one
of the developers involved in the (not)Echo project.  Mark didn't
break anything for me, and couldn't if he wanted to.  On the contrary,
he continues to offer his code, and even updated it not more than a
month ago to address link-vs-guid concerns in a useful way.  Hell, even
though Mark <a href="http://diveintomark.org/archives/2003/07/01/leave_rss_alone.html" target="_top">demonstrated his break with <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> tinkering</a> rather concretely
by implementing a very literal interpretation of the spec, I can still
download
<a href="http://diveintomark.org/projects/misc/rssparser.py.txt" target="_top">his working <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> parser code</a>.
<br /><br />
I'm a user and a developer all at once: I produce <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a>, I consume <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a>,
I develop with <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a>, and yet I'm watching (not)Echo with great interest
and welcome it when it's ready.  I fully expect that, in my tinkering,
it'll take me less than a lazy evening's work to put together a
template to publish a (not)Echo feed from my blog, and to add
(not)Echo support to my aggregator.  Hell, I might even get another
parser from Mr. Pilgrim to drop into my project.  But, as long as
others are still producing and expecting <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a>, I'll still accept and
offer <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a>.  No breakage here.  In fact, if I get off my lazy butt,
I'll <a href="http://backend.userland.com/davesRss2PoliticalFaq#questionWhatDoesFunkyMeanInTheContextOfRss20" target="_top">unfunkify</a>
my own feed and upgrade it to <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> 2.0 while I'm at it.
This isn't really heavyweight stuff here.
<br /><br />
Then, I read things like
<a href="http://weblog.infoworld.com/udell/2003/06/27.html" target="_top">Jon Udell's Conversation with Mr. Safe</a>
and other worries that the whole technology of web content syndication
and management will be avoided by big money, or even more horribly,
co-opted by big money in the confusion.  Has the BBC or the New York Times
expressed any change of heart with their decision to offer their content
in a syndication format?  Has the basic tech stopped working?  There are no
pieces of sky on my balcony, though I fully admit that I might be too
naive to see them.
<br /><br />
See, to me, <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> ain't the thing.  Content syndication and aggregation
are the thing, and that's going strong.  Are the people with big money
interested in this geeky thing called <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a>, or are they interested in
syndication and aggregation?  You know, getting their content out
there and read?  Do they know that this (not)Echo effort hasn't
actually made <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a>-supporting software stop working, nor will it ever?
Just because a bunch of bloggers and tinkerers got together and decided
to start making an alternate format and API doesn't mean that the
existing, mature technology suddenly goes sproing.
<br /><br />
In fact, unless or until this upstart (not)Echo project builds
something amazing in terms of in-spec capabilities and vendor support,
the currently working <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a>-based tech is a safe bet.  And, in fact, I'd
be willing to bet that <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> will still be a force to consider in years
to come, even if (not)Echo introduces some irresistable pull.
Companies like Blogger and <span style='background : #FFFFCE;'><a href="http://www.decafbad.com/twiki/bin/edit/Main/SixApart?topicparent=Main.FilterData"><b>?</b></a><font color="#0000FF">SixApart</font></span> would reveal themselves to be run
by morons if they screwed users by dumping <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> overnight.  (And that's
ignoring the fact that <strong>someone</strong> would come along and whip something
up to fix their idiocy somehow.)
<br /><br />
And, I'm sure Microsoft or some well-heeled vendor could try stepping
in with a format of their own and try to steamroll it through with
their own blogging tools and aggregation services, but you know,
they're not omnipotent.  The Internet didn't go away when MSN was
introduced, and the web full of <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> feeds won't go away even if they
introduce MSNBlogs or some such.  It'd take a gigantic fight, lots of
very shiny bits, or many bribes.
<br /><br />
I mean, that's what it takes to get my cats to do anything.
<!--more-->
shortname=syndications_formats

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088195">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.voidstar.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4ca7f18e6a976271f93b665a6a84cec4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.voidstar.com">Julian Bond</a>
                </div>
                <a href="#comment-221088195" class="permalink"><time datetime="2003-07-07T14:54:28">2003-07-07T14:54:28</time></a>
            </div>
            <div class="content">The only thing that wound me up about Mark P's little jest of removing link, and the only thing that winds me up about Dave W's problems with explaining what he thinks link should be used for, is that they're both messing with the old lizardbrain core in one way or another. As long as we all go on supporting CITLD (Channel, Item, item.link, item.title, item.description), RSS will continue to grow, no matter what we call it and no matter what we add to it.

Don't break the core.</div>
            
        </li>
    
        <li class="comment" id="comment-221088198">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.michaelbernstein.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d43258bf8e56395266b3f2e2ad64344e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.michaelbernstein.com">Michael Bernstein</a>
                </div>
                <a href="#comment-221088198" class="permalink"><time datetime="2003-07-07T17:18:24">2003-07-07T17:18:24</time></a>
            </div>
            <div class="content">Some 'pavement' comments:

http://scriptingnews.userland.com/weblogsearch/?q=pavement</div>
            
        </li>
    
        <li class="comment" id="comment-221088200">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://diveintomark.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2fc977e82d9f8395a0f49e6f4958bc84&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://diveintomark.org/">Mark</a>
                </div>
                <a href="#comment-221088200" class="permalink"><time datetime="2003-07-07T18:30:29">2003-07-07T18:30:29</time></a>
            </div>
            <div class="content">I'm working on updating my ultra-liberal parser to handle (not-)Echo as well.</div>
            
        </li>
    
        <li class="comment" id="comment-221088202">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5a70d939a73fa73603f2a9255ab81d21&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki">BillSeitz</a>
                </div>
                <a href="#comment-221088202" class="permalink"><time datetime="2003-07-07T18:42:38">2003-07-07T18:42:38</time></a>
            </div>
            <div class="content">I braindumped some possible bad scenarios at the bottom of:
http://webseitz.fluxent.com/wiki/EchoStandards</div>
            
        </li>
    
        </ul>
    
        </div>
    