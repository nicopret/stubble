const async = require("async"),
    config = require("../config"),
    createData = require("./createData"),
    createServer = require("./createServer"),
    createStructure = require("./createStructure"),
    fs = require("fs"),
    parseContract = require("./parseContract");

module.exports = {
    create(callback) {
        async.every(config.restify.files, (item, callback) => {
            parseContract.parse([config.restify.files_folder, config.restify.files[0]].join("/"), (err, contract) => {
                if (err) {
                    return console.log(err);
                }
                console.log(contract);
                callback();
            });
        }, (err, res) => {
            console.log(err);
            console.log(res);
        });
        console.log(createStructure.start());
        console.log(createData.start());
        createServer.create({}, (err) => callback(err));
    },
    createServerPackageFile(json, callback) {
        let params = Object.assign(json, {
            main: config.restify.start_file,
            name: "stubble-server",
            scripts: {
                start: "node ./" + config.restify.start_file
            }
        });
        delete params.dependencies.nunjucks;
        fs.writeFile([config.restify.output_folder, "package.json"].join("/"),
            JSON.stringify(params, null, 2), (err) => callback(err, true));
    }
};