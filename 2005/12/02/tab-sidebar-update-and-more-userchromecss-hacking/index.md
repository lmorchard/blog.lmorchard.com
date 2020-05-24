Hmm, looks like there's been another update to my new favorite Firefox extension, [Tab Sidebar][ts].  Nice changes on balance: It seems a bit more polished now, and among other things, the thumbnails have some mini-navigation controls.  But, now there's too much crammed in there for my 12" screen.  

So, I've started hacking my `userChrome.css` again:

    #sidebar {
        min-width: 0px !important;
        max-width: none !important;
    }
    #sidebar-title { display: none !important }
    sidebarheader  { display: none}
        
    .tbs-tabpreviews .tbs-close   { display:none !important; }
    .tbs-tabpreviews .tbs-favicon { display:none !important; }
    .tbs-tabpreviews .tbs-title   { font-size: 0.825em !important; }
    
    .tbs-tabpreview:hover .tbs-canvas, 
    .tbs-tabpreview[selected="true"] .tbs-canvas {
        opacity: 1 !important;
    }
    .tbs-tabpreview[selected="false"] .tbs-canvas {
        opacity: 1 !important;
    }

Unfortunately, that last bit with the opacity doesn't work.  I want to disable the dimming of unselected tabs, so that all tab previews are 100% opaque at all times and not just when selected.  See, I don't need the current tab to be fully clear—it's what I'm looking at right now.  I need all the other tab previews to be as clear as possible.

[ts]: http://users.blueprintit.co.uk/~dave/web/firefox/tabsidebar/index.html
