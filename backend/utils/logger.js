const pino = require("pino");


const logger = pino({
  level: process.env.PINO_LEVEL || "info"
});

module.exports.logger = logger;