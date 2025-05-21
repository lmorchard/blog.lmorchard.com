<p>Today, <a href=http://www.decafbad.com/cvs/dbagg/">my aggregator</a> got
the following SQL worked into its <a href="http://www.decafbad.com/cvs/dbagg/lib/dbagg/scan.py?rev=HEAD&content-type=text/vnd.viewcvs-markup">feed poll scheduling machinery</a>:</p>

<pre>SELECT id as source,
       'update_period' as name,
       max(1, 1/max((1.0/24.0),
                    sum(update_count)/(7*24))) AS value 
FROM sources 
LEFT JOIN (
    SELECT source AS count_id,
                round(iso8601_to_epoch(created)/(60*60)) AS hour, 
                count(id) AS update_count 
    FROM items 
    WHERE created>epoch_to_iso8601(now()-(7*(24*60*60))) 
    GROUP BY hour
) ON id=count_id
GROUP BY source
ORDER BY value</pre>

<p>
It's likely that this is really nasty, but I have only a street-level
working knowledge of SQL.  Also, a few of the date functions are
specific to how I've <a href="http://pysqlite.sourceforge.net/documentation/pysqlite/node10.html#SECTION004231000000000000000">extended sqlite in Python</a>.  It works though, and
what it does is this:
</p>

<p>
For each feed to which I'm subscribed, work out
an average time between updates for the past week, with a maximum
period of 24 hours and a minimum of 1 hour.
</p>

<p>
My aggregator does this daily, and uses the results to determine how
frequently to schedule scans.  In this way, it automatically backs off
on checking feeds which update infrequently, and ramps up its polling
of more active feeds.  This shortens my feed downloading and scanning
time, and is kinder in general to everyone on my subscription list.
</p>

<p>
Next, among other things, I have to look into making sure that the
HTTP client parts of this beast pass all the
<a href="http://diveintomark.org/tests/client/http/">aggregator client
HTTP tests</a> that <a href="http://diveintomark.org/">Mark
Pilgrim</a> put together.
</p>

<p>
<b>Update</b>: Well, it seemed like a good idea, anyway.  But, on
further examination, it has flaws.  The most notable is that it
assumes a polling frequency of once per hour.  This works right up
until I start changing the polling frequency with the results of the
calculation.  I haven't poked at it yet, but maybe if I take this
into account, it'll be more accurate.
</p>

<p>
On the other hand, I've also been thinking about a much simpler
approach to ramping polling frequency up and down:  Start out at
a poll every hour.  If, after a poll, no new items are found,
double the time until the next poll.  If new items were found,
halve the time until the next poll.</p>

<p>
Provide lower and upper limits to this, say between 1 hour and 1
week.  Also, consider the ramp up and ramp down factor as a variable
setting too.  Instead of a factor of 2, maybe try 1.5 or even 1.25 for
a more gradual change.  To go even further, I wonder if it would be
valuable to dynamically alter this factor itself, to try to get the
polling time zeroed in on a realistic polling time.
</p>

<p>
Okay.  There the simpler approach leaves simplicity.  I'm sure there's
some decently elegant math that could be pulled in here.  :)
</p>
<!--more-->
shortname=dynamic_feed_scan_times

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087768">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://24.102.209.201/weblogs/ben/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=588bdfdda82be46c638d6956c55ebc38&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://24.102.209.201/weblogs/ben/">Gnomon</a>
                </div>
                <a href="#comment-221087768" class="permalink"><time datetime="2003-09-26T09:56:09">2003-09-26T09:56:09</time></a>
            </div>
            <div class="content">Why not just go the TCP/IP route - Additive Increase / Multiplicative Decrease? Start by setting the check-interval to one hour (or whatever). For each feed, if a new post is found, cut the check-interval for that feed by half; if no new post is found, increase the check-interval by an hour.

It's not optimal, and it won't automagically zero in on the predicted post times of individual feeds, but it strikes a nice balance between bandwidth politeness, update rapidity and conceptual simplicity. The constant values (initial check-interval, check-interval increment, check-interval multiplier) can be tweaked for different behavioural styles.</div>
            
        </li>
    
        <li class="comment" id="comment-221087769">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/blog">l.m.orchard</a>
                </div>
                <a href="#comment-221087769" class="permalink"><time datetime="2003-09-26T11:04:24">2003-09-26T11:04:24</time></a>
            </div>
            <div class="content">Hmm...  I knew that this was something that someone had already handled somewhere.  :)  I'm just not all that familiar with the details of TCP/IP, but this sounds pretty much like a workable approach I'd like to go with.</div>
            
        </li>
    
        <li class="comment" id="comment-221087770">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/blog">l.m.orchard</a>
                </div>
                <a href="#comment-221087770" class="permalink"><time datetime="2003-09-26T11:07:00">2003-09-26T11:07:00</time></a>
            </div>
            <div class="content">Oh!  For a second I thought that what you're suggesting was basically what I was already working on with my multiplying/dividing by a factor...  But you're talking about something that ADDS to increase and MULTIPLIES to decrease, which is something much more biased to back off than ramp up, which seems very polite to me.  Yay!</div>
            
        </li>
    
        </ul>
    
        </div>
    