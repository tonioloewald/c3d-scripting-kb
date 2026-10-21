// Source: https://www.cheetah3d.com/forum/index.php?threads/10106/post-84591
// Author: tonbut (Cheetah3D forum), posted 2014-01-19
// Thread: "Voxelate Script"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI(obj){
	obj.setParameter("name","Voxelate");
	
	obj.addParameterSeparator("Voxelation");
	//voxels are cubes this is the length/width/height
	obj.addParameterFloat("Voxel Size",0.05,0.01,256,true,true);
	//if origin is odd then a voxel is placed centred on origin, if even then the corners are placed on origin
	obj.addParameterSelector("Origin", ["Odd", "Even"], true, true);
	//adjust what proportion (0-1) of voxel distance is detected as skin (fine tuning)
	obj.addParameterFloat("Skin Tolerance",0.4,0.1,1.0,true,true);
	//adjust what position the skin is relative to actual polygons (-ve=inside, +ve=outside)
	obj.addParameterFloat("Skin Offset",-0.5,-1.0,1.0,true,true);

	obj.addParameterSeparator("Manipulation");
	//trim top proportion of shape so you can see inside (useful for designing or fx)
	obj.addParameterFloat("Y Truncate",1,0,1,true,true);
	//remove a random proportion of the voxels
	obj.addParameterFloat("Dissolve",0,0,1.0,true,true);

	obj.addParameterSeparator("Render");
	//proportion of voxel space filled by cube
	obj.addParameterFloat("Voxel Volume",1,0.1,1.5,true,true);
	//optimise voxels by culling surfaces that adjacent to other filled voxels
	obj.addParameterBool("Cull Adjacent",true,true,true);
	obj.setCreatorObj(true);
}

function doDebug() {
	var a=new Vec3D(0,0,0);
	var b=new Vec3D(1,0,0);
	var c=new Vec3D(0,0,1);
	var normal=normalFromTriangle(a,c,b);
	printVector("normal",normal);
	
	var p=new Vec3D(10.2,1,0.2);
	//var d=distanceOfTriangleFromPoint(a,b,c,p);
	//print("d="+d);
	
	var d=(normal.x*a.x + normal.y*a.y + normal.z*a.z);
	print("d="+d);
	var dist=distanceFromPlane(normal.x,normal.y,normal.z,d,p);
	print("dist="+dist);
	
	
	
}

function printVector(name,value)
{	print(name+"= "+value.x+' '+value.y+' '+value.z);
}


function buildObject(obj) {
	print('---- Voxelate');
	seed = 1;
	var n = obj.childCount();

    if (n != 1) 
    {	doDebug();

		//enumerate parameters
		var paramInfo=obj.parameterInfo();
		for (var i=0; i<paramInfo.length; i++)
		{
			print(paramInfo[i][0]+" "+paramInfo[i][1]);
		}

    	return;
    }
    
    var t0=new Date().getTime();
    
	var child = obj.childAtIndex(0); // getting poly
	var childCore = child.modCore();
	
	var size = childCore.vertexCount();
	if( size == 0 ) return;

	var childTransform=child.objMatrix();

	/*
	obj.setParameter("scale",child.getParameter("scale"),false);
	obj.setParameter("position",child.getParameter("position"),false);
	obj.setParameter("rotation",child.getParameter("rotation"),false);
	obj.setParameter("shear",child.getParameter("shear"),false);
	obj.setParameter("pivot",child.getParameter("pivot"),false);
	obj.setParameter("prefrot",child.getParameter("prefrot"),false);
	obj.setParameter("postrot",child.getParameter("postrot"),false);
	obj.setParameter("prerot",child.getParameter("prerot"),false);
	obj.setParameter("rotorder",child.getParameter("rotorder"),false);
	*/
	//child.setParameter("scale",new Vec3D(1,1,1),false);

	//transform vertices
	var vertices = [];
	for( var i = 0; i < size;i++)
	{	var p = childCore.vertex(i);
		vertices[i] = childTransform.multiply(p);
	}

	//determine bounding box
	var minLoc = childCore.vertex(0); // will hold the minimum x, y, and z
	var maxLoc = childCore.vertex(0); // will hold the maximum x, y, and z
	for( var i = 0; i < size;i++) {
		var p = vertices[i];
		minLoc.x = p.x < minLoc.x ? p.x : minLoc.x;
		minLoc.y = p.y < minLoc.y ? p.y : minLoc.y;
		minLoc.z = p.z < minLoc.z ? p.z : minLoc.z;
		maxLoc.x = p.x > maxLoc.x ? p.x : maxLoc.x;
		maxLoc.y = p.y > maxLoc.y ? p.y : maxLoc.y;
		maxLoc.z = p.z > maxLoc.z ? p.z : maxLoc.z;
	}
	
	//print('min '+minLoc.x+' '+minLoc.y+' '+minLoc.z);
	//print('max '+maxLoc.x+' '+maxLoc.y+' '+maxLoc.z);
	
	
	var core = obj.core();
	//var subdiv = obj.getParameter("Subdivision");
	var voxelSizeParam = obj.getParameter("Voxel Size");
	var skinTolerance=obj.getParameter("Skin Tolerance");
	var skinOffset=obj.getParameter("Skin Offset");
	var oddOffset=obj.getParameter("Origin")==0;
	
	var xSize=maxLoc.x-minLoc.x;
	var ySize=maxLoc.y-minLoc.y;
	var zSize=maxLoc.z-minLoc.z;
	
	var voxelSize=voxelSizeParam; //largestDimension/subdiv;
	var xVoxels=Math.ceil(xSize*0.5/voxelSize)*2;
	var yVoxels=Math.ceil(ySize*0.5/voxelSize)*2;
	var zVoxels=Math.ceil(zSize*0.5/voxelSize)*2;

	var largestDimension=Math.max(xVoxels,Math.max(yVoxels,zVoxels));
	if (largestDimension>=1024)
	{	print("too many voxels");
		return;
	}
	
	
	var xMiddle=(maxLoc.x+minLoc.x)*0.5;
	xMiddle=Math.round(xMiddle/voxelSize)*voxelSize;
	var xStart=xMiddle-Math.floor(xVoxels*0.5)*voxelSize+voxelSize*0.5;

	var yMiddle=(maxLoc.y+minLoc.y)*0.5;
	yMiddle=Math.round(yMiddle/voxelSize)*voxelSize;
	var yStart=yMiddle-Math.floor(yVoxels*0.5)*voxelSize+voxelSize*0.5;

	var zMiddle=(maxLoc.z+minLoc.z)*0.5;
	zMiddle=Math.round(zMiddle/voxelSize)*voxelSize;
	var zStart=zMiddle-Math.floor(zVoxels*0.5)*voxelSize+voxelSize*0.5;
	
	if (oddOffset)
	{	xStart+=voxelSize*0.5;
		yStart+=voxelSize*0.5;
		zStart+=voxelSize*0.5;
	}

	var dist=voxelSize*skinTolerance*Math.sqrt(2);
	var dist2=dist*0.5;
	var distMax=dist-skinOffset*dist;
	var distMin=-dist-skinOffset*dist;
	
	//var distMax2=distMax*distMax;
	//var distMin2=-(distMin*distMin);
	
	var v = [];
	
	for( var i=0; i<childCore.polygonCount(); i++ )
	{	for( var j=0; j<childCore.polygonSize(i) - 2; j++ )
		{
			var verts = childCore.triangle( i, j );
			var a=vertices[childCore.vertexIndex(i,verts[0])];
			var b=vertices[childCore.vertexIndex(i,verts[1])];
			var c=vertices[childCore.vertexIndex(i,verts[2])];
			
			var mn = {x:a.x, y:a.y, z:a.z};
			var mx = {x:a.x, y:a.y, z:a.z};
			
			if (b.x<mn.x) mn.x=b.x;
			if (c.x<mn.x) mn.x=c.x;
			if (b.y<mn.y) mn.y=b.y;
			if (c.y<mn.y) mn.y=c.y;
			if (b.z<mn.z) mn.z=b.z;
			if (c.z<mn.z) mn.z=c.z;
			
			if (b.x>mx.x) mx.x=b.x;
			if (c.x>mx.x) mx.x=c.x;
			if (b.y>mx.y) mx.y=b.y;
			if (c.y>mx.y) mx.y=c.y;
			if (b.z>mx.z) mx.z=b.z;
			if (c.z>mx.z) mx.z=c.z;

			mn.x-=dist2;
			mx.x+=dist2;
			mn.y-=dist2;
			mx.y+=dist2;
			mn.z-=dist2;
			mx.z+=dist2;
			
			var mnix=Math.floor((mn.x-minLoc.x)/voxelSize);
			var mxix=1+Math.floor((mx.x-minLoc.x)/voxelSize);
			if (mnix<0) mnix=0;
			if (mxix>xVoxels) mxix=xVoxels;
			
			var mniy=Math.floor((mn.y-minLoc.y)/voxelSize);
			var mxiy=1+Math.floor((mx.y-minLoc.y)/voxelSize);
			if (mniy<0) mniy=0;
			if (mxiy>yVoxels) mxiy=yVoxels;

			var mniz=Math.floor((mn.z-minLoc.z)/voxelSize);
			var mxiz=1+Math.floor((mx.z-minLoc.z)/voxelSize);
			if (mniz<0) mniz=0;
			if (mxiz>zVoxels) mxiz=zVoxels;
			
			var normal=normalFromTriangle(a,b,c);
			var d=-(normal.x*a.x + normal.y*a.y + normal.z*a.z);
			for (var x=mnix; x<mxix; x++)
			{	for (var y=mniy; y<mxiy; y++)
				{	for (var z=mniz; z<mxiz; z++)
					{
						if (!getVoxel(v,x,y,z))
						{	
							var p=new Vec3D(xStart+voxelSize*x,yStart+voxelSize*y,zStart+voxelSize*z);
							
							var dFromPlane=distanceFromPlane(normal.x,normal.y,normal.z,d,p);
							if (dFromPlane>distMin && dFromPlane<distMax)
							{
								var dtp=distanceOfTriangleFromPoint(a,b,c,p,normal);
								if (dtp>distMin && dtp<distMax)
								{	setVoxel(v,x,y,z);
								}
							}
						}
					}
				}
			}
			
		}
	}
	
	//dissolve
	var dissolve = obj.getParameter("Dissolve");
	var ytrunc = obj.getParameter("Y Truncate");
	if (dissolve>0 || ytrunc<1)
	{	var ytruncV=yVoxels*ytrunc;
		for (var x=0; x<xVoxels; x++)
		{	for (var y=0; y<yVoxels; y++)
			{	for (var z=0; z<zVoxels; z++)
				{	if (getVoxel(v,x,y,z))
					{	if ((dissolve>0?random()<dissolve:false) || y>=ytruncV )
						{	deleteVoxel(v,x,y,z);
						}
					}
				}
			}
		}
	}
				
				
	//render voxels
	var t1=new Date().getTime();	
	var voxelBoxSize=obj.getParameter("Voxel Volume");
	var cullAdjacent=obj.getParameter("Cull Adjacent");
	var vbs=voxelSize*voxelBoxSize*0.5;
	var voxelCount=0;
	
	if (cullAdjacent)
	{
		for (var x=0; x<xVoxels; x++)
		{	for (var y=0; y<yVoxels; y++)
			{	for (var z=0; z<zVoxels; z++)
				{	var b=getVoxel(v,x,y,z);
					if (b)
					{	var p=new Vec3D(xStart+voxelSize*x,yStart+voxelSize*y,zStart+voxelSize*z);							
						var min=new Vec3D(p.x-vbs,p.y-vbs,p.z-vbs);
						var max=new Vec3D(p.x+vbs,p.y+vbs,p.z+vbs);
						
						var sides= 0
							+(getVoxel(v,x+1,y,z)?0:1)
							+(getVoxel(v,x-1,y,z)?0:2)
							+(getVoxel(v,x,y+1,z)?0:4)
							+(getVoxel(v,x,y-1,z)?0:8)
							+(getVoxel(v,x,y,z+1)?0:16)
							+(getVoxel(v,x,y,z-1)?0:32);
						
						addVoxel(core,min,max,sides);
						voxelCount++;
					}
				}
			}
		}
	}
	else
	{
		for (var x=0; x<xVoxels; x++)
		{	for (var y=0; y<yVoxels; y++)
			{	for (var z=0; z<zVoxels; z++)
				{	var b=getVoxel(v,x,y,z);
					if (b)
					{	var p=new Vec3D(xStart+voxelSize*x,yStart+voxelSize*y,zStart+voxelSize*z);							
						var min=new Vec3D(p.x-vbs,p.y-vbs,p.z-vbs);
						var max=new Vec3D(p.x+vbs,p.y+vbs,p.z+vbs);
						addVoxel(core,min,max,255);
						voxelCount++;
					}
				}
			}
		}
	}
	
	var t2=new Date().getTime();
	print("computeTime="+(t1-t0)+" buildVoxelTime="+(t2-t1)+" voxelCount="+voxelCount);
}

function setVoxel(v,x,y,z)
{	var i=x+(y<<10)+(z<<20);
	v[i]=true;
}
function getVoxel(v,x,y,z)
{	if (x>=0 && y>=0 && z>=0)
	{	var i=x+(y<<10)+(z<<20);
		return v[i]==true;
	}
	else
	{	return false;
	}
}
function deleteVoxel(v,x,y,z)
{	var i=x+(y<<10)+(z<<20);
	delete v[i];
}

function distanceFromPlane(a,b,c,d,p)
{
	var top=a*p.x+b*p.y+c*p.z+d;
	var bottom=a*a+b*b+c*c;
	return top/Math.sqrt(bottom);
}

function distanceOfTriangleFromPoint(p1,p2,p3,a,normal)
{
	var ai = attemptIntersect(p1,p2,p3,a,add(a,normal));
	var intersect=ai.intersect;
	if (ai.outside)
	{
		var d1 = magnitude(subtract(p1,intersect));
		var d2 = magnitude(subtract(p2,intersect));
		var d3 = magnitude(subtract(p3,intersect));
		var v1;
		var v2;
		if (d1<d2)
		{
			v1 = p1;
			if (d2<d3)
				v2 = p2;
			else
				v2 = p3;
		}
		else
		{
			v1 = p2;
			if (d1<d3)
				v2 = p1;
			else
				v2 = p3;
		}
		
		var diff = subtract(v1,v2);
		var lenSqr = magnitude2(diff);
		var r = dot(subtract(v1,intersect), diff)/(lenSqr);
		if (r<0) r=0;
		if (r>1) r=1;
		intersect = add( mult(v1,1-r), mult(v2,r) );
	}
	var direction= subtract(intersect,a);
	var distance = magnitude(direction);
	if (dot(direction,normal)>0)
	{	//inside
		distance=-distance;
	}
	//print("dist= "+distance);
	return distance;
}


function normalFromTriangle(p1,p2,p3)
{	var p2_p1=subtract(p2,p1);
	var p3_p1=subtract(p3,p1);
	var n=cross(p2_p1,p3_p1);
	return norm(n);
}

function attemptIntersect(p1,p2,p3,a,b)
{
	var m=new Mat3D();
	m._00 = p2.x-p1.x; m._10 = p2.y-p1.y; m._20 = p2.z-p1.z;
	m._01 = p3.x-p1.x; m._11 = p3.y-p1.y; m._21 = p3.z-p1.z;
	m._02 = -b.x+a.x; m._12 = -b.y+a.y; m._22 = -b.z+a.z;
	var det = determinant3(m);
	//print("m= "+m._00+' '+m._10+' '+m._20);
	//print("m= "+m._01+' '+m._11+' '+m._21);
	//print("m= "+m._02+' '+m._12+' '+m._22);
	//print("determinant="+det);
	var invDet = 1/det;
	
	var c1 = a.x - p1.x;
	var c2 = a.y - p1.y;
	var c3 = a.z - p1.z;

	m._00 = c1; m._10 = c2; m._20 = c3;
	var j = determinant3(m)*invDet;

	m._00 = p2.x-p1.x; m._10 = p2.y-p1.y; m._20 = p2.z-p1.z;
	m._01 = c1; m._11 = c2; m._21 = c3;
	var k = determinant3(m)*invDet;

	// compute intersection
	var intersect={};
	intersect.x = p1.x + j*(p2.x-p1.x) + k*(p3.x-p1.x);
	intersect.y = p1.y + j*(p2.y-p1.y) + k*(p3.y-p1.y);
	intersect.z = p1.z + j*(p2.z-p1.z) + k*(p3.z-p1.z);

	var outside= (j<0.0 || j>1.0 || k<0.0 || k>1.0 || j+k>1.0);
	return {outside: outside, intersect: intersect };
}

function addVoxel(core,bmin,bmax, sides) {

	var verts=[new Vec3D(0,0,0), new Vec3D(0,0,0), new Vec3D(0,0,0), new Vec3D(0,0,0)];

		//bottom
		if (sides&8) {
		verts[0].set(bmin.x ,bmin.y ,bmin.z);
	    verts[1].set(bmin.x ,bmin.y ,bmax.z);
	    verts[2].set(bmax.x ,bmin.y ,bmax.z);
	    verts[3].set(bmax.x ,bmin.y ,bmin.z);
	    core.addPolygon(4,true,verts);
	    }

		//top
		if (sides&4) {
	    verts[0].set(bmin.x ,bmax.y ,bmin.z);
	    verts[1].set(bmax.x ,bmax.y ,bmin.z);
	    verts[2].set(bmax.x ,bmax.y ,bmax.z);
	    verts[3].set(bmin.x ,bmax.y ,bmax.z);
	    core.addPolygon(4,true,verts);
	    }

		//left
	    if (sides&2) {
	    verts[0].set(bmin.x ,bmin.y ,bmin.z);
	    verts[1].set(bmin.x ,bmax.y ,bmin.z);
	    verts[2].set(bmin.x ,bmax.y ,bmax.z);
	    verts[3].set(bmin.x ,bmin.y ,bmax.z);
	    core.addPolygon(4,true,verts);
		}
		
		//right
		if (sides&1) {
	    verts[0].set(bmax.x ,bmax.y ,bmax.z);
	    verts[1].set(bmax.x ,bmax.y ,bmin.z);
	    verts[2].set(bmax.x ,bmin.y ,bmin.z);
	    verts[3].set(bmax.x ,bmin.y ,bmax.z);
	    core.addPolygon(4,true,verts);
		}
		
		//front
		if (sides&16) {
	    verts[0].set(bmin.x ,bmin.y ,bmax.z);
	    verts[1].set(bmin.x ,bmax.y ,bmax.z);
	    verts[2].set(bmax.x ,bmax.y ,bmax.z);
	    verts[3].set(bmax.x ,bmin.y ,bmax.z);
	    core.addPolygon(4,true,verts);
	    }

		//back
		if (sides&32) {
		verts[0].set(bmin.x ,bmin.y ,bmin.z);
	    verts[1].set(bmax.x ,bmin.y ,bmin.z);
	    verts[2].set(bmax.x ,bmax.y ,bmin.z);
	    verts[3].set(bmin.x ,bmax.y ,bmin.z);
	    core.addPolygon(4,true,verts);
	    }


}

var seed = 1;
function random() {
    var x = Math.sin(seed++) * 10000;
    var r= (x - Math.floor(x));
    return r;
}

/*
    Replacement for Cheetah 3D's Vec3D methods with versions that (a) work as 
    documented and (b) never modify their operands.
*/

function add( /* takes any number of vectors */ ){
    var x = 0, y = 0, z = 0;
    for( var i = 0; i < arguments.length; i++ ){
        x += arguments[i].x;
        y += arguments[i].y;
        z += arguments[i].z;
    }
    return new Vec3D( x, y, z );
}

function subtract(a, b){
    return new Vec3D( a.x-b.x, a.y-b.y, a.z-b.z );
}

function mult(a, s){
    return new Vec3D( a.x * s, a.y * s, a.z * s );
}

function dot(a, b){
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

function norm(a){
    var mag=magnitude(a);
    return mag!=0?mult(a,1/mag):a;
}

function determinant3(m){
	var v=	m._00*((m._11 * m._22) - (m._12*m._21)) - m._01*((m._10*m._22) - (m._12*m._20)) + m._02*((m._10*m._21) - (m._11*m._20));
	return v;
}

function magnitude2(a){
	return a.x * a.x + a.y * a.y + a.z * a.z;
}
function magnitude(a){
	return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
}

function cross(a, b){
    return new Vec3D(
        a.y * b.z - a.z * b.y,
        a.z * b.x - a.x * b.z,
        a.x * b.y - a.y * b.x
    );
}

