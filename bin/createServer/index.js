const config = require("../../config"),
    fs = require("fs"),
    nunjucks = require("nunjucks");

module.exports = {
    start(structure, callback) {
        nunjucks.render(config.restify.start_template, structure, (err, res) => {
            if (err) {
                return callback(err);
            }
            fs.writeFile([config.restify.output_folder, config.restify.start_file].join("/"), res, (err) => callback(err, true));
        });
    }
}