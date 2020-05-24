---
comments_archived: true
date: '2006-12-19T11:21:40-05:00'
layout: post
tags:
- asides
- webdev
- firefox
- javascript
- dhtml
- xoxooutliner
title: drag and drop and the missing mouseup
wordpress_id: 1026
wordpress_slug: drag-and-drop-and-the-missing-mouseup
wordpress_url: http://decafbad.com/blog/2006/12/19/drag-and-drop-and-the-missing-mouseup
---
<blockquote cite="http://www.thinkvitamin.com/features/design/create-cross-browser-vector-graphics#comment-34453">With the draggable circles - click, drag, move the mouse outside the rectangle, release the mouse button. Now move the mouse back inside the rectangle, and it still thinks your dragging, even though you’ve mouse-up’d.<br /><br />I guess this is because it’s not catching the onmouseup when you’re outside it’s “domain”. Perhaps make it automatically trigger the mouseup when the pointer leaves the area?</blockquote><div class="quotesource">Source: <a href="http://www.thinkvitamin.com/features/design/create-cross-browser-vector-graphics#comment-34453">Vitamin Features » Create cross browser vector graphics - Comment by Steve</a></div>

So, that <code>dojo.gfx</code> thing is cool - but what caught my eye in the above-linked article is the above-quoted comment.  Drag and drop and missed mouseups seem to be an issue everywhere.  I can't seem to get around them in my [XoxoOutliner](http://decafbad.com/trac/wiki/XoxoOutliner) drag code, [YUI DnD examples](http://developer.yahoo.com/yui/examples/dragdrop/drag.html?mode=dist) seem to suffer from it, and hell - even Firefox itself doesn't seem immune:  Try drag-selecting some text, wander off-window with the mouse, release the mouse button.  For me at least, on my Mac, the drag-selection keeps doing its thing when I wander back on-window.   No me gusta.
