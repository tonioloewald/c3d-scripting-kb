# ParticleCore Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/ParticleCore.html_

The ParticleCore object holds all particles of a particle system. It contains all the information about particle position, scale, rotation, etc. . A ParticleCore object can't be created manually. It is just possible to retrive ParticleCore objects from particle system objects with the core() or modCore() function calls.

## Properties
none

## Constructor
none

## Methods

### `Particle addParticle ()`
Adds a partilce to the particle core and return the newly created partilce.

### `Number particleCount ()`
Returns the number of particles

### `Particle particleAtIndex (Number index)`
Return the particle at index.

### `void removeParticleAtIndex (Number index)`
Deletes the particle at index .

### `void removeAllParticles ()`
Deletes all particles.
