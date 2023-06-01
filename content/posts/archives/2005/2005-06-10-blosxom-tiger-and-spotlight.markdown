---
comments_archived: true
date: '2005-06-10T09:53:10-04:00'
layout: post
title: Blosxom, Tiger, and Spotlight
wordpress_id: 649
wordpress_slug: blosxom-tiger-and-spotlight
wordpress_url: http://www.decafbad.com/blog/?p=649
---
Another tinkering project idea:  Use Spotlight and HFS Extended Attributes in OS X Tiger to build an enhanced rendition of Blosxom.  Blosxom already uses Unix file attributes to track blog posting dates, but now Spotlight offers indexes that are fairly easy to query via command line or scripts.  I think it could also be used to facilitate search within blog postings, which are just text files anyway.

  Take this further:  What if I could just set arbitrary name/value pairs on files and get them indexed?  Title, tags, related links, author-- all things that would have been inside the Blosxom entry.  But now, they're in the file system and subject to Spotlight indexing and queries.  Hell, what if I could do this for any kind of file, not just text files?

  On a mailing list, [Lee Morgan asks this question][lm]:

  > I realize that the new HFS Extended Attributes are not exposed to the 
higher level API's yet, and also that Spotlight doesn't extract their 
contents during indexing. However I'm working on a application that 
would greatly benefit from Spotlight indexing this information. Is it 
possible to write a Spotlight importer that handles every file with 
out it interfering with other plug-ins? So that I can extract the 
extended attributes and add it to the Spotlight store.

  If anything, *this* is my biggest disappointment with Tiger and Spotlight.  So close to an open database-like filesystem like BeFS, but so far away.

  As I understand it, the issue is this:  

* HFS Extended Attributes allow you to attach arbitrary name/value pairs to files-- ie. `lmoProject = "Client #2345"`.
* Spotlight indexes name/value metadata associated with files-- ie. `kMDItemDisplayName = "Unison"`.
* However, Spotlight doesn't index the name/value metadata from HFS Extended Attributes.  Instead, the source of name/value data for Spotlight comes from importer plugins which interrogate file contents.  Huh, that kinda sucks: HFS metadata and Spotlight indexing seem made for each other.
* Spotlight importers are are keyed on the `kMDItemContentType` of a file and there can be only one Spotlight importer per file type.  Hmm, that seems limiting.

My sad conclusion?  Since there can only be one Spotlight importer per type, and none of these handle HFS Extended Attributes, there's no way I can see to somehow hack support for an HFS Extended Attribute importer into Spotlight across all file types without either replacing all importers or hacking the Spotlight core itself.

I suppose I could create a "new" file type that's really just a text file, but create an importer that can read RFC822-inspired headers in blog postings and index those.  

But I'd really like to rev things up by including MP3s (podcasts), MOVs (screencasts), and lots of other things besides text.  However, I want to apply my own arbitrary metadata to them--like tags and related links and contributors and such.  Instead, I'm stuck with whatever existing importers supply.  

Granted, there *is* a lot that these importers supply, which is better than nothing and there are certainly some ways I can think to hack things... But, it's just shy of being great.

[lm]: http://www.cocoabuilder.com/archive/message/cocoa/2005/5/4/134822

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221083831">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://plasmasturm.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e17949267bbfe21a0fadf1bbf00592b4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://plasmasturm.org/">Aristotle Pagaltzis</a>
                </div>
                <a href="#comment-221083831" class="permalink"><time datetime="2005-06-11T01:44:42">2005-06-11T01:44:42</time></a>
            </div>
            <div class="content">The importer interface is public, right? Is there anything that prevents someone from writing an importer that handles all files, but doesn't actually do anything, and just passes calls through to any number of other importers that it calls on without the aid of Spotlight?</div>
            
        </li>
    
        <li class="comment" id="comment-221083832">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.fluffy.co.uk/spotmeta/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a660afb8f1f22ce1b03ad3b532aa05b5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.fluffy.co.uk/spotmeta/">Ben Summers</a>
                </div>
                <a href="#comment-221083832" class="permalink"><time datetime="2005-10-20T14:58:11">2005-10-20T14:58:11</time></a>
            </div>
            <div class="content"><p><a href="http://www.fluffy.co.uk/spotmeta/" rel="nofollow">SpotMeta</a> extends Spotlight so you can add arbitrary metadata. It uses xattrs to store them, and is written in such a way that other developers can easily use them too.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    