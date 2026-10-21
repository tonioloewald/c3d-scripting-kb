# function to output object parameterInfo into console

- Thread: https://www.cheetah3d.com/forum/index.php?threads/14377/
- Subforum: script-downloads
- Started by **MarkusR** on 2024-02-17; last post 2024-02-17; 1 posts

## #1 — MarkusR — 2024-02-17
<https://www.cheetah3d.com/forum/index.php?threads/14377/post-127840>

this function output object parameterInfo into console.
i need this because the names in the ui are not the same in script.

/** output object parameter infos into cheetah 3d console tab
   printObjectParameters(box1);
   box1.setParameter("position", new Vec3D(0,0,0));
   box1.setParameter("sizeX", width);
*/
function printObjectParameters(obj) {
    var pCount = obj.parameterCount();
    //print(pCount);
    var pl = obj.parameterInfo(); // String[][]
    //clearConsole();
    print("Object Parameters:");
    print("----");
    for(var z = 0; z < pl.length; z++) { // count of parameters
        for(var i = 0; i < pl[z].length; i++) { // name and type
            print(pl[z][i]);
        }
        print("----");
    }
}

screenshot from ms vs code editor at Mac

			{
				"lightbox_close": "Close",
				"lightbox_next": "Next",
				"lightbox_previous": "Previous",
				"lightbox_error": "The requested content cannot be loaded. Please try again later.",
				"lightbox_start_slideshow": "Start slideshow",
				"lightbox_stop_slideshow": "Stop slideshow",
				"lightbox_full_screen": "Full screen",
				"lightbox_thumbnails": "Thumbnails",
				"lightbox_download": "Download",
				"lightbox_share": "Share",
				"lightbox_zoom": "Zoom",
				"lightbox_new_window": "New window",
				"lightbox_toggle_sidebar": "Toggle sidebar"
			}
			
		
		
	

	
		
	
console tab

		
	
displayed properties in the cheetah ui
