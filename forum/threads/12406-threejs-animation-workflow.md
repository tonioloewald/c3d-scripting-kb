# threejs animation workflow

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12406/
- Subforum: scripting-general
- Started by **podperson** on 2017-04-22; last post 2019-02-11; 3 posts

## #1 — podperson — 2017-04-22
<https://www.cheetah3d.com/forum/index.php?threads/12406/post-107126>

threejs animation workflow

I've been considering building a threejs exporter for Cheetah 3D based on this:

http://unboring.net/workflows/animation.html

I believe it can be done as a C3D script (not sure if all the skin weight stuff is available via the javascript API; if not it would need to parse C3D's XML data). It's likely to be quite a bit of work to get the animation stuff working (and keep it working — it appears to rely on undocumented features of threejs's json file format, which are presumably in flux).

Anyone done anything along these lines? Anyone interested in such a script?

Links: http://unboring.net/workflows/animation.html

## #2 — classic12 — 2019-01-15
<https://www.cheetah3d.com/forum/index.php?threads/12406/post-114944>

Did you make any progress?

## #3 — Martin — 2019-02-11
<https://www.cheetah3d.com/forum/index.php?threads/12406/post-115301>

I think a glTF workflow (introduced with Cheetah3D 7.3) should work pretty well with threejs.
