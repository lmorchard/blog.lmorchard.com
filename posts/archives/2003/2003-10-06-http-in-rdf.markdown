---
comments_archived: true
date: '2003-10-06T15:45:12-04:00'
layout: post
title: RDF representations of HTTP transactions?
wordpress_id: 492
wordpress_slug: http-in-rdf
wordpress_url: http://www.decafbad.com/blog/?p=492
---
<blockquote cite="http://ilrt.org/discovery/chatlogs/rdfig/2003-10-06#T14-01-47"><i>13:52:29 &lt;monkeyiq&gt; is there a notation for capturing browse
histories in rdf?
<br /><br />
13:53:25 &lt;DanC&gt; good question, monkeyiq... I wanted something
like that a while ago...
<br /><br />
13:53:30 &lt;DanC&gt; I didn't find anything in particular.</i></blockquote>
<div class="credit" align="right"><small>Source:<cite><a href="">#rdfig: hypertext histories and RDF schemas for HTTP</a></cite></small></div>
<p>
For what it's worth, I'm looking <a href="http://rdfig.xmlhack.com/2003/10/06/2003-10-06.html#1065448897.942970">for this</a> too.  I've done a little bit
of work in cobbling together some RDF representations of HTTP transactions,
in order to record browsing history in a rich way.  I've
basically just been mapping from <a href="http://www.ietf.org/rfc/rfc2616#">HTTP/1.1</a>
header fields to RDF properties.  It's been a little while, but I seem to remember that both 
<a href="http://www.decafbad.com/cvs/dbproxy/plugins/metaminer/lib/metaminer/__init__.py?rev=HEAD&content-type=text/vnd.viewcvs-markup">dbproxy's metaminer plugin</a>
and
<a href="http://www.decafbad.com/cvs/AgentFrank/plugins/MetaMiner/src/com/decafbad/www/filter/MetaStoreQueue.java?rev=HEAD&content-type=text/vnd.viewcvs-markup">AgentFrank's MetaMiner plugin</a>
have implementations toward this end.  Sooner or later, I'll get back to one project or
the other, and I'd really like someone else to do my homework on this. :)
</p>
<!--more-->
shortname=http_in_rdf
