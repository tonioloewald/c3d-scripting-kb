# polygon script question

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6840/
- Subforum: scripting-general
- Started by **murcielago** on 2011-01-31; last post 2011-02-08; 7 posts

## #1 — murcielago — 2011-01-31
<https://www.cheetah3d.com/forum/index.php?threads/6840/post-55261>

polygon script question

I want to remove duplicate triangles from a mesh.  The triangles may be in different polygon objects.

Is the best approach to create an array of all triangles, then sort and compare them?

Thanks in advance

## #2 — frank beckmann — 2011-01-31
<https://www.cheetah3d.com/forum/index.php?threads/6840/post-55302>

In the meantime you can go "Selection"-> "Select Triangles". You can determine the double ones by the darker red shading.

Cheers
Frank

Attachments: [DoubledTris.png](https://www.cheetah3d.com/forum/index.php?attachments/13750/)

## #3 — tg_jp — 2011-02-02
<https://www.cheetah3d.com/forum/index.php?threads/6840/post-55392>

hi

I tried to write sample script for it. please check it. I hope it will help.

regards.

tg_jp, Hiroto.

Attachments: [Triangle Detector.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/13766/)

## #4 — murcielago — 2011-02-07
<https://www.cheetah3d.com/forum/index.php?threads/6840/post-55627>

tanx

Frank and Hiroto,

Thanks for the response.  I'll check both of those out.
Much appreciated.

## #5 — murcielago — 2011-02-07
<https://www.cheetah3d.com/forum/index.php?threads/6840/post-55628>

Triangle Detector question

Hiroto,

If I need to compare triangles in different polygon objects or groups, do I need to compare the global (world?) vertices instead of the local?

thanks in advance

## #6 — tg_jp — 2011-02-07
<https://www.cheetah3d.com/forum/index.php?threads/6840/post-55657>

hi

[[QUOTE:  murcielago said: Hiroto, If I need to compare triangles in different polygon objects or groups, do I need to compare the global (world?) vertices instead of the local? thanks in advance Click to expa]]

yes. you have to get 4x4 matrix via "obj2WorldMatrix()" function from each polygon objects, and apply its matrix to vertices before comparing.

regards.

tg_jp, Hiroto

## #7 — murcielago — 2011-02-08
<https://www.cheetah3d.com/forum/index.php?threads/6840/post-55666>

tanx

thanks Hiroto.
u r d man.
