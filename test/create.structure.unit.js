const assert = require("assert"),
    config = require("../config.json"),
    createStructure = require("../bin/createStructure"),
    parseContract = require("../bin/parseContract"),
    path = require("path");

describe("createStructure index.js", () => {
    describe("createControllers", () => {
        let contract = {
            get: {
                description: 'Return profile information that can be used for the store\'s contact information',
                operationId: 'getProfile'
            }
        };
        let name = "personel";

        it("test the createControllers function", () => {
            parseContract.parse(path.resolve(config.restify.contract_folder, config.restify.contract_files[0]), (err, contract) => {
                let result = createStructure.createControllers(contract);
                assert.equal(result.name, name);
            });
        });

        it("extract the methods name, createMethods()", () => {
            let result = createStructure.createMethods(contract);
            assert.equal(result.length > 0, true);
        });

    });
});