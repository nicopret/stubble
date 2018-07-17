const commons = require("./test.commons"),
    stubble = require("../bin/index"),
    util = require("../bin/commonUtilities");

describe("bin/index.js", () => {
    describe("createServerPackageFile", () => {
        let folder = "temp_folder_2";

        it("create temporary folder from the commons utils for these tests", (done) => {
            util.createFolder(folder, (err) => {
                if (err) {
                    done(err);
                }
                commons.testTarget(folder, done);
            });
        });

        it("create server json package", (done) => {
            stubble.createServerPackageFile({
                dependencies: {
                    nunjucks: "0.0.0"
                }
            }, folder, done);
        });

        it("ensure that json package file exist", (done) => {
            commons.testTarget(commons.createPath([folder, "package.json"]), done);
        });

        it ("delete temporary folder", (done) => {
            util.deleteFolder(folder, done);
        });
    });
});