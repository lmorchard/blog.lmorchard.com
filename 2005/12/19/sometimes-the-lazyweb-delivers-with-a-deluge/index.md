> [Kellan][k]: " '… and that’s not my code.' ouch"
>
> [Eric][e]: "Right now, the only thing we have special for Magpie RSS is that we don’t serve Atom to that user-agent if the version is 0.5."
>
> [Rasmus][r]: "I wrote a simple little PHP 5.1-based RSS parser a while back and it doesn’t have any problems with that ... feed."

<small style="text-align:right; display:block">Source: <a href="http://decafbad.com/blog/2005/12/19/feedburner-feeds-give-heartburn-to-php-xml-parsers">Comments on my previous post</a></small>

[Facepalm][fp], [headdesk][hd].  As it turns out, the issue I was having with my PHP XML parsing was that I was trying to cram raw gzip streams down its throat, caused by some odd things I was trying to do with HTTP headers copied cargo-cult style from [a Python module I've tried reinventing in PHP][htc].  

In other words, completely braindead work by someone who should know better, even though he's relatively new to PHP—where *he* is defined as ***me***.

But, kudos to the people of the lazyweb for taking the time to triangulate me and remove all doubt within scant hours of my post.  Not counting a half-dozen private emails, I got very quick responses from [the author of MagpieRSS][k], [the CTO of FeedBurner][e], and [the creator of PHP himself][r]—each very nicely, clearly, and rightly saying: 

**"...and that's not *my* code."**

Be careful when you attempt to invoke the lazyweb, because it might just respond!

[htc]: http://decafbad.com/trac/browser/trunk/FeedMagick/includes/HTTPCache.php
[hd]: http://www.urbandictionary.com/define.php?term=headdesk
[fp]: http://www.google.com/search?q=facepalm&start=0&ie=utf-8&oe=utf-8&client=firefox-a&rls=org.mozilla:en-US:official
[k]: http://decafbad.com/blog/2005/12/19/feedburner-feeds-give-heartburn-to-php-xml-parsers#comment-3200
[e]: http://decafbad.com/blog/2005/12/19/feedburner-feeds-give-heartburn-to-php-xml-parsers#comment-3204
[r]: http://decafbad.com/blog/2005/12/19/feedburner-feeds-give-heartburn-to-php-xml-parsers#comment-3209
