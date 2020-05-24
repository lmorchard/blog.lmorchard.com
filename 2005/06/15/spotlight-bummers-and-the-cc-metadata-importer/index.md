I was just snooping through the installer package for Nathan Yergler's [CC Metadata Importer][cci] looking for some clues toward resolving my gripes noted in [Blosxom, Tiger, and Spotlight][bts].  In doing so, I just realized that the [guts of this importer are written in Python][guts].  That's really pretty nifty and I need to look into this some more.

[bts]: http://www.decafbad.com/blog/2005/06/10/blosxom_tiger_and_spotlight
[guts]: http://sourceforge.net/mailarchive/forum.php?thread_id=7432157&forum_id=4355
[cci]: http://yergler.net/projects/cc-spotlight/

However, more toward the gripes from [that previous post][bts], I'm assuming that this [CC Metadata Importer][cci] will kick out any other importer dealing with MP3 files once it's installed.  Let's see what happens...  (*runs off to install the importer*)

In fact, after I installed the importer, I noticed metadata missing from my MP3s that had been there pre-install, such as:

* kMDItemMediaTypes              = (Sound)
* kMDItemMusicalGenre            = "Rock"
* kMDItemTitle                   = "Sunday"
* kMDItemTotalBitRate            = 256
* kMDItemAudioBitRate            = 256
* kMDItemAudioChannelCount       = 2
* kMDItemAudioSampleRate         = 44100
* kMDItemAuthors                 = ("David Bowie")

I looked into `Audio.mdimporter` under `/System/Library/Spotlight` and this is what I found in `Contents/Info.plist`:

  <textarea cols="60" rows="10">
    <key>CFBundleDocumentTypes</key>
    <array>
        <dict>
            <key>CFBundleTypeRole</key>
            <string>MDImporter</string>
            <key>LSItemContentTypes</key>
            <array>
                <string>public.mp3</string>
                <string>public.aifc-audio</string>
                <string>public.aiff-audio</string>
                <string>com.digidesign.sd2-audio</string>
                <string>com.microsoft.waveform-audio</string>
                <string>public.ulaw-audio</string>
                <string>com.apple.coreaudio-format</string>
            </array>
        </dict>
    </array>
  </textarea>

  And, what do you know?  This is what I found in `Contents/Info.plist` for `Creative Commons Metadata Importer.mdimporter`:

  <textarea cols="60" rows="10">
    <key>CFBundleDocumentTypes</key>
    <array>
        <dict>
            <key>CFBundleTypeRole</key>
            <string>MDImporter</string>
            <key>LSItemContentTypes</key>
            <array>
                <string>public.mp3</string>
            </array>
        </dict>
    </array>
  </textarea>

This new importer wants to handle `public.mp3`, just like Apple's `Audio.mdimporter`.  So, from my understanding, the CC importer will replace Apple's--rather than cooperating with it, as I'd like to see.  (I wonder if there's any way to hack *chaining* into these things?)

When I run `mdls` on an MP3 I have lying around, this is what I get before installing the importer:

  <textarea cols="60" rows="10">
01 Sunday.mp3 -------------
kMDItemAlbum                   = "Heathen"
kMDItemAttributeChangeDate     = 2005-05-03 20:41:01 -0400
kMDItemAudioBitRate            = 256
kMDItemAudioChannelCount       = 2
kMDItemAudioSampleRate         = 44100
kMDItemAuthors                 = ("David Bowie")
kMDItemContentCreationDate     = 2003-01-22 12:43:35 -0500
kMDItemContentModificationDate = 2005-05-03 20:41:00 -0400
kMDItemContentType             = "public.mp3"
kMDItemContentTypeTree         = (
    "public.mp3", 
    "public.audio", 
    "public.audiovisual-content", 
    "public.data", 
    "public.item", 
    "public.content"
)
kMDItemDisplayName             = "01 Sunday.mp3"
kMDItemDurationSeconds         = 856
kMDItemFSContentChangeDate     = 2005-05-03 20:41:00 -0400
kMDItemFSCreationDate          = 2003-01-22 12:43:35 -0500
kMDItemFSCreatorCode           = 0
kMDItemFSFinderFlags           = 0
kMDItemFSInvisible             = 0
kMDItemFSLabel                 = 0
kMDItemFSName                  = "01 Sunday.mp3"
kMDItemFSNodeCount             = 0
kMDItemFSOwnerGroupID          = 501
kMDItemFSOwnerUserID           = 501
kMDItemFSSize                  = 9138342
kMDItemFSTypeCode              = 0
kMDItemID                      = 820671
kMDItemKind                    = "MP3 Audio File"
kMDItemLastUsedDate            = 2003-01-22 12:43:35 -0500
kMDItemMediaTypes              = (Sound)
kMDItemMusicalGenre            = "Rock"
kMDItemTitle                   = "Sunday"
kMDItemTotalBitRate            = 256
kMDItemUsedDates               = (2003-01-22 12:43:35 -0500)
  </textarea>

So, I installed the CC importer, let it re-index things, and this is what `mdls` gives me now:

  <textarea cols="60" rows="10">
01 Sunday.mp3 -------------
kMDItemAttributeChangeDate     = 2005-06-15 12:27:57 -0400
kMDItemContentCreationDate     = 2003-01-22 12:43:35 -0500
kMDItemContentModificationDate = 2005-05-03 20:41:00 -0400
kMDItemContentType             = "public.mp3"
kMDItemContentTypeTree         = (
    "public.mp3", 
    "public.audio", 
    "public.audiovisual-content", 
    "public.data", 
    "public.item", 
    "public.content"
)
kMDItemDisplayName             = "01 Sunday.mp3"
kMDItemFSContentChangeDate     = 2005-05-03 20:41:00 -0400
kMDItemFSCreationDate          = 2003-01-22 12:43:35 -0500
kMDItemFSCreatorCode           = 0
kMDItemFSFinderFlags           = 0
kMDItemFSInvisible             = 0
kMDItemFSLabel                 = 0
kMDItemFSName                  = "01 Sunday.mp3"
kMDItemFSNodeCount             = 0
kMDItemFSOwnerGroupID          = 501
kMDItemFSOwnerUserID           = 501
kMDItemFSSize                  = 9138342
kMDItemFSTypeCode              = 0
kMDItemID                      = 820671
kMDItemKind                    = "MP3 Audio File"
kMDItemLastUsedDate            = 2003-01-22 12:43:35 -0500
kMDItemUsedDates               = (2003-01-22 12:43:35 -0500)
  </textarea>

In case those two floods of metadata set your head spinning, the post-install metadata is lacking items from the pre-install metadata.  I need to uninstall this importer and get my other metadata back.  And, this isn't a slight against the importer--it looks like really cool work.  No, this is a bummer of Spotlight.

*Almost there...*

<div id="comments" class="comments archived-comments">
            <h3>Archived Comments</h3>
            
        <ul class="comments">
            
        <li class="comment" id="comment-221088590">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://ulaluma.com/pyx"><img src="http://www.gravatar.com/avatar.php?gravatar_id=9e03aaf8edbe4b2c0d25e30ab9a69ffb&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://ulaluma.com/pyx">Donovan Preston</a>
                </div>
                <a href="#comment-221088590" class="permalink"><time datetime="2005-06-15T12:55:56">2005-06-15T12:55:56</time></a>
            </div>
            <div class="content">At WWDC I heard some of the Apple developers complaining about this as well. It certainly is a huge shortcoming of spotlight and hopefully it will be addressed soon. Because of this, for example, it would be impossible to have an importer for * which imported the MD5 hash of every file on your system, or something like that.</div>
            
        </li>
    
        <li class="comment" id="comment-221088591">
            <div class="meta">
                <div class="author">
                    <a class="avatar image" rel="nofollow" 
                       href="http://www.fluffy.co.uk/spotmeta/"><img src="http://www.gravatar.com/avatar.php?gravatar_id=a660afb8f1f22ce1b03ad3b532aa05b5&amp;size=32&amp;default=http://mediacdn.disqus.com/1320279820/images/noavatar32.png"/></a>
                    <a class="avatar name" rel="nofollow" 
                       href="http://www.fluffy.co.uk/spotmeta/">Ben Summers</a>
                </div>
                <a href="#comment-221088591" class="permalink"><time datetime="2005-10-20T14:54:46">2005-10-20T14:54:46</time></a>
            </div>
            <div class="content"><p>My latest project, SpotMeta, solves this problem. The extension it installs also allows <a href="http://www.fluffy.co.uk/spotmeta/devimporters.html" rel="nofollow">importers to be cascaded</a>.</p></div>
            
        </li>
    
        </ul>
    
        </div>
    