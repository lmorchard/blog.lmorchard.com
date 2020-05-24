So <a href="http://www.decafbad.com/blog/tech/old/oooodh.html" target="_top">on this day last year</a>,
I was excitely thinking about pipelining webservices together like commands in a
UNIX command line shell.  Lately, I've been doing quite a bit of work at the
command line level, more so than I ever have before.  And for all the clunkiness
and inelegances to be found there, I think the zen has stuck me.
<br /><br />
Sure, it's an ass-ugly string of characters that connects commands
like find, sort, awk, sed, grep, and ssh together.  But, in constructing such
monstrosities, I find myself generating new disposable tools at a rate
of at least one every minute or so.  And, though a few have found themselves graduating
into fuller, cleaner, more general tools, I would have been stuck for
hours were it not for a quick multi-file grep across a vast plain of comma-separated
value files digested by a tag team of sed and awk.  Then, like magic, I toss in
an incredibly slow yet, at the time, convenient call to mysql on another server
behind a firewall via ssh with a SQL call constructed from the regurgitations
of said sed and awk brothers.
<br /><br />
So, I'm thinking again:  How hot would this be if it were web services replacing
each of my commands?  How hot would it be if there was a STDIN, STDOUT, and STDERR
for a whole class of web services?  Imagine an enhanced bash or zsh piping these
beasts together.  For awhile, I thought my <a href="http://www.decafbad.com/twiki/bin/view/Main/XmlRpcFilteringPipe">XmlRpcFilteringPipe</a> API was the way to
go, but lately I've been thinking more in the direction of <a href="http://www.decafbad.com/twiki/bin/view/Main/REST">REST</a>.  I have to admit
that the XML-RPC API is a bit clunky to use, and besides, no one's really paid
it much notice besides using it in the peculiar fashion I do to make my <a href="http://www.decafbad.com/twiki/bin/view/Main/WeblogWithWiki">WeblogWithWiki</a>.
<br /><br />
How about this for a simpler API:  Post data to a URL, receive data in response.
There's your STDIN and STDOUT.  What about STDERR?  Well, I suppose it's an
either-or affair, but standard HTTP header error codes can fill in there.  What
about command line arguments?  Use query parameters on the URL to which you're
posting.  This all seems very web-natural.
<br /><br />
Now I just have to write a shell that treats URLs as executable commands.
<!--more-->
shortname=web_service_pipelines

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087414">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.novaroot.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0af1f52a082bc92d355d3fc9b29b4c2e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.novaroot.com">Patrick Lioi</a>
                </div>
                <a href="#comment-221087414" class="permalink"><time datetime="2003-03-06T16:27:11">2003-03-06T16:27:11</time></a>
            </div>
            <div class="content">What would really be beautifil about this is if you could give it a config file (or somesuch) that maps a url to a command name, so the actual commands you enter wouldn't have to look, or even feel, like urls.  I say the more it feels like a regular command line, the better.</div>
            
        </li>
    
        <li class="comment" id="comment-221087417">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.pipetree.com/qmacro"><img src="http://www.gravatar.com/avatar.php?gravatar_id=1e7ff23dbea0c7d56117bcd51b58b581&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.pipetree.com/qmacro">DJ</a>
                </div>
                <a href="#comment-221087417" class="permalink"><time datetime="2003-03-06T16:40:43">2003-03-06T16:40:43</time></a>
            </div>
            <div class="content">Hi 

This is something I was talking to some friends about last year at OSCON. There's a lot of mileage in it, I think. I personally have been doing this sort of thing on and off since then, mostly using off the shelf tools such as wget, curl, GET and POST (the latter two from the Perl LWP bundle; you can do PUT with the POST command too). 

The one question that remains is how to convey the HTTP status code. I've wrapped the call in a script to put the HTTP status code and headers to STDERR, and any HTTP body to STDOUT, but that's not perfect (what about multipart HTTP bodies, for example, with each part having their own HTTP headers)...

In all though it's extremely useful. 

One thing that this sort of approach does for the mind is dispel the myth that REST is bound in any way to XML (of course it's not, but some people seem to think it's XML specific). Use GET (the command) to GET a representation of some data that's plain text. It comes streaming down STDOUT as perfect fodder for your array of shell tools (grep, sort, etc). Lovely.</div>
            
        </li>
    
        <li class="comment" id="comment-221087420">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=ccb463174df28eddf522e220456d40f2&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">matt</a>
                </div>
                <a href="#comment-221087420" class="permalink"><time datetime="2003-03-07T10:19:09">2003-03-07T10:19:09</time></a>
            </div>
            <div class="content">Great post - I thouroughly agree.  Check out some of the tools from Propylon (http://www.propylon.com).  Also, Sun submitted a note to the w3c on xml pipeline definitions (http://www.w3.org/TR/xml-pipeline/).</div>
            
        </li>
    
        <li class="comment" id="comment-221087423">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://mah.everybody.org/weblog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d39ca715bca0c4fa3020bd5f8b445f67&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://mah.everybody.org/weblog/">Mark A. Hershberger</a>
                </div>
                <a href="#comment-221087423" class="permalink"><time datetime="2003-03-08T16:32:10">2003-03-08T16:32:10</time></a>
            </div>
            <div class="content">Check out AxKit (http://www.axkit.org/).  It has XML pipelines that use Providers (which produce XML or XML Infosets) as the source and uses XPATH, XSLT, etc. to process the data.

I'm working on an RSS provider, for example, as part of my Weblog software.

(The data doesn't /have/ to be XML, but using XML as the interchange format makes things easier.)</div>
            
        </li>
    
        </ul>
    
        </div>
    