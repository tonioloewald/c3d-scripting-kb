# structures in JS or the new angelscript?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1053/
- Subforum: scripting-general
- Started by **ToddWR** on 2006-11-15; last post 2006-11-20; 9 posts

## #1 — ToddWR — 2006-11-15
<https://www.cheetah3d.com/forum/index.php?threads/1053/post-6580>

structures in JS or the new angelscript?

Martin,
is there any way to achieve a struct inside of the script now? if not can this be added esaily?

thanks,
big things a brewing on this side of things
Todd

## #2 — Martin — 2006-11-17
<https://www.cheetah3d.com/forum/index.php?threads/1053/post-6633>

Hi,
Javascript doesn't offer structures which makes it quite inconvenient to implement some algorithms. Javascript 2.0 will offer classes but if I understood it right Javascript 2.0 won't be finished before 2008.

Angelscript offers structures and classes. That's one of the reasons why I think Angelscript will be a excellent scripting language for Cheetah3D.

What do you intend to do with structures.

Bye,
Martin

## #3 — ToddWR — 2006-11-19
<https://www.cheetah3d.com/forum/index.php?threads/1053/post-6658>

Martin,

I am working on a rather large script, that I beleive will be very popular. I have figured out a way to do structs in the current javascript. given:

	
	


```
struct {
    int a;
    float b;
    Vec3D c;
    Mat4D d;
} SomeStruct;
```

this can be used as a struct by doing the following:

	
	


```js
 var SS_a = 1;
 var SS_b = 2;
 var SS_c = 3;
 var SS_d = 4;
// this is sort of an enum, I use the struct name as a prefix
// to avoid name clashing
 var a_struct = new Array();
 a_struct[0] = "SomeStruct"; // just doing this internally
 a_struct[SS_a] = 15;
 a_struct[SS_b] = 3.141259
 a_struct[SS_c] = new Vec3D(1,2,3);
 a_struct[SS_d] = new Mat4D();

 AFunction(a_struct);  // use the structure
...
function AFunction(s) {
    // instead of s.a, use
    print(s[SS_a]);
}
```


this way structs can be any size and passed as arguments

Todd

(HINT: think arbaro)

## #4 — Martin — 2006-11-19
<https://www.cheetah3d.com/forum/index.php?threads/1053/post-6664>

Hi,
yes you can use arrays of course. They are just not as comfortable as structs but a very viable workaround. 

Bye,
Martin

## #5 — keebOo — 2006-11-19
<https://www.cheetah3d.com/forum/index.php?threads/1053/post-6680>

[[QUOTE:  Martin said: Angelscript offers structures and classes. That's one of the reasons why I think Angelscript will be a excellent scripting language for Cheetah3D. Bye, Martin Click to expand... ]]

in wich release?

## #6 — Martin — 2006-11-20
<https://www.cheetah3d.com/forum/index.php?threads/1053/post-6686>

Hi,
currently working mainly on the character animation stuff. Neveretheless I'm also working parallel on new scripting features like Anglescript. But it probably won't appear before a 4.x update. Even although it is already working principally. See screenshot below.

Bye,
Martin

Attachments: [Cheetah3DSchnappschuss001.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1355/)

## #7 — Eureka! — 2006-11-20
<https://www.cheetah3d.com/forum/index.php?threads/1053/post-6688>

Hi,
Is that how the new version of cheetah will look with the different pla/stop keys. I can't wait untill it's out (hopefully before Christmas):icon_thumbup: . Will character animation be out before 4.0? If so, a beta realise would be nice.

Greg

## #8 — Martin — 2006-11-20
<https://www.cheetah3d.com/forum/index.php?threads/1053/post-6693>

Hi,
the new timeline is a 3.6 feature. You won't have to wait to long to use it.

Bye,
Martin

## #9 — Eureka! — 2006-11-20
<https://www.cheetah3d.com/forum/index.php?threads/1053/post-6695>

Hi,
That's cool. It looks a lot more polished.
Thanks for the quick reply,

Greg

P.S. Could you add horizontal mouse scrolling? Like the Final Cut timeline has.
