# Material Change...Save

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1055/
- Subforum: scripting-general
- Started by **holdeg2** on 2006-11-16; last post 2017-01-05; 10 posts

## #1 — holdeg2 — 2006-11-16
<https://www.cheetah3d.com/forum/index.php?threads/1055/post-6587>

Material Change...Save

I'm trying to write a script that will change the color of a material and save it off into a new JAS.  Here's what I have so far, but Cheetah just closes due to something it disagrees with in my script:

	
	


```js
function main(doc) {
     //get path for file
   var path=OS.runSavePanel("jas");
   if (path==null) {
      return;
   }

   // find the "CommandColor"
   for(mat_indx=0;mat_indx < doc.materialCount(); ++mat_indx) {
      var mat=doc.materialAtIndex(mat_indx);
      if (mat.getParameter("name") == "CommandColor") {
         break;
      }
   }

   // i assume red, green, blue
   var colors = Array(Vec4D(255,0,0,0), Vec4D(0,255,0,0), Vec4D(0,0,255,0));
	
   for (color_indx= 0; color_indx < 3; ++color_indx) {
      mat.setParameter("color", colors[color_indx], false);
		
      doc.saveToFile(path,"file" + color_indx + ".jas");
   }
}
```


This is in my "scripts/Macros" directory, as that seems to have some meaning.
ANY help would be greatly appreciated.
Also, will new documents for scripting be coming?

Thanks

## #2 — tg_jp — 2006-11-16
<https://www.cheetah3d.com/forum/index.php?threads/1055/post-6588>

Hello.

please check this.

	
	


```
   var colors = Array(new Vec4D(255,0,0,0),new Vec4D(0,255,0,0),new Vec4D(0,0,255,0));
   
   for (color_indx= 0; color_indx < 3; ++color_indx) {
      var path_array = path.split("/");
      var file_name = path_array.pop(); // getting filename.
      var file_name_array = file_name.split(".");
      file_name_array.pop(); // remove extension.
      file_name = file_name_array.join(".") + "_" + color_indx + ".jas"; // change filename.
      path_array.push(file_name); // back changed filename to path
      var file_path = path_array.join("/"); // create full path for file.
      
      mat.setParameter("colorColor", colors[color_indx], false);

      doc.saveToFile(file_path,"jas");
   }
```


* 'new' needs for creating Object.
* parameter name of script is different from propertie's name. not 'color', but 'colorColor'.
* manually change file name of path returned from OS.runSavePanel()

and script parameter name of Material is below. ( I checked it with v.3.5 )
you can dump full list of object parameter name and type with getParamterInfo() function.

	
	


```
Material Parameters for script.

scriptName [String]
locked [Bool]
shaderType [String]
name [String]
colorColor [Vec4D]
colorTex [Texture]
colorMix [Float]
ambientIntensity [Float]
diffIntensity [Float]
specularColor [Vec4D]
specTex [Texture]
specMix [Float]
specSize [Float]
emissionColor [Vec4D]
bumpTex [Texture]
bumpIntensity [Float]
reflColor [Vec4D]
reflTex [Texture]
reflMix [Float]
reflIntensity [Float]
reflAngle [Float]
reflSamples [Float]
transColor [Vec4D]
transTex [Texture]
transMix [Float]
transIntensity [Float]
transEta [Float]
transUseAlpha [Bool]
transFresnel [Bool]
```


regards.

tg_jp, Hiroto.

## #3 — holdeg2 — 2006-11-16
<https://www.cheetah3d.com/forum/index.php?threads/1055/post-6593>

Thank you

Thank you. thank you. thank you.

There is certainly a lot of power to wielded with these scripts.  But they take some ingenuity on the part of the user to wrestle it out of them.
I was headed way out into left field after I posted.

Oh yeah...thank you.

## #4 — holdeg2 — 2006-11-16
<https://www.cheetah3d.com/forum/index.php?threads/1055/post-6600>

Nitpicking

This is nitpicking now, but after the material has been modified by the script, the change is not reflected in the materials drawer.

document.redrawAll() didn't seem to touch it.

Is there anything to force the materials to check itself?

Thanks

## #5 — tg_jp — 2006-11-17
<https://www.cheetah3d.com/forum/index.php?threads/1055/post-6616>

Hello.

please try this.

	
	


```
      mat.setParameter("colorColor", colors[color_indx], true); // or just
      // mat.setParameter("colorClor", colors[color_indx]);
```

I checked preview of material view is updated after running script. but color-well of properties view is not. 

regards.

tg_jp, Hiroto.

## #6 — Jay Kyburz — 2017-01-03
<https://www.cheetah3d.com/forum/index.php?threads/1055/post-104912>

Update

Hey all, I'm also trying to change the diffuse colour of a material with no luck.

These example seem really old. 

Here is what I have so far. Anybody know what I am missing? 

	
	


```
    for(i=0;i<doc.materialCount();i++){
    var mat = doc.materialAtIndex(i);
    var matcolor = mat.color();
    var matname = mat.getParameter("name");

    if (matname == "ship body") {
        print("changing");
        matcolor.set(0, 0, 1, 0);
    }
```


Also, should Document.render() bring up the render window? Seems to do nothing?

## #7 — Jay Kyburz — 2017-01-04
<https://www.cheetah3d.com/forum/index.php?threads/1055/post-104913>

I think I have it working using  

	
	


```
            var n0 = mat.nodeAtIndex(0);
            n0.setParameter("diffColor", new Vec4D(255,128,0,1));
```


Would still love some help working out how to kick off a render.!

Thanks!

## #8 — Martin — 2017-01-04
<https://www.cheetah3d.com/forum/index.php?threads/1055/post-104914>

[[QUOTE:  Jay Kyburz said: Would still love some help working out how to kick off a render.! Click to expand... ]]

Hi,
doc.render() should work fine. I've just tested it.

Bye
Martin

## #9 — Jay Kyburz — 2017-01-04
<https://www.cheetah3d.com/forum/index.php?threads/1055/post-104916>

Thanks Martin, I was using Document.render not doc.render!

since you are around, 

Any Idea how I get the scene to update if I want to render multiple times?

	
	


```
            n0.setParameter("diffColor", new Vec4D(255,0,0,1), true);
            doc.render();

            n0.setParameter("diffColor", new Vec4D(0,255,0,1), true);
            doc.render();
```


update: or is there some kind of call back I can hook into for when a frame is finished rendering?

## #10 — Martin — 2017-01-05
<https://www.cheetah3d.com/forum/index.php?threads/1055/post-104946>

Hi,
the doc.render(); function doesn't return until the render job is finished. So there won't be any updates during the rendering.

Bye
Martin
