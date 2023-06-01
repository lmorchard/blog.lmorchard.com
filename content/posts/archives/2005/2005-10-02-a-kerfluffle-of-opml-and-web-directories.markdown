---
comments_archived: true
date: '2005-10-02T23:21:56-04:00'
layout: post
tags:
- xoxo
- microformats
- opml
- gopher
title: A kerfluffle of OPML and web directories
wordpress_id: 711
wordpress_slug: a-kerfluffle-of-opml-and-web-directories
wordpress_url: http://decafbad.com/blog/?p=711
---
So, I guess there was a bit of an extended kerfluffle over the weekend.  And as these things usually do, it started out from a very cool idea: You can build a web directory as an outline of links, with some nodes "farmed out" to outlines hosted elsewhere—all through the magic of [transclusion][trans].  

For example, say you want to host a directory of resources on web development.  But, you might like to let me maintain the section on web syndication feeds.  Well, I can toss you a URL to my outline of RSS and Atom links, and you can just pull it into a branch of your "superset" outline—kind of like an RSS subscription, really.  Whenever I change my outline, yours will automatically get updated with my work.

Now, imagine this going off into infinity in both directions:  Outlines including outlines including outlines.  Outlines included by outlines included by outlines.  It's a world-wide outline.

So, anyway, [TechCrunch's brainstorm][tech] lead to [Dave Winer's kudos][dwk] and [Scoble's OPML evangelism and an implementation challenge][scoble].    But, to this, [James Robertson responded by calling OPML a "really, really crappy format"][jr].

From this ensued a splattering of posts in various places chiming in on both sides:

  1. [OPML is a sucky and under-specified format, with implementations subject to approval by one guy][bw].
  2. OPML is a working format already in use by lots of code, [so offer something better or shut up][scob2].

Now, [Shelley Powers of Burningbird says][sh] that the "put up or shut up" attitude is wrong, that it's "bad technology".  And, though I do agree with her, the problem is that the usual suspects involved in these sorts of kerfluffles fall on two sides:

  1. We want to see good, well-specified agreements before we code something useful.
  1. We want working, useful code that we'll agree is good when we see it.

While group #1 is willing to talk/shout things out and reach consensus ahead of time, group #2 wants to forge ahead with machines in motion and reach consensus through popular implementation.  So, members of group #2 will *never* take group #1 seriously until they've "put up", because that's *their* process.

Personally, [I sympathize with the dirty ways of group #2][dirt].  But, I've become convinced that what group #1 does is best over the long term, as some of the early successes of group #2 may become tottering unbalanced stacks of plates later on.

So...  What to do?  Bah, I don't know.  But, against my better judgement, I feel like [I have an idea or two to "put up"][idea].  

In the meantime: Members of group #1, stop arguing with members of group #2—you're not speaking in quite the same languages, and you're not going to convert anyone.  Just nod & smile, walk away and come up with a better idea, come back and show why it's better.

(Oh yeah, and whatever happened to [OML replacing OPML][oml]?)

[idea]: http://decafbad.com/blog/2005/10/02/web-directories-with-xoxo-and-xsl
[oml]: http://decafbad.com/blog/2003/04/16/opml-vs-oml
[dirt]: http://decafbad.com/blog/2002/12/13/oooced
[sh]: http://weblog.burningbird.net/archives/2005/10/01/put-up-or-shut-up/
[bw]: http://brainwagon.org/archives/2005/09/30/1610/
[trans]: http://en.wikipedia.org/wiki/Transclusion
[scob2]: http://radio.weblogs.com/0001011/2005/09/30.html#a11296
[jr]: http://www.cincomsmalltalk.com/blog/blogView?showComments=true&entry=3305486922
[dwk]: http://archive.scripting.com/2005/09/29#When:7:36:29AM
[tech]: http://www.techcrunch.com/2005/09/29/opml-an-awesome-experiment/
[scoble]: http://radio.weblogs.com/0001011/2005/09/29.html#a11295
[xoxo]: http://microformats.org/wiki/xoxo

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084228">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.voidstar.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=ce83a8e239c0cfce3488d3fec4d5d8de&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.voidstar.com">Julian Bond</a>
                </div>
                <a href="#comment-221084228" class="permalink"><time datetime="2005-10-03T07:50:53">2005-10-03T07:50:53</time></a>
            </div>
            <div class="content"><p>Both groups are right. The problem is that standards without implementations are just academic wanking. And implementations without standards won't get widespread adoption.</p>

<p>What's intensely irritating is the egos involved who can't see the truth in the above statement. It should be possible to criticise OPML as a standard while still applauding the experiments and without necessarily offering an alternative. If done with respect, just the criticism on its own should move the debate onwards.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084229">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.voidstar.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=ce83a8e239c0cfce3488d3fec4d5d8de&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.voidstar.com">Julian Bond</a>
                </div>
                <a href="#comment-221084229" class="permalink"><time datetime="2005-10-03T07:57:10">2005-10-03T07:57:10</time></a>
            </div>
            <div class="content"><p>Re OPML based SuperOpenDirectories. It is indeed neat. But I'm still struggling to see the point. Does it just re-invent Gopher? Then there's the inspired chaos of it all. At least with something like DMOZ, Yahoo, Wikipedia, the hierarchy has some formalised structure and editors (perhaps community editors). An open mesh of decentralised outlines is going to have lots of dead ends and missing cross links. Perhaps that's just an artifact of the browser Apps we've seen so far and the breadcrumb approach being used. Perhaps it doesn't matter.</p>

<p>And finally, I'd love to see an OPML browser app written in PHP. Perhaps I'll write one.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084230">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.synaesmedia.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=248a3c4ba8f2972427222d46954f9c1c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.synaesmedia.net">phil jones</a>
                </div>
                <a href="#comment-221084230" class="permalink"><time datetime="2005-10-10T04:06:28">2005-10-10T04:06:28</time></a>
            </div>
            <div class="content"><p>I'm definitely a group #2 person. But I have a slightly different take on what that means.</p>

<p>When group 2 people ask for working code, they aren't asking simply for "working code". (Such as your XOXO &amp; XSL thing) They're thinking of an entire <em>system</em> of real users, a real application (need / problem to be solved) etc.</p>

<p>The reason Dave Winer and OPML will win this, is because Winer really <em>wants</em> shared outlining on the internet. And he knows "why" he wants it. He has a vision, and a passion for it. He knows what he wants to do with it. He knows how to make interesting applications with like-minded collaborators. </p>

<p>You can come up with a "better" format than OPML. You might be able to knock off better code overnight. But you do it for a "lark" or for some principle of "doing it properly".</p>

<p>Winer doesn't care if its "crappy". He just has a drive to make something happen, and OPML is the simplest thing that can possibly work to do that. </p>

<p>I think that's exactly the right thing to bet on.</p>

<p>When you say "I’ve become convinced that what group #1 does is best over the long term, as some of the early successes of group #2 may become tottering unbalanced stacks of plates later on."</p>

<p>I'd be interested in some real world examples. As I see it, "worse is better" is the golden rule of computer history, in the long as well as short term.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084232">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084232" class="permalink"><time datetime="2005-10-10T11:34:30">2005-10-10T11:34:30</time></a>
            </div>
            <div class="content"><p>Phil:  <a href="http://decafbad.com/blog/2002/03/27/oooofc" rel="nofollow">I've watched Dave's push for shared outlining</a> for awhile now, and certainly he's been working towards it for much longer than I've been watching.  </p>

<p>And, though it's gotten some mileage through Dave's sheer exuberance and people infected by his cool ideas, it's never quite caught on.  Instead, things like wikis and <a href="http://www.jotlive.com/" rel="nofollow">JotSpotLive</a> and <a href="http://www.backpackit.com/" rel="nofollow">Backpack</a> and <a href="http://www.codingmonkeys.de/subethaedit/" rel="nofollow">SubEthaEdit</a> have been capturing the users.</p>

<p>And now, this latest push doesn't look so much like shared outlining <em>per se</em>, but more like a new attempt at <a href="http://dmoz.org/" rel="nofollow">DMOZ</a>.  And since Google's pretty much <a href="http://www.webworkshop.net/dmoz-2005.html" rel="nofollow">driven a stake into DMOZ</a>, my further interest in Gopher NG is really just a sometimes-interesting problem.  </p>

<p>I could see some people joining Dave's World Outline effort to get some buzz in their interest niches—trying to be first to get their constituent URLs placed in the new, distributed OPML DMOZ-killer.  And it might be nifty for awhile, but I doubt it'll take hold.</p>

<p>But as for real world examples of shared outlining, in the particular form Dave's pushing right now... Look at just about anyone's blogroll.  They're almost all in XOXO form <em>right now</em>.  That's the thing:  XOXO is just an HTML list.  It's so unexciting as to be unremarkable—<em>but they're everywhere, right now</em>.  Hell, even OPML has to get converted to XOXO to be used with web browsers—unless you're falling back to some ugly form of tables-as-list.</p>

<p>XOXO is actually the simplest thing that can possibly work, <em>and people are using and have been using it all along</em>.  I think that's the right thing to bet on, versus OPML.  It doesn't need any evangelism or adoption efforts, other than maybe to remind people of that what they're already using is itself a viable format.  <strong>That's the only reason XOXO has a name.</strong></p>

<p>I've <a href="http://decafbad.com/blog/2005/07/12/xoxo-outliner-experiment" rel="nofollow">already shown an in-browser XOXO editor prototype</a>—and believe me, that was easier to implement reliably than anything I've tried with OPML.  I could turn that into a full flown app given sustained free time and interest.  I plan to do that eventually, with <a href="http://decafbad.com/trac/wiki/Micronian" rel="nofollow">a project I've got simmering</a>.  </p>

<p>Will I do it?  Who knows—I'm a busy nerd, and I certainly don't have the constant ebulience, time, and money that Dave Winer has.  All I can do is call <a href="http://en.wikipedia.org/wiki/Shenanigan" rel="nofollow">shenanigans</a> and preach to the choir.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    