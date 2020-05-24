Listening to this <a href="http://blogs.msdn.com/alexbarn/archive/2006/02/12/530652.aspx">podcast about OPML and Reading Lists</a> and enjoying the various perspectives on RSS, OPML, and Semantic Web tech.  It's also the first time I've heard Danny Ayers' voice, so that was pretty cool after having been a textual blog acquaintance for a few years now.  As for the rest of the guys on the call, I'm not quite as familiar with all of them yet, but I'll be adding them to my Reading Lists shortly.

Apropos of this podcast, I've lately gotten a bit of a fresh take on the RSS/OPML versus XHTML versus Semantic Web tech merry-go-round.  Here's the basic gist:  Invest time into tools that solve problems first and formats that enable possibilities second, if you want to get any attention and subsequent help.

And then I say "tools", I don't mean a GraphViz construct that makes really cool charts for people willing to chase down and install the dependencies.  No, I mean something like the OPML Editor.  The OPML Editor comes in a single package, and you launch it from a single icon.  The OPML Editor is <a href="http://davenet.scripting.com/1995/09/03/wemakeshittysoftware">a shitty piece of software</a> that's nonetheless helping me achieve some practical goals that I've heretofore been vaguely stymied in reaching.  The OPML Editor is making me think more favorably about OPML, <i>despite</i> OPML being <a href="http://davenet.scripting.com/1995/09/03/wemakeshittysoftware">a shitty format</a>.

The utility of the OPML Editor is giving me the motivation to build filters and workarounds to transmute OPML into XOXO and RDF formats, but only when the need arises.  I could also see putting an OPML-to-triples bridge in front of a semweb crawler or tool.  And, there's no reason why outlines in the OPML Editor couldn't be rendered in XOXO and RDF formats by the tool itself, if there's something useful around to consume it.

On the other hand, I've done enough with RDF and <a href="http://www.decafbad.com/blog/2005/07/12/xoxo_outliner_experiment">XOXO</a> to see the clear potential in both.  With enough RDF data around, you can turn the whole wide web into a single massively networked database ripe for the querying thanks to a uniform data model and clear specs for representation of that model.  With XOXO and microformats, you get a <a href="http://www.sudoku.com/">Sudoku-esque</a> solution to providing both human and machine readable data in the same format and file, while sterring close to the inherent design principles of the web.

The problem with these formats, though, is that they open potential avenues but don't provide value until there's some foot traffic on the avenues.  This is just establishing a world in which there can exist both chickens and eggs, but not doing much with respect to concrete instantiations of poultry.
Now, to be fair, there have been efforts to make practical usage of RDF (see: <a href="http://musicbrainz.org/">MusicBrainz</a>) and these are early days for microformats.  But, I think a lot more effort needs to be given toward making useful, personally rewarding tools - and less effort given toward expressing awe toward the potentials given by formats and models.  You can have both, but you've got to pick one to start with.

And, the reason you need to make tools first that use formats second is attention.  (That's been a buzzword lately, hasn't it?)  You need attention if you want adoption and help.  And, you can get attention - and subsequent help - by scratching someone's itch.

Now, some people's itches are scratched by the fun of abstract symbol manipulation and the perception of elegance.  Others' itches are scratched by getting work done, like writing or organizing thoughts or expanding awareness of more information sources.  Personally, I've got itches of both of these varieties.  The problem is that there are many fewer people with itches in that first category.  And, no offense to anyone, that seems to be the bulk of the RDF and XOXO fanbase at the moment.  For the second category, even if things are shitty, smoke a bit and catch on fire - as long as some work gets done at the end of the day, there's a lot of tolerance to go around and a lot of motivation to pitch in to improve the situation.

At the end of the day, I firmly believe that ATOM, RDF, and XHTML-based microformats trounce OPML, RSS, and the like in terms of clear definition, affordance in manipulation, and technical elegance.  But, OPML and RSS are still winning in the world because the tools using these formats are scratching some damn annoying itches.  And, though towers built atop shitty tools and formats seem Jenga-shaky, somehow they never quite come crashing down.  Maybe they will come crashing down someday, but we seem to be getting work done in the meantime.

So, to wrap up:  My take on this whole mess is that your format will gain adoption to the degree that the tools producing it help people get work done.  I can't find tools today for RDF and XOXO that are as rewardingly useful as the OPML Editor has become.  When that happens, the story may change.


<!-- tags: metablogging rdf semweb webdev opml rss syndication microformats xoxo podcasting -->

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221086877">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://vielmetti.typepad.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e377f3e2140297d32460ae9a4b38ff98&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://vielmetti.typepad.com">Edward Vielmetti</a>
                </div>
                <a href="#comment-221086877" class="permalink"><time datetime="2006-02-14T02:32:49">2006-02-14T02:32:49</time></a>
            </div>
            <div class="content"><p>There's a lot to be said for rough consensus and running code, and there's a lot more running code that speaks OPML than there is that speaks XOXO or RDF.  You can just plain sit down and get work done and not have to entangle yourself in a microstandards battle.  There's a certain appeal to that.</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086879">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.synaesmedia.net"><img src="http://www.gravatar.com/avatar.php?gravatar_id=248a3c4ba8f2972427222d46954f9c1c&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.synaesmedia.net">phil jones</a>
                </div>
                <a href="#comment-221086879" class="permalink"><time datetime="2006-02-14T03:03:10">2006-02-14T03:03:10</time></a>
            </div>
            <div class="content"><p>Same as it ever was :</p>

<p>http://www.laputan.org/gabriel/worse-is-better.html </p>

<p>(scroll down to section 2.1)</p></div>
            
        </li>
    
        <li class="comment" id="comment-221086880">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philwilson.org/blog/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=abb5e982d97d7539860141b7904ba31a&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philwilson.org/blog/">Phil Wilson</a>
                </div>
                <a href="#comment-221086880" class="permalink"><time datetime="2006-02-21T20:39:35">2006-02-21T20:39:35</time></a>
            </div>
            <div class="content"><p>I know they're very different things, but is there any <em>particular</em> part of the OPML Editor that doesn't exist, say, in something like NVU, or a stripped-down TinyMCE?</p></div>
            
        </li>
    
        </ul>
    
        </div>
    