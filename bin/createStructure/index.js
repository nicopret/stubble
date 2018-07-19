var fs = require("fs"),
    path = require("path"),
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
            endpoints: Object.keys(contract.paths).reduce((array, item) => {
                this.createMethods(contract.paths[item]).forEach(string => {
                    if (array.indexOf(string) < 0) {
                        array.push(string);
                    }
                });
                return array;
            }, []),
            name: contract.basePath.replace('/', '')
        };
    },
    /**
     * Extracts the methods and operationID per method and return that in an array
     * 
     * @module createStructure/createMethods
     * 
     * @param {object} endpoint 
     */
    createMethods(endpoint) {
        return Object.keys(endpoint).map(item => {
            return endpoint[item].operationId;
        });
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
            fs.writeFile("contract.json", JSON.stringify(structure, null, 2), () => {});
            callback(null, structure);
        });
    }
};