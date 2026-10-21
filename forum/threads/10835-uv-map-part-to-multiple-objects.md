# UV Map part to Multiple Objects

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10835/
- Subforum: scripting-general
- Started by **Beloudest** on 2014-11-15; last post 2014-11-15; 8 posts

## #1 — Beloudest — 2014-11-15
<https://www.cheetah3d.com/forum/index.php?threads/10835/post-91495>

UV Map part to Multiple Objects

Hi all, I'm a total noob so bare with me if my lingo is incorrect.

Essentially I'm making good progress via the docs but have really struggled with UV mapping complex models. To get a better idea of how to do it I went and purchased a collection of 7 Spaceship Models with UV maps and Textures. It really helped to see it well done. 

What I noticed was that this UV Map that was loaded via a 3DS file had single pieces that were applying the Diffuse Image Texture to multiple places on the model. I used the UV Map to Select the correct edges to create the Seams but after adjusting the model and Selecting Unwrap UV the UV would then go ahead and create duplicates of what was previously a single piece. This then meant the UV map would not fit on the sheet? 

Is there something special going on here? Something I can do assign the duplicates to a single piece in the UV? 

It's all a bit confusing. 

Thanks.

## #2 — frank beckmann — 2014-11-15
<https://www.cheetah3d.com/forum/index.php?threads/10835/post-91496>

Hi and Welcome!
I think we´re accidentally in the script section of this forum. Nevermind. 
I´m not sure if I catch you here; what is wrong with the UV map delivered with the purchased models? Any screenshots to share?

Cheers
Frank

## #3 — Beloudest — 2014-11-15
<https://www.cheetah3d.com/forum/index.php?threads/10835/post-91497>

Opps

Yes your right, sorry my bad.

Original UV Map with model.

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
			
		
		
	

	
		
	

So this is the UV sheet after I traced the Seams via the UV Map. Many of the pieces are used multiple times when the texture is applied to the material that comes with the model. Essentially UV is half of the Model applied symmetrically. 

		
	

I wanted to be able to tweak the model just a little and get the updates displaying in the UV Map so I can redo the texture in Photoshop.

I assumed that once I tweak the model and I use Unwrap UV which uses the Seams I traced the UV would keep track of the symmetry but the parts that get used in multiple places get duplicated like so: 

		
	

Is it possible to update the model without breaking the UV map, maybe I have to define the parts int he UV which are duplicates?

Hopefully thats clearer.

## #4 — frank beckmann — 2014-11-15
<https://www.cheetah3d.com/forum/index.php?threads/10835/post-91498>

We´ll catch you wherever your question appears.  
What I don´t get is why you want to unwrap it again? The UV-map looks good to me.
You can save the delivered UV-map by right-clicking-> save UVs to PDF - if this helps.
You can have a look at the Texture by hitting Edit at the image loader BTW.

Cheers
Frank

## #5 — Beloudest — 2014-11-15
<https://www.cheetah3d.com/forum/index.php?threads/10835/post-91500>

Mmm, if I add to the craft, lets say rocket pods or some extra fins for example then UV map will no longer be valid. Am i missing something?

I thought the map has to exactly match the polygon edges on the model otherwise the texture will not lay properly. It's a great model and my plan is to take a good model to rework into something unique. It's going into a game via Unity and I don't want it to be recognisable as the top download from Turbo Squid Spacecrafts. 

I have no problem editing the Texture once I have a UV to trace over.

Can I add to the UV Map as small changes and not change the original? Only option I see is the Unwrap Tool.

Cheers :smile:

## #6 — frank beckmann — 2014-11-15
<https://www.cheetah3d.com/forum/index.php?threads/10835/post-91501>

[[QUOTE:  Beloudest said: Mmm, if I add to the craft, lets say rocket pods or some extra fins for example then UV map will no longer be valid. Am i missing something? Click to expand... ]]
Yes that´s it where it becomes more complicated than simply: model->unwrap->paint->animate.
You have to "import children" the new asset so it belongs to the main mesh. The good news is that the UV map is still intact - but you have to unwrap the new part and find an empty space onto the existing map. (Don´t try this with already rigged and animated meshes= This won´t work!)

Cheers
Frank

## #7 — Beloudest — 2014-11-15
<https://www.cheetah3d.com/forum/index.php?threads/10835/post-91502>

Thanks Frank, makes sense. I'm happy to go with that method.

How did the original modeller embed info to make sure the correct part of the UV Map was used on more than once on duplicated bits. This would be helpful as it seems UV Maps are pretty limited on space?  Can Cheetah do this?

Other this I think that covers all my questions. Much appreciated. :icon_thumbup:

## #8 — frank beckmann — 2014-11-15
<https://www.cheetah3d.com/forum/index.php?threads/10835/post-91504>

[[QUOTE:  Beloudest said: How did the original modeller embed info to make sure the correct part of the UV Map was used on more than once on duplicated bits. This would be helpful as it seems UV Maps are prett]]
Sure - you have to align the UVs coextensive.

Cheers
Frank
