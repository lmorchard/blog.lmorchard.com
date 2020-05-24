So, in the last thing I posted, I wrote about how fixing problems on live web sites [feels like fixing space robots][1]. At <a target="_blank" title="Mozilla" href="https://www.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">Mozilla</a>, though, things have been getting steadily better and more interesting:

[<img src="http://ecx.images-amazon.com/images/I/41AvY4p2haL._SL160_.jpg" style="float:left; margin: 1em 1em 1em 0" />][2]

There&#8217;s still the *sysadmin-as-remote-pair-of-hands-driven-by-trouble-tickets* thing going on, but less so every day. More and more, we&#8217;re getting into [continuous deployment][3]. Our sysadmins are really smart cookies: They&#8217;re steadily replacing themselves with scripts of varying sizes. That way, they can get on to more interesting things. In fact, just recently, they gave us a great Big Red Button that deploys code from a git repository to the live site on demand. And, for some reason, I&#8217;m one of the people who got a key to it.

Okay, maybe not [*that* exact button][2], but ours is very keen. Of course, when it broke once, I felt like the Pakled on the right (and not Geordi):

<span class='embed-youtube' style='text-align:center; display: block;'></span>

But, the Big Red Button hasn&#8217;t broken very often. So, I&#8217;d rather be a Pakled some of the time than pretend to be a rocket scientist all of the time.

[<img src="http://octodex.github.com/images/twenty-percent-cooler-octocat.png" style="width: 150px; float: right; margin: 1em 0 1em 1em" />][4] Oh yeah, and [we&#8217;re using GitHub a lot these days][5]. It&#8217;s crazypants awesome for collaboration, and it fits right in with our style because we want to do everything in the open anyway. We&#8217;ve even somehow lured people who don&#8217;t normally code into [submitting Pull Requests][6]. And, it&#8217;s amazingly powerful to refer to specific lines of code and commits by URL in IRC or email.

[<img src="http://vagrantup.com/static/images/hippie.png" style="width: 150px; float: left; margin: 1em 1em 1em 0" />][7] I&#8217;ve also been getting a lot better at building development environments, [using Puppet and Vagrant][8] and Amazon EC2. I haven&#8217;t quite gotten to the point where I can borrow IT&#8217;s Puppet manifests directly &#8211; ie. those scripts with which sysadmins are replacing themselves.

But, we are maintaining the recipes for spinning up dev servers right alongside the code. Our READMEs are shrinking, rather than growing &#8211; and yet we&#8217;re still adding more services and dependencies. I no longer really fear totally jack-knifing my dev rig, because I can just toss it and conjure up another in the time it takes me to run to lunch.

Let&#8217;s see, what else? I&#8217;m sure I&#8217;ll think of something. Until then, SHIP IT. (The post, I mean.)

 [1]: http://blog.lmorchard.com/2012/07/10/webdev-in-spac
 [2]: http://www.amazon.com/gp/product/B004D18MCK/ref=as_li_ss_il?ie=UTF8&camp=1789&creative=390957&creativeASIN=B004D18MCK&linkCode=as2&tag=0xdecafbad01-20
 [3]: http://www.slideshare.net/MattBrandt/mozilla-continuous-deploment-on-sumo
 [4]: http://octodex.github.com/
 [5]: https://github.com/mozilla/
 [6]: https://github.com/mozilla/kuma/commit/1a8038215a2c4bb7fba5ff098875d034704d79bd
 [7]: http://vagrantup.com/
 [8]: http://opensourcebridge.org/wiki/2011/Inviting_Contributors_to_Open_Source_Webdev_through_Virtualization