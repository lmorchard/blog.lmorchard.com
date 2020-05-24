<p>That'll teach me not to test on other platforms before I release :)  It appears that Windows users are missing 'lib.pm' in their bundle of <a href="http://www.decafbad.com/twiki/bin/view/Main/AmphetaDesk">AmphetaDesk</a> joy, which really perplexed me at first.  So, if you've already downloaded my tarball from yesterday, download the following template and replace <code>templates/default/index.html</code>:<ul><li><a href="http://www.decafbad.com/gems/ampheta-index-20020806.html">ampheta-index-20020806.html</a></li></ul>If you've yet to grab my initial release, grab this instead:<ul><li><a href="http://www.decafbad.com/gems/AmphetaOutlines-20020806.tar.gz">AmphetaOutlines-20020806.tar.gz</a></li></ul>This all seems to have worked on my machine at home, but that Windows machine also has a full Perl installation.  I'm going to try everything out on my Virtual PC <a href="http://www.decafbad.com/twiki/bin/view/Main/WinXP">WinXP</a> install here at work, but I seem to be having trouble downloading a copy of <a href="http://www.decafbad.com/twiki/bin/view/Main/AmphetaDesk">AmphetaDesk</a> from <span style='background : #FFFFCE;'><a href="http://www.decafbad.com/twiki/bin/edit/Main/SourceForge?topicparent=Main.FilterData"><b>?</b></a><font color="#0000FF">SourceForge</font></span>.</p>
<p>Let me know if you feel the love yet.  :)</p>
<!--more-->
shortname=ooobbg

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084524">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.furrygoat.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=53617e52a0ccf29f19c750e312df0f31&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.furrygoat.com">Steve</a>
                </div>
                <a href="#comment-221084524" class="permalink"><time datetime="2002-08-06T15:58:03">2002-08-06T15:58:03</time></a>
            </div>
            <div class="content">Well, using it in Amphetadesk works fine, but, it goes completely crazy when I click on a link that's external. For example, I clicked on your "Windows + AmphetaDesk + Outlines + Metadata" link, a new window opened, and then just went nuts (clicking like crazy, tons of reloads I guess). Yup, on windows xp here.</div>
            
        </li>
    
        <li class="comment" id="comment-221084526">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://diveintomark.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2aac8a68f46151f080ddb17ee0d2454e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://diveintomark.org/">Mark Pilgrim</a>
                </div>
                <a href="#comment-221084526" class="permalink"><time datetime="2002-08-06T16:47:51">2002-08-06T16:47:51</time></a>
            </div>
            <div class="content">Template works now, but when I click through on a link, it gives me this:

Program fragment delivered error ``Please see the Perl2Exe user manual under "Can't locate somemodule.pm in @INC" for an explanation of the following message: Can't locate MD5.pm in @INC (@INC contains: D:\incoming\windows\amphetadesk-win-v0.93\templates\default\lib D:\incoming\windows\amphetadesk-win-v0.93\templates\default\lib D:\incoming\windows\amphetadesk-win-v0.93\lib D:\incoming\windows\amphetadesk-win-v0.93\lib D:\incoming\windows\amphetadesk-win-v0.93\lib PERL2EXE_STORAGE C:\DOCUME~1\f8dy\LOCALS~1\Temp .) at D:\incoming\windows\amphetadesk-win-v0.93\templates\default\view_item.html line 5. BEGIN failed--compilation aborted at D:\incoming\windows\amphetadesk-win-v0.93\templates\default\view_item.html line 5.''</div>
            
        </li>
    
        <li class="comment" id="comment-221084528">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://diveintomark.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2aac8a68f46151f080ddb17ee0d2454e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://diveintomark.org/">Mark Pilgrim</a>
                </div>
                <a href="#comment-221084528" class="permalink"><time datetime="2002-08-06T16:49:05">2002-08-06T16:49:05</time></a>
            </div>
            <div class="content">I already merged the lib directories and still got this error on clickthrough.</div>
            
        </li>
    
        </ul>
    
        </div>
    