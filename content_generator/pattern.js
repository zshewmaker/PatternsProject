(function () {
    "use strict";

    var xml2js = require('xml2js'),
        xpath = require('xml2js-xpath'),
        _ = require('lodash'),
        vector3 = require('./vector3'),
        createNode = require("./designerNode").create;

    function create(rawData) {
        var position = xpath.evalFirst(rawData, "/GUILayout/gpos", "v").split(" ");
        var size = xpath.evalFirst(rawData, "/GUILayout/size", "v").split(" ");

        return new Pattern(
            xpath.evalFirst(rawData, "/uid", "v"),
            xpath.evalFirst(rawData, "/title", "v"),
            vector3.create(parseFloat(position[0]), parseFloat(position[1]), parseFloat(position[2])),
            vector3.create(parseFloat(size[0]), parseFloat(size[1])));
    };

    function createAll(rawData) {
        var patterns = [];
        var guiObjects = xpath.find(rawData, "//package/content/graph/GUIObjects/GUIObject");

        _.forEach(guiObjects, inner => {
            if (xpath.evalFirst(inner, "/type", "v") == "COMMENT" && xpath.evalFirst(inner, "/isFrameVisible", "v") == 1) {
                var newPattern = create(inner);
                patterns.push(newPattern);
            }
        });

        _.forEach(xpath.find(rawData, "//package/content/graph"), graph => {
            createNode(graph, patterns, rawData);
        });

        return patterns;
    }

    class Pattern {
        constructor(id, name, position, size) {
            this.id = id || "000";
            this.name = name || "Unnamed";
            this.position = position || vector3.create();
            this.size = size || vector3.create();
            this.nodes = [];
        }

        containsNode(node) {
            return node.position.x > this.position.x
                && node.position.x < this.position.x + this.size.x
                && node.position.y > this.position.y
                && node.position.y < this.position.y + this.size.y;
        }
    }

    module.exports.createAll = createAll;
})();

