# document.selectedObject never null

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10088/
- Subforum: scripting-general
- Started by **Edward** on 2014-01-11; last post 2014-01-11; 1 posts

## #1 — Edward — 2014-01-11
<https://www.cheetah3d.com/forum/index.php?threads/10088/post-84404>

document.selectedObject never null

I noticed that the Parameter Info.js example script fails when no object is selected. The line 'if (obj==null)' is always false because document.selectedObject() is returning an invisible root node. Below I posted the fix and wonder if this is a bug or normal behavior?

	
	


```js
function main(doc){
    //get selected object
    var obj=doc.selectedObject();
    
    //test if there is a object
    if(obj.owner()==null){
	OS.beep();
	OS.messageBox("Error","Please select a object before calling that script.");
	return;
	}
    
    //get the parameter info array of the object
    var objinfo=obj.parameterInfo();
    
    print("*************************");
    print("**** Parameter Info ****");
    print("*************************");
    
    //print out the parameter info
    for(var i=0;i<objinfo.length;i++){
	print(objinfo[i][0] + "   [" + objinfo[i][1] + "]");
	}
    
    print("\n\n");
}
```


Edward
