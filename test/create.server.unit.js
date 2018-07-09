const assert = require("assert"),
    createServer = require("../bin/createServer");

describe("createServer index.js", () => {
    describe("start", () => {
        it("responds with 'create server'", () => {
            let result = createServer.start();
            assert.equal(result, "create server");
        });
    });
});