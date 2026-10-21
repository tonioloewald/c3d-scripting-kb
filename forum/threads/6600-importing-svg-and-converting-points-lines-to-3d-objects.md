# Importing SVG and converting points/lines to 3d objects

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6600/
- Subforum: scripting-general
- Started by **ibzero** on 2010-11-30; last post 2017-01-20; 8 posts

## #1 — ibzero — 2010-11-30
<https://www.cheetah3d.com/forum/index.php?threads/6600/post-52301>

Importing SVG and converting points/lines to 3d objects

Hi,
I'm new to cheetah but so far i'm impressed with the ease of use.  I'm having a little trouble understanding how best to accomplish the following.

I have SVG file of a graph (sample attached) and I want to import it and then have the lines converted to tubes/cylinders and the nodes converted to disks.

Since the lines are imported as bezier splines, is there a way to take an instance of an object and then do a copy parameterized instance to splines?  If so any pointers would be appreciated.  (Basically hoping I don't have to manually extrude each spline/line and add the points.

Thanks,
IB

Attachments: [smallworld_100.svg.zip](https://www.cheetah3d.com/forum/index.php?attachments/13043/)

## #2 — frank beckmann — 2010-11-30
<https://www.cheetah3d.com/forum/index.php?threads/6600/post-52302>

Hi and welcome.
Are you expecting a scriptable solution as we are in the scripting area of the forum? If not - have a closer look into the attached file and let´s hope it might help you start with your project.
Your SVG is quite scary and I don´t know what you´re after right now.
I made a simple file from 2 splines and Cheetah3d´s instancing system. That means I have a ball per control point and a sweep object from the same spline plus a six-sided edge spline as a diameter.

Have fun.

Cheers
Frank

Attachments: [InstancingPerSpline.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/13044/), [InstancingPerSpline.jpg](https://www.cheetah3d.com/forum/index.php?attachments/13045/)

## #3 — ibzero — 2010-11-30
<https://www.cheetah3d.com/forum/index.php?threads/6600/post-52307>

Frank,
Thanks for the quick turn around.  Your example helps, but I was hoping for a scriptable solution (programmer/designer by trade).  The SVG is a social network graph and I need to be able to import several of these and turn them into 3D objects (although really they'll be 2d planes extruded and overlaid onto of some 3D environment scenery.  

I would like the lines to act as springs for animation purposes (e.g. one of the visualizations involves introducing an impulse on a node and watching the waveform propagate through the network.  I did find another post where you mention importing as pdf (this worked better for me and I was able to extrude) but when importing as a pdf it treats the entire network as one object which is problematic as i need to be able to color nodes and edges as part of the animation.

I'll take a deeper look at the example you sent and see if I can get where i need to go.  If I haven't made things clearer in the above, please disregard and i'll wait till i can ask a better question.

Thanks,
IB

## #4 — tg_jp — 2010-12-03
<https://www.cheetah3d.com/forum/index.php?threads/6600/post-52407>

Hello

here is script's approach. please check it.

it's a Tool script, so place it into ~/Library/Application Support/Cheetah3D/scripts/Tool folder.

I tested with your file, and some my svg file.

regards.

tg_jp, Hiroto.

Attachments: [SVG Graph Loader.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/13094/), [ch_SvgGraphSample.jpg](https://www.cheetah3d.com/forum/index.php?attachments/13095/)

## #5 — ibzero — 2010-12-03
<https://www.cheetah3d.com/forum/index.php?threads/6600/post-52423>

This is awesome, I had to resort to manually doing this for a short term deadline, but this is exactly what I was looking for to start diving into the scripting capabilities of C3D. 

Thanks again, its refreshing to find a true community around a tool and with such helpful guru's. 

IB

## #6 — ibzero — 2010-12-03
<https://www.cheetah3d.com/forum/index.php?threads/6600/post-52424>

Oh and for the search engines: This is a possible solution/pipeline for visualizing network graphs in 3D with gephi and cheetah3d

## #7 — Oval — 2017-01-20
<https://www.cheetah3d.com/forum/index.php?threads/6600/post-105450>

[[QUOTE:  tg_jp said: Hello here is script's approach. please check it. it's a Tool script, so place it into ~/Library/Application Support/Cheetah3D/scripts/Tool folder. I tested with your file, and some my sv]]

Great script, thank you!
I'll take it for my own future script.

But it has some minor bug in S(s) svg tag handling.

here is mine:

	
	


```
...
[B]var cpx_last,cpy_last = 0;[/B]
...
case 'C':
...
[B]cpx_last = px2;
cpy_last = py2;[/B]
...

case 'c':
...
[B]cpx_last = px2;
cpy_last = py2;[/B]
...

case 'S':
var pos = dm[2].split(/[ \s,]+/);
//print( 'S4:' + pos.length + ':' + pos );
for (i = 0;i < pos.length;i=i+4) {
px[B]2[/B] = parseFloat( pos[i] );
py[B]2[/B] = parseFloat( pos[i+1] );
[B]px1 = px + (px - cpx_last);
py1 = py + (py - cpy_last);[/B]
px = parseFloat( pos[i+2] );
py = parseFloat( pos[i+3] );
[B]cpx_last = px2;
cpy_last = py2;[/B]
[B]splcore.curve(  ( new Vec3D( px1, 0, py1 ) ).multiply( scale ),
( new Vec3D( px2, 0, py2 ) ).multiply( scale ),
( new Vec3D( px , 0, py  ) ).multiply( scale ) );[/B]
...
case 's':
var pos = dm[2].split(/[ \s,]+/);
//print( 's4:' + pos.length + ':' + pos );
for (i = 0;i < pos.length;i=i+4) {
px[B]2[/B] = px + parseFloat( pos[i] );
py[B]2[/B] = py + parseFloat( pos[i+1] );
[B]px1 = px + (px - cpx_last);
py1 = py + (py - cpy_last);[/B]
px += parseFloat( pos[i+2] );
py += parseFloat( pos[i+3] );
[B]cpx_last = px2;
cpy_last = py2;[/B]
[B]splcore.curve(  ( new Vec3D( px1, 0, py1 ) ).multiply( scale ),
( new Vec3D( px2, 0, py2 ) ).multiply( scale ),
( new Vec3D( px , 0, py  ) ).multiply( scale ) );[/B]
```

you may see the difference in some control points.

Attachments: [Screenshot 2017-01-20 19.45.31.png](https://www.cheetah3d.com/forum/index.php?attachments/30341/), [Screenshot 2017-01-20 19.46.24.png](https://www.cheetah3d.com/forum/index.php?attachments/30342/)

## #8 — Oval — 2017-01-20
<https://www.cheetah3d.com/forum/index.php?threads/6600/post-105452>

Here the script.
Caution: before "Import" button clicking take the focus off from the scale parameter.

Attachments: [SVG Graph Loader.zip](https://www.cheetah3d.com/forum/index.php?attachments/30343/)
