---
comments_archived: true
date: '2006-11-02T10:31:05-05:00'
layout: post
title: Firefox 2.0 breaks client-side XSL for RSS and Atom feeds
wordpress_id: 1012
wordpress_slug: firefox-20-breaks-client-side-xsl-for-rss-and-atom-feeds
wordpress_url: http://decafbad.com/blog/2006/11/02/firefox-20-breaks-client-side-xsl-for-rss-and-atom-feeds
---
This seems like a small thing, but it bothers me:  For RSS and Atom feeds, Firefox ignores client-side XSL transformations in favor of its own new enhanced rendering.  The only way to work around this issue is to stuff 512 bytes or more of XML comment text before the initial feed tag.  [It's been marked as a bug][bug] for some months now - but after reading the discussion therein, I don't have much hope of this being fixed.  The gist of the discussion appears to boil down to this: "Firefox knows best, consistency is good, and anyone using client-side XSL on feeds is really after what we're doing anyway.  Thus, WONTFIX."

This strikes me as a bit condescending, presumptuous, and quite broken.  I don't care if [it's what IE 7 does][ie7] - they're broken too.  This breaks [FeedBurner][fb]'s XSL presentation, which I like though admittedly don't use for my own stuff.  This breaks the feed-styling XSL I've done at jobs past, which rolled in customer-demanded metrics tracking and branding.  And I don't care whether or not the Firefox team considers these or other use cases valid - that's up to me to decide.

This "feature" makes a special case breaking client-side XSL for XML documents that happen to have an "&lt;rss" or "&lt;atom" in the first 512 bytes.  That sucks.  I'd rather the browser left it up to me as a site author whether to follow Firefox's idea of consistency, or whether to happily shoot myself in the foot with my own decisions.

[bug]: https://bugzilla.mozilla.org/show_bug.cgi?id=338621
[fb]: http://www.feedburner.com/fb/a/home
[ie7]: http://blogs.msdn.com/rssteam/articles/PublishersGuide.aspx

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221083664">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8f428369088902ba8149d27e1ac2423d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Len Lynch</a>
                </div>
                <a href="#comment-221083664" class="permalink"><time datetime="2006-11-02T19:26:50">2006-11-02T19:26:50</time></a>
            </div>
            <div class="content"><p>They should make this a tunable and provide "over riding" the portable behavior with their own value-minded agenda.  That is, if there is a demand for it.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083665">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://decafbad.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=ab21890e84fd31ff0d651d77bc82d118&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://decafbad.net">Craig</a>
                </div>
                <a href="#comment-221083665" class="permalink"><time datetime="2006-11-02T21:40:09">2006-11-02T21:40:09</time></a>
            </div>
            <div class="content"><p>This should definitely be something configurable, even if it's one of those deep-dive configuration options. Taking functionality away just because the development team "knows better" is hubris best left for the likes of Microsoft. That, and I use Firefox's XML reader to validate XML for RSS feeds. If that functionality is going away in later builds, that gives me less reason to update.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083667">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.joegrossberg.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=f288a8afe5302a16a366d5e9d34f2fec&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.joegrossberg.com">Joe Grossberg</a>
                </div>
                <a href="#comment-221083667" class="permalink"><time datetime="2006-11-02T22:11:56">2006-11-02T22:11:56</time></a>
            </div>
            <div class="content"><p>Len:</p>

<p>And what would the default be?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083670">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221083670" class="permalink"><time datetime="2006-11-04T08:58:58">2006-11-04T08:58:58</time></a>
            </div>
            <div class="content"><p>Why is it a problem when browsers with aggregator functionality disregard XSLT stylesheets, but when dedicated aggregators do it’s not?</p>

<p>My take: if you want to control the presentation, check the <code>Accpept</code> (and possibly <code>Referer</code>) header and transform on the server.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083672">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://talideon.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e698f564ac90c4c248f1f678caafd624&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://talideon.com/">Keith Gaughan</a>
                </div>
                <a href="#comment-221083672" class="permalink"><time datetime="2006-11-05T03:27:37">2006-11-05T03:27:37</time></a>
            </div>
            <div class="content"><p>Why shouldn't it? Because in the former case, it's being viewed in a <em>browser</em> and in the latter, an <em>aggregator</em>. I'm not just being facetious here; the browser functionality shouldn't play second fiddle to the aggregator functionality unless <em>told</em> to do so.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083674">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.jm3.net/"><img src="http://disqus.com/api/users/avatars/jm3.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.jm3.net/">John Manoogian III (jm3)</a>
                </div>
                <a href="#comment-221083674" class="permalink"><time datetime="2006-11-05T23:30:17">2006-11-05T23:30:17</time></a>
            </div>
            <div class="content"><p>yeah, that's totally ridiculous and really lame that they did that.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083675">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://tailrank.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=3f322b1d5add87ae016967212a2067ba&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://tailrank.com">Kevin Burton</a>
                </div>
                <a href="#comment-221083675" class="permalink"><time datetime="2006-11-06T17:57:29">2006-11-06T17:57:29</time></a>
            </div>
            <div class="content"><p>This bothers me too. I think Safari has the same problem.</p>

<p>They need to give publishers a way to override this behavior.  Maybe an XML processing instruction...</p>

<p>Kevin</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083677">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221083677" class="permalink"><time datetime="2006-11-07T20:57:22">2006-11-07T20:57:22</time></a>
            </div>
            <div class="content"><p>Aristotle:  Because aggregators tend to me much more purpose-focused and support more of the vocabulary in feeds.  The Firefox default view sucks, and its preemption makes it hard for me to fix that for the elements I know I'm using. As for checking headers and transforming on the server... that defeats caching as we have it set up, which I don't feel like reworking because Firefox has decided it knows what's better for me.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083679">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.basa.nl/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=dfd9abbba5150791d0506803829211bf&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.basa.nl/">basa</a>
                </div>
                <a href="#comment-221083679" class="permalink"><time datetime="2006-11-10T20:28:06">2006-11-10T20:28:06</time></a>
            </div>
            <div class="content"><p>It is clearly wrong for brwosers to decide what is best for every website. A processing instruction is probably already in place but is simply being ignored by the browsers in question. The behaviour of the browsers should IMHO be to (1) either handle processing-instructions if they exist, (2) check the content-type (mime) of the document and unless application/rss+xml handle it as xml. I think that's the only approach that matches the specifications and the real world.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083681">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221083681" class="permalink"><time datetime="2006-11-12T01:48:52">2006-11-12T01:48:52</time></a>
            </div>
            <div class="content"><p>That’s fine in theory.</p>

<p>In practice, aggregators tend not to care about the MIME type of feeds, so most feeds today are served as <code>text/html</code>. (Yes, you read that right. A whole lot of the rest are served as <code>text/plain</code>.) The same is true of images and videos, btw. There is no way to avoid content sniffing.</p>

<p>The ideal approach would have been to honour the PI <em>only</em> if the feed is served as <code>text/xml</code> or <code>application/xml</code>, eg. explicitly as generic XML rather than as a feed. In case of sniffed feeds or feeds served with the proper MIME type, the PI would be ignored (as client apps are free to do; they are under no obligation to honour the PI), but authors would still have a clean and obvious option for getting what they want.</p>

<p>Except that RSS 2.0 does not have a MIME type and is therefore served as <code>text/xml</code> or <code>application/xml</code>.</p>

<p>This is what happens when people who have no clue of how the web works come up with things to put on the web: you end up with no good way of implementing their crud.</p>

<p>The only thing I can think of that could have been better than what we have now would be to specify a new PI to explicitly disable the default feed view. (Although I’d want to have maybe add a yellow strip that lets me disable the custom view or something like that; withholding from the reader the ability to be the ultimate arbiter of his own experience is Wrong.)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083684">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://starling.us/atom/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8b09a229fac82b3a6b7b61e0db95408c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://starling.us/atom/">Gan Uesli Starling</a>
                </div>
                <a href="#comment-221083684" class="permalink"><time datetime="2007-02-22T10:22:23">2007-02-22T10:22:23</time></a>
            </div>
            <div class="content"><p>Yes, this is MOST annoying. I had put off writing a feed waiting until the formats should settle out. I ended up delaying first until Atom 1.0, and then longer yet until I should have some free time...until just a couple of weeks ago. Then, working in Firefox 1.5.0.1 I blissfully labored over an XSLT to go with it. Spent quite a while at that. Only when I have it working pretty much as desired do I bother to check it at work in IE7...and ARGHHH!...all my time and effort wasted.</p>

<p>And oh, by the way, I had also written a howto for Atom 1.0...and XSLT. So I search GOOGLE high and low until I find someone who writes of how to turn the feature off in IE7...and ammend my howto for that instruction. Now I must do so for Firefox 2.0...and Safari...it seems. Alas and alack.</p>

<p>How about Opera? I recall from some years back that Opera was among the first and best of early adopters for XSLT. It looks as if my howto for Atom 1.0 and XSLT is going to be largely composed of workarounds for this mis-feature.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083688">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=916cc61b7337d47614cfb29b3f593e9d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jeff Wilkinson</a>
                </div>
                <a href="#comment-221083688" class="permalink"><time datetime="2007-03-14T20:29:34">2007-03-14T20:29:34</time></a>
            </div>
            <div class="content"><p>what a pain.  fixing this will definitely get my vote.  I do some things in XSL stylesheets beyond just showing the straight feed text, so overriding it just blows all that away.  Grr.</p>

<p>They should definitely show the user's stylesheet if one is spec'd, and only use their own if there is none defined from the RSS/XML.</p>

<p>fwiw, here's the one feed that's broken by this:
http://www.centralpc.org/sermons/sermons.xml</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083689">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://quikonnex.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=19cf31bfd8e6a4d1e95d9fdd9cf4c0d9&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://quikonnex.com">Jim Gray</a>
                </div>
                <a href="#comment-221083689" class="permalink"><time datetime="2007-07-06T23:39:30">2007-07-06T23:39:30</time></a>
            </div>
            <div class="content"><p>I resisted upgrading to FF 2.0 for quite awhile and just took the plunge. I've very disappointed that Firefox took this route of overriding XLST. I like Gan, I spent quite awhile designing an XLST stylesheet to render Quikonnex.com produced feeds in a user readable format to include providing many quick subscribe links for popular aggregators. At least IE7 allows for their default view to be turned off. Firefox and Safari do not even provide an option.</p>

<p>AND... the options Firefox provides: Live Bookmarks, Google, Yahoo, and Bloglines. Who did they sell out to?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083692">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.randommouse.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=210f788d30b35e6489c5c0a97c7c2dcf&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.randommouse.com/">Stephen</a>
                </div>
                <a href="#comment-221083692" class="permalink"><time datetime="2008-03-17T01:48:19">2008-03-17T01:48:19</time></a>
            </div>
            <div class="content"><p>i found that when an absolute URL is used for the  tag in FF 2.0.0.12 (maybe elsewhere) the specified XSL stylesheet is ignored. remove the http:// in the tag and the styling comes back. very annoying. removing the  tag seems to be the solution.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083694">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.randommouse.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=210f788d30b35e6489c5c0a97c7c2dcf&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.randommouse.com/">Stephen</a>
                </div>
                <a href="#comment-221083694" class="permalink"><time datetime="2008-03-17T01:49:33">2008-03-17T01:49:33</time></a>
            </div>
            <div class="content"><p>my last post should say "link tag". hard to understand without that bit of information!</p></div>
            
        </li>
    
        </ul>
    
        </div>
    