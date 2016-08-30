---
comments_archived: true
date: '2005-03-17T06:45:24-05:00'
layout: post
title: Roleplaying Editors and Dreams
wordpress_id: 613
wordpress_slug: roleplaying-editors-and-dreams
wordpress_url: http://www.decafbad.com/blog/?p=613
---
* [VIM][vim] is really feeling like an RPG to me.  Today I just gained a level, maybe two, thanks to [SuperTab][super] and [Tip #173][t173].  Who knows, maybe I'll even be giving up the cursor keys soon and [my original HHKB, sans-inverted-T][hhkb], will make more sense.

[hhkb]:http://store.yahoo.com/pfuca-store/haphaccrad.html
[vim]:http://vim.sourceforge.net/
[super]:http://www.vim.org/scripts/script.php?script_id=182
[t173]:http://www.vim.org/tips/tip.php?tip_id=173

* Speaking of RPGs: Last night, I had a hyper-realistic dream that some college roommates, who'd started a [LARP][larp] of their own design back in the mid-90s, had gotten back together to start a new authorized LARP based on World of Warcraft.

  It was $1400 per month to play--which seemed reasonable at the time--and took place 24/7 on the grounds of the [Michigan Renaissance Festival][mrf] in Holly.  Strangely, this was within walking distance of our old townhouse in Royal Oak.  I jumped into the game to play some kind of "wind mage", dressed up like a 3-foot-tall leprechaun.  (Yes, somehow my costume reduced my height by 3 feet or so.)

  There's no real point to this, other than I felt I needed to share its utter depths of nerdity.  Oh, and although I've watched someone play WoW, I don't actually have a machine capable of running it--so I don't even know if it features leprechaun wind mages.
  
[mrf]:http://www.michrenfest.com/
[larp]:http://en.wikipedia.org/wiki/LARP

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221083867">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://fatcaterpillar.org/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=b43edc5c93b4a2f069d2eb1b44239af4&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://fatcaterpillar.org/">Stewart Johnson</a>
                </div>
                <a href="#comment-221083867" class="permalink"><time datetime="2005-03-18T03:04:19">2005-03-18T03:04:19</time></a>
            </div>
            <div class="content">Two very helpful vim things that really accelerated my vim learning (I never did figure out how to do these in emacs):

(1) Substitute:

substitute on the current line:

:s/search for this/replace with this/

substitute on all lines:

:%s/search for this/replace with this/

find all matches on each line, not just the first one:

:%s/search for this/replace with this/g

prompt to confirm each replace:

:%s/search/replace/gc

case insensitive 

:%s/search/replace/gi

:help substitute for more

(2) Execute commands on matching lines

:normal command means to execute commands as if you typed them in, eg: 'dd' or 'yyp', etc. With standard {range} operators, you can use :normal to execute a command on every matching line:

delete every line that contains the word "foo"

:/foo/normal dd

I find :normal _really_ useful.</div>
            
        </li>
    
        </ul>
    
        </div>
    