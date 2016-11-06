(function () {
    "use strict";

    var xpath = require('xml2js-xpath'),
        _ = require('lodash'),
        vector3 = require('./vector3');

    // Map Nodes included in Pattern as property of Pattern
    var getNodeId = node => node.uid[0].$.v;
    var getNodeGui = node => node.GUILayout[0];
    var getNodePosition = gui => {
        var rawPos = xpath.evalFirst(gui, "/gpos", "v").split(" ");
        return vector3.create(parseFloat(rawPos[0]), parseFloat(rawPos[1]), parseFloat(rawPos[2]));
    };

    var getNodeParameters = node => {
        if (isGenerator(node)) {
            return xpath.find(node, "/compImplementation/compInstance/parameters/parameter");
        }
        if (isFilter(node)) {
            return xpath.find(node, "/compImplementation/compFilter/parameters/parameter");
        }
        return [];
    };

    var isOutputNode = node => {
        if (xpath.evalFirst(node, "/compImplementation/compOutputBridge")) {
            return true;
        }
        return false;
    };

    var isGenerator = node => xpath.evalFirst(node, "/compImplementation/compInstance") != null;
    var isFilter = node => xpath.evalFirst(node, "/compImplementation/compFilter") != null;

    var getNodeName = node => {
        if (isGenerator(node)) {
            var rawValue = xpath.evalFirst(node, "/compImplementation/compInstance/path/value", "v");
            return rawValue.replace("_", " ").substring(6, rawValue.search(/\?dependency/i));
        }
        if (isFilter(node)) {
            return xpath.evalFirst(node, "/compImplementation/compFilter/filter", "v");
        }
        if (isOutputNode(node)) {
            return "Output";
        }
    };

    var getConnections = node => {
        var connections = xpath.find(node, "/connexions/connexion");
        if (connections.length > 0) {
            return connections;
        }
        return [];
    };

    var getConnectionId = connection => {
        return connection.connRef[0].value[0].$.v;
    };

    function create(rawData, patterns) {
        _.forEach(rawData.compNodes[0].compNode, inner => {
            var nodeGui = getNodeGui(inner);
            var newNode = new Node(getNodeId(inner), getNodeName(inner), getNodePosition(nodeGui));
            newNode.isFilter = isFilter(inner);
            newNode.isGenerator = isGenerator(inner);

            newNode.isOutputNode = isOutputNode(inner);
            if (newNode.isOutputNode) {
                var outputBridgeId = xpath.evalFirst(inner, "/compImplementation/compOutputBridge/output", "v");
                var graphOutputs = xpath.find(rawData, "/graphOutputs/graphoutput");

                _.forEach(graphOutputs, graphOutput => {
                    if (xpath.evalFirst(graphOutput, "/uid", "v") == outputBridgeId) {
                        newNode.outputName = xpath.evalFirst(graphOutput, "/identifier", "v");
                    }
                });
            }

            if (nodeGui.docked && nodeGui.docked[0].$.v == 1) {
                var dockedPos = nodeGui.dockDistance[0].$.v.split(" ");
                newNode.isDocked = true;
                var dockedPosition = vector3.create(newNode.position.x + parseFloat(dockedPos[0]), newNode.position.y + parseFloat(dockedPos[1]));
                newNode.position = dockedPosition;
            }

            _.forEach(getNodeParameters(inner), para => {
                var paraName = xpath.evalFirst(para, "/name", "v").replace("_", " ");
                var valueType = Object.keys(xpath.evalFirst(para, "/paramValue"))[0];
                var paraValue = xpath.evalFirst(para, "/paramValue/" + valueType + "/value", "v");
                newNode.parameters.push(new NodeParameter(paraName, paraValue, valueType));
            });

            _.forEach(xpath.find(inner, "/compOutputs/compOutput"), output => {
                newNode.outputs.push(xpath.evalFirst(output, "/uid", "v"));
            });

            _.forEach(getConnections(inner), x => {
                var inputName = xpath.evalFirst(x, "/identifier", "v");
                inputName = inputName.match("^input") ? "" : inputName;
                newNode.inputs.push(new NodeInput(xpath.evalFirst(x, "/connRef/value", "v"), xpath.evalFirst(x, "/connRefOutput/value", "v"), newNode.id, inputName));
            });

            var pattern = _.find(patterns, x => x.containsNode(newNode));
            if (pattern) {
                pattern.nodes.push(newNode);
            } else {
                console.error("stray node");
                console.dir(newNode);
            }
        });
    };

    class Node {
        constructor(id, name, position) {
            this.id = id || "000";
            this.name = name || "Unnamed";
            this.position = position || vector3.create();
            this.isDocked = false;
            this.dockedPosition = vector3.create();
            this.parameters = [];
            this.isOutputNode = false;
            this.outputName = null;
            this.inputs = [];
            this.isFilter = false;
            this.isGenerator = false;
            this.outputs = [];
        }
    }

    class NodeInput {
        constructor(fromNodeId, fromOutputId, toNodeId, name) {
            this.fromNodeId = fromNodeId;
            this.fromOutputId = fromOutputId;
            this.toNodeId = toNodeId;
            this.name = name || "";
        }
    }

    class NodeParameter {
        constructor(name, value, valueType) {
            this.name = name || "Unnamed";
            this.value = value || 0;
            this.valueType = valueType || "constantValueInt32";
        }
    }

    module.exports.create = create;
})();

