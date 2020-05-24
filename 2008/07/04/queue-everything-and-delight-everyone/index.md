This is a blog post I've had simmering in my brainmeats for well over a year or two.  I'm suddenly inspired to break blog-radio-silence and get it out of my head.

From <a href="http://www.russellbeattie.com/blog/let-the-microblogs-bloom">Let the microblogs bloom - RussellBeattie.com</a>:

<blockquote>Once this is widely accepted (and I'm sure there are many that would argue with me), the thing that will separate these types of services won't be whether they stay up (ala Twitter), but how fast your subscription messages are updated. Some services might be smaller or offer more features but not update as quickly whereas others will pride themselves on being as close to real-time as possible. The key is that it's all about messaging, not publishing. (Oh, and this also facilitates federation as well, but that's another topic).</blockquote>

See also: <a href="http://randomfoo.net/blog/id/4182">Rearchitecting Twitter: Brought to You By the 17th Letter of the Alphabet - random($foo)</a>

One of the problems it seems most modern web apps face is the tendency to want to do everything all at once, and all in the same code that responds directly to a user.  Because, while you're in there building a user interface, it's *easy* to implement everything else that needs to happen in that same UI module or library.

Someone wants to post a bookmark?  Someone wants to post a message?  Well, of course you want the system to cross-reference and deliver that new piece of User Generated Content through every permutation of tag, recipient, keyword, and notification channel supported by your system.  

**But**, do you *really* have to do everything all at once—while the person who generated that content is tapping his or her foot, waiting for the web interface to respond with feedback?  Are all of these things immediately vital to the person watching the browser spin, *right now*?  

No.  Your user wants to get on with things.  He or she wants to see the submitted content get accepted and, as feedback and confirmation, see it reflected in a personal view immediately.  Does it matter—to *this person*, at *this moment*—whether it shows up *simultaneously* in a friend's inbox, the public timeline, a global tag page, or even an RSS or Atom feed?

Again, no, simultaneity doesn't really matter—because no human beings actually appreciate it.  Instead, imagine a ripple effect of concentric social and attention contexts with associated people spreading out from the original submission.  (This probably rates the creation of a diagram someday.)  

* To make the person who's submitting something happy, offer feedback visible in their own personal context in under 50-200 milliseconds.  (That is, less than half-a-second at worst, in people terms.)

* The next person to delight is someone following the first person's published content—and humanly speaking, delays of *tens of thousands of milliseconds* can be acceptable here.  (That is, 1-10 seconds at worst, in people terms.)

* Finally, you can start worrying about strangers, allowing the content to propagate to tag pages, keyword tracking pages, and other public views—and I'd assert that delays of *hundreds of thousands of milliseconds* are acceptable here.  (That is, 1-2 minutes at worst, in people terms.)

The idea here is that the social structure can help you scale, while still delighting people.  Even with these delays, the system is still better at getting the word out than the original content creator would be at notifying all the others involved with an out-of-band system like IM or email.  And that's at worst—on most good days, all the delays should tend to be on the order of seconds or less.

And how do you do all of this?  Use queues.  Sure, the original submission of content can and should be done all at once—just enough to get the content into the user's collection.  Then, queue a job for further processing and get out of the way.  In fact, just queue one job from the user interface—the processor of *that* queue can then queue further jobs for all the other individual processing tasks that are likely susceptible to plenty of parallel processing and horizontal scaling.

Meanwhile, the original user creating content has been thanked for their submission and life goes on.  In fact, their life may include going on to submit many more pieces of content in rapid succession, thanks to your delightfully responsive web user interface.  

And, in the end, that's really the purpose of a web-based content creation interface—accepting something as quickly as possible to make the user happy enough to continue submitting more.  The other part of the user interface, retrieval, serves simply to get the original content distributed as fast as can be reasonably expected.

Now, preparing for fast retrieval is another story.  The flip side to processing queues are message inboxes—expect content duplicated everywhere and fetched simply, rather than using cleverly expressed SQL joins that bring a system to its knees.  But, that's another post altogether. :)

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221083313">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://fatalerror.in"><img src="http://www.gravatar.com/avatar.php?gravatar_id=15516fd23722eeca86b8ea91738eea4b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://fatalerror.in">shyam</a>
                </div>
                <a href="#comment-221083313" class="permalink"><time datetime="2008-07-04T21:12:46">2008-07-04T21:12:46</time></a>
            </div>
            <div class="content"><p>Interesting bits of conversation happening all over the place regarding queues and the irony of it all - the much maligned Java has had workqueues since the early days.</p>

<p>What everyone will learn, rather painfully in in cases like Twitter, is that all data is not created, consumed or processed equally. If you write your system which treats data equally you'll wind up with many Twitters all over the place.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083314">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221083314" class="permalink"><time datetime="2008-07-04T21:37:30">2008-07-04T21:37:30</time></a>
            </div>
            <div class="content"><p>Oh, definitely.  Work queues are not a new thing at all.  It's just that I think there're a lot of modern web app builders who skipped Java "enterprise" software—skipped, or hoped to run away—and are rediscovering the whole set of problems.  Maybe the solutions will be less over-engineered this time.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083315">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://mikewarot.blogspot.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=04f21a4b6a007063d191b66c34f71710&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://mikewarot.blogspot.com">Mike Warot</a>
                </div>
                <a href="#comment-221083315" class="permalink"><time datetime="2008-07-04T21:40:15">2008-07-04T21:40:15</time></a>
            </div>
            <div class="content"><p>The thing that drives me nuts about twitter is that the core data rate is only about 30k/second... yet it kept going down. It's easy to spit out a broadcast to a subnet and never even miss a packet if there are only 100 of them per second or so. There's no reason on god's green earth that twitter should be anywhere near overloaded.</p>

<p>Bad architecture, on the other hand, is the work of Satan. ;-)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083317">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://simonwillison.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=ac7005eff7720218df4cf0c72ddf6a3d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://simonwillison.net/">Simon Willison</a>
                </div>
                <a href="#comment-221083317" class="permalink"><time datetime="2008-07-04T21:40:39">2008-07-04T21:40:39</time></a>
            </div>
            <div class="content"><p>Thank you! I've been trying to put my thumb on why queues are so interesting for months; this expresses it perfectly.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083319">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.wachob.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5c8ad784d2b5d12d57cf707dded1d58c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.wachob.com">Gabe Wachob</a>
                </div>
                <a href="#comment-221083319" class="permalink"><time datetime="2008-07-04T22:54:10">2008-07-04T22:54:10</time></a>
            </div>
            <div class="content"><p>Usually I would have something serious to say in agreement with you, because I do so much agree with you.</p>

<p>But I have just one comment: </p>

<p>DUH!!!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083320">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.docuverse.com/blog/donpark/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=88f2ee32d146425a422f58f8eab5424b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.docuverse.com/blog/donpark/">Don Park</a>
                </div>
                <a href="#comment-221083320" class="permalink"><time datetime="2008-07-06T05:16:32">2008-07-06T05:16:32</time></a>
            </div>
            <div class="content"><p>Good suggestions. For social services like Twitter, I would also add one more item:</p>

<p>Prioritize by Relationship</p>

<p>For example, two-way Twitter relationships (mutual-follow or recent @ or direct message exchange) should be refreshed before one-way. One can go further by placing higher priority on users whom poster sent messages to or received from within past X-hours.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083323">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.rabbitmq.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=6f355ae1f33640b777cae294092116ff&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.rabbitmq.com">alexis</a>
                </div>
                <a href="#comment-221083323" class="permalink"><time datetime="2008-07-10T12:35:25">2008-07-10T12:35:25</time></a>
            </div>
            <div class="content"><p>er... eventually consistent social graphs anyone?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083324">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://cosmicrealms.com"><img src="http://disqus.com/api/users/avatars/Sembiance.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://cosmicrealms.com">Robert Schultz</a>
                </div>
                <a href="#comment-221083324" class="permalink"><time datetime="2008-07-10T13:36:22">2008-07-10T13:36:22</time></a>
            </div>
            <div class="content"><p>I agree with everything you've said. Especially the last part, duplicating data in the format it will be retrieved in rather than using complicated and CPU intensive SQL queries. This is especially true for any sort of statistics or reporting. I learned this by seeing my website's statistics growing slower and slower to retrieve as more and more traffic caused the database to become larger and larger and all of a sudden those queries that ran nearly instantly, even with good indexing were taking several seconds to return.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083326">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8acae029d9833597f8eb1623f94ef7e6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">citric</a>
                </div>
                <a href="#comment-221083326" class="permalink"><time datetime="2008-07-10T21:49:19">2008-07-10T21:49:19</time></a>
            </div>
            <div class="content"><p>Web apps doing things while the user waits unnecessarily is an old phenomenon. I think it's often a matter of developers not wanting to (and/or being politically unable to) venture into what they consider the sysadmin's domain. Take the way-too-common case of apps that make the client wait while it does housekeeping. Why isn't this in a cron job? One reason is maybe this is KewlOSSBlogWikiPackage and it's simpler to say "just untar the package under htdocs and you're done" instead of saying "also, unpack these scripts in a non-servable area and set them up to run hourly, but not all at the same time; stagger them a little. And run them with the same UID your web server is running as". But we end up with a lot of apps that (badly) reimplement basic tools their OS ships with in the first place.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083327">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki"><img src="http://www.gravatar.com/avatar.php?gravatar_id=1d7a7610cb0f02de44be3c4186f82ac3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://webseitz.fluxent.com/wiki">Bill Seitz</a>
                </div>
                <a href="#comment-221083327" class="permalink"><time datetime="2008-07-28T21:23:06">2008-07-28T21:23:06</time></a>
            </div>
            <div class="content"><p>I wonder if you're still setting the bar too high for low-priority connections. I mean, microblogging <em>isn't</em> really messaging, and maybe isn't (shouldn't-be?) conversation. </p>

<p>So why wouldn't 10-15min be good enough?</p>

<p>What % of "messages" are <em>read</em> instantly after they hit an inbox?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083328">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.yukes.com/2008/11/jimdo-dropr-php-messa"><img src="http://www.gravatar.com/avatar.php?gravatar_id=151a00c8656ea5c733dff2ac3adb27a3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.yukes.com/2008/11/jimdo-dropr-php-messa">Jay Yukes</a>
                </div>
                <a href="#comment-221083328" class="permalink"><time datetime="2008-11-23T10:35:55">2008-11-23T10:35:55</time></a>
            </div>
            <div class="content"><p>I had to solve a similar problem.  Needed the fastest possible response, so had to rule out interacting with the Database directly from the web app.  Used PHP message queue Dropr to defer all DB work.  It is very fast, easily over 1000 messages/second</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083329">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=70c1729db01a21a2a9d236f336e3beff&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">jmxz</a>
                </div>
                <a href="#comment-221083329" class="permalink"><time datetime="2009-02-13T20:00:13">2009-02-13T20:00:13</time></a>
            </div>
            <div class="content"><p>Wow those comments make me feel old.  I remember when these java queues everyone's referring to reminded me of how I had a VAX dedicated to queuing and scheduling batch jobs for a Cray.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083331">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://chr.ishenry.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=4ab185c23be3076c02c2b7b7f48062d1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://chr.ishenry.com">Chris Henry</a>
                </div>
                <a href="#comment-221083331" class="permalink"><time datetime="2009-06-11T20:09:47">2009-06-11T20:09:47</time></a>
            </div>
            <div class="content"><p>Handling load is probably one of the biggest problems facing websites today.  Queueing is definitely the way to go, but like you said, sites need the type of architecture where it's easy to deploy services to different machines.  Usually by the time the site is under load, it's too late...</p></div>
            
        </li>
    
        <li class="comment" id="comment-221083333">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://9fans.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5b5f08225c299dd0955eb13d6b5c043c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://9fans.net">maht</a>
                </div>
                <a href="#comment-221083333" class="permalink"><time datetime="2010-05-04T14:50:05">2010-05-04T14:50:05</time></a>
            </div>
            <div class="content"><p>I use Inotify as my queue messaging system</p>

<p>http://maht0x0r.blogspot.com/2009/06/serialising-multiple-writers-in-shell_20.html</p>

<p>Inotify can wait on MOVED_TO or CLOSE_WRITE events so that you can add them to the queue when the upload has finished.</p>

<p>It should also be noted that this is a mnethod of load balacing too. Instead of 1000 parallel thumbnails being produced all context switching away, you can determine how many processes get spawned, use the OS' resource managing features etc.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    