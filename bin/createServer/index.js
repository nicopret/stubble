const async = require("async"),
    config = require("../../config"),
    fs = require("fs"),
    nunjucks = require("nunjucks"),
    util = require("../commonUtilities");

module.exports = {
    /**
     * This module creates the array of server controllers that need to be created.
     * @module createServer/create
     * 
     * @param {object} structure The structure object that will be used to create the mock server
     * @param {*} callback returns either an error or true
     */
    create(structure, callback) {
        async.every([{
            structure: structure,
            target_file: config.restify.start_file,
            target_output: config.restify.output_folder,
            template: config.restify.start_template
        }, {
            structure: structure,
            target_file: "server.js",
            target_output: [config.restify.output_folder, "app"].join("/"),
            template: config.restify.server_template
        }, {
            structure: structure,
            target_file: "controllers",
            target_output: [config.restify.output_folder, "app", "controllers"].join("/"),
            template: config.restify.controller_template
        }, {
            structure: structure,
            target_file: "server.js",
            target_output: [config.restify.output_folder, "test"].join("/"),
            template: config.restify.test_server_template
        }], (item, callback) => {
            this.render(item, (err, res) => callback(err, res));
        }, (err) => callback(err));
    },
    /**
     * This module creates the js files by combining the structure object and nunjucks template
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