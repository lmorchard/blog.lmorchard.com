<div id="toc_container" class="toc_wrap_right no_bullets">
  <p class="toc_title">
    Contents
  </p>
  
  <ul class="toc_list">
    <li>
      <a href="#Finding_the_docs"><span class="toc_number toc_depth_1">1</span> Finding the docs</a>
    </li>
    <li>
      <a href="#Getting_the_source"><span class="toc_number toc_depth_1">2</span> Getting the source</a>
    </li>
    <li>
      <a href="#Running_the_project"><span class="toc_number toc_depth_1">3</span> Running the project</a>
    </li>
    <li>
      <a href="#Breaking_things"><span class="toc_number toc_depth_1">4</span> Breaking things</a>
    </li>
    <li>
      <a href="#Fixing_things"><span class="toc_number toc_depth_1">5</span> Fixing things</a>
    </li>
    <li>
      <a href="#Room_for_improvement"><span class="toc_number toc_depth_1">6</span> Room for improvement</a>
    </li>
    <li>
      <a href="#Still_digging"><span class="toc_number toc_depth_1">7</span> Still digging</a>
    </li>
  </ul>
</div>

Back in September, [I wrote that I wasn&#8217;t leaving MDN][1]. And, I&#8217;m not, really. But, it turns out that [FirefoxOS][2] needs some help to reach its first release milestones. So, some of us [webdevs from around Mozilla][3] are temporarily switching our daily efforts over to slay bugs on [Gaia][4]. That&#8217;s the layer of [FirefoxOS][2] which provides the overall system UI and core apps.

<!--more-->

I&#8217;m planning to return to primarily [MDN][5] work in a few months &#8211; but, right now, [FirefoxOS][2] is kind of a big deal.

Thus, like [some of][6] my [other][7] [colleagues][8] in the past month, I&#8217;ve gone from being a fully-operational battle coder on a project with which I have years of experience, to being a total noob with no idea how to find my way to &#8220;Hello world&#8221;. It&#8217;s been awhile since I last parachuted into the middle of an open source combat zone, so I fell back to my training to get my bearings:

1.  Find the docs
2.  Get the source
3.  Run the project
4.  Break something, see what happens, fix it
5.  Fix a known bug, submit a patch
6.  Try to improve the process of fixing things

## <span id="Finding_the_docs">Finding the docs</span>

Oddly enough, [MDN was a good place to start for docs][9]. Though, there are FirefoxOS docs spread between <a target="_blank" title="MDN" href="https://developer.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">MDN</a>, GitHub, and [wiki.mozilla.org][10]. And, of course, they are each in various states of freshness and truthiness. Keep your wits about you; here be dragons.

## <span id="Getting_the_source">Getting the source</span>

Getting the source for FirefoxOS is a bit of a trick question &#8211; it depends on what you want to do, and how you want to contribute:

*   [mozilla-b2g/B2G][11] is the mother of all repos. Only start there if you&#8217;re brave & interested in the whole shebang. Fair warning, though: When the smoke cleared hours later, and the README was done with me, I had acquired 17G of new stuff in my dev directory. But, you&#8217;ll have ALL the things, and you can flash FirefoxOS to compatible hardware. 
*   [mozilla-b2g/gaia][4] will be the most interesting if you&#8217;re like me and hoping to contribute as a webdev. That&#8217;s chock full of <a target="_blank" title="HTML" href="https://developer.mozilla.org/docs/Web/HTML?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">HTML</a>, <a target="_blank" title="CSS" href="https://developer.mozilla.org/docs/Web/CSS?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">CSS</a>, and <a target="_blank" title="JavaScript" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JavaScript</a>. It&#8217;s also pretty much free of pesky kernel code or device drivers that hurt my brain, because I&#8217;m not prepared to work at that low a level at this point in the morning. 

There are other repos, for the [Gonk][12] and [Gecko][13] layers of FirefoxOS. But, for the sake of my sanity, I&#8217;m trying to avert my eyes for now.

## <span id="Running_the_project">Running the project</span>

If you don&#8217;t have a compatible mobile device (and few do), you need a <a target="_blank" title="B2G" href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">B2G</a> Desktop build. While it&#8217;s true that many apps *will* run in Firefox Nightly, and there is an emulator you can build from the <a target="_blank" title="b2g" href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">b2g</a> repo, most apps are presently problematic in Firefox Nightly, and I&#8217;ve never gotten the emulator to build successfully.

You can either [build your own B2G Desktop][14], or [download a nightly build][15]. I&#8217;ve done both, and generally I recommend sticking with the nightly Aurora builds.

On OS X, I was able to download a nightly build and launch it with a double-click. That got things running &#8211; hooray! But, it didn&#8217;t get me productive straight away: The nightly build comes equipped with its own embedded build of Gaia, which makes it handy for trying out your own 3rd party apps but not-so-handy for hacking on Gaia itself.

To improve this situation, you need to do two things:

1.  [Build your own Gaia profile][16] from your own clone of [mozilla-b2g/gaia][4]. This is pretty much just running `make` or `DEBUG=1 make` from your git clone. 
2.  Run <a target="_blank" title="B2G" href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">B2G</a> Desktop from a terminal [with command line options][17] that tell it to use your new Gaia profile, rather than the built-in. 

So, at this point, I have the Gaia source and a means by which to run it on my laptop.

## <span id="Breaking_things">Breaking things</span>

After getting the project running as intended, I break something. And by that, I mean that I change a button title somewhere to &#8220;LOL BUTTS&#8221; or intentionally introduce an exception or syntax error somewhere. Then, I fix it. This is practice that exposes me to the guts of the thing; gets me into the edit/build/run cycle; shows me what it does when something goes wrong; and pushes me toward finding the tests.

But, I think I picked the wrong week to step into the arena, because everything came pre-broken. There were semi-known bugs preventing nightly builds of <a target="_blank" title="B2G" href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">B2G</a> Desktop from running my fresh clone of Gaia. It took me most of my first week to track down those bugs in bugzilla, find workarounds, and finally get something going. And then, it all broke again. And I found workarounds again.

Eventually, I was at a point where I built my own <a target="_blank" title="B2G" href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">B2G</a> Desktop from source with a particular patch from a particular bug applied, and *that* got me to the point where I could [submit my first pull request][18] to fix a broken test.

Happily, things seem to have stabilized since I started: <a target="_blank" title="B2G" href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">B2G</a> Desktop nightlies have been cooperating with bleeding-edge Gaia lately, so I&#8217;ve been able to stop building my own. So, now, when I find a combination of <a target="_blank" title="B2G" href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">B2G</a> Desktop and phone and Gaia checkout that works, I cling to that for dear life until it&#8217;s absolutely necessary for me to update one of the parts.

In short, FirefoxOS is very much in flux, right now. Bring a hard hat and expect delays.

## <span id="Fixing_things">Fixing things</span>

Once I&#8217;ve broken something and then fixed it, I usually have a sense for how to get real work done. Since then, I&#8217;ve been slowly wrapping my head around [the core Calendar app][19], and [my bug fixes have finally started trickling in][20].

Cobbling together a reliable Gaia-hacking workflow is complicated, though:

*   Some Gaia apps work in Firefox Nightly, at least partially. This is great, because Firefox has all the great tools like the <a target="_blank" title="DOM" href="https://developer.mozilla.org/docs/DOM?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">DOM</a> inspector and web console. And, for the most part, you can just save-and-refresh to see changes. 
*   All Gaia apps work in <a target="_blank" title="B2G" href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">B2G</a> Desktop, usually, though sometimes there are&#8230; quirks. This is good for seeing how changes work in a closer-to-real environment. But, <a target="_blank" title="B2G" href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">B2G</a> Desktop has none of the web developer tools offered by Firefox. And, to see changes, I generally have to save, relaunch <a target="_blank" title="B2G" href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">B2G</a> Desktop, then relaunch the app within the simulator. That&#8217;s pretty inconvenient.
*   All Gaia apps work on the <a target="_blank" title="Mozilla" href="https://www.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">Mozilla</a>-supplied dev phone &#8211; which almost no one has. Well, they work more often than they do on <a target="_blank" title="B2G" href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">B2G</a> Desktop and Firefox, anyway. But, including a phone in the dev iteration loop is downright painful: As opposed to the usual webdev experience of save-and-refresh, the phone demands a save-build-flash-restart-relaunch cycle. 
*   There is one awesome thing, at least for [the Calendar app][19]: [There are unit tests which run in B2G Desktop, but are driven by a node.js controller in my shell][21]. That lets me beat up on my code & logic in a &#8220;headless&#8221; context before jumping into Firefox, <a target="_blank" title="B2G" href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">B2G</a> Desktop, or the phone for a fuller integration test and a manual run-through. In fact, the unit testing framework even watches for file changes and will re-run tests right after a save, complete with a Growl notification of pass/fail.

## <span id="Room_for_improvement">Room for improvement</span>

Slowly but surely, I&#8217;ve gotten my minigun barrel spun up to start firing [piles of lead bullets][22] at Gaia bugs. But, it has been and continues to be a challenge. I&#8217;m hard-pressed to recommend it as a fun-time leisure project to anyone without a <a target="_blank" title="Mozilla" href="https://www.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">Mozilla</a> paycheck, or even as an off-hours interest for those who live-and-breathe Firefox. This is to be expected, since it&#8217;s not even a v1.0 project yet &#8211; but, I really, really hope things improve in the not-so-distant future.

*   We need to make sure that new contributors can get quickly from cloning the source to running the code. And it should *always* work &#8211; as in big, noisy automated tests fail when it breaks. I don&#8217;t care if it works fine on the phone if I can&#8217;t hack on it, at least from a contributor perspective. 
*   We need a consistent and convenient development environment for Gaia. All day, I bounce between things that are partly broken in Firefox, partly broken in <a target="_blank" title="B2G" href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">B2G</a> Desktop, and mostly working on the phone. This kills productivity and enthusiasm, all day. And, many times, no one else in the [#gaia channel on IRC][23] knows what I&#8217;m on about when I say something&#8217;s broken &#8211; because everyone&#8217;s dev environment is a unique little snowflake. 
*   My ideal workflow would never leave Firefox and my editor: Consider it a variant of the Responsive Design View, and ensure all the various APIs expected on a real phone are either working properly, polyfilled, or usefully stubbed out. Then, when it&#8217;s perfect in my most comfy environment, I can try it on a phone or standalone simulator as an afterthought. The [upcoming built-in Firefox OS Simulator][24] (née [r2d2b2g][25]) looks promising, but it needs to be seamless. 

## <span id="Still_digging">Still digging</span>

Even with the challenges, and even if my contributions are small, I&#8217;m happy to have the opportunity to work on FirefoxOS. It&#8217;s a big deal; it&#8217;s the next Firefox. So, I plan to keep ramming my head against this stuff to help make it better, and I hope we can start taking time to make making it better better, too!

 [1]: http://blog.lmorchard.com/2012/09/17/on-the-other-end-of-a-self-imposed-death-march-project#p[BInCtb]
 [2]: http://www.mozilla.org/firefoxos/
 [3]: http://blog.mozilla.com/webdev/
 [4]: https://github.com/mozilla-b2g/gaia
 [5]: https://developer.mozilla.org/
 [6]: http://blog.margaretleibovic.com/post/32836884540/challenges-getting-started-with-gaia
 [7]: http://bluesock.org/~willg/blog/gaia/gaia_onboarding.html
 [8]: http://schalk-neethling.com/2012/10/debugging-b2g-desktop-blank-screen-on-launch-gaia/
 [9]: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS
 [10]: https://wiki.mozilla.org/Gaia/Hacking
 [11]: https://github.com/mozilla-b2g/B2G
 [12]: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/Gonk
 [13]: https://developer.mozilla.org/en-US/docs/Gecko
 [14]: https://developer.mozilla.org/en-US/docs/Mozilla/Boot_to_Gecko/Using_the_B2G_desktop_client#Building_the_desktop_client
 [15]: https://developer.mozilla.org/en-US/docs/Mozilla/Boot_to_Gecko/Using_the_B2G_desktop_client#Download_a_nightly_build
 [16]: https://wiki.mozilla.org/Gaia/Hacking#Nightly_Builds
 [17]: https://developer.mozilla.org/en-US/docs/Mozilla/Boot_to_Gecko/Using_the_B2G_desktop_client#Running_the_desktop_client
 [18]: https://github.com/mozilla-b2g/gaia/commit/9f0129c7a5f04d58bbbe140de2b9562e3172d23c
 [19]: https://github.com/mozilla-b2g/gaia/tree/master/apps/calendar
 [20]: https://github.com/mozilla-b2g/gaia/commits?author=lmorchard
 [21]: https://developer.mozilla.org/en-US/docs/Mozilla/Boot_to_Gecko/Gaia_Unit_Tests
 [22]: http://techcrunch.com/2011/10/25/lead-bullets/
 [23]: irc://irc.mozilla.org/gaia
 [24]: http://www.blueskyonmars.com/2012/11/08/r2d2b2g-is-becoming-the-firefox-os-simulator/
 [25]: https://hacks.mozilla.org/2012/10/r2d2b2g-an-experimental-prototype-firefox-os-test-environment/