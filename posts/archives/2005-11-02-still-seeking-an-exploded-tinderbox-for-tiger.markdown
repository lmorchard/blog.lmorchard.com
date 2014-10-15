---
comments_archived: true
date: '2005-11-02T01:03:10-05:00'
layout: post
tags:
- xoxo
- tinderbox
- spotlight
- tiger
title: Still Seeking an Exploded Tinderbox for Tiger
wordpress_id: 763
wordpress_slug: still-seeking-an-exploded-tinderbox-for-tiger
wordpress_url: http://decafbad.com/blog/?p=763
---
This is a recurring thought: I still really, really want [an exploded Tinderbox on Tiger][exp].  It could *so* become an *über* Spotlight/Finder replacement.  I just don't seem to have time or ambition to write it.

I don't mention [Tinderbox][tb] very often, but I've got a few Tinderbox documents set as Login Items on my PowerBook.  So, this app has become ubiquitous on my machine for [idea capture, sorting, and exploration][id].  In fact, I used it to capture, shape, and structure everything I put into [Hacking RSS and Atom][book].

However, I haven't ever gotten far into some of the more advanced features like agents or export templates.  My most used HTML export templates simply boil an outline of notes down into [XOXO][xoxo], and that's about it.  I have had [further][tree] [ambitions][drag] for richer Tinderbox export / extension, but I haven't pursued them much lately.  

Really, my main reason for not delving into Tinderbox's advanced features is that learning and using them effectively would burrow me further into the app's own pocket universe of conventions and technology.

Since Tinderbox saves to XML, I *can* bridge to a larger information space via [XSLT and XPath based tools][tools].  But, all the conversion and roundtrip can get kludgey and awkward—and I lose the ease of [life inside text files][txt] augmented by grep, awk, sed, vim, perl, python, [QuickSilver][qs], and [Markdown][md].

This is the point where I think opportunities presented by Tiger and the advent of Spotlight can come into play—especially with the availability of [SpotMeta][sm].  SpotMeta weds Spotlight with HFS Extended Attributes in order to enable the management of arbitrary user-specified metadata on files in addition to Spotlight Importer metadata.  

See, the main magic of Tinderbox—at least to me—is visualization and management of relationships between notions and microcontent.  At present, Tinderbox needs to swallow the universe to accomplish everything it wants to accomplish.  It needs to include word processor features and metadata handling and graphics and all.  

But, what if Tinderbox could surrender all of those functions up to TextEdit and MS Word and other desktop apps?  What if all of the "notes" in a Tinderbox document were just documents and files, and all of the relationships managed by Tinderbox (ie. spatial, links, aliased) were just encoded as extended attributes?

In this scenario, *the file system is the Tinderbox document*.  Don't want to use your whole hard drive?  Make a new disk image and compartmentalize things.  Tinderbox could become the world's most revolutionary Finder rethink ever invented.  And the thing is, I can see all of this being enabled by Spotlight and extended attributes.

<!-- tags: tinderbox tiger spotlight xoxo -->

[omnigraffle]: http://www.omnigroup.com/applications/omnigraffle/
[md]: http://daringfireball.net/projects/markdown/
[qs]: http://quicksilver.blacktree.com/
[txt]: http://www.43folders.com/2005/08/17/life-inside-one-big-text-file/
[tools]: http://www.maparent.ca/tinderbox/
[book]: http://www.amazon.com/exec/obidos/ASIN/0764597582/0xdecafbad01-20?creative=327641&amp;camp=14573&amp;link_code=as1
[id]: http://decafbad.com/blog/2005/08/11/quick-thoughts-for-a-thursday
[exp]: http://decafbad.com/blog/2005/05/01/tiger-and-tinderbox
[tb]: http://www.eastgate.com/Tinderbox
[sm]: http://www.fluffy.co.uk/spotmeta/
[tree]: http://decafbad.com/blog/2005/07/02/css-treemaps "Treemaps in CSS"
[drag]: http://decafbad.com/blog/2005/07/02/drag-the-boxes-stretch-the-lines "DHTML map views"
[xoxo]: http://developers.technorati.com/wiki/XOXO

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088906">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://robertbrook.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=760b4002b07650d4ef654f9fc17e8154&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://robertbrook.com">Robert Brook</a>
                </div>
                <a href="#comment-221088906" class="permalink"><time datetime="2005-11-04T13:16:12">2005-11-04T13:16:12</time></a>
            </div>
            <div class="content"><p>Much as I love Tinderbox, I just can't bring myself to completely trust it. The reasons? Similar to those mentioned below!</p>

<p>http://decafbad.com/blog/2005/11/02/why-proprietary</p>

<p>http://decafbad.com/blog/2005/11/02/why-microsoft</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088907">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://lee-phillips.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=0c5348f3fda8b3ebd21dac4cdb617e1e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://lee-phillips.org">Lee Phillips</a>
                </div>
                <a href="#comment-221088907" class="permalink"><time datetime="2005-11-07T15:06:19">2005-11-07T15:06:19</time></a>
            </div>
            <div class="content"><p>I have been thinking along these lines, too. A while back I outlined a little kluge that allows you to use external editors with Tinderbox in a fairly transparent way (click on the note and the editor for that note's type opens up). In this way of working the note contents are maintained as external files, and Tinderbox is used to show their relationships:</p>

<p>http://lee-phillips.org/osx/tinderbox/tinderext/index.html</p>

<p>Lately I've been thinking that I would like to write notes using templates (Cheetah, etc.) and store their attributes in a standard database, then have .dot files produced by a python program to visualize relationships. All open-source, and portable to any unix-style system. HTML export would almost come free, using one of python's many web frameworks. You lose Tinderbox's direct manipulation, but you escape from its "universe" (with its non-Cocoa crustiness).</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088909">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8e1d126ebdb4c95189c96a998d006c62&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">John Robert Cornell</a>
                </div>
                <a href="#comment-221088909" class="permalink"><time datetime="2005-11-18T17:52:30">2005-11-18T17:52:30</time></a>
            </div>
            <div class="content"><p>I've had the same thoughts about exploding Tinderbox for a while. Bruce Horn, one of the original members of the Mac team, is on to something similar: http://www.ingenuitysoftware.com/</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088913">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=f6cda270091f73aa4bd98739aa3f676e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Dowd McAllister</a>
                </div>
                <a href="#comment-221088913" class="permalink"><time datetime="2005-12-23T22:20:57">2005-12-23T22:20:57</time></a>
            </div>
            <div class="content"><p>I've been looking for something very similar. I like Tinderbox's simplicity and power, but for a while now, I've thought the tool would be easier to implement in Smalltalk http://www.squeak.org/</p>

<p>I'm just waiting around for Croquet http://www.opencroquet.org/ , honestly. Once that is released, I think the tool we're looking for would be almost trivial to build. (my ideal version of the tool includes network awareness and collaboration)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221088918">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=96d8316409f72a4bde8cf7ca90fb65e7&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Joe Mazz</a>
                </div>
                <a href="#comment-221088918" class="permalink"><time datetime="2006-03-20T09:38:28">2006-03-20T09:38:28</time></a>
            </div>
            <div class="content"><p>What intruiging ideas you are discussing here! 
You have struck a chord with my own hesitation to dive head-first into
Tinderbox (TB)--- the need to import (or re-enter) all my key note
content into its own "information repository," which even then 
would be only loosly connected to all the rest of the "notes" 
in thousands of other files on my computer. 
Another big limitation is its inabiliy to link notes 
between TB documents.</p>

<p>It appears that Spotlight+SpotMeta provide the
GUI to assign arbitray searchable attributes for file content, 
and SmartFolders provide some of the key functionality of TB agents. 
And I suppose symlinks in the OS effectively duplicate the primary
role of TB aliases (notes that can appear in any number of other
locations in the hierarchy).
But these still cover only portions of the functionality of Tinderbox.</p>

<p>What would provide the visualization component of TB that 
represents files as glyphs (at least like TB map view's "boxes", 
if not something more flexible and graphically rich),  and that
enables users to interactively create 
hyperlinks between files by drawing lines between them? 
Has anyone here come across, or perhaps started developing, a tool that
can simplify (graphically) creating hyperlinks between UNIX files?
Under the hood, clearly such a GUI would be making and breaking 
extended attributes shared in common between selected sets of files
in the HFS+ file system.</p>

<p>A recent post at macrumors.com suggests our creative friends at Apple
are perhaps already onto this idea (for Mac OS 10.5?):
http://forums.macrumors.com/showthread.php?t=156291&amp;page=6</p>

<blockquote>
  <p>From the rumors I'm hearing about the next version of Spotlight and 
  the possibility of creating linked relationships between objects, 
  it should be exciting times.</p>
</blockquote>

<p>How about the assignment of attributes to the hyperlinks between
documents (another unique and powerful TB feature)?</p>

<p>And what would represent the TB function of templates and agents for
automated formatting of selected content for HTML or XML documents by 
combining information from various files ("notes")? I suppose this could
be programmed/scripted in any number of ways, using say Python or even
Automator or AppleScript. </p>

<p>The possibilities truly are endless.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    