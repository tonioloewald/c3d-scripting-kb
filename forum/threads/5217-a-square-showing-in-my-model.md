# a square showing in my model

- Thread: https://www.cheetah3d.com/forum/index.php?threads/5217/
- Subforum: scripting-general
- Started by **Filippus** on 2010-01-18; last post 2010-01-19; 10 posts

## #1 — Filippus — 2010-01-18
<https://www.cheetah3d.com/forum/index.php?threads/5217/post-37650>

a square showing in my model

hello everyone!
i need help with my model which i have created, i think it was when i tried correcting the edge thought looked to sharp, and i now discovered the strange square as you can se below.

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
			
		
		
	

	
		
	

I have tried finding the model in time machine to see if I saved it before i tried changing it but with no luck.
So I hope someone of you guys can help me to fix this strange square.
Thanks

Filippus

## #2 — frank beckmann — 2010-01-18
<https://www.cheetah3d.com/forum/index.php?threads/5217/post-37652>

Hi.
You can try to optimize your mesh - in the case the polygons are not properly connected.
Or try to increase the smooth angle.

Cheers
Frank

BTW - we are here in the "General script" section of the forum.

## #3 — Filippus — 2010-01-18
<https://www.cheetah3d.com/forum/index.php?threads/5217/post-37658>

[[QUOTE:  frank beckmann said: Hi. You can try to optimize your mesh - in the case the polygons are not properly connected. Or try to increase the smooth angle. Cheers Frank BTW - we are here in the "General s]]
thanks for your answer, but when you say try to increase the smooth angle what exactly do you mean? if I add another subdivision it looks good, but the poly count runs away. And i tried "optimize" but that didnt do anything.

## #4 — frank beckmann — 2010-01-18
<https://www.cheetah3d.com/forum/index.php?threads/5217/post-37660>

Select your model - go Properties - Smooth - smooth angle: increase.
It´s default at 45°.

Cheers
Frank

## #5 — Filippus — 2010-01-18
<https://www.cheetah3d.com/forum/index.php?threads/5217/post-37661>

[[QUOTE:  frank beckmann said: Select your model - go Properties - Smooth - smooth angle: increase. It´s default at 45°. Cheers Frank Click to expand... ]]

yay!
thank you so much worked great.
cheers to you

## #6 — frank beckmann — 2010-01-18
<https://www.cheetah3d.com/forum/index.php?threads/5217/post-37664>

Happy modelling.
BTW is this kind of Jai Alai or Pelota you showed here?

Cheers
Frank

## #7 — Filippus — 2010-01-19
<https://www.cheetah3d.com/forum/index.php?threads/5217/post-37684>

[[QUOTE:  frank beckmann said: Happy modelling. BTW is this kind of Jai Alai or Pelota you showed here? Cheers Frank Click to expand... ]]

Jai Alai , Pelota??
what is that

## #8 — frank beckmann — 2010-01-19
<https://www.cheetah3d.com/forum/index.php?threads/5217/post-37687>

Pelota and Jai Alai beside others are kind of ball games: http://www.gamblingplanet.org/images/editorials/jaialai2.jpg

Cheers
Frank

Links: http://www.gamblingplanet.org/images/editorials/jaialai2.jpg

## #9 — Filippus — 2010-01-19
<https://www.cheetah3d.com/forum/index.php?threads/5217/post-37690>

[[QUOTE:  frank beckmann said: Pelota and Jai Alai beside others are kind of ball games: http://www.gamblingplanet.org/images/editorials/jaialai2.jpg Cheers Frank Click to expand... ]]

ahh, didnt know that

		
	
it was a good guess

## #10 — frank beckmann — 2010-01-19
<https://www.cheetah3d.com/forum/index.php?threads/5217/post-37691>

[[QUOTE:  Filippus said: it was a good guess Click to expand... ]]
:redface: 
Ah, a recurve bow. Like it.

Cheers
Frank
