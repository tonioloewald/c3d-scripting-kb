# regular expressions

- Thread: https://www.cheetah3d.com/forum/index.php?threads/11083/
- Subforum: scripting-general
- Started by **aaronparr** on 2015-03-10; last post 2015-03-10; 1 posts

## #1 — aaronparr — 2015-03-10
<https://www.cheetah3d.com/forum/index.php?threads/11083/post-93910>

regular expressions

This regular expression does not seem to be working for me:

	
	


```
var file_line_word = file_line.split(/\s*/);
```


As you can see, I am taking one line of a file, and parsing every "word" by splitting it into an array of strings separated by one or more spaces.

Its not working. The result is a single string. The regular expression turns up nothing.

So am I "doing it wrong" or are regular expressions not fully supported in this implementation of JavaScript?

----
EDIT:
nevermind, very stupid mistake.
I need to be using this /\s+/

*slaps forehead*
