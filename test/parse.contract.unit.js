const assert = require("assert"),
    parseContract = require("../bin/parseContract");

describe("parseContract index.js", () => {
    describe("start", () => {
        it("responds with 'parse contract'", () => {
            let result = parseContract.start();
            assert.equal(result, "parse contract");
        });
    });
});