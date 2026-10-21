// Source: https://www.cheetah3d.com/forum/index.php?threads/10983/post-92926
// Author: hiro-ichi (Cheetah3D forum), posted 2015-01-10
// Thread: "LaplacianSmooth.js"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
* LaplacianSmooth.js
*
* This tool script applies a Laplacian smooth filter to selected vertices of a
* polygon object.
*
*
* Installation
*
* place this file into ~/Library/Application Support/Cheetah3D/Scripts/Tool/
* and restart Cheetah 3D
*
*
* Options
*
* Iterations   How many times this script applies the filter. Too much iterations
*              cause far from an original shape.
* Weight type  'uniform' or '1/(edge length)'.
* lambda       Step size for each iteration. It should be less than 1.
* kPB          Pass-band frequency which determines an unshrinkage parameter.
*              kPB ~ 0.1 may produce a good result.
*
*
* Notes
*
* This script has been tested in version 6.3.2 of Cheetah 3D.
*
*
* Reference
*
* [Tau95] Gabriel Taubin. A Signal Processing Approach to Fair Surface Design.
* In SIGGRAPH 95 Conference Proceedings, pages 351–358, August 1995.
*/

var LaplacianSmooth = {
    VERSION: '1.0.0',
    DEBUG: false,

    DEFAULT_LAMBDA: 0.6,
    DEFAULT_KPB: 0.1,

    WEIGHT_TYPE_CAPTIONS: [
        'uniform',
        '1/(edge length)'
    ],
    WEIGHT_TYPE_UNIFORM: 0,
    WEIGHT_TYPE_EDGE_LENGTH: 1
};

function debugPrint(message) {
    if (LaplacianSmooth.DEBUG === true) {
        print('DEBUG: ' + message);
    }
}

function buildUI(tool) {
    var scriptInfo = 'LaplacianSmooth.js (ver. ' + LaplacianSmooth.VERSION + ')';

    print('## ' + scriptInfo + ' ##');
    tool.addParameterSeparator(scriptInfo, true, true);
    tool.addParameterButton('Execute', 'OK', 'run');
    tool.addParameterInt('Iterations', 5, 1, 100, true, true);
    tool.addParameterSelector(
        'Weight type', LaplacianSmooth.WEIGHT_TYPE_CAPTIONS, true, true);
    tool.addParameterFloat(
        'lambda', LaplacianSmooth.DEFAULT_LAMBDA, 0.0, 1.0, true, true);
    tool.addParameterFloat(
        'kPB', LaplacianSmooth.DEFAULT_KPB, 0.0, 2.0, true, true);
}

function run(tool) {
    var doc = tool.document(),
        obj = doc.selectedObject(),
        numIterate,
        weightType,
        lambda,
        kPB,
        mu,
        pcore,
        smoother;

    if (obj.type() !== POLYGONOBJ) {
        print('! Select a polygon object.');
        return;
    }

    numIterate = tool.getParameter('Iterations');
    weightType = tool.getParameter('Weight type');
    lambda = tool.getParameter('lambda');
    kPB = tool.getParameter('kPB');

    // Tayler expansion from eqn (9) in [Tau95]:
    //   mu = lambda/(lambda*kPB - 1) ~ -lambda*(1 + lambda*kPB)
    mu = -lambda*(1.0 + lambda*kPB);

    debugPrint('edit mode: ' + doc.editMode());
    debugPrint('Iterations: ' + numIterate);
    debugPrint('Weight type: '  + weightType + ', ' +
        LaplacianSmooth.WEIGHT_TYPE_CAPTIONS[weightType]);
    debugPrint('lambda: ' + lambda);
    debugPrint('kPB: ' + kPB);
    debugPrint('mu: ' + mu);

    pcore = obj.core();
    try {
        smoother = new SmoothVertices(pcore, doc.editMode(), weightType);
    } catch (err) {
        print('! Error: ' + err.message);
        print('! Stop.');
        return;
    }

    obj.recordGeometryForUndo();
    for (var i = 0; i < numIterate; i++) {
        smoother.iterate(pcore, lambda);
        smoother.iterate(pcore, mu);
    }

    obj.update();
    print('Done.');
}

var EdgeInfo = function (vindex1, vindex2) {
    this.vindex1 = vindex1;  // from
    this.vindex2 = vindex2;  // to
};

EdgeInfo.prototype.hasVertex = function (vindex) {
    return (this.vindex1 === vindex) || (this.vindex2 === vindex);
};

EdgeInfo.prototype.computeDelta = function (pcore) {
    var vert1 = pcore.vertex(this.vindex1),
        vert2 = pcore.vertex(this.vindex2);
    return vert2.sub(vert1);
};

var VertexInfo = function (vindex, weightType) {
    this.vindex = vindex;
    this.weightType = weightType;
    this.edgeInfos = [];
    this.sumDelta = new Vec3D(0.0, 0.0, 0.0);

    switch (weightType) {
    case LaplacianSmooth.WEIGHT_TYPE_EDGE_LENGTH:
        this.getWeight = function (delta) {
            return 1.0/delta.norm();
        };
        break;
    default:
        this.getWeight = function (delta) {
            return 1.0;
        };
        break;
    }
};

VertexInfo.prototype.hasEdge = function (vindex) {
    for (var i = 0, n = this.edgeInfos.length; i < n; i++) {
        if (this.edgeInfos[i].hasVertex(vindex) === true) {
            return true;
        }
    }
    return false;
};

VertexInfo.prototype.appendEdge = function (pcore, vindex1, vindex2) {
    var edge = new EdgeInfo(vindex1, vindex2);

    if (this.weightType === LaplacianSmooth.WEIGHT_TYPE_EDGE_LENGTH) {
        var delta = edge.computeDelta(pcore);
        if (delta.norm() < 5.0e-7) {
            // Error
            throw Error('An irregular edge whose length is 0 was found.');
        }
    }

    this.edgeInfos.push(edge);
};

VertexInfo.prototype.computeDelta = function (pcore, step) {
    var sumWeight = 0.0;

    this.sumDelta.set(0.0, 0.0, 0.0);
    for (var i = 0, n = this.edgeInfos.length; i < n; i++) {
        var edgeDelta = this.edgeInfos[i].computeDelta(pcore),
            weight = this.getWeight(edgeDelta);

        this.sumDelta = this.sumDelta.add(edgeDelta.multiply(weight));
        sumWeight += weight;
    }
    this.sumDelta = this.sumDelta.multiply(step/sumWeight);
};

VertexInfo.prototype.apply = function (pcore) {
    var vert = pcore.vertex(this.vindex);
    pcore.setVertex(this.vindex, vert.add(this.sumDelta));
};

var SmoothVertices = function (pcore, editMode, weightType) {
    this.vertInfos = {};

    switch (editMode) {
    case POINT_MODE:
        this.initPointMode(pcore, weightType);
        break;
    case EDGE_MODE:
        this.initEdgeMode(pcore, weightType);
        break;
    case POLY_MODE:
        this.initPolyMode(pcore, weightType);
        break;
    case OBJECT_MODE:
        this.initObjectMode(pcore, weightType);
        break;
    default:
        // Error
        throw Error('Unknown edit mode.');
    }

    for (var pindex = 0, numPoly = pcore.polygonCount(); pindex < numPoly; pindex++) {
        for (var eindex = 0, numEdge = pcore.polygonSize(pindex); eindex < numEdge; eindex++) {
            var vindex1 = pcore.vertexIndex(pindex, eindex),
                vindex2 = pcore.vertexIndex(pindex, (eindex + 1)%numEdge);
            if ((this.vertInfos.hasOwnProperty(vindex1) === true) &&
                (this.vertInfos[vindex1].hasEdge(vindex2) === false)) {
                this.vertInfos[vindex1].appendEdge(pcore, vindex1, vindex2);
            }
            if ((this.vertInfos.hasOwnProperty(vindex2) === true) &&
                (this.vertInfos[vindex2].hasEdge(vindex1) === false)) {
                this.vertInfos[vindex2].appendEdge(pcore, vindex2, vindex1);
            }
        }
    }
};

SmoothVertices.prototype.initPointMode = function (pcore, weightType) {
    for (var vindex = 0, numVerts = pcore.vertexCount(); vindex < numVerts; vindex++) {
        if (pcore.vertexSelection(vindex) === true) {
            this.vertInfos[vindex] = new VertexInfo(vindex, weightType);
        }
    }
};

SmoothVertices.prototype.initEdgeMode = function (pcore, weightType) {
    for (var pindex = 0, numPoly = pcore.polygonCount(); pindex < numPoly; pindex++) {
        for (var eindex = 0, numEdge = pcore.polygonSize(pindex); eindex < numEdge; eindex++) {
            if (pcore.edgeSelection(pindex, eindex, SELECT) === true) {
                var vindex1 = pcore.vertexIndex(pindex, eindex),
                    vindex2 = pcore.vertexIndex(pindex, (eindex + 1)%numEdge);
                if (this.vertInfos.hasOwnProperty(vindex1) === false) {
                    this.vertInfos[vindex1] = new VertexInfo(
                        vindex1, weightType);
                }
                if (this.vertInfos.hasOwnProperty(vindex2) === false) {
                    this.vertInfos[vindex2] = new VertexInfo(
                        vindex2, weightType);
                }
            }
        }
    }
};

SmoothVertices.prototype.initPolyMode = function (pcore, weightType) {
    for (var pindex = 0, numPoly = pcore.polygonCount(); pindex < numPoly; pindex++) {
        if (pcore.polygonSelection(pindex) === true) {
            for (var cindex = 0, numCorner = pcore.polygonSize(pindex); cindex < numCorner; cindex++) {
                var vindex = pcore.vertexIndex(pindex, cindex);
                if (this.vertInfos.hasOwnProperty(vindex) === false) {
                    this.vertInfos[vindex] = new VertexInfo(
                        vindex, weightType);
                }
            }
        }
    }
};

SmoothVertices.prototype.initObjectMode = function (pcore, weightType) {
    for (var vindex = 0, numVerts = pcore.vertexCount(); vindex < numVerts; vindex++) {
        this.vertInfos[vindex] = new VertexInfo(
            vindex, weightType);
    }
};

SmoothVertices.prototype.iterate = function (pcore, step) {
    var vindex;

    for (vindex in this.vertInfos) {
        this.vertInfos[vindex].computeDelta(pcore, step);
    }
    for (vindex in this.vertInfos) {
        this.vertInfos[vindex].apply(pcore);
    }
};
