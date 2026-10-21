// Source: https://www.cheetah3d.com/forum/index.php?threads/3350/post-23917
// Author: giulioandrea (Cheetah3D forum), posted 2008-08-04
// Thread: "exchange data"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//check that a file is there.
function main(){
var path = "/Users/Pillo/Desktop/finito.txt";
var file = new File(path);
var A = false;
A = file.exist();
while (!A ) {
A = file.exist();
}
}