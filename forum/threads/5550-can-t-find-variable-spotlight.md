# Can't find variable: SPOTLIGHT

- Thread: https://www.cheetah3d.com/forum/index.php?threads/5550/
- Subforum: scripting-general
- Started by **lloydsargent** on 2010-03-21; last post 2013-07-04; 7 posts

## #1 — lloydsargent — 2010-03-21
<https://www.cheetah3d.com/forum/index.php?threads/5550/post-40606>

Can't find variable: SPOTLIGHT

I have version 5.3 running on Mac Pro and when I try to run the "Scale Light Intensity" tool, I get the following message:

line: 39 
error: Can't find variable: SPOTLIGHT

So I mucked around with the Javascript code and it appears that not only can it not find SPOTLIGHT, but neither can it find AREALIGHT or DISTANTLIGHT!

This throws me in a bit of a pickle as I was hoping to write some code to save and restore my lights (and other variables). But now I'm confused as to what is what.

Thanks for any help.

## #2 — tg_jp — 2010-03-22
<https://www.cheetah3d.com/forum/index.php?threads/5550/post-40609>

hello

the constants SPOTLIGHT, DISTANTLIGHT, and AREALIGHT seems to be gone. actually, you don't need those constants for current lighting system ( those constants for old version 2.4 or 3.6? ).

	
	


```
l.39	if(objtype==LIGHT || objtype==POINTLIGHT || objtype==SPOTLIGHT || objtype==AREALIGHT || objtype==DISTANTLIGHT){
                 -> 
l.39		if(objtype == LIGHT) {
```


regards

tg_jp, Hiroto.

## #3 — lloydsargent — 2010-03-22
<https://www.cheetah3d.com/forum/index.php?threads/5550/post-40611>

[[QUOTE:  tg_jp said: hello the constants SPOTLIGHT, DISTANTLIGHT, and AREALIGHT seems to be gone. actually, you don't need those constants for current lighting system ( those constants for old version 2.4 or ]]

Okay... I new to Javascript (but have been writing C, C++ and Objective C for 3, 2, and 1 decade respectively). I'm just trying to understand everything under the hood...

Thanks! Lloyd

## #4 — Nichod — 2013-07-03
<https://www.cheetah3d.com/forum/index.php?threads/5550/post-80267>

Just want to bring this up, because I am going over scripting and found that this  script had not been updated with the new API changes.

## #5 — Nichod — 2013-07-03
<https://www.cheetah3d.com/forum/index.php?threads/5550/post-80269>

Corrected script:

	
	


```js
//
// Scale light intensity.js
// (c) 2005 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Goes down the hole scene graph and multiplies the 
//	intensity of every light by a certain factor which
//	has to be specified via the UI.
//


function buildUI(tool){
    tool.addParameterSeparator("Scale light intensity.js");
    tool.addParameterFloat("factor",1.1,0.0,10.0,true,true);
    tool.addParameterButton("apply","OK","apply");
}


function apply(tool){ 
    var  doc=tool.document();
    var  root=doc.root();
    
    var factor=tool.getParameter("factor");

    iterateTree(root,factor);
}


function iterateTree(obj,factor){
    var	i;
    
    for(i=0;i<obj.childCount();i++){
	var  curr=obj.childAtIndex(i);
	var  objtype=curr.type();
	
	if(objtype==LIGHT){
	    var	intensity=curr.getParameter("intensity");
	    
	    curr.setParameter("intensity",intensity*factor);
	    }
	
	iterateTree(curr,factor);
	}
    }
```

## #6 — podperson — 2013-07-04
<https://www.cheetah3d.com/forum/index.php?threads/5550/post-80277>

I wrote an enhanced version of the Parameter Info example script called Object Info which reveals a lot more about a selected object. Given there's a lot of missing constants, you can find out the actual ID value of an object to get a script working while you wait for a proper constant to be added to C3D's API:

http://loewald.com/c3dbook/Scripts/Object-Info/

It also publishes all this data in Markdown format, so if you have a markdown editor (such as the excellent and free Mua) you get it all beautifully rendered as "documentation".

This is what it outputs when you select a spot light:

# Light
#### type() === 5 | LIGHT | NGONFAMILY | VEC2D_PARAMETER | ROT_ZYX

### parameters

* scriptName   *String* = 
* locked   *Bool* = 0
* position   *Vec3D* = { x: 0, y: 0, z: 0}
* rotation   *Vec3D* = { x: 0, y: 0, z: 0}
* shear   *Vec3D* = { x: 0, y: 0, z: 0}
* scale   *Vec3D* = { x: 1, y: 1, z: 1}
* pivot   *Vec3D* = { x: 0, y: 0, z: 0}
* prefrot   *Vec3D* = { x: 0, y: 0, z: 0}
* postrot   *Vec3D* = { x: 0, y: 0, z: 0}
* prerot   *Vec3D* = { x: 0, y: 0, z: 0}
* rotorder   *Int* = 6
* name   *String* = Light
* lightType   *Int* = 4
* axis   *Int* = 1
* samples   *Int* = 1
* color   *Vec4D* = { x: 1, y: 1, z: 1, w: 1}
* intensity   *Float* = 1
* attenuation   *Int* = 2
* cap   *Bool* = 1
* geometry   *Bool* = 0
* width   *Float* = 0.5
* height   *Float* = 0.5
* radius   *Float* = 0.019999999552965164
* cutOffAngle   *Float* = 30
* cutOffAttenuation   *Float* = 1
* cutOffType   *Int* = 0
* shadowColor   *Vec4D* = { x: 0, y: 0, z: 0, w: 1}
* shadowType   *Int* = 1
* photonLight   *Bool* = 0
* globalPhotons   *Int* = 10000
* causticPhotons   *Int* = 10000

### properties

* setCreatorObj   *function*
* addParameterFloat   *function*
* id   *function*
* addTagOfType   *function*
* addParameterSelector   *function*
* tagCount   *function*
* materialTags   *function*
* modCore   *function*
* addParameterButton   *function*
* addParameterString   *function*
* isCeatorObj   *function*
* scriptPath   *function*
* addChildAtIndex   *function*
* objMatrix   *function*
* addParameterSeparator   *function*
* addParameterInt   *function*
* addParameterLink   *function*
* document   *function*
* parameterInfo   *function*
* core   *function*
* parameterAtIndex   *function*
* family   *function*
* parameterCount   *function*
* addParameterBool   *function*
* setParameter   *function*
* tagAtIndex   *function*
* parameterWithName   *function*
* childAtIndex   *function*
* recordGeometryForUndo   *function*
* childCount   *function*
* update   *function*
* script   *function*
* recordParametersForUndo   *function*
* type   *function*
* getParameter   *function*
* obj2WorldMatrix   *function*
* owner   *function*

## Tags
#### type() === 104 | PROPWINTAG

### parameters

* scriptName   *String* = 
* locked   *Bool* = 0
* position   *Vec3D* = { x: 0, y: 0, z: 0}
* scale   *Vec3D* = { x: 1, y: 1, z: 1}
* shear   *Vec3D* = { x: 0, y: 0, z: 0}
* rotation   *Vec3D* = { x: 0, y: 0, z: 0}
* tagOn   *Bool* = 1
* priority   *Int* = 10

### properties

* addParameterSeparator   *function*
* addParameterFloat   *function*
* id   *function*
* linkedToMaterial   *function*
* addParameterLink   *function*
* document   *function*
* parameterInfo   *function*
* addParameterSelector   *function*
* parameterAtIndex   *function*
* family   *function*
* scriptPath   *function*
* parameterCount   *function*
* addParameterBool   *function*
* setParameter   *function*
* parameterWithName   *function*
* addParameterButton   *function*
* addParameterString   *function*
* recordGeometryForUndo   *function*
* addParameterInt   *function*
* update   *function*
* script   *function*
* recordParametersForUndo   *function*
* type   *function*
* getParameter   *function*
* tag2WorldMatrix   *function*
* owner   *function*

#### type() === 103 | MODETAG

### parameters

* scriptName   *String* = 
* locked   *Bool* = 0
* position   *Vec3D* = { x: 0, y: 0, z: 0}
* scale   *Vec3D* = { x: 1, y: 1, z: 1}
* shear   *Vec3D* = { x: 0, y: 0, z: 0}
* rotation   *Vec3D* = { x: 0, y: 0, z: 0}
* tagOn   *Bool* = 1
* priority   *Int* = 10
* enabled   *Bool* = 1
* modifierOn   *Bool* = 1
* editorActive   *Bool* = 1
* renderActive   *Bool* = 1
* editorShading   *Int* = 0

### properties

* addParameterSeparator   *function*
* addParameterFloat   *function*
* id   *function*
* linkedToMaterial   *function*
* addParameterLink   *function*
* document   *function*
* parameterInfo   *function*
* addParameterSelector   *function*
* parameterAtIndex   *function*
* family   *function*
* scriptPath   *function*
* parameterCount   *function*
* addParameterBool   *function*
* setParameter   *function*
* parameterWithName   *function*
* addParameterButton   *function*
* addParameterString   *function*
* recordGeometryForUndo   *function*
* addParameterInt   *function*
* update   *function*
* script   *function*
* recordParametersForUndo   *function*
* type   *function*
* getParameter   *function*
* tag2WorldMatrix   *function*
* owner   *function*

So a spotlight has a lightType of 4.

Links: http://loewald.com/c3dbook/Scripts/Object-Info/

## #7 — Nichod — 2013-07-04
<https://www.cheetah3d.com/forum/index.php?threads/5550/post-80282>

Very nice and useful. I was using one I modified based on one tg_jp did, but the markdown is a nice touch. :icon_thumbup: :icon_thumbup:
