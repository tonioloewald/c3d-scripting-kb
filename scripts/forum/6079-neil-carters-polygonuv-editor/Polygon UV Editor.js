// Source: https://www.cheetah3d.com/forum/index.php?threads/6079/post-45984
// Author: Targos (Cheetah3D forum), posted 2010-08-01
// Thread: "Neil Carters PolygonUV Editor"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
**	Polygon UV Editor.js
**
**	Copyright (c) 2006 Neil Carter <n.carter@nether.org.uk>
**
**	This source code has been made available under the zlib/libpng License:
**
**		http://www.opensource.org/licenses/zlib-license.php
**
**	This script can be used with Cheetah3D to set the UV coordinates of selected
**	polygons of a plain mesh object.  Place it into the scripts/Tool folder in
**	Cheetah3D's folder, then select it from the Tools->Script->Tool Script menu.
**
**	You should have plain polygon object selected and in polygon mode before
**	using this tool.  Some modes only work on selected quads (and ignore all
**	other faces), and some work on all selected polygons.
*/

var scriptName = "Polygon UV Editor";

var tilesU;
var tilesV;

function buildUI(tool)
{
	// Set all selected quads to have a single copy of the whole texture:

	tool.addParameterSeparator("Polygon UV Editor");
	tool.addParameterInt("First Vertex Index", 3, 0, 3, false, false);		// Sets the initial orientation
	tool.addParameterFloat("Margin", 0, 0, 0.5, false, false);				// The amount to inset each edge to avoid bleed from neighbouring tiles
	tool.addParameterButton("Apply Whole Texture","OK","applyTexture");

	// Sets all selected quads to use a tile of the texture.  Tell it how many
	// tiles the texture has in each direction, then tell it the index number of
	// the tile you want.  The above First Vertex Index parameter also applies
	// here:

	tool.addParameterSeparator("Extract Tile");
	tool.addParameterInt("U Tiles", 8, 0, 128, false, false);				// Tiles horizontally
	tool.addParameterInt("V Tiles", 8, 0, 128, false, false);				// Tiles vertically
	tool.addParameterInt("Tile Index", 0, 0, 16384, false, false);			// Tile number is x + w * y
	tool.addParameterButton("Apply Tile","OK","applyTile");
	tool.addParameterButton("Apply Tile From","2x2","applyTile2x2");		// Convenience buttons
	tool.addParameterButton("Apply Tile From","4x4","applyTile4x4");
	tool.addParameterButton("Apply Tile From","8x8","applyTile8x8");

	// Rotates the UV coordinates of all selected polygons (not just quads):

	tool.addParameterSeparator("Rotate UVs");
	tool.addParameterButton("Rotate Left","OK","rotateLeft");
	tool.addParameterButton("Rotate Right","OK","rotateRight");

	// Sets all vertices of selected polygons to have the same UV coordinates.
	// This is useful if you want a flat colour to be spread over the entire
	// polygon:

	tool.addParameterSeparator("Set All UVs");
	tool.addParameterFloat("U Value", 0, -1, 1, false, false);
	tool.addParameterFloat("V Value", 0, -1, 1, false, false);
	tool.addParameterButton("Set All UVs","OK","setAllUVs");
}

function applyTexture(tool)
{
	process(tool, setPolygonTexture, false);
}

function applyTile(tool)
{
	tilesU = tool.getParameter("U Tiles");
	tilesV = tool.getParameter("V Tiles");
	process(tool, setPolygonTile, false);
}

function applyTile2x2(tool)
{
	tilesU = tilesV = 2;
	process(tool, setPolygonTile, false);
}

function applyTile4x4(tool)
{
	tilesU = tilesV = 4;
	process(tool, setPolygonTile, false);
}

function applyTile8x8(tool)
{
	tilesU = tilesV = 8;
	process(tool, setPolygonTile, false);
}

function rotateLeft(tool)
{
	process(tool, rotatePolygonLeft, false);
}

function rotateRight(tool)
{
	process(tool, rotatePolygonRight, false);
}

function setAllUVs(tool)
{
	process(tool, setAllPolygonUVs, false);
}

function process(tool, method, onlyWorksOnQuads)
{
	selection = GetSelection(tool);
	if(selection == null)
		return;

	obj = selection.core();

	for(index = 0; index < obj.polygonCount(); ++index)
	{
		if(obj.polygonSelection(index))
		{
			if(!(onlyWorksOnQuads && obj.polygonSize(index) != 4))
				method(tool, obj, index);
		}
	}

	selection.update();
}

function setPolygonTexture(tool, obj, polygonIndex)
{
	firstVertexIndex = tool.getParameter("First Vertex Index");

	edgeInner = tool.getParameter("Margin");
	edgeOuter = 1 - edgeInner;

	vertexCount = obj.polygonSize(polygonIndex);
	for(vertexIndex = 0; vertexIndex < vertexCount; ++vertexIndex)
	{
		switch((vertexIndex + firstVertexIndex) % vertexCount)
		{
			case 0:
				obj.setUVCoord(polygonIndex, vertexIndex, new Vec2D(edgeInner, edgeInner));
				break;
			case 1:
				obj.setUVCoord(polygonIndex, vertexIndex, new Vec2D(edgeOuter, edgeInner));
				break;
			case 2:
				obj.setUVCoord(polygonIndex, vertexIndex, new Vec2D(edgeOuter, edgeOuter));
				break;
			case 3:
				obj.setUVCoord(polygonIndex, vertexIndex, new Vec2D(edgeInner, edgeOuter));
				break;
		}
	}
}

function setPolygonTile(tool, obj, polygonIndex)
{
	firstVertexIndex = tool.getParameter("First Vertex Index");
	margin = tool.getParameter("Margin");
	tileIndex = tool.getParameter("Tile Index");

	sizeU = 1 / tilesU;
	sizeV = 1 / tilesV;

	marginU = margin * sizeU;
	marginV = margin * sizeV;

	indexU = tileIndex % tilesU;
	indexV = Math.floor(tileIndex / tilesU) % tilesV;

	minU = sizeU * indexU + marginU;
	minV = sizeV * indexV + marginV;
	maxU = sizeU * indexU + sizeU - marginU;
	maxV = sizeV * indexV + sizeV - marginV;

	vertexCount = obj.polygonSize(polygonIndex);
	for(vertexIndex = 0; vertexIndex < vertexCount; ++vertexIndex)
	{
		switch((vertexIndex + firstVertexIndex) % vertexCount)
		{
			case 0:
				obj.setUVCoord(polygonIndex, vertexIndex, new Vec2D(minU, minV));
				break;
			case 1:
				obj.setUVCoord(polygonIndex, vertexIndex, new Vec2D(maxU, minV));
				break;
			case 2:
				obj.setUVCoord(polygonIndex, vertexIndex, new Vec2D(maxU, maxV));
				break;
			case 3:
				obj.setUVCoord(polygonIndex, vertexIndex, new Vec2D(minU, maxV));
				break;
		}
	}
}

function rotatePolygonLeft(tool, obj, polygonIndex)
{
	size = obj.polygonSize(polygonIndex);

	temp = obj.uvCoord(polygonIndex, 0);

	for(vertexIndex = 0; vertexIndex < size - 1; ++vertexIndex)
		obj.setUVCoord(polygonIndex, vertexIndex, obj.uvCoord(polygonIndex, vertexIndex + 1));

	obj.setUVCoord(polygonIndex, size - 1, temp);
}

function rotatePolygonRight(tool, obj, polygonIndex)
{
	size = obj.polygonSize(polygonIndex);

	temp = obj.uvCoord(polygonIndex, size - 1);

	for(vertexIndex = size - 1; vertexIndex > 0; --vertexIndex)
		obj.setUVCoord(polygonIndex, vertexIndex, obj.uvCoord(polygonIndex, vertexIndex - 1));

	obj.setUVCoord(polygonIndex, 0, temp);
}

function setAllPolygonUVs(tool, obj, polygonIndex)
{
	u = tool.getParameter("U Value");
	v = tool.getParameter("V Value");

	for(vertexIndex = 0; vertexIndex < obj.polygonSize(polygonIndex); ++vertexIndex)
		obj.setUVCoord(polygonIndex, vertexIndex, new Vec2D(u, v));
}

function GetSelection(tool)
{
	var selection = tool.document().selectedObject();
	if(selection.type() != POLYGONOBJ)
	{
		OS.messageBox(scriptName, "The selected object must be a plain polygon object.");
		return null;
	}

	return selection;
}
