# Newbie, general modeling issues

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3912/
- Subforum: scripting-general
- Started by **Encrypt** on 2009-02-11; last post 2009-02-14; 11 posts

## #1 — Encrypt — 2009-02-11
<https://www.cheetah3d.com/forum/index.php?threads/3912/post-27267>

Newbie, general modeling issues

Hi,
I am playing with the demo, actual starting to understand the interface, which is good.

So I read with a defleating heart about the booleaning objects trianglating the objects involved.

So my question is, how do I combine two objects?
What I want is for a cube to stick out of the top of a sphere, but i want it to be one object not two.

Sorry if this is a dumb question.

Oh, I just chopped the top of a sphere, how do i close the hole, so the hoel is replaced by a polygon and i have a solid object again?

Thanks
G

## #2 — uncle808us — 2009-02-12
<https://www.cheetah3d.com/forum/index.php?threads/3912/post-27269>

Hole

"Oh, I just chopped the top of a sphere, how do i close the hole" 

Look up fill hole and optimize (polygon tools) and Import Children in (Tools)   in the help.

## #3 — Encrypt — 2009-02-12
<https://www.cheetah3d.com/forum/index.php?threads/3912/post-27276>

Hmmmm, not sure I could find fill hole, I did try close hole.
I was looking for a fill hole command so that sounds right.

Thanks

## #4 — uncle808us — 2009-02-12
<https://www.cheetah3d.com/forum/index.php?threads/3912/post-27283>

Modeling

[[QUOTE:  Encrypt said: Hmmmm, not sure I could find fill hole, I did try close hole. I was looking for a fill hole command so that sounds right. Thanks Click to expand... ]]
Here Ya go

## #5 — Encrypt — 2009-02-12
<https://www.cheetah3d.com/forum/index.php?threads/3912/post-27296>

Ah, I understand now, or rather i dont, it seems to be the reverse i would expect for that tool to work, which is why i couldnt get it to work 

Thanks for the help, much appricated.

I do have another question, when I just deleted some polygons from the object, (used polygon select then delete) it seemed to leave behind the points, as when i entered point mode to select a point for fill hole I could see the points i would have expected to be deleted.  
Is this expected behaviour.

Thanks
G

## #6 — frank beckmann — 2009-02-12
<https://www.cheetah3d.com/forum/index.php?threads/3912/post-27297>

[[QUOTE:  Encrypt said: Is this expected behaviour. Click to expand... ]]

Yes, because one can use these points to rebuild a mesh via "create polygon".
If you want to delete needless points use the "optimize" tool, where you can tell "remove unused vertices".

Cheers
Frank

## #7 — Margus16 — 2009-02-13
<https://www.cheetah3d.com/forum/index.php?threads/3912/post-27313>

And how is this related to general scripting?
Please read the program´s manual before posting.
best wishes 
Margus

## #8 — Encrypt — 2009-02-13
<https://www.cheetah3d.com/forum/index.php?threads/3912/post-27319>

Sorry I hadnt realised I had got the wrong forum, i thought i had got general modeling/newbie area, is it not possible to move the thread?

Have to say the help I have got here has been great, i think this is going to take me a while, but have started to enjoy it using Cheetah, now to figure out this booleans thing, not sure i can model without booleans!!

I know the booleans are there, but they triangle everything.

THanks again.

## #9 — frank beckmann — 2009-02-13
<https://www.cheetah3d.com/forum/index.php?threads/3912/post-27320>

We´ll find questions wherever you will post them 
Martin will move the thread to its right place next time he is online as admin.
Don´t worry.

Cheers
Frank

## #10 — Margus16 — 2009-02-14
<https://www.cheetah3d.com/forum/index.php?threads/3912/post-27326>

well, booleans are great but they tend to create too many useless ponts. I have a bit older version of cheetah so maybe this is already fixed. 
I don´t mind if beginners ask simple questions but i think that reading the manual gives answers faster.
best wishes
Margus

## #11 — Encrypt — 2009-02-14
<https://www.cheetah3d.com/forum/index.php?threads/3912/post-27332>

Well I am using the current demo version, and yeah booleans do seem to add extra points and edges.
Funny thing, in trueSpace there used to be a trick, if your model was starting to have to many points, you would just subtract a square from it, that aint going to work here 

Manuals and me tend not to get on, they tend to explain things in a why that dosnt stick in my mind, its like my brain just slips off the page.
