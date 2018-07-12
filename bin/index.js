/**
 * @fileOverview This file is the main entry point for the server creation and controls the flow of the application.
 */
const async = require("async"),
    config = require("../config"),
    createData = require("./createData"),
    createServer = require("./createServer"),
    createStructure = require("./createStructure"),
    fs = require("fs"),
    parseContract = require("./parseContract");

module.exports = {
    /**
     * This module serves as the entry point, it reads an array of swagger contracts from the config.json file and return the swagger object
     * @module bin/create
     * @param {boolean} callback Either true or false, pending the outcome of the operation
     */
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
        createServer.create({}, (err) => callback(err ? true : false));
    },
    /**
     * This module creates a package.json file for the server implementation
     * @module bin/createServerPackageFile
     * @param {file} json 
     * @param {*} callback 
     */
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