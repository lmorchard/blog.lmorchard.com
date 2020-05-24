When I was a wee hacker, I lived my digital life though a [Commodore 64][c64].  I played games on it, did homework, talked to people far away—you know, all the stuff they showed in the pictures on the box.  I also took things apart—both the machine itself and software running on it.  I grew up learning that my digital environment was ultimately understandable, [susceptible to tinkering][transactor], and open to being bent to my own purposes.

From the Commodore 64, I graduated eventually to terminals and text editors, opening portals mostly onto computers elsewhere via powerful UNIX command shells.  And, of course, over the past decade, this has largely given way to life in a browser.  

Yet, for a little while, particularly in the first few years of browsers, freedom to tinker seemed cramped.  JavaScript had yet to arrive, and was a little messy when it did.  There was no relatively easy addon development.  And, though the portals opened by a browser were richer than those provided by terminals, the paths of navigation defined by links controlled by site owners offered less freedom of movement than UNIX commands.  I could create my own pages, but I couldn't do much to others' pages.

But then, javascript: URLs came around, dots were connected, and [bookmarklets][] were born.  Suddenly, it was possible to customize *my* browsing environment with arbitrary JavaScript code having access to the current page—no matter *whose* page it was.  And, through the various tricks of the AJAX trade, bookmarklets have only gotten more capable throughout the years.

[Smart keyword shortcuts][shortcuts] came around a little later, allowing quick access to bookmarks via simple keywords typed into the location bar.  The smart part, though, came in the form of bookmarked URLs with placeholders and keywords given arguments to fill the placeholders—allowing not only quick access to bookmarked pages but also search engine forms bookmarked with late-bound fields.

Bookmarklets inherited the benefits of smart keyword shortcuts.  The same placeholder in http: URLs can be inserted into the code of a javascript: URL, thus parameterizing the JavaScript code and incidentally turning the location bar into a kind of primitive command line.  For example, one of my most heavily used "[addresslets](http://naeblis.cx/weblog/2004/08/09/DeliciousAddresslets)" is based on [John Resig's original "Super-Fast Delicious Bookmarklet"](http://ejohn.org/blog/super-fast-delicious-bookmarklet/).

Another leap in prying open the browser tinkering space came in the form of [Greasemonkey][]—an addon-powered environment created explicitly for the purpose of end-user scripting applied to others' pages.  [Greasemonkey][] user scripts can do more than bookmarklets, and with a much better development environment to boot.  And, though a user script can't do quite as much as a proper browser addon, they're much easier to hack on and distribute.

Now, consider one of [Mozilla Labs][labs]' [newest projects][ubiquity], named [Ubiquity][].  This rough and experimental addon for Firefox combines and improves upon everything I've described so far:

* [Ubiquity][] is a hackable command line environment, better than [bookmarklets][] and smart [keyword shortcuts][shortcuts];
* [Ubiquity][] enables persistent customization of others' pages, not unlike [Greasemonkey][]; 
* [Ubiquity][] facilitates live in-browser creation and web-based subscription to user commands and scripts;
* [Ubiquity][] gives access to browser chrome resources without a need for frequent restarts;

So far, most of the [commands][] I see popping up since the 0.1 release have not accomplished much more than [smart keyword shortcuts][shortcuts] in the location bar could.  But, it's early yet, and [Ubiquity][] is far from limited to these commands.

Once the basics have been well-explored, I expect to see more people taking a crack at the broader capabilities offered by [Ubiquity][].  [Bookmarklets][] and [Greasemonkey][] can't access browser chrome—but [Ubiquity][] can.  [Ubiquity][] also offers a user interface that's so much more promising than keyword shortcuts, including command previews and typed parameters with suggestions.

Ubiquity promises web-wide mashups directed by a conversational command interface.  All in all, the potential of this makes me feel like my digital environment—browser and web as a whole—is getting even more intimately, personally hackable.  

It'll be very interesting to see where this project goes.

[labs]: http://labs.mozilla.com/
[transactor]: http://cbm.csbruce.com/~csbruce/cbm/transactor/
[c64]: http://www.virtualsky.net/iadoremyc64/
[shortcuts]: http://www.mozilla.org/docs/end-user/keywords.html
[greasemonkey]: http://www.greasespot.net/
[bookmarklets]: http://en.wikipedia.org/wiki/Bookmarklet
[ubiquity]: http://labs.mozilla.com/2008/08/introducing-ubiquity/
[commands]: https://labs.toolness.com/ubiquity-herd/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089574">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=22b4e824255828f5aedd0e6e2558dc52&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Raul</a>
                </div>
                <a href="#comment-221089574" class="permalink"><time datetime="2008-08-31T10:20:58">2008-08-31T10:20:58</time></a>
            </div>
            <div class="content"><p>Hi, was using the original delicious command linked from the Ubiquity wiki, just tried yours and its definitely more polished and functional. Great job with the preview and the extra functionality. Only thing is 'share-to-delicious' is too much to type so I unsubscribed the previous command and changed the namespace in yours. This is clearly going to become a problems as the commands proliferate.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089575">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089575" class="permalink"><time datetime="2008-08-31T14:43:39">2008-08-31T14:43:39</time></a>
            </div>
            <div class="content"><p>@Raul: "share-to-delicious" is long, but keep in mind is that you only need to type enough of the command to disambiguate it.  That is, all I type is "sh this tagged osx software apple" because I have no other commands starting with "sh".  Watch the list of commands in the preview as you type.  Those tell you what the parser thinks of what you're typing as you type.  It's like automatic tab-completion.</p>

<p>Also, I think there's work planned to put some usage based sorting into the command parser, preferring the commands you use most in order of disambiguation.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089576">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://abcdefu.wordpress.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=af8b180d6d4092fb42fe6b5e0b21536c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://abcdefu.wordpress.com">Abi</a>
                </div>
                <a href="#comment-221089576" class="permalink"><time datetime="2008-08-31T15:33:24">2008-08-31T15:33:24</time></a>
            </div>
            <div class="content"><p>Nice post. I share your sentiment with regards to Ubiquity commands. A lot of commands that I see are just plain simple searches. I hope developers will work on more interesting things. For example, even things like auto-form filling for this comment (possibly even on page load without having to type a command) could be done by Ubiquity. There's still a lot more room for experimentation.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089578">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://abcdefu.wordpress.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=af8b180d6d4092fb42fe6b5e0b21536c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://abcdefu.wordpress.com">Abi</a>
                </div>
                <a href="#comment-221089578" class="permalink"><time datetime="2008-08-31T15:45:59">2008-08-31T15:45:59</time></a>
            </div>
            <div class="content"><p></p>

<p>But otherwise, I <em>really</em> like your command especially the preivew. We should include it as a builtin command, if you don't mind. :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089580">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://abcdefu.wordpress.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=af8b180d6d4092fb42fe6b5e0b21536c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://abcdefu.wordpress.com">Abi</a>
                </div>
                <a href="#comment-221089580" class="permalink"><time datetime="2008-08-31T15:51:20">2008-08-31T15:51:20</time></a>
            </div>
            <div class="content"><p>I noticed a bug in your command. If I select some text in the awesomebar, the bookmark url is chrome. You should use something the command utils to get the url, instead.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089582">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221089582" class="permalink"><time datetime="2008-09-01T06:17:37">2008-09-01T06:17:37</time></a>
            </div>
            <div class="content"><p>@Abi: Making this a built-in command is totally fine by me!  It can use more work, though, for sure.</p>

<p>Also, I can reproduce that bug.  Ugh.  I can't find any methods in the CmdUtils to get the current page URL, though.  I'll keep poking a bit though.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089584">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://abcdefu.wordpress.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=af8b180d6d4092fb42fe6b5e0b21536c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://abcdefu.wordpress.com">Abi</a>
                </div>
                <a href="#comment-221089584" class="permalink"><time datetime="2008-09-01T06:50:23">2008-09-01T06:50:23</time></a>
            </div>
            <div class="content"><p>Your blog seems to be rejecting code (that's why I had so many posts in the first place). You can get the current page url using (with dots):</p>

<p>CmdUtils  getDocumentInsecure() location href</p></div>
            
        </li>
    
        <li class="comment" id="comment-221089586">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://theunfocused.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=738af918f39d544f8b0d765850c986f8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://theunfocused.net/">Blair McBride</a>
                </div>
                <a href="#comment-221089586" class="permalink"><time datetime="2008-09-02T02:50:12">2008-09-02T02:50:12</time></a>
            </div>
            <div class="content"><p>I recommend against using getDocumentInsecure() - its got "Insecure" in its name for a reason! Instead, you should use:</p>

<p>Application.activeWindow.activeTab.uri.spec</p></div>
            
        </li>
    
        </ul>
    
        </div>
    