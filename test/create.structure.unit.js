const assert = require("assert"),
    createStructure = require("../bin/createStructure");

describe("createStructure index.js", () => {
    describe("start", () => {
        it("responds with 'create structure'", () => {
            let result = createStructure.start();
            assert.equal(result, "create structure");
        });
    });
});