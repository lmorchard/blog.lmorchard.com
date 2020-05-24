---
comments_archived: true
date: '2005-12-31T14:54:00-05:00'
layout: post
title: On choosing Python for Hacking RSS and Atom
wordpress_id: 810
wordpress_slug: on-choosing-python-for-hacking-rss-and-atom
wordpress_url: http://decafbad.com/blog/?p=810
---
<blockquote cite="http://www.annezelenka.com/2005/12/python-slithers-in.html">...I bought this rather interesting book: <a href="http://www.amazon.com/exec/obidos/ASIN/0764597582/0xdecafbad01-20?creative=327641&camp=14573&link_code=as1">Hacking RSS and Atom</a> by Leslie M. Orchard. It covers virtually everything I want to do with my feed blender. Except it does it in Python. Dang.<br /><br />...Programmers seem to get used to the language they use a lot and then find others difficult or poorly designed. As for me, I'm not so excited about Python itself as I am about what I can do with it given a little help from modules like Mark Pilgrim's Universal Feed Parser and Reverend for Bayesian classification.</blockquote>
<small style="text-align:right; display:block">Source: <a href="http://www.annezelenka.com/2005/12/python-slithers-in.html">Anne 2.0: Python Slithers In</a></small>

I've gotten a handful of instances of this sort of feedback about [the book][bo] and my choice of Python for all the code within.  I had anticipated this concern a bit, and hoped it wouldn't be a hurdle for acceptance of the book, but I forged ahead with Python nonetheless.


Some reasons for choosing Python for the book, in no particular order, were:

* The [Universal Feed Parser][ufp] exists.

* Python is one of the cleanest languages I've ever used that still retains a degree of meta-magic.  I'd hoped that this might even help in carrying the notions in the book to other languages, thanks to the clarity of the code.  (Regardless of how clear it actually turned out! :))

* Python is cross-platform enough to work on every machine I use on a regular basis—Windows, Mac, or Linux.  While not omnipresent, it's at least fairly easy to get up and running.

* Python is my current favorite go-to tool.  I'm hoping that this doesn't mean that I've fallen mindlessly into it.  [I'd already forcibly abandoned Perl][perl] to get out of this sort of rut and maintain my flexibility.  (ie. "*Programmers seem to get used to the language they use a lot and then find others difficult or poorly designed.*")
 
Although [my next book][nb] will contain examples in a variety of programming languages, I wonder what language I should lean toward in the future for public-facing purposes?  Lately, I've been [warming up to PHP][php]—how might it have worked for [Hacking RSS and Atom][bo]?

* [MagpieRSS][mp] exists.

* PHP looks like a meta-impaired and jumbled mess to me, compared to Python.  But, it's workable and maybe it's not healthy to be around all that meta all the time.

* PHP is ubiquitous where Python's just starting to get legs on web servers.

* PHP is a lot of others' current favorite go-to tool.

But, I've also been told that it'd be a mistake to run with PHP code listings and that the book would really suffer in clarity.  More thinking to do, but I thought I'd get these thoughts out there at least.

[nb]: http://decafbad.com/blog/2005/12/14/hacking-delicious-is-a-real-book
[perl]: http://decafbad.com/blog/2003/10/16/seeing-out-opposites
[mp]: http://magpierss.sourceforge.net/
[ufp]: http://feedparser.org
[bo]: http://www.amazon.com/exec/obidos/ASIN/0764597582/0xdecafbad01-20?creative=327641&camp=14573&link_code=as1
[php]: http://decafbad.com/blog/2005/12/18/not-so-deep-php-thoughts

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084242">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.ianbicking.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cc8334869c9d2a9e603017f2da805eb3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.ianbicking.org">Ian Bicking</a>
                </div>
                <a href="#comment-221084242" class="permalink"><time datetime="2005-12-31T19:22:56">2005-12-31T19:22:56</time></a>
            </div>
            <div class="content"><p>Some authors provide translations of the code in a book online; you could translate all of your book into PHP, for instance.  I think Python is still a good language for the book, because it is typographically pleasing (significant whitespace), doesn't use too much punctuation, and uses normal constructs, like func(args).  Notably when people use pseudocode in books, it usually looks <em>very</em> much like Python.  Except often they use weird mathematic notation and characters, just because they can ;)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084243">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084243" class="permalink"><time datetime="2005-12-31T19:34:18">2005-12-31T19:34:18</time></a>
            </div>
            <div class="content"><p>Ian: I've been considering offering some PHP conversions of a few things from the book.  In fact, FeedMagick has a bit of that, since I'm improving on some of the ideas from the Python in the book.  Of course I'm swamped at the moment and have a new book in the works, but if there's demand, I might just do it for the whuffie.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084244">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084244" class="permalink"><time datetime="2005-12-31T19:35:34">2005-12-31T19:35:34</time></a>
            </div>
            <div class="content"><p>And yeah, the typographically pleasing aspects and psuedo-code-alike features of Python are what have particularly appealed to me for book code listings.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084245">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.annezelenka.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4dbe4cabb90ab41b92d7c85afc8adf96&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.annezelenka.com">Anne Z.</a>
                </div>
                <a href="#comment-221084245" class="permalink"><time datetime="2005-12-31T20:04:47">2005-12-31T20:04:47</time></a>
            </div>
            <div class="content"><p>Wow, I love the web... I comment on your book and you respond to it. That is almost as cool as your book.</p>

<p>I've started playing around with Python and I can see why you chose it--it's clean-looking and easy to use. I'm going to use your code as is but if you get stuff working in PHP maybe I'll switch over to that. I have my employability to think about and also my ability to recruit people to projects I'm working on, should they take off to any degree. I have made the mistake before of choosing a quality language over a popular one. But doing the opposite has its own problems (productivity and ease of maintenance come to mind).</p>

<p>Anyway, I'm thrilled with your book and the code is a huge jump-start. Great stuff.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084247">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://highearthorbit.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a25421f6c79d5f381fab65c82abf85e8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://highearthorbit.com">Andrew Turner</a>
                </div>
                <a href="#comment-221084247" class="permalink"><time datetime="2006-01-01T02:37:58">2006-01-01T02:37:58</time></a>
            </div>
            <div class="content"><p>I really liked the book,but was 'surprised' by the choice of exclusive Python. I don't believe any reviews or the book jacket mentioned this fact. I think Python makes an excellent publishing/example language, but this probably should have been mentioned.</p>

<p>Curiously, is there an RSS feed of errata and updates? Several of the examples, particularly the Atom feed, were out of date. Also, a feed/page of resources would be nice (feed validators &amp; specs in-particular)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084248">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://diveintomark.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=357a20e8c56e69d6f9734d23ef9517e8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://diveintomark.org/">Mark</a>
                </div>
                <a href="#comment-221084248" class="permalink"><time datetime="2006-01-01T04:32:53">2006-01-01T04:32:53</time></a>
            </div>
            <div class="content"><p>I have nothing to add here except a little "yay me" for writing a killer library.  The next version is going to be even better.  Mind-blowingly better.  Happy New Year.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084249">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.brayden.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=852fcf564923953283770f1a23649435&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.brayden.org">Dale B.</a>
                </div>
                <a href="#comment-221084249" class="permalink"><time datetime="2006-01-01T14:52:16">2006-01-01T14:52:16</time></a>
            </div>
            <div class="content"><p>I was one of the people who, almost accidentally in my case, remarked on the use of Python. Frankly, I think you're being a little too sensitive on this issue. You had a choice to make (between perl, python, ruby, and php) and you made it. You chose a mainstream language that is easily readable by anyone conversant in any other mainstream language. I'm sure you could make better use of your time than writing translations to another language - a task that an adept in any of the other languages could do.</p>

<p>As a practical matter, most of us select a 'vector' of languages for our daily work. In my case the vector consists of c, ruby, perl, and vb. Over the years the specific languages in my vector have changed, but the vector length has remained constant. (and c has always been a member). For other people the vector length might be slightly longer or shorter, but hardly anyone's vector will include every language that an author might choose for his sample code.</p>

<p>My advice : keep on using the language that is the best fit for you. Focus on the ideas, and develop interesting applications.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084250">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://boston.conman.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=bbb1c69b64019a3df907c3545186f907&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://boston.conman.org/">Sean Conner</a>
                </div>
                <a href="#comment-221084250" class="permalink"><time datetime="2006-01-02T08:09:42">2006-01-02T08:09:42</time></a>
            </div>
            <div class="content"><p>Be daring!  Be bold!  Be timeless!  Use COBOL!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084252">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sevenroot.org/dlc/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=622a34307765c2f7c1dfdc7345842418&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sevenroot.org/dlc/">Darren Chamberlain</a>
                </div>
                <a href="#comment-221084252" class="permalink"><time datetime="2006-01-03T16:21:27">2006-01-03T16:21:27</time></a>
            </div>
            <div class="content"><p>I think Python is a good choice for code examples, and I'd stick with it in the next book.  Even though it's not as ubiquitous as PHP, it degrades better:  If you've never seen PHP, it can be tough to grok at first, but if you've never seen python, it looks like pseudo-code, and it's usually immediate obvious what is intended.</p>

<p>Add to this the fact that there is a very large and very healthy selection of libraries -- which means you'll probably be able to avoid a lot of low level details -- and you can produce example code that expresses the point you're illustrating instead of the mechanics of XML parsing or whatever housekeeping needs to be done.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084254">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sporkmonger.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56ee28134dd0776825445e3551979b14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sporkmonger.com/">Bob Aman</a>
                </div>
                <a href="#comment-221084254" class="permalink"><time datetime="2006-01-07T20:40:43">2006-01-07T20:40:43</time></a>
            </div>
            <div class="content"><p>Hehe @ Mark</p>

<p>I'd have probably picked Python as well, to be honest, even though I prefer Ruby and I have my own feed parser library.  And the UFP would be the singular reason for that.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084257">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084257" class="permalink"><time datetime="2006-01-07T20:55:51">2006-01-07T20:55:51</time></a>
            </div>
            <div class="content"><p>Bob:  Lack of time has kept me resisting Ruby's siren call these past months, but eventually I'll succumb.  Those blocks and higher-order-messaging I've seen just seem too tasty to pass up.</p>

<p>Also, for anyone who hasn't seen it, Mr. Pilgrim is called out specifically amongs my acknowledgements in the front matter of Hacking RSS and Atom.  Whenever I talk about the UFP, I just can't stop myself from twitching and saying "3000 TEST CASES!!!" at some point during the conversation.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084258">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sporkmonger.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56ee28134dd0776825445e3551979b14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sporkmonger.com/">Bob Aman</a>
                </div>
                <a href="#comment-221084258" class="permalink"><time datetime="2006-01-09T17:46:34">2006-01-09T17:46:34</time></a>
            </div>
            <div class="content"><p>Oh, I know... seriously, 3000 test cases!!!  I've stolen probably 400 or so of his so far, and plan to eventually steal all of them.  Plus I've added a few of my own.  Of course, our parsers are different enough that I have to adjust the expected values of the tests here and there, so I can't just take 'em all verbatim, but man, they make for such a delicious starting point.</p>

<p>Also, siren calls... come on, you know you want to... give in to the peer pressure!</p></div>
            
        </li>
    
        </ul>
    
        </div>
    