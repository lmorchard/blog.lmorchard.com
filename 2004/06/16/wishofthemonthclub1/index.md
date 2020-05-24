<i>Remember that [I wrote a little while ago][lasttime] about wanting to publish some articles here that I'd want to read?  Well, I've been hard at work since then to turn out the first set and I think I've finally got something for you.  I [mentioned][lasttime2] earlier this week that I was taking this seriously, so I hope it shows.  So, with many thanks to [my girlfriend's][missadroit] kind editorial help, and with some measure of anxiety, here goes...</i>

### Introduction

For some time now, my girlfriend and I have been accumulating things we want in wishlists on Amazon.com.  [Here's mine][mywishlist] and [here's hers][herwishlist] - if you visit them, you can see we've both got quite a few things listed.  Though they have come in handy with relatives at Christmas and on birthdays, neither of us really expects to see a regular flow of gifts from them.  For the most part, they've just become holding tanks for things we intend to buy for each other or ourselves.  

However, I tend to forget we have these lists except for occasional visit to Amazon when I think, "Oh yeah, wishlists.  I should pick up a thing or two, there's some good stuff piled up in them."  On one particular visit, though, the notion of a Wish-of-the-Month club popped into my head: We could afford to grab at least one item for each of us from our wishlists on a monthly basis, provided that we remembered to place an order.  It'd be better than signing up for a book or music club, driven by someone else's idea of what we wanted.  Unfortunately, there's that problem for busy, absentminded, and people like us: remembering to place an order.

But wait, isn't this the sort of thing computers are for?  I should be able to cobble something together that would peruse our wishlists and--given some criteria like a price maximum--select an item at random for each of us and send them on their way.  With this, I could schedule a monthly run and start whittling down those lists.

### Gathering Tools

Before I start working through the project itself, let's establish some assumptions and then gather some tools and materials:

I'm going to assume that you're using a UN*X operating system (ie. Linux, Mac OS X, etc.) and that you're reasonably familiar with getting around in a shell and editing files.  Things presented here could be adapted for Windows fairly easily, but I'll leave that as an exercise to the reader.  Also, you may need to build and install a package or two, so know-how in that regard will serve as well.  And finally: some familiarity with XML and XSLT would be useful, but you won't need to be a guru with either.

Oh, and all the files I'll be introducing in this project can be downloaded from my website as a tarball:  [`wishes.tar.gz`][wishes.tar.gz].  If you feel like browsing, you can see these files in my [CVS repository][wishescvs].  And if you feel like checking out a copy via anonymous CVS, the username is `anoncvs` and the password is blank--email me for help, if you need it.

So, how do we get a look at these wishlists?  Lately, I've been tinkering a bit with [scraping information from][xslscraper] and [automating access to][spideringhacks] websites.  It's a bit like a puzzle game, with all the accompanying frustrations and happy breakthroughs.  However, where most puzzle games are designed with a solution in mind, this game isn't even necessarily meant to be played depending on the intentions of website owners.

Fortunately, the folks at Amazon.com have made things very friendly to tinkerers by providing an API, called [Amazon Web Services][amazonapi] (or AWS).  You'll want to [download][awsdownload] the AWS developer's kit, which contains a wealth of documentation and examples.  After downloading these materials, you should [apply for a developer's token][awstoken] for use with the service.  AWS provides both SOAP and REST interfaces to functionality and data at their site; personally, I prefer the HTTP-and-XML approach taken by the REST interface, so that's what we'll be using here. 

To handle the XML produced by AWS, we'll be using the `xsltproc` command from [the XML C parser and toolkit of Gnome][libxslt].  There are other XSLT processors--such as [Xalan][xalan], [Sablotron][sablotron], and [Saxon][saxon]--but I've found [libxslt][libxslt] easiest to feed and care for on the various platforms with which I tinker.  It also seems to support a very large swath of [EXSLT extensions][exslt], all of which come in very handy, yet seem to receive uneven support in other XSLT processors.  We'll be pulling a trick or two out of that bag, so its support is key.

You may or may not already have [libsxlt][libxslt] installed.  Depending on your variant of Linux, it might be as simple as a single package-management command or it might be a bit more complex if you need to compile from source.  For Mac OS X, I recommend using [Fink][fink] for your packaging needs.  Although, [DarwinPorts][darwinports] is nice as well, if you're used to The BSD Way.

A bonus for OS X users: Marc Liyanage has provided a great Open Source tool named [TestXSLT][testxslt] that embeds [libxslt][libxslt], among other XSLT processors, in a slick GUI for easier use.  This might come in handy for you as things develop.

### Wishlists in XML

Okay, we've got a working environment, a head start on accessing Amazon wishlists as XML, and a way to manipulate that XML using `xsltproc`.  Let's start playing.  First things first, we need to gain access to Amazon wishlists in XML form.  Reading through the [AWS documentation][awsdownload] reveals that wish list searches are available via a URL constructed like so:

    http://xml.amazon.com/onca/xml3?
    t=[Associates ID goes here]&#38;
    dev-t=[Developer Token goes here]&#38;
    WishlistSearch=[wishlist ID goes here]&#38;
    type=[lite or heavy]&#38;
    f=xml

I received an ID of `0xdecafbad-20` when I [signed up to be an associate][amazonassociate] a few years ago.  This will ensure that I get credited for sales made via the API--which isn't as important for the present project, since I'll be buying items myself, but it'll come in handy in later projects.  Also, when I [signed up for a developer's token][awstoken], this is what I was given: `D8HVH869XA0NP`  I'm disclosing my own here for the sake of example, but you should [sign up][awstoken] and get your own.

So, that fills in the first two parts of the URL.  For the purposes of this project, let's just go with the `lite` option for type.  As for the wishlist ID, let's take a look the wishlist URLs to which I linked earlier:

    http://www.amazon.com/exec/obidos/registry/35OIOYWQ9XQAE
    http://www.amazon.com/exec/obidos/registry/1QWYI6P2JF3Q5

You can discover these wishlist URLs using [Amazon's Wish List Search][wlsearch] feature, in which case a wishlist URL might appear like so:

    http://www.amazon.com/gp/registry/registry.html/
    002-7899886-3676027?%5Fencoding=UTF8&#38;
    id=35OIOYWQ9XQAE

In either case, there is a 13-character ID in each variety of wish list URL: this string is the wish list ID.  So, the ID for my girlfriend's wishlist is ` 35OIOYWQ9XQAE` and mine is `1QWYI6P2JF3Q5`.  Given this piece of the puzzle, we can fill in the blanks to come up with the following URL for my girlfriend's wish list:

    http://xml.amazon.com/onca/xml3?
    t=0xdecafbad-20&#38;
    dev-t=D8HVH869XA0NP&#38;
    type=lite&#38;
    WishlistSearch=35OIOYWQ9XQAE&#38;
    f=xml

[Check out the XML resulting from this URL][wlurl]--you may want to use a tool such as `curl` or `wget` instead of viewing this directly in your browser.  You'll see some XML that looks something like this:

    <ProductInfo>
    ...
    <Details url="(some long URL)">
      <Asin>0262133601</Asin>
      <ProductName>Foundations of Statistical Natural Language Processing</ProductName>
      <Catalog>Book</Catalog>
      <Authors>
         <Author>Christopher D. Manning</Author>
         <Author>Hinrich Sch&#252;tze</Author>
      </Authors>
      <ReleaseDate>18 June, 1999</ReleaseDate>
      <Manufacturer>MIT Press</Manufacturer>
      <ImageUrlSmall>(another long url)</ImageUrlSmall>
      <ImageUrlMedium>(yet another long url)</ImageUrlMedium>
      <ImageUrlLarge>(one last long url)</ImageUrlLarge>
      <Availability>Usually ships within 24 hours</Availability>
      <ListPrice>$75.00</ListPrice>
      <OurPrice>$63.75</OurPrice>
      <UsedPrice>$49.99</UsedPrice>
    </Details>
    ...
    </ProductInfo>

Note that the [long URL][detailsurl] in the `Detail` element's `url` attribute links to the human-viewable product detail page at Amazon.  I've also left a few other things out, such as the URLs to product images; I just thought I'd edit it a bit to be friendlier to your browser at home.  There's a [schema][awslite] for this XML data, and the ins-and-outs are explained in the AWS documentation under "Amazon Web Services Data Model".

### Querying The Wishes

Some ready-made files are available for this section:
* [`wishes-ex1.xsl`][wishes-ex1.xsl]: The first iteration of the stylesheet in development.
* [`wishes.xml`][wishes.xml]: An XML document used as input with the stylesheet.

Now that we've got some XML from Amazon to play with, let's start tinkering with an XSLT stylesheet to process it.  In the interests of flexibility and reusability, we can parameterize a few things in XML before starting in on the stylesheet:

    <wishes xmlns="http://www.decafbad.com/2004/05/wishes">
      <maxprice>15.00</maxprice>
      <associate>0xdecafbad-20</associate>
      <devtoken>D8HVH869XA0NP</devtoken>
      <email>deus_x@pobox.com</email>
      <wishlists>
        <wishlist label="The Girl">35OIOYWQ9XQAE</wishlist>
        <wishlist label="Me">1QWYI6P2JF3Q5</wishlist>
      </wishlists>
    </wishes>

Hopefully, the data here is fairly self-explanatory:  I've established a maximum price for item selection; provided my associate ID and developer token; there's an email address to which I eventually want to send the results of all this work; and I've made a list of wishlist IDs, each with a readable label. Given this, let's start out simple and  use this to get some data from Amazon:

    <?xml version="1.0"?>
    <xsl:stylesheet version="1.0"
                xmlns:wishes="http://www.decafbad.com/2004/05/wishes"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <xsl:output indent="yes" />

      <!-- Grab our global settings -->
      <xsl:variable name="maxprice"  select="/wishes:wishes/wishes:maxprice" />  
      <xsl:variable name="associate" select="/wishes:wishes/wishes:associate" />
      <xsl:variable name="devtoken"  select="/wishes:wishes/wishes:devtoken" />

So far so good--things start off by pulling in some of the parameters into variables.  Next, let's dig into actually querying wishlist data with a reusable template:

      <xsl:template name="processWishlist">
        <xsl:param name="wishlist" />

        <xsl:variable name="details" select="document(concat(
            'http://xml.amazon.com/onca/xml3?',
            't=',$associate,'&amp;',
            'dev-t=',$devtoken,'&amp;',
            'WishlistSearch=',$wishlist,'&amp;',
            'type=lite&amp;f=xml'))//Details" />

First thing into this template, we accept a parameter named `wishlist` which is expected to contain a wishlist ID string.  Next, we build an AWS URL by concatenating together the pieces we have in variables (associate ID, developer's token, and wishlist ID) using the XPath function [`concat()`][xpconcat].  Once we have this URL, we use the function [`document()`][xpdocument] to make a request and fetch the XML data for that URL.  From this, we select all the `Details` elements.  

Then with that data, we can do some filtering on the price and availability.  We want to make sure that not only will we select items that are within our budget, but that they are available to buy in the first place:

        <xsl:copy-of select="$details[
          number(substring(OurPrice/text(),2)) &lt; $maxprice
          and
          contains(Availability, 'Usually ships within')
          ]" />

      </xsl:template>

This code is just a little bit funky, since the price data given by Amazon contains a dollar sign, and we want to make a numerical comparison.  So, we chop the dollar sign off and convert to a number before making the comparison.  Also, there's an assumption here about what will show up in the `Availability` element: "Usually ships within"  Other things that might show up will declare that the item is out of stock, discontinued, or otherwise not shipping.  This might need some tweaking someday, but it seems to work for now.

Taken all together, this template has the effect of a SQL SELECT statement somewhat like this:

    SELECT * 
    FROM Amazon.WishlistItems 
    WHERE WishlistID = $wishlist AND 
          OurPrice < $maxprice AND
          Availability like '%Usually ships within%';

`document()` is a very useful XPath function.  It allows us to pull in XML from external files and, in our case, from external URLs via HTTP requests.  This gives us the ability to make queries against REST web services like AWS--which, among many other reasons, is why I prefer REST web services over SOAP.  (I don't even want to think about trying to access a SOAP service from XSLT.)

Now, let's wrap up this first iteration of the stylesheet by trying out the query template on each of the wishlist IDs:

      <xsl:template match="/wishes:wishes">
        <xsl:for-each select="//wishes:wishlist">
          <wishes:wishitem>
            <xsl:copy-of select="." />
            <xsl:call-template name="processWishlist">
                  <xsl:with-param name="wishlist" 
                                  select="." />
            </xsl:call-template>
          </wishes:wishitem>
        </xsl:for-each>
      </xsl:template>
  
    </xsl:stylesheet>

You can get a [completed version of this stylesheet][wishes-ex1.xsl], along with [the input XML][wishes.xml], in case you haven't been cutting and pasting together a copy of your own along the way.  Try it out in a shell with:

    $ xsltproc wishes_ex1.xsl wishes.xml

Alternately, you could check it out using [TestXSLT][testxslt] under OS X.  You should get something like the following:

    <wishes:wishitem xmlns:wishes="http://www.decafbad.com/2004/05/wishes">
        <wishes:wishlist label="The Girl">35OIOYWQ9XQAE</wishes:wishlist>
        <Details ...>...</Details>
        <Details ...>...</Details>
        ...
    </wishes:wishitem>
    <wishes:wishitem xmlns:wishes="http://www.decafbad.com/2004/05/wishes">
        <wishes:wishlist label="Me">1QWYI6P2JF3Q5</wishes:wishlist>
        <Details ...>...</Details>
        <Details ...>...</Details>
        ...
    </wishes:wishitem>

Obviously, this example XML is much abridged, but hopefully you can get the gist:  For each wishlist ID, there is a containing `wishitem` element.  It contains a copy of the `wishlist` element from the input XML, followed by all the `Details` elements filtered and copied from the Amazon XML with the help of the `processWishlist` template.

### That's All for Now!

And that's the end of Part 1.  Next up, we'll be delving into a few more wrinkles in the wishlist querying process, selecting random items in XSLT, and the Remote Shopping Cart interface in Amazon Web Services.  Stay tuned!

<!-- links -->

[missadroit]: http://missadroit.livejournal.com "Miss Adroit, my favorite girl in the world"
[mywishlist]: http://www.amazon.com/exec/obidos/registry/1QWYI6P2JF3Q5 
[herwishlist]: http://www.amazon.com/exec/obidos/registry/35OIOYWQ9XQAE 
[amazonapi]: http://www.amazon.com/gp/aws/landing.html "Amazon Web Services"
[libxml]: http://www.xmlsoft.org/
[xalan]: http://xml.apache.org/xalan-j/
[sablotron]: http://www.gingerall.com/charlie/ga/xml/p_sab.xml
[saxon]: http://saxon.sourceforge.net/
[exslt]: http://www.exslt.org/
[libxslt]: http://www.xmlsoft.org/XSLT.html
[spideringhacks]: http://www.amazon.com/exec/obidos/ASIN/0596005776/0xdecafbad-20 "O'Reilly's Spidering Hacks"
[xslscraper]: http://www.decafbad.com/twiki/bin/view/Main/XslScraper "Scrape RSS and Atom from HTML using Tidy and XSLT"
[awsdownload]: http://www.amazon.com/gp/browse.html/ref=sc_fe_c_2/002-7899886-3676027?%5Fencoding=UTF8&#38;node=3434641&#38;no=3435361&#38;me=A36L942TSJ2AJA
[awstoken]: https://associates.amazon.com/exec/panama/associates/join/developer/application.html
[amazonassociate]: http://associates.amazon.com
[wlsearch]: http://www.amazon.com/gp/registry/search.html/002-7899886-3676027?%5Fencoding=UTF8&#38;type=wishlist
[wlurl]: http://xml.amazon.com/onca/xml3?t=0xdecafbad-20&#38;dev-t=D8HVH869XA0NP&#38;type=lite&#38;WishlistSearch=35OIOYWQ9XQAE&#38;f=xml
[detailsurl]: http://www.amazon.com/exec/obidos/ASIN/0262133601/0xdecafbad-20?dev-t=D8HVH869XA0NP%26camp=2025%26link_code=xm2
[awslite]: http://xml.amazon.com/schemas3/dev-lite.xsd
[fink]: http://fink.sourceforge.net
[testxslt]: http://www.entropy.ch:16080/software/macosx/#testxslt
[darwinports]: http://darwinports.opendarwin.org/
[curl]: http://www.decafbad.com/#TODO
[wget]: http://www.decafbad.com/#TODO
[xpconcat]: http://www.w3.org/TR/2002/WD-xquery-operators-20020816/#func-concat
[xpdocument]: http://www.w3.org/TR/2002/WD-xquery-operators-20020816/#func-document
[wishescvs]: http://www.decafbad.com/cvs/hacks/wishes/
[wishes.tar.gz]: http://www.decafbad.com/cvs/hacks/wishes/wishes.tar.gz?tarball=1 "All Wish-of-the-Month Club files wrapped up in a tarball"
[wishes.xml]: http://www.decafbad.com/cvs/*checkout*/hacks/wishes/wishes.xml
[wishes-ex1.xsl]: http://www.decafbad.com/cvs/*checkout*/hacks/wishes/wishes-ex1.xsl
[wishes-ex2.xsl]: http://www.decafbad.com/cvs/*checkout*/hacks/wishes/wishes-ex2.xsl
[wishes-ex3.xsl]: http://www.decafbad.com/cvs/*checkout*/hacks/wishes/wishes-ex3.xsl
[wishes-ex4.xsl]: http://www.decafbad.com/cvs/*checkout*/hacks/wishes/wishes-ex4.xsl
[wishes-ex5.xsl]: http://www.decafbad.com/cvs/*checkout*/hacks/wishes/wishes-ex5.xsl
[wishes-ex6.xsl]: http://www.decafbad.com/cvs/*checkout*/hacks/wishes/wishes-ex6.xsl
[random-xml]: http://www.decafbad.com/cvs/*checkout*/hacks/wishes/random-xml
[wishes_html_screenshot]: http://www.decafbad.com/cvs/*checkout*/hacks/wishes/wishes.jpg
[xslt_iteration]: http://www.dpawson.co.uk/xsl/sect2/N4806.html "Iteration in XSLT"
[xslt_recursion]: http://www-106.ibm.com/developerworks/xml/library/x-xslrecur/ "Use recursion effectively in XSL"
[exsl_random]: http://www.exslt.org/math/functions/random/index.html
[exsl_node_set]: http://www.exslt.org/exsl/functions/node-set/index.html
[rand_url]: http://www.decafbad.com/2004/05/random-xml?int=1&#38;min=10&#38;max=20 "A random integer between 10 and 20, in XML"
[xslt_result_tree_fragment]: http://www.w3.org/TR/xslt#section-Result-Tree-Fragments

[email_attach_anatomy]: http://www.dpo.uab.edu/Email/attach.html "Anatomy of an Email Attachment"
[email_mime_and_html]: http://www.abiglime.com/webmaster/articles/cgi/010698.htm "How to encapsulate HTML in an email message"

[email_html_and_text]: http://www.wilsonweb.com/wmt5/html-email-multi.htm "Sending HTML and Plain Text E-Mail Simultaneously"
[man_sendmail]: http://www.hmug.org/man/8/sendmail.html "man: sendmail"
[rfc1521]: http://www.faqs.org/rfcs/rfc1521.html "RFC 1521"
[cron1]: http://www.lysator.liu.se/~forsberg/linux/cron.html "Doing things periodically - Using CRON"
[cron2]: http://www.itworld.com/Comp/2378/swol-0825-unix101/ "Using cron basics"
[python_libxml]: http://xmlsoft.org/python.html 
[lasttime]: http://www.decafbad.com/blog/2004/05/25/i_was_a_preteen_transactor_author_wannabe_and_still_am
[lasttime2]: http://www.decafbad.com/blog/2004/06/13/i_will_do_the_fandango
<!--more-->
shortname=wishofthemonthclub1

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221082740">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://inflatus.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2c0ee9a9038c85c0510a7a5fd3f030ab&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://inflatus.net">poepping</a>
                </div>
                <a href="#comment-221082740" class="permalink"><time datetime="2004-06-16T17:24:01">2004-06-16T17:24:01</time></a>
            </div>
            <div class="content">I was using the amazon wish list api a few months ago, and back then the wish list was out of date, and was missing the newest week or two of stuff.  You might want to check this if this is important to you.

In the future, you could add the feature of ordering the stuff that has a higher priority on it. :)

Cool project though. I think i'm going to go back through my old code and try it again to see if they fixed the delay.

btw, I miss your links of the day.</div>
            
        </li>
    
        <li class="comment" id="comment-221082741">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.mpwilson.com/uccu/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=99b77c34a0e26fd04a058f8c2dbab290&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.mpwilson.com/uccu/">Mad William Flint</a>
                </div>
                <a href="#comment-221082741" class="permalink"><time datetime="2004-06-16T19:40:55">2004-06-16T19:40:55</time></a>
            </div>
            <div class="content">very nice.  whipping out my emacs now...</div>
            
        </li>
    
        </ul>
    
        </div>
    