---
comments_archived: true
date: '2003-06-25T19:12:08-04:00'
layout: post
title: GUIDs in RSS rock
wordpress_id: 431
wordpress_slug: guids-in-rss-rock
wordpress_url: http://www.decafbad.com/blog/?p=431
---
<blockquote cite="http://backend.userland.com/permalinksNewsAggregators">Guids sure have a funny name, but they're quite useful. If your weblog tool supports them, use them. If not, ask the developer to add the support. It's not very hard.
<br /><br />
Further, I strongly believe that all aggregators and readers should pay attention to guids where they are available. It's a convenience that many users will appreciate, especially people who are in a hurry</blockquote>
<div class="credit" align="right"><small>Source:<cite><a href="http://backend.userland.com/permalinksNewsAggregators">Guids are not just for geeks anymore ;-></a></cite></small></div>
<br /><br />
Haven't really been saying much lately about the recent plunge, albeit more amiable this time, back
into the <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> and weblog syndication frey.  Mostly because I haven't had the time, and mostly because
people more eloquent than I were already saying what I thought.
<br /><br />
In the meantime, I've been working, and puttering around with 
<a href="http://www.decafbad.com/viewcvs.cgi/dbagg/" target="_top">my own aggregator</a> as spare time comes up.
And you know, I'm tired of having to come up with some mechanism to detect new entries.
This GUID thing is what I need.  I don't want to run MD5 on another <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> item, and I don't
care to track the minor edits people do on their entries, like Dave said.
<br /><br />
Personally, I think the GUID <strong>should</strong> be the permalink, if at all possible.  I used 
to think that that was what the link of an <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> item should be, but then I never really
maintained a weblog in the quote-link-comment style for long stretches.  My entries
aren't usually completely <strong>about</strong> someone else's article.  But, some weblogs are 
like that.  So, link points to a subject under comment, GUID identifies the entry and
ideally does it via permalink.
<br /><br />
Nifty.
<!--more-->
shortname=guids_in_rss_rock

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085015">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://mac.against.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=fd54edc39361f4c9e875cc73904664c4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://mac.against.org">Rui Carmo</a>
                </div>
                <a href="#comment-221085015" class="permalink"><time datetime="2003-06-25T20:14:33">2003-06-25T20:14:33</time></a>
            </div>
            <div class="content">MD5-to-GUID is also my basic approach to any kind of "data tagging" these days (on both PHP and Perl). It just saves so much time, even though it can look a little wierd when the GUIDs are visible.

The thing about permalinks is that some people like them readable and meaningful - but hey, you do the coding, you make the choices. :)

BTW, I'm curious about your RSS stuff, since I've just dropped in after jotting down some thoughts on Bayesian filtering over at http://mac.against.org/time/mac.2003-06-26 (please forgive the CSS and layout bugs, I'm redecorating). I'd kill for Bayesian categorization in Mail.app and a matching RSS reader, so if you can find the time, let us know more about it :)</div>
            
        </li>
    
        <li class="comment" id="comment-221085017">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.voidstar.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4ca7f18e6a976271f93b665a6a84cec4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.voidstar.com">Julian Bond</a>
                </div>
                <a href="#comment-221085017" class="permalink"><time datetime="2003-06-26T04:12:34">2003-06-26T04:12:34</time></a>
            </div>
            <div class="content">Puzzled by your last para. "Personally, I think the GUID should be the permalink, if at all possible. I used to think that that was what the link of an RSS item should be, but then I never really maintained a weblog in the quote-link-comment style for long stretches." Are you sure you've got that the right way round? I also agree that the link should be the permalink is at all possible, and I prefer that to link being the URL of some external article mentioned in the text of description. And that's *because* not all weblog entries are "quote-link-comment".</div>
            
        </li>
    
        <li class="comment" id="comment-221085018">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/blog">l.m.orchard</a>
                </div>
                <a href="#comment-221085018" class="permalink"><time datetime="2003-06-26T10:08:28">2003-06-26T10:08:28</time></a>
            </div>
            <div class="content">Julian:

Hmm, maybe that does need some clarification:  I do actually think that the "link" should be a link to which the entry refers, for the case of q-l-c-style entries.  I say this because there exist weblog entries in this style, a point that Dave Winer has reiterated many times and that I just understood recently.

So, what I say is this:  Use the GUID to identify at your entry, in all cases, preferrably by permalink.  Only use the link tag if your entry happens to be mainly a comment on some other resource, and use the link tag to point at it.  

I'd *actually* wished that things worked out such that link points to the entry, and links under discussion remain in the description or body of the entry.  But since there's a disagreement over it, I'd just as soon give up the link tag to link bloggers and assume the GUID tag for permalinks and have done with it.

This makes sense to me as a way to clear up the variations from blog to blog - right now, I'm never quite sure where I'll end up when I click on the link in my aggregator.</div>
            
        </li>
    
        <li class="comment" id="comment-221085019">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.seizethedave.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=82d457ebf5b4b9dc0a17c8cf4f32d92f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.seizethedave.com/">seizethedave</a>
                </div>
                <a href="#comment-221085019" class="permalink"><time datetime="2003-07-01T15:01:14">2003-07-01T15:01:14</time></a>
            </div>
            <div class="content">So, it's just talking about a unique identifier such as the URL to the post, not the 32-bit {4A4DBF1F-81D8-4063-AE33-F6D1F942BB13} GUID MS cooked up?</div>
            
        </li>
    
        </ul>
    
        </div>
    