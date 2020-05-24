<p>
In case anyone is interested in using <a href="http://del.icio.us/">del.icio.us</a> with <a href="http://www.blosxom.com">blosxom</a> in place of my own <a href="http://www.decafbad.com/twiki/bin/view/Main/BookmarkBlogger">BookmarkBlogger</a>, get yourself a copy of <a href="http://xmlstar.sourceforge.net/">xmlstarlet</a> and check out this shell script:
</p>
<textarea rows="14" cols="70">
#!/bin/bash

DATE=${1-`date +%Y-%m-%d`}
BLOG="/Users/deusx/desktop/decafbad-entries/links"
FN="${BLOG}/"`echo ${DATE} | sed -e 'y/0123456789-/oabcdefghij/'`".txt"

curl -s -u deusx:HAHAHA 'http://del.icio.us/api/posts/get?dt='${DATE} |\
	tidy -xml -asxml -q -f /dev/null |\
	xml sel -t -o "Quick Links" -n \
			-e 'ul'  -m '//post' \
			-e 'li'  -e 'a' -a 'href' -v '@href' \
			-b -v 'text()' -n  > ${FN}

touch -d "${DATE} 23:59" ${FN}
</textarea>

<p>
You could do this with XSLT, but hacking with a REST-ish & XML producing web service entirely in a shell script seemed oddly appealing to me that week.  Extending this sort of thing to blogging systems other than blosxom is left as an exercise to the reader.
</p>
<p>
<b>Update:</b> Hmm, looks like one of the blosxom plugins I'm using hates the variables in my code above.  So I stuck curly braces in, which seem to get through okay.
</p>
<!--more-->
shortname=delicious_quicklinks

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086678">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://24.102.209.201/weblogs/ben/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=588bdfdda82be46c638d6956c55ebc38&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://24.102.209.201/weblogs/ben/">Gnomon</a>
                </div>
                <a href="#comment-221086678" class="permalink"><time datetime="2003-11-21T10:36:01">2003-11-21T10:36:01</time></a>
            </div>
            <div class="content">It's probably the interpolate_conditional or interpolate_fancy plugin - it tends to dislike entries that contain dollar symbols. I've wrestled with it in the past, but now I don't bother - I just use &amp;#036; to represent &#036; instead.</div>
            
        </li>
    
        <li class="comment" id="comment-221086679">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=b2083fa8a0f60df479da38dbc1256def&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Yay</a>
                </div>
                <a href="#comment-221086679" class="permalink"><time datetime="2003-12-05T20:01:13">2003-12-05T20:01:13</time></a>
            </div>
            <div class="content">Hi,
Cute script. I changed the last line like this to remove the file if it has got no links:

if test `cat ${FN} |wc -c` = 18; then rm ${FN}; else touch -d "${DATE} 23:59" ${FN}; fi</div>
            
        </li>
    
        </ul>
    
        </div>
    