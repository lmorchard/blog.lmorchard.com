---
title: Looking for a Django app to manage Roles within Groups
author: lmorchard
layout: post
permalink: /2013/02/23/looking-for-a-django-app-to-manage-roles-within-groups
dsq_thread_id:
  - 1106435515
categories:
  - Uncategorized
tags:
  - badger
  - badges
  - django
  - mozilla
  - webdev
---
I want to add some team-based features to [django-badger][1]. I was hoping that someone had already built a reusable app to do most of the work for me. This happens quite a lot when I&#8217;m working with Django. Unfortunately, I haven&#8217;t *quite* found what I&#8217;m looking for yet. Consider this blog post either the product of my thinking out loud toward a rough spec, or a long-winded lazyweb search query.

<!--more-->

First, what do I mean by a &#8220;team&#8221;? Well, a familiar example is [a guild in World of Warcraft][2]: A group of people with access to shared resources, that access controlled by permissions bundled into ranks assigned to each member of the group.

<div style="width: 460px" class="wp-caption aligncenter">
  <a href="http://www.wowwiki.com/Guild_list_%28interface%29"><img alt="Guild management in WoW" src="http://images2.wikia.nocookie.net/__cb20091106224144/wowwiki/images/thumb/3/3e/Guild_list_%28interface%29.png/450px-Guild_list_%28interface%29.png" width="450" height="324" /></a><p class="wp-caption-text">
    Guild management in WoW
  </p>
</div>

While Django does come with Users, Groups, & Permissions, the concept of Roles within Groups to which Permissions can be attached seems missing.

If I try to extend the Django building blocks, maybe I could represent a &#8220;Team&#8221; as a bundle of Groups and treat those Groups as Roles? Or, maybe Groups should just become hierarchical &#8211; make it [turtles all the way down][3]. (I really like that expression, in case you can&#8217;t tell.)

With respect to that last point, I found [django-hierarchical-auth][4]. That seems like a good lead. But, I&#8217;m having trouble finding other projects using it. There&#8217;s [feinCMS][5] &#8211; I&#8217;ve never heard of that before, but that&#8217;s more my lack than theirs.

In the case of [django-badger][1], I&#8217;d like to enable users to start teams, create badges that belong to the team, and allow other team members varying levels of control over those badges (e.g. creating, editing, awarding, approving nominations, etc).

So, there&#8217;s the matter of user interface &#8211; I&#8217;d like any user (not just site-wide admins) to be able to:

*   create a team;
*   manage team profile information;
*   manage & grant roles based on a canned selection of permissions;
*   invite other users as members, remove members;
*   accept team invitations, request to join a team, remove oneself from a team.

The [django-hierarchical-auth][4] app comes with no views; it&#8217;s just a backend utility. So, if I grab that app, I&#8217;ll still have to build the UI and supporting models myself (i.e. for team profiles and permission sets).

So, that leaves me wondering if there&#8217;s some value in me building a reusable app atop [django-hierarchical-auth][4] that basically implements what that WoW guild management interface offers? Ultimately, that&#8217;s what I&#8217;m really hoping someone else has built for me.

 [1]: https://github.com/lmorchard/django-badger
 [2]: http://www.wowwiki.com/Guild_list_%28interface%29
 [3]: http://en.wikipedia.org/wiki/Turtles_all_the_way_down
 [4]: https://github.com/rasca/django-hierarchical-auth
 [5]: http://www.feincms.org/