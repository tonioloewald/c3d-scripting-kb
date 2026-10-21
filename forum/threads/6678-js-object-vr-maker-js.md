# JS Object VR Maker.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6678/
- Subforum: script-downloads
- Started by **tg_jp** on 2010-12-18; last post 2010-12-18; 3 posts

## #1 — tg_jp — 2010-12-18
<https://www.cheetah3d.com/forum/index.php?threads/6678/post-53156>

JS Object VR Maker.js

Hello

It's a tool script to make HTML file and sequential images of target object, for presentation Object VR.  

http://www.tres-graficos.jp/blog/files/article.php?id=64

sample:

http://www.tres-graficos.jp/blog/resources/objectvr/jquery-objectvr-0.1/

http://www.tres-graficos.jp/blog/resources/objectvr/jquery-objectvr-demo-yn/

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=64, http://www.tres-graficos.jp/blog/resources/objectvr/jquery-objectvr-0.1/, http://www.tres-graficos.jp/blog/resources/objectvr/jquery-objectvr-demo-yn/

## #2 — SurfingAlien — 2010-12-18
<https://www.cheetah3d.com/forum/index.php?threads/6678/post-53163>

this is super cool Hiroto! :icon_thumbup: 
this time I'm not only wondering how you did it but also how did you think about it...!

2 questions:
- why does it take so long to load? (approx 2 mins for the cube on a 7Mb/s DSL)
- how do you embed it into a web page (I know, I'm almost a totally illiterate about jquery...:redface: )

thanks as usual, really a nice Xmas present for the Cheetah community
Alessandro

## #3 — tg_jp — 2010-12-18
<https://www.cheetah3d.com/forum/index.php?threads/6678/post-53173>

Hi,

thank you for comment.

about your questions.

> 1. that demo has 185 jpg images as each frames. a size of these files is 3MB over totally. some overhead by file count may causes so long time to load.

> 2. I am using <iframe> tag for it.

	
	


```
<iframe src="url/to/objectvr/" style="width:***px;height:***px;border:0;outline:0;">
</iframe>
```


regards.

tg_jp, Hiroto.
