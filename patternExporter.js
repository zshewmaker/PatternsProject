(function () {
    "use strict";

    var fs = require('fs'),
        xml2js = require('xml2js'),
        _ = require('lodash');

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
            var getNodePosition = node => {
                var rawPos = node.GUILayout[0].gpos[0].$.v.split(" ");
                return new Vector3(rawPos[0], rawPos[1], rawPos[2]);
            };

            _.forEach(graphs, outer => {
                _.forEach(getCompNodes(outer), inner => {
                    var newNode = new Node(getNodeId(inner), getNodePosition(inner));
                    var pattern = _.find(patterns, x => x.containsNode(newNode));
                    if (pattern) {
                        pattern.nodes.push(newNode);
                    }
                    console.dir(newNode)
                });
            });

            // Find OutputNodes from Pattern.Nodes

            console.dir(patterns);
            console.log('Done');
        });
    });

    // Run sbsrender.exe to generate images
    // Map pattern outputs to images
    // Call API (or save text file) with database

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
        constructor(id, position) {
            this.id = id || "000";
            this.position = position || new Vector3();
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