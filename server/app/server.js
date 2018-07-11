const restify = require("restify");

module.exports = (global) => {
    const server = restify.createServer();
    server.use(restify.plugins.bodyParser({ mapParams: true }));

    server.get('/', (req, res, next) => 
        res.send(200, {})
    );

    return server;
}