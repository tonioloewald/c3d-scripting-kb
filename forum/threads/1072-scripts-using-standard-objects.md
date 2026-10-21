# scripts using standard objects

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1072/
- Subforum: scripting-general
- Started by **Herb** on 2006-11-20; last post 2006-11-22; 5 posts

## #1 — Herb — 2006-11-20
<https://www.cheetah3d.com/forum/index.php?threads/1072/post-6681>

scripts using standard objects

Hi,
I would like to write a script to generate objects that I need frequently, for example an arrow, built from the standard objects cone and cylinder.
However, I have no clue how to do that.
Can anybody help?
Thank's

## #2 — Martin — 2006-11-20
<https://www.cheetah3d.com/forum/index.php?threads/1072/post-6691>

Hi,
the "Document" class has a addObject() function to add a new object. See also the documentation of the scripting API.

Once you've created a new object you can set it's position, rotation or scale with setParameter("position",new Vec3D(1,2,3)) for example.

Bye,
Martin

## #3 — Herb — 2006-11-21
<https://www.cheetah3d.com/forum/index.php?threads/1072/post-6704>

still in the fog

Hi Martin,
sorry, but new to Javascript I still have problems. I tried (among others) the following and only got crashes:

function buildUI(obj){
    obj.setParameter("name","Cone");
}

function buildObject(obj){
    var cone1=obj.document();
         cone1.addObject(CONE);
         cone1.setParameter("position",new Vec3D(1,2,3));
}

## #4 — Martin — 2006-11-22
<https://www.cheetah3d.com/forum/index.php?threads/1072/post-6719>

Hi,
I will try to post a small example script  tomorrow.

Bye,
Martin

## #5 — Martin — 2006-11-22
<https://www.cheetah3d.com/forum/index.php?threads/1072/post-6729>

Hi,
this small script should explain your question. Please see also the comments in the script itself.

Bye,
Martin

Attachments: [CreateObjects.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/1365/)
