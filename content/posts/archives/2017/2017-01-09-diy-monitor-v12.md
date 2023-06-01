---
title: Upgrading my Couch PC monitor, v1.2
tags:
  - diy
  - hacks
  - lcd
  - pc
  - tech
  - gaming
thumbnail: /uploads/2017/diy-monitor-v12/monitor-thumb.jpg
---

**TL;DR**: My DIY couch PC monitor has been upgraded for a third time.

<!--more-->

<nav role="navigation" class="table-of-contents"></nav>

## The story so far...

Almost 3 years ago, [I decided to build a gaming PC that I could use from the couch][couchgaming] while a) hanging out with my wife and b) not monopolizing the living room TV.

The PC was simple: [it's just a cube][fractalnode] behind the couch. Mouse & keyboard & headphones are also easy—USB cables come in long lengths and Bluetooth is a thing.

No, the hard part was the monitor. I had been gaming on a 2012 15" MacBook Pro—which was physically convenient but lacking in performance. A gaming PC solves the latter, but no one seems to sell 15" standalone monitors equivalent to my laptop screen. That was when I discovered [an Instructable article][instructablepanel] about how to turn an old laptop into a desktop panel. [That gave me ideas][laptopdecapitation].

## Version 1.0 - Artisanal Acrylic

Turns out, there are [vendors on eBay][monitorvendors] who offer complete kits for hooking a laptop display panel up to a PC. They just don't come with any kind of enclosure like your typical computer monitor. So, [I ordered one of those kits and tried handcrafting a case][buildingv1]. It turned out crude yet functional:

<a data-flickr-embed="true"  href="https://www.flickr.com/photos/deusx/8439217201/in/photolist-5m6a-dRKcfR-58SNWo-e3Nbyu-7FS8wi-7FS8pc-e3NbtC-e3Nb3W-4P3uQw-3RZHaZ-RQPr4-RNZRY-RQPwv-7aTRk8-7aTRTz-7aXEAw-dSvv2a-dSvurt-jC3LLU-dSmDqf-5m5D-5EBhpP-7HvphU-cVUcz-cVXdK-5EFzQf-cVV14" title="First fully assembled power-on of my DIY monitor"><img src="/uploads/2017/diy-monitor-v12/8439217201_6eea54c3e5_z.jpg" width="800" height="600" alt="First fully assembled power-on of my DIY monitor"></a>

<a data-flickr-embed="true"  href="https://www.flickr.com/photos/deusx/8447859933/in/photolist-5m6a-dRKcfR-58SNWo-e3Nbyu-7FS8wi-7FS8pc-e3NbtC-e3Nb3W-4P3uQw-3RZHaZ-RQPr4-RNZRY-RQPwv-7aTRk8-7aTRTz-7aXEAw-dSvv2a-dSvurt-jC3LLU-dSmDqf-5m5D-5EBhpP-7HvphU-cVUcz-cVXdK-5EFzQf-cVV14" title="Rear view #2 of DIY monitor and IKEA DAVE"><img src="/uploads/2017/diy-monitor-v12/8447859933_c1bf2c05aa_z.jpg" width="800" height="600" alt="Rear view #2 of DIY monitor and IKEA DAVE"></a>

## Version 1.1 - Custom Picture Frame

I used that first version for a year in my living room. It was ugly & heavy & awkward. Happily, I fell upon [this Instructables article][instructableframe] that pointed me to [American Frame][]. They'll produce a rectangular picture frame in just about any custom size you'd like—height, width, *and* depth.

So, I ordered a nice matte black metal frame close to the size of my display panel. I ended up with this:

<a data-flickr-embed="true"  href="https://www.flickr.com/photos/deusx/12222356524/in/photolist-dRKcfR-7aTRk8-dSvv2a-dSvurt-jC3LLU-5m6a-58SNWo-e3Nbyu-7FS8wi-7FS8pc-e3NbtC-e3Nb3W-4P3uQw-3RZHaZ-RQPr4-RNZRY-RQPwv-7aTRTz-7aXEAw-dSmDqf-5m5D-5EBhpP-7HvphU-cVUcz-cVXdK-5EFzQf-cVV14" title="Updated Couch PC monitor"><img src="/uploads/2017/diy-monitor-v12/12222356524_fcbd4cf0b4_z.jpg" width="600" height="800" alt="Updated Couch PC monitor"></a>

Sleeker and lighter. The back of the picture frame was just [foamcore][] and I used double-sided tape on the monitor arm and all the electronics. Luckily, the panel and all were light enough for these hacks. But, it kind of fell apart across two house moves.

## Version 1.2 - Mic Stands & Laser Cutters FTW

I decided I wanted to minimize things. The Ikea Dave laptop stand seemed a bit much, especially when I needed to move it around—or hide it when company came over.

Last year, I (finally) got a membership at [i3Detroit][]. I skilled up on laser cutters and [made a DIY keypad that I showed off at the Detroit Maker Faire][gamechord]. Things that, you know, [I should have done years ago at the start of this whole DIY monitor project][i3early]—rather than cutting things by hand and with a Dremel.

Anyway, I discovered that there's a such thing as [a VESA mount][micvesa] for [microphone stands][micstand]. I bought those and threw in an [adapter][micadapter] & a [gooseneck][gooseneck]—all of which let me strip my rig down like so:

<a data-flickr-embed="true"  href="https://www.flickr.com/photos/deusx/32182700386/in/datetaken/" title="20170109_221645"><img src="/uploads/2017/diy-monitor-v12/32182700386_4320d2a1d0_z.jpg" width="450" height="800" alt="20170109_221645"></a>

<a data-flickr-embed="true"  href="https://www.flickr.com/photos/deusx/31845156280/in/datetaken/" title="20170109_221722"><img src="/uploads/2017/diy-monitor-v12/31845156280_d16551c8df_z.jpg" width="450" height="800" alt="20170109_221722"></a>

By this point, the double-sided tape and the foamcore just weren't up to the task. I decided that I needed to use my laser cutter skills and spare stock of acrylic sheets to build a new mounting solution.

I came up with this in [Inkscape][]:

[<img class="fullwidth" src="/uploads/2017/diy-monitor-v12/path3848.png">][backdesign]

This is a flattened image (linked to [the original SVG][backdesign]) of what turned out to be two 2.5mm and two 1.5mm sheets behind the laptop display panel. This layout has places to bolt in all of the electronic components of the monitor—driver board, button panel, and power supply. It's also got a proper 75/100 VESA mount that accepts [10mm thumbscrew bolts][thumbscrews] through the mic stand plate.

The main thing that worked out better than I expected is this: <img src="/uploads/2017/diy-monitor-v12/nuts.png" style="width: 1.5em">

The two 1.5mm layers have rectangular cut-outs. Each of those trap a 3mm thick hexogonal M4 nut and act as wrenches. The 2.5mm layers have holes for bolts. With a little Dremel work, I have a set of M4 bolts that are trimmed so as to prevent grinding into the display panel behind the acrylic layers.

After a trip to [i3Detroit][] yesterday, I ended up with this:

<a data-flickr-embed="true"  href="https://www.flickr.com/photos/deusx/32080951661/in/datetaken/" title="20170108_214638"><img src="/uploads/2017/diy-monitor-v12/32080951661_c92bb3f74c_z.jpg" width="800" height="450" alt="20170108_214638"></a>

I improvised attaching the power supply with bolted-down velcro straps. And, alas, the "roof" I made for the driver board didn't quite work—I need longer bolts & spacers. But, the 75/100 VESA mounting holes worked great!

The whole thing is now decidedly heavier than with the old foamcore—but it's still lighter than v1.0 and any other comparable monitor I've seen. It's also much sturdier: I can turn & adjust it however I like with the gooseneck without the constant threat of duct tape tearing and falling apart. And, of course, the mic stand raises & lowers easily.

But, when I *do* want to take it apart, it's totally doable without worry. Cables unplug, thumbscrews unscrew, the mic stand breaks down—and the whole thing can hide under the couch in pieces.

## Next steps?

Enclosure upgrades notwithstanding, this is a 3-year-old 17" 1080p monitor. I'm starting to feel the itch for a 4k panel since [I upgraded my video card][videocard]. But, there's apparently still no one who sells such a thing as a readymade product.

Meanwhile, on eBay, there are vendors offering [4k versions of the kit][4kkit] that started me off on this whole adventure. I'm tempted to order one of those and use what I've learned so far to build the next revision of my monitor in a picture frame with a laser-cut VESA mount back panel.

Maybe I'll retire this 1080p monitor for use with my CHIP [Pico-8 console kit][chipconsole] for a snazzy all-in-one barcade project. In any case, I'm just happy my lovely wife continues to tolerate this experiment of mine in living room couch gaming.

<script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>

[thumbscrews]: http://amzn.to/2iYwbAU
[laptopdecapitation]: https://blog.lmorchard.com/2013/01/21/gaming-from-the-orchard-house-couch/#Laptop_decapitation
[chipconsole]: https://getchip.com/pages/chip
[4kkit]: http://www.ebay.com/itm/HDMI-DVI-DP-Board-17-3-3840x2160-UHD-4K-Wideview-100-NTSC-LCD-B173ZAN01-0-/192056466946?hash=item2cb7751e02
[videocard]: https://www.instagram.com/p/BOlqtGyh7Ln
[i3detroit]: https://www.i3detroit.org/
[backdesign]: /uploads/2017/diy-monitor-v12/monitor-back-2.svg
[inkscape]: https://inkscape.org/en/
[gooseneck]: http://amzn.to/2j1VYZq
[micadapter]: http://amzn.to/2j1YpeM
[lapdesk]: http://amzn.to/2jntfL6
[micstand]: http://amzn.to/2jcc93M
[micvesa]: http://amzn.to/2jccG5D
[i3early]: https://groups.google.com/d/topic/i3detroit-public/Qv1P91ySqWo/discussion
[gamechord]: https://blog.lmorchard.com/2016/08/29/gamechord/
[foamcore]: https://en.wikipedia.org/wiki/Foamcore
[monitorvendors]: http://www.ebay.com/usr/chinatobby2011
[american frame]: http://www.americanframe.com/
[instructablepanel]: http://www.instructables.com/id/Laptop-to-Desktop-Conversion/
[instructableframe]: http://www.instructables.com/id/How-to-Make-a-Raspberry-Pi-Media-Panel-fka-Digita/?ALLSTEPS
[fractalnode]: http://amzn.to/2iy5G2b
[couchgaming]: http://blog.lmorchard.com/2013/01/21/gaming-from-the-orchard-house-couch
[buildingv1]: http://blog.lmorchard.com/2013/02/10/building-my-couch-computing-station/

<!-- vim: set wrap linebreak nolist wrapmargin=0 textwidth=0 syntax=markdown formatoptions-=t textwidth=78: -->
