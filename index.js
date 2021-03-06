const config = require("./config.json"),
    fs = require("fs"),
    path = require("path"),
    Stubble = require("./bin");

Stubble.create((err) => {
    if (err) {
        return console.log(err);
    }
    fs.readFile(path.resolve(__dirname, "./package.json"), "utf8", (err, res) => {
        err ? console.error(err) :
            Stubble.createServerPackageFile(JSON.parse(res), config.restify.output_folder, (err) =>
            console.log(err ? err : "Done!!"));
    });
});