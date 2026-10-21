// Source: https://www.cheetah3d.com/forum/index.php?threads/1053/post-6658
// Author: ToddWR (Cheetah3D forum), posted 2006-11-19
// Thread: "structures in JS or the new angelscript?"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
 var SS_a = 1;
 var SS_b = 2;
 var SS_c = 3;
 var SS_d = 4;
// this is sort of an enum, I use the struct name as a prefix
// to avoid name clashing
 var a_struct = new Array();
 a_struct[0] = "SomeStruct"; // just doing this internally
 a_struct[SS_a] = 15;
 a_struct[SS_b] = 3.141259
 a_struct[SS_c] = new Vec3D(1,2,3);
 a_struct[SS_d] = new Mat4D();

 AFunction(a_struct);  // use the structure
...
function AFunction(s) {
    // instead of s.a, use
    print(s[SS_a]);
}