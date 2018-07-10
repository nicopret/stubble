const config = require("./config"),
    fs = require("fs"),
    Stubble = require("./bin");

Stubble.create((err, result) => {
    if (err) {
        console.log(err);
        return;
    } else {
        fs.readFile("package.json", "utf8", (err, res) => {
            err ? console.error(err) : 
                Stubble.createServerPackageFile(JSON.parse(res), (err) =>
                console.log(err ? err : "Done!!"));
        });
    }
});