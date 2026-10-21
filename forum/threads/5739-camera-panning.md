# Camera Panning

- Thread: https://www.cheetah3d.com/forum/index.php?threads/5739/
- Subforum: scripting-general
- Started by **healewis** on 2010-05-15; last post 2010-06-14; 12 posts

## #1 — healewis — 2010-05-15
<https://www.cheetah3d.com/forum/index.php?threads/5739/post-42451>

Camera Panning

 Hi, I am trying to rotate my camera around an object   can anyone tell me if there is a tuition video on here some where or if there is a thing I can click on to do this:frown:  I'm as green as the grass with 3d drawing and animation so please excuse my ignorance  
Thanks in anticipation of a helpful reply

paul

## #2 — Francois — 2010-05-15
<https://www.cheetah3d.com/forum/index.php?threads/5739/post-42455>

[[QUOTE:  healewis said: Hi, I am trying to rotate my camera around an object can anyone tell me if there is a tuition video on here some where or if there is a thing I can click on to do this:frown: I'm as gr]]

Hi Paul,
- Add a spline circle object, centered on your object.
- Add a spline tracking tag ( path=circle ) and a target tag ( target=your object) to your camera
- Animate the position parameter of the spline tracking tag
- Adjust size and height of the circle to ... your taste
- See the attached screenshot

Attachments: [Image 5.jpg](https://www.cheetah3d.com/forum/index.php?attachments/10701/)

## #3 — healewis — 2010-05-18
<https://www.cheetah3d.com/forum/index.php?threads/5739/post-42639>

Hi Francois :icon_thumbup: thanks for the reply, I have done what you have said and got my camera to pan around my object but, I can not seem to animate it??   Is there something else I need to set up prior to animation/

Thanks again for your help

Paul

## #4 — fused — 2010-05-18
<https://www.cheetah3d.com/forum/index.php?threads/5739/post-42644>

Select the spline tracking tag and right hand mouse click the animation record button at the bottom of the document window. This will give you the properties you can animate.

## #5 — DarthSidious05 — 2010-05-20
<https://www.cheetah3d.com/forum/index.php?threads/5739/post-42743>

Yes, the spline circle track for the camera is probably a best approach, as without it, rotating the camera around a single object requires a lot of adjustments to reduce the uneven fluctuations in the camera's movement.

## #6 — healewis — 2010-05-20
<https://www.cheetah3d.com/forum/index.php?threads/5739/post-42746>

[[QUOTE:  fused said: Select the spline tracking tag and right hand mouse click the animation record button at the bottom of the document window. This will give you the properties you can animate. Click to exp]]
 Thanks fused, but that went straight over my head  Where is the document window and the animation button please :frown: :redface:

## #7 — fused — 2010-05-20
<https://www.cheetah3d.com/forum/index.php?threads/5739/post-42749>

The document is the document window and the record button is a red circle at the bottom of the window.

## #8 — healewis — 2010-05-30
<https://www.cheetah3d.com/forum/index.php?threads/5739/post-43043>

[[QUOTE:  fused said: The document is the document window and the record button is a red circle at the bottom of the window. Click to expand... ]]

Thanks guys for the reply, Sorry for the late response but I've been trying to get it to work but without success  Can anyone tell me what the settings should read when I click on the red dot because I get different preference options when I put the spline tracking, target and circle in? Or Im I missing something:frown:

## #9 — Francois — 2010-05-30
<https://www.cheetah3d.com/forum/index.php?threads/5739/post-43044>

Hi Paul,

[[QUOTE:  healewis said: Thanks guys for the reply, Sorry for the late response but I've been trying to get it to work but without success Can anyone tell me what the settings should read when I click on the r]]

I think you should at least start by reading once the Animation/Timeline section in the help file ... !
As I said earlier, you need to animate the position parameter of the spline tracking tag and therefore record twice the position parameter (first with a 0 value and then with a 1 value). To understand what you are doing, switch the camera into the perspective view. Then Select the spline tracking tag. In the timeline, record the position. Move the timeline to eg 4 sec. Then look at the camera and modify the position value. Record again and then run the animation.

## #10 — healewis — 2010-06-01
<https://www.cheetah3d.com/forum/index.php?threads/5739/post-43129>

[[QUOTE:  Francois said: Hi Paul, I think you should at least start by reading once the Animation/Timeline section in the help file ... ! As I said earlier, you need to animate the position parameter of the sp]]
Hi Francois, thanks for the reply, I have read the Animation/Timeline before but wasn't sure what the setting should be when I right clicked the red dot? I am animating now and fingers crossed ,for me, that I have it this time.  

I recorded the first position in camera view, moved the time line, changed to spline tracker view, moved the object, changed to camera view again and recorded the new position. This is how I understood your most recent reply Francois,  now all i have to do is wait for about 5 hours to let it animate

## #11 — healewis — 2010-06-01
<https://www.cheetah3d.com/forum/index.php?threads/5739/post-43140>

That didn't work  I may be trying to run before I can crawl   The drawing was easy (ish) some animation, I understand! I'll have to step back, I think and start a fresh.

Attachments: [onlake.jpg](https://www.cheetah3d.com/forum/index.php?attachments/10875/)

## #12 — healewis — 2010-06-14
<https://www.cheetah3d.com/forum/index.php?threads/5739/post-43620>

got it thanks francois and all who replied

Hi I finally got what you were saying so thanks all who answered

heres a link http://www.youtube.com/watch?v=H-E8-wRoaCs

Links: http://www.youtube.com/watch?v=H-E8-wRoaCs
