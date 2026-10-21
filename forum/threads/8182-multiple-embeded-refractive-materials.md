# Multiple Embeded Refractive Materials?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8182/
- Subforum: scripting-general
- Started by **Conyard** on 2012-02-28; last post 2026-07-17; 11 posts

## #1 — Conyard — 2012-02-28
<https://www.cheetah3d.com/forum/index.php?threads/8182/post-68084>

Multiple Embeded Refractive Materials?

I was attempting to model a Galileo Thermometer and noticed if I created the multiple materials to simulate the glass and liquid, cheetah is not able to render properly. 
For example I modeled the glass for the thermometer body, then I modeled the liquid inside, then I modeled a glass ball inside the liquid, then I modeled a red liquid inside of the glass ball... I assigned the glass and liquid materials to each of the embedded objects. This gives four levels of imbedded refractive materials. If I render the scene, cheetah only seems to handle a depth of two refractive materials and then just renders the rest out as black... Is this a common limitation of the rendering engine that cheetah uses or am I missing something? 
BTW I tried rendering with lights, hrdi, and emissive materials to no avail.

			{
				"lightbox_close": "Close",
				"lightbox_next": "Next",
				"lightbox_previous": "Previous",
				"lightbox_error": "The requested content cannot be loaded. Please try again later.",
				"lightbox_start_slideshow": "Start slideshow",
				"lightbox_stop_slideshow": "Stop slideshow",
				"lightbox_full_screen": "Full screen",
				"lightbox_thumbnails": "Thumbnails",
				"lightbox_download": "Download",
				"lightbox_share": "Share",
				"lightbox_zoom": "Zoom",
				"lightbox_new_window": "New window",
				"lightbox_toggle_sidebar": "Toggle sidebar"
			}

Attachments: [thermo.png](https://www.cheetah3d.com/forum/index.php?attachments/16699/)

## #2 — Conyard — 2012-02-29
<https://www.cheetah3d.com/forum/index.php?threads/8182/post-68085>

Oh... sorry... I just noticed I accidentally posted in the scripts area! :frown:
Not sure how to move this to another forum... duh!

## #3 — podperson — 2012-02-29
<https://www.cheetah3d.com/forum/index.php?threads/8182/post-68088>

Check render preferences and increase max transparency and reflection depth, then find a good book to read while it renders

## #4 — Conyard — 2012-02-29
<https://www.cheetah3d.com/forum/index.php?threads/8182/post-68089>

[[QUOTE:  podperson said: Check render preferences and increase max transparency and reflection depth, then find a good book to read while it renders Click to expand... ]]
LOL!

Will do. Thanks for the insight...:smile:

## #5 — Conyard — 2012-02-29
<https://www.cheetah3d.com/forum/index.php?threads/8182/post-68090>

[[QUOTE:  podperson said: Check render preferences and increase max transparency and reflection depth, then find a good book to read while it renders Click to expand... ]]

Thanks... Worked like a charm!

Attachments: [thanks!.png](https://www.cheetah3d.com/forum/index.php?attachments/16700/)

## #6 — podperson — 2012-02-29
<https://www.cheetah3d.com/forum/index.php?threads/8182/post-68097>

Beautiful render too. Glad I could help.

## #7 — kenludd — 2026-07-16
<https://www.cheetah3d.com/forum/index.php?threads/8182/post-129837>

greetings - trying to pull of something similar.. I can see this is an older post. Im not seeing where these Render preferences are? Can you point me in the right direction?  Thanks

## #8 — frank beckmann — 2026-07-17
<https://www.cheetah3d.com/forum/index.php?threads/8182/post-129838>

You can find these setting in the render engine´s tab: Falcon/Cheetah

## #9 — kenludd — 2026-07-17
<https://www.cheetah3d.com/forum/index.php?threads/8182/post-129839>

hmm- ok... is this best Rendered with Falcon? It will be for an animation so im hoping to keep my render times low.
Normally use Cheetah Render and have those checked on all the time. Increase "Max ray depth"?
Maybe this isnt my issue? Im trying to render glass balls, some in front of the others. the balls are not allowing the render to see through to the other glass balls behind.

## #10 — frank beckmann — 2026-07-17
<https://www.cheetah3d.com/forum/index.php?threads/8182/post-129840>

For the Cheetah renderer make sure to increase Max. ray depth based on the amount of glass surfaces - which will increase render time as well unfortunately - but unavoidable:

## #11 — kenludd — 2026-07-17
<https://www.cheetah3d.com/forum/index.php?threads/8182/post-129841>

Nice - thanks for your help as always Frank.
