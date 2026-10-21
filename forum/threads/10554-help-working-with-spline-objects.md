# Help working with spline objects

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10554/
- Subforum: scripting-general
- Started by **McShaman** on 2014-07-14; last post 2014-07-18; 6 posts

## #1 — McShaman — 2014-07-14
<https://www.cheetah3d.com/forum/index.php?threads/10554/post-88722>

Help working with spline objects

I am trying to work out the centre point of a spline. However this has proven to be more difficult than first expected. I figured I would have to get the SplineCore and then calculate each point in the spline to work out the centre… However there doesn't seem to be a way to work with each point in a spline.

Can somebody please point me in the right direction?

Thanks

## #2 — McShaman — 2014-07-14
<https://www.cheetah3d.com/forum/index.php?threads/10554/post-88723>

Looks like you can get the general shape from the SplineCore.cache()

However I have two troubles with this:

1. If your draw a spline from top view so that the y coordinate doesn't change from 0 then you loop through each Vec3D you will find most of the Vec3D's show the y coordinate with a value.

This value is a little weird in that it has a letter 'e' followed by a hyphen '-' followed by a number. e.g.

'x' => "-2.1767666339874268"
'y' => "1.2102125968027622e-9"
'z' => "-2.306105375289917

What does this mean!?

2. How would you make changes to the spline?

## #3 — KurtF — 2014-07-15
<https://www.cheetah3d.com/forum/index.php?threads/10554/post-88746>

I think that means the 'Y' value isn't quite at zero. Move the decimal point 9 places to the left from 1.2... and you get something like .0000000012, a very small value, but still not zero.

## #4 — McShaman — 2014-07-15
<https://www.cheetah3d.com/forum/index.php?threads/10554/post-88747>

Thanks for that KurtF. Must be a math thing 

Anybody else help me with question number 2?

## #5 — tg_jp — 2014-07-16
<https://www.cheetah3d.com/forum/index.php?threads/10554/post-88776>

hi

a function to delete point nor set point seems to be still missing, just create spline functions are available for now.

Best

tg_jp, Hiroto.

## #6 — McShaman — 2014-07-18
<https://www.cheetah3d.com/forum/index.php?threads/10554/post-88805>

Thanks tg_jp!
