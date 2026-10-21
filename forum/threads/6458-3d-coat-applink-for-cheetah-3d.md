# 3D Coat AppLink for Cheetah 3D

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6458/
- Subforum: script-downloads
- Started by **ron3fp** on 2010-10-31; last post 2023-01-04; 24 posts

## #1 — ron3fp — 2010-10-31
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-50095>

3D Coat AppLink for Cheetah 3D

Hi all,
 
I've been doing some scripting this weekend and came up with the implementation of a 3D Coat AppLink.
 
It has all the basic functionality like export to Paint-Room, UV Mapping, Voxel Sculping with the following limitations:
 
- (has been resolved with update v1.1) Automatic texture import is not working due to Cheetah 3D API bug (I think this is due to the new node system - once this is resolved from Martin, I will add it). This means you will have to manually assign diffuse, specular, bump maps. However, I think it is not too much of a constraint.
- (has been resolved with update v1.1) Dropping objects directly from 3D Coat to Cheetah is not implemented as of now, although the code for the creation of the necessary files / directory structure is mostly done but commented out. 3D Coat export file menu option would not appear on my system - I think I will have to further look into this later on.
- On reimport to Cheetah, only merge operation will be performed as there is no API for deleting meshes / materials from a scene.
 
Let me know if you find any bugs so that I can sort it out - at the end it was done this weekend only, so don't expect too much of testing from my end ;-)
 
You can find a demonstration video on YouTube
 
The installation is performed by dropping the script into Cheetah's scripts/tool folder and launch it as shown in the video.
You will have to specifiy the 3D Coat exchange folder location during the initial execution of the plugin.
 
Best regards,
Ron.
 
P.S. Special thanks to Hiroto for his permission to use most parts of his OBJ importer. Without his work this plugin would not be possible.

-------------------

Update v1.1

- Improved material import/export
- Automatic import of textures / materials through workaround solution using native Cheetah3D materials (.c3dmat)
- Direct export from 3D-Coat to Cheetah3D (if you don't want Cheetah3D to be automatically launched on export from 3D-Coat, just set the C3D application path to something invalid during configuration)
- Configuration walkthrough added (automatically run during initial execution of the plugin and manually through toolbar button)
- Import scale parameter added (export scale can be modified through export options within Cheetah, OBJ import is done via script and has therefore be set via this parameter option).

Demonstration videos:

Configuration
Material/Texture Import/Export
3DC Direct Export

- 3D-Coat AppLink v1.1 - Installation Notes

1. Delete the old 3DCAppLink.js file from the Cheetah3D script folder
2. Unzip 3D-Coat-AppLink.zip to directory 
/Users/YourUser/Library/Application Support/Cheetah3D/scripts/3D-Coat
3. Create and alias to 3D-Coat.js and copy it to 
/Users/YourUser/Library/Application Support/Cheetah3D/scripts/Tool
4. Launch Cheetah3D and select menu option Tools > Script > Tool Script > 3D-Coat.js
5. Follow the configuration dialog.

Best regards,
Ron.

Attachments: [3D-Coat-AppLink-v1.1.zip](https://www.cheetah3d.com/forum/index.php?attachments/13001/)

Links: http://www.youtube.com/watch?v=S5mv9mrW0Zw, http://www.youtube.com/watch?v=aHMV8MzD9K8, http://www.youtube.com/watch?v=d7dY_boeb74, http://www.youtube.com/watch?v=yjmLke-g1SY

## #2 — fused — 2010-11-01
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-50121>

Any one tried this?

## #3 — ron3fp — 2010-11-02
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-50217>

[[QUOTE:  fused said: Any one tried this? Click to expand... ]]
 Let me know in case you find any issues. You can also have a look at the same thread in the 3D Coat forum http://www.3d-coat.com/forum/index.php?showtopic=6896

Links: http://www.3d-coat.com/forum/index.php?showtopic=6896

## #4 — xeen3d — 2010-11-03
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-50328>

Hi Ron
i test your Uplink Script for the first shot it works but has some limitations like every time i reimport from 3dc. i get a new model in tree .
I hope you get Textures working and Voxel export isn't working i get a empty Scene in 3dc at this small test time i get only working to transfer a model to paint and one time back if i export again i get a new model in 3dc and reimport a new one in c3d.

If your Script is full working it will be a very helpful tool for all 3dc and c3d Users thanks a lot for your work at tis time and i hope you dont stop developing on that.

Andre

[[QUOTE:  ron3fp said: Hi all, I've been doing some scripting this weekend and came up with the implementation of a 3D Coat AppLink. It has all the basic functionality like export to Paint-Room, UV Mapping, Vo]]

## #5 — ron3fp — 2010-11-04
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-50339>

[[QUOTE:  xeen3d said: Hi Ron i test your Uplink Script for the first shot it works but has some limitations like every time i reimport from 3dc. i get a new model in tree . I hope you get Textures working and]]
 
Hi Andre, thanks a lot for your valuable input. It helps a lot. Regarding the limitations you mention:
 
- Every reimport from 3DC to C3D creates a new model: This is correct is a current limitation as Cheetah3D does not provide a API for deleting/removing objects. So only a merge operation can be performed. I already talked to Martin regarding this if it was possible to include such a API call. He is currently very busy with 3.6 so it's unsure to what extent he can cover such wishes. Once this is available I will immediately include the option to either merge or replace an object on import to C3D.
- Automatic texture import: the current API call of Cheetah3D has a bug, so it is not possible right now in C3D to automatically assign the texture via API. The same applies as to the previous point, I have highlighted this to Martin and hopefully this will get fixed/integrated in the Cheetah3D API.
- Voxel export: I will have a look at it today in the evening and probably we can talk via pm in case this issue cannot be reproduced on my system. The video that I have posted does use the export to voxel room - so I might need to get some more information from you.
 
Thanks again for your test-run of it. It provides me with some real important feedback.
 
Kind regards,
Ron.

## #6 — xeen3d — 2010-11-04
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-50379>

Hi Ron
the voxel import woks the size is so small of the imported mesh so that i must first scale it bigger i think it is a problem about the two world systems they are not in the same measurement .
At the moment aim very frustrated about 3dc i have hassle with it like memory leaks or cashes and some other things i use now the 4th beta but i have needed 5 minutes to stop my hole mac with it some things dont work or brings 3dc to crash.

Your Script works very well at this time i hope Martin will remove the Texture Bug than your script is a very good uplink to 3dc (if 3dc works)

Andre

- Voxel export: I will have a look at it today in the evening and probably we can talk via pm in case this issue cannot be reproduced on my system. The video that I have posted does use the export to voxel room - so I might need to get some more information from you.
 
Thanks again for your test-run of it. It provides me with some real important feedback.
 
Kind regards,
Ron.[/QUOTE]

## #7 — ron3fp — 2010-11-04
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-50382>

[[QUOTE:  xeen3d said: Hi Ron the voxel import woks the size is so small of the imported mesh so that i must first scale it bigger i think it is a problem about the two world systems they are not in the same m]]

Yes of course, you are right. I didn't even notice really - I was already so used to scale it up. I will adjust this and upload an update when done 

Regarding 3D Coat stability you are right with the OSX version. I also have troubles from time to time that it hangs or I experience memory leaks. I assume Andrew is working on this. I read that he would post a new version these days.

## #8 — xeen3d — 2010-11-06
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-50501>

Hi Ron 
cool, i think it was very perfect if the imported mesh has same scale as in c3d.
the back import is every time ok and has the same size than the original.

I am sure if your script is ready and Martin fixes the api Bugs it is a very useful tool to work with both programs.

greetings from rainy germany

Andre

[[QUOTE:  ron3fp said: Yes of course, you are right. I didn't even notice really - I was already so used to scale it up. I will adjust this and upload an update when done Regarding 3D Coat stability you are ri]]

## #9 — xeen3d — 2010-11-21
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-51763>

Hi Ron
did you work on that script or is your project closed ;-) can you giv us some information about new versions if some coms up.

[[QUOTE:  ron3fp said: Hi all, I've been doing some scripting this weekend and came up with the implementation of a 3D Coat AppLink. It has all the basic functionality like export to Paint-Room, UV Mapping, Vo]]

## #10 — ron3fp — 2010-11-22
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-51788>

Update is almost done. It will include a workaround for material / texture import due to the missing Cheetah API. Also texture/material export has been updated. Moreover, configuration dialogs and direct export from within 3D Coat towards Cheetah3D. Import/Export scale parameters still need to be added if necessary. So it took a little longer than expected. Busy days. Expect me to post the update within the upcoming days.

Best regards,
Ron.

## #11 — tg_jp — 2010-11-25
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-52045>

Hi, Ron

nice and promissing  .

we have to wait next Cheetah3D's update for improving some ( material system, animation keying, joint wait, etc. ), though.  

thank you for sharing.

regards.

tg_jp, Hiroto.

## #12 — ron3fp — 2010-11-27
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-52176>

3D-Coat-AppLink v1.1

3D-Coat-AppLink v1.1 has been uploaded. Please find the update in the initial post. Installation notes and brief overview has been updated in the initial post as well.

Best regards,
Ron.

## #13 — ron3fp — 2010-12-03
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-52420>

3D-Coat AppLink specification 1.2

Development on 3D-Coat AppLink specification 1.2 has been started. Updates will include the following:

 Drop mesh in 3D-Coat as a curve profile
 Skip 3D-Coat import dialog
 Skip 3D-Coat export dialog
 Options to selectively export color / specular / normalmap from 3D-Coat
 Texture files extension (TGA / BMP / PNG / JPG)
 Export resolution (low-poly / mid-poly)

Best regards,
Ron.

## #14 — Hoegbo — 2011-05-07
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-59475>

how are things working out on the v1.2 ?

Its really great that you have taken the time to make this app link !
and I hope it will continue to grow as the combination of cheetah3d and 3d-coat with your applink really is awesome.

## #15 — meshpig1 — 2014-12-31
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-92732>

Hi there, 

I'm having trouble getting this script to work on the latest C3D and v4 3D Coat on Mavericks? Not sure what is meant by "making an alias" to the script in the "tool" folder... either way as an alias it simply crashes Cheetah when selecting the script in the tool panel.

Thanks.

## #16 — DandroidMKII — 2023-01-04
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-126524>

Happy New Year everyone,  is this script still working and what are the steps for installation? 

do I need to create a folder somewhere?

tried a few times no results

what goes where?

3D-Coat AppLink v1.1 - Installation Notes

1. Unzip 3D-Coat-AppLink.zip to directory 

/Users/YourUser/Library/Application Support/Cheetah3D/scripts

2. Create and alias to 3D-Coat.js and copy it to                                         (what does this section mean) ?

/Users/YourUser/Library/Application Support/Cheetah3D/scripts/Tool

3. Launch Cheetah3D and select menu option Tools > Script > Tool Script > 3D-Coat.js

4. Follow the configuration dialog.

## #17 — frank beckmann — 2023-01-04
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-126528>

I can´t tell if it´s still working. The procedure is very precise and easy to follow - although I recaive an error message most likely because I don´t have 3D-Coat in my portfolio or it´s because of macOS security checks:

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

## #18 — DandroidMKII — 2023-01-04
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-126530>

I don’t have a 3dc.config file, is that a folder I’m to create myself?

## #19 — frank beckmann — 2023-01-04
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-126531>

My guess is the script tries to create this a folder "3D-Coat" with a "3dc.config" file inside Cheetah3d´s script folder.

## #20 — frank beckmann — 2023-01-04
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-126532>

Do you have the unzipped folder in the right place?

## #21 — DandroidMKII — 2023-01-04
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-126533>

[[QUOTE:  frank beckmann said: I can´t tell if it´s still working. The procedure is very precise and easy to follow - although I recaive an error message most likely because I don´t have 3D-Coat in my portfoli]]
This configuration address does not exist, the create and alias and 3dc.config don’t make sense atm

## #22 — DandroidMKII — 2023-01-04
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-126534>

[[QUOTE:  frank beckmann said: I can´t tell if it´s still working. The procedure is very precise and easy to follow - although I recaive an error message most likely because I don´t have 3D-Coat in my portfoli]]
This configuration address does not exist, the create and alias and 3dc.config don’t make sense atm

[[QUOTE:  frank beckmann said: Do you have the unzipped folder in the right place? Click to expand... ]]
yes I have unzipped it in the correct place and moved it around a bit, but it is in its correct destination the script folder

## #23 — DandroidMKII — 2023-01-04
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-126535>

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
			
		
		
	

	
		
	
Not entierly sure what i did but will now test these two together

## #24 — frank beckmann — 2023-01-04
<https://www.cheetah3d.com/forum/index.php?threads/6458/post-126536>

Success: The script works - though I don´t have 3d-Coat to test it thoroughly:
