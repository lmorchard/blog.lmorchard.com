So...  How many of you have ever used `mysql -X`?

I just discovered it today, while screwing around with dumping database queries into Atom.  While I'm not entirely sure it's what I need to use, this is pretty nifty:

    $ mysql -Xp -udbagg3 dbagg3 -e '
    > select id, title, modified 
    > from feed
    > order by modified 
    > limit 4' 
    Enter password:
 
    <?xml version="1.0"?>

    <resultset statement="select id, title, modified 
            from feed order by modified limit 4">
      <row>
        <id>527</id>
        <title>Channel Dean</title>
        <modified>2004-03-04 15:56:54</modified>
      </row>

      <row>
        <id>31</id>
        <title>chocolate and vodka</title>
        <modified>2004-07-21 21:30:08</modified>
      </row>

      <row>
        <id>183</id>
        <title>floating atoll</title>
        <modified>2004-07-31 14:09:27</modified>
      </row>
 
      <row>
        <id>24</id>
        <title>What's Your Brand Mantra?</title>
        <modified>2004-08-02 03:15:03</modified>
      </row>
    </resultset>    

Now, while I don't think that using this for `dbagg3` is all that great an idea, it's something I need to remember for future shell and XSLT hacks...

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087588">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=365087c6a73a2ee5fa90760c2f9d9ca8&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">iamsure</a>
                </div>
                <a href="#comment-221087588" class="permalink"><time datetime="2004-08-23T03:47:12">2004-08-23T03:47:12</time></a>
            </div>
            <div class="content">Is there a way to do so without the commandline option, ie, via a select call, etc?</div>
            
        </li>
    
        <li class="comment" id="comment-221087591">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=34b6089110a6bfc86b6351ba400ae8fa&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">bosshoff</a>
                </div>
                <a href="#comment-221087591" class="permalink"><time datetime="2005-04-20T12:22:15">2005-04-20T12:22:15</time></a>
            </div>
            <div class="content">There is a better way, using mysqldump, explained here: http://insight.zdnet.co.uk/software/developer/0,39020469,2112200,00.htm</div>
            
        </li>
    
        <li class="comment" id="comment-221087595">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=4c32c5992ac6744d2f14712d280e3834&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Rededog027</a>
                </div>
                <a href="#comment-221087595" class="permalink"><time datetime="2007-07-19T23:51:15">2007-07-19T23:51:15</time></a>
            </div>
            <div class="content"><p>That is awesome I haven't used it before but it is extreamly useful for  creating changelogs from svn and bugzilla :)</p></div>
            
        </li>
    
        </ul>
    
        </div>
    