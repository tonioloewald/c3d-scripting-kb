// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//	DISTANT SOFTENER 1.2 - A Cheetah3D tool script
//	Matt Howell, http://luddite.n3.net
//	Feel free to use this script and its code however you see fit.

//	Takes a selected distant light and "softens" it by copying it at multiple angles

//	Usage: Place this into scripts/Tool folder, restart Cheetah3D, then select from Tools -> Script -> Tool Script


var title = 'Distant Softener';
var genProps = new Array('color','shadowColor','shadowType');	//	Light's general properties to be copied

function buildUI(tool){
	tool.addParameterSeparator(title);
	tool.addParameterInt('A count',2,2,255,false,false);
	tool.addParameterFloat('A angle',1,0,180,false,false);
	tool.addParameterInt('B count',2,2,255,false,false);
	tool.addParameterFloat('B angle',1,0,180,false,false);
	tool.addParameterButton('Apply','XY','applyXY');
	tool.addParameterButton('Apply','XZ','applyXZ');
	tool.addParameterButton('Apply','YZ','applyYZ');
	tool.addParameterSeparator("Help");
	tool.addParameterButton('More info','About','help');
}

function help() {
	OS.messageBox(title,'Creates a "soft" distant light by cloning an existing one several times (into a new folder) with slight rotation on two axes.\n\nSelect a distant light, then enter the number of times to clone on each axis (higher count means smoother shadows), the angle the total spread should cover, and which two axes should be used (XY seems to give the best results).');
}

function applyXY(tool) { apply(tool,'x','y','z'); }
function applyXZ(tool) { apply(tool,'x','z','y'); }
function applyYZ(tool) { apply(tool,'y','z','x'); }

function apply(tool,axisA,axisB,unused){
	var doc = tool.document();
	var selected = doc.selectedObject();
	
	if (selected && (selected.type()==DISTANTLIGHT || (selected.family()==LIGHTFAMILY && selected.getParameter('lightType')==2))) {	// Basic sanity check
		doc.retainRedrawLock();	// Save some time by suspending UI redraws
		
		// Make a new folder and name it after the light we're cloning
		var newFolder = doc.addObject(FOLDER);
		newFolder.setParameter('name',selected.getParameter('name')+' (softened)');
		
		// Set up shorthand variables
	 	var origRot = selected.getParameter('rotation');
	 	var origIntens = selected.getParameter('intensity');
	 	var angleA = tool.getParameter('A angle');
	 	var angleB = tool.getParameter('B angle');
	 	var countA = tool.getParameter('A count');
	 	var countB = tool.getParameter('B count');
	 	
	 	var stepA = angleA/tool.getParameter('A count');	// How far to rotate each iteration
	 	var stepB = angleB/tool.getParameter('B count');
		var preSpreadA = origRot[axisA] - angleA*.5;	// Start at the lowest value of rotation, halfway lower from the start
		var preSpreadB = origRot[axisB] - angleB*.5;
		
		for (var newA=0; newA<countA; newA++) {	// Start stepping through both axes
			for (var newB=0; newB<countB; newB++) {
				var newRot = new Vec3D(0,0,0);	// Put our new rotation values here
				newRot[axisA] = newA*stepA + preSpreadA;
				newRot[axisB] = newB*stepB + preSpreadB;
				newRot[unused] = origRot[unused];
				var thisLight = doc.addObject(LIGHT);
				thisLight.setParameter('lightType',2);
				for (iter in genProps) thisLight.setParameter(genProps[iter],selected.getParameter(genProps[iter]));	// Copy the original light's general properties
				thisLight.setParameter('intensity',origIntens/(countA*countB));	// Lower the intensity of each copy so the total brightness will match the original
				thisLight.setParameter('rotation',newRot);
				newFolder.addChildAtIndex(thisLight,0);
			}
		}
		newFolder.setParameter('position',selected.getParameter('position'));	// Put the lights (their folder, actually) in the same place as the old on
		
		doc.releaseRedrawLock();	// We're done, release the UI
		doc.redrawAll();
	} else {
		OS.messageBox(title,'Please select a distant light first.');
	}
}