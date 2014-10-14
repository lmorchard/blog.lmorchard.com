---
title: 'Parsec Patrol Diaries: How To Avoid Smashing Into Things'
author: lmorchard
layout: post
permalink: /2014/01/18/ppd-avoidance
dsq_thread_id:
  - 2140934375
categories:
  - Uncategorized
tags:
  - html5
  - parsecpatrol
  - webdev
---
<div id="toc_container" class="toc_wrap_right no_bullets">
  <p class="toc_title">
    Contents
  </p>
  
  <ul class="toc_list">
    <li>
      <a href="#Where_to_start"><span class="toc_number toc_depth_1">1</span> Where to start?</a>
    </li>
    <li>
      <a href="#Waypoint_Graphs_Navigation_Meshes"><span class="toc_number toc_depth_1">2</span> Waypoint Graphs & Navigation Meshes</a>
    </li>
    <li>
      <a href="#A_Search"><span class="toc_number toc_depth_1">3</span> A* Search</a>
    </li>
    <li>
      <a href="#Trigonometry_Refresher"><span class="toc_number toc_depth_1">4</span> Trigonometry Refresher</a>
    </li>
    <li>
      <a href="#Spaceships_with_Whiskers"><span class="toc_number toc_depth_1">5</span> Spaceships with Whiskers</a>
    </li>
    <li>
      <a href="#Functions_with_Potential"><span class="toc_number toc_depth_1">6</span> Functions with Potential</a>
    </li>
    <li>
      <a href="#Further_research"><span class="toc_number toc_depth_1">7</span> Further research</a>
    </li>
  </ul>
</div>

I made a hero ship with beam weapons. I even built drifting asteroids that handle smashing into things. What gave me trouble was finding a way to teach enemy ships how to *avoid* smashing into things. You know, not perfectly, but just well enough to seem vaguely cunning and worth pretending to outsmart in a video game.

<!--more-->

In developing Parsec Patrol, I&#8217;ve never had plans or specifications so much as doodles & daydreams. One day I imagined this scene where I&#8217;m piloting the hero ship through a shifting maze of asteroids, a dozen enemy scout ships in fast pursuit. I dodge & weave through the rocks, just barely negotiating the gaps. One by one, the baddies vanish in bursts of light & debris: Some succumb to my beam weapons, while others smash into rocks or bungle into each other. Classic space dogfight material, here.

### <span id="Where_to_start">Where to start?</span>

From years of playing & tinkering with shooters like Unreal & Quake, I had a vague notion of bots needing &#8220;pathfinding&#8221; algorithms to find their way around levels. So, I started hitting Google, looking to see what I could find and understand just well enough to eliminate from consideration or flag for a deeper dive.

### <span id="Waypoint_Graphs_Navigation_Meshes">Waypoint Graphs & Navigation Meshes</span>

Some of the first pathfinding tools I started reading about were *waypoint graphs *and *navigation meshes*. It turns out that some bots rely on cheat sheets: map-specific and manually placed points or polygons, traversed to get from point A to point B. Generally it&#8217;s a cheap way to make bots seem like they know where they&#8217;re going, because a human being does most of the work up front.

<div style="width: 322px" class="wp-caption alignleft">
  <a href="http://www.ai-blog.net/archives/000152.html"><img class="    " alt="" src="http://i252.photobucket.com/albums/hh9/PaulTozour/Halaa_waypoints2_AB.jpg" width="312" height="250" /></a><p class="wp-caption-text">
    Waypoint graph
  </p>
</div>

<div style="width: 322px" class="wp-caption alignleft">
  <a href="www.ai-blog.net/archives/000152.html"><img class="    " alt="" src="http://i252.photobucket.com/albums/hh9/PaulTozour/Halaa_navmesh2_AB.jpg" width="312" height="250" /></a><p class="wp-caption-text">
    Navigation mesh
  </p>
</div>

Unfortunately, an asteroid field is not like a Quake map. In Parsec Patrol, the clusters of rocks are randomly generated and only get more chaotic as the rocks drift and collide. There&#8217;s just no way to handcraft a map for robots in this scenario.

### <span id="A_Search">A* Search</span>

<div style="width: 220px" class="wp-caption alignright">
  <a href="http://en.wikipedia.org/wiki/A*_search_algorithm"><img class="   " alt="" src="http://upload.wikimedia.org/wikipedia/commons/5/5d/Astar_progress_animation.gif" width="210" height="210" /></a><p class="wp-caption-text">
    A* Search animation from Wikipedia
  </p>
</div>

Another approach I found was the [A* Search algorithm][1]. There are some [great write-ups on this algorithm][2] out there, so I won&#8217;t try making a hash of it here. You can also [try out some implementations in JavaScript][3].

This algorithm seems best suited for navigating graphs with few connections between nodes &#8211; a 2D grid, for example, with 8 exits per cell. If I ever wrote a roguelike dungeon crawler, this would be my jam.

Unfortunately, the world of Parsec Patrol uses a continuous coordinate system, rather than a map of discrete grid cells. And, it seems like a waste to try to find a complete path from point A to point B for this game &#8211; because that path is likely to be made obsolete from moment to moment. So, how about trying to work out the best move for just the next moment?

### <span id="Trigonometry_Refresher">Trigonometry Refresher</span>

<div style="width: 203px" class="wp-caption alignright">
  <a href="http://www.hyperionedge.com/2010/04/tron-13-lightcycle-game-grid.html"><img class="     " alt="" src="http://2.bp.blogspot.com/_p21BV9S5a0k/S7n0ztF4bBI/AAAAAAAACKw/u9cPiF-dSXE/s1600/TronCards14.jpg" width="193" height="136" /></a><p class="wp-caption-text">
    Right angles only, for Light Cycles
  </p>
</div>

I took a short break from research and decided to see what I could come up with on my own. What does it mean to avoid an obstacle?

One way to avoid a collision is to make a full right angle turn, into a perpendicular course. That works on the Light Cycle Grid, but it&#8217;s a bit extreme. So, I need an angle between 0 and 90 degrees with respect to the ship&#8217;s vector and the obstacle.

So, I decided to give myself a refresher course in trigonometry:

<div id="attachment_1206" style="width: 510px" class="wp-caption aligncenter">
  <a href="http://blog.lmorchard.com/wp-content/uploads/2014/01/trig2.png"><img class="size-full wp-image-1206 " alt="I am not good at math" src="http://blog.lmorchard.com/wp-content/uploads/2014/01/trig2.png" width="500" height="558" /></a><p class="wp-caption-text">
    I am not good at math
  </p>
</div>

These scribblings are not meant to impress. Rather, this shows how much I forgot about high school trigonometry. Nonetheless, I worked out how to [calculate an appropriate target angle that would miss the obstacle by a defined distance][4]. Having that angle meant that I could turn less drastically while steering for avoidance.

It was a small victory &#8211; and now I remember [SOHCAHTOA][5] again.

### <span id="Spaceships_with_Whiskers">Spaceships with Whiskers</span>

Now that I had a way to calculate a steering angle that avoided smashing into something, I needed a way to know when I was headed for a collision.

If I were trying to build a physical robot, I might add some whiskers to detect the nearest obstacle and trigger a turn. But, how to do that in the virtual game world? A little bit of research brought me to the notion of using [raycasting combined with collision detection][6], something like this:

<div id="attachment_1191" style="width: 394px" class="wp-caption aligncenter">
  <a href="http://blog.lmorchard.com/wp-content/uploads/2014/01/2014-01-16-21.18.36.jpg"><img class="wp-image-1191 " alt="" src="http://blog.lmorchard.com/wp-content/uploads/2014/01/2014-01-16-21.18.36-1024x768.jpg" width="384" height="288" /></a><p class="wp-caption-text">
    Spaceships with whiskers!
  </p>
</div>

[The algorithm I came up with][7] constructs a vector on each side of the ship. [I project circles along the vectors][8], with a radius based on the margin by which I hoped to avoid obstacles. In order from nearest to farthest, [I run collision detection for each of the circles][9]. The search stops with the first hit, using the nearest obstacle found.

So, when my ship finds an obstacle with the whiskers, calculate the avoidance angle, and set that as the steering target for the current game tick. This ends up much more lightweight than finding a complete optimal path, and it can react from moment to moment to the changing game environment.

<div id="attachment_1203" style="width: 510px" class="wp-caption aligncenter">
  <a href="http://blog.lmorchard.com/wp-content/uploads/2014/01/whiskers-twitch-3.gif.gif"><img class="size-full wp-image-1203 " alt="Whiskers are twitchy" src="http://blog.lmorchard.com/wp-content/uploads/2014/01/whiskers-twitch-3.gif.gif" width="500" height="380" /></a><p class="wp-caption-text">
    My whiskers are wiggly
  </p>
</div>

Unfortunately, this scheme looks funny in action: Since [I revert back to target seeking after resolving obstacle avoidance][10], the enemy ships wiggle as they oscillate between the two strategies. Tracking straight toward the target often brings the ship into collision course &#8211; so once an avoidance course is achieved, target tracking turns right back into the obstacle.

### <span id="Functions_with_Potential">Functions with Potential</span>

What I really wanted was some way for these ships to take many nearby obstacles into account along with seeking toward the target, and come up with a smoothly changing steering angle that seemed not entirely stupid or goofy looking.

After some further research, I started reading [AI for Game Developers][11]<img class="tvatbijdbdexywujcjjd svuitzfraxzoondqiznf pybiawadmcxjgjpdvhto" style="border: none !important; margin: 0px !important;" alt="" src="http://ir-na.amazon-adsystem.com/e/ir?t=0xdecafbad01-20&l=as2&o=1&a=0596005555" width="1" height="1" border="0" /> by David M. Bourg and Glenn Seemann. In Chapter 5, I found code using [the Lennard-Jones potential function][12] to drive avoidance of multiple obstacles and target seeking all in one algorithm.

<div style="width: 442px" class="wp-caption aligncenter">
  <a href="http://chemwiki.ucdavis.edu/Physical_Chemistry/Quantum_Mechanics/Atomic_Theory/Intermolecular_Forces/Lennard-Jones_Potential"><img alt="" src="http://chemwiki.ucdavis.edu/@api/deki/files/8914/Figure_B.jpg" width="432" height="324" /></a><p class="wp-caption-text">
    Serious business, this potential function
  </p>
</div>

A thumbnail sketch of this function with respect to the game goes something like this: Entities can repel & attract each other. Repulsion & attraction change over distance. For example, swarming entities can attract at long distance and repel when too close.

Here&#8217;s what [the simplified AB form of this function][13] looks like in my code:

`U = (-A/Math.pow(d,n)) + (B/Math.pow(d,m))`

There are 4 constants in this function:

*   `A` &#8211; magnitude of attraction
*   `n` &#8211; attenuation of attraction over distance
*   `B` &#8211; magnitude of repulsion
*   `m` &#8211; attenuation of repulsion over distance

Pick values for these constants, and you&#8217;ve got a function that yields a positive (repulsion) or negative (attraction) value for any given distance (`d`). So far, [I&#8217;ve just used trial & error to find values for these constants][14].

To apply this function, [I search for obstacles within a certain radius of the ship][15]. That limits the number of calculations, because far-flung obstacles have no significant influence. For each nearby obstacle, [I calculate distance and apply the potential function][16]. I then [calculate a unit vector from each obstacle to the ship and multiply by the result of the potential function][17].

Repeat all the above for targets, regardless of range, and with function constants that yield attraction rather than repulsion.

That leaves me with a collection of vectors, each with a direction and a magnitude representing the weighted urgency of heading in that direction right now. I sum all these vectors, [leaving a single vector with an angle useful as a steering goal][18]. I ignore the magnitude, because it was only useful during addition for influencing the angle.

<span class='embed-youtube' style='text-align:center; display: block;'></span>

Now, perhaps I&#8217;ve come off sounding smart after having written the above. But, I&#8217;ve already established that I&#8217;m not good at math. It&#8217;s quite possible I&#8217;ve abused & misused this function entirely. That said, [I think it&#8217;s produced a satisfying result][19].

<div id="attachment_1238" style="width: 485px" class="wp-caption aligncenter">
  <a href="http://blog.lmorchard.com/wp-content/uploads/2014/01/potential5.gif"><img class="size-full wp-image-1238 " alt="Smoother steering" src="http://blog.lmorchard.com/wp-content/uploads/2014/01/potential5.gif" width="475" height="375" /></a><p class="wp-caption-text">
    Smoother steering with math!
  </p>
</div>

The [demo sketch][19] has a debug mode full of confusing circles and lines, but it might help illustrate how the function works on they fly. In a nutshell, this means that closer obstacles have a greater influence on causing the ship to steer away. Meanwhile, there&#8217;s a constant influence pulling the ship back toward the target, whenever the mass of obstacles nearby do not dominate steering.

I want to tinker some more, maybe see if I can make the ships swarm with each other while also avoiding obstacles and heading toward the target. I&#8217;d also like to find a way to stop guessing and calculate the function constants based on the speed & steering characteristics of a given ship. That is, fast & nimble ships should be able to navigate tighter spaces, while big & clumsy ships should start working to avoid collisions from farther away.

### <span id="Further_research">Further research</span>

I&#8217;ve been thinking I need to look into [vector fields][20] and [flocking behaviors][21] next. I&#8217;m still looking for more options to make this work, too. If you&#8217;ve made it this far reading this post, feel free to toss some suggestions & critique my way. I have basically no idea what I&#8217;m doing, nor even what terms to use in searching for this stuff.

Still, these are some pretty fun results stumbling along from daydreams to code.

 [1]: http://en.wikipedia.org/wiki/A*_search_algorithm
 [2]: http://buildnewgames.com/astar/
 [3]: http://easystar.nodejitsu.com/demo.html
 [4]: https://github.com/lmorchard/parsec-patrol/blob/2e3f9afa2404fee54b09152e3d5746c4c4a2b4ca/app/scripts/systems.coffee#L1034
 [5]: http://www.mathwords.com/s/sohcahtoa.htm
 [6]: https://www.google.com/search?q=collision+detection+ray+casting
 [7]: https://github.com/lmorchard/parsec-patrol/blob/2e3f9afa2404fee54b09152e3d5746c4c4a2b4ca/app/scripts/systems.coffee#L987
 [8]: https://github.com/lmorchard/parsec-patrol/blob/2e3f9afa2404fee54b09152e3d5746c4c4a2b4ca/app/scripts/systems.coffee#L1008
 [9]: https://github.com/lmorchard/parsec-patrol/blob/2e3f9afa2404fee54b09152e3d5746c4c4a2b4ca/app/scripts/systems.coffee#L1015
 [10]: https://github.com/lmorchard/parsec-patrol/blob/2e3f9afa2404fee54b09152e3d5746c4c4a2b4ca/app/scripts/systems.coffee#L1085
 [11]: http://www.amazon.com/gp/product/0596005555/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0596005555&linkCode=as2&tag=0xdecafbad01-20
 [12]: http://en.wikipedia.org/wiki/Lennard-Jones_potential
 [13]: http://en.wikipedia.org/wiki/Lennard-Jones_potential#AB_form
 [14]: https://github.com/lmorchard/parsec-patrol/blob/2e3f9afa2404fee54b09152e3d5746c4c4a2b4ca/app/scripts/sketches/steering.coffee#L85
 [15]: https://github.com/lmorchard/parsec-patrol/blob/2e3f9afa2404fee54b09152e3d5746c4c4a2b4ca/app/scripts/systems.coffee#L904
 [16]: https://github.com/lmorchard/parsec-patrol/blob/2e3f9afa2404fee54b09152e3d5746c4c4a2b4ca/app/scripts/systems.coffee#L868
 [17]: https://github.com/lmorchard/parsec-patrol/blob/2e3f9afa2404fee54b09152e3d5746c4c4a2b4ca/app/scripts/systems.coffee#L877
 [18]: https://github.com/lmorchard/parsec-patrol/blob/2e3f9afa2404fee54b09152e3d5746c4c4a2b4ca/app/scripts/systems.coffee#L932
 [19]: http://lmorchard.github.io/parsec-patrol/sketches/steering.html
 [20]: http://gamedevelopment.tutsplus.com/tutorials/goal-based-vector-field-pathfinding--gamedev-9007
 [21]: http://www.red3d.com/cwr/boids/