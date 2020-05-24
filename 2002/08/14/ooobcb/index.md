<p>Ack.  Okay, so I started tinkering with <a href="http://www.alphaworks.ibm.com/tech/bml">Bean Markup Language</a> as the configuration glue for my Java app.  So far it seems to be working very nicely and doing everything I want it to do.  The problem, though, is that as I look around for examples and things I notice that it seems as if this project is dead.  I look further, and I realize...  <i>I can't find any source code to this thing.</i>  And here I am working it into the core of my app.</p>
<p>Well, I'd hate to start over and reinvent this wheel, since it seems to be such a nice wheel.  Between the clean definition of beans and their properties, and the ability to toss little bits of script (using the <a href="http://oss.software.ibm.com/developerworks/projects/bsf">BSF</a>) in there to further tweak things, it seems perfect.  But the apparent abandonment of the project and my lack of source gives me the willies.</p>
<p>So...  Does anyone out there know anything about what's happened with the <a href="http://www.alphaworks.ibm.com/tech/bml">Bean Markup Language</a> project?  Could anyone get me the source?  Or, could someone point me to an equivalent alternative?  Because, if I can't find source or an equally powerful alternative, I'm tossing around the notion of re-implementing BML with a clone project if the license doesn't prohibit it.</p>
<p>Or am I completely crazy and barking up the wrong tree to begin with?  Is there a better, more elegant way to create and connect Java components together than this?  And is it free?</p>
<!--more-->
shortname=ooobcb

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221083506">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=9db42ab5ca7ead39c85c7efcd9569b10&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">robert</a>
                </div>
                <a href="#comment-221083506" class="permalink"><time datetime="2002-08-14T22:07:52">2002-08-14T22:07:52</time></a>
            </div>
            <div class="content">You might want to take a look at Jelly from Apache Commons (http://jakarta.apache.org/commons/sandbox/jelly/index.html) where it says in part "Jelly is a Java and XML based scripting and processing engine....  Jelly borrows many good ideas from both JSP custom tags, Velocity, Cocoon, Ant and the scripting engine inside XDoclet. Jelly can be used from the command line, inside Ant and Maven or inside a Servlet, Web Service, JMS MessageListener or embedded directly into your software."</div>
            
        </li>
    
        <li class="comment" id="comment-221083508">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://codaland.blogspot.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5188abf34af1fc19a02a6af3b7a43a94&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://codaland.blogspot.com">bo</a>
                </div>
                <a href="#comment-221083508" class="permalink"><time datetime="2002-08-14T22:36:35">2002-08-14T22:36:35</time></a>
            </div>
            <div class="content">The Bean Markup Language isn't dead! The mailing list is dead... and the site is very neglected... but it's still being widely used and the project'll be undergoing a rebirth soon at, you guessed it, the Jakarta Apache project. This should happen relatively soon, check the mailinglist of the BSF project @ the IBM site.</div>
            
        </li>
    
        <li class="comment" id="comment-221083509">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=2a38a7bd72d397b8e294210e22db9942&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Sanjiva Weerawarana</a>
                </div>
                <a href="#comment-221083509" class="permalink"><time datetime="2002-08-15T00:57:58">2002-08-15T00:57:58</time></a>
            </div>
            <div class="content">Hello,

I'm the original creator of BML and did the implementation along with another member of my team, Matt Duftler (I wrote the player and Matt wrote the compiler). 

We're also very unhappy to have left BML to stagnate a bit without "finalizing" in some form. Our group moved on to doing BSF (which is what bo is referring to in the previous post, not BML) and now work on a bunch of Web services stuff.

Some of the composition ideas in BML went into WSFL as well as its recently announced replacement BPEL4WS. However, neither of those is yet a full replacement for BML. We've always intended to get to a point where one composition language works for various models, including JavaBeans, but the underlying component model of Web services (WSDL, the IBM part of which was also developed by our group) is not yet rich enough for that.

So, that amounts to saying that I still believe BML has a useful role in life. We still have some of our original trusty users who periodically email us asking for status / updates etc.. 

What's the right thing to do? I am quite certain that we can get it open-sourced (I mean from an IBM process point of view), but I haven't yet been convinced that there'd be a willing community for it yet. 

Jelly doesn't quite sound the same as BML; BML is strictly a composition language and is not a scripting language. (If you care to read more about the difference I can point you to a paper we wrote and to others' papers.)

So, would BML be interesting as an open-source project? If so, where?

Sanjiva.</div>
            
        </li>
    
        <li class="comment" id="comment-221083511">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221083511" class="permalink"><time datetime="2002-08-15T01:01:47">2002-08-15T01:01:47</time></a>
            </div>
            <div class="content">Well, I saw this message concerning a move of the Bean Scripting Framework to Apache...  But I see that used all over the place, like in NetBeans & BeanShell.  I don't see any mention of BML though.

It would be very cool if it really does all come together over at Jakarta.  In the mean time, I think I'll check out Jelly, too, though BML is looking perfect for me.</div>
            
        </li>
    
        <li class="comment" id="comment-221083513">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221083513" class="permalink"><time datetime="2002-08-15T01:09:22">2002-08-15T01:09:22</time></a>
            </div>
            <div class="content">Ah, heh, I see our comments crossed each other within a few minutes here.  :)  But yeah, Jelly looks like it could be coaxed into doing compositional duties, but it's not really geared toward that I think.

I think BML would be a great Open Source project, maybe over at Apache (though I don't know anything about their processes), or at SourceForge.  The strange thing to me, though, is that I can see a ton of uses for BML but I barely see it mentioned while searching via Google.  Yet, I've been hard pressed to find something that does what it does, let alone do it better.

Usually when I don't see much mention of a tech, it tells me that either the tech is not all it's cracked up to be, or that not too many people have heard of it.  The first possibility seems unlikely to me, since I've found it obviously useful.  Maybe if some more word got out about it in an Open Source re-release, it would pick up steam?

Thanks a lot for the comment in my blog though!  I probably should have just gone straight to you with an email, Sanjiva, but I figured you'd have moved on by now :)</div>
            
        </li>
    
        </ul>
    
        </div>
    