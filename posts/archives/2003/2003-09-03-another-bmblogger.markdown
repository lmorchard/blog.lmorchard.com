---
comments_archived: true
date: '2003-09-03T10:59:31-04:00'
layout: post
title: Another BookmarkBlogger in Python
wordpress_id: 474
wordpress_slug: another-bmblogger
wordpress_url: http://www.decafbad.com/blog/?p=474
---
<br /><br />
I haven't been paying attention to my referrers as much lately,
but I probably should.  Because, when I do, I find things like
<a href="http://www.hollytree-house.co.uk/twiki/bin/view/Main/BmBlog" target="_top">another implementation</a>
of <a href="http://www.decafbad.com/twiki/bin/view/Main/BookmarkBlogger">BookmarkBlogger</a> in Python, this one by
<a href="http://www.hollytree-house.co.uk/dme/cgi-bin/blosxom.cgi/web" target="_top">David Edmondson</a>.
<br /><br />
His version has many fewer requirements, using only core Python
libraries as far as I can see.  One of these which I hadn't any idea
existed is
<a href="http://www.usatlas.bnl.gov/~fisyak/star/public/WWW/sources/Python-2.3a1/Lib/plat-mac/plistlib.py" target="_top">plistlib</a>,
"a tool to generate and parse <a href="http://www.decafbad.com/twiki/bin/view/Main/MacOSX">MacOSX</a> .plist files".  When I get
another few round tuits, I'll likely tear out all the XPath use
in my version and replace it with this.  Bummer.  And here I thought
I was all clever using the XPaths like that in Python :)
<!--more-->
shortname=another_bmblogger

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089647">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://anode.anotrash.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=6088d1552d399ae7489f66717354bf68&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://anode.anotrash.com">anode</a>
                </div>
                <a href="#comment-221089647" class="permalink"><time datetime="2003-09-03T11:29:32">2003-09-03T11:29:32</time></a>
            </div>
            <div class="content">This is the same way I was going for my MT API after not being able to get 4suite built.  It's worth mentioning that plistlib requires pyexpat, so it won;t work on a vanilla Apple Python - you either need to build pyexpat or download MacPython 2.3</div>
            
        </li>
    
        </ul>
    
        </div>
    