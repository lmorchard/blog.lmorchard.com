---
comments_archived: true
date: '2005-09-25T21:12:46-04:00'
layout: post
tags:
- webdev
- rss
- syndication
- webservices
- atom
- xml
title: 'Templates:  Good or Evil?'
wordpress_id: 689
wordpress_slug: templates-good-or-evil
wordpress_url: http://decafbad.com/blog/?p=689
---
<blockquote cite="http://lachy.id.au/log/2005/04/xhtml-future#comment-271">This cry and whine that draconian handling will break your page and make your users suffer for you if you have a single error is just another legacy of HTML we’ve gotten used to: our toolchains tend to be of the “glue strings together” (aka templates) variety. ... There should never be any part of your publishing toolchain just gluing strings together. Ever.</blockquote><span style="float:right; font-size: 0.75em; width:75%">Source: <a href="http://lachy.id.au/log/2005/04/xhtml-future#comment-271">Aristotle Pagaltzis in a comment on "The Future: HTML or XHTML"</a></span><br style="clear:both" /><blockquote cite="http://lesscode.org/2005/09/24/web-services-infrastructure-kid/">There’s no rule that says templates must only be used to generate HTML. Indeed, many of the RSS and Atom feeds in the wild are generated from some form of template. They are never automatically-generated-behind-the-scenes using language bindings and are very rarely generated using some kind of DOM/SAX API.</blockquote><span style="float:right; font-size: 0.75em; width:75%">Source: <a href="http://lesscode.org/2005/09/24/web-services-infrastructure-kid/">Web Services Infrastructure: Kid Templating  </a></span><br style="clear:both" />

I've been meaning to write about this for some time now, though I've never had my thoughts together to any degree to mount a decent case for either side.  Problem is, I haven't gotten much closer now, but I figured I'd at least post a few thoughts and conjure up a vague sketch of the issue.

You see, I think it all goes back to [thoughts about which I posted almost three years ago][lazy].  On the one hand, producing something like XML using "proper" DOM invocations and handwavings seems like the "correct" thing to do.  Yet, on the other hand, using a templating system lets me get down to business much more quickly and with much more clarity and succinct code.  

Yeah, templates provide a range of flexibility sufficient to aim the barrel at your own toes, while an API like the XML DOM keeps everything on the rails--but sometimes you know where you're going and don't need the rails to get you there.  Furthermore, isn't it possible to make a template system that Does The Right Thing?

Anyway, it's rather apparent that I'm solidly in favor of templates:  After all, a book of mine just hit the shelves which is just rife with template-based generation of RSS and Atom feeds.  

My only issue, really, is that I feel vaguely guilty about it.

[lazy]: http://decafbad.com/blog/2002/12/13/oooced

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084924">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=821395fe70906c8290df7f18ac4ac6cf&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">rick</a>
                </div>
                <a href="#comment-221084924" class="permalink"><time datetime="2005-09-26T02:27:37">2005-09-26T02:27:37</time></a>
            </div>
            <div class="content">Ruby has the nice Builder module for this (http://builder.rubyforge.org/).  Ruby on Rails uses it for it's rxml templates.  So, you still get the speed of templates, but you don't have to worry about those pesky xml rules.

Here's a sample Atom 1.0 template used by Typo, a rails weblogging system: http://typo.leetsoft.com/trac/file/trunk/app/views/xml/atom10_feed.rxml</div>
            
        </li>
    
        <li class="comment" id="comment-221084925">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221084925" class="permalink"><time datetime="2005-09-26T03:52:50">2005-09-26T03:52:50</time></a>
            </div>
            <div class="content">Using the DOM to build documents is awfully awkward. Don&#8217;t do that.

Check <a href="http://hsivonen.iki.fi/" rel="nofollow">Henri Sivonen</a>&#8217;s suggestions just published in his <a href="http://hsivonen.iki.fi/producing-xml/" rel="nofollow">HOWTO Avoid Being Called a Bozo When Producing XML</a>. Instead of building a DOM, generate SAX events, using the program structure to ensure proper nesting &#8211; or instead of generating the SAX events all manually, generate them by parsing a static XML document and using certain interesting points in the stream (such as Processing Instructions) as hooks for inserting payload.

The emission of synthesised SAX events can be generalised by writing a datastructure-to-SAX serialiser, so that you can build your data within your language&#8217;s native datastructures prior to outputting it, for maximum comfort. (Of course you serialise piecemeal too, f.ex. by outputting the head of a feed manually, then for each item, building the data structure and immediately serialising it, then emitting the final events to complete the document.)

Depending on the complexity of the output, you could directly emit the otuput format or feed the events into to an XSLT transform that generates the full-blown thing from an easy to generate document structure. In both cases this can be done with or without the involvement of a serialiser as middle man.

There are plenty of ways to make sure that the entire toolchain from one end to the other consists only of steps that conserve well-formedness, and they need not be any less convenient than using templates.</div>
            
        </li>
    
        <li class="comment" id="comment-221084926">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084926" class="permalink"><time datetime="2005-09-26T04:16:35">2005-09-26T04:16:35</time></a>
            </div>
            <div class="content"><blockquote>or instead of generating the SAX events all manually, generate them by parsing a static XML document and using certain interesting points in the stream (such as Processing Instructions) as hooks for inserting payload.</blockquote>
Aristotle:  Now here's where I think certain templating technologies get interesting, and may Do the Right Thing.  My so-far-favorite templating kit, ZPT, wants well-formed XML as templates--although I think that restriction is unfortunately relaxed as a nod to HTML.  On the other hand, my possibly-new-favorite templating kit, Kid, [demands well-formed XML as templates](http://lesscode.org/projects/kid/wiki/KidFaq#must-templates-be-well-formed-xml).

In case you haven't played with them, these two template languages center around the idea that certain attributes on elements define where content provided in a data structure should be inserted / swapped in by the template engine.  The engine handles character encodings and such to ensure that the well-formed template results in a well-formed document.

Does this match up with what you say up there?</div>
            
        </li>
    
        <li class="comment" id="comment-221084928">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084928" class="permalink"><time datetime="2005-09-26T04:28:49">2005-09-26T04:28:49</time></a>
            </div>
            <div class="content">I guess the other thing that bugs me about constructing documents via DOM or via generating SAX events—which I'd first discovered in <a href="http://www.xml.com/pub/a/2003/03/12/py-xml.html" rel="nofollow">this XML.com article by Uche Ogbuji</a>—is how awkward and removed it is from the view-source XML I've gotten used to hacking around with.  Of course, my distaste for programmatically generating things like this goes back to <a href="http://perldoc.perl.org/CGI.html#CREATING-STANDARD-HTML-ELEMENTS%3a" rel="nofollow">CGI.pm</a> in my perl-hacking days.

When I start writing <i>code</i> to generate <i>data</i> that could be mostly done with a template, it strikes me as tangling Model/View/Controller elements and introducing weird context shifts.  (ie. h1() vs &lt;h1 /&gt;)  Not sure if that made sense...</div>
            
        </li>
    
        <li class="comment" id="comment-221084929">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.sporkmonger.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56ee28134dd0776825445e3551979b14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.sporkmonger.com">Bob Aman</a>
                </div>
                <a href="#comment-221084929" class="permalink"><time datetime="2005-09-26T05:40:24">2005-09-26T05:40:24</time></a>
            </div>
            <div class="content">Yeah, I was gonna say, Builder for Ruby solves most of the issues with using templates and xml.  For RSS and Atom, there's also my Ruby FeedTools library, which makes it even more rediculously easy to get a valid feed up and running.

I'm also very tempted to play around with Kid and see how I like it, and perhaps port it to Ruby.  From what I've seen so far, it looks like perhaps the nicest templating system yet.</div>
            
        </li>
    
        <li class="comment" id="comment-221084930">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221084930" class="permalink"><time datetime="2005-09-26T05:59:08">2005-09-26T05:59:08</time></a>
            </div>
            <div class="content">It does. I confess I actually kind of liked <a href="http://search.cpan.org/dist/CGI.pm/" rel="nofollow">CGI.pm</a> &#8211; because nesting is automatically taken care of without so much typing of end tags, and you can seamlessly weave <code>map</code>s into the code for output loops.

I have to note though that I used it as a sort of template language in its own right &#8211; I never littered <code>print</code>s all over my code, I kept all the calls in a single place, in fact, usually a single expression. That is also why I find it strange that people create template languages for PHP, which was itself born as a template language. What matters is that the output generation is separate from the processing logic, whether or not the template and the code are in different languages.

Anyway, I digress.

What I wanted to say is, no, I hadn&#8217;t seen either ZPT or Kid. I had put off reading the lesscode.org article you quoted and went back to it after responding here. Now that I&#8217;ve read it, I admit I&#8217;m intrigued. I&#8217;ll have to look into Kid; it sounds like an interesting take.</div>
            
        </li>
    
        <li class="comment" id="comment-221084931">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084931" class="permalink"><time datetime="2005-09-26T13:39:00">2005-09-26T13:39:00</time></a>
            </div>
            <div class="content"><blockquote>What matters is that the output generation is separate from the processing logic, whether or not the template and the code are in different languages.</blockquote>

Ah hah, yeah, that's what I was fumbling toward with the sleepy tail-end of my comment.  Logic and presentation in separate blocks / files / etc.  And then, my take is that if you're going to have your presentation/view separate from the logic/controller, you may as well code the presentation in a form as close to the goal as possible (ie. in XML or HTML, not in s-expressions or the logic implementation idiom)—especially since oftimes you've got separate people or teams working primarily on each.

I suspect, however, that a templating system like Kid goes quite a ways toward solving the problem of "gluing strings together".  I almost wish it had been further along / I'd been more aware of it before I'd reinvented my own wheels for my book using Python string templates and funky map classes.</div>
            
        </li>
    
        <li class="comment" id="comment-221084932">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://naeblis.cx/rtomayko/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=abfc88b96ae18c85ba7aac3bded2ec5e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://naeblis.cx/rtomayko/">Ryan Tomayko</a>
                </div>
                <a href="#comment-221084932" class="permalink"><time datetime="2005-09-26T19:00:44">2005-09-26T19:00:44</time></a>
            </div>
            <div class="content"><blockquote>I suspect, however, that a templating system like Kid goes quite a ways toward solving the problem of “gluing strings together”.</blockquote>

That's the idea. The correctness of DOM/SAX based contruction with the ease-of-use of templating. The future of Kid is somewhat uncertain. I'm hoping to wrap up 1.0 and stabalize it for Kevin and TurboGears but what I'd personally really love to see is the general concept of "structured templating" reach a wider audience.</div>
            
        </li>
    
        <li class="comment" id="comment-221084933">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://naeblis.cx/rtomayko/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=abfc88b96ae18c85ba7aac3bded2ec5e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://naeblis.cx/rtomayko/">Ryan Tomayko</a>
                </div>
                <a href="#comment-221084933" class="permalink"><time datetime="2005-09-26T19:02:17">2005-09-26T19:02:17</time></a>
            </div>
            <div class="content">Oops. Sorry about the rough formatting. For some reason I thought comments were in markdown. Edit away, Leslie.</div>
            
        </li>
    
        <li class="comment" id="comment-221084934">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084934" class="permalink"><time datetime="2005-09-26T19:11:20">2005-09-26T19:11:20</time></a>
            </div>
            <div class="content">Ryan:  Grr.  Funny you should mention that—I thought comments around here allowed markdown, too.  I think I need to fix that *and* display some copy explaining markdown availablility, since I think that was something about which Aristotle expressed some confusion/surprise before as well.</div>
            
        </li>
    
        <li class="comment" id="comment-221084935">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221084935" class="permalink"><time datetime="2005-09-26T20:29:12">2005-09-26T20:29:12</time></a>
            </div>
            <div class="content"><blockquote>if you&#8217;re going to have your presentation/view separate from the logic/controller, you may as well code the presentation in a form as close to the goal as possible</blockquote>

Oh, I don&#8217;t disagree at all.

I have been annoyed at the state of XML generation at large, myself. Kid looks very nice, except I have no use for it, being that I&#8217;m still a Perlista. (Python just doesn&#8217;t feel right to me &#8211; like wearing a badly fitting tuxedo.)

I&#8217;m wondering how much work it would be to port it or a close copy to Perl&#8230;

<blockquote>I think that was something about which Aristotle expressed some confusion/surprise before as well.</blockquote>

Heh, yeah. Your MT installation permitted Markdown but no literal tags, which caught me off guard once or twice until I noticed. But thankfully it had a preview button, so I could figure it out. I <strong><em>hate</em></strong> how WordPress does not ship with preview button available and enabled by default, and the default configuration doesn't even mention the expected formatting anywhere either.

I just suspected that your WordPress was vanilla and used HTML on that hunch &#8211; and it worked. Phew. Maybe you can install the gagdget that Ryan uses on lesscode.org? I love that.</div>
            
        </li>
    
        <li class="comment" id="comment-221084936">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084936" class="permalink"><time datetime="2005-09-26T21:38:08">2005-09-26T21:38:08</time></a>
            </div>
            <div class="content"><blockquote>
  <p>I just suspected that your WordPress was vanilla and used HTML on that hunch – and it worked. Phew. Maybe you can install the gagdget that Ryan uses on lesscode.org? I love that.</p>
</blockquote>

<p>Your wish is my command.  At least, in this instance.  I pawed through Ryan's HTML source and got sufficient clues to install this thing and shamelessly steal a snippet or two.  Let's see if this preview works and if it accurately reflects what this will look like when I post...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084937">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.emacswiki.org/alex/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=73d2617de46d85c306dbdf533b72fded&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.emacswiki.org/alex/">Alex Schröder</a>
                </div>
                <a href="#comment-221084937" class="permalink"><time datetime="2005-09-27T11:22:06">2005-09-27T11:22:06</time></a>
            </div>
            <div class="content"><p>I maintain Oddmuse, a wiki engine written in Perl, using CGI.pm to generate the HTML.  Often people want me to switch to templates.  At the moment, when you want to radically change the HTML for the stuff that is not the wiki content, ie. headers and footers, you need to override the Perl subs that I provide.  Somehow that strikes me as natural and easy, but many of my users seem to disagree, preferring to learn a templating system instead of learning to write Perl code.  I'm still undecided about the issue.  At the moment I'm still sticking to the "write Perl code instead of templating" because being able to write Perl code will make so many other task easy.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084938">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084938" class="permalink"><time datetime="2005-09-27T11:31:23">2005-09-27T11:31:23</time></a>
            </div>
            <div class="content"><p>Alex:  Well, from my perspective, I've worked on a lot of teams where you've essentially got two roles—software engineer (SE) and interface engineer (IE).  Depending on the company and the team, the SE might understand Perl/Python/Java/SQL while the IE might understand HTML/CSS/Javascript/Flash.  There's usually overlap, of course, but these are the roles on paper at least.</p>

<p>When you're trying to come up with an overarching framework which accomodates collaboration between these two sorts of people and their respective skill sets, it helps to have a bridge between the logic and the presentation which can keep the Perl out of the HTML and the HTML out of the Perl.</p>

<p>On the other hand...  A project like Oddmuse likely has an entirely different user and developer base than the projects I work on at my day job :)</p></div>
            
        </li>
    
        </ul>
    
        </div>
    