// Source: https://www.cheetah3d.com/forum/index.php?threads/2574/post-17796
// Author: podperson (Cheetah3D forum), posted 2008-01-16
// Thread: "Edge Utilities"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
	Edge Utilities
	By Tonio Loewald, January 2008
	
	Purpose:
	Utility for setting and unsetting (versus toggling) seams and creases on edges.

	Installation: 
	Place this into scripts/Tool folder. restart Cheetah3D
	
	Usage:
	Select Tools > Script > Tool Script > Edge Utilities
	Click the desired button
*/

function buildUI(obj){
	obj.addParameterBool("Apply to Selection", true, 0, 1, false, false);
	obj.addParameterButton("Creases On","Do It!","CreasesOn");
	obj.addParameterButton("Creases Off","Do It!","CreasesOff");
	obj.addParameterButton("Seams On","Do It!","SeamsOn");
	obj.addParameterButton("Seams Off","Do It!","SeamsOff");
	obj.addParameterButton("Creases -> Seams","Do It!","CreasesToSeams");
	obj.addParameterButton("Seams -> Creases","Do It!","SeamsToCreases");
}

function CreasesToSeams(obj) {
	var f = function(c, i, j) {
		c.setEdgeSelection(i, j, SEAM, c.edgeSelection(i, j, CREASE));
	}
	ModifyEdges(obj, f);
}

function SeamsToCreases(obj) {
	var f = function(c, i, j) {
		c.setEdgeSelection(i, j, CREASE, c.edgeSelection(i, j, SEAM));
	}
	ModifyEdges(obj, f);
}

function CreasesOn(obj) {
	var f = function(c, i, j) {
		c.setEdgeSelection(i, j, CREASE, true);
	}
	ModifyEdges(obj, f);
}

function CreasesOff(obj) {
	var f = function(c, i, j) {
		c.setEdgeSelection(i, j, CREASE, false);
	}
	ModifyEdges(obj, f);
}

function SeamsOn(obj) {
	var f = function(c, i, j) {
		c.setEdgeSelection(i, j, SEAM, true);
	}
	ModifyEdges(obj, f);
}

function SeamsOff(obj) {
	var f = function(c, i, j) {
		c.setEdgeSelection(i, j, SEAM, false);
	}
	ModifyEdges(obj, f);
}

function ModifyEdges(obj, f) {
	var root = obj.document();
	var o = root.selectedObject();
	var selectionOnly = obj.getParameter("Apply to Selection");
	if(o == null)
		return;
		
	var core = o.core();
	
	if(core == null)
		return;
	
	var polyCount = core.polygonCount();
	var edgeCount = 0;
	
	// now we need to find all the selected edges
	for(var i = 0; i < polyCount; i++) {
		edgeCount = core.polygonSize(i);
		for(var j = 0; j < edgeCount; j++) {
			if(!selectionOnly || core.edgeSelection(i, j, SELECT)){
				f(core, i, j);
			}
		}
	}
	
	o.update();
}
