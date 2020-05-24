<blockquote>An interesting sidebar is that the new Atom format doesn't have a version attribute and I understand it will sit in the same namespace. I tried a few rss clients with the new format and many crashed.</blockquote>
<div align="right"><small>Source: <cite><a href="http://www.burningdoor.com/eric/archives/001148.html">Randy Charles Morin, in comments on "Format Wars, Episode 3"</a></cite></small></div>

I've been pretty much tuned out of the development of Atom, due to a complete lack of time and an assumption that it'll all make sense once it's all been hashed out.  My ears have perked up with [the "last call" noises][lastcall] coming from that direction, so I'm getting the sense that I should start paying attention again.  (And I might need to think about updating [my book][book]!)  

From what little I've seen in my glimpses at drafts issued since this standards process started, there have of course been changes--some small tweaks like changing the &lt;feed>-level &lt;tagline/> to &lt;subtitle/>, and some subtle tweaks in the content model.  I've yet to see anyone chronicle or report on these changes, but I assume that's because it's such a moving target not yet worth tracking.  That, or I've just missed something.
  
But, changes these are, and incompatibilities they make.  So, the above comment concerns me--I don't want to read [another article about mythical compatibility][incom], this time about Atom.  [I figured versioning by namespaces was a good thing,][nsver] versus some arbitrary "version" attribute on the root element of a feed--but in any case, versioning is a must.  Unfortunately due to my tune-out, I have no idea whether the above assertion is true, a misunderstanding, or where to find the context surrounding the issue.  

Rather than jump onto the mailing list or something and ask what's likely a well-hashed issue, I'll restrain my ignorance to my own blog, then, while I continue googling and idly browsing through list archives as time permits.  But, just in case someone knows all about this and feels like tossing me a bone, I'm posting this entry.

**Update #1:** The following bit I'd missed on first glance in the latest Atom draft makes me think that this may not end up being a problem (anyone feel free to correct me):

> This specification uses XML Namespaces [W3C.REC-xml-names-19990114] to uniquely identify XML element names. It uses the following namespace prefix for the indicated namespace URI;

> "atom": http://purl.org/atom/ns#draft-ietf-atompub-format-08

> [rfc.comment.1: This paragraph to be removed by the RFC Editor. The  namespace here is a temporary one and will be changed when the  IESG approves this document as a standard. At that time, the  namespace will be drawn from W3C URI space. The choice of that  namespace will be coordinated between the IETF and W3C through  their respective liaisons.]

[incom]: http://diveintomark.org/archives/2004/02/04/incompatible-rss
[nsver]: http://www.decafbad.com/blog/2003/07/12/echo_unique_namespaces
[lastcall]: http://www.tbray.org/ongoing/When/200x/2005/04/20/Atom-Format-Last-Call
[book]: http://www.decafbad.com/blog/2005/04/25/hacking_rss_and_atom_is_a_real_book

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221089981">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.intertwingly.net/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e2dda5e47fccc5ff0daa87debf48162b&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.intertwingly.net/blog/">Sam Ruby</a>
                </div>
                <a href="#comment-221089981" class="permalink"><time datetime="2005-04-27T12:19:34">2005-04-27T12:19:34</time></a>
            </div>
            <div class="content">You found the correct area of the spec.  Also related: 

http://www.intertwingly.net/wiki/pie/PaceRemoveVersionAttr
http://www.intertwingly.net/blog/2005/04/21/Atom-Format-Last-Call</div>
            
        </li>
    
        <li class="comment" id="comment-221089983">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.kbcafe.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b02f842303e275bacf9a66c710b2ee8a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.kbcafe.com">Randy Charles Morin</a>
                </div>
                <a href="#comment-221089983" class="permalink"><time datetime="2005-04-28T15:57:10">2005-04-28T15:57:10</time></a>
            </div>
            <div class="content">I don't understand this version by namespace thingy. It would seem to me that versioning by namespace is gonna mean recoding every client for every version of the spec. Unfortunately, like yourself, I dropped out of the Atom noise list long ago.</div>
            
        </li>
    
        </ul>
    
        </div>
    