# Problems with 5.7

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7305/
- Subforum: scripting-general
- Started by **Codehead** on 2011-05-24; last post 2011-08-28; 28 posts

## #1 — Codehead — 2011-05-24
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60063>

Problems with 5.7

I can't open the scripts > macros menu, and still can't access a lot of stuff through scrips, this is a great app but it's making more work for us right now because of these little things...

Please help.

Thanks.

Update:
Guys, please don't get me wrong, I like this app, it's great and easy to use but I think it could be that much greater, with this few simple things...

## #2 — Francois — 2011-05-24
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60065>

[[QUOTE:  Codehead said: I can't open the scripts > macros menu, and still can't access a lot of stuff through scrips, this is a great app but it's making more work for us right now because of these little thi]]

Hi,
Make sure your scripts are in : ~/Library/Application Support/Cheetah3D/scripts/
That's where they are supposed to be now. Please read the 5.7 change log and save time.

## #3 — Codehead — 2011-05-24
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60066>

You see, I shouldn't have to read the change log, it should work right out of the box...

## #4 — Francois — 2011-05-24
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60067>

[[QUOTE:  Codehead said: You see, I shouldn't have to read the change log, it should work right out of the box... Click to expand... ]]

Do as you want but how do you expect to know/learn the new features of a new version, why there are there and why they have been implemented that way ? And this, to your full benefit and for free !
Your pushing the limits a little too far ... !

## #5 — Codehead — 2011-05-24
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60068>

You can defend it all you want but this wasn't a new feature, it broke that part of the app basically, it should've worked right out of the box, that's all I'm saying.

I'm also asking about scripting, and why I can't access a lot of things through the scripts, you can see in my other post people saying that you could do that in the old versions but this new version lacks features that were there before?!

## #6 — Codehead — 2011-05-24
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60069>

I agree with reading the change log to learn about new features but basic functionality should work from version to version...

## #7 — Martin — 2011-05-25
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60132>

Hi,
I'm sorry for the trouble. Allowing the scripts next to the application was always a bad idea and since the MAS it isn't possible anymore. So removed that folder as a search path for the script menu. But it would have been better to let the search path for loading scripts for backward compatibility. That's true.

With 5.8 I will probably automatically install the sample scripts in the Application support scripts folder.

Bye
Martin

## #8 — Codehead — 2011-05-27
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60194>

Thanks for the reply.

When I get the vertex normals using: core.normal(i, j) they are different than the ones Cheetah 3D exports when it exports to .h files, their X is flipped but also the number are different, the question is, are the normals that I get using core.normal(i, j) messed up?

If not then why are they different?

Please help.

## #9 — Martin — 2011-05-31
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60297>

Hi,
the normals normally should be the same. But be aware that they might have been transformed. In the .h file the normals are in global coordinate system while the core.normal(i, j) returns them in the local coordinate system of the object.

Bye
Martin

## #10 — Codehead — 2011-06-08
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60515>

Here is another thing, when I import a 3DS mesh and export it, the UV coordinates are messed up, they are not correct and some are negative but Cheetah3D renders the object correctly.

To fix this, I have to first import to Blender and then export from Blender then import to Cheetah3D.

When I import back, Cheetah3D again renders the object correctly with the texture properly applied, what's going on here?

Please let me know and thanks...

## #11 — Martin — 2011-06-08
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60520>

UV coords in 3DS files have to be flipped. Or to be more precise the V-coord has to be flipped. In Cheetah3D this is currently simply done by inverting the V-Coord. But 1-V is probably the better solution so in 5.8 the V-Coords will be saved as 1-V.

Bye
Martin

## #12 — Codehead — 2011-06-08
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60527>

They are negative so when I do 1-V I get stuff like 1.9 etc.

How come Cheetah3D displays these correctly, no matter if they are from a 3DS file or from Blender? What kind of calculations does it do internally that is not exposed through the scripts?

## #13 — frank beckmann — 2011-06-08
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60528>

[[QUOTE:  Codehead said: They are negative so when I do 1-V I get stuff like 1.9 etc. How come Cheetah3D displays these correctly, no matter if they are from a 3DS file or from Blender? What kind of calculatio]]

I guess "tiling U+V" is the goal.

Cheers
Frank

## #14 — Codehead — 2011-06-08
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60529>

That's fine but how to calculate the numbers between 0 and 1, I want to make a texture atlas...

## #15 — Martin — 2011-06-09
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60549>

If the V coordinate in the 3DS file is negative when you import it just add a 1. That's all.

In 5.8 a V coord in [0,1] will be also in [0,1] after flipping due to the 1-V flipping.

In the meantime you can add the 1 manually.

Bye
Martin

## #16 — Codehead — 2011-06-12
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60609>

Martin,

Thanks for taking the time to answer all my questions and here is another one:

I add a cylinder and then make it editable, then select the top faces (top cap) and delete them, then select all the faces and flip normals, then I select all of them and triangulate, now in my script, I get all the vertices using something like:

	
	


```
for (i = 0; i < core.vertexCount(); i++) {
            var vertex = core.vertex(i);
            /* Added it to some array */
}
```


Then I go through the faces like this:

	
	


```
for (i = 0; i < core.polygonCount(); i++) {
            var polysize = core.polygonSize(i);
            
            for(j = 0; j < polysize; j++) {
               var vertex_index = core.vertexIndex(i, j);
/* ... */
```


When I do this, there are 2 vertices that are not exposed here for some reason when you loop through them using the second loop, I create my cylinder with 16 edges and vertex #19 and #59 are not here but they are added to the array above.

I have to use the second loop to get the normals and texture coords like so:

	
	


```
uv_coord_array[vertex_index]  = core.uvCoord(i, j);
normal_array[vertex_index]    = core.normal(i, j);
```


What am I doing wrong here?

Please let me know.

Thanks again....

## #17 — Codehead — 2011-06-12
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60610>

Cheetah3D's object exporter doesn't have a problem, but when I go through the vertices later and try to get their normal and uv coords, the ones for #19 and #59 are not there...

## #18 — Martin — 2011-06-14
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60652>

Hi,
if you delete the cap faces there is one unconnected vertex left. Please call the optimize tool to remove this unused vertices since unconnected vertices also don't have normals.:wink: 

Bye
Martin

## #19 — Codehead — 2011-06-14
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60653>

Cool, the sad thing is that I exported to Blender and import it back and it was fine, as you can tell I'm a beginner.

I have to tell you, I was mad at your app and tried Blender for one day and thought Blender must be better but very soon I ran into the most annoying issues and realized Cheetah3D didn't have them...

I have one more questions, can you bake the Boolean transform?

## #20 — Martin — 2011-06-18
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-60862>

I don't know what you mean with a "bake the Boolean transform". But maybe you just want to make the Boolean object editable. This can be done like every object by double clicking the boolean object in the object browser or using the "Make editable" menu command.

Bye
Martin

## #21 — healewis — 2011-07-02
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-61242>

[[QUOTE:  Francois said: Hi, Make sure your scripts are in : ~/Library/Application Support/Cheetah3D/scripts/ That's where they are supposed to be now. Please read the 5.7 change log and save time. Click to ex]]

I'm lost at this point!   I access my / Library/Application Support/and there's no Cheetah file there??
Am I missing something?  And where's the 5.7 change log??

Sorry to be a pain but my limitations are restricted

## #22 — frank beckmann — 2011-07-02
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-61243>

[[QUOTE:  healewis said: And where's the 5.7 change log?? Click to expand... ]]
Where it used to be: http://www.cheetah3d.com/news.php

Cheers
Frank

Links: http://www.cheetah3d.com/news.php

## #23 — healewis — 2011-07-11
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-61478>

Ooops!

[[QUOTE:  frank beckmann said: Where it used to be: http://www.cheetah3d.com/news.php Cheers Frank Click to expand... ]]

Thanks Frank, I was looking in the library in the Macintosh HD not the users directory
:redface: :redface: all sorted now thanks

Paul

## #24 — Ephesian — 2011-08-28
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-63137>

Missing scripts when bought Via Appstore

Hello

Please excuse the question, but I can't find the scripts, Ive looked in the Library/App support/cheetah3d/scripts, and althought the folders are there, there are no scripts.  When downloaded from app store where does it put them ( I understand I will have to move them)

Thanks in advance

## #25 — frank beckmann — 2011-08-28
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-63139>

Hi and welcome.
Are you saying there´re no scripts with the download after installation in the Cheetah3d.dmg/folder? Excuse me - but I don´t have my version from the MAS.
Otherwise you can grab the example files from here: http://www.cheetah3d.com/download.php

Cheers
Frank

Links: http://www.cheetah3d.com/download.php

## #26 — Ephesian — 2011-08-28
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-63140>

re:Missing scripts when bought Via Appstore

Hi Frank

Dont think MAS works in the same way as a download, in that you dont get a dmg file from the app store. I have Lion and it is installed automatically straight into the app folder,.  I think app store uses a tmp folder to download and then install.

Graham

## #27 — frank beckmann — 2011-08-28
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-63142>

Ok Graham. 
Then grab the examples from the link mentioned above and move them to their locations.

Have fun.

Cheers
Frank

## #28 — Ephesian — 2011-08-28
<https://www.cheetah3d.com/forum/index.php?threads/7305/post-63143>

Thanks for help

Thanks muchly

Graham
