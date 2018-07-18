var path = require("path"),
    parseContract = require("../parseContract");

module.exports = {
    createControllers(contract) {
        return {
            name: contract.basePath.replace('/', '')
        };
    },
    start(folder, files, callback) {
        let structure = {
            controllers: []
        };
        parseContract.parse(path.resolve(folder, files[0]), (err, res) => {
            if (err) {
                return console.error(err);
            }
            structure.controllers.push(this.createControllers(res));
            callback(null, structure);
        });
    }
};