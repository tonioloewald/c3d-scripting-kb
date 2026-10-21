// Source: https://www.cheetah3d.com/forum/index.php?threads/10525/post-88472
// Author: podperson (Cheetah3D forum), posted 2014-06-30
// Thread: "Reflect-O-Matic"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
    Reflect-o-matic Tool
    --------------------

    By and copyright (c) Tonio Loewald 2014
    Free to good homes! Please acknowledge the work of others.
*/

var reflection_sources = ["lights", "geometry"];

function buildUI(tool) {
    tool.addParameterSelector("Reflection Source", reflection_sources,false,false);
	tool.addParameterButton("Reflections","OK","reflect");
}

function printVec(name, x){
    print( name + ': ' + x.x + ', ' + x.y + ', ' + x.z );
}

function reflect(tool){
    var doc = tool.document(),
        source = reflection_sources[tool.getParameter('Reflection Source')],
        obj = doc.selectedObject(),
        t = obj.obj2WorldMatrix(),
        camera = doc.activeCamera(),
        camera_position = camera.obj2WorldMatrix().multiply( new Vec3D(0,0,0) ),
        core = false,
        position = false,
        normal = false,
        num_lights_created = 0; 
    
    // averages out the positions of the polygon's vertices
    function facePosition(whichPoly){
        var p = new Vec3D(0,0,0),
            c = core.polygonSize(whichPoly),
            q;
        for( var i = 0; i < c; i++ ){
            q = core.vertex( core.vertexIndex(whichPoly, i) );
            p.x += q.x;
            p.y += q.y;
            p.z += q.z;
        }
        p.x /= c;
        p.y /= c;
        p.z /= c;
        return p;
    }
    
    if( obj && obj.type() === POLYGONOBJ ){
        // first we need to know which polygon the user has selected
        core = obj.core();
        for( var i = 0, c = core.polygonCount(); i < c; i++ ){
            if( core.polygonSelection(i) ){
                // and store its position and normal transformed into global coordinates
                position = t.multiply( facePosition(i) );
                normal = core.normal(i);
                normal = t.multiply(normal);
                normal = normal.sub(obj.getParameter('position'));
                
                // now we need the active camera position (also in global coordinates)
                // Determine incidence vector given view angle
                // V := viewer position
                // N := surface normal
                // I := incidence vector
                // D := V - (V•N)N (perpendicular vector from line through N to V)
                // I = V - 2D
                var V = camera_position.sub( position );
                var N = normal;
                var D = V.sub( N.multiply( V.dot(N) ) );
                var I = V.sub( D.multiply(2) );

                var light,
                    target,
                    light_position = position.add(I.multiply(2));
                
                num_lights_created += 1;
                target = doc.addObject(FOLDER);
                target.setParameter('name', 'reflection-target.' + num_lights_created);
                doc.root().addChildAtIndex( target, doc.root().childCount() );
                target.setParameter('position', position);
                switch( source ){
                    case 'lights':
                        light = doc.addObject(LIGHT);
                        light.setParameter('lightType', 1 ); // area light
                        light.setParameter('attenuation', 0 ); // no attenuation
                        light.setParameter('geometry', true ); // show geometry
                        light.setParameter('height', 1.0 );
                        light.setParameter('width', 1.0 );
                        break;
                    case 'geometry':
                    default:
                        light = doc.addObject(PLANE);
                        light.setParameter('sizeX', 1.0 );
                        light.setParameter('sizeY', 1.0 );
                        break;
                }
                light.setParameter('position', light_position );
                doc.root().addChildAtIndex( light, doc.root().childCount() );
                light.setParameter('name', 'reflection-source.' + num_lights_created );
                
                // Point at the target
                var tag = light.addTagOfType(TARGETTAG);
                tag.setParameter('targetLink', target);
                tag.setParameter('offset', new Vec3D(0,-90,0));
            }
        }
    }
    
    if( !position ){
		OS.messageBox("Error","Please select a face before calling that script.");
    }
}