# Access Joint Orientation From Script

- Thread: https://www.cheetah3d.com/forum/index.php?threads/13297/
- Subforum: scripting-general
- Started by **dwn** on 2019-03-24; last post 2020-01-22; 3 posts

## #1 — dwn — 2019-03-24
<https://www.cheetah3d.com/forum/index.php?threads/13297/post-115685>

I'm writing a custom animation exporter and have most of it working but the joint orientation is giving me trouble. Using the parameter info script, I can see the 'pivot' and 'rotorder' parameters, which I assume are the ones I care about.

The pivot parameter is supposed to be a Vec3D. Since it has no take nodes (which makes sense, since it shouldn't be animatable), how do I access the value of the parameter?

Also, if 'pivot' does not hold the joint orientation, what parameter does?

Edit:

Reading through the scripting threads it looks like the 'prerot' and 'postrot' (and perhaps 'prefrot') parameters are actually what I need to look at. I still need to know how to actually access their values.

## #2 — dwn — 2019-03-24
<https://www.cheetah3d.com/forum/index.php?threads/13297/post-115686>

Okay, I think I figured it out.

The documentation claims that base.getParameter( "name" ) has a return type of 'void', which to a C programmer means "does not have a return value". I was therefore using base.parameterWithName( "name" ).

Using getParameter instead I can access the value as expected.  Now to see if that extra transform solves my animation problem.

## #3 — wholder — 2020-01-22
<https://www.cheetah3d.com/forum/index.php?threads/13297/post-118983>

I'm also interested in writing a custom exporter, but haven't gotten as far as it sound like you have.  Are you willing to share your script?
