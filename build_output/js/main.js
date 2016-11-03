
(function ($, _) {
    "use strict";

    console.dir(patternsDB);

    var patternTemplate = $.templates("#pattern-template");
    var patternList = $(".pattern-list");
    _.forEach(patternsDB, pattern => {
        patternList.append(patternTemplate.render(pattern));
    });

})($, _);