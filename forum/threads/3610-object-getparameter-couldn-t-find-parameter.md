# Object.getParameter() couldn't find parameter

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3610/
- Subforum: scripting-general
- Started by **Vector** on 2008-10-17; last post 2008-10-20; 4 posts

## #1 — Vector — 2008-10-17
<https://www.cheetah3d.com/forum/index.php?threads/3610/post-25438>

Object.getParameter() couldn't find parameter

Hi,

I'm parsing through a list of materials, some of which may have a colour texture assigned and some of which may not (for example marble materials don't have this parameter). I'm using getParameter, but get this error for the marble material...

Object.getParameter() couldn't find parameter called colorTex

Code...

    for (i = 0 ; i < doc.materialCount() ; i++)
    {
        var CheetahMaterial = doc.materialAtIndex(i);
        var ColourTexture    = CheetahMaterial.getParameter("colorTex");

        [snip]
    }

How do I determine if a parameter is present before using getParameter? Is it possible to determine the material type, so I can add conditional code? Doing a .rib() on the material reveals 'Surface "Material" "name" "Material" etc', but as Surface isn't in quotes I can't get that using getParameter. I'm new to JavaScript / Cheetah Script, so hopefully there is a way.

Thanks

PS. I know its possible to use colorMap() to get the texture name, but I will also be using this type of code to access other parameters for which there is no direct call.

## #2 — tg_jp — 2008-10-17
<https://www.cheetah3d.com/forum/index.php?threads/3610/post-25441>

hi,

[[QUOTE:  How do I determine if a parameter is present before using getParameter? Is it possible to determine the material type, so I can add conditional code? Doing a .rib() on the material reveals 'Surface "]]

if you want to get a type of material, you can use 'shaderType' (String) paramter for it. 

I customized Object Info.js for checking parameter name and type of object, tags, and materials. please check it.

	
	


```js
function main(doc) {
    var obj = doc.selectedObject();
    
    print('---- Object Info ---');
    
    if ( obj ) {
        print('-- object type:'+obj.type());
        var info = obj.parameterInfo();
        for(var j=0;j<info.length;j++) {
            print(info[j][0] +" [" + info[j][1] + "]:"+obj.getParameter(info[j][0]));
        }
        var tcount = obj.tagCount();
        for (var i = 0;i < tcount;++i) {
            var tag = obj.tagAtIndex(i);
            info = tag.parameterInfo();
            print('-- tag '+i+' type:'+tag.type());
            for(var j=0;j<info.length;j++){
                print(info[j][0] + " [" + info[j][1] + "]:"+tag.getParameter(info[j][0]));
            }
            if (tag.type() == 102) { // material tag.
                var material = doc.materialAtIndex(tag.linkedToMaterial());
                print('-- linked Material --');
                info = material.parameterInfo();
                for(var j=0;j<info.length;j++){
                    print(info[j][0] + " [" + info[j][1] + "]:"+material.getParameter(info[j][0]));
                }
                //print('- rib()');
                //print(material.rib());
            }
        }
    }
}
```


regards.

tg_jp, Hiroto

## #3 — Vector — 2008-10-20
<https://www.cheetah3d.com/forum/index.php?threads/3610/post-25478>

Thanks for the help!

I notice you have print's in your script. How do you see the output from these when the script is run? Its got to be less intrusive than using OS.messageBox.

Thanks

## #4 — tg_jp — 2008-10-20
<https://www.cheetah3d.com/forum/index.php?threads/3610/post-25483>

hi,

you can check it at 'Console' view, that is not showed by default. you have to set it manually by Control + mouse clicking or right clicking at view header.

regards.

tg_jp, Hiroto

Attachments: [Cheetah3D_sz_002.jpg](https://www.cheetah3d.com/forum/index.php?attachments/5830/)
