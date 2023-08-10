
const app = require("./app");
const http = require("http");
require("dotenv").config({path: __dirname + "/.env"});
const {logger} = require("./utils/logger");

const server = http.createServer(app);


const port = process.env.PORT || 3333;

server.listen(port, () => logger.info('process running on port: '+port));


