const assert = require("assert"),
    config = require("../config.json"),
    createServer = require("../bin/createServer"),
    expect = require("expect"),
    fs = require("fs");

describe("createServer index.js", () => {
    describe("render", () => {
        it("only test creating one file", (done) => {
            createServer.render({
                structure: {},
                target: [config.restify.output_folder, config.restify.start_file].join("/"),
                template: config.restify.start_template
            }, done);
        });
        it("check if file exists", (done) => {
            fs.readFile([config.restify.output_folder, config.restify.start_file].join("/"), done);
        });
    });
});