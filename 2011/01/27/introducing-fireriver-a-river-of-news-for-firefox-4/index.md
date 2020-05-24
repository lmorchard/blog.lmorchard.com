**TL;DR**: *I have a history of building news aggregators. Now, I've built one as an addon for Firefox 4.*

<a href="https://addons.mozilla.org/en-US/firefox/addon/fireriver/"><img src="http://decafbad.com/blog/wp-content/uploads/2011/01/fireriver-index.png" alt="Fireriver" border="0" width="600" height="375" /></a>

This is Fireriver, [an **experimental** add-on for Firefox 4](https://addons.mozilla.org/en-US/firefox/addon/fireriver/). You can [find the source code on GitHub](https://github.com/lmorchard/fireriver).

[River of News]: http://groups.google.com/group/river-of-news/browse_thread/thread/dea70319e7cd1585  ""My eyes do the work, not my mouse.""

Fireriver uses Live Bookmarks to build a [River of News][] in your browser. No unread counts, no 3-pane view like an email client. Just paddle down the page with the space bar or your scroll wheel. 

Organize the Live Bookmarks into folders to split things up into multiple rivers—which is not a strict River of News, per se. But, I like using them to focus on particular topics or priorities I happen to have time for.

<img src="http://decafbad.com/blog/wp-content/uploads/2011/01/Screen-shot-2011-01-26-at-8.55.46-PM.png" alt="Screen shot 2011-01-26 at 8.55.46 PM.png" border="0" width="600" height="475" />

It also displays a more obvious notification when a site has a feed and lets you add a new Live Bookmark subscription to the Fireriver folder with one click. (I'm considering splitting this feature off into its own small add-on.)

<img src="http://decafbad.com/blog/wp-content/uploads/2011/01/firefiver-notify.png" alt="Fireriver notification" border="0" width="600" height="415" />

Of course, when I say **experimental**, I mean that *this is my first Firefox add-on ever*. I'm starting to use it daily, but I'm well-versed in nuking and rebuilding my Firefox profile. I haven't had to do that yet, but I'm expecting to have to do it eventually. I'll be pleasantly surprised if it turns out I haven't totally screwed something up.

### Other add-ons you may enjoy

If you like the idea of this add-on, you may also enjoy these:

* [OPML Support][] - I just used this to dump in 800 subscriptions from Google Reader
* [Reliby][] - This lets you reload all Live Bookmarks on demand
* [Feedly][] - A more "magazine" style news aggregator in the browser
* [Feed Sidebar][] - Live Bookmarks in a sidebar
* [LiveClick][] - Still under development for Firefox 4, but I liked this in 3.6

[Feedly]: https://addons.mozilla.org/en-US/firefox/addon/feedly/
[Feed Sidebar]: https://addons.mozilla.org/en-US/firefox/addon/feed-sidebar/
[OPML Support]: https://addons.mozilla.org/en-US/firefox/addon/opml-support/
[LiveClick]: https://addons.mozilla.org/en-US/firefox/addon/liveclick/
[Reliby]: https://addons.mozilla.org/en-US/firefox/addon/reliby/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084597">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://beesbuzz.biz/"><img src="http://disqus.com/api/users/avatars/plaidfluff.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://beesbuzz.biz/">fluffy</a>
                </div>
                <a href="#comment-221084597" class="permalink"><time datetime="2011-01-27T18:40:35">2011-01-27T18:40:35</time></a>
            </div>
            <div class="content"><p>That looks like a pretty nice interface to Live Bookmarks, but it still has the inherent problem of not being nice and cloudy.  Is there any provision for Live Bookmark synchronization?</p>

<p>Of course, the other problem for me is that I prefer Chrome these days, and of course Chrome solves the sync issue by having nothing to sync to begin with.</p></div>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084598">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084598" class="permalink"><time datetime="2011-01-27T20:58:53">2011-01-27T20:58:53</time></a>
            </div>
            <div class="content"><p>Yeah, lack of clouds is the drawback here. </p>

<p>There is a bit of a sync story, though. If you're using Firefox Sync, the Live Bookmark subscriptions will carry across machines along with the rest of your bookmarks. Also, I'm using history to hide items from display, and that is covered by sync too.</p>

<p>I need to check, but I don't think items within the Live Bookmarks are sync'd, so each machine is on its own for doing the actual feed polling.</p>

<p>I'm also thinking a bit about <a href="http://inessential.com/2010/02/08/idea_for_alternative_rss_syncing_system" rel="nofollow">Brent Simmons' notions about thin-server RSS sync</a>, and if it has a place in this thing. Google Reader sync might also be nice.</p>

<p>And once I get my head wrapped around add-ons for Firefox on android, I might do a mobile version of this thing so that side of things is covered.</p></div>
            
        </li>
    
        </ul>
    
        </li>
    
        </ul>
    
        </div>
    