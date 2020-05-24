Popping in for a quick note.  Something that has annoyed me for awhile is that Cmd-Click is what my X11 on OS X has been using by default to simulate a right-click.  What I just found out is that I can do this:

    defaults write com.apple.x11 fake_button2 option
    defaults write com.apple.x11 fake_button3 control

Running `man Xquartz` in a terminal does wonders.
