const commons = require("./test.commons"),
    config = require("../config.json"),
    createServer = require("../bin/createServer"),
    util = require("../bin/commonUtilities");

describe("createServer index.js", () => {
    describe("render a file", () => {
        let file = "test.js";
        let folder = "temp_folder_2";

        it("create temporary folder from the commons utils for these tests", (done) => {
            util.createFolder(folder, (err) => {
                if (err) {
                    done(err);
                }
                commons.testTarget(folder, done);
            });
        });

        it("render the file from a nunjucks template", (done) => {
            createServer.render({
                file: file,
                folder: folder,
                structure: {},
                template: config.restify.start_template
            }, done);
        });

        it("check if file exists", (done) => {
            commons.testTarget(commons.createPath([folder, file]), done);
        });

        it("deletes the temporary folder", (done) => {
            util.deleteFolder(folder, done);
        });
    });
});