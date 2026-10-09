# Recovering Signal Decay, three songs at a time

Around 2002, I listened to a Live365 station called Signal Decay. Synthpop, futurepop, EBM, and assorted electronic music: Monolithic, Cosmicity, Neuroactive, Icon of Coil, Stromkern, and others. <!-- CHECK: Cosmicity and Stromkern aren't among the 143 recovered tracks. Keep them if this is your own memory of the station; cut them if the drafting model supplied them. --> I remembered the station, but I didn't have a playlist or a recording.

Now I have [a playable Signal Decay mixtape](https://mixtapes.lmorchard.com/00-conceptual/signal-decay/): 137 tracks, reconstructed from scattered evidence in the Wayback Machine. Getting there involved an old LiveJournal post, a lot of archived HTML, repeatedly asking whether a few more songs might be hiding in the next capture, and a surprising amount of arguing with search engines about which "Iris" I meant.

## Finding the station

The useful starting point was [a LiveJournal post I wrote on December 16, 2002](https://deus-x.livejournal.com/193051.html). Under the title "Rock the bytes," I linked three internet radio stations I'd been enjoying. One was Signal Decay, at:

`http://www.live365.com/stations/zeke_25`

That account name was considerably more useful than the station's name. Searching for "Signal Decay" mostly turned up unrelated things. An exact old URL gave the Wayback Machine something specific to work with.

I enlisted Codex to help investigate. The first attempts ran into trouble accessing Wayback, LiveJournal, and Reddit. But I could open [a December 2002 capture](https://web.archive.org/web/20021204074309/http://www.live365.com/stations/zeke_25) in my browser. A tool failing to retrieve a page didn't mean the page was gone.

Once we inspected the rendered archive in a browser, there was plenty to read.

The station credited **zeke_25 in Seattle**, listed a creation date of February 9, 2001, and linked to `signaldecay.com`. The broadcaster described wanting to carry the spirit of New Wave and post-punk forward, mixing newer work by older favorites with bands like Mesh, VNV Nation, De/Vision, and Apoptygma Berzerk.

That sounded like the station I remembered. More usefully, the page had a little section labeled "This Station Plays Tracks Like." Five songs. Actual titles and artists. And those five changed between captures.

## Three songs at a time

So we started walking through the snapshots. One page supplied an Icon of Coil track; another supplied Monolithic's "Maxim." Neuroactive's "As If We Didn't Know" and "Play" appeared later. Alongside the names I remembered were plenty I hadn't thought about in years.

The first sampler reached 42 distinct tracks. I figured that might be all we could reasonably recover. Then another pass brought it to 90. Checking the later station pages pushed it further.

The next useful discovery was inside the station's own website. It embedded two small Live365 playlist frames, one for regular listeners and one for premium listeners, each showing the last few tracks played.

Those frames had their own archive histories. That turned out to be both an opportunity and a bookkeeping problem. A station page captured in December 2002 could render a playlist frame captured in October 2002, or one from 2003. Wayback was assembling the page from separately preserved pieces, so the date in the address bar didn't necessarily apply to everything on screen.

We kept the source date for each fragment rather than treating the whole rendered page as a single moment. We also kept two kinds of evidence separate: the station's sample selections established that a song belonged in its repertoire, while the playlist frames preserved short sequences of displayed tracks. Neither gave us a complete broadcast log.

The regular and premium feeds weren't identical, either. Following both recovered songs such as Seabound's "Confusion," Red Flag's "Talk About the Future," Neuropa's "Skin Deep," and Faith Assembly's "Phantoms." A third "Now Playing" endpoint contributed Cause & Effect's "Another Minute."

By the end, we had **143 distinct track entries, supported by 228 appearances across 57 source groups**.

There was some cleanup involved. Titles were truncated. Artist names had inconsistent spelling. "Wake Me Up" and "Wake Me Up!" needed to count as the same song. We kept the original labels in the source records, so that a tidied-up playlist wouldn't erase what the archive actually said.

We also reached the limits of what those pages could tell us. Some captures held advertisements instead of three songs. Others said "Playlist not available." The newer mini-player URL had no capture listed. Eventually, the identified feeds stopped yielding new tracks.

## What we still don't know

I still don't know the broadcaster's real name. The surviving profile identifies them as zeke_25 and describes a collector with a substantial appetite for synthpop, New Wave, and Front Line Assembly side projects. That's more context than I started with, but it isn't an identification.

The end date is uncertain, too. An [April 2009 station capture](https://web.archive.org/web/20090428070726/http://www.live365.com/stations/zeke_25) still shows the station as updated in February 2009. Later captures give us unavailable playlists, confusing redirects, and eventually a 404. The original Live365 [shut down in January 2016](https://live365.com/blog/live365-is-officially-back/), but we didn't find evidence that Signal Decay kept broadcasting until then.

There's also [a Reddit comment claiming hours of recorded Signal Decay streams](https://www.reddit.com/r/synthpop/comments/1kdbd1w/comment/mqb0pa7/). That remains a lead. We didn't recover any audio recordings or contact anyone.

## From a list of names to something you can play

What we did recover was enough to listen again, but a list of names isn't a mixtape. I took it into my [mixtapes project](https://mixtapes.lmorchard.com/) and worked through it with Claude Code. That tooling matches each track against Spotify for album art and metadata, and against YouTube, since that's what the site actually plays.

Automated matching turns out to be very confident and occasionally hilarious. Iris's "Twilight" matched a 2024 song by IRyS, a VTuber. Espionage's "Perfect Day" resolved to a Bloomberg documentary about a Chinese spy. Glis's "Break Away" turned up as a My Little Pony clip, Monolithic's "Maxim" as a blockchain conference panel, and Wave In Head's "Where I Belong" as Joey Bada$$. Every one of those passed the automated checks, because every field was filled in.

What caught them was the station itself. Those archived pages didn't just list titles. They listed the album each track came from. Comparing every match against the album zeke_25 named back in 2002 flagged the strangers immediately. It also caught subtler misses: a Diary of Dreams track matched to a 2012 re-recording instead of the original, a Merge song matched to a remix, and the reverse case, where the station had actually been playing Conjure One's Ian Van Dahl remix of "Sleep" and the matcher reached for the album version. One artist name needed a correction the other way: the station credited "Shining Star" to Silke Bischoff, but by the time that album came out, the band had renamed itself 18 Summers.

Six of the 143 tracks I couldn't find anywhere playable. That includes all three by Espionage, whose album *Into the Ground* I couldn't find on Spotify or YouTube at all. Those didn't make the playlist, which is how 143 recovered tracks became 137 playable ones.

Then came the part that's actually fun: sequencing. The archive gives no broadcast order, so the order is mine. It opens with Covenant's "Call the Ships to Port" and drifts through Delerium, Claire Voyant, and Conjure One, settles into synthpop, builds through futurepop into an EBM peak, bridges through some trance-adjacent tracks like Blank & Jones's "A Forest" with Robert Smith, and comes down through darkwave to finish on Marian Gold. It's a reconstruction of part of the station's repertoire, with all the gaps that implies, sequenced for the way I'd want to hear it now.

I like how modest the surviving pieces were. A link in a blog post. Five example songs on a station page. A tiny frame showing a few recently played tracks. None of those was meant to preserve a radio station.

Together, they left enough of a trail to put some of the music back on.
