---
comments_archived: true
date: '2006-02-20T13:58:15-05:00'
layout: post
tags:
- asides
title: OPML Community Server in PHP
wordpress_id: 889
wordpress_slug: opml-community-server-in-php
wordpress_url: http://decafbad.com/blog/2006/02/20/opml-community-server-in-php
---
 <p>More writing today, interspersed with bits of procrastination.  I started roughing out <a href="http://decafbad.com/trac/wiki/OpmlServer">a standalone OPML Community Server in PHP</a> this afternoon.  Who knows how far I'll get, but it has initial bare-bones support for registration, login, and upstreaming.  And when I say "support", I don't mean anything grandiose - it's really just a bunch of XML-RPC methods at this point, but it could turn into something interesting.</p>
 <p>There <i>is</i> one thing that kind of threw me for a loop in the OPML Editor user interface, though:  The "Change Community..." menu item assumes a port of 5337 for any XML-RPC server that's not <code>support.opml.org</code>.  That made me have to manually tweak my <code>dotOpmlData.prefs</code> to talk to my own server on port 80.</p>
