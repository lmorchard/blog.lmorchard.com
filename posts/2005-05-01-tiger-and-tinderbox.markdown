---
comments_archived: true
date: '2005-05-01T14:36:18-04:00'
layout: post
title: Tiger and Tinderbox
wordpress_id: 636
wordpress_slug: tiger-and-tinderbox
wordpress_url: http://www.decafbad.com/blog/?p=636
---
<blockquote>Obviously, it would be difficult to find a stronger [Tinderbox][tb] advocate than I am, and it's the tool I reach for first and most often for my information management needs. But the OS itself is offering more and better tools to help with these sorts of tasks all the time, and it would be great if there was closer cooperation between the application and the OS.</blockquote>
  <div align="right"><small>Source: <cite><a href="http://www.doug-miller.net/blog/archive/tinderboxandtiger.html">Doing Something Different: Tinderbox and Tiger</a></cite></small></div>

Could [Tinderbox][tb] become an über-interface for Spotlight?  With all the indexed metadata available to on files in Tiger, it makes me wonder how feasible it would be to explode [Tinderbox][tb]:  

Make it a relationship manager and visualizer for files on disk, based on their metadata, rather than maintaining its own private single-file database of notes and their attributes.  Plain old notes could be turned into RTF and text files, and all sorts of other media types could be included.  Links could be represented in metadata, and parent-child relationships come for free as folder/file.  

[Tinderbox][tb] is immensely powerful for its graphical views and templated export capabilities, as well as its amazing agent capabilities.  I've completely succumbed to its ways for capturing and organizing ideas, having completely abandoned outliners and personal wikis over the past year or two.  But, having all this stuff locked in its silo offends my sensibilities, so I've resisted dipping too deep into all of its advanced capabilities.

To be fair, [Tinderbox][tb] bends over backwards to ensure your data is accessible, by saving files as XML for which there are even [XSL-based manipulation tools available][tbxsl].  But, I'd love to be able to use some shell tools and file-based scripts to rummage through my knowledge base, which is just a little to awkward with [Tinderbox][tb] at the moment.

But, just imagine if every [Tinderbox][tb] note was just another file on disk.  There're probably a large number of reasons why this is an unworkable idea, but...

[tbxsl]: http://www.istop.com/~maparent/tinderbox/
[tb]: http://www.eastgate.com/Tinderbox/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087552">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://lee-phillips.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0c5348f3fda8b3ebd21dac4cdb617e1e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://lee-phillips.org">Lee Phillips</a>
                </div>
                <a href="#comment-221087552" class="permalink"><time datetime="2005-05-02T10:09:04">2005-05-02T10:09:04</time></a>
            </div>
            <div class="content">It's a little clumsy, but you can use Tinderbox in a style where your notes are files on disk. I outline the procedure in 

http://lee-phillips.org/osx/tinderbox/tinderext/

which was pointed to on the Tinderbox mailinglist:

http://lee-phillips.org/mailman/listinfo/tb</div>
            
        </li>
    
        <li class="comment" id="comment-221087553">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://doublesquids.net/coffeeblog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=5728219ddefcfc26326e62be43bf1f97&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://doublesquids.net/coffeeblog/">Jonathan D. Leavitt</a>
                </div>
                <a href="#comment-221087553" class="permalink"><time datetime="2005-12-14T04:57:56">2005-12-14T04:57:56</time></a>
            </div>
            <div class="content"><p>Maybe I don't understand what you're suggesting, but I think you can do it with Tinderbox with its bundled download software. Once you've created a Tinderbox file with whatever you wnat in there (Mine is a catchall called "Laptop Tinderbox #1") create a folder wherever you want and call it something like "Tinderbox Explosion." This works best if you assign the HTML export file "struct.html" to every note, and make sure that all the children are exported from every note that has them. These assignments can be made in various ways, including the Value stamp.
When you are ready, do "Export as HTML" from the File menu, or Command-Shift-H if you prefer. Export to your designated folder, which will fill up with HTML files, hierarchical hypertext with all the links intact (make sure you have checked all the llink export boxes in the Preferences before you export.)
Each HTML file is searchable with Spotlight, and can be opened in your browser by clicking in the Spotlight window. Essentially, it is a formatted individual note. If you don't like what's in the folder, drag the contents to the Trash and tweak the Tinderbox file before doing it again. The HTML files can be printed to PDF and from there coverted to rtf or plain text.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221087554">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221087554" class="permalink"><time datetime="2005-12-14T05:38:06">2005-12-14T05:38:06</time></a>
            </div>
            <div class="content"><p>No, what I've got in mind is quite a bit different.  Imagine that Tinderbox becomes a bit of a Finder replacement.  The notes in the Map view are actual files—text files, Word docs, what have you—and Tinderbox stores its attributes (including map position) in Spotlight-indexed metadata attached to files.  Agents become enhanced Smart Folders.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    