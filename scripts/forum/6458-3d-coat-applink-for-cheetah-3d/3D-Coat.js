// Source: https://www.cheetah3d.com/forum/index.php?threads/6458/post-50095
// Author: ron3fp (Cheetah3D forum), posted 2010-10-31
// Thread: "3D Coat AppLink for Cheetah 3D"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/* 3D-Coat AppLink for Cheetah3D by ron3fp
 * 3D-Coat.js / ron3fp[AT]gmail.com
 * Modified OBJ Import code / original by Hiroto (tg_jp), used with permission
 * 
 * Installation Notes:
 *    1. Unzip 3D-Coat-AppLink.zip to directory 
 *       /Users/YourUser/Library/Application Support/Cheetah3D/scripts
 *    2. Create and alias to 3D-Coat.js and copy it to 
 *       /Users/YourUser/Library/Application Support/Cheetah3D/scripts/Tool 
 *    3. Launch Cheetah3D and select menu option Tools > Script > Tool Script > 3D-Coat.js
 *    4. Follow the configuration dialog.
 * 
 * ChangeLog:
 *    30/10/2010 - v1.0
 *       - Initial version
 *    27/11/2010 - v1.1
 *       - Material Export through .mtl added
 *       - Material Import through .c3dmat due to missing API call
 *       - Import scale options added
 *       - Direct Export 3DC >> C3D implemented
 *       - Configuration dialogs added
 */

var FILE_CONFIGURATION = "3dc.config";
var FILE_HOMELOCATION = "./homelocation";

var VERSION = "1.1";
var TITLE_APPLINK = "---=== 3D-Coat AppLink v" + VERSION + " ===---";
var FILE_APPLINK_EXPORT = "export.txt";
var FILE_APPLINK_IMPORT = "import.txt";
var FILE_APPLINK_TEXTURES = "textures.txt";
var DEFAULT_EXPORT_MTL = "3dcimport.mtl";
var DEFAULT_EXPORT_OBJ = "3dcimport.obj";
var PATH_DEFAULT_EXCHANGE = "/Users/YourUser/3D-CoatV3/Exchange";
var PATH_DEFAULT_HOME = "/Users/YourUser";
var PATH_DEFAULT_C3DAPP = "/Applications/Cheetah3D5.6/Cheetah3D.app";
var DIRECTORY_APPSUPPORT_C3D = "Library/Application Support/Cheetah3D";
var DIRECTORY_C3DMAT = DIRECTORY_APPSUPPORT_C3D + "/Materials/Z_3D-Coat";
var DIRECTORY_SCRIPTS_3DC = "scripts/3D-Coat";
var DIRECTORY_DIRECT_EXPORT = "Cheetah3D";
var FILE_DIRECT_EXPORT_RUN = "run.txt";
var FILE_DIRECT_EXPORT_PARAMS = "params.txt";
var CONTEXT_CONFIGURATION = "3D-Coat AppLink Configuration";

var PARAMETER_IMPORT = "Update changes";
var PARAMETER_EXPORT_PPP = "Paint Mesh: per-pixel";
var PARAMETER_EXPORT_MV = "Paint Mesh: microvtx";
var PARAMETER_EXPORT_PTEX = "Paint Mesh: ptex";
var PARAMETER_EXPORT_UV = "UV-mapping";
var PARAMETER_EXPORT_REF = "Reference mesh";
var PARAMETER_EXPORT_RETOPO = "New retopo layer";
var PARAMETER_EXPORT_VOX = "Mesh to voxel object";
var PARAMETER_EXPORT_ALPHA = "Mesh to pen alpha";
var PARAMETER_EXPORT_PRIM = "New voxel primitive";
var PARAMETER_EXPORT_AUTOPO = "Auto-retopology";
var PARAMETER_CONFIGURATION = "Directory settings";
var PARAMETER_SETTINGS_SCENENAME = "Scene Name";
var PARAMETER_SETTINGS_EXPORTDLG = "Show export dialog";
var PARAMETER_SETTINGS_IMPORTMESH = "Import mesh";
var PARAMETER_SETTINGS_CREATEMATERIALS = "Import .c3dmat";
var PARAMETER_SETTINGS_CREATEC3DMAT = "Import .c3dmat";
var PARAMETER_SETTINGS_SCALEMOD = "Import scale";
var PARAMETER_SETTINGS_SAVE = "Save settings";

var configurationFilePath = "";
var exchangePath = ""; // AppLink exchange directory
var cheetahPath = ""; // Cheetah3D .APP
var c3dmatPath = ""; // Cheetah3D materials path (if .c3dmat import is used)
var sceneName = "";
var homePath = "";
var scaleMod = 1.0;
var importC3DMat = true;
var importMesh = true;
var createMaterials = true;
var showExportDialog = true;

var configured = false;
var materialNames = new Array();
var internalMaterialNames = new Array();

var importCount = 0;

/**
 * Invoked when pressing the save settings button.
 */
function settings(tool) {
	OS.messageBox(CONTEXT_CONFIGURATION, 
			"Please left click on the FACTORY ICON in the top right corner of the tool "
			+ "tab to save the current settings as default. Directory settings are specified "
			+ "and saved seperately via the 'Configure' button.");
}

/**
 * Starts the configuration dialog. Used to specify the following settings:
 * - 3D-Coat exchange directory
 * - 3D-Coat direct export directory
 * - Cheetah3D application
 * - Cheetah3D material directory (.c3dmat) located in the user's "Application Support" directory
 * Writes the settings to the settings file when confirmed.
 */
function configure(tool){
	var confirmExchangeConfig = OS.messageBox(CONTEXT_CONFIGURATION, 
			"Please specify the 3D-COAT EXCHANGE DIRECTORY in the following dialog!\n\nExample: " 
			+ PATH_DEFAULT_EXCHANGE + "\n"
			+ "\nPlease note: you need to have at least 3D-Coat version 3.5.01 installed for "
			+ "core functionality, 3.5.04b+ for direct export capabilities.");
	if (confirmExchangeConfig) {
		exchangePath = OS.runOpenPanel();
		if (exchangePath != null) {
			var confirmC3DAppConfig = OS.messageBox(CONTEXT_CONFIGURATION, 
					"Please choose your CHEETAH3D APPLICATION (Cheetah3D.app) in the following "
					+ "dialog!\n\nExample: " 
					+ PATH_DEFAULT_C3DAPP
					+ "\n\nNote: You can just select the exchange folder if you do not want Cheetah3D to be automatically launched by 3D-Coat.");
			if (confirmC3DAppConfig) {
				cheetahPath = OS.runOpenPanel("app");
				if (cheetahPath != null) {
					var c3dAppSuppDir = new File(homePath + "/" + DIRECTORY_APPSUPPORT_C3D);
					if (!c3dAppSuppDir.exist()){
						var confirmC3DMatConfig = OS.messageBox(CONTEXT_CONFIGURATION, 
								"Please choose your CHEETAH3D MATERIAL DIRECTORY (.c3dmat) in the following "
								+ "dialog!\n\nExample: " 
								+ homePath + "/" + DIRECTORY_C3DMAT);
						if (confirmC3DMatConfig) {
							c3dmatPath = OS.runOpenPanel();
							if (c3dmatPath == null) {
								cancelConfiguration();
							}
						}
					}
					var c3dMatDir = new File(homePath + "/" + DIRECTORY_C3DMAT);
					if (!c3dMatDir.exist()) {
						OS.system("mkdir " + c3dMatDir);
						c3dmatPath = homePath + "/" + DIRECTORY_C3DMAT;
						print(DIRECTORY_C3DMAT + " created.");
					}
					var confirmWrite = OS.messageBox(CONTEXT_CONFIGURATION, 
							"3D-Coat AppLink will run with the following settings:"
							+ "\n\n[ 3D-Coat Exchange Directory ]:\n" + exchangePath
							+ "\n\n[ 3D-Coat Direct Export Directory ]:\n" + exchangePath + "/" 
							+ DIRECTORY_DIRECT_EXPORT
							+ "\n\n[ Cheetah3D Application ]:\n" + cheetahPath
							+ "\n\n[ Cheetah3D Material Directory ]:\n" + homePath + "/" 
							+ DIRECTORY_C3DMAT
							+ "\n\nPress [OK] to save the changes");
					if (confirmWrite) {
						writeConfiguration(tool, false);	
					} else {
						cancelConfiguration();
					}
				} else {
					cancelConfiguration();
				}	
			} else {
				cancelConfiguration();
			}
		} else {
			cancelConfiguration();
		}
	} else {
		cancelConfiguration();
	}
}

/**
 * Reads the configuration settings from the configuration file.
 * If the configuration file is not yet existing, the configuration dialog will be invoked.
 * @param tool
 */
function readConfiguration(tool){
	OS.system("echo $HOME > " + FILE_HOMELOCATION);
	var hLocFile = new File(FILE_HOMELOCATION);
	var homePathIsSet = false;
	if (hLocFile.exist()) {
		print("Reading $HOME information: ");
		 hLocFile.open(READ_MODE);
		 if (hLocFile.isOpen()){
			 homePath = hLocFile.readln();
			 homePathIsSet = true;
			 print(homePath);
			 hLocFile.close();
			 OS.system("rm " + FILE_HOMELOCATION);
		 }
	} else {
		var confirmHomeConfig = OS.messageBox(CONTEXT_CONFIGURATION, 
				"Please specify your HOME DIRECTORY in the following dialog!\n\nExample: " 
				+ PATH_DEFAULT_HOME);
		if (confirmHomeConfig) {
			homePath = OS.runOpenPanel();
			homePathIsSet = true;
		}
	}
	if (homePathIsSet) {
		configurationFilePath = homePath + "/" + DIRECTORY_APPSUPPORT_C3D + "/" +
			DIRECTORY_SCRIPTS_3DC + "/" + FILE_CONFIGURATION;
		var configurationFile = new File(configurationFilePath);
		if (configurationFile.exist()) {
			print("Reading configuration file (" + FILE_CONFIGURATION + "):\n"+ configurationFilePath);
			configurationFile.open(READ_MODE);
			if (configurationFile.isOpen()) {
				exchangePath = configurationFile.readln();
				cheetahPath = configurationFile.readln();
				c3dmatPath = configurationFile.readln();
				configured = true;
				configurationFile.close();
			} else {
				OS.messageBox(CONTEXT_CONFIGURATION, "Could not open configuration file.");
			}
		} else {
			configure();
		}	
	}
}

/**
 * Writes the configuration settings to the configuration file.
 * @param tool
 * @param writeUIParameters
 */
function writeConfiguration(tool, writeUIParameters){
	print("-writeConfiguration-");
	print(configurationFilePath);
	var scriptDirectoryPath = homePath + "/" + DIRECTORY_APPSUPPORT_C3D + "/" +
		DIRECTORY_SCRIPTS_3DC;
	var scriptDirectory = new File(scriptDirectoryPath);
	if (!scriptDirectory.exist()){
		print(scriptDirectoryPath + " does not exist.");
		OS.system("mkdir \"" + scriptDirectoryPath + "\"");
		print(scriptDirectoryPath + " created.");
		
	}
	var configurationFile = new File(configurationFilePath);
	configurationFile.open(WRITE_MODE);
	if(configurationFile.isOpen()){
		var directExportDirPath = exchangePath + "/" + DIRECTORY_DIRECT_EXPORT;
		var directExportDir = new File(directExportDirPath);
		if ( OS.system ) {
			if (!directExportDir.exist()){
				OS.system("mkdir " + directExportDirPath);	
				print(directExportDirPath + " created.");
			}
		}
		var runFilePath = exchangePath + "/" + DIRECTORY_DIRECT_EXPORT 
			+ "/" + FILE_DIRECT_EXPORT_RUN;
		var runFile = new File(runFilePath);
		runFile.open(WRITE_MODE);
		if (runFile.isOpen()){
			runFile.writeln(cheetahPath);
			runFile.close();
			print(runFilePath + " written.");
		}
		var paramFilePath = exchangePath + "/" + DIRECTORY_DIRECT_EXPORT 
			+ "/" + FILE_DIRECT_EXPORT_PARAMS;
		var paramFile = new File(paramFilePath);
		paramFile.open(WRITE_MODE);
		if (paramFile.isOpen()){
			paramFile.writeln("x.obj");
			paramFile.close();
			print(paramFilePath + " written.");
		}
		var matLibDirPath = homePath + "/" + DIRECTORY_C3DMAT;
		c3dmatPath = matLibDirPath;
		print(matLibDirPath);
		var matLibDir = new File(matLibDirPath);
		if ( OS.system ) {
			if (!matLibDir.exist()){
				OS.system("mkdir " + matLibDirPath);	
				print(matLibDirPath + " created.");
			}
		}
		print("Writing directory configuration...");
		configurationFile.writeln(exchangePath);
		configurationFile.writeln(cheetahPath);
		configurationFile.writeln(c3dmatPath);
		if (writeUIParameters) {
			print("Writing settings");
			if (tool.getParameter(PARAMETER_SETTINGS_CREATEMATERIALS)) {
				configurationFile.writeln("createMaterials 1");	
			} else {
				configurationFile.writeln("createMaterials 0");
			}
			if (tool.getParameter(PARAMETER_SETTINGS_CREATEC3DMAT)) {
				configurationFile.writeln("createC3DMat 1");	
			} else {
				configurationFile.writeln("createC3DMat 0");
			}
			if (tool.getParameter(PARAMETER_SETTINGS_IMPORTMESH)) {
				configurationFile.writeln("importMesh 1");	
			} else {
				configurationFile.writeln("importMesh 0");
			}
			if (tool.getParameter(PARAMETER_SETTINGS_EXPORTDLG)) {
				configurationFile.writeln("showExportDialog 1");	
			} else {
				configurationFile.writeln("showExportDialog 0");
			}
			configurationFile.writeln("" + tool.getParameter(PARAMETER_SETTINGS_SCALEMOD));
		}
		configurationFile.close();
		print(configurationFilePath + " written.");
		configured = true;
		OS.messageBox(CONTEXT_CONFIGURATION, 
				"Configuration settings have been saved at" + configurationFilePath);
	} else {
		OS.messageBox(CONTEXT_CONFIGURATION, 
				"Configuration file could not be written at location \n" + configurationFilePath);
		configured = false;
	}
}

/**
 * Cancels the configuration dialog.
 */
function cancelConfiguration(){
	print("-cancelConfiguration-");
	OS.messageBox(CONTEXT_CONFIGURATION, 
			"You have cancelled the configuration.\n"
			+ "Changes have not been written.");
	configured = false;
}

/**
 * UI Initialization. Creates all buttons, checkboxes and input textfields.
 * Reads the configuration file to load any persistent settings.
 * When run for the first time, it will only show the ExchangeDirectory input textfield.
 * @param tool
 */
function buildUI(tool) {
	print(TITLE_APPLINK);
	readConfiguration(tool);
	tool.addParameterSeparator(TITLE_APPLINK);
	if (configured) {
		// Import 3DC >> C3D
		tool.addParameterSeparator("Import from 3D-Coat");
		tool.addParameterButton(PARAMETER_IMPORT,"Import","UPDATE_Import");
		// Export C3D >> 3DC
		tool.addParameterSeparator("Export to 3D-Coat");
	    tool.addParameterButton(PARAMETER_EXPORT_PPP,"Export","PPP_Export");
		tool.addParameterButton(PARAMETER_EXPORT_MV,"Export","MV_Export");
		tool.addParameterButton(PARAMETER_EXPORT_PTEX,"Export","PTEX_Export");
		tool.addParameterButton(PARAMETER_EXPORT_UV,"Export","UV_Export");
		tool.addParameterButton(PARAMETER_EXPORT_REF,"Export","REF_Export");
		tool.addParameterButton(PARAMETER_EXPORT_RETOPO,"Export","RETOPO_Export");
		tool.addParameterButton(PARAMETER_EXPORT_VOX,"Export","VOX_Export");
		tool.addParameterButton(PARAMETER_EXPORT_ALPHA,"Export","ALPHA_Export");
		tool.addParameterButton(PARAMETER_EXPORT_PRIM,"Export","PRIM_Export");
		tool.addParameterButton(PARAMETER_EXPORT_AUTOPO,"Export","AUTOPO_Export");
	}
	// Settings
	tool.addParameterSeparator("Settings");
	if (configured) {
		if (showExportDialog) {
			tool.addParameterBool(PARAMETER_SETTINGS_EXPORTDLG, 1, 0, 1, false, false);
		} else {
			tool.addParameterBool(PARAMETER_SETTINGS_EXPORTDLG, 0, 0, 1, false, false);
		}
		if (importMesh){
			tool.addParameterBool(PARAMETER_SETTINGS_IMPORTMESH, 1, 0, 1, false, false);
		} else {
			tool.addParameterBool(PARAMETER_SETTINGS_IMPORTMESH, 0, 0, 1, false, false);
		}
		if (createMaterials) {
			tool.addParameterBool(PARAMETER_SETTINGS_CREATEMATERIALS, 1, 0, 1, false, false);
		} else {
			tool.addParameterBool(PARAMETER_SETTINGS_CREATEMATERIALS, 0, 0, 1, false, false);
		}
		tool.addParameterFloat(PARAMETER_SETTINGS_SCALEMOD, scaleMod, 0.01, 100, false, false);
	}
	tool.addParameterButton(PARAMETER_CONFIGURATION,"Configure","configure");
	if (configured) {
		tool.addParameterButton(PARAMETER_SETTINGS_SAVE,"Save","settings");
	}
}

function getNewMaterialName() {
	var d = new Date();
	var timems = d.getTime();
	materialNames.push(timems);
	return timems;
}

function create_material(tool, texFile){
	print("texFile=" + texFile);
	materialNames = new Array();
	var texFile = new File(texFile);
	texFile.open(READ_MODE);
	if (texFile.isOpen()) {
		var txLine = texFile.readln();
		var txCount = 1;
		var matName = "";
		var uvName = "";
		var type = "";
		var txPath = "";
		var c3dmSrc = "";
		var c3dmDst = "";
		var sdefSrc = "";
		var sdefDst = "";
		var tx_color = "";
		var tx_specular = "";
		var tx_normalmap = "";
		var tx_displacement = "";
		var tx_displacement_scale;
		while (txLine != -1) {
			print(txCount);
			if (txCount == 1 && txLine != matName) { // Material name
				print("COPY C3DMAT");
				matName = txLine;
				matFileName = getNewMaterialName();
				internalMaterialNames.push(matName);
				var c3dmSrc = homePath + "/" + DIRECTORY_APPSUPPORT_C3D + "/" +
					DIRECTORY_SCRIPTS_3DC + "/Material.c3dmat";
				var c3dmDst = homePath + "/" + DIRECTORY_C3DMAT + "/" + matFileName + ".c3dmat";
				OS.system("ditto \"" + c3dmSrc + "\" \"" + c3dmDst + "\"");
			}
			if (txCount == 2 && txLine != uvName) { // UV set
				uvName = txLine;
			}
			if (txCount == 3) { // Type
				type = txLine;
				print("Type=" + type);
			}
			if (txCount == 4) { // Texture path
				print("Path=" + txLine);
				if (type == "color") {
					tx_color = txLine;
				}
				if (type == "specular") { 
					tx_specular = txLine;
				}
				if (type == "normalmap") {
					tx_normalmap = txLine;
				}
				if (type == "displacement") {
					tx_displacement = txLine;
					tx_displacement = texFile.readln();
				}
			}
			if (txCount == 4) {
				var sdefSrc = homePath + "/" + DIRECTORY_APPSUPPORT_C3D + "/" +
					DIRECTORY_SCRIPTS_3DC + "/Material.c3dmat/Resources/Shaderdef.xml";
				var sdefDst = homePath + "/" + DIRECTORY_C3DMAT + "/" + matFileName + ".c3dmat/Resources/Shaderdef.xml";
				var sdefSrcFile = new File(sdefSrc);
				var sdefDstFile = new File(sdefDst);
				sdefSrcFile.open(READ_MODE);
				sdefDstFile.open(WRITE_MODE);
				if (sdefSrcFile.isOpen() && sdefDstFile.isOpen()) {
					var sdLine = sdefSrcFile.readln();
					while (sdLine != -1) {
						if (sdLine.match("MATERIAL_NAME") == "MATERIAL_NAME") {
							sdefDstFile.writeln(sdLine.replace("MATERIAL_NAME", matName));
						} else if (sdLine.match("TEXTURE_PATH_DIFFUSE") == "TEXTURE_PATH_DIFFUSE") {
							sdefDstFile.writeln(sdLine.replace("TEXTURE_PATH_DIFFUSE", tx_color));
						} else if (sdLine.match("TEXTURE_PATH_SPECULAR") == "TEXTURE_PATH_SPECULAR") {
							sdefDstFile.writeln(sdLine.replace("TEXTURE_PATH_SPECULAR", tx_specular));
						} else if (sdLine.match("TEXTURE_PATH_NORMAL") == "TEXTURE_PATH_NORMAL") {
							sdefDstFile.writeln(sdLine.replace("TEXTURE_PATH_NORMAL", tx_normalmap));
						} else {
							sdefDstFile.writeln(sdLine);
						}
						sdLine = sdefSrcFile.readln();
					}
					sdefSrcFile.close();
					sdefDstFile.close();
					print("FILES CLOSED");
				} else {
					print("Could not open Shaderdef.xml.");
				}
			}
			txLine = texFile.readln();
			txCount++;
			if (txCount > 4) txCount = 1;
		}
		texFile.close();
		
		// Load C3DMAT
		//for (var i=materialNames.length-1; i>-1; i--){
		for (var i=0; i<materialNames.length; i++){
			print("#MatNames=" + materialNames.length);
			print(i+1 + ":" + materialNames[i]);
			tool.document().addMaterial("" + materialNames[i], "" + internalMaterialNames[i]);
		}
		
		
	} else {
		OS.messageBox("Error",
				"Could not find 3D-Coat textures information.");
		return;
	}
}

/**
 * C3D MTL Import. As there is no Cheetah3D API for assigning textures to materials,
 * a workaround approach via Cheetah's own .c3dmat format is implemented.
 * The function will take the generated textures (diffuse, specular, normal, displacement)
 * and will write a custom .c3dmat file incorporating those textures. The .c3dmat file
 * will the be put in Cheetah3D's material directory and will therefore be available from
 * within the application. The user will have to manually drag the material onto the merged mesh.
 * In case that only texture painting is performed, the texture will be automatically updated upon import.
 * @param tool
 */
function materialImport(tool){
	// 1. Read 3DC textures.txt
	// 2. Generate .c3dmat file and include the texture paths
}

/**
 * Main export function from C3D to 3DC.
 * @param tool
 * @param description
 * @param usageid
 */
function Export_to_3DC(tool, description, usageid) {
	print (description + " export to 3D-Coat");
	var exportFilePath = "";
	if (tool.getParameter("Show export dialog")) {
		exportFilePath = OS.runSavePanel("obj");
	} else {
		exportFilePath = exchangePath + "/" + DEFAULT_EXPORT_OBJ;
	}
	if (exportFilePath != null) {
		print("Saving full scene to " + exportFilePath);
		tool.document().saveToFile(exportFilePath, "obj");
		var exportMtlFilePath = exportFilePath.substring(0,exportFilePath.length-4);
		tool.document().saveToFile(exportMtlFilePath + ".mtl", "mtl");
		// Export all textures used in the scene
		var exportDirPath = exportFilePath.substring(0,exportFilePath.lastIndexOf("/"));
		for (var i=0; i<tool.document().materialCount();i++){
			var mat = tool.document().materialAtIndex(i);
			print(mat.colorMap());
			var texFile = new File(mat.colorMap());
			var newPath = exportDirPath + "/" + texFile.lastPathComponent();
			texFile.copyTo(newPath);
		}
		// 3D-Coat import trigger file
		var importTxtFilePath = exchangePath + "/" + FILE_APPLINK_IMPORT;
		print ("Saving 3D-Coat import trigger file to " + importTxtFilePath);
		var importTxtFile = new File(importTxtFilePath);
		importTxtFile.open(WRITE_MODE);
		if (importTxtFile.isOpen()) {
			importTxtFile.writeln(exportFilePath);
			importTxtFile.writeln(exportFilePath);
			importTxtFile.writeln("[" + usageid + "]"); // Usage identifier
			importTxtFile.close();
			print("import.txt written");
			OS.messageBox("Export to 3D-Coat", "Scene has been transferred for " + description + ". "
			 	+ "Please switch to your 3D-Coat application to proceed.\n");
		} else {
			OS.messageBox("Error", "File cannot be accessed. " +
				"Please verify the correct \n3D-Coat exchange directory path." );	
		}	
	} else {
		print("Export cancelled");
	}
}

// Per-pixel export
function PPP_Export(tool){
	Export_to_3DC(tool, "Per pixel painting","ppp");
}

function MV_Export(tool){
	Export_to_3DC(tool, "Microvertex painting","mv");	
}

function PTEX_Export(tool){
	Export_to_3DC(tool, "PTEX painting","ppp");
}

function UV_Export(tool){
	Export_to_3DC(tool, "UV mapping","uv");
}

function REF_Export(tool){
	Export_to_3DC(tool, "Reference Mesh","ref");
}

function RETOPO_Export(tool){
	Export_to_3DC(tool, "Retopology","retopo");
}

function VOX_Export(tool){
	Export_to_3DC(tool, "Voxel sculping","vox");
}

function ALPHA_Export(tool){
	Export_to_3DC(tool, "Alpha pen","alpha");
}

function PRIM_Export(tool){
	Export_to_3DC(tool, "Voxel primitive","prim");
}

function AUTOPO_Export(tool){
	Export_to_3DC(tool, "Auto-retopology (AUTOPO)","autopo");
}

function ReplaceMesh(tool){
	// not possible through C3D scripting
}

function ReplaceMaterials(tool){
	// not possible through C3D scripting
}

/**
 * Processes the import of the 3DC export mesh and materials.
 * 
 * @param tool
 * @param exportFilePath
 * @param texturesFilePath
 */
function process3DCImport(tool, exportFilePath, texturesFilePath){
	var expFile = new File(exportFilePath);
	if (expFile.exist()) {
		// MESH IMPORT
		if (tool.getParameter(PARAMETER_SETTINGS_IMPORTMESH)){
			print("Import of 3D-Coat files to Cheetah3D");
			expFile.open(READ_MODE);
			if (expFile.isOpen()) {
				print(exportFilePath + " opened.");
				var objFile = new File(expFile.readln());
				if (objFile.exist()) {
					ImportMesh(tool, objFile);
				} else {
					OS.messageBox("Error", "3D-Coat export mesh file (.obj) was not found on specified path." );
				}
			}
			expFile.close();
		} else {
			print("3D-Coat mesh import skipped.");
		}
		// CREATE MATERIALS
		if (tool.getParameter(PARAMETER_SETTINGS_CREATEMATERIALS)) {
			create_material(tool, texturesFilePath);
		} else {
			print("Material creation skipped");
			return;
		}
		if (OS.system) {
			OS.system("rm " + exportFilePath);
			OS.system("rm " + texturesFilePath);
			OS.system("rm -f -dr " + "\"" + DIRECTORY_C3DMAT + "\"");
		}
	} else {
		importCount++;
		if (importCount == 2) { // Could not find any export information in both interface locations
			OS.messageBox("Nothing to import", "Could not find 3D Coat export information." );	
		}
	}
}

/**
 * Main import function from 3DC to C3D.
 * @param tool
 */
function UPDATE_Import(tool){
	print("- UPDATE_Import -");
	var exportFilePath = exchangePath + "/" + FILE_APPLINK_EXPORT;
	var directExportFilePath = exchangePath + "/" + DIRECTORY_DIRECT_EXPORT + "/" + FILE_APPLINK_EXPORT;
	var exportTexturesFilePath = exchangePath + "/" + FILE_APPLINK_TEXTURES;
	//var directExportTexturesFilePath = exchangePath + "/" + DIRECTORY_DIRECT_EXPORT + "/" + FILE_APPLINK_TEXTURES;
	var directExportTexturesFilePath = exchangePath + "/" + FILE_APPLINK_TEXTURES;
	
	print("Export file: " + exportFilePath);
	print("Direct export file: " + directExportFilePath);
	print("Export textures file: " + exportTexturesFilePath);
	print("Direct export textures file: " + directExportTexturesFilePath);
	
	process3DCImport(tool, exportFilePath, exportTexturesFilePath);
	process3DCImport(tool, directExportFilePath, directExportTexturesFilePath);
	importCount = 0;
}

String.prototype.trim = function() {
	return this.replace(/^[ ]+|[ ]+$/g, '');
};

var Vec3D_toString = function( vec ) {
	return '(' + vec.x.toFixed(4) + ', ' + vec.y.toFixed(4) + ', ' + vec.z.toFixed(4) + ')';
};

var obj_list = [];

var v_count = 0;
var f_count = 0;
var f_count_total = 0;

// bench
var st1, st2, st3, st4;

function ImportMesh(tool, file){
	
	file.open(READ_MODE);
	if (file.isOpen() == false) {
		OS.messageBox("Error", "3DC OBJ file could not be opened." );
		return;
	}
	
	print('--- OBJ Importer.js ---');
	// bench
	st1 = new Date().getTime();
	
	var doc = tool.document();
	var obj = null; // obj holder
	var core = null; // core holder
	var separated = null;
	
	var vert_check = [];
	var vi_list = [];
	
	var i, j;
	
	var now = new Date();
	var tmp_v = '/tmp/chv_'+now.getTime();
	var tmp_uv = '/tmp/chuv_'+now.getTime();
	
	var cache_v = new File(tmp_v);
	var cache_uv = new File(tmp_uv);
	 cache_v.open(WRITE_MODE, BIG_ENDIAN);
	cache_uv.open(WRITE_MODE, BIG_ENDIAN);
	
	obj_list.length = 0;
	
	var mat_sels = undefined;
	var v_offset = undefined;
	
	//var invert_u = tool.getParameter("invert u");
	//var invert_v = tool.getParameter("invert v");
	var invert_u = 0;
	var invert_v = 1;
	var mtl_files = [];
	
	//var keep_vo = tool.getParameter("keep vertices order");
	//var auto_sep = tool.getParameter("auto separator");
	var keep_vo = 0;
	var auto_sep = 0;
	
	v_count = 0;
	f_count = 0;
	f_count_total = 0;
	
	f_pos = undefined;
	cur_pos = 0;
	
	var o_count = 0; // undefined object count
	var vi_count = 0; // total vertices count
	
	var line  = file.readln();
	
	// at first, caching all vertices and uv data.
	var vx,vy,yz;
	
	var vx_max, vy_max, vz_max;
	var vx_min, vy_min, vz_min;
	var v_init = false;
	while ( line != -1 ) {
		// trim -> split
		var data = line.trim().split(/ +/);
		if (data[0] == "v") {
			vx = parseFloat(data[1]);
			vy = parseFloat(data[2]);
			vz = parseFloat(data[3]);
			
			if (! v_init) {
				vx_max = vx;
				vy_max = vy;
				vz_max = vz;
				vx_min = vx;
				vy_min = vy;
				vz_min = vz;
				
				v_init = true;
			} else {
				vx_max = (vx > vx_max)? vx : vx_max;
				vy_max = (vy > vy_max)? vy : vy_max;
				vz_max = (vz > vz_max)? vz : vz_max;
				vx_min = (vx < vx_min)? vx : vx_min;
				vy_min = (vy < vy_min)? vy : vy_min;
				vz_min = (vz < vz_min)? vz : vz_min;
			}
			
			cache_v.writeFloat( vx );
			cache_v.writeFloat( vy );
			cache_v.writeFloat( vz );
			v_count++;
		} else if (data[0] == "vt") {
			var u, v;
			if (invert_u) {
				u = parseFloat( data[1] ) * -1 + 1;
			} else {
				u = parseFloat( data[1] );
			}
			if (invert_v) {
				v = parseFloat( data[2] ) * -1 + 1;
			} else {
				v = parseFloat( data[2] );
			}
			cache_uv.writeFloat( u );
			cache_uv.writeFloat( v );
		} else if (data[0] == "f") {
			if (f_pos == undefined) {
				f_pos = cur_pos;
			}
			f_count_total++;
		} else if (data[0] == "o" || data[0] == "g" || data[0] == "usemtl" || data[0] == "mtllib") {
			if (f_pos == undefined) {
				f_pos = cur_pos;
				//print( 'set:'+f_pos );
			}
		}
		cur_pos = file.getpos();
		line = file.readln();
	}
	
	cache_v.close();
	cache_uv.close();
	
	var v_cache_size = cache_v.size();
	var float_size = v_cache_size / (v_count*3);
	
	var bsp_min = new Vec3D( vx_min, vy_min, vz_min );
	var bsp_max = new Vec3D( vx_max, vy_max, vz_max );
	
	print('min:'+Vec3D_toString(bsp_min));
	print('max:'+Vec3D_toString(bsp_max));
	
	var read_v = new File(tmp_v);
	var read_uv = new File(tmp_uv);
	read_v.open(READ_MODE,  BIG_ENDIAN);
	read_uv.open(READ_MODE,  BIG_ENDIAN);
	
	// bench
	st2 = new Date().getTime();
	st3 = st2 - st1;
	st4 = st3/1000;
	print("[bench]:"+st3+" ms ("+st4.toFixed(1)+" s), v_count:"+v_count);
	
	if (keep_vo) {
		var obj_name = file.lastPathComponent();
		obj = doc.addObject(POLYGONOBJ);
		obj.setParameter("name",obj_name);
		core = obj.core();
		core.buildVertexBSP( bsp_min, bsp_max );
		mat_sels = [];
		separated = [ undefined ];
		v_offset = [ vi_count ];
		
		obj_list.push([obj_name, obj, mat_sels, separated, v_offset ]);
		
		while (read_v.size() > read_v.getpos()) {
			var vec = new Vec3D( read_v.readFloat(), read_v.readFloat(), read_v.readFloat() );
			var vi = core.addVertex( false, vec );
			vi_count++;
		}
	}
	
	//print(f_pos+':'+SEEK_SET);
	//file.seek(f_pos, SEEK_SET);
	file.setpos(f_pos);
	
	line = file.readln();
	
	while ( line != -1 ) {
		var data = line.trim().split(/ +/);
		if (data[0] == "o" || data[0] == "g") {
			if (!keep_vo) {
				var grp_name = line.trim().match(/^[og] (.+)$/);
				if (grp_name) {
					var obj_name = grp_name[1];
				} else {
					o_count++;
					var obj_name = "Undefined_"+o_count;
				}
				var create = undefined;
				for (i = 0;i < obj_list.length;i++) {
					if (obj_list[i][0] == obj_name) {
						create = i;
					}
				}
				//
				if (create != undefined) {
					obj = obj_list[create][1];
					core = obj.core();
					mat_sels = obj_list[create][2];
				} else {
					obj = doc.addObject(POLYGONOBJ);
					obj.setParameter("name", obj_name);
					core = obj.core();
					core.buildVertexBSP( bsp_min, bsp_max );
					mat_sels = [];
					separated = [ undefined ];
					v_offset = [ vi_count ];
					
					obj_list.push( [obj_name, obj, mat_sels, separated, v_offset ] );
				}
			}
			//
		} else if (data[0] == "f") {
			if (!core) {
				var obj_name = file.lastPathComponent();
				obj = doc.addObject(POLYGONOBJ);
				obj.setParameter("name",obj_name);
				core = obj.core();
				core.buildVertexBSP( bsp_min, bsp_max );
				mat_sels = [];
				separated = [ undefined ];
				v_offset = [ vi_count ];
				
				obj_list.push([obj_name, obj, mat_sels, separated, v_offset ]);
			}
			var f_list  = [];
			var uv_list = [];
			var vi;
			for (i = data.length - 1;i > 0;i--) {
				var face = data[i].split('/');
				//read_v.seek(  float_size * 3 * (parseInt(face[0]) - 1), SEEK_SET);
				//read_uv.seek( float_size * 2 * (parseInt(face[1]) - 1), SEEK_SET);
				 read_v.setpos( float_size * 3 * (parseInt(face[0]) - 1) ); // x, y, z
				read_uv.setpos( float_size * 2 * (parseInt(face[1]) - 1) );
				
				var vec = new Vec3D( 
						read_v.readFloat() * tool.getParameter(PARAMETER_SETTINGS_SCALEMOD), 
						read_v.readFloat() * tool.getParameter(PARAMETER_SETTINGS_SCALEMOD), 
						read_v.readFloat() * tool.getParameter(PARAMETER_SETTINGS_SCALEMOD) );
				
				if (keep_vo) {
					vi = parseInt(face[0]) - 1;
				} else {
					if (vert_check.indexOf( parseInt(face[0]) - 1) == -1) {
						vi = core.addVertex(false, vec);
						vi_count++;
						
						vert_check.push( parseInt( face[0] ) - 1 );
						vi_list[ parseInt( face[0] ) - 1 ] = vi;
					} else {
						//vi = core.addVertex(true, vec);
						vi = vi_list[ parseInt( face[0] ) - 1 ];
					}
				}
				f_list.push( vi );
				uv_list.push( new Vec2D( read_uv.readFloat(), read_uv.readFloat() ) );
			}
			var pi = core.addIndexPolygon(data.length-1, f_list, uv_list);
			core.setPolygonSelection(pi, true);
			f_count++;
			checkProgress();
		} else if (data[0] == "usemtl") {
			var obj_name;
			if (!core) { //
				obj_name = file.lastPathComponent();
				obj = doc.addObject(POLYGONOBJ);
				obj.setParameter("name",obj_name);
				core = obj.core();
				core.buildVertexBSP( bsp_min, bsp_max );
				mat_sels = [];
				separated = [ undefined ];
				v_offset = [ vi_count ];
				
				obj_list.push([obj_name, obj, mat_sels, separated, v_offset ]);
			}
			
			obj_name = obj.getParameter("name");
			var sels = 0;
			for (i = 0;i < obj_list.length;i++) {
				var comp_mat_sels = obj_list[i][2];
				var mat_sels_len = comp_mat_sels.length;
				for (j = 0;j < mat_sels_len;j++) {
					if (obj_name == obj_list[i][0] && comp_mat_sels[j] == data[1]) {
						sels = j+1;
						//
						obj = obj_list[i][1];
						core = obj.core();
						mat_sels = obj_list[i][2];
						separated = obj_list[i][3];
						v_offset = obj_list[i][4];
					}
				}
			}
			
			if (sels > 0) {
				if (sels < 16) {
					core.setActivePolygonSelection(sels);
				} else {
					core.setActivePolygonSelection(0);
				}
			} else { //
				if (!keep_vo && auto_sep && mat_sels.length > 14) { // mat sel
					var create = true;
					for (i = 0;i < obj_list.length;i++) {
						var comp_obj = obj_list[i];
						if (comp_obj[0] == obj_name && comp_obj[2].length < 15) {
							create = false;
							
							obj = comp_obj[1];
							mat_sels = comp_obj[2];
							mat_sels.push(data[1]);
						}
					}
					
					if (create) {
						var sep_num;
						if (separated[0] != undefined) {
							sep_num = separated[0];
						} else {
							separated[0] = 1;
							sep_num = 1;
						}
						
						obj = doc.addObject(POLYGONOBJ);
						obj.setParameter("name", obj_name);
						core = obj.core();
						core.buildVertexBSP( bsp_min, bsp_max );
						mat_sels = [data[1]];
						separated = [ sep_num + 1 ];
						v_offset = [ vi_count ];
						
						obj_list.push([ obj_name, obj, mat_sels, separated, v_offset ]);
					}
				} else {
					mat_sels.push(data[1]);
				}
				
				if (mat_sels.length < 16) {
					core.setActivePolygonSelection(mat_sels.length);
				} else {
					core.setActivePolygonSelection(0);
				}
			}
		} else if (data[0] == "mtllib") {
			for (i = 1;i < data.length;i++) {
				mtl_files.push( data[i] );
			}
		}
		line = file.readln();
	}
	
	print('vi_count:'+vi_count);
	
	core.setActivePolygonSelection(0);
	
	file.close();

	read_v.close();
	read_uv.close();
	
	if ( OS.system ) {
		OS.system('rm '+tmp_v);
		OS.system('rm '+tmp_uv);
	}
	
	for (i = 0;i < obj_list.length;i++) {
		obj = obj_list[i][1];
		core = obj.core();
		core.destroyVertexBSP(); // destroy
		
		core.setActivePolygonSelection(0); // reset poly selection
		
		obj.update();
	}

	// bench
	st2 = new Date().getTime();
	st3 = st2 - st1;
	st4 = st3/1000;
	print("[bench]:"+st3+" ms ("+st4.toFixed(1)+" s), f_count:"+f_count);
	
}

function checkProgress() {
	if (f_count % 2000 == 0) {
		var pr = f_count / f_count_total * 100;
		print('progress:'+pr.toFixed(2)+' %');
	}
}

function setTextureImage(mat, param, data, mat_name) {
	var tex_data = data.split(/\./); // detect ext
	var ext = tex_data[tex_data.length-1];
	if (ext.match(/(jpg|gif|bmp|tif|png)/)) {
		var msg = "select "+param+" texture file ("+data+") for "+mat_name;
		var result = OS.messageBox("select "+param+" texture", msg);
		//if (!result) return false;
		print(msg); //
		var tex_path = OS.runOpenPanel(ext);
	} else {
		var tex_path = false;
	}
	if (tex_path) {
		mat.setParameter(param, tex_path);
		return true;
	} else {
		return false;
	}
}

function trim(s)
{
	var l=0; var r=s.length -1;
	while(l < s.length && s[l] == ' ')
	{	l++; }
	while(r > l && s[r] == ' ')
	{	r-=1;	}
	return s.substring(l, r+1);
}

