# Mandelbulb.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/5865/
- Subforum: script-downloads
- Started by **tg_jp** on 2010-06-16; last post 2010-10-14; 31 posts

## #1 — tg_jp — 2010-06-16
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-43670>

Mandelbulb.js

hi,

it's polygon script to create a Mandelbulb object with Cheetah3D.

download link: http://www.tres-graficos.jp/blog/files/article.php?id=58

update 20100617: fixed julia set bug.

----

I made this script for creating indie CD jacket image. now it's available at iTunes store. if you are interested in, please check it.

iTunes Store: http://itunes.apple.com/jp/album/overexcitability/id377056525

-- samples

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
			
		
		
	

	
		
	

		
	

and you can check others at official gallery.

-- julia set samples

		
	

		
	

regards.

tg_jp, Hiroto.

Links: http://itunes.apple.com/jp/album/overexcitability/id377056525, http://www.cheetah3d.com/gallery.php, http://www.subblue.com/projects/mandelbulb, http://www.tres-graficos.jp/blog/files/article.php?id=58

## #2 — archie — 2010-06-16
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-43671>

many thanks for sharing this hiroto !
already i saw this at the gallery and wondered how it's done,
now everyone can do it !

thanks again,

- archie

Attachments: [Ohne Titel.jpg](https://www.cheetah3d.com/forum/index.php?attachments/11047/)

## #3 — tg_jp — 2010-06-17
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-43697>

wow, nice render and cool material. thank you for trying.

how much resolution of that object? 

regards.

tg_jp, Hiroto.

## #4 — archie — 2010-06-17
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-43737>

thanks hiroto,
i think it was a resolution of 1000, i made editable before saving.
my mac has only 4 gb ram so it's difficult to work with higher resolutions.
when i check the julia parameter box i get an error, line 175, *can't find variable: julia_c*
is it a bug or am i doing something wrong ?

- archie

## #5 — tg_jp — 2010-06-17
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-43747>

hi, 

[[QUOTE:  archie said: thanks hiroto, i think it was a resolution of 1000, i made editable before saving. my mac has only 4 gb ram so it's difficult to work with higher resolutions. when i check the julia para]]

that's a bug. I already fixed that, please download the latest (Mandelbulb_20100617.zip), and replace it. I added 2 pics of julia set to my first post at this thread.

resolution 1000 is quite high. poly count must be 100,000,000 over. 

some of parameters are unusable ( for example, mesh connect: on withtout BSP/ cache system is not optimized yet, and not easy to use  ) please take care to use.

regards.

tg_jp, Hiroto

## #6 — SurfingAlien — 2010-06-17
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-43748>

another mile stone script from you, Hiroto... many thanks! :icon_thumbup: 
now let's put it into the instance generator  

cheers,
Alessandro

## #7 — tg_jp — 2010-06-17
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-43749>

hi, 

[[QUOTE:  archie said: thanks hiroto, i think it was a resolution of 1000, i made editable before saving. my mac has only 4 gb ram so it's difficult to work with higher resolutions. when i check the julia para]]

that's a bug. I already fixed that, please download the latest (Mandelbulb_20100617.zip), and replace it. I added 2 pics of julia set to my first post at this thread.

resolution 1000 is quite high. poly count must be 100,000,000 over. 

some of parameters are unusable ( for example, mesh connect: on withtout BSP/ cache system is not optimized yet, and not easy to use  ) please take care to use.

regards.

tg_jp, Hiroto

## #8 — archie — 2010-06-18
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-43769>

endorphinia tsubakii

[[QUOTE:  tg_jp said: that's a bug. I already fixed that, please download the latest (Mandelbulb_20100617.zip), and replace it. I added 2 pics of julia set to my first post at this thread. resolution 1000 is q]]

thanks hiroto, really marvellous stuff !

i get ~13 million polys with resolutions between 500 and 1000.

cheers,
archie

Attachments: [endorphinia.jpg](https://www.cheetah3d.com/forum/index.php?attachments/11055/), [endorphinia2.jpg](https://www.cheetah3d.com/forum/index.php?attachments/11056/)

## #9 — alvordr — 2010-06-18
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-43780>

Wow!  Cool jellyfish!

## #10 — frank beckmann — 2010-06-19
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-43788>

[[QUOTE:  tg_jp said: hi, it's polygon script to create a Mandelbulb object with Cheetah3D. tg_jp, Hiroto. Click to expand... ]]

Looking good Hiroto.
There was something similar last year in the AoI forums at "friendlyskies". A plugin I can´t run because I´m still on Leopard and Apple wouldn´t let install a newer Java version what is needed for this.
Have a look here: http://www.friendlyskies.net/aoiforum/viewtopic.php?id=2112
And the former thread: http://www.skytopia.com/project/fractal/mandelbulb.html
And some more about the plugin: http://sourceforge.net/projects/aoi/forums/forum/47784/topic/3464031

Cheers
Frank

Links: http://sourceforge.net/projects/aoi/forums/forum/47784/topic/3464031, http://www.friendlyskies.net/aoiforum/viewtopic.php?id=2112, http://www.skytopia.com/project/fractal/mandelbulb.html

## #11 — archie — 2010-06-20
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-43881>

confusia archii

Attachments: [confusia2.jpg](https://www.cheetah3d.com/forum/index.php?attachments/11072/), [confusia1.jpg](https://www.cheetah3d.com/forum/index.php?attachments/11071/)

## #12 — Francois — 2010-06-20
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-43884>

Hi Archie,

Great and very elegant images that you have there !

## #13 — SurfingAlien — 2010-06-20
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-43885>

I *love* the first one, it would be a great background image...

## #14 — tg_jp — 2010-06-22
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-43968>

amazing :icon_thumbup: :icon_thumbup: 

tg_jp, Hiroto.

## #15 — archie — 2010-06-24
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-44084>

thanks !

following hiroto's initial link i came to learn that among the developer tools there is a mac osx built in real time gpu based raytracer called quartz composer.
now this is a neat thing with shadows and ambient occlusion and a nifty node editor that makes cheetah's look like the version for five-to-seven-year-olds.
t works real time with small resolutions on my mac and puts out quick time animations if needed.
but caution, on high resolution it may freeze your ui !

- archie

Links: http://developer.apple.com/graphicsimaging/quartz/quartzcomposer.html, http://dl.dropbox.com/u/2051070/mandelbulb.mp4, http://www.subblue.com/projects/mandelbulb

## #16 — SurfingAlien — 2010-09-22
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-47719>

Hi!
can somebody tell me how this script works, or post a simple example file please?

thank you in advance,
A

## #17 — uncle808us — 2010-09-22
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-47724>

Yes Please....

## #18 — tg_jp — 2010-09-23
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-47734>

hi

thank you for trying.

here is sample file and screen shot of ~/Application Support/Cheetah3D/script folder.

actually, this script works with only OS 10.6 Snow Leopard, if you want to use with 10.5, you have to re-compile a program with XCode ( XCode project and source files included ).

regards.

tg_jp, Hiroto

Attachments: [ch_20100923_mandelSSa.jpg](https://www.cheetah3d.com/forum/index.php?attachments/12010/), [ch_20100923_mandelSS.jpg](https://www.cheetah3d.com/forum/index.php?attachments/12011/), [mandel_sample.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/12012/)

## #19 — SurfingAlien — 2010-09-23
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-47755>

strange... I have Cheetah 5.5 and 10.6.4, I placed both files in the scripts folder but nothing appears in the 3Dview. I saw Hiroto has the _src folder too so I copied it in the same location (and renamed) but still nothing appears

## #20 — archie — 2010-09-23
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-47770>

hi alessandro,

have you tested the mandelbulb unix file in terminal (right-click *open with* > terminal.app) ?

- archie

## #21 — SurfingAlien — 2010-09-23
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-47773>

[[QUOTE:  archie said: hi alessandro, have you tested the mandelbulb unix file in terminal (right-click *open with* > terminal.app) ? - archie Click to expand... ]]

yes, it works as expected (apparently):

Attachments: [Schermata 2010-09-23 a 15.06.57.png](https://www.cheetah3d.com/forum/index.php?attachments/12025/)

## #22 — archie — 2010-09-23
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-47775>

hm idk,

when i choose tools>script>polygon object>mandelbulb.js the thing appears, only it is so big that the cam is inside.

like you i have the script, unix file and the src folder in the same place.
i did not dewnload hiroto's jas file from above though.

- archie

## #23 — SurfingAlien — 2010-09-23
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-47781>

thanks archie,

it could be the reason indeed. now I tried to move both very close and very far, and both with Hiroto's mesh and a brand new one... still nothing  

cheers,
A

## #24 — archie — 2010-09-23
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-47789>

so i have now deleted my old version from my macbook and installed the new one from the tres graficos site, this is what i get when moving the cam outwards:

it really should work on your mac (check again if it is in the polygon script subfolder, do not rename folders)

- archie

Attachments: [Screen shot 2010-09-23 at 3.42.23 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/12029/)

## #25 — tg_jp — 2010-09-23
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-47794>

hi

how about Console view after calling Mandelbulb.js form menu?
any errors?

tg_jp, Hiroto Tsubaki

Attachments: [Cheetah3D_sz_001.jpg](https://www.cheetah3d.com/forum/index.php?attachments/12031/)

## #26 — SurfingAlien — 2010-09-23
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-47802>

yes, files are in the polygon script subfolder. from the console I get no error but the process seems not complete...

Attachments: [Schermata 2010-09-23 a 18.07.14.png](https://www.cheetah3d.com/forum/index.php?attachments/12034/)

## #27 — tg_jp — 2010-09-23
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-47819>

hi

its a problem. which version of Cheetah3D do you use?
old version of Cheetah3D had endian bug, so it may cause this problem...

regards.

tg_jp, Hiroto

## #28 — tg_jp — 2010-09-24
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-47820>

Hi

I post debug version of script, so please replace 'Mandelbulb.js' to attached script ( same name ), and report what Concole view did show after calling with this.

regards.

tg_jp, Hiroto

Attachments: [Mandelbulb.js_debug.zip](https://www.cheetah3d.com/forum/index.php?attachments/12041/)

## #29 — SurfingAlien — 2010-09-24
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-47821>

Hi Hiroto,
I'm using the latest build (5.5). Here's what the console says calling the debug script...

thanks for your time :smile: 
A

Attachments: [Schermata 2010-09-24 a 07.17.33.png](https://www.cheetah3d.com/forum/index.php?attachments/12042/)

## #30 — tg_jp — 2010-09-24
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-47822>

hi

ok.

please try to edit script file line. 11

	
	


```
var tmpFile = "/tmp/mandelbulb.data"

    to

var tmpFile = "[absolute path string to your home folder]/mandelbulb.data";

// ex. for you. (don't forget adding backslash before [space].)
// var tmpFile = "/Volumes/Macintosh\ HD/studioARdesign/mandelbulb.data";
```


your home folder seems to be? at network drive. so I'm guessing, the script can't find /tmp/ directory to access cache file that contains culculation results.

regards.

tg_jp, Hiroto.

## #31 — SurfingAlien — 2010-10-14
<https://www.cheetah3d.com/forum/index.php?threads/5865/post-48807>

Hi Hiroto,
sorry I was sure I replied your post but obviously I didn't...:redface: 

My home folder is actually in the second partition of my internal HD (I still tend to use a primary partition for OS and apps and a second for data... another heritage of windows times  )

so I tried your suggestion but still the script doesn't work... don't worry though, I was just curious to try it, maybe I have some kind of conflict going on... or I will have better luck next time.

thanks for your time,
cheers
Alessandro
