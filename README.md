# stubble

Create a restify service with mock data from a swagger contract.

Add your swagger files to config.json -> files for the type of server you want to implement.

### npm commands available:

- `npm run jsdoc`
**This will create the jsdocs for the create files**
- `npm run create`
**This will create the mock server with mock data**
- `npm test`
**This will run all the tests on the create files**

Navigate to the output folder specified in the config file and start the server with: node index.js

Still loads of stuff to be finished, but should create a server on a well-formed contract. Only caters for json data at this stage.