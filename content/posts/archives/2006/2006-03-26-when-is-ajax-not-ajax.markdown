---
comments_archived: true
date: '2006-03-26T12:29:46-05:00'
layout: post
title: When is AJAX not AJAX?
wordpress_id: 918
wordpress_slug: when-is-ajax-not-ajax
wordpress_url: http://decafbad.com/blog/2006/03/26/when-is-ajax-not-ajax
---
 <p>I started this as a comment over at <a href="http://alex.dojotoolkit.org/?p=551">Alex Russell's entry, "ajaxWrong"</a>, copied here because I felt like it.  He writes:</p>
     <ul>
     <li>
     <span><i>This thing is appropriating the necessarily amorphous terminology of &#8220;Ajax&#8221; for an implementation that is directly at odds with why Ajax is an important technology. A XUL app being billed as &#8220;Ajax&#8221; is just as laughable as a Flex or XAML app suddenly growing the same moniker. That it&#8217;s Mozilla&#8217;s walled-garden language doesn&#8217;t really excuse the gaffe.</i></span>
     </li>
     </ul>
 <p>I thought <a href="http://www.linspire.com/ajaxwrite.php">ajaxWrite</a> was pretty keen when I first tried it - I presumed there must've been a bit of nice trickery to get what is generally called an AJAX app to work like that.  Imagine my disappointed surprise when I realize that they used XUL.  XUL ain't AJAX, no matter how you try to deform and stretch the term.</p>
 <p>AJAX may be a coined term with an acronym of Asynchronous Javascript and XML, but it&#8217;s descriptive of a new wave of web programming practices.</p>
 <p>It&#8217;s not a spec, so you can&#8217;t get away with a literal reading of &#8220;There&#8217;s no HTML in AJAX, so neener!&#8221; It&#8217;s a community concensus term. And, XUL ain&#8217;t a part of it. Hell, read the list from <a href="http://adaptivepath.com/publications/essays/archives/000385.php">the original article coining the term</a>:</p>
     <ul>
     <li>
     <span>standards-based presentation using XHTML and CSS;</span>
     </li>
     <li>
     <span>dynamic display and interaction using the Document Object Model;</span>
     </li>
     <li>
     <span>data interchange and manipulation using XML and XSLT;</span>
     </li>
     <li>
     <span>asynchronous data retrieval using XMLHttpRequest;</span>
     </li>
     <li>
     <span>and JavaScript binding everything together.</span>
     </li>
     </ul>
 <p>That&#8217;s what AJAX means to <del>us</del> <ins>me</ins>. If you want it to mean something else and get away with it, you&#8217;re going to have to convince everyone who read that article and ran with that definition.</p>

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082587">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blog.ianbicking.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=cc8334869c9d2a9e603017f2da805eb3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blog.ianbicking.org">Ian Bicking</a>
                </div>
                <a href="#comment-221082587" class="permalink"><time datetime="2006-03-26T18:40:45">2006-03-26T18:40:45</time></a>
            </div>
            <div class="content"><p>The original Ajax definition doesn't make much sense either.  For example, XHTML isn't important -- work is typically done with the DOM or innerHTML, neither of which care one bit about XHTML.  They care intensely about HTML, though.  XML is not important either -- heck, just replace the X in Ajax with XMLHttpRequest, because that's what people often use.  JSON or HTML literals work just fine, and JSONP provides an interesting alternative to XMLHttpRequest that can't be done with XML at all.</p>

<p>Really, Ajax is a new set of practices being developed by a loose but forming community (in a realm where there was <em>no</em> community before), centered around <em>browsers</em> and Javascript and complementary server interaction.</p>

<p>Coming back around, I don't have a particular opinion, but AjaxWrite <em>is</em> browser-focused, and HTML-focused; XUL is not HTML, but it is more HTML than some arbitrary XML.  And it is Javascript focused.  I have no idea what the server component might look like; I suspect it may be very minimal.  I think it is a good attempt towards Ajax ideas.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082588">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://ejohn.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b3e04a46e85ad3e165d66f5d927eb609&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://ejohn.org/">John Resig</a>
                </div>
                <a href="#comment-221082588" class="permalink"><time datetime="2006-03-26T18:53:38">2006-03-26T18:53:38</time></a>
            </div>
            <div class="content"><p>I'm going to have to agree with Ian.  If it was using SVG instead of XUL - would it be 'AJAX'? Or how about the new canvas element in HTML 5? Much in the same way that you can have an 'AJAX' application that uses ActiveX controls. I believe that just because a technology isn't widely supported doesn't mean that it can't participate.</p>

<p>Now, from the point of view of a developer, XUL was a really crappy choice for a front-end - you're immediately excluding 80%+ of your audience (you know, the ones that you're trying to convert from using Word!). Nothing that I saw presented in ajaxWrite was a XUL-only feature. And this isn't even counting that fact that the application itself is very poorly designed.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082589">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082589" class="permalink"><time datetime="2006-03-26T18:58:48">2006-03-26T18:58:48</time></a>
            </div>
            <div class="content"><p>Bah!  You're both wrong!  I wave my hands at you!  :)</p>

<p>In my mind, AJAX and DOM Scripting are inexplicably tied together.  For me, the magic of AJAX was the discovery that plain old JS and DHTML apps could perform HTTP requests post page load.  HTML+CSS+JS+XHR means AJAX to me.  No XUL, SVG, canvas, or Flash.  </p>

<p>Well, maybe canvas...  er... and SVG is nice.  And we use an awful lot of Flash at work.. and..  Aw crap, maybe I don't know what I'm talking about after all.  My gut still says that the proper domain of AJAX is in formerly dead HTML+CSS sprinkled with XHR pixie dust, but I can't really back it up with more than opinion and what the originator of the term said.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082590">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.justplain.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=59570c72b938a14e030f187f7f71c366&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.justplain.org">Pieter Overbeeke</a>
                </div>
                <a href="#comment-221082590" class="permalink"><time datetime="2006-03-26T19:04:21">2006-03-26T19:04:21</time></a>
            </div>
            <div class="content"><p>What the 'general public' defines as Ajax is slowly changing from it's original meaning (Asynchronous JavaScript And XML) to 'a rich user interface experience'.
The problem is that people can't see and don't care what's going on under the hood, and their only association with ajax is rich user interface experience. 
I guess the ajaxwrite team thought they could get some extra attention by labeling their app 'Ajax'. And why would you be dissapointed about the fact that they used xul? I think it shows what is possible and how future (web)applications will look when xaml can be used in ie.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082592">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221082592" class="permalink"><time datetime="2006-03-26T19:23:33">2006-03-26T19:23:33</time></a>
            </div>
            <div class="content"><p>The use of XUL disappoints me because XUL is a Firefox/Mozilla app that happens to be web-transferred.  And XAML squicks me out because it's a Microsoft app that happens to be web-transferred.  Neither makes me happy when I'm trying to make broadly usable web applications across many platforms.  Neither XUL nor XAML will become the standards that HTML, CSS, and JS have become - even with their fuzzy semi-proprietary sidecars like XMLHttpRequest.</p>

<p>My association with AJAX comes from having written apps using it, and that's from where my grousing arises.  I don't care about the general public's definition of AJAX, just the developers who care about terms like "asynchronous" and "XML".  But it looks like "ajaxWrite" is a somewhat cynical attempt to cash in on public perceptions of AJAXian buzz.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221082593">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://blogs.opml.org/thewilk/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=6f010da6af916f57143ff4d04f6dfb83&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://blogs.opml.org/thewilk/">David Wilkinson</a>
                </div>
                <a href="#comment-221082593" class="permalink"><time datetime="2006-03-28T07:08:32">2006-03-28T07:08:32</time></a>
            </div>
            <div class="content"><p>Thanks for voicing this l.m. I'm registering my vote with you.</p>

<p>AJAX or AJAXY or AJAX-like has become one of those weird, undefinably vague web 2.0 type terms that means one thing: 'cool'.  I have had clients ask for cool AJAXY type web interfaces, and they don't even know what they are talking about. They just want it to be 'web 2.0 cool'. I can't wait to see a job description that asks for 5 years of AJAX experience. "Yeah, sure, I can do AJAX..., been doing it since 1984!"</p>

<p>I think the term has been over-used and over-hyped in this mini-bubble of excitement just to get a VC's attention. To me it means a server side remote-procedure call, that updates some part of a page without updating the whole page in a round-trip to the server, accomplished with some form of javascript and server side code via httpRequestObject.</p>

<p>I could charge extra dollars to develop an AJAXIAN Website. Wouldn't that be 'cool'. Almost nobody would know the difference, except you...</p></div>
            
        </li>
    
        </ul>
    
        </div>
    