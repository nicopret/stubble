const async = require("async"),
    config = require("../../config"),
    fs = require("fs"),
    nunjucks = require("nunjucks");

module.exports = {
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
    render(params, callback) {
        nunjucks.render(params.template, params.structure, (err, content) => {
            if (err) {
                callback(err);
            }
            fs.writeFile(params.target, content, (err, res) => callback(err, res));
        });
    }
}