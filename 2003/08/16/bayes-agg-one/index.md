<p>Despite a reading <a href="http://www.srijith.net/trinetre/archives/2003/08/11/index.shtml#000373">an entry by Srijith</a>
discussing Bayes-based classification as unsuitable
for use in news aggregators, I tied <a href="http://www.spambayes.org">SpamBayes</a>
into my <a href="http://www.decafbad.com/viewcvs.cgi/dbagg/">homebrew news aggregator</a>
and have been trying it out this week.  I know I&#8217;ve been <a href="http://www.decafbad.com/blog/geek/syndicated_whuffie.phtml">talking about it</a>
for awhile, but procrastination and being busy all round kept me from getting
to it.  Funny thing is, when I finally got a chance to really check things out,
the integration was a snap.  I&#8217;d anticipated a bit of work, but was pleasantly
surprised.  I doubt that any other aggregator written in
Python would have a hard time with it.</p>

	<p>If, that is, anyone else wants to do it.  I already knew it wasn&#8217;t
<a href="http://diveintomark.org/archives/2003/07/07/linkdumps_are_like_sex">magic pixy dust</a>
but I figured it might be worth a try.  I will be eating my dogfood
for awhile with this, but I&#8217;m thinking already that what&#8217;s good for spam
might not be so good for news aggregators.</p>

	<p>Srijith&#8217;s <a href="http://www.srijith.net/trinetre/archives/2003/08/11/index.shtml#000373">post</a>
mentions some snags in ignoring some of the semantics of a news item,
such as whether a word appears in the item&#8217;s title or information about
the item&#8217;s source.  I don&#8217;t think that this completely
applies to how I&#8217;m doing classification, since SpamBayes appears to
differentiate between words found in email headers and the body itself.
When I feed an item to SpamBayes for training and scoring, I represent
it as something like an email message, with headers like date, subject,
from, and an &#8220;X-Link&#8221; header for the link.  However, even with this,
I think Srijith&#8217;s got a point when he writes that this method will miss
a lot of available clues for classification.</p>

	<p>Unlike Srijith&#8217;s examples, though, I&#8217;m not trying to train my
aggregator to sift entries into any specific categories.  So far, I&#8217;ve
been trying to get it to discriminate between what I really want to
read, and what I&#8217;m not so interested in.  So, I figured that something
which can learn the difference between spam and normal email could help.
But, although it&#8217;s early, I&#8217;m noticing a few things about the results and
I&#8217;ve had a few things occur to me.</p>

	<p>See, in the case of ham vs spam, I really want all the ham and none of
the spam.  A method to differentiate between these two should be
optimized toward one answer or the other.  SpamBayes offers &#8220;I don&#8217;t
know&#8221; as a third answer, but it&#8217;s not geared toward anything else
in-between.  However, in measuring something like &#8220;interest&#8220;,
inbetween answers are useful.  I want all of the interesting stuff,
some of the sort-of interesting stuff, and a little of the rest.</p>

	<p>This is also a problem for me in deciding to what I
should give a thumbs up and what gets the thumbs down.  Even though
I&#8217;ve subscribed to a little over 300 feeds, every item from each of
them is somewhat interesting to me.  I wouldn&#8217;t have subscribed to the
feed if there wasn&#8217;t anything of interest there, so I&#8217;ve already
biased the content of what I receive.  Some items are more interesting
than others, but the difference between them is nowhere near the
difference of wanted ham vs unsolicited spam.  So, I find myself
giving the nod to lots of items, but only turning down a few.
SpamBayes would like equal examples of both, if possible.</p>

	<p>I&#8217;ll still be playing with this for awhile, but I need to look
around at other machine learning tech.  I&#8217;m just hacking around,
but the important thing is to try to understand the algorithms
better and know how they work and why.  Bayes is in vogue right now,
but as Mark Pilgrim intimated, it&#8217;s not magic.  It&#8217;s just &#8220;advanced&#8221; :)</p>

	<p>In the immortal words of <a href="http://www.spidereyeballs.com/os6/set3/small_os6_d3_3596_sm.html">Mark Jason Dominus</a>: &#8220;You can&#8217;t just make shit
up and expect the computer to know what you mean, retardo!&#8221; </p>
<!--more-->
shortname=bayes_agg_one

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088958">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philringnalda.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e68e9944f50a481a64b5a32fdfc02e0d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philringnalda.com">Phil Ringnalda</a>
                </div>
                <a href="#comment-221088958" class="permalink"><time datetime="2003-08-16T00:54:54">2003-08-16T00:54:54</time></a>
            </div>
            <div class="content">If you want to train a spam classifier quick, you've got to feed it spam. If you want to train an aggregator classifier, you've got to subscribe to more crap. I do my best to throw you a really stupid post once a week or so, but you need a bunch of feeds yammering on and on about nothing much.

I'd recommend using MyRSS or Blogstreet (or your own scraper  if you've got one) on a random selection of Blog*Spot blogs: my RandomFreshBlog bookmarklet seems to turn up an unending supply of training material.</div>
            
        </li>
    
        </ul>
    
        </div>
    