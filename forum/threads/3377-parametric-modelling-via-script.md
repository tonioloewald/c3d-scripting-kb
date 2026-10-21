# parametric modelling via script

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3377/
- Subforum: scripting-general
- Started by **giulioandrea** on 2008-08-05; last post 2008-08-13; 15 posts

## #1 — giulioandrea — 2008-08-05
<https://www.cheetah3d.com/forum/index.php?threads/3377/post-23930>

parametric modelling via script

See picture as an example.
This is a box with a louvered top.
Each louver is an instance of a typical louver.
The typical louver is generated as an extrusion of a spline.
The spline is controlled by 8 key point.

The question is:
is it possible to drive the key points of the spline from a set of data contained in a text file?

Assuming that the spline has 8 key point, I would need a file containing 24 values.
I would need to access such a text file (tab delimitation would be great) and import an array to use for the displacement of each point.

Is anybody out there with an example or something to start with. 
Perhaps even a very schematic idea.
I just purchased Cheetah and I am really looking forward to learn.

:icon_thumbup: 

G.

Attachments: [Archive.zip](https://www.cheetah3d.com/forum/index.php?attachments/5338/)

## #2 — tg_jp — 2008-08-06
<https://www.cheetah3d.com/forum/index.php?threads/3377/post-23934>

hi, it's an interesting project. 

could you send a sample text data file ( any delimiter will be ok, tag or comma, and so on. )? if this is related in another your post ( about automatic things ), I can show you some sample script for it.

Cheetah3D JS has 5 types of scripts. install folder, base functions are different. actually, which type you should use, it depends on what you do make with script.

pelase check this.

http://www.cheetah3d.de/forum/showthread.php?t=989

in your case, it better to choose spline script.

regards.

tg_jp, Hiroto.

Links: http://www.cheetah3d.de/forum/showthread.php?t=989

## #3 — giulioandrea — 2008-08-06
<https://www.cheetah3d.com/forum/index.php?threads/3377/post-23947>

Yes, it is related.
The idea is that cheetah is waiting for a file, once the file, the content is read.
The content is a matrix.

In this application the matrix is a set of point coordinates for the louver spline. 
I enclose the file format I am thinking to use.

The code for the waiting part is 50% ok, see the other post.
The code to read and create something is 0%.

Thanks a lot for your help,
Giulio

Attachments: [data.txt](https://www.cheetah3d.com/forum/index.php?attachments/5344/)

## #4 — tg_jp — 2008-08-07
<https://www.cheetah3d.com/forum/index.php?threads/3377/post-23954>

hi,

this is a sample spline script ( into scripts/Splineobj folder ). after creating this spline object from script menu, set data file by clicking 'set'. if you want to delete file after reading data, check on 'auto delete' checkbox.

the parameter "timer" is for updating automatically ( with calling buildObject() function ) while scene is animated. if data file is updated and this object is ANIMATED with changing 'timer' parameter, object read new data file automatically.
actually, if rainbow-cursor will be ok, you can use while() loop for it. 

I wrote some comments in the script file, please check it. sorry, poor english.

regards.

tg_jp, Hiroto

Attachments: [Para Spline.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/5349/), [Cheetah3D_sz_002.jpg](https://www.cheetah3d.com/forum/index.php?attachments/5350/)

## #5 — giulioandrea — 2008-08-07
<https://www.cheetah3d.com/forum/index.php?threads/3377/post-23955>

WOW!
this is great
I am looking forward to try this.
Thank you so much!
I will post an animation in the next few days.
G.

## #6 — giulioandrea — 2008-08-10
<https://www.cheetah3d.com/forum/index.php?threads/3377/post-23997>

ok, I checked the code and it is great to learn from you.
I have a loooooot to try now! :redface: 
I am going to make some changes:

I think I will use a macro script, because I do not need to create a new spline, but to change the current shape (correct? did I get this right?).

The macro should start after an object is selected form the scene.
(in this case it has to be that spline...)

then given a time limit (2 hours?):
while we are within the time limit and iteration is less than max iteration:
-look for a file 
-when the file is available read it
-take a vector from the file and use it in a custom function to deform spline
-save document as obj
-update iteration value
-reset time limit
end

I think it is very similar to what you gave me already. 
Plus I can grab some other stuff from the obj exporter and other scripts.

Thanks again for the great code and help.
Speak you soon,
:icon_thumbup: 
G

PS no animation for now...

## #7 — giulioandrea — 2008-08-10
<https://www.cheetah3d.com/forum/index.php?threads/3377/post-24000>

Very close but not quite there yet...
the various file checks are implemented and the obj export as well.

The problem is how to 'update' a spline with data from the text (which is read with the script) ?
I used the original code and port it to a macro script, because I need the doc and obj (selected object?).
Now the spline does not update anymore and cheetah crashes.
Ideas? What am I doing wrong?

Also another quick question, I am using BBedit for the code. Is there anything more suitable for cheetah? How do you debug?

The code with data files is enclosed, I am ashamed to ask... but it would be great if you could have a look.
:redface: 

Thanks a lot anyway!
G.

Attachments: [data and N.zip](https://www.cheetah3d.com/forum/index.php?attachments/5360/), [MACRO.zip](https://www.cheetah3d.com/forum/index.php?attachments/5361/)

## #8 — tg_jp — 2008-08-11
<https://www.cheetah3d.com/forum/index.php?threads/3377/post-24009>

hi,

I checked your file. I didn't test it, but I have some points to know you.

line.66: you set point_cache.length to 0, this causes to reset point_cache in any case. this code should be written in if (data_file != ''... and if (iter_file != '' block? 

line.114: some type check code will be better. like obj.type() == SPLINE.

did you have any error message when cheetah3D crashed in Console or Crash Reporter?

regards.

tg_jp, Hiroto.

## #9 — giulioandrea — 2008-08-11
<https://www.cheetah3d.com/forum/index.php?threads/3377/post-24010>

enclosed is the crash report and the modified script.

to test the script:
you need to edit the path in the script to something on your HD, line 5.

to start you need a spline in a file, select it.

you need to create a file 'doit.txt' to start the process (echo > doit.txt)
whenever this file is in the right place the macro starts.

N.txt and data.txt should be in the same folder so that the macro can read them (if they are not there the central part is just skipped)

you need to create a file stop.txt to stop the search (echo > stop.txt).

The problem: if the 'updateObjecct block' is not enabled all works.
the data is read and all the other things are ok.
the problem seems to be just there, in the code that updates the vertexes.
in your original script you used objectbuild, may be is that?
no idea...
 

anyway thanks again for the good suggestions!
G.

Attachments: [Archive.zip](https://www.cheetah3d.com/forum/index.php?attachments/5368/)

## #10 — tg_jp — 2008-08-11
<https://www.cheetah3d.com/forum/index.php?threads/3377/post-24027>

hi,

I tested your file. as you wrote, it is not work and crash. line drawing code  would be problem, I'm guessing it should be cleared all existing line before drawing new spline, but no deleting api for it :?: .
so I have an idea,

Macro script + Spline script.

1. macro script set point_cache variable of spline script, and update() call.
2. spline script make spline with its point_cache variable in buildObject() block.

check code will be ( obj.type == SCRIPTSPLINE && obj.getParameter("something") == 'something for specification' ).. 

or simply spline script only with 'run' button. 

regards.

tg_jp, Hiroto

## #11 — giulioandrea — 2008-08-12
<https://www.cheetah3d.com/forum/index.php?threads/3377/post-24036>

The main objective is to update the spline and not to create a new one. The reason is that the spline is into a nested object and use for extrusions and array. 
A new spline would be generated outside of the object (like in your original script) and would not update the main object (the louvered ceiling).
Perhaps I am wrong here.. is there a way to create a new spline in the same place and delete the old one from the model?

anyway,
If I understood you are also suggesting to run a main macro script which calls a spline script. What is the syntax to cross call scripts?

Thanks a lot
G>

## #12 — tg_jp — 2008-08-12
<https://www.cheetah3d.com/forum/index.php?threads/3377/post-24039>

hi

I have 2 suggestions for your project, according to your last post.

1. Use Spline script. all main() code go to runMain() block. it is very easy and will be same after clicking 'run' button to macro version.

	
	


```js
function buildUI(obj) {
    obj.setParameterButton('run loop','run','runMain');
}

function runMain(obj) {
    var doc = obj.document();
    
    .... almost same to Spline_server.js code
    
    //if (point_cache is updated) obj.update()
}

function buildObject(obj) {

    //drawSpline with point_cache.

}
```


2. Macro script + Spline script. macro script just only call obj.update() for spline script. line drawing code is inside of buildObject() of spline script. but sorry, I misunderstood about that the script could set some variables of another script object directly. so, some temporary file is required for this.

	
	


```
// Spline_server.js
    write out point_cache values to some point_cache file, and object.update() call.

// Spline_client.js
    draw spline with point_cache file in buildObject() block.
```


you can change object's hierarchy with 'addChildAtIndex()', but I coudn't find API for removing object from document. so, deleting old one and creating new one, is not work this time, I think. :?:

actually, I didn't test actual script. just in my brain. some problem would be happened. I hope it would be your help.

regards.

tg_jp, Hiroto

## #13 — tg_jp — 2008-08-12
<https://www.cheetah3d.com/forum/index.php?threads/3377/post-24040>

hi,

I attached a sample code for spline script version (No.1 at my last post). it seems to work, but 3d view is not updated while 'while' loop, and UI is locked. if you want to check how is going at 3d view directly, another approach will be needed not using 'while' loop. ( not while loop, but animation loop? )

regards.

tg_jp, Hiroto.

Attachments: [Spline_client.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/5379/)

## #14 — giulioandrea — 2008-08-12
<https://www.cheetah3d.com/forum/index.php?threads/3377/post-24068>

YEAH! :icon_thumbup: 
The script now works and I owe you a lot!
I enclose an animation just done plus the scene and the matlab part.
to render i use radiance (opensource).  if you wish to use it and need help just let me know!

TO DO, IN FUTURE:
I would like not to have to create a new spline (the paraspline) and have to move into the correct object position ( array and extrusion) : ideally this would be done directly by the script... but never mind for now it's fine!
I will see if and how I can improve things, and I am sure I will ask you more in the future!

Thanks again for all your help
Ciao
G>

Attachments: [test_cheetah.zip](https://www.cheetah3d.com/forum/index.php?attachments/5382/)

## #15 — giulioandrea — 2008-08-13
<https://www.cheetah3d.com/forum/index.php?threads/3377/post-24072>

update, after one night rendering I found the disk full... 
6 GB of log file:

"Cheetah3D(20253,0xa000d000) malloc: *** set a breakpoint in szone_error to debug
Cheetah3D(20253,0xa000d000) malloc: *** error for object 0x211ae00: Object already freed being freed
Cheetah3D(20253,0xa000d000) malloc: *** set a breakpoint in szone_error to debug
Cheetah3D(20253,0xa000d000) malloc: *** vm_allocate(size=1069056) failed (error code=3)
Cheetah3D(20253,0xa000d000) malloc: *** error: can't allocate region"
.....
...
..

will try to investigate on this but anyway I am happy.
It basically works. Thanks again!
G>
