const restify = require("restify");

module.exports = () => {
    const server = restify.createServer();
    server.use(restify.plugins.bodyParser({ mapParams: true }));

    server.get('/', (req, res) => 
        res.send(200, {})
    );

    return server;
}