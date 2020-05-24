---
comments_archived: true
date: '2009-07-15T11:26:40-04:00'
layout: post
tags:
- webdev
- firefox
- js
- outliners
- outlining
- javascript
- dhtml
- eventdelegation
- entries
- mozilla
- draganddrop
title: HTML5 drag and drop in Firefox 3.5
wordpress_id: 1793
wordpress_slug: html5-drag-and-drop
wordpress_url: http://decafbad.com/blog/?p=1793
---
<p><i>
Oh hey, look! It's another blog post—and this one
<a href="http://hacks.mozilla.org/2009/07/html5-drag-and-drop/">is cross-posted on hacks.mozilla.com</a>.
I won't say this is the start of a renewed blogging habit, but let's see what happens.
</i></p>

<style type="text/css">
dl { margin-left: 2em; }
dd { margin-left: 2em; margin-bottom: 0.25em; }
</style>
<div id="introduction">
    <p>
        Drag and drop is one of the most fundamental interactions
        afforded by graphical user interfaces.  In one gesture, it
        allows users to pair the selection of an object with the
        execution of an action, often including a second object in the
        operation.  It's a simple yet powerful UI concept used to
        support copying, list reordering, deletion (ala the Trash / Recycle Bin),
        and even the creation of link relationships.
    </p><p>
        Since it's so fundamental, offering drag and drop in web
        applications has been a no-brainer ever since browsers first
        offered mouse events in DHTML.  But, although
        <code>mousedown</code>, <code>mousemove</code>, and
        <code>mouseup</code> made it possible, the implementation has been
        limited to the bounds of the browser window.  Additionally,
        since these events refer only to the object being dragged,
        there's a challenge to find the subject of the drop when
        the interaction is completed.
    </p><p>

        Of course, that doesn't prevent most modern JavaScript
        frameworks from abstracting away most of the problems and
        throwing in some flourishes while they're at it.  But, wouldn't
        it be nice if browsers offered first-class support for drag and
        drop, and maybe even extended it beyond the window sandbox?
    </p><p>
        As it turns out, this very wish is answered by the HTML 5 specification 
        <a target="_new" href="http://www.whatwg.org/specs/web-apps/current-work/multipage/editing.html#dnd">section on new drag-and-drop events</a>, and 
        <a target="_new" href="https://developer.mozilla.org/En/DragDrop/Drag_and_Drop">Firefox 3.5 includes an implementation</a> of those events.
    </p><p>
        If you want to jump straight to the code, I've put together 
        <a target="_new" target="_new" target="_new" href="http://decafbad.com/2009/07/drag-and-drop/api-demos.html">some simple demos</a> 
        of the new events.  
    </p><p>

        I've even scratched an itch of my own and
        built <a target="_new" target="_new" target="_new" href="http://decafbad.com/2009/07/drag-and-drop/outline.html">the beginnings of an outline editor</a>,
        where every draggable element is also a drop target—of which
        there could be dozens to hundreds in a complex document, something
        that gave me some minor hair-tearing moments in the past
        while trying to make do with plain old mouse events.
    </p><p>
        And, all the above can be downloaded or cloned from 
        <a href="http://github.com/lmorchard/fx35-drag-and-drop">a GitHub repository</a>
        I've created especially for this article—which continues after the jump.
    </p>
</div>

<!--more-->

<div id="events">

    <h2>The New Drag and Drop Events</h2>
    <p>
        So, with no further ado, here are the new drag and drop events,
        in roughly the order you might expect to see them fired:
    </p>
    <dl>
        <dt><code>dragstart</code></dt>
        <dd>
            A drag has been initiated, with the dragged element as the
            event target.
        </dd>

        <dt><code>drag</code></dt>
        <dd>
            The mouse has moved, with the dragged element as the event target.
        </dd>
        <dt><code>dragenter</code></dt>
        <dd>
            The dragged element has been moved into a drop listener,
            with the drop listener element as the event target.
        </dd>
        <dt><code>dragover</code></dt>

        <dd>
            The dragged element has been moved over a drop listener,
            with the drop listener element as the event target.  Since
            the default behavior is to cancel drops, returning
            <code>false</code> or calling <code>preventDefault()</code> in
            the event handler indicates that a drop is allowed here.
        </dd>
        <dt><code>dragleave</code></dt>
        <dd>
            The dragged element has been moved out of a drop listener,
            with the drop listener element as the event target.
        </dd>

        <dt><code>drop</code></dt>
        <dd>
            The dragged element has been successfully dropped on a drop
            listener, with the drop listener element as the event
            target.
        </dd>
        <dt><code>dragend</code></dt>
        <dd>
            A drag has been ended, successfully or not, with the
            dragged element as the event target.
        </dd>
    </dl>

    <p>
        Like the mouse events of yore, listeners can be attached to
        elements using <code>addEventListener()</code> 
        directly or by way of your favorite JS library.  
    </p><p>
        Consider the following example using jQuery, 
        <a target="_new" target="_new" target="_new" href="http://decafbad.com/2009/07/drag-and-drop/api-demos.html#newschool">also available as a live demo</a>:
    </p>
    <pre lang="javascript" line="1">
<div id="newschool">
    <div class="dragme">Drag me!</div>
    <div class="drophere">Drop here!</div>
</div>

<script type="text/javascript">
    $(document).ready(function() {
        $('#newschool .dragme')
            .attr('draggable', 'true')
            .bind('dragstart', function(ev) {
                var dt = ev.originalEvent.dataTransfer;
                dt.setData("Text", "Dropped in zone!");
                return true;
            })
            .bind('dragend', function(ev) {
                return false;
            });
        $('#newschool .drophere')
            .bind('dragenter', function(ev) {
                $(ev.target).addClass('dragover');
                return false;
            })
            .bind('dragleave', function(ev) {
                $(ev.target).removeClass('dragover');
                return false;
            })
            .bind('dragover', function(ev) {
                return false;
            })
            .bind('drop', function(ev) {
                var dt = ev.originalEvent.dataTransfer;
                alert(dt.getData('Text'));
                return false;
            });
    });
</script>
    </pre>
    <p>
        Thanks to the new events and jQuery, this example is both short
        and simple—but it packs in a lot of functionality, as the rest
        of this article will explain.  
    </p><p>
        Before moving on, there are at least three things about the above
        code that are worth mentioning:
    </p>
    <ul>
        <li>

            <p>
                Drop targets are enabled by virtue of having
                listeners for drop events.  But, 
                <a target="_new" href="http://www.whatwg.org/specs/web-apps/current-work/multipage/editing.html#drag-and-drop-processing-model">per the HTML 5 spec</a>,
                draggable elements need an
                attribute of <code>draggable="true"</code>, set either in
                markup or in JavaScript.  
            </p>
            <p>
                Thus, <code>$('#newschool&nbsp;.dragme').attr('draggable', 'true')</code>.
            </p>

        </li>
        <li>
            <p>
                The original DOM event (as opposed to jQuery's event
                wrapper) offers a property called <code>dataTransfer</code>.
                Beyond just manipulating elements, the new drag and drop
                events accomodate the transmission of user-definable data
                during the course of the interaction.  
            </p>
        </li>
        <li>
            <p>

                Since these are first-class events, you can apply 
                <a target="_new" href="http://icant.co.uk/sandbox/eventdelegation/">the technique of Event Delegation</a>.
            </p><p>
                What's that?  Well, imagine you have a list of 1000
                list items—as part of a deeply-nested outline document,
                for instance.  Rather than needing to attach listeners
                or otherwise fiddle with all 1000 items, simply attach
                a listener to the parent node (eg. the
                <code><ul></code> element) and all events from
                the children will propagate up to the single parent listener.
                As a bonus, all new child elements added after page
                load will enjoy the same benefits.
            </p><p>
                <a target="_new" target="_new" target="_new" href="http://decafbad.com/2009/07/drag-and-drop/api-demos.html#delegated">Check out this demo</a>, 
                and 
                <a target="_new" target="_new" href="http://decafbad.com/2009/07/drag-and-drop/js/drag-delegated.js">the associated JS code</a> 
                to see more about these events and Event Delegation.
            </p>

        </li>
    </ul>
</div>

<div id="datatransfer">
    <h2>Using dataTransfer</h2>
    <p>
        As mentioned in the last section, the new drag and drop events
        let you send data along with a dragged element.  But, it's even
        better than that:  Your drop targets can receive data
        transferred by content objects dragged into the window from 
        other browser windows, and even <i>other applications</i>.
    </p><p>

        Since the example is a bit longer,  
        <a target="_new" target="_new" href="http://decafbad.com/2009/07/drag-and-drop/api-demos.html#data_transfer">check out the live demo</a>
        and 
        <a target="_new" href="http://decafbad.com/2009/07/drag-and-drop/js/drag-datatransfer.js">associated code</a>
        to get an idea of what's possible with <code>dataTransfer</code>.
    </p><p>
        In a nutshell, the stars of this show are the
        <code>setData()</code> and <code>getData()</code> methods of
        the <code>dataTransfer</code> property exposed by the Event object.
    </p>

    <p>
        The <code>setData()</code> method is typically called in the 
        <code>dragstart</code> listener, loading <code>dataTransfer</code>
        up with one or more strings of content with associated
        <a href="https://developer.mozilla.org/En/DragDrop/Recommended_Drag_Types#link">recommended content types</a>.
    </p>

    <p>
        For illustration, here's a quick snippet from the example code:
    </p>
    <pre lang="javascript" line="1">
var dt = ev.originalEvent.dataTransfer;    
dt.setData('text/plain', $('#logo').parent().text());
dt.setData('text/html', $('#logo').parent().html());
dt.setData('text/uri-list', $('#logo')[0].src);
    </pre>
    </p><p>
        On the other end, <code>getData()</code> allows you to query
        for content by type (eg. <code>text/html</code> followed by
        <code>text/plain</code>).  This, in turn, allows you to decide
        on acceptable content types at the time of the
        <code>drop</code> event or even during <code>dragover</code>

        to offer feedback for unacceptable types during the drag.
    </p><p>
        Here's another example from the receiving end of the example code:
    </p>
    <pre lang="javascript" line="1">
var dt = ev.originalEvent.dataTransfer;    
$('.content_url .content').text(dt.getData('text/uri-list'));
$('.content_text .content').text(dt.getData('text/plain'));
$('.content_html .content').html(dt.getData('text/html'));
    </pre>
    <p>
        Where <code>dataTransfer</code> really shines, though, is that
        it allows your drop targets to receive content from 
        sources outside your defined draggable elements and even from
        outside the browser altogether.  Firefox accepts such drags, 
        and attempts to populate <code>dataTransfer</code> with
        appropriate content types extracted from the external object.
    </p><p>

        Thus, you could select some text in a word processor window and
        drop it into one of your elements, and at least expect to find
        it available as <code>text/plain</code> content.  
    </p><p>
        You can also select content in 
        another browser window, and expect to see <code>text/html</code>
        appear in your events.  Check out the 
        <a target="_new" href="http://decafbad.com/2009/07/drag-and-drop/outline.html">outline editing demo</a>
        and see what happens when you try dragging various elements 
        (eg. images, tables, and lists) and highlighted content from
        other windows onto the items there.
    </p>

</div>

<div id="dragfeedback">
    <h2>Using Drag Feedback Images</h2>
    <p>
       An important aspect of the drag and drop interaction is a
       representation of the thing being dragged.  By default in
       Firefox, this is a "ghost" image of the dragged element itself.  But,
       the <code>dataTransfer</code> property of the original Event
       object exposes the method <code>setDragImage()</code> for use
       in customizing this representation.
    </p><p>

        There's
        <a target="_new" href="http://decafbad.com/2009/07/drag-and-drop/api-demos.html#feedback_image">a live demo</a> of this feature, as well as
        <a target="_new" href="http://decafbad.com/2009/07/drag-and-drop/js/drag-feedback-images.js">associated JS code</a> 
        available.  The gist, however, is sketched out in these code snippets:
    </p>
    <pre lang="javascript" line="1">
var dt = ev.originalEvent.dataTransfer;    

dt.setDragImage( $('#feedback_image h2')[0], 0, 0);

dt.setDragImage( $('#logo')[0], 32, 32); 

var canvas = document.createElement("canvas");
canvas.width = canvas.height = 50;

var ctx = canvas.getContext("2d");
ctx.lineWidth = 8;
ctx.moveTo(25,0);
ctx.lineTo(50, 50);
ctx.lineTo(0, 50);
ctx.lineTo(25, 0);
ctx.stroke();

dt.setDragImage(canvas, 25, 25);
    </pre>
    <p>
        You can supply a DOM node as the first parameter to 
        <code>setDragImage()</code>, which includes everything from
        text to images to <code>canvas</code> elements.  The
        second two parameters indicate at what left and top offset
        the mouse should appear in the image while dragging.
    </p><p>

        For example, since the <code>#logo</code> image is 64x64,
        the parameters in the second <code>setDragImage()</code>
        method places the mouse right in the center of the image.
        On the other hand, the first call positions the feedback
        image such that the mouse rests in the upper left corner.
    </p><p>
    </p>
</div>

<div id="dragfeedback">

    <h2>Using Drop Effects</h2>
    <p>
        As mentioned at the start of this article, the drag and drop
        interaction has been used to support actions such as copying,
        moving, and linking.  Accordingly, the HTML 5 specification 
        accomodates these operations in the form of the 
        <code>effectAllowed</code> and <code>dropEffect</code>
        properties exposed by the Event object.
    </p>
    <p>

        For a quick fix, check out the
        <a target="_new" href="http://decafbad.com/2009/07/drag-and-drop/api-demos.html#drag_effects">a live demo</a> 
        of this feature, as well as the
        <a target="_new" href="http://decafbad.com/2009/07/drag-and-drop/js/drag-effects.js">associated JS code</a>.
    </p><p>
        The basic idea is that the <code>dragstart</code> event
        listener can set a value for <code>effectAllowed</code> like so:
    </p>

    <pre lang="javascript" line="1">
var dt = ev.originalEvent.dataTransfer;
switch (ev.target.id) {
    case 'effectdrag0': dt.effectAllowed = 'copy'; break;
    case 'effectdrag1': dt.effectAllowed = 'move'; break;
    case 'effectdrag2': dt.effectAllowed = 'link'; break;
    case 'effectdrag3': dt.effectAllowed = 'all'; break;
    case 'effectdrag4': dt.effectAllowed = 'none'; break;
}
    </pre>
    <p>The choices available for this property include the following:</p>
    <dl> 
        <dt><code>none</code></dt><dd>no operation is permitted </dd>
        <dt><code>copy</code></dt><dd>copy only </dd>

        <dt><code>move</code></dt><dd>move only </dd>
        <dt><code>link</code></dt><dd>link only </dd>
        <dt><code>copyMove</code></dt><dd>copy or move only </dd>
        <dt><code>copyLink</code></dt><dd>copy or link only </dd>
        <dt><code>linkMove</code></dt><dd>link or move only </dd>

        <dt><code>all</code></dt><dd>copy, move, or link </dd>
    </dl>
    <p>
        On the other end, the <code>dragover</code> event listener 
        can set the value of the
        <code>dropEffect</code> property to indicate the expected effect
        invoked on a successful drop.  If the value does
        not match up with <code>effectAllowed</code>, the drop will
        be considered cancelled on completion.
    </p><p>

        In the 
        <a target="_new" href="http://decafbad.com/2009/07/drag-and-drop/api-demos.html#drag_effects">a live demo</a>,
        you should be able to see that only elements with matching
        effects can be dropped into the appropriate drop zones.  This
        is accomplished with code like the following:
    </p>
    <pre lang="javascript" line="1">
var dt = ev.originalEvent.dataTransfer;
switch (ev.target.id) {
    case 'effectdrop0': dt.dropEffect = 'copy'; break;
    case 'effectdrop1': dt.dropEffect = 'move'; break;
    case 'effectdrop2': dt.dropEffect = 'link'; break;
    case 'effectdrop3': dt.dropEffect = 'all'; break;
    case 'effectdrop4': dt.dropEffect = 'none'; break;
}
    </pre>
    <p>
        Although the OS itself can provide some feedback, you 
        can also use these properties to update your own visible 
        feedback, both on the dragged element and on the drop zone
        itself.
    </p>

</div>

<div id="conclusion">
    <h2>Conclusion</h2>
    <p>
        The new first-class drag and drop events in HTML5 and Firefox
        make supporting this form of UI interaction simple, concise,
        and powerful in the browser.  But beyond the new simplicity of
        these events, the ability to transfer content between
        applications opens brand new avenues for web-based applications
        and collaboration with desktop software in general.
    </p><p>
    </p><p>
    </p>
</div>


<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090962">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://lmframework.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=03dc722b1852367f02b0b21f02b10675&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://lmframework.com">David Semeria</a>
                </div>
                <a href="#comment-221090962" class="permalink"><time datetime="2009-07-16T17:56:52">2009-07-16T17:56:52</time></a>
            </div>
            <div class="content"><p>Wow - thanks for a great introduction to D+D in HTML 5, I'm really looking forward to giving it a thorough road test. </p>

<p>The key part of the implementation are the target listeners, because, as I'm sure you're aware, onmouseover would historically never fire over the target element because the dragged item would always 'cover it up'. BTW, my proposed solution was to add an 'event transparency' property, which would have made the dragged item invisible from the point of view of selected events, eg onmouseover.</p>

<p>This implementation is going to take a lot of pain away. You have no idea how many hoops I had to jump through to get a fully generic D+D implementation working without these new calls.</p>

<p>If you're interested, you can see it working here: http://lmframework.com/page.php?id=vd_twig_short_2</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090964">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=cee7ac3f63d7e8c1367e170bec302c14&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Alex</a>
                </div>
                <a href="#comment-221090964" class="permalink"><time datetime="2009-07-17T00:13:23">2009-07-17T00:13:23</time></a>
            </div>
            <div class="content"><p>Hey,</p>

<p>Looks great and useful article.  For dragging from external applications (such as the Desktop) is a normal webpage able to get the data from the drop?  I was just playing with it and seem to always get what seems to be a security error with getData or mozGetDataAt.  However, the documentation seems to state that on drop that data should be made available to the page.  Likewise, in the same way an image can be dragged off the page onto the desktop, can an arbitrary element be dragged onto the desktop with whatever file content to be saved?  Thanks for the help.</p>

<p>Alex</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090966">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://paulisageek.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b3bb70a4bace7f9bd49f48b149ab95f9&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://paulisageek.com/">Paul Tarjan</a>
                </div>
                <a href="#comment-221090966" class="permalink"><time datetime="2009-07-17T04:52:54">2009-07-17T04:52:54</time></a>
            </div>
            <div class="content"><p>Very nice, I didn't know that FF 3.5 actually had this implemented. Time to start playing :)</p>

<p>Also, how did you do your code posts? Was it just pasting in HTML or do you have a better setup?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090967">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=066d1e75c9b938053ee6b3d48b1c0f6a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Animal</a>
                </div>
                <a href="#comment-221090967" class="permalink"><time datetime="2009-07-17T14:35:21">2009-07-17T14:35:21</time></a>
            </div>
            <div class="content"><p>Seems pretty pointless pressing ahead with this when you just can't write a web app to use it. There's no support. All a bunch of whizzy fun I'm sure, but sod-all use.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090969">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221090969" class="permalink"><time datetime="2009-07-17T16:23:10">2009-07-17T16:23:10</time></a>
            </div>
            <div class="content"><p>@Animal: Why can't you write a web app to use it?  It's in the HTML5 spec, works in Fx3.5 and Safari 4 / WebKit.  It doesn't have universal support yet, or course, but new standards never do.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090970">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.crearedesign.co.uk"><img src="http://www.gravatar.com/avatar.php?gravatar_id=87bf21798e390d9043dda7240c1b60f7&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.crearedesign.co.uk">paul</a>
                </div>
                <a href="#comment-221090970" class="permalink"><time datetime="2009-07-21T08:08:26">2009-07-21T08:08:26</time></a>
            </div>
            <div class="content"><p>very nice indeed! i like this, it has definitely opened up new avenues for interaction without using flash. but it will take time before people upgrade to the new browser. a lot of people who browse the web wont realise what the technology will bring and will use their current browser because it does the job!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090971">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=04de859cfd6ef0b75e4ea3cbea143190&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Joel</a>
                </div>
                <a href="#comment-221090971" class="permalink"><time datetime="2009-07-21T14:36:04">2009-07-21T14:36:04</time></a>
            </div>
            <div class="content"><p>Excellent demos of the new features.</p>

<p>When using a feedback image on a zoomed in page, should the image not also be scaled up automatically?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090973">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="https://bugzilla.mozilla.org/show_bug.cgi?id=41708"><img src="http://www.gravatar.com/avatar.php?gravatar_id=6d3bf986abdbb431991c3b02eb6e2335&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="https://bugzilla.mozilla.org/show_bug.cgi?id=41708">RenegadeX</a>
                </div>
                <a href="#comment-221090973" class="permalink"><time datetime="2009-07-22T04:13:46">2009-07-22T04:13:46</time></a>
            </div>
            <div class="content"><p>Dragging &amp; dropping <em>is</em> as you say, a "one of the most fundamental interations" that users of computer graphical interfaces have come to know, and expect.</p>

<p>It therefore completes dumbfounds me how it is that we <em>still</em> can not natively drag &amp; scroll (&amp; then drop) in Firefox. We can only drag &amp; drop an item within the currently visible portion of a Firefox webpage or tab, no further up, no further down.</p>

<p>That is should be limited makes absolutely no sense. Microsoft built the function into their Windows 3.x (file) Explorer, and then when visual browsers came along, naturally carried it through into Internet Explorer. </p>

<p>Firefox Bug 41708, "Should be able to scroll in the viewport while dragging" was opened in June, 2000 (yes, 9 years ago!) and remains open, and is disregarded by Firefox developers as little more than a trivial little annoyance, and therefore is and should be treated as a low-importance 'enhancement' rather than as the 'standard feature' it should really be.</p>

<p>If it weren't for the extension 'DragToScroll', which has been around for 3-1/2 years now (not updated in a long time but still works if you override version compatibility), I would have dumped Firefox and switched to a different browser (Maxthon 3, most likely).</p>

<p>So, I'm wondering (and hoping) -- does the new HTML5 drag and drop specification include anything that if implemented properly would make it possible to scroll &amp; drag?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090974">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2377f34a68801b861c3e54e1301f0dce&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com">l.m.orchard</a>
                </div>
                <a href="#comment-221090974" class="permalink"><time datetime="2009-07-22T13:57:42">2009-07-22T13:57:42</time></a>
            </div>
            <div class="content"><p>@RenegadeX: Ugh.  I don't work on the browser itself, but I noticed that unexpected behavior on drag &amp; drop.  The window really should scroll when you get toward the top or bottom while dragging - and, in fact, most pre-HTML5 JS frameworks do that in their own drag &amp; drop abstractions.  </p>

<p>Until / unless Firefox gets this fixed, the same sort of auto-scrolling could be hacked in to HTML5 drag and drop.  Not perfect, but it's doable.  That is, in the drag event, you can check if the mouse is near the upper or lower edge of the viewport - and if so, start scrolling appropriately. That's pretty much how the JS frameworks do it with old-school D&D</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090975">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.copperbot.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=df48b2c2a3a2be51b1e15f10c5fb05da&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.copperbot.net">CopperBot</a>
                </div>
                <a href="#comment-221090975" class="permalink"><time datetime="2009-07-23T21:41:07">2009-07-23T21:41:07</time></a>
            </div>
            <div class="content"><p>Very cool article! Thanks for sharing. HTML5 really is going to change everything about how we use and develop for the web. Pretty awesome!</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090976">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.AmnesiaGames.cl"><img src="http://www.gravatar.com/avatar.php?gravatar_id=14ad888c23e28c85c222a73b6c633570&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.AmnesiaGames.cl">Alexos</a>
                </div>
                <a href="#comment-221090976" class="permalink"><time datetime="2009-07-26T05:05:44">2009-07-26T05:05:44</time></a>
            </div>
            <div class="content"><p>Hi, would DD work for uploading files? How can I display a progress bar?
Thanks! 
I've been looking for that several days, and found only applets which I can't use in my proyect :-)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090977">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.sjlwebdesign.co.uk"><img src="http://www.gravatar.com/avatar.php?gravatar_id=185cd965e0e8ccd15df2f90977cbeaf3&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.sjlwebdesign.co.uk">Sam</a>
                </div>
                <a href="#comment-221090977" class="permalink"><time datetime="2009-07-28T13:54:26">2009-07-28T13:54:26</time></a>
            </div>
            <div class="content"><p>Looks fantastic, going to try it out now (once I have upgraded my FF)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090978">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.dankantor.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=60fc8331f617fc905fd682bc4f41ce8d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.dankantor.com">Dan Kantor</a>
                </div>
                <a href="#comment-221090978" class="permalink"><time datetime="2009-07-30T03:10:25">2009-07-30T03:10:25</time></a>
            </div>
            <div class="content"><p>Looks like effectAllowed and dropEffect are not working for FF 3.5 on the Mac. I see effects on Windows and Safari 4 on Mac. I've been playing around with adding borders to the drop target, but the + icon for copy really helps a lot. Hopefully Mozilla will fix this next update.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090979">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.thecssninja.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=8677c9f7c0f6d947bf318c1430d00bfd&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.thecssninja.com/">Ryan</a>
                </div>
                <a href="#comment-221090979" class="permalink"><time datetime="2009-09-01T02:33:06">2009-09-01T02:33:06</time></a>
            </div>
            <div class="content"><p>Great article it's good to see developments in this area. I wrote an article on the further extensions Firefox 3.6 has done with the dataTransfer method by adding the file attribute so you can access local files and upload them without the need for file inputs. http://www.thecssninja.com/javascript/drag-and-drop-upload</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090982">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=1ed4bbef573bfc014d32356d53103ca2&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">phil swenson</a>
                </div>
                <a href="#comment-221090982" class="permalink"><time datetime="2009-09-03T22:58:36">2009-09-03T22:58:36</time></a>
            </div>
            <div class="content"><p>Why not a first class WYSIWYG rich text editor with copy from clipboard image support?  </p>

<p><em>NO ONE</em> has built a decent text editor in JavaScript - At least not that I've seen.  And browsers don't allow image paste for reasons I don't understand.  </p>

<p>And by decent I mean just like you'd get in textmate or another editor.  Have the standard text editor features everyone expects:  tab, select indent/select unindent, resize image, home, end, duplicate line, delete line, styling, etc.</p>

<p>would push the browser to the next level in killing the desktop.  non-techies hate wikis.  They want a real editor.  I do too actually.... would be great for forums, bug tracking system (imagine pasting screen shots in line with your bug desc), email, etc.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090983">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=deed51cddc830e162557b8f01383a057&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Jean-Denis</a>
                </div>
                <a href="#comment-221090983" class="permalink"><time datetime="2009-09-04T00:23:39">2009-09-04T00:23:39</time></a>
            </div>
            <div class="content"><p>Francisco Tomalski wrote up a nice piece on HTML 5 drag'n drop at http://www.alertdebugging.com/2009/08/16/on-html-5-drag-and-drop/</p>

<p>where he uncovers that the proposed standard is partially broken. Any comment on his piece?</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090984">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://html5tutorial.net/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=3876e030a3fc69a8b59a8c55829fb510&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://html5tutorial.net/">Lisa</a>
                </div>
                <a href="#comment-221090984" class="permalink"><time datetime="2009-09-09T07:33:08">2009-09-09T07:33:08</time></a>
            </div>
            <div class="content"><p>This is a great move forward no more relying on 3rd party apps and extensions to play video or audio, i have been reading up on HTML 5 at the <a href="http://html5tutorial.net/" title="HTML tutorials" rel="nofollow">HTML 5 Tutorials</a> website, i am now playing around with one of the free templates and was wondering how to embed audio, so thanks a lot, great information, lets hope more people lean towards HTML 5 and SOON!!!</p>

<p>The drag and drop feature i did not notice was already working in FF 3.5, i was told to get Safari to see HTML 5 in action. Thanks for a great post</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090985">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.useragentman.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9a579fa051b35266678735c8a3751771&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.useragentman.com">Zoltan Hawryluk</a>
                </div>
                <a href="#comment-221090985" class="permalink"><time datetime="2010-01-11T15:14:48">2010-01-11T15:14:48</time></a>
            </div>
            <div class="content"><p>A million thank yous!  This article was great introduction to HTML5 D+D.  With it, I was able to extend it to other browsers.  It was a little painful at first because the browser implementations diverge in significant, but manageable ways.</p>

<p>If you are interested, check out my article at http://www.useragentman.com/blog/2010/01/10/cross-browser-html5-drag-and-drop/ if you are interested in my results.</p>

<p>I noticed you haven't blogged in a while - I hope you haven't stopped totally and continue to share with the webdev community.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221090986">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.lingua-franka.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e65f416e42c12571ba1c86ae2dadd99f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.lingua-franka.com">Raul</a>
                </div>
                <a href="#comment-221090986" class="permalink"><time datetime="2011-04-26T23:56:02">2011-04-26T23:56:02</time></a>
            </div>
            <div class="content"><p>Hi, Leslie. I've just come across a problem that's driving me nuts. I'm not fully comfortable with D&amp;D, but managed to move a crosshairs image over a map to very precisely controlled positions. It worked great on FF 3.6 and FF 4. After a couple of days of successful testing, the image suddenly refused to de dropped after being dragged (it rather flew back to its previous position). Do you know if there is a bug in FF that might cause this? </p>

<p>BTW, during the programming process I updated Firebug, which also is getting a little cranky.</p>

<p>Thanks for your prompt answer, Raul</p></div>
            
        </li>
    
        <li class="comment" id="comment-324410737">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://disqus.com/api/users/avatars/google-4014af7ac4ea5d00df95bef4503b78dd.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Alexander Plutov</a>
                </div>
                <a href="#comment-324410737" class="permalink"><time datetime="2011-10-01T11:51:12">2011-10-01T11:51:12</time></a>
            </div>
            <div class="content">Good post about Drag & Drop http://plutov.by/post/html5_drag_and_drop</div>
            
        </li>
    
        </ul>
    
        </div>
    