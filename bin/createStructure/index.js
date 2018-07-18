var path = require("path"),
    parseContract = require("../parseContract");

module.exports = {
    /**
     * Extract the controller information from the Swagger contract
     * 
     * @module createStructure/createControllers
     * 
     * @param {Swagger API} contract The contr@act that is used to create the controller
     */
    createControllers(contract) {
        return {
            name: contract.basePath.replace('/', '')
        };
    },
    /**
     * The entry point to create the structure that will be used to create the server
     * 
     * @module createStructure/start
     * 
     * @param {string} folder the folder where the contracts are stored
     * @param {string} files an array of contracts that must be rendered
     * @param {object} callback the structure that will be used to create the server
     */
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