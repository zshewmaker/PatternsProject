(function () {
    "use strict";

    var imageOutputPath = "../build_output/generated_images/";
    var jsonOutputPath = "../build_output/patterns.js";
    var substanceProject = "../PatternsProject.sbs";
    var substanceSbsar = "../PatternsProject.sbsar";
    var sbsRenderPath = "D:/Program Files/Allegorithmic/Substance BatchTools 5/sbsrender.exe";
    var DesignerNodesPath = "D:\Program Files\Allegorithmic\Substance Designer 5\resources\packages";

    var fs = require('fs'),
        xml2js = require('xml2js'),
        xpath = require('xml2js-xpath'),
        _ = require('lodash'),
        spawnSync = require('child_process').spawnSync;

    var patterns = [];

    fs.readFile(substanceProject, "utf-8", (err, data) => {

        var parser = new xml2js.Parser();
        parser.parseString(data, (err2, result) => {

            var root = xpath.evalFirst(result, "//package");
            var graphOutputs = xpath.find(root, "/content/graph/graphOutputs/graphoutput");

            // Map comments to Patterns
            var guiObjects = xpath.find(root, "/content/graph/GUIObjects/GUIObject");

            _.forEach(guiObjects, inner => {
                if (xpath.evalFirst(inner, "/type", "v") == "COMMENT" && xpath.evalFirst(inner, "/isFrameVisible", "v") == 1) {
                    var position = xpath.evalFirst(inner, "/GUILayout/gpos", "v").split(" ");
                    var size = xpath.evalFirst(inner, "/GUILayout/size", "v").split(" ");

                    var newPattern = new Pattern(
                        xpath.evalFirst(inner, "/uid", "v"),
                        inner.title[0].$.v,
                        new Vector3(parseFloat(position[0]), parseFloat(position[1]), parseFloat(position[2])),
                        new Vector3(parseFloat(size[0]), parseFloat(size[1])));
                    patterns = _.concat(patterns, newPattern);
                }
            });

            // Map Nodes included in Pattern as property of Pattern
            var graphs = result.package.content[0].graph;
            var getCompNodes = outer => outer.compNodes[0].compNode;
            var getNodeId = node => node.uid[0].$.v;
            var getNodeGui = node => node.GUILayout[0];
            var getNodePosition = gui => {
                var rawPos = xpath.evalFirst(gui, "/gpos", "v").split(" ");
                return new Vector3(parseFloat(rawPos[0]), parseFloat(rawPos[1]), parseFloat(rawPos[2]));
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
                if (node
                    && node.connexions
                    && node.connexions[0]) {
                    return node.connexions[0].connexion;
                }
                return [];
            };

            var getConnectionId = connection => {
                return connection.connRef[0].value[0].$.v;
            };

            _.forEach(graphs, outer => {
                _.forEach(getCompNodes(outer), inner => {
                    var nodeGui = getNodeGui(inner);
                    var newNode = new Node(getNodeId(inner), getNodeName(inner), getNodePosition(nodeGui));
                    newNode.isFilter = isFilter(inner);
                    newNode.isGenerator = isGenerator(inner);

                    newNode.isOutputNode = isOutputNode(inner);
                    if (newNode.isOutputNode) {
                        var outputBridgeId = xpath.evalFirst(inner, "/compImplementation/compOutputBridge/output", "v");
                        _.forEach(graphOutputs, graphOutput => {
                            if (xpath.evalFirst(graphOutput, "/uid", "v") == outputBridgeId) {
                                newNode.outputName = xpath.evalFirst(graphOutput, "/identifier", "v");
                            }
                        });
                    }

                    if (nodeGui.docked && nodeGui.docked[0].$.v == 1) {
                        var dockedPos = nodeGui.dockDistance[0].$.v.split(" ");
                        newNode.isDocked = true;
                        var dockedPosition = new Vector3(newNode.position.x + parseFloat(dockedPos[0]), newNode.position.y + parseFloat(dockedPos[1]));
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
            });

            fs.readdir("./build_output/generated_images/", (err, files) => {
                _.forEach(files, file => {
                    fs.unlinkSync("./build_output/generated_images/" + file);
                });

                var renderResults = spawnSync(sbsRenderPath,
                    ["render", "--inputs", substanceSbsar, "--output-format", "png", "--output-path", imageOutputPath]);
                console.log(`stderr: ${renderResults.stderr.toString()}`);
                console.log(`stdout: ${renderResults.stdout.toString()}`);
            });

            fs.writeFile(jsonOutputPath, "var patternsDB = " + JSON.stringify(patterns) + ";");
            console.log('Done');
        });
    });

    class Pattern {
        constructor(id, name, position, size) {
            this.id = id || "000";
            this.name = name || "Unnamed";
            this.position = position || new Vector3();
            this.size = size || new Vector3();
            this.nodes = [];
        }

        containsNode(node) {
            return node.position.x > this.position.x
                && node.position.x < this.position.x + this.size.x
                && node.position.y > this.position.y
                && node.position.y < this.position.y + this.size.y;
        }
    }

    class Node {
        constructor(id, name, position) {
            this.id = id || "000";
            this.name = name || "Unnamed";
            this.position = position || new Vector3();
            this.isDocked = false;
            this.dockedPosition = new Vector3();
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

    class Vector3 {
        constructor(x, y, z) {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        }
    }
})();