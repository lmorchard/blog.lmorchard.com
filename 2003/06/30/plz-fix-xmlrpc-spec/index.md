I've written before that <a href="http://www.decafbad.com/blog/tech/old/oooccb.html" target="_top">I love XML-RPC</a>, and
that it has served me well in the past couple of years.  I think it's the right tool for a broad
range of jobs.  But, after having studied the spec, and after having implemented it in a handful
of languages for a handful of well-used apps, I think the spec needs just a bit of fixing.
<br /><br />
In particular, the spec needs a tweak with regards to this "ASCII limitation".  There is confusion
about this, period.  I've had to hash this out with clients before, this 
<a href="http://www.jspwiki.org/Wiki.jsp?page=WikiRPCInterfaceUTF8VsBase64" target="_top">was an issue of note</a> while
working out an <a href="http://www.decafbad.com/twiki/bin/view/Main/XmlRpcToWiki" target="_top">XML-RPC based Wiki API</a>,
and it's obviously an issue in many other projects.  This, of course, includes the current
<a href="http://www.sixapart.com/log/2003/06/why_we_need_ech.shtml" target="_top">hubbub surrounding weblog APIs and whatnot</a>.
<br /><br />
So, please fix the spec.  It shouldn't take long to make this issue a non-issue by some simple
clarification in the main <a href="http://www.decafbad.com/twiki/bin/view/Main/XmlRpc">XmlRpc</a> to which everyone refers.
<br /><br />
Yes, I know there's a bit of clarification at the end of the spec, involving escaping (
<a href="http://tbray.org/ongoing/When/200x/2003/06/28/Learning" target="_top">not encoding</a>) < and &amp; along
with the statement that "A string can be used to encode binary data."  
<br /><br />
Well, yeah, I do that
all the time with <a href="http://www.fourmilab.ch/webtools/base64/rfc1341.html" target="_top">Base64</a>.  And, since
the spec earlier had called for "ASCII", I assume that's what <a href="http://dictionary.reference.com/search?q=encoding" target="_top">encoding</a>
binary data means in the context of this spec.  To me, encoding implies a transformation 
from original form to some other form later requiring decoding.
<br /><br />
But, apparently, my interpretation and 
<a href="http://www.intertwingly.net/blog/1498.html#c1056921193" target="_top">the interpretation of others</a>
is wrong on that score.  But still, I've been confused, and so have others.  Consider this a bug report.
<br /><br />
I've been referred <a href="http://www.effbot.org/zone/xmlrpc-ascii.htm" target="_top">by Fredrik Lundh</a> (<a href="http://scriptingnews.userland.com/2003/06/29#When:6:21:27AM" target="_top">via Dave Winer</a>), 
to "private conversations",
"various public fora", and "early archives for the XML-RPC mailing list".  And, again by Fredrik Lundh,
<a href="http://www.effbot.org/zone/xmlrpc-ascii.htm" target="_top">I'm told</a>:
<blockquote><i>But even if you don't know all this, it's not that hard to figure it out for
yourself. Just make sure you read and digest the entire specification, apply some common sense
to sort out the contradictions, and you'll find that it's pretty obvious that the intent is that
you can use any character allowed by XML.</i></blockquote>
<br /><br />
Well, let's see.  I read the whole spec, more than once, and what I figured out for myself with my 
"common sense" is what I wrote above.  I thought
the spec called for ASCII (as in: <a href="http://www.asciitable.com/" target="_top">ASCII</a>), and assumed that
encoding binary data called for something like Base64.  Yes, I realize that <a href="http://www.decafbad.com/twiki/bin/view/Main/XmlRpc">XmlRpc</a> is XML, but
when a spec calls for ASCII as a particular part, I assume that there's a reason for it
since that's what the specification specified.  
<br /><br />
In my experience, specifications are not about common sense, figuring it out, and
<a href="http://dictionary.reference.com/search?q=connotation" target="_top">connotation</a>.  Specifications are
about declaration, clarity, and 
<a href="http://dictionary.reference.com/search?q=denotation" target="_top">denotation</a>.  
<br /><br />
Yes, I understand that no
spec is perfect, and that many are steaming piles meeting none of the criteria I just mentioned,
but that doesn't alter the goal.  A spec can always be made better by revising 
with these things in mind, given the input of consumers of the spec.  This is what a process
of communication is all about, and specifications are intended as a form of communication.
<br /><br />
So, instead of talking about <i>intent</i> and things that have been talked about somewhere
at some time, with the implication that I should just go off and search for these things, can 
we just get a clarifying fix to the <a href="http://www.decafbad.com/twiki/bin/view/Main/XmlRpc">XmlRpc</a> spec?  I don't want to send my clients off to 
mailing list and discussion archives, or present <a href="http://www.decafbad.com/twiki/bin/view/Main/XmlRpc">XmlRpc</a> with any corrections or caveats.  I
want to say, as I have been, "Here, go to xmlrpc.com, read the spec, implement to the API
I emailed you, and get back to me."  Only, it'd be nice if the first question is about my API, 
not about character encoding.
<br /><br />
I've been confused, and so have others.  I consider myself a smart person, and I consider most
of the others who have been confused as even smarter.  I apologize if my "common sense" is of a
different sort, but that's what you have to deal with in the world of people.  As young as I am,
even I've discovered this already.
<br /><br />
So, can we just get a clarifying revision of the spec?  And if not, why not?
<br /><br />
<b>Update:</b> Rock on.  After <a href="http://www.intertwingly.net/blog/1498.html#c1056890028" target="_top">catching up</a> 
on a bit of banter over at <a href="http://www.intertwingly.net/blog/1498.htm" target="_top">Sam's place</a>, I see that
the same Fredrik Lundh I quoted before has already begun an
<a href="http://effbot.org/zone/xmlrpc-errata.htm" target="_top">XML-RPC errata</a> page with the goal of clarification.
(I just missed it in my daily reading thus far.)  As 
<a href="http://www.intertwingly.net/blog/1498.html#c1056904400" target="_top">Mark comments</a>, I fear bumps in the
road as any confused implementors find things weren't what they thought, but I'm happy to see
the clarification accepted.
<br /><br />
<b>Update again:</b> If you've stopped rocking, resume.  Dave Winer 
<a href="http://scriptingnews.userland.com/2003/06/30#When:11:41:21AM" target="_top">updated the XML-RPC spec</a>.
It was a small change, could have been more, but had not been done at all until now.  I
doubt that my asking please really had much to do with it, but I couldn't guess that it 
hurt.  Thanks!
<!--more-->
shortname=plz_fix_xmlrpc_spec

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221084763">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://online.effbot.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=091389371fc39ff470d91c8d72f5fca4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://online.effbot.org">Fredrik Lundh</a>
                </div>
                <a href="#comment-221084763" class="permalink"><time datetime="2003-06-30T17:48:03">2003-06-30T17:48:03</time></a>
            </div>
            <div class="content">"I consider myself a smart person, and I consider most of the others who have been confused as even smarter."

Oh, I'm really stupid, but I had no problem noticing that the specification wasn't consistent with itself, and that three out of four references to encodings said that "any XML character" could be used ;-)

"So, can we just get a clarifying revision of the spec?"

Sure can; the "ASCII" is gone.

"And if not, why not?"

I don't have access to Dave's site ;-)

Cheers /F</div>
            
        </li>
    
        <li class="comment" id="comment-221084764">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://online.effbot.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=091389371fc39ff470d91c8d72f5fca4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://online.effbot.org">Fredrik Lundh</a>
                </div>
                <a href="#comment-221084764" class="permalink"><time datetime="2003-06-30T17:50:29">2003-06-30T17:50:29</time></a>
            </div>
            <div class="content">Oops. Looks like your comment tool ate my linefeeds.  Hope it liked them.  I'm sure anyone reading this can figure out where they were.</div>
            
        </li>
    
        <li class="comment" id="comment-221084766">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221084766" class="permalink"><time datetime="2003-06-30T20:11:20">2003-06-30T20:11:20</time></a>
            </div>
            <div class="content">Grr, that's a bug I've been meaning to fix for a month or so now.  While we're in the bug fixing mood...  your linefeeds are restored!

Oh, and since you replied, I'll take the minute to thank you for your XML-RPC work in Python.  It's saved my bacon more than once.  :)</div>
            
        </li>
    
        <li class="comment" id="comment-221084767">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=dc59c5ba9a8aa0a6225d9959eea3b7f3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Dave Winer</a>
                </div>
                <a href="#comment-221084767" class="permalink"><time datetime="2003-06-30T20:35:39">2003-06-30T20:35:39</time></a>
            </div>
            <div class="content">Glad to see we're back on friendly terms. ;-></div>
            
        </li>
    
        <li class="comment" id="comment-221084768">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=dc59c5ba9a8aa0a6225d9959eea3b7f3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Dave Winer</a>
                </div>
                <a href="#comment-221084768" class="permalink"><time datetime="2003-06-30T20:35:49">2003-06-30T20:35:49</time></a>
            </div>
            <div class="content">Glad to see we're back on friendly terms. ;-></div>
            
        </li>
    
        </ul>
    
        </div>
    