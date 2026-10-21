# Getting the transparency color

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7187/
- Subforum: scripting-general
- Started by **Codehead** on 2011-04-21; last post 2011-04-21; 9 posts

## #1 — Codehead — 2011-04-21
<https://www.cheetah3d.com/forum/index.php?threads/7187/post-58798>

Getting the transparency color

How do you guys get the transparency color, this doesn't work:

	
	


```
material_tag.getParameter("transColor");
```


The Material object doesn't have transparency information in it either which I don't understand why...

## #2 — tg_jp — 2011-04-21
<https://www.cheetah3d.com/forum/index.php?threads/7187/post-58804>

hi

unfortunately, after updaing material system ( v. 5.x ), It's not available to access material paramters via scripting. It's missing.

material tag object doesn't hold any parameters of material. you have to get material object ( not tag ) via following functions: tag:linkedToMaterial and Doc::materialAtIndex . please try macro codes below, to check all accesible parameters (object/tag/material).

	
	


```js
function main(doc) {
   var obj = doc.selectedObject();
   
   print('---- Object Info ---'); //
   
   if ( obj ) {
       print('-- object type:'+obj.type());
       var info = obj.parameterInfo();
       for(var j=0;j<info.length;j++) {
           print(info[j][0] +" [" + info[j][1] + "]:"+obj.getParameter(info[j][0]));
       }
       var tcount = obj.tagCount();
       for (var i = 0;i < tcount;++i) {
           var tag = obj.tagAtIndex(i);
           info = tag.parameterInfo();
           print('-- tag '+i+' type:'+tag.type());
           for(var j=0;j<info.length;j++){
           		if (info[j][1] != "Link") {
               print(info[j][0] + " [" + info[j][1] + "]:"+tag.getParameter(info[j][0]));
           		} else {
               print(info[j][0] + " [" + info[j][1] + "]:");
           		}
           }
           if (tag.type() == 102) { // material tag.
               var material = doc.materialAtIndex(tag.linkedToMaterial());
               print('-- linked Material --');
               info = material.parameterInfo();
               for(var j=0;j<info.length;j++){
                   print(info[j][0] + " [" + info[j][1] + "]:"+material.getParameter(info[j][0]));
               }
           }
       }
   }
}
```


regards.

tg_jp, Hiroto.

## #3 — Codehead — 2011-04-21
<https://www.cheetah3d.com/forum/index.php?threads/7187/post-58806>

So I can't access the transparency color of a material??!!

## #4 — tg_jp — 2011-04-21
<https://www.cheetah3d.com/forum/index.php?threads/7187/post-58808>

[[QUOTE:  Codehead said: So I can't access the transparency color of a material??!! Click to expand... ]]

no, I think it cannot. or, you can do it with v.4.7.
btw, what do you want to do with transparency color?

regards.

tg_jp, Hiroto.

## #5 — Codehead — 2011-04-21
<https://www.cheetah3d.com/forum/index.php?threads/7187/post-58809>

So how do you add transparency to an object and then export it? I was adding a material and setting it's transparency color...

## #6 — tg_jp — 2011-04-21
<https://www.cheetah3d.com/forum/index.php?threads/7187/post-58810>

[[QUOTE:  Codehead said: So how do you add transparency to an object and then export it? I was adding a material and setting it's transparency color... Click to expand... ]]

I don't have any idea to do it with version 5.x now.  
my export scripts also cannot add/edit/apply material stuff with 5.x. 
some wishes for scripting are already requested, so we have to wait for it.

regards.

tg_jp, Hiroto.

## #7 — frank beckmann — 2011-04-21
<https://www.cheetah3d.com/forum/index.php?threads/7187/post-58811>

[[QUOTE:  Codehead said: So how do you add transparency to an object and then export it? I was adding a material and setting it's transparency color... Click to expand... ]]

Image based?!  

Cheers
Frank

## #8 — Codehead — 2011-04-21
<https://www.cheetah3d.com/forum/index.php?threads/7187/post-58813>

I guess one other way would be to add a material to the object and call it like trans50 so that in the script you can tell but in Cheetah 3D set it's transparency to fully transparent... Kind of disappointing though...

## #9 — Codehead — 2011-04-21
<https://www.cheetah3d.com/forum/index.php?threads/7187/post-58815>

You can encode the transparency of the material in it's name...
