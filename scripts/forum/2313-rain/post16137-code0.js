// Source: https://www.cheetah3d.com/forum/index.php?threads/2313/post-16137
// Author: sig33kde (Cheetah3D forum), posted 2007-10-29
// Thread: "Rain"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function main(doc){


// you can increase the loop's max iterative value to add more rain, 
// but I lowered it to 10 so it doesn't take along time to  run if you 
// want to test it.
// 500 rain drops takes about 25 seconds to generate on my intel imac. :) 

for(var i=0;i<10;i++){ 

randomnumber=Math.floor(Math.random()*91);
randomx=Math.floor(Math.random()*1001) / 100;
randomz=Math.floor(Math.random()*1001) / 100;

var obj=doc.addObject(BALL);
obj.setParameter("position",new Vec3D(randomx, 20, randomz));
obj.setParameter("scale",new Vec3D(.1, .1, .1));

var pos0=new Vec3D(randomx, 20, randomz);
var time0 = randomnumber/30;
var trans1= new Vec3D(.1, .1, .1); 

var pos1=new Vec3D(randomx, .18, randomz);
var time1 = time0 + (28/30);

var pos2=new Vec3D(randomx, .04, randomz);
var time2 = time0 + (29/30);

var pos3=new Vec3D(randomx, .002, randomz);
var time3 = time0 + 1;
var trans3 = new Vec3D(.1, .001, .1); 

var time4 = time3 + (1/30);
var time5 = time4 + (1/30);

doc.setAnimPosition(time0);
obj.setParameter("position",pos0);
obj.setParameter("scale",trans1);

doc.setAnimPosition(time1);
obj.setParameter("position",pos1);
obj.setParameter("scale",trans1);

doc.setAnimPosition(time2);
obj.setParameter("position",pos2);
obj.setParameter("scale",trans1);

doc.setAnimPosition(time3);
obj.setParameter("position",pos3);
obj.setParameter("scale",trans3);

// SEE IF THIS HELPS.... 

doc.setAnimPosition(time4);
obj.setParameter("position",pos3);
obj.setParameter("scale",trans3);

doc.setAnimPosition(time5);
obj.setParameter("position",pos3);
obj.setParameter("scale",trans3);

}

}