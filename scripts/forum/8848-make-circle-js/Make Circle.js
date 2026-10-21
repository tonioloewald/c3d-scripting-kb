// Source: https://www.cheetah3d.com/forum/index.php?threads/8848/post-80067
// Author: uncle808us (Cheetah3D forum), posted 2013-06-24
// Thread: "Make Circle.js"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Make Circle.js
//
// 2012-09-27: firset release
// 2012-09-28: bug fixed. Angle Adjuster added.
//
// Hiroto Tsubaki tg@tres-graficos.jp
//

function buildUI( tool ) {
  tool.addParameterSeparator("Make Circle");
  
  tool.addParameterFloat("circle radius", 0, 0, 10000, false, false);
  tool.addParameterBool("equal alignment", 1, 0, 1, false, false);
  
  tool.addParameterButton("make circle", "make", "makeCircle");
  
  tool.addParameterSeparator("Angle Adjuster");
  
  tool.addParameterFloat("gap angle", 0, -360, 360, false, false);
  tool.addParameterButton("adjust angle", "adjust", "adjustAngle");
}

var cachedObj;
var cachedVertices;
var cachedCenterMat;
var cachedCenterMatInverse;

function makeCircle( tool ) {
  var doc = tool.document();
  var obj = doc.selectedObject();
  
  var circleRadius = tool.getParameter("circle radius");
  var equalAlignment = tool.getParameter("equal alignment");
  
  // error check
  if (doc.editMode() != POLY_MODE) {
    OS.beep(); return;
  }
  
  if (obj && obj.type() == POLYGONOBJ) {
    var core = obj.core();
    var i, j;
    
    var indices = new Array();
    var normal = new Vec3D();
    var normalCount = 0;
    var normals = new Array();
    
    var vertexCount = core.vertexCount();
    var polygonCount = core.polygonCount();
    
    // check vertices weight.
    for (i = 0;i < vertexCount;i++) {
      indices[i] = 0;
    }
    
    for (i = 0;i < polygonCount;i++) {
      var polygonSize = core.polygonSize( i );
      for (j = 0;j < polygonSize;j++) {
        var vertexIndex = core.vertexIndex( i , j );
        indices[ vertexIndex ] += 1;
      }
    }
    
    // collect selected vertices.
    var sel = new Array();
    for (i = 0;i < polygonCount;i++) {
      if (core.polygonSelection( i )) {
        normalCount++;
        normal = normal.add( core.normal( i ) );
        var polygonSize = core.polygonSize( i );
        for (j = 0;j < polygonSize;j++) {
          var vertexIndex = core.vertexIndex( i , j );
          var selCheck = isExistIndex( sel, vertexIndex );
          if (selCheck == -1) {
            sel.push( new Array( vertexIndex, 1 ) );
            normals.push( core.normal( i, j ) );
          } else {
            sel[ selCheck ][1] += 1;
          }
        }
      }
    }
    
    // too less selection to make circle
    if (sel.length < 1) return;
    
    // get normal of selection
    normal = normal.multiply( 1 / normalCount );
    //print( normalCount + ':' + normal.x.toFixed(3) + ',' + normal.y.toFixed(3) + ',' + normal.z.toFixed(3) );
    
    // collect vertices to move.
    var vertices = new Array();
    var subNormals = new Array();
    var len = sel.length;
    for (i = 0;i < len;i++) {
      if ( indices[ sel[i][0] ] != sel[i][1] ) {
        vertices.push( sel[i][0] );
        subNormals.push( normals[i] );
      }
    }
    
    // calculate center vector.
    var len = vertices.length;
    var center = new Vec3D();
    for (i = 0;i < len;i++) {
      center = center.add( core.vertex( vertices[i] ) );
    }
    center = center.multiply( 1/len );
    
    var radius = 0;
    if (circleRadius > 0) {
      radius = circleRadius;
    } else {
      for (i = 0;i < len;i++) {
        var vec = center.sub( core.vertex( vertices[i] ) );
        var distance = Math.sqrt( vec.x*vec.x + vec.y*vec.y + vec.z*vec.z );
        if (radius < distance) {
          radius = distance;
        }
      }
    }
    
    //print( 'radius:'+radius );
    
    var RAD2DEG = 180/Math.PI;
    var theta = Math.acos(normal.y)*RAD2DEG;
    var phi = Math.atan2(normal.x, normal.z)*RAD2DEG;
    
    //print( 'theta:'+theta.toFixed(3)+', phi:'+phi.toFixed(3) );
    
    var transMat = new Mat4D(TRANSLATE, -center.x, -center.y, -center.z);
    var rotMat = new Mat4D(ROTATE_HPB, 0, -theta, 0).multiply( new Mat4D(ROTATE_HPB, -phi, 0, 0) );
    var centerMat = rotMat.multiply( transMat );
    var centerMatInverse = centerMat.inverse();
    
    if (tool.parameterWithName) obj.recordGeometryForUndo();
    
    if (equalAlignment) {
      var XZ = [];
      var Xz = [];
      var xz = [];
      var xZ = [];
      
      for (i = 0;i < len;i++) {
        var vertexIndex = vertices[i];
        var vertex = core.vertex( vertexIndex );
        
        vertex = centerMat.multiply( vertex );
        
        if (vertex.x >= 0) {
          if (vertex.z >= 0) {
            XZ.push( [ vertexIndex, vertex, centerMat.multiply(subNormals[i]) ] );
          } else {
            Xz.push( [ vertexIndex, vertex, centerMat.multiply(subNormals[i]) ] );
          }
        } else {
          if (vertex.z >= 0) {
            xZ.push( [ vertexIndex, vertex, centerMat.multiply(subNormals[i]) ] );
          } else {
            xz.push( [ vertexIndex, vertex, centerMat.multiply(subNormals[i]) ] );
          }
        }
      }
      
      XZ = qsort( XZ, cmpAngle );
      Xz = qsort( Xz, cmpAngle );
      xz = qsort( xz, cmpAngle );
      xZ = qsort( xZ, cmpAngle );
      
      var alignVertices = XZ.reverse().concat( Xz.reverse(), xz.reverse(), xZ.reverse() );
      
      //print('----');
      for (i = 0;i < len;i++) {
        var vertexInfo = alignVertices[i];
        var subNormal = vertexInfo[2];
        
        //print( '(' + vertexInfo[1].x.toFixed(3) + ', ' + vertexInfo[1].z.toFixed(3) + ')' );
        
        vertexInfo[1].x = Math.sin( Math.PI * 2 / len * i ) * radius;
        vertexInfo[1].z = Math.cos( Math.PI * 2 / len * i ) * radius;
        
        vertexInfo[1] = centerMatInverse.multiply( vertexInfo[1] );
        
        core.setVertex( vertexInfo[0], vertexInfo[1] );
      } 
    } else {
      for (i = 0;i < len;i++) {
        var vertexIndex = vertices[i];
        var vertex = core.vertex( vertexIndex );
        
        vertex = centerMat.multiply( vertex );
        var distance = Math.sqrt( vertex.x*vertex.x + vertex.y*vertex.y + vertex.z*vertex.z );
        var scale = radius / distance;
        
        vertex = vertex.multiply( scale );
        
        vertex = centerMatInverse.multiply( vertex );
        
        core.setVertex( vertexIndex, vertex );
      }
    }
    
    cachedObj = obj;
    cachedVertices = vertices;
    cachedCenterMat = centerMat.copy();
    cachedCenterMatInverse = centerMatInverse.copy();
    

    obj.update();
    
    tool.setParameter("gap angle", 360 / len / 2 );
  }
}

function adjustAngle( tool ) {
  var doc = tool.document();
  var obj = doc.selectedObject();
  
  // error check
  if (doc.editMode() != POLY_MODE) {
    OS.beep(); return;
  }
  
  if (!cachedObj || !cachedVertices || !cachedCenterMat || !cachedCenterMatInverse) {
    OS.beep(); return;
  }
  
  if (obj.getParameter("name") != cachedObj.getParameter("name") && obj.type() != cachedObj.type()) {
    OS.beep(); return;
  }
  
  if (tool.parameterWithName) cachedObj.recordGeometryForUndo();

  var core = cachedObj.core();
  var angle = tool.getParameter("gap angle");
  var i;
  var len = cachedVertices.length;
  if (obj && obj.type() == POLYGONOBJ) {
    for (i = 0;i < len;i++) {
      var vertexIndex = cachedVertices[i];
      var vertex = core.vertex( vertexIndex );
      
      vertex = cachedCenterMat.multiply( vertex );
      var rotMat = new Mat4D( ROTATE_HPB, angle, 0, 0 );
      vertex = rotMat.multiply( vertex );
      
      vertex = cachedCenterMatInverse.multiply( vertex );
      
      core.setVertex( vertexIndex, vertex );
    }
    
    cachedObj.update();
  }
}

function isExistIndex( list, num ) {
  var len = list.length;
  var i;
  for (i = 0;i < len;i++) {
    if (list[i][0] == num) return i;
  }
  return -1;
}

function cmpAngle( a, b ) {
  return (Math.atan2(a[1].z, a[1].x) > Math.atan2(b[1].z, b[1].x))? 1 : -1;
}

function qsort( ary, cmp ) {
  function q(ary, head, tail) {
    if (tail - head <= 0) return ary;
    
    var pivot = ary[ parseInt( head + (tail - head)/2 ) ];
    if (cmp( ary[tail], pivot ) < 0) pivot = ary[tail];
    
    var i = head - 1;
    var j = tail + 1;
    while(1) {
      while(cmp(ary[++i], pivot) < 0);
      while(cmp(ary[--j], pivot) > 0);
      if (i >= j) break;
      var tmp = ary[i];
      ary[i] = ary[j];
      ary[j] = tmp;
    }
    if (head < i-1) q(ary, head, i-1);
    if (j + 1 < tail) q(ary, j+1, tail);
    return ary;
  }
  return q(ary, 0, ary.length - 1);
}