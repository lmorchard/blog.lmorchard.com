<div id="toc_container" class="toc_wrap_right no_bullets">
  <p class="toc_title">
    Contents
  </p>
  
  <ul class="toc_list">
    <li>
      <a href="#Start_on_the_web"><span class="toc_number toc_depth_1">1</span> Start on the web</a>
    </li>
    <li>
      <a href="#How_I_abuse_Github_Pages"><span class="toc_number toc_depth_1">2</span> How I (ab)use Github Pages</a>
    </li>
    <li>
      <a href="#How_I_abuse_Dropbox"><span class="toc_number toc_depth_1">3</span> How I (ab)use Dropbox</a>
    </li>
    <li>
      <a href="#How_I_use_Amazon_S3"><span class="toc_number toc_depth_1">4</span> How I use Amazon S3</a><ul>
        <li>
          <a href="#How_I_make_Amazon_S3_work_like_Dropbox"><span class="toc_number toc_depth_2">4.1</span> How I make Amazon S3 work like Dropbox</a>
        </li>
      </ul>
    </li>
    
    <li>
      <a href="#In_conclusion"><span class="toc_number toc_depth_1">5</span> In conclusion</a>
    </li>
  </ul>
</div>

I&#8217;ve been interested in developing [open web apps][1] (aka the [single-page app][2]) for years. But, it feels like the space is really on fire now, since the advent of <a target="_blank" title="HTML5" href="https://developer.mozilla.org/html5?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">HTML5</a> tech and the recent moves by <a target="_blank" title="Mozilla" href="https://www.mozilla.org/?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">Mozilla</a> and Google toward truly &#8220;appifying&#8221; these things to compete with offerings from iOS and Android. Lots of pieces have come into alignment, and [great things are coming together][3]—[never mind what the folks at Facebook say][4].

So, I think I&#8217;m going to build a simple app and blog about it. And, these days, the first thing I think about when starting a web app is: How do I get it onto the web?

<!--more-->

## <span id="Start_on_the_web">Start on the web</span>

Okay, so getting on the web is not the *first* thing. The *very* first thing is to create a new [github.com][5] repo (complete with `README.md` and `.gitignore`) and then:

    cd ~/Dropbox/Public/
    git clone git@github.com:lmorchard/my-project.git
    cd my-project
    

And *then*, I start thinking about getting it onto the web.

That might sound backward: If all I have is a `README`, aren&#8217;t I jumping the gun? Well, no—I like to iterate, especially when experimenting with something new. Start simple, try one little thing, repeat. And, because this is a new pan-device world we&#8217;re living in, I&#8217;m often sitting on my couch hacking with a laptop in front, tablet to the left, and phone to the right.

So, before I even write the first line of &#8220;Hello world&#8221; in <a target="_blank" title="HTML" href="https://developer.mozilla.org/docs/Web/HTML?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">HTML</a>, I want to have a way to get at it from all the gadgets. If it were just my laptop, I could open a `file://` URL and be done with it. Oh, but not really: Many of the new <a target="_blank" title="HTML5" href="https://developer.mozilla.org/html5?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">HTML5</a>-and-friends technologies depend on things like domain origins and real HTTP connections.

I could [start up a disposable HTTP server in the project directory][6] on my laptop and point the other gadgets at that. That works, to some extent. But, that&#8217;s limited to my LAN, I can&#8217;t share it with others for quick alpha testing, and I can&#8217;t check it out when I&#8217;m away from home and the laptop is closed.

That leaves me with my own web server. But, you know, that&#8217;s a pain in the butt and I&#8217;m getting tired of being sysadmin to my own server. Let&#8217;s take it to the cloud!

## <span id="How_I_abuse_Github_Pages">How I (ab)use Github Pages</span>

Since I started with GitHub, *my project is already on the web*. Or, mostly it is, but just not exactly how I&#8217;d like it. To get the project published at a URL, this is what I do:

    git co -b gh-pages
    git push origin gh-pages
    git co master
    

Give it a few, and you&#8217;ll receive an email from [Github Pages][7] (re: `[my-project] Page build successful`). Give it a few more, since this is the first time for the project. Shortly, the `README` shows up at an URL like the following:

    http://lmorchard.github.com/my-project/README.md
    

After that, whenever I want to publish updates to the app, this is what I do:

    git co gh-pages
    git rebase master
    git push origin gh-pages
    git co master
    

And, within seconds (usually), my app is updated on the web. With free hosting, because the folks at GitHub are really nice.

But, though this works nicely for an app demo or beta, try not to abuse their hospitality by using your [GitHub Pages][7] URL as the official distribution point for your app.

## <span id="How_I_abuse_Dropbox">How I (ab)use Dropbox</span>

You know, all that committing and pushing and rebasing can really get tiresome. And, it craps up my commit history while I&#8217;m just kind of twiddling some bits back and forth to see what happens. We&#8217;re living in the future, damn it, I don&#8217;t have to put up with this!

And, so, I don&#8217;t. Maybe you noticed that I ran `git clone` from inside my [Dropbox Public folder][8]. Anything in that folder *is already on the web*: Each file has a public URL, and I can acquire it with a right-click in Finder (ie. Dropbox > Copy Public Link). The result is something like this:

    https://dl.dropbox.com/u/279855/my-project/README.md
    

It&#8217;s a crufty URL, but an URL nonetheless. Dropbox public links also mirror the folder structure, so that an `index.html` can load all the <a target="_blank" title="CSS" href="https://developer.mozilla.org/docs/Web/CSS?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">CSS</a> and <a target="_blank" title="JS" href="https://developer.mozilla.org/docs/JavaScript?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">JS</a> it wants from relative URLs just like a normal web host.

With Dropbox, then, my hacking cycle with Dropbox looks like this:

1.  Save in MacVim
2.  Switch to Firefox
3.  Refresh
4.  Repeat

More often than not, my app has gotten updated on the Dropbox servers somewhere between steps #1 and #3. That&#8217;s a much tighter iteration loop than doing the GitHub dance. In fact, it&#8217;s pretty much indistinguishable from just working on my laptop with `file://` URLs or a disposable HTTP server on my LAN.

There&#8217;s some bad news, though. I&#8217;ve just read that [new accounts created after 7/31/2012 no longer get a Public folder][8]. So, it would seem that the days of carefree hosting-by-Public-folder are on the way out. But fret not: the folks at Dropbox have [provided an alternative for hosting static web apps under development][9]. They&#8217;ve also opened up their API for use by open <a target="_blank" title="web apps" href="https://developer.mozilla.org/docs/Apps?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">web apps</a> with [dropbox-js][10]. In fact, this API will play a part in the app about which I plan to blog.

## <span id="How_I_use_Amazon_S3">How I use Amazon S3</span>

So, (ab)using GitHub and Dropbox for hosting your app under development is fine and dandy. But, you definitely don&#8217;t want to rely on them for publishing your app for wider distribution. [There ain&#8217;t no such thing as a free lunch][11] (TANSTAAFL), and someone&#8217;s bound to shut you down or send you a bill—best to get that out of the way up front.

As it turns out, [Amazon Web Services][12] will happily accept [the change from your penny jar][13] to serve up small collections of web content. Well, they will after you&#8217;ve turned the physical pennies into numbers in a bank account, but my point is that Amazon S3 is *[super cheap][13]*. And, since I&#8217;m talking about a single-page web app here, [plain old static web hosting][14] is all you need for now.

In fact, if you own a domain name, you can control the URL from which S3 serves up your content. Basically, you just:

1.  create a DNS record with a CNAME to S3 (eg. `my-project.lmorchard.com` -> `s3-website-us-east-1.amazonaws.com`);
2.  [create a bucket named for your domain][15] (eg. `my-project.lmorchard.com`);
3.  [check a box in the properties panel to enable static hosting][16].

The above is vaguely more advanced than either GitHub or Dropbox, but this is playing with power. And, with great power comes great responsibility to read the fine manual. Still, it&#8217;s not that hard and it&#8217;s not that spendy.

### <span id="How_I_make_Amazon_S3_work_like_Dropbox">How I make Amazon S3 work like Dropbox</span>

So, great: You&#8217;ve got Amazon S3 serving content at a URL of your choice. And, you can upload content using the [control panel][15] or one of the many fine desktop clients available. But, that sounds a bit like the GitHub deployment dance, just GUI-er. Not bad for Official Releases of your app—but what a pain for development!

Apropos of that, I have a small trick on OS X that makes Amazon S3 as convenient as Dropbox:

*   Install [kicker][17];
*   Install [s3cmd][18] and configure it with your S3 credentials;
*   Run [this][19] from your project directory in a terminal: 
    kicker -c -e &#8216;s3cmd -vfrP &#8211;exclude=&#8221;*swp&#8221; &#8211;exclude=&#8221;.git*&#8221; sync . s3://my-project.lmorchard.com/&#8217;</li> </ul> 
    What this does is start `kicker` to monitor your files. Whenever anything changes, `s3cmd` uploads the changes to Amazon S3. After the first run, my content shows up at an URL like:
    
        http://my-project.lmorchard.com/README.md

So, again, my hacking cycle with Amazon S3 looks like this:

1.  Save changes
2.  Switch to browser
3.  Refresh
4.  Repeat

Again, this turns out to be nearly indistinguishable from working on `localhost` or with `file://` URLs, because the kicker-s3cmd team has generally already shipped off my changes before I can get to the browser. I&#8217;m sure something similar to the above can be cobbled together on Linux or Windows, but I don&#8217;t work there so I&#8217;ve not bothered to figure it out.

## <span id="In_conclusion">In conclusion</span>

Developing open <a target="_blank" title="web apps" href="https://developer.mozilla.org/docs/Apps?utm_source=wordpress%20blog&utm_medium=content%20link&utm_campaign=promote%20mdn">web apps</a> on the open web can be fun, fast, cheap, and convenient. I&#8217;ve got more posts forthcoming, at least in my head, but hopefully this one gives some starting points.

I may also revise and further develop this post, since I left quite a bit of reading to the reader with links to follow. There are also even more cheap and easy web hosts, so maybe I&#8217;ll explore those as well. In the meantime, feel free to leave some comments!

 [1]: https://developer.mozilla.org/en-US/apps
 [2]: http://en.wikipedia.org/wiki/Single-page_application
 [3]: https://wiki.mozilla.org/Kilimanjaro
 [4]: http://groovecoder.com/2012/09/12/facebook-never-bet-on-html5/
 [5]: http://github.com/lmorchard
 [6]: http://www.linuxjournal.com/content/tech-tip-really-simple-http-server-python
 [7]: http://pages.github.com/
 [8]: https://www.dropbox.com/help/16/en
 [9]: https://tech.dropbox.com/?p=345
 [10]: https://github.com/dropbox/dropbox-js
 [11]: http://en.wikipedia.org/wiki/There_ain%27t_no_such_thing_as_a_free_lunch
 [12]: http://aws.amazon.com/
 [13]: http://aws.amazon.com/s3/pricing/
 [14]: http://aws.amazon.com/about-aws/whats-new/2011/02/17/Amazon-S3-Website-Features/
 [15]: https://console.aws.amazon.com/s3/home
 [16]: http://aws.typepad.com/aws/2011/02/host-your-static-website-on-amazon-s3.html
 [17]: https://rubygems.org/gems/kicker
 [18]: http://s3tools.org/s3cmd
 [19]: https://github.com/lmorchard/notational-vapor/blob/master/s3-sync.sh
