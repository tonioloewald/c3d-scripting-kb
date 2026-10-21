# How do I test object type of native object

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10415/
- Subforum: scripting-general
- Started by **McShaman** on 2014-05-07; last post 2014-05-12; 4 posts

## #1 — McShaman — 2014-05-07
<https://www.cheetah3d.com/forum/index.php?threads/10415/post-87457>

How do I test object type of native object

Geeeez working with these native objects is really hard!

I am having trouble testing if something is an instance of a native object?

I am trying to check if a variable is an instance of a Vec3D using the following code:

	
	


```
var myVal = new Vec3D( 0, 0, 0 );
print( myVal instanceof Vec3D );
```


and I get the following error message:

[[QUOTE:  error: 'false' is not a function (evaluating 'print( myVal instanceof Vec3D )') Click to expand... ]]

Is there a way to achieve this?

## #2 — Martin — 2014-05-09
<https://www.cheetah3d.com/forum/index.php?threads/10415/post-87490>

Hi,
the print() function in Cheetah3D only accepts string values.  But even if you write something like 

	
	


```
var myVal = new Vec3D( 0, 0, 0 );
if(myVal instanceof Vec3D) 	print("is Vec3D");
else				print("is no Vec3D");
```


it doesn't return the right results. It looks like the instanceof operator doesn't work properly for custom classes. That's pretty wired. I'm sorry but I also don't know how to make the instanceof operator work properly.

Bye
Martin

## #3 — ToddWR — 2014-05-10
<https://www.cheetah3d.com/forum/index.php?threads/10415/post-87523>

```js
function instanceOf(ob,con)
{
    if( typeof con === "object")
        return ob.__proto__ === con.__proto__;
    return ob instanceof con;
}


var myVal = new Vec3D( 0, 0, 0 );
if(instanceOf(myVal, Vec3D) 	print("is Vec3D");
else				print("is no Vec3D");
```


the custom classes are returned as object not functions. use the above function to achieve what you desire. this is working in the five minutes I studied the problem.

Todd

## #4 — Martin — 2014-05-12
<https://www.cheetah3d.com/forum/index.php?threads/10415/post-87550>

Hi Todd,
thanks for finding a solution.:smile: 

Bye
Martin
