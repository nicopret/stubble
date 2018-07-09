const config = require("./config"),
    fs = require("fs"),
    Stubble = require("./bin");

Stubble.create((result) => {
    if (result) {
        fs.readFile("package.json", "utf8", (err, res) => {
            if (err) {
                return console.error(err);
            }
            let params = Object.assign(JSON.parse(res), {
                main: config.restify.server_file,
                name: "stubble-server",
                scripts: {
                    start: "node ./" + config.restify.server_file
                }
            });
            delete params.dependencies.nunjucks;
            fs.writeFile([config.restify.output_folder, "package.json"].join("/"), JSON.stringify(params, null, 2), () => console.log("done"));
        });
    }
});