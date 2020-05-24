<br /><br />
Hanging out on <a href="irc://irc.freenode.org/joiito">joiito on IRC</a> today,
I read <a href="http://www.jspwiki.org/Wiki.jsp?page=JanneJalkanen" target="_top">Ecyrd</a> asking
around about any tools to present <a href="http://www.gnu.org/prep/standards_42.html" target="_top">GNU-style changelogs</a>
as an <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> feed.  I couldn't find any, but I did find
<a href="http://people.redhat.com/jrb/files/changelog2.py" target="_top">this changelog parser</a>, apparently
by <a href="http://people.redhat.com/jrb/" target="_top">Jonathan Blandford</a>.  So,
when I had a few free minutes, I took some parts I had laying around, along
with this parser, and made this:
<ul>
<li> <a href="http://www.decafbad.com/2003/08/cl2rss?cl=http%3A%2F%2Fwww.ecyrd.com%2F%7Ejalkanen%2FJSPWiki%2Fnightly%2FChangeLog"><img src="http://www.decafbad.com/images/xml.gif" border="0" /></a> - <a href="http://www.ecyrd.com/~jalkanen/JSPWiki/nightly/ChangeLog">Changelog for JSPWiki</a>
</li>
<li> <a href="http://www.decafbad.com/2003/08/cl2rss.txt" target="_top">Source code for cl2rss</a>
</li>
</ul>
This is at the "it works" stage.  It needs much work in what it presents
in an <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> feed, so feel free to suggest changes!
<!--more-->
shortname=cl_to_rss

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085069">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://insultconsult.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5b73143e72f280abb5b1e3097608860d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://insultconsult.com/">Karl-Martin Skontorp</a>
                </div>
                <a href="#comment-221085069" class="permalink"><time datetime="2003-09-02T13:47:44">2003-09-02T13:47:44</time></a>
            </div>
            <div class="content">Subversion (http://subversion.tigris.org/) can output logs in XML. It is really easy to use XSLT to generate RSS from these logs.</div>
            
        </li>
    
        <li class="comment" id="comment-221085070">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/blog">l.m.orchard</a>
                </div>
                <a href="#comment-221085070" class="permalink"><time datetime="2003-09-02T13:50:22">2003-09-02T13:50:22</time></a>
            </div>
            <div class="content">Well, the thing about this particular case is that this ChangeLog file is hand-maintained in the GNU style.  I've also seen that Emacs has some tools for maintaining these files as well.  Otherwise, there're tools for CVS logs to RSS as well.

I do keep meaning to check out Subversion though.</div>
            
        </li>
    
        <li class="comment" id="comment-221085071">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.ecyrd.com/ButtUgly/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8f688c7919a6645352e1bb59b2f45ae4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.ecyrd.com/ButtUgly/">Janne Jalkanen</a>
                </div>
                <a href="#comment-221085071" class="permalink"><time datetime="2003-09-02T15:40:06">2003-09-02T15:40:06</time></a>
            </div>
            <div class="content">Man, I owe you at least two beers now.  Thanks again! :-)</div>
            
        </li>
    
        </ul>
    
        </div>
    