const async = require("async"),
    config = require("../../config"),
    fs = require("fs"),
    nunjucks = require("nunjucks");

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
            target: [config.restify.output_folder, config.restify.start_file].join("/"),
            template: config.restify.start_template
        }, {
            structure: structure,
            target: [config.restify.output_folder, "app", "server.js"].join("/"),
            template: config.restify.server_template
        }], (item, callback) => {
            this.render(item, () => callback());
        }, (err) => callback(err ? err : true));
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
            fs.writeFile(params.target, content, (err, res) => callback(err, res));
        });
    }
};