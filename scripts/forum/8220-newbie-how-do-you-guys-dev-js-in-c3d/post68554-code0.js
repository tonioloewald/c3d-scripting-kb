// Source: https://www.cheetah3d.com/forum/index.php?threads/8220/post-68554
// Author: tg_jp (Cheetah3D forum), posted 2012-03-15
// Thread: "[newbie] how do you guys dev JS in C3D..?"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//

function Vec2D_toString( vec ) {
	return vec.x.toFixed(6) + ' ' + vec.y.toFixed(6);
}

function Vec3D_toString( vec ) {
	return vec.x.toFixed(6) + ' ' + vec.y.toFixed(6) + ' ' + vec.z.toFixed(6);
}

function Vec4D_toString( vec ) {
	return vec.x.toFixed(6) + ' ' + vec.y.toFixed(6) + ' ' + vec.z.toFixed(6) + ' ' + vec.w.toFixed(6);
}

function printInfo( info, obj ) {
    switch( info[1] ) {
        case "Vec2D":
            print(info[0] +" [" + info[1] + "]:"+Vec2D_toString(obj.getParameter(info[0])));
            break;
        case "Vec3D":
            print(info[0] +" [" + info[1] + "]:"+Vec3D_toString(obj.getParameter(info[0])));
            break;
        case "Vec4D":
            print(info[0] +" [" + info[1] + "]:"+Vec4D_toString(obj.getParameter(info[0])));
            break;
        case "Link":
            print(info[0] +" [" + info[1] + "]:");
            break;
        default:
            print(info[0] +" [" + info[1] + "]:"+obj.getParameter(info[0]));
    }
}
function main(doc) {
   var obj = doc.selectedObject();
   
   print('---- Object Info ---'); //
   
   if ( obj ) {
       print('-- object type:'+obj.type());
       var info = obj.parameterInfo();
       for(var j=0;j<info.length;j++) {
           printInfo( info[j], obj );
       }
       var tcount = obj.tagCount();
       for (var i = 0;i < tcount;++i) {
           var tag = obj.tagAtIndex(i);
           info = tag.parameterInfo();
           print('-- tag '+i+' type:'+tag.type());
           for(var j=0;j<info.length;j++){
                printInfo( info[j], tag );
           }
           if (tag.type() == 102) { // material tag.
               var material = doc.materialAtIndex(tag.linkedToMaterial());
               print('-- linked Material --');
               info = material.parameterInfo();
               for(var j=0;j<info.length;j++){
                    printInfo( info[j], material );
               }
               print( 'rib:' + material.rib ); // rib is obsoleted!
               print( 'color:' + Vec4D_toString( material.color() ) );
               print( 'colorMap:' + material.colorMap() );
               print( 'emission:' + Vec4D_toString( material.emission() ) );
               print( 'shininess:' + material.shininess() );
               print( 'specular:' + Vec4D_toString( material.emission() ) );
           }
       }
   }
}