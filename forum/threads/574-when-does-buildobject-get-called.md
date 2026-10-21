# when does buildObject get called?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/574/
- Subforum: scripting-general
- Started by **ToddWR** on 2006-03-30; last post 2006-05-23; 11 posts

## #1 — ToddWR — 2006-03-30
<https://www.cheetah3d.com/forum/index.php?threads/574/post-3695>

when does buildObject get called?

Martin,
I am trying to write a polygon script in which the second object inside of it controls some attribute of the first object. this is working fine when in preview, but when I try to animate the second object it moves and the first object is not affected. Can I guess that buildObject is not being called during animating?

also are Tag scripts only to add properties to objects or is there a call that allows a Tag script to affect an object it is attached to?

thanks
Todd

## #2 — Martin — 2006-03-30
<https://www.cheetah3d.com/forum/index.php?threads/574/post-3699>

Hi,
if you want to write a "creator object" script you have to call the "setCreatorObj()" function. So Cheetah3D knows that it has to update once one of it's childs changes.

	
	


```js
function buildUI(obj){
    obj.setParameter("name","Menger");
    
    obj.addParameterInt("interations",2,0,3,true,true);
    obj.addParameterBool("removeHidden",true,true,true);

    obj.setCreatorObj(true);
}
```


The tag scripts are mainly a place holder at the moment. In the future the tag scripts will get functions which are called once the time changes.

By,
Martin

## #3 — ToddWR — 2006-03-31
<https://www.cheetah3d.com/forum/index.php?threads/574/post-3704>

Martin,
I've tried what you said, and it seems to lock cheetah up. Here is what I am trying to do:

	
	


```js
function buildUI(obj){
    
    obj.setParameter("name","Watch Object");
    
    obj.addParameterFloat("Initial H",0,-180,180,true,true);
    obj.addParameterFloat("Initial P",0,-180,180,true,true);
    obj.addParameterFloat("Initial B",0,-180,180,true,true);
    obj.setCreatorObj(true);
}

function buildObject(obj){
	var n = obj.childCount();
	var d = obj.getParameter("distance");
	var hh = obj.getParameter("Initial H");
	var pp = obj.getParameter("Initial P");
	var bb = obj.getParameter("Initial B");
	if (n > 1) {
		var c1 = obj.childAtIndex(0);
		var c2 = obj.childAtIndex(1);
		var p1 = c1.getParameter("position");
		var p2 = c2.getParameter("position");
	
		var dx = p2.x - p1.x;
		var dy = p2.y - p1.y;
		var dz = p2.z - p1.z;
		var a = Math.atan2(dy,dx);
		var b = 0.0;
		b = 0; //Math.atan2(dz,dx);
		var c = Math.atan2(dz,dy);
		// change from rads to degrees
		a = a / 3.141592 * 180.0;
		b = b / 3.141592 * 180.0;
		c = c / 3.141592 * 180.0;
		c1.setParameter("rotation",new Vec3D(c+hh,b+pp,a+bb));
		
	}
}
```


what I am trying to achieve is to have the first object always point in the direction of the second object, as you can see I am still playing with the math. Before the "obj.setCreatorObj(true);" line is inserted, it all works fine in preview mode. Objects show up and move. with the addtion of the line they disappear and when the second object is moved, cheetah seems to hang. Am I doing something wrong?

thanks 
Todd

## #4 — Martin — 2006-03-31
<https://www.cheetah3d.com/forum/index.php?threads/574/post-3713>

Hi,
the problem is that you are calling the setParameter() function within the buildObject() function. 
But the setParameter() functions internally calls the buildObject() function to update the scenegraph. So you end in an infinite loop.

I will add a setParameter() function to Cheetah3D 3.2 which doesn't automatically update the hole scene graph. Then it should be possible to use setParameter() calls within the buildObject() function.

By,
Martin

## #5 — ToddWR — 2006-04-01
<https://www.cheetah3d.com/forum/index.php?threads/574/post-3723>

A more usefull sugguest?

Martin,
Instead of making another setParameters call, would it be possible to impliment a tagValuesChanged(obj) call so that if any values setup in buildUI were changed it would get called and then when setParameter was called resulting in calling buildObject wouldn't be in a loop. also it would make more sense to attach this sort of function as a tag object. just my two cents.

Thanks
Todd

## #6 — Martin — 2006-04-01
<https://www.cheetah3d.com/forum/index.php?threads/574/post-3733>

Hi,
I've just overloaded the setParameter() call. So if you need you can add another boolean parameter which tells if you want to update the scenegraph after you've changed a parameter.

In general I plan to add the functionality you need to a tag. For example that a timeDidChange() or updateBeforeRedraw() function will be called in a Tag script. That will make it quite easy to write tags which follow a certain object.

By,
Martin

## #7 — ToddWR — 2006-05-18
<https://www.cheetah3d.com/forum/index.php?threads/574/post-4303>

Martin,

I've been ttrying to use the new setParameter("position",v,false); but it still seems to end up in an infinate loop when previewing animation. I've tried it both ways, true and false - same result....

And - is there any way to call compiled code from javascript?

Todd

## #8 — Martin — 2006-05-21
<https://www.cheetah3d.com/forum/index.php?threads/574/post-4328>

Hi,
sorry that was a bug. For some cases it works for some not. But I was able to fix that problem. It will work robustly with the next update (v3.3).

You can run command line tools with the OS.system() Javascript call. So you can write the data to a file. Process the data of the file with a command line tool and save it back to the file. Afterward you can reload the data into Cheetah3D with Javascript.

By the way I'm already considering to support Angelscript http://www.angelcode.com/angelscript/ which is a very nice and powerful scripting language and which is up to 5 times faster then Javascript. 
I've also already realized that Javascript is to slow to do some serious computations.

Bye,
Martin

Links: http://www.angelcode.com/angelscript/

## #9 — ToddWR — 2006-05-21
<https://www.cheetah3d.com/forum/index.php?threads/574/post-4346>

Martin,
the reason for calling native code is computing the next scene based on the current scene. although it could be done the way you have described, it seems like a long way to go to acheive what I desire to do.

thanks anyway
Todd

## #10 — Martin — 2006-05-23
<https://www.cheetah3d.com/forum/index.php?threads/574/post-4362>

Hi,
yes I know that it isn't to comfortable. What do you intend to do? Is is just a problem of missing Javascript speed or do you want to use some existing C code.

By,
Martin

## #11 — ToddWR — 2006-05-23
<https://www.cheetah3d.com/forum/index.php?threads/574/post-4367>

Martin,
its more or less missing speed. not real complex calculations, just ALOT of them. actually its kind of cool to see some of the things I'm doing it cheetah work. I'll send you a script.
