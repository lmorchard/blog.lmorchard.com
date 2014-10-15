---
title: 'Parsec Patrol Diaries: Entity Component Systems'
author: lmorchard
layout: post
permalink: /2013/11/27/entity-component-system
dsq_thread_id:
  - 2003369569
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
      <a href="#Background"><span class="toc_number toc_depth_1">1</span> Background</a>
    </li>
    <li>
      <a href="#Entities"><span class="toc_number toc_depth_1">2</span> Entities</a>
    </li>
    <li>
      <a href="#Components"><span class="toc_number toc_depth_1">3</span> Components</a>
    </li>
    <li>
      <a href="#Systems"><span class="toc_number toc_depth_1">4</span> Systems</a>
    </li>
    <li>
      <a href="#Putting_it_together"><span class="toc_number toc_depth_1">5</span> Putting it together</a>
    </li>
    <li>
      <a href="#Having_fun_with_it"><span class="toc_number toc_depth_1">6</span> Having fun with it</a>
    </li>
  </ul>
</div>

The **Entity**, **Component**, & **System** design pattern is old hat for many game developers. But, keep in mind that I&#8217;m a web developer, and mostly on the server side of things for the past decade or so. One of my last big revelations was discovering the Model, View, & Controller way of doing things. Apropos of that, this ECS thing seems to be a Big Deal of similar proportions.

<!--more-->When I first started working on 

[Parsec Patrol][1], I started sketching out a plain vanilla class hierarchy. You know, the kind I saw when I first started learning about Object Oriented Programming.

I started with an `Entity`, which begat a `RenderableEntity`, which begat things like a `SpaceShipWithThrustersRenderableEntity`. I built a game loop that iterated through all the objects in the universe, calling a `tick()` method on each in turn. Simple, just like things I&#8217;d seen in textbooks.

As I started trying to pile things in, though, I flirted with [multiple inheritance][2] and primitive [composite patterns][3] and everything just got messy and slow. Performance sucked, and [garbage collection][4] went wild. So, I figured I must be Doing It Wrong, and started on a Google quest into game engine design to maybe absorb some modern thinking on these matters. Eventually, I stubbed my brain on the notion of an &#8220;entity/component system&#8221;.

## <span id="Background">Background</span>

Plenty of other blog posts & articles out there have done a great job of describing how an ECS design works:

*   [Entity Systems are the future of MMOG development][5] (Sep 2007)
*   [Evolve Your Hierarchy][6] (Jan 2007)
*   [Why use an entity system framework for game development?][7] (Feb 2012)
*   [Anatomy of a Knockout][8] (Dec 2012)
*   [Understanding Component-Entity-Systems][9] (April 2013)
*   [Artemis Entity System Framework][10]
*   [Ash entity framework][11]

I don&#8217;t want to totally reinvent the wheel here. But, let&#8217;s see if I can&#8217;t break it down a little, if only to convey my excitement with discovering this design pattern and the fun I&#8217;ve had with it.

## <span id="Entities">Entities</span>

First, you&#8217;ve got the **Entity**: Everything in the game universe is an **Entity** &#8211; ships, rocks, missiles, the works. In my naive OOP world, Entities were instances of classes from my tangly, thorny hierarchy.

But, in this ECS world, an **Entity** is a database ID &#8211; just a string, really.

<div id="attachment_1143" style="width: 650px" class="wp-caption alignnone">
  <a href="http://blog.lmorchard.com/wp-content/uploads/2013/11/pp-entities.jpg"><img class="size-large wp-image-1143" alt="Entities" src="http://blog.lmorchard.com/wp-content/uploads/2013/11/pp-entities-1024x577.jpg" width="640" height="360" /></a><p class="wp-caption-text">
    Entities: OOP & ECS
  </p>
</div>

Wait, what? Yeah, that was the first thing that bruised my lobes. This design pattern turns everything inside out. An ECS framework is better understood as a data-oriented system than an object-oriented system. In fact, [a blog post describing an ECS system in relational database terms][12] really drove it home for me.

## <span id="Components">Components</span>

So, given that an **Entity** is an ID in a system that looks like a SQL database from a certain angle, what&#8217;s in the database?

**Components** are in the database. Specifically, **Component** types correspond to tables and **Component** instances correspond to rows. Structurally, a **Component** is a collection of properties &#8211; not unlike the columns in a row in a table in a database.

<div id="attachment_1145" style="width: 650px" class="wp-caption alignnone">
  <a href="http://blog.lmorchard.com/wp-content/uploads/2013/11/2013-11-27-10.14.50.jpg"><img class="size-large wp-image-1145" alt="Parsec Patrol Components" src="http://blog.lmorchard.com/wp-content/uploads/2013/11/2013-11-27-10.14.50-1024x577.jpg" width="640" height="360" /></a><p class="wp-caption-text">
    Components: OOP & ECS
  </p>
</div>

In case it doesn&#8217;t quite make sense yet, here are some sample **Components**:

*   [**Sprite**][13] &#8211; *width, height, shape*
*   [**Position**][14] &#8211; *x, y, rotation*
*   [**Motion**][15] &#8211; *dx, dy, drotation*
*   [**Thruster**][16] &#8211; *accel\_per\_second, max_speed*
*   [**Seeker**][17] &#8211; *target\_entity\_id, rotation\_per\_second*
*   [**Health**][18] &#8211; *max\_health, current\_health*
*   [**BeamWeapon**][18] &#8211; *max\_power, current\_power, recharge\_per\_second*
*   [**MissileWeapon**][19] &#8211; *number\_turrets, reload\_delay*

Imagine each of those as schema for database tables, each with the **Entity** ID as primary key. Given an **Entity** ID, you can query across all the tables and assemble a set of **Components** that completely describe an **Entity** in the game universe.

Note that any given **Entity** can be composed of any combination of these **Components**: A spaceship might be described by **Shape**, **Position**, **Motion**, **Thruster**, **Health**, and **BeamWeapon**. Meanwhile, an asteroid drifting in space might only offer **Shape**, **Position**, and **Motion**.

(Also, just to be pedantic: This doesn&#8217;t *really* have to live in a SQL database. In fact, I currently just use an ad-hoc in-memory key-value store &#8211; i.e. [a set of heavily-abused JavaScript objects][20].)

## <span id="Systems">Systems</span>

So, where&#8217;s the stuff that makes things go? In an OOP design, this would live in the methods of the objects, bundled by classes to go alongside the data. In the ECS design, **Entities** are *just* IDs and **Components** are *just* data &#8211; neither methods nor code implementing game logic live in either of those artifacts.

This is where **Systems** come in: **Systems** are modular mini-game loops. The [&#8220;master&#8221; game loop][21] holds a list of available systems and runs a `tick()` method on each of those in turn. Each **System** performs a query against the **Component** database &#8211; usually for all instances of a particular type &#8211; and crunches through updating the properties for each.

<div id="attachment_1146" style="width: 650px" class="wp-caption alignnone">
  <a href="http://blog.lmorchard.com/wp-content/uploads/2013/11/2013-11-27-10.47.11.jpg"><img class="size-large wp-image-1146" alt="Systems: Most confusing diagram ever?" src="http://blog.lmorchard.com/wp-content/uploads/2013/11/2013-11-27-10.47.11-1024x577.jpg" width="640" height="360" /></a><p class="wp-caption-text">
    Systems: Most confusing diagram ever?
  </p>
</div>

Consider a [**MotionSystem**][22]:

*   Fetch all the **Motion** components from the database
*   For each **Motion**, look up a **Position** for the same **Entity**.
*   Update the `x`, `y`, and `rotation` properties of the **Position** using the **Motion** properties.

Consider a [**SeekerSystem**][23]:

*   Fetch all the **Seeker** components.
*   For each, find the **Motion** and **Position** components for the corresponding **Entity**.
*   Also find **Motion** & **Position** for the **Entity** identified as the `target_entity_id`.
*   Calculate the angle between seeker & target, update **Motion** to steer toward the target.

Notice that each system deals only with data directly relevant to the job at hand. Rather than loading up a full representation of an **Entity**, each **System** only touches the specific **Components** needed. For instance, **MotionSystem** and **SeekerSystem** touch **Motion** and **Position** ****- but never **Shape** **Components**.

This adds some efficiencies for data stored entirely in memory. But, I expect this will have *huge* implications for data that might someday come from a database or over a network. I&#8217;m also thinking that this pattern lends well to shuffling certain systems off onto background threads or Web Workers &#8211; the need for data coordination is limited to just the relevant **Components** when needed.

## <span id="Putting_it_together">Putting it together</span>

<div id="attachment_1149" style="width: 650px" class="wp-caption alignnone">
  <a href="http://lmorchard.github.io/parsec-patrol/sketches/sprites.html"><img class="size-large wp-image-1149 " alt="Parsec Patrol Dancing Sprites" src="http://blog.lmorchard.com/wp-content/uploads/2013/11/Screenshot-2013-11-27-11.16.42-1024x714.png" width="640" height="446" /></a><p class="wp-caption-text">
    Parade! Of! Sprites!
  </p>
</div>

****These **Systems** feel a lot like [particle systems][24]: Tight, focused code working close to the metal with data, skipping a lot of overhead and object juggling. **Components** get modified in place and are rarely discarded &#8211; that seems to save me from a lot of [garbage collection issues][25]. And, if a particular **Component** is not actually used by any existing **Entity**, the **System** looking for it just won&#8217;t perform any work.

For the most part, **Systems** act independently & are very loosely coupled. They can cooperate through shared **Component** data &#8211; consider how the **SeekerSystem** modifies the **Motion** **Component**, and the **MotionSystem** uses that data to move the **Position** **Component**. I&#8217;m also playing with [a crude pub/sub messaging system][26] for things like [transmitting damage][27] from one **Entity** to another.

And, once I was freed from my tangled class hierarchy, things started to get fun. The mental cost for adding a new layer to the system dropped fast: Add a new **Component** or two, add a new **System &#8211; **and suddenly **Entities** can do new things!

## <span id="Having_fun_with_it">Having fun with it</span>

And, the most fun part? I get to describe things in the game world like a five-year-old and not give a crap about serious programming stuff:

<div id="attachment_1148" style="width: 650px" class="wp-caption alignnone">
  <a href="http://blog.lmorchard.com/wp-content/uploads/2013/11/2013-11-27-11.06.12.jpg"><img class="size-large wp-image-1148" alt="Spaceship doodles" src="http://blog.lmorchard.com/wp-content/uploads/2013/11/2013-11-27-11.06.12-1024x577.jpg" width="640" height="360" /></a><p class="wp-caption-text">
    Spaceship doodles
  </p>
</div>

I&#8217;ve got [a bad guy space ship][28]! And it&#8217;s [shaped like an arrow][29]! And it&#8217;s got [rocket thrusters][30]! And it [chases the good guy][30]! And it has [missile launchers][31]! And [it blows up when the hero shoots it a lot][32]!

Oh, and I&#8217;ve got [a good guy ship][33]! And it&#8217;s [shaped like a cool thing different than an arrow][34]! And it&#8217;s also got [rocket thrusters][30]! And [it goes where you click][35]! And [it has lots of laser beam guns][36]!

Oh, and [there are rocks][37]! They kind of spin a bit and drift around! They [bounce when they run into things][38]! Sometimes [they blow up][39]!

That&#8217;s almost exactly the running dialog in my head when I write the code. It&#8217;s pretty cool.

 [1]: https://github.com/lmorchard/parsec-patrol
 [2]: http://en.wikipedia.org/wiki/Multiple_inheritance#The_diamond_problem
 [3]: http://en.wikipedia.org/wiki/Composite_pattern
 [4]: http://blog.artillery.com/2012/10/browser-garbage-collection-and-framerate.html
 [5]: http://t-machine.org/index.php/2007/09/03/entity-systems-are-the-future-of-mmog-development-part-1/
 [6]: http://cowboyprogramming.com/2007/01/05/evolve-your-heirachy/
 [7]: http://www.richardlord.net/blog/why-use-an-entity-framework
 [8]: http://www.chris-granger.com/2012/12/11/anatomy-of-a-knockout/
 [9]: http://www.gamedev.net/page/resources/_/technical/game-programming/understanding-component-entity-systems-r3013
 [10]: http://gamadu.com/artemis/tutorial.html
 [11]: http://www.ashframework.org/
 [12]: http://t-machine.org/index.php/2009/10/26/entity-systems-are-the-future-of-mmos-part-5/
 [13]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/components.coffee#L86
 [14]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/components.coffee#L26
 [15]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/components.coffee#L33
 [16]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/components.coffee#L40
 [17]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/components.coffee#L110
 [18]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/components.coffee#L201
 [19]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/components.coffee#L137
 [20]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/entities.coffee#L9
 [21]: https://github.com/lmorchard/parsec-patrol/blob/master/app/scripts/worlds.coffee#L62
 [22]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/systems.coffee#L793
 [23]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/systems.coffee#L1136
 [24]: html5hub.com/build-a-javascript-particle-system/
 [25]: http://buildnewgames.com/garbage-collector-friendly-code/
 [26]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/worlds.coffee#L38
 [27]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/systems.coffee#L1583
 [28]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/sketches/radar.coffee#L103
 [29]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/systems.coffee#L660
 [30]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/systems.coffee#L1193
 [31]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/systems.coffee#L1271
 [32]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/systems.coffee#L1574
 [33]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/sketches/radar.coffee#L47
 [34]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/systems.coffee#L646
 [35]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/systems.coffee#L1245
 [36]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/systems.coffee#L1435
 [37]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/sketches/fields.coffee#L95
 [38]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/systems.coffee#L803
 [39]: https://github.com/lmorchard/parsec-patrol/blob/7d2f01eae28d8c687fb4e97a556e0c4a05a87ef4/app/scripts/systems.coffee#L1608