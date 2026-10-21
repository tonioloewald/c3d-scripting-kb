// Source: https://www.cheetah3d.com/forum/index.php?threads/5752/post-128034
// Author: Filip (Cheetah3D forum), posted 2024-04-02
// Thread: "Master List of Scripts"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// F-curve Linker.js
//

// 20120417: first released.
// 20120913: bug fixed.

//

function buildUI( tag ) {
                
    tag.addParameterInt("tag index", -1, -1, 100, false, false);
    tag.addParameterSelector("parameter", ["position", "rotation", "scale", "other"], false, false);
    tag.addParameterString("p. name", "", false);
    tag.addParameterSelector("get for", ["x or h", "y or b", "z or p", "w or a"], false, false);
    tag.addParameterButton("check parameters", "check", "checkObjectAInfo");
    
    tag.addParameterSeparator("Target");
    
    tag.addParameterLink("target object", true);
    
    tag.addParameterInt("target tag index", -1, -1, 100, false, false);
    tag.addParameterSelector("target parameter", ["position", "rotation", "scale", "other"], false, false);
    tag.addParameterString("target p. name", "", false);
    tag.addParameterSelector("set for", ["x or h", "y or b", "z or p", "w or a"], false, false);
    tag.addParameterButton("check target parameters", "check", "checkObjectBInfo");
    
    tag.addParameterSeparator("Conversion");
    
    tag.addParameterString("formula", "v", false, false);    
    
    tag.addParameterSeparator("Checker");
    tag.addParameterFloat("value", 0, -10000, 10000, false, false);
    tag.addParameterFloat("target value", 0, -10000, 10000, false, false);
    
    tag.addParameterSeparator("Bake");
    
    tag.addParameterButton("bake f-curve to target", "bake", "bakeFCurve");
}

function tagForType( obj, typeNum ) {
  var returnTag = undefined;
  var len = obj.tagCount();
  for (var i = 0;i < len;i++) {
    var tag = obj.tagAtIndex( i );
    if (tag.type() == typeNum) {
      returnTag = tag;
      break;
    }
  }
  return returnTag;
}

function getParameterTypeForName( obj, name ) {
  var info;

  var nameInfo = name.split(".");
  if (nameInfo.length > 2) {
    name = nameInfo[2];
  }

  var infos = obj.parameterInfo();
  var len = infos.length;
  for (var i = 0;i < len;i++) {
    if (infos[i][0] == name) {
      info = infos[i];
    }
  }

  return (info)? info[1] : undefined;
}

function checkObjectAInfo( tag ) {
    var AObj = tag.owner();
    var AObjTag = tag.getParameter("tag index");
    
    if (AObj) {
      var ATarget;
      if (AObjTag > -1) {
        if (AObj.tagCount() > AObjTag) {
          ATarget = AObj.tagAtIndex( AObjTag );
        } else {
          ATarget = undefined;
        }
      } else {
        ATarget = AObj;
      }
    }

    var pname = tag.getParameter("p. name");
    if (pname.indexOf("material") === 0) {
      var title = "Object's material parameters";
      showMaterialInfo( ATarget, title, pname );
    } else {  
      var title = (AObjTag > -1)? "Object's tag parameters" : "Object parameters";
      showObjectInfo( ATarget, title );
    }
}

function checkObjectBInfo( tag ) {
    var BObj = tag.getParameter("target object");
    var BObjTag = tag.getParameter("target tag index");

    if (BObj) {
      var BTarget;
      if (BObjTag > -1) {
        if (BObj.tagCount() > BObjTag) {
          BTarget = BObj.tagAtIndex( BObjTag );
        } else {
          BTarget = undefined;
        }
      } else {
        BTarget = BObj;
      }
    }
    
    var pname = tag.getParameter("target p. name");
    if (pname.indexOf("material") === 0) {
      var title = "Object's material parameters";
      showMaterialInfo( BTarget, title, pname );
    } else {  
      var title = (BObjTag > -1)? "Target object's tag parameters" : "Target object parameters";
      showObjectInfo( BTarget, title );
    }
}

function showMaterialInfo( obj, title, pname ) {
  if (!obj && obj.type() != SHADERTAG) {
    OS.beep();
    return;
  }

  str = '';

  nodeInfo = pname.split(".");

  var material = obj.document().materialAtIndex( obj.linkedToMaterial() );
  var nodeCount = material.nodeCount();
  for (var i = 0;i < nodeCount;i++) {
    var node = material.nodeAtIndex(i);
    if (nodeInfo.length == 1) {
      str += 'id:' + node.id() + ' nodeType: ' + node.nodeType() + "\n";
    }
    if (nodeInfo.length > 1 && node.id() == nodeInfo[1]) {
      str += 'id:' + node.id() + ' nodeType: ' + node.nodeType() + "\n";
      var info = node.parameterInfo();
      for (var j = 0;j < info.length;j++) {
        str += '  ' + info[j][0] + " [" + info[j][1] + "] " + "\n";
      }      
    }
  }

  OS.messageBox( title, str );
}

function showObjectInfo( obj, title ) {
  if (!obj) {
    OS.beep();
    return;
  }
  var info = obj.parameterInfo();
  
  var str = '';
  for(var i = 0;i < info.length;i++) {
    str += info[i][0] + " ["+info[i][1]+"] " + "\n";
  }
  
  OS.messageBox( title, str );
}

var animTimer = 0;

function performExpression( tag ) {
    
    if ( ! tag.getParameter("tagOn") ) return;
        
    var AObj = tag.owner();

    var AObjTag = tag.getParameter("tag index");
    var AObjParam = tag.getParameter("parameter");
    var AObjParamName = (AObjParam == 3)? tag.getParameter("p. name") : '';
    var AObjAt = tag.getParameter("get for");

    var BObj = tag.getParameter("target object");
    var BObjTag = tag.getParameter("target tag index");
    var BObjParam = tag.getParameter("target parameter");
    var BObjParamName = (BObjParam == 3)? tag.getParameter("target p. name") : '';
    var BObjAt = tag.getParameter("set for");

    var conversionFormula = tag.getParameter("formula");
    
    if (AObj && BObj) {
      var ATarget = getTarget( AObj, AObjTag, AObjParamName );
      var BTarget = getTarget( BObj, BObjTag, BObjParamName );
      
      switch( AObjParam ) {
        case 0:
          AObjParamName = "position";
          break;
        case 1:
          AObjParamName = "rotation";
          break;
        case 2:
          AObjParamName = "scale";
          break;
      }
      switch( BObjParam ) {
        case 0:
          BObjParamName = "position";
          break;
        case 1:
          BObjParamName = "rotation";
          break;
        case 2:
          BObjParamName = "scale";
          break;
      }
      var fromType = getParameterTypeForName( ATarget, AObjParamName );
      var setType = getParameterTypeForName( BTarget, BObjParamName );
      
      // errorCheck
      if (!fromType || !setType) return;
  
      if (AObjParamName.indexOf("material.") === 0) {
        var pName = AObjParamName.split(".");
        var fParam = ATarget.getParameter(pName[2]);
      } else {
        var fParam = ATarget.getParameter(AObjParamName);          
      }
      var param;
      
      switch( AObjAt ) {
        case 0: // x
          param = (fromType == 'Vec2D' || fromType == 'Vec3D' || fromType == 'Vec4D')? fParam.x : fParam;
          break;
        case 1: // y
          param = (fromType == 'Vec2D' || fromType == 'Vec3D' || fromType == 'Vec4D')? fParam.y : fParam;
          break;
        case 2: // z
          param = (fromType == 'Vec3D' || fromType == 'Vec4D')? fParam.z : fParam;
          param = (fromType == 'Vec2D')? fParam.x : param;
          break;
        case 3: // w
          param = (fromType == 'Vec4D')? fParam.w : fParam;
          param = (fromType == 'Vec2D' || fromType == 'Vec3D')? fParam.x : param;
          break;
      }
      
      tag.setParameter("value", param, false);
      
      var v = param;

      if (conversionFormula.indexOf("v") !== false) {
        eval( "v = " + conversionFormula + ";");
      }

      param = v;

      //
      tag.setParameter("target value", param, false);
      //

      var oldParam, preparedParam;
      
      switch( BObjAt ) {
        case 0: // x
          switch (setType) {
            case 'Vec2D':
              oldParam = BTarget.getParameter(BObjParamName);
              preparedParam = new Vec2D( param, oldParam.y );
              break;
            case 'Vec3D':
              oldParam = BTarget.getParameter(BObjParamName);
              preparedParam = new Vec3D( param, oldParam.y, oldParam.z );
              break;
            case 'Vec4D':
              oldParam = BTarget.getParameter(BObjParamName);
              preparedParam = new Vec4D( param, oldParam.y, oldParam.z, oldParam.w );
              break;
            case 'Bool':
              preparedParam = (param > 0)? true : false;
              break;
            case 'Int':
              preparedParam = Math.floor( param );
              break;
            case 'Float':
              preparedParam = param;
              break;
          }
          break;
        case 1: // y
          switch (setType) {
            case 'Vec2D':
              oldParam = BTarget.getParameter(BObjParamName);
              preparedParam = new Vec2D( oldParam.x, param );
              break;
            case 'Vec3D':
              oldParam = BTarget.getParameter(BObjParamName);
              preparedParam = new Vec3D( oldParam.x, param, oldParam.z );
              break;
            case 'Vec4D':
              oldParam = BTarget.getParameter(BObjParamName);
              preparedParam = new Vec4D( oldParam.x, param, oldParam.z, oldParam.w );
              break;
            case 'Bool':
              preparedParam = (param > 0)? true : false;
              break;
            case 'Int':
              preparedParam = Math.floor( param );
              break;
            case 'Float':
              preparedParam = param;
              break;
          }
          break;
        case 2: // z
          switch (setType) {
            case 'Vec2D':
              oldParam = BTarget.getParameter(BObjParamName);
              preparedParam = new Vec2D( oldParam.x, oldParam.y );
              break;
            case 'Vec3D':
              oldParam = BTarget.getParameter(BObjParamName);
              preparedParam = new Vec3D( oldParam.x, oldParam.y, param );
              break;
            case 'Vec4D':
              oldParam = BTarget.getParameter(BObjParamName);
              preparedParam = new Vec4D( oldParam.x, oldParam.y, param, oldParam.w );
              break;
            case 'Bool':
              preparedParam = (param > 0)? true : false;
              break;
            case 'Int':
              preparedParam = Math.floor( param );
              break;
            case 'Float':
              preparedParam = param;
              break;
          }
          break;
        case 3: // w
          switch (setType) {
            case 'Vec2D':
              oldParam = BTarget.getParameter(BObjParamName);
              preparedParam = new Vec2D( oldParam.x, oldParam.y );
              break;
            case 'Vec3D':
              oldParam = BTarget.getParameter(BObjParamName);
              preparedParam = new Vec3D( oldParam.x, oldParam.y, oldParam.z );
              break;
            case 'Vec4D':
              oldParam = BTarget.getParameter(BObjParamName);
              preparedParam = new Vec4D( oldParam.x, oldParam.y, oldParam.z, param );
              break;
            case 'Bool':
              preparedParam = (param > 0)? true : false;
              break;
            case 'Int':
              preparedParam = Math.floor( param );
              break;
            case 'Float':
              preparedParam = param;
              break;
          }
          break;
      }
      
      var setMode;
      if (animTimer != tag.document().animPosition()) {
        setMode = false;
      } else {
        setMode = false;
      }
      
      if (BObjParamName.indexOf("material.") === 0) {
        var pName = BObjParamName.split(".");
        BTarget.setParameter(pName[2], preparedParam, setMode);
      } else {
        BTarget.setParameter(BObjParamName, preparedParam, setMode);
      }

    }

    animTimer = tag.document().animPosition();

}

function bakeFCurve( tag ) {
  var currentTake = tag.document().currentTake();
  
  var AObj = tag.owner();
  var AObjTag = tag.getParameter("tag index");
  var AObjParam = tag.getParameter("parameter");
  var AObjParamName = (AObjParam == 3)? tag.getParameter("p. name") : '';
  var AObjAt = tag.getParameter("get for");
  
  var BObj = tag.getParameter("target object");
  var BObjTag = tag.getParameter("target tag index");
  var BObjParam = tag.getParameter("target parameter");
  var BObjParamName = (BObjParam == 3)? tag.getParameter("target p. name") : '';
  var BObjAt = tag.getParameter("set for");
  
  var conversionFormula = tag.getParameter("formula");
  
  if (AObj && BObj) {
    var ATarget = getTarget( AObj, AObjTag, AObjParamName );
    var BTarget = getTarget( BObj, BObjTag, BObjParamName );
    
    switch( AObjParam ) {
      case 0:
        AObjParamName = "position";
        break;
      case 1:
        AObjParamName = "rotation";
        break;
      case 2:
        AObjParamName = "scale";
        break;
    }
    switch( BObjParam ) {
      case 0:
        BObjParamName = "position";
        break;
      case 1:
        BObjParamName = "rotation";
        break;
      case 2:
        BObjParamName = "scale";
        break;
    }
    var fromType = getParameterTypeForName( ATarget, AObjParamName );
    var setType = getParameterTypeForName( BTarget, BObjParamName );
    
    if (!fromType || !setType) return;
    
    if (AObjParamName.indexOf("material.") === 0) {
      var pName = AObjParamName.split(".");
      var fParam = ATarget.parameterWithName( pName[2] );
    } else {
      var fParam = ATarget.parameterWithName( AObjParamName );
    }
    if (BObjParamName.indexOf("material.") === 0) {
      var pName = BObjParamName.split(".");
      var sParam = BTarget.parameterWithName( pName[2] );
    } else {
      var sParam = BTarget.parameterWithName( BObjParamName );
    }

    //print( fParam.name() + '/' + fromType + ':' + sParam.name() + '/' + setType );

    var takeNode = fParam.takeNodeWithName( currentTake.name );
    if (takeNode == null) {
      takeNode = fParam.addTakeNode( currentTake.name );
    }
    var setTakeNode = sParam.takeNodeWithName( currentTake.name );
    if (setTakeNode == null) {
      setTakeNode = sParam.addTakeNode( currentTake.name );
    }

    if (takeNode && setTakeNode) {
      var fcurve;
      var scurve;
      switch( AObjAt ) {
        case 0:
          fcurve = (fromType == 'Vec2D' || fromType == 'Vec3D' || fromType == 'Vec4D')? takeNode.fCurveAtIndex( 0 ) : takeNode.fCurveAtIndex( 0 );
          break;
        case 1:
          fcurve = (fromType == 'Vec2D' || fromType == 'Vec3D' || fromType == 'Vec4D')? takeNode.fCurveAtIndex( 1 ) : takeNode.fCurveAtIndex( 0 );
          break;
        case 2:
          fcurve = (fromType == 'Vec3D' || fromType == 'Vec4D')? takeNode.fCurveAtIndex( 2 ) : takeNode.fCurveAtIndex( 0 );
          break;
        case 3:
          fcurve = (fromType == 'Vec4D')? takeNode.fCurveAtIndex( 3 ) : takeNode.fCurveAtIndex( 0 );
          break;
      }
      switch( BObjAt ) {
        case 0:
          scurve = (setType == 'Vec2D' || setType == 'Vec3D' || setType == 'Vec4D')? setTakeNode.fCurveAtIndex( 0 ) : setTakeNode.fCurveAtIndex( 0 );
          break;
        case 1:
          scurve = (setType == 'Vec2D' || setType == 'Vec3D' || setType == 'Vec4D')? setTakeNode.fCurveAtIndex( 1 ) : setTakeNode.fCurveAtIndex( 0 );
          break;
        case 2:
          scurve = (setType == 'Vec3D' || setType == 'Vec4D')? setTakeNode.fCurveAtIndex( 2 ) : setTakeNode.fCurveAtIndex( 0 );
          break;
        case 3:
          scurve = (setType == 'Vec4D')? setTakeNode.fCurveAtIndex( 3 ) : setTakeNode.fCurveAtIndex( 0 );
          break;
      }
      
      {
        BTarget.recordParametersForUndo(); 
        scurve.removeAllKeys();
      }
      
      var count = fcurve.keyCount();
      for (var i = 0;i < count;i++) {
        var key = fcurve.keyAtIndex(i);
        var val = key.value;
        
        var v = val;

        if (conversionFormula.indexOf("v") !== false) {
          eval( "v = " + conversionFormula + ";");
        }

        val = v;
        
        key.value = val;
        
        scurve.addKey( key );
      }
      
      tag.setParameter("tagOn", false, false);
    }
  }
  
}

function getTarget( obj, ind, pname ) {
  if (ind > -1) {
    if (obj.tagCount() > ind) {
      var tag = obj.tagAtIndex( ind );
      if (tag.type() == SHADERTAG && pname.indexOf("material.") === 0) {
        var node = undefined;
        var info = pname.split(".");
        if (info.length > 1) {
          var material = tag.document().materialAtIndex( tag.linkedToMaterial() );
          node = material.nodeWithID( parseInt(info[1]) );
        }
        return node;
      } else {
        return tag;
      }
    } else {
      return undefined;
    }
  } else {
    return obj;
  }
}
