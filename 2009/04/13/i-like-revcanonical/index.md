*Update 4/14*: So, I liked `rev="canonical"`, but I like the notion of pages offering sets of alternative URLs better.  [There are enough cracks in the case](http://www.mnot.net/blog/2009/04/14/rev_canonical_bad) for `rev="canonical"` to stop caring about it and instead focus on the notion behind it.  However it's expressed—is it [`rel="shortlink"`](http://groups.google.com/group/shortlink) now?—the final remaining things I'd like to see are:

* An more generalized scope for alternate URL choices asserted by publishers, not just URL shortening.  Other criteria beyond character length include ease of entry on mobile devices (eg. short, but also simple, maybe mostly numeric), ease of verbal mention (eg. billboards, postcards, etc).

* HTTP headers are great where available—hooray for HEAD—but it still needs to be in the page for publishers who can't set custom headers.

* Microformats are great, but I'd rather not parse a whole page to the footer to lift out the desired URLs.

* Don't panic. Have fun.

And with that, I'm going to try coming up with other things to write about so this blog doesn't stay dormant.  The rest of this entry remains unedited below...

<!--more-->
<hr />

<strike>So, like it says up there: I like [rev="canonical"](http://revcanonical.appspot.com/).</strike>

Basically, it's a way of saying—instead of using that 3rd-party service *you* like for munging *my* URLs, use one of these pre-munged URLs I've provided.  Ideally, the URLs I provide will be shorter for your needs, but my URLs won't be subject to [potentially distasteful things I object to with respect to a service you might pick](http://joshua.schachter.org/2009/04/on-url-shorteners.html).

I like keeping control of URL spaces in the hands of their publishers.  This also opens the field for more individual choice in URL shortening services, allowing more people to try their hand at building a better mouse trap—or allowing publishers to opt out of the mess altogether.  

And, apropos of that, I tend to like `rev="canonical"` as the means of expressing this choice.

There's a lot more background on this whole shebang, but I'll just stick to my $0.02 on the discussion so far.

### [It's too alpha geeky to get adopted—also: NERDS!](http://www.25hoursaday.com/weblog/2009/04/11/revcanonicalDiggBarOutrageCausesBadIdeasToComeOutOfTheWoodWork.aspx)

Alpha geeks write plugins for web publishing systems used by less-alpha geeks, who eventually install web publishing systems for those even further down the geek scale.  It's not unheard of for something incredibly nerdy to become relatively common, if it proves useful.

Feed auto-discovery is in blogging software and browsers now—it was once considered a somewhat arcane usage of the `rel` attribute on `<link>` tags in HTML `<head>`.

### [Everyone needs to implement their own URL shortener.](http://www.25hoursaday.com/weblog/2009/04/11/revcanonicalDiggBarOutrageCausesBadIdeasToComeOutOfTheWoodWork.aspx)

No, but everyone gets to pick a shortener for their own URLs—which could coincidentally be self-hosted or third-party.  Isn't the web great?

### [The `rev` attribute is too hard to understand, people will get it wrong](http://benramsey.com/archives/a-revcanonical-rebuttal/).

I hadn't paid much attention to the `rev` attribute until a week or so ago.  I [read the HTML spec on links](http://www.w3.org/TR/html401/struct/links.html#adef-rev) again.  Within 10 minutes of reading the spec, my understanding became this:

* `rel="{X}"` — "this link means {X} in relation to the current page".
* `rev="{X}"` — "this current page means {X} in relation to this link".

I may have misunderstood it—if so, explain to me how and I'll admit it's harder to understand than I think.  There are harder concepts in the HTML 4 spec.

### The `rev` attribute is removed in HTML5

That's too bad for HTML5.  

[The rationale given for the removal](http://lists.whatwg.org/pipermail/whatwg-whatwg.org/2006-July/006888.html) seems sensible enough.  But, I'd say the rationale for removal is weakened if someone finds a use for the attribute and uses it correctly.

### `rel="shorter"` / `rel="short"` is better and more explicit.

I like this idea in general, and I don't *really* care strongly enough about `rev="canonical"` vs `rel="short"` to make much noise beyond this blog post.  

But, I prefer the semantics of `rev="canonical"`, I don't think `rel="short(er)"` is better, and actually I think the less explicit assertion is a feature.  I've not yet been convinced otherwise—but realistically, if either catches on, I'll probably use the most popular.

### `rev="canonical"` doesn't mean "shorter URL"

That's okay—what if I don't *want* you to have shortened versions of my URLs?  Doesn't fit in your tweet?  Screw you.  I didn't want you to link to me that badly anyway.  Bah.  

That, of course, is self-defeating.  Conventional use of the attribute will probably yield shorter URLs out of self-interest.  Furthermore, I could even offer a half-dozen URL variations, and you could use the string length function in the language of your choice to pick one on the basis of shortness.  There's a lot of choice to go around here.

Also, feed auto-discovery links don't always lead to truly alternate versions of the current page—but instead to a useful set of items, many of which may currently appear somewhere on the page.  So, even the "clear" semantics have some play in them as used in the wild.

### [A `rev="canonical"` HTTP header is better.](http://shiflett.org/blog/2009/apr/a-rev-canonical-http-header)

Hmm, maybe.  It would certainly allow for possibly lighter-weight HEAD requests in determining the alternative URL for a given URL.  But, I would expect it to fall apart in collections of static HTML pages baked by an offline script where web server configuration might not make setting custom headers easy.

Not everyone has the luxury / inclination to have a dynamic language capable of setting headers running in their web server.

### [`rev="canonical"` should appear on hyperlinks in the body of the page](http://adactio.com/journal/1568/)

[I like microformats](http://decafbad.com/blog/2005/05/08/whats-old-scraping-is-new-again-microformats), [in general](http://decafbad.com/blog/2005/05/17/magic-microformat-forms).  But, I don't really want to potentially parse a whole page to find the shorter URL that might be in the footer.  With `rev="canonical"` in the `<head>`, I only have to parse so far before I find it or give up.

There's a lot of prior art on this with relation to feed autodiscovery—we used to mainly look for RSS feed URLs inside the page, too.  It sucked.

### [Claiming to be canonical for another URL is trouble.](http://benramsey.com/archives/a-revcanonical-rebuttal/#comment-288465)

Okay, how about requiring a reciprocal `rel="canonical"` on the same page with `rev="canonical"`.

Trust but verify—and only accept `rev="canonical"` where `rel="canonical"` matches the current URL *and* `rev="canonical"` yields a 301 redirect to the `rel="canonical"`.

I can't see this verification process being necessarily more burdensome than using a 3rd-party shortener API—and that's *if* you're paranoid and building an index that needs some measure of resistance to gaming.

### [A single character slip from `rev="canonical"` to `rel="canonical"` could wreck your Googlejuice!](http://samj.net/2009/04/revcanonical-considered-harmful.html?showComment=1239617160000#c7231589643969293690)

So, don't do that.  

Maybe Googlejuice should be more resilient.  Maybe it actually is—has anyone actually soured their juice yet with a mistake like this and lived to tell the tale?  

Either way, characters mean things in computer languages, so make sure you use the right ones in the right order.

### You guys are moving on this stuff too fast!

Welcome to 2002, when lots of us had more spare time than employment and we deployed new crap like this on our blogs and sites daily.  

Back in those olden days, we manipulated raw HTML with our bare hands and deployed radioactive code using our teeth—all without benefit of protective change control.  We probably all have cancer of the access logs now, but it was all in the name of Web Science!

### Too long; didn't read

So, yeah.  I like the idea behind `rev="canonical"` and I prefer its expression as `rev="canonical"` best—but the idea is the important thing.  Let's get over the expression part fast and spend more time exploring the nuts and bolts and implications of the concept itself.

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221091011">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://pigsonthewing.org.uk/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4e160e713acf1ab8547d1c36233389c3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://pigsonthewing.org.uk/">http://pigsonthewing.org.uk/</a>
                </div>
                <a href="#comment-221091011" class="permalink"><time datetime="2009-04-13T14:00:04">2009-04-13T14:00:04</time></a>
            </div>
            <div class="content"><p>Forget rel="short" or rel="shorter". Try rel="shortcut".</p></div>
            
        </li>
    
        <li class="comment" id="comment-221091013">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221091013" class="permalink"><time datetime="2009-04-13T14:22:53">2009-04-13T14:22:53</time></a>
            </div>
            <div class="content"><p>...or I could try rev="canonical" like I said up there.  An actual rationale might be more productive here.  :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221091015">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://spindrop.us/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=35b8de09a3685277188d8b8be0e5e3ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://spindrop.us/">Dave Dash</a>
                </div>
                <a href="#comment-221091015" class="permalink"><time datetime="2009-04-13T14:37:21">2009-04-13T14:37:21</time></a>
            </div>
            <div class="content"><p>So yes, you are understanding "rev" correctly per the spec.  The problem I have is this:</p>

<p>rel=canonical was introduced so when people went to various urls that a search engine would know that the url specified in rel=canonical was the real one.  Let's do this to make life easier:</p>

<p>http://foo.com/A
and 
http://foo.com/B</p>

<p>both go to the exact same page, and the publisher can't for some reason redirect to the canonicalized page (maybe it's amazon and they have stupid large urls with affiliate codes).</p>

<p>so if the former is canonical then this is present:</p>

<p></p>

<p>whether you go to /A or /B.</p>

<p>if they use rev="canonical":</p>

<p></p>

<p>Should only be shown if they are visitng /A not /B otherwise that rev statement implies that /A or /B are the canonical forms of "http://f.us/A".</p>

<p>I think that's why the rev attribute isn't a very good one.  Honestly I liked the suggestion (you made it maybe) for using rel="shortcut alternative" or something.</p>

<p>Am I seeing potential ambiguity when there isn't?</p>

<p>-d</p></div>
            
        </li>
    
        <li class="comment" id="comment-221091016">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221091016" class="permalink"><time datetime="2009-04-13T15:36:42">2009-04-13T15:36:42</time></a>
            </div>
            <div class="content"><p>@Dave: I think you may have used some markup in your comment that got filtered out - I'm not exactly sure what you mean. :/</p>

<p>If we have this URL:</p>

<p>http://example.com/this/url/is/too/long</p>

<p>With these links in the head:</p>

<blockquote>
  <p>rel="canonical" href="http://example.com/this/url/is/too/long"
  rev="canonical" href="http://ex.pl/ab"</p>
</blockquote>

<p>Then, the URL http://ex.pl/ab will ideally lead to a 301 redirect.  But, if not, it should have the same content as http://example.com/this/url/is/too/long — and therefore list the same reciprocal "canonical" relationship that leads back to the original page.</p>

<p>That seems disambiguated to me—even more so than <code>rel="shorter"</code> or whatnot.  If the URL for a <code>rel="shorter"</code> link didn't yield a redirect, we'd never know what was the original page without a corresponding <code>rel="canonical"</code> anyway.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221091017">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.jm3.net/"><img src="http://disqus.com/api/users/avatars/jm3.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.jm3.net/">John Manoogian III (jm3)</a>
                </div>
                <a href="#comment-221091017" class="permalink"><time datetime="2009-04-14T01:59:04">2009-04-14T01:59:04</time></a>
            </div>
            <div class="content"><p>LOL at "soured their juice." Well written and well reasoned as usual, Les.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221091018">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://samj.net/"><img src="http://disqus.com/api/users/avatars/samj.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://samj.net/">samj</a>
                </div>
                <a href="#comment-221091018" class="permalink"><time datetime="2009-04-14T02:39:30">2009-04-14T02:39:30</time></a>
            </div>
            <div class="content"><p>I've comprehensively rebutted your argument <a href="http://groups.google.com/group/shortlink/browse_thread/thread/885894c42cbdf8ad/d50be9d1c74bad7a?#d50be9d1c74bad7a" rel="nofollow">over there</a> so I'm not going to do it again here, except to say that given you concede that rel=short* is just as good as rev=canonical, only it's a&gt; not deprecated and b&gt; cannot possibly make sites drop off the face of the Internet, why do you even care enough to write this blog post?</p>

<p>Sam</p></div>
            
        </li>
    
        <li class="comment" id="comment-221091020">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://samj.net/"><img src="http://disqus.com/api/users/avatars/samj.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://samj.net/">samj</a>
                </div>
                <a href="#comment-221091020" class="permalink"><time datetime="2009-04-14T02:42:35">2009-04-14T02:42:35</time></a>
            </div>
            <div class="content"><p>Oh, and let's not forget that you can only use this "solution" on the canonical URL itself since it implies that the page it is attached to is itself canonical. That means you're going to have to find another solution for a potentially infinite number of other links to the same content, or risk leaking google juice all over the place.</p>

<p>Sam</p></div>
            
        </li>
    
        <li class="comment" id="comment-221091023">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221091023" class="permalink"><time datetime="2009-04-14T03:51:48">2009-04-14T03:51:48</time></a>
            </div>
            <div class="content"><blockquote>
  <p>why do you even care enough to write this blog post?</p>
</blockquote>

<p>Because <a href="http://xkcd.com/386/" rel="nofollow">someone is wrong on the Internet</a>!  And I haven't blogged in awhile, so I needed an excuse.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221091024">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://spindrop.us/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=35b8de09a3685277188d8b8be0e5e3ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://spindrop.us/">Dave Dash</a>
                </div>
                <a href="#comment-221091024" class="permalink"><time datetime="2009-04-14T04:15:57">2009-04-14T04:15:57</time></a>
            </div>
            <div class="content"><p>Les,</p>

<p>I not good with words today.  I was trying to say what Sam said:</p>

<p>"this “solution” on the canonical URL itself since it implies that the page it is attached to is itself canonical"</p>

<p>Hence, I'd stick with a solution that uses rel - so long as we can just pick an attribute "shorter alternative" or whatever that we can agree on :)</p>

<p>-d</p></div>
            
        </li>
    
        <li class="comment" id="comment-221091026">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://erikvold.com/index.cfm"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8fa21a16e24905fba4413501e3afb36e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://erikvold.com/index.cfm">Erik Vold</a>
                </div>
                <a href="#comment-221091026" class="permalink"><time datetime="2009-04-21T03:47:01">2009-04-21T03:47:01</time></a>
            </div>
            <div class="content"><p>Nice rebuttal to all of this rev=canonical opposition, but you gave in man wth?!</p>

<p>Let me try to back you up a bit, maybe you'll agree with your gut again.</p>

<p>First I must start with the removal of @rev in html 5. That was an amazingly dumb move, luckily it is a draft still is all I can say. Here is why I believe this:
1) 1 char diff argument: shut up you nub programmers
2) misuse: it's night vs day, black vs white, there is no gray area except that which your confused minds have created. The confusion -I think- usually comes in to play when considering a value, which is easy if you truly understand the diff between @rel and @rev.
3) @rev values can be represented as @rel values: sure I agree but this can not be true without adding more rel values then are necessary with a @rev which is already in the html 4 spec for a reason. If you remove something with use you cause confusion on multiple fronts: first people have to become aware of the change, then they need to understand why the change was made, then they need to make the changes to their code base, and finally when they want to express rev=canonical with a @rel value, debates over what best @rel value represents the equivalent of another @rel value if it were used in @rev occur..</p>

<p>I submit the debate which the opposition to rev=canonical are having over rel=short* as evidence that @rev is required. A link with rev=canonical that is short is a short url of the canonical url by definition, thus rel=short* is redundant for the use case of discovering a short url for the canonical url of some document. Albeit, I think rel=shorturl (or whatever is finally decided on) could be used by the publisher to indicate a preferred short url(s), if say there were &gt;1 rev=canonical.</p>

<p>In an algorithm to discover a short url for a document one method could be to scan all links and find the shortest rev=canonical, or if a rel=shorturl is provided then use that and stop scanning immediately. My point is that rev=canonical should be used. Also rel=shorturl adds a marginal benefit to rev=canonical.</p>

<p>Another point, a rel=shorturl is rev=canonical by definition, thus if you were to use rel=shorturl and @rev were alive and well as it should be, you should automatically add rev=canonical (even though it is implied).</p>

<p>Another argument the opposition make to using rev=canonical is that the number of rev=canonical's are possibly infinite, so I say only list the rev=canonical's which a user may find of interest for the use cases you can imagine.</p>

<p>Another case for using rev=canonical is using rev=canonical with rel=mobile perhaps? so that a user can scan rev=canonical's for a rel=mobile url which is short enough to fit in the newest microblog gadget. Where a rel=mobile without rev=canonical could be the mobile site's homepage, even better for this link would be rel="mobile home" without rev=canonical.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221091029">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://erikvold.com/index.cfm"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8fa21a16e24905fba4413501e3afb36e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://erikvold.com/index.cfm">Erik Vold</a>
                </div>
                <a href="#comment-221091029" class="permalink"><time datetime="2009-04-21T05:17:14">2009-04-21T05:17:14</time></a>
            </div>
            <div class="content"><p>The reasons why I like rev=canonical: http://erikvold.com/blog/index.cfm/2009/4/21/rev_canonical_good</p></div>
            
        </li>
    
        <li class="comment" id="comment-221091030">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221091030" class="permalink"><time datetime="2009-04-28T05:31:35">2009-04-28T05:31:35</time></a>
            </div>
            <div class="content"><p>@Erik: Well, I "gave in" mainly because I wasn't really looking for a fight and had a vacation to attend to.</p>

<p>After that, the amount of hyperbolic stop energy being slung around rel=short{foo} has exhausted my care for the subject.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    