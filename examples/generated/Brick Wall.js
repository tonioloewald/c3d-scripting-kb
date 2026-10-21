//C3D_VERSION_REQUIREMENT 7.0.0
//
// Brick Wall.js
// Type / folder : Polygonobj  ->  ~/Library/Application Support/Cheetah3D/Scripts/Polygonobj/
// Requires      : Cheetah3D 7.0+ (written and linted against the 8.1.1 API)
//
// Usage:
//   Install, choose "Update Scripts Menu" at the bottom of the Script menu (or relaunch),
//   then create the object from Tools > Script > Polygonobj > Brick Wall.
//   The wall stands on y = 0, centred on x, with its depth centred on z.
//   Every brick is a separate closed box (6 quads, unshared corners = hard edges) with
//   box-projected UVs. Odd rows can be offset by half a brick (running bond); the ends
//   of offset rows are trimmed to half bricks so the wall stays flush.
//   Jitter displaces each brick randomly (seeded, so the wall is stable across rebuilds).
//
// Credit: written for Cheetah3D 8.x following the c3d-scripting-kb patterns
//         (patterns.md A4, B3, B10). Public domain.
//

// ---------------------------------------------------------------------------
// UI
// ---------------------------------------------------------------------------
function buildUI(obj) {
    obj.setParameter("name", "Brick Wall");

    obj.addParameterSeparator("Layout");
    //                    name            init  min    max     animate build
    obj.addParameterInt  ("rows",          12,   1,     500,    true,   true);
    obj.addParameterInt  ("columns",       10,   1,     500,    true,   true);
    obj.addParameterBool ("running bond",  true, false, true,   true,   true);

    obj.addParameterSeparator("Brick");
    obj.addParameterFloat("brick width",   0.215, 0.001, 100,   true,   true);
    obj.addParameterFloat("brick height",  0.065, 0.001, 100,   true,   true);
    obj.addParameterFloat("brick depth",   0.102, 0.001, 100,   true,   true);
    obj.addParameterFloat("mortar gap",    0.01,  0.0,   10,    true,   true);

    obj.addParameterSeparator("Variation");
    // not "seed": that is a built-in parameter name on particle objects
    obj.addParameterInt  ("random seed",   12345, 0,     999999, true,  true);
    obj.addParameterFloat("jitter",        0.002, 0.0,   1.0,    true,  true);

    obj.addParameterSeparator("UV");
    // 0 = each face fills 0..1; 1 = UVs in scene units (texture tiles at 1 unit)
    obj.addParameterSelector("uv mode", ["fit per face", "world size"], true, true);
}

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------

// Small LCG from patterns.md B10: deterministic for a given seed.
function makeRng(seed) {
    var s = (Math.floor(seed) >>> 0) % 233280;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

// The six faces of a box. For each face: outward normal n, and the in-plane axes u, v.
// The corner order o, o+U, o+U+V, o+V follows patterns.md A4 (x then z gives a +Y quad),
// i.e. u x v = -n in right-handed terms. VERIFY in app: if bricks look inside-out,
// swap the u/v of every entry (or call core.flipWinding(p) per polygon).
var FACES = [
    { n: [ 0,  1,  0], u: [ 1, 0, 0], v: [0, 0,  1] },   // top
    { n: [ 0, -1,  0], u: [ 1, 0, 0], v: [0, 0, -1] },   // bottom
    { n: [ 1,  0,  0], u: [ 0, 0, 1], v: [0, 1,  0] },   // +X
    { n: [-1,  0,  0], u: [ 0, 0,-1], v: [0, 1,  0] },   // -X
    { n: [ 0,  0,  1], u: [-1, 0, 0], v: [0, 1,  0] },   // +Z (front)
    { n: [ 0,  0, -1], u: [ 1, 0, 0], v: [0, 1,  0] }    // -Z (back)
];

function absDot3(a, b) { return Math.abs(a[0]) * b[0] + Math.abs(a[1]) * b[1] + Math.abs(a[2]) * b[2]; }

// Add one closed box centred at (cx,cy,cz) with full sizes (sx,sy,sz).
function addBrick(core, cx, cy, cz, sx, sy, sz, worldUV, idx, uv) {
    var size = [sx, sy, sz];
    var half = [sx * 0.5, sy * 0.5, sz * 0.5];
    for (var f = 0; f < FACES.length; f++) {
        var F = FACES[f];
        var su = absDot3(F.u, size);      // face extent along u
        var sv = absDot3(F.v, size);      // face extent along v
        // origin = centre + n*half - u*su/2 - v*sv/2
        var ox = cx + F.n[0] * half[0] - F.u[0] * su * 0.5 - F.v[0] * sv * 0.5;
        var oy = cy + F.n[1] * half[1] - F.u[1] * su * 0.5 - F.v[1] * sv * 0.5;
        var oz = cz + F.n[2] * half[2] - F.u[2] * su * 0.5 - F.v[2] * sv * 0.5;
        var Ux = F.u[0] * su, Uy = F.u[1] * su, Uz = F.u[2] * su;
        var Vx = F.v[0] * sv, Vy = F.v[1] * sv, Vz = F.v[2] * sv;

        idx[0] = core.addVertex(false, new Vec3D(ox,           oy,           oz));
        idx[1] = core.addVertex(false, new Vec3D(ox + Ux,      oy + Uy,      oz + Uz));
        idx[2] = core.addVertex(false, new Vec3D(ox + Ux + Vx, oy + Uy + Vy, oz + Uz + Vz));
        idx[3] = core.addVertex(false, new Vec3D(ox + Vx,      oy + Vy,      oz + Vz));

        var mu = worldUV ? su : 1.0, mv = worldUV ? sv : 1.0;
        uv[0].set(0,  0);
        uv[1].set(mu, 0);
        uv[2].set(mu, mv);
        uv[3].set(0,  mv);
        core.addIndexPolygon(4, idx, uv);   // Vec2D UVs: the safe form (gotchas §4)
    }
}

function buildObject(obj) {
    var core    = obj.core();                         // empty on entry: regenerate everything
    var rows    = Math.max(1, Math.floor(obj.getParameter("rows")));
    var cols    = Math.max(1, Math.floor(obj.getParameter("columns")));
    var bond    = obj.getParameter("running bond");
    var bw      = obj.getParameter("brick width");
    var bh      = obj.getParameter("brick height");
    var bd      = obj.getParameter("brick depth");
    var gap     = obj.getParameter("mortar gap");
    var jitter  = obj.getParameter("jitter");
    var worldUV = parseInt(obj.getParameter("uv mode"), 10) == 1;
    var rnd     = makeRng(obj.getParameter("random seed"));   // re-seed on every build
    // NEVER call obj.setParameter(...) here (rebuild loop, gotchas §2)

    var pitchX = bw + gap;
    var pitchY = bh + gap;
    var L      = cols * pitchX - gap;           // total wall length
    var x0     = -L * 0.5;                      // centre the wall on x
    var minW   = 1e-4;                          // drop slivers thinner than this

    // reusable buffers (avoid allocation in the hot loop, gotchas §4)
    var idx = [0, 0, 0, 0];
    var uv  = [new Vec2D(0, 0), new Vec2D(0, 0), new Vec2D(0, 0), new Vec2D(0, 0)];

    for (var r = 0; r < rows; r++) {
        var offset = (bond && (r % 2 == 1)) ? -pitchX * 0.5 : 0;
        var n      = (offset != 0) ? cols + 1 : cols;
        var cy     = r * pitchY + bh * 0.5;
        for (var c = 0; c < n; c++) {
            // brick span along the wall, clipped to [0, L] so offset rows end flush
            var a = c * pitchX + offset;
            var b = a + bw;
            if (a < 0) a = 0;
            if (b > L) b = L;
            var w = b - a;

            // Always draw the same number of random values per slot so changing one
            // brick's clipping does not reshuffle the jitter of every following brick.
            var jx = (rnd() * 2 - 1) * jitter;
            var jy = (rnd() * 2 - 1) * jitter;
            var jz = (rnd() * 2 - 1) * jitter;
            if (w < minW) continue;

            addBrick(core,
                     x0 + (a + b) * 0.5 + jx,
                     cy + jy,
                     jz,
                     w, bh, bd, worldUV, idx, uv);
        }
    }
}
