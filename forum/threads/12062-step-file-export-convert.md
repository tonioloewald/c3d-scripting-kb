# .step file export/convert?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12062/
- Subforum: scripting-general
- Started by **grit** on 2016-09-30; last post 2016-12-15; 11 posts

## #1 — grit — 2016-09-30
<https://www.cheetah3d.com/forum/index.php?threads/12062/post-103519>

.step file export/convert?

So I made a nice housing for my project and I can print it in 3D with the .stl format and e.d. the shapeways service, but if I want to take the design to a 'real cad business' they all ask for .step files. Does anyone know a way to convert Cheetah3D files into .step ones?

## #2 — Swizl — 2016-09-30
<https://www.cheetah3d.com/forum/index.php?threads/12062/post-103520>

Hi grit,

This probably isn't the only solution, but it is free.

FreeCAD:
http://www.freecadweb.org

Links: http://www.freecadweb.org/

## #3 — grit — 2016-09-30
<https://www.cheetah3d.com/forum/index.php?threads/12062/post-103521>

yes, I tried that and it looked so promising  but it does not export to .stl. Although it loads the 3D model it says 'object is not a shape, skipping export'...

## #4 — Swizl — 2016-09-30
<https://www.cheetah3d.com/forum/index.php?threads/12062/post-103523>

[[QUOTE:  grit said: yes, I tried that and it looked so promising but it does not export to .stl. Although it loads the 3D model it says 'object is not a shape, skipping export'... Click to expand... ]]

Hmmm, I just tried a fractal primitive and then collapsed the mesh in C3d. Saved it out as stl and then imported it into FreeCAD. It exported the STEP file without a problem. 

Have you tried multiple models out?

Could you attach your file here? It can help track down the problem a little easier. If you aren't able to, for whatever reason, I understand.

## #5 — grit — 2016-09-30
<https://www.cheetah3d.com/forum/index.php?threads/12062/post-103524>

hmm, it might have something to do with this:
http://www.freecadweb.org/wiki/index.php?title=FreeCAD_and_Mesh_Import

But I think the model is too complex to convert it to a proper mesh...

I guess the problem also is I don't understand what the .step file exactly does. The conversion almost makes me think it is not built up on points, edges and faces...

Links: http://www.freecadweb.org/wiki/index.php?title=FreeCAD_and_Mesh_Import

## #6 — Swizl — 2016-09-30
<https://www.cheetah3d.com/forum/index.php?threads/12062/post-103525>

Yes, I'm not super familiar with a lot of the CAD file types.

One thing that you could do is try and clean the mesh up in MeshLab (also free) and then bring it into FreeCAD for output. I don't think MeshLab exports to that file type. I know it's probably a lot of hassle, but at least if you can get it working, it will be free to do. 
http://meshlab.sourceforge.net/

Are you having precision parts machined? Just trying to figure out what the purpose is for needing to send to CAD friendly places. 

There are also some NURBS modelers that would be more based in the CAD world. Neither are free though.
http://moi3d.com/
https://www.rhino3d.com/

Links: http://meshlab.sourceforge.net/, http://moi3d.com/, https://www.rhino3d.com/

## #7 — grit — 2016-10-25
<https://www.cheetah3d.com/forum/index.php?threads/12062/post-103811>

Well I'm not that familiar with all the formats either but for what I now have learned: Unfortunately a mesh object like .STL is not easy to convert into STEP.

I use Cheetah3d for 3D modeling of 3D-printed objects, although it works perfectly for companies like shapeways and such - the lack of STEP export prevents me from going next level in actually having the 3D models produced in mass production. The companies which make moulds need the STEP data.

The double sad part is that it seems STEP is based on a kind of format which takes data from solids, just like Cheetah is able to use in modeling but all the interchangeable formats seem to 'flatten' this info into polygons...

As it looks now: In order to have a proper STEP file I need to build my model in another 3D program...(really NOT looking forward in using Rhino....)

## #8 — uncle808us — 2016-10-25
<https://www.cheetah3d.com/forum/index.php?threads/12062/post-103814>

[[QUOTE:  Swizl said: Hi grit, This probably isn't the only solution, but it is free. FreeCAD: http://www.freecadweb.org Click to expand... ]]

Thanks for the link.

## #9 — Swizl — 2016-10-25
<https://www.cheetah3d.com/forum/index.php?threads/12062/post-103816>

[[QUOTE:  uncle808us said: Thanks for the link. Click to expand... ]]

@uncle Sure! I've actually had to use it a few times here at work. Nice to have something that's free that I may only need a few times a year. 

One instance of me needing to use it was I needed to know the surface area of a plane so I could animate the part in C3d without much warping. *Modifiers in C3d don't respect surface area (*edit: some modifiers do respect surface area and some don't. It's best to double check when accuracy is important). So some of them warp and stretch parts (which can be desirable sometimes and sometimes not). 

You can see the videos here. It's the ones with the clear lens being removed and the paper being removed. (arris M-Series & the arris Accents) https://vimeo.com/home/myvideos

@grit sorry to hijack the thread some. Wish there was some easier solution for you. I don't know much about injection molding other than talking to our Engineers and Industrial Designer. I may ask them for some info on it. I know that they have to account for shrinkage in the mold and that probably isn't something very easy to do in a subdivision modeling app. Plus the CAD type modelers are highly accurate. I agree with uncle, you should give MOI3d a shot. They have a free demo you can try. The guy that wrote that software is actually the same person that did a lot of programming for Rhino 3d. Our guys use Ashlar-Vellum's Xenon for the 3d work. I don't know your price rang though. Good luck!

Links: https://vimeo.com/home/myvideos

## #10 — frank beckmann — 2016-12-15
<https://www.cheetah3d.com/forum/index.php?threads/12062/post-104479>

[[QUOTE:  Swizl said: Hmmm, I just tried a fractal primitive and then collapsed the mesh in C3d. Saved it out as stl and then imported it into FreeCAD. It exported the STEP file without a problem. Click to exp]]
Well it says exported but the stl file size was 1,8MB and the step export is just 4KB which is mostly a file without content. Have you load the step-file back into FreeCAD to check?

Cheers
Frank

## #11 — Swizl — 2016-12-15
<https://www.cheetah3d.com/forum/index.php?threads/12062/post-104491>

[[QUOTE:  frank beckmann said: Well it says exported but the stl file size was 1,8MB and the step export is just 4KB which is mostly a file without content. Have you load the step-file back into FreeCAD to che]]

Thanks Frank,

I'll admit that I didn't check the file size nor re-import it back into FreeCAD. Definitely a problem as it's empty when re-importing. I do take STEP files from the McMaster-Carr website all the time and export them as .stl and then bring into C3d. 

I don't know enough about FreeCAD to know what would cause that problem. I just use it for my vary narrow purposes. Possibly if the OP still needs this, they can check on the FreeCAD forums? Haven't heard back from them since this original post.
