# copy keyframes in hierarchy

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12955/
- Subforum: scripting-general
- Started by **broozar** on 2018-06-26; last post 2019-01-13; 11 posts

## #1 — broozar — 2018-06-26
<https://www.cheetah3d.com/forum/index.php?threads/12955/post-112548>

copy keyframes in hierarchy

hi everyone,

i have a model file and several separate animation files. All share "the same" skeleton.

I know I can copy the keyframes from the animated skeleton onto the static skeleton, and it looks fine, however but I have to do this for all joints individually. with large hierarchies, this is very tiring.

I need a script that takes one joint hierarchy A, loops through it, copies all the keyframes, and applies them to every bone in hierarchy B with the same name. Is there such a script, or would it be possible to provide me with one? 

Thanks in advance.

Links: http://somepic.someserver.de/pics/big/8f7995ea2922147d27f8060464ad1c65.png

## #2 — broozar — 2018-07-02
<https://www.cheetah3d.com/forum/index.php?threads/12955/post-112615>

bump.

i read in another thread from a while ago that keyframe data cannot be accessed through scripting, is this still the case?

## #3 — tg_jp — 2018-07-17
<https://www.cheetah3d.com/forum/index.php?threads/12955/post-112779>

Hi,

current version of scripting system can access all f-curve data of any objects.

Hiroto

## #4 — ash72 — 2019-01-11
<https://www.cheetah3d.com/forum/index.php?threads/12955/post-114908>

I’m having the same issue I believe. I want to basically chain the different animation sequences together sequentially along the time line. When I tried doing this the chained or pasted key-frames were  coming out wonky, probably because I was only pasting the top part of the hierarchy on the key framed joints. I need to check and see if that was the reason.

## #5 — ash72 — 2019-01-11
<https://www.cheetah3d.com/forum/index.php?threads/12955/post-114911>

Yes it was!  I was only copying the root hierarchy. 

So Broozar method does work. In other words, you need to manually copy/paste each level of the joint hierarchy manually. When you average around 30 joint hierarchies for the average character... thats a lot of copy/paste & tabbing back and forth between files... its a terrible workflow!

So if the f-curves can be accessed by scripting it would seem that would be a very productive script!  Can anyone reference me to a similar script which works with the joint hierarchy, f-curves... as a reference point to write a new script?

## #6 — misoversaturated — 2019-01-11
<https://www.cheetah3d.com/forum/index.php?threads/12955/post-114912>

Hi Ash,
 a new keyframe transfer script would be great!
See here for another f-curve script by Hiroto.

Links: https://www.cheetah3d.com/forum/index.php?threads/12344/

## #7 — ash72 — 2019-01-11
<https://www.cheetah3d.com/forum/index.php?threads/12955/post-114913>

I saw that one. Thanks.

## #8 — frank beckmann — 2019-01-12
<https://www.cheetah3d.com/forum/index.php?threads/12955/post-114916>

You probably miss one step: hold shift key down while selecting the root joint (hierarchical keyframing needs to be enabled) - then copy from time-line (RMB-click->copy) go to new file/hiererchy - again shift select root joint and paste into time-line (RMB-click->paste).

Cheers
Frank

## #9 — ash72 — 2019-01-12
<https://www.cheetah3d.com/forum/index.php?threads/12955/post-114917>

Ok. Awesome Frank! Will check that when I get a moment.

## #10 — ash72 — 2019-01-13
<https://www.cheetah3d.com/forum/index.php?threads/12955/post-114933>

Yep. That did the trick. Seems logical after the fact. But it only takes one little thing in your workflow to be missing... like making sure you select the root hierarchy in both the file you copy from and the file you copy to.

## #11 — frank beckmann — 2019-01-13
<https://www.cheetah3d.com/forum/index.php?threads/12955/post-114934>

[[QUOTE:  ash72 said: But it only takes one little thing in your workflow to be missing Click to expand... ]]
I thought this was clear here: 

[[QUOTE:  again shift select root joint and paste into time-line Click to expand... ]]

Cheers
Frank
