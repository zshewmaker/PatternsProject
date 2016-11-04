
(function ($, _) {
    "use strict";

    var drawConnections = function () {
        var canvasXOffset = 8,
            canvasYOffset = 9;
        _.forEach($("li.pattern"), pattern => {
            var $pattern = $(pattern);
            var $cableCanvas = $pattern.find("canvas.cables");
            var cableCanvasPos = $cableCanvas.offset();
            var cableCanvas = $cableCanvas[0];
            var context = cableCanvas.getContext("2d");
            $cableCanvas.attr("width", $pattern.width() + "px");
            $cableCanvas.attr("height", $pattern.height() + "px");
            $cableCanvas.clearCanvas();

            _.forEach($pattern.find(".node .input-list .input"), input => {
                var $input = $(input);
                var fromId = $input.data("input-from-id");
                var $output = $pattern.find(".output[data-output-id=" + fromId + "]");
                var inputPos = $input.offset();
                var outputPos = $output.offset();

                if (outputPos) {
                    $cableCanvas.drawLine({
                        strokeStyle: "#ffffff",
                        strokeWidth: 2,
                        x1: inputPos.left - cableCanvasPos.left + canvasXOffset, y1: inputPos.top - cableCanvasPos.top + canvasYOffset,
                        x2: outputPos.left - cableCanvasPos.left + canvasXOffset, y2: outputPos.top - cableCanvasPos.top + canvasYOffset,
                    });
                }
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