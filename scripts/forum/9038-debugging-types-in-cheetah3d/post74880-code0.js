// Source: https://www.cheetah3d.com/forum/index.php?threads/9038/post-74880
// Author: Reshka (Cheetah3D forum), posted 2012-11-23
// Thread: "Debugging Types in Cheetah3D"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
var globalObject = (function(){return this;})();
var ConstMap =
{ 
    FAMILY : {},
    OBJECT : {},
    TAG : {},
    ROT : {},
    PARAMETER : {},
    MODE : {},
    TRANSFORM : {},
    INTERPOL : {},
    ENDIAN : {},
    FILE : {},
    IO : {},
    MISC : {}
}

function addToConstMap(group, param)
{
    if(ConstMap[group] != undefined)
    {
        if(!ConstMap[group][globalObject[param]])
        {
            ConstMap[group][globalObject[param]] = param;
        }
        else
        {
            print("Collision: ["+param+":"+globalObject[param]+"] to with ["+group+":"+ConstMap[group][globalObject[param]]+"]");
        }
    }
    else
    {
        print("Unknown group type");
    }
}

function buildConstMap()
{
    for(param in globalObject)
    {
        if(typeof globalObject[param] == "number")
        {
            if(param.indexOf("FAMILY") !== -1) { addToConstMap("FAMILY", param); }
            else if(param.indexOf("ROT_") !== -1) { addToConstMap("ROT", param); }
            else if(param.indexOf("TAG") !== -1) { addToConstMap("TAG", param); }
            else if(param.indexOf("_PARAMETER") !== -1) { addToConstMap("PARAMETER", param); }
            else if(param.indexOf("_INTERPOL") !== -1) { addToConstMap("INTERPOL", param); }
            else if(param.indexOf("_ENDIAN") !== -1) { addToConstMap("ENDIAN", param); }
            else if(param === "IDENDITY" || param === "TRANSLATE" || param === "SCALE" || param === "ROTATE" || param == "ROTATE_HPB")
            { addToConstMap("TRANSFORM", param);}
            else if(param === "READ_MODE" || param === "WRITE_MODE"){ addToConstMap("FILE", param);}
            else if(param === "SEEK_SET" || param === "SEEK_CUR" || param === "SEEK_END"){ addToConstMap("IO", param);}
            else if(param.indexOf("_MODE") !== -1) { addToConstMap("MODE", param); }
            else if(param === "SELECT" || param === "UVPOINT" || param === "NORMALBREAKBIT" || param === "SEAM" || param === "CREASE")
            { addToConstMap("MISC", param);}
            else{ addToConstMap("OBJECT", param); }
        }
    }
}

function getNameForType(type, group)
{
    var results = "";
    if(undefined === group)
    {
        // Well just give all the results
        results += "[";
        for(param in ConstMap)
        {
            var typeName = ConstMap[param][type];
            if(undefined !== typeName)
            {
                results += "{"+param+":"+typeName+"}";
            }
        }
        results += "]";
    }
    else
    {
        var typeName = ConstMap[group][type];
        if(undefined === typeName)
        {
            results += "[undefined]";
        }
        else
        {
            results += "["+group+":"+typeName+"]";
        }
    }
    return results;
}