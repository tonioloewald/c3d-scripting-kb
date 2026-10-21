# Math extension

- Thread: https://www.cheetah3d.com/forum/index.php?threads/11093/
- Subforum: script-downloads
- Started by **aaronparr** on 2015-03-15; last post 2015-03-16; 3 posts

## #1 — aaronparr — 2015-03-15
<https://www.cheetah3d.com/forum/index.php?threads/11093/post-94070>

Math extension

I am working on a math extension that is appropriate for things you may have to do when working on 3d files. So far it is minimal as you can see in this post. I am also keeping a version on pastebin. If I ever grow up and use GIT, I'll provide a link to that. But until then you've got this paste at least:

	
	


```js
//////////////////////////
// math_extension.js
/////////////////////////
/*

	2015 march 15
	v 0.1
	-- extending Math for use in 3d app
	
	converts radians to degrees and vice versa
	converts eulers to axis-angle and vice versa

*/
/////////////////////////

// EXTENDED MATH FUNCTIONS
// Converts from degrees to radians.
Math.radians = function(degrees)
{
	return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians)
{
	return radians * 180 / Math.PI;
};

// Converts from Axis Angle in radians to Euler in degrees
Math.AxisAngleToEuler = function(x, y, z, angle)
{
	var heading,attitude,bank;
	var s=Math.sin(angle);
	var c=Math.cos(angle);
	var t=1-c;
	//  if axis is not already normalised then uncomment this
	// double magnitude = Math.sqrt(x*x + y*y + z*z);
	// if (magnitude==0) throw error;
	// x /= magnitude;
	// y /= magnitude;
	// z /= magnitude;
	if ((x*y*t + z*s) > 0.998)
	{ // north pole singularity detected
		heading		= 2*atan2(x*Math.sin(angle/2),Math.cos(angle/2));
		attitude	= Math.PI/2;
		bank			= 0;
	}
	else if ((x*y*t + z*s) < -0.998)
	{ // south pole singularity detected
		heading		= -2*atan2(x*Math.sin(angle/2),Math.cos(angle/2));
		attitude	= -Math.PI/2;
		bank			= 0;
	}
	else
	{
		heading		= Math.atan2(y * s- x * z * t , 1 - (y*y+ z*z ) * t);
		attitude	= Math.asin(x * y * t + z * s) ;
		bank			= Math.atan2(x * s - y * z * t , 1 - (x*x + z*z) * t);
	}
	
	return {'x':Math.degrees(bank),'y':Math.degrees(heading),'z':Math.degrees(attitude)};
};

// Converts from Euler in degrees to Axis Angle in radians
Math.EulerToAxisAngle = function(bankDegrees, headingDegrees, attitudeDegrees)
{
	var Xradians	= Math.radians(bankDegrees); // bank
	var Yradians	= Math.radians(headingDegrees); // heading
	var Zradians	= Math.radians(attitudeDegrees); // attitude

	// Convert Euler to Axis-Angle
	// NWN appears to use an axis angle
	// downloaded from http://www.euclideanspace.com/maths/geometry/rotations/conversions/eulerToAngle/
	var c1 = Math.cos(Yradians/2); // heading
	var s1 = Math.sin(Yradians/2);
	var c2 = Math.cos(Zradians/2);// altitude
	var s2 = Math.sin(Zradians/2);
	var c3 = Math.cos(Xradians/2); // bank
	var s3 = Math.sin(Xradians/2);
	var c1c2 = c1*c2;
	var s1s2 = s1*s2;
	var w =c1c2*c3 - s1s2*s3;
	var x =c1c2*s3 + s1s2*c3;
	var y =s1*c2*c3 + c1*s2*s3;
	var z =c1*s2*c3 - s1*c2*s3;
			w = 2 * Math.acos(w);
	var norm = x*x+y*y+z*z;
	if( norm==0 || norm <= 0.0001)
	{ // when all euler angles are zero angle = 0 so
		// we can set axis to anything to avoid divide by zero
		x="1.0";
		y=z="0.0";
	}
	else
	{
		norm = Math.sqrt(norm);
		x = (x/norm);
		y = (y/norm);
		z = (z/norm);
	}
	
	return {'x':x,'y':y,'z':z,'w':w};
};
```


____
Even though we don't have require we do have the use of eval, and thus a file like this can function as an include. Here's a link to how I am doing this. Others were the smarties and came up with this sneaky work around. I'm just sharing with you.

Links: http://pastebin.com/BZaEmuqw, http://www.cheetah3d.com/forum/showthread.php?p=94069#post94069

## #2 — KurtF — 2015-03-16
<https://www.cheetah3d.com/forum/index.php?threads/11093/post-94071>

Very clever and useful. Thanks.

## #3 — aaronparr — 2015-03-16
<https://www.cheetah3d.com/forum/index.php?threads/11093/post-94088>

I can't take credit for the cleverness. I adapted that stuff from elsewhere since I couldn't do the math myself.
