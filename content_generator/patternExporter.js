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
        generateImages = require('./imageGenerator').generateImages,
        createPatterns = require('./pattern').createAll;

    var patterns = [];

    fs.readFile(substanceProject, "utf-8", (err, data) => {

        var parser = new xml2js.Parser();
        parser.parseString(data, (err2, result) => {

            patterns = createPatterns(result);

            generateImages(imageOutputPath, sbsRenderPath, substanceSbsar);
            fs.writeFile(jsonOutputPath, "var patternsDB = " + JSON.stringify(patterns) + ";");
            console.log('Done');
        });
    });
})();