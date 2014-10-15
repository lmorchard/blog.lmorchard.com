---
title: How webdev is like space exploration
author: lmorchard
layout: post
permalink: /2012/07/10/webdev-in-spac
dsq_thread_id:
  - 1136633645
categories:
  - Uncategorized
tags:
  - mozilla
  - space
  - webdev
---
This isn&#8217;t so much a complaint as a set of observations: Sometimes, as a webdev, diagnosing and fixing issues on a live site in production gives me sympathy for NASA scientists dealing with remote space probes. And, that&#8217;s because I generally don&#8217;t have direct access to the servers. Instead, my access is mediated through sysadmins whose primary communication channel is trouble tickets. (Occasionally, I&#8217;ll be lucky enough to have someone I can pester more directly, but that&#8217;s a privilege that I try really hard not to abuse.)

[<img src="http://marsrovers.jpl.nasa.gov/overview/rover_low_angle_200.jpg" style="float:right; margin: 1em 0em 1em 1em" />][1] So, I build my own replicas of production sites, as best as I can. I deploy exploratory rovers into those environments, and try to account for what could happen based on everything I know up to this point. Once I&#8217;ve done all I can to prepare, I fire up the comms dish and beam out a request to the distant probe. This takes time because I have to wait until the receiver is in alignment, and there&#8217;s a transmission & reply delay due to distance. (*In other words, I file a bug and wait for someone to pick it up. That takes awhile, because we&#8217;re all busy people, and I&#8217;m a telecommuter who can&#8217;t just go tap someone on the shoulder.*)

I cross my fingers and hope I&#8217;ve built up a good-enough model of the remote environment, and maybe I&#8217;ll find that my hypothesis will be validated. If not, well, then I at least hope I haven&#8217;t broken anything, and hope that there&#8217;s new information in the reply that I can assimilate into my replica environment here back at home for an improved next attempt.

But, I&#8217;m not entirely sure how to improve this situation. If I had direct access to production servers, I&#8217;d be able to do more. However, if I had that access, I&#8217;d be *expected* to do more. You know, like wear a pager and wake up at 4am to fix an alarm condition. I&#8217;ve done that job in the past, and I don&#8217;t envy anyone who has it now.

There are also, I imagine, trust and confidentiality issues: even though I write the code, I&#8217;m not necessarily qualified to be in contact with certain kinds of sensitive data on a daily basis. (And by not qualified, I mean not bound by a certain class of contractual or legal obligations and not subject to certain kinds of training. I&#8217;ll say you can trust me, but trust is sometimes a formalized thing.)

Still, some days I like to imagine that what I&#8217;m doing is trying to debug the behavior of a robot in orbit around Mars. It keeps me from putting too many dents into my desk with my forehead.

 [1]: http://marsrovers.jpl.nasa.gov/home/index.html