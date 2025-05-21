<i>Here's the next installment of the Wish-of-the-Month Club.  You can [revisit the first part][part1], too, if you've missed it.  I'd meant to post it within a week of the first part, so apologies all around to anyone who has been tapping a foot waiting for it.  Enjoy!</i>

### Paging Through Wishes

Some ready-made files are available for this section:
* [`wishes-ex2.xsl`][wishes-ex2.xsl]: The second iteration of the stylesheet in development.

Now we've got a way to make queries against Amazon Web Services, not entirely unlike what you might be used to if you tinker with MySQL databases on a regular basis.  At this point, though, we still have a bit of refining to make to this query.  If you take a look at the data produced by the query in its current state, and compare that to what you see on wishlists in your browser, you should notice some things missing.

If you look at [my wishlist][mywishlist], you'll notice that items span several pages when visited by browser.  As it turns out, AWS queries work in a similar fashion--each query returns only a limited number of items (about 10), and an additional parameter supplied to further queries is required to step through further pages of results.  So, using what we've built so far will only get us to the first page of wishlist items; to get all of the items, we'll need a way to step through all of the pages.

In playing with this, I experienced a bit of hairpulling frustration:  The AWS documentation, under "Generating Additional Product Results", claims that XML returned by the service will supply a count of the total pages available for a given query.  And although I see this element present in other types of searches, the `TotalPages` element is absent when querying on wishlists.  This may be a bug, or it may be an undocumented change in the service--either way, it was a surprise and leaves me with no official way to know how many pages I need to ask for in order to have a complete set of data.  

With some further tinkering, though, I figured out a workaround: If a query is made for a page number beyond the final page, the XML returned will be a duplicate of the final page.  Once I see a duplicate item appear, I know it's time to stop paging through results.  This is completely undocumented behavior, and could break at any time (ie. if Amazon decided to start issuing an error for a page index out of bounds), but it'll work for now.

This calls for reworking the `processWishlist` template.  For a given wishlist, it will need to iterate through a sequence of page numbers, requesting XML from AWS for each, stopping when the first duplicate page is found.  Since XSLT is heavily steeped in functional programming concepts, this sort of [iteration in XSLT][xslt_iteration] is best done [with recursion][xslt_recursion]:

      <xsl:template name="processWishlist">

        <xsl:param name="wishlist" />              <!-- Wishlist ID -->
        <xsl:param name="max"   select="50" />     <!-- Arbitrary upper loop limit -->
        <xsl:param name="curr_page" select="1" />  <!-- Curr page # -->
        <xsl:param name="prev_first_asin" />       <!-- Keeping track of repeats -->

The first modification to this template is the addition of three parameters:

* `max` provides an arbitrary upper limit to the number of pages through which this template will iterate.
* `curr_page` contains the number of the page to be requested in this iteration.
* `prev_first_asin` will contain the ASIN number of the first item from the previous iteration's page of results.

Next, we modify the URL used to query for wishlist data:

        <!-- Fetch the wishlist products -->
        <xsl:variable name="details" select="document(concat(
                      'http://xml.amazon.com/onca/xml3?',
                      't=',$associate,'&amp;',
                      'dev-t=',$devtoken,'&amp;',
                      'WishlistSearch=',$wishlist,'&amp;',
                      'type=lite&amp;f=xml&amp;',
                      'page=',$curr_page))//Details" />

The only addition here beyond the previous version is the `page` parameter in the URL.  Not much mystery here--this parameter specifies which page of results we want.  Now, let's build the loop:
    
        <!-- Snag the first item Asin -->
        <xsl:variable name="curr_first_asin" select="$details/Asin/text()" />
    
        <!-- If we haven't exceeded the loop limit, and this first Asin isn't -->
        <!-- a repeat of the previous loop (indicating we've run out of new   -->
        <!-- pages), then go ahead...                                         -->
        <xsl:if test="(($curr_page+1) &lt; $max) and
                      (string-length($curr_first_asin) &gt; 0) and
                      not($curr_first_asin = $prev_first_asin)">
      
We capture the ASIN of the first item in this page of results and check to see if we should continue.  This `if` conditional first ensures that we're not past the sanity guard for loop iterations, makes sure that we actually got a non-empty current first ASIN, then checks our current first product's ASIN against what was passed in as the previous iteration's first product's ASIN.  If this was the first time through the loop, this value should be empty and therefore wouldn't match the current ASIN.  But, if we've gone past the end of results, the previous and current ASIN values should match, and the conditional will fail.

Moving along into the body of the conditional, we copy in wishlist products filtered on a price maximum, just as before:
      
          <!-- Copy products, filtering on a maximum price -->
          <xsl:copy-of select="$details/OurPrice[number(substring(
                       text(),2)) &lt; $maxprice]/.." />

Having done that, we move onto the recursive end of this template:
      
          <!-- Loop by recursion to get the next page -->
          <xsl:call-template name="processWishlist">
            <xsl:with-param name="wishlist"        select="$wishlist" />
            <xsl:with-param name="max"             select="$max" />
            <xsl:with-param name="curr_page"       select="$curr_page + 1" />
            <xsl:with-param name="prev_first_asin" select="$curr_first_asin" />
          </xsl:call-template>

        </xsl:if>    
      </xsl:template>

Here, the template makes a recursive call back to itself, passing through the wishlist ID and the maximum iteration count.  Since variables in XSLT are immutable, meaning that their values can't be changed once they've been set, we can't increment `$curr_page` in-place like a loop counter in other languages--so, the current page count *value* is incremented and passed to the recursive call as a parameter.  Finally, the current first item's ASIN is passed along, to become the previous ASIN for the next iteration.

Note that when the conditional fails--that is, if the loop limit is passed or a duplicate page is detected--the loop ends.  In other words, nothing further happens and execution pops back up out of all the levels of recursion and the top-level template ends.  

I wrote "*when* the conditional fails".  This is a key point: for the loop to eventually end, this conditional *must* fail (or be made to fail) at some point, else this loop will happily progress through page requests forever.  This is the reason for the `$max` parameter limiting the number of iterations, in case something goes haywire--like, oh say, a failure of our duplicate-page detection hack as a loop ending condition.  A useful exercise for the reader might be to add some additional diagnostic code to report that the limit was hit versus a natural end to results.


### Random Numbers

Some ready-made files are available for this section:
* [`wishes-ex3.xsl`][wishes-ex3.xsl]: The third iteration of the stylesheet in development.
* [`random-xml`][random-xml]: A Perl CGI script used as a web service to generate random numbers.

Armed with a template that will query against the full set of items in a wishlist, we're ready to look into making a random selection from a list of products.  

But first, we need to pick a random number.  Unfortunately, there doesn't appear to be any `random()` function in the XPath or XSLT standards.  There *is* a [`math:random()`][exsl_random] from EXSLT implemented in `libxslt`, but I seem to be having a bit of a problem getting it to produce anything other than the same sequence of numbers.  I suspect there's a problem in seeding the random number generator, but I've yet to work out how to fix it.  (Suggestions welcome.)

So, I cheated and made another workaround with a CGI script on my web server that generates random numbers in a simple XML document.  Currently, it's hosted here:

    http://www.decafbad.com/2004/05/random-xml

And this is what the script looks like:

    #!/usr/bin/perl

    use strict;
    use CGI;

    my $q = new CGI();

    my $min = $q->param('min') or 0;
    my $max = $q->param('max') or 1;
    my $int = $q->param('int');

    my $num = $min + ( rand() * ($max - $min));
    if ($int) { $num = int($num); }

    print $q->header('text/xml');
    print "<rand>$num</rand>\n";

This is a very simple CGI.  It accepts the parameters `max`, `min`, and `int`.  The values of these parameters determine the maximum and minimum value for the random number returned, and whether or not it should be an integer.  For example, the [following URL][rand_url] should return an integer between 10 and 20:

    http://www.decafbad.com/2004/05/random-xml?
    int=1&#38;min=10&#38;max=20

Using this as a web service in the stylesheet with the `document()` function, we can get a random number.  If you've got web space where you can host CGI scripts, I suggest you host a copy of this script yourself, since I can't guarantee how long mine will stick around.  But, for as long at works, feel free to use the service from my server.

Moving along, let's add a new named template to the stylesheet, called `randomWishlistProduct`:

      <xsl:template name="randomWishlistProduct">
    
        <xsl:param name="wishlist" /> <!-- Wishlist ID -->
        
        <!-- Gather all the products for the current wishlist -->
        <xsl:variable name="products">
          <xsl:call-template name="processWishlist">
            <xsl:with-param name="wishlist" select="$wishlist" />
          </xsl:call-template>
        </xsl:variable>

Just like the `processWishlist` template, we start by defining the parameter `wishlist` to accept a wishlist ID.  Using this ID, we call the `processWishlist` template itself and store the complete list of products queried from the wishlist into the variable `$products`.

        <!-- Count the products in the wishlist -->
        <xsl:variable name="max_products"
                      select="count(exsl:node-set($products)/Details)" />

This next step counts the number of products found in the wishlist.  The one tricky bit here is the use of the EXSLT function [`exsl:node-set()`][exsl_node_set]: The `$products` variable contains what's called a [*result tree fragment*][xslt_result_tree_fragment], which is a kind of cross between XML data nodes and a plain old string.  This type of data does not normally allow the full set of XPath operators to be used on it, so first we need to use `exsl:node-set()` to turn it into a full-fledged node set.  Then we can look up the `Details` element nodes and count them.  

        <!-- Conjure up a random index within the list of products -->
        <xsl:variable name="rand_product_num"
                      select="document(concat(
                      'http://www.decafbad.com/2004/05/random-xml?',
                      'int=1&amp;',
                      'min=1&amp;',
                      'max=',$max_products))/rand" />

Here is where the random number service comes in handy.  The `concat()` function is used to build the URL to the service, with parameters specifying that the number should be an integer, and should fall between 1 and the number of products in the wishlist.  The `document()` function grabs the XML document from the service, and the value is extracted from the single element the document contains.

There is an alternative to this last bit, should you happen to have a properly working `math:random()` function in your XSLT processor:

        <xsl:variable name="rand_product_num" select="round( math:random() *
                      $max_products ) + 1" />

If you can use this instead, you'll have no need for the random number web service.  This version is obviously more concise, and doesn't require another trip out to a web service.  You might want to try it--but if you find that you keep getting the same wishlist items selected, then you've run into the problem I found with the random number generator.

Now, let's wrap this template up by selecting an item:
        
        <!-- Copy the product as indexed by the random number -->
        <xsl:copy-of select="exsl:node-set($products)/Details[
                     position()=$rand_product_num]" />
           
      </xsl:template>

Again, we need to use the `exsl:node-set()` function to turn the result tree fragment in the `$products` variable into a node set, from which we select and copy the `Details` element whose position in the data is indexed by the random number we just selected.  Just one last tweak needed to wrap up this iteration of our stylesheet.  We need to swap out the call to the `processWishlist` function at the end and replace it with a call to `randomWishlistProduct`:

      <xsl:template match="/wishes:wishes">

        <xsl:for-each select="//wishes:wishlist">
          <wishes:wishitem>
            <xsl:copy-of select="." />
            <xsl:call-template name="randomWishlistProduct">
              <xsl:with-param name="wishlist" select="." />
            </xsl:call-template>
          </wishes:wishitem>
        </xsl:for-each>
    
      </xsl:template>

After these changes, you should be able to run the stylesheet ([wishes-ex3.xsl][wishes_ex3]) and get something like the following:

    <wishes:wishitem xmlns:wishes="http://www.decafbad.com/2004/05/wishes">
        <wishes:wishlist label="The Girl">35OIOYWQ9XQAE</wishes:wishlist>
        <Details ...>...</Details>
    </wishes:wishitem>
    <wishes:wishitem xmlns:wishes="http://www.decafbad.com/2004/05/wishes">
        <wishes:wishlist label="Me">1QWYI6P2JF3Q5</wishes:wishlist>
        <Details ...>...</Details>
    </wishes:wishitem>

This is similar to the output of the previous iteration of the stylesheet, but this time there's only one product selected at random for each wishlist.  

### Shopping Carts

Some ready-made files are available for this section:
* [`wishes-ex4.xsl`][wishes-ex4.xsl]: The fourth iteration of the stylesheet in development.

By this point, we've been able to query and filter products in Amazon wishlists, and we've selected an item at random from each wishlist we've queried.  Now, let's enable some purchases.

The AWS provides for Remote Shopping Cart functionality, whereby items can be added to an Amazon.com shopping cart programmatically.  This is about as close as we can get to automating the purchase of items selected from the wishlists--there is no API functionality for actually completing the ordering of items.  If you really think about it, this really is a good thing and *should* demand human intervention; we certainly wouldn't want this script going crazy and accidentally buying up everything on a wishlist.

Documentation for the AWS Remote Shopping Cart explains that a shopping cart can be created and items added with a URL like the following:

    http://xml.amazon.com/onca/xml3?
    ShoppingCart=add&#38;
    f=xml&#38;
    dev-t=[Developer Token goes here]&#38;
    t=[Associates ID goes here]&#38;
    Asin.[ASIN goes here]=[quantity goes here]&#38;
    sims=true

Part of this should look familiar, so we already know what to do with the developer token and the associates ID.  The last part, specifying product ASIN and quantity, can be filled out with information contained in the product records selected at random from the wishlists.  

So, let's start by revising the template at the end of the stylesheet:

    <xsl:template match="/wishes:wishes">

        <xsl:variable name="random_products">      
          <xsl:for-each select="//wishes:wishlist">
            <wishes:wishitem>
              <xsl:copy-of select="." />
              <xsl:call-template name="randomWishlistProduct">
                <xsl:with-param name="wishlist" select="." />
              </xsl:call-template>
            </wishes:wishitem>
          </xsl:for-each>
        </xsl:variable>

Here, we've taken what was the output of the previous iteration of the stylesheet and stuffed it into the variable `$random_products`.  Next, let's fill in the blanks and build a Remote Shopping Cart URL:

        <xsl:variable name="shopping_cart_create_url">
          <!-- Standard AWS URL -->
          <xsl:text>http://xml.amazon.com/onca/xml3?</xsl:text>

          <!-- Add in the selected items -->
          <xsl:for-each select="exsl:node-set($random_products)
                                /wishes:wishitem/Details">
            <xsl:text>Asin.</xsl:text><xsl:value-of select="Asin" />
            <xsl:text>=1&amp;</xsl:text>
          </xsl:for-each>

          <!-- Wrap up with the shopping cart function and required tokens -->
          <xsl:text>ShoppingCart=add&amp;</xsl:text>
          <xsl:text>f=xml&amp;</xsl:text>
          <xsl:text>dev-t=</xsl:text><xsl:value-of select="$devtoken" />
          <xsl:text>&amp;</xsl:text>
          <xsl:text>t=</xsl:text><xsl:value-of select="$associate" />
        </xsl:variable>
    
Since simple XPath doesn't allow for the looping needed for multiple items, we can't just concatenate this URL together in a `select` expression like we did with the wishlist item query.  So, we use `xslt:foreach` to build this with blocks of text using the `xsl:text` element.  We iterate though the random products chosen from wishlists and add an ASIN for each to the URL with a quantity of 1. Then, we use the `$devtoken` and `$associate` variables to fill in their respective spots.

Note that this could have been written without using the `xsl:text` elements like so:

        <xsl:variable name="shopping_cart_create_url">http://xml.amazon.
        com/onca/xml3?ShoppingCart=add&amp;f=xml&amp;dev-t=<xsl:value-of 
        select="$devtoken" />&amp;t=<xsl:value-of select="$associate" />
        &amp;<xsl:for-each select="exsl:node-set($random_products)/
        wishes:wishitem/Details">Asin.<xsl:value-of select="Asin" />=1
        &amp;</xsl:for-each></xsl:variable>

This removes the clutter of all the `xsl:text` elements, but it would need to be piled all on one line in order to keep undesired whitespace from getting into the URL.  I made a small attempt at wrapping this line here, but line breaks and spaces would leave us with a non-functioning shopping cart URL.  It's up to you to decide which to use--personally, I prefer the `xsl:text` clutter for the ability to add in comments and clarify things a bit.

Finally, having built the shopping cart URL, let's use it to get a shopping cart and wrap things up:

        <xsl:variable name="shopping_cart"
                      select="document($shopping_cart_create_url)" />
    
        <xsl:copy-of select="$shopping_cart" />
    
    </xsl:template>  

As an aside, this part is pushing the concept of a REST web service a bit: In the REST philosophy, requests using the GET method (which is what `document()` uses) should only return existing resources and not create new resources or cause modifications to happen.  Instead, these sorts of actions should use a POST request.  But, since we've already accepted a few rough edges and workarounds in this project so far, we won't let a point of esoterica like that stop us.  (That and, well, this is the way Amazon designed their web service, so we'll take what we can get.)

Once you run this iteration of the stylesheet ([wishes-ex4.xsl][wishes_ex4]), you should get something like this XML as output:

    <ShoppingCartResponse ...>
      ...
      <ShoppingCart>
       <CartId>...</CartId>
       <HMAC>...</HMAC>
       <PurchaseUrl>...</PurchaseUrl>
       <Items>
        <Item>...</item>
        <Item>...</item>
       </Items>
      </ShoppingCart>
      ...
    </ShoppingCartResponse>

The AWS documentation describes the vital elements here like so:

* `CartId` - The Cart ID is the unique identifier for a given shopping cart.
* `HMAC` - The HMAC is a security token that must be passed back to Amazon Web Services for using an existing cart.
* `PurchaseUrl` - Use the purchase URL to transfer the remote shopping cart from your application to Amazon so that your application's users may complete their purchases.&#160; The purchase URL merges the remote shopping cart with the Amazon.com shopping cart. 

So, in short, whenever we want to do any sort of manipulation on this Remote Shopping Cart via AWS, we'll need to remember and later supply both the `CartId` and `HMAC` found in the XML returned at its creation.  And, once we're all ready to check out, the `PurchaseUrl` points to where we'll need to browse in person.

### Stay Tuned!

This concludes Part 2 of the Wish-of-the-Month Club.  Following this will be the final part, where we tie everything together and start firing off monthly emails!

<!-- links -->

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
[part1]: http://www.decafbad.com/blog/2004/06/16/wishofthemonthclub1
<!--more-->
shortname=wishofthemonthclub2
