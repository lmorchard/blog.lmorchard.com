So [Kimbro Staken][kimbro] posted this nifty idea to build [XPath based Python dictionaries][xpathdict] to access XML data as a part of his incredibly nifty [Syncato][syncato] microcontent management system.  Eventually, I've really got to break down and get that thing built and running on my server and my laptop-- it really seems like I'm reinventing so many wheels by not basing [`dbagg3`][dbagg3] on it.

But, while I'm in the process of wheel reinvention, how about I borrow Kimbro's idea?  I just threw together [a quick class called XPathDict][myxdict], based on [libxml2][libxml2].  It works a little something like this:

    feed_xd = XPathDict(file="sample-atom.xml")
    for entry_node in feed_xd.nodes("//atom:entry"):
        entry = XPathDict(doc=entry_node.doc, node=entry_node)
        print "Title: " % entry['atom:title']
        if 'atom:author' in entry:
            print "Author: " % entry['atom:author/atom:name']

    xml = """
       <dbagg3:user xmlns="http://purl.org/atom/ns#" 
                xmlns:dbagg3="http://decafbad.com/2004/07/dbagg3/">
            <name>deusx</name>
            <email>deus_x@pobox.com</email>
            <url>http://www.decafbad.com/</url>
            <dbagg3:prefs>
                <dbagg3:pref name="foo">bar</dbagg3:pref>
            </dbagg3:prefs>
       </dbagg3:author>
    """

    map = (
        ('userName',  'a:name'),
        ('userEmail', 'a:email'),
        ('fooPref',   "dbagg3:prefs/dbagg3:pref[@name='foo']")
    )

    xd = XPathDict(xml=xml)
    xd.cd("/dbagg3:user")
    print xd.extract(map)

    #    {'userName'  : 'deusx', 
    #     'userEmail' : 'deus_x@pobox.com', 
    #     'fooPref'   : 'bar'}

There isn't any spectacular code behind all this, and the idea *was* Kimbro's, but it's working.  It's also incredibly convenient, especially with the little XML-to-dict extraction map method I whipped up.  This would take a bit more work to pry it out of its current context, such as turning the hardcoded namespaces into an option, among other things.  But, [here's the code][myxdict] for you to peruse.

(I got hooked early on subverting in-built language constructs from perl's `tie` facilities, and C++'s operator overloading.  Now I'm loving Python's [special class methods][methods].  Someday, maybe, I'll actually get down to doing some work in LISP and wrap my head around some *real* language subversion.)

Anyway, while this is neither quite [Native XML Scripting][nativexml] nor XML as [a native language construct][nativeconstruct], it's getting there.

[methods]: http://diveintopython.org/object_oriented_framework/special_class_methods2.html
[nativeconstruct]: http://www.xmldatabases.org/WK/blog/663?t=item
[nativexml]: http://dev2dev.bea.com/products/wlworkshop/articles/JSchneider_XML.jsp
[libxml2]: http://www.xmlsoft.org/
[myxdict]: http://www.decafbad.com/cvs/*checkout*/dbagg3/lib/dbagg3/xmlutils.py
[dbagg3]: http://www.decafbad.com/cvs/dbagg3/
[syncato]: http://www.syncato.org/
[kimbro]: http://www.xmldatabases.org/WK/blog
[xpathdict]: http://www.xmldatabases.org/WK/blog/1964_XPath_based_Python_Dictionaries.item

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090556">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://naeblis.cx"><img src="http://www.gravatar.com/avatar.php?gravatar_id=abfc88b96ae18c85ba7aac3bded2ec5e&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://naeblis.cx">Ryan Tomayko</a>
                </div>
                <a href="#comment-221090556" class="permalink"><time datetime="2004-09-01T17:29:27">2004-09-01T17:29:27</time></a>
            </div>
            <div class="content">Funny that. I also have one that has survived a couple of failed apps. I have a hard time dropping it to be honest and just keep lugging it around to each new project. 

http://naeblis.cx/cvs/percolator/xb/lib/xpdm.py?rev=HEAD&content-type=text/vnd.viewcvs-markup

It has some pretty big issues. Among other things, creating nodes with namespace support is a little.. ermmm.. not there. But it does a lot of things well like garbage collecting xmlDoc instances (freeDoc), copying nodesets between documents, encoding things when they need to be, etc.
 
Anyway, I wonder if maybe we all might benefit by teaming up on this and try to define what a complete xpathish wrapper atop libxml2 should look like. And really, why limit it to libxml2? I'm of the opinion that the value here is an interface that embraces xpath. The fact that it's running on top of the blazingly fast libxml2 is nice but coding against the XMLTRAMP like interface is the value for me.

So let me see if I can get some time together to whip up a quick comparison of the three implementations. I'll shoot that over to you and Kimbro and we can go from there. If these seem to work best as backyard APIs we like to keep close to us, we'll drop it. However, I think there's a good chance that we can all benefit by combining our efforts.</div>
            
        </li>
    
        </ul>
    
        </div>
    