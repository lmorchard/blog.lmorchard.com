---
comments_archived: true
date: '2007-03-05T17:13:45-05:00'
layout: post
tags:
- asides
- metablogging
- webdev
- webservices
- atom
- xmlrpc
- rest
- http
- auth
title: Blog posting delegation and third-party auth
wordpress_id: 1043
wordpress_slug: blog-posting-delegation-and-third-party-auth
wordpress_url: http://decafbad.com/blog/2007/03/05/blog-posting-delegation-and-third-party-auth
---
Here's something I've been meaning to post about, brought back to mind from [Kim Cameron's post on "Wrong-headed impersonation"][kc]:  

I wish that blog posting interfaces (ie. [MetaWeblog API][ma] and [Atom Publishing Protocol][app]) offered a way to delegate blog posting to a 3rd party app (desktop or web) in such a way as to avoid providing one's login details (i.e. user name and password).  For instance, consider both [Flickr's][fa] and [Upcoming's][ua] 3rd party token-based authentication / authorization schemes.

In particular, I'm looking at things like del.icio.us' own Daily Blog Post and others.  These can be used to auto-post content to one's blog generated elsewhere - but at the price of sharing login details.  Granted, you can mostly trust these 3rd parties not to do anything nasty with your credentials, but it would be nice not to have to.

I figure that something RESTful like extending HTTP authentication (ala [Atom Authentication][aa]) with a token scheme could be interesting, and possibly fit nicely into [APP][app] itself.  It could probably be retrofit into the [MetaWeblog API][ma] by specifying a per-app user name and password.  I can imagine a WordPress admin plugin that issues approved authentication tokens to restrict the categories and other activities allowed by 3rd party apps.  

Just something I'm thinking about, as more services may or may not grow into delegated blog posting.

[aa]: http://www.xml.com/pub/a/2003/12/17/dive.html
[ma]: http://www.xmlrpc.com/metaWeblogApi
[app]: http://www.ietf.org/html.charters/atompub-charter.html
[fa]: http://www.flickr.com/services/api/auth.spec.html
[ua]: http://upcoming.org/services/api/token_auth.php
[kc]: http://www.identityblog.com/?p=701

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084462">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://beesbuzz.biz/"><img src="http://disqus.com/api/users/avatars/plaidfluff.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://beesbuzz.biz/">fluffy</a>
                </div>
                <a href="#comment-221084462" class="permalink"><time datetime="2007-03-05T22:40:26">2007-03-05T22:40:26</time></a>
            </div>
            <div class="content"><p>Wouldn't openID be a better candidate for this?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084463">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084463" class="permalink"><time datetime="2007-03-05T22:48:24">2007-03-05T22:48:24</time></a>
            </div>
            <div class="content"><p>Not really, unless I don't entirely understand OpenID.  </p>

<p>OpenID offers way to authenticate <em>yourself</em>.  However, what I want is an easy way to delegate your access to 3rd party apps, without those apps being able to authenticate as you or performs actions outside of the permissions you approve.  I don't really want Flickr Uploader, Ecto, MarsEdit to be able to use OpenID to login as me with carte blanche.</p>

<p>With a token-based system like Flickr has, I can approve delegation to various apps and revoke their access at any time - without ever releasing my login details.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084464">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://george.hotelling.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c7d1c8d2b1a7643236a4661e9a974dee&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://george.hotelling.net/">George Hotelling</a>
                </div>
                <a href="#comment-221084464" class="permalink"><time datetime="2007-03-06T17:51:55">2007-03-06T17:51:55</time></a>
            </div>
            <div class="content"><p>At first I had this great idea to build a blog posting proxy service that could grant access to your blog to different services by giving them different usernames and passwords and you could revoke them at any time and it would be great and everyone would be posting to everyone's blog all the time.</p>

<p>Then I realized I had put on <a href="http://worsethanfailure.com/Articles/The_Complicator's_Gloves.aspx" rel="nofollow">complicator gloves</a> and that it would be way easier to just add new users to my blog without a proxy service.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084465">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084465" class="permalink"><time datetime="2007-03-06T18:04:57">2007-03-06T18:04:57</time></a>
            </div>
            <div class="content"><p>Yeah, I figured making multiple accounts is a way to go when you've got your own install of something like WordPress.  It kind of gets stymied, though, if you want the same thing for a hosted service like WordPress.com, Vox, TypePad, or LiveJournal where one account = one blog.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084466">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://ian.mckellar.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a38054904e39e36fab7c4d779abf3752&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://ian.mckellar.org/">Ian McKellar</a>
                </div>
                <a href="#comment-221084466" class="permalink"><time datetime="2007-03-12T17:43:49">2007-03-12T17:43:49</time></a>
            </div>
            <div class="content"><p>It seems to me that the ideal solution to this is to have your blog pull new posts from an RSS/Atom feed that's hosted by the service that is generating your content. Feedburner already has a half-assed implementation of this where they'll pull your delicious bookmarks and flickr photos into your burned feed.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084468">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084468" class="permalink"><time datetime="2007-03-12T17:58:35">2007-03-12T17:58:35</time></a>
            </div>
            <div class="content"><p>@ian: Hmm, yeah, that probably does end up being the least onerous solution - just offer an aggregated feed of one's output.  I do like the idea of auto-posting to a blog, though, for the sake of something sorta like daily backups to a system I control.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084470">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://ian.mckellar.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a38054904e39e36fab7c4d779abf3752&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://ian.mckellar.org/">Ian McKellar</a>
                </div>
                <a href="#comment-221084470" class="permalink"><time datetime="2007-03-12T18:44:46">2007-03-12T18:44:46</time></a>
            </div>
            <div class="content"><p>@l.m.orchard: you don't need to just aggregate you can also import posts into your own store. We could come up with a cleverly confusing buzzword acronym like Atom Pull Publishing. You just periodically poll a feed and import the items. Actually, this is kind of what Google Reader is doing. They've even got a namespace in their atom for expressing the original id and the source feed. Perhaps I should write a drupal module.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084471">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084471" class="permalink"><time datetime="2007-03-12T19:01:45">2007-03-12T19:01:45</time></a>
            </div>
            <div class="content"><p>@ian: Hmm, yeah, that does sound like the least complicated way to get outside content pulled into a blog without releasing the blog's login details.  I know I've seen / used some WordPress plugins that do  basically that, though I've not been happy with any of them yet.  I should re-look into why that's been the case</p></div>
            
        </li>
    
        <li class="comment" id="comment-221084473">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://ian.mckellar.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a38054904e39e36fab7c4d779abf3752&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://ian.mckellar.org/">Ian McKellar</a>
                </div>
                <a href="#comment-221084473" class="permalink"><time datetime="2007-03-12T19:26:16">2007-03-12T19:26:16</time></a>
            </div>
            <div class="content"><p>@l.m.orchard: in my experience the problems are with the formatting of the content (do blank lines turn into paragraphs, etc) and fragile post IDs (the upgraded wordpress and spammed all my friends on livejournal or planet problem). I'm not sure how to fix either of these problems but I think they're both problems Atom is attempting to solve...</p></div>
            
        </li>
    
        </ul>
    
        </div>
    