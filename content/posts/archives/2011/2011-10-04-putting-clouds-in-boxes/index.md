---
layout: post
title: "Putting clouds in boxes for webdevs at Mozilla"
tags: [mozilla, contributors, volunteers, vagrant, puppet, virtualization, webdev]
published: true
date: 2011-10-02T22:45:37.146720
---

**TL;DR**: <em>At Mozilla, we're redoubling efforts to attract contributors. And, in the Webdev team, we're [using virtual machines][playdoh] to make it even easier to get started hacking. It makes no sense to demand that a JavaScript ninja or a CSS artisan also be a Python-wielding sysadmin, so we're trying to build [ready-baked VMs for our projects][devimages].</em>

<a href="http://www.flickr.com/photos/erix/3998080471/" style="display: block; float: right; text-decoration: none; border: none; margin: 0 0 1em 1em"><img src="61610e181a18.jpg" style="width: 300px" /><br /><small>Lieferung 3 by erix on Flickr</small></a>

Firefox is more than just a desktop browser, and Mozilla is more than just Firefox. An ever-growing mass of our code is going toward building web sites and services that [build][releng], [ship][downloads], [update][aus], [support][sumo], [promote][promote], [augment][amo], [document][mdn], [sync][sync], [share][share], [identify][identity], and [report][socorro]. (And I'm sure I'm missing a further cast of hundreds, here.) 

### Sighting storm clouds on the horizon

In other words, more and more of Mozilla is in the *cloud*. Unfortunately, many of these projects are really hard to get into as a contributor. It's often hard to find what needs doing in Bugzilla, and it's often hard to get the code up and running in a meaningful way without being both a bit of a sysadmin and a Mozilla insider.

This is a huge problem. Although Mozilla has a core group of employees, we're not nearly enough to build all of these projects and pursue [the mission][mission] on our own. We've gotten to where we are thanks to the volunteer efforts of thousands of contributors—and the only way we'll get where we want to go is through the efforts of thousands (or *[millions][]*) more. The good news is that is feels like we're [waking up to this problem][contribute] and starting to get [really serious about it][remo]. 

### Sharing recipes for fluffy clouds

For my part, I've spent idle time over the past few years trying to work out how to make webdev projects more accessible to new contributors. We've come a long way from the days of just uploading WordPress to an FTP server; these things come with a lot of moving parts nowadays, and the `INSTALL.txt` files run long and consume weekends. And so, they filter out all but the most dedicated (or masochistic) volunteers.

For months, I spun my wheels playing with virtual machines and exporting appliances, doing a lot of things by hand. But then, earlier this year, I discovered both [Vagrant][] and [Puppet][] and had my mind blown. With those tools, I could share recipes for VMs right alongside my code. 

I would never have to set up a webdev environment for myself by hand again—all the fiddly bits of installation and configuration could be codified, checked into github, and flushed from my brain.  But, the real magic is that I could *share* this stuff. So, future coworkers and collaborators could benefit from the same reproducible dev enviroments—*never having wasted brainpower and weekends on an INSTALL.txt to begin with*. 

This is a really big deal. I [presented on it this past June at Open Source Bridge][osbridge] in Portland ([slides][]). I've been talking myself blue about this stuff for months, in opposition to my usual serially enthuastic habits. But, it looks like I've infected my coworkers at Mozilla, because now we're talking about [developing with Vagrant, Puppet, and Playdoh][playdoh].

### No assembly required

So, with [Vagrant][], [Puppet][], and [Playdoh][], we'll have projects that you can fire up with just a `git clone` and a `vagrant up` in a command line shell. Forget about [MacPorts][] or [Homebrew][] on Mac OS X, or whatever it is that people using Windows have to install. Take a bike ride or go to lunch, and you'll have a fully configured server running and source code ready for hacking.

I think we can do better, though. For one, spinning up a fairly complex virtual machine from scratch with [Vagrant][] and [Puppet][] takes a long time and a lot of bandwidth. This can be sped up by [packaging pre-built boxes][boxes]. So, one improvement we can pursue is to spin up VMs with Vagrant as a part of our continual integration and deployment processes and package boxes for public download. These are also handy on a thumb drive for sharing at hack events and meetups.

This still requires [Vagrant][] and working with the command-line, though. Not everyone who has something valuable to contribute is a command-line jockey. And, a few of us webdevs have run into issues with [Vagrant][]—it's still early days for that project, after all. Additionally, not everyone who could be a Mozilla contributor owns the kind of hardware necessary to support running a substantial virtual machine.

So, I've also started playing with [Puppet][] by itself, to build plain-vanilla VM appliances and to spin up cloud servers on [Amazon EC2][ec2] and [Rackspace Cloud Servers][rackspace]. It's going pretty well, and it's conceivable we could do without [Vagrant][] to script the build of [downloadable VM appliances][ovf] and to spin up disposable cloud servers.

### So, now what?

There are still some issues to be worked out, so [I've started a wiki page][devimages]. And, we need to spread the word that we're doing this to see what people think—and more importantly, see if this helps attract more help. From my years at Mozilla so far and bouncing between projects, VM appliances are things I wish I'd had when faced with a new project. So, having been there—albeit with insider advantages—I'm pretty optimistic that this is a good step forward.

Of course, it's not the only step: The other thing I mentioned—and have conveniently avoided addressing again throughout the rest of this post—is the issue of finding things to do in Bugzilla. Well, we're working on that too. It's a bit beyond the scope of this blog post, but we have a Mozilla-wide effort to start classifying [good first bugs][gfb] for new contributors and [identifying mentors][mentors] to contact for help.

So... what do you think?

[gfb]: https://bugzil.la/sw:%5Bgood%20first%20bug%5D
[mentors]: http://blog.paulbiggar.com/archive/helping-new-contributors-part-2-mentoring/
[macports]: http://macports.org/
[homebrew]: https://github.com/mxcl/homebrew/
[rackspace]: http://www.rackspace.com/cloud/
[ec2]: http://aws.amazon.com/ec2/
[ovf]: http://en.wikipedia.org/wiki/Open_Virtualization_Format
[boxes]: http://vagrantup.com/docs/boxes.html
[devimages]: https://wiki.mozilla.org/Webdev:DevBoxVMImages
[slides]: http://decafbad.com/2011/06/os-webdev-vm/slides.html
[playdoh]: http://blog.mozilla.com/webdev/2011/10/04/developing-with-vagrant-puppet-and-playdoh/
[devops]: http://en.wikipedia.org/wiki/DevOps
[osbridge]: http://lanyrd.com/2011/osbridge/sdxby/
[vagrant]: http://vagrantup.com/
[puppet]: http://www.puppetlabs.com/
[remo]: https://wiki.mozilla.org/ReMo
[contribute]: https://wiki.mozilla.org/Mozilla.org/Contribute
[millions]: http://commonspace.wordpress.com/2011/02/22/nmm-redux/
[promote]: https://wiki.mozilla.org/Engagement
[socorro]: https://wiki.mozilla.org/Socorro
[releng]: https://wiki.mozilla.org/ReleaseEngineering
[aus]: https://wiki.mozilla.org/AUS
[credits]: http://www.mozilla.org/credits/
[downloads]: http://www.mozilla.org/en-US/firefox/fx/
[amo]: https://addons.mozilla.org/
[sumo]: http://support.mozilla.com/
[mdn]: https://developer.mozilla.org/
[flux]: https://wiki.mozilla.org/Webdev/Flux
[fennec]: http://www.mozilla.org/en-US/mobile/
[sync]: http://www.mozilla.org/en-US/mobile/sync/
[identity]: http://identity.mozilla.com/
[share]: https://wiki.mozilla.org/Labs/F1
[mission]: http://www.mozilla.org/about/mission.html
[involved]: http://www.mozilla.org/contribute/

<!-- vim: set wrap wm=5 syntax=mkd textwidth=70: -->
