(function () {
    "use strict";

    function create(x, y, z) {
        return new Vector3(x, y, z);
    };

    class Vector3 {
        constructor(x, y, z) {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        }
    }

    module.exports.create = create;
})();

