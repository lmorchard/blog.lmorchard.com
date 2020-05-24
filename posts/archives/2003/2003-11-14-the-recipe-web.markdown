---
comments_archived: true
date: '2003-11-14T18:51:23-05:00'
layout: post
title: Building the Recipe Web?
wordpress_id: 505
wordpress_slug: the-recipe-web
wordpress_url: http://www.decafbad.com/blog/?p=505
---
<blockquote cite="http://www.formatdata.com/recipeml/index.html"><i>RecipeML is a format for representing recipes on computer. It is written in the increasingly popularExtensible Markup Language - XML.
<br/><br/>
If you run a recipe web site, or are creating a software program -- on any platform -- that works with recipes, then you should consider using RecipeML for coding your recipes! See the FAQs and the new examples for more info.
</i></blockquote>
<div class="credit" align="right"><small>Source:<cite><a href="http://www.formatdata.com/recipeml/index.html">RecipeML - Format for Online Recipes</a></cite></small></div>

<p>
So I'm all about this microcontent thing, thinking recently about recipes since reading <a href="http://blogs.it/0100198/2003/11/10.html#a1972">Marc Canter's post</a> about them.  Actually, I've been thinking about them for a couple of years now, since I'd really like to start cooking some decent meals with the web's help.  Oh yeah, and I'm a geek, so tinkering with some data would be fun too.
</p>
<p>
One thing I rarely notice mentioned when ideas like this come up is pre-existing work.  Like <a href="http://www.formatdata.com/recipeml/index.html">RecipeML</a> or even the non-XML MealMaster format.  Both of these have been around for quite a long time, especially so in the case of MealMaster.  In fact, if someone wanted to bootstrap a collection of recipes, you can find <a href="http://www.thehoseys.com/recipes.html">a ton (150,000) of MealMaster recipes</a> as well as <a href="http://dsquirrel.tripod.com/recipeml/indexrecipes.html">a smaller archive (10,000) of RecipeML files</a>.  Of course, I'm not sure about the copyright situation with any of these, but it's a start anyway.
</p>
<p>
But, the real strength in a recipe web would come from cooking bloggers.  Supply them with tools to generate RecipeML, post them on a blog server, and <a href="http://bitsko.slc.ut.us/blog/feed-data.html">index them in an RSS feed</a>.  Then, geeks get to work building the recipe aggregators.  Hell, I'm thinking I might even give this a shot.  Since I'd really like to play with some RDF concepts, maybe I'll write some adaptors to munge RecipeML and MealMaster into <a href="http://donnafales.com/2002/07/28/recipe-schema#">RDF recipe data</a>.  Cross that with FOAF and other RDF whackyness, and build an empire of recipe data.
</p>
<p>
The thing I wonder, though, is why hasn't anyone done this already?  And why hasn't anyone really mentioned much about what's out there already like RecipeML and MealMaster?  It seems like the perfect time to add this into the blogosphere.
</p>
<!--more-->
shortname=the_recipe_web

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087742">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.braino.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=1958f40a3ea1b8af56f7453922769c9a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.braino.org/">Daniel Von Fange</a>
                </div>
                <a href="#comment-221087742" class="permalink"><time datetime="2003-11-14T22:22:29">2003-11-14T22:22:29</time></a>
            </div>
            <div class="content">Though not "open", you do know of the epicurious recipe site, right?
http://eat.epicurious.com/</div>
            
        </li>
    
        <li class="comment" id="comment-221087744">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.poeticgeek.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=3f559a187f3e64699a10e7704af90fe1&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.poeticgeek.net">gord</a>
                </div>
                <a href="#comment-221087744" class="permalink"><time datetime="2003-11-14T22:32:10">2003-11-14T22:32:10</time></a>
            </div>
            <div class="content">I am a blogger that absolutely loves to cook (and throw dinner parties for that matter).  I have just recently decided to start posting recipes (and pictures of finifhed dishes) as well as talk more about cooking.  

I would love to get involved in any kind of project like that where we could subscribe to each other's recipe feeds.  I think it would be great.</div>
            
        </li>
    
        <li class="comment" id="comment-221087746">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.eatdrinkfeelgood.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9b704dff33489e0ba50f7a6364a8bf5a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.eatdrinkfeelgood.org">Aaron of Montreal</a>
                </div>
                <a href="#comment-221087746" class="permalink"><time datetime="2003-11-15T09:34:31">2003-11-15T09:34:31</time></a>
            </div>
            <div class="content">FYI : http://www.eatdrinkfeelgood.org

Plans for version 1.2 include some sort of support for things RDF-ish [1,2] (though may just mean an easy export facility) and the beginnings of a GUI tool. 

I know that it's not the easiest format in the world to write by hand. This was a conscious trade-off but it would nice to have a tool that hid some of that from users.

Realistically, I won't start any of this until after the new year. Suggestions and patches are welcome.

---

[1] http://eatdrinkfeelgood.org/misc/test2.rdf
[2] http://aaronland.info/xsl/wordnet/wn-find-class/</div>
            
        </li>
    
        <li class="comment" id="comment-221087750">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://recipezaar.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=65bb40b62f05cdf3e5303a74178750b6&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://recipezaar.com">Troy Hakala</a>
                </div>
                <a href="#comment-221087750" class="permalink"><time datetime="2003-11-16T13:41:29">2003-11-16T13:41:29</time></a>
            </div>
            <div class="content">As one of the contributors to RecipeML (and the person who named it ;), I like the concept. However, it isn't useful in practice. Imagine the same thing for auctions. There could be an XML format for auctions, everyone can post their items for sale on their weblog and auction aggregators would replace eBay. This would not be as good as eBay, obviously, as there is significant value to a centralized database of auctions. The same is true for recipes, in my opinion. 

Additionally, creating RecipeML for recipes is a difficult task. Sure, it's fairly easy to write a few recipes in RecipeML if you're technically adept, but to do thousands becomes impossible and for the average recipe producer (grandmothers, chefs, etc) it just won't happen. And you really do need thousands to be a useful database (even your average cooking magazine publishes hundreds a month). 

We (Recipezaar) wrote a natural language recipe parser to make this possible and it's a difficult job. It took us 3 years to write it!  Recipes are far more complicated than you might think, believe it or not. And a natural language recipe parser is not trivial software, which is why no other recipe web site has done this except for Recipezaar. We could release the software under the GPL so that everyone can start creating XML recipes. We've considered it and we've talked to people about doing it but after some thought, people do realize that it wouldn't be useful. Because, again, having recipes distributed across web sites is less powerful than a centralized repository of freely-available recipes. 

Imagine a world of XML recipes distributed around the web on weblogs. An aggregator would need to aggregate millions of weblogs just to cull together a few hundred or thousand recipes. Now imagine millions of aggregator users doing this daily or hourly the way they do this today for weblogs. And if a weblogger had 1,000 recipes on their weblog archives, they wouldn't want millions of aggregators eating their bandwidth every day to maintain the database for each individual using an aggregator (webloggers today already complain about aggregators costing them too much money in bandwidth costs). Additionally, 99.999% of people who create recipes are unlikely to have a weblog to post their XML recipes so you'd lose the majority of the potential content. 

A centralized repository provides a place for regular users to post their recipes and get them seen by the most number of people. And a centralized repository provides an easy way to search for recipes, browse for recipes, review & rate recipes, discuss recipes, etc. And let's talk numbers.... today, Recipezaar has 73,000 recipes in the database and, while it's the largest database of recipes on the internet, people still can't find a particular recipe because there is an infinite number of possible recipes that can be created. Having a few hundred or a few thousand recipes is not a useful database to people. More is better. And acquiring more via an aggregator is a big and expensive job.

Distributed databases are useful in some contexts and centralized databases are useful in other contexts. Each has their own advantages and disadvantages, but like auctions, recipes are best stored centrally where everyone has access to them.</div>
            
        </li>
    
        <li class="comment" id="comment-221087754">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://rjasmin.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9479c9c2b46970b26fe7642ddaf893a5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://rjasmin.net">rich</a>
                </div>
                <a href="#comment-221087754" class="permalink"><time datetime="2009-07-11T02:26:03">2009-07-11T02:26:03</time></a>
            </div>
            <div class="content"><p>I agree with the central database theory.BUT, why limit to KRAFT or epicurious or the like.There are LOTS TONS even of unpublished or un-online recipies out there.My mother has several shoe boxes full and can't organize them yet.</p>

<p>I know HOW to do it, but there is no stable MMF reader for OSX that fixes corrupted input yet.MacGourmet FAILS. Shop-n-cook uses propeitary display routines and Gourmet RM for *nix wont build on OSX, which is what I normally use.</p>

<p>Digital chicken comes close but takes FOREVER,even on dual core to convert to the database format just to spit out an error message.These recipies, the PROBLEM IS, are NON-standardized. There are comments EVERYWHERE.</p>

<p>This would throw off ANY parser.I had a method that may have worked, but I lost the pascal routines a few years ago.It used screen 'pages' to store the data.Mind you it wasn't GUI mode, but it could have been.</p></div>
            
        </li>
    
        <li class="comment" id="comment-233938897">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://disqus.com/api/users/avatars/Cheapgeneric.jpg"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Generic Viagra</a>
                </div>
                <a href="#comment-233938897" class="permalink"><time datetime="2011-06-24T05:08:36">2011-06-24T05:08:36</time></a>
            </div>
            <div class="content">I am a blogger who loves to cook (and dinner parties for that matter). Recently I decided to start posting recipes (and photos of dishes finifhed) and talk over the kitchen.

I would like to participate in any such project in which you can subscribe to the source of income of the other. I think it would be great.

 
<a href="http://www.kamagra-world.co.uk/"><b>Viagra</b></a>
<a href="http://www.kamagra-site.co.uk/"><b>Generic Viagra</b></a>
<a href="http://www.cheap-generic-viagra.co.uk/"><b>Kamagra</b></a></div>
            
        </li>
    
        </ul>
    
        </div>
    