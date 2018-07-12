const SwaggerParser = require("swagger-parser");

module.exports = {
    /**
     * This module parses the swagger contract into an object
     * @module parseContract/parse
     * 
     * @param {file} contract 
     * @param {*} callback 
     */
    parse(contract, callback) {
        SwaggerParser.validate(contract, (err, api) => callback(err, api));
    }
};