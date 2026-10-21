# Sequential OBJ.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/2110/
- Subforum: script-downloads
- Started by **tg_jp** on 2007-09-02; last post 2020-08-04; 28 posts

## #1 — tg_jp — 2007-09-02
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-14628>

Sequential OBJ.js

hello,

here is polygon script for importing sequential OBJ files. I made for using blender's fluid files with Cheetah3D. 

movie sample: inflow movie (h.264 1.5Mb) 

download -> http://www.tres-graficos.jp/blog/files/article.php?id=30

update 2008-05-21: uv, cache creation bug fixed.

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=30, http://www.tres-graficos.jp/blog/resources/ch_20070831_ft03.mov

## #2 — fused — 2007-09-02
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-14630>

This is very useful, thanks for sharing.

Andrew

## #3 — Targos — 2007-09-03
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-14638>

Thanks Hiroto very much
AC

## #4 — tg_jp — 2008-05-21
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-21997>

hello.

I updated this script for bug fix. please update it if you try older version.

here is sample movie with this script.

http://www.youtube.com/watch?v=dEP1Ddn6YCA
http://www.youtube.com/watch?v=xa5-0imr-E0
http://www.youtube.com/watch?v=BTRy7vxKSVk

regards.

tg_jp, Hiroto.

Links: http://www.youtube.com/watch?v=BTRy7vxKSVk, http://www.youtube.com/watch?v=dEP1Ddn6YCA, http://www.youtube.com/watch?v=xa5-0imr-E0

## #5 — Martin — 2008-05-22
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-22096>

Hi Hiroto,
very nice movies.:smile: 

The Bullet physics engine has softbodies and cloth support since a few days:

http://www.bulletphysics.com/Bullet/wordpress/

I can't await until I have some time to play with that physics engine :wink:

Bye,
Martin

P.S. Here you can find a nice Bullet demo http://bullet.googlecode.com/files/AllBullet2.68Demos_Universal.zip

Links: http://bullet.googlecode.com/files/AllBullet2.68Demos_Universal.zip, http://www.bulletphysics.com/Bullet/wordpress/

## #6 — peer — 2008-05-23
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-22121>

@ Hiroto: Very nice images/movies!
@ Martin: So we'll see some new physics in Cheetah then? ;-)

Regards,

Peter

## #7 — fused — 2008-05-23
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-22129>

[[QUOTE:  tg_jp said: hello. I updated this script for bug fix. please update it if you try older version. here is sample movie with this script. http://www.youtube.com/watch?v=dEP1Ddn6YCA http://www.youtube.c]]

Wow, that's very useful to know and pretty amazing visually. Thanks for sharing.

[[QUOTE:  Martin said: I can't await until I have some time to play with that physics engine Click to expand... ]]
I would have thought a busy man like you makes the time for such things. 

Andrew

## #8 — frank beckmann — 2008-05-23
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-22135>

[[QUOTE:  peer said: @ Martin: So we'll see some new physics in Cheetah then? ;-) Click to expand... ]]
Good question.
For those who don´t get the examples to run can try these here: http://bullet.googlecode.com/files/AllBulletDemos-OSX-2.69-UniversalBinary.zip

With kindest regards
Frank

Links: http://bullet.googlecode.com/files/AllBulletDemos-OSX-2.69-UniversalBinary.zip

## #9 — mdillender — 2009-05-14
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-29386>

Hiroto (or anyone else)

Might not belong here but...

I can't seem to get the domain mesh out of blender.  I only get the original cube that I set as the domain.

I'm trying to bring a fluid into cheetah.

I've searched like crazy and I believe I'm doing it right but if you could share your method to get it out of blender (the export), I'd appreciate it.

Thanks,

Martin

## #10 — mdillender — 2009-05-14
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-29387>

okay... realized I needed to select some other options in Blender on the export.  Now, trying to setup the series of .obj for bringing into blender with script and not quite getting it.

are there steps..?  I looked in the script and didn't find any.  I basically just get a CUBE.

1.  load script
2.  SET first obj file 0001.obj
3.  choose cache..

I see just the cube

## #11 — tg_jp — 2009-05-14
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-29393>

hello, thank you for trying.

[[QUOTE:  are there steps..? I looked in the script and didn't find any. I basically just get a CUBE. Click to expand... ]]

please open that .obj file directly with Cheetah3D or Silo, and check it's exported correctly or not.

my steps are here.

in blender 
1. create some object ( cloth, fluid.. )
2. select target object and export .obj file with some options ( see attached img ). script can import only one object at once, so you don't export whole scene to .obj file. and if fluid or cloth simulated object you want to export, you should check 'Apply Modifiers'.

in cheetah3d
1. load polygon script from menu.
2. set .obj file at 'Initialize' section ( any number will be ok. ).
2a. if .obj file is big, you can make cache file for speed. ( may take a long time. )
3. set 'frame' as you want to load in scene ( 1.0 -> anyname_000001.obj file will be loaded. ) and you can animate 'frame' parameter.

regards.

tg_jp, Hiroto.

Attachments: [Blender_sz_001.jpg](https://www.cheetah3d.com/forum/index.php?attachments/6820/)

## #12 — vavido — 2009-05-14
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-29395>

This is a very good feature, but I can´t get it to work. I have exported to object-files from blender and when I import each of them at a time in Cheetah I can see that they change. So the export thing should be OK (?)

But when I import one .obj and try to ad the script, set the file and animate the frame-parameter nothing happens. I just see the static object that I have imported.

Please HELP!  I can´t wait to try this scrip!

## #13 — tg_jp — 2009-05-14
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-29396>

hello, thank you for trying to use. and sorry for inconvenient.

I fixed that problem, please download latest script file, and try again.
I checked that it work properly with that export settings I posted.

regards.

tg_jp, Hiroto.

## #14 — vavido — 2009-05-14
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-29397>

Thank TG!

It works, and its amazing!

## #15 — mdillender — 2009-05-14
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-29405>

Thanks for quick response and fix.

I will have to wait until tonight to check.

## #16 — mdillender — 2009-05-15
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-29412>

works perfectly!

Thanks.

## #17 — JasonNunley — 2013-07-13
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-80476>

Exporting Obj Sequence

Is there a script to export obj sequences from Cheetah? I am needing to export from cheetah to import into AE cs6 via Element 3d Plugin. The plugin allows for obj sequence import.

Thank you,

Jason

## #18 — crgreen — 2013-10-14
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-82310>

Little obj sequence exporter script

[[QUOTE:  JasonNunley said: Is there a script to export obj sequences from Cheetah? I am needing to export from cheetah to import into AE cs6 via Element 3d Plugin. The plugin allows for obj sequence import. T]]

[edit: cleaned it up a bit, cosmetically. sorry about the sound file thing -- commented out line that plays sound; maybe someone might like to customize this. I enjoy it.]

Here's one! I've been using that Element3D sequence feature a lot lately.

Save as Export OBJ Sequence.js in /Scripts/Tool/

	
	


```js
function buildUI( tool ) { 
    tool.addParameterSeparator('Export OBJ Sequence');   
    tool.addParameterInt("fps", 30, 1, 1200, false, false);
    tool.addParameterInt("first frame", 0, 0, 100000, false, false);
    tool.addParameterInt("last frame", 1, 0, 100000, false, false);
    tool.addParameterString("*basename", "3DFrame_", true);
    tool.addParameterSeparator('');
    tool.addParameterSeparator('Relies on *basename (not dialog)!');
    tool.addParameterSeparator('');
  //  tool.addParameterSeparator('Dialog\'s directory path is used,');
  //  tool.addParameterSeparator('dialog\'s file name is NOT!');
  //  tool.addParameterSeparator('(So you can enter anything)');
    tool.addParameterButton("          OBJ Sequence", "Export ...", "exportObjSeq");

}
function exportObjSeq( tool ) {
   doc = tool.document();
   var basenm = tool.getParameter("*basename");
   //I admit this is kludgey - the path is used, the filename totally ignored; ui's basename is used
   svReturned=OS.runSavePanel("obj");
   if (svReturned != null) {
    var f=new File(svReturned);
    var dirPath = f.directory() + "/";
    var fps = tool.getParameter("fps");
    var thisFr = tool.getParameter("first frame");
    var lastFr = tool.getParameter("last frame");
   
    for ( var i = thisFr; i <= lastFr; i++ )
     {    
       doc.setAnimPosition(1/fps*(i));
       var svfile = dirPath + basenm + i.toString() + ".obj";
       doc.saveToFile(svfile, 'obj');
       0;
     }
    try {
       //I really like having it say 'I am a banana' when it finishes (see "Rejected" by Don Hertzfeldt)
       //OS.system("afplay \"/path/to/sound.aiff\"");
    } catch (error) {
       //
    }
    OS.messageBox('', "Done saving frames " + thisFr.toString() + " to " + lastFr.toString() + ".");
   }
}
```

## #19 — pegot — 2013-11-24
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-83177>

Thank you so much cgreen for this 'Export OBJ Sequence.js" script.  Works perfectly for exporting to Element 3d.  I'm extra excited to see it even works with physics and morph animations. Did not work with particles though - any chance it can be updated to export a particle sequence?  

Again, thanks for this great script!

Also - should this script be placed into its own post?

## #20 — crgreen — 2013-11-25
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-83186>

Hi pegot, glad you like it. I've used it about six thousand times in the last  month.
In order for any particle stuff to be exported as anything, you need to convert it all to polygons first, if I'm not mistaken:
Tools/Particle/Particle->Polygon

BUT it doesn't really work, because there are too many limitations (like the inability to include animation, and the inability to correctly convert some parameters of the particle system, for example, a particle array's "Visible" parameter).
There's also a script called Particle Mesh -> Polygons, which does a better (if imperfect and clunky) job, but I'm still testing with it, and I might need to incorporate what I learn from this script into a new script to export particle system animation. But I'm a little suspicious that scripting and/or UI limitations might make this difficult or impossible. When I get more time to mess with it (I'm in the middle of a project right now), I'll take a look. 
I think ideally a script would make an entirely new set of objects to export, then export them. Or a separate script would need to be run first, then the export script. I'm sure though, that whatever I work out, it is going to be kludgey!
Thanks for bringing this to my attention.

[[QUOTE:  pegot said: Thank you so much cgreen for this 'Export OBJ Sequence.js" script. Works perfectly for exporting to Element 3d. I'm extra excited to see it even works with physics and morph animations. D]]

## #21 — Mediapod — 2014-01-13
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-84439>

Hi CG,
I'm trying to get the Export OBJ Sequence to run but it appears to do nothing.
I'm running Mavericks and Cheetah 6.2.1.
The Import Sequencial OBJs seems to work ok.
Thanks!!
Rob

## #22 — crgreen — 2014-01-14
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-84456>

Is it in the Scripts/Tool/ folder? Did you make sure to save it as plain text?

[[QUOTE:  Mediapod said: Hi CG, I'm trying to get the Export OBJ Sequence to run but it appears to do nothing. I'm running Mavericks and Cheetah 6.2.1. The Import Sequencial OBJs seems to work ok. Thanks!! Rob]]

## #23 — Mediapod — 2014-01-14
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-84457>

Thanks CG
Got it working - hacked around with the code for a while and then discovered there's a 'Tool Tab' I hadn't noticed before!
:tongue:
Thanks again - really helpful script for Element!!

## #24 — crgreen — 2014-01-14
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-84473>

Hi. Although I don't quite understand what this means:

[[QUOTE:  Mediapod said: ... and then discovered there's a 'Tool Tab' I hadn't noticed before! Click to expand... ]]

[edit: Ah, yes, that.]

[[QUOTE:  Mediapod said: Thanks again - really helpful script for Element!! Click to expand... ]]

You are very welcome; glad you are getting use out of it. I have used it a ton. Really a fun way to work.

## #25 — Simon5EP — 2014-04-04
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-86557>

I have tried to install the script, and I can access it from the "tools/scripts/Tool" menu, but when I click on the script nothing happens?

## #26 — crgreen — 2014-04-05
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-86565>

[[QUOTE:  Simon5EP said: I have tried to install the script, and I can access it from the "tools/scripts/Tool" menu, but when I click on the script nothing happens? Click to expand... ]]

It should be in your User Library/Application Support/Cheetah3D/Scripts/Tool folder. When you select it in the menu, you should see "Export OBJ Sequence" in the "Tool" pane, with the various parameters.

Attachments: [exobseq.png](https://www.cheetah3d.com/forum/index.php?attachments/22832/)

## #27 — Destiny — 2020-08-04
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-120956>

Hi.. Does anyone still have a working script to import an obj sequence into Cheetah..???

Thank you...

## #28 — Destiny — 2020-08-04
<https://www.cheetah3d.com/forum/index.php?threads/2110/post-120957>

@ tg_jp.. Amazing movie demo's.. Well done!!.. I find it absolutely amazing that 3D animation can look so real.. Its becoming extremely hard to know that is real and what is 3D in movies these days.. 

I see the Export obj script above, but I wonder if you still have Import obj script that will work in V6.3.3.. I have never added script into Cheetah but I saw the option there, that is why I thought Cheetah might be able to Import/Export obj files using script, before I started my own post to find answers.
