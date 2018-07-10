const config = require("../config"),
    createData = require("./createData"),
    createServer = require("./createServer"),
    createStructure = require("./createStructure"),
    fs = require("fs"),
    parseContract = require("./parseContract");

module.exports = {
    create(callback) {
        console.log(parseContract.start());
        console.log(createStructure.start());
        console.log(createData.start());
        createServer.start({}, (err, res) => callback(err, res));
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