const async = require("async"),
    config = require("../../config"),
    nunjucks = require("nunjucks"),
    path = require("path"),
    util = require("../commonUtilities");

module.exports = {
    /**
     * This module creates the server, it's components and the tests
     * 
     * @module createServer/create
     * 
     * @param {object} structure The structure object that will be used to create the mock server
     * @param {*} callback returns either an error or true
     */
    create(structure, callback) {
        async.series([
            (callback) => util.createFolder(path.resolve(config.restify.output_folder, "test"), (err) => callback(err)),
            (callback) => {
                this.render({
                    structure: structure,
                    file: config.restify.start_file,
                    folder: config.restify.output_folder,
                    template: config.restify.start_template
                }, (err) => callback(err));
            },
            (callback) => {
                this.render({
                    file: "server.js",
                    folder: path.resolve(config.restify.output_folder, "test"),
                    structure: structure,
                    template: config.restify.test_server_template
                }, (err) => callback(err));
            },
            (callback) => this.createApp(structure, (err) => callback(err)),
            (callback) => this.createController(structure, (err) => callback(err)),
            (callback) => this.createTest(structure, (err) => callback(err))
        ], (err) => callback(err));
    },
    /**
     * Creates the server file with all paths
     * 
     * @module createServer/createApp
     * 
     * @param {object} structure 
     * @param {*} callback 
     */
    createApp(structure, callback) {
        let folder = path.resolve(config.restify.output_folder, "app");
        util.createFolder(folder, (err) => {
            if (err) {
                return console.error(err);
            }
            this.render({
                file: "server.js",
                folder: folder,
                structure: structure,
                template: config.restify.server_template
            }, (err) => callback(err));
        });
    },
    /**
     * Creates the controllers
     * 
     * @module createServer/createController
     * 
     * @param {object} structure 
     * @param {*} callback 
     */
    createController(structure, callback) {
        let folder = path.resolve(config.restify.output_folder, "app", "controller");
        util.createFolder(folder, (err) => {
            if (err) {
                return console.error(err);
            }
            this.render({
                structure: structure,
                file: structure.controllers[0].name + ".js",
                folder: folder,
                template: config.restify.controller_template
            }, (err) => callback(err));
        });
    },
    /**
     * Create the controller tests
     * 
     * @module createServer/createTest
     * 
     * @param {object} structure 
     * @param {*} callback 
     */
    createTest(structure, callback) {
        let folder = path.resolve(config.restify.output_folder, "test", "controllers");
        util.createFolder(folder, (err) => {
            if (err) {
                return console.error(err);
            }
            this.render({
                structure: structure,
                file: structure.controllers[0].name + ".js",
                folder: folder,
                template: config.restify.test_controller_template
            }, (err) => callback(err));
        });
    },
    /**
     * This module creates the js files by combining the structure object and nunjucks template
     * 
     * @module createServer/render
     * 
     * @param {object} params 
     * @param {*} callback 
     */
    render(params, callback) {
        nunjucks.render(params.template, params.structure, (err, content) => {
            if (err) {
                callback(err);
            }
            util.renderFile({
                file: params.file,
                folder: params.folder
            }, content, (err, res) => callback(err, res));
        });
    }
};