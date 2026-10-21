# Take() get length

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10758/
- Subforum: scripting-general
- Started by **jeffcase** on 2014-10-14; last post 2014-10-20; 6 posts

## #1 — jeffcase — 2014-10-14
<https://www.cheetah3d.com/forum/index.php?threads/10758/post-90885>

Take() get length

I have been scouring for a script example using Take() - have not found one. I'm trying to get the length of a take. Can someone help with some syntax for this?

TIA
Jeff

edit: it seems the length property is the same as doc.animationEnd(). I'm still looking for a way to get the current FPS setting to do some math. I thought Take() might, but alas...

## #2 — Martin — 2014-10-17
<https://www.cheetah3d.com/forum/index.php?threads/10758/post-90943>

Hi,
the Take class has a property called "length". So you can get the length of the current take like this:

	
	


```
var takelength=doc.currentTake().length;
```


with doc being the document class.

Bye
Martin

## #3 — jeffcase — 2014-10-18
<https://www.cheetah3d.com/forum/index.php?threads/10758/post-90949>

get document name

Thank you Martin. That works just fine.

The script uses OS.runSavePanel() to get the folder for saving the individual frames rendered. I would like to populate the save panel  filename field with the document name root (sans .jas). Is there a way to get the filename of the current document with JS? 

I will post the script to the scripts section when done. 

TIA,
Jeff

## #4 — Martin — 2014-10-18
<https://www.cheetah3d.com/forum/index.php?threads/10758/post-90958>

I'm sorry but getting the filename isn't possible yet.:redface: 

Bye
Martin

## #5 — jeffcase — 2014-10-18
<https://www.cheetah3d.com/forum/index.php?threads/10758/post-90967>

Thank you for your replies. After my previous reply, I realized that I had tested 'doc.currentTake().length' using the kludged front end that writes the JS. My Bad.

Once I realized that, I found that the above does not return the total frame count of the take - only how many seconds. My problem still exists: how to glean "frames-per-second" from the document.

The script is obliged to derive the FPS in order to work. As it stands now I use QuicKeys to execute the menu item "Animation/Last Frame", double click in the current frame field, copy that to the clipboard, and execute a small Applescript that grabs the clipboard, writes the JS, then executes the tool script from the menu. Once this portion has finished (about 2 seconds), the user has options for start and end frames to render individually.

Each frame is rendered to a numbered PNG file. The PNGs are rendered with a transparent background. I use these PNGs for small animations in utilities I write using ObjC. These animations are performed frame-by-frame rather than video in order to have no background.

If I could glean the FPS, the kludged front end could go away and the JS would not require writing on the fly. But for that one bit of information - FPS - it's a standalone JS tool script. This is very useful when rendering heavy scenes where one frame can take a long time to render. It allows me to render the sequence in chunks and maintain sequential numbering - all automatically.

With this technique, one can also do some PhotoShop stuff to the individual frames and then recombine them into a video if necessary. 

I may be going about this all wrong, and indeed I'm considered a 'Neuer Benutzer', so my techniques are primitive by any 'Erfahrener Benutzer' standard. If there is a front door method to achieve this I would like to know how.

In any case, I would REALLY appreciate some input.

I will post what I have so far if that would help.

TIA,
Jeff

## #6 — Martin — 2014-10-20
<https://www.cheetah3d.com/forum/index.php?threads/10758/post-90990>

Hi Jeff,
I'm sorry but retrieving the FPS value via Javascript isn't possible yet. But you found a pretty impressive work around.:shock: 

But for if you are interested in a PNG image sequence of a rendered animation you can also access them via the Render Histroy. In the 

~/Library/Application Support/Cheetah3D/Render History

folder you can find all rendering jobs. In case of animation rendering jobs you will also find a PNG image of each rendered frame. Maybe that helps you?

Bye
Martin
