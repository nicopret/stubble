var fs = require("fs"),
    path = require("path"),
    parseContract = require("../parseContract"),
    util = require("../commonUtilities");

module.exports = {
    /**
     * Extract the controller information from the Swagger contract
     * 
     * @module createStructure/createControllers
     * 
     * @param {Swagger API} contract The contr@act that is used to create the controller
     */
    createControllers(contract) {
        let name = contract.basePath.replace("/", "");
        return {
            controllerName: util.createControllerName(name),
            endpoints: this.createResource(contract.paths),
            name: name
        };
    },
    createMethod(param, obj) {
        return Object.keys(obj).map(method => {
            param.method = method;
            param.operation = obj[method].operationId;
            return param;
        })[0];
    },
    /**
     * Extracts the methods and operationID per method and return that in an array
     * 
     * @module createStructure/createResource
     * 
     * @param {object} endpoint 
     */
    createResource(endpoint) {
        let temp = Object.keys(endpoint).map(item => {
            return this.createMethod({
                resource: item
            }, endpoint[item]);
        });
        return temp;
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