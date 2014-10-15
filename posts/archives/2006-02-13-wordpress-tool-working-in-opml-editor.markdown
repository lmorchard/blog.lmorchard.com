---
comments_archived: true
date: '2006-02-13T14:48:55-05:00'
layout: post
tags:
- asides
title: WordPress tool working in OPML Editor
wordpress_id: 875
wordpress_slug: wordpress-tool-working-in-opml-editor
wordpress_url: http://decafbad.com/blog/2006/02/13/wordpress-tool-working-in-opml-editor
---
<p>So, I'm not sure if this is due to my not having upgraded to WordPress 2.0 or what, but it seems like there was a bug in the XML-RPC parser used by WordPress 1.5 which prevented the WordPress Tool from working within the OPML Editor.</p>
<p>I did a little skullduggery in the bowels of <code>xmlrpc.php</code> and <code>class-IXR.php</code> to discover that it was picking up CDATA from outside the elements defining items of data.  I stuck in a quick line to clear that buffer (<code>$this->_currentTagContents</code>) at the start of each element parsed, which seems to have helped.  But, not having fully grasped what all is going on in there, I hope I haven't broken anything else.</p>
<p>But, for now, it appears that this tool has worked for me finally.  Because, in fact, this very entry was posted from within the OPML Editor rather than my usual ecto window.</p>
