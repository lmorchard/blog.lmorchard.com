
Back in 2015, [Fastmail bought Pobox](https://www.fastmail.com/blog/fastmail-acquires-pobox-and-listbox/). I missed it at the time - or just forgot about it since. But, credit to all involved, because I haven't noticed a thing in the intervening decade!

<!--more-->

Then, last year, [Fastmail decided to sunset Pobox](https://www.fastmail.com/blog/sunsetting-pobox/). This, I noticed, barely. I was a customer of both and already had a Fastmail account at the time. As part of the acquisition, they created a second new Fastmail account for me with all my Pobox email forwarding aliases carried over. Awkward, since thereafter my real inbox lived in one account but all my aliases lived in another.

Now, about 6 months later, I finally decided to try merging that second new account into the first. I managed to move over one of my domains and all my aliases except one. Turns out the last domain and alias are my most important - me@lmorchard.com

As an aside, I'm tempted to find a different email forwarding service. The main reason I used Pobox was to keep addresses separate from inbox provider. This, as an intentional egg basket load balancing move.

The path to my inbox used to go through my DNS hosting provider, email forwarding provider, and then to several email inboxes - each of those was backed by a different company. Though I have no practical complaints, I just now realize that Fastmail and Pobox merging has reduced my egg basket count. 🤔

I've heard horror stories of folks entirely dependent on Google for domain (i.e. gmail.com), address (i.e. you@gmail.com), and inbox (i.e. GMail). In this scenario, if Google bans your account - by mistake or for some reason unrelated to email - you lose access to everything everywhere. For example, [the Terraria developer who cancelled his Stadia port over losing access to everything Google](https://arstechnica.com/gadgets/2021/02/terraria-developer-cancels-google-stadia-port-after-youtube-account-ban/). Does a password reset email make a sound if you're not allowed into the woods to hear it?

Anyway, for now, I did figure out how to clean things up without a support ticket:

1) Rename second account from me@lmorchard.com to lmorchard2@fastmail.com - which they allowed in settings

2) Delete alias me@lmorchard.com on second account

3) Delete the domain lmorchard.com from the second account

4) Add the domain lmorchard.com and alias me@ to my primary account

5) Triple check that my MX, CNAME, and TXT records for lmorchard.com were all correct

All the renaming and deleting shenanigans in that specific order turned out necessary to ensure the right things were freed up at the right points in sequence. Can't add domain to first account while another account has it. Can't remove domain while aliases are still using it. Can't remove alias while account is still named after it. All in all, a minor [fox, chicken, corn puzzle](https://www.mathsisfun.com/chicken_crossing.html).