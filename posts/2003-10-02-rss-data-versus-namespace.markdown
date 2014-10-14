---
comments_archived: true
date: '2003-10-02T11:52:00-04:00'
layout: post
title: An example of an RSS 2.0 namespace versus RSS-Data usage
wordpress_id: 488
wordpress_slug: rss-data-versus-namespace
wordpress_url: http://www.decafbad.com/blog/?p=488
---
<p>
Okay, just for the sake of tinkering, I'm poking at embedding data
from the
<a href="http://www.amazon.com/gp/browse.html/002-4832258-8958444?node=3435361">Amazon Web Services</a>
into an RSS 2.0 feed.  On one hand, I just shoehorned the Amazon
XML schema into an RSS 2.0 namespace, and on the other, I tried
transliterating the Amazon XML data into
<a href="http://radio.weblogs.com/0113297/2003/10/01.html#a237">RSS-Data</a> /
<a href="http://www.xml-rpc.com/spec">XML-RPC</a> serialized data
structures.
</p>
<p>
To resolve my own love/hate of this RSS-Data idea,
I'm planning to keep going from here and work up some simple Python
scripts to produce and consume data along the lines of both examples,
then to comment on the experience.  (This is assuming I don't run out
of round tuits.)  Some things to note:
<ul>

<li>Your XML mojo is probably stronger than mine,
so please feel free to correct me.</li>

<li>Although I created the RSS-Data example by hand, it would
otherwise be completely produced and consumed by machine.</li>

<li>Since it's at the root of a few things I'm thinking,
it's worth restating:  RSS-Data is intended to be produced and
consumed by machine, not by humans.  This means that the XML
data needs not look pretty or elegant to you, but to your machine.</li>

</ul>
</p>

<p>
So, on with the XML.  First, I
<a href="http://xml.amazon.com/onca/xml3?t=0xdecafbad-20&dev-t=foo&AsinSearch=0439139597&type=lite&f=xml">requested data</a>
from Amazon and got the following:
</p>

<pre>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;ProductInfo
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="http://xml.amazon.com/schemas3/dev-lite.xsd"&gt;
  &lt;Details url="http://www.amazon.com/exec/obidos/ASIN/0439139597/0xdecafbad-20"&gt;
    &lt;Asin&gt;0439139597&lt;/Asin&gt;
    &lt;ProductName&gt;Harry Potter and the Goblet of Fire (Book 4)&lt;/ProductName&gt;
    &lt;Catalog&gt;Book&lt;/Catalog&gt;
    &lt;Authors&gt;
      &lt;Author&gt;J. K. Rowling&lt;/Author&gt;
      &lt;Author&gt;Mary GrandPr?&lt;/Author&gt;
    &lt;/Authors&gt;
    &lt;ReleaseDate&gt;08 July, 2000&lt;/ReleaseDate&gt;
    &lt;Manufacturer&gt;Scholastic&lt;/Manufacturer&gt;
    &lt;ImageUrlSmall&gt;http://images.amazon.com/images/P/0439139597.01.THUMBZZZ.jpg&lt;/ImageUrlSmall&gt;
    &lt;ImageUrlMedium&gt;http://images.amazon.com/images/P/0439139597.01.MZZZZZZZ.jpg&lt;/ImageUrlMedium&gt;
    &lt;ImageUrlLarge&gt;http://images.amazon.com/images/P/0439139597.01.LZZZZZZZ.jpg&lt;/ImageUrlLarge&gt;
    &lt;Availability&gt;Usually ships within 24 hours&lt;/Availability&gt;
    &lt;ListPrice&gt;$25.95&lt;/ListPrice&gt;
    &lt;OurPrice&gt;$18.16&lt;/OurPrice&gt;
    &lt;UsedPrice&gt;$3.97&lt;/UsedPrice&gt;
  &lt;/Details&gt;
&lt;/ProductInfo&gt;</pre>

<p>
From this, I cooked up an example RSS feed with Amazon's XML
schema shoehorned in as a namespace:
</p>
<pre>&lt;rss version="2.0"
  xmlns="http://blogs.law.harvard.edu/tech/rss"
  xmlns:az="http://www.amazon.com/gp/aws/landing.html"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.amazon.com/gp/aws/landing.html
                      http://xml.amazon.com/schemas3/dev-lite.xsd"&gt;
  &lt;channel&gt;
    &lt;title&gt;Testing Amazon Namespace&lt;/title&gt;   
    &lt;item&gt;
      &lt;title&gt;Harry Potter and the Goblet of Fire (Book 4)&lt;/title&gt;
      &lt;az:ProductInfo&gt;
        &lt;az:Details url="http://www.amazon.com/exec/obidos/ASIN/0439139597/0xdecafbad-20"&gt;
          &lt;az:Asin&gt;0439139597&lt;/az:Asin&gt;
          &lt;az:ProductName&gt;Harry Potter and the Goblet of Fire (Book 4)&lt;/az:ProductName&gt;
          &lt;az:Catalog&gt;Book&lt;/az:Catalog&gt;
          &lt;az:Authors&gt;
            &lt;az:Author&gt;J. K. Rowling&lt;/az:Author&gt;
            &lt;az:Author&gt;Mary GrandPr?&lt;/az:Author&gt;
          &lt;/az:Authors&gt;
          &lt;az:ReleaseDate&gt;08 July, 2000&lt;/az:ReleaseDate&gt;
          &lt;az:Manufacturer&gt;Scholastic&lt;/az:Manufacturer&gt;
          &lt;az:ImageUrlSmall&gt;http://images.amazon.com/images/P/0439139597.01.THUMBZZZ.jpg&lt;/az:ImageUrlSmall&gt;
          &lt;az:ImageUrlMedium&gt;http://images.amazon.com/images/P/0439139597.01.MZZZZZZZ.jpg&lt;/az:ImageUrlMedium&gt;
          &lt;az:ImageUrlLarge&gt;http://images.amazon.com/images/P/0439139597.01.LZZZZZZZ.jpg&lt;/az:ImageUrlLarge&gt;
          &lt;az:Availability&gt;Usually ships within 24 hours&lt;/az:Availability&gt;
          &lt;az:ListPrice&gt;$25.95&lt;/az:ListPrice&gt;
          &lt;az:OurPrice&gt;$18.16&lt;/az:OurPrice&gt;
          &lt;az:UsedPrice&gt;$3.97&lt;/az:UsedPrice&gt;
        &lt;/az:Details&gt;
      &lt;/az:ProductInfo&gt;
    &lt;/item&gt;   
  &lt;/channel&gt;   
&lt;/rss&gt;</pre>

<p>
Then, I transliterated things into what I understand of RSS-Data:
</p>
<pre>&lt;rss version="2.0"
  xmlns="http://blogs.law.harvard.edu/tech/rss"
  xmlns:sdl="http://radio.weblogs.com/0113297/2003/10/01.html#a237"&gt;
  &lt;channel&gt;
    &lt;title&gt;Testing Amazon Namespace&lt;/title&gt;   
    &lt;item&gt;   
      &lt;title&gt;A Sample Item&lt;/title&gt;
      &lt;sdl:data&gt;
        &lt;sdl:struct&gt;
          &lt;sdl:member&gt;
            &lt;sdl:name&gt;url&lt;/sdl:name&gt;
            &lt;sdl:value&gt;
              &lt;sdl:string&gt;http://www.amazon.com/exec/obidos/ASIN/0439139597/0xdecafbad-20&lt;/sdl:string&gt;
            &lt;/sdl:value&gt;
          &lt;/sdl:member&gt;
          &lt;sdl:member&gt;
            &lt;sdl:name&gt;Asin&lt;/sdl:name&gt;
            &lt;sdl:value&gt;&lt;sdl:string&gt;0439139597&lt;/sdl:string&gt;&lt;/sdl:value&gt;
          &lt;/sdl:member&gt;
          &lt;sdl:member&gt;
            &lt;sdl:name&gt;ProductName&lt;/sdl:name&gt;
            &lt;sdl:value&gt;
              &lt;sdl:string&gt;
                Harry Potter and the Goblet of Fire (Book 4)
              &lt;/sdl:string&gt;
            &lt;/sdl:value&gt;
          &lt;/sdl:member&gt;
          &lt;sdl:member&gt;
            &lt;sdl:name&gt;Catalog&lt;/sdl:name&gt;
            &lt;sdl:value&gt;&lt;sdl:string&gt;Book&lt;/sdl:string&gt;&lt;/sdl:value&gt;
          &lt;/sdl:member&gt;          
          &lt;sdl:member&gt;
            &lt;sdl:name&gt;Authors&lt;/sdl:name&gt;
            &lt;sdl:value&gt;
              &lt;sdl:array&gt;
                &lt;sdl:data&gt;
                  &lt;sdl:value&gt;J. K. Rowling&lt;/sdl:value&gt;
                  &lt;sdl:value&gt;Mary GrandPr&lt;/sdl:value&gt;
                &lt;/sdl:data&gt;
              &lt;/sdl:array&gt;
            &lt;/sdl:value&gt;            
          &lt;/sdl:member&gt;
          &lt;sdl:member&gt;
            &lt;sdl:name&gt;ReleaseDate&lt;/sdl:name&gt;
            &lt;sdl:value&gt;
              &lt;sdl:dateTime.iso8601&gt;2000-07-08T00:00:00&lt;/sdl:dateTime.iso8601&gt;
            &lt;/sdl:value&gt;
          &lt;/sdl:member&gt;          
          &lt;sdl:member&gt;
            &lt;sdl:name&gt;Manufacturer&lt;/sdl:name&gt;
            &lt;sdl:value&gt;&lt;sdl:string&gt;Scholastic&lt;/sdl:string&gt;&lt;/sdl:value&gt;
          &lt;/sdl:member&gt;
          &lt;sdl:member&gt;
            &lt;sdl:name&gt;ImageUrlSmall&lt;/sdl:name&gt;
            &lt;sdl:value&gt;
              &lt;sdl:string&gt;http://images.amazon.com/images/P/0439139597.01.THUMBZZZ.jpg&lt;/sdl:string&gt;
            &lt;/sdl:value&gt;
          &lt;/sdl:member&gt;          
          &lt;sdl:member&gt;
            &lt;sdl:name&gt;ImageUrlMedium&lt;/sdl:name&gt;
            &lt;sdl:value&gt;
              &lt;sdl:string&gt;http://images.amazon.com/images/P/0439139597.01.MZZZZZZZ.jpg&lt;/sdl:string&gt;
            &lt;/sdl:value&gt;
          &lt;/sdl:member&gt;          
          &lt;sdl:member&gt;
            &lt;sdl:name&gt;ImageUrlLarge&lt;/sdl:name&gt;
            &lt;sdl:value&gt;
              &lt;sdl:string&gt;http://images.amazon.com/images/P/0439139597.01.LZZZZZZZ.jpg&lt;/sdl:string&gt;
            &lt;/sdl:value&gt;
          &lt;/sdl:member&gt;          
          &lt;sdl:member&gt;
            &lt;sdl:name&gt;Availability&lt;/sdl:name&gt;
            &lt;sdl:value&gt;&lt;sdl:string&gt;Usually ships within 24 hours&lt;/sdl:string&gt;&lt;/sdl:value&gt;
          &lt;/sdl:member&gt;
          &lt;sdl:member&gt;
            &lt;sdl:name&gt;ListPrice&lt;/sdl:name&gt;
            &lt;sdl:value&gt;&lt;sdl:string&gt;$25.95&lt;/sdl:string&gt;&lt;/sdl:value&gt;
          &lt;/sdl:member&gt;
          &lt;sdl:member&gt;
            &lt;sdl:name&gt;OurPrice&lt;/sdl:name&gt;
            &lt;sdl:value&gt;&lt;sdl:string&gt;$18.16&lt;/sdl:string&gt;&lt;/sdl:value&gt;
          &lt;/sdl:member&gt;
          &lt;sdl:member&gt;
            &lt;sdl:name&gt;UsedPrice&lt;/sdl:name&gt;
            &lt;sdl:value&gt;&lt;sdl:string&gt;$3.97&lt;/sdl:string&gt;&lt;/sdl:value&gt;
          &lt;/sdl:member&gt;
        &lt;/sdl:struct&gt;
      &lt;/sdl:data&gt;
    &lt;/item&gt;   
  &lt;/channel&gt;   
&lt;/rss&gt;</pre>
<!--more-->
shortname=rss_data_versus_namespace

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087864">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://zoe.nu/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2d3d8732d4a17d4ad7513b127ce055e7&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://zoe.nu/">Zoe</a>
                </div>
                <a href="#comment-221087864" class="permalink"><time datetime="2003-10-02T12:25:19">2003-10-02T12:25:19</time></a>
            </div>
            <div class="content">Hehe... :) Good work. 

This demonstration should put this RSS-Data nonsense to rest.

Nothing like a good example...</div>
            
        </li>
    
        <li class="comment" id="comment-221087866">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://icite.net/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9c8bd9e7e240a5917219fba15f0a10f4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://icite.net/blog/">Jay Fienberg</a>
                </div>
                <a href="#comment-221087866" class="permalink"><time datetime="2003-10-02T12:41:14">2003-10-02T12:41:14</time></a>
            </div>
            <div class="content">Thanks for building a good example comparison--very useful and helpful to the discussion</div>
            
        </li>
    
        <li class="comment" id="comment-221087868">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.myelin.co.nz/post/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=79d809dc2d0441ef44efc6ad1a1429eb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.myelin.co.nz/post/">Phillip Pearson</a>
                </div>
                <a href="#comment-221087868" class="permalink"><time datetime="2003-10-02T17:48:09">2003-10-02T17:48:09</time></a>
            </div>
            <div class="content">Here's code to parse the RSS-Data version:

http://www.myelin.co.nz/post/2003/10/3/#200310031</div>
            
        </li>
    
        <li class="comment" id="comment-221087869">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.davidgalbraith.org"><img src="http://www.gravatar.com/avatar.php?gravatar_id=30d76b8340ace48320c3cc24927543aa&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.davidgalbraith.org">David Galbraith</a>
                </div>
                <a href="#comment-221087869" class="permalink"><time datetime="2003-10-02T18:08:36">2003-10-02T18:08:36</time></a>
            </div>
            <div class="content">Heh - nothing like actually seeing something. And surely if you use a schema version of RSS you would get the extra information about the metadata without having to put it inline with the feed itself?</div>
            
        </li>
    
        <li class="comment" id="comment-221087870">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.myelin.co.nz/post/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=79d809dc2d0441ef44efc6ad1a1429eb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.myelin.co.nz/post/">Phillip Pearson</a>
                </div>
                <a href="#comment-221087870" class="permalink"><time datetime="2003-10-02T18:18:13">2003-10-02T18:18:13</time></a>
            </div>
            <div class="content">And here's code to parse the namespace version:

http://www.myelin.co.nz/post/2003/10/3/#200310032</div>
            
        </li>
    
        <li class="comment" id="comment-221087871">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://dannyayers.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=ac0d01ebb5e438c029c0764064f70827&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://dannyayers.com">Danny</a>
                </div>
                <a href="#comment-221087871" class="permalink"><time datetime="2003-10-03T07:22:16">2003-10-03T07:22:16</time></a>
            </div>
            <div class="content">I've done a first-shot at this in RDF/XML :

http://dannyayers.com/archives/001908.html

Compare and contrast with the RSS-Data version (especially in terms of readibility, simplicity etc ;-)</div>
            
        </li>
    
        <li class="comment" id="comment-221087872">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href=""><img src="http://www.gravatar.com/avatar.php?gravatar_id=8f8684b971819df3daca507573d78894&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="">Michael Thorne</a>
                </div>
                <a href="#comment-221087872" class="permalink"><time datetime="2003-10-21T17:15:09">2003-10-21T17:15:09</time></a>
            </div>
            <div class="content">Just started looking into the RSS-Data format and lightly read over your samples.  What I noticed first off was there was no currency definition.  I believe this would be a critical component of international business. mxt</div>
            
        </li>
    
        </ul>
    
        </div>
    