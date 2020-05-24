I just made my first Kwiki formatting plugin, making [Markdown][markdown] formatting available.  I'm not sure that it's completely working, but maybe if I get over the lazy threshold, I'll package it up and ship it up to CPAN.  For what it's worth, here it is:

    package Kwiki::Markdown;
    use strict;
    use warnings;
    use Kwiki::Plugin '-Base';
    use mixin 'Kwiki::Installer';
    
    use Markdown;
    
    const class_title => 'Markdown';
    const class_id => 'markdown';
    
    sub register {
	my $registry = shift;
	$registry->add( wafl => markdown => 'Kwiki::Markdown::Wafl' );
    }
    
    package Kwiki::Markdown::Wafl;
    use base qw( Spoon::Formatter::WaflBlock );
    
    sub to_html {
       Markdown::Markdown($self->block_text);
    }
    
    package Kwiki::Markdown;
    __DATA__
    
And, not that I planned it this way, but I just realized that I'm wearing my [Daring Fireball t-shirt][tshirt] this very moment.  Heh, heh.

[markdown]: http://daringfireball.net/projects/markdown/
[tshirt]: http://daringfireball.net/members/

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221087548">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://trikuare.cx/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=7d3d1e46aae8ca19855a6026d404b91d&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://trikuare.cx/">fluffy</a>
                </div>
                <a href="#comment-221087548" class="permalink"><time datetime="2004-09-18T22:07:23">2004-09-18T22:07:23</time></a>
            </div>
            <div class="content">That certainly did seem difficult!

You're on a roll.  Now add in phpBB comment support. ;)</div>
            
        </li>
    
        <li class="comment" id="comment-221087549">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://pixelcort.com/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=501ebb4805e74dddc5c0b33b16fca819&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://pixelcort.com/">Cortland Klein</a>
                </div>
                <a href="#comment-221087549" class="permalink"><time datetime="2005-01-05T23:59:39">2005-01-05T23:59:39</time></a>
            </div>
            <div class="content">How can this be applied to Kwiki?</div>
            
        </li>
    
        </ul>
    
        </div>
    