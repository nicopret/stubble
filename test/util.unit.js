const commons = require("./test.commons"),
    util = require("../bin/commonUtilities");

describe("Test the 'bin/commonUtilities.js' functions", () => {

    describe("Test the file and folder functions", () => {
        let content = "test content";
        let params = {
            file: "text.txt",
            folder: "temp_folder_2"
        };

        it ("Test the creation of the folder", (done) => {
            util.createFolder(params.folder, (err) => {
                if (err) {
                    done(err);
                }
                commons.testTarget(params.folder, done);
            });
        });

        it ("Deletes the created folder", (done) => {
            util.deleteFolder(params.folder, (err) => {
                if (err) {
                    done(err);
                }
                commons.testTarget(params.folder, (exists) => exists) ? done(new Error()) : done();
            });
        });

        it ("Recreates the folder", (done) => {
            util.createFolder(params.folder, done);
        });

        it ("Writes a file to the created folder", (done) => {
            util.renderFile(params, content, done);
        });

        it ("Test if the file exists", (done) => {
            commons.testTarget(commons.createPath[params.folder, params.file], done);
        });

        it ("Initializes the folder, this should delete everything and recreate only the folder", (done) => {
            util.initFolder(params.folder, done);
        });

        it ("Makes sure that the temporary file has been deleted", (done) => {
           commons.testTarget(commons.createPath[params.folder, params.file], (exists) => exists) ? done(new Error()) : done();
        });

        it ("Deletes the temporary folder", (done) => {
            util.deleteFolder(params.folder, done);
        });

    });
});