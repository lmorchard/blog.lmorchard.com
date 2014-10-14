---
comments_archived: true
date: '2003-06-26T13:28:18-04:00'
layout: post
title: Like I was saying about RSS...
wordpress_id: 433
wordpress_slug: so-like-i-was-saying
wordpress_url: http://www.decafbad.com/blog/?p=433
---
So yeah,
<a href="http://www.decafbad.com/blog/tech/guids_in_rss_rock.html" target="_top">like I was saying</a>,
I've kept my head out of the <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> frey lately.  This past post about GUIDs and
their properties of rocking in <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> hadn't had much thought behind it, other
than that the idea of having <strong>something</strong> well defined and uncontestably intended
for the use or uniquely identifying a weblog post seems like a good idea,
especially if it's a permalink.  Because, you know, permalinks seem great things
to serve as both globally unique identifier and locator in one go.
<br /><br />
I had a feeling that I was confused about the purpose of the link element in <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a>
2.0, but having not really studied the spec, I just kept to maintaining a student
mind and assumed that there were Things Not Yet Understood.  Now I read the spec,
curiosity sparked by the recent hubbub over at
<a href="http://diveintomark.org/archives/2003/06/26/will_the_real_rss_validator_please_stand_up.html" target="_top">Mark's place</a>
and <a href="http://philringnalda.com/blog/2003/06/say_it_loud_im_funky_and_im_proud.php#006367" target="_top">Phil's place</a>.
<br /><br />
Dave
<a href="http://scriptingnews.userland.com/2003/06/25#theLizardBrainOfRss" target="_top">wrote that</a>
the link tag in items was "designed for something else".  Cool
by me, I assume that I am not yet well informed.  So, I read in the
spec, where assumedly I'll be illuminated as to its designed purpose,
that link is "The URL of the item".  To me, this means that the link
tag was designed to point at the item, being the URL of that item.
And, as far as I can tell, "the item" is what is being described by
the item tag, in other words: the weblog entry.
<br /><br />
But this seems contrary to the statement that it's been "designed for
something else".  Designed when and documented where?
<a href="http://weblog.infoworld.com/udell/2003/06/25.html#a732" target="_top">Jon Udell</a> writes
that <a href="http://www.decafbad.com/twiki/bin/view/Main/RSS">RSS</a> is in no way broken, but I personally think it's got a funky widget
or two in it and is not free of confusion.  Bah, really I
don't care.  I still think a GUID for a weblog entry is a good idea,
and that maybe some people who comment on links exclusively should
have a tag devoted to that.  Maybe in a separate namespace devoted
to link-blogger vocabulary.
<br /><br />
Meanwhile, I'll be making occasional pokes at participating
over at Sam's wiki and <a href="http://www.intertwingly.net/wiki/pie/FrontPage" target="_top">The Echo Project</a>.
I like the wiki approach he's
offered for participation, especially the potential for zero-ego participation
when it works.  I love seeing something I contribute in a wiki eventually
float free from my attribution, to later land in the midst of a summary
elsewhere.  And in the end, if it all works right, it'll be something
that everyone had a part in, yet no one owns, and further yet didn't take a
formal committee to approve.
<!--more-->
shortname=so_like_i_was_saying

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221090508">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.majid.info/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=c4f047528ef2dfcd3cdccb82cf2a04ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.majid.info/">Fazal Majid</a>
                </div>
                <a href="#comment-221090508" class="permalink"><time datetime="2003-06-26T14:41:24">2003-06-26T14:41:24</time></a>
            </div>
            <div class="content">You can have an RSS feed that is mostly commentary about articles hosted elsewhere, actually Radio's aggregator encourages this. Imagine an Ebert & Roeper feed, where the description would contain thumbs up or down, the link would point to the movie home page, and the GUID would be a permalink to the commentary page on the E&R website.</div>
            
        </li>
    
        <li class="comment" id="comment-221090509">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://philringnalda.com"><img src="http://www.gravatar.com/avatar.php?gravatar_id=e68e9944f50a481a64b5a32fdfc02e0d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://philringnalda.com">Phil Ringnalda</a>
                </div>
                <a href="#comment-221090509" class="permalink"><time datetime="2003-06-26T23:58:41">2003-06-26T23:58:41</time></a>
            </div>
            <div class="content">I think part of the constant confusion comes from the way that nobody ever says whether they are talking to producers of feeds, or developers of aggregators. A developer of an aggregator needs to know that if they see a guid and !(isPermalink="false") then that's the permalink, and if the link !== the guid, then it's a separate outbound link. What a producer of a feed needs to know is that they have the option of using link to point to what they are talking about, not themselves, and if they also want to point to themselves they should use guid. But the talk about only using guid for permalink, and omitting link if you don't want to use it for an outside link, is just flat out crazy. If you don't want to do an outside link, then by using link for the permalink you have a feed that will work with every aggregator written since 0.90. If you use guid and omit link, you have a feed that will work with some but not all aggregators written or rewritten since last fall. That's not just crazy, it's completely the opposite approach to the "backward compatibility no matter what the cost" way that Dave has always done RSS development. I just flat out don't understand why he would say that link SHOULD NOT be used for a weblog permalink.</div>
            
        </li>
    
        <li class="comment" id="comment-221090510">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.decafbad.com/blog"><img src="http://www.gravatar.com/avatar.php?gravatar_id=2ac2cffd36ada8c734b90e02a1e5c1ac&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.decafbad.com/blog">l.m.orchard</a>
                </div>
                <a href="#comment-221090510" class="permalink"><time datetime="2003-06-27T08:15:24">2003-06-27T08:15:24</time></a>
            </div>
            <div class="content">Phil:  Yikes, that's an amazingly good point.  Not quite sure why issues of backwards compatibility hadn't occured to me, but thanks for cluing me in...  Most of the major resistance to the Echo Project going on over at Sam's call on backward compatibility and "tearing up the pavement" on the existing installed base, but they're just suggesting a new common framework for people to take or leave.  This link/guid thing is coming from what should already be established and unchanging.  Yuck.</div>
            
        </li>
    
        </ul>
    
        </div>
    