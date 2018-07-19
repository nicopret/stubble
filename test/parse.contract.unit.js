const config = require("../config.json"),
    path = require("path"),
    parseContract = require("../bin/parseContract");

describe("parseContract index.js", () => {
    describe("parse", () => {
        it("parse swagger contract from input file", (done) => {
            parseContract.parse(path.resolve(config.restify.contract_folder, config.restify.contract_files[0]), done);
        });
    });
});