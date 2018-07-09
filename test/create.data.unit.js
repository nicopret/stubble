const assert = require("assert"),
    createData = require("../bin/createData");

describe("createData index.js", () => {
    describe("start", () => {
        it("responds with 'create data'", () => {
            let result = createData.start();
            assert.equal(result, "create data");
        });
    });
});