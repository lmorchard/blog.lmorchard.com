<blockquote cite="http://www.perl.com/pub/a/2002/09/11/log4perl.html?page=1">Log::Log4perl is different. It is a pure Perl port of the widely popular Apache/Jakarta log4j library for Java, a project made public in 1999, which has been actively supported and enhanced by a team around head honcho Ceki G&#252;lc&#252; during the years. 
<p>The comforting facts about log4j are that it's really well thought out, it's the alternative logging standard for Java and it's been in use for years with numerous projects. If you don't like Java, then don't worry, you're not alone -- the Log::Log4perl authors (yours truly among them) are all Perl hardliners who made sure Log::Log4perl is real Perl. </blockquote><div class="credit" align="right"><small>Source:<cite><a href="http://www.perl.com/pub/a/2002/09/11/log4perl.html?page=1">perl.com: Retire your debugger, log smartly with Log::Log4perl! </a></cite>.</small></div></p>
<p>Wow, I hadn't noticed this before.  We've been looking for a Log4J-workalike in for our perl-based web apps at work, and thought <a href="http://search.cpan.org/search?mode=all&amp;query=Log::Agent" title="CPAN search for Log::Agent">CPAN:Log::Agent</a> was where it's at - and it still may be - but <a href="http://search.cpan.org/search?mode=all&amp;query=Log::Log4Perl" title="CPAN search for Log::Log4Perl">CPAN:Log::Log4Perl</a> looks very keen now.</p>
<!--more-->
shortname=ooodoa

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088758">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://laughingmeme.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8ae3f25b108d13da6214a182259d3c00&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://laughingmeme.org">kellan</a>
                </div>
                <a href="#comment-221088758" class="permalink"><time datetime="2003-01-26T16:28:30">2003-01-26T16:28:30</time></a>
            </div>
            <div class="content">We've been having really good luck with Log::Log4perl on a couple of medium to large projects.  Lots and lots of flexibility, easy to get started, and being built on top of amazing Log::Dispatch hierarchy was a stroke of genius that opens up lots of resources.  Can't wait until I have an excusre to use the fact that it can parse log4j config files transparently.</div>
            
        </li>
    
        <li class="comment" id="comment-221088759">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.mmadsen.org/radioblog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2fc977e82d9f8395a0f49e6f4958bc84&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.mmadsen.org/radioblog">mark</a>
                </div>
                <a href="#comment-221088759" class="permalink"><time datetime="2003-02-16T00:13:53">2003-02-16T00:13:53</time></a>
            </div>
            <div class="content">I've been using Log4perl as well, as a means of getitng common logging between our Perl and Java code bases.  It works really well, other than the fact that not all the layout formatting codes are yet implemented.  But with a little care, it's easily possible to have your Perl apps logging to the same places as your Java or J2EE based applications, which really improves the ability to debug and analyze systems which use both....</div>
            
        </li>
    
        </ul>
    
        </div>
    