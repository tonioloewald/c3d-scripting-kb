// Source: https://www.cheetah3d.com/forum/index.php?threads/10025/post-84292
// Author: Swizl (Cheetah3D forum), posted 2014-01-07
// Thread: "Camera Aspect Ratio Script"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
var selectorArrayMonitor = ["640 x 480", "800 x 600", "1024 x 768", "1280 x 1024", "1344 x 756", "1600 x 900", "1680 x 1050", "1920 x 1080"];
var selectorArrayImperial = ["Letter Portrait", "Letter Landscape", "Legal Portrait", "Legal Landscape", "Ledger", "Tabloid"];
var selectorArrayMetric = ["A4 Portrait", "A4 Landscape", "A3 Portrait", "A3 Landscape", "B5 Portrait", "B5 Landscape", "B4 Portrait", "B5 Landscape"];
 
function buildUI(tool){
var selectorArrayMonitor = ["640 x 480", "800 x 600", "1024 x 768", "1280 x 1024", "1344 x 756", "1600 x 900", "1680 x 1050", "1920 x 1080"];
        tool.addParameterSeparator("Camera Aspect Ratio - MONITOR");
        tool.addParameterSelector("Select Aspect Ratio", selectorArrayMonitor, false, false);
        tool.addParameterButton("Set Active Camera", "OK", "setCameraMonitor");
        
        tool.addParameterSeparator("Camera Aspect Ratio - IMPERIAL");
        tool.addParameterSelector("Select Aspect Ratio", selectorArrayImperial, false, false);
        tool.addParameterButton("Set Active Camera", "OK", "setCameraImperial");

        tool.addParameterSeparator("Camera Aspect Ratio - Metric");
        tool.addParameterSelector("Select Aspect Ratio", selectorArrayMetric, false, false);
        tool.addParameterButton("Set Active Camera", "OK", "setCameraMetric");
    	}

/* 
	Standard Mac Monitor: 
	640x480, 800x600, 1024x768, 1280x720, 1280x1024,1344x756, 1600x900, 1680x1050, 1920x1080
*/    	
function setCameraMonitor(tool) {
    var doc = tool.document();
    var resX = 1024;
    var resY = 768;
    var oResolution = tool.getParameter("Select Aspect Ratio");
    print(oResolution);
    switch( oResolution ) {
        case 0: // 640x480
            resX = 640;
            resY = 480;
            break;
        case 1: // 800x600
            resX = 800;
            resY = 600;
            break;
        case 2: // 1024x768
            resX = 1024;
            resY = 768;
            break;
        case 3: // 1280x1024
            resX = 1280;
            resY = 1024;
            break;
        case 4: // 1344x756
            resX = 1344;
            resY = 756;
            break;
        case 5: // 1600x900
            resX = 1600;
            resY = 900;
            break;
        case 6: // 1680x1050
            resX = 1680;
            resY = 1050;
            break;
        case 7: // 1920x1080
            resX = 1920;
            resY = 1080;
            break; 
    }
          
    var camera = doc.activeCamera();
    if(camera == null)
    	print("camera is null");
    camera.setParameter("resolutionX", resX);
    camera.setParameter("resolutionY", resY);        
	}
	
/*
	Imperial Measurement Pixel Dimensions:     
	0. Letter Portrait: 	8.5"w x 11"h 	(612p x 792p)
	1. Letter Landscape: 	11"w x 8.5"h 	(792p x 612p)
	2. Legal Portrait: 		8.5"w x 14"h 	(612p x 1008p)
	3. Legal Landscape: 	14"w x 8.5"h 	(1008p x 612p)
	4. Ledger: 				17"w x 11"h 	(1224p x 792p)
	5. Tabloid: 			11"w x 17"h 	(792p x 1224p)
*/  	
function setCameraImperial(tool) {
    var doc = tool.document();
    var resX = 1024;
    var resY = 768;
    var oResolution = tool.getParameter("Select Aspect Ratio");
    print(oResolution);
    switch( oResolution ) {
        case 0: // Letter Portrait
            resX = 612;
            resY = 792;
            break;
        case 1: // Letter Landscape
            resX = 792;
            resY = 612;
            break;
        case 2: // Legal Portrait
            resX = 612;
            resY = 1008;
            break;
        case 3: // Legal Landscape
            resX = 1008;
            resY = 612;
            break;
        case 4: // Ledger
            resX = 1224;
            resY = 792;
            break;
        case 5: // Tabloid
            resX = 792;
            resY = 1224;
            break;
    }
         
    var camera = doc.activeCamera();
    if(camera == null)
    	print("camera is null");
    camera.setParameter("resolutionX", resX);
    camera.setParameter("resolutionY", resY);        
   }
    	
/*
	Metric Measurement Pixel Dimensions: Have to round, no float #'s for pixel dimensions   
	0. A4 Portrait: 	297mm x 210mm 	(841.89p x 595.28p)
	1. A4 Landscape: 	210mm x 297mm	(595.28p x 841.89p)
	2. A3 Portrait: 	420mm x 297mm 	(1190.55p x 841.89p)
	3. A3 Landscape: 	297mm x 420mm	(841.89p x 1190.55p)
	4. B5 Portrait: 	250mm x 176mm 	(728.5p x 515.91p)
	5. B5 Landscape: 	176mm x 250mm 	(515.91p x 728.5p)
	6. B4 Portrait: 	353mm x 250mm	(1031.81p x 728.5p)
	7. B4 Landscape: 	250mm x 353mm	(728.5p x 1031.81p)
*/  	
function setCameraMetric(tool) {
    var doc = tool.document();
    var resX = 1024;
    var resY = 768;
    var oResolution = tool.getParameter("Select Aspect Ratio");
    print(oResolution);
    switch( oResolution ) {
        case 0: // A4 Portrait
            resX = 842;
            resY = 595;
            break;
        case 1: // A4 Landscape
            resX = 595;
            resY = 842;
            break;
        case 2: // A3 Portrait
            resX = 1191;
            resY = 842;
            break;
        case 3: // A3 Landscape
            resX = 842;
            resY = 1191;
            break;
        case 4: // B5 Portrait
            resX = 729;
            resY = 516;
            break;
        case 5: // B5 Landscape
            resX = 516;
            resY = 729;
            break;
        case 6: // B4 Portrait
            resX = 1032;
            resY = 729;
            break;
        case 7: // B4 Landscape
            resX = 729;
            resY = 1032;
            break;
            }
                   
	var camera = doc.activeCamera();
    if(camera == null)
    	print("camera is null");
    camera.setParameter("resolutionX", resX);
    camera.setParameter("resolutionY", resY);
    }             	