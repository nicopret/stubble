const assert = require("assert"),
    stubble = require("../bin/index");

describe("index.js", () => {
    describe("create", () => {
        it("responds with true", () => {
            let result = stubble.create();
            assert.equal(result, true);
        });
    });
});