// Source: https://www.cheetah3d.com/forum/index.php?threads/7904/post-86490
// Author: tg_jp (Cheetah3D forum), posted 2014-04-02
// Thread: "CheetahToAE.js"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// MS Importer.js
//
// v.20140401
// tg@tres-graficos.jp
//
// it's a Tool script to import .ms (3dsMax Script) file for creating new camera or folder animation.
// you can make .ms file from AfterEffect by AE3D_Export.jsx ( google it! )
// place this into ( ~/Library/Application Support/Cheetah3D/scripts/Tool folder ).
//
//

function buildUI( tool ) {
  
  tool.addParameterSeparator("MAXScript Importer");
  tool.addParameterFloat("scale factor", 1, 0.00001, 100000, false, false);
  tool.addParameterButton("import ms", "import", "importMS");
}

function importMS( tool ) {
  
  var path = OS.runOpenPanel("ms");
  if (path == null) return;
  
  var file = new File(path);
  file.open(READ_MODE);
  
  if (file.isOpen() == false) return;
  
  //print( '----' );
  
  var doc = tool.document();
  
  var i,j,k,l;
  var line = file.readln();
  
  var globalPtn = {
                    frameRate: /frameRate\s+=\s+([0-9\.]+)/, 
                    renderWidth: /renderWidth\s+=\s+([0-9]+)/,
                    renderHeight: /renderHeight\s+=\s+([0-9]+)/,
                    animationRange: /animationRange\s+=\s+\(interval\s+([0-9]+)\s+([0-9]+)\)/
                   }
  var globalParams = {};
  
  var sceneObjs = {};
  
  var scan = null;
  
  while ( line != -1 ) {
    
    if ( Object.keys(globalPtn).length >= Object.keys(globalParams).length ) {
      for ( j in globalPtn ) {
        scan = line.match( globalPtn[j] );
        if ( scan ) {
          if (j == 'animationRange') {
            globalParams[ j ] = [ parseInt(scan[1]), parseInt(scan[2]) ];
          } else {
            globalParams[ j ] = scan[1];
          }
        }
      }
    }
    
    scan = line.match( /(.+)\s+=\s+Dummy\(\)/ );
    if (scan) {
      sceneObjs[ scan[1] ] = {};
      sceneObjs[ scan[1] ][ 'type' ] = 'obj';
      sceneObjs[ scan[1] ][ 'keys' ] = {};
    }
    
    scan = line.match( /^(.+)\.name\s+=\s+\"(.+)\"/ );
    if (scan) {
      sceneObjs[ scan[1] ][ 'name' ] = scan[2];
    }
    
    scan = line.match( /^(.+)\s+=\s.+\s+name:\"(.+)\"/ );
    if (scan) {
      sceneObjs[ scan[1] ] = {};
      sceneObjs[ scan[1] ][ 'name' ] = scan[2];
      sceneObjs[ scan[1] ][ 'type' ] = 'camera';
      sceneObjs[ scan[1] ][ 'keys' ] = {};
    }
    
    scan = line.match( /^at\s+time\s+([0-9]+)\s+([^\.]+)\.(.+)\s+=\s+(.+)/ );
    if (scan) {
      if ( sceneObjs[ scan[2] ] == undefined ) {
        print( 'ERROR: object is not undefined.' );
      } else {
        // create Object for time key.
        if ( sceneObjs[ scan[2] ]['keys'][ scan[1] ] == undefined ) {
          sceneObjs[ scan[2] ]['keys'][ scan[1] ] = {};
        }
        
        
        if ( scan[3].match("rotation") ) {
          if ( sceneObjs[ scan[2] ]['keys'][ scan[1] ]['rotation'] == undefined ) {
            sceneObjs[ scan[2] ]['keys'][ scan[1] ]['rotation'] = new Vec3D();
          }
          if (scan[3].match("x_rotation")) {
            sceneObjs[ scan[2] ]['keys'][ scan[1] ]['rotation'].x = parseFloat(scan[4]);
          } else if (scan[3].match("y_rotation")) {
            sceneObjs[ scan[2] ]['keys'][ scan[1] ]['rotation'].y = parseFloat(scan[4]);
          } else if (scan[3].match("z_rotation")) {
            sceneObjs[ scan[2] ]['keys'][ scan[1] ]['rotation'].z = parseFloat(scan[4]);
          }
        } else {
          sceneObjs[ scan[2] ]['keys'][ scan[1] ][ scan[3] ] = scan[4];
        }
      }
    }
    
    line = file.readln();
  }
  
  /* check stored objects */
  
  /*
  for ( j in globalParams ) {
    print( j + ':' + globalParams[j] );
  }
   */
  
  /*
  for ( j in sceneObjs ) {
    print( 'obj ' + j + ':' + sceneObjs[j]['name'] );
    for ( k in sceneObjs[j]['keys']) {
      print( '   ' + k + ':' );
      for ( l in sceneObjs[j]['keys'][k]) {
        print( '      ' + l + ':' + sceneObjs[j]['keys'][k][l] );
      }
    }
  }
   */
  
  file.close();
  
  // create objects
  
  var currentTime;
  var param, takeNode, fCurve, key;
  var scale = tool.getParameter("scale factor");
  var fps = (Object.keys( globalParams ).indexOf('frameRate') != -1)? parseFloat(globalParams.frameRate) : 30;
  var currentTake = doc.currentTake();
  
  if (Object.keys( globalParams ).indexOf('renderWidth') != -1 && Object.keys( globalParams ).indexOf('renderHeight') != -1) {
    var fovFac = parseInt(globalParams.renderHeight) / parseInt(globalParams.renderWidth);
  } else {
    var fovFac = 1;
  }
  
  if (Object.keys( globalParams ).indexOf('animationRange') != -1) {
    var start = (1/fps) * globalParams.animationRange[0];
    var end = (1/fps) * globalParams.animationRange[1];
    
    //print( start.toFixed(3) + ' - ' + end.toFixed(3) );
    
    currentTake.length = (currentTake.length < end)? end : currentTake.length;
    currentTake.previewFrom = start;
    currentTake.previewTo = end;
  }
  
  for ( i in sceneObjs ) {
    var obj = sceneObjs[i];
    var obj3d;
    
    if (obj.type == 'camera') {
      obj3d = doc.addObject(CAMERA);
      
      if (Object.keys( globalParams ).indexOf('renderWidth') != -1) {
        obj3d.setParameter('resolutionX', parseInt(globalParams.renderWidth));
      }
      if (Object.keys( globalParams ).indexOf('renderHeight') != -1) {
        obj3d.setParameter('resolutionY', parseInt(globalParams.renderHeight));
      }
    } else if (obj.type == 'obj') {
      obj3d = doc.addObject(FOLDER);
    }
    
    obj3d.setParameter("name", obj.name);
    
    for ( j in obj.keys ) {
      currentTime = parseInt(j) * (1/fps);
      
      for ( k in obj.keys[j] ) {
        var rotHint = undefined;
        
        if (k == 'pos') {
          scan = obj.keys[j][k].match(/^\[(.+)\]/);
          var pos = scan[1].split(',');
          param = obj3d.parameterWithName("position");
          takeNode = getTakeNodeWithName( param, currentTake.name );
          
          for (l = 0;l < 3;l++) {
            fCurve = takeNode.fCurveAtIndex( l );
            key = new FCurveKey();
            key.time = currentTime;
            key.value = parseFloat(pos[l]) * scale;
            key.left_type = LINEAR_INTERPOL;
            key.right_type = LINEAR_INTERPOL;
            
            fCurve.addKey( key );
          }
        } else if (k == 'scale') {
          scan = obj.keys[j][k].match(/^\[(.+)\]/);
          var pos = scan[1].split(',');
          param = obj3d.parameterWithName("scale");
          takeNode = getTakeNodeWithName( param, currentTake.name );
          
          for (l = 0;l < 3;l++) {
            fCurve = takeNode.fCurveAtIndex( l );
            key = new FCurveKey();
            key.time = currentTime;
            key.value = parseFloat(pos[l]) * scale;
            key.left_type = LINEAR_INTERPOL;
            key.right_type = LINEAR_INTERPOL;
            
            fCurve.addKey( key );
          }
        } else if (k == 'rotation') {
          var rot = obj.keys[j][k];
          rot = (rotHint != undefined)? rot.convertEuler( ROT_ZYX, ROT_HPB ) : rot.convertEuler( ROT_ZYX, ROT_HPB, rotHint );
          rotHint = rot;
          var rotVal = [ rot.x, rot.y, rot.z ];
          param = obj3d.parameterWithName("rotation");
          takeNode = getTakeNodeWithName( param, currentTake.name );
          
          for (l = 0;l < 3;l++) {
            fCurve = takeNode.fCurveAtIndex( l );
            key = new FCurveKey();
            key.time = currentTime;
            key.value = rotVal[l];
            
            key.left_type = LINEAR_INTERPOL;
            key.right_type = LINEAR_INTERPOL;
            
            fCurve.addKey( key );
          }
          
        } else if (k == 'fov') {
          param = obj3d.parameterWithName("fieldOfView");
          takeNode = getTakeNodeWithName( param, currentTake.name );
          
          fCurve = takeNode.fCurveAtIndex( 0 );
          key = new FCurveKey();
          key.time = currentTime;
          key.value = parseFloat(obj.keys[j][k]) * fovFac;
          
          key.left_type = LINEAR_INTERPOL;
          key.right_type = LINEAR_INTERPOL;
          
          fCurve.addKey( key );
        }
      }
    }
    
    obj3d.update();
  }
}

function getTakeNodeWithName( param, name ) {
  var takeNode = param.takeNodeWithName( name );
  if (takeNode == null) {
    takeNode = param.addTakeNode( name );
  }
  return takeNode;
}