---
comments_archived: true
layout: post
published: true
tags:
- jekyll
- metablogging
- github
time: 17:46:00-07:00
title: Further Jekyll notes
---

**TL;DR**: This is an in-progress entry, where I plan to collect some notes on how I've
set up and am using Jekyll. I may call it "done" at some random point and
publish it. I may even subsequently update it from time to time, after that.

* To speed up the authoring / previewing cycle on my laptop, I move all but this
  years' posts into a `_posts_archived` folder and don't commit the change.
    * Kind of a pain; feels like I'm Doing It Wrong.

* [Github Pages][pages] seems interesting, but I don't think it's right for me.
    * My plugins don't run, so my tag pages aren't created.
        * [davedash][] has a different approach for this, though.
    * I can't get the permalinks just the way I like them
    * I'd have to set a `CNAME` in my DNS to point at a subdomain (ie.
      `blog.decafbad.com`), because I don't want to delegate my entire root
      domain over to GitHub.
    * I would 100% totally use [GitHub Pages][pages] for another project that
      I'm starting from scratch, though.

* Since related posts via LSI is such a bear, I may try doing something with
  tags. That is:
    * take all the tags from a post;
    * find the 5 latest posts for each tag;
    * display the unique set of posts

* I want my permalinks to look like `/2011/06/08/slug`
    * Not `/2011/06/08/slug/` or `/2011/06/08/slug.html`
    * Look, ma, no trailing slash!
    * This is the way I've had my URLs for years, and I want to maintain my URLspace.
    * And I also don't want every URL missing a trailing slash to get bounced
      with a `301 Moved Permanently` to the equivalent *with* a trailing
      slash. That's bogus.
    * So, I'm using the `pretty` permalinks setting, and I have this in my
      nginx config:
        * `if (-f $request_filename/index.html) { rewrite ^(.+)$ $1/index.html last; }`

[pages]: http://pages.github.com/
[davedash]: https://github.com/davedash/davedash.github.com

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>

        <ul class="comments">

        <li class="comment" id="comment-221995558">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://beesbuzz.biz/"><img src="http://disqus.com/api/users/avatars/plaidfluff.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://beesbuzz.biz/">fluffy</a>
                </div>
                <a href="#comment-221995558" class="permalink"><time datetime="2011-06-09T04:55:35">2011-06-09T04:55:35</time></a>
            </div>
            <div class="content">I appreciate the notion behind the no-trailing-slash permalink (because really the only thing that should care about the specific format is the user-agent, and that's what content-type is for), but does that particular rule possibly wreak havoc on relative links? Or do you ever even use those anyway? I'm one of those few weirdos who actually does use relative links wherever possible, even on blog entries with a potentially weird URL (since I like uploading one-off images to the same directory as the published entry, and only having them visible "below the cut" as all the cool kids are calling "extended entry" these days).</div>

        </li>

        <li class="comment" id="comment-289436387">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://www.michel-kraemer.de"><img src="http://disqus.com/api/users/avatars/michelkraemer.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://www.michel-kraemer.de">Michel Krämer</a>
                </div>
                <a href="#comment-289436387" class="permalink"><time datetime="2011-08-17T19:19:29">2011-08-17T19:19:29</time></a>
            </div>
            <div class="content">Thanks for your tips. Did you have success with your custom approach for generating related posts? It would be quite cool, if you could share your plugin.

Thanks,
Michel</div>

        <ul class="comments">

        <li class="comment" id="comment-289452539">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow"
                       href="http://decafbad.com/"><img src="http://disqus.com/api/users/avatars/lmorchard.jpg"/></a>
                    <a class="avatar name" rel="nofollow"
                       href="http://decafbad.com/">Les Orchard</a>
                </div>
                <a href="#comment-289452539" class="permalink"><time datetime="2011-08-17T19:44:18">2011-08-17T19:44:18</time></a>
            </div>
            <div class="content">Alas, I haven't gotten around to the related posts stuff, yet</div>

        </li>

        </ul>

        </li>

        </ul>

        </div>
