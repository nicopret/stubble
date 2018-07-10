const assert = require("assert"),
    config = require("../config.json"),
    createServer = require("../bin/createServer"),
    expect = require("expect"),
    fs = require("fs");

describe("createServer index.js", () => {
    describe("start", () => {
        it("return true if file is created", (done) => {
            createServer.start({}, done);
        });
        it("check if file exists", (done) => {
            fs.readFile([config.restify.output_folder, config.restify.start_file].join("/"), done);
        })
    });
});