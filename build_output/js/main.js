
(function ($, _) {
    "use strict";

    var drawConnections = function () {
        var canvasXOffset = 8,
            canvasYOffset = 9;

        _.forEach(patternsDB, pattern => {
            var $pattern = $("li.pattern[data-pattern-id=" + pattern.id + "]");
            var $cableCanvas = $pattern.find("canvas.cables");
            var cableCanvasPos = $cableCanvas.offset();
            var cableCanvas = $cableCanvas[0];
            var context = cableCanvas.getContext("2d");
            $cableCanvas.attr("width", $pattern.width() + "px");
            $cableCanvas.attr("height", $pattern.height() + "px");
            $cableCanvas.clearCanvas();

            var $nodes = $pattern.find(".node-list .node");

            _.forEach(pattern.nodes, node => {
                var $node = $("li.node[data-node-id=" + node.id + "]");
                var sizeRatio = Math.max(pattern.size.x / $cableCanvas.width(), pattern.size.y / $cableCanvas.height());
                console.log(sizeRatio);
                var positionModifier = value => value * 2 * sizeRatio;

                $node.css("left", positionModifier(node.position.x - pattern.position.x) + "px");
                $node.css("top", positionModifier(node.position.y - pattern.position.y) + "px");
                $node.css("width", 150 * sizeRatio + "px");
                $node.css("min-height", 150 * sizeRatio + "px");

                _.forEach($node.find(".input-list .input"), input => {
                    var $input = $(input);
                    var fromId = $input.data("input-from-id");
                    var fromNodeId = $input.data("input-from-node-id");
                    var $output = $pattern.find(".output[data-output-id=" + fromId + "]");
                    var inputPos = $input.offset();
                    var outputPos = $output.offset();
                    var fromNode = _.find(pattern.nodes, x => x.id == fromNodeId);

                    if (fromNode && fromNode.isDocked) {
                        $node.css("left", positionModifier(node.position.x - pattern.position.x) + "px");
                        $node.css("top", positionModifier(node.position.y - pattern.position.y) + "px");
                    } else if (outputPos) {
                        $cableCanvas.drawLine({
                            strokeStyle: "#ffffff",
                            strokeWidth: 2,
                            x1: inputPos.left - cableCanvasPos.left + canvasXOffset, y1: inputPos.top - cableCanvasPos.top + canvasYOffset,
                            x2: outputPos.left - cableCanvasPos.left + canvasXOffset, y2: outputPos.top - cableCanvasPos.top + canvasYOffset,
                        });
                    }
                });
            });
        });
    };

    console.dir(patternsDB);

    var patternTemplate = $.templates("#pattern-template");
    var patternList = $(".pattern-list");
    _.forEach(patternsDB, pattern => {
        patternList.append(patternTemplate.render(pattern));
    });

    drawConnections();

    $(window).resize(() => drawConnections());

})($, _);