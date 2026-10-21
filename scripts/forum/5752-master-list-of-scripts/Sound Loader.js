// Source: https://www.cheetah3d.com/forum/index.php?threads/5752/post-128034
// Author: Filip (Cheetah3D forum), posted 2024-04-02
// Thread: "Master List of Scripts"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//

function buildUI( obj ) {

    obj.addParameterBool("renderActive", 0, 1, true, true);

    obj.addParameterSeparator("Sound");

    obj.addParameterString("sound file", "", false);
    obj.addParameterInt("resolution", 120, 1, 600, false, false);
    obj.addParameterButton("load sound", "load", "loadSoundFile");

    obj.addParameterFloat("sound left", 0, -1, 1, true, true);
    obj.addParameterFloat("sound right", 0, -1, 1, true, true);

    obj.addParameterFloat("sound wave", 0, -1000, 1000, true, true);

    /*  
    obj.addParameterSeparator("Target");

    obj.addParameterLink("target obj", false, false);
    obj.addParameterString("target formula", "v", false, false);
    */

    //
    obj.setParameter("name", "Sound");
    obj.setParameter("displayGhosted", true);

}

function buildObject( obj ) {

    var modeTag = obj.tagOfType( MODETAG );
    modeTag.setParameter("renderActive", obj.getParameter("renderActive"), false);

    var i;
    var core = obj.core();

    var len = so_vertices.length;
    for( i = 0;i < len;i++ ) {
        var v = new Vec3D( so_vertices[i][0], so_vertices[i][1], so_vertices[i][2] );
        core.addVertex( false, v );
    }
    var len = so_polygons.length;
    for( i = 0;i < len;i++ )　{
        var size = so_polygons[i].length;
        core.addIndexPolygon( size, so_polygons[i] );
    }

}

function loadSoundFile( obj ) {

    var path = OS.runOpenPanel("aac", "ac3", "aif", "aiff", "aifc", "caf", "mp3", "mp4", "m4a", "wav", "mov");
    if (path == null) return;

    obj.setParameter("sound file", path);

    var soundPath = obj.getParameter("sound file");
    var resolution = obj.getParameter("resolution");

    var soundFile = new File( soundPath );
    if (soundFile && soundFile.exist()) {

        var scriptFilePath = obj.scriptPath();
        var scriptFile = new File( scriptFilePath );
        var scriptPath = scriptFile.directory();
        var dataPath = '/tmp/soundLoader.' + Math.random() + '.data';

        var command = scriptPath.replace(/\s/g, "\\ ") + "/Sound\\ Loader\\ Helper " + 
        '"' + soundPath + '"' + " " + '"' + dataPath + '"' + " center " + resolution;

        OS.system(command);

        print( command );

        var dataFile = new File( dataPath );
        dataFile.open( READ_MODE, LITTLE_ENDIAN );

        if (!dataFile.isOpen()) {
            print( 'dataFile is not open: ' + dataPath );
            return;
        }

        var rate = dataFile.readInt();
        var duration = dataFile.readFloat();
        var dataCount = dataFile.readInt();
        var channelCount = dataFile.readInt();
        var normalizeMax = dataFile.readInt();

        print( rate + ', ' + channelCount + ', ' + duration.toFixed(3) + ', ' + dataCount + ', normalizeMax:' + normalizeMax );

        var timeCurrent = 0;
        var currentTake = obj.document().currentTake();

        var param = obj.parameterWithName("sound left");
        var takeNode = param.takeNodeWithName( currentTake.name );
        if (takeNode == null) {
            takeNode = param.addTakeNode( currentTake.name );
        }
        var fCurveLeft = takeNode.fCurveAtIndex( 0 );

        if (fCurveLeft.keyCount() > 0) {
            fCurveLeft.removeAllKeys();
        }

        param = obj.parameterWithName("sound right");
        takeNode = param.takeNodeWithName( currentTake.name );
        if (takeNode == null) {
            takeNode = param.addTakeNode( currentTake.name );
        }
        var fCurveRight = takeNode.fCurveAtIndex( 0 );

        if (fCurveRight.keyCount() > 0) {
            fCurveRight.removeAllKeys();
        }

        var wLeft = 0;
        var wLeftTime = 0;
        var wRight = 0;
        var wRightTime = 0;

        print('count:' + dataCount);
        var MAX_KEYCOUNT = 16000;

        for (var i = 0;i < dataCount;i++) {
            var w = dataFile.readInt(); //dataFile.readFloat();

            var key = new FCurveKey();
            key.selected = false;
            key.time = timeCurrent;
            key.left_type = LINEAR_INTERPOL;
            key.right_type = LINEAR_INTERPOL;

            if (w !== undefined) {
                key.value = w / normalizeMax;
            } else {
                key.value = 0;
            }

            if (wLeft != key.value) {

                if (key.time - wLeftTime > (1 / resolution) * 2 ) {
                    var altKey = new FCurveKey();
                    altKey.selected = false;
                    altKey.time = key.time - (1 / resolution);
                    altKey.left_type = LINEAR_INTERPOL;
                    altKey.right_type = LINEAR_INTERPOL;
                    altKey.value = wLeft;
                    if (fCurveLeft.keyCount() < MAX_KEYCOUNT) {
                        fCurveLeft.addKey( altKey );
                    } else {
                        print('MAX_KEYCOUNT:' + fCurveLeft.keyCount());
                        i = dataCount + 1;
                    }
                }

                if (fCurveLeft.keyCount() < MAX_KEYCOUNT) {
                    fCurveLeft.addKey( key );
                } else {
                    print('MAX_KEYCOUNT:' + fCurveLeft.keyCount());
                    i = dataCount + 1;
                }
                wLeft = key.value;
                wLeftTime = key.time;
            }


            if (channelCount == 2) {
                w = dataFile.readInt();

                var key = new FCurveKey();
                key.selected = false;
                key.time = timeCurrent;
                key.left_type = LINEAR_INTERPOL;
                key.right_type = LINEAR_INTERPOL;

                if (w !== undefined) {
                    key.value = w / normalizeMax;
                } else {
                    key.value = 0;
                }

                if (wRight != key.value) {

                    if (key.time - wLeftTime > (1 / resolution) * 2) {
                        var altKey = new FCurveKey();
                        altKey.selected = false;
                        altKey.time = key.time - (1 / resolution);
                        altKey.left_type = LINEAR_INTERPOL;
                        altKey.right_type = LINEAR_INTERPOL;
                        if (fCurveRight.keyCount() < MAX_KEYCOUNT) {
                            fCurveRight.addKey( altKey );
                        } else {
                            print('MAX_KEYCOUNT:' + fCurveRight.keyCount());
                            i = dataCount + 1;
                        }
                    }

                    if (fCurveRight.keyCount() < MAX_KEYCOUNT) {
                        fCurveRight.addKey( key );
                    } else {
                        print('MAX_KEYCOUNT:' + fCurveRight.keyCount());
                        i = dataCount + 1;
                    }
                    wRight = key.value;
                    wRightTime = key.time;
                }
            }

            timeCurrent += 1 / resolution;
        }

        if (fCurveLeft.keyCount() > 0) { // 0 finish.
            var key = new FCurveKey();
            key.time = timeCurrent;
            key.value = 0;

            fCurveLeft.addKey( key );
        }
        if (fCurveRight.keyCount() > 0) { // 0 finish.
            var key = new FCurveKey();
            key.time = timeCurrent;
            key.value = 0;

            fCurveRight.addKey( key );
        }

        dataFile.close();

        OS.system( "rm " + dataPath );

        if (i == dataCount + 2) {
            OS.messageBox('MAX_KEYCOUNT WARNING', 'Some sound data is not imported.')
        }
    }
}

var so_vertices = [ [-0.089931, 0.294942, -0.012100],[-0.091996, 0.290320, -0.023774],[-0.222098, 0.198324, 0.068222],[-0.217112, 0.205012, 0.077831],[-0.222098, 0.068222, 0.198324],[-0.217112, 0.077831, 0.205012],[-0.091996, -0.023774, 0.290320],[-0.089931, -0.012100, 0.294942],[0.091996, -0.023774, 0.290320],[0.089931, -0.012100, 0.294942],[0.222098, 0.068222, 0.198324],[0.217112, 0.077831, 0.205012],[0.222098, 0.198324, 0.068222],[0.217112, 0.205012, 0.077831],[0.091996, 0.290320, -0.023774],[0.089931, 0.294942, -0.012100],[-0.000000, 0.169705, 0.169705],[-0.047197, 0.250275, 0.089136],[0.047197, 0.250276, 0.089135],[0.113944, 0.203079, 0.136332],[0.113943, 0.136332, 0.203078],[0.047197, 0.089136, 0.250275],[-0.047197, 0.089135, 0.250276],[-0.113944, 0.136332, 0.203079],[-0.113943, 0.203078, 0.136332],[-0.047835, 0.117016, -0.046305],[-0.115485, 0.069180, 0.001531],[-0.115485, 0.001531, 0.069180],[-0.047835, -0.046305, 0.117016],[0.047835, -0.046305, 0.117016],[0.115485, 0.001531, 0.069180],[0.115485, 0.069180, 0.001531],[0.047835, 0.117016, -0.046305],[-0.047835, 0.081660, -0.081660],[0.047835, 0.081660, -0.081660],[-0.115485, 0.033825, -0.033825],[-0.115485, -0.033825, 0.033825],[-0.047835, -0.081660, 0.081660],[0.047835, -0.081660, 0.081660],[0.115485, -0.033824, 0.033825],[0.115485, 0.033825, -0.033825],[0.074960, 0.256552, 0.000622],[-0.074960, 0.256552, 0.000622],[0.180970, 0.181592, 0.075582],[0.180970, 0.075582, 0.181592],[0.074960, 0.000622, 0.256552],[-0.074960, 0.000622, 0.256552],[-0.180970, 0.075582, 0.181592],[-0.180970, 0.181592, 0.075582],[0.078787, 0.275919, 0.006924],[-0.078787, 0.275919, 0.006924],[0.190209, 0.197132, 0.085711],[0.190209, 0.085711, 0.197132],[0.078787, 0.006924, 0.275919],[-0.078787, 0.006924, 0.275919],[-0.190209, 0.085711, 0.197132],[-0.190209, 0.197132, 0.085711],[-0.071883, 0.268336, 0.022913],[0.071883, 0.268336, 0.022913],[0.173540, 0.196453, 0.094796],[0.173540, 0.094796, 0.196453],[0.071883, 0.022913, 0.268336],[-0.071883, 0.022913, 0.268336],[-0.173540, 0.094796, 0.196453],[-0.173540, 0.196453, 0.094796] ];
var so_polygons = [ [1,0,3,2],[5,4,2,3],[7,6,4,5],[9,8,6,7],[11,10,8,9],[13,12,10,11],[15,14,12,13],[0,1,14,15],[16,17,18],[16,18,19],[16,19,20],[16,20,21],[16,21,22],[16,22,23],[16,23,24],[16,24,17],[25,1,2,26],[26,2,4,27],[27,4,6,28],[28,6,8,29],[29,8,10,30],[30,10,12,31],[31,12,14,32],[32,14,1,25],[33,34,32,25],[33,35,36,37,38,39,40,34],[35,33,25,26],[36,35,26,27],[37,36,27,28],[38,37,28,29],[39,38,29,30],[40,39,30,31],[34,40,31,32],[0,15,49,50],[15,13,51,49],[13,11,52,51],[11,9,53,52],[9,7,54,53],[7,5,55,54],[5,3,56,55],[3,0,50,56],[57,58,18,17],[58,59,19,18],[59,60,20,19],[60,61,21,20],[61,62,22,21],[62,63,23,22],[63,64,24,23],[64,57,17,24],[49,41,42,50],[51,43,41,49],[52,44,43,51],[53,45,44,52],[54,46,45,53],[55,47,46,54],[56,48,47,55],[50,42,48,56],[57,42,41,58],[58,41,43,59],[59,43,44,60],[60,44,45,61],[61,45,46,62],[62,46,47,63],[63,47,48,64],[64,48,42,57]];
