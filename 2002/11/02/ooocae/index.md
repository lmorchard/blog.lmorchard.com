Looks like the Semantic Web <a href="http://www.russellbeattie.com/notebook/index.jsp?date=20021101#165113">hurts Russell Beattie's branes</a>.  Hurts mine too.  But, I tried explaining what I think I understand in a comment on his blog and I figure it's worth reposting here for ridicule and correction:
<br /><br />
Did you happen to catch <a href="http://www.sciencefriday.com/pages/2002/Nov/hour2_110102.html">Tim Berners-Lee on NPR Science Friday</a> today? Not sure if you get the broadcast there, or listen to the stream. He was expounding on the Semantic Web a bit.
<br /><br />
Maybe I'll take a shot at explaining, since I think I understand the idea. Likely I'll fail miserably, but here goes.
<br /><br />
First simple thing: Look at your weblog page. What would it take to extract the list of people from your blogroll, just given your URL? What about the titles of all the weblog posts on that page?
<br /><br />
You, personally, can extract that information very easily since you, as a learned human, grasp the semantics of the page quite quickly. (The semantics are, basically, what's what and what's where and what does it all describe.)
<br /><br />
Imagine a document containing exactly all of the same info your weblog page presents - only the data is completely, easily accessible to a robot in a universal, easily handled format.
<br /><br />
Furthermore, imagine that the schema describing the data to be found on your page is in that same format. And then, imagine that the document describing the construction of schema is in that same format. And then imagine that the decomposition continues, all of the way down to base data types and relationships. Eventually, the whole thing rests on the back of a turtle - er I mean a sort of universal client.
<br /><br />
Now, what if every single page on the web were available in this manner? No scraping, no regex, no tricks. I could use the entire web as database and execute queries that draw from data available on a myriad of disparate URLs. My client can figure out what to do with whatever it finds at a URL by chasing descriptions and meta-descriptions until it reaches the level of understanding implemented in the client.
<br /><br />
Going out on a limb here, but imagine a practical example: "Hello computer, find me 2 roundtrip tickets for 7 days anytime in the next 10 weeks, for under US$300 each, to a vacation spot where the weather this time of year is usually warm and sunny, the exchange rate is better than 3 to 1 US dollar, and is rated as better than average by Ann Arbor, MI bloggers."
<br /><br />
Assume my semantic web client knows some URLs to airlines, to international weather services, to exchange rates, and to vacation spot reviews in weblogs in Ann Arbor, MI. Assume that there are schema available for the things these URLs describe. Assume that my semantic web client can parse my natural language query.
<br /><br />
So, it takes my request, goes out and snags the URLs appropriate to the various topics involved. Once it has all it need to process the data in each URL, it can find me the answer to my query, based on data pulled from all over the place.
<br /><br />
Now, get nuttier and bring in some intelligence with robots that can do some inference and reasoning. Say I throw out some facts: Mammals breathe oxygen. Men are mammals. Joe is a man. With the right client, the query "Give me all oxygen breathers," will include Joe in its results.
<br /><br />
Whew. There. That's what I think I understand about the Semantic Web.
<!--more-->
shortname=ooocae

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221085082">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.fplanque.com/Blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=d6a8b6d90049e3e11b3a0f653d52d4c5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.fplanque.com/Blog/">Francois PLANQUE</a>
                </div>
                <a href="#comment-221085082" class="permalink"><time datetime="2002-12-15T21:39:30">2002-12-15T21:39:30</time></a>
            </div>
            <div class="content">Yope! This explanation should make the concept pretty clear for everyone... 

But there's one little thing I wonder about: you assume so much about what your semantic web client can do, that you could actually go on assuming it can grasp the semantics of any web page without any further tagging, couldn't you? 

just kidding :-))</div>
            
        </li>
    
        <li class="comment" id="comment-221085084">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.completeconfusion.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=fb354a72721eee78504e0cdca4e0542f&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.completeconfusion.com">Russ Johnston</a>
                </div>
                <a href="#comment-221085084" class="permalink"><time datetime="2002-12-22T22:51:50">2002-12-22T22:51:50</time></a>
            </div>
            <div class="content">For an extension of the semantic web to word meanings you may want to look at:

http://jorl.com/inventions/num/index.htm

Probably the best, first use of this idea would be to add a duplicate metatag in webpages, for keywords, giving the "disambiguating" "number-words" corresponding to the keywords, and helping everybody get the search results they want. No more finding out about Mercury the car, planet, and God when you wanted to know whether your teeth were poisoning you...</div>
            
        </li>
    
        </ul>
    
        </div>
    