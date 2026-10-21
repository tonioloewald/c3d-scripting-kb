# Scripting Issues

- Thread: https://www.cheetah3d.com/forum/index.php?threads/2262/
- Subforum: scripting-general
- Started by **sig33kde** on 2007-10-18; last post 2007-10-20; 6 posts

## #1 — sig33kde — 2007-10-18
<https://www.cheetah3d.com/forum/index.php?threads/2262/post-15849>

Scripting Issues

This is my 1st time scripting with Cheetah -- I am very familiar with javascript... so I'm just having issues learning the API. 

What I am trying to accomplish is almost like the quicktime_VR script that was given, but instead of the camera moving around the object, the object would just simply rotate and at each rotation the script would render that frame.  I have a quasi-working script:

function buildUI(obj){
	
    obj.setParameter("name","lots of pictures");
    obj.addParameterButton("update","RUN","take_pictures");

}

function take_pictures(obj){
	var imagetype="jpg";
	var doc=obj.document();
	// var cam=doc.activeCamera();

    for(var i=0;i<300;i++){ 

		var newROT=new Vec3D((i*1.2), 0, 0);
		obj.setParameter("rotation",newROT);
		obj.update();
		doc.render("/path/to/folder/"+i+"."+imagetype);

    }

} 

but when I place the object into the script and try to run it (render) the object in question does not show up in the rendered scene.  I am sure it is something simple that I am completely unaware of -- but any help would be greatly apprecited.

THANKS

## #2 — tg_jp — 2007-10-18
<https://www.cheetah3d.com/forum/index.php?threads/2262/post-15853>

hi,

I think, it is a Polygon script. if so, to be rendered itself and its child object, you seem to have to add a polygon or something in buildObj() function.

after adding this code to yours, it will be rendered.

	
	


```js
function buildObject(obj) {
    //adding a quite tiny polygon to be rendered.
    var core = obj.core();
    var faceSize = 0.00001;
    core.addPolygon(3,false,[new Vec3D(faceSize,faceSize,faceSize), new Vec3D(0,faceSize,faceSize), new Vec3D(0,0,0)]);
}
```


actually, this solution is a bit bothersome. maybe we have another one. :?:

regards.

tg_jp, Hiroto

## #3 — ToddWR — 2007-10-19
<https://www.cheetah3d.com/forum/index.php?threads/2262/post-15856>

I beleive the best bet for this would be to run it as a macro script. 

it would work like so.. 
select object to use/rotate
select the script 
click button to render the images
... its late here , tomorrow I will post something that will work

Todd

## #4 — sig33kde — 2007-10-19
<https://www.cheetah3d.com/forum/index.php?threads/2262/post-15869>

Thank You!

That worked perfectly 
I know it may be a cheap hack, but that's fine with me for now. 

Should I be using a buildObject call whenever making a poygonobj script? 
Thanks!

## #5 — ToddWR — 2007-10-19
<https://www.cheetah3d.com/forum/index.php?threads/2262/post-15885>

sig33kde,

yes, I believe that by default any objects placed in a polygon object script "disappear" to the world. it is the responsibility of the script to supply objects to be seen.

Todd

p.s. 
    if the script sets itself as a creator object, then the children of the script are hidden.

## #6 — tg_jp — 2007-10-20
<https://www.cheetah3d.com/forum/index.php?threads/2262/post-15910>

hi,

[[QUOTE:  Should I be using a buildObject call whenever making a poygonobj script? Click to expand... ]]

I think so, too. it would be better to implement buildObject() for polygon script.

anyway, How about Tag script with using almost same code of your first try? 

	
	


```js
function take_pictures(tag){
  var obj = tag.owner();
  var imagetype="jpg";
  var doc=obj.document();
  // var cam=doc.activeCamera();
  /* ... same ...*/
}
```


regards.

tg_jp, Hiroto
