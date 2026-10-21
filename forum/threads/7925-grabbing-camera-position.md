# Grabbing camera position

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7925/
- Subforum: scripting-general
- Started by **Nichod** on 2011-12-02; last post 2017-03-29; 11 posts

## #1 — Nichod — 2011-12-02
<https://www.cheetah3d.com/forum/index.php?threads/7925/post-65471>

Grabbing camera position

Is there a way to grab the camera position and link it with materials?

## #2 — Francois — 2011-12-03
<https://www.cheetah3d.com/forum/index.php?threads/7925/post-65475>

[[QUOTE:  Nichod said: Is there a way to grab the camera position and link it with materials? Click to expand... ]]

Can you explain what you mean by "link it with materials" ? Do you want to track some specific materials on some objects ? If yes, why ?

## #3 — Nichod — 2011-12-03
<https://www.cheetah3d.com/forum/index.php?threads/7925/post-65477>

I want the material to adjust its settings depending on the position of the camera.

## #4 — podperson — 2011-12-03
<https://www.cheetah3d.com/forum/index.php?threads/7925/post-65482>

It's definitely possible to grab the camera position. It's just an object with the usual properties.

As to driving a material's properties... this is more difficult.

It may, however, be possible to get the result you desire without any scripting at all ... e.g. if you animate the scene and keep the camera static then you can use the state position attribute to determine position relative to camera.

AFAIK the material system as a whole is not scriptable but there are two possible ways (I can think of) for a script to talk to the material system -- UVs and material assignment settings (i.e. the object properties associated with material assignment). Your shader tree can then pull information out of the state or instance nodes and use that to drive other properties.

A simple example: you could set up your UVs so that you use UV1 as actual UVs and simply use UV2 for communicating between script and material. Then you can pull UV2 out of the state node. (You could also presumably adjust the "w" values in UV1 without affecting 2d material mappings.)

Suppose you want to adjust the material's transparency based on camera position -- you tell your script to assign the same UV coordinate to every vertex of the mesh (e.g. u = alpha) and then pull the u out of UV1 and point that to transparency.

This is a horrible kludge and Martin may make things easier some time.

## #5 — Francois — 2011-12-03
<https://www.cheetah3d.com/forum/index.php?threads/7925/post-65486>

[[QUOTE:  Nichod said: I want the material to adjust its settings depending on the position of the camera. Click to expand... ]]

Sorry but still not clear at all what you are after. You want the material to adjust its settings but which settings ? What kind of material ?  What is the end purpose ?
Rather than guessing can you please give/explain a clear and simple example of what you have to start with and what you want to achieve. It shouldn't be that difficult to supply a basic basic file, right ?

## #6 — Nichod — 2011-12-05
<https://www.cheetah3d.com/forum/index.php?threads/7925/post-65508>

I want to adjust texture, shader, gradient, etc settings via script. It's a bit long-winded to explain. So I am asking generally what is possible and it looks like from podperson's answer the access is limited.

The simplest example would be say changing a gradient color based on the camera position. Or perhaps based on another objects position.

## #7 — podperson — 2011-12-05
<https://www.cheetah3d.com/forum/index.php?threads/7925/post-65509>

In the worst case you can simply animate the material's properties. This might not be as convenient as tying positions to nodes, but it is (a) very simple, and (b) supremely flexible.

I've attached two examples. The simpler one just goes from black to white from time = 0 to time = 1.

The second runs across a gradient between time = 0 and time = 1/whatever you multiply the time value by.

Attachments: [Screen Shot 2011-12-05 at 1.25.16 PM.PNG](https://www.cheetah3d.com/forum/index.php?attachments/16068/), [Screen Shot 2011-12-05 at 1.25.43 PM.PNG](https://www.cheetah3d.com/forum/index.php?attachments/16069/)

## #8 — Nichod — 2011-12-05
<https://www.cheetah3d.com/forum/index.php?threads/7925/post-65510>

Is time accessible in scripting? So I could tell the node where in time to be via an objects position?

ps. not in front of cheetah...hence me asking

## #9 — podperson — 2011-12-05
<https://www.cheetah3d.com/forum/index.php?threads/7925/post-65511>

If you're not rendering an animation then none of this matters, right? You just set your texture how you want it for that specific render. For an animation you'd just set up your gradient to have the right values at each specific moment. This is a kludge -- it's not a perfect substitute for scripting materials directly.

The approach I described earlier -- where you use a script to set the UVs of a mesh and the you pull those values out of the state note -- would allow you to do the exact thing you're asking, but it's more work.

As per Francois's post -- tell us what you're actually specifically trying to do and we may have better suggestions.

## #10 — Tomas — 2017-03-27
<https://www.cheetah3d.com/forum/index.php?threads/7925/post-106589>

Opening up this old thread to see if it is now possible to do it in C3D, or if there is a script for this. I can't find one.
Thank you :smile:

## #11 — tg_jp — 2017-03-29
<https://www.cheetah3d.com/forum/index.php?threads/7925/post-106629>

Hi

[[QUOTE:  Nichod said: Is time accessible in scripting? So I could tell the node where in time to be via an objects position? ps. not in front of cheetah...hence me asking Click to expand... ]]

you can get current time or object's position directly.

* object position Object::getParameter("position") / current time ( Doc:: animPosition() )

and with Cheetah3D v.7. you can access all material node or parameter via scripting. so it's available to control material ( changing node value or tag enabled switch, which ever ) with an object position.

Best

tg_jp, Hiroto
