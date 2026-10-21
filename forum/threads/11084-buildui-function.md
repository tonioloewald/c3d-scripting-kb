# buildUI() function

- Thread: https://www.cheetah3d.com/forum/index.php?threads/11084/
- Subforum: scripting-general
- Started by **aaronparr** on 2015-03-10; last post 2015-03-11; 4 posts

## #1 — aaronparr — 2015-03-10
<https://www.cheetah3d.com/forum/index.php?threads/11084/post-93916>

buildUI() function

While trying to figure out why my script was crashing Cheetah3D, I found this in the documentation:

[[QUOTE:  Please call this function only in the buildUI() function. Click to expand... ]]

Question 1:
What is special about buildUI() ?

Question 2:
My current script is a file importer, and I am calling it from the Macro Scripts folder. So iut begins execution in the main() function. Can I also include a buildUI() function in the same script and call it from the execution that starts in main()?

What I want to do is add custom properties to objects that I am generating by script. I am importing an MDL used by the neverwinter nights game. The objects in an MDL have a number of custom properties used by the game, and I want to apply these properties to Cheetah objects as I create them from the MDL during import.

## #2 — aaronparr — 2015-03-10
<https://www.cheetah3d.com/forum/index.php?threads/11084/post-93918>

In regards to my second question, I don't believe you can call buildUI() from main(). I crashed when calling this code from main:

	
	


```js
function buildUI(node_current)
{
  alert("buildUI()");
  node_current.addParameterString("Classification", mdl_classification);
  node_current.addParameterString("Supermodel", mdl_supermodel);
  node_current.addParameterFloat("Animation Scale", mdl_animationscale);
  node_current.addParameterString("File Dependancy", mdl_filedependancy);
}
```


I was able to verify that the function was called, and the alert (my custom alert) executed, but then after that the application crashed just as it had before I moved that code to buildUI. Those 4 variables are global so I could ensure the data would be available without having to pass them in as properties on node_current.

I may have to rewrite my import and export scripts as tool scripts if I can't add properties from main(). I didn't want to handle this that way, but whatever works.

I am also open to other ideas if you have any. Thanks.

## #3 — aaronparr — 2015-03-11
<https://www.cheetah3d.com/forum/index.php?threads/11084/post-93923>

OK. So adding parameters appears to be extraordinarily limited, and I don't understand why. Some help would be great here.

I created a tool script so I could use buildUI() to add parameters. Even when adding parameters in buildUI() to an object created in the script Cheetah3D crashes.

Adding parameters to the tool pane works fine, but thats only useful for a one use tool. I want to add parameters to folders, and polygonal objects that I can adjust in the GUI.

Now I'd be happy to define my own tag, and add that to an object. I'll look into script tags, and applying a script tag from another script dynamically. The documentation doesn't indicate how to specify which script a tag of type script uses however... gonna take some investigation, and I'm not sure if its possible.

All in all I suspect I've got some features to request here.

## #4 — aaronparr — 2015-03-11
<https://www.cheetah3d.com/forum/index.php?threads/11084/post-93925>

OK. I figured out the problem. In javascript you can usually use any number of arguments, but if you avoid using any of the arguments in this case it causes a crash. I was ignoring the booleans at the end.

Now to rewind and sort through what actually works and does not.
