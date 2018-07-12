const fs = require("fs"),
    Stubble = require("./bin");

Stubble.create((err) => {
    if (err) {
        console.log('-------------------------');
        console.log(err);
        return;
    }
    fs.readFile("package.json", "utf8", (err, res) => {
        err ? console.error(err) : 
            Stubble.createServerPackageFile(JSON.parse(res), (err) =>
            console.log(err ? err : "Done!!"));
    });
});