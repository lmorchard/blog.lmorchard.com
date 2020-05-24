<blockquote>What I haven't seen is much discussion about a standard way to encode, upload, or manage microformats, except for Structured Blogging which defines a way to structure blog entries and has a plugin for one blogging application, WordPress. Somehow, I don't think having a plugin for each blogging application that has to implement an editor for each microformat is gonna scale well.</blockquote>
<div align="right"><small>Source: <cite>Ken MacLeod - <a href="http://bitsko.slc.ut.us/blog/2005/05/15#uformat-plugins">Steal this idea: Browser-based microformat plugins</a></cite></small></div>

How about a Greasemonkey script or bookmarklet that will hide a given textarea intended for HTML input, dynamically inserting a form in its place.  This form would contain all the fields necessary to build an hReview, hCalendar, hCard, or whatever flavor of microformat strikes your fancy.  

In the background, the hidden textarea gets populated with a microformatted version of the form's contents via HTML template.  Then, when you're done composing the microformat item, use a magic button or another script/bookmarklet to bring back the original textarea for further editing.

As long as your blogging tool supports posting HTML entries via a textarea in a form, this sort of thing should help facilitate the composition of microformat content.  And hopefully, focusing on the textarea itself can make this sort of thing fairly publishing-tool-agnostic.

Just a quick thought that I haven't time at the moment to implement or check for stupidity.

Of course, this whole idea of [shoehorning structured data into blogs and feeds via specially arranged HTML][shoe] strikes me as similar in spirit to XML-RPC, but it might just [be useful][useful] until something cleaner catches on ([or I catch on to it][catch])...

[catch]: http://www.decafbad.com/blog/2002/11/02/ooocae
[useful]: http://www.decafbad.com/blog/2002/11/26/oooccb
[shoe]: http://www.decafbad.com/blog/2005/05/05/the_right_place_for_data_in_your_feed

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087634">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.myelin.co.nz/post/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=475a543984769e9890f8dc0091f602c3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.myelin.co.nz/post/">Phillip Pearson</a>
                </div>
                <a href="#comment-221087634" class="permalink"><time datetime="2005-05-17T19:11:53">2005-05-17T19:11:53</time></a>
            </div>
            <div class="content">You talk about similarity with XML-RPC as if it's a bad thing ... :-)

Here's how I see it:

The h-formats (hReview, hCalendar etc) have the advantage that they can go anywhere HTML goes -- perhaps on a web page, or inside an RSS 'description' element.

Their disadvantage is that if you don't know about the specific format used, you won't even be able to realise that there is metadata attached to the review (or whatever).

This seems more like the problem with REST interfaces - you need to write a new parser each time.

My favourite thing about XML-RPC is that you can use the same code to send and receive calls every time, and the only thing that changes is what the arguments mean.

Perhaps an XML-RPC style approach to reviews would be more like Russell Beattie's recent suggestion, or like RSS-Data, which we talked about last year sometime, I think.

That way an aggregator could just look for certain standard tags, and then pass them off to a separate parser for review, rather than having to recognise certain "hidden" elements (class attributes etc).</div>
            
        </li>
    
        <li class="comment" id="comment-221087636">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=eb7f2a3ba74af37415ab7df101a86c75&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m. orchard</a>
                </div>
                <a href="#comment-221087636" class="permalink"><time datetime="2005-05-17T20:11:05">2005-05-17T20:11:05</time></a>
            </div>
            <div class="content">Oh, actually, my comparison was more like this:

XML-RPC : REST :: Microformats : RDF/XML

On the one hand, there's REST-- a nice, clean, standards pure way to do things.  And there's RDF, a nice, clean, spec pure way to do things.

On the other hand, there's XML-RPC-- a workable hack that shoehorns remote procedure calls across a channel not quite meant for that purpose.  And there're Microformats, workable hacks shoehorning data into a channel not quite meant for that purpose.

Except that, well, microformats are kinda in the middle, since there *is* a lot of effort made to express things in semantic HTML, rather than outright subverting the carrier wave.</div>
            
        </li>
    
        <li class="comment" id="comment-221087638">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philwilson.org/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=abb5e982d97d7539860141b7904ba31a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philwilson.org/blog/">Phil Wilson</a>
                </div>
                <a href="#comment-221087638" class="permalink"><time datetime="2005-05-18T08:35:46">2005-05-18T08:35:46</time></a>
            </div>
            <div class="content">Great idea!</div>
            
        </li>
    
        <li class="comment" id="comment-221087639">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dannyayers.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7028f422ca6da0180de6c9d922a3228f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dannyayers.com">Danny</a>
                </div>
                <a href="#comment-221087639" class="permalink"><time datetime="2005-05-29T07:53:32">2005-05-29T07:53:32</time></a>
            </div>
            <div class="content">I think the approach you describe sounds like it should be feasible - Greasemonkey seems a bit heavyweight, I'd guess a bookmarklet (perhaps appearing simply as a link in the blogging software) would be easiest.

Re. Phillip's point: "Their disadvantage is that if you don’t know about the specific format used, you won’t even be able to realise that there is metadata attached to the review (or whatever).".

It's  not as clear as it could be in the microformat docs, but these things can be decribed as profiles of XHTML, which can be indicated by a profile attribute (containing one or more URIs) in the head element of the doc. This is a *huge* plus. On the one hand it means the microformat data is globally identified as such, and potentially discoverable using existing tools (like Google). It also opens the way to use GRDDL (XSLT) to extract unambiguous RDF/XML from the XHTML. Taken as a whole, this means you don't need to know anything about the format in advance for it to be useful (in say a queryable RDF store).

btw, I'm in the process of a little proof-of-concept with microformat+GRDDL, working with DOAP (Description of a Project) data:
http://purl.org/stuff/hdoap/profile
so far, so good...</div>
            
        </li>
    
        </ul>
    
        </div>
    