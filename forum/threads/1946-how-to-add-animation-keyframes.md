# How to add animation keyframes?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1946/
- Subforum: scripting-general
- Started by **NoshBar** on 2007-07-15; last post 2012-05-20; 11 posts

## #1 — NoshBar — 2007-07-15
<https://www.cheetah3d.com/forum/index.php?threads/1946/post-13410>

How to add animation keyframes?

Heya.

I've made a script to import motion tracking information from Voodoo output (see http://www.digilab.uni-hannover.de/docs/manual.html).

So far I have feature points, and a mostly-ok straight-line spline for camera movement.

I've created this as a tool script, and was wondering how to add keyframes to the timeline so that I could manually set camera rotation?

Or if I'm just being an idiot like usual, and there's a better way...?

Links: http://www.digilab.uni-hannover.de/docs/manual.html)

## #2 — ToddWR — 2007-07-15
<https://www.cheetah3d.com/forum/index.php?threads/1946/post-13417>

NoshBar,

try this;

	
	


```
var  doc=tool.document();
doc.setAnimPosition(sometime);
// set parameters here
// make sure you have auto keying on for this to work
doc.setAnimPosition(newtime);
// set more parameters
```


I have gotten this to work in one of my projects

Todd

## #3 — NoshBar — 2007-07-15
<https://www.cheetah3d.com/forum/index.php?threads/1946/post-13418>

Ah, thanks Todd, the auto keying is what I was missing.
I thought I had to manually add keyframes for everything, so ta.

## #4 — DarthSidious05 — 2009-10-18
<https://www.cheetah3d.com/forum/index.php?threads/1946/post-34044>

Considering I'm not yet familiar with coding for Cheetah, I wonder what it would take to code a "copy keframe" and then "paste keyframe" coding. The newer version will hopefully offer it soon.

## #5 — crgreen — 2012-03-05
<https://www.cheetah3d.com/forum/index.php?threads/1946/post-68254>

setting keyframes???

Hello Martin and everyone. I have tried the formula below, and it just doesn't seem to work.
This is all I'm doing (as a tool script):
(  C3D v5.8  )

1)adding a camera object
2)doing a setAnimationPosition at some time
3)doing a setParameter on the camera object for rotation
4)doing another setAnimationPosition at a different time
5)setParameter for rotation with a different value

Everything seems to work great, except for the fact that no keyframes are set, even if I have automatic keying turned on (so, of course, the camera rotation values changed from step 5).

This seems so basic and I'm pulling my hair out. How does one set keyframes in C3D via scripting? Any help is highly appreciated.

-crg

[[QUOTE:  ToddWR said: NoshBar, try this; 
```
var  doc=tool.document();
doc.setAnimPosition(sometime);
// set parameters here
// make sure you have auto keying on for this to work
doc.setAnimPosition(newtime);
// set more parameters
```
 I have gotten this to work in one of my projects Todd Click to expand... ]]

## #6 — Martin — 2012-03-06
<https://www.cheetah3d.com/forum/index.php?threads/1946/post-68321>

Hi,
Cheetah3D v6 will have a Javascript API to access the F-Curves directly. Then it will be possible to import/export animation data from the F-Curves.

Bye
Martin

## #7 — crgreen — 2012-03-06
<https://www.cheetah3d.com/forum/index.php?threads/1946/post-68322>

Thanks for the reply Martin.
So there is no way to do any keyframing of any properties by script for v5.8?

Can someone explain: did that example code just work briefly for one version or something? Or maybe it works for a limited number of objects/properties?
(   By 'example code', I'm referring to:

	
	


```
var  doc=tool.document();
doc.setAnimPosition(sometime);
// set parameters here
// make sure you have auto keying on for this to work
doc.setAnimPosition(newtime);
// set more parameters
```

   )
-cg

[[QUOTE:  Martin said: Hi, Cheetah3D v6 will have a Javascript API to access the F-Curves directly. Then it will be possible to import/export animation data from the F-Curves. Bye Martin Click to expand... ]]

## #8 — Martin — 2012-03-07
<https://www.cheetah3d.com/forum/index.php?threads/1946/post-68356>

[[QUOTE:  crgreen said: Thanks for the reply Martin. So there is no way to do any keyframing of any properties by script for v5.8? Click to expand... ]]

I'm sorry but that never worked. v6 will be the first version which adds access to the animation data.

Bye
Martin

## #9 — chrisp — 2012-05-18
<https://www.cheetah3d.com/forum/index.php?threads/1946/post-70606>

Example of importing please?

[[QUOTE:  Martin said: I'm sorry but that never worked. v6 will be the first version which adds access to the animation data. Bye Martin Click to expand... ]]

Now that V6 is out, I wonder if anyone could provide a simple example javascript that imports data from a file (like a text list of values), or maybe just from an array within the script that has been cut and pasted in from said text file. For example, I want to vary the scale of a cylinder over a number of frames according to given values in a list (an animated bar chart if you like).

I have no idea how complicated this is, so if it is not simple, don’t waste your time, just tell me it is and I’ll figure it out (eventually).:smile: 

Thanks in advance,
Chris

## #10 — tg_jp — 2012-05-19
<https://www.cheetah3d.com/forum/index.php?threads/1946/post-70614>

hi

here is a sample code of tool script to add animation f-curve for selected object.

	
	


```js
function buildUI( tool ) {
  tool.addParameterButton( "add scale f-curve", "add", "addFCurveForScale");
}

function addFCurveForScale( tool ) {
  var doc = tool.document();
  var obj = doc.selectedObject();
  
  if (!obj) return;
  
  var currentTake = doc.currentTake();
  
  var scaleParam = obj.parameterWithName('scale');
  var scaleNode = scaleParam.takeNodeWithName( currentTake.name );
  if (!scaleNode) {
    // if no takeNode exists for a parameter, add takeNode
    scaleNode = scaleParam.addTakeNode( currentTake.name );
  }
  
  // array of setting values, or you can make this array from file with File class.
  var times = [0, 1, 2, 3, 4.5, 5]; // time ( NOT frame number )
  var values = [1, 0.1, 0.2, 0.3, 3, 1]; // scale value
  
  if (scaleNode) {
    var curve = scaleNode.fCurveAtIndex( 1 ); // scale parameter is Vec3D, so index 0 -> x, 1 -> y, 2 -> z. now I am getting y curve.
    curve.removeAllKeys(); // remove existing f-curve keys
    
    var len = times.length;
    for (var i = 0;i < len;i++) {
      var time = times[i];
      var value = values[i];
      
      var newKey = new FCurveKey();
      
      newKey.selected = false; // or true
      newKey.left_type = SPLINE_INTERPOL; // or LINER_INTERPOL ... check Help file.
      newKey.left_time = -0.1; // relative value!
      newKey.left_value = 0; // relat ive value!
      newKey.right_type = SPLINE_INTERPOL; // or LINER_INTERPOL ... check Help file.
      newKey.right_time = 0.1; // rlative value!
      newKey.right_value = 0; // relative value!
      
      newKey.time = time;
      newKey.value = value;
      
      curve.addKey( newKey );
    }
    
    curve.update();
  }
}
```


hope it helps.

regards.

tg_jp, Hiroto.

## #11 — chrisp — 2012-05-20
<https://www.cheetah3d.com/forum/index.php?threads/1946/post-70655>

Thanks!

That looks excellent, and I'm learning a lot from it.

Arigato, Hiroto-san!

Chris
