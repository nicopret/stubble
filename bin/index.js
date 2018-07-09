const createData = require("./createData"),
    createServer = require("./createServer"),
    createStructure = require("./createStructure"),
    parseContract = require("./parseContract");

module.exports = {
    create() {
        console.log(parseContract.start());
        console.log(createStructure.start());
        console.log(createData.start());
        console.log(createServer.start());
        return true;
    }
};