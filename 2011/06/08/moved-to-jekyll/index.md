**TL;DR**: <em>My blog is now produced by [Jekyll][], with comments hosted by [Disqus][].</em>

[jekyll]: https://github.com/mojombo/jekyll
[disqus]: http://disqus.com/

This blog has transitioned between a handful of publishing platforms -
including Movable Type, blosxom, and Wordpress. Well, apparently, it's that
time again.  I've been toying with making a change again for a few years,
and finally just got all the pieces together over the past week. This blog
is now just a pile of static files produced by [Jekyll][], and the comments
are now hosted by [Disqus][].

[pages]: http://pages.github.com/

This has a lot of interesting implications:

* I can neglect my server for long periods of time without worrying that my
  long-outdated copy of Wordpress has been exploited. Really, there's no
  reason for me to have a full-featured CMS running here.

* I could host my entire blog on Amazon S3 or something similar, and be
  more neglectful by reducing active code even further. The only crappy
  thing is that I don't think I can send `decafbad.com` directly to S3, and
  would need to redirect to a CNAME on a subdomain on `blog.decafbad.com`.

* I can edit my blog directly on GitHub and, assuming I get the webhooks
  set up, have my server rebuild the HTML automatically on a `git push`. I
  could probably use [GitHub Pages][pages] and the Jekyll support there,
  but I suspect I'll be doing some Weird Things that they won't handle.
  (And probably for good reason.)

* Since Disqus has all my comments now, I can stop worrying about running
  that code on my server too. I'm a little antsy about putting that in the
  cloud, but the escape routes are well lit and I should be able to replace
  it easily if I need to. Self-hosted, JS-include-based comments is a
  project in my TODO list.

* My writing here is now all stored in individual text files, formatted with
  Markdown, annotated with YAML metadata, and subject to revision control
  under git. This combination feels like it has a lot of longevity and
  potential for survival even beyond this current experiment with [Jekyll][]

* Writing, editing, and publishing entries here can now more closely match
  my daily reality of living in MacVim and git. It sounds lame, but the
  notion of swapping over to a Wordpress admin page and working in a
  browser textarea has often kept me from even starting a post.

But, some things are broken, now:

* [Fixed][tags] <strike>No more tag pages. I don't think very many humans visit these pages, but
  a lot of search engines do.</strike>

* [Fixed][tags] <strike>No more tag feeds. I expect to hear about this soon, since this blog gets
  syndicated to Planet Mozilla via my "mozilla" tag feed.</strike>

* No more year / month archive pages or sidebar widget. Not sure how many
  people actually stroll down memory lane here on my blog, but I do have a
  [gigantor huge list of all my posts evar][archives], now.

* A general lack of contextual links to related posts and such. Turns out
  that running the LSI option on Jekyll is completely horrible.

* Regeneration seems less-than-happy in general, and I wish it did
  conditional regneration. That is, only produce the HTML for things that
  need it because dependencies have changed. No need to rebake the whole
  world just because I changed one file.

[tags]: https://github.com/lmorchard/blog.decafbad.com/commit/a79678828ab612c2edb8a8ac3f796199cb922a2e

The bright side is that there are solutions to all the broken things, and
now I have something to tinker with again on my blog.  So, let me know if
anything else looks broken, and hopefully this will get me spewing some
more words out onto this thing soon.

[archives]: http://decafbad.com/blog/archives

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>

        <ul class="comments">

        <li class="comment" id="comment-221397880">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://decafbad.com/"><img src="http://disqus.com/api/users/avatars/lmorchard.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://decafbad.com/">Les Orchard</a>
                </div>
                <a href="#comment-221397880" class="permalink"><time datetime="2011-06-08T17:45:54">2011-06-08T17:45:54</time></a>
            </div>
            <div class="content">Testing a comment here on my new post.</div>

        </li>

        <li class="comment" id="comment-221404263">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href=""><img src="http://disqus.com/api/users/avatars/bkclements.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="">bkclements</a>
                </div>
                <a href="#comment-221404263" class="permalink"><time datetime="2011-06-08T17:59:01">2011-06-08T17:59:01</time></a>
            </div>
            <div class="content">Hi, did you happen to look at blogofile for similar functionality?

I'm still trying to decide which way to  go. I prefer ReST markup..</div>

        <ul class="comments">

        <li class="comment" id="comment-221408933">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://decafbad.com/"><img src="http://disqus.com/api/users/avatars/lmorchard.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://decafbad.com/">Les Orchard</a>
                </div>
                <a href="#comment-221408933" class="permalink"><time datetime="2011-06-08T18:08:26">2011-06-08T18:08:26</time></a>
            </div>
            <div class="content">I've had my eye on Jekyll for awhile now and have a few friends also using it, so I haven't really checked out any other packages. Might be nice to poke around at something based in Python since my Ruby-fu is not strong, but then getting stronger in Ruby is not a bad thing for me.

And, for myself, I'm pretty stubbornly rooted in Markdown for all my writing online</div>

        </li>

        </ul>

        </li>

        <li class="comment" id="comment-221530821">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href=""><img src="http://disqus.com/api/users/avatars/BillSeitz.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="">BillSeitz</a>
                </div>
                <a href="#comment-221530821" class="permalink"><time datetime="2011-06-08T22:01:56">2011-06-08T22:01:56</time></a>
            </div>
            <div class="content">What kind of metadata are you storing in YAML?</div>

        <ul class="comments">

        <li class="comment" id="comment-221547147">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://decafbad.com/"><img src="http://disqus.com/api/users/avatars/lmorchard.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://decafbad.com/">Les Orchard</a>
                </div>
                <a href="#comment-221547147" class="permalink"><time datetime="2011-06-08T22:30:10">2011-06-08T22:30:10</time></a>
            </div>
            <div class="content">Pretty simple stuff: Title, tags, etc.

You can see the source for this post here on github, for example:

https://raw.github.com/lmorchard/blog.decafbad.com/master/_posts/2011-06-08-moved-to-jekyll.markdown

I had once-upon-a-time thought about storing posts as RFC 822 messages, with the metadata in headers like email messages. But, this "YAML front matter" approach of Jekyll is a bit more flexible</div>

        </li>

        </ul>

        </li>

        <li class="comment" id="comment-221561143">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://www.facebook.com/davedash"><img src="http://disqus.com/api/users/avatars/facebook-530160304.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://www.facebook.com/davedash">Dave Dash</a>
                </div>
                <a href="#comment-221561143" class="permalink"><time datetime="2011-06-08T23:02:15">2011-06-08T23:02:15</time></a>
            </div>
            <div class="content">Les,

Check out what I did - I actually host my site on github thanks to TofuMatt's suggestion.  It works well and I have archives and whatnot.  In fact, most of my links didn't break.  This also means that I don't have to regenerate and sync, since github knows jekyll:

https://github.com/davedash/davedash.github.com</div>

        <ul class="comments">

        <li class="comment" id="comment-221596149">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://decafbad.com/"><img src="http://disqus.com/api/users/avatars/lmorchard.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://decafbad.com/">Les Orchard</a>
                </div>
                <a href="#comment-221596149" class="permalink"><time datetime="2011-06-08T23:56:45">2011-06-08T23:56:45</time></a>
            </div>
            <div class="content">Hmm... I might have to try that, but on a subdomain like blog.decafbad.com. I have some non-blog stuff here on decafbad.com and don't want to turn the whole thing over to github</div>

        <ul class="comments">

        <li class="comment" id="comment-221599902">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://www.facebook.com/davedash"><img src="http://disqus.com/api/users/avatars/facebook-530160304.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://www.facebook.com/davedash">Dave Dash</a>
                </div>
                <a href="#comment-221599902" class="permalink"><time datetime="2011-06-08T23:59:33">2011-06-08T23:59:33</time></a>
            </div>
            <div class="content">It caused a few things to happen - speed up my deploy time and force me to check things into git.  Also my codez build tags and stuff... </div>

        </li>

        </ul>

        </li>

        </ul>

        </li>

        <li class="comment" id="comment-222164526">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href=""><img src="http://disqus.com/api/users/avatars/tiernano.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="">tiernano</a>
                </div>
                <a href="#comment-222164526" class="permalink"><time datetime="2011-06-09T07:19:54">2011-06-09T07:19:54</time></a>
            </div>
            <div class="content">So, how did you move directly from Wordpress to Jekyll?  was it simple enough to migrate, or is it a pain?</div>

        <ul class="comments">

        <li class="comment" id="comment-222361710">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://www.facebook.com/davedash"><img src="http://disqus.com/api/users/avatars/facebook-530160304.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://www.facebook.com/davedash">Dave Dash</a>
                </div>
                <a href="#comment-222361710" class="permalink"><time datetime="2011-06-09T13:51:27">2011-06-09T13:51:27</time></a>
            </div>
            <div class="content">There is a migration script for posts.  I may have had to adjust some
minor things.   Risqué has a migration for comments.  it wasn't too
bad.</div>

        <ul class="comments">

        <li class="comment" id="comment-222372008">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href=""><img src="http://disqus.com/api/users/avatars/tiernano.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="">tiernano</a>
                </div>
                <a href="#comment-222372008" class="permalink"><time datetime="2011-06-09T14:14:31">2011-06-09T14:14:31</time></a>
            </div>
            <div class="content">Already using Disqus for comments on my wordpress install... It's the blog data itself that's the problem... Will have a look and play with the migrators...</div>

        <ul class="comments">

        <li class="comment" id="comment-222376509">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://decafbad.com/"><img src="http://disqus.com/api/users/avatars/lmorchard.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://decafbad.com/">Les Orchard</a>
                </div>
                <a href="#comment-222376509" class="permalink"><time datetime="2011-06-09T14:24:16">2011-06-09T14:24:16</time></a>
            </div>
            <div class="content">FWIW, the script I tweaked and used for exporting from my Wordpress database is here in github:

https://github.com/lmorchard/blog.decafbad.com/blob/master/_import/wordpress-decafbad.rb

The only real pain was getting the SQL query to pick up tags the way I wanted. Otherwise, it's just getting things into text files.</div>

        <ul class="comments">

        <li class="comment" id="comment-222397559">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href=""><img src="http://disqus.com/api/users/avatars/tiernano.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="">tiernano</a>
                </div>
                <a href="#comment-222397559" class="permalink"><time datetime="2011-06-09T15:07:03">2011-06-09T15:07:03</time></a>
            </div>
            <div class="content">Cool beans man. Will try that out when I get a few min...</div>

        </li>

        </ul>

        </li>

        </ul>

        </li>

        </ul>

        </li>

        </ul>

        </li>

        <li class="comment" id="comment-222453543">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://twitter.com/lroberson"><img src="http://disqus.com/api/users/avatars/twitter-14760653.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://twitter.com/lroberson">Lee Roberson</a>
                </div>
                <a href="#comment-222453543" class="permalink"><time datetime="2011-06-09T16:45:18">2011-06-09T16:45:18</time></a>
            </div>
            <div class="content">Google Reader keeps getting tricked into thinking several of your posts are new, might be some kind of issue with your pubDate field in RSS, not sure.</div>

        <ul class="comments">

        <li class="comment" id="comment-222455188">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://decafbad.com/"><img src="http://disqus.com/api/users/avatars/lmorchard.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://decafbad.com/">Les Orchard</a>
                </div>
                <a href="#comment-222455188" class="permalink"><time datetime="2011-06-09T16:48:38">2011-06-09T16:48:38</time></a>
            </div>
            <div class="content">Yeah, that's my fault. :/ I had initially exported all my posts missing the actual time part of the pubDate, and then just a little while ago re-exported with the proper datestamps

</div>

        <ul class="comments">

        <li class="comment" id="comment-222460871">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://www.facebook.com/davedash"><img src="http://disqus.com/api/users/avatars/facebook-530160304.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://www.facebook.com/davedash">Dave Dash</a>
                </div>
                <a href="#comment-222460871" class="permalink"><time datetime="2011-06-09T16:59:50">2011-06-09T16:59:50</time></a>
            </div>
            <div class="content">You are worse than Delicious!</div>

        <ul class="comments">

        <li class="comment" id="comment-222463870">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://decafbad.com/"><img src="http://disqus.com/api/users/avatars/lmorchard.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://decafbad.com/">Les Orchard</a>
                </div>
                <a href="#comment-222463870" class="permalink"><time datetime="2011-06-09T17:05:52">2011-06-09T17:05:52</time></a>
            </div>
            <div class="content">That's probably my fault, too.</div>

        </li>

        </ul>

        </li>

        </ul>

        </li>

        </ul>

        </li>

        <li class="comment" id="comment-222453814">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://twitter.com/lroberson"><img src="http://disqus.com/api/users/avatars/twitter-14760653.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://twitter.com/lroberson">Lee Roberson</a>
                </div>
                <a href="#comment-222453814" class="permalink"><time datetime="2011-06-09T16:45:53">2011-06-09T16:45:53</time></a>
            </div>
            <div class="content">Whups.</div>

        </li>

        <li class="comment" id="comment-222489874">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://trickyco.de"><img src="http://disqus.com/api/users/avatars/lloydhilaiel.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://trickyco.de">Lloyd Hilaiel</a>
                </div>
                <a href="#comment-222489874" class="permalink"><time datetime="2011-06-09T17:45:00">2011-06-09T17:45:00</time></a>
            </div>
            <div class="content">Have you had much success in customizing the features and display of the injected DISQUS UI?  

Thile there are several knobs in their UI, but the only form of customization that's worked for me is fiddling with external javscript and CSS...  Specifically things like disabling media upload and changing default sort, and threading seem to be no-ops.</div>

        <ul class="comments">

        <li class="comment" id="comment-222505665">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://decafbad.com/"><img src="http://disqus.com/api/users/avatars/lmorchard.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://decafbad.com/">Les Orchard</a>
                </div>
                <a href="#comment-222505665" class="permalink"><time datetime="2011-06-09T18:12:39">2011-06-09T18:12:39</time></a>
            </div>
            <div class="content">Hmm... I haven't even bothered to try customizing yet. I just dropped it in and it vaguely matched the rest of my page style, so I left it alone so far</div>

        </li>

        </ul>

        </li>

        <li class="comment" id="comment-223875231">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href=""><img src="http://disqus.com/api/users/avatars/google-ec18b68fb719cdef24375dc3a0ffb29f.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="">Craig Maloney</a>
                </div>
                <a href="#comment-223875231" class="permalink"><time datetime="2011-06-11T16:00:04">2011-06-11T16:00:04</time></a>
            </div>
            <div class="content">Oh c'mon, there's nothing in the world more fun than updating Wordpress blog every time someone manages to sneeze wrong and cause an exploit. Sheesh, where's your sense of discipline.</div>

        </li>

        <li class="comment" id="comment-231386541">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://marlinspikenestor8435.wordpress.com/"><img src="http://disqus.com/api/users/avatars/jolyonwagg1.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://marlinspikenestor8435.wordpress.com/">jolyonwagg1</a>
                </div>
                <a href="#comment-231386541" class="permalink"><time datetime="2011-06-21T23:52:22">2011-06-21T23:52:22</time></a>
            </div>
            <div class="content">Love to use disqus, and would like to integrate it onto my Wordpress blog for comments, as it is so user friendly, but I am not to hot though on all the HTML stuff, any advice would be greatly appreciated, cheers from across the pond.</div>

        </li>

        <li class="comment" id="comment-286782681">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href=""><img src="http://disqus.com/api/users/avatars/ecmanaut.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="">Johan Sundström</a>
                </div>
                <a href="#comment-286782681" class="permalink"><time datetime="2011-08-15T04:23:30">2011-08-15T04:23:30</time></a>
            </div>
            <div class="content">Your sidebar archive widget was rather cool, layout wise; I bookmarked it as design inspiration, back when it existed.</div>

        <ul class="comments">

        <li class="comment" id="comment-288157091">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://decafbad.com/"><img src="http://disqus.com/api/users/avatars/lmorchard.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://decafbad.com/">Les Orchard</a>
                </div>
                <a href="#comment-288157091" class="permalink"><time datetime="2011-08-16T15:58:00">2011-08-16T15:58:00</time></a>
            </div>
            <div class="content">Hmm, I should see if I can find a way to revive that thing as a JS widget or something</div>

        </li>

        </ul>

        </li>

        <li class="comment" id="comment-300334845">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://www.hopelesscom.de"><img src="http://disqus.com/api/users/avatars/fallenhitokiri.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://www.hopelesscom.de">Timo Zimmermann</a>
                </div>
                <a href="#comment-300334845" class="permalink"><time datetime="2011-09-01T12:48:10">2011-09-01T12:48:10</time></a>
            </div>
            <div class="content">how do you feel about using Disqus for your comments?
Any problems or the urge to write your own JS based commenting system? I just feel a bit uncomfortable with a 3rd party provider for something important like comments...</div>

        <ul class="comments">

        <li class="comment" id="comment-300337460">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href=""><img src="http://disqus.com/api/users/avatars/tiernano.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="">tiernano</a>
                </div>
                <a href="#comment-300337460" class="permalink"><time datetime="2011-09-01T12:54:22">2011-09-01T12:54:22</time></a>
            </div>
            <div class="content">Personally speaking, i have been using Disqus comments on my WordPress
blogs for a while now (couple of years) and its working grand! don't have
 to worry too much about Spam, they manage backups, etc. you can even reply to, or delete comments (if spam does get though) by email, so you can manage them on your phone. </div>

        </li>

        </ul>

        </li>

        </ul>

        </div>
