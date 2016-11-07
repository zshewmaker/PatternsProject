
(function($, _) {
    "use strict";

    var drawConnections = function() {
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

            // First pass - getting left most node (refactor with lodash?)
            var leftPositionModifier = 99999;
            var topPositionModifier = 0;
            _.forEach(pattern.nodes, node => {
                leftPositionModifier = Math.min(leftPositionModifier, (node.position.x - pattern.position.x) / 2);
                // topPositionModifier = Math.min(topPositionModifier, (node.position.y - pattern.position.y) / 4);
            });

            var xRatio = $cableCanvas.width() / pattern.size.x; // $cableCanvas.width();
            var yRatio = $cableCanvas.height() / pattern.size.y; // $cableCanvas.height();
            var sizeRatio = Math.min(xRatio, yRatio);
            var positionModifier = value => value * sizeRatio;
            var sizeModifier = value => value * sizeRatio * .8;

            // Second pass - setting node positions
            _.forEach(pattern.nodes, node => {
                var $node = $("li.node[data-node-id=" + node.id + "]");

                if (!node.isDocked) {
                    $node.css("width", sizeModifier(128) + "px");
                    $node.css("min-height", sizeModifier(128) + "px");
                    $node.css("left", positionModifier(node.position.x - leftPositionModifier - pattern.position.x) + "px");
                    $node.css("top", positionModifier(node.position.y - topPositionModifier - pattern.position.y) + "px");
                } else {
                    $node.css("left", positionModifier(node.position.x - leftPositionModifier - pattern.position.x) + "px");
                    $node.css("top", positionModifier(node.position.y - topPositionModifier - pattern.position.y) + "px");

                    $node.css("width", sizeModifier(64) + "px");
                    $node.css("min-height", sizeModifier(32) + "px");
                    $node.find("h2").css("height", sizeModifier(16) + "px")
                    $node.find("h2").css("font-size", sizeModifier(.8) + "rem")
                }
            });

            // Third pass - drawing connections
            _.forEach(pattern.nodes, node => {
                var $node = $("li.node[data-node-id=" + node.id + "]");

                _.forEach($node.find(".input-list .input"), input => {
                    var $input = $(input);
                    var fromId = $input.data("input-from-id");
                    var fromNodeId = $input.data("input-from-node-id");
                    var $output = $pattern.find(".output[data-output-id=" + fromId + "]");
                    var inputPos = $input.offset();
                    var outputPos = $output.offset();
                    var fromNode = _.find(pattern.nodes, x => x.id == fromNodeId);

                    if (fromNode && fromNode.isDocked) {
                        $node.css("left", positionModifier(inputPos.x) + "px");
                        $node.css("top", positionModifier(inputPos.y) + "px");
                    } else if (outputPos) {
                        $cableCanvas.drawLine({
                            strokeStyle: "#d0d0d0",
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

    var $tooltip = $("#tooltip");
    var handleMouseLeave = () => {
        var timeoutId = setTimeout(() => $tooltip.fadeOut("slow"), 650);
        $tooltip.data("timeoutId", timeoutId);
    };

    $(".output img").mouseenter((e) => {
        var $img = $(e.target)
        clearTimeout($tooltip.data("timeoutId"));

        $tooltip.empty()
            .append("<img src='" + $img.attr("src") + "' data/>")
            .css("left", e.pageX - 256 + "px")
            .css("top", e.pageY + "px")
            .fadeIn("slow");
    }).mouseleave(handleMouseLeave);

    $(".node").not(".output").mouseenter((e) => {
        var $node = $(e.target)
        clearTimeout($tooltip.data("timeoutId"));

        $tooltip.empty()
            .append($node.find(".parameters-content").clone())
            .css("left", e.pageX + "px")
            .css("top", e.pageY + "px")
            .fadeIn("slow");
    }).mouseleave(handleMouseLeave);

    $tooltip.mouseenter(() =>{
        clearTimeout($tooltip.data("timeoutId"));
    }).mouseleave(handleMouseLeave);

})($, _);