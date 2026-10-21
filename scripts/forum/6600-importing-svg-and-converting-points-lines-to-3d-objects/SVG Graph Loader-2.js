// Source: https://www.cheetah3d.com/forum/index.php?threads/6600/post-105452
// Author: Oval (Cheetah3D forum), posted 2017-01-20
// Thread: "Importing SVG and converting points/lines to 3d objects"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
//  SVG Graph Loader.js
//
//  this is a Tool script. Place this into ~/Library/Application Support/Cheetah3D/scripts/Tool folder and reload script menu.
//
//  CAUTION!!: it's not support all path command.

function buildUI( tool ) {
	
	tool.addParameterSeparator("SVG Graph Loader");
	
		tool.addParameterBool('separate path', 0, 0, 1, false, false);
	tool.addParameterFloat('scale', 0.01, 0, 1000, false, false);
	
	tool.addParameterSeparator("Option");
	
	tool.addParameterSelector("circle as",["poly Disc","poly Ball","spline Circle"]);
	tool.addParameterSelector("rect as", ["poly Box","spline Rect"]);
	
	tool.addParameterInt("disc edges", 8, 3, 128, false, false);
	tool.addParameterInt("ball sections", 12, 6, 128, false, false);
	tool.addParameterInt("ball spans", 8, 6, 128, false, false);
	
	tool.addParameterSeparator("Import");
	
	tool.addParameterButton('import SVG', 'import', 'importSVG');
	
}

function importSVG( tool ) {
	var scale = tool.getParameter('scale');
	var sep_path = tool.getParameter('separate path');
	
	var circle_type = parseInt(tool.getParameter("circle as"));
	var rect_type = parseInt(tool.getParameter("rect as"));
	
	var d_e = tool.getParameter("disc edges");
	var b_sect = tool.getParameter("ball sections");
	var b_span = tool.getParameter("ball spans");
	
	var path = OS.runOpenPanel("svg");
	
	if (path == null) return;
	
	var svg = new File( path );
	svg.open(READ_MODE);
	
	if (svg.isOpen() == false) return;
	
	var line = svg.read( svg.size() );
	line = line.replace(/[\r\n]/g, ' ');
	svg.close();
	
	var doc = tool.document();
	
	//print('----');
	
	var i, oi = 0;
	var fol = null;
	var node = null;
	
	// all line are drown in one spline object
	var splcore = null;
	
	var reg_g = /<g.*?id\s*?=\s*?"(.*?)".*?<\/g>/g;
	var reg_path = /<path.*?\/>/g;
	var reg_polyline = /<polyline.*?\/>/g;
	var reg_line = /<line.*?\>/g;
	var reg_circle = /<circle.*?\/>/g;
	var reg_rect = /<rect.*?\/>/g;
    
    var cpx_last,cpy_last = 0;
	
	var g_data = [];
	while( m = reg_g.exec( line ) ) {
		fol = doc.addObject( FOLDER );
		fol.setParameter("name", m[1]);
		doc.root().addChildAtIndex( fol, doc.root().childCount() );
		g_data.push( [ reg_g.lastIndex - m[0].length, reg_g.lastIndex, fol ] );
	}
	
	while( m = reg_circle.exec( line ) ) {
		var r = m[0].match(/r[\s=]+"([0-9\.\-e]+?)"/);
		var cx = m[0].match(/cx[\s=]+"([0-9\.\-e]+?)"/);
		var cy = m[0].match(/cy[\s=]+"([0-9\.\-e]+?)"/);
		var node;
		switch( circle_type ) {
			case 0:
				node = doc.addObject( DISC );
				node.setParameter("edges", d_e);
				node.setParameter("lanes", 1); // disc section is set to 1.
				node.setParameter("radius", parseFloat(r[1]) * scale);
				break;
			case 1:
				node = doc.addObject( BALL );
				node.setParameter("sections", b_sect);
				node.setParameter("spans", b_span);
				node.setParameter("radius", parseFloat(r[1]) * scale);
				break;
			case 2:
				node = doc.addObject( CIRCLE );
				node.setParameter("width", parseFloat(r[1]) * scale * 2);
				node.setParameter("height", parseFloat(r[1]) * scale * 2);
				node.setParameter("orientation", 1);
				break;
		}
		node.setParameter("name", "circle_"+(oi++));
		node.setParameter("position", (new Vec3D( parseFloat(cx[1]), 0, parseFloat(cy[1]) )).multiply( scale ) );
		
		for (i = 0; i < g_data.length;i++) {
			if (g_data[i][0] < reg_circle.lastIndex && g_data[i][1] > reg_circle.lastIndex) {
				g_data[i][2].addChildAtIndex( node, g_data[i][2].childCount() );
			}
		}
	}
	
	while( m = reg_rect.exec( line ) ) {
		var rw = m[0].match(/width[\s=]+?"([0-9\.\-e]+?)"/);
		var rh = m[0].match(/height[\s=]+?"([0-9\.\-e]+?)"/);
		var rx = m[0].match(/x[\s=]+?"([0-9\.\-e]+?)"/);
		var ry = m[0].match(/y[\s=]+?"([0-9\.\-e]+?)"/);
		var node;
		switch( rect_type ) {
			case 1:
				node = doc.addObject( RECT );
				node.setParameter("height", parseFloat(rw[1]) * scale);
				node.setParameter("width", parseFloat(rh[1]) * scale);
				node.setParameter("orientation", 1);
				break;
			case 0:
				node = doc.addObject( BOX );
				node.setParameter("sizeX", parseFloat(rw[1]) * scale);
				node.setParameter("sizeY", parseFloat(rh[1]) * scale);
				node.setParameter("sizeZ", parseFloat(rh[1]) * scale);
				break;
		}
		node.setParameter("name", "rect_"+(oi++));
		node.setParameter("position", (new Vec3D(   parseFloat(rx[1]) + parseFloat(rw[1])/2,
													0, 
													parseFloat(ry[1]) + parseFloat(rh[1])/2 )).multiply( scale ) );
		
		for (i = 0; i < g_data.length;i++) {
			if (g_data[i][0] < reg_rect.lastIndex && g_data[i][1] > reg_rect.lastIndex) {
				g_data[i][2].addChildAtIndex( node, g_data[i][2].childCount() );
			}
		}
	}
	
	while( m = reg_line.exec( line ) ) {
		var x1 = m[0].match(/x1[\s=]+"([0-9\.\-e]+?)"/);
		var y1 = m[0].match(/y1[\s=]+"([0-9\.\-e]+?)"/);
		var x2 = m[0].match(/x2[\s=]+"([0-9\.\-e]+?)"/);
		var y2 = m[0].match(/y2[\s=]+"([0-9\.\-e]+?)"/);
		if (sep_path) {
			var spl = doc.addObject( SPLINE );
			spl.setParameter("name", "line_"+(oi++));
			splcore = spl.core();
		}
		if (splcore == null) {
			var spl = doc.addObject( SPLINE );
			spl.setParameter("name", "path + line + polyline");
			splcore = spl.core();
		}
		splcore.move( ( new Vec3D( parseFloat( x1[1] ), 0, parseFloat( y1[1] ) ) ).multiply( scale ) );
		splcore.line( ( new Vec3D( parseFloat( x2[1] ), 0, parseFloat( y2[1] ) ) ).multiply( scale ) );
		
		for (i = 0; i < g_data.length;i++) {
			if (g_data[i][0] < reg_polyline.lastIndex && g_data[i][1] > reg_polyline.lastIndex) {
				g_data[i][2].addChildAtIndex( spl, g_data[i][2].childCount() );
			}
		}
	}
	
	while( m = reg_path.exec( line ) ) {
		var d = m[0].match(/d[\s=]+"(.+?)"/); //"
		var px = 0
		var py = 0;
		var px1 = 0, px2 = 0;
		var py1 = 0, py2 = 0;
		if (sep_path) {
			var spl = doc.addObject( SPLINE );
			spl.setParameter("name", "path_"+(oi++));
			splcore = spl.core();
		}
		if (splcore == null) {
			var spl = doc.addObject( SPLINE );
			spl.setParameter("name", "path + line + polyline");
			splcore = spl.core();
		}
		var reg_d = /([MmZzLlHhVvCcSsQqTtAa])([0-9e,\.\-\s]*)/g;
		while( dm = reg_d.exec( d[1] ) ) {
			dm[2] = dm[2].replace(/\-/g, ' -').trim();
			
			switch( dm[1] ) {
				case 'M':
					var pos = dm[2].split(/[ \s,]+/);
					//print( 'M2:' + pos.length + ':' + pos );
					for( i = 0;i < pos.length;i=i+2) {
						px = parseFloat( pos[i] );
						py = parseFloat( pos[i+1] );
						splcore.move( ( new Vec3D( px, 0, py ) ).multiply( scale ) );
					}
					break;
				case 'm':
					var pos = dm[2].split(/[ \s,]+/);
					//print( 'm2:' + pos.length + ':' + pos );
					for ( i = 0;i < pos.legnth;i=i+2) {
						px += parseFloat( pos[i] );
						py += parseFloat( pos[i+1] );
						splcore.move( ( new Vec3D( px, 0, py ) ).multiply( scale ) );
					}
					break;
				case 'L':
					var pos = dm[2].split(/[ \s,]+/);
					//print( 'L2:' + pos.length + ':' + pos );
					for ( i = 0;i < pos.length;i=i+2) {
						px = parseFloat( pos[i] );
						py = parseFloat( pos[i+1] );
						splcore.line( ( new Vec3D( px, 0, py ) ).multiply( scale ) );
					}
					break;
				case 'l':
					var pos = dm[2].split(/[ \s,]+/);
					//print( 'l2:' + pos.length + ':' + pos );
					for ( i = 0;i < pos.length;i=i+2) {
						px += parseFloat( pos[i] );
						py += parseFloat( pos[i+1] );
						splcore.line( ( new Vec3D( px, 0, py ) ).multiply( scale ) );
					}
					break;
				case 'C':
					var pos = dm[2].split(/[ \s,]+/);
					//print( 'C6:' + pos.length + ':' + pos );
					for ( i = 0;i < pos.length;i=i+6) {
						px1 = parseFloat( pos[i] );
						py1 = parseFloat( pos[i+1] );
						px2 = parseFloat( pos[i+2] );
						py2 = parseFloat( pos[i+3] );
						px  = parseFloat( pos[i+4] );
						py  = parseFloat( pos[i+5] );
                        cpx_last = px2;
                        cpy_last = py2;
						splcore.curve(  ( new Vec3D( px1, 0, py1 ) ).multiply( scale ),
										( new Vec3D( px2, 0, py2 ) ).multiply( scale ),
										( new Vec3D( px , 0, py  ) ).multiply( scale ) );
					}
					break;
				case 'c':
					var pos = dm[2].split(/[ \s,]+/);
					//print( 'c6:' + pos.length + ':' + pos );
					for ( i = 0;i < pos.length;i=i+6) {
						px1 = px + parseFloat( pos[i] );
						py1 = py + parseFloat( pos[i+1] );
						px2 = px + parseFloat( pos[i+2] );
						py2 = py + parseFloat( pos[i+3] );
						px  += parseFloat( pos[i+4] );
						py  += parseFloat( pos[i+5] );
                        cpx_last = px2;
                        cpy_last = py2;
						splcore.curve(  ( new Vec3D( px1, 0, py1 ) ).multiply( scale ),
										( new Vec3D( px2, 0, py2 ) ).multiply( scale ),
										( new Vec3D( px , 0, py  ) ).multiply( scale ) );
					}
					break;
				case 'H':
					var pos = dm[2].split(/[ \s,]+/);
					//print( 'H1:' + pos.length + ':' + pos );
					for ( i = 0;i < pos.length;i++) {
						var from = splcore.currentPoint();
						px = parseFloat( pos[i] );
						py = from.z / scale;
						splcore.line( (new Vec3D( px, 0, py )).multiply( scale ) );
					}
					break;
				case 'h':
					var pos = dm[2].split(/[ \s,]+/);
					//print( 'h1:' + pos.length + ':' + pos );
					for ( i = 0;i < pos.length;i++) {
						var from = splcore.currentPoint();
						px += parseFloat( pos[i] );
						py = from.z / scale;
						splcore.line( (new Vec3D( px, 0, py )).multiply( scale ) );
					}
					break;
				case 'V':
					var pos = dm[2].split(/[ \s,]+/);
					//print( 'V1:' + pos.length + ':' + pos );
					for ( i = 0;i < pos.length;i++) {
						var from = splcore.currentPoint();
						px = from.x / scale;
						py = parseFloat( pos[i] );
						splcore.line( (new Vec3D( px, 0, py )).multiply( scale ) );
					}
					break;
				case 'v':
					var pos = dm[2].split(/[ \s,]+/);
					//print( 'v1:' + pos.length + ':' + pos );
					for ( i = 0;i < pos.length;i++) {
						var from = splcore.currentPoint();
						px = from.x / scale;
						py += parseFloat( pos[i] );
						splcore.line( (new Vec3D( px, 0, py )).multiply( scale ) );
					}
					break;
				case 'S':
					var pos = dm[2].split(/[ \s,]+/);
					//print( 'S4:' + pos.length + ':' + pos );
					for (i = 0;i < pos.length;i=i+4) {
						px2 = parseFloat( pos[i] );
						py2 = parseFloat( pos[i+1] );
                        px1 = px + (px - cpx_last);
                        py1 = py + (py - cpy_last);
						px = parseFloat( pos[i+2] );
						py = parseFloat( pos[i+3] );
                        cpx_last = px2;
                        cpy_last = py2;
                        
                        splcore.curve(  ( new Vec3D( px1, 0, py1 ) ).multiply( scale ),
                                      ( new Vec3D( px2, 0, py2 ) ).multiply( scale ),
                                      ( new Vec3D( px , 0, py  ) ).multiply( scale ) );
                    }
					break;
				case 's':
					var pos = dm[2].split(/[ \s,]+/);
					//print( 's4:' + pos.length + ':' + pos );
					for (i = 0;i < pos.length;i=i+4) {
						px2 = px + parseFloat( pos[i] );
						py2 = py + parseFloat( pos[i+1] );
                        px1 = px + (px - cpx_last);
                        py1 = py + (py - cpy_last);
						px += parseFloat( pos[i+2] );
						py += parseFloat( pos[i+3] );
                        cpx_last = px2;
                        cpy_last = py2;
                        
                        splcore.curve(  ( new Vec3D( px1, 0, py1 ) ).multiply( scale ),
                                      ( new Vec3D( px2, 0, py2 ) ).multiply( scale ),
                                      ( new Vec3D( px , 0, py  ) ).multiply( scale ) );
                    }
					break;
				case 'Q': // drow as line
					var pos = dm[2].split(/[ \s,]+/);
					for (i = 0;i < pos.length;i=i+4) {
						px = parseFloat( pos[ i+2 ] );
						py = parseFloat( pos[ i+3 ] );
						
						splcore.curve( ( new Vec3D( px, 0, py )).multiply( scale ) );
					}
					break;
				case 'T': // drow as line
					var pos = dm[2].split(/[ \s,]+/);
					for (i = 0;i < pos.length;i=i+2) {
						px = parseFloat( pos[ i ] );
						py = parseFloat( pos[ i+1 ] );
						
						splcore.curve( ( new Vec3D( px, 0, py )).multiply( scale ) );
					}
					break;
				case 'A': // drow as line
					var pos = dm[2].split(/[ \s,]+/);
					for (i = 0;i < pos.length;i=i+7) {
						px = parseFloat( pos[ i+5 ] );
						py = parseFloat( pos[ i+6 ] );
						
						splcore.curve( ( new Vec3D( px, 0, py )).multiply( scale ) );
					}
				case 'q': // drow as line
					var pos = dm[2].split(/[ \s,]+/);
					for (i = 0;i < pos.length;i=i+4) {
						px += parseFloat( pos[ i+2 ] );
						py += parseFloat( pos[ i+3 ] );
						
						splcore.curve( ( new Vec3D( px, 0, py )).multiply( scale ) );
					}
					break;
				case 't': // drow as line
					var pos = dm[2].split(/[ \s,]+/);
					for (i = 0;i < pos.length;i=i+2) {
						px += parseFloat( pos[ i ] );
						py += parseFloat( pos[ i+1 ] );
						
						splcore.curve( ( new Vec3D( px, 0, py )).multiply( scale ) );
					}
				case 'a': // drow as line
					var pos = dm[2].split(/[ \s,]+/);
					for (i = 0;i < pos.length;i=i+7) {
						px += parseFloat( pos[ i+5 ] );
						py += parseFloat( pos[ i+6 ] );
						
						splcore.curve( ( new Vec3D( px, 0, py )).multiply( scale ) );
					}
				case 'z':
				case 'Z':
					//print( 'zZ:' + dm );
					splcore.close();
					break;
			}
		}
		
		for (i = 0; i < g_data.length;i++) {
			if (g_data[i][0] < reg_path.lastIndex && g_data[i][1] > reg_path.lastIndex) {
				g_data[i][2].addChildAtIndex( spl, g_data[i][2].childCount() );
			}
		}
	}
	
	while( m = reg_polyline.exec( line ) ) {
		var points = m[0].match(/points[\s=]+"(.+?)"/); //"
		var px = 0;
		var py = 0;
		if (sep_path) {
			var spl = doc.addObject( SPLINE );
			spl.setParameter("name", "polyline_"+(oi++));
			splcore = spl.core();
		}
		if (splcore == null) {
			var spl = doc.addObject( SPLINE );
			spl.setParameter("name", "path + line + polyline");
			splcore = spl.core();
		}
		
		var p_list = points[1].split(/[\s,]+/);
		for ( var i = 0;i < p_list.length;i = i+2) {
			if (i == 0) {
				splcore.move( ( new Vec3D( parseFloat( p_list[i] ), 0, parseFloat( p_list[i+1] ) ) ).multiply( scale ) );
			} else {
				splcore.line( ( new Vec3D( parseFloat( p_list[i] ), 0, parseFloat( p_list[i+1] ) ) ).multiply( scale ) );
			}
		}
		
		for (i = 0; i < g_data.length;i++) {
			if (g_data[i][0] < reg_polyline.lastIndex && g_data[i][1] > reg_polyline.lastIndex) {
				g_data[i][2].addChildAtIndex( spl, g_data[i][2].childCount() );
			}
		}
		
	}
	
}
