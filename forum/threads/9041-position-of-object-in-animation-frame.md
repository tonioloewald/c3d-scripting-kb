# Position of object in animation frame

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9041/
- Subforum: scripting-general
- Started by **cerra** on 2012-11-24; last post 2012-11-25; 3 posts

## #1 — cerra — 2012-11-24
<https://www.cheetah3d.com/forum/index.php?threads/9041/post-74905>

Position of object in animation frame

Hi,
I'm new to Cheetah and i love it. Just beginning to explore scripting.
I have a simple question. How can i get a position of an object at certain time in in animation?

Thanks!

## #2 — tg_jp — 2012-11-25
<https://www.cheetah3d.com/forum/index.php?threads/9041/post-74914>

hi

it's a sample code for macro script.

	
	


```js
// simple one.

function main( doc ) {
  var time = 1.0; // it's not a frame number, just second of timeline position to get.

  var obj = doc.selectedObject();
  var time_bk = doc.animPosition( time ); // store current time.

  doc.setAnimPosition( time );
  
  var position = obj.getParameter("position");
  
  doc.setAnimPosition( time_bk );

  print( position.x.toFixed(4) + ', ' + position.y.toFixed(4) + ', ' + position.z.toFixed(4) );
}
```


or you can use F-Curve object for getting information depends on your purpose.

	
	


```js
// from f-curve object.

function main( doc ) {
  var time = 1.0; // it's not a frame number, just second of timeline position to get.

  var obj = doc.selectedObject();
  var parameter = obj.parameterWithName("position");
  var currentTake = doc.currentTake();
  
  var takeNode = parameter.takeNodeWithName( currentTake.name );
  if (takeNode) {
    var posXCurve = takeNode.fCurveAtIndex(0);
    var posYCurve = takeNode.fCurveAtIndex(1);
    var posZCurve = takeNode.fCurveAtIndex(2);
    
    var position = new Vec3D( posXCurve.valueAtTime( time, 0 ),
                                         posYCurve.valueAtTime( time, 0 ),
                                         posZCurve.valueAtTime( time, 0 ) );
  } else {
    // no f-curve set for object
    var position = obj.getParameter("position");
  }
  
  print( position.x.toFixed(4) + ', ' + position.y.toFixed(4) + ', ' + position.z.toFixed(4) );

}
```


regards.

## #3 — cerra — 2012-11-25
<https://www.cheetah3d.com/forum/index.php?threads/9041/post-74921>

Ahaa :smile:  i knew it was something simple. Thank you very much, the first one will do just fine.
