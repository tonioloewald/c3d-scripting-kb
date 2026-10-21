// Source: https://www.cheetah3d.com/forum/index.php?threads/12598/post-108895
// Author: Oval (Cheetah3D forum), posted 2017-08-31
// Thread: "BetterSVGImport.js"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
//  SVG Graph Loader.js
//
//  this is a Tool script. Place this into ~/Library/Application Support/Cheetah3D/scripts/Tool folder and reload script menu.
//


function main(doc){
 	var scale = 0.035277777777778;
	var path=OS.runOpenPanel("svg");
    if(path==null){
	return;
	}
        
    var file = new File(path);
	print(path);

	file.open(READ_MODE);
    if (file.isOpen() == false) return;
	var line = file.read( file.size() );
	print(line);
		line = line.replace(/[\r\n]/g, ' ');
	file.close();

	reg_path = /<path[^>\/]*\/>/g;
	path = reg_path.exec(line);
	print(path);
	var sub = new Vec3D(0,0,0);
	if(!path) return;
	spl = makeCurve(doc, path[0], scale, sub);
}



function rotate(x, y, rad){
    return {
    x: x * Math.cos(rad) - y * Math.sin(rad),
    y: x * Math.sin(rad) + y * Math.cos(rad)
    }
}

function radians(degress){
    return degress * (Math.PI / 180)
}
                             
                             function pause(n){
                             today=new Date()
                             today2=today
                             while((today2-today)<=n){
                             today2=new Date()
                             }
                             }
                             
                             

								 
                             
function makeCurve(doc, line, scale, sub)
{
                             var cpx_last,cpy_last = 0;
                             var is_last_was_CSQT = false;
                             
							 
							 var spl = doc.addObject( SPLINE );
							 spl.setParameter("name", "Curve");
							 splcore = spl.core();
							 
							 var reg_numbers = /(\-?\d*\.*\d*)[!\d]+/g;
							 
							 var d = line.match(/\sd\s*=+"(.+?)"/);
							 var px = 0
							 var py = 0;
							 var px1 = 0, px2 = 0;
							 var py1 = 0, py2 = 0;
							 var reg_d = /([MmZzLlHhVvCcSsQqTtAa])([0-9e,\.\-\s\n]*)/gm;
        //print(d[1]);
        while( dm = reg_d.exec( d[1] ) ) {
							 //dm[2] = dm[2].replace(/\-/g, ' -').trim();
							 //print("px = " + px + "      py = " + py);
							 var pos = dm[2].match(reg_numbers);
							 //if(pos != null) print(dm[1] + ":" + pos.length + "     " + pos);
							 switch( dm[1] ) {
							 case 'M':
							 for( i = 0;i < pos.length;i=i+2) {
							 px = parseFloat( pos[i] );
							 py = parseFloat( pos[i+1] );
							 splcore.move( ( new Vec3D( px, 0, py) ).multiply( scale ).sub(sub) );
							 is_last_was_CSQT = false;
							 }
							 break;
							 case 'm':
							 for ( i = 0;i < pos.length;i=i+2) {
							 px += parseFloat( pos[i] );
							 py += parseFloat( pos[i+1] );
							 splcore.move( ( new Vec3D( px, 0, py) ).multiply( scale ).sub(sub) );
							 is_last_was_CSQT = false;
							 }
							 break;
							 case 'L':
							 for ( i = 0;i < pos.length;i=i+2) {
							 px = parseFloat( pos[i] );
							 py = parseFloat( pos[i+1] );
							 splcore.line( ( new Vec3D( px, 0, py) ).multiply( scale ).sub(sub) );
							 is_last_was_CSQT = false;
							 }
							 break;
							 
							 case 'l':
							 for ( i = 0;i < pos.length;i=i+2) {
							 px += parseFloat( pos[i] );
							 py += parseFloat( pos[i+1] );
							 splcore.line( ( new Vec3D( px, 0, py) ).multiply( scale ).sub(sub) );
							 is_last_was_CSQT = false;
							 }
							 break;
							 
							 case 'C':
							 for ( i = 0;i < pos.length;i=i+6) {
							 px1 = parseFloat( pos[i] );
							 py1 = parseFloat( pos[i+1] );
							 px2 = parseFloat( pos[i+2] );
							 py2 = parseFloat( pos[i+3] );
							 px  = parseFloat( pos[i+4] );
							 py  = parseFloat( pos[i+5] );
							 cpx_last = px2;
							 cpy_last = py2;
							 splcore.curve(  ( new Vec3D( px1, 0, py1) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px2, 0, py2) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px , 0, py) ).multiply( scale ).sub(sub));
							 is_last_was_CSQT = true;
							 }
							 break;
							 
							 case 'c':
							 for ( i = 0;i < pos.length;i=i+6) {
							 px1 = px + parseFloat( pos[i] );
							 py1 = py + parseFloat( pos[i+1] );
							 px2 = px + parseFloat( pos[i+2] );
							 py2 = py + parseFloat( pos[i+3] );
							 px  += parseFloat( pos[i+4] );
							 py  += parseFloat( pos[i+5] );
							 cpx_last = px2;
							 cpy_last = py2;
							 splcore.curve(  ( new Vec3D( px1, 0, py1) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px2, 0, py2) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px , 0, py) ).multiply( scale ).sub(sub));
							 is_last_was_CSQT = true;
							 }
							 break;
							 
							 case 'H':
							 for ( i = 0;i < pos.length;i++) {
							 px = parseFloat( pos[i] );
							 splcore.line( (new Vec3D( px, 0, py)).multiply( scale ).sub(sub) );
							 is_last_was_CSQT = false;
							 }
							 break;
							 case 'h':
							 for ( i = 0;i < pos.length;i++) {
							 px += parseFloat( pos[i] );
							 splcore.line( (new Vec3D( px, 0, py)).multiply( scale ).sub(sub) );
							 is_last_was_CSQT = false;
							 }
							 break;
							 case 'V':
							 for ( i = 0;i < pos.length;i++) {
							 py = parseFloat( pos[i] );
							 splcore.line( (new Vec3D( px, 0, py)).multiply( scale ).sub(sub) );
							 is_last_was_CSQT = false;
							 }
							 break;
							 case 'v':
							 for ( i = 0;i < pos.length;i++) {
							 py += parseFloat( pos[i] );
							 splcore.line( (new Vec3D( px, 0, py)).multiply( scale ).sub(sub) );
							 is_last_was_CSQT = false;
							 }
							 break;
							 case 'S':
							 for (i = 0;i < pos.length;i=i+4) {
							 px2 = parseFloat( pos[i] );
							 py2 = parseFloat( pos[i+1] );
							 is_last_was_CSQT ? px1 = px + (px - cpx_last) : px1 = px;
							 is_last_was_CSQT ? py1 = py + (py - cpy_last) : py1 = py;
							 px = parseFloat( pos[i+2] );
							 py = parseFloat( pos[i+3] );
							 cpx_last = px2;
							 cpy_last = py2;
							 
							 splcore.curve(  ( new Vec3D( px1, 0, py1) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px2, 0, py2) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px , 0, py) ).multiply( scale ).sub(sub));
							 is_last_was_CSQT = true;
							 
							 }
							 break;
							 case 's':
							 for (i = 0;i < pos.length;i=i+4) {
							 px2 = px + parseFloat( pos[i] );
							 py2 = py + parseFloat( pos[i+1] );
							 is_last_was_CSQT ? px1 = px + (px - cpx_last) : px1 = px;
							 is_last_was_CSQT ? py1 = py + (py - cpy_last) : py1 = py;
							 px += parseFloat( pos[i+2] );
							 py += parseFloat( pos[i+3] );
							 cpx_last = px2;
							 cpy_last = py2;
							 
							 splcore.curve(  ( new Vec3D( px1, 0, py1) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px2, 0, py2) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px , 0, py) ).multiply( scale ).sub(sub));
							 is_last_was_CSQT = true;
							 }
							 break;
							 case 'Q':
							 for (i = 0;i < pos.length;i=i+4) {
							 cx = parseFloat( pos[ i ] );
							 cy = parseFloat( pos[ i+1 ] );
							 px1 = px + 2*(cx - px)/3;
							 py1 = py + 2*(cy - py)/3;
							 px = parseFloat( pos[ i+2 ] );
							 py = parseFloat( pos[ i+3 ] );
							 px2 = px + 2*(cx - px)/3;
							 py2 = py + 2*(cy - py)/3;
							 cpx_last = cx;
							 cpy_last = cy;
							 
							 splcore.curve(  ( new Vec3D( px1, 0, py1) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px2, 0, py2) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px , 0, py) ).multiply( scale ).sub(sub));
							 is_last_was_CSQT = true;
							 
							 
							 }
							 break;
							 case 'T':
							 for (i = 0;i < pos.length;i=i+2) {
							 is_last_was_CSQT ? cx = px + (px - cpx_last) : cx = px;
							 is_last_was_CSQT ? cy = py + (py - cpy_last) : cy = py;
							 px1 = px + 2*(cx - px)/3;
							 py1 = py + 2*(cy - py)/3;
							 px = parseFloat( pos[ i ] );
							 py = parseFloat( pos[ i+1 ] );
							 px2 = px + 2*(cx - px)/3;
							 py2 = py + 2*(cy - py)/3;
							 cpx_last = cx;
							 cpy_last = cy;
							 
							 splcore.curve(  ( new Vec3D( px1, 0, py1) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px2, 0, py2) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px , 0, py) ).multiply( scale ).sub(sub));
							 is_last_was_CSQT = true;
							 }
							 break;
							 case 'A':
							 for (i = 0;i < pos.length;i=i+7) {
							 var nom = a2c(px, py, parseFloat(pos[i]), parseFloat(pos[i+1]), radians(parseFloat(pos[i+2])), parseInt(pos[i+3]), parseInt(pos[i+4]), parseFloat(pos[i+5]), parseFloat(pos[i+6]));
							 //print(pos.length + ": " + pos);
							 for(j = 0; j < nom.length; j+=6)
							 {
							 //print('Заменитель: ');
							 //for(k = 0; k < 6; k+=2) print(nom[j+k] + "      " + nom[j+k+1] );
							 px1 = nom[j];
							 py1 = nom[j+1];
							 px2 = nom[j+2];
							 py2 = nom[j+3];
							 px  = nom[j+4];
							 py  = nom[j+5];
							 cpx_last = px2;
							 cpy_last = py2;
							 
							 splcore.curve(  ( new Vec3D( px1, 0, py1) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px2, 0, py2) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px , 0, py) ).multiply( scale ).sub(sub));
							 }
							 is_last_was_CSQT = true;
							 }
							 break;
							 case 'q':
							 for (i = 0;i < pos.length;i=i+4) {
							 cx = px + parseFloat( pos[ i ] );
							 cy = py + parseFloat( pos[ i+1 ] );
							 px1 = px + 2*(cx - px)/3;
							 py1 = py + 2*(cy - py)/3;
							 px += parseFloat( pos[ i+2 ] );
							 py += parseFloat( pos[ i+3 ] );
							 px2 = px + 2*(cx - px)/3;
							 py2 = py + 2*(cy - py)/3;
							 cpx_last = cx;
							 cpy_last = cy;
							 
							 splcore.curve(  ( new Vec3D( px1, 0, py1) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px2, 0, py2) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px , 0, py) ).multiply( scale ).sub(sub));
							 is_last_was_CSQT = true;
							 }
							 break;
							 case 't':
							 for (i = 0;i < pos.length;i=i+2) {
							 is_last_was_CSQT ? cx = px + (px - cpx_last) : cx = px;
							 is_last_was_CSQT ? cy = py + (py - cpy_last) : cy = py;
							 px1 = px + 2*(cx - px)/3;
							 py1 = py + 2*(cy - py)/3;
							 px += parseFloat( pos[ i ] );
							 py += parseFloat( pos[ i+1 ] );
							 px2 = px + 2*(cx - px)/3;
							 py2 = py + 2*(cy - py)/3;
							 cpx_last = cx;
							 cpy_last = cy;
							 
							 splcore.curve(  ( new Vec3D( px1, 0, py1) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px2, 0, py2) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px , 0, py) ).multiply( scale ).sub(sub));
							 is_last_was_CSQT = true;
							 }
							 break;
							 case 'a': // drow as line
							 for (i = 0;i < pos.length;i=i+7) {
							 
							 
							 var nom = a2c(px, py, parseFloat(pos[i]), parseFloat(pos[i+1]), radians(parseFloat(pos[i+2])), parseInt(pos[i+3]), parseInt(pos[i+4]), px + parseFloat(pos[i+5]), py + parseFloat(pos[i+6]));
							 //print(pos.length + ": " + pos);
							 for(j = 0; j < nom.length; j+=6)
							 {
							 //print('Заменитель: ');
							 //for(k = 0; k < 6; k+=2) print(nom[j+k] + "      " + nom[j+k+1]);
							 px1 = nom[j];
							 py1 = nom[j+1];
							 px2 = nom[j+2];
							 py2 = nom[j+3];
							 px  = nom[j+4];
							 py  = nom[j+5];
							 cpx_last = px2;
							 cpy_last = py2;
							 
							 splcore.curve(  ( new Vec3D( px1, 0, py1) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px2, 0, py2) ).multiply( scale ).sub(sub),
										   ( new Vec3D( px , 0, py) ).multiply( scale ).sub(sub));
							 }
							 is_last_was_CSQT = true;
							 }
							 break;
							 case 'z':
							 case 'Z':
							 //print( 'zZ:');
							 splcore.close();
							 is_last_was_CSQT = false;
							 break;
							 }
					   }
							 
						return spl;

}




function getObjectByName(father, name)
{
	if(father.getParameter("name") == name) return father;
	for(var i = 0; i < father.childCount(); i++)
	{
		var t = getObjectByName(father.childAtIndex(i), name);
		if(t != false) return t;
	}
	return false;
}
	



//taken from https://github.com/DmitryBaranovskiy/raphael/blob/master/raphael.js


function a2c(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
            // for more information of where this Math came from visit:
            // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
            var _120 = Math.PI * 120 / 180
                rad = Math.PI / 180 * (+angle || 0)
                res = []
			
            if (!recursive) {
                xy = rotate(x1, y1, -rad);
                x1 = xy.x;
                y1 = xy.y;
                xy = rotate(x2, y2, -rad);
                x2 = xy.x;
                y2 = xy.y;
                var cos = Math.cos(Math.PI / 180 * angle),
                    sin = Math.sin(Math.PI / 180 * angle),
                    x = (x1 - x2) / 2,
                    y = (y1 - y2) / 2;
                var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
                if (h > 1) {
                    h = Math.sqrt(h);
                    rx = h * rx;
                    ry = h * ry;
                }
                var rx2 = rx * rx,
                    ry2 = ry * ry,
                    k = (large_arc_flag == sweep_flag ? -1 : 1) *
                        Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
                    cx = k * rx * y / ry + (x1 + x2) / 2,
                    cy = k * -ry * x / rx + (y1 + y2) / 2,
                    f1 = Math.asin(((y1 - cy) / ry).toFixed(9)),
                    f2 = Math.asin(((y2 - cy) / ry).toFixed(9));

                f1 = x1 < cx ? Math.PI - f1 : f1;
                f2 = x2 < cx ? Math.PI - f2 : f2;
                f1 < 0 && (f1 = Math.PI * 2 + f1);
                f2 < 0 && (f2 = Math.PI * 2 + f2);
                if (sweep_flag && f1 > f2) {
                    f1 = f1 - Math.PI * 2;
                }
                if (!sweep_flag && f2 > f1) {
                    f2 = f2 - Math.PI * 2;
                }
            } else {
                f1 = recursive[0];
                f2 = recursive[1];
                cx = recursive[2];
                cy = recursive[3];
            }
            var df = f2 - f1;
            if (Math.abs(df) > _120) {
                var f2old = f2,
                    x2old = x2,
                    y2old = y2;
                f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
                x2 = cx + rx * Math.cos(f2);
                y2 = cy + ry * Math.sin(f2);
                res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
            }
            df = f2 - f1;
            var c1 = Math.cos(f1),
                s1 = Math.sin(f1),
                c2 = Math.cos(f2),
                s2 = Math.sin(f2),
                t = Math.tan(df / 4),
                hx = 4 / 3 * rx * t,
                hy = 4 / 3 * ry * t,
                m1 = [x1, y1],
                m2 = [x1 + hx * s1, y1 - hy * c1],
                m3 = [x2 + hx * s2, y2 - hy * c2],
                m4 = [x2, y2];
            m2[0] = 2 * m1[0] - m2[0];
            m2[1] = 2 * m1[1] - m2[1];
            if (recursive) {
                return [m2, m3, m4].concat(res);
            } else {
                res = [m2, m3, m4].concat(res).join().split(",");
                var newres = [];
                for (var i = 0, ii = res.length; i < ii; i++) {
                    newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
                }
                return newres;
            }
}





