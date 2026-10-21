# Praise and Physics

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1752/
- Subforum: scripting-general
- Started by **NoshBar** on 2007-05-23; last post 2007-05-24; 5 posts

## #1 — NoshBar — 2007-05-23
<https://www.cheetah3d.com/forum/index.php?threads/1752/post-11709>

Praise and Physics

Hello everybody!

I just got a Mac last week, and decided to try Cheetah3D...
A week later I've bought it, as it's the easiest animation tool I've ever used, and works the same way my head does... so thank you Martin, and well done!

Pardon me if I'm being rude, but I was thinking about the physics thing, and looked through posts already made...

If:
1) there was a proper physics tag (/the existing one extended), that included weight, group ID, whether it was collidable etc
2) AngelScript allowed getting/setting of object position
3) AngelScript allowed loading of external modules

... then a script could load an external physics engine (Tokamak is open source as of today, hooray!), and it wouldn't matter about the license.

I understand that you'd want to include it as a proper feature, but being new, I'm still overly keen, and would love to see/do this.

Please forgive me if I've overstepped my mark.

Thanks again for making the program I've always wanted to finish, and to everyone else who has already contributed so much and convinved me to buy Cheetah.

NoshBar

## #2 — Willem — 2007-05-23
<https://www.cheetah3d.com/forum/index.php?threads/1752/post-11710>

I'm curious as to what you would want a physics engine for in a modeling application?  I guess I could see it for rendering movies where things fall over but other than that ...  ??

## #3 — podperson — 2007-05-23
<https://www.cheetah3d.com/forum/index.php?threads/1752/post-11712>

It's amazingly useful to be able to "place an object on another object". Some 3d packages let you turn physics on and off in the modeling environment. Suddenly, some things you normally would need to do painfully by magnifying a scene and viewing it from multiple angles, you can do by drag and drop.

Next, animation -- not just of stuff like fluids and things falling apart and exploding -- benefits hugely from physics. E.g. in various high-end 3d packages (e.g. Cinema 4D) you can build clothing out of a crude mesh and then "drape it" over a figure, tighten the cloth, and so on. All this is done using quite complex physical simulation.

It's incredibly hard to draw or sculpt correctly draped cloth (indeed, sculpting a figure draped with cloth was the "final exam" for apprentice sculptors to become journeymen in some traditions) -- imagine how hard animating it manually would be...

Similarly hair and particles look a lot better when done with physics.

## #4 — NoshBar — 2007-05-23
<https://www.cheetah3d.com/forum/index.php?threads/1752/post-11713>

What PodPerson said 

The ability to place objects (with or without using some external loadable module from a script) opens up a whole new world.

The explosion script currently pulls things apart by polygon... but you could make an explosion in the middle of a scene, and have entire objects react accordingly, flying through the air, bouncing off objects marked as static, etc.

Also, fluid... I remember back when Novodex was still Novodex, and the liquid simulation, even faked at low resolution, was fantastic.

## #5 — Willem — 2007-05-24
<https://www.cheetah3d.com/forum/index.php?threads/1752/post-11718>

OK, I can see some of that stuff being useful.
