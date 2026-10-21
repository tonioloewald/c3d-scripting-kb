# Access to Animation values from Javascript

- Thread: https://www.cheetah3d.com/forum/index.php?threads/769/
- Subforum: scripting-general
- Started by **cmarrin** on 2006-07-07; last post 2006-07-13; 10 posts

## #1 — cmarrin — 2006-07-07
<https://www.cheetah3d.com/forum/index.php?threads/769/post-4869>

Access to Animation values from Javascript

I am new to Cheetah3D and I have to say it is one of the most amazing products in this class I have ever seen!

I want to export various elements of a Cheetah3D scene to Ogre. The Javascript capability seems ideally suited to this for getting access to the geometry, scene structure and material definitions. But I can't find any way to get access to the animation values I have set.

Does this capability exist? I really want to get the animations out so I can export camera and geometry animations.

## #2 — Martin — 2006-07-08
<https://www.cheetah3d.com/forum/index.php?threads/769/post-4871>

Hi,

[[QUOTE:  cmarrin said: I am new to Cheetah3D and I have to say it is one of the most amazing products in this class I have ever seen! Click to expand... ]]

thank you very much.

[[QUOTE:  cmarrin said: I want to export various elements of a Cheetah3D scene to Ogre. The Javascript capability seems ideally suited to this for getting access to the geometry, scene structure and material d]]

That sounds cool. What file format will you use to export to Ogre.

[[QUOTE:  cmarrin said: But I can't find any way to get access to the animation values I have set. Does this capability exist? I really want to get the animations out so I can export camera and geometry animat]]

Sorry but the animation information isn't accessible in Javascript yet since I'm still working on the animation system under the hood. Once I'm done with the animation system I will make that data accessible via scripting.

Bye,
Martin

## #3 — cmarrin — 2006-07-09
<https://www.cheetah3d.com/forum/index.php?threads/769/post-4896>

[[QUOTE:  Martin said: That sounds cool. What file format will you use to export to Ogre. Click to expand... ]]
Ogre uses a binary format called .mesh, which contains geometry and named material references. It can also contain references to skeletal animation data, if available. To make it simple, they also have an XML variant and a command line tool to convert between the two. So I will use JS to emit XML and then call the converter to make it binary.

That will also allow me to do an importer by converting from binary to XML and then parsing the XML into Cheetah3D objects. There is a very nice XML parser written in Javascript here:

    http://xmljs.sourceforge.net/website/documentation-sax.html

so this should not be too hard.

Ogre also supports a .material format. This contains all the params for fixed pipeline material support, including references to textures. You can also make reference to vertex and fragment shaders for advanced materials. This format is very cool because it supports multiple techniques which allow you to define multiple ways of accomplishing the same material, using different hardware capabilities. You can, for instance, provide a fixed-pipeline technique and a shader technique. Then the runtime will select the appropriate one based on whether or not your hardware has shader support. The fixed-pipeline version will not look as good, of course, but at least you will see something reasonable on less capable hardware.

So I also want to emit the material info from a Cheetah3D scene into .material. Fortunately this is a textual format, so it will not be too hard. I even want to be able to generate a material for the marble and wood materials. There is a nice site here:

    http://www.davidcornette.com/glsl/intro.html

which shows GLSL shaders to do procedural textures, like marble and wood. So I hope to be able to take your parameterization and apply it to these shaders to come up with something that looks good in Ogre. Do you already have a shader implementation of your marble and wood materials, by any chance? 

Finally, I want to be able to emit the various animations of the camera and other geometric transforms as simple keyframe sequences. My Ogre-based runtime will have an XML-based scene format with the ability to have custom nodes. So I will define an Interpolator node and emit XML for that node and its keyframe data from Cheetah3D.

I think this will let me get an awful lot of data from Cheetah3D into my runtime!

[[QUOTE:  Martin said: Sorry but the animation information isn't accessible in Javascript yet since I'm still working on the animation system under the hood. Once I'm done with the animation system I will make]]
Ok, any prognosis about when anything will be available? My needs are simple. I just need to get the raw spline data (essentially the data the F-curve editor works from).

Also, is this data emitted into any of the existing formats in a textual way? For instance, I know the .jas format has a textual variant. Could I save as that format and then write an off-line converter to extract that data? Is this format documented anywhere?

Thanks again!

Links: http://www.davidcornette.com/glsl/intro.html, http://xmljs.sourceforge.net/website/documentation-sax.html

## #4 — Martin — 2006-07-10
<https://www.cheetah3d.com/forum/index.php?threads/769/post-4902>

Hi,
wow you have big plans but I think using the XML pareser won't be that easy. 
In genreal I think the export is much more important than the import.

Is the binary format documented. Maybe the binary format is even easier to parse since you won't need the XML parser.

I made the experience that reading binary files is much easier than reading ASCII/XML files.

[[QUOTE:  cmarrin said: which shows GLSL shaders to do procedural textures, like marble and wood. So I hope to be able to take your parameterization and apply it to these shaders to come up with something that]]

No not yet. I'm still waiting for graphics hardware with a native noise function.  

[[QUOTE:  cmarrin said: Ok, any prognosis about when anything will be available? My needs are simple. I just need to get the raw spline data (essentially the data the F-curve editor works from). Click to expan]]

It will take some more time until the final parameter system is finished. So I can't make a prognosis yet since I don't know it by myself.

But if you are in real need I could add a intermediate custom function for you.

[[QUOTE:  cmarrin said: Also, is this data emitted into any of the existing formats in a textual way? Click to expand... ]]

FBX is also a possibility. 

[[QUOTE:  cmarrin said: Is this format documented anywhere? Click to expand... ]]

No.

Do you have some simple XML Ogre example files (with material)? I couldn't find any. 

Bye,
Martin

## #5 — cmarrin — 2006-07-10
<https://www.cheetah3d.com/forum/index.php?threads/769/post-4911>

[[QUOTE:  Martin said: wow you have big plans but I think using the XML pareser won't be that easy. In genreal I think the export is much more important than the import. Is the binary format documented. Maybe ]]

That's a possibility. I'm not as concerned about import as export at this point.

[[QUOTE:  Martin said: But if you are in real need I could add a intermediate custom function for you. Click to expand... ]]

It would be great if I could get the key frame data for the camera and other geometry transforms, in any way!

[[QUOTE:  Martin said: Do you have some simple XML Ogre example files (with material)? I couldn't find any. Click to expand... ]]

Here is a very short example of an Ogre mesh file:

----------
<mesh>
    <submeshes>
        <submesh material="Examples/CloudySky" 
          usesharedvertices="false" use32bitindexes="false" 
          operationtype="triangle_list">
            <faces count="82">
                <face v1="0" v2="1" v3="2" />
                <face v1="3" v2="4" v3="5" />
                <face v1="1" v2="0" v3="6" />
            </faces>
            <geometry vertexcount="58">
                <vertexbuffer positions="true" normals="true" 
                  texture_coord_dimensions_0="2" texture_coords="1">
                    <vertex>
                        <position x="5.61572" y="15.2486" z="5.66475" />
                        <normal x="0.278925" y="0.473199" z="0.835634" />
                        <texcoord u="2.10283" v="0.413862" />
                    </vertex>
                    <vertex>
                        <position x="6.1485" y="16.1399" z="4.58445" />
                        <normal x="0.420076" y="0.583175" z="0.695301" />
                        <texcoord u="2.20506" v="0.217455" />
                    </vertex>
                    <vertex>
                        <position x="4.08621" y="14.7806" z="6.42355" />
                        <normal x="0.433503" y="0.286322" z="0.854456" />
                        <texcoord u="1.79244" v="0.522846" />
                    </vertex>
                    <vertex>
                        <position x="9.99759" y="16.3372" z="1.38245" />
                        <normal x="0.698421" y="0.531478" z="0.479311" />
                        <texcoord u="2.97686" v="0.0968456" />
                    </vertex>
                    <vertex>
                        <position x="11.0235" y="16.7644" z="-0.382347" />
                        <normal x="0.814045" y="0.236502" z="0.530469" />
                        <texcoord u="3.17599" v="-0.0290602" />
                    </vertex>
                    <vertex>
                        <position x="9.53412" y="16.7757" z="1.01385" />
                        <normal x="0.412821" y="0.800843" z="0.433854" />
                        <texcoord u="2.87849" v="0.00490338" />
                    </vertex>
                    <vertex>
                        <position x="6.64199" y="15.3338" z="5.26825" />
                        <normal x="0.391826" y="0.504166" z="0.769603" />
                        <texcoord u="2.31191" v="0.386925" />
                    </vertex>
                </vertexbuffer>
            </geometry>
        </submesh>
    </submeshes>
</mesh>
----------

and here is a material file:

----------
material Examples/CloudySky
{
	technique
	{
		pass
		{
			lighting off
			depth_write off

			texture_unit
			{
				texture clouds.jpg
				scroll_anim 0.15 0
			}
		}
	}
}
----------

As you can see the material format is not XML. I think this is historical. This material show simple material animation. It is a scrolling cloud texture.

All pretty simple!

## #6 — Martin — 2006-07-11
<https://www.cheetah3d.com/forum/index.php?threads/769/post-4914>

Hi,
the mesh XML format looks indeed very easy. To export such a file the "Simple ASCII Export.js" script should be a good starting point.

Doesn't the mesh XML format contain any transformations etc. Or are all object vertices given in the global coordinate system?

Later you can convert the XML file with the commandline converter to a binary file using OS.system().

When would you need the transformation animation data? Would be a function OK which returns the object transformation matrix at a certain time. Decomposing that matrix shouldn't be difficult then. I could also add a function to the matrix class which perform the matrix decomposition for you. 

Bye,
Martin

## #7 — cmarrin — 2006-07-11
<https://www.cheetah3d.com/forum/index.php?threads/769/post-4921>

[[QUOTE:  Martin said: the mesh XML format looks indeed very easy. To export such a file the "Simple ASCII Export.js" script should be a good starting point. Click to expand... ]]

Yes, that is what I have started with. It gave me lots of good hints, like how to convert the local vertices into global.

[[QUOTE:  Martin said: Doesn't the mesh XML format contain any transformations etc. Or are all object vertices given in the global coordinate system? Click to expand... ]]

Right, the mesh vertices all need to be in the same coordinate system. Of course, you can add a transformation hierarchy and all. For instance, in my proposed XML syntax:

    <Group translation="1 2 3">
        <Mesh rotation="0 1 0 0.707" url="foo.mesh"/>
    </Group>

In my node set, the Mesh node can be transformed because I wrap the Ogre Mesh node in an Ogre SceneNode (the object that can be transformed). This makes Mesh and Group peers so they can be more easily intermixed. But all this transformation is done outside the .mesh format itself.

[[QUOTE:  Martin said: Later you can convert the XML file with the commandline converter to a binary file using OS.system(). Click to expand... ]]

Yes! I plan to do just that.

[[QUOTE:  Martin said: When would you need the transformation animation data? Would be a function OK which returns the object transformation matrix at a certain time. Decomposing that matrix shouldn't be diffi]]

You mean when during the save process, or how soon? I would appreciate anything you could give me, as soon as you are able. I could take the data in as raw a form as you have. For instance, in the FCurve editor you show the x,y and z positions as separate values, so that would be fine. But just getting the matrix would be useful as well. And having access to a decomp function in that case would be very useful.

I envision something like an animation() function on an object, which would return an Object containing properties named for which element is being animated. Each property would be an array of data that animated that element. It could have both numbers and strings. For instance, if you're animating the position, the returned object might look something like:

    { "position" : [0, "linear", -0.5, 0, 0, 3.5, "linear", 0.5, 0, 0],
       "scale" : [0, "linear", 1, 1, 1, 3.5, "linear", 2, 2, 2 ] }

This would animate position and scale, each having two keyframes at 0 and 3.5 seconds. If the key types is something other than linear, there would be extra numeric values to describe the splines.

But I could use the data in as raw a form as you have it, as long as I can understand the format and have supporting functions (like decomp) to deal with it.

## #8 — Martin — 2006-07-11
<https://www.cheetah3d.com/forum/index.php?threads/769/post-4928>

Hi,
I've added two functions to the Javascript API. They will be in the next v3.4 beta.

1. Doc::animationEnd()
This function return the time point where the animation ends. (the end of the red bar in the time line)

2. Base::getParameter(String paraname, Number time)
Returns the parameter value at a certain time point.

I think these two functions should be enough to get the animation data out of Cheetah3D. Sorry but I can't give you access to the FCurve data yet. 

Bye,
Martin

## #9 — cmarrin — 2006-07-12
<https://www.cheetah3d.com/forum/index.php?threads/769/post-4929>

I think these will be fine for now. What sorts of parameter names can I use? Can I use this to get the position, orientation, etc.? Is the returned value a Mat4D or something like that? If so, do you plan to add a decomposition function to Mat4D?

I can use all this to simply get evenly spaced keyframes which I can use to drive a linear animation. So it will work fine. I might even add some logic to detect the change in key value so I can reduce the number of keyframes to only those necessary. 

I look forward to playing with this!

## #10 — Martin — 2006-07-13
<https://www.cheetah3d.com/forum/index.php?threads/769/post-4942>

[[QUOTE:  cmarrin said: I think these will be fine for now. What sorts of parameter names can I use? Click to expand... ]]

Use the "ParameterInfo.js" script to check out the available parameters of an object. See attached image.

[[QUOTE:  cmarrin said: Can I use this to get the position, orientation, etc.? Click to expand... ]]

Yes of course.

[[QUOTE:  cmarrin said: Is the returned value a Mat4D or something like that? If so, do you plan to add a decomposition function to Mat4D? Click to expand... ]]

No, it return the actual position, scale, etc, vector. So no matrix decomposition is necessary. 

[[QUOTE:  cmarrin said: I can use all this to simply get evenly spaced keyframes which I can use to drive a linear animation. So it will work fine. I might even add some logic to detect the change in key value]]

You can do that of course.

Bye,
Martin

Attachments: [Cheetah3DSchnappschuss001.jpg](https://www.cheetah3d.com/forum/index.php?attachments/957/)
