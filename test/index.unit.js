const config = require("../config.json"),
    fs = require("fs"),
    stubble = require("../bin/index");

describe("bin/index.js", () => {
    describe("createServerPackageFile", () => {
        it("create server json package", (done) => {
            stubble.createServerPackageFile({
                dependencies: {
                    nunjucks: "0.0.0"
                }
            }, done);
        });
        it("ensure that json package file exist", (done) => {
            fs.readFile([config.restify.output_folder, "package.json"].join("/"), done);
        });
    });
});