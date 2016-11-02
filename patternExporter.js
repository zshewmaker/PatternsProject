(function () {
    "use strict";

    var fs = require('fs'),
        xml2js = require('xml2js'),
        _ = require('lodash'),
        spawnSync = require('child_process').spawnSync;

    var patterns = [];

    var parser = new xml2js.Parser();
    fs.readFile("TestProject01.xml", (err, data) => {
        parser.parseString(data, (err2, result) => {
            console.dir(result.package.content[0].graph[0].GUIObjects[0].GUIObject[0].type[0].$.v);

            // Map comments to Patterns
            var guiObjects = result.package.content[0].graph[0].GUIObjects[0].GUIObject;

            _.forEach(guiObjects, inner => {
                if (inner.type[0].$.v == "COMMENT" && inner.isFrameVisible[0].$.v == 1) {
                    var position = inner.GUILayout[0].gpos[0].$.v.split(" ");
                    var size = inner.GUILayout[0].size[0].$.v.split(" ");

                    var newPattern = new Pattern(
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
                var rawPos = gui.gpos[0].$.v.split(" ");
                return new Vector3(parseFloat(rawPos[0]), parseFloat(rawPos[1]), parseFloat(rawPos[2]));
            };
            var getNodeParameters = node => {
                if (node
                    && node.compImplementation
                    && node.compImplementation[0].compInstance
                    && node.compImplementation[0].compInstance[0].parameters) {

                    return node.compImplementation[0].compInstance[0].parameters[0].parameter;
                }
                return [];
            };

            var isOutputNode = node => {
                if (node
                    && node.compImplementation
                    && node.compImplementation[0].compOutputBridge
                    && node.compImplementation[0].compOutputBridge[0].output) {
                    return true;
                }
                return false;
            };

            var getNodeName = node => {
                if (node
                    && node.compImplementation
                    && node.compImplementation[0].compInstance
                    && node.compImplementation[0].compInstance[0].path
                    && node.compImplementation[0].compInstance[0].path[0].value) {
                    return node.compImplementation[0].compInstance[0].path[0].value[0].$.v;
                }
                if (node
                    && node.compImplementation
                    && node.compImplementation[0].compFilter
                    && node.compImplementation[0].compFilter[0].filter) {
                    return node.compImplementation[0].compFilter[0].filter[0].$.v;
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

                    newNode.isOutputNode = isOutputNode(inner);

                    if (nodeGui.docked && nodeGui.docked[0].$.v == 1) {
                        var dockedPos = nodeGui.dockDistance[0].$.v.split(" ");
                        newNode.isDocked = true;
                        newNode.dockedPosition = new Vector3(parseFloat(dockedPos[0]), parseFloat(dockedPos[1]));
                    }

                    _.forEach(getNodeParameters(inner), para => {
                        newNode.parameters.push(new NodeParameter(para));
                    });

                    _.forEach(getConnections(inner), x => {
                        newNode.inputs.push(new NodeInput(getConnectionId(x), newNode.id));
                    });

                    var pattern = _.find(patterns, x => x.containsNode(newNode));
                    if (pattern) {
                        pattern.nodes.push(newNode);
                    }
                    console.dir(newNode)
                });
            });

            console.dir(patterns);

            // TODO: Run sbsrender.exe to generate images
            var blah = spawnSync("D:/Program Files/Allegorithmic/Substance BatchTools 5/sbsrender.exe", 
                [ "render", "--inputs", "PatternsProject.sbsar", "--output-format", "png", "--output-path", "build_output/" ]);
            console.log(`stderr: ${blah.stderr.toString()}`);
            console.log(`stdout: ${blah.stdout.toString()}`);


            // TODO: Map pattern outputs to images
            // TODO: Call API (or save text file) with database
            if (!fs.existsSync("build_output")) {
                fs.mkdirSync("build_output");
            }

            fs.writeFile("build_output/patterns.json", JSON.stringify(patterns));
            console.log('Done');
        });
    });

    class Pattern {
        constructor(name, position, size) {
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
            this.inputs = [];
        }
    }

    class NodeInput {
        constructor(fromId, toId) {
            this.fromId = fromId;
            this.toId = toId;
        }
    }

    class NodeParameter {
        constructor(xml) {
            if (xml == null) {
                console.error("null xml when making NodeParameter.")
            }
            this.xml = xml;
            this.name = xml.name[0].$.v;
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