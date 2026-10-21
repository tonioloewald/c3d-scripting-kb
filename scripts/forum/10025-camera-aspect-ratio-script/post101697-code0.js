// Source: https://www.cheetah3d.com/forum/index.php?threads/10025/post-101697
// Author: podperson (Cheetah3D forum), posted 2016-06-15
// Thread: "Camera Aspect Ratio Script"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
var selectorArrayRender = ["640 x 480", "800 x 600", "1024 x 768", "1280 x 1024", "1344 x 756", "1600 x 900", "1680 x 1050", "1920 x 1080"];
 
function buildUI(tool){
        tool.addParameterSeparator("Set Render Size");
        tool.addParameterSelector("Render Size", selectorArrayRender, false, false);
        tool.addParameterButton("Set Render Size", "OK", "setRenderSize");
    	}
	
function setRenderSize(tool) {
    var doc = tool.document();
    var resX = 1024;
    var resY = 768;
    var oResolution = tool.getParameter("Render Size");
    print(oResolution);
    switch( oResolution ) {
        case 0: // 640x480 - Default
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
          
    var renderer = doc.currentRenderer();
    renderer.setParameter("resolutionX", resX);
    renderer.setParameter("resolutionY", resY);        
	}