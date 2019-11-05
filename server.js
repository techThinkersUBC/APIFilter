const http = require('http');
const app = require('./app');

// Choose where the app should run (either the port specified in the environment
// variables or default of 3000)
const port = process.env.port || 4000;

const server = http.createServer(app);

// Start server on the specified port 
server.listen(port);