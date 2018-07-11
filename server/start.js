const serverFactory = require('./app/server');

const server = serverFactory(global);

server.listen(8080, () =>
  console.log('%s listening at %s', server.name, server.url)
);