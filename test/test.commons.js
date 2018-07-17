const fs = require("fs"),
    path = require("path");

module.exports = {
    createPath(array) {
        return path.resolve(array.join(", "));
    },
    testTarget(target, callback) {
        fs.exists(target, (exists) => exists ? callback() : callback(false));
    }
}