
[Snappy's](https://www.makeitsnappys.com/) was playing [The Fifth Element](https://www.imdb.com/title/tt0119116/) when I went there for lunch today. I wonder if I can get image uploads to work? Actually, probably not: I think I need to write the code to copy the images to the site build 🤔

(...time passes...)

And, [I think I managed to do it](https://github.com/lmorchard/blog.lmorchard.com/commit/0712506fa593928d8ae4a9b05871aa13b132d37f)? Added code to copy over attachments from Obsidian. Had to rework the URLs for display in post lists, too. And it looks like I fixed my image gallery component by not lazy-loading the images. Not entirely happy with that outcome, so I may bang on it some more. But it seems to be working better now overall.

But, the nice thing is that I can easily add images as attachments to a file in Obsidian. That makes it a comfy user interface for me - even from my phone - and the site generator takes care of the rest!

Next part might be to apply a little image optimization along with the copying, since these images are straight from my phone and probably too huge?

<image-gallery>
![[attachments/IMG_8514.jpeg]]
![[attachments/IMG_8513.jpeg]]
![[attachments/IMG_8512.jpeg]]
![[attachments/IMG_8515.jpeg]]
</image-gallery>