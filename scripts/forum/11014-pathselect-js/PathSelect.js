// Source: https://www.cheetah3d.com/forum/index.php?threads/11014/post-93285
// Author: hiro-ichi (Cheetah3D forum), posted 2015-01-29
// Thread: "PathSelect.js"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
 * PathSelect.js
 *
 * This macro script selects the shortest path between 2 selected components.
 *
 *
 * Installation
 *
 * Place this file into ~/Library/Application Support/Cheetah3D/Scripts/Macro/
 * and restart Cheetah 3D.
 *
 * Usage
 *
 * 1. Select just 2 components (points, edges or polygons),
 * 2. Run this script.
 *
 */
var PATH_SELECT = {
    VERSTION: '1.0.0',
    DEBUG: false
};

function debugPrint(message) {
    if (PATH_SELECT.DEBUG === true) {
        print('[DEBUG] ' + message);
    }
}

var SimpleTimer = function () {
    this.start_ = new Date();
};

SimpleTimer.prototype = {
    elapsed: function () {
        var current = new Date();
        return current.getTime() - this.start_.getTime();
    },
    display: function (message) {
        print(message + ' (' + this.elapsed() + ' msec)');
    }
};

function main(doc) {
    var timer = new SimpleTimer(),
        SCRIPT_INFO = 'PathSelect.js (ver. ' + PATH_SELECT.VERSTION + ')',
        obj = doc.selectedObject(),
        editMode = doc.editMode(),
        pcore,
        selector;

    print('## ' + SCRIPT_INFO + ' ##');

    if (obj.type() !== POLYGONOBJ) {
        print('! Error: Select polygon object.');
        return;
    }

    pcore = obj.core();
    debugPrint('Edit mode: ' + editMode);
    try {
        switch (editMode) {
        case POINT_MODE:
            selector = new PointPathSelector(pcore);
            break;
        case EDGE_MODE:
            selector = new EdgePathSelector(pcore);
            break;
        case POLY_MODE:
            selector = new PolygonPathSelector(pcore);
            break;
        default:
            print('! Error: Only Point, Edge or Polygon mode are supported.');
            return;
        }

        obj.recordGeometryForUndo();
        selector.select(pcore);
        obj.update();
    } catch (err) {
        timer.display('! Error: ' + err.message);
        return;
    }

    timer.display('Done');
}

var PriorityQueue = function () {
    this.heap_ = {};
    this.count_ = 0;
};

PriorityQueue.prototype = {
    compare_: function (hindex1, hindex2) {
        return this.heap_[hindex1].cost < this.heap_[hindex2].cost;
    },
    swap_: function (hindex1, hindex2) {
        // swap contents.
        var buf = this.heap_[hindex1];
        this.heap_[hindex1] = this.heap_[hindex2];
        this.heap_[hindex2] = buf;

        // update heap indices.
        this.heap_[hindex1].hindex_ = hindex1;
        this.heap_[hindex2].hindex_ = hindex2;
    },
    bubbleUp_: function (hindex) {
        if (hindex <= 0) {
            return;
        }
        var parentIndex = Math.floor((hindex - 1)/2);
        if (this.compare_(hindex, parentIndex) === true) {
            this.swap_(hindex, parentIndex);
            this.bubbleUp_(parentIndex);
        }
    },
    bubbleDown_: function (hindex) {
        var leftIndex = 2*hindex + 1;

        if (leftIndex < this.count_) {
            var rightIndex = leftIndex + 1,
                minIndex = hindex;
            if (this.compare_(leftIndex, minIndex) === true) {
                minIndex = leftIndex;
            }
            if (rightIndex < this.count_ &&
                this.compare_(rightIndex, minIndex) === true) {
                minIndex = rightIndex;
            }
            if (minIndex !== hindex) {
                this.swap_(hindex, minIndex);
                this.bubbleDown_(minIndex);
            }
        }
    },
    isEmpty: function () {
        return this.count_ === 0;
    },
    push: function (node) {
        this.heap_[this.count_] = node;
        node.hindex_ = this.count_;
        this.count_++;

        this.bubbleUp_(node.hindex_);
    },
    pop: function () {
        var node = this.heap_[0];
        this.swap_(0, this.count_ - 1);
        this.count_--;

        this.bubbleDown_(0);
        return node;
    },
    updateCost: function (node, cost, via) {
        if (cost < node.cost) {
            node.cost = cost;
            node.via = via;

            this.bubbleUp_(node.hindex_);
        }
    }
};

var Graph = function () {
    this.nodes = [];
    this.start = null;
    this.target = null;
};

Graph.prototype = {
    hasTarget: function () {
        return this.target !== null;
    },
    appendNode: function (nindex, isSelected) {
        var node = {
            nindex: nindex, // node index
            branches: [], // nearest neighbors
            owners: null,
            isDone: false,
            cost: Infinity,
            via: null,
            hindex_: null // heap index
        };

        if (isSelected === true) {
            if (this.start === null) {
                this.start = nindex;
                debugPrint('Start index: ' + this.start);
            } else if (this.target === null) {
                this.target = nindex;
                debugPrint('Target index: ' + this.target);
            } else {
                throw Error('More than 3 selections were found.');
            }
        }
        this.nodes.push(node);
    },
    appendBranch: function (nindex1, nindex2) {
        var branches = this.nodes[nindex1].branches;
        for (var i = 0, numBranch = branches.length; i < numBranch; i++) {
            if (branches[i] === nindex2) {
                return;
            }
        }

        this.nodes[nindex1].branches.push(nindex2);
        this.nodes[nindex2].branches.push(nindex1);
    },
    dijkstra: function () {
        var // timer = new SimpleTimer(), // Benchmark
            doneNodeIndex = this.start,
            doneNode = this.nodes[doneNodeIndex],
            queue = new PriorityQueue();

        doneNode.cost = 0;
        doneNode.isDone = true;

        while (doneNodeIndex !== this.target) {
            var cost = doneNode.cost + 1;

            for (var i = 0, numBranch = doneNode.branches.length;
                i < numBranch; i++) {
                var branch = doneNode.branches[i],
                    branchNode = this.nodes[branch];
                if (branchNode.cost === Infinity) {
                    // first visit
                    branchNode.cost = cost;
                    branchNode.via = doneNodeIndex;
                    queue.push(branchNode);
                } else if (branchNode.isDone === false) {
                    // update cost
                    queue.updateCost(branchNode, cost, doneNodeIndex);
                }
            }

            if (queue.isEmpty() === true) {
                throw Error('Fail to find the shortest path.');
            }

            // update doneNode
            doneNode = queue.pop();

            doneNodeIndex = doneNode.nindex;
            doneNode.isDone = true;
        }

        // BBENCHMARK
        // timer.display('[Benchmark] dijkstra finished.');
    }
};

var PointPathSelector = function (pcore) {
    this.graph_ = new Graph();

    this.initGraph_(pcore);
    this.graph_.dijkstra();
};

PointPathSelector.prototype = {
    initGraph_: function (pcore) {
        for (var vindex = 0, numVerts = pcore.vertexCount();
            vindex < numVerts; vindex++) {
            this.graph_.appendNode(vindex, pcore.vertexSelection(vindex));
            this.graph_.nodes[vindex].owners = [];
        }

        if (this.graph_.hasTarget() === false) {
            throw Error('2 selected points were not found.');
        }

        for (var pindex = 0, numPoly = pcore.polygonCount();
            pindex < numPoly; pindex++) {
            for (var eindex = 0, numEdge = pcore.polygonSize(pindex);
                eindex < numEdge; eindex++) {
                var vindex1 = pcore.vertexIndex(pindex, eindex),
                    vindex2 = pcore.vertexIndex(pindex, (eindex + 1)%numEdge);
                this.graph_.appendBranch(vindex1, vindex2);
                this.graph_.nodes[vindex1].owners.push(
                    {pindex: pindex, eindex: eindex});
            }
        }
    },
    select: function (pcore) {
        var vindex = this.graph_.target;

        while (vindex !== null) {
            // debugPrint('select @ ' + vindex);
            pcore.setVertexSelection(vindex, true);

            for (var i = 0, n = this.graph_.nodes[vindex].owners.length;
                i < n; i++) {
                var owner = this.graph_.nodes[vindex].owners[i];
                pcore.setEdgeSelection(
                    owner.pindex, owner.eindex, UVPOINT, true);
            }

            vindex = this.graph_.nodes[vindex].via;
        }
    }
};

var PolygonPathSelector = function (pcore) {
    this.graph_ = new Graph();

    this.initGraph_(pcore);
    this.graph_.dijkstra();
};

PolygonPathSelector.prototype = {
    initGraph_: function (pcore) {
        var branches = {};

        for (var pindex = 0, numPoly = pcore.polygonCount();
            pindex < numPoly; pindex++) {
            for (var eindex = 0, numEdge = pcore.polygonSize(pindex);
                eindex < numEdge; eindex++) {
                var vindex1 = pcore.vertexIndex(pindex, eindex),
                    vindex2 = pcore.vertexIndex(pindex, (eindex + 1)%numEdge),
                    key = (vindex1 < vindex2)?
                        vindex2 + ',' + vindex1:
                        vindex1 + ',' + vindex2;

                if ((key in branches) === false) {
                    branches[key] = [pindex];
                } else {
                    branches[key].push(pindex);
                }
            }
            this.graph_.appendNode(pindex, pcore.polygonSelection(pindex));
        }

        if (this.graph_.hasTarget() === false) {
            throw Error('2 selected polygons were not found.');
        }

        for (var k in branches) {
            var branch = branches[k],
                numBranch = branch.length;

            for (var i = 0, n = numBranch - 1; i < n; i++) {
                var nindex1 = branch[i];
                for (var j = i + 1; j < numBranch; j++) {
                    var nindex2 = branch[j];
                    this.graph_.appendBranch(nindex1, nindex2);
                }
            }
        }
    },
    select: function (pcore) {
        var pindex = this.graph_.nodes[this.graph_.target].via;

        while (pindex !== this.graph_.start && pindex !== null) {
            // debugPrint('select @ ' + pindex);
            pcore.setPolygonSelection(pindex, true);
            pindex = this.graph_.nodes[pindex].via;
        }
    }
};

var EdgePathSelector = function (pcore) {
    this.graph_ = new Graph();

    this.initGraph_(pcore);
    this.graph_.dijkstra();
};

EdgePathSelector.prototype = {
    initGraph_: function (pcore) {
        var nindex = 0,
            branches = [],
            edges = {},
            vindex,
            numVerts = pcore.vertexCount();

        for (vindex = 0; vindex < numVerts; vindex++) {
            branches[vindex] = [];
        }

        for (var pindex = 0, numPoly = pcore.polygonCount();
            pindex < numPoly; pindex++) {
            for (var eindex = 0, numEdge = pcore.polygonSize(pindex);
                eindex < numEdge; eindex++) {
                var vindex1 = pcore.vertexIndex(pindex, eindex),
                    vindex2 = pcore.vertexIndex(pindex, (eindex + 1)%numEdge),
                    owner = {pindex: pindex, eindex: eindex},
                    key = (vindex1 < vindex2)?
                        vindex2 + ',' + vindex1:
                        vindex1 + ',' + vindex2;

                if ((key in edges) === false) {
                    edges[key] = nindex;
                    this.graph_.appendNode(
                        nindex,
                        pcore.edgeSelection(pindex, eindex, SELECT));
                    this.graph_.nodes[nindex].owners = [owner];
                    branches[vindex1].push(nindex);
                    branches[vindex2].push(nindex);
                    nindex++;
                } else {
                    this.graph_.nodes[edges[key]].owners.push(owner);
                }
            }
        }

        if (this.graph_.hasTarget() === false) {
            throw Error('2 selected edges were not found.');
        }

        edges = null;

        for (vindex = 0; vindex < numVerts; vindex++) {
            var branch = branches[vindex],
                numBranch = branch.length;
            for (var i = 0, n = numBranch - 1; i < n; i++) {
                var nindex1 = branch[i];
                for (var j = i + 1; j < numBranch; j++) {
                    var nindex2 = branch[j];
                    this.graph_.appendBranch(nindex1, nindex2);
                }
            }
        }
    },
    select: function (pcore) {
        var nindex = this.graph_.target;

        while (nindex !== null) {
            // debugPrint('select @ ' + nindex);
            for (var i = 0, n = this.graph_.nodes[nindex].owners.length;
                i < n; i++) {
                var owner = this.graph_.nodes[nindex].owners[i];
                pcore.setEdgeSelection(
                    owner.pindex, owner.eindex, SELECT | UVEDGE, true);
            }

            nindex = this.graph_.nodes[nindex].via;
        }
    }
};
