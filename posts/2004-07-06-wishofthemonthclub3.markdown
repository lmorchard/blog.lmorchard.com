---
comments_archived: true
date: '2004-07-06T17:05:45-04:00'
excerpt: This is the exciting conclusion of the Wish-of-the-Month Club.  Before
    continuing on, you may want to catch up with parts one and two.
layout: post
tags:
- hacks
- xml
title: Wish-of-the-Month Club, Part 3 of 3
wordpress_id: 532
wordpress_slug: wishofthemonthclub3
wordpress_url: http://www.decafbad.com/blog/?p=532
---
<i>This is the exciting conclusion of the Wish-of-the-Month Club.  Before continuing on, you may want to catch up with parts [one][part1] and [two][part2].</i>

### Presenting the Results

Some ready-made files are available for this section:
* [`wishes-ex5.xsl`][wishes-ex5.xsl]: The fifth iteration of the stylesheet in development.
* [`wishes.html`][wishes.html]: Sample output in HTML

We've finally gotten together all the bits of information we need--wishlists have been queried; random items have been selected; and a shopping cart has been prepared.  Now we just have to present the selections and a link to check out with the shopping cart.

First, locate the following line toward the end of the stylesheet as we left it in the last section:

        <xsl:copy-of select="$shopping_cart" />

Delete this, and let's replace it by building some HTML:

        <xsl:variable name="shopping_cart_purchase_url" 
                      select="exsl:node-set($shopping_cart)//PurchaseUrl" />
        
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head><title>Wishlist Shopping Cart</title>\</head>
          <body>
            <p class="title">
              Here are your wishlist items
              <a href="{$shopping_cart_purchase_url}">
                <img src="http://g-images.amazon.com/images/G/01/detail/shoppingcart-header-02.gif" />
              </a> 
              items:
            </p>

We're using the `exsl:note-set` function again to access the contents of `$shopping_cart` with an XPath expression.  We pluck out the value of the `PurchaseUrl` in the shopping cart and place it in the variable `shopping_cart_purchase_url`.  Then, after a bit of HTML preamble, we borrow a shopping cart icon from Amazon itself to construct a link to which we can browse later to purchase the selected items.  This HTML is very simple so far; it's likely too simple, so eventually you may like to toss some CSS in here to improve the looks of things.  But, I'll leave that as an exercise for the reader.  

Next, let's build a display of the items selected by iterating first through the wishlists:
        
            <xsl:for-each select="exsl:node-set($random_products)/wishes:wishitem">
              <div class="Detail">

                <p class="wishlistLabel">
                  <xsl:value-of select="wishes:wishlist/@label" />
                </p>

This begins a block for each wishlist, starting off with a paragraph containing the label we gave each wishlist.  Next, let's include a few details about the product chosen.  Again, all of the bits of data included for each product are described in the AWS documentation in the *Overview* under *Amazon Web Services Data Model*.  Checking that out, we can see that the data includes a URL to images of several sizes representing the product.  Let's include the medium-sized image as a link to the product's detail page:

                <p class="Product">
                  <a href="{Details/@url}">
                    <img src="{Details/ImageUrlMedium}" />
                  </a>
                  <br />

We can also include the product's name as a link:

                  <span class="ProductName">
                    <a href="{Details/@url}">
                      <xsl:value-of select="Details/ProductName" />
                    </a>
                  </span>
                  <br />

And, it would be nice to provide a listing of people involved in creating the product (ie. the artists and/or authors):

              <xsl:for-each select="./Details/Artists/Artist | 
                                    ./Details/Authors/Author">
                <span class="Author">by <xsl:value-of select="." /></span><br />
              </xsl:for-each>

Note that here, the XPath selecting the data is just a bit more involved, since this information can be found in both `Artist` and `Author` elements.  In another case, we might care to make a distinction, but it really isn't all that important for this project.  The data model also provides an indication of from which catalog this product came, as well as its date of release.  Let's include that for good measure:
              
              (
              <xsl:value-of select="Details/Catalog" /> -
              <span class="ReleaseDate">
                <xsl:value-of select="Details/ReleaseDate" />
              </span>
              )
              <br />
            </p>

Another thing that would be nice to know is how much this thing costs--we've got this information provided in the XML data as well, so let's include it:
            
            <p>
              <span class="PriceLabel">List Price:</span> 
              <span class="ListPrice">
                <xsl:value-of select="Details/ListPrice" />
              </span>
              <br />
              
              <span class="PriceLabel">Our Price:</span>
              <span class="OurPrice">
                <xsl:value-of select="Details/OurPrice" />
              </span>
              <br />

              <span class="PriceLabel">Used Price:</span> 
              <span class="UsedPrice">
                <xsl:value-of select="Details/UsedPrice" />
              </span>
              <br />
            </p>

Something to note about these prices, too, is that although the used price is listed, the shopping cart will contain new items from Amazon's shelves.  You might want to compare these prices though, and make a change to the shopping cart when you get there, if a used item is acceptable.  (Another good reason for manual intervention in our Wish-of-the-Month club.)

Oh yeah, and we should include one other bit of information:
            
            <p>(<xsl:value-of select="Details/Availability" />)</p>

This tells us whether or not this item can actually be bought, at present.  Although we used this data earlier to try to filter out unavailable items, we should still display this information just in case we missed something.

Finally, let's clean up and finish the HTML:
            
          </div>
        </xsl:for-each>
        
      </body>
    </html>

Running this stylesheet ([wishes-ex5.xsl][wishes-ex5.xsl]) should give you a page that looks something like this in a browser:

![Wishlist HTML screenshot][wishes_html_screenshot]

### Scheduling Monthly Emails

Some ready-made files are available for this section:
* [`wishes-ex6.xsl`][wishes-ex6.xsl]: The sixth (and final) iteration of the stylesheet in development.

That HTML we're producing is fine, but what we really want to do is get it delivered to us.  We could set up a scheduled run that would periodically generate a page for us to visit, but the whole point of this is laziness.  How about firing off an email with this content?  There are two things to help us with this: [RFC 1521][rfc1521] shows us how to construct email messages with a variety of content types; and [`sendmail`][man_sendmail] will let us send these messages out.  And then, with the help of `cron`, we can fire up this process every month.

Along with producing XML, XSLT can also construct plain text output--which is just what we need to create MIME email messages.  [RFC 1521][rfc1521] doesn't make for the most thrilling reading, but there are a few articles to be found that summarize things (such as [this article][email_mime_and_html] and [this article][email_html_and_text]).   To make a long story short, a basic shell for an email message using MIME to include an HTML part and a plain text part looks something like this:

    To: someone@example.org
    Subject: Some useful email subject
    MIME-Version: 1.0
    Content-Type: multipart/alternative; boundary="theBoundaryString"

    --theBoundaryString
    Content-Type: text/plain

    Some plain text representation goes here...

    --theBoundaryString
    Content-Type: text/html
    Content-Transfer-Encoding: 7bit
    Content-Disposition: inline
    Content-Base: "http://www.decafbad.com/"

    <html xmlns="http://www.w3.org/1999/xhtml">
        <p>Some HTML representation goes here...</p>
    </html>

    --theBoundaryString--

I've snuck in the idea of providing both an HTML version (which we've already done) and a new plain text version.  Depending on your email program and your preferences, one type might be more useful than the other.  In any case, it's not all that hard to offer both here.  To start sending these email messages, though, we'll need an email address.  So, add that as an element in [wishes.xml][wishes.xml]:

    <wishes xmlns="http://www.decafbad.com/2004/05/wishes">
      <email>deus_x@pobox.com</email>
      <maxprice>15.00</maxprice>
      <associate>0xdecafbad-20</associate>
      <devtoken>D8HVH869XA0NP</devtoken>
      <wishlists>
        <wishlist label="Me">1QWYI6P2JF3Q5</wishlist>
        <wishlist label="The Girl">35OIOYWQ9XQAE</wishlist>
      </wishlists>
    </wishes>

Let's extract this data into a global variable near the start of the stylesheet:

      <xsl:variable name="email_to"  select="/wishes:wishes/wishes:email" />

Start editing the final template of the stylesheet, inserting before the start of HTML content:

        <!-- Eat all the line breaks generated so far -->
        <xsl:text>To: </xsl:text><xsl:value-of select="$email_to" />   
    Subject: 0xDECAFBAD's Amazon Wish-of-the-Month Club
    MIME-Version: 1.0
    Content-Type: multipart/alternative; boundary="theBoundaryString"

This is the header for the email.  Up until now, we've been generating XML with the stylesheet and haven't cared very much about any extra whitespace or line breaks which might sneak into the output.  However, in an email header, whitespace is important since a blank line is what's used to separate the headers from the body of the email message.  So, any stray blank lines will cause what we might have meant to be headers to be interpreted as part of the message instead.  Producing the first header in the email with `xsl:text` tags causes the XSL processor to throw away any leading whitespace which would have appeared before the first header.

Other than this little twist, the email header looks pretty much like the shell.  We fill in the `To` address from the global variable `$email_to` and define a `Subject` line.  The `MIME-Version` and `Content-Type` headers are what enable us to include both text and HTML versions in one email.

Now we can start into one of the parts:

    --theBoundaryString
    Content-Type: text/plain

This begins the plain text section of the email, using the *boundary string* as defined in the headers to delinieate the section's beginning.  The section can also have its own set of headers, of which we use only one: `Content-Type`.  Moving along, let's work on the text content itself.

    Here are your wishlist items:

    <xsl:value-of select="$shopping_cart_purchase_url" /><xsl:text>
    </xsl:text>

No shopping cart image here, but this includes the human-viewable URL which leads to a shopping cart on Amazon.com.  The usage of `xsl:text` here forces a line break where there otherwise wouldn't have been one with the usage of `xsl:value-of`.  Now, let's iterate through each of the wishlists and list out the product details:

    <xsl:for-each select="exsl:node-set($random_products)/wishes:wishitem">
    ---------------------------------------------------------------------------
    <xsl:value-of select="wishes:wishlist/@label" 
           disable-output-escaping="yes" />
    ---------------------------------------------------------------------------

    <xsl:value-of select="Details/ProductName" 
           disable-output-escaping="yes" />

    <xsl:for-each select="./Details/Artists/Artist | 
                          ./Details/Authors/Author">
    by <xsl:value-of select="."  
       disable-output-escaping="yes"/>
    </xsl:for-each>

    Catalog:      <xsl:value-of select="Details/Catalog" 
       disable-output-escaping="yes" />
    Released:     <xsl:value-of select="Details/ReleaseDate" 
       disable-output-escaping="yes" />

    List Price:   <xsl:value-of select="Details/ListPrice"  
         disable-output-escaping="yes"/> 
    Our  Price:   <xsl:value-of select="Details/UsedPrice"  
         disable-output-escaping="yes"/> 
    Used Price:   <xsl:value-of select="Details/OurPrice"  
         disable-output-escaping="yes"/> 
            
    Availability: <xsl:value-of select="Details/Availability"  
           disable-output-escaping="yes"/>
    <xsl:text>

    </xsl:text>
    <xsl:value-of select="Details/@url"  
           disable-output-escaping="yes"/>
    <xsl:text>
    </xsl:text>

    </xsl:for-each>

Most everything in this stretch should look very similar to the HTML version we just finished.  The biggest difference is that every bit of information pulled in using `xsl:value-of` is done using the `disable-output-escaping` option.  When this is `yes`, things like ampersands are no longer escaped for valid XML output.  Since this bit of the email is plain text, we don't want to see `&amp;` in album titles, so this will cause ampersands to appear unmolested.

That's the plain text version finished.  Now let's create the HTML version:

    --theBoundaryString
    Content-Type: text/html
    Content-Transfer-Encoding: 7bit
    Content-Disposition: inline
    Content-Base: "http://www.decafbad.com/2004/05/wishes"

The boundary string appears again, signifying the end of the plain text section and the start of the HTML section.  Headers appear here which specify that what follows is HTML; that it's encoded in 7-bit characters; that it should be included in the message display itself (rather than presented as an attachment to be saved); and that all relative URLs which might appear in the HTML should be treated as having a base URL as specified.  This last part allows HTML in email to refer to images and other pages on another site without making all the URLs absolute.

We don't need to make any modifications to the HTML as we built it in the last iteration of the stylesheet, so we can just include it unchanged:

    <html xmlns="http://www.w3.org/1999/xhtml">
    ...
    </html>

    --theBoundaryString--
    
This final appearance of the boundary string is bracketed on both sides by dashes, which indicates the end of the final section of the document.  We should be ready to try this in combination with `sendmail` in a shell:

    $ xsltproc wishes-ex6.xsl wishes.xml | sendmail -it

If everything has worked correctly, there should be an email arriving in your mailbox sometime soon.  (Or in my inbox, if you followed the directions literally and didn't supply your own email address.)  The options supplied to `sendmail` are fairly basic: 

* `-i` causes lines consisting solely of `.` *not* to be treated as an end-of-input signal.
* `-t` causes `sendmail` to look in the message headers (ie. `To:`) for a list of recipients.

If you don't happen to have have `sendmail` available, you might want to look into what local mail programs you have available which can accept the output from the stylesheet.

Once you have this working, the final task is to schedule its monthly execution with your local `cron` installation.  If you haven't played with `cron` before, there are many resources and tutorials available ([here's one][cron1] and [here's another][cron2]).  You should add something like the following to your user account's `crontab`:

    0 0 * 1 *  (cd /your/working/path; xsltproc wishes.xsl wishes.xml | sendmail -it)

The "`0 0 * 1 *`" indicates to `cron` that this set of commands should be run at midnight on the first of every months.  Note also that `/your/working/path` should be replaced by the path to where you've been working during this project.  And finally, I've renamed the final iteration of the stylesheet file to simply `wishes.xsl`.

### Conclusion

So that's it--we have an XSL stylesheet which queries Amazon Web Services for products contained in multiple wishlists; selects a random item from each; prepares a shopping cart containing those items; and finally generates an email message containing both plain text and HTML presentations of the shopping cart and selected items.

Though this implementation serves the purpose I wrote about at the start of this article, there are definitely many areas where this can be improved upon or expanded:

* Many people think Amazon is an evil company for their use of patents.  I can't say that I'm entirely happy with them for this myself, but their AWS offering is just too nice to resist tinkering with.  It might be interesting to investigate other retailers' wishlist offerings, where they exist, and to see how this idea might be made to work with other (or even multiple) retailers.  Even better, come up with your own wishlist system, and a cross-retailer shopping cart.

* I chose XSLT as the implementation technology because I thought it would be more natural to deal with Amazon's XML this way.  There are, admittedly, a few awkward parts in the resulting stylesheet however.  Sometimes it's good to see a project like this through, just to get a sense for where things do go awkward with a technology or my understanding of it.  It could be interesting to transliterate this into a scripting language like Python or Perl, perhaps using the [libxml bindings][python_libxml] to do so.

* The error and failure handling in this implementation are all but non-existent.  Should anything unexpected happen while dealing with Amazon Web Services, the results aren't likely to be very pretty.  You may want to consider improving in this area.  One instance I identified was to report when the sanity limit was hit in looping through wishlist pages, versus an actual end of pages.

* If you play around with making more wishlist queries using the techniques here, you might want to consider caching the full set of data pulled in by the multiple-page calls to AWS, in order to prevent hammering Amazon's servers with repeated requests for the same data, likely unchanged.

* I still don't know why `exsl:random` doesn't work for me.  Although I thought using a web service for random numbers was intereting, it would be very nice if I didn't have to use it.

* The HTML presentation could certainly use some good CSS to make it more attractive.

Feel free to send me any suggestions, criticisms, or complaints related to this article!

[missadroit]: http://missadroit.livejournal.com "Miss Adroit, my favorite girl in the world"
[mywishlist]: http://www.amazon.com/exec/obidos/registry/1QWYI6P2JF3Q5 "Buy me something, will ya?"
[herwishlist]: http://www.amazon.com/exec/obidos/registry/35OIOYWQ9XQAE "Buy her something, will ya?"
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
[wishes.html]: http://www.decafbad.com/cvs/*checkout*/hacks/wishes/wishes.html
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
[part2]: http://www.decafbad.com/blog/2004/06/27/wishofthemonthclub2
[part1]: http://www.decafbad.com/blog/2004/06/16/wishofthemonthclub1
<!--more-->
shortname=wishofthemonthclub3
