# Merging Polygons (the clean way)

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1939/
- Subforum: scripting-general
- Started by **DaVinci** on 2007-07-15; last post 2018-10-04; 9 posts

## #1 — DaVinci — 2007-07-15
<https://www.cheetah3d.com/forum/index.php?threads/1939/post-13379>

Merging Polygons (the clean way)

Hi there,

There is one thing that really frustrates me about Cheetah is the lack of a simple tool for merging polygons. I'm either totally blind and haven't found it yet, or it's really a missing tool.

The reason I really need such a tool is the need to reduce a n object's polygon/triangle to the lowest level possible (without corrupting its shape or details) for the game design of "Project Weasel". It's a pain in the *ss having to merge all those polygons manually.

So here comes my question: Is there any way to accomplish this with a script?
(Until Martin implements this natively  )

Attachments: [Merging Polygons.jpg](https://www.cheetah3d.com/forum/index.php?attachments/2795/)

## #2 — Martin — 2007-07-15
<https://www.cheetah3d.com/forum/index.php?threads/1939/post-13384>

Hi,
this is already on my personal todo list. I want to implement that with a more intelligent "edge delete". A "edge delete" which combines polygons is a great time saver. 

In the meantime you can delete the polygons and use the "Close Hole" tool.

Bye,
Martin

## #3 — DaVinci — 2007-07-15
<https://www.cheetah3d.com/forum/index.php?threads/1939/post-13389>

[[QUOTE:  Martin said: In the meantime you can delete the polygons and use the "Close Hole" tool. Click to expand... ]]
"Close hole"? You meant "fill hole", didn't you?

Anyway, hope this gets added soon.

## #4 — Willem — 2007-07-15
<https://www.cheetah3d.com/forum/index.php?threads/1939/post-13399>

As a side note, will it get rid of the extra verts if you use the "Optimize" function?  It might.

## #5 — DaVinci — 2007-07-15
<https://www.cheetah3d.com/forum/index.php?threads/1939/post-13404>

[[QUOTE:  Willem said: As a side note, will it get rid of the extra verts if you use the "Optimize" function? It might. Click to expand... ]]
Nope. :frown: Optimize only cleanes vertices that ain't connected to any polygon at all. Orphaned vertices, so to speak.

## #6 — ToddWR — 2007-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1939/post-13480>

DaVinci,

something I just whipped up... it is a polygon script. it will clear the vertexes you desired to be cleared. just put your object inside of the script object. if all is OK then just make it editable and there ya go.

Todd

Attachments: [CP.zip](https://www.cheetah3d.com/forum/index.php?attachments/2811/)

## #7 — uncle808us — 2018-10-04
<https://www.cheetah3d.com/forum/index.php?threads/1939/post-113639>

[[QUOTE:  ToddWR said: DaVinci, something I just whipped up... it is a polygon script. it will clear the vertexes you desired to be cleared. just put your object inside of the script object. if all is OK then ]]

Is this still the way to do this? Could we see it in action?
 (images) of what it does.

## #8 — frank beckmann — 2018-10-04
<https://www.cheetah3d.com/forum/index.php?threads/1939/post-113640>

There´s no need for the script anymore; deleting the edges will kill the connected points automatically:

		
	
Cheers
Frank

## #9 — uncle808us — 2018-10-04
<https://www.cheetah3d.com/forum/index.php?threads/1939/post-113641>

Thank you Frank...:smile: :icon_thumbup:
