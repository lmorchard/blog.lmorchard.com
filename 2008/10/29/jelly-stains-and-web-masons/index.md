From Mark Bernstein's entry on [Practical Prototype and script.aculo.us](http://www.markbernstein.org/Oct0801/PracticalPrototypeandscrip.html):
> When chemists consult a volume about professional chemical technique, or when surgeons reach for the latest update on neuroanatomy, they can usually find a book that isn't couched in terms of silly examples and jokes. So can poets, mathematicians, and geologists. For some reason, though, it has become the accepted practice that language manuals should spend lots of time with silly, self-deprecating jokes, and that their example applications should be breakfast loggers and fantasy football leagues (or, conversely, payroll programs).

As an tech author with just a few books under my belt, Mark's take on [Practical Prototype and script.aculo.us](http://www.amazon.com/gp/product/1590599195?ie=UTF8&tag=0xdecafbad-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1590599195) struck a bit of a sour note for me, because I'd like to work on making my tech writing more entertaining than not.  I think that's a good thing, but I'm willing to be convinced otherwise.

I think the issue is that there are different meanings for "professional" when it comes to the web.  There are web scientists and there are web masons.  Web scientists pursue fundamentals and disambiguations, while web masons are busy building the next micro-site for the new product release from the almighty client.  Many web scientists are also computer scientists and many web masons are also web scientists—but most web masons I've known come from creative liberal or fine arts backgrounds.

Though, for what it's worth, even amongst computer scientists there's still a tradition of [leaving room for jelly stains](http://www.amazon.com/Little-Schemer-Daniel-P-Friedman/dp/0262560992/ref=sr_1_1?ie=UTF8&s=books&qid=1225292376&sr=8-1) and other oddities.  This seems to be the sort of thing Mark acknowledges with dismay.  ("It’s not fair to blame Mr. DuPont for the general vice.")

Is playfulness in literature just a computer science thing?  I'm not a chemist; maybe chemists just  don't like being funny in writing, or maybe their jokes are more subtle.

In any case, I think the "practical" genre of tech books is aimed at people who want to get something done, aren't interested in or have little time for context or background, yet wouldn't mind being entertained during the course of weekend tinkering and self-education.

> So, a good book. But take out the jokes, trim back the sample code (or dispatch it to the Web site where it makes more sense), and give us to professional perspective, and everyone is going to be much happier.

The guidelines with which I'm familiar for tech books in the "practical" or similar genres include advice such as "show, don't tell".  They also suggest that, although sample code should be made available online, the author should compose the book assuming that it's a standalone product.  Web sites and CDROMs with code often vanish, but a bound book remains stable—which is especially useful on a cross-country flight without net access.  Professional perspective is of course a desirable thing to work into the prose, but job #1 is to illustrate the right way to do things through running code.

> How does Prototype+Javascript relate to other languages — C++/STL, say, or SELF? What, precisely, are the semantics of the key methods? I don't need the inevitable chapter 1 pitch for the wonderfulness of Javascript and the badness of MSIE, but it might be a good place for a quick summary for the pros. Call by reference • no pointers • primitives are objects • everything has a prototype slot • parens() do this, braces {} do that, brackets [] do something else • single and double quotes are different. Kernighan & Ritchie did this so well in C, and it’s not like we’re not familiar with their example.

I'd posit that most in the audience for "practical" tech books are entirely unfamiliar with Kernigan & Ritchie and haven't touched a line of C source code.  Most of these readers have probably tumbled down the slope from HTML to CSS and finally to JavaScript in order to get something interesting to happen in a browser—and usually while under an unreasonable deadline.

I'd really be surprised if many readers have heard of [Self](http://en.wikipedia.org/wiki/Self_programming_language) or [C++/STL](http://en.wikipedia.org/wiki/Standard_Template_Library) or have much of a grounding at all in computer science or programming language fundamentals.  Having these fundamentals would of course help web masons get a deeper understanding of the technologies that make the job possible, but the pragmatic rewards tend not to make up for the effort involved.

So, to sum up, the purpose for this entry isn't to beat up on Mark Bernstein.  He's written a great deal of prose and code that I respect, so his opinion is interesting to me.  Rather, I've tried to express my own understanding of this writing market, and hoping I've aimed at the right goals.

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086683">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.markbernstein.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cdb20bf8e09680028612532944833686&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.markbernstein.org/">Mark Bernstein</a>
                </div>
                <a href="#comment-221086683" class="permalink"><time datetime="2008-10-29T16:51:59">2008-10-29T16:51:59</time></a>
            </div>
            <div class="content"><p>I'd settle for a better class of joke!</p>

<p>On tech content, doesn't it annoy <em>you</em> that it's hard (or impossible) to find a book about a Web framework or language or facility that takes advantage of what you already know?  One that doesn't assume you've never seen a language before?  </p>

<p>I understand that publishers want the book to appeal to everyone.  But it's not that the reader needs to know Kernighan: <em>you</em> know, right?  So you know that it's entirely practical to tell a colleague pretty much everything she needs to know about a (famously tricky) new language in one chapter, starting from Kernighan's example 1 -- the original "Hello, world".</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086685">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221086685" class="permalink"><time datetime="2008-10-29T20:28:27">2008-10-29T20:28:27</time></a>
            </div>
            <div class="content"><p>I think part of the difference is in the subjects themselves. Programming deals with pure thought stuff, yet at the same time attempts to model concepts from the physical reality. In contrast, science textbooks deal with intrinsically tangible stuff, while mathematics textbooks deal with the abstract for abstraction’s sake. The temptation to offset the potential dullness of pure thought stuff by using it to model goofy examples is obviously high.</p>

<p>Corroborating my theory would be the fact that elementary, low-abstraction maths books tend to bring up oddball examples too – eg. consider the sorts of things used to illustrate the rule of proportion.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086686">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://spindrop.us/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=efe33dc2c55f641837501293866f7dc5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://spindrop.us/">Dave Dash</a>
                </div>
                <a href="#comment-221086686" class="permalink"><time datetime="2008-10-30T00:53:54">2008-10-30T00:53:54</time></a>
            </div>
            <div class="content"><p>Most books about web technology are meant to have a shelf life of a few years.  They aren't reference guides, and they aren't meant to stand the test of time.</p>

<p>PHP, Python, Prototype, etc will all change.</p>

<p>Because of this, they can employ jokes and real-world examples.  Jokes make reading the content enjoyable.  Examples are step by step instructions to creating something useful.</p>

<p>If those aren't needed there's always reference guides.</p>

<p>I don't publish books, but I do write tutorials on my blog on occasion.  One pattern I employ in my blog the "executive summary" pattern.  I start with the take-away, the code snippet, the answer if you will.  Then I spend the rest of the post (behind the fold, if you will) explaining the answer and interjecting my style.</p>

<p>I like doing this, because it's what I would want.  I want to know the answer, and then I can read on for some backstory... rather than having to separate the wheat from the chaff.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086688">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://andrewdupont.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=fede7405a0e4cd5722e0b85920a0728c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://andrewdupont.net/">Andrew Dupont</a>
                </div>
                <a href="#comment-221086688" class="permalink"><time datetime="2008-10-31T03:30:21">2008-10-31T03:30:21</time></a>
            </div>
            <div class="content"><p>I'm quite familiar with the trend Mark's talking about. And I agree that it shouldn't count against me or my book, but perhaps I'm a bit biased there.</p>

<p>Three things.</p>

<p>First: my book reads the way it reads because that's how I write. The process of writing the thing was torturous enough that I doubt I'd have finished it if I subjected every word to the scrutiny of a hypothetical skeptical reader. I'm not good enough at the craft for that. I think that each author has to find his best angle on the material and write that way. Because there are many books and many publishers, it <em>tends</em> to balance out.</p>

<p>Second: my book covers two JavaScript frameworks built to simplify common tasks. Basic familiarity with JavaScript is assumed. Right away that's a step away from the theoretical and toward the practical. I think tech books are best when they stick to one or the other, rather than try to drift between them.</p>

<p>Third: the book Mark wants has already been written: <cite>JavaScript: The Good Parts</cite>, by Doug Crockford. Doug's style is dry and academic, but also direct and substantive. If I tried to write in that style it'd be only a pale imitation.</p>

<p>Anyway... the "quirky" trend, I agree, can be tiring. As it applies to my book, the sticking point seems to be whether I'm <em>actually funny</em>. Readers of this weblog will simply have to buy the book to find out. It's several hundred pages long and has a fresh, earthy "new book" smell.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086691">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086691" class="permalink"><time datetime="2008-10-31T03:47:37">2008-10-31T03:47:37</time></a>
            </div>
            <div class="content"><p>@Mark: Yeah, these days my first impulse is not to reach for the latest book on a new technology like a web framework or new language.  I usually head straight for the source code or start soaking in whatever documentation may be lying around on the web.</p>

<p>I suppose I could be a macho geek and say that's why I'm writing the books now—but to be honest I don't tend to get much out of practical programming books.  They seem to sell, though, so I keep wondering if mine shouldn't be lighter or more fun, should I get the opportunity to produce more of them.</p>

<p>My first book was about half-and-half prose and code, with barely any screen shots to be found.  I got to about equal parts code, prose, and screen grabs in my second—I thought that might make it easier reading.  </p>

<p>The latest one doesn't have any jokes, but I tried to get straight to the core framework features and spotlight a few obscure magical bits.  I worry if it might be a bit too dry.</p>

<p>But yeah, I do wish there were more (though maybe shorter) books that started from the assumption that I've got a CS degree and have tangled with a few languages and libraries so far.  On the other hand, I do like having a sense for the author in a book—but that might be thanks to the fact that I read more blogs than books these days and enjoy the personal touches.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086692">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221086692" class="permalink"><time datetime="2008-10-31T04:05:01">2008-10-31T04:05:01</time></a>
            </div>
            <div class="content"><p>@Andrew: Hey, thanks for dropping in for a comment!  I can completely sympathize with needing to find a groove to handle how grueling producing one of these books can be—especially if you're more programmer than writer.  (That's me, right now, anyway.)  You need to get the best thing out there in the shortest amount of time, and find a way to get yourself to finish it.</p>

<p>At any rate, congrats on the new book, and I hope the cross-blog chatter sells a few more copies for you!</p></div>
            
        </li>
    
        </ul>
    
        </div>
    