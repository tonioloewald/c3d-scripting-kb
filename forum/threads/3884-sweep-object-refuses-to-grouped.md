# Sweep Object Refuses to Grouped

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3884/
- Subforum: scripting-general
- Started by **fruMurf** on 2009-02-01; last post 2009-02-02; 2 posts

## #1 — fruMurf — 2009-02-01
<https://www.cheetah3d.com/forum/index.php?threads/3884/post-27113>

Sweep Object Refuses to Grouped

I created a shoe lace using sweep. Great so far. Then I copied the shoelace and rotated, sized etc to fit in lace holes of shoe. No problem. But when I went to group they all went haywire turned upsidedown and backwards. Same happened when I tried to use Boolean. What's an artist to do?

## #2 — fruMurf — 2009-02-02
<https://www.cheetah3d.com/forum/index.php?threads/3884/post-27120>

Sweep Problem Work Around

Instead of creating my SWEEP object and make it editable I first created 4 copies of the path and 4 copies of thing to follow the path which I named leader with the same number copies of SWEEP. Numbering them so I wouldn't get confused.  So once I placed and sized to fit on my main object I could group without a problem.
