# Drawing a circular spline in JS

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12214/
- Subforum: scripting-general
- Started by **feloneouscat** on 2017-01-06; last post 2017-01-09; 6 posts

## #1 — feloneouscat — 2017-01-06
<https://www.cheetah3d.com/forum/index.php?threads/12214/post-104999>

Drawing a circular spline in JS

Does someone have a simple script to help me?

I’m getting nowhere.

## #2 — frank beckmann — 2017-01-06
<https://www.cheetah3d.com/forum/index.php?threads/12214/post-105000>

Here is one for an ellipse spline from Herb: http://www.cheetah3d.com/forum/showthread.php?t=6607
Maybe you can use parts of it.

Cheers
Frank

Links: http://www.cheetah3d.com/forum/showthread.php?t=6607

## #3 — feloneouscat — 2017-01-06
<https://www.cheetah3d.com/forum/index.php?threads/12214/post-105001>

[[QUOTE:  frank beckmann said: Here is one for an ellipse spline from Herb: http://www.cheetah3d.com/forum/showthread.php?t=6607 Maybe you can use parts of it. Click to expand... ]]

Thanks! This will give me something to hack. Been a long week and for some reason my brain didn’t want to do bezier curves… :tongue:

## #4 — feloneouscat — 2017-01-06
<https://www.cheetah3d.com/forum/index.php?threads/12214/post-105002>

Warmed up and I think my brain unfroze…

The Ellipsis Spline was way too much code. I looked again at Martin’s SineCircle and apparently my brain wasn’t as frozen as it was before. Mangling this into a simple circle was easy.

	
	


```js
// Circle.js
//
// Based off of SineCircle (c) 2005 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use
// it as a starting point for your own creations.
//
// Purpose:
//      Demonstrates how to create a custom spline object.
// Goes in the /Scripts/Splineobj/ folder.

function buildUI(obj){
    obj.setParameter("name","Circle");

    obj.addParameterFloat("Diameter", 0.5, 0.001, 1000.0, true, true);
}


function buildObject(obj) {
    var diameter = obj.getParameter("Diameter");

    var spline=obj.core();

    var pos = new Vec3D(0, 0, 1);
    spline.move(pos);
	
    for(var i=1; i<=360; i++) {
        var ii=Math.PI*2*i/360;
        pos = new Vec3D(Math.sin(ii) * diameter, 0, Math.cos(ii) * diameter);
        spline.line(pos);
    }
}
```


Moved the spline.move(pos) since it only gets executed once - no point in executing an “if" 360 times.

Using this I can build my splines in code.

Thanks!

## #5 — feloneouscat — 2017-01-07
<https://www.cheetah3d.com/forum/index.php?threads/12214/post-105053>

Okay… Riddle me this… (C3D 7b19)

I’m now attempting to add a circle via Javascript. Here is the code:

	
	


```
var circle = doc.document().addObject(SCRIPTSPLINE);
circle.setParameter("scriptName", "Scripts/Splineobj/Circle.js");
circle.setParameter("name", "Circle Script");
circle.setCreatorObj(true);
circle.update();
```


The object shows up in my graph, but has no parameters.

If I add my Circle.js by hand (rather than code) all works as expected.

Any idea what I’m missing? 

(As FYI, I did change the scriptName to a full “Users….” and that didn’t work either).

EDIT: It looks like I need to set the script path to the full path of the script, but there doesn’t appear to be a way to do so. HELP!

## #6 — feloneouscat — 2017-01-09
<https://www.cheetah3d.com/forum/index.php?threads/12214/post-105085>

Martin says this can’t be done at the moment. 

Have to do it manually.
