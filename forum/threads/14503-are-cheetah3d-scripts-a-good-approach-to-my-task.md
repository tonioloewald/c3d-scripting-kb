# Are Cheetah3D Scripts a good approach to my task ?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/14503/
- Subforum: scripting-general
- Started by **elenzil** on 2025-03-02; last post 2025-03-02; 2 posts

## #1 — elenzil — 2025-03-02
<https://www.cheetah3d.com/forum/index.php?threads/14503/post-128867>

Hello !
I've been using Cheetah3D for .. it looks like 15 years, wow !
But I have not dipped my toe into scripting during that time.

What I would like to do is have a script which inputs a handful of discrete polygon objects and a handful of parameters,
and constructs a scene graph of the input shapes based on the parameters according to my own algorithm.

More specifically I want a fancy version of "Array", where it's inherently 2D, and pieces at the edges and pieces at the corner are treated specially.

I'm very comfortable with programming and 3D math,
so I'm tempted to just write something from scratch,
but if Cheetah's scripting seems like a good fit, that's probably a better approach.

Is there a scripting manual somewhere ?
Cheetah's scripting Help is extremely close-up.

here's some psuedo-code for the sort of thing I'd like to do:

func arrange(int width, int height, float offsetX, float offsetY, object interior, object edge) {
    parent = new object().
   
    for (j = 0; j < height; ++j) {
        for (i = 0; i < width; ++i) {
            isEdge = (j % (height - 1) == 0) || (i % (width - 1) == 0).
            child = parent.newChild().
            child.transform.relativePosition = vec3(i * offsetX, 0, j * offsetY).
            child.object = isEdge ? edge : interior.
        }
    }

    return parent.
}

okay, any pointers greatly appreciated !

happy Spring

## #2 — Helmut — 2025-03-02
<https://www.cheetah3d.com/forum/index.php?threads/14503/post-128868>

*    For a simplish primary analysis I suggest that you have a look at some existing Java scripts (to be found under Application Support>Cheetah3D>Scripts>etc).  You can investigate any of the .JS documents using BBEdit or any text editor..
*    If useful, you can modify any of these scripts to provide some feedback to the C3D console, displaying variables in a loop or whatever.
