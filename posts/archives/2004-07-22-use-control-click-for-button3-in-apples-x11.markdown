---
comments_archived: true
date: '2004-07-22T01:03:27-04:00'
excerpt: Something that has annoyed me for awhile is that Cmd-Click is what
    my X11 on OS X has been using by default to simulate a right-click.
layout: post
title: Use Control-Click for button3 in Apple's X11
wordpress_id: 534
wordpress_slug: use-control-click-for-button3-in-apples-x11
wordpress_url: http://www.decafbad.com/blog/?p=534
---
Popping in for a quick note.  Something that has annoyed me for awhile is that Cmd-Click is what my X11 on OS X has been using by default to simulate a right-click.  What I just found out is that I can do this:

    defaults write com.apple.x11 fake_button2 option
    defaults write com.apple.x11 fake_button3 control

Running `man Xquartz` in a terminal does wonders.
