# Would it be possible...

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7947/
- Subforum: scripting-general
- Started by **ozzymandiaas** on 2011-12-10; last post 2011-12-12; 6 posts

## #1 — ozzymandiaas — 2011-12-10
<https://www.cheetah3d.com/forum/index.php?threads/7947/post-65660>

Would it be possible...

...to create a script you could attach to a plane which essentially says "Render only what is in front of this plane" or "render only what is beyond this plane"?

It would be extremely handy when rendering in layers for compositing.

Thanks.
oz

## #2 — SurfingAlien — 2011-12-10
<https://www.cheetah3d.com/forum/index.php?threads/7947/post-65669>

don't know about a script but a possible workaround could be grouping everything in front/beyond that ideal plane and exclude from rendering via Mode tag

cheers,
Alessandro

## #3 — ozzymandiaas — 2011-12-10
<https://www.cheetah3d.com/forum/index.php?threads/7947/post-65675>

You're right, Alessandro. That's pretty much how i've been dealing with it so far. Trouble is, there are often parts of a single mesh crossing the plane of what I want to see and not see and the mode option is only an all or nothing choice.

Another way i've handled it is to just slice the shot with a bright green plane and treat it like a green screen. But in that case it only works for the elements between the camera and the screen. There isn't really a way to render the reverse half with that technique.

## #4 — SurfingAlien — 2011-12-10
<https://www.cheetah3d.com/forum/index.php?threads/7947/post-65676>

so what you want is something like SketchUp section planes?

## #5 — ozzymandiaas — 2011-12-11
<https://www.cheetah3d.com/forum/index.php?threads/7947/post-65694>

Not sure frankly, I don't know sketchup at all.

## #6 — Martin — 2011-12-12
<https://www.cheetah3d.com/forum/index.php?threads/7947/post-65752>

Hi,
I guess you mean clipping planes. Unluckily such clipping planes can't be integrated via scripts. I would have to build them into the renderer by myself. So for the first the usage of folders is the best option.

Bye
Martin
