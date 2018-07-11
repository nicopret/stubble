const assert = require("assert"),
    config = require("../config.json"),
    parseContract = require("../bin/parseContract");

describe("parseContract index.js", () => {
    describe("parse", () => {
        it("parse swagger contract from input file", (done) => {
            parseContract.parse([config.restify.files_folder, config.restify.files[0]].join("/"), done);
        });
    });
});