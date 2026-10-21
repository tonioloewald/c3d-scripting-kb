# [newbie] how do you guys dev JS in C3D..?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8220/
- Subforum: scripting-general
- Started by **rexdev** on 2012-03-13; last post 2012-03-17; 5 posts

## #1 — rexdev — 2012-03-13
<https://www.cheetah3d.com/forum/index.php?threads/8220/post-68500>

[newbie] how do you guys dev JS in C3D..?

Hi,

i'd like to get a grip on scripting C3D, but after poking through a few scripts, and playing with console output, i'm left with more questions than answers  
Preface: i'm a webdev guy, and though JS by far isn't my main dish (being PHP), i do a lot of semi-weight JS scripting.. which in webdev context means having frameworks at hand (mostly jQuery) and all the needed tools & debugging utilities (Firebug being the main..). So coming from that corner, scripting in C3D - at least at this point - for me looks like working with DOS ;-) .. so my questions are:

1. how do you debug? i've seen the print cmd, but that's only good for strings.. how do you e.g. check objects?

2. is there a way to include external JS libs like jQuery? (cause if i had that at hand, i could pipe debug output via ajax to a different framework..)

3. is the API doku in C3D's help section all there is?

4. i read C3D uses webkit's JS framework, however it seems like it can do way less than one could expect.. (e.g. XMLHttpRequest() is unknown and so on..)

thx & cheers,
Jan

## #2 — tg_jp — 2012-03-14
<https://www.cheetah3d.com/forum/index.php?threads/8220/post-68508>

hi,

IMHO, though...

> 1

for object debugging,  I define custom function for converting object value to string. 

> 2

I don't know. I think it's not available.

> 3

about special build-in class of Cheetah3D's JavaScript, yes. but general class of JavaScript ( String/Array/Math... ), you have to look into other docs.

> 4

I understand Cheetah3D uses JavaScriptCore.framework of OSX, but it's not same of Safari's one. some network APIs seem to be missing. but you want to use network thing, you can call external script/binary ( php, python, ruby, perl, c/objective-c binary ) with OS.system function.

actually, some important APIs for accessing material system, vertex weight.. are missing yet.
but V6 will get F-Curve accessing, so in the future those APIs will be implemented.

regards.

tg_jp, Hiroto

## #3 — rexdev — 2012-03-14
<https://www.cheetah3d.com/forum/index.php?threads/8220/post-68522>

Hi Hiroto,

thx for your reply.. so it looks like scripting C3D is rather hard business 
I tried to goole some information on the capabilites of JavaScriptCore.framework, however information about that frameworl is arcane.. do you have a URL to some usefull documentation at hand?
Would you mind to share your object dumper eventually? ;->

Besides: are the methods described in the help section all up to date and working? I tried to get materials.js working again, but it seems like e.g. materialAtIndex(INT) isn't working.. or at least not as it used to, though it's listed in the help section.

thx & cheers,
Jan

## #4 — tg_jp — 2012-03-15
<https://www.cheetah3d.com/forum/index.php?threads/8220/post-68554>

Hi

[[QUOTE:  rexdev said: I tried to goole some information on the capabilites of JavaScriptCore.framework, however information about that frameworl is arcane.. do you have a URL to some usefull documentation at ]]

I think you can refer to general javascript reference ( without DOM stuff though ). how about the section of JavaScript Objects Reference at http://www.w3schools.com/jsref/default.asp

and please check my latest script, you can check how do I debug.

[[QUOTE:  rexdev said: Besides: are the methods described in the help section all up to date and working? I tried to get materials.js working again, but it seems like e.g. materialAtIndex(INT) isn't working.. ]]

from version 4.3/5.0, since material system was changed, some material api of script couldn't work anymore. we have to wait api update. actually, materialAtIndex is still work, but Material::rib() doesn't seem to work anymore.

please check below codes for Macro script.

	
	


```js
//

function Vec2D_toString( vec ) {
	return vec.x.toFixed(6) + ' ' + vec.y.toFixed(6);
}

function Vec3D_toString( vec ) {
	return vec.x.toFixed(6) + ' ' + vec.y.toFixed(6) + ' ' + vec.z.toFixed(6);
}

function Vec4D_toString( vec ) {
	return vec.x.toFixed(6) + ' ' + vec.y.toFixed(6) + ' ' + vec.z.toFixed(6) + ' ' + vec.w.toFixed(6);
}

function printInfo( info, obj ) {
    switch( info[1] ) {
        case "Vec2D":
            print(info[0] +" [" + info[1] + "]:"+Vec2D_toString(obj.getParameter(info[0])));
            break;
        case "Vec3D":
            print(info[0] +" [" + info[1] + "]:"+Vec3D_toString(obj.getParameter(info[0])));
            break;
        case "Vec4D":
            print(info[0] +" [" + info[1] + "]:"+Vec4D_toString(obj.getParameter(info[0])));
            break;
        case "Link":
            print(info[0] +" [" + info[1] + "]:");
            break;
        default:
            print(info[0] +" [" + info[1] + "]:"+obj.getParameter(info[0]));
    }
}
function main(doc) {
   var obj = doc.selectedObject();
   
   print('---- Object Info ---'); //
   
   if ( obj ) {
       print('-- object type:'+obj.type());
       var info = obj.parameterInfo();
       for(var j=0;j<info.length;j++) {
           printInfo( info[j], obj );
       }
       var tcount = obj.tagCount();
       for (var i = 0;i < tcount;++i) {
           var tag = obj.tagAtIndex(i);
           info = tag.parameterInfo();
           print('-- tag '+i+' type:'+tag.type());
           for(var j=0;j<info.length;j++){
                printInfo( info[j], tag );
           }
           if (tag.type() == 102) { // material tag.
               var material = doc.materialAtIndex(tag.linkedToMaterial());
               print('-- linked Material --');
               info = material.parameterInfo();
               for(var j=0;j<info.length;j++){
                    printInfo( info[j], material );
               }
               print( 'rib:' + material.rib ); // rib is obsoleted!
               print( 'color:' + Vec4D_toString( material.color() ) );
               print( 'colorMap:' + material.colorMap() );
               print( 'emission:' + Vec4D_toString( material.emission() ) );
               print( 'shininess:' + material.shininess() );
               print( 'specular:' + Vec4D_toString( material.emission() ) );
           }
       }
   }
}
```


regards.

tg_jp, Hiroto

Links: http://www.w3schools.com/jsref/default.asp

## #5 — podperson — 2012-03-17
<https://www.cheetah3d.com/forum/index.php?threads/8220/post-68586>

There's no point in jquery etc. since most of what jquery does is manage the Dom and event handling, neither of which are applicable. Print works fine but you might want to write a general print function that handles objects recursively (if it's a string or number, print it, otherwise iterate across its properties).

A generalized print function will also allow you to get around the lack of documentation (print system objects to see how they're made up, what their methods and properties are)

The core patterns are:

UI setup
capturing the user selection
Iterating across hierarchies
