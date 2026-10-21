// Source: https://www.cheetah3d.com/forum/index.php?threads/10400/post-88634
// Author: feloneouscat (Cheetah3D forum), posted 2014-07-07
// Thread: "Extending the Cheetah 3D API"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//----- Vertex class object
function Vertex()
{
	this.object = null;				// object made of polygons
	this.polygonIndex = 0;			// polygon index into the object
        this.polygonVertexIndex = 0;		// polygon vertex index
	this.vertexIndex = 0;				// vertex index into the polygon
	this.vertex = new Vec3D(0,0,0);		// Vec3D point
}

//----- Polygon class object
function Polygon()
{
	this.object = null;				// object made of polygons
	this.polygonIndex = 0;			// polygon index into the object
	this.vertexCount = 0;				// number of vertices in polygon
	this.vertexArray = new Array();		// copy of the array of vertices
}


//----- PolygonArray class object
function PolygonArray()
{
	this.object = null;			// object made of polygons
	this.polygonCount = 0;		// number of polygons in object
	this.polygonArray = new Array();	// array of Polygons objects
}