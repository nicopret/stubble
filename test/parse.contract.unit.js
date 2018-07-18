const config = require("../config.json"),
    path = require("path"),
    parseContract = require("../bin/parseContract");

describe("parseContract index.js", () => {
    describe("parse", () => {
        it("parse swagger contract from input file", (done) => {
            parseContract.parse(path.resolve(config.restify.files_folder, config.restify.files[0]), done);
        });
    });
});