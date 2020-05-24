<p><a href="http://bitworking.org/2002/06/12.html#a196">Joe Gregorio</a>: "<i>...I didn't really see a need for <a href="http://www.decafbad.com/twiki/bin/view/Main/CSS">CSS</a> when I first learned HTML, but as I maintained some web sites over time and bumped my head enough times on having mark-up embedded in my content which made it difficult, if not impossible, to deploy a new look and feel to site without having to edit every page, I suddenly had a real need for <a href="http://www.decafbad.com/twiki/bin/view/Main/CSS">CSS</a>. I still have a lot to learn, still more head bumping to do, and I want to have <a href="http://www.decafbad.com/twiki/bin/view/Main/RDF">RDF</a>, SVG, SMIL, and all the rest in my pocket when those days come.</i>"</p>
<p>This, along with his reference to Joel's piece, "<a href="http://www.joelonsoftware.com/news/20020402.html">Can't Understand It?  Don't Worry</a>", strikes a familiar chord with me.  So does <a href="http://scriptingnews.userland.com/stories/storyReader$1657">what Dave wrote</a> on XML and practicians vs theoreticians.</p>
<p>The attitude I try to lead with when playing with all these new toys is that of a beginner mind.  Or, at least, that's my attempted tact lately.  On the one hand, some things might look hopelessly convoluted and needlessly complicated to me.  On the other hand, there are people who are both more expert than me and who have worked longer than me on those things.  More than once I've decided I could do something better than someone else, only to discover that I was just following in that someone's footsteps down the line and rediscovering all the pitfalls.  But sometimes, I do demonstrate that I'm smart too, and figure out something new.</p>
<p>So, I try to reserve judgement until I've grokked the thing.  Until I've soaked in it, played with it, scanned through the squabbles surrounding it, caught up with the Story So Far.  Sometimes I learn what's what.  Sometimes I don't.  And sometimes, I come to the conclusion that the thing I'm looking at really is a mess, and I stay away from it.</p>
<p>My particular angle at the moment involves XSLT and SVG.  We want to put together a reporting and metrics package in-house at work, and I'm thinking that XML/XSLT/SVG may be a good combination for charting.  I understand SVG - or, rather, I get it to the extent that learning it appears obviously useful.  On the other hand, XSLT still has me scratching my head a bit.  </p>
<p>An evangelist for XSLT at work here was trying to convince me that we could have all the HTML guys switch over from our <a href="http://www.template-toolkit.org/">current template technology</a>, which is basically text or HTML with a small procedural scripting language for presentation work.  At present, the HTML guys are used to their process.  They've been doing it for years.  And as far as I know, they hardly ever touch the functional elements of the templates like the table foreach loops and such.  I have a sense that learning both XSLT and LISP will feel wholesome to me, but I can't see the HTML guys doing it.  I mean...  recursion?!  What?  I just want to make a table and have the rows fill in with data!</p>
<p>So maybe the problem with this is that this is not precisely the perfect application of XSLT, though it seems to be.  With our current template toolkit, the logic of the app passes a perl data structure (a hash) to the engine, which then processes a template which refers to the keys of that structure.  I could easily represent that data structure in XML, with structure and lists and branches and all.  And I could see conceptually where an XSLT stylesheet could replace our templates.</p>
<p>But forget about our HTML guys for the minute.  What about me?  Like I said, I think it will be good for me to learn XSLT.  But I keep catching myself thinking: Why not just use a full scripting language?  Why not just use the template kit I know?  I'm thinking I don't grok XSL well enough yet, though a part of me is grumbling skeptically at it.</p>
<p>I vaguely see some magic in it, though.  Like, XSLT contains instructions for transforming XML, yet it itself is XML.  XSLT uses XPath, which is vaguely starting to take shape in my head as something very powerful to replace many loops and frustrations in my scripting language XML processing.  And I keep seeing suggestions that XSLT can be seen as the SQL of XML, and I can imagine those uses.  But then, I see an article on <a href="http://www.topxml.com/xsl/articles/recurse/">Two-stage recursive algorithms in XSLT</a>, and I think, "All this, just to write a loop to calculate a sum?!"</p>
<p>But I'm thinking part of this, too, is me sorting out "Daily Intended Use" versus "Freakish Abuse of All that is Good and Holy".  Maybe when it comes down to sums, I'll just do that in Perl.</p>
<p>Hmm.  Back to drawing barcharts...</p>
<!--more-->
shortname=oooaih

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084155">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://rtnl.org.uk"><img src="http://www.gravatar.com/avatar.php?gravatar_id=57d9b82f55c3808a61fa52bfedd9b10c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://rtnl.org.uk">colin_zr</a>
                </div>
                <a href="#comment-221084155" class="permalink"><time datetime="2002-06-14T16:57:51">2002-06-14T16:57:51</time></a>
            </div>
            <div class="content">You're not the only one who's been baffled by XSLT. I love it now, but when I was learning it I found myself struggling a bit. The key is to learn some functional programming (maybe using Lisp or Haskell) and then everything will become much clearer. If you don't have any previous experience of functional programming then XSLT will seem strange and difficult. It's just a matter of getting that experience and learning to think like a functional programmer.

The reason why you shouldn't use a scripting language such as Perl or Python is that XSLT handles XML really nicely, and scripting languages tend not to handle it so well. The reason you shouldn't use a template system is that none of them will be as powerful. I'm currently writing a blogging tool and (for obscure reasons) I'm restricting myself to Perl and using the HTML::Template module, so I have first-hand experience of both of these problems. I keep on wishing I could switch to XSLT.

As for using two-stage recursive algorithms, that's wizardry that you don't need to worry about right now. If you want the sum of a list of numbers, just use a simple recursive algorithm. Only think about alternative methods when you run into a problem with the simple method.</div>
            
        </li>
    
        </ul>
    
        </div>
    