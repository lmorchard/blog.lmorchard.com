---
comments_archived: true
date: '2003-09-29T13:48:28-04:00'
layout: post
title: Dynamic polling times for news aggregators, II
wordpress_id: 484
wordpress_slug: dynamic-polling-freq-too
wordpress_url: http://www.decafbad.com/blog/?p=484
---
<p>
Okay, so that <a href="http://www.decafbad.com/blog/tech/dynamic_feed_scan_times.html">thing with the SQL</a> I did Friday?
I'm not exactly sure what I was thinking with it.  I was doing something
that seems really odd now, trying to collect counts of new items together
by hour, then averaging those hourly counts across a week.  Instead, I'm
trying this now:
</p>

<pre>SELECT
  source,
  'update_period' AS name,
  round(min(24,max(1,(max(1,(iso8601_to_epoch(max(created)) -
    max(now() - (7*24*60*60), iso8601_to_epoch(min(created)))) /
   (60*60))) / count(id))),2) AS value
FROM
  items
WHERE
  created >= epoch_to_iso8601(now() - (7*24*60*60)) 
GROUP BY
  source</pre>

<p>
This bit of SQL, though still ugly, is much simpler.  This leaves out
the subselect, which I think I might have been playing with in order
to build a little graph display of new items over time by source.  What
the above does now is to get an average time between new items for the
past week, with a minimum of an hour, and a maximum of a day.  This
seems to be working much better.
</p>

<p>
An alternate algorithm I've been playing with was suggested in
<a href="http://www.decafbad.com/comments/tech/dynamic_feed_scan_times/#comment-aofdehdefioofcb">a comment</a>
by <a href="http://24.102.209.201/weblogs/ben/">Gnomon</a>,
inspired by TCP/IP's Additive Increase / Multiplicative Decrease.
With this, I subtract an hour from the time between polls when a
poll finds new items, and then multiply by 2 every time a poll
comes up with nothing new.
</p>

<p>
Using the average of new items over time lessens my pummeling
of servers per hour, but the second approach is even lighter
on polling since it's biased toward large leaps backing off
from polling when new items are not found.  I'll likely be trading
off between the two to see which one seems to work best.
</p>

<p>
Hoping that, after playing a bit, I'll settle on one and my
aggregator will play much nicer with feeds, especially once
I get the HTTP client usage to correctly use things like
last-modified headers and ETags.  There's absolutely no reason
for a news aggregator to poll a feed every single hour of a day,
unless you're monitoring a feed that's mostly quiet, except
for emergencies.  In that case, well, a different polling
algorithm is needed, or maybe an instant messaging or pub/sub
architecture is required.
</p>

<p>
<b>Update:</b> As <a href="http://24.102.209.201/weblogs/ben/">Gnomon</a>
has corrected me in comments, I've got the AIMD algorithm mixed up.
What I really should be doing is making quick jumps up in polling
frequency in response to new items (multiplicative decrease of
polling period) and creeping away in response to no new items
(additive increase of polling period).  As he notes, this approach
should make an aggregator jump to attention when clumps of new
posts come in, and gradually get bored over periods of silence.
I've adjusted my code and will be tinkering with it.
</p>

<p>
Also, although <a href="http://24.102.209.201/weblogs/ben/">Gnomon</a> makes
a good point that bloggers and their posting habits are not easily
subject to statistical analysis,
I've further refined my little SQL query to catch sources
which haven't seen any updates during the week (or ever):
</p>

<pre>SELECT 
  id as source,
  'update_period' AS name,
  round(min(24,max(1,coalesce(update_period,24)))) AS value
FROM sources
LEFT JOIN (
     SELECT
      source AS source_id,
            (iso8601_to_epoch(max(created)) -
              max(
                now()-(7*24*60*60),
                iso8601_to_epoch(min(created))
              )
            ) / (60*60) / count(id)
        AS update_period
    FROM items
    WHERE created >= epoch_to_iso8601(now() - (7*24*60*60)) 
    GROUP BY source
) ON sources.id=source_id</pre>

<p>
Also, in case anyone's interested, I've checked <a href="http://www.decafbad.com/cvs/dbagg/lib/dbagg/scan.py?rev=HEAD&content-type=text/vnd.viewcvs-markup">all the above</a>
into CVS.  This beastie's far from ready for prime time, but it
might be interesting to someone.
</p>
<!--more-->
shortname=dynamic_polling_freq_too

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221083781">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2e83224d92ed7f1148f4dd3cdb0e4548&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki">Bill Seitz</a>
                </div>
                <a href="#comment-221083781" class="permalink"><time datetime="2003-09-29T10:11:11">2003-09-29T10:11:11</time></a>
            </div>
            <div class="content">It might be good to step back and prioritize your goals. How important is quickly catching mid-day updates?

I think looking at averages throws things off, considering how "clumpy" I'd guess most update frequencies are. Some thoughts:

* probably makes sense to check each feed at least once per day

* for each feed, look at the average time-of-day of its first-post-of-the-day. Actually, look at a distribution curve, and pick the time at which there's an 80% chance that the first post will have been made (if it's going to be made at all).

* check at that time; if no posting then check 12 hours later?

* if found posting at first check of day, then start that additive/multiplicative process

* regardless of the state of that latter calculation, check the next morning at that time-of-first-post prediction

Parallel idea:

* calc average time between posts like you're doing, but just over the window each day when posts are being made (e.g. 8am-11pm = 15 hrs, not 24 hrs).</div>
            
        </li>
    
        <li class="comment" id="comment-221083784">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/blog">l.m.orchard</a>
                </div>
                <a href="#comment-221083784" class="permalink"><time datetime="2003-09-29T10:39:45">2003-09-29T10:39:45</time></a>
            </div>
            <div class="content">Ooh, good ideas!  I think a lot of this addresses some of the not-quite-yet thought out concerns I have with the simple averaging.  I'll have to poke around some more with this.</div>
            
        </li>
    
        <li class="comment" id="comment-221083786">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://24.102.209.201/weblogs/ben/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=588bdfdda82be46c638d6956c55ebc38&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://24.102.209.201/weblogs/ben/">Gnomon</a>
                </div>
                <a href="#comment-221083786" class="permalink"><time datetime="2003-09-29T11:18:28">2003-09-29T11:18:28</time></a>
            </div>
            <div class="content">I'm afraid that you've credited me with more politeness than I deserve! When I suggested AIMD, I meant that the time between polls should be subject to this scheduling system - that is, the poll interval should increase additively but decrease multiplicatively.

This is not as polite as your interpretation, which definitely backs off very quickly. My reasoning went like this: weblog posts tend to clump, so the best indicator of an upcoming post is a new post...:

 - If there aren't any new posts, lengthen the check interval by a little bit and check again later; keep lengthening the check interval up to a certain limit.
 - If there is a new post, then it's likely that another new post will follow soon, so substantially decrease the poll time (down to a certain limit) and check again soon.

This approach is less biased towards decreasing server load and more biased towards detecting quick clumps of updates, which seem to be the norm. I don't know any human webloggers who have such a predictable posting pattern that they are subject to statistical analysis  ;)</div>
            
        </li>
    
        <li class="comment" id="comment-221083787">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/blog">l.m.orchard</a>
                </div>
                <a href="#comment-221083787" class="permalink"><time datetime="2003-09-29T11:53:46">2003-09-29T11:53:46</time></a>
            </div>
            <div class="content">Oh, duh.  Heh, I've got it in reverse then.  Seems like jumping up / creeping back, now that you've explained it to me again, would better suit the posting styles of bloggers for sure!

Thanks for correcting me!</div>
            
        </li>
    
        <li class="comment" id="comment-221083789">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://bwinton.latte.ca/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=441f5529f1db69e1a18cefb090e2690a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://bwinton.latte.ca/">Blake Winton</a>
                </div>
                <a href="#comment-221083789" class="permalink"><time datetime="2003-09-29T14:00:39">2003-09-29T14:00:39</time></a>
            </div>
            <div class="content">I was thinking along the same lines as Bill, in that you know that most webloggers have to sleep and eat sometime, so if you  could take advantage of this knowledge, you'ld be ahead of the game.

My thoughts on how to do it would be to break the day into blocks of time (start with hours, say), and build a histogram of how many posts fit into each block.  Then, you could collapse the series of hours where nothing was posted into a big block, and split any hours where something was posted into two sections, to average out the number of posts per hour.  Then, if my theory is correct, you can poll once per block of time, and would have a reasonable chance of getting a new post.

Some notable flaws with the algorithm:
1. It fails to account for whole days where there's nothing posted.  This might be overcome by having your initial blocks of time be the days of the week.
2. It fails to account for the relationship (or the average time) between posts.  So if someone posts a lot at 9:00 or 10:00, but never both at 9:00 and 10:00, my theory will still check the 10:00 time even if something was found at 9:00.  I can't think of a way to get around this, off the top of my head.

Another way of thinking of this idea is pre-calculating a guess at the fall-off, based on previous posts.</div>
            
        </li>
    
        </ul>
    
        </div>
    