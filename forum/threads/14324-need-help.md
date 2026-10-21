# Need help

- Thread: https://www.cheetah3d.com/forum/index.php?threads/14324/
- Subforum: scripting-general
- Started by **filip c** on 2023-09-13; last post 2023-09-17; 7 posts

## #1 — filip c — 2023-09-13
<https://www.cheetah3d.com/forum/index.php?threads/14324/post-127343>

Hi guys,
I tried creating a script to retarget animation  from one skeleton to another by copying the pose and adding orient constraints, but I failed miserably… any help is very appreciated.
I’m horrible at programming, but I want to try something to use Cheetah with mixamo (rig) and cascadeur (animate) 

	
	


```
// removed some embarrassing code…
```

## #2 — CpH — 2023-09-16
<https://www.cheetah3d.com/forum/index.php?threads/14324/post-127353>

Reminds me of Parameter Copy.js

Links: http://www.tres-graficos.jp/blog/files/search.php?k=copy&d=&p=0&c=0&pn=1&f=

## #3 — filip c — 2023-09-16
<https://www.cheetah3d.com/forum/index.php?threads/14324/post-127354>

[[QUOTE:  CpH said: Reminds me of Parameter Copy.js Click to expand... ]]
Thanks for the tip, I think I’m getting closer… I’ll post my next try here later!

## #4 — filip c — 2023-09-16
<https://www.cheetah3d.com/forum/index.php?threads/14324/post-127355>

[[QUOTE:  CpH said: Reminds me of Parameter Copy.js Click to expand... ]]
Thanks for the tip, I think I’m getting close… I’ll post my next try here later!

## #5 — filip c — 2023-09-16
<https://www.cheetah3d.com/forum/index.php?threads/14324/post-127356>

Was thinking on making it work throughout the whole skeleton, but after testing I really like how it works now…it’s more flexible as a retargeting tool… 
	
	


```js
// Tool script ( ~/Library/Application Support/Cheetah3D/scripts/Tool to install )
//

function buildUI(tool) {
    tool.addParameterSeparator("Retarget");

    tool.addParameterLink("copy from", false);

    tool.addParameterButton("apply to selected", "ok", "copyParameters");
}

function copyParameters(tool) {
    var copyFrom = tool.getParameter("copy from");
    var copyTarget = tool.document().selectedObject();

    if (!copyFrom || !copyTarget) return;

    if (copyTarget.recordParametersForUndo) copyTarget.recordParametersForUndo();

    copyTarget.setParameter("rotation", copyFrom.getParameter("rotation"));

    // Add an ORIENTCONSTRAINTTAG to the target object and link it to the source object
    var constraintTag = copyTarget.addTagOfType(ORIENTCONSTRAINTTAG); // ORIENTCONSTRAINTTAG without double quotes
    constraintTag.setParameter("target", copyFrom);

    copyTarget.update();
}
```

## #6 — filip c — 2023-09-17
<https://www.cheetah3d.com/forum/index.php?threads/14324/post-127357>

I managed to give it an option to apply it to the children too… 
Now I want to make an option to add a point constraint to just the base and maybe apply the orientations/orientconstraints based on names…
All in all, I’m starting to like this retargeting script.

	
	


```js
//
// Tool script ( ~/Library/Application Support/Cheetah3D/scripts/Tool to install )
//

function buildUI(tool) {
    tool.addParameterSeparator("Retarget");

    tool.addParameterLink("copy from", false);

    // Add a checkbox parameter for enabling recursion
    tool.addParameterBool("Recursive", true);

    tool.addParameterButton("apply to selected", "ok", "copyParameters");
}

function copyParameters(tool) {
    var copyFrom = tool.getParameter("copy from");
    var selectedObject = tool.document().selectedObject();
    var recursive = tool.getParameter("Recursive"); // Get the value of the checkbox

    if (!copyFrom || !selectedObject) return;

    if (recursive) {
        // Copy parameters recursively and pass the tool as a parameter
        copyParametersRecursive(selectedObject, copyFrom, tool);
    } else {
        // Copy parameters for the selected object only
        selectedObject.recordParametersForUndo();
        selectedObject.setParameter("rotation", copyFrom.getParameter("rotation"));

        // Add an ORIENTCONSTRAINTTAG to the selected object
        var constraintTag = selectedObject.addTagOfType(ORIENTCONSTRAINTTAG); // Remove double quotes from ORIENTCONSTRAINTTAG
        constraintTag.setParameter("target", copyFrom);
      
        selectedObject.update();
    }
}

function copyParametersRecursive(copyTarget, copyFrom, tool) {
    if (!copyTarget || !copyFrom) return;

    if (copyTarget.recordParametersForUndo) copyTarget.recordParametersForUndo();

    // Copy the "rotation" parameter from copyFrom to copyTarget
    copyTarget.setParameter("rotation", copyFrom.getParameter("rotation"));

    // Add an ORIENTCONSTRAINTTAG to the target object and link it to the source object if recursion is enabled
    var recursive = tool.getParameter("Recursive"); // Get the value of the checkbox
    if (recursive) {
        var constraintTag = copyTarget.addTagOfType(ORIENTCONSTRAINTTAG); // Remove double quotes from ORIENTCONSTRAINTTAG
        constraintTag.setParameter("target", copyFrom);
    }

    // Recursively copy parameters and add constraint tags for child objects
    var copyTargetCount = copyTarget.childCount();
    var copyFromCount = copyFrom.childCount();

    for (var i = 0; i < Math.min(copyTargetCount, copyFromCount); i++) {
        var copyTargetChild = copyTarget.childAtIndex(i);
        var copyFromChild = copyFrom.childAtIndex(i);

        // Pass the tool as a parameter to the recursive call
        copyParametersRecursive(copyTargetChild, copyFromChild, tool);
    }

    copyTarget.update();
}
```

## #7 — filip c — 2023-09-17
<https://www.cheetah3d.com/forum/index.php?threads/14324/post-127359>

I finished  see here

Links: https://www.cheetah3d.com/forum/index.php?threads/14327/
