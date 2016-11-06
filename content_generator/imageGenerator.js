(function () {
    "use strict";

    var fs = require('fs'),
        _ = require('lodash'),
        spawnSync = require('child_process').spawnSync;

    function generateImages(imageOutputPath, sbsRenderPath, substanceSbsar) {
        fs.readdir(imageOutputPath, (err, files) => {
            _.forEach(files, file => {
                fs.unlinkSync(imageOutputPath + file);
            });

            var renderResults = spawnSync(sbsRenderPath,
                ["render", "--inputs", substanceSbsar, "--output-format", "png", "--output-path", imageOutputPath]);
            console.log(`stderr: ${renderResults.stderr.toString()}`);
            console.log(`stdout: ${renderResults.stdout.toString()}`);
        });
    };

    module.exports.generateImages = generateImages;
})();

