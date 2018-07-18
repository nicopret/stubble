const async = require("async"),
    config = require("../config"),
    createServer = require("./createServer"),
    createStructure = require("./createStructure"),
    util = require("./commonUtilities");

const restify_package_json = {
    main: config.restify.start_file,
    name: "stubble-server",
    scripts: {
        start: "node ./" + config.restify.start_file,
        test: "node_modules/.bin/mocha"
    },
    devDependencies: {
        "save-dev": "^2.0.0",
        "should": "^13.2.1",
        "should-sinon": "0.0.6",
        "sinon": "^6.1.3",
        "supertest": "^3.1.0"        
    }
};

module.exports = {
    /**
     * This module serves as the entry point, it reads an array of swagger contracts from the config.json file and return the swagger object
     * @module bin/create
     * @param {boolean} callback Either true or false, pending the outcome of the operation
     */
    create(callback) {
        util.initFolder(config.restify.output_folder, (err) => {
            if (err) {
                return console.error(err);
            }
            createStructure.start(config.restify.contract_folder, config.restify.contract_files, (err, res) => {
                if (err) {
                    return console.error(err);
                }
                createServer.create(res, (err) => callback(err));
            });
        });
    },
    /**
     * This module creates a package.json file for the server implementation
     * @module bin/createServerPackageFile
     * @param {file} json 
     * @param {*} callback 
     */
    createServerPackageFile(json, folder, callback) {
        let params = Object.assign(json, restify_package_json);
        delete params.dependencies.async;
        delete params.dependencies.nunjucks;
        delete params.dependencies["swagger-parser"];
        util.renderFile({
            file: "package.json",
            folder: folder
        }, JSON.stringify(params, null, 2), (err) => callback(err));
    }
};