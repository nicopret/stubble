const assert = require("assert"),
    config = require("../config.json"),
    createStructure = require("../bin/createStructure"),
    parseContract = require("../bin/parseContract"),
    path = require("path");

describe("createStructure index.js", () => {
    describe("createControllers", () => {

        let name = "personel";

        it("test the createControllers function", () => {
            parseContract.parse(path.resolve(config.restify.contract_folder, config.restify.contract_files[0]), (err, contract) => {
                let result = createStructure.createControllers(contract);
                assert.equal(result.name, name);
            });
        });

    });

    describe("createStructure -> index.js -> extractMethods()", () => {
        let contract = {
            get: {
                description: 'Return profile information that can be used for the store\'s contact information',
                operationId: 'getProfile'
            }
        };
        let method = 'get';
        let name = "profile";
        let expected = {
            profile: [
                {
                    method: 'get',
                    operation: 'getProfile'
                }
            ]
        };

        it ("positive test with the correct parameters and expected output", () => {
            let result = createStructure.extractMethods({
                contract, method, name
            });
            assert.deepEqual(result, expected);
        });

        it ("negative test with contract as a null value", () => {
            let result = createStructure.extractMethods({
                contract: null, method, name
            });
            assert.equal(result, null);
        });

        it ("negative test with method as a wrong value", () => {
            let result = createStructure.extractMethods({
                contract, method: 'post', name
            });
            assert.equal(result, null);
        });

        it ("negative test with method as a null value", () => {
            let result = createStructure.extractMethods({
                contract, method: null, name
            });
            assert.equal(result, null);
        });

        it ("negative test with the name as a null value", () => {
            let result = createStructure.extractMethods({
                contract, method, name: null
            });
            assert.equal(result, null);
        });

        it ("negative test without sending parameters", () => {
            let result = createStructure.extractMethods();
            assert.equal(result, null);
        });

    });
});