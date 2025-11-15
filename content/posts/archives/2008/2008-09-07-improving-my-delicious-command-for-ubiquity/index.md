---
comments_archived: true
date: '2008-09-07T01:20:20-04:00'
layout: post
tags:
- delicious
- web20
- firefox
- entries
- mozilla
- ubiquity
title: Improving my Delicious command for Ubiquity
wordpress_id: 1380
wordpress_slug: improving-my-delicious-command-for-ubiquity
wordpress_url: http://decafbad.com/blog/?p=1380
---
After writing up my [first stab at a Delicious command for Ubiquity][first], I planned to continue revising it based on feedback and to work on exploring more of what Ubiquity enables.  I started looking into writing my own nouns for tag suggestions, as well as playing with page load and browser startup hooks.  And, I also started poking at a little bit of deeper extension development, which took up most of my time today.

I've [updated my UbiquityCommands][ub] page and checked in my latest revision of [the Delicious command][cmd].  

The main new feature is a status bar item reporting bookmarks for the current page:

<img style="padding: 0.25em" src="ec9a4cf3a906.jpg" />&nbsp;<img style="padding: 0.25em" src="b68a448887c0.jpg" />

As you can see above, the command now comes with a status bar panel powered by the [Delicious URL info JSON feed][urlinfo], providing bookmarking info on every page visited.  It shows a bookmark count, a tooltip with further information, and sends the user to the URL info page on Delicious when clicked.  It mostly works, but it could use some looking at.  This is my first time really cracking open the hood on Firefox and XUL, and so I'm feeling around in the dark.

Specifically, I'm using Ubiquity's page load hook—but I'm also trying to augment that by tracking tab selection events, in order to keep the status bar info updated for the active tab.  But then, that leads me to trying to track new windows, to attach the tab selection event handler for every newly opened window.  Or I could just be barking up the wrong tree entirely.  At any rate, the code is probably brain-dead dumb, so I hope someone can clue me into a better way.

[urlinfo]: http://delicious.com/help/feeds
[cmd]: http://decafbad.com/hgwebdir.cgi/UbiquityCommands/file/tip/delicious.ubiq.js
[ub]: http://decafbad.com/UbiquityCommands/
[first]: http://decafbad.com/blog/2008/09/01/writing-a-delicious-command-for-ubiquity

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088289">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.mozilla.com/gen/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=ef1b5a29836fa211b938d8ccbbd3e0a1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.mozilla.com/gen/">Gen Kanai</a>
                </div>
                <a href="#comment-221088289" class="permalink"><time datetime="2008-09-07T08:10:39">2008-09-07T08:10:39</time></a>
            </div>
            <div class="content"><p>Les, you may want to let R/RW know about your new command.</p>

<p>http://www.readwriteweb.com/archives/the_ultimate_list_of_custom_ubiquity_verbs.php</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088292">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://abcdefu.wordpress.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=af8b180d6d4092fb42fe6b5e0b21536c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://abcdefu.wordpress.com/">Abimanyu Raja</a>
                </div>
                <a href="#comment-221088292" class="permalink"><time datetime="2008-09-07T08:55:52">2008-09-07T08:55:52</time></a>
            </div>
            <div class="content"><p>I disagree... Your command doesn't fit on that list. It's way too good for that list. :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088296">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=61fc20fbb1afbfc057df523f9dae79da&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jeton</a>
                </div>
                <a href="#comment-221088296" class="permalink"><time datetime="2008-09-07T21:56:43">2008-09-07T21:56:43</time></a>
            </div>
            <div class="content"><p>Well, i was having problems understanding the "tagged" and "entitled". Didn't knew it was without brackets....</p>

<p>But i gotta say, it actually replaces the delicious firefox extension for its easy way of posting links on delicious.</p>

<p>Well done, and seeing that it's only the begining i don't doubt that it will improve much more!</p>

<p>Oh, and i had a WTF when i first saw that delicous icon on the status bar of Firefox. Didn't knew it was from your command ;)</p>

<p>Thanks for making this.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088300">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=61fc20fbb1afbfc057df523f9dae79da&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jeton</a>
                </div>
                <a href="#comment-221088300" class="permalink"><time datetime="2008-09-07T22:20:09">2008-09-07T22:20:09</time></a>
            </div>
            <div class="content"><p>One question:
Is there a chance to remove the quotation marks (i meant the same on the above comment as well, not brackets) when saving a note about a bookmark?</p>

<p>Everytime i bookmark a page via this command, it quotes the note.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088302">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221088302" class="permalink"><time datetime="2008-09-07T22:41:20">2008-09-07T22:41:20</time></a>
            </div>
            <div class="content"><p>@Jeton: I guess the quoted thing is something I do by habit, to discriminate between what's my comment and what's summary straight from the page.  One way you can force it unquoted is with the "noted" modifier.  So, select some text on the page, and you can do something like:</p>

<pre><code>sha noted this tagged foo bar baz
</code></pre>

<p>That should use the selected text without quotes.  Also, you can just type arbitrary stuff:</p>

<pre><code>sha noted These are notes entitled A title goes here tagged foo bar baz
</code></pre></div>
            
        </li>
    
        <li class="comment" id="comment-221088304">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221088304" class="permalink"><time datetime="2008-09-07T22:44:59">2008-09-07T22:44:59</time></a>
            </div>
            <div class="content"><p>@Jeton: Actually, I just made a check-in that flips it around.  There's now a "quoted" modifier to wrap the notes in quotes, leaving it unquoted otherwise.  I might be the weirdo here in my quote usage :)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088306">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://jackmottram.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=3a6aa11eff36e9d968119a6bb4cea05e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://jackmottram.com/">Jack Mottram</a>
                </div>
                <a href="#comment-221088306" class="permalink"><time datetime="2008-09-09T10:04:12">2008-09-09T10:04:12</time></a>
            </div>
            <div class="content"><p>I'm a weirdo too, and now I can't quite work out how to get quotes around stuff I'm quoting from a page. I assumed this would work:</p>

<p><code>sha this quoted</code></p>

<p>but it just adds the word 'quoted' to the end of the quoted text, without quotes.</p>

<p>Similarly:</p>

<p><code>sha quoted this tagged test</code></p>

<p>adds the words 'tagged' and 'test' to the end of the quoted text, though this time everything _is_ in quotes. (So it seems I can get quotes, but lose the ability to tag in the process.)</p>

<p><code>sha this quoted text</code></p>

<p>puts the word 'text' in quotes, but drops the selected text...</p>

<p>So, I give up - what's the secret to getting quotes around quoted text?!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088310">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://jackmottram.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=3a6aa11eff36e9d968119a6bb4cea05e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://jackmottram.com/">Jack Mottram</a>
                </div>
                <a href="#comment-221088310" class="permalink"><time datetime="2008-09-09T10:11:59">2008-09-09T10:11:59</time></a>
            </div>
            <div class="content"><p>And of course I worked it out immediately after leaving that comment:</p>

<p><code>sha tagged test monkey whatever quoted this</code></p>

<p>works just fine (but feels the wrong way around to be tagging before quoting). And now I can't work out how to quote <i>and</i> note, so to speak. I tried adding</p>

<p><code>noted These are my comments on what I just quoted</code></p>

<p>but it doesn't work, it puts 'noted These are my &amp;c.' inside the quotes...</p>

<p>(I should say, despite all this moaning, I really have been enjoying using the command - it's very slick compared to the official add-on.)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088312">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221088312" class="permalink"><time datetime="2008-09-09T14:30:06">2008-09-09T14:30:06</time></a>
            </div>
            <div class="content"><p>Huh, weird - that's exactly how I use the command:</p>

<pre><code>sha quoted this tagged foo bar baz
</code></pre>

<p>One major difference, though, is that I'm using a bleeding edge checkout of the Ubiquity extension.  I wonder if there's a bug in the parser for the last release.  :(  </p>

<p>The definition of the modifiers is pretty simple, so there's not a whole lot of debugging I can do in the command itself.  Ugh.</p>

<p>Oh, and also: RIght now it's either plain notes or quoted notes.  Presence of the quoted modifier clobbers plain notes.  But, how that I think about it I wonder if I should make those work together.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088314">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://FromTheGut.us"><img src="http://www.gravatar.com/avatar.php?gravatar_id=3be27db3db50892929ef892ab04621a4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://FromTheGut.us">Frank</a>
                </div>
                <a href="#comment-221088314" class="permalink"><time datetime="2008-09-09T17:40:39">2008-09-09T17:40:39</time></a>
            </div>
            <div class="content"><p>Hello, </p>

<p>I was wondering if there was any chance you could put together a post annotating/explaining the changes/additions to your improved Delicious command. In particular, some explanations of the code dealing with the statusbar would be helpful for us beginners. Thanks.</p>

<p>Frank</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088317">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=357a20e8c56e69d6f9734d23ef9517e8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Tony</a>
                </div>
                <a href="#comment-221088317" class="permalink"><time datetime="2008-10-22T05:12:52">2008-10-22T05:12:52</time></a>
            </div>
            <div class="content"><p>Not a big fan of things adding stuff my status bar. :/ Ubiquity commands should just focus on Ubiquity, not XUL changes in Firefox.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088320">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221088320" class="permalink"><time datetime="2008-10-29T16:04:28">2008-10-29T16:04:28</time></a>
            </div>
            <div class="content"><p>@Tony: Actually, commands are just one of the goals of Ubiquity.  Easier XUL hacking, ala Greasemonkey, is another goal, albeit under-explored so far.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088321">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dy-verse.blogspot.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=40e05965a0c35ba44927a8e4b0546f9d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dy-verse.blogspot.com/">http://dy-verse.blogspot.com/</a>
                </div>
                <a href="#comment-221088321" class="permalink"><time datetime="2009-04-27T14:50:43">2009-04-27T14:50:43</time></a>
            </div>
            <div class="content"><p>Here is a share-to-delicious ubiquity command that automatically generates tags using YAHOO pipes. It also uses the text selected on the page as notes and the page title as the title of the article. </p>

<p>http://gist.github.com/26425</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088327">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221088327" class="permalink"><time datetime="2009-04-28T05:25:58">2009-04-28T05:25:58</time></a>
            </div>
            <div class="content"><p>Auto-generating tags via Yahoo Pipes is a neat trick, but it's unfortunately very much frowned upon by delicious.  Not that anything negative will happen to you, but it defeats the purpose of tagging altogether.</p>

<p>Try searching for "Lazy Sheep Bookmarklet" and possibly read:</p>

<p>http://www.mail-archive.com/ydn-delicious@yahoogroups.com/msg00853.html</p>

<p>In particular - "People add metadata so that 1) they can find things and 2) other people can find things. You are removing the step in which people add the tag metadata, thus making the system less valuable to themselves and others."</p>

<p>The key word repeated there is "people"</p></div>
            
        </li>
    
        </ul>
    
        </div>
    