# Camera Aspect Ratio Script

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10025/
- Subforum: scripting-general
- Started by **Swizl** on 2013-12-18; last post 2016-06-16; 25 posts

## #1 — Swizl — 2013-12-18
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-83664>

Camera Aspect Ratio Script

I'm trying to learn scripting and have been playing around with JavaScript in Codecademy. My problem now is moving over to doing some of it in C3d. I figured I'd give myself a project to try and start figuring it out. I've done some basic writing for the UI and some ideas on what needs to be done, but not how to go about doing it (see notes in the attached script for more detail). I'd like it first to just be a way to easily pick standard pixel dimensions so I don't have to keep looking them up. Then I'd like to expand that to increase the dimensions to match an increased dpi since C3d's default is 72. 

Two questions before going any further:
1.) Can you access the camera pixel dimensions in C3d using a script, or is that not possible with the API?

2.) Does this script have to be a Polygonobj script? I was thinking a tool script may work better as the Position / Scale / Rotation isn't really needed. I couldn't get it to even load the UI when I put it in the Tool script folder.  It's no big deal to have it there, just would look cleaner without it.

Any suggestions to get me started are most welcome!

P.S. What IDE do most of you use when writing your code? I've just been using Dashcode, but if there is something better, please suggest some.

Thanks,

Simon 

Edit:
I've now added a second modified script that works with v7 since the pixel dimensions have been removed from the camera over to the render engines. podperson and Martin both helped me a great deal in getting this back up and running. I've removed the Imperial and Metric sections from this new one. It can be added back in or the entries I've put in mine can be changed to whatever someone wants them to be.

Attachments: [Camera Aspect Ratio V1.1.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/21877/), [Camera Aspect Ratio v7.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/29171/)

## #2 — Edward — 2013-12-30
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-83976>

1.) Can you access the camera pixel dimensions in C3d using a script, or is that not possible with the API?

Objects in Cheetah3D store values in parameters. To see an object's parameters that are accessible through Javascript, select the camera and go to Tools > Script > Macro Script > Parameter Info.js. Now if you go to the console tab on the right of the window, you will see the names and types of each parameter. resolutionX [int] and resolutionY [int] appear to be what you need. So now in your 'setDpiInfo' or 'setCameraInfo' functions, you will access these parameters like this:

	
	


```
var document    = tool.document();
var camera      = document.activeCamera();
var resolutionX = camera.getParameter("resolutionX");
var resolutionY = camera.getParameter("resolutionY");
```

Look in Help > Cheetah3D Help > Scripting > Objects > Base to see the definitions for the getParameter and setParameter functions.

2.) Does this script have to be a Polygonobj script?

There are two options - a tool script that runs once and disappears when you select another tool, or a tag script that stores it's values with the file. I would start with the tool script, but it's all up to you. Look in the scripts folder if you need examples of different tool scripts. (/Users/YourHomeFolder/Library/Application Support/Cheetah3D/Scripts)

## #3 — Swizl — 2013-12-31
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-83992>

Thanks for the reply! That'll give me a great head start.

I've been meaning to work on it some more, but I've been at my parents for the holidays. No Mac around with C3d for me to use. Just on my iPad.  

I'll post back when I have something working.

Simon
  

P.S. I've already started to take the info from the help manual and reformat it to make it easier to read. I'm mainly doing it for myself, but will post what I have when it's finished. It will mostly be just what's already in the help file, but could be expanded to cover some info that isn't included. Thanks again!

## #4 — Swizl — 2014-01-06
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-84261>

Ok, I've updated my attached file in my first post. Is it helpful to paste the code in a window in the post also? I've noticed some people doing that.

Anyway, I've tried all kinds of different ways to get this to work. Our company IT guy helped me a good bit, but it's a lot more difficult since he isn't familiar with the C3d API and can't test anything as he's on Windows. I'm getting closer, but I have no idea how to pair up array values and then access them using the selector. Anybody want to look at the code and let me know what I'm doing wrong please or have any other advice? The UI still loads fine, but selecting a setting from the drop down menu doesn't do anything. 

Thanks!

Edit:
Ok, this script is now working! I will post back when I update features. Feel free to change the array to any pixel dimensions you want. You'll want to change them in the array and in the Switch statement. Enjoy.

## #5 — Edward — 2014-01-06
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-84264>

I usually attach long scripts and post short snippets in the message, but it's all personal preference.

I created an example for you to play with. I know it isn't exactly what you described but should at least give you a starting point. addParameterSelector is nice, but when you get the parameter, it returns the index of the item in the array of options so I stuck with simpler integer and float parameters.

Attachments: [Adjust Camera DPI.zip](https://www.cheetah3d.com/forum/index.php?attachments/21861/)

## #6 — Swizl — 2014-01-06
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-84267>

[[QUOTE:  Edward said: I usually attach long scripts and post short snippets in the message, but it's all personal preference. I created an example for you to play with. I know it isn't exactly what you descri]]

Thanks a lot! I'll definitely examine your code to see what's going on. The more I practice with it, the better (hopefully) I'll get. It's slowly sinking in though. I agree too, I wasn't sure how I was going to go about applying DPI settings. I was mulling different ways over in my mind, but I'm sure you'r info will get me on track.

## #7 — KurtF — 2014-01-07
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-84269>

[[QUOTE:  Edward said: I created an example for you to play with. Click to expand... ]]

Edward, I just want to thank you for the script example. It is highly COMMENTED, which is extremely helpful for us beginners in scripting.

## #8 — Swizl — 2014-01-07
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-84292>

OK, 

I decided to try something I thought would be relatively easy by adding two more sections for common Imperial Paper and Metric Paper sizes. I actually got it to work, but I can't figure out why the pull down menus all change in tandem. Pressing the "OK" button for each sends the correct dimensions. Any idea on how to keep these arrays from being linked to each other? Should I store the camera function in a variable and then call it from within each separate function (Monitor, Imperial, Metric)? Any other ideas?

As usual, thanks for any help!

Simon

Attachments: [Camera Tool Test.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/21875/)

## #9 — Edward — 2014-01-07
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-84294>

That's because you gave all three selectors the same parameter name. The parameter names should be unique, because when you ask for "Select Aspect Ratio" there are three different parameters with that name, so which should it retrieve?

I like what you've done - this is a pretty handy script. I have two styling comments regarding your code and interface. When you flush the closing scope } with the opening scope it's easier to read. For example:

	
	


```js
function doStuff () {
    ...
    switch (a) {
        ...
    [B]}[/B]
    ...
[B]}[/B]
```


Instead of this..

	
	


```js
function doStuff () {
    ...
    switch (a) {
        ...
        [B]}[/B]
    ..
    [B]}[/B]
```

Also there's an awful lot of text in your tool's separator names. Maybe you could do something like this?

	
	


```js
function buildUI(tool) {
	
	// ..Removed duplicate 'var selectorArrayMonitor' declaration..
	
	tool.addParameterSeparator("Monitor");
	tool.addParameterSelector("Monitor Size", selectorArrayMonitor, false, false);
	tool.addParameterButton("Set Active Camera", "OK", "setCameraMonitor");
	
	tool.addParameterSeparator("Imperial");
	tool.addParameterSelector("Imperial Size", selectorArrayImperial, false, false);
	tool.addParameterButton("Set Active Camera", "OK", "setCameraImperial");
	
	tool.addParameterSeparator("Metric");
	tool.addParameterSelector("Metric Size", selectorArrayMetric, false, false);
	tool.addParameterButton("Set Active Camera", "OK", "setCameraMetric");
}
```

## #10 — Swizl — 2014-01-07
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-84295>

Ah, ok that makes sense now! 

I just thought those were just text strings. I agree about the braces and the header info. The braces kept jumping around from deleting and adding things. TextWrangler tries to indent for you, but sometimes it of course doesn't guess right when you keep adding and removing them! Sorry, I was just too lazy to go back and clean them up. I did try a few different layouts for the separators and I agree they are a bit verbose. Being a graphic designer I'm so use to being able to use different weights and sizes for hierarchy. 

Thanks for the feedback. Will have to go back into the file and fix / clean it up.

Edit:
It's all fixed and reloaded into the first post.

## #11 — Swizl — 2016-06-13
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-101655>

So this script is now broken with v7. I think it's because the resolution is now split from the camera into the rendering settings. So I have no idea how to update it until the new JavaScript API comes out.

## #12 — podperson — 2016-06-13
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-101658>

[[QUOTE:  Swizl said: So this script is now broken with v7. I think it's because the resolution is now split from the camera into the rendering settings. So I have no idea how to update it until the new JavaSc]]

Because the documentation for the scripting system is perpetually incomplete, I wrote a script that will generate formatted documentation for any object you point at it. (I might write a version that lets you generate documentation for things that need to be accessed via code, such as the scene root, renderer, etc.)

http://loewald.com/c3dbook/Scripts/Object-Info/

Camera
type() === 2 | CAMERA | SPLINEFAMILY | BIGENDIAN | SEEKEND | SCALE | POLYMODE | BOOLPARAMETER | SPLINEINTERPOL | FLATINTERPOL | SECONDARYSELECTION | MODIFIEDPARAMETER | ROT_YZX

parameters

scriptName String =
locked Bool = 0
position Vec3D = { x: 2.5, y: 2.3399999141693115, z: 4.340000152587891}
rotation Vec3D = { x: 30, y: -25, z: 0}
shear Vec3D = { x: 0, y: 0, z: 0}
scale Vec3D = { x: 1, y: 1, z: 1}
pivot Vec3D = { x: 0, y: 0, z: 0}
prefrot Vec3D = { x: 0, y: 0, z: 0}
postrot Vec3D = { x: 0, y: 0, z: 0}
prerot Vec3D = { x: 0, y: 0, z: 0}
rotorder Int = 6
name String = Camera
activeCamera Bool = 1
distance Float = 5.528200149536133
projection Int = 0
fieldOfView Float = 40
zoom Float = 1
clipNear Float = 0.05000000074505806
clipFar Float = 1000
cameraPivot Vec3D = { x: 0, y: 0, z: 0}
apertureSize Float = 0.03500000014901161
apertureBlades Int = 0
apertureRotation Float = 0
focalDistance Float = 5
shutterTime Float = 0.5
displayFocalDistance Bool = 0
focusOnObject Link = undefined
antialiasingMode Int = 1
antialiasingMinSamples Int = 0
antialiasingMaxSamples Int = 2
antialiasingTolerance Float = 0.05000000074505806
shadowsOnOff Bool = 1
cameraLightOnOff Int = 2
resolutionX Int = 640
resolutionY Int = 480
backgroundColor Vec4D = { x: 0, y: 0, z: 0, w: 1}
backgroundImage Texture = none
properties

setCreatorObj function
addParameterFloat function
parameterCount function
selection function
id function
addTagOfType function
modifiedHint2Root function
addParameterSelector function
tagCount function
materialTags function
modCore function
addParameterButton function
addParameterString function
isCeatorObj function
addParameterVec3D function
removeTag function
scriptPath function
addChildAtIndex function
addParameterVec2D function
objMatrix function
removeChild function
addParameterSeparator function
addParameterInt function
addParameterLink function
document function
parameterInfo function
core function
parameterAtIndex function
family function
updateModifiedHint function
addParameterBool function
tagOfType function
setParameter function
addParameterColor function
parameterWithName function
childAtIndex function
tagAtIndex function
modifiedHint function
recordGeometryForUndo function
childCount function
update function
script function
recordParametersForUndo function
type function
getParameter function
obj2WorldMatrix function
owner function

Tags

Attachments: [C3D7 Camera Properties.pdf](https://www.cheetah3d.com/forum/index.php?attachments/29141/)

Links: http://loewald.com/c3dbook/Scripts/Object-Info/

## #13 — Swizl — 2016-06-14
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-101659>

[[QUOTE:  podperson said: Because the documentation for the scripting system is perpetually incomplete, I wrote a script that will generate formatted documentation for any object you point at it. (I might writ]]

Thanks for the info. One of the issues is that the parameters for pixel dimensions have been moved from the camera (an object) to the two separate render engines (non-objects). So for this to work again I think it will have to focus on telling either renderer what dimensions to receive instead of the camera. I think an upgraded utility to obtain info from non-objects would be really helpful.

Martin did include some info on some of the newer JavaScript commands in the v7 beta text file. But I'm not sure how to use them or what most of them mean. My scripting skills are really basic and it's been a few years since I even wrote this script.

Any thoughts? 

I'll have to poke around with it some later.

## #14 — podperson — 2016-06-14
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-101660>

I think you basically need to start by looking at the document object to find out what's there. I might be able to modify my script so that it automagically documents pretty much everything (good way to flesh out the page count of my book ;-) ).

## #15 — Martin — 2016-06-14
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-101664>

Hi,
the document object has a function  "currentRenderer()" which gives you access to the properties of the current renderer. But you can also access all renderer with the rendererAtIndex() function. Those functions are already documented.

Bye
Martin

## #16 — Swizl — 2016-06-14
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-101668>

[[QUOTE:  Martin said: Hi, the document object has a function "currentRenderer()" which gives you access to the properties of the current renderer. But you can also access all renderer with the rendererAtIndex]]

Thanks Pod and Martin for the feedback!

 

I've already made a copy of my original script and I've been playing around with getting it back up and working. I am not very good at programming though, so it will take me a lot of trial and error.

## #17 — Swizl — 2016-06-14
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-101669>

[[QUOTE:  podperson said: I think you basically need to start by looking at the document object to find out what's there. I might be able to modify my script so that it automagically documents pretty much ever]]

Hmmm, does this mean you'll be working on a new edition for v7 at some point?

## #18 — Swizl — 2016-06-14
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-101679>

Ok, I've tried this modification and it's giving me an error. (See screen shot).
Any idea what I'm doing wrong in this code? Thanks again for any tips / guidance.

	
	


```js
var selectorArrayRender = ["640 x 480", "800 x 600", "1024 x 768", "1280 x 1024", "1344 x 756", "1600 x 900", "1680 x 1050", "1920 x 1080"];
 
function buildUI(tool){
        tool.addParameterSeparator("Set Render Size");
        tool.addParameterSelector("Render Size", selectorArrayRender, false, false);
        tool.addParameterButton("Set Render Size", "OK", "setRenderSize");
    	}
	
function setRenderSize(tool) {
    var doc = tool.document();
    var resX = 1024;
    var resY = 768;
    var oResolution = tool.getParameter("Render Size");
    print(oResolution);
    switch( oResolution ) {
        case 0: // 640x480 - Default
            resX = 640;
            resY = 480;
            break;
        case 1: // 800x600
            resX = 800;
            resY = 600;
            break;
        case 2: // 1024x768
            resX = 1024;
            resY = 768;
            break;
        case 3: // 1280x1024
            resX = 1280;
            resY = 1024;
            break;
        case 4: // 1344x756
            resX = 1344;
            resY = 756;
            break;
        case 5: // 1600x900
            resX = 1600;
            resY = 900;
            break;
        case 6: // 1680x1050
            resX = 1680;
            resY = 1050;
            break;
        case 7: // 1920x1080
            resX = 1920;
            resY = 1080;
            break; 
    }
          
    var renderer = doc.currentRenderer();
    renderer.setParameter("resolutionX", resX);
    renderer.setParameter("resolutionY", resY);        
	}
```

Attachments: [Screen Shot 2016-06-14 at 2.05.17 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/29158/)

## #19 — podperson — 2016-06-15
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-101697>

[[QUOTE:  Swizl said: Ok, I've tried this modification and it's giving me an error. (See screen shot). Any idea what I'm doing wrong in this code? Thanks again for any tips / guidance. 
```js
var selectorArrayRender = ["640 x 480", "800 x 600", "1024 x 768", "1280 x 1024", "1344 x 756", "1600 x 900", "1680 x 1050", "1920 x 1080"];
 
function buildUI(tool){
        tool.addParameterSeparator("Set Render Size");
        tool.addParameterSelector("Render Size", selectorArrayRender, false, false);
        tool.addParameterButton("Set Render Size", "OK", "setRenderSize");
    	}
	
function setRenderSize(tool) {
    var doc = tool.document();
    var resX = 1024;
    var resY = 768;
    var oResolution = tool.getParameter("Render Size");
    print(oResolution);
    switch( oResolution ) {
        case 0: // 640x480 - Default
            resX = 640;
            resY = 480;
            break;
        case 1: // 800x600
            resX = 800;
            resY = 600;
            break;
        case 2: // 1024x768
            resX = 1024;
            resY = 768;
            break;
        case 3: // 1280x1024
            resX = 1280;
            resY = 1024;
            break;
        case 4: // 1344x756
            resX = 1344;
            resY = 756;
            break;
        case 5: // 1600x900
            resX = 1600;
            resY = 900;
            break;
        case 6: // 1680x1050
            resX = 1680;
            resY = 1050;
            break;
        case 7: // 1920x1080
            resX = 1920;
            resY = 1080;
            break; 
    }
          
    var renderer = doc.currentRenderer();
    renderer.setParameter("resolutionX", resX);
    renderer.setParameter("resolutionY", resY);        
	}
```
 Click to expa]]

Yes, resolutionX is a camera property.

You can scan for cameras using the approach in global iterator and either set the resolution for every camera OR identify the main camera (see activeCamera) OR build a menu of camera targets.

BTW 640x480 is so 1993. I don't know why on earth it's still the default resolution, it looks like a postage stamp on my displays. I'd start with 1280x720, 1920x1080, and so on.

Also, BTW, you can replace a whole pile of code with:

	
	


```js
selectorArrayRender[oResolution].split('x').map(function(x){ return parseInt(x,10); }); // will be an array, e.g. [1280,720]
camera.setParameter('resolutionX', resolutions[0]);
camera.setParameter('resolutionY', resolutions[1]);
```


The first magic line of code encapsulates pretty much everything that is good about Javascript ;-)

Links: http://www.cheetah3d.com/forum/showthread.php?t=7079&highlight=global+iterator

## #20 — Swizl — 2016-06-15
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-101699>

[[QUOTE:  podperson said: Yes, resolutionX is a camera property. You can scan for cameras using the approach in global iterator and either set the resolution for every camera OR identify the main camera (see a]]

Thanks for the feedback and the code shortening. I'll have a look at it later when I have time. This coding stuff isn't my forte, but I've tried off and on over the years to get into it. 

One thing that is confusing me is that I turned on the Developer Mode in preferences and then hover over the dimension settings in the renderer still gives what appears to be the same command as when it was sent to the camera. So I am a bit confused as to why it won't work the same way when the command is pointed at the renderer vs. pointed at the camera? Of course like I just mentioned, I am not a pro as this sort of thing.

I left the 640x480 resolution as an option as to set it back to what Cheetah uses as a default resolution. I also use it as a low resolution test setting for early renders as it's quicker. But usually I do bump it up to a more "modern" resolution for final render. Anyone could easily modify the script to put whatever resolutions they want in though.

Again, I appreciate the help you've given on this.

Attachments: [Screen Shot 2016-06-15 at 1.51.26 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/29164/), [Screen Shot 2016-06-15 at 1.52.01 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/29165/)

## #21 — podperson — 2016-06-16
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-101712>

The new version of my book is well under way.

By the way, here's a useful method:

	
	


```js
function searchChildren(obj, callback, found){
    found || (found = []);
    for(var i = 0; i < obj.childCount(); i++){
        var child = obj.childAtIndex(i);
        if(callback(child)){
            found.push(child);
        }
        searchChildren(child, callback, found);
    }
    return found;
}

// which lets you write a one-liner like this
var cameras = searchChildren(doc.root(), function(obj){ return obj.type() === CAMERA; });
```


This would make it easy to set all cameras. The current camera is doc.activeCamera() so that's already easy.

## #22 — Martin — 2016-06-16
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-101726>

Hi,
this code snippet shows how to set the renderer resolution in v7.

	
	


```
var renderer = doc.currentRenderer();
if(renderer != null)	renderer.setParameter("resolution",new Vec2D(resX,resY));
else	                print("camera is null");
```

## #23 — Swizl — 2016-06-16
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-101728>

Thanks pod, a lot of that code goes way over my head, but I'll see if I can decipher it. 

Thanks Martin! That works perfectly. I'll post the updated script so if anyone else wants to use it they can.

I appreciate both of you helping with this. Maybe one day I'll get better at this stuff.

## #24 — podperson — 2016-06-16
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-101732>

Ah right — the camera resolution stuff is legacy cruft now

## #25 — Swizl — 2016-06-16
<https://www.cheetah3d.com/forum/index.php?threads/10025/post-101736>

[[QUOTE:  podperson said: Ah right — the camera resolution stuff is legacy cruft now Click to expand... ]]

Yep! That was part of my confusion. I wasn't sure if it was being passed through the camera maybe to the renderer. Clearly though now it is going straight through. The renderer(s) aren't objects though, so a little difficult (at my pay grade anyway) to point at and interrogate them with a script. 

Thanks again for the help and good luck on new edition book! Looking forward to it coming out when you publish.
