# For scripters: Unlock Screen

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1422/
- Subforum: script-downloads
- Started by **capnchunky** on 2007-03-12; last post 2007-03-12; 1 posts

## #1 — capnchunky — 2007-03-12
<https://www.cheetah3d.com/forum/index.php?threads/1422/post-8967>

For scripters: Unlock Screen

Download (1kb) -- Put it in the Macro folder in the scripts folder.

More than once while working on my Numeric Transform script (and thought I was finished), it would hit an error and leave the UI locked.  After the nth time closing and reopening the window to get around that, I decided to write a quick fix instead.

It's very simple -- all it does is this:

	
	


```js
function main(doc){
	doc.releaseRedrawLock();
	doc.redrawAll();
}
```

but it's saved me a lot of hassle. Hope it will for you, too.

Links: http://www.users.muohio.edu/howellme/cheetah3d/Unlock_Screen.js.zip
