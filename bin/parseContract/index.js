const SwaggerParser = require("swagger-parser");

module.exports = {
    parse(contract, callback) {
        SwaggerParser.validate(contract, (err, api) => callback(err, api));
    }
};