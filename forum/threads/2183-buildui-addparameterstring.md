# buildUI => addParameterString...?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/2183/
- Subforum: scripting-general
- Started by **benblo** on 2007-09-27; last post 2007-10-17; 11 posts

## #1 — benblo — 2007-09-27
<https://www.cheetah3d.com/forum/index.php?threads/2183/post-15280>

buildUI => addParameterString...?

New user here: hello everyone  !
Let me introduce myself: I'm Ben, working for a new indie studio, we started about 2 months ago. We're using Cheetah with Unity... sweet sweet combo :icon_thumbup: !

I played around with scripting for the first time today, made a tool script that allows the user to create a new object, and I wanted to let the user enter a name for this object, then set it by script.
But curiously, I couldn't find in the doc any addParameterXXX function for string values! I tried addParameterString and addParameterText, no luck. 
Does this exist at all? If not, why?

Also, I had a look into tg_jp's scripts (impressive blog!), and found out that he uses addParameterSelector to get a dropdown list, which is NOT documented... so I'm wondering, is there any place where I can find a more up-to-date documentation?

I tried to "document myself" by inspecting all properties of an object; in browser-based JS, I usually do the following to get a property/value list:

	
	


```
for (var property in someObject)
    print(property + " - " + someObject[property]);
```

 ... doesn't work with Cheetah's JS though. Which implementation of JS are you guys using?
If I add custom properties to the object (like: someObject.foo = "bar"), then they get listed by the above code.
Any ideas anyone?

On another issue, I want to know what's the current time in the animation. I found out how to SET the current time, with doc.setAnimPosition(), but there's no doc.getAnimPosition()! Also, how can I get the current frame-rate?

I'm done with question... for now . Cheers!

## #2 — tg_jp — 2007-09-28
<https://www.cheetah3d.com/forum/index.php?threads/2183/post-15284>

hi,

* addParameterString: I think there is not yet. I want also, addParameterColorWell, addParameterVec3D (same interface as position, rotation, scale..) , etc. 

* addParameterSelector: please search this function at this forum. I had asked before.  

* Object properties: use parameterInfo(). please check sample script 'Parameter info.js' in Macro folder.

and my sample code for Macro script

	
	


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
            }
        }
    }
}
```


* getting current frame number and frame rate: I don't know. maybe functions are missing.

regards.

tg_jp

## #3 — benblo — 2007-09-28
<https://www.cheetah3d.com/forum/index.php?threads/2183/post-15298>

[[QUOTE:  tg_jp said: * addParameterString: I think there is not yet. I want also, addParameterColorWell, addParameterVec3D (same interface as position, rotation, scale..) , etc. Click to expand... ]]
Yes that makes sense, especially since it already exists in the main program, it's probably just a matter of making it available in the script library.

[[QUOTE:  tg_jp said: * addParameterSelector: please search this function at this forum. I had asked before. Click to expand... ]]
You misunderstood me, I don't need help with that, your script was a great example on how to use it. 
I just wanted to tell whoever writes the documentation that it is missing.

[[QUOTE:  tg_jp said: * Object properties: use parameterInfo(). please check sample script 'Parameter info.js' in Macro folder. Click to expand... ]]
Yes I saw this script already, but that's not what I need: this only list properties defined with setParameter.
I want to see all properties of the JS object (including functions, etc).
For example if you do:

	
	


```
print(tool.addParameterSelector);
```

you get:

	
	


```js
function addParameterSeparator() {
    [native code]
}
```

So what I would like to do is list ALL functions available for the tool object.

About that... I'd still want to know about the JS implementation. I saw some threads but didn't quite understand: is Cheetah using AngelScript, or is it going to use AngelScript?
I saw in AngelScript documentation (not too sure I got it right though ) that you can manually call functions of the parent program's API... but of course you'd have to know more about this API.

Thanks!

## #4 — tg_jp — 2007-09-28
<https://www.cheetah3d.com/forum/index.php?threads/2183/post-15299>

hi,

ah, I misunderstood you. I don't know how to search build-in [native code] functions of object. as you wrote, below code is not work for it. 

	
	


```js
for (var i in someObj) {
    print(someObj[i]); // this shows only parameters and post-added functions.
}
```


some documents for JS are still missing. functions, reserved words... please post any article about that for sharing. 

regards.

tg_jp, Hiroto

## #5 — benblo — 2007-09-28
<https://www.cheetah3d.com/forum/index.php?threads/2183/post-15300>

Good to see we're on the same page... although we feel alone here: are we the only 2 scripters around  ?
I would definitely be nice to know more about what we're working with: what exactly is Cheetah's JS?

Waiting for Cheetah's creators input on this... will also have a more thorough look in the release notes when I find some time.

## #6 — podperson — 2007-10-08
<https://www.cheetah3d.com/forum/index.php?threads/2183/post-15503>

I would love to join you in scripting C3D, but the lack of docs has stymied me. I'd much rather the existing scripting architecture got a bit of documentation than see new languages supported (etc.)

## #7 — benblo — 2007-10-09
<https://www.cheetah3d.com/forum/index.php?threads/2183/post-15522>

So, who do we have to nag to get a little more doc, and a more complete API :tongue: ?

## #8 — britt — 2007-10-10
<https://www.cheetah3d.com/forum/index.php?threads/2183/post-15603>

Wellll.....

[[QUOTE:  are we the only 2 scripters around Click to expand... ]]

Not exactly...

[[QUOTE:  So, who do we have to nag to get a little more doc, and a more complete API Click to expand... ]]

http://cheetah3d.de/forum/member.php?u=4

Who else? :wink: 

Umm... I haven't been given leave to offer any details yet, so I'll leave that up to Martin (not that I'm like super-in-the-know or anything, but since most of what little I do know came from a private email exchange, I'd rather not make any assumptions :smile: ), but I believe that something is in the works that will be helpful on this issue... and - at least to date - what I've heard (read???) of it has left a smile on my face, so....

:smile:

Links: http://cheetah3d.de/forum/member.php?u=4

## #9 — Martin — 2007-10-16
<https://www.cheetah3d.com/forum/index.php?threads/2183/post-15742>

Hi,
I'm sorry but addParameterString() isn't available yet. But I've put it onto my todo list. 

There are actually quite a lot functions missing yet. But I've put the scripting stuff on hold for the first to evaluate how complicated it would be to make a full blown Cheetah3D SDK. Then the Javascript API could be used for easier tools which aren't CPU limited and for more complex tools which are also more performance hungry the SDK could be used. The SDK would also offer access to most aspects of Cheetah3D. 

Excluding some small exceptions the documentation of the Javascript API should be quite complete.

Bye,
Martin

## #10 — benblo — 2007-10-16
<https://www.cheetah3d.com/forum/index.php?threads/2183/post-15748>

Well, that's certainly really good to hear Martin, thanks for your reply!
 
I'm on the coding side, not on the modeling/animation side, but the graphic part seems really robust to me. The only thing our graphists complain about is the interface and options are a bit rough on the edges, so with all you suggest I think Cheetah could really be expanded.

I don't suppose it's any use to ask the "when" question  ?

## #11 — Martin — 2007-10-17
<https://www.cheetah3d.com/forum/index.php?threads/2183/post-15805>

[[QUOTE:  benblo said: I don't suppose it's any use to ask the "when" question ? Click to expand... ]]

I don't even know it by myself. So how could I answer it.:wink: 

Bye,
Martin
