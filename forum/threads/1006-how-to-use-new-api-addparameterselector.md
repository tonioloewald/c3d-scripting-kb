# how to use new API, addParameterSelector() ?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1006/
- Subforum: scripting-general
- Started by **tg_jp** on 2006-10-26; last post 2006-12-21; 7 posts

## #1 — tg_jp — 2006-10-26
<https://www.cheetah3d.com/forum/index.php?threads/1006/post-6264>

how to use new API, addParameterSelector() ?

hello, Martin.

'addParameterSelector()', how to use it? I guess it is for adding selector UI to property or tool view.

regards.

Hiroto, tg_jp

## #2 — Martin — 2006-10-27
<https://www.cheetah3d.com/forum/index.php?threads/1006/post-6289>

Hi,
you have to use it like that.

	
	


```
obj.addParameterSelector("drink", ["Wine","Beer","Milk"],true,true);
```


That parameter is a integer parameter. So if you select "Milk" in the example above the return value will be 2.

Bye,
Martin

## #3 — tg_jp — 2006-11-02
<https://www.cheetah3d.com/forum/index.php?threads/1006/post-6366>

Hello, Martin.

thank you for replying. I use this for new one.

but, is there limitation of the number of elements? 6 works fine, but 7 or more might not work.

regards.

tg_jp, Hiroto

## #4 — Martin — 2006-11-02
<https://www.cheetah3d.com/forum/index.php?threads/1006/post-6382>

Hi,
yes there is indeed a limitation but it should be 9. But if there is really some need I could expand it.

Bye,
Martin

## #5 — ToddWR — 2006-12-19
<https://www.cheetah3d.com/forum/index.php?threads/1006/post-7352>

Martin,

is there some down side to adding more items? I have found some need to have more in some of my experimental scripts.

Thanks
Todd

## #6 — Martin — 2006-12-21
<https://www.cheetah3d.com/forum/index.php?threads/1006/post-7362>

Hi,
the downside is that the entries won't be ordered correctly. I would take some time to remove that limitation.

Do you need it for your let the sun in script. I found a quite long list of cites in that script. :wink: 

Bye,
Martin

## #7 — ToddWR — 2006-12-21
<https://www.cheetah3d.com/forum/index.php?threads/1006/post-7364>

Martin,

actually no, that list of cites was just from where I got the javascript, see included websites. I have other scripts in the works and it would be useful but not nessassry for the scripts to function. 

Todd
