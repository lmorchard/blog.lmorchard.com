---
comments_archived: true
date: '2007-07-09T16:21:41-04:00'
layout: post
tags:
- webdev
- php
- zend
- symfony
- frameworks
- django
- python
- curmudgeons
title: A Curmudgeon Playing with the Zend Framework
wordpress_id: 1058
wordpress_slug: a-curmudgeon-playing-with-the-zend-framework
wordpress_url: http://decafbad.com/blog/2007/07/09/a-curmudgeon-playing-with-the-zend-framework
---
<p>Because it's been awhile since I last surveyed the landscape, I played around a bit with web frameworks this weekend.  Mainly, I tried getting something simple working with the <a href="http://framework.zend.com/">Zend Framework</a>.  After intermittent play and much studying of documentation between Saturday and Sunday, I got to "hello world."</p>
<p>Unlike other web frameworks of late, Zend Framework doesn't come with any magical CLI tools to build out directory trees and / or generate code.  Being somewhat suspicious and curmudgeonly about that sort of magic to begin with, this actually struck me as an attractive thing about ZF.  In fact, what I really liked about ZF at first glance is that it's less of a monolithic <b>system</b> and more of a bucket of parts from a single source that fit together decently.</p>
<p>And, all my favorite parts are there:  Among other things there's <a href="http://framework.zend.com/manual/en/zend.config.html">config</a>, <a href="http://framework.zend.com/manual/en/zend.log.html">logging</a>, <a href="http://framework.zend.com/manual/en/zend.controller.html">a front controller</a> with <a href="http://framework.zend.com/manual/en/zend.controller.router.html">URL routing</a>, template-system agnostic <a href="http://framework.zend.com/manual/en/zend.view.html">view support</a>, and somewhat non-magical <a href="http://framework.zend.com/manual/en/zend.db.html">DB / model support</a>.</p>
<p>These were all things I'd grabbed from <a href="http://pear.php.net/">PEAR</a> for <a href="http://decafbad.com/svn/trunk/Cuckoo/lib/MiniFramework.php">my more recent PHP mini-framework</a> play, but I figured there should be some benefit from finding them in a unified collection like the Zend Framework.</p>
<p>The experience was somewhat similar to rolling my own, though.  I stumbled through some docs and eventually found some blog entries and a tutorial.  It's all very loosely-coupled and somewhat DIY, which is actually what I wanted.  The experience has left me wondering if I really <b>should</b> have wanted it, but I'm guessing it'll go easier from here on out.</p>
<p>In the meantime, though, I feel like I have a decent grasp on what all those loosely-coupled parts are doing.  I've skimmed through code, traced wires, broken things and watched the errors.</p>
<p>See, my problem with a lot of modern magic-imbued web frameworks is that I have a deep distrust of what they're doing.  They come with a lot of moving parts doing things that I don't see - and when I do finally see them, I tend to run into decisions with which I disagree.  I see abstraction where I think the gritty concrete needs to be left bare.  I often see lots of astronaut acrobatics that just have to be burning tons of cycles.  I see further acrobatics done to compensate, unrolling loops and pre-parsing config files - which requires further layers of magical tools to generate code and caches.</p>
<p>Too many moving parts wherein assumptions can hide, later to bite me when we're hundreds of miles into the post-launch desert and trying to fight scaling fires or develop a new feature with some weird angles to it.</p>
<p>For example, consider <a href="http://www.symfony-project.com/">Symfony</a> for PHP.  Their configuration system runs PHP code that results in YAML.  Parsing that YAML, along with cascading layers of other generated YAML, then drives a PHP code generation stage, composing all the static code necessary to bootstrap the framework with each request.  There's an amazing amount of flexibility exposed by that system, and it's quite clever -&nbsp;but my curmudgeonly side catches whiffs of insanity.</p>
<p>Maybe that's really the issue -&nbsp;I've been doing this stuff long enough to have written my own one of everything, so I've got my own opinions and I like to have a grasp on everything.  I've written front controllers, templating systems, and model abstraction layers.  I've worked in a half-dozen or so languages doing all the above.  I don't yet accept that web app development has <a href="http://mengwong.livejournal.com/38969.html">passed the da Vinci point</a> -&nbsp;a single developer should be able to grasp the structure of a web framework in mind without getting lost in too many fractal branchings.</p>
<p>Anyway, I'm rambling like an old grouch, but I think I've reached my point.  Hopefully more actual experimentation soon.</p>
