// Source: https://www.cheetah3d.com/forum/index.php?threads/4334/post-30298
// Author: ToddWR (Cheetah3D forum), posted 2009-06-23
// Thread: "experimental - particles"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Todd Rogers
// Usage: Place this into scripts/Polygonobj folder. restart Cheetah3D, then select from Tools -> Scritp -> Polygon Script
//
//


//---------- the following was converted to javacript from here
//				http://www.cs.princeton.edu/~traer/physics/
//           this guy did all the hard work and this is his credit
//			 please keep this notice here but use it for your own scripts
//
//			several lines will be replaced to make it faster when working with cheetah
//
//---------- Replacement functions for Vector3D class
Vec3D.prototype.dot = function( p) {
	return this.x * p.x + this.y * p.y + this.z * p.z;
}
Vec3D.prototype.isZero = function( ) {
	return this.x == 0 && this.y == 0 &&  this.z == 0;
}
Vec3D.prototype.length = function() {
	return  Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}
Vec3D.prototype.lengthSquared = function() {
	return  this.x * this.x + this.y * this.y + this.z * this.z;
}
Vec3D.prototype.unit = function() {
	var l = this.norm();
	return (l == 0.0) ? new Vec3D() : this.mult(1/l);
}
Vec3D.prototype.toString = function() {
	return "(" + this.x.toFixed(4) + ", " + this.y.toFixed(4) + ", " + this.z.toFixed(4) + ")";
}
Vec3D.prototype.cross = function( p) {
	return new Vec3D(this.y * p.z - this.z * p.y, this.x * p.z - this.z * p.x,this.x * p.y - this.y * p.x);
}
Vec3D.prototype.addq = function() {
	if( arguments.length == 1) {
		this.x += arguments[0].x
		this.y += arguments[0].y
		this.z += arguments[0].z
	} else if( arguments.length == 3) {
		this.x += arguments[0];
		this.y += arguments[1];
		this.z += arguments[2];
	}
}
Vec3D.prototype.clear = function() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
}
Vec3D.prototype.distanceTo = function( ) {
	var dx = 0,dy = 0,dz=0;
	if( arguments.length == 1) {
		dx = this.x - arguments[0].x;
		dy = this.y - arguments[0].y;
		dz = this.z - arguments[0].z;
	} else if( arguments.length == 3) {
		dx = this.x - arguments[0];
		dy = this.y - arguments[1];
		dz = this.z - arguments[2];
	}
	return  Math.sqrt( (dx * dx + dy * dy + dz * dz));
}

Vec3D.prototype.distanceSquaredTo = function( ) {
	var dx = 0,dy = 0,dz=0;
	if( arguments.length == 1) {
		dx = this.x - arguments[0].x;
		dy = this.y - arguments[0].y;
		dz = this.z - arguments[0].z;
	} else if( arguments.length == 3) {
		dx = this.x - arguments[0];
		dy = this.y - arguments[1];
		dz = this.z - arguments[2];
	}
	return  (dx * dx + dy * dy + dz * dz);
}

Array.prototype.remove = function(item) {
	var t = typeof(item);
	if( t == "number") {
		return this.splice(item,1);
	}
	for(var i = 0;i<this.length;i++)
		if( this[i] == item) {
			this.splice(i,1);
			return true;
		}
	return false;
}

//---------------------------------------------------------
function Particle(m,p) {
    this.position = p;	// Vec3D
    this.positionOld = p;	// used for verlet integration
	this.velocity = new Vec3D();
    this.force = new Vec3D();
    this.mass = m;
    this.age = 0;
    this.dead = false;
    this.fixed = false;
}
// several accessor functions were removed from this class
// the reason being it is just faster to access the 
// (mass,position,force,age) directly instead of calling
// a function to retrieve it.
// the remaining functions will be overloaded to provide
// additional functionality

// change to allow either a Vec3D point or 3 values 
//Particle.prototype.moveTo = function( x,  y,  z) {
//	this.position.x = x;
//	this.position.y = y;
//	this.position.z = z;
//}
//    
//Particle.prototype.moveBy = function( x,  y,  z) {
//	this.position.x += x;
//	this.position.y += y;
//	this.position.z += z;
//}
//    
//Particle.prototype.addVelocity = function( x,  y,  z) {
//	this.velocity.x += x;
//	this.velocity.y += y;
//	this.velocity.z += z;
//}
//    
//Particle.prototype.setForce = function( x,  y,  z) {
//	this.force.x = x;
//	this.force.y = y;
//	this.force.z = z;
//}
    
Particle.prototype.distanceTo = function(p) {
	return this.position.distanceTo(p.position);
}
    
Particle.prototype.makeFixed = function() {
	this.fixed = true;
	this.velocity.clear();
}
    
Particle.prototype.isFixed = function() {
	return this.fixed;
}
    
Particle.prototype.isFree = function(){
	return !this.fixed;
}
    
Particle.prototype.makeFree = function() {
	this.fixed = false;
}
    
Particle.prototype.reset = function() {
	this.age = 0;
	this.dead = false;
	this.position.clear();
	this.velocity.clear();
	this.force.clear();
	this.mass = 1;
}
    
//Particle.prototype.setVelocity = function( x,  y,  z) {
//	this.velocity.x = x;
//	this.velocity.y = z;
//	this.velocity.z = z;
//}
//    
//Particle.prototype.kill = function() {
//	this.dead = true;
//}
//    
//Particle.prototype.isDead = function() {
//	return this.dead;
//}
//---------------------------------------------------------
function Spring ( A,  B,  ks,  d,  r) {
    this.springConstant = ks;
    this.damping = d;
    this.restLength = r;
    this.a = A;
    this.b = B;
    this.on = true;
}
    
Spring.prototype.turnOff = function() {
	this.on = false;
}
    
Spring.prototype.turnOn = function() {
	this.on = true;
}
    
Spring.prototype.isOn = function() {
	return this.on;
}
    
Spring.prototype.isOff = function() {
	return !this.on;
}
    
Spring.prototype.getOneEnd = function() {
	return this.a;
}
    
Spring.prototype.getTheOtherEnd = function() {
	return this.b;
}
    
Spring.prototype.currentLength = function() {
	return this.a.position.distanceTo(this.b.position);
}
    
Spring.prototype.restLength = function() {
	return this.restLength;
}
    
Spring.prototype.strength = function() {
	return this.springConstant;
}
    
Spring.prototype.setStrength = function( ks) {
	this.springConstant = ks;
}
    
Spring.prototype.damping = function() {
	return this.damping;
}
    
Spring.prototype.setDamping = function( d) {
	this.damping = d;
}
    
Spring.prototype.setRestLength = function( l) {
	this.restLength = l;
}
    
Spring.prototype.apply = function() {
	if (this.on && (this.a.isFree() || this.b.isFree() )) {
//		var a2b = this.a.position.sub(this.b.position);
	    var a2bX = this.a.position.x - this.b.position.x;
	    var a2bY = this.a.position.y - this.b.position.y;
	    var a2bZ = this.a.position.z - this.b.position.z;
	    var a2bDistance = Math.sqrt(a2bX * a2bX + a2bY * a2bY + a2bZ * a2bZ);
	    if (a2bDistance == 0.0) {
			a2bX = 0.0;
			a2bY = 0.0;
			a2bZ = 0.0;
	    } else {
			a2bX /= a2bDistance;
			a2bY /= a2bDistance;
			a2bZ /= a2bDistance;
	    }
	    var springForce = -(a2bDistance - this.restLength) * this.springConstant;
	    var Va2bX = this.a.velocity.x - this.b.velocity.x;
	    var Va2bY = this.a.velocity.y - this.b.velocity.y;
	    var Va2bZ = this.a.velocity.z - this.b.velocity.z;
	    var dampingForce = -this.damping * (a2bX * Va2bX + a2bY * Va2bY + a2bZ * Va2bZ);
	    var r = springForce + dampingForce;
	    a2bX *= r;
	    a2bY *= r;
	    a2bZ *= r;
	    if (this.a.isFree())
			this.a.force.addq(a2bX, a2bY, a2bZ);
	    if (this.b.isFree())
			this.b.force.addq(-a2bX, -a2bY, -a2bZ);
	}
}
    
Spring.prototype.setA = function(p) {
	this.a = p;
}
Spring.prototype.setB = function(p) {
	this.b = p;
}
//Spring.prototype.hasDead = function() {
//	if (!this.a.isDead() && !this.b.isDead())
//	    return false;
//	return true;
//}
//---------------------------------------------------------
function Attraction(_a,_b,_k,_distanceMin) {
	this.a = _a; // these are particles
	this.b = _b;
	this.k = _k;
	this.on = true;
	this.distanceMin = _distanceMin;
	this.distanceMinSquared = _distanceMin * _distanceMin;
}
    
Attraction.prototype.setA = function(p) {
	this.a = p;
}
Attraction.prototype.setB = function(p) {
	this.b = p;
}
Attraction.prototype.getMinimumDistance = function() {
	return this.distanceMin;
}
    
Attraction.prototype.setMinimumDistance = function( d) {
	this.distanceMin = d;
	this.distanceMinSquared = d * d;
}
    
Attraction.prototype.turnOff = function() {
	this.on = false;
}
    
Attraction.prototype.turnOn = function() {
	this.on = true;
}
    
Attraction.prototype.setStrength = function( k) {
	this.k = k;
}
    
Attraction.prototype.getOneEnd = function() {
	return a;
}
    
Attraction.prototype.getTheOtherEnd = function() {
	return b;
}
    
Attraction.prototype.apply = function() {
	if (this.on && (this.a.isFree() || this.b.isFree() ) ) {
	    var a2bX = this.a.position.x - this.b.position.x;
	    var a2bY = this.a.position.y - this.b.position.y;
	    var a2bZ = this.a.position.z - this.b.position.z;
	    var a2bDistanceSquared = a2bX * a2bX + a2bY * a2bY + a2bZ * a2bZ;
		if( a2bDistanceSquared < distanceMinSquared )
			a2bDistanceSquared = distanceMinSquared;

		var force = this.k * this.a.mass * this.b.mass / a2bDistanceSquared;
		var length = Math.sqrt(a2bDistanceSquared);
		
		a2bX /= length;
		a2bY /= length;
		a2bZ /= length;
		
		a2bX *= force;
		a2bY *= force;
		a2bZ *= force;
		if( this.a.isFree())
			this.a.force.addq(-a2bX, -a2bY, -a2bZ);
		if( this.b.isFree())
			this.b.force.addq(a2bX, a2bY, a2bZ);
    
	}
}
    
Attraction.prototype.getStrength = function() {
	return this.k;
}
    
Attraction.prototype.isOn = function() {
	return this.on;
}
    
Attraction.prototype.isOff = function() {
	return !this.on;
}
    
Attraction.prototype.hasDead = function() {
	if (!this.a.isDead() && !this.b.isDead())
	    return false;
	return true;
}
//---------------------------------------------------------
function RungeKuttaIntegrator(s){
    this.originalPositions = [];
    this.originalVelocities = [];
    this.k1Forces = [];
    this.k1Velocities = [];
    this.k2Forces = [];
    this.k2Velocities = [];
    this.k3Forces = [];
    this.k3Velocities = [];
    this.k4Forces = [];
    this.k4Velocities = [];
    this.s = s;
}
//
// even though this has been converted to javascript, it is not needed
// the way javascript handles arrays makes this routine waste time
RungeKuttaIntegrator.prototype.allocateParticles = function() {
//	while (s.particles.length > originalPositions.length) {
//	    originalPositions.push(new Vec3D());
//	    originalVelocities.push(new Vec3D());
//	    k1Forces.push(new Vec3D());
//	    k1Velocities.push(new Vec3D());
//	    k2Forces.push(new Vec3D());
//	    k2Velocities.push(new Vec3D());
//	    k3Forces.push(new Vec3D());
//	    k3Velocities.push(new Vec3D());
//	    k4Forces.push(new Vec3D());
//	    k4Velocities.push(new Vec3D());
//	}
}
    
RungeKuttaIntegrator.prototype.step = function( deltaT) {
	var i;
	// a possible way to speed up the copying of Arrays
	// var new = (""+old).split(",");
	// 
	for ( i = 0; i < this.s.particles.length; i++) {
	    var p = this.s.particles[i];
	    if (p.isFree()) {
			this.originalPositions[i] = p.position;
			this.originalVelocities[i] = p.velocity;
	    }
	    p.force.clear();
	}
	this.s.applyForces();
	for ( i = 0; i < this.s.particles.length; i++) {
	    p = this.s.particles[i];
	    if (p.isFree()) {
			this.k1Forces[i] = p.force;
			this.k1Velocities[i] = p.velocity;
	    }
	    p.force.clear();
	}
	for ( i = 0; i < this.s.particles.length; i++) {
	    p = this.s.particles[i];
	    if (p.isFree()) {
			var originalPosition = this.originalPositions[i];
			var k1Velocity = this.k1Velocities[i];
//			p.position = originalPosition.add(k1Velocity.multiply(0.5 * deltaT));
			p.position.x = originalPosition.x + k1Velocity.x * 0.5 * deltaT;
			p.position.y = originalPosition.y + k1Velocity.y * 0.5 * deltaT;
			p.position.z = originalPosition.z + k1Velocity.z * 0.5 * deltaT;
			var originalVelocity = this.originalVelocities[i];
			var k1Force = this.k1Forces[i];
//			p.velocity = originalVelocity.add(k1Force.multiply(0.5 * deltaT / p.mass));
			p.velocity.x = originalVelocity.x + k1Force.x * 0.5 * deltaT / p.mass;
			p.velocity.y = originalVelocity.y + k1Force.y * 0.5 * deltaT / p.mass;
			p.velocity.z = originalVelocity.z + k1Force.z * 0.5 * deltaT / p.mass;
	    }
	}
	this.s.applyForces();
	for ( i = 0; i < this.s.particles.length; i++) {
	    p = this.s.particles[i];
	    if (p.isFree()) {
			this.k2Forces[i] = p.force;
			this.k2Velocities[i] = p.velocity;
	    }
	    p.force.clear();
	}
	for ( i = 0; i < this.s.particles.length; i++) {
	    p = this.s.particles[i];
	    if (p.isFree()) {
			originalPosition = this.originalPositions[i];
			var k2Velocity = this.k2Velocities[i];
//			p.position = originalPosition.add(k2Velocity.multiply(0.5 * deltaT));
			p.position.x = originalPosition.x + k2Velocity.x * 0.5 * deltaT;
			p.position.y = originalPosition.y + k2Velocity.y * 0.5 * deltaT;
			p.position.z = originalPosition.z + k2Velocity.z * 0.5 * deltaT;
			originalVelocity = this.originalVelocities[i];
			var k2Force = this.k2Forces[i];
//			p.velocity = originalVelocity.add(k2Force.multiply(0.5 * deltaT / p.mass));
			p.velocity.x = originalVelocity.x + k2Force.x * 0.5 * deltaT / p.mass;
			p.velocity.y = originalVelocity.y + k2Force.y * 0.5 * deltaT / p.mass;
			p.velocity.z = originalVelocity.z + k2Force.z * 0.5 * deltaT / p.mass;
	    }
	}
	this.s.applyForces();
	for ( i = 0; i < this.s.particles.length; i++) {
	    p = this.s.particles[i];
	    if (p.isFree()) {
			this.k3Forces[i] = p.force;
			this.k3Velocities[i] = p.velocity;
	    }
	    p.force.clear();
	}
	for ( i = 0; i < this.s.particles.length; i++) {
	    p = this.s.particles[i];
	    if (p.isFree()) {
			originalPosition = this.originalPositions[i];
			var k3Velocity = this.k3Velocities[i];
//			p.position = originalPosition.add(k3Velocity.multiply(deltaT));
			p.position.x = originalPosition.x + k3Velocity.x * deltaT;
			p.position.y = originalPosition.y + k3Velocity.y * deltaT;
			p.position.z = originalPosition.z + k3Velocity.z * deltaT;
			originalVelocity = this.originalVelocities[i];
			var k3Force = this.k3Forces[i];
//			p.velocity = originalVelocity.add(k3Force.multiply(deltaT / p.mass));
			p.velocity.x = originalVelocity.x + k3Force.x * deltaT / p.mass;
			p.velocity.y = originalVelocity.y + k3Force.y * deltaT / p.mass;
			p.velocity.z = originalVelocity.z + k3Force.z * deltaT / p.mass;
	    }
	}
	this.s.applyForces();
	for ( i = 0; i < this.s.particles.length; i++) {
	    p = this.s.particles[i];
	    if (p.isFree()) {
			this.k4Forces[i] = p.force;
			this.k4Velocities[i] = p.velocity;
	    }
	}
	for ( i = 0; i < this.s.particles.length; i++) {
	    p = this.s.particles[i];
	    p.age += deltaT;
	    if (p.isFree()) {
			originalPosition = this.originalPositions[i];
			k1Velocity = this.k1Velocities[i];
			k2Velocity = this.k2Velocities[i];
			k3Velocity = this.k3Velocities[i];
			k4Velocity = this.k4Velocities[i];
//			p.position = originalPosition.add(k1Velocity.add( k2Velocity.multiply(2)).add(k3Velocity.multiply(2)).add(k4Velocity).multiply(deltaT/6));
			p.position.x = (originalPosition.x + deltaT / 6.0 * (k1Velocity.x + 2.0 * k2Velocity.x + 2.0 * k3Velocity.x + k4Velocity.x));
			p.position.y = (originalPosition.y + deltaT / 6.0 * (k1Velocity.y + 2.0 * k2Velocity.y + 2.0 * k3Velocity.y + k4Velocity.y));
			p.position.z = (originalPosition.z + deltaT / 6.0 * (k1Velocity.z + 2.0 * k2Velocity.z + 2.0 * k3Velocity.z + k4Velocity.z));
			originalVelocity = this.originalVelocities[i];
			k1Force = this.k1Forces[i];
			k2Force = this.k2Forces[i];
			k3Force = this.k3Forces[i];
			k4Force = this.k4Forces[i];
//			p.velocity = originalVelocity.add(k1Force.add( k2Force.multiply(2)).add(k3Force.multiply(2)).add(k4Force).multiply(deltaT/(6*p.mass)));
			p.velocity.x = originalVelocity.x + (deltaT / (6.0 * p.mass) * (k1Force.x + 2.0 * k2Force.x + 2.0 * k3Force.x + k4Force.x));
			p.velocity.y = originalVelocity.y + (deltaT / (6.0 * p.mass) * (k1Force.y + 2.0 * k2Force.y + 2.0 * k3Force.y + k4Force.y));
			p.velocity.z = originalVelocity.z + (deltaT / (6.0 * p.mass) * (k1Force.z + 2.0 * k2Force.z + 2.0 * k3Force.z + k4Force.z));
	    }
	}
}

//---------------------------------------------------------
function EulerIntegrator(s) {
	this.s = s;
}
		
EulerIntegrator.prototype.step = function(  t )
{
	this.s.clearForces();
	this.s.applyForces();
	
	for ( var i = 0; i < this.s.numberOfParticles(); i++ )
	{
		var p = s.getParticle( i );
		if ( p.isFree() )
		{
			p.velocity.addq( p.force.x/(p.mass*t), p.force.y/(p.mass*t), p.force.z/(p.mass*t) );
			p.position.addq( p.velocity.x/t, p.velocity.y/t, p.velocity.z/t );
		}
	}
}
//---------------------------------------------------------
function ModifiedEulerIntegrator(s) {
	this.s = s;
}
		
ModifiedEulerIntegrator.prototype.step = function(  t )
{
	this.s.clearForces();
	this.s.applyForces();
	
	var halftt = .5 * t * t;
	
	for ( var i = 0; i < this.s.numberOfParticles(); i++ )
	{
		var p = s.getParticle( i );
		if ( p.isFree() )
		{
			var ax = p.force.x/p.mass;
			var ay = p.force.y/p.mass;
			var az = p.force.z/p.mass;
			
			p.position.addq( p.velocity.x/t, p.velocity.y/t, p.velocity.z/t );
			p.position.addq( ax*halftt, ay*halftt, az*halftt );
			p.velocity.addq( ax/t, ay/t, az/t );
		}
	}
}
//---------------------------------------------------------
function VerletIntegrator(s) {
	this.s = s;
}
		
VerletIntegrator.prototype.step = function(  t )
{
	this.s.clearForces();
	this.s.applyForces();
		
	for ( var i = 0; i < this.s.numberOfParticles(); i++ )
	{
		var p = this.s.getParticle( i );
		if ( p.isFree() )
		{
            var x = p.position;
            var temp = x;
            var oldx = p.positionOld;
            var a = p.force;
            x = x.multiply(1.99);
            oldx = oldx.multiply(.99);
            a = a.multiply(t*t);
            x = x.sub(oldx).add(a);
            p.positionOld = temp;
            p.position = x;
		}
	}
	for( var j=0;j<3;j++)
	for( i = 0; i < this.s.numberOfSprings(); i++) {
		var spring = this.s.getSpring(i);
		var a = spring.getOneEnd();
		var b = spring.getTheOtherEnd();
		var delta = b.position.sub(a.position);
		var deltaLength = Math.sqrt( delta.dot(delta));
		var diff = (deltaLength - spring.restLength)/deltaLength;
		delta = delta.multiply( .5 * diff);
		if( a.isFree() )
			a.position = a.position.add(delta);
		if( b.isFree() )
			b.position = b.position.sub(delta);
	}
}
//---------------------------------------------------------
const RUNGE_KUTTA = 0;
const EULER = 1;
const MODIFIED_EULER = 2;
const VERLET = 3;

const DEFAULT_GRAVITY = 0;
const DEFAULT_DRAG = 0.001;

function ParticleSystem() {
    this.particles = [];
    this.springs = [];
    this.attractions = [];
    this.customForces = [];
    this.integrator = new RungeKuttaIntegrator(this);
    this.gravity = new Vec3D(0,-DEFAULT_GRAVITY,0);
    this.drag = DEFAULT_DRAG;
	if(arguments.length == 2) {
		this.gravity = new Vec3D(0,arguments[0],0);
		this.drag = arguments[1];
	} else if(arguments.length == 4) {
		this.gravity = new Vec3D(arguments[0],arguments[1],arguments[2]);
		this.drag = arguments[3];
	}
}

ParticleSystem.prototype.setIntegrator = function(integrator) {
	switch(integrator){
	case RUNGE_KUTTA:
		this.integrator = new RungeKuttaIntegrator(this);
		break;
	case EULER:
		this.integrator = new EulerIntegrator(this);
		break;
	case MODIFIED_EULER:
		this.integrator = new ModifiedEulerIntegrator(this);
		break;
	case VERLET:
		this.integrator = new VerletIntegrator(this);
		break;
	}
}

ParticleSystem.prototype.setGravity = function() {
	if(arguments.length == 3) {
		this.gravity.x = arguments[0];
		this.gravity.y = arguments[1];
		this.gravity.z = arguments[2];
	}else if(arguments.length == 1) {
		this.gravity.x = 0;
		this.gravity.y = arguments[0];
		this.gravity.z = 0;
	}
}
    
ParticleSystem.prototype.setDrag = function( d) {
	this.drag = d;
}
    
ParticleSystem.prototype.advanceTime = function( time) {
	this.integrator.step(time);
}
    
ParticleSystem.prototype.tick = function() {
	if( arguments.length == 0)
		this.integrator.step(1.0);
	else if( arguments.length == 1)
		this.integrator.step(arguments[0]);
}
    
ParticleSystem.prototype.makeParticle = function() {
	var p = null;
	var m,x,y,z;
	if( arguments.length == 0) {
		m=1;	x=0;	y=0;	z=0;
	} else if( arguments.length == 4) {
		m = arguments[0];	x=arguments[1];	y=arguments[2];	z=arguments[3];
	}
	p = new Particle(m,new Vec3D(x,y,z));
	//print( "New Particle is at "+p.position.toString() +" with mass "+m);
	this.particles.push(p);
//	this.integrator.allocateParticles(); // this line NOT needed
	return p;
}
    
ParticleSystem.prototype.makeSpring = function( a,  b,  ks,  d,  r) {
	var s = new Spring(a, b, ks, d, r);
	//print( "New Spring between "+a.position.toString() +" and "+b.position.toString());
	this.springs.push(s);
	return s;
}
    
ParticleSystem.prototype.makeAttraction = function( a,  b,  k,  minDistance) {
	var m = new Attraction(a, b, k, minDistance);
	this.attractions.push(m);
	return m;
}
    
ParticleSystem.prototype.clear = function() {
	this.particles = [];
	this.springs = [];
	this.attractions = [];
}
    
    
ParticleSystem.prototype.applyForces = function() {
	var i;
	if( !this.gravity.isZero() )
		for ( i = 0; i < this.particles.length; i++) {
			p = this.particles[i];
		    p.force.addq(this.gravity);
		}
	for ( i = 0; i < this.particles.length; i++) {
		p = this.particles[i];
	    p.force.addq(p.velocity.x * -this.drag, p.velocity.y * -this.drag, p.velocity.z * -this.drag);
	}
	for ( i = 0; i < this.springs.length; i++) {
	    var f = this.springs[i];
	    f.apply();
	}
	for ( i = 0; i < this.attractions.length; i++) {
		f = this.attractions[i];
	    f.apply();
	}
	for ( i = 0; i < this.customForces.length; i++) {
		f = this.customForces[i];
	    f.apply();
	}
}
    
ParticleSystem.prototype.clearForces = function() {
	var i;
	for (i=0;i<this.particles.length; i++) {
		this.particles[i].force.clear();
	}
}
    
ParticleSystem.prototype.numberOfParticles = function() {
	return this.particles.length;
}
    
ParticleSystem.prototype.numberOfSprings = function() {
	return this.springs.length;
}
    
ParticleSystem.prototype.numberOfAttractions = function() {
	return this.attractions.length;
}
    
ParticleSystem.prototype.getParticle = function( i) {
	return this.particles[i];
}
    
ParticleSystem.prototype.getSpring = function( i) {
	return this.springs[i];
}
    
ParticleSystem.prototype.getAttraction = function( i) {
	return this.attractions[i];
}
    
ParticleSystem.prototype.addCustomForce = function( i) {
	this.customForces.push(i);
}
    
ParticleSystem.prototype.numberOfCustomForces = function() {
	return this.customForces.length;
}
    
ParticleSystem.prototype.getCustomForce = function(i) {
	return this.customForces[i];
}
    
ParticleSystem.prototype.removeCustomForce = function(i) {
	this.customForces.remove(i);
}
ParticleSystem.prototype.removeParticle = function(  p )
{
	return this.particles.remove( p );
}

ParticleSystem.prototype.removeSpring = function(  i )
{
	return this.springs.remove( i );
}

ParticleSystem.prototype.removeAttraction = function(  i  )
{
	return this.attractions.remove( i );
}

//---------------------------------------------------------END
function MyObjectParticle(o,index,mass) {
	var mat = o.obj2WorldMatrix();
	this.obj = o;
	this.index = index;
	this.orgPos = o.modCore().vertex(index);
	var pos = mat.multiply(this.orgPos);
	this.particle = ps.makeParticle(mass,pos.x,pos.y,pos.z);
	this.parent = true;
	
}

MyObjectParticle.prototype.hasParent = function( ) {
	return this.parent;
}

MyObjectParticle.prototype.reset = function( ) {
	this.obj.core().setVertex(this.index,this.orgPos);
	this.particle.velocity.clear();
	var mat = this.obj.obj2WorldMatrix();
	this.particle.position = mat.multiply(this.orgPos);
	this.particle.positionOld = this.particle.position;
}

MyObjectParticle.prototype.updateParticle = function( ) {
	// update the location of the particle to the global
	// position of the object
	var mat = this.obj.obj2WorldMatrix();
	var pos = mat.multiply(this.obj.modCore().vertex(this.index));
	//print("changing "+this.particle.position.toString()+" to "+pos.toString());
	this.particle.position.set(pos.x,pos.y,pos.z);
	
	//print( vec.toString());
}

MyObjectParticle.prototype.updateObject = function( p) {
	// update the location of the object to that of
	// the particle
	var mat = this.obj.obj2WorldMatrix().inverse();
	var p1 = this.particle.position;
	p1 = mat.multiply(p1);
	this.obj.core().setVertex(this.index,p1);
}

//----------------------------------------
function MyTagParticle(o,t,p) {
	var mat = o.obj2WorldMatrix();
	var pos0 = o.getParameter("position");
	var pos = mat.multiply(pos0);
	this.particle = psJ.makeParticle(t.getParameter("Mass"),pos.x,pos.y,pos.z);
	//print("new particle at " + pos0.toString() + "  global @" + pos.toString());
	this,tag = t;
	this.object = o;
	this.parent = p;
	this.orgPos = pos0;
}

MyTagParticle.prototype.hasParent = function( ) {
	return this.parent >= 0;
}

MyTagParticle.prototype.reset = function( ) {
	this.object.setParameter("position",this.orgPos);
	this.particle.velocity.clear();
	var mat = this.object.obj2WorldMatrix();
	this.particle.position = mat.multiply(this.orgPos);
}

MyTagParticle.prototype.updateParticle = function( ) {
	// update the location of the particle to the global
	// position of the object
	var mat = this.object.obj2WorldMatrix();
	var p0 = this.object.getParameter("position");
	var pos = mat.multiply(p0);
	this.particle.position.set(pos.x,pos.y,pos.z);
	//print("  parent at " + p0.toString() + "  global @" + pos.toString());
}

MyTagParticle.prototype.updateObject = function( p) {
	// update the location of the object to that of
	// the particle
	var p1 = this.particle.position;
	var mat = p.object.obj2WorldMatrix().inverse();
	var p0 = mat.multiply(p1);
	this.object.setParameter("position",p0);
	//print("  child at  " + p1.toString() + "  local @" + p0.toString());
}
//----------------------------------------
function myPoint(index) {
	this.parent = false;
	this.index = index;
	this.selected = false;
	this.particle = -1;
	this.neighbors = [];
}
myPoint.prototype.addNeighbor = function( n) {
	for(var i =0; i< this.neighbors.length; i++) {
		if(this.neighbors[i] == n)
			return;
	}
	this.neighbors[this.neighbors.length] = n;
}
myPoint.prototype.removeNeighbor = function( n) {
	for(var i =0; i< this.neighbors.length; i++) {
		if(this.neighbors[i] == n) {
			this.neighbors.splice(i,1);
			return;
		}
	}
}
//----------------------------------------

var ps;
var psJ;
var objects;
var points;
var parent = [];
var child = [];

//----------------------------------------
function twoPoints(a,b) {
	if(b < 0 || a < 0)
		return;
	points[a].addNeighbor(b);
	points[b].addNeighbor(a);
}

function scanMesh(obj) {
	var baseCore = obj.modCore();
	var vertexCount = baseCore.vertexCount();
	var basePolyCount = baseCore.polygonCount();
	var editMode = obj.document().editMode();
	points = [];
	var one;
	var two; 
	var selOne,selTwo;
	for(i = 0; i < vertexCount; i++) {
		points[i] = new myPoint(i);
	}
	for (i = 0;i < basePolyCount;i++) {
		var basePolySize = baseCore.polygonSize(i);
		var first = baseCore.vertexIndex(i,0);
		var selected = baseCore.polygonSelection(i);
		two = -1;
		for (j = 0;j < basePolySize;j++) { 
			one = baseCore.vertexIndex(i,j);
			switch(editMode) {
			case POLY_MODE:
			case OBJECT_MODE:
				if( selected) {
					points[one].selected = true;
				}
				break;
			case EDGE_MODE:
				if( baseCore.edgeSelection(i, j, SELECT)) {
					if( two >= 0) {
						points[one].selected = true;
						points[two].selected = true;
					}
				}
				break;
			case POINT_MODE:
				points[one].selected = baseCore.vertexSelection(one);
				break;
			}
			twoPoints(one,two);
			two = one;
		}
		twoPoints(first,two);
	}
}

function buildUI(obj){
    
    obj.setParameter("name","Particle Engine");
    
//    obj.addParameterInt("particle count",4,4,100,true,true);
//    obj.addParameterFloat("Particle life",1,.1,10,true,true);
//    obj.addParameterBool("gravity",true,false,true,true);
    obj.addParameterFloat("gravity amount",1,-10,10,true,true);
    obj.addParameterFloat("drag amount",.7,0,10,true,true);
//    obj.addParameterFloat("spring constant",.7,0,100,true,true);
    obj.addParameterInt("frame rate",30,1,120,true,true);
    
    obj.addParameterButton("scan for","tags","DoTagScan");
    //obj.addParameterButton("scan for","points","DoPointScan");    
    
    obj.addParameterFloat("time",0,0,10000,true,true);
    obj.addParameterBool("reset at time zero",1,0,1,true,true);
	//obj.setCreatorObj(true);
	ps = new ParticleSystem(-1,.7);
	psJ = new ParticleSystem(-1,.7);
	ps.setIntegrator(VERLET);
	objects = [];
	parent = [];
	child = [];
}

function resetObjects() {
	if(child.length>0){
		for(var i=0;i<child.length;i++)
			objects[child[i]].reset();
	}
}

function DoTagScan(obj) {
    var  doc=obj.document();
	var  root=doc.root();
	resetObjects();
	objects = [];
	ps.clear();
	psJ.clear();
	iterateTree(root,-1);
	parent = [];
	child = [];
	for(var i=0;i<objects.length;i++) {
		if(objects[i].hasParent()) {
			child[child.length] = i;
		} else {
			parent[parent.length] = i;
			//print(" parent at " + i);
			objects[i].particle.makeFixed();
		}
	}
	
}

function DoPointScan(obj) {
	DoTagScan(obj)
//    var  doc=obj.document();
//	var  root=doc.root();
//	objects = [];
//	ps.clear();
//	iterateTree(root,-1);
	//print( "found " + objects.length +" objects");
}

function buildObject(obj){
	var rate = obj.getParameter("frame rate");
	var flag = obj.getParameter("reset at time zero");
	var time = obj.getParameter("time");

    var grav = -obj.getParameter("gravity amount");
    var drag = obj.getParameter("drag amount");
    //var sprng = obj.getParameter("spring constant");
	ps.setGravity(grav);
	ps.setDrag(drag);
	psJ.setGravity(grav);
	psJ.setDrag(drag);

	if( flag && time == 0)
		resetObjects();
	for(var i=0;i<parent.length;i++) {
		objects[parent[i]].updateParticle();
	}
	if( objects.length > 0){
		ps.tick(1/rate);
		psJ.tick(1/rate);
	}
	for(var i=0;i<child.length;i++) {
		var o = objects[child[i]];
		o.updateObject(objects[o.parent]);
	}
}


function iterateTree(obj,parent){
	var	i,j,newP;
	for(i=0;i<obj.childCount();i++){
		var  curr=obj.childAtIndex(i);
		// skip camera objects
		var type = curr.type();
		if( type == 2)
			continue;
		var s = curr.tagCount();
		var found = false;
		for(j=0;j<s && !found;j++ ) {
			var tag = curr.tagAtIndex(j);
			s3 = tag.getParameter("scriptName");
			if(s3 == "Particle.js") {
				//print(type);
				if(type == 45) {  // JOINTFAMILY
					found = true;
					newP = objects.length;
					objects[newP] = new MyTagParticle(curr,tag,parent);
					//print("new particle "+ newP+" with parent "+parent);
					if( parent != -1) {
						var pos0 = curr.getParameter("position");
						var len = pos0.length(); //Math.sqrt(pos0.x*pos0.x + pos0.y*pos0.y + pos0.z*pos0.z );
						//print("making spirng " + parent + " with length " + len);
						var last = objects[parent].particle;
						var strength = tag.getParameter("Strength");
						var damping = tag.getParameter("Damping");
						psJ.makeSpring( last,objects[newP].particle,strength,damping,len);
					}
				} else if(type == 36) {
					var mass = tag.getParameter("Mass")
					scanMesh(curr);
					for(var k =0; k<points.length;k++) {
						if(points[k].selected) {
							newP = objects.length;
							objects[newP] = new MyObjectParticle(curr,points[k].index,mass);
							points[k].particle = newP;
						}
					}
					for(var k =0; k<points.length;k++) {
						var p = points[k];
						for(var l =0;l<p.neighbors.length;l++) {
							if( !points[p.neighbors[l]].selected) {
								//print(p.particle);
								if(p.particle >= 0)
									objects[p.particle].parent = false;
								break;
							}
						}
					}
					for(var k =0; k<points.length;k++) {
						var p = points[k];
						if(p.selected) {
							var s1 = objects[p.particle].particle;
							for(var l =0;l<p.neighbors.length;l++) {
								if(points[p.neighbors[l]].selected) {
									var s2 = objects[points[p.neighbors[l]].particle].particle;
									var len = s1.position.distanceTo(s2.position);
									var spring = ps.makeSpring(s1,s2,2,.1,len);
									spring.turnOff();
									points[p.neighbors[l]].removeNeighbor(k);
								}
							}
						}
					}
				}
			}
		}
		if(found)
			iterateTree(curr,newP);
		else
			iterateTree(curr,-1);
	}
}








