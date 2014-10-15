---
comments_archived: true
date: '2006-01-07T20:33:47-05:00'
layout: post
tags:
- wordpress
- webdev
- syndication
- python
- programming
- perl
- templating
- smarty
- dtml
- cheetah
- reblog
- evil
title: Smarty is on my evil list
wordpress_id: 818
wordpress_slug: smarty-is-on-my-evil-list
wordpress_url: http://decafbad.com/blog/?p=818
---
Although I have [my grousing about PHP in general][gphp], I have to say that it makes much better template language as-is before pulling something like [Smarty][smarty] into the mix.  

At this point, I consider [Smarty][] to be evil—though I'm willing to admit that I haven't grokked it fully yet.  And this is coming from [a templating addict][tmpl] who has been at times in love with [Template Toolkit][tt] in Perl,  [Velocity][] in Java, and [Cheetah][] and [Woven][] and [ZPT/TAL][zpt] in Python.  

[WordPress][] seems to have put native-PHP-as-templating to good use, so I've already got a favorite for comparison.  But the use of [Smarty][] in [reBlog][] rubs me the wrong way.  Of course, [reBlog][] has a lot of highly-abstracted MVC architecture going on.  And this, itself, is something I haven't much in my PHP explorations thus far.  (In fact, I almost hate to see PHP chopped up in this J2EE-esque fashion, but that's another story.  Oh, and [reBlog][] rocks, by the way.)

But either way, [Smarty][] makes this right-handed hacker feel like he's writing with his left.  It seems to have a lot of weird conventions and terminology for which neither knowledge of PHP nor knowledge of other templating systems in general seem much help.  It could just be a learning curve, but to me it seems like an odd *sideways* curve at the moment.  

In fact, you know what?  [Smarty][] reminds me a lot of [DTML in Zope][dtml].  I hate [DTML][]—it, also, is most firmly on my evil list.

Yuck.  Again, it could be just that I haven't known [Smarty][] long enough to like it... but yuck.

<!-- tags: templating php smarty dtml python perl cheetah webdev programming syndication reblog wordpress evil -->

[dtml]: http://www.zope.org/Documentation/Guides/DTML-HTML/DTML.html
[tt]: http://www.template-toolkit.org/
[velocity]: http://jakarta.apache.org/velocity/
[gphp]: http://decafbad.com/blog/2005/12/18/not-so-deep-php-thoughts
[cheetah]: http://www.cheetahtemplate.org/
[zpt]: http://www.owlfish.com/software/simpleTAL/
[smarty]: http://smarty.php.net
[wordpress]: http://wordpress.org/
[reblog]: http://www.reblog.org/
[woven]: http://twisted.sourceforge.net/TwistedDocs-1.2.0rc3/howto/woven.html
[tmpl]: http://decafbad.com/blog/2005/09/25/templates-good-or-evil

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082526">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://luka.kladaric.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=78b0e32da6ce10e17db345a9aa8cde78&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://luka.kladaric.net/">Luka Kladaric</a>
                </div>
                <a href="#comment-221082526" class="permalink"><time datetime="2006-01-08T11:55:40">2006-01-08T11:55:40</time></a>
            </div>
            <div class="content"><p>I agree with you... I used Smarty in one project and am now using it in another work-in-progress... and I have to say, the decision to use it with the second was a bad one... Smarty is pretty cool for simple templating, but when you need raw power, it leaves you shipwrecked... I had to turn to some really black magic to get things done... Anyway, a rewrite of the first project is in negotiations and I'm 100% sure I will <em>NOT</em> be using Smarty there, either.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082527">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://laughingmeme.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=01457d1a0f0e533062cd0d1033fb4d7a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://laughingmeme.org">kellan</a>
                </div>
                <a href="#comment-221082527" class="permalink"><time datetime="2006-01-08T14:34:57">2006-01-08T14:34:57</time></a>
            </div>
            <div class="content"><p>Agreed.  Using a templating languages with PHP makes no sense. (though I'm not sure the fact that WP does or doesn't do something makes it good design)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082528">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082528" class="permalink"><time datetime="2006-01-08T15:03:33">2006-01-08T15:03:33</time></a>
            </div>
            <div class="content"><p>Kellan:  Oh, no, WordPress isn't an automatic gold standard for me...  There's plenty that could be better about WP.  (Not having checked out 2.0 yet)  But, I just had a much better time setting up the templates for this blog than I have had in hacking around with templates implemented in Smarty.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082529">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sporkmonger.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56ee28134dd0776825445e3551979b14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sporkmonger.com/">Bob Aman</a>
                </div>
                <a href="#comment-221082529" class="permalink"><time datetime="2006-01-08T17:41:17">2006-01-08T17:41:17</time></a>
            </div>
            <div class="content"><p>Me, I just wish there was a templating system for Ruby for me to fall in love with.  With all due respect to the Rails people, ERb just doesn't really do it for me.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082530">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221082530" class="permalink"><time datetime="2006-01-08T21:04:14">2006-01-08T21:04:14</time></a>
            </div>
            <div class="content"><p><a href="#comment-3388" rel="nofollow">Bob</a>: port <a href="http://kid.lesscode.org/language.html" rel="nofollow">Kid</a> to Ruby. :-<i></i>)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082532">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://talideon.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e698f564ac90c4c248f1f678caafd624&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://talideon.com/">Keith Gaughan</a>
                </div>
                <a href="#comment-221082532" class="permalink"><time datetime="2006-01-08T21:28:05">2006-01-08T21:28:05</time></a>
            </div>
            <div class="content"><p>What's moronic is that people go to all this trouble building templating systems when all you really need is extract(). Sad, really.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082533">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.ntwizards.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cb564795a1912c36f9fa1399fd22ce29&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.ntwizards.net/">Bryce</a>
                </div>
                <a href="#comment-221082533" class="permalink"><time datetime="2006-01-12T13:33:10">2006-01-12T13:33:10</time></a>
            </div>
            <div class="content"><p>PHP as a template engine is more evil than Smarty. The main issue is that template authors may not be trustworthy. Once you include or eval() a PHP template the app is no longer in control and I don't see any way of structuring a PHP app such that it cannot be subverted from within. </p>

<p>The only defense seems to be using the tokenizer functions to build a PHP parser that validates templates against a "whitelist" of allowed operations. Savant's Restricted Compiler is about the only implementation out there, but it's not quite complete and seems to be more of a proof-of-concept than battle-tested code.</p>

<p>Whatever Smarty's faults, it solves the untrusted templates problem nicely.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082534">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082534" class="permalink"><time datetime="2006-01-12T14:27:42">2006-01-12T14:27:42</time></a>
            </div>
            <div class="content"><p>Bryce: Oh, I totally understand the implications of offering too much capability to template authors.  That's just how much I dislike Smarty—I'm willing to risk it, rather than put up with that particular implementation.  On the other hand, in my situation, I'm on the same team with the template developers, so we're all on the same team to sink or swim.  I know it's not that simple, in principle, but it covers the 80% of the 80/20 equation.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082536">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dougal.gunters.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=81717a172b6918071fbea1a52483294b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dougal.gunters.org/">Dougal Campbell</a>
                </div>
                <a href="#comment-221082536" class="permalink"><time datetime="2006-01-12T15:25:25">2006-01-12T15:25:25</time></a>
            </div>
            <div class="content"><p>Yeah, I was never able to get into Smarty either, and I've never been able to put my finger on why. Philosophically, I like the idea of using template engines, particularly if you're collaborating with a non-programming designer. I even wrote one (albeit a <em>very simple</em> one) myself, once. But I've never used any of the PHP template packages that I've looked at.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082537">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://sporkmonger.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=56ee28134dd0776825445e3551979b14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://sporkmonger.com/">Bob Aman</a>
                </div>
                <a href="#comment-221082537" class="permalink"><time datetime="2006-01-13T01:10:16">2006-01-13T01:10:16</time></a>
            </div>
            <div class="content"><p>Aristotle: When TurboGears first came out, I almost did, believe it or not.  But then I remembered that FeedTools eats all of the time I have available for open-source projects, and I figured someone else would probably do it for me anyways...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082538">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221082538" class="permalink"><time datetime="2006-01-13T09:02:38">2006-01-13T09:02:38</time></a>
            </div>
            <div class="content"><p>Hehe. Well, I plan to port it to Perl, in any case. :<i></i>-)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082539">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=31475c246f5521e40d92a29ec0e36aa8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Brian Grayless</a>
                </div>
                <a href="#comment-221082539" class="permalink"><time datetime="2006-01-19T16:00:24">2006-01-19T16:00:24</time></a>
            </div>
            <div class="content"><p>Smarty is really a waste of time. Some food for thought....</p>

<p><a href="http://www.fudnik.com/main/tiki-read_article.php?articleId=7" rel="nofollow">Smarty for Dummies?</a></p>

<p>Just write better code!!!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082540">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=bdbf6409528370f5549e8470caf6ba30&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Tali Banana</a>
                </div>
                <a href="#comment-221082540" class="permalink"><time datetime="2006-02-01T07:33:41">2006-02-01T07:33:41</time></a>
            </div>
            <div class="content"><p>Well, quite opinionated I see.</p>

<p>Smarty solves some fantastic problems and the cacheing system is beyond fabulous at this level.</p>

<p>I've used Smarty on several projects and have been using it now exclusively for 4 years.  Of course, I used others but it was getting sick coming to a new phase in a project and finding out the template system had become RIP....abandoned before their time.</p>

<p>Smarty has done two great things for me, and I'll speak about them until the day that PHP is abolished:</p>

<ol>
<li><p>Smarty has reduced my code to a reasonably sized, scan-able, masterpiece.  Having the logic and presentation seperate is so nice.  I recently rewrote one of my old projects using smarty and all of a sudden it made sense!  No more php in the html and no more html in the php.  And that's something you can't solve without templates for you juniors out there.</p></li>
<li><p>Smarty's caching has turned monster db queries into non issues.  Consider this.  A top 10 list from all-time sales.  I'm talking about searching a db with sales spanning 6 years for all items purchased and creating a top sales page.  Easy!  Smarty does it once and caches the results until I decide they need to be refreshed.  Took a 4 second execution time down to less than 0.4 seconds.  And all without having to implement a CMS or otherwise.  Even if you have limitless resources to buy new hardware, caching like this still makes sense.  And the intermediate php/html cache is brilliant.  Everything is so much faster with smarty.</p></li>
</ol>

<p>I can't deny, I love Smarty.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082542">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082542" class="permalink"><time datetime="2006-02-01T11:43:36">2006-02-01T11:43:36</time></a>
            </div>
            <div class="content"><p>Tali: I'm usually opinionated, but I try to listen &amp; learn :)</p>

<p>The benefits you describe with Smarty would seem to come with any decent web development system.  Separating logic and presentation are the general idea behind templating, and some sort of caching is a must no matter what you're using as a presentation-side tool.  My beef is that, out of all the templating systems I've used, Smarty is one of the ugliest.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082543">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=bdbf6409528370f5549e8470caf6ba30&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Tali Banana</a>
                </div>
                <a href="#comment-221082543" class="permalink"><time datetime="2006-02-01T17:30:03">2006-02-01T17:30:03</time></a>
            </div>
            <div class="content"><p>Smarty does need some standards redesign on the interface, as does php itself which has been well documented but slow going.</p>

<p>Coming from the PERL background and previous php template systems I've been very happy with Smarty in general, even if there are a few things that could be done to speed up the learning curve.</p>

<p>May be worthwhile jumping on the dev team and making some suggestions.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082544">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221082544" class="permalink"><time datetime="2006-02-02T01:30:31">2006-02-02T01:30:31</time></a>
            </div>
            <div class="content"><p>But why would you need a template system when you’re already working with PHP, which is itself a template system? Why do You don’t have to have different languages to be able to put the business logic in one file and the display logic in another.</p>

<p>Perl (not PERL), btw, has the Template Toolkit on the CPAN, which is the spiritual father of Smarty. (And it’s vaguely more defensible in Perl’s case becase Perl is not a template system; though constrated with Perl the deficiencies of TT’s mini language are just all the more painfully obvious.)</p>

<p>By all of which I mean to say that whether people use languages in stupid ways does not mean the language is the problem; not in either PHP’s or Perl’s case.</p>

<p>I also don’t see why you need a templating system to implement caching; in fact, having caching coupled with the template engine sounds like a bad distribution of responsibilities. (Indeed, Template Toolkit has no such facilities.) But there’s the Cache::Cache family of modules on the CPAN, which you can use to cache things completely independently of <em>what</em> is being cached – whether it be the output of a template, or the query results themselves, or anything else, which might not even have anything to do without any output you generate.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082546">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=bab1c370ad7b246023e23e87c8e206c4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">M.</a>
                </div>
                <a href="#comment-221082546" class="permalink"><time datetime="2006-02-16T14:13:18">2006-02-16T14:13:18</time></a>
            </div>
            <div class="content"><p>I've good experiences with the Expose PHP template engine (www.kwasd.nl/expose). It doesn't require you to learn a new language, because it uses plain PHP and still offers security, because it contains a tokenizer and, in fact, a small compiler. I used it for some projects and it really offered all I needed. </p>

<p>And for people who wonder why one would need a template engine: I work with designers and I don't want them to mingle application code. By setting up a shared folder which contains the templates, they can safely work on design and never need to touch my controller or module files. Especially since this template engine has a tokenizer/compiler, they can't call unsafe PHP functions (only those that you, the programmer, register).</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082549">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://mike.teczno.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e3b46099c3fd3844c4539b27f143fd97&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://mike.teczno.com">Michal Migurski</a>
                </div>
                <a href="#comment-221082549" class="permalink"><time datetime="2006-03-05T23:16:25">2006-03-05T23:16:25</time></a>
            </div>
            <div class="content"><p>Smarty appealed to us because it offered a (relatively) clean way to separate the code from the HTML output. It's definitely got its problems. A large part of the choice was based on my perception of Smarty as having much thought &amp; effort behind it, plus I like the idea of templates caching down to plain PHP. I've done a few PHP projects where I used PHP as the templating language, and frequently succumbed to the temptation to stash app logic into the templates where it didn't really belong. Smarty has a pretty extensive vocabulary, but has (so far) resisted the pull to incorporate more real-language features, like PHP did. It's worth remembering that PHP was originally supposed to be a template language for "real" code to be written in C. <em>shudder</em></p>

<p>When we forked Reblog from Feed On Feeds, we were starting with raw-PHP display code mixed in with database calls, and it was a freaking disaster. One of my first design goals was to make it hacker-friendly, clarifying and documenting as many seams as possible so people could make localized changes more easily. I'd like to be using Python under the hood with Smarty on top, though there's a lot to be said for using commonly-known tools like Smarty in apps where you want to encourage modifications.</p>

<p>And Wordpress.... oh, Wordpress. My eyes roll back in my head when I'm forced to touch its convoluted innards. I pushed hard for a Reblog plug-in API specifically so I could cheerfully deprecate the old-style Wordpress plug-in. =)</p></div>
            
        </li>
    
        </ul>
    
        </div>
    