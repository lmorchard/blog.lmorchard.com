---
comments_archived: true
date: '2008-07-18T17:56:18-04:00'
layout: post
tags:
- asides
- twitter
- laconica
- twitterrific
- identica
title: using Twitterrific with identi.ca
wordpress_id: 1224
wordpress_slug: using-twitterrific-with-identica
wordpress_url: http://decafbad.com/blog/?p=1224
---
Since [identi.ca](http://identi.ca) [has introduced support][idapi] for the [Twitter API][tapi], switching [Twitterrific][] over seems to be as easy as entering this command in a [Terminal][] window:

    defaults write com.iconfactory.Twitterrific baseUrl -string 'identi.ca/api'

The command to switch back is the following:

    defaults write com.iconfactory.Twitterrific baseUrl -string 'twitter.com'

You'll also need to restart [Twitterrific][] after each of these to see the change working.  

It took me awhile to figure this out, because I didn't realize that they'd hidden the details in plain sight.  You know, like, in the README file that comes with the Twitterrific download.  Sheesh.  Who reads those?

[idapi]: http://www.scripting.com/stories/2008/07/18/identicaImplementsTheTwitt.html
[tapi]: http://twitter.com/help/api
[twitterrific]: http://iconfactory.com/software/twitterrific
[terminal]: http://www.osxterminal.com/launch_terminal/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088721">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.twofishcreative.com/michael/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8f163120341854b69991cff1c39829ad&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.twofishcreative.com/michael/blog">Michael C. Harris</a>
                </div>
                <a href="#comment-221088721" class="permalink"><time datetime="2008-07-19T01:25:32">2008-07-19T01:25:32</time></a>
            </div>
            <div class="content"><p>I still follow people on Twitter using Twitterrific. If I could just get updates from multiple sources, I'd be happy.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088722">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://identi.ca/zach"><img src="http://www.gravatar.com/avatar.php?gravatar_id=da6574cae7fd3215e2a8faa447b5bb63&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://identi.ca/zach">Zach Copley</a>
                </div>
                <a href="#comment-221088722" class="permalink"><time datetime="2008-07-19T07:45:45">2008-07-19T07:45:45</time></a>
            </div>
            <div class="content"><p>I found it useful to go to the configuration menu (click the wrench) and turn OFF:</p>

<p>Tweets -&gt; Include your direct messages
System -&gt; Show errors in tweet list</p>

<p>So Twitterrific wont complain in the list about the features that aren't implemented yet.  After that, it works beautifully for me with identi.ca/Laconica.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088723">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://Factoryjoe.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8403e20f058363f718144dd51faa65a7&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://Factoryjoe.com">Chris Messina</a>
                </div>
                <a href="#comment-221088723" class="permalink"><time datetime="2008-07-19T13:29:34">2008-07-19T13:29:34</time></a>
            </div>
            <div class="content"><p>Any idea how to under the stored username/password? Since I actually use a different password for each site, switching the baseUrl is only a start -- how do I switch account credentials?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088724">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221088724" class="permalink"><time datetime="2008-07-19T16:03:30">2008-07-19T16:03:30</time></a>
            </div>
            <div class="content"><p>@chris: The login credentials, alas, aren't as easily switchable I don't think.  The API baseUrl is an app-level default, but the user/pass is part of the app preferences.  </p>

<p>Hmm... I haven't tried it, but I suppose you might be able to swap between copies of ~/Library/Preferences/com.iconfactory.Twitterrific.plist with each configured using a different user/pass pair.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088725">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://identi.ca/danyork/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=f4118dd2db0be616ddaf36cd465213bb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://identi.ca/danyork/">Dan York</a>
                </div>
                <a href="#comment-221088725" class="permalink"><time datetime="2008-07-22T18:39:22">2008-07-22T18:39:22</time></a>
            </div>
            <div class="content"><p>Very cool!  And nice to see.  Out of curiousity, will this also work with Twitterific on the iPhone?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088726">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://identi.ca/evan"><img src="http://www.gravatar.com/avatar.php?gravatar_id=94cd7f2250788b7c7148ceef55a224af&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://identi.ca/evan">Evan Prodromou</a>
                </div>
                <a href="#comment-221088726" class="permalink"><time datetime="2008-07-23T20:55:43">2008-07-23T20:55:43</time></a>
            </div>
            <div class="content"><p>So, does this work with iPhone Twitterrific?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088727">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://pattimst3k.livejournal.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=404400e23c8a644635e9eeeec19a2175&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://pattimst3k.livejournal.com">TeacherPatti</a>
                </div>
                <a href="#comment-221088727" class="permalink"><time datetime="2008-07-24T22:49:42">2008-07-24T22:49:42</time></a>
            </div>
            <div class="content"><p>Hey Les!
Nice meeting  you at the A2B3 today!  Holy shit--you weren't kidding when you said you were into social networking sites :)
Patti
PS: I friended you on Flickr, so if you see TeacherPatti, that's me!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088729">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.flammableanimals.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=1781703dd27a4e512719267b277d8cab&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.flammableanimals.com">Mike</a>
                </div>
                <a href="#comment-221088729" class="permalink"><time datetime="2008-07-27T19:16:14">2008-07-27T19:16:14</time></a>
            </div>
            <div class="content"><p>Evan: No, probably not.  There's no terminal on the iPhone.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088730">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://vinismo.com/en/User:Nikolai35"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2071e56650fac90b3f966a52cac13197&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://vinismo.com/en/User:Nikolai35">Nicolas Ritoux</a>
                </div>
                <a href="#comment-221088730" class="permalink"><time datetime="2008-09-02T18:27:18">2008-09-02T18:27:18</time></a>
            </div>
            <div class="content"><p>Thank you so much!!! This is so simple and efficient. I was missing that smooth client interface with identi.ca. Now I can permanently switch over to identi.ca. </p>

<p>Niko - identi.ca user nikolai35</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088733">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=f5b8d2ff46fc2d6200afec126cb22cd6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">dan.diemer@gmail.com</a>
                </div>
                <a href="#comment-221088733" class="permalink"><time datetime="2008-09-23T08:50:58">2008-09-23T08:50:58</time></a>
            </div>
            <div class="content"><p>not working now =( Twitteriffic just hangs</p></div>
            
        </li>
    
        </ul>
    
        </div>
    